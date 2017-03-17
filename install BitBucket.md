install BitBucket
1、 基础环境
1)、 jdk
2)、 mysql

2、 为Bitbucket建立数据库

```java
mysql –uroot –p
CREATE DATABASE bitbucket CHARACTER SET utf8 COLLATE utf8_bin;
GRANT ALL ON bitbucket.* TO 'itbucket'@'%' IDENTIFIED BY 'bitbucket';
GRANT ALL PRIVILEGES ON bitbucket.* TO 'bitbucket'@'localhost' IDENTIFIED BY 'bitbucket';
FLUSH PRIVILEGES;
QUIT
```

3、安装git，版本1.8或更高

4、安装perl,版本5.8.8或更高

5、下载Bitbucket并安装

```java
cd /usr/local/src
wget https://downloads.atlassian.com/software/stash/downloads/atlassian-bitbucket-4.10.1-x64.bin
chmod +x atlassian-bitbucket-4.10.1-x64.bin
./atlassian-bitbucket-4.10.1-x64.bin
```
在安装中的交互(默认服务http端口为7990，服务端口为8006，安装时可以根据自己需要重新输入)：

安装成功后，服务已经启动，可以通过http://localhost:7990访问

http://www.bubuko.com/infodetail-1825280.html
