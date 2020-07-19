// export class Timeline {
//     constructor() {
//         this.animations = [];
//         this.Id = null;
//         this.state = 'init';
//         this.tick = () => {
//             let t = Date.now() - this.sTime;
//             let animations = this.animations.filter(item => !item.finished);
//             for (const animation of this.animations) {
//                 // if (t > animation.duration + animation.delay)
//                 //     continue;
//                 let { object, property, tmpl, start, end, duration, delay, timeFunction, sTime } = animation;
//                 let progress = timeFunction((t - delay - sTime) / duration);
//                 if (t > duration + delay + sTime)
//                     progress = 1;
//                     animation.finished = true;
//                 // let value = start + progress * (end - start);
//                 let value = animation.vProgress(progress);
//                 object[property] = tmpl(value);
//             }
//             if (animations.length)
//                 this.Id = requestAnimationFrame(this.tick);
//         }
//     }
//     // tick() {
//     //     let t = Date.now() - this.sTime;
//     //     let animations = this.animations.filter(item => !item.finished);
//     //     for (const animation of this.animations) {
//     //         // if (t > animation.duration + animation.delay)
//     //         //     continue;
//     //         let { object, property, tmpl, start, end, duration, delay, timeFunction } = animation;
//     //         let progress = timeFunction((t - delay) / duration);
//     //         if (t > animation.duration + animation.delay)
//     //             progress = 1;
//     //             animation.finished = true;
//     //         let value = progress * (end - start);
//     //         object[property] = tmpl(value);
//     //     }
//     //     requestAnimationFrame(() => this.tick());
//     // }
//     start() {
//         if (this.state !== 'init') return;
//         this.state = 'playing';
//         this.sTime = Date.now();
//         this.tick();
//     }
//     add(animation, sTime) {
//         this.animations.push(animation);
//         animation.finished = false;
//         if (this.state === 'playing')
//             animation.sTime = sTime !== void 0 ? sTime : Date.now() - this.sTime;
//         else 
//             animation.sTime = sTime !== void 0 ? sTime : 0;
//     }
//     pause() {
//         if (this.state !== 'playing') return;
//         this.state = 'pause';
//         this.pTime = Date.now();
//         if (this.Id != null)
//             cancelAnimationFrame(this.Id);
//     }
//     resume() {
//         if (this.state !== 'pause') return;
//         this.state = 'playing';
//         this.sTime += Date.now() - this.pTime;
//         this.tick();
//     }
//     restart() {
//         if (this.state === 'playing') this.pause();
//         this.animations = [];
//         this.Id = null;
//         this.state = 'init';
//         this.sTime = Date.now();
//         this.pTime = null;
//         this.tick();
//     }
//     vProgress(progress) {
//         return {
//             r: this.start.r + progress + (this.end.r - this.start.r),
//             g: this.start.g + progress + (this.end.g - this.start.g),
//             b: this.start.b + progress + (this.end.b - this.start.b),
//             a: this.start.a + progress + (this.end.a - this.start.a)
//         }
//     }
// }
// export class Animation {
//     constructor(object, property, tmpl, start, end, duration, delay, timeFunction) {
//         this.object = object;
//         this.tmpl = tmpl;
//         this.property = property;
//         this.start = start;
//         this.end = end;
//         this.duration = duration;
//         this.delay = delay || 0;
//         this.timeFunction = timeFunction || ((start, end) => {
//             return (t) => start + (t / duration) * (end - start);
//         })
//     }
// }
// export class ColorAnimation {
//     constructor(object, property, start, end, duration, delay, timeFunction, tmpl) {
//         this.object = object;
//         this.tmpl = tmpl || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`);
//         this.property = property;
//         this.start = start;
//         this.end = end;
//         this.duration = duration;
//         this.delay = delay || 0;
//         this.timeFunction = timeFunction || ((start, end) => {
//             return (t) => start + (t / duration) * (end - start);
//         })
//     }
// }
import { Timeline, Animation, ColorAnimation } from './animation.js';
let linear = t => t;
let el = document.getElementById('ani');
console.log('ani', el, el.style);
let el2 = document.getElementById('ani2');
let tl = new Timeline;
// tl.add(new Animation(el.style, 'transform', v=> `translateX${v}px`, 0, 200, 5000, 0, linear));
tl.add(new Animation(el.style, 'transform', 0, 200, 5000, 0, linear, v => `translateX(${v}px`));
tl.start();
// document.getElementById('ani1').style.transform = 'translateX(200px)';
document.getElementById('pause').addEventListener('click', () => tl.pause());
document.getElementById('resume').addEventListener('click', () => tl.resume());
// document.getElementById('restart').addEventListener('click', () => {
//     tl.add(new Animation(el2.style, 'transform', v=> `translateX${v}px`, 0, 200, 5000, 0, linear));
// });
document.getElementById('restart').addEventListener('click', () => {
    tl.add(new ColorAnimation(el.style, 'backgroundColor', { r: 0, g: 0, b: 0, a: 1 }, { r: 255, g: 0, b: 0, a: 1 }, 5000, 0, linear));
});