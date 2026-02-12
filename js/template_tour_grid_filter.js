// ===============================
// SIEMPRE TOUR FILTER - SIDEBAR VERSION
// ===============================

document.addEventListener('DOMContentLoaded', function () {

  const params = new URLSearchParams(window.location.search);
  const countryParam = params.get('country');
  const categoryParam = params.get('category');

  const cardsContainer = document.getElementById('tourCards');
  if (!cardsContainer) return;
  const centeredSidebar = document.querySelector('.sidebar-sticky-center');
  const sidebarColumn = centeredSidebar ? centeredSidebar.parentElement : null;
  const DESKTOP_LEFT_SHIFT = -16;

  // URL'de category varsa sidebar gizle
  if (categoryParam) {
    const sidebar = document.querySelector('.sidebar-sticky');
    if (sidebar) sidebar.style.display = 'none';
    return;
  }

  const filterCheckboxes = document.querySelectorAll('.sidebar-category1 input[type="checkbox"]');

  let allTours = [];

  const normalize = (s) => (s ?? '').toString().trim();

  function resetCenteredSidebarStyles() {
    if (!centeredSidebar) return;

    centeredSidebar.style.position = '';
    centeredSidebar.style.top = '';
    centeredSidebar.style.left = '';
    centeredSidebar.style.width = '';
    centeredSidebar.style.transform = '';
  }

  function applyDesktopLeftShiftInFlow() {
    if (!centeredSidebar) return;

    if (window.matchMedia('(max-width: 991.98px)').matches) {
      centeredSidebar.style.transform = '';
      return;
    }

    centeredSidebar.style.transform = `translateX(${DESKTOP_LEFT_SHIFT}px)`;
  }

  function updateCenteredSidebarPosition() {
    if (!centeredSidebar || !sidebarColumn) return;

    if (window.matchMedia('(max-width: 991.98px)').matches) {
      resetCenteredSidebarStyles();
      return;
    }

    sidebarColumn.style.position = 'relative';

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const sidebarHeight = centeredSidebar.offsetHeight;
    const fixedTop = Math.round((viewportHeight - sidebarHeight) / 2);

    const columnRect = sidebarColumn.getBoundingClientRect();
    const columnStyles = window.getComputedStyle(sidebarColumn);
    const padLeft = parseFloat(columnStyles.paddingLeft) || 0;
    const padRight = parseFloat(columnStyles.paddingRight) || 0;
    const contentLeft = columnRect.left + padLeft;
    const contentWidth = Math.max(0, columnRect.width - padLeft - padRight);
    const columnTop = window.scrollY + columnRect.top;
    const startScrollY = columnTop - fixedTop;
    const endScrollY = columnTop + sidebarColumn.offsetHeight - sidebarHeight - fixedTop;
    if (endScrollY <= startScrollY) {
      resetCenteredSidebarStyles();
      return;
    }

    if (window.scrollY <= startScrollY) {
      resetCenteredSidebarStyles();
      applyDesktopLeftShiftInFlow();
      return;
    }

    if (window.scrollY >= endScrollY) {
      centeredSidebar.style.position = 'absolute';
      centeredSidebar.style.top = `${Math.max(0, sidebarColumn.offsetHeight - sidebarHeight)}px`;
      centeredSidebar.style.left = `${Math.round(padLeft + DESKTOP_LEFT_SHIFT)}px`;
      centeredSidebar.style.width = `${Math.round(contentWidth)}px`;
      centeredSidebar.style.transform = '';
      return;
    }

    centeredSidebar.style.position = 'fixed';
    centeredSidebar.style.top = `${fixedTop}px`;
    centeredSidebar.style.left = `${Math.round(contentLeft + DESKTOP_LEFT_SHIFT)}px`;
    centeredSidebar.style.width = `${Math.round(contentWidth)}px`;
    centeredSidebar.style.transform = '';
  }

  function buildToursUrl(country) {
    return `./data/big_siempre_tour_tours/${country}/tours.json`;
  }

  // ===============================
  // FETCH TOURS
  // ===============================

  async function fetchTours() {

    if (!countryParam) return;

    const country = decodeURIComponent(countryParam);
    const url = buildToursUrl(country);

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const tours = await res.json();
      allTours = Array.isArray(tours) ? tours : [];

      updateCategoryCounts();
      requestSidebarPositionUpdate();

    } catch (err) {
      console.error("Filter fetch error:", err);
    }
  }

  // ===============================
  // CATEGORY COUNT
  // ===============================

  function updateCategoryCounts() {

    const categoryCounts = {};

    allTours.forEach(tour => {
      const cat = normalize(tour.category);
      if (!cat) return;

      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    filterCheckboxes.forEach(cb => {
      const value = normalize(cb.value);
      const countSpan = cb.parentElement.querySelector('.count');
      const listItem = cb.closest('li');
      const count = categoryCounts[value] || 0;

      if (countSpan) {
        countSpan.textContent = count;
      }

      if (listItem) {
        listItem.style.display = count > 0 ? 'block' : 'none';
      }
    });
  }

  // ===============================
  // FILTER LOGIC
  // ===============================

  function filterCards(selectedCategories) {

    const cards = cardsContainer.querySelectorAll('.tour-card');

    cards.forEach((card, index) => {

      const tour = allTours[index];
      if (!tour) return;

      const tourCategory = normalize(tour.category);

      if (selectedCategories.includes(tourCategory)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function showAllCards() {
    const cards = cardsContainer.querySelectorAll('.tour-card');
    cards.forEach(card => card.style.display = '');
  }

  // ===============================
  // EVENT LISTENERS
  // ===============================

  filterCheckboxes.forEach(cb => {
    cb.addEventListener('change', function () {

      const selected = Array.from(filterCheckboxes)
        .filter(c => c.checked)
        .map(c => normalize(c.value));

      if (selected.length === 0) {
        showAllCards();
        return;
      }

      filterCards(selected);
    });
  });

  // ===============================
  // INIT
  // ===============================

  let sidebarRafId = 0;
  function requestSidebarPositionUpdate() {
    if (sidebarRafId) return;
    sidebarRafId = window.requestAnimationFrame(() => {
      sidebarRafId = 0;
      updateCenteredSidebarPosition();
    });
  }

  requestSidebarPositionUpdate();
  window.addEventListener('scroll', requestSidebarPositionUpdate, { passive: true });
  window.addEventListener('resize', requestSidebarPositionUpdate);
  window.addEventListener('load', requestSidebarPositionUpdate);
  fetchTours();

});
