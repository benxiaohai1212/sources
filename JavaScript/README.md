## 说明：  
### 左右移动插件(穿梭框)
https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox

### datatable
https://ops-coffee.cn/s/5dZx6HrPE1Y4rdxqHTYN-g

### BOM详解
https://www.cnblogs.com/qdhxhz/p/12031925.html

### 表单提交加上传
https://www.layui.com/doc/modules/upload.html

### 正则
[检测正则是否正确](https://jex.im/regulex/#!flags=&re=)
1. 最少包含2个大写字母、2个小写字母、2个数字、2个指定的特殊字符、长度10到20
```
var regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{10,20}$/;
```
2. 最少包含1个大写字母、1个小写字母、1个数字、一个指定的特殊字符、长度10到20
```
function checkPassWord(psd){
    var psd=$("#psd").val();
    var contentPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{10,20}$/;
    var rootPattern=/^((?!root).)*$/;
	
    if(!contentPattern.test(psd)){
        console.log("最少包含1个大写字母、1个小写字母、1个数字、一个指定的特殊字符、长度10到20");
        return "最少包含1个大写字母、1个小写字母、1个数字、一个指定的特殊字符、长度10到20"";
    }
    if(!rootPattern.test(psd)){
        console.log("密码不能包含“root”");
        return "密码不能包含“root”";
    }
}
```
原文：https://blog.csdn.net/chuanxincui/article/details/83820043 

3. 以中文、英文字母开头，可以包含可以包含数字、中文、英文、下划线（_）、短横线（-）,不能以 http:// 和 https:// 开头
```
var regex = /^(?!.*(http[s]:\/\/{0,1}))^[A-Za-z\u4e00-\u9fa5][0-9A-Za-z-_\u4e00-\u9fa5\/(_?:\-)]{1,256}$/;
```
4. 验证IP段
```
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

var ipv4RegexRange = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:(?:([0-9]))|(?:(1[0-9]))|(?:(2[0-4]))|(?:(3[0-2])))$/,
```

### 1. java加密解密与JavaScript加密解密可以相互配合，及JavaScript加密，用java可以解密；java加密已用JavaScript解密；
  * [JavaScript加密解密](https://gitee.com/tomhat/sources/blob/master/javascript/JavaScript%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86.md)
  * [java加密解密](https://gitee.com/tomhat/sources/blob/master/javascript/java%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86.md)

### 2. bootstrap-select简单用法：   
 1. 初始化  `$(select).selectpicker();`  
 2. 单选赋值 `$(select).selectpicker('val', value); `   
 3. 多选选赋值 `$(select).selectpicker('val', values); `  
 4. 取值 `$(select).selectpicker('val'); `  
 5. 销毁 `$(select).selectpicker('destroy'); `  
 6. 动态加载select不可缺少：  
    `$(select).selectpicker('refresh'); `     
    `$(select)selectpicker('render');`      

### 3. bootstrapValidator.js用法：
 * [boostrapValidator用法说明](https://gitee.com/tomhat/sources/blob/master/javascript/bootstrapValidator.js.md)

### 4. layui-upload简单用法:
 * [layui-upload用法示例](https://gitee.com/tomhat/sources/tree/master/javascript/layui-upload)

### 5. webuploader官网示例:  
 * [webuploader](http://fex.baidu.com/webuploader/getting-started.html) 
 * [springboot + webuploader 示例 - spring-file](https://gitee.com/jufeng9878/java-master.git)