## Ubuntu安装Docker

首先要确认你的 Ubuntu 版本是否符合安装 Docker 的前提条件。如果没有问题，你可以通过下边的方式来安装 Docker ：

    使用具有sudo权限的用户来登录你的Ubuntu。

    查看你是否安装了wget

     $ which wget

    如果wget没有安装，先升级包管理器，然后再安装它。

     $ sudo apt-get update $ sudo apt-get install wget

    获取最新版本的 Docker 安装包

     $ wget -qO- https://get.docker.com/ | sh

    系统会提示你输入sudo密码，输入完成之后，就会下载脚本并且安装Docker及依赖包。

    验证 Docker 是否被正确的安装

     $ sudo docker run hello-world

    上边的命令会下载一个测试镜像，并在容器内运行这个镜像。

### Ubuntu Docker可选配置

这部分主要介绍了 Docker 的可选配置项，使用这些配置能够让 Docker 在 Ubuntu 上更好的工作。

    创建 Docker 用户组
    调整内存和交换空间(swap accounting)
    启用防火墙的端口转发(UFW)
    为 Docker 配置DNS服务

#### 创建 Docker 用户组

docker 进程通过监听一个 Unix Socket 来替代 TCP 端口。在默认情况下，docker 的 Unix Socket属于root用户，当然其他用户可以使用sudo方式来访问。因为这个原因， docker 进程就一直是root用户运行的。

为了在使用 docker 命令的时候前边不再加sudo，我们需要创建一个叫 docker 的用户组，并且为用户组添加用户。然后在 docker 进程启动的时候，我们的 docker 群组有了 Unix Socket 的所有权，可以对 Socket 文件进行读写。

    注意：docker 群组就相当于root用户。有关系统安全影响的细节，请查看 Docker 进程表面攻击细节

#### 创建 docker 用户组并添加用户

    使用具有sudo权限的用户来登录你的Ubuntu。

    在这过程中，我们假设你已经登录了Ubuntu。

    创建 docker 用户组并添加用户。

     $ sudo usermod -aG docker ubuntu

    注销登录并重新登录

    这里要确保你运行用户的权限。

    验证 docker 用户不使用 sudo 命令开执行 Docker

     $ docker run hello-world

#### 调整内存和交换空间(swap accounting)

当我们使用 Docker 运行一个镜像的时候，我们可能会看到如下的信息提示：

WARNING: Your kernel does not support cgroup swap limit. WARNING: Your
kernel does not support swap limit capabilities. Limitation discarded.、

为了防止以上错误信息提示的出现，我们需要在系统中启用内存和交换空间。我们需要修改系统的 GUN GRUB (GNU GRand Unified Bootloader) 来启用内存和交换空间。开启方法如下：

    使用具有sudo权限的用户来登录你的Ubuntu。

    编辑 /etc/default/grub 文件

    设置 GRUB_CMDLINE_LINUX 的值如下：

     GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"

    保存和关闭文件

    更新 GRUB

     $ sudo update-grub

    重启你的系统。

### 允许UFW端口转发

当你在运行 docker 的宿主主机上使用UFW（简单的防火墙）。你需要做一些额外的配置。Docker 使用桥接的方式来管理网络。默认情况下，UFW 过滤所有的端口转发策略。因此，当在UFW启用的情况下使用 docker ,你必须适当的设置UFW的端口转发策略。

默认情况下UFW是过滤掉所有的入站规则。如果其他的主机能够访问你的容器。你需要允许Docker的默认端口(2375)的所有连接。

设置 UFW 允许Docker 端口的入站规则：

    使用具有sudo权限的用户来登录你的Ubuntu。

    验证UFW的安装和启用状态

     $ sudo ufw status

    打开和编辑/etc/default/ufw文件

     $ sudo nano /etc/default/ufw

    设置 DEFAULT_FORWARD_POLICY 如下：

    DEFAULT_FORWARD_POLICY="ACCEPT"

    保存关闭文件。

    重新加载UFW来使新规则生效。

     $ sudo ufw reload

    允许 Docker 端口的入站规则

     $ sudo ufw allow 2375/tcp

### Docker 配置 DNS 服务

无论是Ubuntu还是Ubuntu 桌面繁衍版在系统运行的时候都是使用/etc/resolv.conf配置文件中的127.0.0.1作为域名服务器(nameserver)。NetworkManager设置dnsmasq使用真实的dns服务器连接，并且设置 /etc/resolv.conf的域名服务为127.0.0.1。

在桌面环境下使用这些配置来运行 docker 容器的时候， Docker 用户会看到如下的警告：

WARNING: Local (127.0.0.1) DNS resolver found in resolv.conf and containers
can't use it. Using default external servers : [8.8.8.8 8.8.4.4]

该警告是因为 Docker 容器不能使用本地的DNS服务。相反 Docker 使用一个默认的外部域名服务器。

为了避免此警告，你可以给 Docker 容器指定一个DNS服务器。或者你可以禁用 NetworkManager 的 dnsmasq。不过当禁止 dnsmasq 可能使某些网络的DNS解析速度变慢。

为 Docker 指定一个DNS服务器

    使用具有sudo权限的用户来登录你的Ubuntu。

    打开并编辑 /etc/default/docker

     $ sudo nano /etc/default/docker

    添加设置

     DOCKER_OPTS="--dns 8.8.8.8"

    使用8.8.8.8替换如192.168.1.1的本地DNS服务器。你可以指定多个DNS服务器，多个DNS服务器使用空格分割例如

     --dns 8.8.8.8 --dns 192.168.1.1

        警告:如果你正在使用的电脑需要连接到不同的网络,一定要选择一个公共DNS服务器。

    保存关闭文件。

    重启 Docker 进程

     $ sudo restart docker  

或者，作为替代先前的操作过程，禁止NetworkManager中的dnsmasq(这样会使你的网络变慢)

    打开和编辑 /etc/default/docker

     $ sudo nano /etc/NetworkManager/NetworkManager.conf

    注释掉 dns = dsnmasq：

     dns=dnsmasq

    保存关闭文件

    重启NetworkManager 和 Docker

     $ sudo restart network-manager $ sudo restart docker

## 升级Docker

在wget的时候使用-N参数来安装最新版本的Docker：

$ wget -N https://get.docker.com/ | sh


# install docker-compose
```sh
sudo apt-get install python-pip
pip install docker-compse
```
