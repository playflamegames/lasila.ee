# Lasila Kogukonnaportaal — Avaleht

Lasila küla kogukonnaportaali avaleht, mis toob esile aktuaalseima sündmuse — **Taimetarkuste matk Viitna järvede ümber (27.06.2026)** — ning viitab eraldi toimunud sündmuste arhiivile. Staatiline sait (HTML/CSS/JS).

## Valmis funktsioonid (MVP)

- **Hero-bänner** — kogukonna tutvustus, aktuaalse sündmuse fookus ja CTA-nupud
- **Countdown** — loendur kuni 27.06.2026 11:00
- **Matka sektsioon** — Viitna järvede matka detailid, osaluspanus, registreerimine ja plakat
- **Toimunud sündmused** — eraldi arhiivileht sündmuste kaartidega
- **Jaanituli 2026 alamleht** — kokkuvõte, toimunud kava, toetajate tänu ja pildigalerii koos lightbox-vaaturiga
- **Annetuse plokk** — IBAN + kopeerimisnupp
- **Jalus** — kontaktid ja kiirlingid
- **SEO / OG** — meta tagid ja struktuurandmed sotsiaalmeedia jagamiseks
- Animatsioonid: scroll-reveal, lendavad sädemed, sujuvad üleminekud
- Täielikult responsiivne (mobiil / tahvel / desktop)

## Lehe struktuur

| Sektsioon | Ankur |
|-----------|-------|
| Hero | `#hero` |
| Taimetarkuste matk | `#matk` |
| Toimunud sündmused | `#toimunud-sundmused` |
| Annetus | `#annetus` |

Toimunud sündmuste alamlehed:

| Leht | URL |
|------|-----|
| Arhiiv | `/toimunud-sundmused/` |
| Lasila Jaanituli 2026 | `/toimunud-sundmused/lasila-jaanituli-2026/` |

## Disain

- Värvid: lõke-oranž `#E8541E`, öösinine `#0E1726`, soe kreem `#FBF6EE`, maastiku-roheline `#2E5E3A`
- Fondid: Sora (pealkirjad) + Inter (sisu), Google Fonts
- Ikoonid: Font Awesome 6
- Favicon: `favicon.svg` (lõketema)

## Kontakt ja annetus

- **Saaja:** MTÜ Lasila Küla
- **Annetuste IBAN:** EE97 1010 0119 7394 2229
- **Selgitus:** Kogukonna tegevused
- **E-post:** lasilakyla@gmail.com
- **Veeb:** www.lasila.ee
- **Facebook:** MTÜ Lasila Küla

## Failistruktuur

```
index.html
favicon.svg
css/style.css
js/main.js
toimunud-sundmused/
  index.html
  lasila-jaanituli-2026/
    index.html
images/
  viitna-matk-poster.png # aktuaalse sündmuse plakat
  jaanitule-lokke.jpg   # jaanipäeva galerii
  mois-peahoone.jpg     # mõisa sektsioon
  logo-*.png|jpg        # toetajate logod
  ...                   # varupildid
```

## Avaldamine

1. Pushi muudatused GitHubi (`main` haru).
2. Hostinger deploy'ib automaatselt GitHubist (kui webhook on seadistatud).
3. Kontrolli live leht: https://www.lasila.ee

## Kohalik testimine

Ava `index.html` brauseris või kasuta lihtsat staatilist serverit:

```bash
python3 -m http.server 8080
```

Seejärel ava http://localhost:8080

## Muudatused ja deploy

Live leht kasutab versioonitud asset-faile:

```html
<link rel="stylesheet" href="css/style-20260625.css" />
<script src="js/main-20260625.js"></script>
```

See murrab Hostingeri/CDN-i vana `css/style.css` cache'i ning töötab ka lokaalselt
(topeltklõps `index.html`-il). Kui CSS-i või JS-i oluliselt muudad, tee uus
failinimi (nt `style-20260605.css`) ja uuenda `index.html` viidet.

Seejärel tee `git add . && git commit && git push`. Kui brauser ikka näitab vana
versiooni, tee kõva värskendus: `Cmd + Shift + R`.
