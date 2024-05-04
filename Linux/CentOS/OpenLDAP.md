## CentOS7 安装配置OpenLDAP

### 1. 更新CentOS源
```
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org|baseurl=https://mirrors.tuna.tsinghua.edu.cn|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo

sudo yum makecache
sudo yum update -y
```

### 2. 安装
```
yum -y install openldap compat-openldap openldap-clients openldap-servers openldap-servers-sql openldap-devel migrationtools
```
过程如下：
```
[root@localhost ~]# yum -y install openldap compat-openldap openldap-clients openldap-servers openldap-servers-sql openldap-devel migrationtools
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
Package openldap-2.4.44-25.el7_9.x86_64 already installed and latest version
Resolving Dependencies
--> Running transaction check
---> Package compat-openldap.x86_64 1:2.3.43-5.el7 will be installed
---> Package migrationtools.noarch 0:47-15.el7 will be installed
---> Package openldap-clients.x86_64 0:2.4.44-25.el7_9 will be installed
---> Package openldap-devel.x86_64 0:2.4.44-25.el7_9 will be installed
--> Processing Dependency: cyrus-sasl-devel(x86-64) for package: openldap-devel-2.4.44-25.el7_9.x86_64
---> Package openldap-servers.x86_64 0:2.4.44-25.el7_9 will be installed
---> Package openldap-servers-sql.x86_64 0:2.4.44-25.el7_9 will be installed
--> Processing Dependency: libodbc.so.2()(64bit) for package: openldap-servers-sql-2.4.44-25.el7_9.x86_64
--> Running transaction check
---> Package cyrus-sasl-devel.x86_64 0:2.1.26-24.el7_9 will be installed
--> Processing Dependency: cyrus-sasl(x86-64) = 2.1.26-24.el7_9 for package: cyrus-sasl-devel-2.1.26-24.el7_9.x86_64
---> Package unixODBC.x86_64 0:2.3.1-14.el7 will be installed
--> Running transaction check
---> Package cyrus-sasl.x86_64 0:2.1.26-24.el7_9 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

===================================================================================================================
 Package                            Arch                 Version                       Repository             Size
===================================================================================================================
Installing:
 compat-openldap                    x86_64               1:2.3.43-5.el7                base                  174 k
 migrationtools                     noarch               47-15.el7                     base                   26 k
 openldap-clients                   x86_64               2.4.44-25.el7_9               updates               191 k
 openldap-devel                     x86_64               2.4.44-25.el7_9               updates               805 k
 openldap-servers                   x86_64               2.4.44-25.el7_9               updates               2.2 M
 openldap-servers-sql               x86_64               2.4.44-25.el7_9               updates               151 k
Installing for dependencies:
 cyrus-sasl                         x86_64               2.1.26-24.el7_9               updates                88 k
 cyrus-sasl-devel                   x86_64               2.1.26-24.el7_9               updates               310 k
 unixODBC                           x86_64               2.3.1-14.el7                  base                  413 k

Transaction Summary
===================================================================================================================
Install  6 Packages (+3 Dependent packages)

Total download size: 4.3 M
Installed size: 13 M
Downloading packages:
(1/9): migrationtools-47-15.el7.noarch.rpm                                                  |  26 kB  00:00:00     
(2/9): cyrus-sasl-2.1.26-24.el7_9.x86_64.rpm                                                |  88 kB  00:00:00     
(3/9): openldap-clients-2.4.44-25.el7_9.x86_64.rpm                                          | 191 kB  00:00:00     
(4/9): compat-openldap-2.3.43-5.el7.x86_64.rpm                                              | 174 kB  00:00:00     
(5/9): openldap-devel-2.4.44-25.el7_9.x86_64.rpm                                            | 805 kB  00:00:00     
(6/9): cyrus-sasl-devel-2.1.26-24.el7_9.x86_64.rpm                                          | 310 kB  00:00:01     
(7/9): openldap-servers-sql-2.4.44-25.el7_9.x86_64.rpm                                      | 151 kB  00:00:00     
(8/9): openldap-servers-2.4.44-25.el7_9.x86_64.rpm                                          | 2.2 MB  00:00:00     
(9/9): unixODBC-2.3.1-14.el7.x86_64.rpm                                                     | 413 kB  00:00:00     
-------------------------------------------------------------------------------------------------------------------
Total                                                                              1.8 MB/s | 4.3 MB  00:00:02     
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : openldap-servers-2.4.44-25.el7_9.x86_64                                                         1/9 
  Installing : cyrus-sasl-2.1.26-24.el7_9.x86_64                                                               2/9 
  Installing : cyrus-sasl-devel-2.1.26-24.el7_9.x86_64                                                         3/9 
  Installing : unixODBC-2.3.1-14.el7.x86_64                                                                    4/9 
  Installing : openldap-servers-sql-2.4.44-25.el7_9.x86_64                                                     5/9 
  Installing : openldap-devel-2.4.44-25.el7_9.x86_64                                                           6/9 
  Installing : migrationtools-47-15.el7.noarch                                                                 7/9 
  Installing : openldap-clients-2.4.44-25.el7_9.x86_64                                                         8/9 
  Installing : 1:compat-openldap-2.3.43-5.el7.x86_64                                                           9/9 
  Verifying  : openldap-servers-sql-2.4.44-25.el7_9.x86_64                                                     1/9 
  Verifying  : openldap-devel-2.4.44-25.el7_9.x86_64                                                           2/9 
  Verifying  : 1:compat-openldap-2.3.43-5.el7.x86_64                                                           3/9 
  Verifying  : unixODBC-2.3.1-14.el7.x86_64                                                                    4/9 
  Verifying  : migrationtools-47-15.el7.noarch                                                                 5/9 
  Verifying  : openldap-clients-2.4.44-25.el7_9.x86_64                                                         6/9 
  Verifying  : cyrus-sasl-devel-2.1.26-24.el7_9.x86_64                                                         7/9 
  Verifying  : cyrus-sasl-2.1.26-24.el7_9.x86_64                                                               8/9 
  Verifying  : openldap-servers-2.4.44-25.el7_9.x86_64                                                         9/9 

Installed:
  compat-openldap.x86_64 1:2.3.43-5.el7                  migrationtools.noarch 0:47-15.el7                         
  openldap-clients.x86_64 0:2.4.44-25.el7_9              openldap-devel.x86_64 0:2.4.44-25.el7_9                   
  openldap-servers.x86_64 0:2.4.44-25.el7_9              openldap-servers-sql.x86_64 0:2.4.44-25.el7_9             

Dependency Installed:
  cyrus-sasl.x86_64 0:2.1.26-24.el7_9  cyrus-sasl-devel.x86_64 0:2.1.26-24.el7_9  unixODBC.x86_64 0:2.3.1-14.el7 

Complete!
```
#### 2.1 查看OpenLDAP版本
```
slapd -VV
```
过程结果如下：
```
[root@localhost ~]# slapd -VV
@(#) $OpenLDAP: slapd 2.4.44 (Feb 23 2022 17:11:27) $
	mockbuild@x86-01.bsys.centos.org:/builddir/build/BUILD/openldap-2.4.44/openldap-2.4.44/servers/slapd
```

### 3. 配置openLDAP

注意:从OpenLDAP2.4.23版本开始所有配置数据都保存在/etc/openldap/slapd.d/中，建议不再使用slapd.conf作为配置文件

#### 3.1 设置OpenLDAP的管理员密码
```
slappasswd -s xxxxx
```

#### 3.2 修改hdb.ldif文件
```
[root@localhost ~]# slappasswd -s xxxxx
{SSHA}C8XPjuCgFKjf59CIpKZb51UHq31l/GR/
[root@localhost ~]# ls -l /etc/openldap/slapd.d/cn\=config
total 20
drwxr-x---. 2 ldap ldap  29 May 26 16:49 cn=schema
-rw-------. 1 ldap ldap 378 May 26 16:49 cn=schema.ldif
-rw-------. 1 ldap ldap 513 May 26 16:49 olcDatabase={0}config.ldif
-rw-------. 1 ldap ldap 443 May 26 16:49 olcDatabase={-1}frontend.ldif
-rw-------. 1 ldap ldap 562 May 26 16:49 olcDatabase={1}monitor.ldif
-rw-------. 1 ldap ldap 609 May 26 16:49 olcDatabase={2}hdb.ldif
```
##### 3.2.1 修改olcDatabase={2}hdb.ldif文件

vim /etc/openldap/slapd.d/cn=config/olcDatabase={2}hdb.ldif

修改并增加行olcRootPW：
```
olcSuffix: dc=poke_domain,dc=com
olcRootDN: cn=admin,dc=poke_domain,dc=com
olcRootPW: {SSHA}C8XPjuCgFKjf59CIpKZb51UHq31l/GR/
```
注意：其中cn=admin中的admin表示OpenLDAP管理员的用户名，而olcRootPW表示OpenLDAP管理员的密码

##### 3.2.2 修改olcDatabase={1}monitor.ldif文件

vim /etc/openldap/slapd.d/cn=config/olcDatabase={1}monitor.ldif
```
olcAccess: {0}to * by dn.base=”gidNumber=0+uidNumber=0,cn=peercred,n=extern
al,cn=auth” read by dn.base=”cn=admin,dc=poke_domain,dc=com” read by * none
```
注意：该修改中的dn.base是修改OpenLDAP的管理员的相关信息的

#### 4 验证OpenLDAP的基本配置，使用如下命令：

slaptest -u
```
[root@localhost cn=config]# slaptest -u
628f471e ldif_read_file: checksum error on "/etc/openldap/slapd.d/cn=config/olcDatabase={1}monitor.ldif"
628f471e ldif_read_file: checksum error on "/etc/openldap/slapd.d/cn=config/olcDatabase={2}hdb.ldif"
config file testing succeeded
```

#### 5 启动OpenLDAP服务
```
rm -rf /var/lib/ldap
rm -rf /var/run/openldap
mkdir -p /var/lib/ldap && chown -R ldap.ldap /var/lib/ldap && chmod 700 /var/lib/ldap
mkdir -p /var/run/openldap && chown -R ldap.ldap /var/run/openldap && chmod 755 /var/run/openldap
```
注意：以上4步避免权限问题导致服务启动失败，只在第一次启动时执行,注意CentOS的SELinux，设置临时兼容模式:`setenforce 0`
```
systemctl enable slapd
systemctl start slapd
systemctl status slapd
```

### 4 配置OpenLDAP数据库

#### 4.1 OpenLDAP默认使用的数据库是BerkeleyDB
```
cp /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
chown ldap:ldap -R /var/lib/ldap
chmod 700 -R /var/lib/ldap
ll /var/lib/ldap/
```
```
[root@localhost cn=config]# ll /var/lib/ldap/
total 324
-rwx------. 1 ldap ldap     2048 May 26 18:01 alock
-rwx------. 1 ldap ldap   262144 May 26 18:01 __db.001
-rwx------. 1 ldap ldap    32768 May 26 18:01 __db.002
-rwx------. 1 ldap ldap    49152 May 26 18:01 __db.003
-rwx------. 1 ldap ldap      845 May 26 18:18 DB_CONFIG
-rwx------. 1 ldap ldap     8192 May 26 18:01 dn2id.bdb
-rwx------. 1 ldap ldap    32768 May 26 18:01 id2entry.bdb
-rwx------. 1 ldap ldap 10485760 May 26 18:01 log.0000000001
```
注意：/var/lib/ldap/就是BerkeleyDB数据库默认存储的路径.

#### 4.2 导入基本Schema
```
ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/cosine.ldif
ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/nis.ldif
ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/inetorgperson.ldif
```
```
[root@localhost cn=config]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/cosine.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=cosine,cn=schema,cn=config"

[root@localhost cn=config]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/nis.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=nis,cn=schema,cn=config"

[root@localhost cn=config]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/inetorgperson.ldif
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
adding new entry "cn=inetorgperson,cn=schema,cn=config"
```
#### 4.3 修改migrate_common.ph文件

migrate_common.ph文件主要是用于生成ldif文件使用

vim /usr/share/migrationtools/migrate_common.ph
```
$DEFAULT_MAIL_DOMAIN = "poke_domain.com";
$DEFAULT_BASE = "dc=poke_domain,dc=com";
$EXTENDED_SCHEMA = 1;
```
到此OpenLDAP的配置就已经全部完毕.

### 5 添加用户及用户组
默认情况下OpenLDAP是没有普通用户的，但是有一个管理员用户。管理用户就是前面我们刚刚配置的root。
现在我们把系统中的用户，添加到OpenLDAP中。为了进行区分，我们现在新加两个用户ldapuser1和ldapuser2，和两个用户组ldapgroup1和ldapgroup2，如下：

#### 5.1 添加用户组
```
groupadd ldapgroup1
groupadd ldapgroup2
```

#### 5.2 添加用户并设置密码
```
useradd -g ldapgroup1 ldapuser1
useradd -g ldapgroup2 ldapuser2
echo '123456' | passwd --stdin ldapuser1
echo '123456' | passwd --stdin ldapuser2
```

#### 5.3 把刚刚添加的用户和用户组提取出来，这包括该用户的密码和其他相关属性
```
grep -E “ldap[^:]” /etc/passwd > /root/users
grep -E “ldap[^:]” /etc/group > /root/groups
cat users groups
```

#### 5.4 根据上述生成的用户和用户组属性，使用migrate_passwd.pl文件生成要添加用户和用户组的ldif
```
/usr/share/migrationtools/migrate_passwd.pl /root/users > /root/users.ldif
/usr/share/migrationtools/migrate_group.pl /root/groups > /root/groups.ldif
cat users.ldif
cat groups.ldif
```
注意：后续如果要新加用户到OpenLDAP中的话，我们可以直接修改users.ldif文件即可


