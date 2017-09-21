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
### 新安装的MySQL5.7，登录时提示密码错误
```sh
[root@reghb /]# mysql -uroot -p
Enter password: 
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)
[root@reghb /]# systemctl restart mysqld.service 
[root@reghb /]# mysql -uroot -p
Enter password: 
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
```

1、解决登录问题：
```sh
vim /etc/my.cnf

#加入
[mysqld]
skip-grant-tables
```
重启mysql：systemctl restart mysqld.service 
登录： mysql -uroot -p \ 不用输入密码，直接回车即可进入

2、重置root用户密码
 输入update mysql.user  set password=password('root') where user='root'时提示ERROR 1054 (42S22): Unknown column 'password' in 'field list'
 原来是mysql数据库下已经没有password这个字段了，password字段改成了"authentication_string"
 ```sh
mysql> update user set authentication_string=password('mysql') where user='root';
Query OK, 1 row affected, 1 warning (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 1

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> exit
Bye
[root@reghb /]# mysql -uroot -pmysql
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.19

Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
mysql>
 
 ```
 3、 mysql5.7数据库密码问题
 
 
 
 
 参考资料：
 http://blog.csdn.net/lgstudyvc/article/details/74999836
 http://blog.csdn.net/u010603691/article/details/50541979
 https://dev.mysql.com/doc/refman/5.7/en/grant.html
 
