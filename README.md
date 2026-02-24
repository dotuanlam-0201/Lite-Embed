# lite-embed

High performance lazy-load embeds for YouTube.

This package provides a lightweight, pure Web Component `<lite-youtube>` that delays loading the heavy YouTube iframe until the user actually clicks play, rendering a fast, lightweight placeholder instead. It also pre-warms the YouTube connections when the component scrolls into view.

## Features

- 🚀 **High Performance:** Renders a lightweight placeholder image instead of a heavy iframe.
- ⚡ **Lazy Connection:** Uses `IntersectionObserver` to pre-warm the `youtube-nocookie.com` connection only when the embed is about to become visible.
- 🧩 **Framework Agnostic:** Pure Web Component. Works everywhere (Vanilla JS, React, Vue, Svelte, Angular, etc.).
- 📦 **Zero Dependencies:** Extremely small footprint.

## Installation

Install via npm (or bun/yarn/pnpm):

```bash
npm install lite-embed
```

## Usage

### Vanilla HTML / JavaScript

Import the module in your entry file or directly in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/lite-embed@1.0.2/dist/lite-embed.min.js"></script>
<!-- Use the component -->
<lite-youtube videoId="dQw4w9WgXcQ"></lite-youtube>
```

### In UI Frameworks (React, Vue, etc.)

Just import the package in your main application file (e.g., `main.js`, `index.js`, or `App.tsx`):

```javascript
import "lite-embed"
```

Then you can use the `<lite-youtube>` tag anywhere in your JSX/templates:

```html
<lite-youtube videoId="dQw4w9WgXcQ"></lite-youtube>
```

_(Note for React users: If you are using React < 19, web components require attributes to be carefully passed. In this case, `videoId` works perfectly out of the box)._

## Properties

| Attribute | Type     | Description                                        |
| --------- | -------- | -------------------------------------------------- |
| `videoId` | `string` | **Required.** The YouTube Video ID to be embedded. |

## How it works

1. Initially, `<lite-youtube>` renders just the YouTube video's thumbnail (`hqdefault.jpg`) and a CSS play button.
2. An `IntersectionObserver` monitors the component. As it approaches the viewport, it adds `<link rel="preconnect">` hints to warm up YouTube's servers.
3. Upon clicking the component, the actual YouTube `<iframe>` is dynamically injected and rendering takes over, providing the native player experience.

## License

ISC License - see the [LICENSE](LICENSE) file for details.
