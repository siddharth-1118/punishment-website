const StoryPlayer = {
  currentStory: null,
  currentNodeId: 'start',

  init() {
    this.loadStory();
    this.setupEvents();
    this.fillIntro();
  },

  loadStory() {
    const params = new URLSearchParams(window.location.search);
    const storyId = params.get('id') || 's4';
    this.currentStory = STORIES.find((story) => story.id === storyId) || STORIES.find((story) => story.id === 's4');

    if (!this.currentStory || !this.currentStory.nodes) {
      document.body.innerHTML = '<main class="cinema-view"><div class="cinema-panel"><h1>Story not found</h1></div></main>';
    }
  },

  fillIntro() {
    if (!this.currentStory) {
      return;
    }

    document.title = this.currentStory.title;
    document.querySelector('#cinema-story-title').textContent = this.currentStory.title;
    document.querySelector('#cinema-story-hook').textContent = this.currentStory.hook;
  },

  setupEvents() {
    const startBtn = document.querySelector('#start-cinema-btn');
    const skipBtn = document.querySelector('#skip-scene-btn');
    const fallbackBtn = document.querySelector('#fallback-continue-btn');
    const replayBtn = document.querySelector('#replay-story-btn');
    const video = document.querySelector('#main-video');

    startBtn.onclick = () => {
      const stage = document.querySelector('#video-stage');
      
      // Request Fullscreen
      if (stage.requestFullscreen) {
        stage.requestFullscreen();
      } else if (stage.webkitRequestFullscreen) {
        stage.webkitRequestFullscreen();
      } else if (stage.msRequestFullscreen) {
        stage.msRequestFullscreen();
      }

      document.querySelector('#cinema-start-overlay').classList.add('hidden');
      stage.classList.remove('hidden');
      this.playNode('start');
    };

    skipBtn.onclick = () => this.finishCurrentScene();
    fallbackBtn.onclick = () => this.finishCurrentScene();
    replayBtn.onclick = () => this.restart();

    video.onended = () => this.finishCurrentScene();
    video.onerror = () => this.showFallback();
  },

  playNode(nodeId) {
    const node = this.currentStory.nodes[nodeId];
    const video = document.querySelector('#main-video');

    if (!node) {
      this.showEnding();
      return;
    }

    this.currentNodeId = nodeId;
    this.hideOverlays();

    if (node.type === 'decision') {
      this.showDecision(node);
      return;
    }

    if (node.videoUrl) {
      video.classList.remove('hidden');
      video.src = node.videoUrl;
      video.load();
      video.play().catch(() => this.showFallback());
      return;
    }

    this.showFallback();
  },

  finishCurrentScene() {
    const node = this.currentStory.nodes[this.currentNodeId];

    if (!node) {
      this.showEnding();
      return;
    }

    if (node.type === 'decision') {
      this.showDecision(node);
      return;
    }

    if (node.next && node.next.length > 0) {
      this.playNode(node.next[0]);
      return;
    }

    this.showEnding();
  },

  showDecision(node) {
    const overlay = document.querySelector('#decision-overlay');
    const title = document.querySelector('#decision-title');
    const choices = document.querySelector('#decision-choices');
    const video = document.querySelector('#main-video');

    video.pause();
    video.classList.add('hidden');
    title.textContent = node.title;
    choices.innerHTML = node.choices.map((choice) => `
      <button class="choice-btn" onclick="StoryPlayer.playNode('${choice.nextId}')">${choice.text}</button>
    `).join('');
    overlay.classList.remove('hidden');
  },

  showFallback() {
    const node = this.currentStory.nodes[this.currentNodeId];
    const video = document.querySelector('#main-video');

    video.pause();
    video.classList.add('hidden');
    document.querySelector('#fallback-title').textContent = node?.title || 'Scene';
    document.querySelector('#fallback-text').textContent = 'This video is not added yet. You can replace it later and continue the path.';
    document.querySelector('#fallback-stage').classList.remove('hidden');
  },

  showEnding() {
    const video = document.querySelector('#main-video');

    video.pause();
    video.classList.add('hidden');
    document.querySelector('#ending-overlay').classList.remove('hidden');
  },

  hideOverlays() {
    document.querySelector('#decision-overlay').classList.add('hidden');
    document.querySelector('#fallback-stage').classList.add('hidden');
    document.querySelector('#ending-overlay').classList.add('hidden');
  },

  restart() {
    this.currentNodeId = 'start';
    this.playNode('start');
  }
};

document.addEventListener('DOMContentLoaded', () => StoryPlayer.init());
