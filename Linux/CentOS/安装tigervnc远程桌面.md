## CentOS7 安装配置远程桌面服务

  
1、准备软件：  

* fltk-1.3.0-13.el7.x86_64.rpm  
* tigernvc-icons-1.3.1-9-el7.noarch.rpm  
* tigernvc-license-1.3.1-9-el7.noarch.rpm  
* tigernvc-1.3.1-9-el7.x86_64.rpm  
* tigernvc-server-1.3.1-9.el7.x86_64.rpm  

2、安装软件：  

rpm -ivh 安装准备软件顺序安装  
或者  
yum -y install tigervnc tigervnc-server 

3、设置VNC密码:  

通过ssh，用oracle用户名登录到服务器，执行下面命令: `vncserver`  

终端会提示你输入密码，如下:
```
You will require a password to access your desktops.
Password:
Verify:
xauth:  file /home/oracle/.Xauthority does not exist

New 'localhost.localdomain:1 (oracle)' desktop is localhost.localdomain:1

Creating default startup script /home/oracle/.vnc/xstartup
Starting applications specified in /home/oracle/.vnc/xstartup
Log file is /home/oracle/.vnc/localhost.localdomain:1.log
```
如果想修改密码，可以使用vncpasswd。现在已经有一个vnc服务在运行了，但我们需要使用刚刚配置的服务来启动，所以我们需要先杀死刚刚的vnc服务，使用下面命令。  
`vncserver -kill :1`  

4、配置VNC Service  

`sudo cp /lib/systemd/system/vncserver@.service /etc/systemd/system/vncserver@:1.service`

接下来修改该配置文件

`sudo vim /etc/systemd/system/vncserver@:1.service`

将其中<USER>替换为你想要的用户名，我这里是oracle，添加设置分辨率的参数-geometry 1280x720，所有内容如下:  

```
# The vncserver service unit file
#
# Quick HowTo:
# 1. Copy this file to /etc/systemd/system/vncserver@:<display>.service
# 2. Edit <USER> and vncserver parameters appropriately
#   ("runuser -l <USER> -c /usr/bin/vncserver %i -arg1 -arg2")
# 3. Run `systemctl daemon-reload`
# 4. Run `systemctl enable vncserver@:<display>.service`
#

[Unit]
Description=Remote desktop service (VNC)
After=syslog.target network.target

[Service]
Type=forking
# Clean any existing files in /tmp/.X11-unix environment
ExecStartPre=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'
ExecStart=/sbin/runuser -l oracle -c "/usr/bin/vncserver %i -geometry 1280x720" 
PIDFile=/home/oracle/.vnc/%H%i.pid
ExecStop=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'

[Install]
WantedBy=multi-user.target
```
保存文件并退出vim，重新加载配置: `sudo systemctl daemon-reload`  

**注意：第三步和第四步中的localhost.localdomain:1.log 与 vncserver@:1.service中的1是相对应的。**
  
设置成开机启动：`systemctl enable vncserver@:1.service`

5、修改防火墙

首先判断firewalld是否启动，输入以下命令判断

`sudo firewall-cmd --state`

如果启动应该输出  
running  
如果是not running，执行下面命令

`sudo systemctl start firewalld`

添加端口号5901-5905

`sudo firewall-cmd --permanent --zone=public --add-port=5901-5905/tcp`

重新加载防火墙

`sudo firewall-cmd --reload`

可以使用下面命令查看端口号是否被加入

`firewall-cmd --list-all-zones`

6、启动关闭tigervnc-server

`vncserver :n` 启动vncserver

`vncserver -kill :n` 关闭vncserver

`vncserver -list` 查看启动的vncserver列表

6、安装配置tigervnc客户端  

[下载地址](http://sourceforge.net/projects/tigervnc/) 建议下载`VncViewer.jar`Window、Mac和Linux同时可用

`vncviewer localhost:n`客户端链接

VNC的默认端口是5900，而远程桌面连接端口则是5900+n（n是vncserver命令指定的）。如果使用“vncserver :1”命令启动VNC Server，那么下面的端口应该是5901。

`java -jar VncViewer.jar`

![输入图片说明](https://images.gitee.com/uploads/images/2018/0718/104906_ea7e2b65_132614.png "20180718-001.png")
