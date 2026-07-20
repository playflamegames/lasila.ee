# Universal Event Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 34 unique ZIP photos to the existing six-image Jaanituli gallery and turn the gallery into a reusable, progressively loaded component for every event page.

**Architecture:** Event pages declare galleries with `data-gallery` and `data-initial-count`. Shared CSS controls the responsive grid and collapsed state; shared JavaScript initializes each gallery independently, progressively loads hidden thumbnails, and scopes the existing lightbox to the active gallery. Optimized thumbnail and full-size WebP derivatives live under an event-specific image directory.

**Tech Stack:** Static HTML5, CSS3, vanilla JavaScript, Python 3 standard-library tests, temporary Pillow environment for image conversion, headless Google Chrome for browser verification.

## Global Constraints

- Preserve the existing six gallery entries and all existing source image files.
- Import 34 unique ZIP images; the archive contains 35 files with one exact duplicate advertisement.
- Show nine images initially on the Jaanituli page.
- Use `images/jaanituli-2026/thumb/` and `images/jaanituli-2026/full/`.
- Full images have a maximum long edge of 1920 px; image proportions remain unchanged.
- Hidden thumbnail URLs are assigned only when the gallery is expanded.
- One shared gallery implementation must work on both the Jaanituli and Viitna event pages.
- Do not create a git commit unless the user explicitly requests one.

---

### Task 1: Static gallery contract tests

**Files:**
- Create: `tests/test_gallery.py`
- Test: `tests/test_gallery.py`

**Interfaces:**
- Consumes: event HTML files and image paths relative to each HTML document.
- Produces: standard-library `unittest` checks for `data-gallery`, initial-count configuration, image metadata, and local asset existence.

- [ ] **Step 1: Write failing structure tests**

Create `tests/test_gallery.py` using `html.parser.HTMLParser`. The parser records elements with `data-gallery`, gallery item buttons, nested image `src`/`data-src` values, `data-full`, `data-caption`, and the expand button. Add tests that require:

```python
def test_both_event_pages_use_universal_gallery(self):
    self.assertEqual(self.jaanituli.initial_count, "9")
    self.assertEqual(self.viitna.initial_count, "9")

def test_jaanituli_has_40_unique_items(self):
    self.assertEqual(len(self.jaanituli.items), 40)
    self.assertEqual(len({item.full for item in self.jaanituli.items}), 40)

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
            self.assertTrue(resolve_asset(gallery.page, item.src or item.data_src).is_file())
```

- [ ] **Step 2: Run tests and confirm the expected failure**

Run:

```bash
python3 -m unittest tests/test_gallery.py -v
```

Expected: failures because neither event page has `data-gallery`, Jaanituli has only six items, and optimized image assets do not exist.

### Task 2: Import and optimize Jaanituli photographs

**Files:**
- Create: `images/jaanituli-2026/thumb/*.webp`
- Create: `images/jaanituli-2026/full/*.webp`
- Source: `/Users/anderkumm/Desktop/Lasila sait/Lasila Pildid/jaanituli 2026.zip`

**Interfaces:**
- Consumes: 35 JPEG archive entries.
- Produces: 34 uniquely named thumbnail/full WebP pairs; names are lowercase ASCII slugs derived from source names.

- [ ] **Step 1: Verify source count and duplicate**

Run a Python `zipfile`/SHA-256 check. Expected output:

```text
files: 35
unique: 34
duplicate: Lasila Jaanituli 20.06.2026 reklaam.jpg | Lasila Jaanituli 20.06.2026 reklaam (1).jpg
```

- [ ] **Step 2: Create a temporary image-processing environment**

Run:

```bash
python3 -m venv /tmp/lasila-gallery-venv
/tmp/lasila-gallery-venv/bin/pip install Pillow
```

Expected: Pillow installs successfully without changing project dependencies.

- [ ] **Step 3: Generate optimized derivatives**

Use a one-off Python script with `zipfile`, `hashlib`, `unicodedata`, and Pillow:

- skip repeated SHA-256 content;
- normalize EXIF orientation with `ImageOps.exif_transpose`;
- convert non-RGB images to RGB;
- create `thumb` images with a maximum long edge of 720 px and WebP quality 78;
- create `full` images with a maximum long edge of 1920 px and WebP quality 84;
- sanitize names to lowercase ASCII slugs and add numeric suffixes on collisions.

Expected: exactly 34 files in each output directory.

- [ ] **Step 4: Validate generated assets**

Run a Python/Pillow validation that asserts:

```python
assert len(list(thumb_dir.glob("*.webp"))) == 34
assert len(list(full_dir.glob("*.webp"))) == 34
assert all(max(Image.open(path).size) <= 720 for path in thumb_dir.glob("*.webp"))
assert all(max(Image.open(path).size) <= 1920 for path in full_dir.glob("*.webp"))
```

Expected: all assertions pass.

### Task 3: Implement the reusable gallery component

**Files:**
- Modify: `css/style-20260709.css` gallery/lightbox sections
- Modify: `js/main-20260709.js` gallery/lightbox section
- Modify: `toimunud-sundmused/lasila-jaanituli-2026/index.html` gallery markup
- Modify: `toimunud-sundmused/taimetarkuste-matk-viitna-2026/index.html` gallery markup

**Interfaces:**
- Consumes: `[data-gallery][data-initial-count]`, `.gallery-item`, `[data-gallery-toggle]`, image `data-src`, and item `data-full`/`data-caption`.
- Produces: independent expandable galleries and one active-gallery lightbox state.

- [ ] **Step 1: Add universal gallery markup**

For each event page:

```html
<div class="gallery" data-gallery data-initial-count="9">
  <div class="gallery-grid">
    <button class="gallery-item" type="button"
      data-full="../../images/example/full/photo.webp"
      data-caption="Kirjeldus">
      <img src="../../images/example/thumb/photo.webp"
        alt="Kirjeldus" loading="lazy">
      <span class="gallery-overlay">
        <span class="gallery-caption">Lühike kirjeldus</span>
      </span>
    </button>
  </div>
  <div class="gallery-actions">
    <button class="btn btn--ghost gallery-toggle" type="button"
      data-gallery-toggle aria-expanded="false">
      <i class="fa-solid fa-images"></i>
      <span>Näita kõiki pilte</span>
    </button>
  </div>
</div>
```

Jaanitule first nine items use `src`; remaining 31 use a transparent placeholder `src`, their actual thumbnail URL in `data-src`, and `hidden`. Keep the current six entries in the first nine positions, followed by three representative imported photos. Add the remaining 31 imported entries with natural Estonian captions. Viitna keeps its single existing image and omits the toggle at runtime because its item count is below nine.

- [ ] **Step 2: Add shared gallery styles**

Add generic styles for:

```css
.gallery-actions { display: flex; justify-content: center; margin-top: 28px; }
.gallery-toggle[hidden] { display: none; }
.gallery-item[hidden] { display: none; }
.lightbox-counter { color: rgba(255,255,255,.62); text-align: center; margin-top: 6px; }
```

Retain the existing 3/2/1-column responsive grid and hover treatment.

- [ ] **Step 3: Refactor JavaScript to initialize each gallery**

Replace the global `galleryItems` array with:

```javascript
const galleries = Array.from(document.querySelectorAll('[data-gallery]'));
let activeGalleryItems = [];
let currentGalleryIndex = 0;
let lightboxTrigger = null;

galleries.forEach(gallery => {
  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  const initialCount = Number.parseInt(gallery.dataset.initialCount || '9', 10);
  const toggle = gallery.querySelector('[data-gallery-toggle]');

  items.forEach((item, index) => {
    item.hidden = index >= initialCount;
    item.addEventListener('click', () => {
      activeGalleryItems = items.filter(candidate => !candidate.hidden);
      lightboxTrigger = item;
      openLightbox(activeGalleryItems.indexOf(item));
    });
  });

  if (!toggle || items.length <= initialCount) {
    if (toggle) toggle.hidden = true;
    return;
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    items.slice(initialCount).forEach(item => {
      item.hidden = expanded;
      const image = item.querySelector('img[data-src]');
      if (!expanded && image && !image.dataset.loaded) {
        image.src = image.dataset.src;
        image.dataset.loaded = 'true';
      }
    });
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.querySelector('span').textContent =
      expanded ? 'Näita kõiki pilte' : 'Näita vähem';
  });
});
```

Update `openLightbox`, `moveLightbox`, and `closeLightbox` to use `activeGalleryItems`, set the new counter to `${index + 1} / ${activeGalleryItems.length}`, focus the close button on open, and return focus to `lightboxTrigger` on close.

- [ ] **Step 4: Add lightbox counter markup**

Add below `.lightbox-caption` on both event pages:

```html
<div class="lightbox-counter" id="lightbox-counter" aria-live="polite"></div>
```

- [ ] **Step 5: Run static tests**

Run:

```bash
python3 -m unittest tests/test_gallery.py -v
```

Expected: all tests pass.

### Task 4: Browser and regression verification

**Files:**
- Modify if required by findings: `css/style-20260709.css`
- Modify if required by findings: `js/main-20260709.js`
- Modify if required by findings: both event HTML pages

**Interfaces:**
- Consumes: completed static gallery component.
- Produces: verified desktop/mobile behavior with no broken resources or console errors.

- [ ] **Step 1: Start a local static server**

Run:

```bash
python3 -m http.server 8912
```

Expected: the site responds at `http://localhost:8912/`.

- [ ] **Step 2: Verify Jaanitule desktop and mobile behavior**

Using headless Chrome at 1440×900 and 390×844:

- exactly nine tiles are visible initially;
- the toggle reveals all 40 items and changes to „Näita vähem”;
- collapsing restores nine items;
- hidden thumbnails are not requested before expansion;
- the lightbox counter and next/previous navigation stay within the Jaanitule gallery;
- Escape closes the lightbox and restores focus.

- [ ] **Step 3: Verify Viitna regression**

Confirm its single-image gallery has no visible toggle, opens in the lightbox, shows `1 / 1`, and has no console errors.

- [ ] **Step 4: Verify resources and page links**

Check all local HTML, CSS, JS, thumbnail, and full-image URLs. Expected: HTTP 200 for every resource and no browser console errors.

- [ ] **Step 5: Review the final diff**

Run:

```bash
git status --short
git diff --stat
git diff --check
```

Expected: only the gallery spec/plan, tests, shared CSS/JS, two event HTML pages, and new `images/jaanituli-2026/` assets are changed; `git diff --check` emits no errors.
