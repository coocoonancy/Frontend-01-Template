import { createElement, Text, Wrapper } from './createElement';
import { Timeline, Animation } from './animation';
import { cubicBezier } from './cubicBezier';
import { enableGesture } from './gesture';

class Cls {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }
    setAttribute(name, v) {
        this[name] = v;
    }
    appendChild() {
        this.children.push(child);
    }
    render() {
        let timeline = new Timeline;
        let position = 0;
        timeline.start();
        let nextPicStopFun = null;
        const ease = cubicBezier(.25, .1, .25, 1);
        let child = this.data.map((url, i) => {
            let lastPos = (i - 1 + this.data.length) % this.data.length;
            let nextPos = (i + 1) % this.data.length;
            let offet = 0;
            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopFun);
                let curEl = child[i];
                let curV = Number(curEl.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = curV + 500 * i;
            }
            let onPan = (e) => {
                let lastEl = child[lastPos];
                let curEl = child[i];
                let nextEl = child[nextPos];
                let curV = - s500 * i + offset;
                let lastV = -500 - 500 * lastPos + offset;
                let nextV = 500 - 500 * nextPos + offset;
                let dx = e.clientX - e.startX;
                lastEl.style.transform = `translateX(${lastV + dx}px)`;
                curEl.style.transform = `translateX(${curV + dx}px)`;
                nextEl.style.transform = `translateX(${nextV + dx}px)`;
            }
            let onPanend = e => {
                let direction = 0;
                let dx = e.clientX - e.startX;
                if (dx + offset > 250) {
                    direction = 1;
                } else if (dx + offset < -250) {
                    direction = -1;
                }
                timeline.restart();
                timeline.start();
                let lastEl = child[lastPos];
                let curEl = child[i];
                let nextEl = child[nextPos];
                let lastAnimation = new Animation(lastEl.style, 'transform', - 500 - 500 * lastPos + offset + dx, - 500 - 500 * lastPos + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let curAnimation = new Animation(curEl.style, 'transform', - 500 * i + offset + dx, - 500 * i + direction * 500, 500, 0, ease, v => `translateX(${v}px)`); 
                let nextAnimation = new Animation(nextEl.style, 'transform', 500 - 500 * nextPos + offset + dx,500 - 500 * nextPos + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                timeline.add(lastAnimation);
                timeline.add(curAnimation);
                timeline.add(nextAnimation);
                position = (position - direction + this.data.length) % this.data.length;
                nextPicStopFun = setTimeout(nextPic, 3000);
            }
            let el = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />;
            el.style.transform = 'translateX(0px)';
            el.addEventListener('dragstart', e => e.preventDefault());
            return el;
        })
        let root = (<div class='csl'>{child}</div>);
        let nextPic = () => {
            let nextPos = (position + 1) % this.data.length;
            let cur = child[position];
            let next = child[nextPos];
            let curAnimation = new Animation(cur.style, 'transform', - 100 * position, -100 - 100 * position, 500, 0, ease, v => `translateX(${5 * v}px)`); 
            let nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPos, - 100 * nextPos, 500, 0, ease, v => `translateX(${5 * v}px)`); 
            timeline.add(curAnimation);
            timeline.add(nextAnimation);
            position = nextPos;
            nextPicStopFun = setTimeout(nextPic, 3000);
        }
        nextPicStopFun = setTimeout(nextPic, 3000);
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
