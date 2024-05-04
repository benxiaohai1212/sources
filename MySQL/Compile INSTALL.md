# 编译安装MySQL 5.7

[源码报下载](https://downloads.mysql.com/archives/community/)

Product Version：      选择版本[5.7.36]  
Operating System：     Source Code  
OS Version：           All Operating Systems (Generic) (Architecture Independent)

可以下载： [mysql-5.7.36.tar.gz](https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.36.tar.gz) 或者 [mysql-boost-5.7.36.tar.gz](https://downloads.mysql.com/archives/get/p/23/file/mysql-boost-5.7.36.tar.gz)

## 1、安装编译所需环境
### centOS、redhat、kylin
```
yum install -y groupinstall “Development Tools”
yum install -y gcc gcc-c++ ncurses ncurses-devel bison libgcrypt perl make cmake openssl-devel \
                libtirpc-devel git openldap 
```
### debian、Ubuntu、uos
```
apt-get update
apt-get install -y gcc g++ cmake libncurses5-dev bison openssl libssl-dev pkg-config 
```

## 2、准备源码包，解压mysql并进入目录
```
tar zxf mysql-boost-5.7.36.tar.gz  
cd mysql-5.7.36

编译参数：
-DDOWNLOAD_BOOST=0                             # 不需要下载 boost_1_59_0.tar.gz
-DWITH_BOOST=./boost/boost_1_59_0              # 指定boost_1_59_0目录
```
或者
```
tar zxf mysql-5.7.36.tar.gz
cd mysql-5.7.36

编译参数：
-DDOWNLOAD_BOOST=1                             # 需要下载 boost_1_59_0.tar.gz
-DWITH_BOOST=${BASE_MYSQL_INSTALL}/boost/      # 指定下目录
```

## 3、编译
```
cmake \
-DCMAKE_INSTALL_PREFIX=${BASE_MYSQL_INSTALL} \
-DMYSQL_DATADIR=${BASE_MYSQL_INSTALL}/data \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_bin \
-DSYSCONFDIR=/opt/swancmp/mysql \
-DDOWNLOAD_BOOST=1 \
-DWITH_BOOST=${BASE_MYSQL_INSTALL}/boost/ \
-DEXTRA_CHARSETS=all \
-DSYSCONFDIR=${BASE_MYSQL_INSTALL} \
-DWITH_EMBEDDED_SERVER=1 \
-DENABLED_LOCAL_INFILE=1 \
-DWITH_MYISAM_STORAGE_ENGINE=1 \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_ARCHIVE_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_FEDERATED_STORAGE_ENGINE=1 \
-DWITH_PARTITION_STORAGE_ENGINE=1 \
-DMYSQL_UNIX_ADDR=${BASE_MYSQL_INSTALL}/run/mysql.sock \
-DMYSQL_TCP_PORT=3307 \
-DWITH_SYSTEMD=1 \
-DSYSTEMD_PID_DIR=/opt/swancmp/mysql/run/ \
-DSYSTEMD_SERVICE_NAME=mysqld \
-DWITH_SSL=system 
```
设置解释
```
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql   安装位置
-DMYSQL_UNIX_ADDR=/tmp/mysql.sock         指定 socket（套接字）文件位置
-DEXTRA_CHARSETS=all                      扩展字符支持
-DDEFAULT_CHARSET=utf8                    默认字符集
-DDEFAULT_COLLATION=utf8_general_ci       默认字符校对
-DWITH_MYISAM_STORAGE_ENGINE=1            安装 myisam 存储引擎
-DWITH_INNOBASE_STORAGE_ENGINE=1          安装 innodb 存储引擎
-DWITH_MEMORY_STORAGE_ENGINE=1            安装 memory 存储引擎
-DWITH_READLINE=1                         支持 readline 库
-DENABLED_LOCAL_INFILE=1                  启用加载本地数据
-DMYSQL_USER=mysql                        指定 mysql 运行用户
-DMYSQL_TCP_PORT=3306                     指定 mysql 端口
-DWITH_SSL=yes                            支持SSL (yes:使用系统OpenSSL库（如果存在），否则使用与分发捆绑的库;bundled：使用与分发捆绑在一起的SSL库,5.28之前默认；system: 使用系统 OpenSSL 库。这是 MySQL 5.7.28 的默认设置)
-DWITH_SYSTEMD=1                          启用生成service
-DSYSTEMD_SERVICE_NAME=mysqld             生成service服务名称
```
[参考地址](https://dev.mysql.com/doc/refman/5.7/en/source-configuration-options.html)：https://dev.mysql.com/doc/refman/5.7/en/source-configuration-options.html

**查看服务器CPU数**
```
grep processor /proc/cpuinfo | wc -l 
```

make -j 2  
make -j 2 install  

如果编译过程中报
```
CMake Error at rapid/plugin/group_replication/rpcgen.cmake:100 (MESSAGE):
  Could not find rpcgen
Call Stack (most recent call first):
  rapid/plugin/group_replication/CMakeLists.txt:36 (INCLUDE)


-- Configuring incomplete, errors occurred!
See also "/root/mysql-5.7.36/CMakeFiles/CMakeOutput.log".
See also "/root/mysql-5.7.36/CMakeFiles/CMakeError.log".
```
解决：
```
[root@localhost mysql-5.7.36]# wget https://github.com/thkukuk/rpcsvc-proto/releases/download/v1.4/rpcsvc-proto-1.4.tar.gz
[root@localhost mysql-5.7.36]# tar xf rpcsvc-proto-1.4.tar.gz 
[root@localhost mysql-5.7.36]# cd  rpcsvc-proto-1.4
[root@localhost rpcsvc-proto-1.4]# ./configure && make && make install 
```

## 4、编译后创建MySQL账户，安装所在目录并赋权
```
mkdir -p /opt/swancmp/mysql
export BASE_MYSQL_INSTALL=/opt/swancmp/mysql
mkdir -p ${BASE_MYSQL_INSTALL}/{data,run}

groupadd -g 27 -o -r mysql >/dev/null 2>&1 || :
useradd -M -N -g mysql -o -r -d ${BASE_MYSQL_INSTALL} -s /bin/false -c "MySQL Server" -u 27 mysql >/dev/null 2>&1 || :

touch ${BASE_MYSQL_INSTALL}/mysqld.log
chown -R mysql:mysql ${BASE_MYSQL_INSTALL}/{data,run}
chown mysql.mysql ${BASE_MYSQL_INSTALL}/mysqld.log
```
## 5、创建MySQL的配置文件 `my.cnf`
```
cat > ${BASE_MYSQL_INSTALL}/my.cnf << EOF
[client]
port        = 3307
socket      = /opt/swancmp/mysql/run/mysql.sock
default-character-set = utf8

# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[mysqld]
# 默认引擎 INNODB
default-storage-engine = INNODB
# 数据库默认字符集,主流字符集支持一些特殊表情符号（特殊表情符占用4个字节）
character-set-server = utf8

#数据库字符集对应一些排序等规则，注意要和character-set-server对应
collation-server = utf8_general_ci

port   = 3307
socket = /opt/swancmp/mysql/run/mysql.sock
user   = mysql
# 监听本机上的所有网卡接口
bind-address=0.0.0.0
# 跳过域名解析
# skip-name-resolve

basedir   = /opt/swancmp/mysql
datadir   = /opt/swancmp/mysql/data
pid-file  = /opt/swancmp/mysql/run/mysqld.pid
log-error = /opt/swancmp/mysql/mysqld.log

# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

# 每次加载校验密码策略插件
plugin-load-add=validate_password.so
# validate-password=FORCE_PLUS_PERMANENT
# 指定密码校验策略: 0=LOW, 1=MEDIUM, 2=STRONG
validate_password_policy = 0
# 禁用密码策略
validate_password = off
# 最大连接数
max_connections    = 32000
# 限制server接受的数据包大小
max_allowed_packet = 1024M

# 设置client连接mysql时的字符集,防止乱码
init_connect='SET NAMES utf8'

# 表名存储在磁盘是小写的，比较的时候不区分大小写，可选值有（0|1|2）
lower_case_table_names = 1

# TIMESTAMP如果没有显示声明NOT NULL，允许NULL值
explicit_defaults_for_timestamp = true
sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

[mysqld_safe]
log-error = /opt/swancmp/mysql/mysqld.log
pid-file = /opt/swancmp/mysql/run/mysqld.pid
EOF
```
mysql数据库启动的时候可以从多个路径下读取配置文件，读取顺序具体如下:
```
root@uos:~/mysql-5.7.36# /opt/swancmp/mysql/bin//mysql --help |grep my.cnf
                      order of preference, my.cnf, $MYSQL_TCP_PORT, built-in
/etc/my.cnf /etc/mysql/my.cnf /opt/swancmp/mysql/my.cnf ~/.my.cnf 
root@uos:~/mysql-5.7.36# 
```

## 6、初始化MySQL

初始密码生成在`~/.mysql_secret` 里  
```
/opt/swancmp/mysql/bin/mysql_install_db --defaults-file=${BASE_MYSQL_INSTALL}/my.cnf --basedir=${BASE_MYSQL_INSTALL} --datadir=${BASE_MYSQL_INSTALL}/data --user=mysql
```
初始密码生成在`mysqld.log`里  
```
/opt/swancmp/mysql/bin/mysqld --defaults-file=${BASE_MYSQL_INSTALL}/my.cnf --initialize --basedir=${BASE_MYSQL_INSTALL} --datadir=${BASE_MYSQL_INSTALL}/data --user=mysql
```

如果初试化报错
```
[ERROR] --initialize specified but the data directory has files in it. Aborting
```
说明data目录不为空，解决`rm -rf data/*` 之后再次执行初始化命令

## 7、启动MySQL
```
${BASE_MYSQL_INSTALL}/supper-files/mysql.server start
```

## 8、编译后用service初始化并启动
1. 编辑`mysqld_pre_systemd`
```
#! /bin/bash

# Copyright (c) 2015, 2021, Oracle and/or its affiliates.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License, version 2.0,
# as published by the Free Software Foundation.
#
# This program is also distributed with certain software (including
# but not limited to OpenSSL) that is licensed under separate terms,
# as designated in a particular file or component or in included license
# documentation.  The authors of MySQL hereby grant you an additional
# permission to link the program and your derivative works with the
# separately licensed software that they have included with MySQL.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License, version 2.0, for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA


# Script used by systemd mysqld.service to run before executing mysqld

basedir=/opt/swancmp/mysql

get_option () {
    local section=$1
    local option=$2
    local default=$3
    local instance=$4
#    ret=$(/opt/swancmp/mysql/bin/my_print_defaults  ${instance:+--defaults-group-suffix=@$instance} $section | grep '^--'${option}'=' | cut -d= -f2- | tail -n 1)
# 指定配置文件路径
    ret=$(/opt/swancmp/mysql/bin/my_print_defaults --defaults-file=$basedir/my.cnf $section | grep '^--'${option}'=' | cut -d= -f2- | tail -n 1)
    [ -z "$ret" ] && ret=$default
    echo $ret
}

install_validate_password_sql_file () {
    local initfile
    initfile="$(mktemp /var/lib/mysql-files/install-validate-password-plugin.XXXXXX.sql)"
    chmod a+r "$initfile"
    echo "SET @@SESSION.SQL_LOG_BIN=0;" > "$initfile"
    echo "INSERT INTO mysql.plugin (name, dl) VALUES ('validate_password', 'validate_password.so');" >> $initfile
    echo $initfile
}

install_db () {
    # Note: something different than datadir=/var/lib/mysql requires SELinux policy changes (in enforcing mode)

# 添加验证配置是否存在校验
    [ ! -f "$basedir/my.cnf" ] && exit 1
    # No automatic init wanted
    [ -e /etc/sysconfig/mysql ] && . /etc/sysconfig/mysql
    [ -n "$NO_INIT" ] && exit 0

    local instance=$1
    datadir=$(get_option mysqld datadir "/var/lib/mysql${instance:+-$instance}" $instance)
    log=$(get_option mysqld 'log[_-]error' "/var/log/mysql${instance:+-$instance}.log" $instance)

    # Restore log, dir, perms and SELinux contexts

    if [ ! -d "$datadir" -a ! -h "$datadir" -a "x$(dirname "$datadir")" = "x/var/lib" ]; then
	install -d -m 0751 -omysql -gmysql "$datadir" || exit 1
    fi

    if [ ! -e "$log" -a ! -h "$log" -a x$(dirname "$log") = "x/var/log" ]; then
	case $(basename "$log") in
	    mysql*.log) install /dev/null -m0640 -omysql -gmysql "$log" ;;
	    *) ;;
	esac
    fi

    if [ -x /usr/sbin/restorecon ]; then
        /usr/sbin/restorecon "$datadir"
        [ -e "$log" ] && /usr/sbin/restorecon "$log"
	for dir in /var/lib/mysql-files /var/lib/mysql-keyring ; do
            if [ -x /usr/sbin/semanage -a -d /var/lib/mysql -a -d $dir ] ; then
                /usr/sbin/semanage fcontext -a -e /var/lib/mysql $dir >/dev/null 2>&1
                /sbin/restorecon -r $dir
            fi
	done
    fi

    # If special mysql dir is in place, skip db install
    [ -d "$datadir/mysql" ] && exit 0

    # Create initial db and install validate_password plugin
# 注释掉初始化加载密码策略
#    initfile="$(install_validate_password_sql_file)" 
#    /opt/swancmp/mysql/bin/mysqld ${instance:+--defaults-group-suffix=@$instance} --initialize --datadir="$datadir" --user=mysql --init-file="$initfile"
# 指定配置文件初始化
    /opt/swancmp/mysql/bin/mysqld --defaults-file=$basedir/my.cnf --initialize --basedir=$basedir --datadir="$datadir" --user=mysql 
    rm -f "$initfile"

    # Generate certs if needed
    if [ -x /opt/swancmp/mysql/bin/mysql_ssl_rsa_setup -a ! -e "${datadir}/server-key.pem" ] ; then
        /opt/swancmp/mysql/bin/mysql_ssl_rsa_setup --datadir="$datadir" --uid=mysql >/dev/null 2>&1
    fi
    exit 0
}

install_db $1

exit 0

```
2. 编辑 `mysqld.service`
```
# Copyright (c) 2015, 2021, Oracle and/or its affiliates.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License, version 2.0,
# as published by the Free Software Foundation.
#
# This program is also distributed with certain software (including
# but not limited to OpenSSL) that is licensed under separate terms,
# as designated in a particular file or component or in included license
# documentation.  The authors of MySQL hereby grant you an additional
# permission to link the program and your derivative works with the
# separately licensed software that they have included with MySQL.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License, version 2.0, for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
#
# systemd service file for MySQL forking server
#

[Unit]
Description=MySQL Server
Documentation=man:mysqld(8)
Documentation=http://dev.mysql.com/doc/refman/en/using-systemd.html
After=network.target
After=syslog.target

[Install]
WantedBy=multi-user.target

[Service]
User=mysql
Group=mysql

Type=forking

PIDFile=/opt/swancmp/mysql/run//mysqld.pid

# Disable service start and stop timeout logic of systemd for mysqld service.
TimeoutSec=0

# Execute pre and post scripts as root
PermissionsStartOnly=true

# Needed to create system tables
ExecStartPre=/opt/swancmp/mysql/bin/mysqld_pre_systemd

# Start main service
# ExecStart=/opt/swancmp/mysql/bin/mysqld --daemonize --pid-file=/opt/swancmp/mysql/run/mysqld.pid  $MYSQLD_OPTS
# 指定日志输出，否则初始化密码和日志分别在/opt/swancmp/mysql/mysqld.log （初始化密码）和 /var/log/syslog （mysql日志）
ExecStart=/opt/swancmp/mysql/bin/mysqld --daemonize --pid-file=/opt/swancmp/mysql/run/mysqld.pid --log-error=/opt/swancmp/mysql/mysqld.log $MYSQLD_OPTS

# Use this to switch malloc implementation
EnvironmentFile=-/etc/sysconfig/mysql

# Sets open_files_limit
LimitNOFILE = 5000

Restart=on-failure

RestartPreventExitStatus=1

PrivateTmp=false
```