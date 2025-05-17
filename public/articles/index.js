import { registerHeaderContent } from "./components/header-content/header-content.js";
import { registerWebsiteFooter } from "./../components/website-footer/website-footer.js";

const app = async () => {
    registerHeaderContent();
    registerWebsiteFooter();
}

document.addEventListener('DOMContentLoaded', app);
