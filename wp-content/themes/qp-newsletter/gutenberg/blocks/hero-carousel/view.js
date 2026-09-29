import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", () => {
  const heroCarousels = document.querySelectorAll(
    ".mmd-hero-carousel.splide"
  );
  if (!heroCarousels.length) {
    return;
  }

  heroCarousels.forEach(carouselEl => {
    if (carouselEl.dataset.splideMounted) {
      return;
    }

    const splide = new Splide(carouselEl, {
      type: "loop",
      perPage: 1,
      perMove: 1,
      arrows: false,
      pagination: false,
      autoplay: false,
      speed: 700,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      drag: true,
    });

    splide.mount();
    carouselEl.dataset.splideMounted = "true";
  });
});
