export class Timeline {
    constructor() {
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.aTimes = new Map();
        this.Id = null;
        this.state = 'init';
        this.tick = () => {
            let t = Date.now() - this.sTime;
            for (let animation of this.animations) {
                let { object, property, tmpl, start, end, duration, delay, timeFunction } = animation;
                let aTime = this.aTimes.get(animation);
                let progress = timeFunction((t - delay - aTime) / duration);
                // console.log('t', t, progress, duration, delay, aTime);
                if (t < delay + aTime) continue;
                if (t > duration + delay + aTime) {
                    progress = 1;
                    this.animations.delete(animation);
                    this.finishedAnimations.add(animation);
                }
                let value = animation.vProgress(progress);
                // console.log(value);
                object[property] = tmpl(value);
            }
            if (this.animations.size) this.Id = requestAnimationFrame(this.tick);
            else this.Id = null;
                
        }
    }
    start() {
        console.log('start');
        if (this.state !== 'init') return;
        this.state = 'playing';
        this.sTime = Date.now();
        this.tick();
    }
    pause() {
        if (this.state !== 'playing') return;
        this.state = 'pause';
        this.pTime = Date.now();
        if (this.Id != null) {
            cancelAnimationFrame(this.Id);
            this.Id = null;
        }
    }
    resume() {
        if (this.state !== 'pause') return;
        this.state = 'playing';
        this.sTime += Date.now() - this.pTime;
        this.tick();
    }
    restart() {
        if (this.state === 'playing') this.pause();
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.aTimes = new Map();
        this.Id = null;i
        this.sTime = Date.now();
        this.pTime = null;
        this.state = 'init';
    }
    resetplay() {
        if (this.state === 'playing') this.pause();
        for (const animation of this.finishedAnimations) {
            this.animations.add(animation);
        }
        this.finishedAnimations = new Set();
        this.Id = null;
        this.state = 'playing';
        this.sTime = Date.now();
        this.pTime = null;
        this.tick();
    }
    add(animation, aTime) {
        this.animations.add(animation);
        if (this.state === 'playing' && this.Id == null) {
            this.tick();
        }
        if (this.state === 'playing') {
            this.aTimes.set(animation, aTime !== void 0 ? aTime : Date.now() - this.sTime);
        }
        else {
            this.aTimes.set(animation, aTime !== void 0 ? aTime : 0);
        }
    }
}
export class Animation {
    constructor(object, property, start, end, duration, delay, timeFunction, tmpl) {
        this.object = object;
        this.tmpl = tmpl;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timeFunction = timeFunction;
    }
    vProgress(progress) {
        return this.start + progress * (this.end - this.start);
    }
}
export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timeFunction, tmpl) {
        this.object = object;
        this.tmpl = tmpl || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`);
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timeFunction = timeFunction;
    }
    vProgress(progress) {
        return {
            r: this.start.r + progress + (this.end.r - this.start.r),
            g: this.start.g + progress + (this.end.g - this.start.g),
            b: this.start.b + progress + (this.end.b - this.start.b),
            a: this.start.a + progress + (this.end.a - this.start.a)
        }
    }
}