document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(
    ".mmd-gallery.mod--display--carousel"
  );
  if (!galleries.length) {
    return;
  }

  galleries.forEach(gallery => {
    const main = gallery.querySelector(".mmd-gallery__main");
    const mainImages = main.querySelectorAll(".wp-block-mmd-image img");
    const imagesData = Array.from(mainImages).map(img => {
      return {
        src: img.currentSrc ? img.currentSrc : img.src,
        alt: img.alt ?? "",
      };
    });

    // Wrap main carousel items in .splide__slide wrapper
    wrapSliderItems(mainImages);

    // Construct thumbnails
    gallery.append(createThumbnails(imagesData));

    const thumbs = gallery.querySelector(".mmd-gallery__thumbnails");

    // Init carousel
    const mainCarousel = new Splide(main, {
      type: "loop",
      pagination: false,
      arrows: false,
    });

    const thumbnails = new Splide(thumbs, {
      rewind: true,
      autoWidth: true,
      isNavigation: true,
      gap: 12,
      pagination: false,
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
      breakpoints: {
        768: {
          gap: 8,
        },
      },
    });

    mainCarousel.sync(thumbnails);
    mainCarousel.mount();
    thumbnails.mount();
  });

  // Wrap main carousel items in splide__slide divs
  // Note: We are wrapping this via JS so it's simpler to convert to blocks
  function wrapSliderItems(images) {
    images.forEach(img => {
      const wrapper = img.closest(".wp-block-mmd-image");
      if (
        wrapper &&
        !wrapper.parentElement.classList.contains("splide__slide")
      ) {
        const slide = document.createElement("div");
        slide.classList.add("splide__slide", "mmd-content");

        // Insert new wrapper before the old one, then move the content inside
        wrapper.parentNode.insertBefore(slide, wrapper);
        slide.appendChild(wrapper);
      }
    });
  }

  // Create the thumbnails and arrow nav
  function createThumbnails(images) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("mmd-gallery__thumbnails", "mt-6", "splide");
    wrapper.ariaLabel =
      "Selecting a thumbnail will change the Beautiful Gallery carousel.";
    wrapper.innerHTML = `
        <div class="splide__track">
          <div class="splide__list"></div>
        </div>
      `;

    // Add thumb images
    const splideList = wrapper.querySelector(".splide__list");
    images.forEach(img => {
      const slideWrapper = document.createElement("div");
      slideWrapper.classList.add(
        "splide__slide",
        "hover:opacity-65",
        "focus:opacity-65",
        "[&.is-active]:opacity-65"
      );

      const thumb = document.createElement("img");
      thumb.classList.add("mmd-gallery__thumbnail", "cursor-pointer");
      thumb.src = img.src;
      thumb.alt = img.alt;
      thumb.loading = "lazy";
      thumb.decoding = "async";
      thumb.width = "236";
      thumb.height = "158";

      slideWrapper.append(thumb);
      splideList.append(slideWrapper);
    });

    // Add arrow nav
    wrapper.insertAdjacentHTML(
      "beforeend",
      `
        <div class="splide__arrows splide__arrows--ltr mt-4 gap-3 flex justify-center items-center">
          <button class="splide__arrow splide__arrow--prev cursor-pointer flex justify-center items-center rounded-sm p-1 size-10 transition-all" type="button" aria-label="Previous slide">
            <svg aria-hidden="true" width="16" height="16" class="pointer-events-none">
              <use href="/wp-content/themes/marameodesign/assets/sprites/sprite.svg?10#ArrowLeft"></use>
            </svg>
          </button>
          <button class="splide__arrow splide__arrow--next cursor-pointer flex justify-center items-center rounded-sm p-1 size-10 transition-all" type="button" aria-label="Next slide">
            <svg aria-hidden="true" width="16" height="16" class="pointer-events-none">
              <use href="/wp-content/themes/marameodesign/assets/sprites/sprite.svg?10#ArrowRight2"></use>
            </svg>
          </button>
        </div>
      `
    );

    return wrapper;
  }
});
