import { kindOf } from './helper';

function canIUseHtmlTagProperty<Tag = HTMLElement>(props: {
    tag: keyof HTMLElementTagNameMap;
    prop: keyof Tag;
}): boolean {
    if (kindOf(props) !== 'object') {
        return false;
    }

    const genElement = (tag: keyof HTMLElementTagNameMap): Element => document.createElement(tag);
    const virtualDom = genElement(props.tag);

    return <string>props.prop in virtualDom;
}

function canIUseCss(conditionText: string): boolean;
function canIUseCss(condition: { property: string; value: string }): boolean;
function canIUseCss(condition: string | { property: string; value: string }): boolean {
    if (!condition) {
        return false;
    }

    if (kindOf(condition) === 'string') {
        return window.CSS.supports(<string>condition);
    }

    return window.CSS.supports(
        (<{ property: string; value: string }>condition).property,
        (<{ property: string; value: string }>condition).value,
    );
}

export { canIUseHtmlTagProperty, canIUseCss };
