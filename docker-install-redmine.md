1、安装docker，docker-compose

 * [ubuntu 14.04](https://github.com/benxiaohai1212/sources/blob/master/ubuntu/install-docker.md)
 
 * [centos 7](https://github.com/benxiaohai1212/sources/blob/master/CentOS/install-docker.md)

2、编辑docker-compose.yml文件

mysql:docker-compose.yml

```xml
mysql:
  container_name: mysql
  image: sameersbn/mysql:latest
  environment:
    - DB_USER=<redmine>
    - DB_PASS=<1q2w3e4r>
    - DB_NAME=redmine_production
  volumes:
    - /opt/docker/redmine/mysql:/var/lib/mysql
redmine:
  container_name: redmine
  image: sameersbn/redmine:3.1.6
  links:
    - mysql:mysql
  environment:
    - TZ=Asia/Shanghai
    - REDMINE_PORT=80
    - REDMINE_HTTPS=false
    - REDMINE_RELATIVE_URL_ROOT=
    - REDMINE_SECRET_TOKEN=
    - REDMINE_SUDO_MODE_ENABLED=false
    - REDMINE_SUDO_MODE_TIMEOUT=15
    - REDMINE_CONCURRENT_UPLOADS=2
    - REDMINE_BACKUP_SCHEDULE=weekly
    - REDMINE_BACKUP_EXPIRY=
    - REDMINE_BACKUP_TIME=
    - NGINX_MAX_UPLOAD_SIZE=500m
    
    - SMTP_ENABLED=false
    - SMTP_METHOD=smtp
    - SMTP_DOMAIN=www.gmail.com.cn
    - SMTP_HOST=smtp.gmail.com.cn
    - SMTP_PORT=25
    - SMTP_USER=redmine@gmail.com
    - SMTP_PASS=password
    - SMTP_STARTTLS=true
    - SMTP_AUTHENTICATION=:login
  ports:
    - "80:80"
  volumes:
    - /opt/docker/redmine/redmine:/home/redmine/data
```

postgresql:docker-compose.yml

```xml
postgresql:
  image: sameersbn/postgresql:9.4-22
  environment:
    - DB_USER=<redmine>
    - DB_PASS=<password>
    - DB_NAME=redmine_production
  volumes:
    - /srv/docker/redmine/postgresql:/var/lib/postgresql
redmine:
  image: sameersbn/redmine:3.1.5
  links:
    - postgresql:postgresql
  environment:
    - TZ=Asia/Kolkata
    - REDMINE_PORT=10083
    - REDMINE_HTTPS=false
    - REDMINE_RELATIVE_URL_ROOT=
    - REDMINE_SECRET_TOKEN=
    - REDMINE_SUDO_MODE_ENABLED=false
    - REDMINE_SUDO_MODE_TIMEOUT=15
    - REDMINE_CONCURRENT_UPLOADS=2
    - REDMINE_BACKUP_SCHEDULE=
    - REDMINE_BACKUP_EXPIRY=
    - REDMINE_BACKUP_TIME=
    - SMTP_ENABLED=false
    - SMTP_METHOD=smtp
    - SMTP_DOMAIN=www.example.com
    - SMTP_HOST=smtp.gmail.com
    - SMTP_PORT=587
    - SMTP_USER=mailer@example.com
    - SMTP_PASS=password
    - SMTP_STARTTLS=true
    - SMTP_AUTHENTICATION=:login
    - IMAP_ENABLED=false
    - IMAP_HOST=imap.gmail.com
    - IMAP_PORT=993
    - IMAP_USER=mailer@example.com
    - IMAP_PASS=password
    - IMAP_SSL=true
    - IMAP_INTERVAL=30
  ports:
    - "10083:80"
  volumes:
    - /srv/docker/redmine/redmine:/home/redmine/data
```

3、执行命令

```sh
  docker-compose up -d
```
