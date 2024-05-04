## CentOS 7配置DNS

名词解析：

FQDN：Fully Qualified Domain Name，完全合格域名，是指主机名加上全路径，例如ns1.baidu.com.

SOA：Start of Authority，起始授权记录，用于设置该域的序列号、刷新时间、过期时间等信息，在定义每个域时SOA只能定义一条，而且必须在起始位置定义。

NS：Name Server，域名服务器记录，作用是定义创建的新域是由哪个DNS服务器来负责解析。

MX：Mail eXchanger，邮件交换记录，指向的是一个邮件服务器，用来当发邮件的时候，根据收件人的地址后缀来定位邮件服务器，说白了就是让邮件服务器知道应该把这封邮件发到哪里去。

需要注意一点的是定义MX记录时因为@符号在DNS服务器配置中有特殊的含义，表示当前定义的域的域名。所以在定义邮件服务器时需要将@写为“.”号来代替，定义格式示例：mail1  IN  MX 10  mail1.baidu.com. 。

A：用来指定完全合格域（FQDN）名对应的IP记录，可以通过此设置改域名下，指定用户自己的WEB服务器地址，示例：www.baidu.com.  IN  A  172.16.81.250  （注：此仅做演示，baidu.com.表示自己定义的区域名，并非真实的域名）。

CNAME：别名记录，这种记录允许将多个名字映射到同一台计算机，示例：ftp   IN   CNAME   www    （注：此处是省略了域名的写法，可以在区域开头位置定义域名$ORIGIN  baidu.com.  再次强调域名后边的“.”不可以省略）。

PTR：反向域名解析，即将IP地址转换为FQDN，此记录一般定义在反向域名解析中在定义反向区域时，区域的名称一般是取IP地址的网络地址然后反写组成，示例：原来IP地址为172.16.81.250，定义

$ORIGIN 81.16.172.

250     IN         PTR         www.baidu.com.

TTL：Time To Live ，生存时间，表示DNS记录在DNS服务器上的缓存时间，时间越长对于服务器的压力越小，时间越短表示服务器需要重新查询并生成缓存的频率越高，压力越大。

*：泛域名解析，用于指定域名下所有未创建域名记录同一定位到指定主机中，示例   

*  IN   CNAME    www  #为所有未创建的域名记录定义一个别名指向www主机。
在centos系统下实现域名服务器通常是使用bind工具来完成DNS的功能，下边开始进行bind的安装与配置。

权限访问列表acl，在主配置文件/etc/named.conf起始位置设置

acl mynet{
      172.16.100.10;
      172.16.100.11;
      10.20.30.0/24;     #定义IP段
    };
    需要定义全局控制的则在/etc/named.conf中设置
    allow-query { mynet; };    #只允许指定列表中的主机来查询
    allow-recursion { mynet; };  #只允许指定列表中的主机来递归查询
    allow-transfer { mynet; };   #只允许指定列表中的主机进行区域传送
    allow-update { mynet; };    #只允许指定列表中的主机进行区域更新，此功能非常危险，应该设置为none，即不允许任何主机更新区域解析库，而由管理员来手动生成解析库文件。

1、安装软件：  
yum install -y bind*

2、启动DNS服务：  
systemctl restart named.service

3、查看named进程是否正常启动：`ps -eaf | grep named`  
![ps -eaf | grep named](https://gitee.com/uploads/images/2018/0619/154932_2501a94a_132614.png "20180619-001.png")

4、DNS采用的UDP协议，监听53号端口，进一步检验named工作是否正常：`netstat -an | grep :53`   
![netstat -an | grep :53](https://gitee.com/uploads/images/2018/0619/155056_5a5193cd_132614.png "20180619-002.png")

5、防火墙开放TCP和UDP的53端口：  
`firewall-cmd --zone=public --port=53/tcp --port=53/udp --permanent`

6、DNS服务的相关配置文件  

`rpm -ql bind`
```
/etc/NetworkManager/dispatcher.d/13-named
/etc/logrotate.d/named
/etc/named   
/etc/named.conf    #bind主配置文件
/etc/named.iscdlv.key
/etc/named.rfc1912.zones    #定义zone的文件
/etc/named.root.key
/etc/portreserve/named
/etc/rc.d/init.d/named    #bind脚本文件
/etc/rndc.conf    #rndc配置文件
/etc/rndc.key
/etc/sysconfig/named
/usr/lib64/bind
/usr/sbin/arpaname
/usr/sbin/ddns-confgen
/usr/sbin/dnssec-dsfromkey
/usr/sbin/dnssec-keyfromlabel
/usr/sbin/dnssec-keygen
/usr/sbin/dnssec-revoke
/usr/sbin/dnssec-settime
/usr/sbin/dnssec-signzone
/usr/sbin/genrandom
/usr/sbin/isc-hmac-fixup
/usr/sbin/lwresd
/usr/sbin/named
/usr/sbin/named-checkconf    #检测/etc/named.conf文件语法
/usr/sbin/named-checkzone    #检测zone和对应zone文件的语法
/usr/sbin/named-compilezone
/usr/sbin/named-journalprint
/usr/sbin/nsec3hash
/usr/sbin/rndc    #远程dns管理工具
/usr/sbin/rndc-confgen    #生成rndc密钥
/var/log/named.log
/var/named
/var/named/data
/var/named/dynamic
/var/named/named.ca    #根解析库
/var/named/named.empty
/var/named/named.localhost    #本地主机解析库
/var/named/named.loopback   
/var/named/slaves    #从文件夹
/var/run/named
```
编辑bind主配置文件/etc/named.conf  
```
// named.conf//
// Provided by Red Hat bind package to configure the ISC BIND named(8) DNS
// server as a caching only nameserver (as a localhost DNS resolver only).//
// See /usr/share/doc/bind*/sample/ for example named configuration files.// 
options {
    listen-on port 53 { 127.0.0.1; };
    listen-on-v6 port 53 { ::1; };
    directory "/var/named";                                  //指明存放区域文件根目录，下面给出的相对路径都是相对此目录
    dump-file "/var/named/data/cache_dump.db"; 
    statistics-file "/var/named/data/named_stats.txt";
    memstatistics-file "/var/named/data/named_mem_stats.txt";
    allow-query     { localhost; };                          //允许哪些主机查询      将localhost改为any
    recursion yes;                                           //是否允许递归查询 
    dnssec-enable yes;
    dnssec-validation yes;
    dnssec-lookaside auto; 
    /* Path to ISC DLV key */
    bindkeys-file "/etc/named.iscdlv.key"; 
    managed-keys-directory "/var/named/dynamic";
}; 
logging {                                                    //定义日志       
    channel default_debug {               
        file "data/named.run";               
        severity dynamic;       
    };
}; 
zone "." IN {                                                //定义根区域文件名称 
    type hint;file "named.ca";                               //使用的是相对路径，默认存放在/var/named/named.ca 
};
//把另外两个文件也包含进来，作为主配置文件的一部分
include "/etc/named.rfc1912.zones";                          //定义区域配置文件
include "/etc/named.root.key";                               //根区域的key文件，与事务签名相关

通过修改listen-on port 53 {}来修改需要监听的服务器IP地址；

allow-query {}修改为any则所有主机均可以通过该DNS服务器来查询；

将dnssec开头的参数全部注释掉后保存配置，一个缓存服务器就创建完成。

下边再来创建新的DNS服务器，创建自定义的区域则要在/etc/named.rfc-1912.zone中添加新的区域，然后在/var/named/ZONE_NAME.zone添加区域解析库。

#示例：创建example.com.域
   ~]# vim /etc/named.rfc-1912.zone   #编辑配置文件 （正向解析配置）

zone "example.com" IN {
	type	master;
	file	"named.example.com";
	allow-update { none; };
};
zone "0.240.168.192.in-addr.arpa" IN {            （反向解析配置）
	type	master;
	file	"named.example.com.rev";
	allow-update { none; };
};

    保存退出

   ~]# cp /var/named/named.localhost /var/named/named.example.com
   ~]# vim /var/named/named.example.com   #编辑域配置文件 （正向解析配置）

$TTL 1D
@	IN SOA	@ example.com. (
					0	; serial
					1D	; refresh
					1H	; retry
					1W	; expire
					3H )	; minimum
	NS	@
	A	127.0.0.1
	AAAA	::1
master	IN	A	192.168.240.117
node1	IN	A	192.168.240.118
node2	IN	A	192.168.240.119

    保存退出

   ~]# cp /var/named/named.loopback /var/named/named.example.com.rev
   ~]# vim /var/named/named.example.com.rev   #编辑域配置文件 （反向解析配置）

$TTL 1D
@	IN SOA	@ example.com. (
					0	; serial
					1D	; refresh
					1H	; retry
					1W	; expire
					3H )	; minimum
	NS	@
	A	127.0.0.1
	AAAA	::1
;	PTR	localhost.
117	IN	PTR	master.
118	IN	PTR	node1.
119	IN	PTR	node2.

    保存退出

配置DNS:  
分别修改 master 、 node1 、 node2 三台机器的域名配置文件：vim /etc/resolv.conf
加入： nameserver 配置dns主机的IP

```

7、检验：   
named-checkconf    #验证语法
rndc reload       #重读配置

`nslookup master.example.com`  
![nslookup master.example.com](https://gitee.com/uploads/images/2018/0619/164102_56987353_132614.png "20180619-003.png")

`nslookup 192.168.240.117`  
![nslookup 192.168.240.117](https://gitee.com/uploads/images/2018/0619/164123_6d27c620_132614.png "20180619-004.png")
