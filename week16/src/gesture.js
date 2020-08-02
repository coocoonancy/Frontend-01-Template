export function enableGesture(el) {
    let ctxs = Object.create(null);
    let MOUSE_SYMBOL = Symbol('mouse');
    el.addEventListener('mousedown', e => {
        ctxs[MOUSE_SYMBOL] = Object.create(null);
        start(e, ctxs[MOUSE_SYMBOL]);
        let mousemove = e => {
            move(e, ctxs[MOUSE_SYMBOL]);
        }
        let mouseend = e => {
            end(e, ctxs[MOUSE_SYMBOL]);
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseend);
        }
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseend);
    })
    el.addEventListener('touchstart', e => {
        for (let touch of e.changedTouches) {
            ctxs[touch.identifier] = Object.create(null);
            start(touch, ctxs[touch.identifier]);
        } 
        console.log(e.changedTouches[0]);
    })
    el.addEventListener('touchmove', e => {
        for (let touch of e.changedTouches) {
            move(touch, ctxs[touch.identifier]);
        } 
    })
    el.addEventListener('touchend', e => {
        for (let touch of e.changedTouches) {
            end(touch, ctxs[touch.identifier]);
            delete ctxs[touch.identifier];
        }
    })
    el.addEventListener('touchcancel', e => {
        for (let touch of e.changedTouches) {
            cancel(touch, ctxs[touch.identifier]);
            delete ctxs[touch.identifier];
        }
    })
    let start = (p, ctx) => {
        el.dispatchEvent(new CustomEvent('start', {
            startX: p.clientX,
            startY: p.clientY,
            clientX: p.clientX,
            clientY: p.clientY
        }));
        ctx.startX = p.clientX, ctx.startY = p.clientY;
        ctx.isPan = false;
        ctx.isTap = true;
        ctx.isPress = false;
        ctx.moves = [];
        ctx.timer = setTimeout(() => {
            if(ctx.isPan) return;
            ctx.isPan = false;
            ctx.isTap = false;
            ctx.isPress = true;
            console.log('pressstart');
            el.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {}));
        }, 500)
    }
    let move = (p, ctx) => {
        let dx = p.clientX - ctx.startX, dy = p.clientY - ctx.startY;
        if (ctx.isPress) {
            el.dispatchEvent(Object.assign(new CustomEvent('presscancel'), {}));
        }
        if (dx ** 2 + dy ** 2 > 100 && !ctx.isPan) {
            ctx.isPan = true;
            ctx.isTap = false;
            ctx.isPress = false;
            console.log('panstart');
            el.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
                startX: ctx.startX,
                startY: ctx.startY,
                clientX: p.clientX,
                clientY: p.clientY
            }));
        }
        if (ctx.isPan) {
            ctx.moves.push({
                dx, dy, t: Date.now()
            })
            ctx.moves = ctx.moves.filter(r => Date.now() - r.t < 300);
            el.dispatchEvent(Object.assign(new CustomEvent('pan'), {
                startX: ctx.startX,
                startY: ctx.startY,
                clientX: p.clientX,
                clientY: p.clientY
            }));
            console.log('pan');
        }   
    }
    let end = (p, ctx) => {
        if (ctx.isPan) {
            let dx = p.clientX - ctx.startX, dy = p.clientY - ctx.startY;
            let r = ctx.moves[0];
            let speed = Math.sqrt((r.dx - dx) ** 2 + (r.dy - dy) ** 2) / (Date.now() - r.t);
            console.log('panend');
            console.log(speed);
            if (speed > 2.5) {
                el.dispatchEvent(Object.assign(new CustomEvent('flick'), {
                    startX: ctx.startX,
                    startY: ctx.startY,
                    clientX: p.clientX,
                    clientY: p.clientY,
                    speed: speed
                }));
                console.log('flick');
            }
            el.dispatchEvent(Object.assign(new CustomEvent('panend'), {
                startX: ctx.startX,
                startY: ctx.startY,
                clientX: p.clientX,
                clientY: p.clientY,
                speed: speed,
                isFlick: speed - 2.5
            }));
        };
        if (ctx.isTap) {
            el.dispatchEvent(Object.assign(new CustomEvent('tap'), {}));
            console.log('tap');
        }
        if (ctx.isPress) {
            el.dispatchEvent(Object.assign(new CustomEvent('pressend'), {}));
            console.log('pressend');
        }
        clearTimeout(ctx.timer);
    }
    let cancel = (p, ctx) => {
        el.dispatchEvent(Object.assign(new CustomEvent('cancel'), {}));
        clearTimeout(ctx.timer);
    }
}
