// 获取元素计算属性
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
// flex布局
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
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch'
    }
    // 主轴交叉轴变量
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
    // 未给宽度自适应
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
    // 行布局
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
    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = style[crossSize] != undefined ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }
    // 成比例缩小
    if (mainSpace < 0 ) {
        var scale = style[mainSize] / style[mainSize] - mainSpace;
        var curtainMain = mainBase;
        if (itemStyle.flex) {
            itemStyle[mainSize] = 0;
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);
            itemStyle[mainSize] = itemStyle[mainSize] * scale;
            itemStyle[mainStart] = curtainMain;
            itemStyle[End] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            curtainMain = itemStyle[mainEnd];
        }
    } else {
        flexLines.forEach(function(item){
            var mainSpace = items.mainSpace;
            var flexTotal=0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemStyle = getStyle(item);
                if (itemStyle.flex != null || itemStyle.flex != (void 0)) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }
            if (flexTotal > 0) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var itemStyle = getStyle(item);
                    if (itemStyle.flex) {
                        itemStyle[mainSize] = ( mainSpace / flexTotal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = curtainMain;
                    itemStyle[End] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    curtainMain = itemStyle[mainEnd];
                }
            } else {
                if (style.flexDirection === 'flex-start') {
                    var curtainMain = mainBase;
                    var step = 0;
                }
                if (style.flexDirection === 'flex-end') {
                    var curtainMain = mainSpace * mainSign + mainBase;
                    var step = 0;
                }
                if (style.flexDirection === 'center') {
                    var curtainMain = mainSpace / 2 * mainSign + mainBase;
                    var step = 0;
                }
                if (style.flexDirection === 'space-betwwen') {
                    var step = mainSpace / (items.length - 1) * mainSign;
                    var curtainMain = mainBase;
                }
                if (style.flexDirection === 'space-around') {
                    var step = mainSpace / items.length * mainSign;
                    var curtainMain = step / 2 * mainBase;
                }
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    // -------------------------- 这是什么意思咯咯 ----------------------------
                    itemStyle[mainStart, curtainMain];
                    itemStyle[mainEnd] = itemSyle[mainStart] + mainSign * itemStyle[mainSize];
                    curtainMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }
    // 处理交叉轴
    var crossSpace;
    if (!style[crossSize]) {
        crossSpace = 0;
        elStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i++) {
            elStyle[crossSize] = elStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace;
        }
    }
    if (style.flexWrao === 'wrap-reverse') {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }
    var lineSize = style[crossSize] / flexLines.length;
    var step;
    if (style.alignContent === 'flex-start') {
        crossBase += 0;
        step = 0;
    }
    if (style.alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if (style.alignItems === 'center') {
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }
    if (style.alignContent === 'space-between') {
        crossBase += 0;
        step = (crossSpace / flexLines.length - 1);
    }
    if (style.alignContent === 'space-around') {
        step = (crossSpace / flexLines.length);
        crossBase += step * crossSign / 2;
    }
    if (style.alignContent === 'stretch') {
        crossBase += 0;
        step = 0;
    }
    flexLines.forEach(function(item) {
        var lineCrossSize = item.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);
            var align = itemStye.alignItems || itemStye.alignSelf;
            if (itemStyle[crossSize] == null) {
                itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0;
            }
            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + (itemStyle[crossSize] != null || itemStyle[crossSize] != (void 0) ? itemStyle[crossSize] : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
            crossBase += crossSign * (lineCrossSize + step);
        }
    });
}
module.exports = layout;