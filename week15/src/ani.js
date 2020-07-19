export class Timeline {
    constructor() {
        this.animations = [];
    }
    tick() {
        let t = Date.now() - this.sTime;
        for (const animation of this.animations) {
            if (t > animation.duration + animation.delay)
                continue;
            let { object, property, tmpl, start, end, delay, timeFunction } = animation;
            object[property] = tmpl(timeFunction(start, end)(t - delay));
        }
        requestAnimationFrame(() => this.tick());
    }
    start() {
        this.sTime = Date.now();
        this.tick();
    }
    add(animation) {
        this.animations.push(animation);
    }
}
export class Animation {
    constructor(object, property, tmpl, start, end, duration, delay, timeFunction) {
        this.object = object;
        this.tmpl = tmpl;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay || 0;
        this.timeFunction = timeFunction || ((start, end) => {
            return (t) => start + (t / duration) * (end - start);
        })
    }
}