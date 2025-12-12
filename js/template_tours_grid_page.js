
async function loadTours() {
  const container = document.getElementById('tourCards');
  if (!container) return;

  try {
    
    const res = await fetch('data/tours.json');
    if (!res.ok) {
      throw new Error('HTTP hata: ' + res.status);
    }

    const tours = await res.json(); 

    container.innerHTML = ''; 

    tours.forEach(tour => {
      const image = tour.image1;
      const alt = tour.imagealt;
      const days = tour.durationDays;
      const price = tour.price;
      const title = tour.tourName;
      const places = tour.placesVisited;

      const detailUrl = `template_tour_page.html?id=${encodeURIComponent(tour.id)}`;

      const cardHtml = `
                <div class="tour-card col-lg-4 col-md-4 mb-3">
                    <div class="pb-4 mb-0 ">
                        <div class="ratio ratio-16x9 overflow-hidden">
                            <img class="hover-zoom" src="${image}" alt="${alt}">
                            <div class="color-overlay"></div>
                        </div>
                        <div class="trend-content p-0 pt-2 position-relative">
                            
                            <div class="entry-meta d-flex justify-content-between align-items-center mb-0">
                                <div class="entry-author">
                                    <p class="mb-0">${days} günlük tur</p>
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
    container.innerHTML = '<p>Şu anda turlar yüklenemiyor.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadTours);

