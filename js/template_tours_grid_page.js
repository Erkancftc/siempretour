async function loadTours() {
  const container = document.getElementById('tourCards');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const countryParam = params.get('country');

  if (!countryParam) {
    container.innerHTML =
      '<p>Ülke seçilmedi. Lütfen Turlar sayfasından bir ülke seç.</p>';
    return;
  }

  // 🔑 URL parametresini decode et (encode ETME!)
  const country = decodeURIComponent(countryParam);

  // ✅ Relative path (static server uyumlu)
  const toursUrl =
    `./data/big_siempre_tour_tours/${country}/tours.json`;

  console.log("COUNTRY:", country);
  console.log("TOURS URL:", toursUrl);

  try {
    const res = await fetch(toursUrl, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} → ${toursUrl}`);
    }

    const tours = await res.json();

    if (!Array.isArray(tours) || tours.length === 0) {
      container.innerHTML =
        `<p>${country} için şu anda tur bulunamadı.</p>`;
      return;
    }

    container.innerHTML = '';

    tours.forEach(tour => {
      const destination = tour.destination || '';
      const image = tour.image1 || tour.mainPhoto || '';
      const alt = tour.imagealt || tour.tourName || 'Tour image';
      const days = tour.durationDays || '';
      const price = tour.price || '';
      const title = tour.tourName || '';
      const places = tour.placesVisited || '';

      const dest1 = document.getElementById('tour-tab');
      dest1.innerHTML = `${destination} Genel Bakış`;

      const dest2 = document.getElementById('overview-tab');
      dest2.innerHTML = `${destination} Turları`;

      const dest3 = document.getElementById('theHeaderOne');
      dest3.innerHTML = `${destination}`;

      const dest4 = document.getElementById('theHeaderTwo');
      dest4.innerHTML = `${destination}`;

      const detailUrl = generateDetailUrl(tour.id);


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
                  <p class="mb-0">${price}$</p>
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
    container.innerHTML =
      `<p>Şu anda ${country} turları yüklenemiyor.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadTours);
