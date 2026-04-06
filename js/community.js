/* ============================================================
   COMMUNITY.JS — Community Dashboard Logic
   ============================================================ */

const DEBATES = [
    {
        id: "d1",
        title: "Moral Relativism vs Absolute Justice",
        author: "JusticeSeeker_42",
        authorAvatar: "https://i.pravatar.cc/150?u=jseek",
        replies: 42,
        votes: 124,
        topic: "#JusticeReform",
        time: "2h ago",
        snippet: "Is it possible for any human-led system to deliver absolute justice, or are we always tied to our own biases?"
    },
    {
        id: "d2",
        title: "The Ethical Dilemma of the Echo Cabinet",
        author: "Echo_Whisper",
        authorAvatar: "https://i.pravatar.cc/150?u=echo",
        replies: 12,
        votes: 89,
        topic: "#TheEchoCabinet",
        time: "5h ago",
        snippet: "The repetition punishment in my latest story has sparked a lot of debate. Let's discuss if it's too harsh."
    },
    {
        id: "d3",
        title: "Dystopian Justice: A Necessary Evil?",
        author: "Neo_Moralist",
        authorAvatar: "https://i.pravatar.cc/150?u=neo",
        replies: 28,
        votes: 56,
        topic: "#DystopianRights",
        time: "1d ago",
        snippet: "Many dystopian settings explore harsh systems. Are they ever justified in the name of societal stability?"
    }
];

const Community = {
    init() {
        this.renderDebates();
        this.setupTimer();
        this.setupEventListeners();
        
        console.log("Community Logic Initialized");
    },

    // ── Render Debate Feed ────────────────────────────────────
    renderDebates() {
        const container = document.querySelector('#debate-list');
        if (!container) return;

        container.innerHTML = DEBATES.map(debate => `
            <div class="debate-card glass p-lg mb-md">
                <div class="debate-header mb-md">
                    <div class="flex gap-sm align-center">
                        <img src="${debate.authorAvatar}" class="profile-avatar-sm">
                        <div>
                            <h4 class="body-sm font-bold">${debate.author}</h4>
                            <span class="caption text-muted">${debate.time} in ${debate.topic}</span>
                        </div>
                    </div>
                    <span class="tag active">${debate.topic}</span>
                </div>
                <h3 class="heading-sm mb-sm">${debate.title}</h3>
                <p class="body-sm text-secondary mb-md">${debate.snippet}</p>
                <div class="flex gap-md mt-md">
                    <button class="flex gap-xs align-center caption text-muted"><i data-lucide="message-square" style="width: 14px;"></i> ${debate.replies} Replies</button>
                    <button class="flex gap-xs align-center caption text-muted"><i data-lucide="thumbs-up" style="width: 14px;"></i> ${debate.votes} Votes</button>
                </div>
            </div>
        `).join('');

        lucide.createIcons();
    },

    // ── Live Event Timer ──────────────────────────────────────
    setupTimer() {
        // Simulated timer update
        let secondsLeft = 144000; // ~40 hours
        const timerTag = document.querySelector('.timer .tag');

        setInterval(() => {
            secondsLeft -= 1;
            const days = Math.floor(secondsLeft / 86400);
            const hours = Math.floor((secondsLeft % 86400) / 3600);
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;
            
            if (timerTag) {
                timerTag.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
    },

    // ── Event Listeners ─────────────────────────────────────────
    setupEventListeners() {
        const topicLinks = document.querySelectorAll('.topic-link');
        topicLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                topicLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                // In a real app, this would filter the feed based on the topic
                console.log(`Filtering for: ${link.innerText}`);
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Community.init());
