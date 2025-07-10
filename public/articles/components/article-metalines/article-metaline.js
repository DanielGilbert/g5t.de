import { html } from '../../../lib/html.js';

class ArticleMetaLines extends HTMLElement {
    connectedCallback() {
        const published = this.getAttribute('published');
        const updated = this.getAttribute('updated');
        const author = this.getAttribute('author');
        const draft = this.getAttribute('draft');
        const timeTemplate = document.createElement('template');
        timeTemplate.innerHTML = html`
            ${published ? html`
                    <time datetime="${published}">
                        ${new Date(published).toDateString({ dateStyle: 'long' })}
                    </time>&nbsp;|&nbsp;
                ` : ''}
            ${updated ? html`Last updated:&nbsp;<time datetime="${updated}">${new Date(updated).toDateString({ dateStyle: 'long' })}</time>&nbsp;|&nbsp;` : ''}
            ${author ? html`by ${author}` : ''}
            ${draft ? html`<p><em>This article is still a draft!</em></p>`:''}`;
        this.insertBefore(timeTemplate.content, this.firstChild);     
    }
}

export const registerArticleMetaLines = () => customElements.define('x-article-metalines', ArticleMetaLines);




