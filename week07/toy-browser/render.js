const images = require('images');
function render(viewport, el) {
    if (el.style) {
        var imgs = images(el.style.width, el.style.height);
        if (el.style['background-color']) {
            let color = el.style['background-color'] || 'rgb(0,0,0)';
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            imgs.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$2), 1);
            viewport.draw(imgs, el.style.left || 0, el.style.top || 0)
        }
    }
    if (el.children) {
        for (var child of el.children) {
            render(viewport, child)
        }
    }
}
module.exports = render;