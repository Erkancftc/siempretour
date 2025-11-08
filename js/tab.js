/* tabs.js
   - .nav-link butonlarına tıklayınca ilgili .tab-pane'i açar
   - aria-selected / tabindex / active-show sınıflarını doğru yönetir
   - URL hash (#home-tab-pane gibi) ile derin bağ destekler
   - Klavye: Sol/sağ ok ile sekmeler arası geçiş
*/

(function () {
  // === Seçiciler ===
  const tabList    = document.getElementById('myTab');
  const tabButtons = tabList ? tabList.querySelectorAll('.nav-link') : [];
  const tabContent = document.getElementById('myTabContent');
  const tabPanes   = tabContent ? tabContent.querySelectorAll('.tab-pane') : [];

  if (!tabList || !tabContent || tabButtons.length === 0 || tabPanes.length === 0) {
    // Yapı eksikse sessizce çık.
    return;
  }

  // === Yardımcılar ===
  function deactivateAll() {
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabPanes.forEach(pane => {
      pane.classList.remove('show', 'active');
      // Erişilebilirlik: kapalı paneller odaklanmasın
      pane.setAttribute('tabindex', '-1');
      pane.setAttribute('aria-hidden', 'true');
    });
  }

  function activateTab(btn, pushHash = true) {
    const targetSel = btn.getAttribute('data-bs-target'); // örn: "#home-tab-pane"
    const target = targetSel ? document.querySelector(targetSel) : null;
    if (!target) return;

    deactivateAll();

    // Buton
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.focus({ preventScroll: true });

    // Panel
    target.classList.add('active'); // önce active
    // reflow hilesi (fade geçişi için)
    // void target.offsetWidth;
    target.classList.add('show');
    target.removeAttribute('tabindex');
    target.setAttribute('aria-hidden', 'false');

    // URL hash senkronu (geri/ileri çalışır, SEO'yu bozmaz)
    if (pushHash) {
      try {
        history.replaceState(null, '', targetSel);
      } catch (_) {}
    }
  }

  function buttonByTargetSelector(sel) {
    for (const btn of tabButtons) {
      if (btn.getAttribute('data-bs-target') === sel) return btn;
    }
    return null;
  }

  // === Olaylar ===
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(btn, true);
    });

    // Klavye gezinme: Sol/Sağ oklar
    btn.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const btns = Array.from(tabButtons);
      const i = btns.indexOf(btn);
      const nextIndex = e.key === 'ArrowRight'
        ? (i + 1) % btns.length
        : (i - 1 + btns.length) % btns.length;
      activateTab(btns[nextIndex], true);
    });
  });

  // === İlk yüklemede hangi tab açık olsun? (hash öncelikli) ===
  function initFromHash() {
    const hash = window.location.hash; // "#home-tab-pane" gibi
    if (hash) {
      const btn = buttonByTargetSelector(hash);
      if (btn) {
        activateTab(btn, false);
        return;
      }
    }
    // Hash yoksa HTML'de "show active" olanı koru; yoksa ilkini aç
    const alreadyActiveBtn = tabList.querySelector('.nav-link.active');
    if (alreadyActiveBtn) {
      activateTab(alreadyActiveBtn, false);
    } else {
      activateTab(tabButtons[0], false);
    }
  }

  // Geri/ileri tuşlarında hash değişirse sekmeyi güncelle
  window.addEventListener('hashchange', () => {
    const btn = buttonByTargetSelector(window.location.hash);
    if (btn) activateTab(btn, false);
  });

  // Basit tutarlılık doğrulamaları (geliştirici konsoluna uyarı)
  (function validateWiring() {
    const ids = new Set();
    let duplicateId = false;
    tabButtons.forEach(b => {
      const id = b.id;
      if (id) {
        if (ids.has(id)) duplicateId = true;
        ids.add(id);
      }
      const sel = b.getAttribute('data-bs-target');
      if (!sel || !document.querySelector(sel)) {
        console.warn('[tabs] data-bs-target bulunamadı:', sel, b);
      }
    });
    if (duplicateId) {
      console.warn('[tabs] Aynı id birden fazla butonda kullanılıyor. id değerleri benzersiz olmalı.');
    }
  })();

  // Başlat
  initFromHash();
})();
