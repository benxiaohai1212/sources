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


