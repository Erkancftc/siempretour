console.log("tour page photos js loaded");

async function renderTourPagePhotos() {
  if (typeof _countrySlug === "undefined" || !_countrySlug) return;

  const photos = [
    document.getElementById("tour_page_photo1"),
    document.getElementById("tour_page_photo2"),
    document.getElementById("tour_page_photo3"),
    document.getElementById("tour_page_photo4"),
  ];

  if (photos.some(p => !p)) return;

  const usedImages = [];

  try {
    /* ===============================
       1️⃣ COUNTRY DATAS
    ================================ */
    const res = await fetch(
      `data/siempre_tour_country_datas/${_countrySlug}/datas.json`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const datas = await res.json();

      const overview = datas.find(d => d.type === "overview");
      const bestTime = datas.find(d => d.type === "best-time-to");

      if (overview?.image1) usedImages.push(overview.image1);
      if (overview?.image2) usedImages.push(overview.image2);

      if (bestTime?.image1) usedImages.push(bestTime.image1);
      if (bestTime?.image2) usedImages.push(bestTime.image2);
    }
  } catch (e) {
    console.warn("Country datas okunamadı, fallback'a geçiliyor");
  }

  /* ===============================
     2️⃣ FALLBACK → TOURS
  ================================ */
  if (usedImages.length < 4) {
    try {
      const tourRes = await fetch(
        `data/big_siempre_tour_tours/${_countrySlug}/tours.json`,
        { cache: "no-store" }
      );

      if (tourRes.ok) {
        const tours = await tourRes.json();
        const tour = tours?.[0];

        if (tour) {
          ["image1", "image2", "image3", "image4"].forEach(key => {
            if (tour[key]) usedImages.push(tour[key]);
          });
        }
      }
    } catch (e) {
      console.error("Tour fallback da okunamadı:", e);
    }
  }

  /* ===============================
     3️⃣ DOM’A BAS
  ================================ */
  photos.forEach((el, i) => {
    if (usedImages[i]) {
      el.style.backgroundImage = `url(${usedImages[i]})`;
      el.classList.add("has-image");
    } else {
      el.style.display = "none";
    }
  });
}

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", renderTourPagePhotos);
