'use strict';

class LiteYouTube extends HTMLElement {
    videoId = null;
    isWarmed = false;
    constructor() {
        super();
    }
    connectedCallback() {
        this.renderPreview();
        this.setupObserver();
        this.addEventListener('click', this.addIframe, { once: true });
    }
    renderPreview() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `<style>
        :host { display: block; cursor: pointer; position: relative; background: #000; }
        .play-btn { width: 68px; height: 48px; background: red; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 12%; }
      </style>
      <div id="container">
        <img src="https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg" alt="Video thumbnail" loading="lazy" />
        <div class="play-btn"></div>
      </div>`;
    }
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.warmConnections();
                observer.disconnect();
            }
        }, { rootMargin: '200px' });
        observer.observe(this);
    }
    warmConnections() {
        if (this.isWarmed)
            return;
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = 'https://www.youtube-nocookie.com';
        document.head.appendChild(link);
        this.isWarmed = true;
    }
    addIframe() {
        if (this.isWarmed)
            return;
        this.isWarmed = true;
        const iframe = document.createElement("iframe");
        iframe.width = "600";
        iframe.height = "400";
        iframe.src = `https://www.youtube.com/embed/${this.videoId}`;
        iframe.allowFullscreen = true;
        iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
        this.shadowRoot?.getElementById("container")?.appendChild(iframe);
    }
}
if (!customElements.get('lite-youtube')) {
    customElements.define('lite-youtube', LiteYouTube);
}

exports.LiteYouTube = LiteYouTube;
//# sourceMappingURL=index.cjs.map
