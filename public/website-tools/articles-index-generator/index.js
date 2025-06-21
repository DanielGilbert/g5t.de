import { registerWebsiteHeader } from "../../components/website-header/website-header.js";
import { registerWebsiteFooter } from "../../components/website-footer/website-footer.js";
import { registerArticlesIndexGenerator } from "./../components/articles-index-generator/articles-index-generator.js"


const app = async () => {
    registerWebsiteHeader();
    registerWebsiteFooter();
    registerArticlesIndexGenerator();
}

document.addEventListener('DOMContentLoaded', app);
