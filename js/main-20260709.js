/* Lasila Küla — avalehe interaktsioonid */
(function () {
  'use strict';

  /* ---- Nav: taust scrollimisel ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobiilimenüü (lihtne lülitus) ---- */
  const burger = document.getElementById('burger');
  const links = document.querySelector('.nav__links');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.cssText = open ? '' :
        'display:flex;flex-direction:column;position:absolute;top:100%;right:16px;background:rgba(14,23,38,.97);padding:18px 22px;border-radius:14px;gap:14px;box-shadow:0 12px 30px rgba(0,0,0,.4)';
    });
    links.addEventListener('click', e => { if (e.target.tagName === 'A') links.style.cssText = ''; });
  }

  /* ---- Countdown 18.07.2026 10:00 (Eesti aeg ~ UTC+3) ---- */
  const target = new Date('2026-07-18T10:00:00+03:00').getTime();
  const el = id => document.getElementById(id);
  const countdownEls = ['cd-d','cd-h','cd-m','cd-s'].map(el);
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      countdownEls.forEach(item => item && (item.textContent = '0'));
      el('cd-d') && (el('cd-d').textContent = '0');
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff % 864e5 / 36e5);
    const m = Math.floor(diff % 36e5 / 6e4);
    const s = Math.floor(diff % 6e4 / 1e3);
    el('cd-d').textContent = d;
    el('cd-h').textContent = pad(h);
    el('cd-m').textContent = pad(m);
    el('cd-s').textContent = pad(s);
  }
  if (countdownEls.every(Boolean)) {
    tick(); setInterval(tick, 1000);
  }

  /* ---- Scroll-reveal animatsioon ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 0.06 + 's';
    io.observe(el);
  });

  /* ---- IBAN kopeerimine (ilma tühikuteta) ---- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const val = btn.getAttribute('data-copy') || '';
      try { await navigator.clipboard.writeText(val); }
      catch (e) {
        const t = document.createElement('textarea'); t.value = val;
        document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
      }
      const old = btn.innerHTML;
      btn.classList.add('done');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Kopeeritud!';
      setTimeout(() => { btn.classList.remove('done'); btn.innerHTML = old; }, 1800);
    });
  });

  /* ---- Jaga-nupp (Web Share API + fallback) ---- */
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const shareData = {
      title: document.title || 'MTÜ Lasila Küla',
      text: descriptionMeta ? descriptionMeta.content : 'MTÜ Lasila Küla koduleht.',
      url: window.location.href
    };
    shareBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (e) { /* kasutaja katkestas */ }
      } else {
        try { await navigator.clipboard.writeText(shareData.url); }
        catch (e) {
          const t = document.createElement('textarea'); t.value = shareData.url;
          document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
        }
        const old = shareBtn.innerHTML;
        shareBtn.classList.add('copied');
        shareBtn.innerHTML = '<i class="fa-solid fa-check"></i> Link kopeeritud!';
        setTimeout(() => { shareBtn.classList.remove('copied'); shareBtn.innerHTML = old; }, 2000);
      }
    });
  }

  /* ---- Leaflet kaart (Lasila külaplats) ---- */
  const mapEl = document.getElementById('map');
  if (mapEl && window.L) {
    const lat = 59.250511, lng = 26.218493;
    const map = L.map('map', { scrollWheelZoom: false }).setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Kohandatud oranž marker (lõke-teema)
    const icon = L.divIcon({
      className: 'lasila-marker',
      html: '<div style="width:38px;height:38px;background:linear-gradient(135deg,#E8541E,#F6A623);border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 6px 16px rgba(232,84,30,.5);display:grid;place-items:center;border:3px solid #fff;"><i class="fa-solid fa-location-dot" style="transform:rotate(45deg);color:#fff;font-size:15px;"></i></div>',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -36]
    });

    L.marker([lat, lng], { icon })
      .addTo(map)
      .bindPopup(
        '<h3>Lasila külaplats / laululava</h3>' +
        '<p>Siin toimuvad Lasila Jaanituli ja kogukonnapeod. Tere tulemast!</p>' +
        '<a href="https://www.google.com/maps?q=' + lat + ',' + lng + '" target="_blank" rel="noopener">Ava Google Mapsis →</a>'
      )
      .openPopup();

    // Klikiga lubatakse scroll-zoom (et leht ei "kinni jää")
    map.on('click', () => map.scrollWheelZoom.enable());
    map.on('mouseout', () => map.scrollWheelZoom.disable());

    // Suuruse fix kui sektsioon nähtavale tuleb
    setTimeout(() => map.invalidateSize(), 300);
  }

  /* ---- Jaanipäeva galerii lightbox ---- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let currentGalleryIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !lightboxImg || !galleryItems[index]) return;
    const item = galleryItems[index];
    const img = item.querySelector('img');
    currentGalleryIndex = index;
    lightboxImg.src = item.dataset.full || img.src;
    lightboxImg.alt = img.alt || '';
    if (lightboxCaption) {
      lightboxCaption.textContent = item.dataset.caption || img.alt || '';
    }
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function moveLightbox(step) {
    if (!galleryItems.length) return;
    const nextIndex = (currentGalleryIndex + step + galleryItems.length) % galleryItems.length;
    openLightbox(nextIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev && lightboxPrev.addEventListener('click', () => moveLightbox(-1));
  lightboxNext && lightboxNext.addEventListener('click', () => moveLightbox(1));
  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (event) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });
})();
