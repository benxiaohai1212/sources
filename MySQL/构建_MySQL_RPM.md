1. 构建环境
```
yum -y groupinstall "Development Tools"
yum -y install ruby ruby-devel rubygems gcc openssl-devel
```
2. 安装FPM
```
gem sources --add http://mirrors.aliyun.com/rubygems/ --remove http://rubygems.org/
gem install arr-pm fpm
```
3. 获取安装安装编译后的安装文件

获取安装的MySQL
```
[root@localhost ~]# rpm -qa | grep mysql
mysql-community-server-5.7.20-1.el7.x86_64
mysql-community-common-5.7.20-1.el7.x86_64
mysql-community-client-5.7.20-1.el7.x86_64
mysql-community-libs-5.7.20-1.el7.x86_64
```
获取安装MySQL的安装目录及文件
```
rpm -ql mysql-community-server-5.7.20-1.el7.x86_64 mysql-community-common-5.7.20-1.el7.x86_64 mysql-community-client-5.7.20-1.el7.x86_64 mysql-community-libs-5.7.20-1.el7.x86_64
```

将获取的文件拷贝到指定目录
```
mkdir mysql-5.7.20
rpm -ql mysql-community-server-5.7.20-1.el7.x86_64 mysql-community-common-5.7.20-1.el7.x86_64 mysql-community-client-5.7.20-1.el7.x86_64 mysql-community-libs-5.7.20-1.el7.x86_64 | xargs cp  --parent -rf --target-directory ./mysql-5.7.20
```
查看目录结构
```
	[root@localhost ~]# tree mysql-5.7.20/ -L 2
	mysql-5.7.20
	├── etc
	│   ├── ld.so.conf.d
	│   ├── logrotate.d
	│   ├── my.cnf
	│   └── my.cnf.d
	├── usr
	│   ├── bin
	│   ├── lib
	│   ├── lib64
	│   ├── sbin
	│   └── share
	└── var
			├── lib
			└── run
```
打tar包：`tar zcf mysql-5.7.20.tar.gz mysql-5.7.20/ --remove-files`

before_install.sh
```
#!/bin/bash

/usr/sbin/groupadd -g 27 -o -r mysql >/dev/null 2>&1 || :
/usr/sbin/useradd -M -N -g mysql -o -r -d /var/lib/mysql -s /bin/false \
    -c "MySQL Server" -u 27 mysql >/dev/null 2>&1 || :
```
after_install.sh
```
#!/bin/bash

/bin/touch /var/log/mysqld.log >/dev/null 2>&1 || :
/bin/chown mysql:mysql -R /var/log/mysqld.log /var/run/mysqld /var/lib/mysql /var/lib/mysql-files /var/lib/mysql-keyring>/dev/null 2>&1 || :
/usr/bin/systemctl enable mysqld >/dev/null 2>&1 || :
/usr/bin/systemctl restart mysqld.service >/dev/null 2>&1 || :
```
before_remove.sh
```
#!/bin/bash

# Package removal, not upgrade 
systemctl --no-reload disable mysqld.service > /dev/null 2>&1 || : 
systemctl stop mysqld.service > /dev/null 2>&1 || :
```
after_remove.sh
```
#!/bin/bash

systemctl daemon-reload >/dev/null 2>&1 || :
mv /var/lib/mysql /var/lib/mysql-$(data +%Y%m%d-%H%M)
rm -rf /usr/share/doc/mysql-community-*
rm -rf /usr/share/mysql /usr/lib64/mysql/ 
```

4. 制作RPM安装包
```
mkdir -p /data/{download,rpms/pkgs}
cp mysql-5.7.20.tar.gz /data/rpms
cd /data/rpms
tar zxf mysql-5.7.20.tar.gz
export DIR_RPM_INSTALL=/data/rpms/mysql-5.7.20

fpm -f -s dir -t rpm -p $(pwd) -n mysql -v '5.7.20' \
    -C ${DIR_RPM_INSTALL} \
    --category=Applications/Databases \
    --url 'https://dev.mysql.com/doc/refman/5.7/en/' \
    --description 'mysql-5.7.20' \
    --vendor 'www.asiacom.net.cn' \
    --license 'GPL' \
    --iteration 1.el7 \
    --conflicts 'mariadb-libs' \
    -d '/usr/bin/perl net-tools perl(Getopt::Long) perl(strict)' \
    --before-install ${DIR_RPM_INSTALL}/usr/share/mysql/script/before_install.sh \
    --after-install ${DIR_RPM_INSTALL}/usr/share/mysql/script/after_install.sh \
    --before-remove ${DIR_RPM_INSTALL}/usr/share/mysql/script/before_remove.sh \
    --after-remove ${DIR_RPM_INSTALL}/usr/share/mysql/script/after_remove.sh \
    -m "zhangliqiang@asiacom.net.cn" 
```

查看RPM的属性信息
```
[root@localhost rpms]# rpm -pqi mysql-5.7.20-1.el7.x86_64.rpm 
Name        : mysql
Version     : 5.7.20
Release     : 1.el7
Architecture: x86_64
Install Date: (not installed)
Group       : Applications/Databases
Size        : 1037310351
License     : GPL
Signature   : (none)
Source RPM  : mysql-5.7.20-1.el7.src.rpm
Build Date  : 2019年03月20日 星期三 18时28分22秒
Build Host  : localhost
Relocations : / 
Packager    : zhangliqiang@asiacom.net.cn
Vendor      : www.asiacom.net.cn
URL         : https://dev.mysql.com/doc/refman/5.7/en/
Summary     : mysql-5.7.20
Description :
mysql-5.7.20
```
RPM包验证:
```
[root@localhost rpms]# rpm -K mysql-5.7.20-1.el7.x86_64.rpm 
mysql-5.7.20-1.el7.x86_64.rpm: sha1 md5 确定
```
查看RPM包目录结构:
```
[root@localhost rpms]# rpm -pql mysql-5.7.20-1.el7.x86_64.rpm 
...
/etc/my.cnf
/usr/bin/mysql
...
/usr/share/mysql/script/after_install.sh
/usr/share/mysql/script/after_remove.sh
/usr/share/mysql/script/before_install.sh
/usr/share/mysql/script/before_remove.sh
...
/var/run/mysqld/mysqld.pid
```
查看RPM包中的脚本信息:
```
[root@localhost rpms]# rpm -pq --scripts mysql-5.7.20-1.el7.x86_64.rpm 
preinstall scriptlet (using /bin/sh):
#!/bin/bash

/usr/sbin/groupadd -g 27 -o -r mysql >/dev/null 2>&1 || :
/usr/sbin/useradd -M -N -g mysql -o -r -d /var/lib/mysql -s /bin/false \
    -c "MySQL Server" -u 27 mysql >/dev/null 2>&1 || :
postinstall scriptlet (using /bin/sh):
#!/bin/bash

/bin/touch /var/log/mysqld.log >/dev/null 2>&1 || :
/bin/chown mysql:mysql -R /var/log/mysqld.log /var/run/mysqld /var/lib/mysql /var/lib/mysql-files /var/lib/mysql-keyring>/dev/null 2>&1 || :
/usr/bin/systemctl enable mysqld >/dev/null 2>&1 || :
/usr/bin/systemctl restart mysqld.service >/dev/null 2>&1 || :
preuninstall scriptlet (using /bin/sh):
#!/bin/bash

# Package removal, not upgrade 
systemctl --no-reload disable mysqld.service > /dev/null 2>&1 || : 
systemctl stop mysqld.service > /dev/null 2>&1 || :
postuninstall scriptlet (using /bin/sh):
#!/bin/bash

systemctl daemon-reload >/dev/null 2>&1 || :
mv /var/lib/mysql /var/lib/mysql-$(data +%Y%m%d-%H%M)
rm -rf /usr/share/doc/mysql-community-*
rm -rf /usr/share/mysql /usr/lib64/mysql/
```
rpm的安装:
```
* rpm默认安装时默认的根目录就是系统的'/':
* rpm手动指定安装时的根目录[ --prefix=/temp/roach]:
[root@localhost ~]# rpm -ivh mysql-5.7.20-1.el7.x86_64.rpm
```