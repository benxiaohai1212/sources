Bash是许多Linux平台的内定Shell，除bash外，还有许多传统UNIX上用的Shell，像tcsh、csh、ash、bsh、ksh等等。

GNU/Linux 操作系统中的 /bin/sh 本是 bash的符号链接，但鉴于 bash 过于复杂，有人把 bash 从 NetBSD 移植到 Linux 并更名为 dash 并将 /bin/sh 指向它，以获得更快的脚本执行速度。Dash Shell 比 Bash Shell 小的多，符合POSIX标准。

Debian和Ubuntu中，/bin/sh默认已经指向dash，这是一个不同于bash的shell，它主要是为了执行脚本而出现，而不是交互，它速度更快，但功能相比bash要少很多，语法严格遵守POSIX标准。
要知道自己的/bin/sh指向何种解释器，可以用 ls /bin/sh -al 命令查看。

解决办法

修改默认的sh，可以采用命令sudo dpkg-reconfigure dash。在配置菜单中选no


|         | [[]]   | []     |
|---------|--------|--------|
| < 排序比较  | 支持     | 不支持    |
| > 排序比较  | 支持     | 不支持    |
|         | && 逻辑与 | -a 逻辑与 |
| == 模式匹配 | 支持     | ==字符匹配 |
| =~ 正则匹配 | 支持     | 不支持    |



获取本机IP
```
ip a | grep inet | grep -v docker | grep -v inet6 | grep -v 127.0.0.1 | awk '{print $2}' | cut -d '/' -f 1
```
```
ip addr | awk '/^[0-9]+: / {}; /inet.*global/ {print gensub(/(.*)\/(.*)/, "\\1", "g", $2)}'
```
```
ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:"
```
使用ip addr命令
```
ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1 -d '/'
```
grep   -A2 显示匹配后的后2行

或者：
```
ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | awk -F"/" '{print $1}'
```

基本要素：

```
1. [ ] 两个符号左右都要有空格分隔  

2. 内部操作符与操作变量之间要有空格：如  [ "a" = "b" ]  

3. 字符串比较中，> < 需要写成\> \< 进行转义  

4. [ ] 中字符串或者${}变量尽量使用"" 双引号扩住，避免值未定义引用而出错的好办法  

5. [ ] 中可以使用 –a –o 进行逻辑运算  
```

| 逻辑操作符 |  注释  |
| -- | -- |
| -a |  逻辑与，操作符两边均为真，结果为真，否则为假。  |
| -o |  逻辑或，操作符两边一边为真，结果为真，否则为假。  |
| !  |  逻辑否，条件为假，结果为真。  |
---
大小写转换

1. 用`tr`  
```
UPPERCASE=$(echo $VARIABLE | tr '[a-z]' '[A-Z]')   (把VARIABLE的小写转换成大写)
LOWERCASE=$(echo $VARIABLE | tr '[A-Z]' '[a-z]')   (把VARIABLE的大写转换成小写)
```

2. 用`typeset` 先设置类型是大写或小写，在赋值  
```
typeset -u VARIABLE  (把VARIABLE的小写转换成大写)
typeset -l VARIABLE  (把VARIABLE的大写转换成小写)
``` 
例如：  
typeset -u VARIABLE  
VARIABLE="True"  
echo $VARIABLE  
输出为TRUE  

3. 用表达式 bash4.0以上  
**${parameter,,pattern},${parameter^^pattern}表达式,表达不会改变原来变量的值**
```
var="Hello,Word"
# 把变量中的第一个字符换成大写 
echo ${var^} 

# 把变量中的所有小写字母，全部替换为大写
echo ${var^^}   

# 把变量中的第一个字符换成小写
echo ${var,}

# 把变量中的所有大写字母，全部替换为小写
echo ${var,,}
```
---

## 查询文件内字符串、替换文件内字符串
```text
grep, sed 在目录及递归子目录中的所有文件 查找并替换 字符串

查找： grep "要找的字符串" -rl 目录

替换： sed -i "s/要查找的字符串/替换字符串/g" `grep "要查找的字符串" -rl 目录`
```
例：
```sh
grep -r 'org.openstack4j' ./

sed -i "s/org.openstack4j/cn.com.ecloud/g" `grep "org.openstack4j" -rl ./`
```

## 删除 `<内容>`
test.txt
```
<if test="questionId != null">#{questionId},</if>
<if test="subQuestionId != null">#{subQuestionId},</if>
```
```
sed -i 's/<[^>]*>//g' test.txt
```
结果
```
#{questionId},
#{subQuestionId},
```

---
## 查找文件，并将查找到的文件拷贝到指定目录
1、使用`exec`:
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 -exec cp {} /backups/ \;
```
`cp`后面的`{}`代表的就是`find`得到的结果，最后的`\;`好像是固定格式

2、使用`xargs`:
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 | xargs cp --target-directory=/backups/
```
> `--target-directory` 指定服务到哪个目录  

此方法会有个问题，就是如果目录有空格的话，就会无法复制，需要如下方式:
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 -print | xargs -i echo '"{}"' | xargs cp --target-directory /backups/
```

3、带目录结构拷贝  
> `--parents` 保留目录结构  
> `-rf` 若是文件夹要递归  

例如：  
```
cp --parents -rf   bionic/libc/kernel/common/mtd/mtd-abi.h hx-2014-9-28/
```
4. 根据时间删除
```
find /tmp -mtime +21 -name "*.*" -exec rm -Rf {} \;
```
find /home/lifeccp/dicom/studies -mtime +21 -name "*.*" -exec rm -Rf {} \;

* /home/lifeccp/dicom/studies ：准备要进行清理的任意目录
* -mtime：标准语句写法
* ＋10：查找10天前的文件，这里用数字代表天数，＋30表示查找30天前的文件
* "*.*"：希望查找的数据类型，"*.jpg"表示查找扩展名为jpg的所有文件，"*"表示查找所有文件
* -exec：固定写法
* rm -rf：强制删除文件，包括目录
* {} \; ：固定写法，一对大括号+空格+/+;


Shell脚本中`$0`、`$?`、`$!`、`$$`、`$*`、`$#`、`$@` 等的意义说明
1. `$$` Shell本身的PID（ProcessID，即脚本运行的当前进程ID号）  
2. `$!` Shell最后运行的后台Process的PID(后台运行的最后一个进程的进程ID号)
3. `$?` 最后运行的命令的 _结束代码_ （返回值）即执行上一个指令的返回值 (显示 **最后命令的退出状态** 。0表示没有错误，其他任何值表明有错误)   
4. `$-` 显示shell使用的当前选项，与set命令功能相同  
5. `$*` 所有参数列表。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数，此选项参数可超过9个  
6. `$@` 所有参数列表。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数,`$@` 跟`$*`类似，但是可以当作数组用  
7. `$#` 添加到Shell的参数个数 相当于main函数的argc-1
8. `$0` Shell本身的文件名 相当于c语言main函数的argv[0]
9. `$1`～`$n` 添加到Shell的各参数值。$1是第1参数、$2是第2参数…  相当于c语言main函数的argv[1],argv[2]...


echo可以控制字体颜色和背景颜色输出。  
常见的字体颜色：重置=0，黑色=30，红色=31，绿色=32，黄色=33，蓝色=34，紫色=35，天蓝色=36，白色=37。  
常见的背景颜色：重置=0，黑色=40，红色=41，绿色=42，黄色=43，蓝色=44，紫色=45，天蓝色=46，白色=47。  
字体控制选项：1表示高亮，4表示下划线，5表示闪烁等。  
因为需要使用特殊符号，所以需要配合-e选项来识别特殊符号  
任意一个\e可以使用\033替换  
例：  
echo -e "\e[1;41m Red Bcakground \e[0m"  
echo -e "\e[1;31m Red Bcakground \e[0m"  
echo -e "\e[5;4;1;31m Red Bcakground \e[0;0;0m"
![输入图片说明](https://images.gitee.com/uploads/images/2019/1205/132005_eddea831_132614.png "733013-20160928084442125-1021350978.png")


系统给定的特殊变量：

|变量名|	作用|
|---|---|
|$0|	当前脚本的名字|
|$n|	传递给脚本或者函数的参数，n表示第几个参数|
|$#|	传递给脚本或函数的参数个数|
|$*|	传递给脚本或函数的所有参数|
|$@|	传递给脚本或者函数的所有参数|
|$$|	当前shell脚本进程的PID|
|$?|	函数返回值，或者上个命令的退出状态|
|$BASH|	BASH的二进制文件问的路径|
|$BASH_ENV|	BASH的启动文件|
|$BASH_VERSINFO[n]|	BASH版本信息，有六个元素|
|$BASH_VERSION|	BASH版本号|
|$EDITOR|	脚本所调用的默认编辑器|
|$EUID|	当前有效的用户ID|
|$FUNCNAME|	当前函数名|
|$GROUPS|	当前用户所属组|
|$HOME|	当前用户家目录|
|$HOSTTYPE|	主机类型|
|$LINENO|	当前行号|
|$OSTYPE|	操作系统类型|
|$PATH|	PATH路径|
|$PPID|	当前shell进程的父进程ID|
|$PWD|	当前工作目录|
|$SECONDS|	当前脚本运行秒数|
|$TMOUT|	不为0时，超过指定的秒将退出shell|
|$UID|	当前用户ID|