if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const c=e=>i(e,n),f={module:{uri:n},exports:o,require:c};s[n]=Promise.all(r.map((e=>f[e]||c(e)))).then((e=>(t(...e),o)))}}define(["./workbox-3ff92774"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/main.css",revision:"39a4581132d3cf1fcfc301abef6fe794"},{url:"index.html",revision:"d38a6b9f8600ccbcd9bd14e8a2d616d2"},{url:"js/app.js",revision:"74ef888c7fb5d2319585de786c2a007e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
