import { createElement, Text, Wrapper } from './createElement';

class Cls {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        // this.attributes = {};
        // this.properties = {};
    }
    setAttribute(name, v) {
        this[name] = v;
    }
    appendChild() {
        this.children.push(child);
    }
    render() {
        let child = this.data.map(url => {
            let el = <img src={url} />;
            el.addEventListener('dragstart', e => e.preventDefault());
            return el;
        })
        let root = (<div class='csl'>{child}</div>);
        let position = 0;
        let nextPic = () => {
            let nextPos = (position + 1) % this.data.length;
            let cur = child[position];
            let next = child[nextPos];
            cur.style.transition = "ease 0s";
            next.style.transition = "ease 0s";
            cur.style.transform = `translateX(${- 100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPos}%)`;
            setTimeout(() => {
                cur.style.transition = "";
                next.style.transition = "";
                cur.style.transform = `translateX(${- 100 - 100 * position}%)`;
                next.style.transform = `translateX(${- 100 * nextPos}%)`;
                position = nextPos;
            }, 16);
            setTimeout(nextPic, 3000);
        }
        setTimeout(nextPic, 3000);
        // root.addEventListener('mousedown', (event) => {
        //     let startX = event.clientX, startY = event.clientY;

        //     let lastPos = (position - 1 + this.data.length) % this.data.length;
        //     let nextPos = (position + 1) % this.data.length;

        //     let last = root.childNodes[lastPos];
        //     let cur = root.childNodes[position];
        //     let next = root.childNodes[nextPos];

        //     last.style.transition = "ease 0s";
        //     cur.style.transition = "ease 0s";
        //     next.style.transition = "ease 0s";

        //     last.style.transform = `translateX(${- 500 - 500 * position}px)`;
        //     cur.style.transform = `translateX(${- 500 * position}px)`;
        //     next.style.transform = `translateX(${500 - 500 * nextPos}px)`;

        //     let move = event => {
        //         last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPos}px)`;
        //         cur.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
        //         next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPos}px)`;
        //     }
        //     let up = (event) => {
        //         let offset = 0;
        //         if (event.clientX - startX > 250) {
        //             offset = 1;
        //         } else if (event.clientX - startX < -250) {
        //             offset = -1;
        //         }
        //         last.style.transition = "";
        //         cur.style.transition = "";
        //         next.style.transition = "";

        //         last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPos}px)`;
        //         cur.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
        //         next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPos}px)`;

        //         position = (position - offset + this.data.length) % this.data.length;

        //         document.removeEventListener('mousemove', move);
        //         document.removeEventListener('mouseup', up);
        //     }
        //     document.addEventListener('mousemove', move);
        //     document.addEventListener('mouseup', up);
        // })
        return root;
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}

let component = <Cls data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

component.mountTo(document.body);
