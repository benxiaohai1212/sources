引用：  
CDN:  
```
<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">    
<link href="//cdn.bootcss.com/bootstrap-slider/9.4.1/css/bootstrap-slider.css" rel="stylesheet">  
  
<script src="//cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>   
<script src="//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>    
<script src="//cdn.bootcss.com/bootstrap-slider/9.4.1/bootstrap-slider.min.js"></script> 
```
本地：  
```
<link href="../Js/Bootstrap-3.3.6/css/bootstrap.min.css" rel="stylesheet" />  
<link href="../Js/Slider/bootstrap-slider.min.css" rel="stylesheet" />  
<script src="../Js/jquery-1.11.3.min.js"></script>  
<script src="../Js/Bootstrap-3.3.6/js/bootstrap.min.js"></script>  
<script src="../Js/Slider/bootstrap-slider.js"></script> 
```

HTML：  
```html
<input  id="ex1"  type="text"
        data-slider-id="ex1Slider"  
        data-slider-min="0" 
        data-slider-max="20" 
        data-slider-step="1"  
        data-slider-value="15"/>
```
JavaScript： 
```js
// With JQuery 使用JQuery 方式调用  
$('#ex1').slider({  
    formatter: function (value) {  
        return 'Current value: ' + value;  
    }  
}).on('slide', function (slideEvt) {  
    //当滚动时触发  
    //console.info(slideEvt);  
    //获取当前滚动的值，可能有重复  
    // console.info(slideEvt.value);  
}).on('change', function (e) {  
    //当值发生改变的时候触发  
    //console.info(e);  
    //获取旧值和新值  
    console.info(e.value.oldValue + '--' + e.value.newValue);  
});  
```
 :blue_book: 配置参数  
以下这些参数也可以通过一个data属性（data-slider-foo）或作为slider对象的一部分来调用。

| 参数名称 | 参数类型 | 默认值 | 描述 | 
| :- | :- | :- | :- | 
| id |	string | '' | 设置slider元素的id |
| min |	float |	0 | slider允许的最小值 |
| max |	float |	10 | slider允许的最大值 |
| step | float | 1 | slider的步长 |
| precision | float | 小数的位数 | slider数值的精度。|
| orientation |	string | 'horizontal' | 设置slider的初始值，设置为数组表示一个范围。的方向。可选值：'vertical'或'horizontal' |
| value | float,array | 5 | slider的初始值，设置为数组表示一个范围。|
| range | bool | false | 是否设置一个范围slider。如果初始化值为一个数组，该选项可选。如果初始化值为scalar，最大值将使用第二个值。
| selection | string | 'before' | 选择配置。接收：'before', 'after' 或 'none'。在范围slider中，selection 被放置在两个手柄中间。|
| tooltip | string | 'show' | 在拖动手柄时是否显示tooltip，隐藏tooltip，或者总是显示tooltip。可选值：'show', 'hide' 或 'always'|
| tooltip_split | bool | false | 如果是flase显示一个tooltip，如果设置为true，显示两个tooltip，每个手柄显示一个。|
| handle | string | 'round' | 手柄的形状。可选值： 'round', 'square', 'triangle' 或 'custom'|
| reversed | bool | false | slider是否反向 |
| enabled | bool | true | slider是否可用 |
| formatter | function | 返回文本值 | 回调函数。返回想在tooltip中显示的文字。 |
| natural_arrow_keys | bool | false | 是否允许使用键盘的方向键来控制slider。默认情况下，right/up键是slider数值增大，left/down键使slider数值减少。|

 :green_book: 方法  

| 方法 | 参数 | 描述 | 
| :- | :- | :- | 
| getValue | --- | 获取slider的当前值 |
| setValue | newValue, triggerSlideEvent | 为slider设置一个新值。如果可选的triggerSlideEvent参数为true，'slide'事件将被触发。|
| destroy | --- | 移除和销毁slider实例 |
| disable | --- | 使slider不可用，用户不能修改slider的值 |
| enable | --- | 使slider可用 |
| toggle | --- | 在slider可用与不可用之间切换 |
| isEnabled | --- | 如果slider可用返回true，否则返回false |
| setAttribute | attribute, value | 更新slider的属性 |
| getAttribute | attribute | 获取slider的属性 |
| refresh | --- | 刷新当前的slider |
| on | eventType, callback | 当slider的eventType事件被触发，回调函数将被调用 |
| relayout | --- | 在初始化之后重新渲染tooltip。这在slider和tooltip在初始化时是隐藏的时候非常有用 |

 :notebook:  事件  

| 事件 | 描述 | 返回值 |  
| :- | :- | :- | 
| slide | 当slider被拖动时触发 | 新的slider值 |
| slideStart | 当slider开始拖动时触发 | 新的slider值 |
| slideStop | 当slider停止拖动或slider被点击时触发 | 新的slider值 |
| change | slider的值改变时触发 | 带有两个属性的对象："oldValue"和"newValue" |
| slideEnabled | 当设置slider为可用时触发 | N/A |
| slideDisabled | 当设置slider为不可用时触发 | N/A |