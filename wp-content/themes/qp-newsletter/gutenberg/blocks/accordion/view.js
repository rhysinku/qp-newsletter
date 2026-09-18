/**
 * Accordion
 */
class Accordion {
  constructor(block) {
    this.block = block;
    this.items = Array.from(this.block.querySelectorAll(".mmd-accordion-item"));
    this.closeInactiveItems = this.block.dataset.closeInactiveItems === "1";
    this.accordionItems = [];
  }

  /**
   * Initialize
   */
  init = () => {
    if (this.items.length) {
      this.items.forEach(item => {
        const accordionItem = new AccordionItem(item, this);
        accordionItem.init();
        this.accordionItems.push(accordionItem);
      });
    }
  };

  /**
   * Close all other items except the active one
   */
  closeOthers = activeItem => {
    if (!this.closeInactiveItems) {
      return;
    }

    this.accordionItems.forEach(item => {
      if (item !== activeItem && item.isActive) {
        item.close();
      }
    });
  };
}

/**
 * Accordion Item
 */
class AccordionItem {
  constructor(block, parentAccordion) {
    this.block = block;
    this.parent = parentAccordion;
    this.isActive = false;
    this.button = this.block.querySelector(".accordion-button");
    this.arrow = this.block.querySelector(".accordion-arrow");
    this.arrowIcon = this.arrow.querySelector('use');
    this.contentId = this.button.getAttribute("aria-controls");
    this.content = this.block.querySelector(`#${this.contentId}`);
  }

  /**
   * Initialize
   */
  init = () => {
    this.button.addEventListener("click", this.handleClick);
  };

  /**
   * Handle accordion click event
   */
  handleClick = () => {
    if (!this.isActive) {
      this.open();
    } else {
      this.close();
    }
  };

  /**
   * Open accordion
   */
  open = () => {
    this.isActive = true;
    this.parent.closeOthers(this);

    this.button.setAttribute("aria-expanded", "true");
    this.arrowIcon.setAttribute('href', '/wp-content/themes/marameodesign/assets/sprites/sprite.svg?v=11#Minus');

    this.content.classList.remove("max-h-0");
    this.content.style.maxHeight = "0px";

    requestAnimationFrame(() => {
      this.content.style.maxHeight = `${this.content.scrollHeight}px`;
    });
  };

  /**
   * Close accordion
   */
  close = () => {
    this.isActive = false;
    this.button.setAttribute("aria-expanded", "false");
    this.arrowIcon.setAttribute('href', '/wp-content/themes/marameodesign/assets/sprites/sprite.svg?v=11#Plus');
    this.content.classList.add("max-h-0");
    this.content.style.maxHeight = null;
  };
}

/**
 * Apply Accordion behavior to blocks
 */
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".mmd-accordion");
  accordions.forEach(accordion => {
    new Accordion(accordion).init();
  });
});
