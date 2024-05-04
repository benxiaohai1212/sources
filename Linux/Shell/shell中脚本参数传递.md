getopts

语法格式：getopts [option[:]] [DESCPRITION] VARIABLE  
option：表示为某个脚本可以使用的选项  
":"：如果某个选项（option）后面出现了冒号（":"），则表示这个选项后面可以接参数（即一段描述信息DESCPRITION）  
VARIABLE：表示将某个选项保存在变量VARIABLE中  

示例：同样新建一个test.sh文件
```
while getopts ":a:b:c:" opt
do
    case $opt in
        a)
        echo "参数a的值$OPTARG"
        ;;
        b)
        echo "参数b的值$OPTARG"
        ;;
        c)
        echo "参数c的值$OPTARG"
        ;;
        ?)
        echo "未知参数"
        exit 1;;
    esac
done
```
用一个while循环加case分支获取不同参数，:a:b:c相当于定义参数的变量名，有时候可能会有未知参数，所以增加一个?的分支。  
在shell中执行脚本，结果如下
```
$ ./test.sh -a 1 -b 2 -c 3

#在shell中的输出
参数a的值1
参数b的值2
参数c的值3
```
```
$ ./test.sh -a 1 -c 3

#在shell中的输出
参数a的值1
参数c的值3
```
```
$ ./test.sh -a 1 -c 3 -d 4

#在shell中的输出
参数a的值1
参数c的值3
未知参数
```
优点：由于使用了-a加参数值的方式进行一一匹配，所以不会参数匹配错误，同时也可以缺省参数，并不会导致参数错误，同时也便于后期参数的扩展和移植

缺点：脚本执行时参数需要的输入会增多
