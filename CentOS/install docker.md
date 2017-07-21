# CentOS7

### install docker
```sh
sudo yum install docker
```

### install docker-compose

在使用centos7的软件包管理程序yum安装python-pip的时候会报一下错误：
```error
No package python-pip available.
Error: Nothing to do
```
安装epel扩展源

```sh
sudo yum -y install epel-release

sudo yum -y install python-pip

```
安装完之后别忘了清除一下cache

```sh
sudo yum clean all
```

