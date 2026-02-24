import { beforeEach, describe, expect, test } from "vitest";
import "../src/lite-youtube";

class IntersectionObserverMock {
  observe() { }
  unobserve() { }
  disconnect() { }
}
window.IntersectionObserver = IntersectionObserverMock as any;

describe('LiteYouTube Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<lite-youtube videoId="ogfYd705cRs"></lite-youtube>';
  });

  test('should render preview', () => {
    const el = document.querySelector('lite-youtube') as HTMLElement;
    expect(el?.getAttribute('videoId')).toContain('ogfYd705cRs');
    expect(el.shadowRoot).not.toBeNull();
  });

  test('should replace preview with iframe on click', () => {
    const el = document.querySelector('lite-youtube') as HTMLElement;
    expect(el.shadowRoot?.querySelector('iframe')).toBeNull();
    el.click();
    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute('src')).toBe('https://www.youtube.com/embed/ogfYd705cRs');
  });
});