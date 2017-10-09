### 

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
下载安装包（参见Downloads部分）
https://github.com/docker/compose/releases
 
上传到服务器
 
更改目录及文件、修改访问权限
sudo mv <download_filename> /usr/local/bin/docker-compose
chmod 755 /usr/local/bin/docker-compose
 
验证是否安装成功
docker-compose --version
