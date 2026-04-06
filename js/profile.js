/* ============================================================
   PROFILE.JS — User Dashboard Logic
   ============================================================ */

const Profile = {
    init() {
        this.renderUserDetails();
        this.renderStats();
        this.renderBadges();
        this.renderContinueReading();
        this.renderSavedStories();
        
        console.log("User Profile Initialized");
    },

    // ── Render User Details ────────────────────────────────────
    renderUserDetails() {
        const userData = Main.userData || APP_DATA.user;
        const nameEl = document.querySelector('#user-name');
        const alignmentEl = document.querySelector('#user-alignment');
        if (nameEl) nameEl.innerText = userData.name;
        if (alignmentEl) alignmentEl.innerText = `Moral Alignment: ${userData.alignment}`;
    },

    // ── Render Stats ──────────────────────────────────────────
    renderStats() {
        const userData = Main.userData || APP_DATA.user;
        const readEl = document.querySelector('#stat-read');
        const votesEl = document.querySelector('#stat-votes');
        const badgesEl = document.querySelector('#stat-badges');

        if (readEl) readEl.innerText = userData.stats.readCount;
        if (votesEl) votesEl.innerText = userData.stats.votesCount;
        if (badgesEl) badgesEl.innerText = userData.achievements.filter(a => a.unlocked).length;
    },

    // ── Render Badges ─────────────────────────────────────────
    renderBadges() {
        const container = document.querySelector('#badges-container');
        const userData = Main.userData || APP_DATA.user;
        if (!container) return;

        container.innerHTML = userData.achievements.map(badge => `
            <div class="glass-card badge-item ${badge.unlocked ? 'unlocked' : ''}">
                <span class="badge-icon">${badge.icon}</span>
                <p class="caption font-bold">${badge.name}</p>
                <p class="caption text-muted">${badge.unlocked ? 'Unlocked' : 'Locked'}</p>
            </div>
        `).join('');
    },

    // ── Render Continue Reading ────────────────────────────
    renderContinueReading() {
        const container = document.querySelector('#continue-reading');
        const userData = Main.userData || APP_DATA.user;
        if (!container || !userData.stats.lastReadStoryId) return;

        const lastStory = STORIES.find(s => s.id === userData.stats.lastReadStoryId);
        if (lastStory) {
            container.innerHTML = this.createStoryCard(lastStory, true);
        }
    },

    // ── Render Saved Stories ──────────────────────────────────
    renderSavedStories() {
        const container = document.querySelector('#saved-stories');
        const userData = Main.userData || APP_DATA.user;
        if (!container) return;

        const savedStories = STORIES.filter(s => userData.stats.favorites.includes(s.id));

        if (savedStories.length === 0) {
            container.innerHTML = `
                <div class="p-xl text-center" style="grid-column: 1 / -1;">
                    <p class="text-muted">You haven't saved any stories yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = savedStories.map(story => this.createStoryCard(story)).join('');
        if (window.lucide) lucide.createIcons();
    },

    createStoryCard(story, isHero = false) {
        return `
            <div class="story-card ${isHero ? 'hero-card' : ''}" data-id="${story.id}">
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
                        <a href="story.html?id=${story.id}" class="btn btn-sm btn-primary">Resume</a>
                    </div>
                </div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => Profile.init());
