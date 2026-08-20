from collections import Counter
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List, Optional
from urllib.parse import unquote, urlsplit
import unittest


ROOT = Path(__file__).resolve().parents[1]
JAANITULI_PAGE = (
    ROOT / "toimunud-sundmused" / "lasila-jaanituli-2026" / "index.html"
)
VIITNA_PAGE = (
    ROOT
    / "toimunud-sundmused"
    / "taimetarkuste-matk-viitna-2026"
    / "index.html"
)
JS_FILE = ROOT / "js" / "main-20260820.js"
CSS_FILE = ROOT / "css" / "style-20260820.css"
JAANITULI_FULL_DIR = ROOT / "images" / "jaanituli-2026" / "full"
JAANITULI_THUMB_DIR = ROOT / "images" / "jaanituli-2026" / "thumb"
VIITNA_FULL_DIR = ROOT / "images" / "taimetarkuste-matk-viitna-2026" / "full"
VIITNA_THUMB_DIR = ROOT / "images" / "taimetarkuste-matk-viitna-2026" / "thumb"

ORIGINAL_JAANITULI_FULL_PATHS = [
    "../../images/jaanituli.jpg",
    "../../images/jaanitule-lokke.jpg",
    "../../images/kadrina_paastjad.png",
    "../../images/opikoda.png",
    "../../images/mois-peahoone.jpg",
    "../../images/kogukond.jpg",
]
ORIGINAL_VIITNA_FULL_PATH = "../../images/viitna-matk-poster.png"
VOID_ELEMENTS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


@dataclass
class GalleryItem:
    full: Optional[str]
    caption: Optional[str]
    button_type: Optional[str]
    src: Optional[str] = None
    data_src: Optional[str] = None
    alt: Optional[str] = None
    visible_caption: Optional[str] = None
    hidden: bool = False
    gallery_index: Optional[int] = None


@dataclass
class Gallery:
    initial_count: Optional[str]
    items: List[GalleryItem] = field(default_factory=list)
    expand_button: Optional[Dict[str, Optional[str]]] = None


class GalleryParser(HTMLParser):
    def __init__(self, page: Path) -> None:
        super().__init__(convert_charrefs=True)
        self.page = page
        self.galleries: List[Gallery] = []
        self.items: List[GalleryItem] = []
        self.items_outside_galleries: List[GalleryItem] = []
        self.counters: List[Dict[str, Optional[str]]] = []
        self.dialogs: List[Dict[str, Optional[str]]] = []
        self._active_item: Optional[GalleryItem] = None
        self._capturing_visible_caption = False
        self._gallery_stack: List[int] = []
        self._element_stack: List[tuple[str, bool]] = []

    @property
    def initial_count(self) -> Optional[str]:
        return self.galleries[0].initial_count if self.galleries else None

    @property
    def expand_button(self) -> Optional[Dict[str, Optional[str]]]:
        return self.galleries[0].expand_button if self.galleries else None

    def handle_starttag(
        self, tag: str, attrs: List[tuple[str, Optional[str]]]
    ) -> None:
        attributes = dict(attrs)
        classes = set((attributes.get("class") or "").split())
        starts_gallery = "data-gallery" in attributes

        if starts_gallery:
            self.galleries.append(
                Gallery(initial_count=attributes.get("data-initial-count"))
            )
            self._gallery_stack.append(len(self.galleries) - 1)

        if tag == "button" and "gallery-item" in classes:
            gallery_index = (
                self._gallery_stack[-1] if self._gallery_stack else None
            )
            self._active_item = GalleryItem(
                full=attributes.get("data-full"),
                caption=attributes.get("data-caption"),
                button_type=attributes.get("type"),
                hidden="hidden" in attributes,
                gallery_index=gallery_index,
            )
            self.items.append(self._active_item)
            if gallery_index is None:
                self.items_outside_galleries.append(self._active_item)
            else:
                self.galleries[gallery_index].items.append(self._active_item)

        if tag == "img" and self._active_item is not None:
            self._active_item.src = attributes.get("src")
            self._active_item.data_src = attributes.get("data-src")
            self._active_item.alt = attributes.get("alt")

        if tag == "button" and "data-gallery-toggle" in attributes:
            if self._gallery_stack:
                self.galleries[self._gallery_stack[-1]].expand_button = attributes

        if "lightbox-counter" in classes:
            self.counters.append(attributes)

        if attributes.get("role") == "dialog":
            self.dialogs.append(attributes)

        if self._active_item is not None and "gallery-caption" in classes:
            self._capturing_visible_caption = True

        if tag not in VOID_ELEMENTS:
            self._element_stack.append((tag, starts_gallery))

    def handle_data(self, data: str) -> None:
        if self._active_item is not None and self._capturing_visible_caption:
            text = data.strip()
            if text:
                self._active_item.visible_caption = text

    def handle_endtag(self, tag: str) -> None:
        if tag == "span" and self._capturing_visible_caption:
            self._capturing_visible_caption = False
        if tag == "button":
            self._active_item = None

        while self._element_stack:
            open_tag, started_gallery = self._element_stack.pop()
            if started_gallery:
                self._gallery_stack.pop()
            if open_tag == tag:
                break


def parse_gallery(page: Path) -> GalleryParser:
    parser = GalleryParser(page)
    parser.feed(page.read_text(encoding="utf-8"))
    parser.close()
    return parser


def resolve_asset(page: Path, reference: Optional[str]) -> Path:
    if not reference:
        return page.parent / "__missing_gallery_asset__"
    asset_path = unquote(urlsplit(reference).path)
    return (page.parent / asset_path).resolve()


class GalleryContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.jaanituli = parse_gallery(JAANITULI_PAGE)
        cls.viitna = parse_gallery(VIITNA_PAGE)

    def test_both_event_pages_use_universal_gallery(self):
        self.assertEqual(self.jaanituli.initial_count, "9")
        self.assertEqual(self.viitna.initial_count, "9")

    def test_gallery_items_are_nested_in_their_gallery(self):
        for gallery in (self.jaanituli, self.viitna):
            self.assertEqual(len(gallery.galleries), 1)
            self.assertEqual(gallery.items_outside_galleries, [])
            self.assertEqual(gallery.galleries[0].items, gallery.items)

    def test_jaanituli_has_40_unique_items(self):
        self.assertEqual(len(self.jaanituli.items), 40)
        self.assertEqual(len({item.full for item in self.jaanituli.items}), 40)

    def test_jaanituli_initial_visibility_and_thumbnail_loading(self):
        visible = [item for item in self.jaanituli.items if not item.hidden]
        hidden = [item for item in self.jaanituli.items if item.hidden]

        self.assertEqual(len(visible), 9)
        self.assertEqual(len(hidden), 31)
        for item in visible:
            self.assertTrue(item.src)
            self.assertFalse(item.src.startswith("data:"))
            self.assertIsNone(item.data_src)
        for item in hidden:
            self.assertTrue(item.src.startswith("data:image/"))
            self.assertTrue(item.data_src)
            self.assertFalse(item.data_src.startswith("data:"))

    def test_original_jaanituli_items_remain_first_in_order(self):
        self.assertEqual(
            [item.full for item in self.jaanituli.items[:6]],
            ORIGINAL_JAANITULI_FULL_PATHS,
        )

    def test_all_optimized_imports_are_referenced_once(self):
        import_prefix = "../../images/jaanituli-2026/full/"
        references = Counter(
            item.full
            for item in self.jaanituli.items
            if item.full and item.full.startswith(import_prefix)
        )
        expected_names = {path.name for path in JAANITULI_FULL_DIR.glob("*.webp")}
        expected_references = {
            f"{import_prefix}{name}" for name in expected_names
        }

        self.assertEqual(len(expected_names), 34)
        self.assertEqual(
            expected_names,
            {path.name for path in JAANITULI_THUMB_DIR.glob("*.webp")},
        )
        self.assertEqual(set(references), expected_references)
        self.assertTrue(all(count == 1 for count in references.values()))

    def test_jaanituli_has_collapsed_expand_toggle(self):
        toggle = self.jaanituli.expand_button
        self.assertIsNotNone(toggle)
        self.assertIn("data-gallery-toggle", toggle)
        self.assertEqual(toggle.get("type"), "button")
        self.assertEqual(toggle.get("aria-expanded"), "false")

    def test_both_event_pages_have_lightbox_counter(self):
        for gallery in (self.jaanituli, self.viitna):
            self.assertEqual(len(gallery.counters), 1)
            self.assertEqual(gallery.counters[0].get("id"), "lightbox-counter")
            self.assertEqual(gallery.counters[0].get("aria-live"), "polite")

    def test_both_event_pages_have_modal_lightbox(self):
        for gallery in (self.jaanituli, self.viitna):
            self.assertEqual(len(gallery.dialogs), 1)
            dialog = gallery.dialogs[0]
            self.assertEqual(dialog.get("id"), "lightbox")
            self.assertEqual(dialog.get("aria-modal"), "true")
            self.assertEqual(dialog.get("aria-hidden"), "true")
            self.assertEqual(dialog.get("tabindex"), "-1")

    def test_reviewed_jaanituli_captions_match_the_photos(self):
        expected = {
            "lasila-jaanituli-20-06-2026-8.webp": (
                "Korvpalliturniiri osalejad MTÜ Lasila Küla telgi all",
                "Korvpallurid Lasila Küla telgi all",
            ),
            "lasila-jaanituli-20-06-2026-9.webp": (
                "Lasila korvpalliväljaku avamistseremoonia",
                "Väljaku avamistseremoonia",
            ),
            "lasila-jaanituli-20-06-2026-3x3-korvpallivoistlus-1.webp": (
                "3×3 korvpalliturniiril medali võitnud võistkond",
                "Medali võitnud võistkond",
            ),
            "lasila-jaanituli-20-06-2026-3x3-korvpallivoistlus-2.webp": (
                "3×3 korvpalliturniiri võistkonnad ühispildil",
                "Võistkonnad ühispildil",
            ),
            "lasila-jaanituli-20-06-2026-lasila-fan-club.webp": (
                "Lasila Fan Clubi rinnamärk",
                "Lasila Fan Clubi märk",
            ),
        }

        items_by_name = {
            Path(urlsplit(item.full or "").path).name: item
            for item in self.jaanituli.items
        }
        for filename, (description, visible_caption) in expected.items():
            item = items_by_name[filename]
            self.assertEqual(item.caption, description)
            self.assertEqual(item.alt, description)
            self.assertEqual(item.visible_caption, visible_caption)

    def test_viitna_has_ten_items_with_nine_initially_visible(self):
        visible = [item for item in self.viitna.items if not item.hidden]
        hidden = [item for item in self.viitna.items if item.hidden]

        self.assertEqual(len(self.viitna.items), 10)
        self.assertEqual(len({item.full for item in self.viitna.items}), 10)
        self.assertEqual(len(visible), 9)
        self.assertEqual(len(hidden), 1)
        self.assertEqual(
            self.viitna.items[0].full,
            ORIGINAL_VIITNA_FULL_PATH,
        )
        for item in visible:
            self.assertTrue(item.src)
            self.assertFalse(item.src.startswith("data:"))
            self.assertIsNone(item.data_src)
        for item in hidden:
            self.assertTrue(item.src.startswith("data:image/"))
            self.assertTrue(item.data_src)
            self.assertFalse(item.data_src.startswith("data:"))

    def test_all_optimized_viitna_imports_are_referenced_once(self):
        import_prefix = "../../images/taimetarkuste-matk-viitna-2026/full/"
        references = Counter(
            item.full
            for item in self.viitna.items
            if item.full and item.full.startswith(import_prefix)
        )
        expected_names = {path.name for path in VIITNA_FULL_DIR.glob("*.webp")}
        expected_references = {
            f"{import_prefix}{name}" for name in expected_names
        }

        self.assertEqual(len(expected_names), 9)
        self.assertEqual(
            expected_names,
            {path.name for path in VIITNA_THUMB_DIR.glob("*.webp")},
        )
        self.assertEqual(set(references), expected_references)
        self.assertTrue(all(count == 1 for count in references.values()))

    def test_reviewed_viitna_captions_match_the_photos(self):
        expected = {
            "taimetarkuste-matk-27-06-26-viitnal-5.webp": (
                "Matkalised Viitna metsarajal",
                "Matkalised metsarajal",
            ),
            "taimetarkuste-matk-27-06-26-viitnal-3.webp": (
                "Metsaalune taimestik Viitna järvede ümbruses",
                "Metsaalune taimestik",
            ),
        }
        items_by_name = {
            Path(urlsplit(item.full or "").path).name: item
            for item in self.viitna.items
        }

        for filename, (description, visible_caption) in expected.items():
            item = items_by_name[filename]
            self.assertEqual(item.caption, description)
            self.assertEqual(item.alt, description)
            self.assertEqual(item.visible_caption, visible_caption)

    def test_gallery_items_are_accessible(self):
        for gallery in (self.jaanituli, self.viitna):
            for item in gallery.items:
                self.assertTrue(item.caption)
                self.assertTrue(item.alt)
                self.assertEqual(item.button_type, "button")

    def test_local_gallery_assets_exist(self):
        for gallery in (self.jaanituli, self.viitna):
            for item in gallery.items:
                self.assertTrue(resolve_asset(gallery.page, item.full).is_file())
                self.assertTrue(
                    resolve_asset(gallery.page, item.data_src or item.src).is_file()
                )

    def test_shared_javascript_keeps_keyboard_and_focus_handling(self):
        javascript = JS_FILE.read_text(encoding="utf-8")

        self.assertIn("document.addEventListener('keydown'", javascript)
        self.assertIn("event.key === 'Escape'", javascript)
        self.assertIn("event.key === 'ArrowLeft'", javascript)
        self.assertIn("event.key === 'ArrowRight'", javascript)
        self.assertIn("lightboxClose.focus()", javascript)
        self.assertIn("lightboxTrigger.focus()", javascript)

    def test_shared_javascript_contains_focus_and_background_with_cleanup(self):
        javascript = JS_FILE.read_text(encoding="utf-8")

        for contract in (
            "const FOCUSABLE_SELECTOR",
            "event.key === 'Tab'",
            "getLightboxFocusables()",
            "event.preventDefault()",
            "document.activeElement",
            "lightbox.contains(document.activeElement)",
            "Array.from(document.body.children)",
            "element !== lightbox",
            "wasInert: element.inert",
            "element.inert = true",
            "element.inert = wasInert",
            "inertBackgroundElements = []",
            "lightboxTrigger.isConnected",
        ):
            self.assertIn(contract, javascript)

    def test_gallery_toggle_label_is_optional(self):
        javascript = JS_FILE.read_text(encoding="utf-8")

        self.assertIn(
            "const toggleLabel = toggle.querySelector('span');", javascript
        )
        self.assertIn("if (toggleLabel)", javascript)

    def test_shared_css_retains_three_two_one_column_layout(self):
        css = CSS_FILE.read_text(encoding="utf-8")
        tablet_start = css.index("@media (max-width: 900px)")
        mobile_start = css.index("@media (max-width: 560px)", tablet_start)

        self.assertIn(
            "grid-template-columns: repeat(3, minmax(0, 1fr));",
            css[:tablet_start],
        )
        self.assertIn(
            ".gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }",
            css[tablet_start:mobile_start],
        )
        self.assertIn(
            ".gallery-grid { grid-template-columns: 1fr; }",
            css[mobile_start:],
        )


if __name__ == "__main__":
    unittest.main()
