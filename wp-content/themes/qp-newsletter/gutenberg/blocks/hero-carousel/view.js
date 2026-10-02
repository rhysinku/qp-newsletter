import Splide from "@splidejs/splide";

function initHeroCarousels() {
  const heroCarousels = document.querySelectorAll(".mmd-hero-carousel.splide");
  if (!heroCarousels.length) {
    return;
  }

  heroCarousels.forEach(carouselEl => {
    if (carouselEl.dataset.splideMounted || carouselEl.classList.contains("is-initialized")) {
      return;
    }

    const splide = new Splide(carouselEl, {
      type: "loop",
      perPage: 1,
      perMove: 1,
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 6000,
      pauseOnHover: true,
      speed: 700,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      drag: true,
    });

    splide.mount();
    carouselEl.dataset.splideMounted = "true";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroCarousels);
} else {
  initHeroCarousels();
}
