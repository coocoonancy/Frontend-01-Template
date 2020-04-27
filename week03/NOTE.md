# 每周总结可以写在这里
#### week03 0421-0423总结

> 本周心得体会：

###### 0423
###### 关于Object小结
找出 JavaScript 标准里有哪些对象是我们无法实现出来的，都有哪些特性？写一篇文章，放在学习总结里。

我想应该是null Object Function Math Global吧 
从原型链的角度来看，任何对象的原型链的顶端是null, null是Object 没有原型

任何对象的原型链上都有Object.prototype
譬如说内置对象的原型链Object.prototype， 任何对象是构造函数Object创建出来的
函数也是对象，函数是Function创建出来的

实例==>Array.prototype ==> Object.prototype ==> null // Array既是构造函数也是Object
实例==>Date.prototype ==> Object.prototype ==> null // Date既是构造函数也是Object
Math.prototype ==> Object.prototype ==> null // Math不是构造函数也是Object
实例==>Function.prototype ==> Object.prototype ==> null // Function既是构造函数也是Object

```
###### 三只一模一样的鱼，其实是三个对象，如下
```
 [] == [] // false
```
###### 对象唯一（identifier），有状态（state），有行为(behavior)
###### 面向对象特性： 封装，继承，多态
###### 内置对象（Global, Math）：不依赖于执行宿主的内建对象，宿主对象（Host Object）：非Native Object的对象
##### 
       

###### 0421
1. 根据课上讲师已写好的部分，补充写完函数 convertStringToNumber 以及函数 convertNumberToString

##### 随堂作业
```
input::-webkit-outer-spin-buttton,
input::-webkit-inner-spin-buttton {
    -webkit-appearance: none;
}
input[type==='number'] {
    -moz-appearance: textfield // 实现去剪头效果;
}
Array(65).join(0).split('') 64长度数组值都为0
var bytes = new Unit8Array(8)
new Float64Array(bytes.buffer)
```