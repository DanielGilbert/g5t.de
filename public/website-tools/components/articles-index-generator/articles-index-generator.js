//import { html } from "../../../lib/html.js";

class ArticlesIndexGenerator extends HTMLElement {
    #blogFolder;
    #tags; // [{ tag: [ article1, article2, ... ]}]
    #articles; // [{ slug, title, summary, content, published, image: { src, alt } }]

    reset() {
        this.#blogFolder = null;
        this.#articles = [];
        this.#tags = [];
        this.textContent = 'To start: drag the blog folder here, or click to open it with a picker.';
    }

    showError(text) {
        this.textContent = '';
        this.addMessage(text, 'warning');
    }

    connectedCallback() {
        this.reset();
        this.addDragListeners();
        this.addClickListener();
    }

    addClickListener() {
        this.addEventListener('click', () => {
            if (this.#blogFolder) return;
            if (!window.showDirectoryPicker) {
                this.showError('Opening folders with a picker is not supported in your browser.');
            } else {
                window.showDirectoryPicker({ 
                    id: 'articles-index-generator', 
                    mode: 'read',
                    startIn: 'documents'
                }).then(async (entry) => {
                    await this.startProcessing(entry);
                }).catch((e) => {
                    this.showError(e.message);
                });
            }
        });
    }

    
    addDragListeners() {
        this.addEventListener('dragover', (e) => {
            // Prevent navigation.
            e.preventDefault();
        });

        this.addEventListener('drop', async (e) => {
            try {
                // Prevent navigation.
                e.preventDefault();
                // Process all of the items.
                const item = e.dataTransfer.items[0];
                // Careful: `kind` will be 'file' for both file _and_ directory entries.
                if (item.kind === 'file') {
                    if (!item.getAsFileSystemHandle) {
                        throw new Error('Dropping files is not supported in your browser.');
                    }
                    await this.startProcessing(item.getAsFileSystemHandle());
                }
            } catch (e) {
                this.showError(e.message);
            }
        });
    }

     async startProcessing(blogFolder) {
        this.#blogFolder = await blogFolder;
        if (this.#blogFolder.kind !== 'directory' || this.#blogFolder.name !== 'public') {
            this.#blogFolder = null;
            throw new Error('That folder is not the public directory.');
        }

        this.#articles = [];
        this.innerHTML = '';
        this.addMessage('Processing...');

        const articlesFolder = await this.#blogFolder.getDirectoryHandle('articles');
        for await (const [key, value] of articlesFolder.entries()) {
            if (value.kind === 'directory' && value.name !== 'components') {
                this.addMessage(`Parsing ${key}/`);
                try {
                    const article = await value.getFileHandle('index.html');
                    await this.processArticle(article, value);
                    await this.processTags(article, value);
                } catch (e) {
                    if (e.name === 'NotFoundError') {
                        this.addMessage(`Folder ${key}/ does not have an index.html file, skipping.`, 'warning');
                        continue;
                    }
                    throw new Error('Error processing ' + value.name + ': ' + e.message);
                }
            }
        }

        // sort articles by published descending
        this.#articles.sort((a, b) => {
            return -a.published.localeCompare(b.published);
        });

        this.addIndexJsonBlock();
     };

    async processArticle(article, path) {
        const file = await article.getFile();
        const html = await file.text();
        const dom = (new DOMParser()).parseFromString(html, 'text/html');
        // mandatory
        const title = dom.querySelector('title').textContent;
        const slug = path.name;
        const published = dom.querySelector('x-article-metalines').getAttribute('published');
        /*const summary = dom.querySelector('meta[name="description"]').getAttribute('content');
        const published = dom.querySelector('blog-header').getAttribute('published');
        const content = await this.processArticleContent(dom.querySelector('main'), path);
        const slug = path.name;
        // optional
        const img = dom.querySelector('blog-header img');
        const image = img && { src: img.getAttribute('src'), alt: img.getAttribute('alt') };
        const updated = dom.querySelector('blog-header').getAttribute('updated') || undefined;
        const author = dom.querySelector('blog-header p[aria-label="author"]').textContent || undefined;

        this.#articles.push({
            slug, title, summary, content, published, updated, image, author
        });*/

        this.#articles.push({
            slug, title, published
        });
    }

    async processTags(article, path) {
        const file = await article.getFile();
        const html = await file.text();

        const dom = (new DOMParser()).parseFromString(html, 'text/html');
        const slug = path.name;
        const title = dom.querySelector('title').textContent;
        const tags = dom.querySelector('x-article-tags').getAttribute('tags') || undefined;

        if (tags === undefined) return;

        
    };

    addMessage(text, className) {
        const message = document.createElement('p');
        message.textContent = text;
        message.className = className;
        this.appendChild(message);
    }


    addIndexJsonBlock() {
        const text = JSON.stringify(this.#articles.map(obj => ({ 
            ...obj, 
            content: undefined,
            image: undefined
        })), null, 4);

        this.addMessage('articles/index.json:');
        const pre = document.createElement('pre');
        pre.textContent = text;
        this.appendChild(pre);
        pre.scrollIntoView();
        const button = document.createElement('button');
        button.onclick = () => navigator.clipboard.writeText(text);
        button.textContent = 'Copy index.json to clipboard';
        this.appendChild(button);
    }
};

export const registerArticlesIndexGenerator = () => customElements.define('x-articles-index-generator', ArticlesIndexGenerator);