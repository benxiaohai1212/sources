## 交互式 Bash Shell 获取进程 pid
```
在已知进程名(name)的前提下，交互式 Shell 获取进程 pid 有很多种方法，典型的通过 grep 获取 pid 的方法为（这里添加 -v grep是为了避免匹配到 grep 进程）：
ps -ef | grep "name" | grep -v grep | awk '{print $2}'
或者不使用 grep（这里名称首字母加[]的目的是为了避免匹配到 awk 自身的进程）：
ps -ef | awk '/[n]ame/{print $2}'
如果只使用 x 参数的话则 pid 应该位于第一位：
ps x | awk '/[n]ame/{print $1}'
最简单的方法是使用 pgrep：
pgrep -f name
如果需要查找到 pid 之后 kill 掉该进程，还可以使用 pkill：
pkill -f name
如果是可执行程序的话，可以直接使用 pidof
pidof name
```

## shell 脚本中$$,$#,$?分别代表什么意思
```
$0 这个程式的执行名字
$n 这个程式的第n个参数值，n=1..9
$* 这个程式的所有参数,此选项参数可超过9个。
$# 这个程式的参数个数
$$ 这个程式的PID(脚本运行的当前进程ID号)
$! 执行上一个背景指令的PID(后台运行的最后一个进程的进程ID号)
$? 执行上一个指令的返回值 (显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误)
$- 显示shell使用的当前选项，与set命令功能相同
$@ 跟$*类似，但是可以当作数组用
```

## 用wget在oracle.com官网下载jdk
```
wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u152-b16/aa0333dd3019491ca4f6ddbe78cdb6d0/jdk-8u152-linux-x64.rpm
```


## 替换

1. sed替换的基本语法为:
```
sed 's/原字符串/替换字符串/'
```
单引号里面,s表示替换,三根斜线中间是替换的样式,特殊字符需要使用反斜线”\”进行转义。  

2. 单引号” ‘ ’”是没有办法用反斜线”\”转义的,这时候只要把命令中的单引号改为双引号就行了,格式如下：  
### 要处理的字符包含单引号
```
sed "s/原字符串包含'/替换字符串包含'/" 
```
3. 命令中的三根斜线分隔符可以换成别的符号,有时候替换目录字符串的时候有较多斜线，这个时候换成其它的分割符是较为方便,只需要紧跟s定义即可。  
### 将分隔符换成问号”?”:
```
sed 's?原字符串?替换字符串?'
```
4. 可以在末尾加g替换每一个匹配的关键字,否则只替换每行的第一个,例如:  
### 替换所有匹配关键字  
```
sed 's/原字符串/替换字符串/g'
```
5. 一些特殊字符的使用
```
　　”^”表示行首
　　”$”符号如果在引号中表示行尾，但是在引号外却表示末行(最后一行)
```

### 注意这里的 " & " 符号，如果没有 “&”，就会直接将匹配到的字符串替换掉  
> sed 's/^/添加的头部&/g' 　　　　 #在所有行首添加  
> sed 's/$/&添加的尾部/g' 　　　　 #在所有行末添加  
> sed '2s/原字符串/替换字符串/g'　 #替换第2行  
> sed '$s/原字符串/替换字符串/g'   #替换最后一行  
> sed '2,5s/原字符串/替换字符串/g' #替换2到5行  
> sed '2,$s/原字符串/替换字符串/g' #替换2到最后一行  

 

6.批量替换字符串
```
sed -i "s/查找字段/替换字段/g" `grep 查找字段 -rl 路径`
sed -i "s/oldstring/newstring/g" `grep oldstring -rl yourdir
```

7. sed处理过的输出是直接输出到屏幕上的,使用参数”i”直接在文件中替换。  
### 替换文件中的所有匹配项  
```
sed -i 's/原字符串/替换字符串/g' filename
```
8. 多个替换可以在同一条命令中执行,用分号”;”分隔，其格式为:  
### 同时执行两个替换规则
```
sed 's/^/添加的头部&/g；s/$/&添加的尾部/g' 
```

## 时间加减
```
first_stamp=`date -d "2014-12-05 19:45:44" +%s` #计算指定日期的时间戳
today_stamp=`date +%s`                          #计算当天的时间戳
let day_stamp=($today_stamp - $first_stamp)     #当天的时间戳减去指定的时间戳
let day=($day_stamp/86400)                      #相差的时间戳除以一天的秒数就得到天数
echo $day
```

## jenkins通过iptables将8080端口转向80端口
```
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

## CentOS 查看软件安装路径
```
rpm -qa  //找出系统所有的包，找到对应的文件名
rpm -ql 软件名称  // 找出安装路径
```
## ubuntu 升级软件：
```
sudo apt-get update 更新源
sudo apt-get upgrade 更新已安装的包
sudo apt-get dist-upgrade 升级系统

ubuntu升级特定软件：sudo apt-get  install pkgname

看软件安装位置：dpkg -L xxxx

查看软件是否安装：dpkg -l | grep filename

查看安装路径：dpkg -L 软件名
```

## ubuntu查看软件版本：
```
首先安装软件，apt-show-versions 或者aptitude（信息比较详细，推荐）
1. 使用dpkg：dpkg -l firefox
2. 安装 sudo apt-get install apt-show-versions
    使用：$ apt-show-versions firefox
3. 安装 sudo apt-get install aptitude
    使用：aptitude show firefox
```

## apt使用
```
apt-cache search package 搜索包
apt-cache show package 获取包的相关信息，如说明、大小、版本等
sudo apt-get install package 安装包
sudo apt-get install package - - reinstall 重新安装包
sudo apt-get -f install 修复安装"-f = ——fix-missing"
sudo apt-get remove package 删除包
sudo apt-get remove package - - purge 删除包，包括删除配置文件等
sudo apt-get update 更新源
sudo apt-get upgrade 更新已安装的包
sudo apt-get dist-upgrade 升级系统
sudo apt-get dselect-upgrade 使用 dselect 升级
apt-cache depends package 了解使用依赖
apt-cache rdepends package 是查看该包被哪些包依赖
sudo apt-get build-dep package 安装相关的编译环境
apt-get source package 下载该包的源代码
sudo apt-get clean && sudo apt-get autoclean 清理无用的包
sudo apt-get check 检查是否有损坏的依赖 

```

## git pull脚本
```
#!/usr/bin/env sh
basepath=$(cd `dirname $0`; pwd)
echo "[current dir is: $basepath]"
for rop in $(find $basepath -type d  -name ".git" | cut -d. -f1)
do
	cd $rop 
	echo $rop
#       git checkout master && git pull 
#       git checkout test && git pull 
	git checkout test
	git pull  
	mvn clean compile package -Dmaven.test.skip=true -Ptest
#截取字符串
	CPA="${rop%*/}"
	projectName=${CPA##*/}
#替换字符串
	sed -i "s/test.ecloud.com.cn/demo.ecloud.com.cn/g" `grep -rl "test.ecloud.com.cn" ./*-web/target/web/`
	mv ./*-web/target/web /home/tomhat/projectSources/huabei/target/"$projectName"
	cd $basepath
done

cd  /home/tomhat/projectSources/huabei/target/
zip -rm service-`date "+%Y%m%d-%H%M%S"`.zip ./*
cd $basepath
```
Linux执行脚本
```
#!/usr/bin/env sh
basepath=$(cd `dirname $0`; pwd)
echo "[current dir is: $basepath]"
for rop in $(find $basepath -type d  -name ".git" | cut -d. -f1)
do
    cd $rop 
    && git checkout master && git pull 
    && git checkout test && git pull 
    && git checkout develop && git pull  
    && cd $basepath
done
```
window中用git bash执行
```
#!/usr/bin/env sh
basepath=`pwd`
for rop in $(find $basepath -type d  -name ".git")
do
    cd ${rop%.git}
    && git checkout master 
    && git pull 
    && git checkout test 
    && git pull 
    && git checkout develop 
    && git pull  
done
cd $basepath
```

## Linux下查看文件和文件夹大小

当磁盘大小超过标准时会有报警提示，这时如果掌握df和du命令是非常明智的选择。
>df可以查看一级文件夹大小、使用比例、档案系统及其挂入点，但对文件却无能为力

>du可以查看文件及文件夹的大小

两者配合使用，非常有效。比如用df查看哪个一级目录过大，然后用df查看文件夹或文件的大小，如此便可迅速确定症结

下面分别简要介绍

### df命令可以显示目前所有文件系统的可用空间及使用情形
```sh
tomhat@tomhat:~/projectSource/project/docker-images$ df -h
文件系统        容量  已用  可用 已用% 挂载点
udev            1.9G  4.0K  1.9G    1% /dev
tmpfs           376M  1.4M  374M    1% /run
/dev/sda1       107G   78G   24G   77% /
none            4.0K     0  4.0K    0% /sys/fs/cgroup
none            5.0M     0  5.0M    0% /run/lock
none            1.9G  129M  1.8G    7% /run/shm
none            100M   48K  100M    1% /run/user
```
 ### du：查询文件或文件夹的磁盘使用空间
 
如果当前目录下文件和文件夹很多，使用不带参数du的命令，可以循环列出所有文件和文件夹所使用的空间。这对查看究竟是那个地方过大是不利的，所以得指定深入目录的层数，参数：--max-depth=，这是个极为有用的参数！如下，注意使用“*”，可以得到文件的使用空间大小.
```sh
[root@bsso yayu]# du -h --max-depth=1 work/testing
27M     work/testing/logs
35M     work/testing

[root@bsso yayu]# du -h --max-depth=1 work/testing/*
8.0K    work/testing/func.php
27M     work/testing/logs
8.1M    work/testing/nohup.out
8.0K    work/testing/testing_c.php
12K     work/testing/testing_func_reg.php
8.0K    work/testing/testing_get.php
8.0K    work/testing/testing_g.php
8.0K    work/testing/var.php

[root@bsso yayu]# du -h --max-depth=1 work/testing/logs/
27M     work/testing/logs/

[root@bsso yayu]# du -h --max-depth=1 work/testing/logs/*
24K     work/testing/logs/errdate.log_show.log
8.0K    work/testing/logs/pertime_show.log
27M     work/testing/logs/show.log
```
---

## CentOS 7.0默认使用的是firewall作为防火墙，使用iptables必须重新设置一下

1、直接关闭防火墙
```sh
systemctl stop firewalld.service #停止firewall
systemctl disable firewalld.service #禁止firewall开机启动
```
2、设置 iptables service
```sh
yum -y install iptables-services
```
如果要修改防火墙配置，如增加防火墙端口3306
```sh
vi /etc/sysconfig/iptables 
```
增加规则
```sh
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
```
保存退出后
```sh
systemctl restart iptables.service #重启防火墙使配置生效
systemctl enable iptables.service #设置防火墙开机启动
```
最后重启系统使设置生效即可
---

## Linux 下查看局域网内所有主机IP和MAC 
```sh
 用nmap对局域网扫描一遍，然后查看arp缓存表就可以知道局域内ip对应的mac了。nmap比较强大也可以直接扫描mac地址和端口。执行扫描之后就可以 cat/proc/net/arp查看arp缓存表了。

进行ping扫描，打印出对扫描做出响应的主机：　　
$ nmap -sP 192.168.1.0/24　　

仅列出指定网络上的每台主机，不发送任何报文到目标主机：　
$ nmap -sL 192.168.1.0/24　　

探测目标主机开放的端口，可以指定一个以逗号分隔的端口列表(如-PS22，23，25，80)：　　
$ nmap -PS 192.168.1.234　　

使用UDPping探测主机：
$ nmap -PU 192.168.1.0/24　　

使用频率最高的扫描选项（SYN扫描,又称为半开放扫描），它不打开一个完全的TCP连接，执行得很快：
$ nmap -sS 192.168.1.0/24
```
