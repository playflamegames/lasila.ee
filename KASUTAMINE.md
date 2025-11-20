# AI Huviring - Kasutamisjuhend

Põhjalik juhend veebilehe kasutamiseks, kohandamiseks ja avaldamiseks.

## 📖 Sisukord

1. [Kiirstart](#kiirstart)
2. [Sisu Muutmine](#sisu-muutmine)
3. [Disaini Kohandamine](#disaini-kohandamine)
4. [Sessioonide Haldamine](#sessioonide-haldamine)
5. [Deployment](#deployment)
6. [Probleemide Lahendamine](#probleemide-lahendamine)

---

## 🚀 Kiirstart

### Testimiseks Kohalikult

1. **Ava fail brauseris:**
   ```bash
   # Lihtsalt topeltklõps index.html failil
   # Või käsurealt:
   open index.html        # macOS
   start index.html       # Windows
   xdg-open index.html    # Linux
   ```

2. **Live Server (VS Code):**
   ```bash
   # Installi Live Server extension
   # Klõpsa index.html-l paremklahviga
   # Vali "Open with Live Server"
   ```

---

## ✏️ Sisu Muutmine

### 1. Hero Sektsiooni Muutmine

**Fail:** `index.html` (read ~40-80)

```html
<!-- Pealkiri -->
<h1 class="hero-title">
    Avasta AI Võlumaailma!
</h1>

<!-- Alapealkiri -->
<p class="hero-subtitle">
    Tasuta AI huviring Rakvere Valla noortele Lasilas.<br>
    Õpi looma pilte, videosid, mänge, muusikat ja palju muud!
</p>
```

**Stat kaartide muutmine:**
```html
<div class="stat-card">
    <div class="stat-icon">👥</div>
    <div class="stat-content">
        <div class="stat-number">20</div>
        <div class="stat-label">Osalejat (väike grupp)</div>
    </div>
</div>
```

### 2. Floating Badges Muutmine

**Fail:** `index.html` (read ~90-150)

**Badge värvi muutmine:**
```html
<!-- Badge 1 - Roosa gradient -->
<div class="floating-badge badge-1" style="--delay: 0s; --duration: 3s;">
    <div class="badge-icon">🎨</div>
    <div class="badge-text">Pildiloome</div>
</div>
```

**Fail:** `css/style.css` (read ~300-350)

```css
/* Muuda badge asukoht ja värv */
.badge-1 {
    top: 10%;              /* Ülevalt */
    left: 15%;             /* Vasakult */
    background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
    color: white;
}
```

**Badge lisamine:**
1. Kopeeri üks olemasolev badge HTML-is
2. Muuda class nime (nt `.badge-9`)
3. Muuda ikoon ja tekst
4. Lisa CSS-is vastav stiil

### 3. Moodulite Muutmine

**Fail:** `index.html` (read ~220-320)

```html
<!-- Moodul 5 - Audio & Muusika -->
<div class="module-card module-5">
    <div class="module-number">05</div>
    <div class="module-icon">🎵</div>
    <h3 class="module-title">Audio & Muusika</h3>
    <p class="module-description">
        AI muusika loomine, podcast'id, heliefektid ja raadiosaated.
    </p>
    <div class="module-topics">
        <span class="topic-tag">Muusika</span>
        <span class="topic-tag">Podcast</span>
        <span class="topic-tag">Helid</span>
    </div>
    <div class="module-sessions">2 sessiooni</div>
</div>
```

### 4. Kontakti Info Muutmine

**Fail:** `index.html` (read ~550-650)

```html
<div class="info-card">
    <div class="info-icon">📍</div>
    <h3>Asukoht</h3>
    <p>Lasila, Rakvere Vald<br>Täpne aadress saadetakse registreerinutele</p>
</div>

<div class="info-card">
    <div class="info-icon">📧</div>
    <h3>E-mail</h3>
    <p><a href="mailto:info@aihuviring.ee">info@aihuviring.ee</a></p>
</div>
```

---

## 🎨 Disaini Kohandamine

### 1. Värvide Muutmine

**Fail:** `css/style.css` (read 1-30)

```css
:root {
    /* Põhivärvid */
    --primary: #667eea;           /* Lilla */
    --primary-dark: #5a67d8;      /* Tumedam lilla */
    --secondary: #764ba2;          /* Roosa-lilla */
    --accent: #f093fb;             /* Roosa */
    
    /* Hero gradient */
    --hero-gradient: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
}
```

**Näide - Muuda siniseks:**
```css
:root {
    --primary: #3b82f6;           /* Sinine */
    --primary-dark: #2563eb;      /* Tumedam sinine */
    --secondary: #06b6d4;          /* Tsüaan */
    --accent: #8b5cf6;             /* Violett */
    
    --hero-gradient: linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%);
}
```

### 2. Fontide Muutmine

**Fail:** `css/style.css` (read ~25)

```css
:root {
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Näide - Muuda Poppins:**
```css
/* 1. Lisa index.html <head> sektsioonis: */
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

/* 2. Muuda CSS-is: */
:root {
    --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 3. Border Radius Muutmine

```css
:root {
    --radius-sm: 8px;    /* Väike radius */
    --radius-md: 12px;   /* Keskmine */
    --radius-lg: 16px;   /* Suur */
    --radius-xl: 24px;   /* Väga suur */
}
```

**Ümaraks (rounded):**
```css
:root {
    --radius-sm: 12px;
    --radius-md: 16px;
    --radius-lg: 20px;
    --radius-xl: 32px;
}
```

---

## 📚 Sessioonide Haldamine

### 1. Sessiooni Lisamine

**Fail:** `js/sessions-data.js`

```javascript
const sessionsData = [
    // ... olemasolevad sessioonid ...
    
    // UUS SESSIOON
    {
        id: 25,
        number: "Sessioon 25",
        title: "Uue Sessiooni Pealkiri",
        category: "alused",  // alused, pildid, video, mangud, audio, praktiline, eetika
        module: "Moodul 1: AI Alused",
        description: "Lühike kirjeldus siin.",
        topics: ["Teema 1", "Teema 2", "Teema 3"],
        duration: "2x 45 min",
        details: {
            goal: "Sessiooni eesmärk",
            activities: [
                "Tegevus 1",
                "Tegevus 2",
                "Tegevus 3"
            ],
            tools: ["Tööriist 1", "Tööriist 2"],
            homework: "Koduülesanne siin"
        }
    }
];
```

### 2. Sessiooni Muutmine

Leia sessioon `id` järgi ja muuda vajalikke välju:

```javascript
{
    id: 13,
    number: "Sessioon 13",
    title: "MUUDETUD PEALKIRI",  // <-- Muuda siin
    description: "MUUDETUD KIRJELDUS",  // <-- Muuda siin
    // ...
}
```

### 3. Sessiooni Eemaldamine

Lihtsalt kustuta vastav objekt `sessionsData` massiivist.

---

## 🚀 Deployment

### GitHub Pages

```bash
# 1. Loo GitHub repo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# 2. GitHub'is:
# Settings → Pages → Source: main branch → Save

# 3. Sinu veebileht on valmis:
# https://USERNAME.github.io/REPO/
```

### Netlify (Kõige Lihtsam)

**Variant 1 - Drag & Drop:**
1. Mine [netlify.com](https://netlify.com)
2. Logi sisse (GitHub/GitLab/Email)
3. Lohista kogu projektikaust Netlify lehele
4. Valmis! URL: `https://random-name-123.netlify.app`

**Variant 2 - CLI:**
```bash
# Installi Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Järgi juhiseid
```

### Vercel

```bash
# Installi Vercel CLI
npm i -g vercel

# Deploy
vercel

# Järgi juhiseid
```

### Custom Domain

**GitHub Pages:**
1. Lisa fail `CNAME` projektile:
   ```
   www.aihuviring.ee
   ```
2. DNS seaded domeenil:
   ```
   CNAME www USERNAME.github.io
   ```

**Netlify:**
1. Netlify Dashboard → Domain Settings
2. Lisa custom domain
3. Järgi DNS juhiseid

---

## 🔧 Probleemide Lahendamine

### 1. Sessioonid Ei Kuvata

**Probleem:** `sessionsGrid` on tühi

**Lahendus:**
1. Ava brauseri konsool (F12)
2. Kontrolli vigu:
   ```
   Uncaught ReferenceError: sessionsData is not defined
   ```
3. Veendu, et `sessions-data.js` on laetud ENNE `main.js`:
   ```html
   <script src="js/sessions-data.js"></script>
   <script src="js/main.js"></script>
   ```

### 2. Floating Badges Ei Liigu

**Probleem:** Badges on staatilised

**Lahendus:**
Kontrolli, et CSS animatsioon on defineeritud:
```css
@keyframes float-badge {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-15px) rotate(2deg);
    }
}
```

### 3. Mobile Menüü Ei Tööta

**Probleem:** Hamburger menüü ei ava

**Lahendus:**
Kontrolli, et JavaScript on laetud:
```javascript
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
```

### 4. Modal Ei Ava

**Probleem:** Sessioon kaardile klõpsates ei juhtu midagi

**Lahendus:**
1. Kontrolli konsoolist vigu
2. Veendu, et modal HTML on olemas:
   ```html
   <div class="modal" id="sessionModal">
   ```

### 5. Stiilid Ei Laadi

**Probleem:** Leht on ilma stiilita

**Lahendus:**
1. Kontrolli CSS linki:
   ```html
   <link rel="stylesheet" href="css/style.css">
   ```
2. Veendu, et tee on õige (nt kui fail on kasutas `/css/style.css`)

---

## 📝 Näpunäited

### 1. Kasuta Git'i
```bash
# Enne muudatusi:
git add .
git commit -m "Muudan hero sektsiooni"

# Kui midagi läheb valesti:
git reset --hard HEAD
```

### 2. Testi Mitmetes Brauserites
- Chrome
- Firefox
- Safari
- Edge
- Mobile (Chrome/Safari)

### 3. Optimeeri Pildid
```bash
# Kui lisad pilte, optimeeri need:
# https://tinypng.com
# https://squoosh.app
```

### 4. Kontrolli Kiirust
```bash
# Google PageSpeed Insights:
# https://pagespeed.web.dev/
```

---

## 🆘 Abi Vajate?

Kui midagi ei tööta:
1. Kontrolli brauseri konsooli (F12) → Console
2. Vaata README.md faili
3. Võta ühendust

---

**Edu veebilehe kasutamisega! 🚀**