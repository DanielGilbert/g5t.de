import { registerWebsiteHeader } from "./components/website-header/website-header.js";
import { registerWebsiteFooter } from "./../components/website-footer/website-footer.js";

const app = async () => {
    registerWebsiteHeader();
    registerWebsiteFooter();
}

document.addEventListener('DOMContentLoaded', app);
