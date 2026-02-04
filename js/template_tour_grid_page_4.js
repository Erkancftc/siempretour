console.log("weather chart js yüklendi");

/* ===============================
   COUNTRY SLUG (URL’den al) 
   (ÖNEMLİ: countrySlug ismini kullanmıyoruz, çakışmasın diye)
================================ */
const _countrySlug = new URLSearchParams(window.location.search).get("country");

/* ===============================
   WEATHER CHART RENDER
================================ */
async function renderWeatherChart() {
  if (!_countrySlug) return;

  const container = document.getElementById("weatherChartSection");
  if (!container) return;

  try {
    const res = await fetch(
      `data/siempre_tour_country_datas/${_countrySlug}/datas.json`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      container.innerHTML = "";
      return;
    }

    const datas = await res.json();

    const bestTime = datas.find(d => d.type === "best-time-to");
    if (!bestTime || !bestTime.weather_chart_html) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = bestTime.weather_chart_html;
  } catch (err) {
    console.error("Weather chart yüklenemedi:", err);
    container.innerHTML = "";
  }
}

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", renderWeatherChart);
