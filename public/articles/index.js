import { registerArticleHeader } from "./components/article-header/article-header.js";
import { registerWebsiteFooter } from "./../components/website-footer/website-footer.js";

const app = async () => {
    registerArticleHeader();
    registerWebsiteFooter();
}

document.addEventListener('DOMContentLoaded', app);
