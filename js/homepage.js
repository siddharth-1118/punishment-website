/* ============================================================
   HOMEPAGE.JS — Homepage Rendering & Interactivity
   ============================================================ */

const Homepage = {
  init() {
    this.renderCarousels();
    this.renderCategories();
    this.renderQOTD();
    this.setupHeroParticles();
    this.setupCategoryActions();
    this.setupModalInteractions();
    this.setupEntryOverlay();

    // Smooth scroll for all anchor buttons
    const heroAnchors = document.querySelectorAll('a[href^="#"]');
    heroAnchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    console.log("Homepage Logic Loaded");
  },

  // ── Render Story Carousels ────────────────────────────────
  renderCarousels() {
    const disturbingContainer = document.querySelector('#carousel-disturbing');
    const moralContainer = document.querySelector('#carousel-moral');

    // Disturbing Stories (Intensity 4-5) - Only if container exists
    if (disturbingContainer) {
      const disturbingStories = STORIES.filter(s => s.intensity >= 4);
      disturbingContainer.innerHTML = disturbingStories.map(s => this.createStoryCard(s)).join('');
    }

    // Moral Dilemmas (Intensity 1-3) - Only if container exists
    if (moralContainer) {
      const moralStories = STORIES.filter(s => s.intensity < 4);
      moralContainer.innerHTML = moralStories.map(s => this.createStoryCard(s)).join('');
    }
    
    // Refresh Lucide icons for new content
    if (window.lucide) window.lucide.createIcons();
  },

  createStoryCard(story) {
    return `
      <div class="story-card" data-id="${story.id}">
        <div class="card-image">
          <img src="${story.coverImage}" alt="${story.title}" loading="lazy">
          <div class="intensity-pill">
            <span class="badge ${story.intensity >= 4 ? 'badge-red' : 'badge-gold'}">
              Intensity ${story.intensity}
            </span>
          </div>
        </div>
        <div class="card-content">
          <div class="card-tags">
            ${story.tags.slice(0, 2).map(tag => `<span class="tag">#${tag}</span>`).join('')}
          </div>
          <h3 class="card-title">${story.title}</h3>
          <p class="card-hook">${story.hook}</p>
          
          <div class="card-footer">
            <div class="author-info">
              <i data-lucide="clock" style="width: 14px;"></i>
              <span>${story.readTime}</span>
            </div>
            <a href="story.html?id=${story.id}" class="btn btn-sm btn-primary">Read Now</a>
          </div>
        </div>
      </div>
    `;
  },

  // ── Render Categories ─────────────────────────────────────
  renderCategories() {
    const container = document.querySelector('#homepage-categories');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
      <button
        type="button"
        class="category-tile"
        onclick="${cat.id === 'cat-1'
          ? 'Homepage.showJusticeModal()'
          : cat.id === 'cat-2'
            ? 'Homepage.showPsychologicalModal()'
            : cat.id === 'cat-3'
              ? 'Homepage.showDisciplineModal()'
              : cat.id === 'cat-4'
                ? 'Homepage.showDystopianModal()'
                : cat.id === 'cat-5'
                  ? 'Homepage.showKarmaModal()'
            : `Homepage.openCategoryPage('${cat.id}')`}"
      >
        <span class="tile-icon">${cat.icon}</span>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
      </button>
    `).join('');
  },

  setupCategoryActions() {},

  openCategoryPage(categoryId) {
    window.location.href = `explore.html?cat=${categoryId}`;
  },

  showJusticeModal() {
    this.openModal('#justice-modal');
  },

  showPsychologicalModal() {
    this.openModal('#psychological-modal');
  },

  showDisciplineModal() {
    this.openModal('#discipline-modal');
  },

  showDystopianModal() {
    this.openModal('#dystopian-modal');
  },

  showKarmaModal() {
    this.openModal('#karma-modal');
  },

  closeJusticeModal() {
    this.closeModal('#justice-modal');
  },

  closePsychologicalModal() {
    this.closeModal('#psychological-modal');
  },

  closeDisciplineModal() {
    this.closeModal('#discipline-modal');
  },

  closeDystopianModal() {
    this.closeModal('#dystopian-modal');
  },

  closeKarmaModal() {
    this.closeModal('#karma-modal');
  },

  openModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = document.querySelector('.modal-overlay.active') ? 'hidden' : '';
  },

  setupModalInteractions() {
    document.querySelectorAll('.modal-overlay').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = document.querySelector('.modal-overlay.active') ? 'hidden' : '';
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach((modal) => {
          modal.classList.remove('active');
        });
        document.body.style.overflow = '';
      }
    });
  },

  // ── Question of the Day ───────────────────────────────────
  renderQOTD() {
    const pollContainer = document.querySelector('#qotd-poll-container');
    const resultBars = document.querySelector('#qotd-result-bars');
    const { question, yes, no } = APP_DATA.qotd;

    if (!pollContainer || !resultBars) return;

    // Render Poll Options
    pollContainer.innerHTML = `
      <div class="poll-option" onclick="Homepage.handleVote('yes')">
        <div class="poll-bar-wrapper">
          <div class="poll-bar-fill" id="poll-bar-yes"></div>
          <span class="poll-label">Yes, it's necessary</span>
          <span class="poll-percent" id="poll-percent-yes">${yes}%</span>
        </div>
      </div>
      <div class="poll-option" onclick="Homepage.handleVote('no')">
        <div class="poll-bar-wrapper">
          <div class="poll-bar-fill" id="poll-bar-no"></div>
          <span class="poll-label">No, it's outdated</span>
          <span class="poll-percent" id="poll-percent-no">${no}%</span>
        </div>
      </div>
    `;

    // Render Sidebar Results
    resultBars.innerHTML = `
      <div class="qotd-bar-group">
        <div class="qotd-bar-label">
          <span>Justified</span>
          <span>${yes}%</span>
        </div>
        <div class="qotd-bar-container">
          <div class="qotd-bar-fill qotd-yes" style="width: ${yes}%"></div>
        </div>
      </div>
      <div class="qotd-bar-group">
        <div class="qotd-bar-label">
          <span>Not Justified</span>
          <span>${no}%</span>
        </div>
        <div class="qotd-bar-container">
          <div class="qotd-bar-fill qotd-no" style="width: ${no}%"></div>
        </div>
      </div>
    `;

    // Check if already voted
    if (localStorage.getItem('voted_qotd')) {
      document.querySelectorAll('.poll-option').forEach(opt => opt.classList.add('voted'));
      pollContainer.classList.add('voted');
      // Set visual width for poll options
      document.querySelector('#poll-bar-yes').style.width = `${yes}%`;
      document.querySelector('#poll-bar-no').style.width = `${no}%`;
    }
  },

  handleVote(type) {
    if (localStorage.getItem('voted_qotd')) return;

    localStorage.setItem('voted_qotd', type);
    
    // Simulate updating data
    if (type === 'yes') APP_DATA.qotd.yes += 1;
    else APP_DATA.qotd.no += 1;

    const { yes, no } = APP_DATA.qotd;
    const total = yes + no;
    const yesPerc = Math.round((yes / total) * 100);
    const noPerc = 100 - yesPerc;

    // Update UI
    this.renderQOTD();
  },

  // ── Hero Particle Animation ───────────────────────────────
  setupHeroParticles() {
    const canvas = document.querySelector('#hero-bg-canvas');
    if (!canvas) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        animation: particleDrift ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: -${Math.random() * 10}s;
      `;
      canvas.appendChild(particle);
    }
  },

  setupEntryOverlay() {
    const overlay = document.querySelector('#entry-overlay');
    const entryBtn = document.querySelector('#entry-btn');
    
    // Check if user already dismissed it this session
    if (sessionStorage.getItem('entrySplashDismissed') === 'true') {
      if (overlay) overlay.classList.add('hidden');
      return;
    }
    
    if (overlay) {
      // Disable scroll while overlay is active
      document.body.style.overflow = 'hidden';

      entryBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
        sessionStorage.setItem('entrySplashDismissed', 'true');
      });
    }
  }
};

// Start Homepage Logic
document.addEventListener('DOMContentLoaded', () => Homepage.init());
