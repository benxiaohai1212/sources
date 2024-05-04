## OpenSUSE 操作系统安装docker

SUSE Linux Enterprise
可以在 SUSE Linux Enterprise 12 或 更高版本上来运行 Docker 。这里需要注意的是由于 Docker 当前的限制，只能在64位的主机上运行。
```
安装 Docker 包
sudo zypper in docker

启动 docker 进程
sudo systemctl start docker

设置开机启动 docker
sudo systemctl enable docker

创建一个的叫 docker 的群组 ,如果想使用非 root 用户来运行，这个用户需要是 docker 群组的成员才可以与 docker 进程进行交互，你可以使用如下命令添加用户
sudo usermod -a -G docker <username>

如果你想要你的容器能够访问外部的网络，你就需要开启 net.ipv4.ip_forward 规则
/etc/sysconfig/SuSEfirewall2 文件来确保 FW_ROUTE 被设置成 yes
FW_ROUTE="yes"
```