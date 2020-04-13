# 每周总结可以写在这里

#### week01 0407-0412总结
[同步文档](https://juejin.im/editor/posts/5e93d73851882573a67f586c)

> 本周心得体会：主要从三个方面介绍了前端体系
1. 学习方法
2. 构建知识体系
3. 工程体系
最大的感受是不来直接的上代码，信息量很大，你以为你知道的其实你是不知道的。

- 你会去溯源了解背后的设计思想及本质吗？ ———— 以前不会，现在要会了，
- 你会从winter的维度构建知识体系吗？ ———— 有维度，但是现在是全新的角度，
- 你会怎样实现自己的职业发展？ ———— 不明确，但是提供了业务型，技术型，工程型三个方面去努力。

- 关于加班：由于程序不稳定给老板带来的不安全性心理所造成的
- 关于汇报：未经汇报的工作等同于白做

> 随堂笔记：
###### 职业晋升成就型三案例：
- 业务型成就：导购应用点击率
  - 目标：识别图片价格
  - 方案：给tab增加手势操作
  - 结果：点击率提升3倍
  - 实施：编写tab组件，业务推广
  - 评估：推广到导购业务，符合预期
- 科技型成就：爬取商品价格
  - 目标：识别图片价格
  - 方案：JS数字识别技术
- 工程型成就：XSS攻击预防及URL库标准化
  - 目标：质量，效率
  - 方案和实施：（规章制度，库，标准，系统）整理安全手册——review历史代码——代码扫描工具——宣讲——review代码——更改代码发布上线——线上监控
  - 结果：XSS漏洞减少
###### 技术架构：
- 客户端架构：解决软件需求规模带来的复杂性
- 服务端架构：解决大量需求访问带来的复杂性
- 前端架构：解决大量页面需求带来的重复劳动性
###### 工具链：
- init run test build
- 脚手架
- 本地测试
- 单元调试
- 持续集成（Daily Build, BVT, CICD）
- 发布

###### 04.07
1. 编写一个 DOM 编辑器：可以自由地操作一个 iframe（空白）中的 DOM 结构，包括增、删、移动。
2. 讲讲 position float display 各有哪些取值，它们互相之间会如何影响？

 - position 
   - fixed 固定定位 
   - absoulte 绝对定位
   - relative 相对定位
 - display
   - flex
   - grid
   - inline
   - inline-block
   - block
 - float
   - left
   - right
3. JavaScript 启动后，内存中有多少个对象？如何用代码来获得这些信息？
```

Array.prototype.map.call($0.querySelectorAll('code), e => e.innerText).join('\n')

```
4. HTML 的中，如何写一个值为 “a”=‘b’ 的属性值？
这个问题不是很理解题意，是在元素里写属性的值是“a”=‘b’？譬如如下：
[code](https://github.com/coocoonancy/Frontend-01-Template/tree/master/week01/practice/index.html)

```
<span data="&quot;a&quot;=&apos;b&apos;">

```

5. 编写一个快速排序代码，并且用动画演示它的过程。
[冒泡排序code](https://github.com/coocoonancy/Frontend-01-Template/blob/master/week01/BubbleSorting/index.html)

###### 04.09

1. 把面向对象这个概念用追溯法写一篇博文，写在自己的博客中，例如：博客园、稀土、掘金等，不限平台；你也可以写到 GitHub 的 Issues 里。把链接发到班级群里，跟大家分享。（不作为日常作业统计）

2. 你能不能在 ECMA 中找到所有的类型（Type）

- primitive built-in typeslues: 
Undefined, Null, Boolean, Number, String, and Symbol
object: Object
function: callable object/method
ECMAScript entities built-in objects: 
- fundamental: Object, Function, Boolean, Symbol
- reflection objects: Proxy, Reflect
- control abstractions: generator functions, Promise
- structured data objects: JSON object, ArrayBuffer, SharedArrayBuffer, and DataView
- numeric values objects: Math, Number:, Date
- text processing objects: String, RegExp
- keyed collections: Map, Set
- Error objects: Error
[Error Types](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
- indexed values: Array
[Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

3. 把课上老师的脑图里的这些实体补全
[补充Xmind](https://github.com/coocoonancy/Frontend-01-Template/tree/master/week01/前端技术2.xmind)

###### 如下实体列表
结果 实体名称 实体编号
"	 &quot;	    &#34;
'	 &apos;	    &#39;
&	 &amp;	    &#38;
<	 &lt;	    &#60;
>	 &gt;	    &#62;
 	 &nbsp;	    &#160;
¡	 &iexcl;	&#161;
¢	 &cent;	    &#162;
£	 &pound;	&#163;
¤	 &curren;	&#164;
¥	 &yen;	    &#165;
¦	 &brvbar;	&#166;
§	 &sect;	    &#167;
¨	 &uml;	    &#168;
©	 &copy;	    &#169;
ª	 &ordf;	    &#170;
«	 &laquo;	&#171;
¬	 &not;	    &#172;
	 &shy;	    &#173;
®	 &reg;	    &#174;
¯	 &macr;	    &#175;
°	 &deg;	    &#176;
±	 &plusmn;	&#177;
²	 &sup2;	    &#178;
³	 &sup3;	    &#179;
´	 &acute;	&#180;
µ	 &micro;	&#181;
¶	 &para;	    &#182;
·	 &middot;	&#183;
¸	 &cedil;	&#184;
¹	 &sup1;	    &#185;
º	 &ordm;	    &#186;
»	 &raquo;	&#187;
¼	 &frac14;	&#188;
½	 &frac12;	&#189;
¾	 &frac34;	&#190;
¿	 &iquest;	&#191;
×	 &times;	&#215;
÷	 &divide;	&#247;
À	 &Agrave;	&#192;
Á	 &Aacute;	&#193;
Â	 &Acirc;	&#194;
Ã	 &Atilde;	&#195;
Ã	 &Atilde;	&#195;
Ä	 &Auml;	    &#196;
Å	 &Aring;	&#197;
Æ	 &AElig;	&#198;
Ç	 &Ccedil;	&#199;
È	 &Egrave;	&#200;
É	 &Eacute;	&#201;
Ê	 &Ecirc;	&#202;
Ë	 &Euml;	    &#203;
Ì	 &Igrave;	&#204;
Í	 &Iacute;	&#205;
Î	 &Icirc;	&#206;
Ï	 &Iuml;	    &#207;
Ð	 &ETH;	    &#208;
Ñ	 &Ntilde;	&#209;
Ò	 &Ograve;	&#210;
Ó	 &Oacute;	&#211;
Ô	 &Ocirc;	&#212;
Õ	 &Otilde;	&#213;
Ö	 &Ouml;	    &#214;
Ø	 &Oslash;	&#216;
Ù	 &Ugrave;	&#217;
Ú	 &Uacute;	&#218;
Û	 &Ucirc;	&#219;
Ü	 &Uuml;	    &#220;
Ý	 &Yacute;	&#221;
Þ	 &THORN;	&#222;
ß	 &szlig;	&#223;
à	 &agrave;	&#224;
á	 &aacute;	&#225;
â	 &acirc;	&#226;
ã	 &atilde;	&#227;
ä	 &auml;	    &#228;
å	 &aring;	&#229;
æ	 &aelig;	&#230;
ç	 &ccedil;	&#231;
è	 &egrave;	&#232;
é	 &eacute;	&#233;
ê	 &ecirc;	&#234;
ë	 &euml; 	&#235;
ì	 &igrave;	&#236;
í	 &iacute;	&#237;
î	 &icirc;	&#238;
ï	 &iuml;	    &#239;
ð	 &eth;	    &#240; 
ñ	 &ntilde;	&#241;
ò	 &ograve;	&#242;
ó	 &oacute;	&#243;
ô	 &ocirc;	&#244;
õ	 &otilde;	&#245;
ö	 &ouml;	    &#246;
ø	 &oslash;	&#248;
ù	 &ugrave;	&#249;
ú	 &uacute;	&#250;
û	 &ucirc;	&#251;
ü	 &uuml;	    &#252;
ý	 &yacute;	&#253;
þ	 &thorn;	&#254;
ÿ	 &yuml;	    &#255;