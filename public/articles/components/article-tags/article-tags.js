import { html } from '../../../lib/html.js';

class ArticleTags extends HTMLElement {
    connectedCallback() {
        const tags = this.getAttribute('tags');
        if (!tags) return;
        var tagArray = tags.split(/\s+/);
        if (!tagArray) return;
        const timeTemplate = document.createElement('template');
        timeTemplate.innerHTML = "Tags:";
        
        tagArray.forEach(tag => {
               timeTemplate.innerHTML += ` <a href="../../tags/${tag}">${tag}</a>`;
            });
        this.insertBefore(timeTemplate.content, this.firstChild);     
    }
}

export const registerArticleTags = () => customElements.define('x-article-tags', ArticleTags);




