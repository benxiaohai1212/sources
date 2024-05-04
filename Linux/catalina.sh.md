```
#!/usr/bin/env bash
#脚本与jar包放在同一目录下
#可替换为你自己的执行程序，其他代码无需更改
##
# 需要两个参数
# param1: [start|stop|restart|status]
# param2: [dev|test|prod]
# sh catalina.sh restart prod
##
APP='SWAN-ADP'

STATE=${1}
PROFILES=${2:-dev}
PORT=${3:-8080}

if [ -z "${STATE}" ]; then
    echo "Usage: sh catalina.sh (start|stop|restart|status) profiles[(dev),test,prod] port[(8080)]"
    exit 1
fi

NAME=$(ls . | grep '.jar' | cut -d '.' -f 1)

CLIENT_NAME="${NAME}.jar"

# -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=56m -Xms128m -Xmx128m -Xmn32m -Xss256k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC
# -XX:MetaspaceSize=128m （元空间默认大小）
# -XX:MaxMetaspaceSize=128m （元空间最大大小）
# -Xms1024m （堆最大大小）
# -Xmx1024m （堆默认大小）
# -Xmn256m （新生代大小）
# -Xss256k （棧最大深度大小）
# -XX:SurvivorRatio=8 （新生代分区比例 8:2）
# -XX:+UseConcMarkSweepGC （指定使用的垃圾收集器，这里使用CMS收集器）
# -XX:+PrintGCDetails （打印详细的GC日志）
#
# JDK8之后把-XX:PermSize 和 -XX:MaxPermGen移除了，取而代之的是
# -XX:MetaspaceSize=128m （元空间默认大小）
# -XX:MaxMetaspaceSize=128m （元空间最大大小）
#
JAVA_OPTS="-Dfile.encoding=UTF-8 -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -Xms128m -Xmx256m -Xmn32m -Xss256k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC "

SPRING_OPTS="--server.port=${PORT} --spring.profiles.active=${PROFILES}"

#使用说明，用来提示输入参数
usage() {
    echo "Usage: sh catalina.sh [start|stop|restart|status] profiles[(dev),test,prod] port[(8080)]"
    exit 1
}
java_has() {
  type "java" > /dev/null 2>&1
}
#检查程序是否在运行
is_exist(){
  PID=$(ps -ef | grep ${NAME} | grep -v grep | awk '{print $2}')
  #如果不存在返回1，存在返回0
  if [ -z "${PID}" ]; then
   return 1
  else
    return 0
  fi
}

#启动方法
start(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP} is already running. pid=${pid} ."
  else
    if [ java_has ]; then
        nohup java ${JAVA_OPTS} -jar ${CLIENT_NAME} ${SPRING_OPTS} > `echo "$APP" | awk '{print tolower($0)}'`.out 2>&1 &
        echo "${APP} running successfully";
        echo "See Log: tail -f `echo "$APP" | awk '{print tolower($0)}'`.out"
    else
        echo "java 环境不存在"
        exit 1
    fi
  fi
}

#停止方法
stop(){
  is_exist
  if [ $? -eq "0" ]; then
    kill -9 $PID
    echo "${APP} Closing successfully"
  else
    echo "${APP} is not running"
  fi
}

#输出运行状态
status(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} is running. Pid is ${pid}"
  else
    echo "${APP} is NOT running."
  fi
}

#重启
restart(){
  stop
  start
}

#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "${STATE}" in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  *)
    usage
    ;;
esac
```

redis启动参考：
```
case "$1" in  
    start)  
        if [ -f $PIDFILE ]  
        then  
            echo "$PIDFILE exists, process is already running or crashed." 
        else 
            echo "Starting Redis server..." 
            $EXEC $CONF  
        fi  
        if [ "$?"="0" ]  
        then  
            echo "Redis is running..." 
        fi  
        ;;  
    stop)  
        if [ ! -f $PIDFILE ]  
        then  
            echo "$PIDFILE exists, process is not running." 
        else 
            PID=$(cat $PIDFILE)  
            echo "Stopping..." 
            $REDIS_CLI -p $REDISPORT SHUTDOWN  
            sleep 2 
            while [ -x $PIDFILE ]  
            do 
                echo "Waiting for Redis to shutdown..." 
                sleep 1 
            done  
            echo "Redis stopped" 
        fi  
        ;;  
    restart|force-reload)  
        ${0} stop  
        ${0} start  
        ;;  
    *)  
        echo "Usage: /etc/init.d/redis {start|stop|restart|force-reload}" >&2 
        exit 1 
esac
```