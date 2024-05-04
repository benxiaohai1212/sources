## ansible
### firewalld模块用于在防火墙中添加或删除服务和端口
#### firewalld模块常用参数
```
• state：必须参数，指定防火墙策略状态，enable表示策略生效，disable表示策略禁用，present表示新建策略，absent表示删除策略
• service：向防火墙添加/删除的服务名称，该服务必须在firewall-cmd --get-services可以查询到
• port：要从防火墙添加或删除端口或端口范围，必须以端口/协议，端口范围/协议的形式书写
• permanent：保存策略，在下次启动时自动加载
• immediate：配置永久策略后立即生效
• interface：添加/删除 出入防火墙的接口
• offline：脱机状态运行防火墙
• zone：添加/删除防火墙区域，有如下区域可供配置
○ drop: 丢弃所有进入的包，而不给出任何响应
○ block: 拒绝所有外部发起的连接，允许内部发起的连接
○ public: 允许指定的进入连接
○ external: 同上，对伪装的进入连接，一般用于路由转发
○ dmz: 允许受限制的进入连接
○ work: 允许受信任的计算机被限制的进入连接，类似 workgroup
○ home: 同上，类似 homegroup
○ internal: 同上，范围针对所有互联网用户
○ trusted: 信任所有连接
• source：指定从防火墙添加/删除的网段
• timeout：非永久性规则的生效时间
```
#### firewalld模块示例
1. 放行httpd服务，立即生效，重启后依然生效
```
- name: http
  firewalld:
    service: http
    state: enabled
    permanent: yes
    immediate: yes
```
2. 放行82端口，立即生效，重启后依然生效
```
- name: http-82
  firewalld:
    port: 82/tcp
    state: enabled
    permanent: yes
    immediate: yes
```
参考：`ansible-doc firewalld`


## 基本操作

### 1. firewalld的基本使用

* 启动： `systemctl start firewalld.service`
* 查看状态： `systemctl status firewalld.service`
* 停止： `systemctl disable firewalld.service`
* 禁用： `systemctl stop firewalld.service`

### 2. systemctl是CentOS7的服务管理工具中主要的工具，它融合之前service和chkconfig的功能于一体。

* 启动一个服务：`systemctl start firewalld.service`
* 关闭一个服务：`systemctlstop firewalld.service`
* 重启一个服务：`systemctl restart firewalld.service`
* 显示一个服务的状态：`systemctl status firewalld.service`
* 在开机时启用一个服务：`systemctl enable firewalld.service`
* 在开机时禁用一个服务：`systemctl disable firewalld.service`
* 查看服务是否开机启动：`systemctl is-enabled firewalld.service`
* 查看已启动的服务列表：`systemctl list-unit-files|grep enabled`
* 查看启动失败的服务列表：`systemctl --failed`

### 3.配置firewalld-cmd

* 查看版本：         `firewall-cmd --version`
* 查看帮助：         `firewall-cmd --help`
* 显示状态：         `firewall-cmd --state`
* 查看所有打开的端口： `firewall-cmd --zone=public --list-ports`
* 更新防火墙规则：     `firewall-cmd --reload`
* 查看区域信息:        `firewall-cmd --get-active-zones`
* 查看指定接口所属区域： `firewall-cmd --get-zone-of-interface=eth0`
* 拒绝所有包：         `firewall-cmd --panic-on`
* 取消拒绝状态：        `firewall-cmd --panic-off`
* 查看是否拒绝：         `firewall-cmd --query-panic`

#### 添加:   
> firewall-cmd --zone=public --add-port=80/tcp --permanent   （--permanent永久生效，没有此参数重启后失效）  

#### 查看：
> firewall-cmd --zone=public --query-port=80/tcp

#### 删除:   
> firewall-cmd --zone=public --remove-port=80/tcp --permanent  

#### 查看当前开了哪些端口：其实一个服务对应一个端口，每个服务对应/usr/lib/firewalld/services下面一个xml文件。   
> firewall-cmd --list-services

#### 查看还有哪些服务可以打开：  
> firewall-cmd --get-services

#### 查看所有打开的端口：   
> firewall-cmd --zone=public --list-ports

#### 重新载入:
> firewall-cmd --reload

#### 端口转发,8080转到80
```
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080
firewall-cmd --reload
```