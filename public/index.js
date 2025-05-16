import { registerWebsiteFooter } from "./components/website-footer/website-footer.js";

const app = () => {
    registerWebsiteFooter();
    const template = document.querySelector('template#page');
    if (template) document.body.appendChild(template.content, true);
}

document.addEventListener('DOMContentLoaded', app);