## Dockerfile用debain模版做MySQL镜像

FROM debian:jessie :为debain8 对应的MySQL：ENV MYSQL_VERSION 5.7.21-1debian8； 

FROM debian:stretch-slim :为debain9 对应的MySQL：ENV MYSQL_VERSION 5.7.21-1debian9；

找寻deb的文件[URL](http://repo.mysql.com/apt/debian/)

启动MySQL：`docker-entrypoint.sh mysqld`