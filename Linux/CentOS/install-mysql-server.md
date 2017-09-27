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
 mysql-5.7.19对密码又要求：
 #### 设置的密码中必须至少包含一个大写字母、一个小写字母、一个特殊符号、一个数字，密码长度至少为8个字符
 解决上面问题：
 ```sh
 mysql> show databases;
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.

# 修改USER密码
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '1234.coM';
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)

mysql> GRANT ALL ON *.* TO 'root'@'%';
ERROR 1133 (42000): Can't find any matching row in the user table

# 赋远程权限
mysql> grant all on *.* to root@"%" Identified by "1234.coM";
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql>
 ```
通过上述操作完成了安装最新版mysql数据库5.7.19,成功修改了数据库root的密码，同时对root用户赋了远程可操作权限；
 
关闭密码策略
```sh
mysql> SHOW VARIABLES LIKE 'validate_password%';
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password_dictionary_file    |        |
| validate_password_length             | 8      |
| validate_password_mixed_case_count   | 1      |
| validate_password_number_count       | 1      |
| validate_password_policy             | MEDIUM |
| validate_password_special_char_count | 1      |
+--------------------------------------+--------+
rows in set (0.02 sec) 

mysql> show plugins;
+----------------------------+----------+--------------------+----------------------+-------------+
| Name                       | Status   | Type               | Library              | License     |
+----------------------------+----------+--------------------+----------------------+-------------+
| binlog                     | ACTIVE   | STORAGE ENGINE     | NULL                 | PROPRIETARY |

...
| validate_password          | ACTIVE   | VALIDATE PASSWORD  | validate_password.so | PROPRIETARY |
+----------------------------+----------+--------------------+----------------------+-------------+
---可以通过在配置文件[mysqld]标签中添加 validate_passwor=off ，来关闭密码策略
如下:
...
| validate_password          | DISABLED | VALIDATE PASSWORD  | validate_password.so | PROPRIETARY |
+----------------------------+----------+--------------------+----------------------+-------------+
1) 安装好mysql后，第一次启动时，root管理密码会在/root/.mysql_secret中随机生成

2) 至5.7后，MySQL的 mysql.user 表中的密码字段由之前的 password 改为 authentication_string

3) 使用--skip-grant-tables 参数启动，跳过MySQL的授权验证，--skip-networking参数，跳过远程登录

4) 修改MySQL密码方式：

法1：update user set authentication_string=password('123abc') where user='root';

法2：set password=password('newpassword');

法3：alter user root@'localhost' identified by 'oracle';

法4：在shell下使用MySQL工具：mysqladmin -uroot -poldpassword pasword "newpassword"

5) 关于MySQL密码策略：

决定是否使用该插件(及强制/永久强制使用)
--validate-password=ON/OFF/FORCE/FORCE_PLUS_PERMANENT
 
validate_password_dictionary_file           > 插件用于验证密码强度的字典文件路径。
validate_password_length                        > 密码最小长度。
validate_password_mixed_case_count     > 密码至少要包含的小写字母个数和大写字母个数。
validate_password_number_count　　　　> 密码至少要包含的数字个数。
validate_password_policy                         > 密码强度检查等级，0/LOW、1/MEDIUM、2/STRONG。
validate_password_special_char_count    > 密码至少要包含的特殊字符数。
 
其中关于validate_password_policy-密码强度检查等级：
0/LOW　　　　> 只检查长度。
1/MEDIUM      > 检查长度、数字、大小写、特殊字符。
2/STRONG      > 检查长度、数字、大小写、特殊字符字典文件。
后记

经过一段时间后，发现mysql初始密码原来被记录到了日志文件中

复制代码
查找日志位置
[root@test /var/lib/mysql]# ps -ef | grep mysql
root      5604     1  0 22:40 pts/1    00:00:00 /bin/sh /usr/bin/mysqld_safe --datadir=/var/lib/mysql --socket=/var/lib/mysql/mysql.sock --pid-file=/var/run/mysqld/mysqld.pid --basedir=/usr --user=mysql
mysql     5802  5604  5 22:40 pts/1    00:00:00 /usr/sbin/mysqld --basedir=/usr --datadir=/var/lib/mysql --plugin-dir=/usr/lib64/mysql/plugin --user=mysql --log-error=/var/log/mysqld.log --pid-file=/var/run/mysqld/mysqld.pid --socket=/var/lib/mysql/mysql.sock
root      5837  2880  0 22:40 pts/1    00:00:00 grep --color mysql

藏在日志文件中的临时密码
[root@test /var/lib/mysql]# grep "A temporary password"  /var/log/mysqld.log 
2016-05-17T16:46:53.059632Z 1 [Note] A temporary password is generated for root@localhost: +wGVA#to(4tu
```
 
 参考资料：
 > http://www.cnblogs.com/jonsea/p/5510219.html
 
 > http://blog.csdn.net/lgstudyvc/article/details/74999836
 
 > http://blog.csdn.net/u010603691/article/details/50541979
 
 > https://dev.mysql.com/doc/refman/5.7/en/grant.html
 
