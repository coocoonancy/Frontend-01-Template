# 每周总结可以写在这里
[note.md](https://github.com/coocoonancy/Frontend-01-Template/blob/master/week13/NOTE.md)
###### 编程算法 | Proxy与双向绑定
[code](https://github.com/coocoonancy/Frontend-01-Template/blob/master/week13/proxy.html)
[code](https://github.com/coocoonancy/Frontend-01-Template/blob/master/week13/drag.html)

###### 组件化基础
###### 对象
######  组件
###### 组件机制
```
- User Input
- Component User's Mark Up Code
    - State/Children
- Component User's JS Code
    - attribute/method/property/event
```
###### Attribute vs Property
- Attribute 描述性
- Property 从属关系
- 两者重叠关系
1. 特例 class classList className
2. a标签href (JS resolve的结果, html 一致)
3. input value
###### 如何设计组件状态
- property/attribute/state/config
- property 可JS Set 及 JS Change
- attribute 可JS Set 及 JS Change 及 Mark Up
- state 可User Input
- config 可JS Set
###### 组件基本结构
```
class MyComponent {
    constructor(config) {
        this.state {
            i: 1
        }
    }
    get prop() {

    }
    set prop() {

    }
    setAttribute(attr) {

    }
    getAttribute(attr, value) {

    }
    get children() {

    }
    set children() {

    }
}
```
###### 组件生命周期
``` 
created - mounte - unmount
render/update
destoryed
<!-- 改变状态方式 -->
JS Set
JS Change
User Input

```
###### 组件Children
```
template型children
content型children
```
###### 如何设计轮播图组件
```
config
    mode,userPAF,userTimeout
state
    active
property
    loop time imglist autoplay color forward 
attribute
    start
children
    img
event
    click swipe hover 
method
    go() next() play()
```

