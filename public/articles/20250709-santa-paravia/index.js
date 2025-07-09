import "../index.js";
import "https://cdn.jsdelivr.net/npm/@zachleat/line-numbers/+esm";
import "https://cdn.jsdelivr.net/npm/syntax-highlight-element@1/+esm";

/**
 * @typedef Config
 * @type {object}
 * @property {string[]} [languages=['markup', 'css', 'javascript']] - Language grammars to highlight.
 * @property {{ [key: string]: string[] }} languageTokens - Language specific token types.
 */
window.she = window.she || {};
/** @type {Config} */
window.she.config = {languages: ['csharp']};