## Linux下.jar解压与打包
### 解压
```
unzip demo.jar
```
### 打包
```
jar -cvfM0 demo.jar ./
```

## 脚本查询java版本号
```
JAVA_VERSION=$(java -version 2>&1 |awk 'NR==1{ gsub(/"/,""); print $3 }')
```

### 下载Oracle JDK
众所周知，下载Oralce的JDK是需要获取权限，下面介绍如何在不获取权限的情况下获得有效的下载地址。

以java8 `jdk-8u311-linux-x64.tar.gz`为例：

1. [下载地址](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)  
2. 点击 `jdk-8u311-linux-x64.tar.gz`   
3. 利用F12,打开浏览器debug
![输入图片说明](../java/%E6%97%A0%E6%A0%87%E9%A2%98.png)
4. 修改地址
    * https 改为 http
    * otn 改为 otn-pub

获得新地址就可以直接下载了。

```
wget -q -O /opt/jdk-8u311-linux-x64.tar.gz --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u311-b11/4d5417147a92418ea8b615e228bb6935/jdk-8u311-linux-x64.tar.gz"
```
> -O 保存路径 /opt/jdk-8u311-linux-x64.tar.gz  
> -q 静默下载  
> --no-cookies  
> --no-check-certificate  
> --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie"  
> 将oracle获取地址`https://download.oracle.com/otn/java/jdk/8u311-b11/4d5417147a92418ea8b615e228bb6935/jdk-8u311-linux-x64.tar.gz` 改为 `http://download.oracle.com/otn-pub/java/jdk/8u311-b11/4d5417147a92418ea8b615e228bb6935/jdk-8u311-linux-x64.tar.gz`

### Ubuntu 14.04上 安装 OpenJDK8

1、 添加openjdk8的第三方源  
> sudo add-apt-repository ppa:openjdk-r/ppa

2、 执行更新  
> sudo apt-get update

3、 安装openjdk8  
> sudo apt-get install openjdk-8-jdk

4、 选择版本  
> sudo update-alternatives –-config Java

### ubuntu 安装oracle jdk :

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

### jvm各项参数说明
```
-XX:MetaspaceSize=128m （元空间默认大小）
-XX:MaxMetaspaceSize=128m （元空间最大大小）
-Xms1024m （堆默认大小）此值可以设置与-Xmx相同，以避免每次垃圾回收完成后JVM重新分配内存。
-Xmx1024m （堆最大大小）Java Heap最大值，默认值为物理内存的1/4，最佳设值应该视物理内存大小及计算机内其他内存开销而定
-Xmn256m （新生代大小）Java Heap Young区，堆大小=年轻代大小 + 年老代大小 + 持久代大小。持久代一般固定大小为64m，所以增大年轻代后，将会减小年老代大小。此值对系统性能影响较大，Sun官方推荐配置为整个堆的3/8。
-Xss256k （棧最大深度大小）每个线程的Stack大小，JDK5.0以后每个线程堆栈大小为1M，以前每个线程堆栈大小为256K。更具应用的线程所需内存大小进行调整。在相同物理内存下，减小这个值能生成更多的线程。但是操作系统对一个进程内的线程数还是有限制的，不能无限生成，经验值在3000~5000左右。
-XX:SurvivorRatio=8 （新生代分区比例 8:2）
-XX:+UseConcMarkSweepGC （指定使用的垃圾收集器，这里使用CMS收集器）
-XX:+PrintGCDetails （打印详细的GC日志）
JDK8之后把-XX:PermSize 和 -XX:MaxPermGen移除了，取而代之的是
-XX:MetaspaceSize=128m （元空间默认大小）
-XX:MaxMetaspaceSize=128m （元空间最大大小）
JDK 8开始把类的元数据放到本地化的堆内存(native heap)中，这一块区域就叫Metaspace，中文名叫元空间。
使用本地化的内存有什么好处呢？最直接的表现就是java.lang.OutOfMemoryError: PermGen 空间问题将不复存在，因为默认的类的元数据分配只受本地内存大小的限制，也就是说本地内存剩余多少，理论上Metaspace就可以有多大，这解决了空间不足的问题。不过，让Metaspace变得无限大显然是不现实的，因此我们也要限制Metaspace的大小：使用-XX:MaxMetaspaceSize参数来指定Metaspace区域的大小。JVM默认在运行时根据需要动态地设置MaxMetaspaceSize的大小。
```
[springboot内存占用过高问题排查 - jvm内存使用分析](https://dandelioncloud.cn/article/details/1439110455683014658)

## Linux Java安全设置
```
$JAVA_HOME/bin/ControlPanel
```
运行*.jnlp
```
javaws -verbose kvm.jnlp 
```