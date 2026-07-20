# Universaalne sündmuste galerii

## Eesmärk

Luua staatilisele Lasila veebile korduvkasutatav pildigalerii, mida saab kasutada kõigil sündmuste alamlehtedel. Jaanitule lehele lisatakse ZIP-failis olevad fotod, kuid olemasolevad kuus galeriipilti ja nende originaalfailid säilitatakse.

## Piltide töötlemine

- ZIP-faili sisu imporditakse kausta `images/jaanituli-2026/`.
- Täpsed duplikaadid eemaldatakse galerii valikust, kuid olemasolevaid saidi pilte ei kustutata.
- Iga imporditud foto saab veebisõbraliku failinime.
- Galerii jaoks luuakse kaks versiooni:
  - `thumb/`: väike WebP-eelvaade ruudustiku jaoks;
  - `full/`: optimeeritud WebP-versioon lightbox'i jaoks.
- Täissuuruses versiooni pikem külg on kuni 1920 px. Pildi proportsioone ei muudeta.

## Universaalne komponent

Iga galerii märgitakse HTML-is `data-gallery` atribuudiga ja saab määrata algse nähtavate piltide arvu, näiteks `data-initial-count="9"`.

- Kui pilte on kuni üheksa, kuvatakse kõik ja laiendamisnuppu ei lisata.
- Kui pilte on rohkem, kuvatakse alguses üheksa pilti ja nupp „Näita kõiki pilte”.
- Nupu vajutamisel laaditakse ning kuvatakse ülejäänud eelvaated.
- Nupu tekst muutub pärast avamist tekstiks „Näita vähem”.
- Lahendus toetab mitut galeriid samal lehel.

## Lightbox

- Pildil klõpsamine avab suure versiooni olemasoleva tumeda lightbox'i kujundusega.
- Edasi- ja tagasinupud, nooleklahvid ning Escape-klahv säilivad.
- Sirvimine toimub ainult parajasti avatud galerii piltide vahel.
- Pildi all kuvatakse eestikeelne kirjeldus ja järjekorranumber, näiteks „7 / 40”.
- Avamisel viiakse klaviatuuri fookus sulgemisnupule; sulgemisel taastatakse fookus algsele pildile.

## Jaanitule galerii

- Algvaates kuvatakse üheksa esinduslikku fotot.
- Praegused kuus pilti jäävad galerii koosseisu.
- ZIP-ist lisatakse kõik unikaalsed sündmusefotod; identset reklaamplakatit ei kuvata kaks korda.
- Failinimedest tuletatavad kirjeldused korrastatakse loomulikuks eesti keeleks.

## Jõudlus ja ligipääsetavus

- Algvaate eelvaated kasutavad `loading="lazy"`.
- Peidetud piltide `src` lisatakse alles galerii laiendamisel.
- Galerii elemendid jäävad päris nuppudeks, et neid saaks kasutada klaviatuuriga.
- Piltidel on sisulised `alt`-tekstid ning juhtnuppudel `aria-label` atribuudid.
- Lahendus töötab ühe, kahe ja kolme veeruga vastavalt olemasolevatele murdepunktidele.

## Kontroll

- Kontrollitakse Jaanitule ja Viitna sündmuse lehte töölaua- ning mobiililaiusel.
- Kontrollitakse „Näita kõiki” ja „Näita vähem” käitumist.
- Kontrollitakse lightbox'i hiire, klaviatuuri ja puutevaates.
- Kontrollitakse, et kõik pildi- ja leheviited vastavad HTTP 200-ga ning konsoolis pole JavaScripti vigu.
