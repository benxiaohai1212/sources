## 在Ubuntu上安装、配置和部署Rocket.Chat

Rocket.Chat是使用Meteor框架做的开源消息应用。它支持视频会议、文件共享、语音等，使用Rocket.Chat可以完全控制交流通信。

Rocket.Chat是特性最丰富的 Slack 开源替代品之一。它的主要功能：群组聊天，直接通信，私聊群，桌面通知，媒体嵌入，链接预览，文件上传，语音/视频 聊天，截图等等。

下面记录了在Ubuntu上安装配置Rocket.Chat的步骤，这里使用Nginx做为反向代理，为了提要安全性。

系统要求

    * 内存至少1GB
    * 有sudo权限
    * 有域名，并指向Ubuntu服务器
    * 一个SSL证书，可以是购买的；自签名的证书也可以；也可以使用免费的Let’s Encrypt。

### 第一步：安装依赖

Rocket.Chat依赖MongoDB和NodeJS，下面来安装它们。

添加MongoDB的key：
```
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
```

添加源：
```
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
```

更新：
```
$ sudo apt-get update
```

安装软件包：`npm`, `mongodb-org`,  `curl` 和 `graphicsmagick`：
```
$ sudo apt-get install -y npm mongodb-org curl graphicsmagick
```

使用npm安装一个包，允许我们改变node版本：
```
$ sudo npm install -g n
```

把node版本改为4.5：
```
# $ sudo n 0.10.40
$ sudo n 4.5  # 2016-9月更新
```
![](http://blog.topspeedsnail.com/wp-content/uploads/2016/03/Screen-Shot-2016-03-10-at-09.03.08.png)

    参考：https://rocket.chat/docs/installation/manual-installation/ubuntu/

### 第二步：安装Rocket.Chat

下载最新版本的Rocket.Chat：
```
$ curl -L https://rocket.chat/releases/latest/download -o rocket.chat.tgz
```

解压下载的压缩包：
```
$ tar zxvf rocket.chat.tgz
```

解压出的目录是bundle，重命名：
```
$ mv bundle Rocket.Chat
```

安装Rocket.Chat:
```
$ cd Rocket.Chat/programs/server
$ npm install
```

导航到Rocket.Chat根目录：
```
$ cd ../..
```

设置几个环境变量：

ROOT_URL变量设置为你的域名：
```
$ export ROOT_URL=https://your_domain.com/
```

MONGO_URL变量设为MongoDB的url：
```
$ export MONGO_URL=mongodb://localhost:27017/rocketchat
```

设置PORT为3000：
```
$ export PORT=3000
```

运行Rocket.Chat：
```
$ node main.js
```
如果没有报错，代表安装成功；使用CTRL-C停止Rocket.Chat的运行。

### 第三步：设置Nginx反向代理

Rocket.Chat已经成功安装，现在我们需要设置Nginx反向代理。使用反向代理可以方便的管理web服务，并把访问Rocket.Chat的流量使用SSL加密。

安装Nginx：
```
$ sudo apt-get install -y nginx
```

把你的证书密钥移动到/etc/nginx/certificate.key：
```
$ sudo cp /path/to/your/key /etc/nginx/certificate.key
```

修改密钥文件权限：
```
$ sudo chmod 400 /etc/nginx/certificate.key
```

把你的证书密钥移动到/etc/nginx/certificate.crt：
```
$ sudo cp /path/to/your/cert /etc/nginx/certificate.crt
```

删除默认虚拟主机配置文件：
```
$ sudo rm /etc/nginx/sites-enabled/default
```

创建/etc/nginx/sites-enabled/default：
```
$ sudo vim /etc/nginx/sites-enabled/default
```

添加Upstreams：
```
# Upstreams
upstream backend {
    server 127.0.0.1:3000;
}
```

添加server：
```
server {
    listen 443;
    server_name your_domain.com;
    error_log /var/log/nginx/rocketchat.access.log;

    ssl on;
    ssl_certificate /etc/nginx/certificate.crt;
    ssl_certificate_key /etc/nginx/certificate.key;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # don’t use SSLv3 ref: POODLE

    location / {
        proxy_pass http://your_domain.com:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $http_host;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forward-Proto http;
        proxy_set_header X-Nginx-Proxy true;

        proxy_redirect off;
    }
}
```

把上面的your_domain.com替换为你的域名。

重启nginx：
```
$ sudo service nginx restart
```

再次运行Rocket.Chat：
```
$ cd ~/Rocket.Chat
$ node main.js
```
访问Rocket.Chat：
```
https://your_domain.com
```
![](http://blog.topspeedsnail.com/wp-content/uploads/2016/03/Screen-Shot-2016-03-10-at-09.34.51.png)


第四步：把Rocket.Chat注册为服务

如果想要Rocket.Chat随系统启动，可以安装一个node模块：forever-service。

forever-service依赖forever，安装forever：
```
$ sudo npm install -g forever
```

安装forever-service：
```
$ sudo npm install -g forever-service
```

把Rocket.Chat注册为服务：
```
$ cd ~/Rocket.Chat
```
```
$ sudo forever-service install -s main.js -e "ROOT_URL=https://your_domain.com/ MONGO_URL=mongodb://localhost:27017/rocketchat PORT=3000" rocketchat
```
注意：包把your_domain.com替换为你的域名。

启动：
```
$ sudo start rocketchat
```

第五步：配置使用Rocket.Chat

访问Rocket.Chat网址：
![](http://blog.topspeedsnail.com/wp-content/uploads/2016/03/Screen-Shot-2016-03-10-at-09.34.51.png)

点击Register a new account，创建第一个管理员账户：

![](http://blog.topspeedsnail.com/wp-content/uploads/2016/03/Screen-Shot-2016-03-10-at-09.47.26.png)

设置为中文：

![](http://blog.topspeedsnail.com/wp-content/uploads/2016/03/Screen-Shot-2016-03-10-at-09.49.57.png)

Rocket.Chat设置完成，你和你的团队有了自己的聊天交流工具。