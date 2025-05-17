import { registerWebsiteFooter } from "./components/website-footer/website-footer.js";
import { registerWebsiteHeader } from "./components/website-header/website-header.js";

const app = () => {
    registerWebsiteHeader();
    registerWebsiteFooter();
    const template = document.querySelector('template#page');
    if (template) document.body.appendChild(template.content, true);
}

document.addEventListener('DOMContentLoaded', app);