/**
 * Theme front-end entry. Concatenated/minified to main.min.js by Gulp / Webpack.
 *
 * @package QP NewsLetter
 */
(function () {
  'use strict';

  class SiteHeader {
    constructor() {
      this.header = document.querySelector('.mmd-site-header');
      this.hamburger = document.querySelector('.mmd-header__hamburger');
      this.mobileNav = document.querySelector('#mobile-navigation');
      this.body = document.body;
      
      this.lastScrollY = window.scrollY;
      this.ticking = false;
      this.scrollThreshold = 8; // Tolerance threshold
      this.overlay = null;
      
      if (!this.header) return;
      
      this.init();
    }

    init() {
      this.createOverlay();
      this.setupEventListeners();
    }

    createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'mmd-mobile-nav-overlay';
      this.body.appendChild(this.overlay);
    }

    setupEventListeners() {
      // Scroll listener with requestAnimationFrame throttling for high performance
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
      
      // Hamburger button click toggle
      if (this.hamburger) {
        this.hamburger.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleMobileNav();
        });
      }
      
      // Click backdrop overlay to close mobile navigation
      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeMobileNav());
      }
      
      // Close mobile navigation on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileNav();
        }
      });
      
      // Close mobile navigation when resizing beyond mobile breakpoint
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) { // lg breakpoint
          this.closeMobileNav();
        }
      });
    }

    onScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }

    handleScroll() {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - this.lastScrollY);
      
      // Keep header visible when near the top of the page (offset h-20 + top-4 margin)
      if (currentScrollY <= 120) {
        this.header.classList.remove('-translate-y-full');
      } else if (scrollDifference >= this.scrollThreshold) {
        // Toggle sticky header visibility based on scroll direction
        if (currentScrollY > this.lastScrollY) {
          // Scrolling Down - hide header
          this.header.classList.add('-translate-y-full');
        } else {
          // Scrolling Up - show header
          this.header.classList.remove('-translate-y-full');
        }
      }
      this.lastScrollY = currentScrollY;
    }

    toggleMobileNav() {
      const isOpen = this.mobileNav && this.mobileNav.classList.contains('is-active');
      if (isOpen) {
        this.closeMobileNav();
      } else {
        this.openMobileNav();
      }
    }

    openMobileNav() {
      if (!this.mobileNav) return;
      this.mobileNav.classList.remove('translate-x-full');
      this.mobileNav.classList.add('translate-x-0', 'is-active');
      this.overlay.classList.add('is-active');
      this.body.style.overflow = 'hidden'; // Lock body scroll
      
      if (this.hamburger) {
        this.hamburger.setAttribute('aria-expanded', 'true');
        const hamburgerIcon = this.hamburger.querySelector('.icon-hamburger');
        const closeIcon = this.hamburger.querySelector('.icon-close');
        if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      }
    }

    closeMobileNav() {
      if (!this.mobileNav) return;
      this.mobileNav.classList.remove('translate-x-0', 'is-active');
      this.mobileNav.classList.add('translate-x-full');
      this.overlay.classList.remove('is-active');
      this.body.style.overflow = ''; // Restore scroll
      
      if (this.hamburger) {
        this.hamburger.setAttribute('aria-expanded', 'false');
        const hamburgerIcon = this.hamburger.querySelector('.icon-hamburger');
        const closeIcon = this.hamburger.querySelector('.icon-close');
        if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }
    }
  }

  class TableOfContents {
    constructor() {
      this.wrapper = document.querySelector('.mmd-toc-wrapper');
      this.content = document.querySelector('.mmd-toc-content');
      this.list = document.querySelector('#mmd-toc-list');
      this.button = document.querySelector('.mmd-toc-button');

      if (!this.wrapper || !this.content || !this.list) return;

      this.init();
    }

    init() {
      const headings = Array.from(this.content.querySelectorAll('h2, h3'));
      if (headings.length === 0) {
        this.wrapper.style.display = 'none';
        return;
      }

      this.buildList(headings);
      this.setupAccordion();
      this.setupObserver(headings);
    }

    buildList(headings) {
      this.list.innerHTML = '';
      headings.forEach((heading, index) => {
        let id = heading.id;
        if (!id) {
          id = heading.textContent
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') || `section-${index + 1}`;
          heading.id = id;
        }

        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';

        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(id);
          if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            history.pushState(null, '', `#${id}`);
          }
        });

        li.appendChild(a);
        this.list.appendChild(li);
      });
    }

    setupAccordion() {
      if (!this.button) return;
      this.button.addEventListener('click', () => {
        const isCollapsed = this.wrapper.classList.toggle('is-collapsed');
        this.button.setAttribute('aria-expanded', (!isCollapsed).toString());
      });
    }

    setupObserver(headings) {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const links = this.list.querySelectorAll('a');
            links.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('is-active');
              } else {
                link.classList.remove('is-active');
              }
            });
          }
        });
      }, {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      });

      headings.forEach((heading) => observer.observe(heading));
    }
  }

  class ShareWidgets {
    constructor() {
      this.copyButtons = document.querySelectorAll('.mmd-copy-link-btn');
      if (this.copyButtons.length === 0) return;
      this.init();
    }

    init() {
      this.copyButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const url = btn.getAttribute('data-url') || window.location.href;
          const tooltip = btn.parentElement.querySelector('.mmd-copy-tooltip');

          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
              this.showTooltip(tooltip);
            }).catch(() => {
              this.fallbackCopy(url, tooltip);
            });
          } else {
            this.fallbackCopy(url, tooltip);
          }
        });
      });
    }

    showTooltip(tooltip) {
      if (!tooltip) return;
      tooltip.classList.remove('hidden');
      setTimeout(() => {
        tooltip.classList.add('hidden');
      }, 2000);
    }

    fallbackCopy(text, tooltip) {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        this.showTooltip(tooltip);
      } catch (e) {
        console.error('Failed to copy', e);
      }
      document.body.removeChild(input);
    }
  }

  class DynamicFilter {
    constructor() {
      this.drawer = document.getElementById('mmd-filter-drawer');
      this.openBtn = document.getElementById('mmd-mobile-filter-open');
      this.closeBtn = document.getElementById('mmd-mobile-filter-close');
      this.applyBtn = document.getElementById('mmd-mobile-filter-apply');
      this.backdrop = document.querySelector('.mmd-drawer-backdrop');

      this.init();
    }

    init() {
      this.setupAccordion();
      this.setupDrawer();
      this.setupFacetwpEvents();
    }

    setupAccordion() {
      // Event delegation for accordion toggles (resilient across AJAX reloads)
      document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.mmd-facet-toggle');
        if (!toggle) return;

        const group = toggle.closest('.mmd-facet-group');
        if (!group) return;

        const content = group.querySelector('.mmd-facet-content');
        const isOpen = group.classList.contains('is-open');

        group.classList.toggle('is-open', !isOpen);
        if (content) {
          content.hidden = isOpen;
        }
        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    }

    setupDrawer() {
      if (!this.drawer) return;

      const openDrawer = () => {
        this.drawer.classList.remove('hidden');
        if (this.openBtn) {
          this.openBtn.setAttribute('aria-expanded', 'true');
        }
        document.body.style.overflow = 'hidden';

        // Focus first interactive element in drawer
        const focusable = this.drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      };

      const closeDrawer = () => {
        this.drawer.classList.add('hidden');
        if (this.openBtn) {
          this.openBtn.setAttribute('aria-expanded', 'false');
          this.openBtn.focus();
        }
        document.body.style.overflow = '';
      };

      document.addEventListener('click', (e) => {
        if (e.target.closest('#mmd-mobile-filter-open')) {
          e.preventDefault();
          openDrawer();
        } else if (e.target.closest('#mmd-mobile-filter-close') || e.target.closest('#mmd-mobile-filter-apply') || e.target.classList.contains('mmd-drawer-backdrop')) {
          e.preventDefault();
          closeDrawer();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.drawer && !this.drawer.classList.contains('hidden')) {
          closeDrawer();
        }
      });

      // Reset overflow if window resizes to desktop breakpoint
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          document.body.style.overflow = '';
        }
      });
    }

    setupFacetwpEvents() {
      if (typeof jQuery !== 'undefined') {
        jQuery(document).on('facetwp-loaded', () => {
          this.drawer = document.getElementById('mmd-filter-drawer');
          this.openBtn = document.getElementById('mmd-mobile-filter-open');
        });
      }
    }
  }

  // Initialize when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    new SiteHeader();
    new TableOfContents();
    new ShareWidgets();
    new DynamicFilter();
  });

})();
