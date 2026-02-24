const { JSDOM } = require("jsdom");
const dom = new JSDOM('', { runScripts: "dangerously" });
const { window } = dom;

class MyEl extends window.HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = 'testing';
  }
}
window.customElements.define('my-el', MyEl);

window.document.body.innerHTML = '<my-el></my-el>';
const el = window.document.querySelector('my-el');
console.log("Is MyEl instance?", el instanceof MyEl);
console.log("ShadowRoot:", el.shadowRoot);
