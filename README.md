# Lasila Kogukonnaportaal — Avaleht

Lasila küla kogukonnaportaali avaleht, mis toob esile aktuaalseima sündmuse — **Lasila Bürger 2026 (19.09.2026, Lasila Kuivatis)** — ning püsiva Lasila kogukonna tutvustuse. Toimunud sündmustel on eraldi arhiiv. Staatiline sait (HTML/CSS/JS).

Tuleviku plaanid (sh automaatne sündmuste vahetus avalehel) on kirjas failis [ROADMAP.md](ROADMAP.md).

## Valmis funktsioonid (MVP)

- **Hero-bänner** — kogukonna tutvustus, aktuaalse sündmuse fookus ja CTA-nupud
- **Countdown** — loendur kuni 19.09.2026 12:00
- **Lasila Bürger 2026 sektsioon** — kuupäev, koht, plakat; täpsem kava lisandub peagi
- **Unustatud mõisad 2026 alamleht** — kokkuvõte ja plakat (galerii saab hiljem lisada)
- **Lasila kogukonna sektsioon** — püsiv tutvustustekst ja foto (jääb lehele ka siis, kui üritusi pole)
- **Toimunud sündmused** — eraldi arhiivileht sündmuste kaartidega
- **Jaanituli 2026 alamleht** — kokkuvõte, toimunud kava, toetajate tänu ja pildigalerii koos lightbox-vaaturiga
- **Viitna matka 2026 alamleht** — kokkuvõte ja plakat (galerii saab hiljem lisada)
- **Annetuse plokk** — IBAN + kopeerimisnupp
- **Jalus** — kontaktid ja kiirlingid
- **SEO / OG** — meta tagid ja struktuurandmed sotsiaalmeedia jagamiseks
- Animatsioonid: scroll-reveal, sujuvad üleminekud
- Täielikult responsiivne (mobiil / tahvel / desktop)

## Lehe struktuur

| Sektsioon | Ankur |
|-----------|-------|
| Hero | `#hero` |
| Lasila Bürger 2026 | `#lasila-burger` |
| Lasila kogukond | `#kogukond` |
| Toimunud sündmused | `#toimunud-sundmused` |
| Annetus | `#annetus` |

Toimunud sündmuste alamlehed:

| Leht | URL |
|------|-----|
| Arhiiv | `/toimunud-sundmused/` |
| Unustatud mõisad 2026 | `/toimunud-sundmused/unustatud-moisad-2026/` |
| Taimetarkuste matk Viitna 2026 | `/toimunud-sundmused/taimetarkuste-matk-viitna-2026/` |
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
ROADMAP.md
css/style-20260820.css   # aktiivne stiilifail
js/main-20260820.js      # aktiivne skript (countdown, lightbox jm)
toimunud-sundmused/
  index.html
  unustatud-moisad-2026/
    index.html
  taimetarkuste-matk-viitna-2026/
    index.html
  lasila-jaanituli-2026/
    index.html
images/
  lasila-burger-hero.jpg         # Bürgeri päikeseloojangu taust
  lasila-burger-2026-poster.png # aktuaalse sündmuse plakat
  unustatud-moisad-2026-poster.png # Unustatud mõisad plakat (arhiiv)
  kogukond.jpg          # kogukonna sektsiooni foto
  viitna-matk-poster.png # Viitna matka plakat (arhiiv)
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
<link rel="stylesheet" href="css/style-20260820.css" />
<script src="js/main-20260820.js"></script>
```

See murrab Hostingeri/CDN-i vana cache'i ning töötab ka lokaalselt
(topeltklõps `index.html`-il). Kui CSS-i või JS-i oluliselt muudad, tee uus
failinimi (nt `style-20260801.css`) ja uuenda viiteid kõigil HTML-lehtedel.

Seejärel tee `git add . && git commit && git push`. Kui brauser ikka näitab vana
versiooni, tee kõva värskendus: `Cmd + Shift + R`.
