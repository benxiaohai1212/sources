### Ubuntu安装openjdk8

1、 添加源
```sh
sudo add-apt-repository ppa:openjdk-r/ppa
```

2、更新系统包及安装openjdk8
```sh
sudo apt-get update
sudo apt-get install openjdk-8-jdk
```

3、 如果系统安装了不止一个版本的jdk使用下面命令选择默认jdk版本
```sh
sudo update-alternatives --config java
sudo update-alternatives --config javac
```
