## 示例使用方法

```html
<form class="form-horizontal m-t" id="signupForm">
	<div class="form-group margin-bottom-20">
		<label class="col-sm-3 control-label required">云信息：</label>
		<div class="col-sm-8">
			<select id="cloudId" name="cloudId"  class="chosen-choices" data-placeholder="请选择云" onchange="loadInstanceParam()">
				<option value="" selected>请选择云</option>
				<option th:each="c:${clouds}" th:value="${c.cloudId}" th:text="${c.cloudName}"></option>
			</select>
		</div>
	</div>
	<div class="form-group margin-bottom-20">
		<label class="col-sm-3 control-label required">云服务器名称：</label>
		<div class="col-sm-8">
			<input id="instanceName" name="instanceName" class="form-control" type="text">
		</div>
	</div>
	<div class="form-group margin-bottom-20">
		<label class="col-sm-3 control-label">密钥名称：</label>
		<div class="col-sm-8">
			<select id="keypairName" name="keypairName" data-placeholder="请选择密钥" class="chosen-choices" >
				<option value="" selected>请选择密钥</option>
			</select>
		</div>
	</div>
	<div class="form-group margin-bottom-20">
		<label class="col-sm-3 control-label">密码：</label>
		<div class="col-sm-8">
			<div class="input-group">
				<input id="adminPass" name="adminPass" placeholder="请输入密码,密码必须包含数字、字母,特殊字符包含!@#.$%^&*(),长度不能小于6位大于20位" class="form-control" type="password">
				<span class="input-group-addon"></span>
				<i class="fa fa-eye fa-showeye" style="position: absolute; cursor: pointer; padding: 10px; z-index: 4;"></i>
			</div>
		</div>
	</div>
	<div class="form-group text-center">
		<button type="button" class="btn btn-default" id="closeLayer">取消</button>
		<button type="submit" class="btn btn-primary">确定</button>
	</div>
</form>
```


```js
var passRexge = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#\.$%^&*()]{6,20}$/;

$().ready(function() {
	validateRule();  // 初始化
});

$.validator.setDefaults({
	submitHandler: function() {
		save();
	}
});

// 初始化方法
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		errorElement: "em",  // 报错DOM节点
		ignore: ":hidden:not(select)", // 忽略hidden
		rules: {
			cloudId: {
				required: true
			},
			instanceName: {
				required: true
			},
			keypairName: {
				required: true
			},
			adminPass: {
				required: true,
				minlength: 6,
				maxlength: 20,
				passRexge: true,
			}
		},
		messages: {
			cloudId: {
				required: icon + "请选择云信息"
			},
			instanceName: {
				required: icon + "请输入实例名称"
			},
			keypairName: {
				required: icon + "请选择密钥"
			},
			adminPass: {
				required: icon + '请输入密码',
				minlength: icon + '密码不能小于6位',
				maxlength: icon + '密码不能大于20位',
				passRexge: icon + '密码格式有误,密码必须包含数字、字母,特殊字符包含!@#$%^&*().'
			}
		}
	})
}

$('body').on('change', '#keypairName', function (e) {
	var keypair = $(this).find('option:selected').val();
	if (keypair) {
		$("#adminPass").rules('remove','required');   // 取消 adminPass的required
		$('#keypairName-error').text('');
		$('#adminPass-error').text('');
	} else {
		$("#adminPass").rules('add',{ required: true });  // 添加 adminPass的required:true
	}
}).on('blur', '#adminPass', function (e) {
	var pass = $(this).val();
	if (pass) {
		$("#keypairName").rules('remove','required');  // 取消 keypairName的required
		$('#keypairName-error').text('');
		$('#adminPass-error').text('');
	} else {
		$("#keypairName").rules('add',{ required: true }); // 添加 keypairName的required:true
	}
});

// 自定义方法：passRexge
jQuery.validator.addMethod("passRexge", function(value, element) {
    var length = value.length;
    return this.optional(element) || (passRexge.test(value));
}, icon + "格式错误,最少包含1个字母,1个数字,不能包含中文字符,长度6到20");

```