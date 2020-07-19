# 每周总结可以写在这里

##### 动画要素
```
<!-- 目标，属性，开始，结束，时长，延迟 -->
object, property, start, end, duration, delay, timeFunction
let timeline = new Timeline();
let animation = new Animation(object, property, start, end, duration, delay, timeFunction)
```
##### 动画API
###### window.requestAnimationFrame和window.cancelAnimationFrame
- window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
- 
```
<!-- Timeline方法 -->
tick() // 执行动画
start() // 开始动画
pause() // 暂停动画
resume() // 恢复动画
add() // 将动画添加进时间线


加入timeline时间animatin.addTime 
动画开始时间startTime
动画延迟 delay
动画时长 duration


```
###### 重排与重绘
[重排reflow](https://developers.google.com/speed/docs/insights/browser-reflow)
[渲染树构建、布局及绘制](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn)