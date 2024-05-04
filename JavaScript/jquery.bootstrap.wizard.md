[源码](https://github.com/VinceG/twitter-bootstrap-wizard.git)

下载：[jquery.bootstrap.wizard.js](https://github.com/VinceG/twitter-bootstrap-wizard/blob/master/jquery.bootstrap.wizard.js)  

示例：  

**此示例包含：向导(wizard)，动态改变向导步骤，表单验证(jquery-validate)，jquery-validate验证插件书写及使用，**

```
<!DOCTYPE html>
<html>
  <head>
    <title>Basic Pills Example</title>
    <!-- Bootstrap -->
    <link href="https://cdn.bootcss.com/twitter-bootstrap/3.4.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/prettify/188.0.0/prettify.css" rel="stylesheet">
    <style>
    .error {
      color: #ee1100;
    }
    .progress {
      margin-top: 20px;
    }
    .nav>li {
      width: 300px;
    }
    </style>
  </head>
  <body>
<div class='container'>
  <section id="wizard">
    <form id="commentForm" class="form-horizontal">
      <div id="rootwizard">
	<ul>
	  <li><a href="#createAccount" data-toggle="tab"><i class="glyphicon glyphicon-record"></i> 创建账号</a></li>
	  <li><a href="#createDatabase" data-toggle="tab"><i class="glyphicon glyphicon-record"></i> 创建数据库</a></li>
	  <li><a href="#createWhite" data-toggle="tab"><i class="glyphicon glyphicon-record"></i> 设置白名单</a></li>
	</ul>
	<div id="bar" class="progress">
	  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
	</div>
	<div class="tab-content">
	  <div class="tab-pane" id="createAccount">
	    <div class="form-group">
		  <label for="accountName" class="col-sm-3 control-label required">数据库账号：</label>
		  <div class="col-sm-5">
		      <input type="text" class="form-control" id="accountName" name="accountName">
		  </div>
	      </div>
	      <div class="form-group">
		  <label for="accountName" class="col-sm-3 control-label"></label>
		  <div class="col-sm-7">
		      <span>由小写字母，数字、下划线组成、字母开头，字母或数字结尾，最长16个字符</span>
		  </div>
	      </div>
	      <div class="form-group">
		  <label class="col-sm-3 control-label required">账号类型：</label>
		  <div class="col-sm-7">
		      <div class="btn-group" data-toggle="buttons">
			  <label class="btn btn-default accountRadio active">
			      <input type="radio" name="accountType" id="Normal" value="Normal" autocomplete="off" checked> 普通账号
			  </label>
		      </div>
		  </div>
	      </div>
	      <div class="form-group">
		  <label for="accountPassword" class="col-sm-3 control-label required">密码：</label>
		  <div class="col-sm-5">
		      <input type="password" class="form-control input required accountPassword" id="accountPassword" name="accountPassword">
		  </div>
	      </div>
	      <div class="form-group">
		  <label for="accountPassword" class="col-sm-3 control-label"></label>
		  <div class="col-sm-7">
		      <span>大写、小写、数字、特殊字符组成，长度为8－32位；特殊字符为!@#%^*-_=+</span>
		  </div>
	      </div>
	      <div class="form-group">
		  <label for="accountPasswordComfirm" class="col-sm-3 control-label required">确认密码：</label>
		  <div class="col-sm-5">
		      <input type="password" class="{validate:{ required:true, }} form-control input" id="accountPasswordComfirm" name="accountPasswordComfirm">
		  </div>
	      </div>
	      <div class="form-group">
		  <label for="accountDescription" class="col-sm-3 control-label">备注说明：</label>
		  <div class="col-sm-5">
		      <textarea class="form-control description" id="accountDescription" name="accountDescription" min="" cols="10" rows="5"></textarea>
		  </div>
	      </div>
	      <div class="form-group">
		  <label for="accountPassword" class="col-sm-3 control-label"></label>
		  <div class="col-sm-7">
		      <span>请输入备注说明，最多256个字符</span>
		  </div>
	      </div>
	  </div>
	  <div class="tab-pane" id="createDatabase">
	    <div class="form-group">
		<label for="dbName" class="col-sm-3 control-label required">数据库(DB)名称：</label>
		<div class="col-sm-5">
		    <input type="text" class="form-control input required" id="dbName" name="dbName">
		</div>
	    </div>
	    <div class="form-group">
		<label for="accountName" class="col-sm-3 control-label"></label>
		<div class="col-sm-7">
		    <span>由小写字母、数字、下划线或中划线组成,长度为2~64个字符</span>
		</div>
	    </div>
	    <div class="form-group">
		<label class="col-sm-3 control-label required">支持字符集：</label>
		<div class="col-sm-7">
		    <div class="btn-group" data-toggle="buttons">
			<label class="btn btn-default databaseRadio active">
			    <input type="radio" name="characterSetName" id="utf8" value="utf8" autocomplete="off" checked> utf8
			</label>
			<label class="btn btn-default databaseRadio">
			    <input type="radio" name="characterSetName" id="gbk" value="gbk" autocomplete="off"> gbk
			</label>
			<label class="btn btn-default databaseRadio">
			    <input type="radio" name="characterSetName" id="latin1" value="latin1" autocomplete="off"> latin1
			</label>
			<label class="btn btn-default databaseRadio">
			    <input type="radio" name="characterSetName" id="utf8mb4" value="utf8mb4" autocomplete="off"> utf8mb4
			</label>
		    </div>
		</div>
	    </div>
	    <div class="form-group">
		<label class="col-sm-3 control-label required">授权账号：</label>
		<div class="col-sm-7">
		    <div class="panel panel-default">
			<div class="panel-heading">
			    <h3 class="panel-title">未授权账号(默认)</h3>
			</div>
			<div class="panel-body" style="padding: 0px;">
			    <table id="accounts"></table>
			</div>
			<div class="panel-footer">
			    <a class="btn btn-link" id="toCreatAccount">创建账号</a>
			</div>
		    </div>
		</div>
	    </div>
	    <div class="form-group accountPrivilege" style="display: none">
		<label class="col-sm-3 control-label required">账号类型：</label>
		<div class="col-sm-7">
		    <div class="btn-group" data-toggle="buttons">
			<label class="btn btn-default databaseRadio active">
			    <input type="radio" name="privilege" id="ReadWrite" value="ReadWrite" data-id="1" data-detail="SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,REFERENCES,INDEX,ALTER,CREATE TEMPORARY TABLES,LOCK TABLES,CREATE VIEW,SHOW VIEW,CREATE ROUTINE,ALTER ROUTINE,EXECUTE,EVENT,TRIGGER" autocomplete="off" checked> 读写
			</label>
			<label class="btn btn-default databaseRadio">
			    <input type="radio" name="privilege" id="ReadOnly" value="ReadOnly" data-id="2" data-detail="SELECT,LOCK TABLES,SHOW VIEW" autocomplete="off"> 只读
			</label>
		    </div>
		</div>
	    </div>
	    <div class="form-group">
		<label for="accountDescription" class="col-sm-3 control-label">备注说明：</label>
		<div class="col-sm-5">
		    <textarea class="form-control description" id="dbDescription" name="dbDescription" cols="10" rows="5"></textarea>
		</div>
	    </div>
	    <div class="form-group">
		<label for="accountPassword" class="col-sm-3 control-label"></label>
		<div class="col-sm-7">
		    <span>请输入备注说明，最多256个字符</span>
		</div>
	    </div>
	  </div>
	  <div class="tab-pane" id="createWhite">
	    <div class="form-group">
		<label class="col-sm-3 control-label required">网络隔离模式：</label>
		<div class="col-sm-7">
		    <div class="btn-group" data-toggle="buttons">
			<label class="btn btn-default active">
			    <input type="radio" name="NetType" value="VPC" autocomplete="off" checked> 专有网络
			</label>
			<label class="btn btn-default">
			    <input type="radio" name="NetType" value="Classic" autocomplete="off"> 外网地址
			</label>
		    </div>
		</div>
	    </div>
	    <div class="form-group">
		<label for="dbInstanceIPArrayName" class="col-sm-3 control-label required">分组名称：</label>
		<div class="col-sm-5">
		    <input type="text" class="form-control ipArrayName" id="dbInstanceIPArrayName" name="dbInstanceIPArrayName" placeholder="请填写白名单分组名称，如:my_rds_ip_list">
		    <small class="help-block has-error"  id="dbInstanceIPArrayName-error" style=""></small>
		</div>
	    </div>
	    <div class="form-group">
		<label for="accountName" class="col-sm-3 control-label required">组内白名单：</label>
		<div class="col-sm-9" id="ipList" style="display: none">
		    <div id="securityIPList" class="row" style="height: 350px;width: 100%;"></div>
		    <small class="help-block has-error" id="securityIPList-error" style=""></small>
		</div>
		<div class="col-sm-9" id="ips">
		    <textarea class="form-control ipRegex" id="securityIps" name="securityIPList" cols="10" rows="5" placeholder="请填写IP地址，如:192.168.0.1, 192.168.100.0/24, 172.16.0.0/16"></textarea>
		    <small class="help-block has-error" id="securityIps-error" style=""></small>
		</div>
	    </div>
	    <div class="form-group">
		<label for="accountName" class="col-sm-3 control-label"></label>
		<div class="col-sm-9">
		    <a class="btn btn-link" id="changeIP">加载ECS内网IP</a>
		</div>
	    </div>
	  </div>
	  <div class="text-right">
	    <input type='button' class='btn button-previous' name='previous' value='上一步' />
	    <input type='button' class='btn button-next' name='next' value='下一步' />
	    <input type='button' class='btn button-finish' name='finish' value='确定' />
	  </div>
	</div>
      </div>
    </form>
  </section>
</div>
    <script src="https://cdn.bootcss.com/jquery/3.4.0/jquery.js"></script>
    <script src="https://cdn.bootcss.com/jquery-validate/1.19.0/jquery.validate.js"></script>
    <script src="https://cdn.bootcss.com/jquery-validate/1.19.0/localization/messages_zh.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/3.4.0/js/bootstrap.js"></script>
<!--     <script src="https://cdn.bootcss.com/twitter-bootstrap-wizard/1.2/jquery.bootstrap.wizard.js"></script> -->
    <script src="https://cdn.bootcss.com/prettify/188.0.0/prettify.js"></script>
<!--     <script src="../bootstrap/js/bootstrap.min.js"></script> -->
    <script src="../jquery.bootstrap.wizard.js"></script>
<!--     <script src="../prettify.js"></script> -->
    <script>
// 正则校验密码   
jQuery.validator.addMethod("accountPassword", function(value, element) {   
    var regexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%^\*\-_=+])[\da-zA-Z!@#%^\*\-_=+]{7,32}/;
    return this.optional(element) || (regexp.test(value));
}, "请正确填写信息,账号密码必须由大写、小写、数字、特殊字符组成，长度为8－32位；特殊字符为!@#%^*-_=+");
// 正则   
jQuery.validator.addMethod("description", function(value, element) {   
    var regexp = /^((?!(https|http):\/\/).)*$/;
    return this.optional(element) || (regexp.test(value));
}, "请正确填写信息,描述不能以 http:// 和 https:// 开头");

jQuery.validator.addMethod("ipArrayName", function(value, element) {   
    var regexp = /^[a-z][0-9a-z_]{1,32}$/;
    return this.optional(element) || (regexp.test(value));
}, "请正确填写信息,组名称必须已小写字母开头");

jQuery.validator.addMethod("ipRegex", function(value, element) {   
    var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var ipv4RegexRange = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:(?:([0-9]))|(?:(1[0-9]))|(?:(2[0-4]))|(?:(3[0-2])))$/;
    return this.optional(element) || (ipv4Regex.test(value)) || (ipv4RegexRange.test(value));
}, "请正确填写信息,组名称必须已小写字母开头");


    $(document).ready(function() {
      
      $('a[href="#createWhite"]').parent().remove();
    
	var $validator = $("#commentForm").validate({
	  rules: {
	    accountName: {
	      required: true,
	      minlength: 2,
	      maxlength: 16
// 	      remote: { 
// 		url: "http://localhost:8888/checkDBAccountName.json",     //后台处理程序
// 		type: "post",               //数据发送方式
// 		dataType: "json",           //接受数据格式   
// 		data: {                     //要传递的数据
// 		  dbInstanceId: "c1314ee239d3453997747e90a8d59c7bin01",
// 		  accountName:  $("input[name='accountName']").val()
// 		}
// 	      },
	    },
	    accountPassword: {
	      required: true,
	      minlength: 8,
	      maxlength: 32
	    },
	    accountPasswordComfirm: {
	      required: true,
	      equalTo: '#accountPassword'
	    },
	    accountDescription: {
	      minlength: 2,
	      maxlength: 256
	    },
	    dbName: {
	      required: true,
	      minlength: 2,
	      maxlength: 16
// 	      remote: { 
// 		url: "http://localhost:8888/checkDBDatabaseName.json",     //后台处理程序
// 		type: "post",               //数据发送方式
// 		dataType: "json",           //接受数据格式   
// 		data: {                     //要传递的数据
// 		  dbInstanceId: "c1314ee239d3453997747e90a8d59c7bin01",
// 		  accountName:  $("input[name='dbName']").val()
// 		}
// 	      },
	    },
	    dbDescription: {
	      minlength: 2,
	      maxlength: 256
	    },
	    dbInstanceIPArrayName: {
	      required: true,
	      minlength: 2,
	      maxlength: 16
	    }
	  },
	  messages: {
	    accountName: {
	      required: '账号名称不能为空',
	      remote: '账号名称已存在',
	      minlength: '账号名称长度不能小于2个字符',
	      maxlength: '账号名称长度不能大于16个字符'
	    },
	    accountPassword: {
	      required: '账号密码不能为空',
	      minlength: '账号密码长度不能小于8个字符',
	      maxlength: '账号密码长度不能大于32个字符'
	    },
	    accountPasswordComfirm: {
	      required: '确认密码不能为空',
	      equalTo: '两次输入密码不一致'
	    },
	    accountDescription: {
	      minlength: '备注描述长度不能小于2个字符',
	      maxlength: '备注描述长度不能大于256个字符'
	    },
	    dbName: {
	      required: '数据库名称不能为空',
	      remote: '数据库名称已存在',
	      minlength: '数据库名称长度不能小于2个字符',
	      maxlength: '数据库名称长度不能大于16个字符'
	    },
	    dbDescription: {
	      minlength: '备注描述长度不能小于2个字符',
	      maxlength: '备注描述长度不能大于256个字符'
	    },
	    dbInstanceIPArrayName: {
	      required: true,
	      minlength: '',
	      maxlength: ''
	    }
	  }
	});
	$('#rootwizard').bootstrapWizard({
	    'tabClass': 'nav nav-pills',
	    'onTabClick': function(tab, navigation, index) {
		    return false;
	    },
	    'nextSelector': '.button-next', 
	    'previousSelector': '.button-previous',
	    'finishSelector': '.button-finish',
	    'onNext': function(tab, navigation, index) {
		var $valid = $("#commentForm").valid();
		console.log($valid,tab, navigation, index);
		if(!$valid) {
		  $validator.focusInvalid();
		  return false;
		}
	    },
	    'onFinish': function() {
	      var $valid = $("#commentForm").valid();
	      if ($valid) {
		console.log('finish',$valid)
	      }
	    },
	    'onTabShow': function(tab, navigation, index) {
	      var $total = navigation.find('li').length;
	      var $current = index+1;
	      var $percent = ($current/$total) * 100;
	      $('#rootwizard .progress-bar').css({width:$percent+'%'});
	    }
	});
// 	$('#rootwizard').bootstrapWizard('disable',2);
	window.prettyPrint && prettyPrint()
    });
    $('#changeIP').on('click',function() {
      if ($(this).text() === "手动添加") {
	  $('#ipList').hide();
	  $('#ips').show();
	  $(this).text('加载ECS内网IP');
      } else {
	  $('#ipList').show();
	  $('#ips').hide();
	  $(this).text('手动添加')
      }
    });
    </script>
  </body>
</html>
```
