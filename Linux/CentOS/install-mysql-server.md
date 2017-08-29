## Install mysql-server

### Add Repo (http://repo.mysql.com/)
安装mysql-community-release-el7-7.noarch.rpm包
```sh
rpm -ivh http://repo.mysql.com/mysql57-community-release-el7-7.noarch.rpm
```
安装这个包后，会获得两个mysql的yum repo源：
>* /etc/yum.repos.d/mysql-community.repo
>* /etc/yum.repos.d/mysql-community-source.repo

### Install mysql-server
安装mysql
```sh
yum install mysql-server -y
```

### Restart mysql
```sh
systemctl restart mysqld.service
```

### login mysql
```sh
mysql -uroot -p \
\
mysql > use mysql;
mysql > update user set password=password(‘123456‘) where user=‘root‘;
mysql > grant all on *.* to root@"%" Identified by "123456";
mysql > flush privileges;
mysql > exit;
```

### 开放3306端口

vim /etc/sysconfig/iptables
```sh
-A INPUT -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT
```

### 保存后重启防火墙
```sh
systemctl restart iptables.service
```

