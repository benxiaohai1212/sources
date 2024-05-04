# tomcat 设置 service

## 配置TOMCAT Service

### 添加环境变量

touch $TOMCAT_HOME/bin/setenv.sh
```
# 添加环境变量
export JAVA_HOME=$JAVA_HOME
export CATALINA_HOME=$TOMCAT_HOME
export CATALINA_BASE=$TOMCAT_HOME
# 添加TOMCAT PID
CATALINA_PID=$TOMCAT_HOME/tomcat.pid
# 添加 JAVA 参数
JAVA_OPTS='-server -XX:PermSize=256M -XX:MaxPermSize=1024m -Xms512M -Xmx1024M -XX:MaxNewSize=256m'
```
### 赋权
```
chmod +x $TOMCAT_HOME/bin/setenv.sh
```

### 添加服务

touch /usr/lib/systemd/system/tomcat.service
```
[Unit]
Description=Tomcat
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
Environment="JAVA_HOME=$JAVA_HOME"
PIDFile=$TOMCAT_HOME/tomcat.pid
ExecStart=$TOMCAT_HOME/bin/startup.sh
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### 设置开机启动
```
systemctl daemon-reload  # 识别TOMCAT Service
systemctl enable tomcat  # 开机启动
```

### 使用
```
systemctl (start | stop | restart | status) tomcat[.service]
```

## 设置系统初始化

/etc/init.d目录下创建tomcat文件

```
#!/bin/bash 
# This is the init script for starting up the 
# Jakarta Tomcat server 
# 
# chkconfig: 345 91 10 
# description: Starts and stops the Tomcat daemon. 
# 

# Source function library. 
. /etc/rc.d/init.d/functions 

# Get config. 
. /etc/sysconfig/network 

# Check that networking is up. 
[ "${NETWORKING}" = "no" ] && exit 0 

export JAVA_HOME=$JAVA_HOME         #自己的jdk安装目录
TOMHAT_HOME=$TOMHAT_HOME            #自己的tomcat安装目录
startup=$TOMHAT_HOME/bin/startup.sh 
shutdown=$TOMHAT_HOME/bin/shutdown.sh 

start(){ 
  echo -n "Starting Tomcat service:" 
  cd $tomcat_home 
  $startup 
  echo "tomcat is succeessfully started up" 
} 

stop(){ 
  echo -n "Shutting down tomcat: " 
  cd $tomcat_home 
  $shutdown 
  echo "tomcat is succeessfully shut down." 
} 

status(){ 
  numproc=`ps -ef | grep catalina | grep -v "grep catalina" | wc -l` 
  if [ $numproc -gt 0 ]; then 
    echo "Tomcat is running..." 
  else 
    echo "Tomcat is stopped..." 
  fi 
} 

restart(){ 
  stop 
  start 
}  
# See how we were called. 
case "$1" in 
start) 
  start 
  ;; 
stop) 
  stop 
  ;; 
status) 
  status 
  ;; 
restart) 
  restart 
  ;; 
*) 
  echo $"Usage: $0 {start|stop|status|restart}" 
  exit 1 
esac
```

### 赋可执行权限
```
chmod +x /etc/init.d/tomcat
```

### 将文件加入到服务队列中
```
chkconfig add tomcat
```

### 设置服务开机自启动
```
chkconfig tomcat on
```

### 使用
```
/etc/init.d/tomcat (start | stop | restart | status)
```