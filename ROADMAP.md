# Lasila.ee roadmap

## Sündmuste süsteem (tuleviku plaan)

Eesmärk: sündmuste haldus muutub poolautomaatseks, ilma et iga ürituse vahetus nõuaks avalehe käsitsi ümberkirjutamist.

### Idee

1. **Eraldi "Tulevased üritused" leht** (nt `/tulevased-uritused/`), kuhu saab üritusi blokkide kaupa pidevalt juurde lisada.
2. **Avaleht kuvab automaatselt järgmisena tuleva ürituse** sellest listist — hero ja ürituse sektsioon täituvad järgmise ürituse andmetega.
3. **Kui ürituse kuupäev möödub**, kuvatakse avalehel automaatselt listist järgmist üritust.
4. **Möödunud üritus arhiveeritakse** "Toimunud sündmused" alla (nagu Jaanituli 2026 ja Viitna matk praegu) — kokkuvõtte ja galerii saab hiljem käsitsi lisada.
5. Kui ühtegi tulevast üritust pole, jääb avalehel fookusesse staatiline Lasila kogukonna tutvustus (`#kogukond`).

### Tehniline lahendus (ilma backendita)

Kuna sait on staatiline (Hostinger, HTML/CSS/JS), saab selle teha kliendipoolse JS-iga:

- Üks andmefail `events.json`, kus iga ürituse kohta: nimi, kuupäev(ad), kellaaeg, koht, kirjeldus, plakati pilt, piletiinfo, lingid.
- Avalehe JS loeb `events.json`-i, valib esimese ürituse, mille kuupäev on tulevikus, ja renderdab hero + ürituse sektsiooni.
- "Tulevased üritused" leht renderdab kõik tulevased üritused blokkidena samast failist.
- Uue ürituse lisamine = üks kirje `events.json`-i + plakati pilt `images/` kausta.
- SEO jaoks tasub kaaluda, et põhisisu (title, meta, schema.org Event) genereeritaks siiski build-sammuga või uuendataks käsitsi, sest otsimootorid ei pruugi kliendipoolset renderdust alati korrektselt lugeda.

### Arhiveerimine

- Möödunud ürituse alamleht luuakse kausta `toimunud-sundmused/<urituse-nimi-aasta>/` (olemasolev muster).
- Kaart lisatakse arhiivi loendisse `toimunud-sundmused/index.html`.
- Tulevikus võiks ka arhiivi loend tulla samast `events.json` failist (üritused, mille kuupäev on möödas).
