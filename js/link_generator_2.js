function generateDetailUrl(tourId) {
    const country = new URLSearchParams(window.location.search).get("country");
    if (!country || !tourId) return "#";

    return `template_tour_page.html?id=${encodeURIComponent(tourId)}&country=${encodeURIComponent(country)}`;
}
