(function(a,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):(a=typeof globalThis<"u"?globalThis:a||self,a.ReactWalineClient=m())})(this,function(){"use strict";function a(i,s,t,n,e,l,u){try{var c=i[l](u),r=c.value}catch(p){t(p);return}c.done?s(r):Promise.resolve(r).then(n,e)}function m(i){return function(){var s=this,t=arguments;return new Promise(function(n,e){var l=i.apply(s,t);function u(r){a(l,n,e,u,c,"next",r)}function c(r){a(l,n,e,u,c,"throw",r)}u(void 0)})}}const g=m(function*(i,s,t){if(!t||!t.repo)throw new Error(`Please provide a repo to this changelog generator like this:
"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]`);let n,e=[];const l=i.summary.replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im,(o,f)=>"").replace(/^\s*commit:\s*([^\s]+)/im,(o,f)=>(n=f,"")).replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim,(o,f)=>(e.push(f),"")).trim(),[u,...c]=l.split(`
`).map(o=>o.trimRight()),r={commit:`[\`${n}\`](https://github.com/${t.repo}/commit/${n})`},p=e.map(o=>`[@${o}](https://github.com/${o})`).join(", "),h=[r.commit===null?"":` ${r.commit}`,p===null?"":` Thanks ${p}!`].join("");return`

-${h?`${h} -`:""} ${u}
${c.map(o=>`  ${o}`).join(`
`)}`}),d=m(function*(i,s){if(s.length===0)return"";const t=i.map(e=>`- Updated dependencies${e.commit?` [${e.commit}]`:""}`),n=s.map(e=>`  - ${e.name}@${e.newVersion}`);return[...t,...n].join(`
`)});return{getReleaseLine:g,getDependencyReleaseLine:d}});
