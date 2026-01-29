document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-cascading-carousel]");

  carousels.forEach((carousel) => {
    const items = Array.from(
      carousel.querySelectorAll(".cascading-carousel__item")
    );
    const initialIndex = Math.floor(items.length / 2);
    let activeIndex = null;

    const clampIndex = (index) =>
      Math.max(0, Math.min(index, items.length - 1));

    const update = () => {
      const step = 18;
      const base = 50 - ((items.length - 1) / 2) * step;
      const layoutIndex = activeIndex === null ? initialIndex : activeIndex;

      items.forEach((item, index) => {
        const offset = index - layoutIndex;
        const absOffset = Math.abs(offset);
        const scale = Math.max(0.6, 1 - absOffset * 0.1);
        const left = base + index * step;
        const zIndex = 10 - absOffset;
        const opacity = 1;

        item.style.left = `${left}%`;
        item.style.transform = `translateX(-50%) scale(${scale})`;
        item.style.zIndex = zIndex;
        item.style.opacity = opacity;
        item.classList.toggle("is-active", index === activeIndex && activeIndex !== null);
        item.setAttribute("aria-hidden", index === activeIndex ? "false" : "true");
        item.tabIndex = index === activeIndex ? 0 : -1;
      });

    };

    const goTo = (index) => {
      activeIndex = clampIndex(index);
      update();
    };

    const resetToNeutral = () => {
      activeIndex = null;
      items.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-hidden", "false");
        item.tabIndex = -1;
      });
      update();
    };

    items.forEach((item, index) => {
      item.addEventListener("click", () => goTo(index));
      item.addEventListener("mouseenter", () => goTo(index));
    });

    carousel.addEventListener("mouseleave", () => {
      resetToNeutral();
    });

    let rafId = null;
    const handleMove = (event) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const hit = document.elementFromPoint(event.clientX, event.clientY);
        const item = hit ? hit.closest(".cascading-carousel__item") : null;
        if (!item) return;
        const index = items.indexOf(item);
        if (index !== -1) {
          goTo(index);
        }
      });
    };

    carousel.addEventListener("mousemove", handleMove);

    let touchStartX = null;
    carousel.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.touches[0].clientX;
      },
      { passive: true }
    );

    carousel.addEventListener("touchend", (event) => {
      if (touchStartX === null) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        const baseIndex = activeIndex === null ? initialIndex : activeIndex;
        goTo(baseIndex + (deltaX < 0 ? 1 : -1));
      }
      touchStartX = null;
    });

    window.addEventListener("resize", update);
    resetToNeutral();
  });
});
