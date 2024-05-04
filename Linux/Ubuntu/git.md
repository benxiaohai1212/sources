## 安装git

1、安装依赖  
> Debain/Ubuntu  
    apt-get install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev  

> Redhat/CentOS/Fedora  
    yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel  

2、下载源码
> http://git-scm.com/download

3、编译并安装  
```
$ tar -zxf git-2.9.5.tar.gz
$ cd git-2.9.5
$ make prefix=/usr/local all
$ sudo make prefix=/usr/local install
```

4、验证
> git version  

*显示git version 2.9.5说明已安装成功*