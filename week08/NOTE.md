# 每周总结可以写在这里

##### CSS排版
###### 盒模型
margin/padding/border/content
###### 正常流排版
收集行进行
计算盒在行中的排布
计算行的排布
###### 行模型
IFC inline format content 如果有子元素超过line-height 行高是最高的子元素的高度
getClientRect 行盒是一个隐藏的东西
###### float与clear
BFC block format content BFC合并 overflow:visible 会合并 只有正常流里放正常流可能产生合并
不包括inline-blocks/table-cells/table-captions
block containers 里面可以放block
block boxes 
block level boxes contains called block boxes
flex item 产生bfc
flex/table/grid 是block level 
block 是block level也是block container
block/inline-block block container
###### 总结
block-level 表示可以放入bfc
block-container 表示可以容纳bfc
block-boxes = block-container + block-level
block-box 如果是visible 就会和父bfc合并
###### flex
收集行进行
计算盒在主轴方向的排布
计算纵轴的排布