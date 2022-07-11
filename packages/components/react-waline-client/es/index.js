import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { init } from '@waline/client';
import classes from 'classnames';

function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return extends_.apply(this, arguments);
}
function _extends() {
    return extends_.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;
    if (!css || typeof document === 'undefined') {
        return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
        } else {
            head.appendChild(style);
        }
    } else {
        head.appendChild(style);
    }
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

var css_248z$1 = ":root{--waline-font-size:1rem;--waline-white:#fff;--waline-light-grey:#999;--waline-dark-grey:#666;--waline-theme-color:#27ae60;--waline-active-color:#2ecc71;--waline-color:#444;--waline-bgcolor:#fff;--waline-bgcolor-light:#f8f8f8;--waline-bgcolor-hover:#f0f0f0;--waline-border-color:#ddd;--waline-disable-bgcolor:#f8f8f8;--waline-disable-color:#000;--waline-code-bgcolor:#282c34;--waline-bq-color:#f0f0f0;--waline-avatar-size:3.25rem;--waline-m-avatar-size:calc(var(--waline-avatar-size)*9/13);--waline-badge-color:#3498db;--waline-badge-font-size:0.75em;--waline-info-bgcolor:#f8f8f8;--waline-info-color:#999;--waline-info-font-size:0.625em;--waline-border:1px solid var(--waline-border-color);--waline-avatar-radius:50%;--waline-box-shadow:none}[data-waline]{font-size:var(--waline-font-size);text-align:left}[data-waline] *{box-sizing:content-box;line-height:1.75}[data-waline] p{color:var(--waline-color)}[data-waline] a{color:var(--waline-theme-color);cursor:pointer;display:inline-block;position:relative;text-decoration:none;word-break:break-word}[data-waline] a:hover{color:var(--waline-active-color)}[data-waline] img{border:none;max-height:400px;max-width:100%}[data-waline] hr{border-color:var(--waline-bgcolor-light);border-style:dashed;margin:.825em 0}[data-waline] code,[data-waline] pre{background:var(--waline-bgcolor-light);border-radius:3px;font-size:85%;margin:0;padding:.2em .4em}[data-waline] pre{line-height:1.45;overflow:auto;padding:10px}[data-waline] pre::-webkit-scrollbar{height:6px;width:6px}[data-waline] pre::-webkit-scrollbar-track-piece:horizontal{background:rgba(0,0,0,.1);border-radius:6px}[data-waline] pre::-webkit-scrollbar-thumb:horizontal{background:var(--waline-theme-color);border-radius:6px;width:6px}[data-waline] pre code{background:transparent;color:var(--waline-color);padding:0;white-space:pre-wrap;word-break:keep-all}[data-waline] blockquote{border-left:8px solid var(--waline-bq-color);color:var(--waline-dark-grey);margin:.5em 0;padding:.5em 0 .5em 1em}[data-waline] blockquote>p{margin:0}[data-waline] ol,[data-waline] ul{margin-left:1.25em;padding:0}[data-waline] input[type=checkbox],[data-waline] input[type=radio]{display:inline-block;margin-top:-2px;vertical-align:middle}.wl-btn{background:transparent;border:1px solid var(--waline-border-color);border-radius:.5em;color:var(--waline-color);cursor:pointer;display:inline-block;font-size:.75em;font-weight:400;line-height:1.5;margin-bottom:0;min-width:2.5em;padding:.5em 1em;text-align:center;touch-action:manipulation;transition-duration:.4s;-webkit-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.wl-btn:active,.wl-btn:hover{border-color:var(--waline-theme-color);color:var(--waline-theme-color)}.wl-btn:disabled{background:var(--waline-disable-bgcolor);border-color:var(--waline-border-color);color:var(--waline-disable-color);cursor:not-allowed}.wl-btn.primary{background:var(--waline-theme-color);border-color:var(--waline-theme-color);color:var(--waline-white)}.wl-btn.primary:active,.wl-btn.primary:hover{background:var(--waline-active-color);border-color:var(--waline-active-color);color:var(--waline-white)}.wl-btn.primary:disabled{background:var(--waline-disable-bgcolor);border-color:var(--waline-border-color);color:var(--waline-disable-color);cursor:not-allowed}.wl-loading{text-align:center}.wl-loading svg{margin:0 auto}.wl-comment{display:flex;margin-bottom:.75em;position:relative}.wl-close{background:transparent;border:none;cursor:pointer;line-height:1;padding:0;position:absolute;right:-4px;top:-4px}.wl-login-info{margin-top:.75em;max-width:80px;text-align:center}.wl-logout-btn{background:transparent;border:none;cursor:pointer;line-height:0;padding:3px;position:absolute;right:-10px;top:-10px}.wl-avatar{border:var(--waline-border);border-radius:var(--waline-avatar-radius);height:var(--waline-avatar-size);margin:0 auto;position:relative;width:var(--waline-avatar-size)}@media(max-width:720px){.wl-avatar{height:var(--waline-m-avatar-size);width:var(--waline-m-avatar-size)}}.wl-avatar img{border-radius:var(--waline-avatar-radius);height:100%;width:100%}.wl-login-nick{color:var(--waline-theme-color);display:block;font-size:.75em;word-break:break-all}.wl-panel{background:var(--waline-bgcolor);border:var(--waline-border);border-radius:.75em;box-shadow:var(--waline-box-shadow);flex-shrink:1;margin:.5em;position:relative;width:100%}.wl-header{border-bottom:2px dashed var(--waline-border-color);border-top-left-radius:.75em;border-top-right-radius:.75em;display:flex;overflow:hidden;padding:0 4px}@media(max-width:580px){.wl-header{display:block}}.wl-header label{color:var(--waline-color);font-size:.75em;min-width:40px;padding:.75em .5em;text-align:center}.wl-header input{background:transparent;flex:1;font-size:.625em;padding:.5em;resize:none;width:0}.wl-header-item{display:flex;flex:1}@media(max-width:580px){.wl-header-item:not(:last-child){border-bottom:2px dashed var(--waline-border-color)}}.wl-header-1 .wl-header-item{width:100%}.wl-header-2 .wl-header-item{width:50%}@media(max-width:580px){.wl-header-2 .wl-header-item{flex:0;width:100%}}.wl-header-3 .wl-header-item{width:33.33%}@media(max-width:580px){.wl-header-3 .wl-header-item{width:100%}}.wl-editor,.wl-input{border:none;color:var(--waline-color);max-width:100%;outline:none;transition:all .25s ease}.wl-editor:focus,.wl-input:focus{background:var(--waline-bgcolor-light)}.wl-editor{background:transparent;border-radius:.5em;font-size:.875em;margin:.75em .5em;min-height:8.75em;position:relative;resize:vertical;width:calc(100% - 1em)}.wl-preview{padding:0 .5em .5em}.wl-preview h4{font-size:.9375em;font-weight:700;margin:.25em}.wl-preview .wl-content{-webkit-hyphens:auto;hyphens:auto;min-height:1.25em;padding:.25em;word-break:break-word}.wl-preview .wl-content>:first-child{margin-top:0}.wl-preview .wl-content>:last-child{margin-bottom:0}.wl-footer{display:flex;flex-wrap:wrap;margin:.5em .75em;position:relative}.wl-actions{align-items:center;display:flex;flex:2}.wl-action{align-items:center;background:transparent;border:none;color:var(--waline-color);cursor:pointer;display:inline-flex;font-size:16px;height:1.5em;justify-content:center;margin:2px;padding:0;width:1.5em}.wl-action:hover{color:var(--waline-theme-color)}.wl-action.actived{color:var(--waline-active-color)}#wl-image-upload{display:none}#wl-image-upload:focus+label{color:var(--waline-color)}#wl-image-upload:focus-visible+label{outline:1px auto -webkit-focus-ring-color}.wl-info{align-items:center;display:flex;flex:3;justify-content:flex-end}.wl-info .wl-text-number{color:var(--waline-info-color);font-size:.75em}.wl-info .wl-text-number .illegal{color:red}.wl-info button{margin-left:.75em}.wl-info button svg{display:block;line-height:18px;margin:0 auto}.wl-emoji-popup{background:var(--waline-bgcolor);border:var(--waline-border);border-radius:6px;box-shadow:var(--waline-box-shadow);left:1.25em;max-width:526px;opacity:0;position:absolute;top:100%;transform:scale(.9);transform-origin:0 0;transition:transform .2s ease-out,opacity .2s ease-out;visibility:hidden;z-index:10}.wl-emoji-popup.display{opacity:1;transform:none;visibility:visible}.wl-emoji-popup button{background:transparent;border-width:0;cursor:pointer;display:inline-block;font-size:inherit;line-height:2;margin:.125em;padding:0;text-align:center;vertical-align:middle;width:2em}.wl-emoji-popup button:hover{background:var(--waline-bgcolor-hover)}.wl-emoji-popup .wl-emoji{display:inline-block;max-height:1.5em;max-width:1.5em;vertical-align:middle}.wl-emoji-popup .wl-tab-wrapper{max-height:145px;overflow-y:auto;padding:.5em}.wl-emoji-popup .wl-tab-wrapper::-webkit-scrollbar{height:6px;width:6px}.wl-emoji-popup .wl-tab-wrapper::-webkit-scrollbar-track-piece:vertical{background:rgba(0,0,0,.1);border-radius:6px}.wl-emoji-popup .wl-tab-wrapper::-webkit-scrollbar-thumb:vertical{background:var(--waline-theme-color);border-radius:6px;width:6px}.wl-emoji-popup .wl-tabs{height:2em;overflow-x:scroll;padding:0 6px 1px;position:relative;white-space:nowrap}.wl-emoji-popup .wl-tabs:before{background:var(--waline-border-color);content:\" \";height:1px;left:0;position:absolute;right:0;top:0;z-index:2}.wl-emoji-popup .wl-tabs::-webkit-scrollbar{height:6px;width:6px}.wl-emoji-popup .wl-tabs::-webkit-scrollbar-track-piece:horizontal{background:rgba(0,0,0,.1);border-radius:6px}.wl-emoji-popup .wl-tabs::-webkit-scrollbar-thumb:horizontal{background:var(--waline-theme-color);border-radius:6px;height:6px}.wl-emoji-popup .wl-tab{margin:0;padding:0 .5em;position:relative}.wl-emoji-popup .wl-tab.active{background:var(--waline-bgcolor);border-top-width:1px;border:1px solid var(--waline-border-color);border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:0 solid var(--waline-border-color);z-index:3}.wl-gif-popup{background:var(--waline-bgcolor);border:var(--waline-border);border-radius:6px;box-shadow:var(--waline-box-shadow);left:1.25em;opacity:0;padding:.75em .75em .25em;position:absolute;top:100%;transform:scale(.9);transform-origin:0 0;transition:transform .2s ease-out,opacity .2s ease-out;visibility:hidden;width:calc(100% - 3em);z-index:10}.wl-gif-popup.display{opacity:1;transform:none;visibility:visible}.wl-gif-popup input{border:var(--waline-border);box-sizing:border-box;margin-bottom:10px;padding:3px 5px;width:100%}.wl-gif-popup img{border:2px solid #fff;box-sizing:border-box;cursor:pointer;display:block;width:100%}.wl-gif-popup img:hover{border-color:var(--waline-theme-color);border-radius:2px}.wl-gallery{display:flex;max-height:80vh;overflow-y:auto}.wl-gallery-column{display:flex;flex:1;flex-direction:column;height:max-content}.wl-cards .wl-item{display:flex;padding:.5em;position:relative}.wl-cards .wl-item:last-child .wl-card{border-bottom:none}.wl-cards .wl-card .wl-item{padding-right:0}.wl-cards .wl-user{--avatar-size:var(--waline-avatar-size);margin-right:.75em;position:relative}@media(max-width:720px){.wl-cards .wl-user{--avatar-size:var(--waline-m-avatar-size)}}.wl-cards .wl-user img{border-radius:var(--waline-avatar-radius);box-shadow:var(--waline-box-shadow);height:var(--avatar-size);width:var(--avatar-size)}.wl-cards .wl-user .verified-icon{background:var(--waline-bgcolor);border-radius:50%;box-shadow:var(--waline-box-shadow);left:calc(var(--avatar-size)*3/4);position:absolute;top:calc(var(--avatar-size)*3/4)}.wl-card{border-bottom:1px dashed var(--waline-border-color);flex:1;padding-bottom:.5em;width:0}.wl-card:first-child{margin-left:1em}.wl-card .wl-head{line-height:1.5}.wl-card .wl-nick{display:inline-block;font-size:.875em;font-weight:700;line-height:1;margin-right:.5em;position:relative;text-decoration:none}.wl-card .wl-nick svg{bottom:-.125em;line-height:1;position:relative}.wl-card span.wl-nick{color:var(--waline-dark-grey)}.wl-card .wl-badge{border:1px solid var(--waline-badge-color);border-radius:4px;color:var(--waline-badge-color);display:inline-block;font-size:var(--waline-badge-font-size);margin-right:1em;padding:0 .3em}.wl-card .wl-time{color:var(--waline-info-color);font-size:.75em;margin-right:.875em}.wl-card .wl-meta{line-height:1;position:relative}.wl-card .wl-meta>span{background:var(--waline-info-bgcolor);border-radius:.2em;color:var(--waline-info-color);display:inline-block;font-size:var(--waline-info-font-size);line-height:1.5;margin-right:.25em;padding:2px 4px}@media(max-width:520px){.wl-card .wl-meta>span{display:none}}.wl-card .wl-meta>span:empty{display:none}.wl-card .wl-comment-actions{float:right}.wl-card .wl-delete,.wl-card .wl-like,.wl-card .wl-reply{align-items:center;background:transparent;border:none;color:var(--waline-color);cursor:pointer;display:inline-flex;line-height:1;padding:4px;transition:color .2s ease}.wl-card .wl-delete:hover,.wl-card .wl-like:hover,.wl-card .wl-reply:hover{color:var(--waline-theme-color)}.wl-card .wl-delete.active,.wl-card .wl-like.active,.wl-card .wl-reply.active{color:var(--waline-active-color)}.wl-card .wl-content{word-wrap:break-word;font-size:.875em;line-height:2;margin-bottom:.75em;padding-top:.625em;position:relative}.wl-card .wl-content.expand{cursor:pointer;max-height:8em;overflow:hidden}.wl-card .wl-content.expand:before{background:linear-gradient(180deg,#000,hsla(0,0%,100%,.9));bottom:3.15em;content:\"\";display:block;left:0;position:absolute;top:0;width:100%;z-index:999}.wl-card .wl-content.expand:after{background:hsla(0,0%,100%,.9);bottom:0;color:#828586;content:attr(data-expand);display:block;height:3.15em;left:0;line-height:3.15em;position:absolute;text-align:center;width:100%;z-index:999}.wl-card .wl-content>:first-child{margin-top:0}.wl-card .wl-content>:last-child{margin-bottom:0}.wl-card .wl-admin-actions{font-size:12px;margin:8px 0;text-align:right}.wl-card .wl-comment-status{margin:0 8px}.wl-card .wl-comment-status .wl-btn{border-radius:0}.wl-card .wl-comment-status .wl-btn:first-child{border-radius:.5em 0 0 .5em}.wl-card .wl-comment-status .wl-btn:last-child{border-radius:0 .5em .5em 0}.wl-card .wl-quote{border-left:1px dashed hsla(0,0%,93%,.5)}.wl-card .wl-quote .wl-user{--avatar-size:var(--waline-m-avatar-size)}.wl-close-icon{color:var(--waline-border-color)}.wl-content .vemoji,.wl-content .wl-emoji{display:inline-block;height:1.25em;margin:-.125em .25em;vertical-align:baseline}.wl-content .wl-tex{background:var(--waline-info-bgcolor);color:var(--waline-info-color)}.wl-content span.wl-tex{border-radius:.2em;display:inline-block;font-size:var(--waline-info-font-size);line-height:1.5;margin-right:.25em;padding:2px 4px}.wl-content p.wl-tex{text-align:center}.wl-content .katex-display{-webkit-overflow-scrolling:touch;overflow:auto hidden;padding-bottom:.2em;padding-top:.2em}.wl-content .katex-display::-webkit-scrollbar{height:3px}.wl-content .katex-error{color:red}.wl-count{font-size:1.25em;font-weight:700;padding:.375em}.wl-empty{color:var(--waline-color);overflow:auto;padding:1.25em}.wl-empty,.wl-operation{text-align:center}.wl-operation button{margin:1em 0}.wl-power{color:var(--waline-light-grey);font-size:var(--waline-info-font-size);padding:.5em 0;text-align:right}.wl-content pre,.wl-content pre[class*=language-]{background:var(--waline-code-bgcolor);border-radius:6px;line-height:1.4;margin:.75rem 0;overflow:auto;padding:1rem 1.25rem}.wl-content pre code,.wl-content pre[class*=language-] code{background:transparent!important;border-radius:0;color:#bbb;padding:0}.wl-content code[class*=language-],.wl-content pre[class*=language-]{word-wrap:normal;background:none;color:#ccc;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;font-size:1em;-webkit-hyphens:none;hyphens:none;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}.wl-content pre[class*=language-]{overflow:auto}.wl-content :not(pre)>code[class*=language-],.wl-content pre[class*=language-]{background:#2d2d2d}.wl-content :not(pre)>code[class*=language-]{border-radius:.3em;padding:.1em;white-space:normal}.wl-content .token.block-comment,.wl-content .token.cdata,.wl-content .token.comment,.wl-content .token.doctype,.wl-content .token.prolog{color:#999}.wl-content .token.punctuation{color:#ccc}.wl-content .token.attr-name,.wl-content .token.deleted,.wl-content .token.namespace,.wl-content .token.tag{color:#e2777a}.wl-content .token.function-name{color:#6196cc}.wl-content .token.boolean,.wl-content .token.function,.wl-content .token.number{color:#f08d49}.wl-content .token.class-name,.wl-content .token.constant,.wl-content .token.property,.wl-content .token.symbol{color:#f8c555}.wl-content .token.atrule,.wl-content .token.builtin,.wl-content .token.important,.wl-content .token.keyword,.wl-content .token.selector{color:#cc99cd}.wl-content .token.attr-value,.wl-content .token.char,.wl-content .token.regex,.wl-content .token.string,.wl-content .token.variable{color:#7ec699}.wl-content .token.entity,.wl-content .token.operator,.wl-content .token.url{color:#67cdcc}.wl-content .token.bold,.wl-content .token.important{font-weight:700}.wl-content .token.italic{font-style:italic}.wl-content .token.entity{cursor:help}.wl-content .token.inserted{color:green}.wl-recent-item p{display:inline}";
styleInject(css_248z$1);

var css_248z = "";
styleInject(css_248z);

const ReactWalineClient = /*#__PURE__*/forwardRef((_param, ref) => {
  var {
    className,
    style
  } = _param,
      props = _objectWithoutPropertiesLoose(_param, ["className", "style"]);

  const walineInstanceRef = useRef({});
  const containerRef = useRef(null);
  const containerCls = classes('montage-react-waline-client_container');
  useEffect(() => {
    walineInstanceRef.current = init(_extends({}, props, {
      el: containerRef.current
    }));
    return () => {
      var ref;
      return (ref = walineInstanceRef.current) == null ? void 0 : ref.destroy == null ? void 0 : ref.destroy();
    };
  }, []);
  useImperativeHandle(ref, () => {
    return {
      update: props => {
        var ref;
        return (ref = walineInstanceRef.current) == null ? void 0 : ref.update == null ? void 0 : ref.update(_extends({}, props));
      }
    };
  });
  return /*#__PURE__*/jsx("div", {
    ref: containerRef,
    className: containerCls,
    style: style
  });
});

export { ReactWalineClient as default };
//# sourceMappingURL=index.js.map
