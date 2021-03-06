### ubuntu 安装oracle jdk 的两种方式:

1. 通过ppa(源) 方式安装.
2. 通过官网下载安装包安装.

#### 使用ppa/源方式安装

1. 添加ppa
```sh
sudo add-apt-repository ppa:webupd8team/java

sudo apt-get update
```
2. 安装oracle-java-installer

jkd7
```sh
sudo apt-get install oracle-java7-installer
```
Or

jdk8
```sh
sudo apt-get install oracle-java8-installer
```

> 安装器会提示你同意 oracle 的服务条款,选择 ok

> 然后选择yes 即可

> 如果你懒,不想自己手动点击.也可以加入下面的这条命令,默认同意条款

JDK7 默认选择条款
```sh
echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections
```
JDK8 默认选择条款
```sh
echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections
```
接下会是等待(依个人网速定)

如果你因为防火墙或者其他原因,导致installer 下载速度很慢,可以中断操作.然后下载好相应jdk的tar.gz 包,放在:
```text
/var/cache/oracle-jdk7-installer             (jdk7) 
/var/cache/oracle-jdk8-installer             (jdk8) 
```
下面,然后安装一次installer. installer 则会默认使用 你下载的tar.gz包

3.设置系统默认jdk

JDk7
```sh
sudo update-java-alternatives -s java-7-oracle
```
JDK8
```sh
sudo update-java-alternatives -s java-8-oracle
```
如果即安装了jdk7,又安装了jdk8,要实现两者的切换,可以:

jdk8 切换到jdk7
```sh
sudo update-java-alternatives -s java-7-oracle
```
jdk7 切换到jdk8
```sh
sudo update-java-alternatives -s java-8-oracle
```
4.测试jdk 是是否安装成功:
```sh
java -version
javac -version
```

#### 直接下载jdk压缩包方式安装(这里只介绍jdk7的,jdk8 的原理完全一致)

分为下面5个步骤

1.官网下载JDK
2.解压缩,放到指定目录
3.配置环境变量
4.设置系统默认JDK
5. 测试jdk

1.官网下载JDK　　　

  地址: http://www.oracle.com/technetwork/articles/javase/index-jsp-138363.html 选择相应的 .gz包下载 

2. 解压缩,放到指定目录(以jdk-7u60-linux-x64.gz为例)

创建目录:
```sh
sudo mkdir /usr/lib/jvm
```
加压缩到该目录:
```sh
 sudo tar -zxvf jdk-7u60-linux-x64.gz -C /usr/lib/jvm
 ```
3.修改环境变量:　　
```sh
sudo vim ~/.bashrc
```
文件的末尾追加下面内容:
```sh
#set oracle jdk environment
export JAVA_HOME=/usr/lib/jvm/jdk1.7.0_60  ## 这里要注意目录要换成自己解压的jdk 目录
export JRE_HOME=${JAVA_HOME}/jre  
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib  
export PATH=${JAVA_HOME}/bin:$PATH  
```
使环境变量马上生效
```sh
source ~/.bashrc
```
4.设置系统默认jdk 版本
```sh
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk1.7.0_60/bin/java 300  
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk1.7.0_60/bin/javac 300  
sudo update-alternatives --install /usr/bin/jar jar /usr/lib/jvm/jdk1.7.0_60/bin/jar 300   
sudo update-alternatives --install /usr/bin/javah javah /usr/lib/jvm/jdk1.7.0_60/bin/javah 300   
sudo update-alternatives --install /usr/bin/javap javap /usr/lib/jvm/jdk1.7.0_60/bin/javap 300   
```
然后执行:
```sh
sudo update-alternatives --config java
```
若是初次安装jdk,会有下面的提示     

> There is only one alternative in link group java (providing /usr/bin/java): 
> /usr/lib/jvm/jdk1.7.0_60/bin/java

否者,选择合适的jdk
