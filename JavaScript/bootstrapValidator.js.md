### 1、引入CSS、js
```
<link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.0/css/bootstrap.css" rel="stylesheet">
<link href="https://cdn.bootcss.com/jquery.bootstrapvalidator/0.5.2/css/bootstrapValidator.css" rel="stylesheet">

<script src="https://cdn.bootcss.com/jquery/3.4.0/jquery.js"></script>
<script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.0/js/bootstrap.js"></script>
<script src="https://cdn.bootcss.com/jquery.bootstrapvalidator/0.5.2/js/bootstrapValidator.js"></script>
```

### 2、用法：
#### 2.1、基础说明：
```
$(formSelector).bootstrapValidator({
    /**
    * 指定不验证的情况
    * 值可设置为以下三种类型：
    * 1、String ':disabled, :hidden, :not(:visible)'
    * 2、Array 默认值 [':disabled', ':hidden', ':not(:visible)']
    * 3、带回调函数 
    [':disabled', ':hidden', function($field, validator) {
        // $field 当前验证字段dom节点
        // validator 验证实例对象 
        // 可以再次自定义不要验证的规则
        // 必须要return，return true or false; 
        return !$field.is(':visible');
    }]
    */
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    /**
    * 指定验证后验证字段的提示字体图标。（默认是bootstrap风格）
    * Bootstrap 版本 >= 3.1.0
    * 也可以使用任何自定义风格，只要引入好相关的字体文件即可
    * 默认样式 
    .form-horizontal .has-feedback .form-control-feedback {
        top: 0;
        right: 15px;
    }
    * 自定义该样式覆盖默认样式
    .form-horizontal .has-feedback .form-control-feedback {
        top: 0;
        right: -15px;
    }
    .form-horizontal .has-feedback .input-group .form-control-feedback {
        top: 0;
        right: -30px;
    }
    */
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },

    /**
    * 生效规则（三选一）
    * enabled 字段值有变化就触发验证
    * disabled,submitted 当点击提交时验证并展示错误信息
    */
    live: 'enabled',

    /**
    * 为每个字段指定通用错误提示语
    */
    message: 'This value is not valid',

    /**
    * 指定提交的按钮，例如：'.submitBtn' '#submitBtn'
    * 当表单验证不通过时，该按钮为disabled
    */
    submitButtons: 'button[type="submit"]',

    /**
    * submitHandler: function(validator, form, submitButton) {
    *   //validator: 表单验证实例对象
    *   //form jq对象 指定表单对象
    *   //submitButton jq对象 指定提交按钮的对象
    * }
    * 在ajax提交表单时很实用
    * submitHandler: function(validator, form, submitButton) {
        // 实用ajax提交表单
        $.post(form.attr('action'), form.serialize(), function(result) {
            // .自定义回调逻辑
        }, 'json');
    }
    */
    submitHandler: null,

    /**
    * 为每个字段设置统一触发验证方式（也可在fields中为每个字段单独定义），默认是live配置的方式，数据改变就改变
    * 也可以指定一个或多个（多个空格隔开） 'focus blur keyup'
    */
    trigger: null,

    /**
    * Number类型 为每个字段设置统一的开始验证情况，当输入字符大于等于设置的数值后才实时触发验证
    */
    threshold: null,

    /**
    * 表单域配置
    */
    fields: {
        //多个重复
        <fieldName>: {
            //隐藏或显示 该字段的验证
            enabled: true,

            //错误提示信息
            message: 'This value is not valid',

            /**
            * 定义错误提示位置 值为CSS选择器设置方式
            * 例如：'#firstNameMeg' '.lastNameMeg' '[data-stripe="exp-month"]'
            */
            container: null,

            /**
            * 定义验证的节点，CSS选择器设置方式，可不必须是name值。
            * 若是id，class, name属性，<fieldName>为该属性值
            * 若是其他属性值且有中划线链接，<fieldName>转换为驼峰格式 selector: '[data-stripe="exp-month"]' => expMonth
            */
            selector: null,

            /**
            * 定义触发验证方式（也可在fields中为每个字段单独定义），默认是live配置的方式，数据改变就改变
            * 也可以指定一个或多个（多个空格隔开） 'focus blur keyup'
            */
            trigger: null,

            // 定义每个验证规则
            /**
                notEmpty：非空验证
                stringLength：长度限制
                regexp：正则表达式验证
                different：比较
                identical：比较是否相同
                remote：ajax验证
                emailAddress：email验证
                between: 验证输入值必须在某一个范围值内，比如大于1小于10
                creditCard: 身份证验证
                date: 日期验证
                ip: IP地址验证
                numeric: 数值验证
                phone: 电话号码验证
                url:验证
            */
            validators: {
                // 多个重复
                // 官方默认验证参照 http://bv.doc.javake.cn/validators/
                // 注：使用默认前提是引入了bootstrapValidator-all.js
                // 若引入bootstrapValidator.js没有提供常用验证规则，需自定义验证规则哦
                <validatorName>: <validatorOptions>
            }
        }
    }
});
```
常用事件：
```
1、重置某一单一验证字段验证规则
$(formName).data("bootstrapValidator").updateStatus("fieldName", "NOT_VALIDATED", null);

2、重置表单所有验证规则
$(formName).data("bootstrapValidator").resetForm();
resetForm 并不好用，执行后再次初始化将失效；

执行下面先销毁，在重置表单数据就可以了。
$(formName).bootstrapValidator('destroy');
$(formName)[0].reset();

3、手动触发表单验证
//触发全部验证
$(formName).data("bootstrapValidator").validate();
//触发指定字段的验证
$(formName).data("bootstrapValidator").validate('fieldName');

4、获取当前表单验证状态
// flag = true/false 
var flag = $(formName).data("bootstrapValidator").isValid();

5、根据指定字段名称获取验证对象
// element = jq对象 / null
var element = $(formName).data("bootstrapValidator").getFieldElements('fieldName');

6、当提交按钮是普通按钮
$("buttonName").on("click", function(){
    //获取表单对象
    var bootstrapValidator = form.data('bootstrapValidator');
    //手动触发验证
    bootstrapValidator.validate();
    if(bootstrapValidator.isValid()){
        //表单提交的方法、比如ajax提交
    }
});

7、当提交按钮的[type=”submit”]时
var bootstrapValidator = form.data('bootstrapValidator');
bootstrapValidator.on('success.form.bv', function (e) {
    e.preventDefault();
    //提交逻辑
});

8、动态添加表单字段校验  
$(formName).bootstrapValidator('addField','host',option);
例：
$('#createDBAccount').bootstrapValidator('addField','host',{
    validators: {
        notEmpty: {
            message: '主机必填不能为空'
        },
        callback: {
            /*自定义，可以在这里与其他输入项联动校验*/
            message: '主机格式无效',
            callback: function (value, validator) {
                var regx1 = /^%$/;
                var regx2 = /^localhost$/;
                var regx3 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)$/;
                if (value != null) {
                    if (value.indexOf(',') != -1) {
                        var hosts = value.split(',');
                        var flag = false;
                        for (var i =0 ; i<hosts.length; i++) {
                            if (regx1.test(hosts[i])) {
                                flag = true;
                            } else {
                                if (regx2.test(hosts[i])) {
                                    flag = true;
                                } else {
                                    if (regx3.test(hosts[i])) {
                                        flag = true;
                                    } else {
                                        return false;
                                    }
                                }
                            }
                        }
                        return flag;
                    } else {
                        var flag = false;
                        if (regx1.test(value)) {
                            flag = true;
                        } else {
                            if (regx2.test(value)) {
                                flag = true;
                            } else {
                                if (regx3.test(value)) {
                                    flag = true;
                                } else {
                                    return false;
                                }
                            }
                        }
                        return flag;
                    }
                } else {
                    return false;
                }
            }
        }
    }
});
                
```

#### 2.2、基本用法：
```
<form id="defaultForm" method="post" class="form-horizontal" action="target.php">
    <div class="form-group">
        <label class="col-lg-3 control-label">Full name</label>
        <div class="col-lg-4">
            <input type="text" class="form-control" name="firstName" placeholder="First name" />
            <span class="help-block" id="firstNameMessage" />
        </div>
        <div class="col-lg-4">
            <input type="text" class="form-control" name="lastName" placeholder="Last name" />
            <span class="help-block lastNameMessage" />
        </div>
    </div>

    <div class="form-group">
        <label class="col-lg-3 control-label">Username</label>
        <div class="col-lg-5">
            <input type="text" class="form-control" name="username" />
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-9 col-lg-offset-3">
            <button type="submit" class="btn btn-primary">Sign up</button>
        </div>
    </div>
</form>
<script type="text/javascript">
$(document).ready(function() {
    $('#defaultForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstName: {
                container: '#firstNameMessage',
                validators: {
                    notEmpty: {
                        message: 'The first name is required and cannot be empty'
                    }
                }
            },
            lastName: {
                container: '.lastNameMessage',
                validators: {
                    notEmpty: {
                        message: 'The last name is required and cannot be empty'
                    }
                }
            },
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        $.post($form.attr('action'), $form.serialize(), function(result) {
            console.log(result);
        }, 'json');
    });
});
</script>
```

#### 2.3、submit按钮或button按钮不在form表单内用法：
```
<form id="defaultForm" method="post" class="form-horizontal" action="target.php">
    <div class="form-group">
        <label class="col-lg-3 control-label">Full name</label>
        <div class="col-lg-4">
            <input type="text" class="form-control" name="firstName" placeholder="First name" />
            <span class="help-block" id="firstNameMessage" />
        </div>
        <div class="col-lg-4">
            <input type="text" class="form-control" name="lastName" placeholder="Last name" />
            <span class="help-block lastNameMessage" />
        </div>
    </div>

    <div class="form-group">
        <label class="col-lg-3 control-label">Username</label>
        <div class="col-lg-5">
            <input type="text" class="form-control" name="username" />
        </div>
    </div>
</form>
<div class="form-group">
    <div class="col-lg-9 col-lg-offset-3">
        <button type="submit" class="btn btn-primary">Sign up</button>
    </div>
</div>
<script type="text/javascript">
$(document).ready(function() {
    $('#defaultForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstName: {
                container: '#firstNameMessage',
                validators: {
                    notEmpty: {
                        message: 'The first name is required and cannot be empty'
                    }
                }
            },
            lastName: {
                container: '.lastNameMessage',
                validators: {
                    notEmpty: {
                        message: 'The last name is required and cannot be empty'
                    }
                }
            },
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            }
        }
    });
});

$('input[type="submit"').on('click',function() {
    //获取表单对象
    var bootstrapValidator = $('#defaultForm').data('bootstrapValidator');
    //手动触发验证
    bootstrapValidator.validate();
    if(bootstrapValidator.isValid()){
        //表单提交的方法、比如ajax提交
    }
});
</script>
```