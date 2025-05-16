import { html } from '../../lib/html.js';

class WebsiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = html`
            <footer>
                <div class="contact">
                    <a href="https://github.com/danielgilbert/">GitHub</a>&NonBreakingSpace;|&NonBreakingSpace;<a href="">LinkedIn</a>
                </div>
            </footer>
        `;
    }
}

export const registerWebsiteFooter = () => customElements.define('x-website-footer', WebsiteFooter);