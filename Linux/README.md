
### 查看CPU信息
1. 查看CPU逻辑id ```grep 'physical id' /proc/cpuinfo | sort -u```
2. 查看物理CPU个数 ```cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l```
3. 查看每个物理CPU中core的个数 `cat /proc/cpuinfo| grep "cpu cores"| uniq`
4. 查看逻辑CPU的个数 `cat /proc/cpuinfo| grep "processor"| wc -l`
5. 查看总线程数量 `grep 'processor' /proc/cpuinfo | sort -u | wc -l`
6. 查看CPU信息（型号） `cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c`

### top命令详解
进程列表部分：
```
　　PID：进程的ID
　　USER：进程所有者
　　PR：进程的优先级别，越小越优先被执行
　　NInice：值
　　VIRT：进程占用的虚拟内存
　　RES：进程占用的物理内存
　　SHR：进程使用的共享内存
　　S：进程的状态。S表示休眠，R表示正在运行，Z表示僵死状态，N表示该进程优先值为负数
　　%CPU：进程占用CPU的使用率
　　%MEM：进程使用的物理内存和总内存的百分比
　　TIME+：该进程启动后占用的总的CPU时间，即占用CPU使用时间的累加值。
　　COMMAND：进程启动命令名称
```

### Linux 搜狗拼音关闭繁简切换快捷键
vim ~/.config/sogoupinyin/conf/env.ini  
```
ShortCutFanJian=0
```

### 回收 buff/cache
```
echo 1 > /proc/sys/vm/drop_caches # 仅清除页面缓存
echo 2 > /proc/sys/vm/drop_caches # 清除目录项和inode
echo 3 > /proc/sys/vm/drop_caches # 清除页面缓存、目录项以及inode
```

## 修改文件权限

1. 针对文件
```
 r：读取文件内容
 w：修改文件内容
 x：执行权限对除二进制程序以外的文件没什么意义
```
2. 针对目录
```
 r：查看目录下的文件列表
 w：删除和创建目录下的文件
 x：可以cd进入目录，能查看目录中文件的详细属性，能访问目录下文件内容（基础权限）
```
![输入图片说明](https://images.gitee.com/uploads/images/2021/0310/095234_bae9fc1e_132614.png "20181230191538790.png")

3. chmod 修改权限 change mode  
* 方法1：mode法  
`chmod who opt per file`
```
  who：u g o a（all）
  opt：+ – =
  per：r w x X
```
* 方法2：数字法  
格式：chmod XXX file  
```
  rwx rw- r–	
  111 110 100
  7   6   4
  
  r：4
  w：2
  x：1
```

## 修改时区

```
mv /etc/localtime /etc/localtime_bak && cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
```

## 用户添加删除修改
```
useradd(选项)(参数)  
  
-c<备注>：加上备注文字。备注文字会保存在passwd的备注栏位中；   
-d<登入目录>：指定用户登入时的启始目录；   
-D：变更预设值；   
-e<有效期限>：指定帐号的有效期限；   
-f<缓冲天数>：指定在密码过期后多少天即关闭该帐号；   
-g<群组>：指定用户所属的群组；   
-G<群组>：指定用户所属的附加群组；   
-m：自动建立用户的登入目录；   
-M：不要自动建立用户的登入目录；   
-n：取消建立以用户名称为名的群组；   
-r：建立系统帐号；   
-s：指定用户登入后所使用的shell；   
-u：指定用户id。
```
例：  
>`usermod -G admin web`             #给web用户设置admin附属用户组  

>#给用户设置添加多个用户组  
>`usermod -g web -G admin,www web`  #给web用户设置主用户组web组，admin,www附属用户组  
>`gpasswd -a web admin`             #给web用户设置admin用户组 

>#新建用户同时增加工作组  
>`useradd -g admin web`              #新建web用户并增加到admin工作组  
*注：：-g 所属组 -d 家目录 -s 所用的SHELL*

临时关闭
1. /etc/shadow文件中属于该用户的行的第二个字段（密码）前面加上*就可以了。想恢复该用户，去掉*即可。
2. 使用命令关闭用户账号
 > `passwd web –l`  关闭  
 > `passwd web –u`  释放

永久性删除用户账号
>userdel web  
>groupdel web  
>usermod –G web web   （强制删除该用户的主目录和主目录下的所有文件和子目录） 

从组中删除用户  
1.编辑/etc/group 找到用户组admin那一行，删除用户名web  
2.用命令:`gpasswd -d A web`  

显示用户信息
```
id user
cat /etc/passwd
```

组的操作：  
 > #新建admin工作组  
 > `groupadd admin`   

 > #修改admin用户组名称改为newadmin   
 > `groupmod -n newadmin admin`      

 > #删除admin用户组  
 > `groupdel admin`           

 > #查看web所有用户组    
 > `groups web`                    

## 卸载VMware Workstation、VMware player

`vmware-installer -u vmware-workstation`  
`vmware-installer -u vmware-player`

1.先查看安装的虚拟机
```
vmware-installer -l
```
然后会显示版本和产品名称  
Product Name Product Version  
====================== ====================  
vmware-workstation 7.0.1.227600  

2.卸载虚拟机
```
sudo vmware-installer --uninstall-product vmware-workstation
```
然后根据提示点两下就ok了。


## Linux安装PAC Manager
[安装PAC](https://gitee.com/tomhat/sources/blob/master/Linux/INSTALL_PAC.md)