1、安装docker
```
curl -sSL https://get.docker.com | sh
```

2、安装docker-compose并赋权
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod 755 /usr/local/bin/docker-compose
```

3、编辑docker-compose.yml文件 `vim docker-compose.yml`

```
version: '3'
services:
  jenkins:
    image: 'jenkins/jenkins:lts'
    container_name: jenkins
    restart: always
    ports:
    - '80:8080'
    - '50000:50000'
    volumes:
    - '/var/jenkins_home:/var/jenkins_home'
```

4、创建文件夹并赋权
```
mkdir -p /var/jenkins_home
chown -R 1000:1000 /var/jenkins_home
```

5、运行 `docker-compose up -d`

6、登录
```
URL： http://ip/
初始登录密码通过 docker logs jenkins 查看
```