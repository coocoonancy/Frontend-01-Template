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
    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row'
    }
    if(!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start'
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch'
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if (!style.alignContent || style.alignContent ==== 'auto') {
        style.alignContent = 'stretch'
    }
    var mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'column') {
        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
        crossSign = +1;
        crossBase = 0;
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
    }
    if (style.flexDirection === 'row-reverse') {
        crossSize = 'height';
        crossStart = 'bottom';
        crossEnd = 'top';
        crossSign = -1;
        crossBase = style.height;
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
    }
    if (style.flexDirection === 'wrap-reverse') {
        var temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }
    var isAutoMainSize = false;
    if (!style[mainSize]) {
        elStyle[mainSize] = 0;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item[mainSize] != null || item[mainSize] != (void 0)) {
                elStyle[mainSize] = elStyle[mainSize] + item[mainSize];
            }
        }
        isAutoMainSize = true;
    }
    var flexLine = [];
    var flexLines = [flexLine];
    var mainSpace = elStyle[mainSize];
    var crossSpace = 0;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(item);
        if (itemStyle[mainSize] == null) {
            itemStyle[mainSize] = 0;
        }
        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (itemStyle.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] != null || crossSize[mainSize] != (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        } else {
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize];
            }
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }
            if (itemStyle[crossSize] != null || crossSize[mainSize] != (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;
}
module.exports = layout;