/* ============================================================
   EXPLORE.JS — Search & Filtering
   ============================================================ */

const Explore = {
    filteredStories: [...STORIES],
    appliedFilters: {
        search: '',
        intensity: [1, 2, 3, 4, 5],
        category: null
    },

    init() {
        this.setupCategories();
        this.handleURLParameters();
        this.setupEventListeners();
        this.applyFilters();
        
        console.log("Explore Page Initialized");
    },

    // ── Pre-fill categories in sidebar ────────────────────────
    setupCategories() {
        const chipContainer = document.querySelector('#category-chips');
        if (!chipContainer) return;

        chipContainer.innerHTML = CATEGORIES.map(cat => `
            <span class="tag" data-id="${cat.id}">${cat.name}</span>
        `).join('');

        chipContainer.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => {
                if (this.appliedFilters.category === tag.dataset.id) {
                    this.appliedFilters.category = null;
                    tag.classList.remove('active');
                } else {
                    chipContainer.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                    this.appliedFilters.category = tag.dataset.id;
                    tag.classList.add('active');
                }
                this.applyFilters();
            });
        });
    },

    // ── Handle incoming URL params ──────────────────────────────
    handleURLParameters() {
        const params = new URLSearchParams(window.location.search);
        const catId = params.get('cat');
        if (catId) {
            this.appliedFilters.category = catId;
            const targetTag = document.querySelector(`#category-chips .tag[data-id="${catId}"]`);
            if (targetTag) targetTag.classList.add('active');
        }
    },

    // ── Event Listeners ─────────────────────────────────────────
    setupEventListeners() {
        const searchInput = document.querySelector('#search-input');
        const applyBtn = document.querySelector('#apply-filters');
        const resetBtn = document.querySelector('#reset-filters');
        const sortOrder = document.querySelector('#sort-order');

        searchInput.addEventListener('input', (e) => {
            this.appliedFilters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        applyBtn.addEventListener('click', () => this.applyFilters());

        resetBtn.addEventListener('click', () => {
            this.appliedFilters = {
                search: '',
                intensity: [1, 2, 3, 4, 5],
                category: null
            };
            searchInput.value = '';
            document.querySelectorAll('#intensity-filters input').forEach(i => i.checked = true);
            document.querySelectorAll('#category-chips .tag').forEach(t => t.classList.remove('active'));
            this.applyFilters();
        });

        sortOrder.addEventListener('change', () => this.applyFilters());
    },

    // ── Filtering Logic ─────────────────────────────────────────
    applyFilters() {
        const intensityChecked = Array.from(document.querySelectorAll('#intensity-filters input:checked'))
            .map(i => parseInt(i.value));
        
        this.appliedFilters.intensity = intensityChecked;
        
        this.filteredStories = STORIES.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(this.appliedFilters.search) || 
                                story.hook.toLowerCase().includes(this.appliedFilters.search) ||
                                story.tags.some(t => t.toLowerCase().includes(this.appliedFilters.search));
            
            const matchesIntensity = this.appliedFilters.intensity.includes(story.intensity);
            
            const matchesCategory = !this.appliedFilters.category || story.category === CATEGORIES.find(c => c.id === this.appliedFilters.category).name;
            
            return matchesSearch && matchesIntensity && matchesCategory;
        });

        this.sortStories();
        this.renderGrid();
    },

    // ── Sort Logic ──────────────────────────────────────────────
    sortStories() {
        const sortValue = document.querySelector('#sort-order').value;
        if (sortValue === 'intensity-high') {
            this.filteredStories.sort((a, b) => b.intensity - a.intensity);
        } else if (sortValue === 'intensity-low') {
            this.filteredStories.sort((a, b) => a.intensity - b.intensity);
        } else {
            // Newest by default
            this.filteredStories.reverse();
        }
    },

    // ── Render Story Grid ───────────────────────────────────────
    renderGrid() {
        const container = document.querySelector('#explore-story-grid');
        const countLabel = document.querySelector('#results-count');
        
        if (!container) return;

        countLabel.innerText = `Showing ${this.filteredStories.length} stories`;

        if (this.filteredStories.length === 0) {
            container.innerHTML = `
                <div class="p-xl text-center" style="grid-column: 1 / -1;">
                  <h3 class="heading-md">No results matched your search.</h3>
                  <p class="text-muted mt-sm">Try broadening your filters or intensity levels.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredStories.map(story => this.createStoryCard(story)).join('');

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
    }
};

document.addEventListener('DOMContentLoaded', () => Explore.init());
