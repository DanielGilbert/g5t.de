import { registerWebsiteHeader } from "../components/website-header/website-header.js";
import { registerWebsiteFooter } from "../components/website-footer/website-footer.js";
import { registerArticleMetaLines } from "./components/article-metalines/article-metaline.js";

const app = async () => {
    registerWebsiteHeader();
    registerWebsiteFooter();
    registerArticleMetaLines();
}

document.addEventListener('DOMContentLoaded', app);
