const css = require('css');
const EOF = Symbol('EOF');
const layout = require('./layout.js');

let currentToken = null;
let currentAttr = null;
let currentNextNode = null;
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