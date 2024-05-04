## tomcat设置开机自启动

### 一、centos设置tomcat开机自启动
 今天设置tomcat自动启动，服务器是centos;我做了如下步骤：
 
 * 1、写一个脚本 autoAPI.sh
```bash
#!/bin/bash

/usr/local/tomcat/bin/startup.sh

```

 * 2、为 autoAPI.sh 赋可执行权限
```bash
chmod a+x autoAPI.sh
```

 * 3、在网上找了点资料
   一、添加开机自启服务
   在centos7中添加开机自启服务非常方便，只需要两条命令(以Jenkins为例)：
   ```sh
     systemctl enable jenkins.service #设置jenkins服务为自启动服务
     sysstemctl start  jenkins.service #启动jenkins服务
   ```
   二、添加开机自启脚本

   在centos7中增加脚本有两种常用的方法，以脚本autostart.sh为例：
   ```sh	
     #!/bin/bash
     #description:开机自启脚本
     /usr/local/tomcat/bin/startup.sh  #启动tomcat
   ```
   方法一

   a、赋予脚本可执行权限（/opt/script/autostart.sh是你的脚本路径）
   ```bash	
      chmod +x /opt/script/autostart.sh
   ```
   b、打开/etc/rc.d/rc/local文件，在末尾增加如下内容
   ```bash
      /opt/script/autostart.sh
   ```
   c、在centos7中，/etc/rc.d/rc.local的权限被降低了，所以需要执行如下命令赋予其可执行权限
   ```bash
      chmod +x /etc/rc.d/rc.local
   ```
   方法二
   I、将脚本移动到/etc/rc.d/init.d目录下
   ```bash
      mv  /opt/script/autostart.sh /etc/rc.d/init.d
   ```
   II、增加脚本的可执行权限
   ```bash	
      chmod +x  /etc/rc.d/init.d/autostart.sh
   ```
   III、添加脚本到开机自动启动项目中
   ```bash	
      cd /etc/rc.d/init.d
      chkconfig --add autostart.sh
      chkconfig autostart.sh on
   ```
  * 4、按照3步操作报错
  ```bash
[root@host-10-1-27-99 init.d]# chkconfig --add autoAPI.sh 
service autoAPI.sh does not support chkconfig
  ```
   * 5、解决4步的错误,编辑autoAPI.sh
```bash
#!/bin/bash

# chkconfig: - 85 15
# description: nginx is a World Wide Web server. It is used to serve
   
/usr/local/tomcat/bin/startup.sh
```
 * 6、查看开机自启动列表
```bash
[root@host-10-1-27-99 init.d]# chkconfig autoAPI.sh on
[root@host-10-1-27-99 init.d]# chkconfig --list

Note: This output shows SysV services only and does not include native
      systemd services. SysV configuration data might be overridden by native
      systemd configuration.

      If you want to list systemd services use 'systemctl list-unit-files'.
      To see services enabled on particular target use
      'systemctl list-dependencies [target]'.

autoAPI.sh     	0:off	1:off	2:on	3:on	4:on	5:on	6:off

```
### 二、centos7 设置tomcat开机自启动

1. 在tomcat/bin 目录下面，增加setenv.sh配置，catalina.sh启动的时候会调用，同时配置java内存参数  
`vim setenv.sh`
```
#tomcat启动pid

export JAVA_HOME=/opt/jdk8
export CATALINA_HOME=/opt/tomcat8
export CATALINA_BASE=/opt/tomcat8
#add tomcat pid
CATALINA_PID="$CATALINA_BASE/tomcat.pid"
#add java opts
JAVA_OPTS="-server -XX:PermSize=256M -XX:MaxPermSize=1024m -Xms512M -Xmx1024M -XX:MaxNewSize=256m"
```

2. 增加tomcat.service在/usr/lib/systemd/system目录下增加tomcat.service，目录必须是绝对目录  
`vim /usr/lib/systemd/system/tomcat.service`
```
[Unit]
Description=Tomcat
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/opt/tomcat8/tomcat.pid
ExecStart=/opt/tomcat8/bin/startup.sh
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
> [unit]配置了服务的描述，规定了在network启动之后执行，  
> [service]配置服务的pid，服务的启动，停止，重启  
> [install]配置了使用用户  

3.使用tomcat.service
```
systemctl enable tomcat.service
systemctl start tomcat.service
systemctl stop tomcat.service
systemctl restart tomcat.service
```
> 因为配置pid，在启动的时候会在tomcat的根目录下生产tomcat.pid文件，停止后删除

### 三、ubuntu设置tomcat开机自启动

#### 方法一：
```bash
  vi /etc/rc.local  
```
添加如下一行
```bash
  /usr/local/tomcat/bin/startup.sh  
```
（脚本绝对路径）
注意：要添加在exit 0上边，reboot试试。

#### 方法二：

1、安装 sysv-rc-conf
```bash
    apt-get install sysv-rc-conf  
```

2、 在 /etc/ini.d/ 目录下，
2.1 新建文件：
```bash
    touch tomcatStart  
```

2.2 编辑脚本：
```bash
    vi /etc/init.d/tomcatStart  
```
```bash
TOMCAT_HOME="/opt/tomcat/bin"    
export JAVA_HOME=/opt/jdk1.8    
echo "$ --- 1 =  $1"    
case $1 in    
    startup)    
        sh $TOMCAT_HOME/startup.sh    
        ;;    
    shutdown)    
        sh $TOMCAT_HOME/shutdown.sh    
        ;;    
    restart)    
        sh $TOMCAT_HOME/shutdown.sh    
        sh $TOMCAT_HOME/startup.sh    
        ;;    
    *)    
        sh $TOMCAT_HOME/startup.sh    
        ;;    
esac    
exit 0
   
```

2.3 添加执行权限
```bash
    chmod +x tomcatStart  
```

3、 启动tomcatStart
```bash
    sysv-rc-conf tomcatStart on  
```

4、若取消 tomcatControl自动启动服务，输入：
```bash
    sysv-rc-conf tomcatStart off  
```
