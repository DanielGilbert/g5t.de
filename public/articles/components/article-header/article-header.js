import { html } from '../../../lib/html.js';

class ArticleHeader extends HTMLElement {
    connectedCallback() {
        this.role = 'banner';
        const title = this.getAttribute('title') || 'g5t.de';
        const published = this.getAttribute('published');
        const updated = this.getAttribute('updated');
        const template = document.createElement('template');
        template.innerHTML = html`
            <h1>${title}</h1>
            <nav aria-label="breadcrumb">
                <ol>
                    <li><a href="${import.meta.resolve('../../../index.html')}">Welcome</a></li>
                    <li><a href="${import.meta.resolve('../../index.html')}">Articles</a></li>
                    <li><a aria-current="page">
                        <time datetime="${published}">
                            ${new Date(published).toDateString({ dateStyle: 'long' })}
                        </time>
                    </a></li>
                </ol>
                ${updated ? html`
                    <small>
                        Last updated:
                        <time datetime="${updated}">
                            ${new Date(updated).toDateString({ dateStyle: 'long' })}
                        </time>
                    </small>
                ` : ''}
            </nav>
        `;
        this.insertBefore(template.content, this.firstChild);
    }
}

export const registerArticleHeader = () => customElements.define('x-article-header', ArticleHeader);
