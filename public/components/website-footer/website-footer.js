import { html } from '../../lib/html.js';

class WebsiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = html`
            <small class="contact">
                <span>&copy; Daniel Gilbert, 2020 &dash; 2025</span>&NonBreakingSpace;|&NonBreakingSpace;<span>Made with ❤ &amp; ☕</span>&NonBreakingSpace;|&NonBreakingSpace;<a href="https://github.com/danielgilbert/">GitHub</a>
            </small>
        `;
    }
}

export const registerWebsiteFooter = () => customElements.define('x-website-footer', WebsiteFooter);