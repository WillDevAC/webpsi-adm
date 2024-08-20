function minifyCSS(css: any) {
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    css = css.replace(/\s*([{}:;,])\s*/g, '$1');
    css = css.replace(/;}/g, '}');
    css = css.replace(/\s+/g, ' ');
    css = css.replace(/\s*([>~+])\s*/g, '$1');
    css = css.trim();
    return css;
}

function minifyHTML(html: any) {
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    html = html.replace(/\>\s+\</g, '><');
    html = html.trim();
    html = html.replace(/\s+/g, ' ');
    return html;
}

function minifyJS(js: any) {
    js = js.replace(/\/\*[\s\S]*?\*\//g, '');
    js = js.replace(/\/\/.*$/gm, '');
    js = js.trim();
    js = js.replace(/\s+/g, ' ');
    js = js.replace(/\s*([{}:;,=()<>+\-*/%&|^!~?])\s*/g, '$1');
    js = js.replace(/;+/g, ';').replace(/;+\}/g, '}');
    return js;
}

export {minifyCSS, minifyHTML, minifyJS}