export function enableGesture(el) {
    let ctxs = new Map();
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
    let start = (p, ctxs) => {
        el.dispatchEvent(new CustomEvent('start', {
            startX: ctxs.startX,
            startY: ctxs.startY,
            clientX: ctxs.clientX,
            clientY: ctxs.clientY
        }));
        ctxs.startX = p.clientX, ctxs.startY = p.clientY;
        ctxs.isPan = false;
        ctxs.isTap = true;
        ctxs.isPress = false;
        ctxs.moves = [];
        ctxs.timer = setTimeout(() => {
            if(ctxs.isPan) return;
            ctxs.isPan = false;
            ctxs.isTap = false;
            ctxs.isPress = true;
            console.log('pressstart');
            el.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {}));
        }, 500)
    }
    let move = (p, ctxs) => {
        let dx = p.clientX - ctxs.startX, dy = p.clientY - ctxs.startY;
        if (ctxs.isPress) {
            el.dispatchEvent(Object.assign(new CustomEvent('presscancel'), {}));
        }
        if (dx ** 2 + dy ** 2 > 100 && !ctxs.pan) {
            ctxs.isPan = true;
            ctxs.isTap = false;
            ctxs.isPress = false;
            console.log('panstart');
            el.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
                startX: ctxs.startX,
                startY: ctxs.startY,
                clientX: ctxs.clientX,
                clientY: ctxs.clientY
            }));
        }
        ctxs.moves.push({
            dx, dy, t: Date.now()
        })
        ctxs.moves = ctxs.moves.filter(r => Date.now() - r.t < 300);
        if (ctxs.isPan) {
            el.dispatchEvent(Object.assign(new CustomEvent('pan'), {
                startX: ctxs.startX,
                startY: ctxs.startY,
                clientX: p.clientX,
                clientY: p.clientY
            }));
            console.log('pan');
        }   
    }
    let end = (p, ctxs) => {
        if (ctxs.isPan) {
            let dx = p.clientX - ctxs.startX, dy = p.clientY - ctxs.startY;
            let r = ctxs.moves[0];
            let speed = Math.sqrt((r.dx - dx) ** 2 + (r.dy - dy) ** 2) / (Date.now() - r.t);
            console.log('panend');
            console.log(speed);
            if (speed > 2.5) {
                el.dispatchEvent(Object.assign(new CustomEvent('flick'), {
                    startX: ctxs.startX,
                    startY: ctxs.startY,
                    clientX: ctxs.clientX,
                    clientY: ctxs.clientY,
                    speed: speed
                }));
                console.log('flick');
            }
        };
        el.dispatchEvent(Object.assign(new CustomEvent('panend'), {
            startX: ctxs.startX,
            startY: ctxs.startY,
            clientX: p.clientX,
            clientY: p.clientY
        }));
        if (ctxs.isTap) {
            el.dispatchEvent(Object.assign(new CustomEvent('tap'), {}));
            console.log('tap');
        }
        if (ctxs.isPress) {
            el.dispatchEvent(Object.assign(new CustomEvent('pressend'), {}));
            console.log('pressend');
        }
        clearTimeout(ctxs.timer);
    }
    let cancel = (p, ctxs) => {
        clearTimeout(ctxs.timer);
    }
}
