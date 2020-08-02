import { createElement, Text, Wrapper } from './createElement';
import { Timeline, Animation } from './animation';
import { cubicBezier } from './cubicBezier';
import { enableGesture } from './gesture';
export class Cls {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }
    setAttribute(name, v) {
        this[name] = v;
    }
    appendChild(child) {
        this.children.push(child);
    }
    render() {
        let timeline = new Timeline;
        timeline.start();
        let position = 0;
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
                let dx = e.clientX - e.startX;
                let curV = - 500 * i + offset + dx;
                let lastV = -500 - 500 * lastPos + offset + dx;
                let nextV = 500 - 500 * nextPos + offset + dx;
                lastEl.style.transform = `translateX(${lastV}px)`;
                curEl.style.transform = `translateX(${curV}px)`;
                nextEl.style.transform = `translateX(${nextV}px)`;
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
                let lastAnimation = new Animation(lastEl.style, 'transform', - 500 - 500 * lastPos + offset + dx, -500 - 500 * lastPos + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
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
            let curAnimation = new Animation(cur.style, 'transform', - 100 * position, - 100 - 100 * position, 500, 0, ease, v => `translateX(${5 * v}px)`); 
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