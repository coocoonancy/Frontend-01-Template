function getStyle(el) {
    if(!el.style) el.style = {};
    for (let key in el.computedStyle) {
        el.style[key] = el.computedStyle[key].value;
        if (el.style[key].toString.match(/px$/)) {
            el.style[key] = parseInt(el.style[key]);
        }
        if (el.style[key].toString.match(/^[0-9\.]+$/)) {
            el.style[key] = parseInt(el.style[key]);
        }
    }
    return el.style;
}
function layout(el) {
    if(!el.computedStyle) return;
    var elStyle = getStyle(el);
    if (elStyle.display !== 'flex') return;
    var items = el.children.filter(e => e.type === 'element');
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    })
    var style = elStyle;
    ['width', 'height'].forEach(item => {
        if (style[item] === 'auto' || style[item] === '') {
            style[item] = null;
        }
    })
    
}
module.exports = layout;