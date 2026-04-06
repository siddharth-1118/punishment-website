/* ============================================================
   MAIN.JS — Punishment Story Core Logic
   ============================================================ */

const Main = {
  init() {
    this.handleScroll();
    this.setupNavigation();
    this.setupTheme();
    this.setupModals();
    this.setupSearch();
    this.loadUserData();
    this.renderNavProfile();

    // Listen for scroll for navbar effects
    window.addEventListener('scroll', () => this.handleScroll());

    console.log("Punishment Story Initialized");
  },

  // ── Scroll Behaviors ──────────────────────────────────────
  handleScroll() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  },

  // ── Navigation Logic ──────────────────────────────────────
  setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  },

  // ── Theme Management ──────────────────────────────────────
  setupTheme() {
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
  },

  // ── Modal Handling ────────────────────────────────────────
  setupModals() {
    const overlays = document.querySelectorAll('.modal-overlay');

    overlays.forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) activeModal.classList.remove('active');
      }
    });
  },

  // ── Search Logic ──────────────────────────────────────────
  setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.querySelector('#search-modal');

    if (searchBtn && searchModal) {
      searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        setTimeout(() => {
          const input = searchModal.querySelector('input');
          if (input) input.focus();
        }, 100);
      });
    }
  },

  // ── User Data Loading ─────────────────────────────────────
  loadUserData() {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
      this.userData = JSON.parse(savedUser);
    } else {
      this.userData = { ...APP_DATA.user };
      localStorage.setItem('user_data', JSON.stringify(this.userData));
    }
  },

  saveUserData() {
    localStorage.setItem('user_data', JSON.stringify(this.userData));
  },

  updateLastRead(storyId) {
    if (!this.userData) this.loadUserData();
    this.userData.stats.lastReadStoryId = storyId;
    this.saveUserData();
    console.log(`Updated last read: ${storyId}`);
  },

  // ── UI Updates ──────────────────────────────────────────
  renderNavProfile() {
    const profileBtn = document.querySelector('.nav-profile-link');
    if (profileBtn && this.userData) {
      // Just visually update the profile if needed
      // profileBtn.innerHTML = `...`;
    }
  }
};

// Start the APP
document.addEventListener('DOMContentLoaded', () => Main.init());
