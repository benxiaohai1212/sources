## jquery-chosen.js示例使用方法

1. [地址](https://harvesthq.github.io/chosen/)  
2. [CDN](https://cdnjs.com/libraries/chosen)

```html
	<select id="fruit" name="fruit" class="chosen-choices" data-placeholder="单选水果">
		<option value="apple">苹果</option>
		<option value="orange">橘子</option>
		<option value="banana">香蕉</option>
		<option value="pear">梨</option>
	</select>
	<select id="fruits" name="fruits" multiple class="chosen-choices" data-placeholder="多选水果">
		<option value="apple">苹果</option>
		<option value="orange">橘子</option>
		<option value="banana">香蕉</option>
		<option value="pear">梨</option>
	</select>
```

```js
$(function() {
	// 初始化
	$('.chosen-choices').chosen({
		no_results_text: "没有找到结果！",//搜索无结果时显示的提示
		search_contains:true,   //关键字模糊搜索。设置为true，只要选项包含搜索词就会显示；设置为false，则要求从选项开头开始匹配
		allow_single_deselect:true, //单选下拉框是否允许取消选择。如果允许，选中选项会有一个x号可以删除选项
		disable_search: false, //禁用搜索。设置为true，则无法搜索选项。
		disable_search_threshold: 0, //当选项少等于于指定个数时禁用搜索。
		inherit_select_classes: true, //是否继承原下拉框的样式类，此处设为继承
		width: '100%', //设置chosen下拉框的宽度。即使原下拉框本身设置了宽度，也会被width覆盖。
	});
	
});
	// 取值
	var fruit = $('#fruit').find('option:selected').val(), 
		fruits = $('#fruits').find('option:selected').val();

	// 更新select
	$('#fruit').append('<option value="pitaya">火龙果</option>').trigger('chosen:updated');
	$('#fruits').append('<option value="pitaya">火龙果</option>').trigger('chosen:updated');

```

### 选项列表
|选项|描述|取值|默认值|
|--|--|--|--|
|allow_single_deselect	|是否允许取消选择.设置为 true 时非必选的单选框会显示清除选中项图标|	[true,false]	| false |
|disable_search|禁用搜索。设置为true，则无法搜索选项。|[true,false]|false|
|disable_search_threshold|少于 n 项时隐藏搜索框| 数字[0] |0|
|enable_split_word_search|是否开启分词搜索，默认开启|[true,false]|true|
|inherit_select_classes|是否继承 select 元素的 class，如果设为 true，Chosen 将把 select 的 class 添加到容器上|[true,false]|false|
|max_selected_options	|最多选择项数，达到最大限制时会触发 chosen:maxselected 事件| 数字	|Infinity|
|no_results_text	|	无搜索结果显示的文本	|	文本说明	|"No results match"|
|placeholder_text_single|单选选择框的默认提示信息，当选项为空时会显示。如果原下拉框设置了data-placeholder，会覆盖这里的值| 文本 |"Select an Option"|
|placeholder_text_multiple|多选框没有选中项时显示的占位文字| 文本 | "Select Some Options" |
|search_contains|键字模糊搜索。设置为true，只要选项包含搜索词就会显示；设置为false，则要求从选项开头开始匹配|[true,false]|false|
|single_backstroke_delete|多选框中使用退格键删除选中项目，如果设为 false，第一次按 delete/backspace 会高亮最好一个选中项目，再按会删除该项|[true,false]	|true|
|width|设置chosen下拉框的宽度。即使原下拉框本身设置了宽度，也会被width覆盖| '100%'或'100px' |Original select width|
|display_disabled_options|是否显示禁止选择的项目|[true,false]| true |
|display_selected_options|多选框是否在下拉列表中显示已经选中的项|[true,false]| true |
|max_shown_results|下拉框最大显示选项数量| 数值 |Infinity|
|case_sensitive_search|搜索大小写敏感|	[true,false]	|false|
|group_search|选项组是否可搜|	[true,false]	|false|
|include_group_label_in_selected|选中选项是否显示选项分组|[true,false]|false|

### 属性
|属性|描述|
|--: | :--|
|data-placeholder|占位符文字 注意： 改属性会覆盖 placeholder_text_multiple 或 placeholder_text_single 选项。|
|multiple	|有此属性的 select 会渲染成可以多选的 Chosen 选框|
|selected, disabled|设置选中、禁止状态，Chosen 会读取这些属性|

### 触发事件
|事件|	描述|
|--:|:--|
|change|	Chosen 触发标准的 change 事件，同时会传递 selected or deselected 参数， 方便用户获取改变的选项|
|chosen:ready|	Chosen 实例化完成时触发|
|chosen:maxselected|	超过 max_selected_options 设置时触发|
|chosen:showing_dropdown|	Chosen 下拉选框打开完成时触发|
|chosen:hiding_dropdown|	Chosen 下拉选框关闭完成时触发|
|chosen:no_results|	搜索没有匹配项时触发|

### 监听的事件
|事件|	描述|
|--:|:--|
|chosen:updated|	通过 JS 改变 select 元素选项时应该触发此事件，以更新 Chosen 生成的选框|
|chosen:activate|	相当于 HTML focus 事件|
|chosen:open|	激活 Chosen 并显示搜索结果|
|chosen:close|	关闭 Chosen 并隐藏搜索结果|

