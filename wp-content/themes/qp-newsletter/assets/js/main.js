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

  // Initialize when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    new SiteHeader();
  });

})();
