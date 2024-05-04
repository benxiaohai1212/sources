### 设置时区
修改时区：

  方法1:
```
   cp  /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
```
  方法2：    
```
列出时区：timedatectl list-timezones
 
设置时区：timedatectl set-timezone Asia/Shanghai
```
  方法3：使用  tzselect

  查看是否修改成功：date

Fri Dec 14 10:48:05 CST 2018

如果显示CST则说明时区设置成功

CST：中国标准时间（China Standard Time），这个解释可能是针对RedHat Linux。

UTC：协调世界时，又称世界标准时间，简称UTC，从英文国际时间/法文协调时间”Universal Time/Temps Cordonn&eacute;”而来。中国大陆、香港、澳门、台湾、蒙古国、新加坡、马来西亚、菲律宾、澳洲西部的时间与UTC的时差均为+8，也就是UTC+8。

GMT：格林尼治标准时间（旧译格林威治平均时间或格林威治标准时间；英语：Greenwich Mean Time，GMT）是指位于英国伦敦郊区的皇家格林尼治天文台的标准时间，因为本初子午线被定义在通过那里的经线。


### 查看CentOS 版本

1、 通过 cat /proc/version 、uname
```
[root@localhost ~]# cat /proc/version 
Linux version 3.10.0-693.el7.x86_64 (builder@kbuilder.dev.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-16) (GCC) ) #1 SMP Tue Aug 22 21:09:27 UTC 2017

[root@localhost ~]# uname -a
Linux localhost.localdomain 3.10.0-693.el7.x86_64 #1 SMP Tue Aug 22 21:09:27 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux

[root@localhost ~]# uname -r
3.10.0-693.el7.x86_64
```

2、 通过cat /etc/issue 、cat /etc/redhat-release
```
[root@localhost ~]# cat /etc/issue
\S
Kernel \r on an \m

[root@localhost ~]# cat /etc/redhat-release
CentOS Linux release 7.4.1708 (Core)
```

3、 查看64位还是32位
```
[root@localhost ~]# getconf LONG_BIT
64

[root@localhost ~]# file /bin/ls
/bin/ls: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.32, BuildID[sha1]=3d705971a4c4544545cb78fd890d27bf792af6d4, stripped
```

### Linux CentOS 7.X 如何修改内核启动默认顺序

**我们知道，centos 6.x是通过/etc/grub.conf就行内核启动顺序修改的，而且比较直观查看。但centos 7的系统和6就不一样了，是通过grub2为引导程序。下边简单说下centos 7的内核启动顺序如何修改**

1、 查看当前系统有几个内核  
```
[root@localhost ~]# cat /boot/grub2/grub.cfg |grep menuentry
 
if [ x"${feature_menuentry_id}" = xy ]; then
  menuentry_id_option="--id"
  menuentry_id_option=""
export menuentry_id_option
menuentry 'CentOS Linux (3.10.0-327.22.2.el7.x86_64) 7 (Core)' --class centos --class gnu-linux --class gnu --class os --unrestricted $menuentry_id_option 'gnulinux-3.10.0-327.el7.x86_64-advanced-80b9b662-0a1d-4e84-b07b-c1bf19e72d97' {
menuentry 'CentOS Linux (3.10.0-327.el7.x86_64) 7 (Core)' --class centos --class gnu-linux --class gnu --class os --unrestricted $menuentry_id_option 'gnulinux-3.10.0-327.el7.x86_64-advanced-80b9b662-0a1d-4e84-b07b-c1bf19e72d97' {
menuentry 'CentOS Linux (0-rescue-7d26c16f128042a684ea474c9e2c240f) 7 (Core)' --class centos --class gnu-linux --class gnu --class os --unrestricted $menuentry_id_option 'gnulinux-0-rescue-7d26c16f128042a684ea474c9e2c240f-advanced-80b9b662-0a1d-4e84-b07b-c1bf19e72d97' {
```

2、 设置默认的启动内核。比如我们选择上边中的CentOS Linux (3.10.0-327.el7.x86_64) 7 (Core)这个内核为默认启动
```
[root@localhost ~]# grub2-set-default "CentOS Linux (3.10.0-327.el7.x86_64) 7 (Core)" 配置默认内核
```
验证是否修改成功：
```
[root@localhost ~]# grub2-editenv list 
saved_entry=CentOS Linux (3.10.0-327.el7.x86_64) 7 (Core)
```

3、 重启机器观察。  
**重启成功以后查看下机器的内核是不是该内核：**
```
[root@localhost ~]# uname -r
3.10.0-327.el7.x86_64
```

解压RPM软件包内的文件  
```
rpm2cpio mysql-community-common-5.6.28-2.el7.x86_64.rpm | cpio -idmv
```
列出RPM软件包内的文件信息  
```
rpm -qpl xxx.rpm
```  
列出RPM软件包中的描述信息  
```
[root@localhost opt]# rpm -qpi jdk-8u192-linux-x64.rpm 
警告：jdk-8u192-linux-x64.rpm: 头V3 RSA/SHA256 Signature, 密钥 ID ec551f03: NOKEY
Name        : jdk1.8
Epoch       : 2000
Version     : 1.8.0_192
Release     : fcs
Architecture: x86_64
Install Date: (not installed)
Group       : Development/Tools
Size        : 301888941
License     : http://java.com/license
Signature   : RSA/SHA256, 2018年10月06日 星期六 22时29分15秒, Key ID 72f97b74ec551f03
Source RPM  : jdk1.8-1.8.0_192-fcs.src.rpm
Build Date  : 2018年10月06日 星期六 22时01分19秒
Build Host  : sc11137389.us.oracle.com
Relocations : /usr/java 
Packager    : Java Software <jre-comments@java.sun.com>
Vendor      : Oracle Corporation
URL         : http://www.oracle.com/technetwork/java/javase/overview/index.html
Summary     : Java Platform Standard Edition Development Kit
Description :
The Java Platform Standard Edition Development Kit (JDK) includes both
the runtime environment (Java virtual machine, the Java platform classes
and supporting files) and development tools (compilers, debuggers,
tool libraries and other tools).

The JDK is a development environment for building applications, applets
and components that can be deployed with the Java Platform Standard
Edition Runtime Environment.
```

4. 查看yum安装的软件被安装到了哪个目录  
1). 先查出其对应的rpm包名
```
[root@localhost SwanCMP]# rpm -qa | grep mysql
mysql-community-libs-5.7.20-1.el7.x86_64
mysql-community-common-5.7.20-1.el7.x86_64
mysql-community-client-5.7.20-1.el7.x86_64
mysql-community-server-5.7.20-1.el7.x86_64

```
2). 然后执行
```
[root@localhost SwanCMP]# rpm -ql mysql-community-common-5.7.20-1.el7.x86_64 mysql-community-libs-5.7.20-1.el7.x86_64 mysql-community-client-5.7.20-1.el7.x86_64 mysql-community-server-5.7.20-1.el7.x86_64
/usr/share/doc/mysql-community-common-5.7.20
/usr/share/doc/mysql-community-common-5.7.20/COPYING
/usr/share/doc/mysql-community-common-5.7.20/README
/usr/share/mysql/bulgarian
/usr/share/mysql/bulgarian/errmsg.sys
...
/var/run/mysqld
```
3). 查看 rpm包依赖性 `rpm -qpR xxx.rpm`   
```
[root@localhost mysql]# rpm -qpR mysql-community-server-5.7.20-1.el7.x86_64.rpm 
警告：mysql-community-server-5.7.20-1.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
...
config(mysql-community-server) = 5.7.20-1.el7
coreutils
grep
ld-linux-x86-64.so.2()(64bit)
ld-linux-x86-64.so.2(GLIBC_2.3)(64bit)
libaio.so.1()(64bit)
libaio.so.1(LIBAIO_0.1)(64bit)
libaio.so.1(LIBAIO_0.4)(64bit)
libc.so.6()(64bit)
libc.so.6(GLIBC_2.10)(64bit)
...
rpmlib(PayloadIsXz) <= 5.2-1
```