import { html } from '../../lib/html.js';

class WebsiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = html`
                <small class="contact">
                    <span>&copy; Daniel Gilbert, 2009 &dash; 2025</span>&NonBreakingSpace;|&NonBreakingSpace;<a href="https://github.com/danielgilbert/">GitHub</a>&NonBreakingSpace;|&NonBreakingSpace;<a href="">LinkedIn</a>
            </small>
        `;
    }
}

export const registerWebsiteFooter = () => customElements.define('x-website-footer', WebsiteFooter);