## shell 版本号比较
#### 用shell如何比较软件版本号的大小

比如你想写个脚本来比较两个版本号 (如"1.2.30" 和"1.3.0")来辨认哪个版本是最新的，有可以比较两个版本号字符串的shell脚本吗？

当你写了一个shell脚本，想使用脚本来比较两个版本号，然后能区分哪个版本号更高哪个版本号更低。比如，你安装某个软件的时候，要求是版本号要大于1.3.0，想验证最低配置要求.又或者你想在shell脚本中写版本号判断（比如版本号如果介入1.0.0 ≤ 版本 ≤ 2.3.1）.

如果你想通过shell来比较两个版本号字符串的话最简单的就是使用sort命令。加上参数"-V"后sort命令就可以把文本中的版本号给排序出来（默认是递增的排序），然后你想倒叙排序的话那就使用参数"-rV"即可

![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/114457_d527259c_132614.jpeg "227-160319121605944.jpg")
下面我们就来看下在shell中怎么使用sort命令来比较版本号吧

对于要比较版本号字符串的话，下面的这些使用了sort命令的自定义函数可能会派上用场.
```
function compare_gt() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" != "$1"; }
function compare_le() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" == "$1"; }
function compare_lt() { test "$(echo "$@" | tr " " "\n" | sort -rV | head -n 1)" != "$1"; }
function compare_ge() { test "$(echo "$@" | tr " " "\n" | sort -rV | head -n 1)" == "$1"; }
```
上面的脚本主要是比较两个不同版本的文本，会得出大于、等于、小于、大于等于等结果。你可以根据自己的需要使用自定义函数。

下面是一个比较的示例.
```
#!/bin/bash
 
VERSION=$1
VERSION2=$2
 
function compare_gt() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" != "$1"; }
function compare_lt() { test "$(echo "$@" | tr " " "\n" | sort -rV | head -n 1)" != "$1"; }
function compare_le() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" == "$1"; }
function compare_ge() { test "$(echo "$@" | tr " " "\n" | sort -rV | head -n 1)" == "$1"; }
 
if compare_gt $VERSION $VERSION2; then
   echo "$VERSION is greater than $VERSION2"
fi
 
if compare_lt $VERSION $VERSION2; then
   echo "$VERSION is less than $VERSION2"
fi
 
if compare_le $VERSION $VERSION2; then
   echo "$VERSION is less than or equal to $VERSION2"
fi
 
if compare_ge $VERSION $VERSION2; then
   echo "$VERSION is greater than or equal to $VERSION2"
fi
```