## 设置Live Template

File -> Settings -> Editor -> Live Templates -> other    
Abbreviation：`builder`    
Description：`Inserts singleton method builder`    
Template Text：
```
private $CLASS_NAME$() {}
public static $CLASS_NAME$ builder() {
  return new $CLASS_NAME$();
}
```
Edit variables：
| Name       | Expression | Default value | Ship if defined |
|------------|------------|---------------|-----------------|
| CLASS_NAME | className  |               | 选择            |

Applicable in JAVA:declaration; 


## boolean类型生成带有is的字段的Get&Set方法，is会被自动除去

Get
```
#set($paramName = $helper.getParamName($field, $project))  
#if($field.modifierStatic)  
static ##  
#end  
$field.type ##  
#set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($helper.getPropertyName($field, $project))))  
#if ($field.name == $paramName)  
get##  
#else  
getIs##  
#end  
${name}() {  
return this.##  
$field.name;  
}  
```

Set
```
#set($paramName = $helper.getParamName($field, $project))  
#if($field.modifierStatic)  
static ##  
#end  
void ##  
#set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($helper.getPropertyName($field, $project))))  
#if ($field.name == $paramName)  
set##  
#else  
setIs##  
#end  
${name}($field.type $paramName) {  
#if (!$field.modifierStatic)  
this.##  
#else  
$classname.##  
#end  
$field.name = $paramName;  
}
```

Build 方式Set
```
#set($paramName = $helper.getParamName($field, $project))  
public ##  
#if($field.modifierStatic)  
static void ##  
#else  
  $classSignature ##  
#end  
#set($name = $field.name)  
$name($field.type $field.name) {  
  #if (!$field.modifierStatic || !$field.boolean)  
  this.##  
  #else  
    $classname.##  
  #end  
$field.name = $field.name;  
#if(!$field.modifierStatic)  
return this;  
#end  
} 
```