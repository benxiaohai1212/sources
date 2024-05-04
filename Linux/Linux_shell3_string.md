### 字符串比较

```
#!/bin/sh

str1="1.2.x86_64"
str2="2.3.x86_64"

if [ $(echo $str1 $str2 | awk '$1>$2 {print 1} $1==$2 {print 0} $1<$2 {print 2}') -eq 1 ]
then
    echo $str1 大于 $str2
elif [ $(echo $str1 $str2 | awk '$1>$2 {print 1} $1==$2 {print 0} $1<$2 {print 2}') -eq 0 ]
then
    echo   $str1 等于 $str2
else
   echo    $str1 小于 $str2
fi
```
输出结果：1.2.x86_64 小于 2.3.x86_64


方法一：利用grep查找
```sh
strA="long string"
strB="string"
result=$(echo $strA | grep "${strB}")
if [[ "$result" != "" ]]
then
  echo "包含"
else
  echo "不包含"
fi
```
方法二：利用字符串运算符
```sh
strA="helloworld"
strB="low"
if [[ $strA =~ $strB ]]
then
  echo "包含"
else
  echo "不包含"
fi
```
方法三：利用通配符
```sh
A="helloworld"
B="low"
if [[ $A == *$B* ]]
then
  echo "包含"
else
  echo "不包含"
fi
```
方法四：利用case in 语句
```sh
thisString="1 2 3 4 5" # 源字符串
searchString="1 2" # 搜索字符串
case $thisString in
  *"$searchString"*) echo Enemy Spot ;;
  *) echo nope ;;
esac
```
方法五：利用替换
```sh
STRING_A=$1
STRING_B=$2
if [[ ${STRING_A/${STRING_B}//} == $STRING_A ]]
  then
    ## is not substring.
    echo N
    return 0
  else
    ## is substring.
    echo Y
    return 1
  fi
```
多条件判断
```
if [ $a = "aa" -a $b = "bb" ] || [$c = "cc" -a $d = "dd" ];
then
  echo "success"
fi
```
获取可用磁盘空间`df -h | grep -v grep | awk 'NR==2{print $4}'`  
获取可用空间的数字`df -h | grep -v grep | awk 'NR==2{print $4}'| tr -cd '[0-9]'`