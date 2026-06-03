# Lasila Kogukonnaportaal — Avaleht

Lasila küla kogukonnaportaali avaleht, mis keerleb aktuaalseima sündmuse — **Lasila Jaanituli (20.06.2026)** — ümber. Staatiline sait (HTML/CSS/JS).

## Valmis funktsioonid (MVP)

- **Hero-bänner** — sündmuse pealkiri, kuupäev, asukoht ja CTA-nupud
- **Countdown** — loendur kuni 20.06.2026 18:00
- **Ajakava** — vertikaalne timeline (10:00–hilisõhtu)
- **Lisategevused** — mõis, näomaalingud, batuut, loterii, toidukaravan, jäätiseauto
- **Toetajad** — logo ja tekstipõhised toetajakaardid
- **Annetuse plokk** — IBAN + kopeerimisnupp
- **Külaplats/mõis** — toimumiskoha sektsioon
- **Kaart** — OpenStreetMap (Leaflet), marker Lasila külaplatsil (59.253, 26.218)
- **Jalus** — kontaktid ja kiirlingid
- **SEO / OG** — meta tagid ja struktuurandmed sotsiaalmeedia jagamiseks
- Animatsioonid: scroll-reveal, lendavad sädemed, sujuvad üleminekud
- Täielikult responsiivne (mobiil / tahvel / desktop)

## Lehe struktuur

| Sektsioon | Ankur |
|-----------|-------|
| Hero | `#hero` |
| Ajakava | `#ajakava` |
| Lisategevused | `#tegevused` |
| Toetajad | `#toetajad` |
| Annetus | `#annetus` |
| Külaplats | `#koht` |
| Kaart | `#kaart` |

## Disain

- Värvid: lõke-oranž `#E8541E`, öösinine `#0E1726`, soe kreem `#FBF6EE`, maastiku-roheline `#2E5E3A`
- Fondid: Sora (pealkirjad) + Inter (sisu), Google Fonts
- Ikoonid: Font Awesome 6
- Favicon: `favicon.svg` (lõketema)

## Kontakt ja annetus

- **Saaja:** MTÜ Lasila Küla
- **Annetuste IBAN:** EE97 1010 0119 7394 2229
- **Selgitus:** Jaanituli 2026
- **Telefon:** 5635 6399
- **E-post:** lasilakyla@gmail.com
- **Veeb:** www.lasila.ee
- **Facebook:** MTÜ Lasila Küla

## Failistruktuur

```
index.html
favicon.svg
css/style.css
js/main.js
images/
  jaanitule-lokke.jpg   # hero taust
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
