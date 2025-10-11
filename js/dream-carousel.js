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