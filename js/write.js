/* ============================================================
   WRITE.JS — Creator Studio Logic
   ============================================================ */

const Write = {
    tags: [],
    
    init() {
        this.setupEditor();
        this.setupIntensity();
        this.setupTags();
        this.setupPublishing();
        
        console.log("Creator Studio Initialized");
    },

    // ── Editor Features ─────────────────────────────────────────
    setupEditor() {
        const textarea = document.querySelector('#main-editor');
        const wordCount = document.querySelector('#word-count');

        textarea.addEventListener('input', () => {
            const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0).length;
            wordCount.innerText = `${words} words`;
        });

        // Simple Bold/Italic placeholders
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('title');
                if (type === 'Bold' || type === 'Italic') {
                    // In a real app, this would wrap selection in tags
                    console.log(`Command: ${type}`);
                }
            });
        });
    },

    // ── Intensity Slider ────────────────────────────────────────
    setupIntensity() {
        const slider = document.querySelector('#intensity-range');
        const label = document.querySelector('#intensity-val');

        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            label.innerText = `Level ${val}`;
            label.className = `badge ${val >= 4 ? 'badge-red' : 'badge-gold'}`;
        });
    },

    // ── Tag Management ──────────────────────────────────────────
    setupTags() {
        const tagInput = document.querySelector('#tag-input');
        const pillContainer = document.querySelector('#tag-pills');

        tagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && tagInput.value.trim() !== '') {
                e.preventDefault();
                if (this.tags.length < 5) {
                    const tag = tagInput.value.trim().toLowerCase();
                    if (!this.tags.includes(tag)) {
                        this.tags.push(tag);
                        this.renderTags();
                    }
                    tagInput.value = '';
                }
            }
        });
    },

    renderTags() {
        const pillContainer = document.querySelector('#tag-pills');
        pillContainer.innerHTML = this.tags.map((tag, i) => `
            <span class="tag" onclick="Write.removeTag(${i})">#${tag} <i data-lucide="x" style="width: 10px; margin-left: 4px;"></i></span>
        `).join('');
        lucide.createIcons();
    },

    removeTag(idx) {
        this.tags.splice(idx, 1);
        this.renderTags();
    },

    // ── Publishing Simulation ───────────────────────────────────
    setupPublishing() {
        const publishBtn = document.querySelector('.btn-primary');
        publishBtn.addEventListener('click', () => {
            const title = document.querySelector('#story-title-input').value;
            if (!title) {
                alert("Please enter a title for your story.");
                return;
            }

            publishBtn.innerHTML = `<span class="spinner" style="width: 16px; height: 16px;"></span> Publishing...`;
            publishBtn.disabled = true;

            setTimeout(() => {
                alert(`SUCCESS! "${title}" has been published to the Punishment Story network. The Judicators will now convene.`);
                window.location.href = 'index.html';
            }, 1500);
        });

        const previewBtn = document.querySelector('#preview-btn');
        previewBtn.addEventListener('click', () => {
            alert("Preview mode generated. Content is optimized for psychological impact.");
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Write.init());
