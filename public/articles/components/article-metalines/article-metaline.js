import { html } from '../../../lib/html.js';

class ArticleMetaLines extends HTMLElement {
    connectedCallback() {
        const published = this.getAttribute('published');
        const updated = this.getAttribute('updated');
        const author = this.getAttribute('author');
        const timeTemplate = document.createElement('template');
        timeTemplate.innerHTML = html`
            ${published ? html`
                    <time datetime="${published}">
                        ${new Date(published).toDateString({ dateStyle: 'long' })}
                    </time>&nbsp;|&nbsp;
                ` : ''}
            ${updated ? html`Last updated:&nbsp;<time datetime="${updated}">${new Date(updated).toDateString({ dateStyle: 'long' })}</time>&nbsp;|&nbsp;` : ''}
            ${author ? html`by ${author}` : ''}`;
        this.insertBefore(timeTemplate.content, this.firstChild);     
    }
}

export const registerArticleMetaLines = () => customElements.define('x-article-metalines', ArticleMetaLines);




