# 安装inluxDB

[下载地址](https://dl.influxdata.com/influxdb/releases/influxdb-1.8.10.x86_64.rpm) `https://dl.influxdata.com/influxdb/releases/influxdb-1.8.10.x86_64.rpm`

## yum源
```
cat <<EOF | sudo tee /etc/yum.repos.d/influxdb.repo 
[influxdb] 
name = InfluxDB Repository - RHEL \$releasever 
baseurl = https://repos.influxdata.com/rhel/\$releasever/\$basearch/stable 
enabled = 1 
gpgcheck = 1 
gpgkey = https://repos.influxdata.com/influxdb.key 
EOF
```

## 安装
```
yum install influxdb
```
```
influx
show users     # 查看所有用户
show databases # 查看所有数据库
```
## 配置
配置文件influxdb.conf中，将auth-enabled项设置为true    
编辑
```
vim /etc/influxdb/influxdb.conf
```
修改
```
[http]
auth-enabled=true
```
重启
```
systemctl restart influxdb
```
## 创建用户并赋权
再次进入influx   
influx
```
#添加一个管理员用户
create user "root" with password 'root' with all privileges

#添加一个非管理员用户只赋read权
create user "abcuser" with password 'mypassword'
grant write on "mydb" to "abcuser"


#查看abcuser的权限
show grants for mydb

#查看所有用户
SHOW USERS;
user   admin
----   -----
root   true
abcuser false

退出
exit
```
```
influxdb中使用用户名密码登录
influx -username  root -password mypassword
```

