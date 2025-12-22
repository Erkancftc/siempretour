async function loadTours() {
  const container = document.getElementById('tourCards');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const country = params.get('country');

  if (!country) {
    container.innerHTML = '<p>Ülke seçilmedi. Lütfen Destinations sayfasından bir ülke seç.</p>';
    return;
  }

  // ✅ Absolute path
  const toursUrl = `/data/turlar/siempretour_tours/${encodeURIComponent(country)}/tours.json`;

  try {
    console.log("COUNTRY:", country);
    console.log("TOURS URL:", toursUrl);

    const res = await fetch(toursUrl, { cache: "no-store" });
    if (!res.ok) {
      throw new Error('HTTP hata: ' + res.status + ' | ' + toursUrl);
    }

    const tours = await res.json();

    if (!Array.isArray(tours) || tours.length === 0) {
      container.innerHTML = `<p>${country} için şu anda tur bulunamadı.</p>`;
      return;
    }

    container.innerHTML = '';

    tours.forEach(tour => {
      const image = tour.image1 || tour.mainPhoto || '';
      const alt = tour.imagealt || tour.tourName || 'Tour image';
      const days = tour.durationDays || '';
      const price = tour.price || '';
      const title = tour.tourName || '';
      const places = tour.placesVisited || '';

      const detailUrl = tour.id
        ? `template_tour_page.html?id=${encodeURIComponent(tour.id)}&country=${encodeURIComponent(country)}`
        : '#';

      const cardHtml = `
        <div class="tour-card col-lg-4 col-md-4 mb-3">
          <div class="pb-4 mb-0">
            <div class="ratio ratio-16x9 overflow-hidden">
              ${image ? `<img class="hover-zoom" src="${image}" alt="${alt}">` : ''}
              <div class="color-overlay"></div>
            </div>

            <div class="trend-content p-0 pt-2 position-relative">
              <div class="entry-meta d-flex justify-content-between align-items-center mb-0">
                <div class="entry-author">
                  <p class="mb-0">${days ? `${days} günlük tur` : ''}</p>
                </div>
                <div class="entry-price text-end">
                  <p class="mb-0">${price}</p>
                </div>
              </div>

              <h5 class="mb-1">
                <a href="${detailUrl}">${title}</a>
              </h5>

              <p class="border-b pb-2 mb-2">
                ${places}
              </p>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', cardHtml);
    });

  } catch (err) {
    console.error('Turlar yüklenirken hata:', err);
    container.innerHTML = `<p>Şu anda ${country} turları yüklenemiyor.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadTours);
