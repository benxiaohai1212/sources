### CSS选择器

[CSS参考手册](http://css.doyoe.com/)  
[CSS美化滚动条](https://gitee.com/tomhat/sources/blob/master/CSS/%E6%BB%9A%E5%8A%A8%E6%9D%A1.md)

1. 元素选择器

| 选择符 | 名称 | 版本 | 描述 | 
| :- | :- | :- | :- | 
| * | 通配符选择符(Universal Selector) | CSS2 | 所有元素对象 | 
| E | 类型选择符(Type Selector) | CSS1 | 以文档语言对象类型作为选择符 | 
| E#myid | ID选择符(ID Selector) | CSS1 | 以唯一标识符id属性等于myid的E对象作为选择符 | 
| E.myclass | class选择符(Class Selector) | CSS1 | 以class属性包含myclass的E对象作为选择符 | 


2. 关系选择器

| 选择符 | 名称 | 版本 | 描述 | 
| :- | :- | :- | :- | 
| E F | 包含选择符(Descendant combinator) | CSS1 | 选择所有被E元素包含的F元素 | 
| E>F | 子选择符(Child combinator) | CSS2 | 选择所有作为E元素的子元素F | 
| E+F | 相邻选择符(Adjocent sibling combinator) | CSS2 | 选择贴近在E元素之后的F元素 | 
| E~F | 兄弟选择符(General sibling combinator) | CSS3 | 选择E元素所有兄弟元素F | 

3. 属性选择器

| 选择符 | 版本 | 描述 | 
| :- | :- | :- | 
| E[att] | CSS2 | 选择具有att属性的E元素 | 
| E[att="val"] | CSS2 | 选择具有att属性且属性值等于val的E元素 | 
| E[att~="val"] | CSS2 | 选择具有att属性且属性值为一用空格分隔的字词列表，其中一个等于val的E元素 | 
| E[att^="val"] | CSS3 | 选择具有att属性且属性值以val开头的字符串的E元素 | 
| E[att$="val"] | CSS3 | 选择具有att属性且属性值以val结尾的字符串的E元素 | 
| E[att*="val"] | CSS3 | 选择具有att属性且属性值为包含val的字符串的E元素 | 
| E[att\|="val"] | CSS2 | 选择具有att属性且属性值以val开头并用链接符"-"分隔的字符串的E元素，如果属性值仅为val，也将被选择 | 

4. 伪类选择器


| 选择符 | 版本 | 描述 | 
| :- | :- | :- | 
| E:link	| CSS1 |	设置超链接a在未被访问前的样式。| 
| E:visited	| CSS1 |	设置超链接a在其链接地址已被访问过时的样式。| 
| E:hover	| CSS1/2 |	设置元素在其鼠标悬停时的样式。| 
| E:active	| CSS1/2 |	设置元素在被用户激活（在鼠标点击与释放之间发生的事件）时的样式。 | 
| E:focus	| CSS1/2 |	设置元素在成为输入焦点（该元素的onfocus事件发生）时的样式。| 
| E:lang(fr)	| CSS2 |	匹配使用特殊语言的E元素。| 
| E:not(s)	| CSS3 |	匹配不含有s选择符的元素E。| 
| E:root	| CSS3 |	匹配E元素在文档的根元素。| 
| E:first-child	| CSS2 |	匹配父元素的第一个子元素E。| 
| E:last-child	| CSS3 |	匹配父元素的最后一个子元素E。| 
| E:only-child	| CSS3 |	匹配父元素仅有的一个子元素E。| 
| E:nth-child(n)	| CSS3 |	匹配父元素的第n个子元素E。| 
| E:nth-last-child(n)	| CSS3 |	匹配父元素的倒数第n个子元素E。| 
| E:first-of-type	| CSS3 |	匹配父元素下第一个类型为E的子元素。| 
| E:last-of-type	| CSS3 |	匹配父元素下的所有E子元素中的倒数第一个。| 
| E:only-of-type	| CSS3 |	匹配父元素的所有子元素中唯一的那个子元素E。| 
| E:nth-of-type(n)	| CSS3 |	匹配父元素的第n个子元素E。| 
| E:nth-last-of-type(n)	| CSS3 |	匹配父元素的倒数第n个子元素E。| 
| E:empty	| CSS3 |	匹配没有任何子元素（包括text节点）的元素E。| 
| E:checked	| CSS3 |	匹配用户界面上处于选中状态的元素E。(用于input type为radio与checkbox时)| 
| E:enabled	| CSS3 |	匹配用户界面上处于可用状态的元素E。| 
| E:disabled	| CSS3 |	匹配用户界面上处于禁用状态的元素E。| 
| E:target	| CSS3 |	匹配相关URL指向的E元素。| 
| @page:first	| CSS2 |	设置页面容器第一页使用的样式。仅用于@page规则 | 
| @page:left	| CSS2 |	设置页面容器位于装订线左边的所有页面使用的样式。仅用于@page规则| 
| @page:right	| CSS2 |	设置页面容器位于装订线右边的所有页面使用的样式。仅用于@page规则| 


5. 伪元素选择器

| 选择符 | 版本 | 描述 | 
| :- | :- | :- | 
| E:first-letter/E::first-letter | CSS1/CSS3 | 设置对象内的第一个字符的样式 | 
| E:first-line/E::first-line | CSS1/3 | 设置对象内的第一行样式 | 
| E:before/E::before | CSS2/3 | 设置在对象前(依据对象树的逻辑结构)发生的内容。用来和content属性一起使用 | 
| E:after/E::after | CSS2/3 | 设置在对象后(依据对象树的逻辑结构)发生的内容。用来和content属性一起使用 | 
| **E::placebolder** | CSS3 | 设置对象文字占位符的样式 | 
| **E::selection** | CSS3 | 设置对象被**选择**时的颜色 |

去除Google浏览器中文本框输入后的背景色:   
```
input:-webkit-autofill {
    -webkit-animation: autofill-fix 1s infinite;
    color: #eeeeee; // 字体颜色
}

@-webkit-keyframes autofill-fix {
    from {
        background-color: transparent;
    }
    to {
        background-color: transparent;
    }
}
```

### 省略号
```
/**
单行显示省略号
默认100px,
通过修改width来控制显示字符长度其余显示...
*/
.single-ellipsis {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 100px;
}

/**
多行行显示省略号
默认长度：width: 100px,
默认行数：-webkit-line-clamp: 3
通过修改width来控制显示字符长度修改-webkit-line-clamp显示行数其余显示...
*/
.multi-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    width: 100px;
}
```