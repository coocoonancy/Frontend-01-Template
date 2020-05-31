const css = require('css');
const EOF = Symbol('EOF');
const layout = require('./layout.js');

let currentToken = null;
let currentAttr = null;
let currentNextNode = null;
// 栈
let stack = [{ type: 'document', children: [] }];
let rules = [];
function addCssRules(text) {
    var ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}
function match(el,selector) {
    if (!selector || !el.attributes) return false;
    if (selector.charAt(0) === '#') {
        var attr = el.attributes.filter(attr => attr.name === "id")[0];
        if (attr && attr.value === selector.replace('#', '.')) return true;
    } else if (selector.charAt(0) === '.') {
        var attr = el.attributes.filter(attr => attr.name === "class")[0];
        if (attr && attr.value === selector.replace('#', '.')) return true; 
    } else {
        if (tagName === selector) {
            return true;
        }
    }
}
function speclicity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(' ');
    for (var part of selectorParts) {
        if (part.charAt(0) === '#') {
            p[1] += 1;
        } else if (part.charAt(0) === '.') {
            p[2] += 1;
        } else {
            p[3] +=1;
        }
    }
}
function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0]
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1]
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2]
    }
    return sp1[3] - sp2[3]
}
function computeCss(el) {
    var els = el.slice().reverse();
    var matched;
    if (!el.computedStyle) el.computedStyle = {};
    for (let rule of rules) {
        var selectorParts = rule.selector[0].split(' ').reverse();
        if (!match(el, selectorParts[0])) continue;
        var j = 1;
        for (let j = 0; j < els.length; j++) {
            if (match(els[i], selectorParts[0])) j++;
        }
        if (j === els.length) matched = true;
        if (matched) {
            var sp = speclicity(rule.selector[0]);
            var computedStyle = el.computedStyle;
            for (var declaration of rule.declarations)
            if (!computedStyle[declaration.property]) computedStyle[declaration.property] = {};
            if (!computedStyle[declaration.speclicity]) {
                computedStyle[declaration.property].value = declaration.value;
                computedStyle[declaration.property].speclicity = sp;
            } else if (compare(computedStyle[declaration.property].speclicity, sp) < 0) {
                for(var k = 0; k < 4; k++) {
                    computedStyle[declaration.property][declaration.value] += sp[k];
                }
            }
            console.log(computedStyle);
        }
    }
}
function emit(token) {
    let top = stack[stack.length - 1];
    if (token.type === 'startTag') {
        let el = {
            type: 'element',
            children: [],
            attributes: []
        }
        el.tagName = token.tagName;
        for (let p of token) {
            if (p !== 'type' || p !== 'tagName') {
                el.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        computeCss(el);
        layout(el);
        top.children.push(el);
        if (!currentToken.isSelfClosing) {
            stack.push(el)
        }
        currentNextNode = null;
    } else if (token.type === 'endTag') {
        if (top.tagName != token.tagName) {
            throw Error('')
        } else {
            if (top.tagName === 'style') {
                addCssRules(top.children[0].content);
                stack.pop()
            }
            layout(top);
            currentNextNode = null;
        }
    } else if (token.type === 'text') {
        if (currentNextNode == null) {
            currentNextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentNextNode);
        }
        currentNextNode.content += token.content;
    }
} 
// 状态机处理文本
function data(c) {
    if (c === '<') {
        return tagOpen
    } else if (c == EOF) {
        emit({
            type: 'EOF'
        })
        return;
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data;
    }
}
function tagOpen(c) {
    if (c === '/') {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        emit({
            type: 'text',
            content: c
        })
        return;
    }
}
function tagName(c) {
    if (c.match(/^[\t\f\n ]$/)) {
        return beforeAttributeName
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === '>') {
        emit(currentToken);
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}
function beforeAttributeName(c) {
    if (c.match(/^[\t\f\n ]$/)) {
        return beforeAttributeName;
    } else if (c === '/' || c === '>'  || c == EOF) {
        return afterAttributeName;
    } else if (c === '=') {
    } else {
        currentAttr = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}
function attributeName(c) {
    if (c.match(/^[\t\f\n ]$/ || c === '/' || c === '>'  || c == EOF)) {
        return afterAttributeName(c);
    } else if (c === '\u0000') {
    } else if (c === '\"' || c === "\'" || c === '<') {
    } else {
        currentAttr.name += c;
        return attributeName;
    }
}
function beforeAttributeValue(c) {
    if (c.match(/^[\t\f\n ]$/ || c === '/' || c === '>'  || c == EOF)) {
        return beforeAttributeValue;
    } else if (c === '\"') {
        return doubleQuoteAttributeValue
    } else if (c === "\'") {
        return singleQuoteAttributeValue
    } else if (c === '>') {
        return data;
    } else {
        return unQuoteAttributeValue(c)
    }
}
function doubleQuoteAttributeValue(c) {
    if (c === "\'") {
        currentToken[currentAttr.name] = currentAttr.value;
        return afterQuoteAttributeValue;
    } else if (c === '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttr.value += c;
        return doubleQuoteAttributeValue
    }
}
function singleQuoteAttributeValue(c) {
    if (c === '\"') {
        currentToken[currentAttr.name] = currentAttr.value;
        return afterQuoteAttributeValue;
    } else if (c === '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttr.value += c;
        return doubleQuoteAttributeValue
    }
}
function afterQuoteAttributeValue(c) {
    if (c === /^[\t\n\f ]$/) {
        return beforeAttributeName
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '>') {
        currentToken[currentAttr.name] = currentAttr.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        currentAttr.value += c;
        return doubleQuoteAttributeValue;
    }
}
function unQuoteAttributeValue(c) {
    if (c === /^[\t\n\f ]$/) {
        currentToken[currentAttr.name] = currentAttr.value;
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '>') {
        currentToken[currentAttr.name] = currentAttr.value;
        emit(currentToken);
        return data;
    } else if (c === '\"' || c === "\'" || c === '<' || c === '=') {

    } else if (c == EOF) {

    } else {
        currentAttr.value += c;
        return unQuoteAttributeValue;
    }

}
function selfClosingStartTag(c) {
    if (c === '>' ) {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
    } else {
    }
}
function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c);
    } else if (c === '>' ) {
        currentToken.isSelfClosing = true;
    } else if (c == EOF) {
    } else {
    }
}
function afterAttributeName(c) {
    if (c.match(/^[\t\f\n ]$/)) {
        return afterAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '>') {
        currentToken[currentAttr.name] = currentAttr.value;
        emit(currentAttr);
        return data;
    } else if (c == EOF) {

    } else {
        currentToken[currentAttr.name] = currentAttr.value;
        currentAttr = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

module.exports.parseHTML = function(html) {
    let state = data;
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF);
    return stack[0]
}