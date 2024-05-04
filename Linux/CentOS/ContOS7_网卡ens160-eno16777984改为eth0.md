# Centos7的网卡名称ens160、eno16777984改为eth0

### 1. 修改网卡配置文件  

vim /etc/sysconfig/network-scripts/ifcfg-eno16777984

修改下面两项配置：

NAME=eno16777984  
DEVICE=eno16777984

改为

NAME=eth0  
DEVICE=eth0

### 2. 网卡配置文件重命名

cd /etc/sysconfig/network-scripts/  
mv ifcfg-eno16777984 ifcfg-eth0

### 3. 修改grub来禁用老的命名规则

vim /etc/sysconfig/grub

在GRUB_CMDLINE_LINUX末尾加入配置：net.ifnames=0 biosdevname=0
```
GRUB_CMDLINE_LINUX="rd.lvm.lv=centos/root rd.lvm.lv=centos/swap crashkernel=auto rhgb quiet net.ifnames=0 biosdevname=0"
```

### 4. 重新生成grub配置并更新内核参数

grub2-mkconfig -o /boot/grub2/grub.cfg

### 5. 添加udev的规则

在文件夹/etc/udev/rules.d中创建网卡规则文件：70-persistent-net.rules，并写入内容：

cd /etc/udev/rules.d

vim 70-persistent-net.rules
```
UBSYSTEM=="net",ACTION=="add",DRIVERS=="?*",ATTR{address}=="00:0c:29:de:6b:94",ATTR｛type｝=="1" ,KERNEL=="eth*",NAME="eth0"
```
网卡MAC地址`00:0c:29:de:6b:94`填写你的网卡MAC地址，是通过ip addr或ifconfig获取的


### 6. reboot重启看效果
