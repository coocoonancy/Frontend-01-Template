import { createElement, Text, Wrapper } from './createElement';
export class Panel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }
    setAttribute(name, v) {
        this[name] = v;
    }
    getAttribute(name) {
        return this[name];
    }
    get innerText() {

    }
    appendChild(child) {
        this.children.push(child);
    }
    select(i) {
        for (const v of this.childrenV) {
            v.style.display = 'none';
        }
        this.childrenV[i].display = '';
        for (const v of this.h1V) {
            // v.style.display = 'none';
            v.classList.remove('selected');
        }
        // this.h1V[i].display = '';
        this.h1V[i].classList.add('selected');
        // this.h1V.innerText = this.children[i].title;
    }
    render() {
        this.childrenV = this.children.map(item => <div>{item}</div>);
        this.h1V = this.children.map((item, i) => <div style="background: salmon;display:inline-block;width: 300px;" onClick={() => this.select(i)}>{item.getAttribute('title') || ''}</div>);
        setTimeout(() => {
            this.select(0);
        }, 0);
        return <div class="panel" style="border: 1px solid salmon;width: 300px;">
        {this.h1V}
        <div style="width: 300px;min-height: 100px;">
            { this.childrenV }
        </div>
    </div>;
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}