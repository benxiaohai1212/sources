1、安装docker
```
curl -sSL https://get.docker.com | sh
```

2、安装docker-compose并赋权
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod 755 /usr/local/bin/docker-compose
```

3、编辑docker-compose.yml文件 `vim docker-compose.yml` 如果部署是nexus3则修改 `image: sonatype/nexus3` `volumes: - /var/sonatype-work/:/nexus-data`

```
version: '2'

services:
  nexus:
    image: sonatype/nexus
    restart: always
    container_name: nexus
    ports:
    - "8081:8081"
    volumes:
    - /var/sonatype-work/:/sonatype-work/
```

4、创建文件夹并赋权
```
mkdir -p /var/sonatype-work
chown -R 1000:1000 /var/sonatype-work
```

5、运行 `docker-compose up -d`

6、登录
```
URL: http://ip:8081/nuxus  
用户：admin  
密码：admin123  
```
