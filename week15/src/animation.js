export class Timeline {
    constructor() {
        this.animations = [];
        this.Id = null;
        this.state = 'init';
        this.tick = () => {
            let t = Date.now() - this.sTime;
            let animations = this.animations.filter(item => !item.finished);
            for (let animation of this.animations) {
                // if (t > animation.duration + animation.delay)
                //     continue;
                let { object, property, tmpl, start, end, duration, delay, timeFunction, aTime } = animation;
                let progress = timeFunction((t - delay - aTime) / duration);
                console.log('t', t, progress, duration, delay, aTime);
                if (t > duration + delay + aTime)
                    progress = 1;
                    animation.finished = true;
                // let value = start + progress * (end - start);
                let value = animation.vProgress(progress);
                console.log(value);
                object[property] = tmpl(value);
            }
            if (animations.length)
                this.Id = requestAnimationFrame(this.tick);
        }
    }
    // tick() {
    //     let t = Date.now() - this.sTime;
    //     let animations = this.animations.filter(item => !item.finished);
    //     for (const animation of this.animations) {
    //         // if (t > animation.duration + animation.delay)
    //         //     continue;
    //         let { object, property, tmpl, start, end, duration, delay, timeFunction } = animation;
    //         let progress = timeFunction((t - delay) / duration);
    //         if (t > animation.duration + animation.delay)
    //             progress = 1;
    //             animation.finished = true;
    //         let value = progress * (end - start);
    //         object[property] = tmpl(value);
    //     }
    //     requestAnimationFrame(() => this.tick());
    // }
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
        if (this.Id != null)
            cancelAnimationFrame(this.Id);
    }
    resume() {
        if (this.state !== 'pause') return;
        this.state = 'playing';
        this.sTime += Date.now() - this.pTime;
        this.tick();
    }
    restart() {
        if (this.state === 'playing') this.pause();
        this.animations = [];
        this.Id = null;
        this.state = 'playing';
        this.sTime = Date.now();
        this.pTime = null;
        this.tick();
    }
    add(animation, aTime) {
        this.animations.push(animation);
        animation.finished = false;
        if (this.state === 'playing') {
            animation.aTime = aTime !== void 0 ? aTime : Date.now() - this.sTime;
            console.log('aTime if', animation.aTime);
        }
        else {
            animation.aTime = aTime !== void 0 ? aTime : 0;
            console.log('aTime else', animation.aTime);
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