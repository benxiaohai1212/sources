### shell获得URL访问结果
```
URL="http://www.baidu.com/"
httpOK=`curl --head --silent $URL | awk 'NR==1{print $2}'`
echo $httpOK
```

### 获得本机IP
```
IP=`/sbin/ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:"`
echo $IP

IP=$(ip a | grep inet | grep -v 127.0.*.* | grep -v 172.*.*.* | grep -v 10.*.*.* | grep -v inet6 | awk '{print $2}' | cut -d "/" -f 1)
echo $IP
```

### 获得进程号(deploy为脚本名称)
```
deployPID=`ps -ef | grep "deploy" | grep -v grep | awk '{print $2}'`
echo $deployPID
```

### 获取字符串所在行号
```
grep -n "/usr/local/nginx/sbin/nginx" /etc/rc.local | cut -d ":" -f 1
sed -i $lines'acharacter-set-server=utf8' /etc/my.cnf   ### 当前行号后插入

```

### Linux定时任务crontab 
![crontab -e 时间设置图](https://gitee.com/uploads/images/2018/0202/093220_9c15d74e_132614.png "08090352-4e0aa3fe4f404b3491df384758229be1.png")

### MySQL shell 操作MySQL命令不显示Warning

1. vim ~/.my.cnf
2. 添加内容：
```
[client]
user=you_user
password=you_password
```
3. 注意设置这个文件的文件权限
`chmod 400 ~/.my.cnf`
4. mysql --defaults-file=~/.my.cnf

