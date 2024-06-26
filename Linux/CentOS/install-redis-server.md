## CentOS7 Install Redis-Server

[下载redis地址](https://redis.io/download)
```sh
wget http://download.redis.io/releases/redis-4.0.1.tar.gz
tar xzf redis-4.0.1.tar.gz
cd redis-4.0.1
make
```
显示日志
```log
.....
LINK redis-benchmark 
CC redis-check-dump.o 
LINK redis-check-dump 
CC redis-check-aof.o 
LINK redis-check-aof

Hint: It’s a good idea to run ‘make test’ ;)
```
进入src进行安装
```sh
cd src
make install
```
显示日志
```log
Hint: It’s a good idea to run ‘make test’ ;)

INSTALL install
INSTALL install
INSTALL install
INSTALL install
INSTALL install
```

启动redis服务
```sh
redis-4.0.1/src/redis-server
```
显示日志
```log
[root@localhost redis-4.0.1]# src/redis-server 
7101:C 29 Aug 11:38:24.762 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
7101:C 29 Aug 11:38:24.762 # Redis version=4.0.1, bits=64, commit=00000000, modified=0, pid=7101, just started
7101:C 29 Aug 11:38:24.762 # Warning: no config file specified, using the default config. In order to specify a config file use src/redis-server /path/to/redis.conf
7101:M 29 Aug 11:38:24.764 * Increased maximum number of open files to 10032 (it was originally set to 1024).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 4.0.1 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 7101
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

7101:M 29 Aug 11:38:24.766 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
7101:M 29 Aug 11:38:24.766 # Server initialized
7101:M 29 Aug 11:38:24.766 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
7101:M 29 Aug 11:38:24.766 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
7101:M 29 Aug 11:38:24.767 * Ready to accept connections

```

配置
vim redis-4.0.1/redis.conf
```sh
echo "vm.overcommit_memory=1" >> /etc/sysctl.conf
echo "net.core.somaxconn = 551" >> /etc/sysctl.conf
echo "* soft nofile 10032" >> /etc/security/limits.conf
echo "* hard nofile 10032" >> /etc/security/limits.conf
echo "if test -f /sys/kernel/mm/transparent_hugepage/enabled; then  
   echo never > /sys/kernel/mm/transparent_hugepage/enabled  
fi  
if test -f /sys/kernel/mm/transparent_hugepage/defrag; then  
   echo never > /sys/kernel/mm/transparent_hugepage/defrag  
fi" >> /etc/rc.local
```
配置详情说明
```text
1、daemonize 如果需要在后台运行，把该项改为yes
2、pidfile 配置多个pid的地址 默认在/var/run/redis.pid
3、bind 绑定ip，设置后只接受来自该ip的请求
4、port 监听端口，默认是6379
5、loglevel 分为4个等级：debug verbose notice warning
6、logfile 用于配置log文件地址
7、databases 设置数据库个数，默认使用的数据库为0
8、save 设置redis进行数据库镜像的频率。
9、rdbcompression 在进行镜像备份时，是否进行压缩
10、dbfilename 镜像备份文件的文件名
11、Dir 数据库镜像备份的文件放置路径
12、Slaveof 设置数据库为其他数据库的从数据库
13、Masterauth 主数据库连接需要的密码验证
14、Requriepass 设置 登陆时需要使用密码
15、Maxclients 限制同时使用的客户数量
16、Maxmemory 设置redis能够使用的最大内存
17、Appendonly 开启append only模式
18、Appendfsync 设置对appendonly.aof文件同步的频率（对数据进行备份的第二种方式）
19、vm-enabled 是否开启虚拟内存支持 （vm开头的参数都是配置虚拟内存的）
20、vm-swap-file 设置虚拟内存的交换文件路径
21、vm-max-memory 设置redis使用的最大物理内存大小
22、vm-page-size 设置虚拟内存的页大小
23、vm-pages 设置交换文件的总的page数量
24、vm-max-threads 设置VM IO同时使用的线程数量
25、Glueoutputbuf 把小的输出缓存存放在一起
26、hash-max-zipmap-entries 设置hash的临界值
27、Activerehashing 重新hash
```

配置启动命令
```sh
cp redis-4.0.1/src/redis-server /usr/local/bin/
cp redis-4.0.1/src/redis-cli /usr/local/bin/
```
修改
daemonize=yes

logfile "/var/redis/log/redis.log"

cp redis-4.0.1/redis.conf /etc/redis/6379.conf

启动服务
```sh
redis-server /etc/redis/6379.conf
```
命令登录
```sh
redis-cli -h 127.0.0.1 -p 6379 -n password
```

Redis (error) NOAUTH Authentication required.解决方法
```sh
127.0.0.1:6379> auth "yourpassword" 
OK
```


## 简单安装

[下载redis地址](https://redis.io/download)
```sh
wget http://download.redis.io/releases/redis-4.0.1.tar.gz
tar xzf redis-4.0.1.tar.gz
cd redis-4.0.1
make
```
显示日志
```log
.....
LINK redis-benchmark 
CC redis-check-dump.o 
LINK redis-check-dump 
CC redis-check-aof.o 
LINK redis-check-aof

Hint: It’s a good idea to run ‘make test’ ;)
```
创建存储redis文件目录
```sh
mkdir -p /usr/local/redis
```
复制redis-server redis-cli到新建立的文件夹
```sh
cp ./redis-server /usr/local/redis/
cp ./redis-cli /usr/local/redis/
```
复制redis的配置文件
```sh
cd ..
cp redis.conf /usr/local/redis/
```
编辑配置文件
```sh
cd /usr/local/redis/
vim redis.conf
```

添加开机启动服务
vim /etc/systemd/system/redis-server.service

粘贴如下内容
```sh
[Unit]
Description=The redis-server Process Manager
After=syslog.target network.target

[Service]
Type=simple
PIDFile=/var/run/redis.pid
ExecStart=/usr/local/redis/redis-server       
ExecReload=/bin/kill -USR2 $MAINPID
ExecStop=/bin/kill -SIGINT $MAINPID

[Install]
WantedBy=multi-user.target
```

设置开机启动
```sh
systemctl daemon-reload 
systemctl start redis-server.service 
systemctl enable redis-server.service
```

```
关闭防火墙：
systemctl stop firewalld.service #停止firewall
systemctl disable firewalld.service #禁止firewall开机启动
firewall-cmd --state #查看默认防火墙状态（关闭后显示notrunning，开启后显示running）
配置编译环境：
sudo yum install gcc-c++
下载源码：
wget http://download.redis.io/releases/redis-3.2.8.tar.gz
解压源码：
tar -zxvf redis-3.2.8.tar.gz
进入到解压目录：
cd redis-3.2.8
执行make编译Redis：
make MALLOC=libc
注意：make命令执行完成编译后，会在src目录下生成6个可执行文件，分别是redis-server、redis-cli、redis-benchmark、redis-check-aof、redis-check-rdb、redis-sentinel。
安装Redis：
make install 
配置Redis能随系统启动:
./utils/install_server.sh
显示结果信息如下：
Welcome to the redis service installer
This script will help you easily set up a running redis server

Please select the redis port for this instance: [6379] 
Selecting default: 6379
Please select the redis config file name [/etc/redis/6379.conf] 
Selected default - /etc/redis/6379.conf
Please select the redis log file name [/var/log/redis_6379.log] 
Selected default - /var/log/redis_6379.log
Please select the data directory for this instance [/var/lib/redis/6379] 
Selected default - /var/lib/redis/6379
Please select the redis executable path [/usr/local/bin/redis-server] 
Selected config:
Port           : 6379
Config file    : /etc/redis/6379.conf
Log file       : /var/log/redis_6379.log
Data dir       : /var/lib/redis/6379
Executable     : /usr/local/bin/redis-server
Cli Executable : /usr/local/bin/redis-cli
Is this ok? Then press ENTER to go on or Ctrl-C to abort.
Copied /tmp/6379.conf => /etc/init.d/redis_6379
Installing service...
Successfully added to chkconfig!
Successfully added to runlevels 345!
Starting Redis server...
Installation successful!

Redis服务查看、开启、关闭:
a.通过ps -ef|grep redis命令查看Redis进程
b.开启Redis服务操作通过/etc/init.d/redis_6379 start命令，也可通过（service redis_6379 start）
c.关闭Redis服务操作通过/etc/init.d/redis_6379 stop命令，也可通过（service redis_6379 stop）

redis.conf 的配置信息
1、daemonize 如果需要在后台运行，把该项改为yes
2、pidfile 配置多个pid的地址 默认在/var/run/redis.pid
3、bind 绑定ip，设置后只接受来自该ip的请求
4、port 监听端口，默认是6379
5、loglevel 分为4个等级：debug verbose notice warning
6、logfile 用于配置log文件地址
7、databases 设置数据库个数，默认使用的数据库为0
8、save 设置redis进行数据库镜像的频率。
9、rdbcompression 在进行镜像备份时，是否进行压缩
10、dbfilename 镜像备份文件的文件名
11、Dir 数据库镜像备份的文件放置路径
12、Slaveof 设置数据库为其他数据库的从数据库
13、Masterauth 主数据库连接需要的密码验证
14、Requriepass 设置 登陆时需要使用密码
15、Maxclients 限制同时使用的客户数量
16、Maxmemory 设置redis能够使用的最大内存
17、Appendonly 开启append only模式
18、Appendfsync 设置对appendonly.aof文件同步的频率（对数据进行备份的第二种方式）
19、vm-enabled 是否开启虚拟内存支持 （vm开头的参数都是配置虚拟内存的）
20、vm-swap-file 设置虚拟内存的交换文件路径
21、vm-max-memory 设置redis使用的最大物理内存大小
22、vm-page-size 设置虚拟内存的页大小
23、vm-pages 设置交换文件的总的page数量
24、vm-max-threads 设置VM IO同时使用的线程数量
25、Glueoutputbuf 把小的输出缓存存放在一起
26、hash-max-zipmap-entries 设置hash的临界值
27、Activerehashing 重新hash
```
