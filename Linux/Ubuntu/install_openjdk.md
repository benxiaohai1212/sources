### Ubuntu 14.04上 安装 OpenJDK8

1、 添加openjdk8的第三方源  
> sudo add-apt-repository ppa:openjdk-r/ppa

2、 执行更新  
> sudo apt-get update

3、 安装openjdk8  
> sudo apt-get install openjdk-8-jdk

4、 选择版本  
> sudo update-alternatives –-config Java

手工修改/etc/apt/sources.list,在最后添加如下几行
## xxx added begin : for cmd-line fail(udo add-apt-repository ppa:openjdk-r/ppa)
## this ppa is used for 10.04 only.
```
deb http://ppa.launchpad.net/openjdk-r/ppa/ubuntu trusty main?
deb-src http://ppa.launchpad.net/openjdk-r/ppa/ubuntu trusty main?
```
## xxx added end.
同时对于不同的Ubuntu版本，这个列表需要相应修改：
10.04  
```
deb http://ppa.launchpad.net/openjdk-r/ppa/ubuntu lucid main  
deb-src http://ppa.launchpad.net/openjdk-r/ppa/ubuntu lucid main
```

在12.04版本：  
```
deb http://ppa.launchpad.net/openjdk-r/ppa/ubuntu precise main  
deb-src http://ppa.launchpad.net/openjdk-r/ppa/ubuntu precise main
```

12.10  
```
deb http://ppa.launchpad.net/openjdk-r/ppa/ubuntu quantal main  
deb-src http://ppa.launchpad.net/openjdk-r/ppa/ubuntu quantal main
```

14.04  
```
deb http://ppa.launchpad.net/openjdk-r/ppa/ubuntu trusty main  
deb-src http://ppa.launchpad.net/openjdk-r/ppa/ubuntu trusty main
```
15.04  
```
deb http://ppa.launchpad.net/openjdk-r/ppa/ubuntu vivid main  
deb-src http://ppa.launchpad.net/openjdk-r/ppa/ubuntu vivid main
```
Ubuntu16以后就没有这个问题了。直接步骤1?sudo add-apt-repository ppa:openjdk-r/ppa就可以了。