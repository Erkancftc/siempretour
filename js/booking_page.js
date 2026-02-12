document.addEventListener("DOMContentLoaded", function () {

  const phoneInput = document.querySelector('input[type="tel"]');

  if (!phoneInput) return;

  phoneInput.addEventListener("input", function (e) {

    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("0")) {
      value = value.substring(1);
    }

    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    let formatted = "";

    if (value.length > 0) formatted = "0" + value.substring(0, 3);
    if (value.length >= 4) formatted += " " + value.substring(3, 6);
    if (value.length >= 7) formatted += " " + value.substring(6, 8);
    if (value.length >= 9) formatted += " " + value.substring(8, 10);

    e.target.value = formatted;
  });

});




(function initPersonCounter() {
    const input = document.getElementById('person-count');
    const input2 = document.getElementById('person-count-2');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    if (!input || !decreaseBtn || !increaseBtn) return;

    const syncInputs = () => {
        if (input2) {
            input2.textContent = input.value;
        }
    };

    const normalizeValue = () => {
        const current = parseInt(input.value, 10);
        if (Number.isNaN(current) || current < 1) {
            input.value = '1';
        } else {
            input.value = String(current);
        }
        syncInputs();
        return parseInt(input.value, 10);
    };

    decreaseBtn.addEventListener('click', () => {
        const current = normalizeValue();
        input.value = String(Math.max(1, current - 1));
        syncInputs();
    });

    increaseBtn.addEventListener('click', () => {
        const current = normalizeValue();
        input.value = String(current + 1);
        syncInputs();
    });

    input.addEventListener('input', normalizeValue);
    normalizeValue();
})();

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderTour(tour){
    const tourUrl = `template_tour_page.html?id=${tour.id}&country=${tour.destination}`;
    document.getElementById('tour-main-photo').innerHTML = `<a href="${tourUrl}" style="background-image: url(${tour.mainPhoto})"></a>
                        <div class="color-overlay"></div>`;
    document.getElementById('tour-name').innerHTML = `<a href="${tourUrl}">${tour.tourName}</a>`;
    document.getElementById('tour-destination').innerHTML = `<i class="icon-location-pin"></i>${tour.destination}`;
    document.getElementById('tour-duration').innerHTML = `${tour.durationDays} Gün`;
    document.getElementById('tour-price').innerHTML = `$${tour.price}`;
    document.getElementById('tour-price-big').innerHTML = `$${tour.price}`;
}

async function loadTourFromJson() {
  const id = getQueryParam("id");
  const country = getQueryParam("country");

  if (!id || !country) {
    console.error("id veya country eksik");
    return;
  }

  const dataRoot = "./data/big_siempre_tour_tours";
  const url = `${dataRoot}/${country}/tours.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Tours.json yüklenemedi");
    }

    const tours = await res.json();
    if (!Array.isArray(tours)) {
      throw new Error("Geçersiz JSON");
    }

    const tour = tours.find(t => String(t.id) === String(id));
    if (!tour) {
      console.error("Tur bulunamadı:", id);
      return;
    }

    renderTour(tour);

  } catch (err) {
    console.error("Tur yüklenirken hata:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadTourFromJson);
