# 每周总结可以写在这里
#### week02 0416-0418总结

> 本周心得体会：

主要从讲了编程语言通识与编码以及JavaScipt词法等相关内容，
要想技术学得精而深，关键还在内容修炼有多深，
不直接教你是什么，而是引导你为什么这是什么，
每一个个专业词汇的是非常的陌生，不是计算机的可以趁机会不断脑补各种知识。

1. 语法词法分析BNF/乔姆斯基谱系/BF/图灵机/图灵完备性
2. YACC/LEX/元编程/编程的自举/协变与逆变 
3. 至于字符编码，utf-8 endcoding这种基本上在实践中譬如AES加密解密算法还是会有所运用的
ASCII/GB2312/Unicode/UTF-8 计算机基石
4. 为什么0.1 + 0.2 != 0.3？
5. ZWSP/NBSP/ 这种基本应该在运用于CSS 排版上也是很有用的。

###### 04.16
> 随堂作业

1. 编写带括号的四则运算产生式

[参考理解](https://zhuanlan.zhihu.com/p/112460676)

2. 尽可能寻找你知道的计算机语言，尝试把它们分类

[编程范式](https://www.info.ucl.ac.be/~pvr/paradigmsDIAGRAMeng108.pdf)

- JavaScript 应用领域：Web前端、后端、移动应用、内嵌脚本语言；
- Php 应用领域：Web后端、移动应用后端；含义：Personal Home Page ——> Hypertext Preprocessor
- Java 应用领域：Android、Web应用、服务器、大数据、企业应用；Java名称源自盛产咖啡印度尼西亚爪哇岛，Java许多类库与咖啡豆有关，如JavaBeans、NetBeans、ObjectBeans，Java的logo是一杯冒着热气的咖啡；
- Python 应用领域：Web、科学计算、机器学习、爬虫、数据分析、量化交易、云计算、运维；脚本解释程序，ABC语言的一种继承；Guido是喜剧团体Monty Python的爱好者，Python名字来源于电视剧《Monty Python's - Flying Circus》；
- C++ 应用领域：操作系统、虚拟机、浏览器、数据库、编译器、桌面应用、图像处理、流媒体、高频交易、区块- 链、军工软件、搜索系统、游戏引擎、服务器、虚拟现实、其他语言的库；
- C# 应用领域：桌面应用、游戏客户端；
- SQL 应用领域：数据库；
- Ruby 应用领域：Web；七月的Ruby宝石命名；人性化的编程语言；
- Objective-C/Swift 应用领域：iOS、Mac OS开发;与Steve Job有关；
- Kotlin 应用领域：Android开发的官方支持语言；

> 分类

- 解释型(PHP,Perl,Python,Ruby,Tcl,Lua,JavaScript,Io)
- 操作系统自动化型(POSIX Shell,AppleScript,PowerShell)
- C++风格(C++,Objective C,Java,C#)
- Pascal风格(Pascal,Ada,PostgreSQL,MySQL)
- Lisp类(Common Lisp,Scheme,Clojure,Emacs Lisp)
- 类型推理类(Standard ML,OCaml,Scala,Haskell)
- 声明型(Prolog,Erlang,Oz)
- Concatenative语言(Forth,PostScript,Factor)
- 数据转换(SQL,Awk,Pig,XSLT)
- 计算机代数(Maxima,Mathematica,Sage)
- 数字分析类(Fortran,MATLAB,R,NumPy)


###### 04.18

1. 写一个正则表达式 匹配所有 Number 直接量

不是很会的正则匹配题目？？？？

2. 写一个 UTF-8 Encoding 的函数

[utf8](https://github.com/mathiasbynens/utf8.js/blob/master/utf8.js)

3. 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

不是很会的正则匹配题目？？？？
```
function strReg(str) {
  if (typeof str === 'string') {
    return /[^\"\"$]|[^\'\'$]/.test(str)
  }
}
```
