function renderDayInfo(dayInfo) {
  const container = document.getElementById('daysAccordion');
  if (!container) return;

  container.innerHTML = "";

  if (!Array.isArray(dayInfo) || dayInfo.length === 0) return;

  dayInfo.forEach((day, index) => {
    const isActive = index === 0 ? " active" : "";
    const display = index === 0 ? "block" : "none";

    const acc = document.createElement('div');
    acc.className = "accrodion" + isActive;

    acc.innerHTML = `
      <div class="accrodion-title rounded">
        <h5 class="mb-0">
          <span>${day.dayNumber || index + 1}. Gün</span> - ${day.title || ""}
        </h5>
      </div>
      <div class="accrodion-content" style="display:${display}">
        <div class="inner">
          <p>${day.description || ""}</p>
        </div>
      </div>
    `;

    container.appendChild(acc);
  });

  initAccordions();
}

function renderTour(tour) {
  // document.getElementById('currentDestination').textContent = tour.destination || "";
  document.getElementById('tourTitle').textContent = tour.tourName || "";
  document.getElementById('tourTitle2').textContent = tour.tourName || "";

  // if (tour.mainPhoto) {
  //   document.getElementById('mainPhoto').style =
  //     `background-image:url(${tour.mainPhoto});`;
  // }

  document.getElementById('placesVisited').textContent = tour.placesVisited || "";
  document.getElementById('generalInfo').innerHTML = tour.generalInfo || "";
  document.getElementById('whatExpect').innerHTML = tour.whatExpect || "";

  document.getElementById('durationDays').innerHTML =
    `<i class="fa fa-clock-o pink mr-1"></i>${tour.durationDays ?? ""} gün`;

  const mapEl = document.getElementById('mappp');
  mapEl.innerHTML = tour.map
    ? `<iframe src="${tour.map}" width="600" height="450" style="border:0" loading="lazy"></iframe>`
    : "";

  /* ✅ IMG FIX (innerHTML YOK) */
  const setImg = (id, url) => {
    const img = document.getElementById(id);
    if (!img) return;
    img.src = url || "";
    img.alt = tour.imagealt || "";
  };

  ["1","2","3","4","5","6"].forEach(n => {
    setImg(`image${n}`, tour[`image${n}`]);
    setImg(`image${n}${n}`, tour[`image${n}`]);
  });

  renderDayInfo(tour.dayInfo);

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(initTourSliders);
  } else {
    setTimeout(initTourSliders, 0);
  }
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function initTourSliders() {
  if (!window.jQuery || !jQuery.fn || !jQuery.fn.slick) return;

  const $store = jQuery('.slider-store');
  const $thumbs = jQuery('.slider-thumbs');

  if (!$store.length || !$thumbs.length) return;
  if (!$store.children().length || !$thumbs.children().length) return;

  if ($store.hasClass('slick-initialized')) $store.slick('unslick');
  if ($thumbs.hasClass('slick-initialized')) $thumbs.slick('unslick');

  $store.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    direction: 'vertical',
    arrows: false,
    dots: false,
    fade: true,
    autoplay: true,
    asNavFor: '.slider-thumbs'
  });

  $thumbs.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-store',
    dots: false,
    arrows: false,
    autoplay: true,
    direction: 'vertical',
    centerMode: true,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 800,
      settings: {
        arrows: false
      }
    }]
  });

  $store.slick('setPosition');
  $thumbs.slick('setPosition');
}

/* 🔥 FINAL LOADER */
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
