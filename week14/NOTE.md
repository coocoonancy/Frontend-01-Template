# 每周总结可以写在这里
##### Single File Components
###### Vue 单文件组件 (SFC) 

[参考链接](https://vue-loader.vuejs.org/zh/spec.html#%E7%AE%80%E4%BB%8B)
[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html#%E4%BB%8B%E7%BB%8D)
1. 模板 
2. 脚本
3. 样式

###### 单文件解决的问题
- 全局定义 (Global definitions) 强制要求每个 component 中的命名不得重复
- 字符串模板 (String templates) 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
- 不支持 CSS (No CSS support) 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- 没有构建步骤 (No build step) 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

###### 关注点分离
- 关注点分离不等于文件类型分离。
- 在一个组件里，其模板、逻辑和样式是内部耦合的，并且把他们搭配在一起实际上使得组件更加内聚且更可维护。