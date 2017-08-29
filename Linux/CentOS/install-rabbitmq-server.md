# Install RabbitMQ-Server

## 1. Installation using repository

### Adding repository entry （添加源）
To add Erlang Solutions repository (including our public key for verifying signed package) to your system, call the following commands:
```sh
wget https://packages.erlang-solutions.com/erlang-solutions-1.0-1.noarch.rpm
rpm -Uvh erlang-solutions-1.0-1.noarch.rpm
```
### Alternatively: adding the repository entry manually（或者添加常规源）
RPM packages are signed. To add Erlang Solutions key, execute command:
```sh
rpm --import https://packages.erlang-solutions.com/rpm/erlang_solutions.asc
```
Add the following lines to some file in /etc/yum.repos.d/:
```sh
[erlang-solutions]
name=Centos $releasever - $basearch - Erlang Solutions
baseurl=https://packages.erlang-solutions.com/rpm/centos/$releasever/$basearch
gpgcheck=1
gpgkey=https://packages.erlang-solutions.com/rpm/erlang_solutions.asc
enabled=1
```
Note that RPM Forge and EPEL must be also added to repos.

## 2. Installing Erlang
Call the following command to install the erlang package:
```sh
sudo yum install erlang
```
or this command to install the esl-erlang package:
```sh
sudo yum install esl-erlang
```

## 3. 从EPEL源安装(这种方式安装的Erlang版本可能不是最新的，有时候不能满足RabbitMQ需要的最低版本)
```sh
# 启动EPEL源
sudo yum install epel-release 
# 安装erlang
sudo yum install erlang
 ```
 
 ## 4. 安装RabbitMQ
 ```sh
 sudo rpm --import https://www.rabbitmq.com/rabbitmq-release-signing-key.asc
 ### 下载RabbitMQ安装包
wget https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.6/rabbitmq-server-3.6.6-1.el7.noarch.rpm  
sudo yum install rabbitmq-server-3.6.6-1.el7.noarch.rpm
 ```
 ### 安装时如果遇到下面的依赖错误
 ```sh
 Error: Package: socat-1.7.2.3-1.el6.x86_64 (epel)
       Requires: libreadline.so.5()(64bit)
```
可以尝试先执行
```sh
sudo yum install socat
```

### 关于RabbitMQ的一些基本操作
```sh
sudo chkconfig rabbitmq-server on  # 添加开机启动RabbitMQ服务
sudo systemctl enable rabbitmq-server.service

sudo /sbin/service rabbitmq-server start # 启动服务
sudo /sbin/service rabbitmq-server status  # 查看服务状态
sudo /sbin/service rabbitmq-server stop   # 停止服务

# 查看当前所有用户
sudo rabbitmqctl list_users

# 查看默认guest用户的权限
sudo rabbitmqctl list_user_permissions guest

# 由于RabbitMQ默认的账号用户名和密码都是guest。为了安全起见, 先删掉默认用户
sudo rabbitmqctl delete_user guest

# 添加新用户
sudo rabbitmqctl add_user username password

# 设置用户tag
sudo rabbitmqctl set_user_tags username administrator

# 赋予用户默认vhost的全部操作权限
sudo rabbitmqctl set_permissions -p / username ".*" ".*" ".*"

# 查看用户的权限
sudo rabbitmqctl list_user_permissions username
```
### 开启web管理接口
如果只从命令行操作RabbitMQ，多少有点不方便。幸好RabbitMQ自带了web管理界面，只需要启动插件便可以使用。
```sh
sudo rabbitmq-plugins enable rabbitmq_management
```
然后通过浏览器访问
```sh
http://localhost:15672
```
输入用户名和密码访问web管理界面了

