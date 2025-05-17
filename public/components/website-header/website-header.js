import { html } from '../../lib/html.js';

class WebsiteHeader extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'g[ilber]t.de';
        const published = this.getAttribute('published');
        const updated = this.getAttribute('updated');
        const currentPage = this.getAttribute('currentPage');
        const template = document.createElement('template');
        template.innerHTML = html`
        <header>
            <nav>
                <ul>
                    <li><h1>${title}</h1></li>
                </ul> 
                <ul>
                    <li><a href="${import.meta.resolve('../../../index.html')}">Welcome</a></li>
                    <li>${currentPage === 'articles' ? html`Articles` : html`<a href="${import.meta.resolve('../../index.html')}">Articles</a>`}</li>
                    <li><a href="${import.meta.resolve('../../../tools/')}">Tools</a></li>
                    <li><a href="${import.meta.resolve('../../../games/')}">Games</a></li>
                </ul>
            </nav>
            ${published ? html`
                    <time datetime="${published}">
                        ${new Date(published).toDateString({ dateStyle: 'long' })}
                    </time>
                ` : ''}
            ${updated ? html`
            <small>
                Last updated:
                <time datetime="${updated}">
                    ${new Date(updated).toDateString({ dateStyle: 'long' })}
                </time>
            </small>
            ` : ''}
        </header>`;
        this.insertBefore(template.content, this.firstChild);
    }
}

export const registerWebsiteHeader = () => customElements.define('x-website-header', WebsiteHeader);
