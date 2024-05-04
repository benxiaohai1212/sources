### 离线安装docker

1、 docker 离线安装：
[url](https://download.docker.com/linux/centos/7/x86_64/stable/Packages/)
 
2、 下载离线安装包（centos）
```text
https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-selinux-17.03.1.ce-1.el7.centos.noarch.rpm
https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-17.03.1.ce-1.el7.centos.x86_64.rpm
``` 
3、 安装
```sh
sudo yum install docker-ce-selinux-17.03.1.ce-1.el7.centos.noarch.rpm
sudo yum install docker-ce-17.03.1.ce-1.el7.centos.x86_64.rpm
``` 
4、 配置
```text
cd /etc/docker (如果文件不存在 sudo mkdir /etc/docker)
 
编辑配置文件
sudo vi /etc/docker/daemon.json
{
"storage-driver": "devicemapper"
}
 
启动docker
sudo systemctl start docker
 
创建用户组
sudo groupadd docker
 
将自己的用户加入用户组
sudo usermod -aG docker $USER
 
设置开机启动
sudo systemctl enable docker
``` 

docker compose离线安装
```
下载安装包（参见Downloads部分）
https://github.com/docker/compose/releases
 
上传到服务器
 
更改目录及文件、修改访问权限
sudo mv <download_filename> /usr/local/bin/docker-compose
chmod 755 /usr/local/bin/docker-compose
 
验证是否安装成功
docker-compose --version
```
### ERROR
```
[root@bogon ~]# docker run -it 43684c4fb0f8 /bin/bash
docker: Error response from daemon: mkdir /var/lib/docker/overlay/a1c595f16162bec513905f39846b1601de3ff8353fbaea7cd10e8ad83cad1e60-init/merged/dev/shm: invalid argument.
See 'docker run --help'.
```
按照4、配置即可解决`vim /etc/docker/daemon.json` ,`echo '{"storage-driver": "devicemapper"}' >> /etc/docker/daemon.json`

```
[root@localhost ~]# docker restart portal_container
Error response from daemon: Cannot restart container portal_container: driver failed programming external connectivity on endpoint portal_container (773127406ec36a128621bb752bed3258fad1a06ec855f2db8a569207ae194e3d):  (iptables failed: iptables --wait -t nat -A DOCKER -p tcp -d 0/0 --dport 80 -j DNAT --to-destination 172.17.0.2:8080 ! -i docker0: iptables: No chain/target/match by that name.
 (exit status 1))
```

```
[root@localhost ~]# systemctl stop firewalld.service
[root@localhost ~]# systemctl disable firewalld.service
[root@localhost ~]# yum install iptables-services
```
参考：  
http://blog.jobbole.com/98869/  
https://help.replicated.com/docs/kb/developer-resources/docker-iptables/


## 安装docker-compose
```
# 方法一：
$ curl -L https://github.com/docker/compose/releases/download/1.8.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose

# Linux下等效于
$ curl -L https://github.com/docker/compose/releases/download/1.8.1/docker-compose-Linux-x86_64 > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose

# 方法二：使用pip安装，版本可能比较旧
$ yum install python-pip python-dev
$ pip install docker-compose

# 方法三：作为容器安装
$ curl -L https://github.com/docker/compose/releases/download/1.8.0/run.sh > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose

# 方法四：离线安装
# 下载[docker-compose-Linux-x86_64](https://github.com/docker/compose/releases/download/1.8.1/docker-compose-Linux-x86_64)，然后重新命名添加可执行权限即可：
$ mv docker-compose-Linux-x86_64 /usr/local/bin/docker-compose;
$ chmod +x /usr/local/bin/docker-compose
# 百度云地址： http://pan.baidu.com/s/1slEOIC1 密码: qmca
# docker官方离线地址：https://dl.bintray.com/docker-compose/master/
```