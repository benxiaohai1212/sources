# 构建 https 访问 sonarqube

环境准备：   

1、安装 docker
	> curl https://get.docker.com | sh

2、安装 docker-compose
> $ curl -L https://github.com/docker/compose/releases/download/1.8.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose  
> $ chmod +x /usr/local/bin/docker-compose

构建https访问的sonarqube

1、创建目录  
	
	mkdir -p /docker/{certs,nginx}

2、创建证书  

	openssl req -newkey rsa:4096 -nodes -sha256 -keyout /docker/certs/server.key -x509 -days 365 -out /docker/certs/server.crt

下面是输出，需要填写一些信息。
```
Generating a 4096 bit RSA private key
........................................++
..........................................++
writing new private key to '/docker/certs/server.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:BeiJing
Locality Name (eg, city) []:BeiJing
Organization Name (eg, company) [Internet Widgits Pty Ltd]:ChinaOPS
Organizational Unit Name (eg, section) []:ChinaOPS 
Common Name (e.g. server FQDN or YOUR name) []:sonar.cn
Email Address []:
```
注意：上面提示里的Common Name必须要添写完整域名

3、拷贝nginx.conf 到 /docker/nginx/ 目录中  

4、docker network nginx-proxy  

4、执行 docker-compose -f docker-compose-https.yml up -d  

**注：执行 docker-compose -f docker-compose-http.yml up -d 是http方式访问，只需构建好环境即可执行此命令**
