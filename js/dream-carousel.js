(function () {
  const buttons = document.querySelectorAll(
    '#food-btn, #history-btn, #beach-btn, #adventure-btn, #nature-btn'
  );
  const cards = document.querySelectorAll('.dream-caraousel[data-category]');
  const norm = s => (s || '').toLocaleLowerCase('tr').trim();

  function applyFilter(category) {
    const cat = norm(category);
    cards.forEach(card => {
      const matches = norm(card.dataset.category) === cat || cat === 'all';
      if (matches) {
        card.classList.add('d-flex');
        card.style.display = '';
      } else {
        card.classList.remove('d-flex');
        card.style.display = 'none';
      }
    });
  }

  // Buton tıklamaları
  buttons.forEach(btn => {
    btn.addEventListener('click', ev => {
      ev.preventDefault();
      const cat = (btn.dataset.cat || btn.id.replace(/-btn$/, '')).trim();

      // aria-selected güncelle
      buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');

      applyFilter(cat);
    });
  });

  // --- İLK ÇALIŞMA: food aktif ---
  document.addEventListener('DOMContentLoaded', () => {
    // aria-selected durumları
    buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
    const foodBtn = document.getElementById('food-btn');
    if (foodBtn) foodBtn.setAttribute('aria-selected', 'true');

    // filtre uygula
    applyFilter('food');
  });
})();

(function () {
  // 1️⃣ Tüm ay butonlarını seç
  const buttons = document.querySelectorAll('.tab-btn');

  // 2️⃣ Tüm ay içeriklerini seç
  const months = document.querySelectorAll('.month-selector');

  // 3️⃣ normalize fonksiyonu (küçük harfe çevirir)
  const norm = s => (s || '').toLocaleLowerCase('tr').trim();

  // 4️⃣ Filtreleme fonksiyonu
  function applyFilter(selectedMonth) {
    const month = norm(selectedMonth);

    months.forEach(card => {
      const cardMonth = norm(card.dataset.month);
      const match = cardMonth === month || month === 'all';

      if (match) {
        card.classList.add('d-flex');
        card.style.display = '';
      } else {
        card.classList.remove('d-flex');
        card.style.display = 'none';
      }
    });
  }

  // 5️⃣ Buton tıklamaları
  buttons.forEach(btn => {
    btn.addEventListener('click', ev => {
      ev.preventDefault();

      // id'den ay ismini çıkar (ör: jan-btn → jan)
      const monthShort = btn.id.replace('-btn', '').trim();
      const monthMap = {
        jan: 'january', feb: 'february', mar: 'march', apr: 'april',
        may: 'may', jun: 'june', jul: 'july', aug: 'august',
        sep: 'september', oct: 'october', nov: 'november', dec: 'december'
      };
      const fullMonth = monthMap[monthShort] || 'january';

      // aria-selected durumlarını sıfırla
      buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');

      // filtreyi uygula
      applyFilter(fullMonth);
    });
  });

  // 6️⃣ Sayfa ilk açıldığında Ocak (january) aktif olsun
  document.addEventListener('DOMContentLoaded', () => {
    buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
    const janBtn = document.getElementById('jan-btn');
    if (janBtn) janBtn.setAttribute('aria-selected', 'true');
    applyFilter('january');
  });
})();
