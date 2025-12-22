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
  document.getElementById('currentDestination').textContent = tour.destination || "";
  document.getElementById('tourTitle').textContent = tour.tourName || "";
  document.getElementById('tourTitle2').textContent = tour.tourName || "";

  if (tour.mainPhoto) {
    document.getElementById('mainPhoto').style =
      `background-image:url(${tour.mainPhoto});`;
  }

  document.getElementById('placesVisited').textContent = tour.placesVisited || "";
  document.getElementById('generalInfo').innerHTML = tour.generalInfo || "";
  document.getElementById('whatExpect').innerHTML = tour.whatExpect || "";

  document.getElementById('durationDays').innerHTML =
    `<i class="fa fa-clock-o pink mr-1"></i>${tour.durationDays ?? ""} gün`;

  document.getElementById('personNumber').innerHTML =
    `<i class="fa fa-group pink mr-1"></i>Kişi Sayısı : ${tour.personNumber ?? ""}`;

  document.getElementById('dates').innerHTML =
    `<i class="fa fa-calendar pink mr-1"></i>${tour.dates ?? ""}`;

  document.getElementById('minimumAge').innerHTML =
    `<i class="fa fa-user pink mr-1"></i>Min. Yaş : ${tour.minimumAge ?? ""}`;

  document.getElementById('meet').innerHTML =
    `<i class="fa fa-map-signs pink mr-1"></i>Karşılama : ${tour.meet ?? ""}`;

  const mapEl = document.getElementById('mappp');
  mapEl.innerHTML = tour.map
    ? `<iframe src="${tour.map}" width="600" height="450" style="border:0" loading="lazy"></iframe>`
    : "";

  const setImg = (id, url) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = url ? `<img src="${url}" alt="${tour.imagealt || ""}">` : "";
  };

  ["1","2","3","4","5","6"].forEach(n => {
    setImg(`image${n}`, tour[`image${n}`]);
    setImg(`image${n}${n}`, tour[`image${n}`]);
  });

  renderDayInfo(tour.dayInfo);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* 🔥 AKILLI LOADER */
async function loadTourFromJson() {
  const id = getQueryParam("id");
  const country = getQueryParam("country");

  if (!id) {
    console.error("URL'de id yok");
    return;
  }

  // 1️⃣ country varsa → direkt o ülke
  if (country) {
    const url = `data/turlar/siempretour_tours/${encodeURIComponent(country)}/tours.json`;
    const tour = await findTourInFile(url, id);
    if (tour) return renderTour(tour);
  }

  // 2️⃣ country yoksa → TÜM ülkelerde ara
  console.warn("Country yok, tüm ülkeler taranıyor…");

  const COUNTRIES = [
    "Almanya","Avusturya","Birleşik Krallık","Fransa","İtalya",
    "İspanya","İsviçre","Amerika","Türkiye","Yunanistan"
  ];

  for (const c of COUNTRIES) {
    const url = `data/turlar/siempretour_tours/${encodeURIComponent(c)}/tours.json`;
    const tour = await findTourInFile(url, id);
    if (tour) {
      console.log("Tur bulundu:", c);
      return renderTour(tour);
    }
  }

  console.error("Tur hiçbir ülkede bulunamadı:", id);
}

async function findTourInFile(url, id) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const tours = await res.json();
    if (!Array.isArray(tours)) return null;
    return tours.find(t => String(t.id) === String(id)) || null;
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", loadTourFromJson);
