class MMCPeopleCards {
  /**
   * =========
   * Constructor
   */
  constructor() {
    if (document.readyState !== "loading") {
      this.init();
      return;
    }

    document.addEventListener("DOMContentLoaded", this.init, {once: true});
  }

  /**
   * =========
   * Init
   */
  init = () => {
    this.popupIsActive = false;
    this.cards = document.querySelectorAll('.mmd-people-grid-item[data-has-popup="1"]');

    // Bail if no popup-enabled cards are present
    if (!this.cards.length) {
      return;
    }

    // Prepare popup component
    this.preparePopup();

    // Append buttons to cards
    this.cards.forEach((card) => {
      card.insertAdjacentHTML("beforeend", `
        <button type="button" aria-label="Trigger popup" class="absolute z-20 inset-0 cursor-pointer"></button>
      `);
    });

    // Add click event listener
    document.addEventListener("click", this.popupTrigger);
  }

  /**
   * =========
   * Prepare popup component
   */
  preparePopup = () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add(
      "mmd-people-grid-popup",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "px-4",
      "bg-system-black/70",
      "fixed",
      "z-50",
      "inset-0",
      "size-full",
    );
    wrapper.setAttribute("hidden", "hidden");

    const innerWrapper = document.createElement("div");
    innerWrapper.classList.add(
      "mmd-people-grid-popup__inner-wrapper",
      "relative",
      "isolate",
      "size-full",
      "flex", "flex-col", "justify-center", "items-stretch",
    );
    innerWrapper.style.maxWidth = "40rem";
    innerWrapper.style.maxHeight = "90vh";
    innerWrapper.style.scrollbarWidth = "none";

    wrapper.append(innerWrapper);

    document.body.append(wrapper);
    this.popup = document.querySelector(".mmd-people-grid-popup");
    this.popupInnerWrapper = this.popup.querySelector(".mmd-people-grid-popup__inner-wrapper");
  }

  /**
   * =========
   * Add popup trigger
   */
  popupTrigger = (event) => {
    const target = event.target;
    const targetPopupCard = target.closest('.mmd-people-grid-item[data-has-popup="1"]');
    if (targetPopupCard && target.key !== "A") {
      event.preventDefault();
      // Construct data to pass to popup
      let data = {
        header: targetPopupCard.querySelector(".mmd-people-grid-item__header")?.outerHTML,
        socials: targetPopupCard.querySelector(".mmd-people-grid-item__socials")?.outerHTML,
        image: targetPopupCard.querySelector(".mmd-people-grid-item__image")?.outerHTML,
        content: targetPopupCard.querySelector(".mmd-people-grid-item__content")?.outerHTML,
      };

      this.showPopup(data);
    }
  }

  /**
   * =========
   * Show popup
   */
  showPopup = (data) => {
    const {header, socials, image, content} = data;

    const card = document.createElement("div");
    card.classList.add(
      "mmd-people-grid-popup-card",
      "bg-system-white",
      "mod--theme--light",
      "rounded-3px",
      "text-center",
      "relative",
      "isolate",
    );

    if (image) {
      card.insertAdjacentHTML("beforeend", image);
    }

    if (socials) {
      card.insertAdjacentHTML("beforeend", socials);
    }

    if (header) {
      card.insertAdjacentHTML("beforeend", header);
    }

    if (content) {
      card.insertAdjacentHTML("beforeend", content);
    }

    card.insertAdjacentHTML("afterbegin", `
      <button type="button" aria-label="Close popup" class="close-people-popup text-neutral-grey cursor-pointer absolute z-10 top-2 right-2">
        <svg width="20" height="20" aria-hidden="true">
          <use href="/wp-content/themes/marameodesign/assets/sprites/sprite.svg?15#X-Close"></use>
        </svg>
      </button>
    `);

    this.popupInnerWrapper.innerHTML = "";
    this.popupInnerWrapper.append(card);
    this.closePopupButton = this.popup.querySelector(".close-people-popup");
    this.popup.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    this.closePopupButton.addEventListener("click", this.popupClose);
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keydown", this.escToClose);
    this.popupIsActive = true;
  }

  /**
   * =========
   * Hide popup
   */
  hidePopup = () => {
    this.popup.setAttribute("hidden", "hidden");
    this.popupInnerWrapper.innerHTML = "";
    document.body.style.overflow = null;
    document.documentElement.style.overflow = null;
    this.closePopupButton.removeEventListener("click", this.popupClose);
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.escToClose);
    this.closePopupButton = null;
    this.popupIsActive = false;
  }

  /**
   * =========
   * Popup close
   */
  popupClose = (event) => {
    event.preventDefault();
    this.hidePopup();
  }

  /**
   * =========
   * Handle outside click
   */
  handleOutsideClick = (event) => {
    const directChildren = Array.from(this.popupInnerWrapper.children);
    if (directChildren.some(child => child.contains(event.target))) {
      return;
    }

    event.preventDefault();
    this.hidePopup();
  }

  /**
   * =========
   * "Escape" key to close
   */
  escToClose = (event) => {
    if (this.popupIsActive && (event.key === "Escape" || event.key === "Esc")) {
      event.preventDefault();
      this.hidePopup();
    }
  }
}

new MMCPeopleCards();