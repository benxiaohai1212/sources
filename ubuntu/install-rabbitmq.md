### Download deb
[.deb for Debian-based Linux (from Bintray)](https://bintray.com/rabbitmq/rabbitmq-server-deb/download_file?file_path=rabbitmq-server_3.6.10-1_all.deb)

[.deb for Debian-based Linux (from GitHub)](https://github.com/rabbitmq/rabbitmq-server/releases/download/rabbitmq_v3_6_10/rabbitmq-server_3.6.10-1_all.deb)

### APT repositories
Using rabbitmq.com APT Repository
Execute the following command to add the APT repository to your /etc/apt/sources.list.d:
```sh
echo 'deb http://www.rabbitmq.com/debian/ testing main' |
     sudo tee /etc/apt/sources.list.d/rabbitmq.list
```

add our public key to your trusted key list 
```sh
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc |
     sudo apt-key add -
```

Run the following command to update the package list
```sh
sudo apt-get update
```

Install rabbitmq-server package:
```sh
sudo apt-get install rabbitmq-server
```

Start the Server
```sh
service rabbitmq-server start[stop,restart]
```

The management plugin is included in the RabbitMQ distribution. To enable it, use rabbitmq-plugins:
```sh
rabbitmq-plugins enable rabbitmq_management
```

创建用户：
```sh
rabbitmqctl add_user <username> <password>
```
设置用户角色：
```sh
rabbitmqctl set_user_tags <username> <rolename>[administrator(超级管理员),monitoring(监控者),policymaker(策略制定者),management(普通管理者,无法看到节点信息，也无法对策略进行管理)]
```
设置用户权限
```sh
rabbitmqctl set_permissions -p "/" <username> ".*" ".*" ".*"
```
安装完插件，配置好用户设置角色和权限后就可以在浏览器上输入：http://xxx.xxx.xxx.xxx:15672/访问rabbitmq了。

查看rabbitmqctl 命令集用 rabbitmqctl --help

以上配置来自[rabbitmq官网](http://www.rabbitmq.com/install-debian.html)
