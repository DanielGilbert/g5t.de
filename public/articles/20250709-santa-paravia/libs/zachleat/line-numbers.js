/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@zachleat/line-numbers@1.0.3/line-numbers.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
//! <line-numbers>
const t=String.raw;class e extends HTMLElement{#t=!1;#e;#i;static attrs={targetSelector:"target",scrollTargetSelector:"scroll-target",startIndex:"start",obtrusive:"obtrusive",manualRender:"manual-render"};static classes={target:"uln-target"};static tagName="line-numbers";static define(t=window.customElements){t.get(this.tagName)||t.define(this.tagName,this)}static upgrade(t){if(!t||t.closest(this.tagName))return;let e=document.createElement("div");t.parentNode.insertBefore(e,t);let i=document.createElement(this.tagName);i.appendChild(t),e.replaceWith(i)}static getStyle(){return t`
${this.tagName} > :first-child {
	display: block;
	max-width: 100%;
}
${this.tagName} .${this.classes.target} {
	margin: 0;
	/* Warning: does not handle wrapping long lines */
	white-space: nowrap;
	white-space-collapse: preserve;
}
${this.tagName} pre.${this.classes.target} {
	/* Warning: does not handle wrapping long lines */
	white-space: pre;
}
`}static globalStyleAdded=!1;static getShadowStyle(){return t`
* {
	box-sizing: border-box;
}
:host {
	display: flex;
	position: relative;
}
.lines {
	position: absolute;
	left: 0;
	top: calc(-1 * var(--uln-top, 0px));
	height: 100%;
	translate: -100% 0;
	clip-path: inset(var(--uln-top) 0 calc(-1 * var(--uln-top, 0px) + var(--uln-scrollbar-height, 0px)) 0);
	pointer-events: none;
	border-radius: var(--uln-border-radius);
	font: var(--uln-font, inherit);
	color: var(--uln-color);
	padding-block: var(--uln-padding-v, 0px);
	padding-inline: var(--uln-padding-h, .75em);
	margin: 0;
	line-height: var(--uln-lh, 1lh);
	list-style: none;
	list-style-position: inside;
	counter-reset: decimal-without-dot var(--uln-number-start, 0);
	font-variant-numeric: tabular-nums;
}
:host([obtrusive]) .lines {
	position: relative;
	height: var(--uln-height, auto);
	translate: 0;
}
.lines li {
	text-align: right;
	counter-increment: decimal-without-dot;
}
.lines li:before {
	content: counter(decimal-without-dot, var(--uln-number-type, decimal));
}
`}get targetEl(){if(!this.#e){let t=this.getAttribute(e.attrs.targetSelector),i=this.querySelector(t||":scope > :first-child");i.classList.add(e.classes.target),this.#e=i}return this.#e}get scrollTargetEl(){if(!this.#i){let t=this.getAttribute(e.attrs.scrollTargetSelector);t&&(this.#i=this.querySelector(t))}return this.#i||this.targetEl}get linesEl(){return this.shadowRoot.querySelector(".lines")}static isTextarea(t){return"TEXTAREA"===t.tagName}static shouldWatchInput(t){return this.isTextarea(t)}getSourceContent(){return e.isTextarea(this.targetEl)?this.targetEl.value:this.targetEl.innerText}setupLines(){let t=this.getSourceContent().split("\n");this.linesEl.childElementCount!==t.length&&(this.linesEl.innerHTML=t.map((t=>"<li></li>")).join(""))}positionLines(t={}){let{force:i,updateScrollbarHeight:s,overflowType:l}=Object.assign({force:!1,updateScrollbarHeight:!1},t);if(this.#t&&!i)return;let r=Math.max(this.scrollTargetEl.scrollTop,0);this.linesEl.style.setProperty("--uln-top",r+"px");let a=this.scrollTargetEl.offsetHeight;(a||s)&&(l||(l=this.getOverflowType())),a&&(l?this.linesEl.style.setProperty("--uln-height",a+"px"):this.linesEl.style.removeProperty("--uln-height")),s&&("horizontal"===l||"both"===l?this.style.setProperty("--uln-scrollbar-height",e.scrollbarDimensions[1]+"px"):this.style.removeProperty("--uln-scrollbar-height"))}isObtrusive(){return this.hasAttribute(e.attrs.obtrusive)}getOverflowType(){let t=this.scrollTargetEl,e=this.isObtrusive();e&&(this.linesEl.style.display="none");let i=t?.scrollWidth>this.offsetWidth,s=t?.scrollHeight>this.offsetHeight;return e&&(this.linesEl.style.display=""),i&&s?"both":i?"horizontal":s?"vertical":void 0}async connectedCallback(){if(!("replaceSync"in CSSStyleSheet.prototype)||this.shadowRoot)return;if(e.scrollbarDimensions||(e.scrollbarDimensions=function(){let[t,e]=[40,40],i=document,s=i.createElement("div");s.setAttribute("style",`width:${t}px;height:${e}px;overflow:auto;`);let l=i.createElement("div");l.setAttribute("style",`width:${t+10}px;height:${e+10}px;`),s.appendChild(l),i.body.appendChild(s);let r=[t-s.clientWidth,e-s.clientHeight];return s.remove(),r}()),!e.globalStyleAdded){e.globalStyleAdded=!0;let t=new CSSStyleSheet;t.replaceSync(e.getStyle()),document.adoptedStyleSheets.push(t)}let t=this.attachShadow({mode:"open"}),i=new CSSStyleSheet;i.replaceSync(e.getShadowStyle()),t.adoptedStyleSheets=[i];let s=document.createElement("template");s.innerHTML='<ol class="lines" aria-hidden="true"></ol><slot></slot>',t.appendChild(s.content.cloneNode(!0));let l=parseInt(this.getAttribute(e.attrs.startIndex),10);isNaN(l)||this.linesEl.style.setProperty("--uln-number-start",l-1),this.setupLines();let r=this.getOverflowType();(this.isObtrusive()||r)&&this.positionLines({updateScrollbarHeight:!0,overflowType:r}),e.shouldWatchInput(this.targetEl)&&!this.hasAttribute(e.attrs.manualRender)&&this.targetEl.addEventListener("input",(async()=>{this.#t=!0,this.setupLines(),this.positionLines({force:!0,updateScrollbarHeight:!0}),this.#t=!1})),this.scrollTargetEl.addEventListener("scroll",(()=>{this.positionLines()}),{passive:!0})}render(){this.setupLines(),this.positionLines({force:!0,updateScrollbarHeight:!0})}}new URL(import.meta.url).searchParams.has("nodefine")||e.define();
//# sourceMappingURL=/sm/b60149d2d6619a7421b9d1610794950eb032c0a119ce147b3e89651e19c020c0.map