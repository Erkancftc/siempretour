const country = new URLSearchParams(location.search).get("country");
const detailUrl = `template_tour_page.html?id=${encodeURIComponent(tour.id)}&country=${encodeURIComponent(country)}`;
