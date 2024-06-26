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
> 注意：“}”后面要有分号“;”，否则会报错。
    在/etc/bind9/named.conf.options文件中，有一句默认的配置 `directory “/var/cache/bind”`，该语句的所示的目录的作用是存放正向解析以及反向解析的一些配置文件，该配置告诉Bind，到/var/cache/bind目录下去寻找数据文件

    2)建立区域文件
      复制了一份区域文件 db.local 为 dev.ecloud.com.cn  
      命令：`sudo cp /etc/bind/db.local /etc/bind/dev.ecloud.com.cn` 或者 `sudo cp /etc/bind/db.local /var/cache/bind/dev.ecloud.com.cn`  
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
调整主配置文件：sudo vi /var/cache/bind/dev.ecloud.com.cn
```ruby
;
; BIND data file for local loopback interface
;
$TTL	604800
@	IN	SOA	localhost. root.localhost. (
			      2		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
@	IN	NS	dns.
@	IN	A	10.10.10.26
dns	IN	A	10.10.10.26
.......
@	IN	AAAA	::1
```

    4)建立反向区域文件
      复制了一份反向区域文件 db.127 为 db.10.10.10   
      命令：`sudo cp /etc/bind/db.127 /etc/bind/db.10.10.10` 或者 `sudo cp /etc/bind/db.127 /var/cache/bind/db.10.10.10`  
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
调整主配置文件：sudo vi /var/cache/bind/db.10.10.10
```ruby
;
; BIND reverse data file for local loopback interface
;
$TTL	604800
@	IN	SOA	localhost. root.localhost. (
			      1		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
@	IN	NS	dns.
251	IN	PTR	dns.dev.ecloud.com.cn
......
1.0.0	IN	PTR	localhost.
```

      注意：不配置反向区域也使可以的；

  4、编辑named.conf.options
      修改配置文件/etc/bind/named.conf.options，用于转发本DNS Server不能解析的域名 ，配置后可以上网 
      命令：sudo gedit /etc/bind/named.conf.options
```ruby
        forwarders {
          8.8.8.8;
        };
        allow-query { any; };
```
**注意：一定要添加 allow-query { any; };**
否则跨网段的不能被转发，会提示访问拒绝的错误：client 192.168.4.130#57982 (www.baidu.com): query (cache) 'www.baidu.com/A/IN' denied  
  5、重新启动DNS服务 
    sudo /etc/init.d/bind9 restart 
    到此位置DNS就配置完成了。
    查看/var/log/syslog中查看，有没有bind的错误日志

## 三、客户端DNS配置  

  编辑：Sudo vi /etc/resolv.conf  
  nameserver 10.10.10.26（添加DNS服务地址，无需重启）
  众所周知修改DNS需要配置/etc/resolv.conf在此文件中有两句注释

    Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
    DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
    大意是此文件不可编辑，修改后将被覆盖
    解决方案：
    修改/etc/network/interface

    vim /etc/network/interface
    dns-nameservers 10.10.10.26

重启电脑之后在/etc/resolv.conf中就会出现 nameserver 10.10.10.26 重启电脑或切换网络不会消失

## 四、公网域名与内网域名冲突，公网域名被内网域名劫持  

问题描述：  
  公网域名：www.baidu.com  
  内网域名：course.baidu.com  
配置了dns之后，www.baidu.com就不能访问了；  

解决：  
1. 在baidu.com中添加A 记录
```ruby
   ;
   ; BIND data file for local loopback interface
   ;
   $TTL    604800
   @       IN      SOA     baidu.com. root.baidu.com. (
                                   2       ;Serial
                                   604800  ;Refresh
                                   86400   ;Retry
                                   2419200 ;Exrire
                                   604800 );Negative Cache TTL
   ;
   @       IN      NS      baidu.com.
   @       IN      A       10.10.10.26

   course      IN      A       10.10.10.27
   www    IN      A       123.125.114.144
```
> 对于像www.baidu.com中有很多IP，需配置多个对应关系

2.添加baidu.com.local本地域配置文件
```ruby
   ;
   ; BIND data file for local loopback interface
   ;
   $TTL    604800
   @       IN      SOA     baidu.com. root.baidu.com. (
                                   2       ;Serial
                                   604800  ;Refresh
                                   86400   ;Retry
                                   2419200 ;Exrire
                                   604800 );Negative Cache TTL
   ;
   @       IN      NS      baidu.com.
   @       IN      A       10.10.10.26

   course      IN      A       10.10.10.27
```

## 五、常用DNS记录说明  
 
1. A记录(主机记录)  
> DNS解析记录的基础,许多记录(象别名记录,NS记录等等)都依赖于他,并且A记录还可用作简易的负载均衡.  
 
2. NS和SOA记录
> NS记录(描述域名服务器,指明区域中有几个DNS服务器)  
> SOA记录(起始授权记录,用于描述区域中的主DNS服务器)  
 
3. Cname记录  
> 别名记录,用于给已存在的解析记录起别名用  
 
4. MX记录  
> 邮件交换器,用于邮件服务的记录  
 
5. SRV记录  
> 服务器位置记录(作用是指明区域内的 XXX 计算机提供 XXX 服务)  

