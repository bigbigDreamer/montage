"use strict";function g(s,i,t,n,e,u,c){try{var a=s[u](c),r=a.value}catch(m){t(m);return}a.done?i(r):Promise.resolve(r).then(n,e)}function h(s){return function(){var i=this,t=arguments;return new Promise(function(n,e){var u=s.apply(i,t);function c(r){g(u,n,e,c,a,"next",r)}function a(r){g(u,n,e,c,a,"throw",r)}c(void 0)})}}const f=h(function*(s,i,t){if(!t||!t.repo)throw new Error(`Please provide a repo to this changelog generator like this:
"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]`);let n,e=[];const u=s.summary.replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im,(o,l)=>"").replace(/^\s*commit:\s*([^\s]+)/im,(o,l)=>(n=l,"")).replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim,(o,l)=>(e.push(l),"")).trim(),[c,...a]=u.split(`
`).map(o=>o.trimRight()),r={commit:`[\`${n}\`](https://github.com/${t.repo}/commit/${n})`},m=e.map(o=>`[@${o}](https://github.com/${o})`).join(", "),p=[r.commit===null?"":` ${r.commit}`,m===null?"":` Thanks ${m}!`].join("");return`

-${p?`${p} -`:""} ${c}
${a.map(o=>`  ${o}`).join(`
`)}`}),$=h(function*(s,i){if(i.length===0)return"";const t=s.map(e=>`- Updated dependencies${e.commit?` [${e.commit}]`:""}`),n=i.map(e=>`  - ${e.name}@${e.newVersion}`);return[...t,...n].join(`
`)}),d={getReleaseLine:f,getDependencyReleaseLine:$};module.exports=d;
//# sourceMappingURL=index.js.map
