## Install mysql-server

### Add Repo (http://repo.mysql.com/)
安装mysql-community-release-el7-7.noarch.rpm包
```sh
rpm -ivh http://repo.mysql.com/yum/mysql-5.7-community/el/7/x86_64/mysql57-community-release-el7-10.noarch.rpm
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
或
rpm -ivh http://repo.mysql.com/mysql57-community-release-el7-7.noarch.rpm
```
安装这个包后，会获得两个mysql的yum repo源：
>* /etc/yum.repos.d/mysql-community.repo
>* /etc/yum.repos.d/mysql-community-source.repo

### Install mysql-server
安装mysql
```sh
yum install -y mysql-community-server
或
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
mysql > update user set password=password('123456') where user='root';
mysql > GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY '123456';
mysql > FLUSH PRIVILEGES;
mysql > exit;
```

vim /etc/my.cnf
```
[client]
default-character-set=utf8

[mysqld]
character-set-server=utf8
validate_password=off        # 关闭密码严格校验
max_connections=32000
max_allowed_packet=1024M
wait_timeout=31536000
interactive_timeout=31536000
default-time_zone='+8:00'
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

```
[root@localhost ~]# cat /var/log/mysqld.log | grep 'password'
2021-09-03T05:05:42.984841Z 1 [Note] A temporary password is generated for root@localhost: UrAfoPwd#3ib
[root@localhost ~]# mysql -uroot -p'UrAfoPwd#3ib'
mysql> 
mysql> ALTERr USER USER() IDENTIFIED BY 'newpassword';
Query OK, 0 rows affected (0.00 sec)
mysql > GRANT ALL ON *.* TO root@'%' IDENTIFIED BY "123456";        # 设置root用户远程权限及登录密码
mysql > FLUSH PRIVILEGES;
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

