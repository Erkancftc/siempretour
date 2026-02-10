document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[data-country]').forEach(link => {
    const country = link.dataset.country;
    const category = link.dataset.category; // 👈 YENİ

    let url = `template_tours_grid_page.html?country=${encodeURIComponent(country)}`;

    // 🔥 category varsa URL'ye ekle
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    link.href = url;
  });
});
