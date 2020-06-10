# 每周总结可以写在这里

* 这周课上完后，恰巧业务上的盲点，拾起了JavaScript高级程序设计，第10章 - 第13章有关于DOM API及HTML5 和
事件的内容，然后发现老师书中整体的内容与老师讲课的脉络还是很吻合的，建议这本书经常翻翻，老师讲的也可以在书中找到答案。

###### HTML

amp,lt,quot,gt 不能在html中直接使用
```
&#161;&lt;&quot;&gt;
white-space: pre-wrap
" ".charCodeAt(0) 160
" ".charCodeAt(0) 32
```
###### HTML语义化
```
<section>
<aside>
<hgroup>
<h1>
<main>
<p>著名的可以不闭合标签
<ol>
<li>
<dfn>定义
<dl>
<dd>
<dt>
<figure>
<img> 图片
<figurecapture> 
<cite>源引文字
<address>不是地理位置 联系人地址类似
<time>
```
##### 合法元素
```
ELEMENT
TEXT
COMMENT
CDATA
DOCUMENTTYPE
PROSSESSINGINSTRUCTION
```
##### NODE
```
Element
Document
CharacterData
```
##### 节点操作
```
parentNode
childNodes
firstChild
lastChild
previousSibling
nextSibling
```

##### 修改操作
```
appendChild
insertBefore
removeChild
replaceChild 
```

#### 划重点
```
操作DOM二次插入 会自动摘掉
childNodes实时变化
```
##### 高级操作
```
compareDocumentPosition
contains
isEqualNode
isSameNode 已废弃
cloneNode
```
##### Living Collection
```
parentElement
children
firstElementChild
lastElementChild
previousElementSibling
nextElementSibling
```

##### Events
```
Browers API 
DOM Tree
CSSOM
BOM
Crypo
DOM API
traversal
```