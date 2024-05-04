## CentOS 7 部署安装guacamole-server

服务端为 guacamole-server，为c语言编写的服务。 

命令部署方式：

1、编译 guacamole-server 需要安装如下依赖：

sudo yum install cairo-devel libjpeg-turbo-devel libpng-devel libtool uuid-devel

2、安装可选依赖，根据要求安装

(1)提供视频转换功能：    sudo yum install ffmpeg-devel

(2)rdp支持，RDP支持需要FreeRDP 2.0.0或更高版：sudo yum install freerdp-devel

(3)基于终端 ssh、telnet的支持：sudo yum install pango-devel

(4)构建ssh的支持：sudo yum install libssh2-devel

(5)构建telnet支持：sudo yum install libtelnet-devel

(6)构建vnc支持：sudo yum install libvncserver-devel

(7)构建Kubernetes支持： sudo yum install libwebsockets-devel

(8)VNC的实验性音频支持：sudo yum install pulseaudio-libs-devel

(9)加密的支持：sudo yum install openssl-devel

(10)对声音进行压缩：sudo yum install libvorbis-devel

* 手动编译安装；

    * 准备编译环境：  
yum install -y gcc-c++ cairo-devel libjpeg-turbo-devel libpng-devel uuid-devel freerdp-devel pango-devel libssh2-devel libtelnet libtelnet-devel libvncserver-devel pulseaudio-libs-devel openssl-devel libvorbis-devel libwebp-devel

    * 下载guacamole-server源码包：  
wget http://apache.org/dyn/closer.cgi?action=download&filename=guacamole/0.9.13-incubating/source/guacamole-server-0.9.13-incubating.tar.gz

    * 解压并变编译guacamole-server：  
tar zxf guacamole-server-0.9.13-incubating.tar.gz  
cd guacamole-server-0.9.13-incubating  
./configure --with-init-dir=/etc/init.d  
make  
make install  
ldconfig  

    * 启动：  
/etc/init.d/guacd start

    * 设置开机启动：  
chkconfig --add guacd  
chkconfig guacd on  


* 通过yum安装guacd服务;  
    * rpm -Uvh http://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm  

    * 如果能够上网执行： `yum install -y guacd libguac libguac-client-vnc`

    * 如果不能上网请准备如下安装包：guacd/

    * 找包方法：找一台能上网的CentOS7安装yum-utils,然后执行`yum install guacd libguac libguac-client-vnc --downloadonly --downloaddir=.`下载相关依赖包

    * 关闭防火墙：  
systemctl stop firewalld.service  
systemctl enable firewalld.service  
或设置防火墙规则  
firewall-cmd --zone=public --add-port=4822/tcp --permanent  
firewall-cmd --reload 

    * 启动     
systemctl start guacd.service  
systemctl enable guacd.service  
启动后端口显示：127.0.0.1:4822  
设置：echo OPTS="-b 0.0.0.0 -l 4822" > /etc/sysconfig/guacd  
启动后端口显示：0.0.0.0:4822  

```
guacd/
├── cairo-1.14.8-2.el7.x86_64.rpm
├── dbus-1.10.24-7.el7.x86_64.rpm
├── dbus-libs-1.10.24-7.el7.x86_64.rpm
├── flac-libs-1.3.0-5.el7_1.x86_64.rpm
├── fontconfig-2.10.95-11.el7.x86_64.rpm
├── fontpackages-filesystem-1.44-8.el7.noarch.rpm
├── gnutls-3.3.26-9.el7.x86_64.rpm
├── gsm-1.0.13-11.el7.x86_64.rpm
├── guacd-0.9.13-1.el7.x86_64.rpm
├── libasyncns-0.8-7.el7.x86_64.rpm
├── libdrm-2.4.83-2.el7.x86_64.rpm
├── libguac-0.9.13-1.el7.x86_64.rpm
├── libguac-client-vnc-0.9.13-1.el7.x86_64.rpm
├── libICE-1.0.9-9.el7.x86_64.rpm
├── libjpeg-turbo-1.2.90-5.el7.x86_64.rpm
├── libogg-1.3.0-7.el7.x86_64.rpm
├── libpng-1.5.13-7.el7_2.x86_64.rpm
├── libSM-1.2.2-2.el7.x86_64.rpm
├── libsndfile-1.0.25-10.el7.x86_64.rpm
├── libvncserver-0.9.9-12.el7_5.x86_64.rpm
├── libvorbis-1.3.3-8.el7.1.x86_64.rpm
├── libwayland-client-1.14.0-2.el7.x86_64.rpm
├── libwayland-server-1.14.0-2.el7.x86_64.rpm
├── libwebp-0.3.0-7.el7.x86_64.rpm
├── libX11-1.6.5-1.el7.x86_64.rpm
├── libX11-common-1.6.5-1.el7.noarch.rpm
├── libXau-1.0.8-2.1.el7.x86_64.rpm
├── libxcb-1.12-1.el7.x86_64.rpm
├── libXdamage-1.1.4-4.1.el7.x86_64.rpm
├── libXext-1.3.3-3.el7.x86_64.rpm
├── libXfixes-5.0.3-1.el7.x86_64.rpm
├── libXi-1.7.9-1.el7.x86_64.rpm
├── libXrender-0.9.10-1.el7.x86_64.rpm
├── libxshmfence-1.2-1.el7.x86_64.rpm
├── libXtst-1.2.3-1.el7.x86_64.rpm
├── libXxf86vm-1.1.4-1.el7.x86_64.rpm
├── lyx-fonts-2.2.3-1.el7.noarch.rpm
├── lzo-minilzo-2.06-8.el7.x86_64.rpm
├── mesa-libEGL-17.2.3-8.20171019.el7.x86_64.rpm
├── mesa-libgbm-17.2.3-8.20171019.el7.x86_64.rpm
├── mesa-libGL-17.2.3-8.20171019.el7.x86_64.rpm
├── mesa-libglapi-17.2.3-8.20171019.el7.x86_64.rpm
├── nettle-2.7.1-8.el7.x86_64.rpm
├── pixman-0.34.0-1.el7.x86_64.rpm
├── pulseaudio-libs-10.0-5.el7.x86_64.rpm
├── trousers-0.3.14-2.el7.x86_64.rpm
└── uuid-1.6.2-26.el7.x86_64.rpm

```
    
