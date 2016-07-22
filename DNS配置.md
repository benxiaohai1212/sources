## 一、环境规划
  服务器IP：10.10.10.26  
  操作系统：Ubuntu 14.04  
  DNS程序：Bind9  
  测试域名：dev.ecloud.com.cn  
  目标IP：10.10.10.6;10.10.10.19  

## 二、安装配置

###  1.检查是否安装bind
    使用命令dpkg -l bind*查看相关软件是否安装

###  2.安装 BIND9
    命令： sudo apt-get install bind9

###  3.DNS配置
    DNS 配置文件在 /etc/bind 目录中：
    安装bind9后会生成如下三个配置文件：
    named.conf；named.conf.options；named.conf.local。
    其中 named.conf是主配置文件，里面包含了named.conf.options和named.conf.local
    1)、编辑named.conf.local
      命令：sudo gedit /etc/bind/named.conf.local
      添加下列语句
```ruby
        //正向区域
        zone "dev.ecloud.com.cn"
        {
          type master;
          file "/etc/bind/dev.ecloud.com.cn";
        };
        //反向区域
        zone "10.10.10.in-addr.arpa"{
          type    master;
          file    "/etc/bind/db.10.10.10";
        };
```
      注意：“}”后面要有分号“;”，否则会报错。
    2)建立区域文件
      复制了一份区域文件 db.local 为 dev.ecloud.com.cn
      命令：sudo cp /etc/bind/db.local /etc/bind/dev.ecloud.com.cn
    3)编辑区域文件
      调整主配置文件：sudo vi /etc/bind/dev.ecloud.com.cn
```ruby
        ;
        ; BIND data file for local loopback interface
        ;
         $TTL    604800
        @       IN      SOA     dev.ecloud.com.cn. root.dev.ecloud.com.cn. (
                                        2       ;Serial
                                        604800  ;Refresh
                                        86400   ;Retry
                                        2419200 ;Exrire
                                        604800 );Negative Cache TTL
        ;
        @       IN      NS      dev.ecloud.com.cn.
        @       IN      A       10.10.10.26
        dns      IN      A       10.10.10.26
        registry    IN      A       10.10.10.6
        redmine   IN      A       10.10.10.19
```
    4)建立反向区域文件
      复制了一份反向区域文件 db.127 为 db.10.10.10 
      命令：sudo cp /etc/bind/db.127 /etc/bind/db.10.10.10 
    5)编辑反向区域文件 
      调整主配置文件：sudo vi /etc/bind/db.10.10.10
```ruby
        ;
        ; BIND reverse data file for local loopback interface
        ;
        $TTL    604800
        @       IN      SOA     dev.ecloud.com.cn. root.dev.ecloud.com.cn. (
                                      1         ; Serial
                                 604800         ; Refresh
                                  86400         ; Retry
                                2419200         ; Expire
                                 604800 )       ; Negative Cache TTL
        ;
        @       IN      NS      dev.ecloud.com.cn.
        6   IN      PTR     registry.
        19   IN      PTR     redmine.
```

      注意：不配置反向区域也使可以的；

  4、编辑named.conf.options
      修改配置文件/etc/bind/named.conf.options，用于转发本DNS Server不能解析的域名 ，配置后可以上网 
      命令：sudo gedit /etc/bind/named.conf.options
```ruby
        forwarders {
          8.8.8.8;
        };
```
  5、重新启动DNS服务 
    sudo /etc/init.d/bind9 restart 
    到此位置DNS就配置完成了。

三、客户端DNS配置
  编辑：Sudo vi /etc/resolv.conf  
  nameserver 10.10.10.26（添加DNS服务地址，无需重启）
