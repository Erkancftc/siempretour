
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[data-country]').forEach(link => {
    const country = link.dataset.country;
    link.href = `template_tours_grid_page.html?country=${encodeURIComponent(country)}`;
  });
});

