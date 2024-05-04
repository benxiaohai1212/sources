### 查看磁盘的UUID`blkid /dev/sdb1`
```
$ blkid /dev/sdb1
/dev/sdb1: UUID="eeede4e5-8277-49fe-8f41-a6d90c1581e1" TYPE="ext4" PARTUUID="000ea80a-01"
$ 
```

### 安深度Deepin桌面DDE

安装稳定DDE
```
sudo add-apt-repository ppa:ubuntudde-dev/stable
sudo apt update
sudo apt install ubuntudde-dde
```

### Microsoft字体：ttf-mscorefonts-installer
### virtualBox install ubuntu add 增强工具
```
sudo apt install virtualbox-guest-utils virtualbox-guest-dkms linux-headers-virtual
```

### apt与apt-get的用法：  
apt是新的命令，有一些操作不支持，apt-get是老命令，可以支持更多的操作

|apt 命令| 取代命令                 | 命令功能            |
|------------------|----------------------|-----------------|
| apt install      | apt-get install      | 安装软件包           |
| apt remove       | apt-get remove       | 移除软件包           |
| apt purge        | apt-get purge        | 移除软件及配置文件       |
| apt update       | apt-get update       | 刷新存储库索引         |
| apt upgrade      | apt-get upgrade      | 升级（所有）软件包       |
| apt autoremove   | apt-get autoremove   | 自动删除不需要的软件      |
| apt full-upgrade | apt-get dist-upgrade | 在升级软件包时自动处理依赖关系 |
| apt search       | apt-cache search     | 搜索应用程序          |
| apt show         | apt-cache show       | 显示软件包细节         |

当然，apt 还有一些自己的命令：
|新的apt命令|	命令的功能|
|--|--|
|apt list|	列出包含条件的包（已安装，可升级等）|
|apt edit-sources|	编辑源列表|

### dpkg 用法详情
|命令|命令功能|
|-- |-- |
|dpkg -i <.deb file name>|安装软件|
|dpkg -R|安装一个目录下面所有的软件包 dpkg -R /usr/local/src|
|dpkg –unpack package_file |释放软件包，但是不进行配置，如果和-R一起使用，参数可以是一个目录 dpkg –unpack package.deb|
|dpkg –configure package_file|重新配置和释放软件包，如果和-a一起使用，将配置所有没有配置的软件包 dpkg –configure package.deb|
|dpkg -r|删除软件包（保留其配置信息）dpkg -r package|
|dpkg –update-avail <Packages-file>|替代软件包的信息|
|dpkg –merge-avail <Packages-file>|合并软件包信息|
|dpkg -A package_file|从软件包里面读取软件的信息|
|dpkg -P|删除一个包（包括配置信息）|
|dpkg –forget-old-unavail|丢失所有的Uninstall的软件包信息|
|dpkg –clear-avail|删除软件包的Avaliable信息|
|dpkg -C|查找只有部分安装的软件包信息|
|dpkg –compare-versions ver1 op ver2|比较同一个包的不同版本之间的差别|
|dpkg –help|显示帮助信息|
|dpkg –licence (or) dpkg –license|显示dpkg的Licence|
|dpkg –versio|显示dpkg的版本号|
|dpkg -b direc×y [filename]|建立一个deb文件|
|dpkg -c filename|显示一个Deb文件的目录|
|dpkg -I filename [control-file]|显示一个Deb的说明|
|dpkg -l package-name-pattern|搜索Deb包 dpkg -I vim|
|dpkg -l|显示所有已经安装的Deb包，同时显示版本号以及简短说明|
|dpkg -s package-name|报告指定包的状态信息 dpkg -s ssh|
|dpkg -L package-Name|显示一个包安装到系统里面的文件目录信息 dpkg -L apache2|
|dpkg -S filename-search-pattern|搜索指定包里面的文件（模糊查询）|
|dpkg -p package-name|显示包的具体信息 dpkg -p cacti|


### Ubuntu查询指定软件包的依赖：
```
sudo apt-cache depends packagename
```

### Ubuntu查询软件包反向依赖：
```
sudo apt-cache rdepends packagename
```

### Ubuntu查询指定文件属于哪个软件包：
```
sudo apt-get install apt-file
sudo apt-file update
sudo apt-file search filename
```

### Ubuntu显示指定软件包的基本信息：
```
sudo apt-cache show packagename
```

### Ubuntu networking restart | cannot find device
```
dmesg | grep eth
```
发现eth0被重命名为ens160
```
[    1.351202] vmxnet3 0000:03:00.0 eth0: NIC Link is Up 10000 Mbps
[    1.387973] vmxnet3 0000:03:00.0 ens160: renamed from eth0
```
### 配置静态ip
```
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface 静态IP，ens160为网卡（eth0）
auto ens160
iface ens160 inet static
address 10.10.35.252
netmask 255.255.255.0
gateway 10.10.35.254
dns-nameservers 8.8.8.8
```

### 删除软件  
方法一、如果你知道要删除软件的具体名称，可以使用  
```
sudo apt-get remove --purge 软件名称  
sudo apt-get autoremove --purge 软件名称 
```
方法二、如果不知道要删除软件的具体名称，可以使用  
```
dpkg --get-selections | grep '软件相关名称'
sudo apt-get purge 一个带core的package，如果没有带core的package，则是情况而定。
```
### 清理残留数据
```
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P 
```

### 修改用户名  
 > 1）、修改sudoer文件 `vim /etc/sudoers`  
 > 2）、修改shadow 文件 `vim /etc/shadow`  
 > 3）、修改开始目录 /home/user `cd home\ mv user newuser`  
 > 4）、修改passwd 文件  `vim /etc/passwd`    

ssh 用root登录ubuntu
 > 1)、安装openssh-server `sudo apt-get install openssh-server -y`  
 > 2)、编辑ssh配置文件：`sudo vim /etc/ssh/sshd_config`  
      将PermitRootLogin no一行，改为PermitRootLogin yes  
 > 3)、重启openssh-server `service ssh restart`  

### 软件列表：  
 > 编辑矢量图： `inkscape`  
 > 截图：`shutter`  
 > 吸色器： `gcolor2`  
 > 数据库客户端：`DBeaver`  
 > 远程桌面：`Remmina`  