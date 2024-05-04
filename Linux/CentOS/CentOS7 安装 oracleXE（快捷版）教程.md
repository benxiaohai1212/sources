## CentOS7 安装 oracleXE（快捷版）教程

* 下载安装包  
    [下载地址](http://www.oracle.com/technetwork/cn/database/database-technologies/express-edition/downloads/index.html)

* 安装依赖  
    `yum install libaio libaio-devel bc -y`

* 解压安装包  
    `unzip oracle-xe-11.2.0-1.0.x86_64.rpm.zip`      
    *解压之后得到 Disk1 文件夹*  
    *若提示未找到命令则需要安装 unzip 命令 `yum install -y unzip zip`*  

* 分配空间（否则安装会失败）  
    依次执行如下命令即可：  
```
su - root
dd if=/dev/zero of=/swapfile bs=1024 count=1048576
mkswap /swapfile
swapon /swapfile
cp /etc/fstab /etc/fstab.backup_$(date +%N)
echo '/swapfile swap swap defaults 0 0' /etc/fstab
chown root:root /swapfile
chmod 0600 /swapfile
swapon -a
swapon -s
```
    
* 安装  
    `cd Disk1/`  
    `rpm -ivh oracle-xe-11.2.0-1.0.x86_64.rpm`  
![rpm -ivh oracle-xe-11.2.0-1.0.x86_64.rpm](https://images.gitee.com/uploads/images/2018/0710/133748_d880d007_132614.png "20180710-002.png")
    `/etc/init.d/oracle-xe configure`
![/etc/init.d/oracle-xe configure](https://images.gitee.com/uploads/images/2018/0710/134050_ded67f26_132614.png "20180710-003.png")
    
* 配置环境变量  
    `vim /etc/profile`  
    加入：  
```
# Oracle Settings
TMP=/tmp; export TMP
TMPDIR=$TMP; export TMPDIR
ORACLE_BASE=/u01/app/oracle; export ORACLE_BASE
ORACLE_HOME=$ORACLE_BASE/product/11.2.0/xe; export ORACLE_HOME
ORACLE_SID=XE; export ORACLE_SID
ORACLE_TERM=xterm; export ORACLE_TERM
PATH=/usr/sbin:$PATH; export PATH
PATH=$ORACLE_HOME/bin:$PATH; export PATH
TNS_ADMIN=$ORACLE_HOME/network/admin
LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib; export LD_LIBRARY_PATH
CLASSPATH=$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib; export CLASSPATH
if [ $USER = "oracle" ]; then
  if [ $SHELL = "/bin/ksh" ]; then
    ulimit -p 16384
    ulimit -n 65536
  else
    ulimit -u 16384 -n 65536
  fi
fi
```
修改完后使用命令 # `source /etc/profile` 重新加载改文件。   
输入 echo $ORACLE_BASE修改是否成功。

* 切换到oracle用户 使用sqlplus链接数据库  
    `su - oracle`   
    `sqlplus /nolog`   
    进入sqlplus控制台   
    SQL> connect as sysdba   
    提示输入用户名 密码： 使用sys/password登录  

    测试：select sysdate from dual  
    ![输入图片说明](https://images.gitee.com/uploads/images/2018/0710/135722_5dd0557c_132614.png "20180710-004.png")

    查看当前数据库的service_name和SID  
    `show parameter service_names`  //查看当前数据库service_name  
    `show parameter instance_name`  //查看当前SID
