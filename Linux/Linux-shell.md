### CentOS 7.0默认使用的是firewall作为防火墙，使用iptables必须重新设置一下

1、直接关闭防火墙
```sh
systemctl stop firewalld.service #停止firewall
systemctl disable firewalld.service #禁止firewall开机启动
```
2、设置 iptables service
```sh
yum -y install iptables-services
```
如果要修改防火墙配置，如增加防火墙端口3306
```sh
vi /etc/sysconfig/iptables 
```
增加规则
```sh
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
```
保存退出后
```sh
systemctl restart iptables.service #重启防火墙使配置生效
systemctl enable iptables.service #设置防火墙开机启动
```
最后重启系统使设置生效即可

### Linux 下查看局域网内所有主机IP和MAC 
```sh
 用nmap对局域网扫描一遍，然后查看arp缓存表就可以知道局域内ip对应的mac了。nmap比较强大也可以直接扫描mac地址和端口。执行扫描之后就可以 cat/proc/net/arp查看arp缓存表了。

进行ping扫描，打印出对扫描做出响应的主机：　　
$ nmap -sP 192.168.1.0/24　　

仅列出指定网络上的每台主机，不发送任何报文到目标主机：　
$ nmap -sL 192.168.1.0/24　　

探测目标主机开放的端口，可以指定一个以逗号分隔的端口列表(如-PS22，23，25，80)：　　
$ nmap -PS 192.168.1.234　　

使用UDPping探测主机：
$ nmap -PU 192.168.1.0/24　　

使用频率最高的扫描选项（SYN扫描,又称为半开放扫描），它不打开一个完全的TCP连接，执行得很快：
$ nmap -sS 192.168.1.0/24
```

### 查询文件内字符串、替换文件内字符串
```text
grep, sed 在目录及递归子目录中的所有文件 查找并替换 字符串

查找： grep "要找的字符串" -rl 目录

替换： sed -i "s/要查找的字符串/替换字符串/g" `grep "要查找的字符串" -rl 目录`
```
例：
```sh
grep -r 'org.openstack4j' ./

sed -i "s/org.openstack4j/cn.com.ecloud/g" `grep "org.openstack4j" -rl ./`
```


### 查找文件，并将查找到的文件拷贝到指定目录
1、使用exec:
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 -exec cp {} /backups/ \;
```
cp后面的{}代表的就是find得到的结果，最后的\;好像是固定格式

2、使用xargs:
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 | xargs cp --target-directory=/backups/
```
--target-directory 指定服务到哪个目录
此方法会有个问题，就是如果目录有空格的话，就会无法复制，需要如下方式:

3、
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 -print | xargs -i echo '"{}"' | xargs cp --target-directory /backups/
```
### 单向无密钥配置

station213 -> station220：

1、输入命令： ssh-keygen 一路回车...
```sh
[root@station213 ~]# ssh-keygen   
Generating public/private rsa key pair.  
Enter file in which to save the key (/root/.ssh/id_rsa):   
/root/.ssh/id_rsa already exists.  
Overwrite (y/n)? 
```

2、查看生成文件： id_rsa  id_rsa.pub
```sh
[root@station213 ~]# cd ~/.ssh/  
[root@station213 .ssh]# ls  
id_rsa  id_rsa.pub  known_hosts 
```

3、拷贝文件：id_rsa.pub 到目标机器 station220，并改名为：authorized_keys
```sh
scp id_rsa.pub 192.168.101.220:~/.ssh/authorized_keys
```
### 多台机器间无密钥配置
举例如：station213 -> station220：
                station220 -> station213：
1、station213 -> station220：
```sh
[root@station213 .ssh]# ssh-copy-id -i id_rsa.pub root@192.168.101.220  
10  
Now try logging into the machine, with "ssh 'root@192.168.101.220'", and check in:  
  
  
  .ssh/authorized_keys  
  
  
to make sure we haven't added extra keys that you weren't expecting.  
  
  
[root@station213 .ssh]# ssh-copy-id -i id_rsa.pub root@192.168.101.220  
10  
root@192.168.101.220's password:   
Now try logging into the machine, with "ssh 'root@192.168.101.220'", and check in:  
  
  
  .ssh/authorized_keys  
  
  
to make sure we haven't added extra keys that you weren't expecting.  
  
  
[root@station213 .ssh]# ssh 192.168.101.220  
Last login: Fri Mar 22 11:30:05 2013 from 192.168.101.213  
```
2、station213 -> station221：同上
