# CentOS 7 ldap 安装

LDAP是轻量目录访问协议(Lightweight Directory Access Protocol)的缩写

LDAP协议的特点：
* 读取速度远高于写入速度。
* 不支持事务、不能进行回滚，需要进行这些操作的应用只有选择关系数据库。
* 采用服务器/客户端模式，支持分布式结构。
* 条目以树形结构组织和存储。
* 使用可靠的TCP/IP传输协议

1. 安装
```
yum -y install openldap openldap-servers openldap-clients openldap-devel  

#可以通过rpm -ql <package name>,来查看每个安装包都有哪些文件
openldap： #OpenLDAP配置文件、库和文档
openldap-servers： #slapd 和 slurpd 服务器、迁移脚本和相关文件
openldap-clients： #客户端，用来访问和修改 OpenLDAP 目录
openldap-devel：   #开发包相关
compat-openldap：  #与主从配置相关
```

2. 修改配置文件
> 从OpenLDAP2.4.23版本开始所有配置数据都保存在slapd.d目录中，不再使用slapd.conf作为配置文件。可先编辑slapd.conf，然后使用下列命令在slapd.d目录中生成新的配置。  
> slaptest -f /etc/openldap/slapd.conf -F /etc/openldap/slapd.d/  

复制配置模板  
> cp /home/hanli/slapd.conf.obsolete /etc/openldap/slapd.conf  
> cp /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG  

源码中slapd.conf配置如下：  
```conf
#
# See slapd.conf(5) for details on configuration options.
# This file should NOT be world readable.
#
include		%SYSCONFDIR%/schema/core.schema # schema/core.schema

# Define global ACLs to disable default read access.

# Do not enable referrals until AFTER you have a working directory
# service AND an understanding of referrals.
#referral	ldap://root.openldap.org

pidfile		%LOCALSTATEDIR%/run/slapd.pid  # /run/openldap/slapd.pid
argsfile	%LOCALSTATEDIR%/run/slapd.args # /run/openladp/slapd.args

# Load dynamic backend modules:
# modulepath	%MODULEDIR%
# moduleload	back_mdb.la
# moduleload	back_ldap.la

# Sample security restrictions
#	Require integrity protection (prevent hijacking)
#	Require 112-bit (3DES or better) encryption for updates
#	Require 63-bit encryption for simple bind
# security ssf=1 update_ssf=112 simple_bind=64

# Sample access control policy:
#	Root DSE: allow anyone to read it
#	Subschema (sub)entry DSE: allow anyone to read it
#	Other DSEs:
#		Allow self write access
#		Allow authenticated users read access
#		Allow anonymous users to authenticate
#	Directives needed to implement policy:
# access to dn.base="" by * read
# access to dn.base="cn=Subschema" by * read
# access to *
#	by self write
#	by users read
#	by anonymous auth
#
# if no access controls are present, the default policy
# allows anyone and everyone to read anything but restricts
# updates to rootdn.  (e.g., "access to * by * read")
#
# rootdn can always read and write EVERYTHING!

#######################################################################
# MDB database definitions
#######################################################################

database	mdb
# maxsize		1073741824
suffix		"dc=my-domain,dc=com"
rootdn		"cn=Manager,dc=my-domain,dc=com"
# Cleartext passwords, especially for the rootdn, should
# be avoid.  See slappasswd(8) and slapd.conf(5) for details.
# Use of strong authentication encouraged.
rootpw		secret
# The database directory MUST exist prior to running slapd AND 
# should only be accessible by the slapd and slap tools.
# Mode 700 recommended.
directory	%LOCALSTATEDIR%/openldap-data # /var/lib/ldap/
# Indices to maintain
index	objectClass	eq
```

3. 修改var/lib/ldap/权限，并启动slapd  
> chown -R ldap:ldap /var/lib/ldap/  
> systemctl start slapd.service  
> systemctl enable slapd.service  
> netstat -tunlp |grep slapd  

4. 设置ldap管理员密码
> slappasswd -s 123456  
{SSHA}kslxpeMHz2yC9VEeAAiz1offyYnpQUqu

5. 修改配置文件`slapd.conf`
```
database monitor
access to *
        by dn.exact="gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth" read
        by dn.exact="cn=admin,dc=tencent,dc=com" read       #这里修改
        by * none

#######################################################################
# database definitions
#######################################################################

database        bdb
suffix          "dc=tencent,dc=com"            #这里修改
checkpoint      1024 15
rootdn          "cn=admin,dc=tencent,dc=com"    #这里修改
# Cleartext passwords, especially for the rootdn, should
# be avoided.  See slappasswd(8) and slapd.conf(5) for details.
# Use of strong authentication encouraged.
# rootpw                secret
# rootpw                {crypt}ijFYNcSNctBYg
rootpw                  {SSHA}kslxpeMHz2yC9VEeAAiz1offyYnpQUqu   #这里添加
```

6. 验证并生成真正的配置文件  
# 验证  
> slaptest -f /etc/openldap/slapd.conf  
config file testing succeeded
# 生成  
> rm -rf /etc/openldap/slapd.d/*  
> slaptest -f /etc/openldap/slapd.conf -F /etc/openldap/slapd.d/  
config file testing succeeded
##查看是否正确  
> /etc/openldap$ cat /etc/openldap/slapd.d/cn\=config/olcDatabase\=\{2\}bdb.ldif  

8. 重启ldap  
> chown -R ldap.ldap /etc/openldap/slapd.d/  
> systemctl restart slapd.service  

## 安装phpldapadmin  
1. 安装  
> curl -O http://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm  
> yum install -y epel-release-7-11.noarch.rpm  
> yum install -y phpldapadmin  

2. 设置ldapadmin访问权限  
> vim /etc/httpd/conf.d/phpldapadmin.conf  
```
# Apache 2.4        #如果你的apache版本是2.4以上
Require local
Require ip 192.168.255.0/24         #在这里添加允许访问的IP
```

3. 设置ldap登录方式  
> vim /etc/phpldapadmin/config.php  
```
$servers->setValue('login','attr','dn');   #取消注释
//$servers->setValue('login','attr','uid');     #这一行注释掉
```

4. 重启httpd服务 `systemctl restart httpd.service`

登录  
![输入图片说明](https://gitee.com/uploads/images/2018/0518/183156_eca0602a_132614.png "20180329121121515.png")  
登录如果报403,可以:cp -r /usr/share/phpldapadmin/* /var/www/html/


[来源链接](https://blog.csdn.net/fanren224/article/details/79707206)