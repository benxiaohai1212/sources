### 用户没有docker权限
报错内容大致如下：  
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.40/build?buildargs=%7B%7D&cachefrom=%5B%5D&cgroupparent=&cpuperiod=0&cpuquota=0&cpusetcpus=&cpusetmems=&cpushares=0&dockerfile=Dockerfile&labels=%7B%7D&memory=0&memswap=0&networkmode=default&rm=1&session=o0vyotrybrs0dpewyj080i6db&shmsize=0&t=registry.develop.asiacom.net.cn%2Fdevelop%2Fcrm%3AT2.0&target=&ulimits=null&version=1: dial unix /var/run/docker.sock: connect: permission denied

解决办法：
```
1.将用户添加到docker用户组
sudo usermod -aG docker your-user
2. 刷新docker用户组
sudo newgrp docker

1. sudo groupadd docker         #添加docker用户组
2. sudo gpasswd -a $USER docker #将登陆用户加入到docker用户组中
3. newgrp docker                #更新用户组
```

### docker pull image 报 `dial tcp 104.18.121.25:443: i/o timeout`，解决方法：

`dig @114.114.114.114 registry-1.docker.io` 之后配置`hosts`

```
[root@localhost ~]# dig @114.114.114.114 registry-1.docker.io

; <<>> DiG 9.11.4-P2-RedHat-9.11.4-16.P2.el7_8.6 <<>> @114.114.114.114 registry-1.docker.io
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 22217
;; flags: qr rd ra; QUERY: 1, ANSWER: 8, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;registry-1.docker.io.		IN	A

;; ANSWER SECTION:
registry-1.docker.io.	54	IN	A	23.22.155.84
registry-1.docker.io.	54	IN	A	3.94.35.164
registry-1.docker.io.	54	IN	A	107.23.149.57
registry-1.docker.io.	54	IN	A	52.1.121.53
registry-1.docker.io.	54	IN	A	35.174.73.84
registry-1.docker.io.	54	IN	A	18.213.137.78
registry-1.docker.io.	54	IN	A	18.232.227.119
registry-1.docker.io.	54	IN	A	3.218.162.19

;; Query time: 15 msec
;; SERVER: 114.114.114.114#53(114.114.114.114)
;; WHEN: 五 7月 10 10:22:47 CST 2020
;; MSG SIZE  rcvd: 177

[root@localhost ~]# vim /etc/hosts
23.22.155.84	registry-1.docker.io
3.94.35.164	registry-1.docker.io
107.23.149.57	registry-1.docker.io
52.1.121.53	registry-1.docker.io
35.174.73.84	registry-1.docker.io
18.213.137.78	registry-1.docker.io
18.232.227.119	registry-1.docker.io
3.218.162.19	registry-1.docker.io
```
`dig` 命令属于`bind-utils`工具包


```
Usage: docker run [OPTIONS] IMAGE [COMMAND] [ARG...]    
  
  -d, --detach=false         指定容器运行于前台还是后台，默认为false     
  -i, --interactive=false   打开STDIN，用于控制台交互    
  -t, --tty=false            分配tty设备，该可以支持终端登录，默认为false    
  -u, --user=""              指定容器的用户    
  -a, --attach=[]            登录容器（必须是以docker run -d启动的容器）  
  -w, --workdir=""           指定容器的工作目录   
  -c, --cpu-shares=0        设置容器CPU权重，在CPU共享场景使用    
  -e, --env=[]               指定环境变量，容器中可以使用该环境变量    
  -m, --memory=""            指定容器的内存上限    
  -P, --publish-all=false    指定容器暴露的端口    
  -p, --publish=[]           指定容器暴露的端口   
  -h, --hostname=""          指定容器的主机名    
  -v, --volume=[]            给容器挂载存储卷，挂载到容器的某个目录  
  --add-host list            给容器添加hosts配置 --add-host domanName:ip  
  --volumes-from=[]          给容器挂载其他容器上的卷，挂载到容器的某个目录  
  --cap-add=[]               添加权限，权限清单详见：http://linux.die.net/man/7/capabilities    
  --cap-drop=[]              删除权限，权限清单详见：http://linux.die.net/man/7/capabilities    
  --cidfile=""               运行容器后，在指定文件中写入容器PID值，一种典型的监控系统用法    
  --cpuset=""                设置容器可以使用哪些CPU，此参数可以用来容器独占CPU    
  --device=[]                添加主机设备给容器，相当于设备直通    
  --dns=[]                   指定容器的dns服务器    
  --dns-search=[]            指定容器的dns搜索域名，写入到容器的/etc/resolv.conf文件    
  --entrypoint=""            覆盖image的入口点    
  --env-file=[]              指定环境变量文件，文件格式为每行一个环境变量    
  --expose=[]                指定容器暴露的端口，即修改镜像的暴露端口    
  --link=[]                  指定容器间的关联，使用其他容器的IP、env等信息    
  --lxc-conf=[]              指定容器的配置文件，只有在指定--exec-driver=lxc时使用    
  --name=""                  指定容器名字，后续可以通过名字进行容器管理，links特性需要使用名字    
  --net="bridge"             容器网络设置:  
                                bridge 使用docker daemon指定的网桥       
                                host    //容器使用主机的网络    
                                container:NAME_or_ID  >//使用其他容器的网路，共享IP和PORT等网络资源    
                                none 容器使用自己的网络（类似--net=bridge），但是不进行配置   
  --privileged=false         指定容器是否为特权容器，特权容器拥有所有的capabilities    
  --restart="no"             指定容器停止后的重启策略:  
                                no：容器退出时不重启    
                                on-failure：容器故障退出（返回值非零）时重启   
                                always：容器退出时总是重启    
  --rm=false                 指定容器停止后自动删除容器(不支持以docker run -d启动的容器)    
  --sig-proxy=true           设置由代理接受并处理信号，但是SIGCHLD、SIGSTOP和SIGKILL不能被代理
```
### docker拷贝命令

1. 从容器里面拷文件到宿主机？
 > 答：在宿主机里面执行以下命令  
 > docker cp 容器名:要拷贝的文件在容器里面的路径 要拷贝到宿主机的相应路径  
 > 例子：
```
docker cp myjenkins:/var/jenkins_home/plugins/jenkins.plugin.tar.gz /home/tomhat/
```
2. 从宿主机拷文件到容器里面 
 > 答：在宿主机里面执行如下命令  
 > docker cp 要拷贝的文件路径 容器名:要拷贝到容器里面对应的路径  
 > 例子：
```
docker cp /home/tomhat/jenkins.plugin.tar.gz myjenkins:/var/jenkins_home/plugins/ 
```

3. 执行命令
> 例子：
```
docker exec -it contanerId(containerName) ping xxx.xxx.xxx.xxx

运行镜像：
docker run --name contanerName -p 80:8080 -v /opt:/opt -d imagesId(imagesName:tag)

进入容器：
docker exec -it containerId(containerName) bash
```

### Docker 空间使用分析与清理

可以通过 Docker 内置的 CLI 指令 `docker system prune`来进行自动空间清理。  
```text
Tips ：  
不同状态的镜像  
已使用镜像（used image）： 指所有已被容器（包括已停止的）关联的镜像。即 docker ps -a 看到的所有容器使用的镜像。  
未引用镜像（unreferenced image）：没有被分配或使用在容器中的镜像，但它有 Tag 信息。  
悬空镜像（dangling image）：未配置任何 Tag （也就无法被引用）的镜像，所以悬空。这通常是由于镜像 build 的时候没有指定 -t 参数配置 Tag 导致的。比如:REPOSITORY TAG IMAGE ID CREATED SIZE <none> <none> 6ad733544a63 5 days ago 1.13 MB # 悬空镜像 
 （dangling image）  
挂起的卷（dangling Volume)  
类似的，dangling=true 的 Volume 表示没有被任何容器引用的卷。  
```
docker system prune 自动清理说明：  

该指令默认会清除所有如下资源：  
> 已停止的容器（container）  
> 未被任何容器所使用的卷（volume）  
> 未被任何容器所关联的网络（network）  
> 所有悬空镜像（image）。  
> 该指令默认只会清除悬空镜像，未被使用的镜像不会被删除。  
> 添加 -a 或 --all 参数后，可以一并清除所有未使用的镜像和悬空镜像。  
> 可以添加 -f 或 --force 参数用以忽略相关告警确认信息。  
指令结尾处会显示总计清理释放的空间大小。  

参考网址：https://www.toutiao.com/i6492364233596994062/?tt_from=weixin&utm_campaign=client_share&app=news_article&utm_source=weixin&iid=18750880151&utm_medium=toutiao_android&wxshare_count=1 
### docker 网络不通的解决方法   

开发环境使用docker好久了，突然docker的网络不通了，表现是：
 > docker主机内部网络正常，与其它主机的连接失效，其它主机不能连接docker主机上映射的端口，docker内部也无法连接外部主机。

得到以下方法：
```
sysctl -w net.bridge.bridge-nf-call-ip6tables = 1
sysctl -w net.bridge.bridge-nf-call-iptables = 1
sysctl -w net.bridge.bridge-nf-call-arptables = 1

sysctl -w net.ipv4.ip_forward=1
```
原文：https://blog.csdn.net/knight_zhen/article/details/51733255 


### ubuntu 报错net/http: TLS handshake timeout  
```
tomhat@tomhat:~$ docker pull centos:centos7
centos7: Pulling from library/centos
5e35d10a3eba: Pulling fs layer 
error pulling image configuration: Get https://dseasb33srnrn.cloudfront.net/registry-v2/docker/registry/v2/blobs/sha256/2d/2d194b392dd16955847a14f969b2dd319251471ffa6356be6d8f16c5bf53db9b/data?Expires=1521482126&Signature=HdfJ8~DvlVYdaULMXCBdm3EQ4hW3aP5rtxmCnie7vGDzFKQZ~yByoYVOznLfhbkZdpAESSWLK9EIZI3c-hA-qDeYWZdRQkkB-PYXQVBB~0BFqlykfyIxVFRIimWSpj3crvn4IGH7jVWy-Fj9uGPOPBsdhx1lG0YFT5~tA1MDEDo_&Key-Pair-Id=APKAJECH5M7VWIS5YZ6Q: net/http: TLS handshake timeout
```
解决：  
方案一、`vim /etc/docker/daemon.json`  
```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

方案二、Linux中使用命令：`curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://d1d9aef0.m.daocloud.io`  该脚本可以将 --registry-mirror 加入到你的 Docker 配置文件 /etc/docker/daemon.json 中。适用于 Ubuntu14.04、Debian、CentOS6 、CentOS7、Fedora、Arch Linux、openSUSE Leap 42.1，其他版本可能有细微不同

## 常用命令
```
1.查看正在运行的容器

$ sudo docker ps

2.查看所有的容器

$ sudo docker ps -a

3.查看本地镜像

$ sudo docker images

4.从镜像中运行/停止一个新实例

$ sudo docker run/stop --help

$ sudo docker run/stop container

5.避免输出Sudo

这里把当前用户加入到docker组就可以直接使用命令，而不用每次都加sudo

$ sudo groupadd docker

#改完后需要重新登陆用户

$ sudo gpasswd -a ${USER} docker

6.Docker版本

$ sudo docker --version

7.搜索Docker Image

$ docker search tutorial

搜索网址是：index.docker.io [国内无法访问]

其他网址是：https://hub.docker.com/

8.通过docker命令下载tutorial镜像

$ docker pull learn/tutorial

9.从指定image里生成一个container并在其中运行一个命令

$ docker run [image] [cmd]

10.在container里运行交互式命令，比如shell

$ docker run -i -t [image] [cmd]

$ docker run -i -t ubuntu /bin/bash

11.在container里运行后台任务

$ docker run -d [image] [cmd]

12.列出最近一个运行过的container

不加-l则只列出正在运行的container（比如后台任务）

$ docker ps -l

13.列出所有container

$ docker ps -a

14.查看container详情

$ docker inspect [container]

15.删除某个container

其中container_id不需要输入完整，只要能保证唯一即可。

运行中的Docker容器是无法删除的，必须先通过docker stop或者docker kill命令停止。

$ docker rm [container]

$ docker rm `docker ps -a -q` 删除所有容器，-q表示只返回容器的ID

16.再次运行某个container

$ docker start [container]

17.查看某个container的运行日志

$ docker logs [container]

$ docker logs -f [container] 类似tailf

18.切换到后台任务container, 需要当前容器正常运行

注意：切换到后台任务以后无法用Ctrl-C退出

$ docker attach [container]

19.中止后台任务container

$ docker stop [container]

20.将container保存为一个image

$ docker commit [container] [image_name]

21.将image上传到仓库

$ docker push [image_name]

22.删除images

$ docker rmi [image id]

23.为容器指定名称，容器的名称是唯一

$ docker run --name edison -i -t ubuntu /bin/bash

24.有三种方式可以唯一指代容器

短UUID: 716d3c16dc65（12位）

长UUID：716d3c16dc654230ada14f555faadd036474231dfca0ca44b597574a5c618565（64位）

名称: edison

25.当前Docker宿主机的信息

$ docker info

26.查看容器内部的进程信息

$ docker top [container]

27.在容器中运行后台任务，只对正在运行的容器有效。

$ docker exec -d [container] [cmd]

$ docker exec -d edison touch /home/haha

28.在容器中运行交付式任务，只对正在运行的容器有效。

$ docker exec -t -i edison /bin/bash

注：在/var/lib/docker中，可以查看Docker Image、Container和Volumes等细节信息。

29. 对已运行的容器设置 restart:always

$ docker container update --restart=always (容器名|容器ID)

```