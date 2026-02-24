export declare class LiteYouTube extends HTMLElement {
    private videoId;
    private isWarmed;
    constructor();
    connectedCallback(): void;
    renderPreview(): void;
    private setupObserver;
    private warmConnections;
    private addIframe;
}
