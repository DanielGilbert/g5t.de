import { html } from '../../lib/html.js';

class WebsiteHeader extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'g[ilber]t.de';
        const published = this.getAttribute('published');
        const updated = this.getAttribute('updated');
        const welcomeLink = this.getAttribute('welcomeLink');
        const articlesLink = this.getAttribute('articlesLink');
        const toolsLink = this.getAttribute('toolsLink');
        const gamesLink = this.getAttribute('gamesLink');
        const template = document.createElement('template');
        template.innerHTML = html`
        <header>
            <nav>
                <ul>
                    <li><h1>${title}</h1></li>
                </ul> 
                <ul>
                    <li>${welcomeLink ? html`<a href="${welcomeLink}">Welcome</a>` : html`Welcome` }</li>
                    <li>${articlesLink ? html`<a href="${articlesLink}">Articles</a>` : html`Articles` }</li>
                    <li>${toolsLink ? html`<a href="${toolsLink}">Tools</a>` : html`Tools` }</li>
                    <li>${gamesLink ? html`<a href="${gamesLink}">Games</a>` : html`Games` }</li>
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
