class Tabs {
  constructor(element) {
    this.tabs = element;
    this.init();
  }

  /**
   * Init
   */
  init = () => {
    this.buttons = this.tabs.querySelectorAll('.mmd-tabs__tab');
    this.panels = this.tabs.querySelectorAll('.mmd-tabs__panel');
    this.tabs.addEventListener('click', this.handleTabsNav);
  }

  /**
   * Handle tabs navigation
   */
  handleTabsNav = (event) => {
    const target = event.target;
    const targetBtn = target.closest('.mmd-tabs__tab');
    if (targetBtn) {
      event.preventDefault();
      const targetPanel = this.tabs.querySelector(`#${targetBtn.getAttribute('aria-controls')}`);

      // Set active panel
      this.panels.forEach(panel => {
        if (panel !== targetPanel) {
          panel.setAttribute('hidden', 'hidden');
        } else {
          panel.removeAttribute('hidden');
        }
      });

      // Set active tab button
      this.buttons.forEach(btn => {
        if (btn !== targetBtn) {
          btn.setAttribute('aria-selected', 'false');
        } else {
          btn.setAttribute('aria-selected', 'true');
        }
      });
    }
  }
}

// Mount tabs
document.addEventListener('DOMContentLoaded', () => {
  const tabBlocks = document.querySelectorAll('.mmd-tabs');
  tabBlocks.forEach(block => new Tabs(block));
}, {once: true})