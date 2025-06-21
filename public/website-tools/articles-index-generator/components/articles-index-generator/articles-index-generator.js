import { html } from "../../../../lib/html.js";

class ArticlesIndexGenerator extends HTMLElement {
    #blogFolder;
    #articles; // [{ slug, title, summary, content, published, image: { src, alt } }]

    reset() {
        this.#blogFolder = null;
        this.#articles = [];
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

    addMessage(text, className) {
        const message = document.createElement('p');
        message.textContent = text;
        message.className = className;
        this.appendChild(message);
    }


};

export const registerArticlesIndexGenerator = () => customElements.define('x-articles-index-generator', ArticlesIndexGenerator);