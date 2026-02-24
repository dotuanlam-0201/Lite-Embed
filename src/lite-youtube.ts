export class LiteYouTube extends HTMLElement {
  private videoId: string = '';
  private isWarmed: boolean = false;

  constructor() {
    super();
  }
  connectedCallback() {
    this.videoId = this.getAttribute('videoId') || '';
    this.renderPreview();
    this.setupObserver();
    this.addEventListener('click', this.addIframe, { once: true });
  }

  renderPreview() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<style>
        :host { display: block; cursor: pointer; position: relative; background: #000; }
        #lite-youtube-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        svg {
          fill: white;
          width: 96px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: none
        }
      </style>
      <div id="lite-youtube-container">
        <img src="https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg" alt="Video thumbnail" loading="lazy" />
        <div class="play-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
</svg>

</div>
      </div>`
  }

  private setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.warmConnections();
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(this);
  }

  private warmConnections() {
    if (this.isWarmed) return;
    this.isWarmed = true
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://www.youtube-nocookie.com';
    document.head.appendChild(link);
  }

  private addIframe() {
    const iframe = document.createElement("iframe")
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = `https://www.youtube.com/embed/${this.videoId}`
    iframe.allowFullscreen = true;
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
    this.shadowRoot?.getElementById('lite-youtube-container')?.replaceWith(iframe)
  }

}

if (!customElements.get('lite-youtube')) {
  customElements.define('lite-youtube', LiteYouTube);
}