export function createElement(Com, attrs, ...childrens) {
    let o;
    if (typeof Com === 'string') {
        o = new Wrapper(Com);
    } else {
        o = new Com({
            time: {}
        });
    }
    for (let attr in attrs) {
        o.setAttribute(attr, attrs[attr]);
    }

    // for (let children of childrens) {
    //     if (typeof children === 'string') {
    //         children = new Text(children); 
    //     }
    //     o.appendChild(children);
    // }
    let visit = (childrens) => {
        for (let child of childrens) {
            if (typeof (child) === 'object' && child instanceof Array) {
                visit(child);
                continue;
            }
            if (typeof child === "string")
                child = new Text(child);

            o.appendChild(child);
        }
    }
    visit(childrens);
    return o;
}
export class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }
    setAttribute(name, v) {
        this.root.setAttribute(name, v);
    }
    appendChild(child) {
        this.children.push(child);
    }
    addEventListener() {
        this.root.addEventListener(...arguments);
    }
    get style() {
        return this.root.style;
    }
    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
}
export class Text {
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}