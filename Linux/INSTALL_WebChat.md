## Linux系统安装Deppin微信

1. `wget -O- https://deepin-wine.i-m.dev/setup.sh | sh`  
2. sudo dpkg -i http://ftp.filearena.net/pub/ubuntu/pool/main/libf/libffi/libffi7_3.3-4_amd64.deb
3. sudo dpkg -i http://ftp.filearena.net/pub/ubuntu/pool/universe/p/pygobject/python-gi_3.36.0-1_amd64.deb  
2.1 sudo echo "deb http://cz.archive.ubuntu.com/ubuntu focal main" >> /etc/apt/source.list  
2.2 sudo apt-get update  
2.3 sudo apt-get install -y libffi7  
2.4 sudo apt-get install -y python-gi  
4. sudo apt-get install com.qq.weixin.deepin -o APT::Immediate-Configure=0

[https://blog.csdn.net/qq_36591505/article/details/115675488]

## Linux系统安装docker微信

### 1. 必备条件

#### 1.1 安装docker 
`curl -sLl https://get.docker.com | sh` 或 `sudo apt-get install docker.io` 如果已安装docker跳过此步;

### 2. 安装微信

```
#Install wechat
bash <(curl -L -s https://raw.githubusercontent.com/ygcaicn/ubuntu_qq/master/wechat.sh)
```
等几分钟下载镜像并启动微信扫码登陆。  
用sudo docker images 可以看到下载的镜像  
sudo docker ps -a可以看到启动的容器  

### 3. 关机之后再次打开微信

```
wget https://raw.githubusercontent.com/ygcaicn/ubuntu_qq/master/wechat.sh
chmod +x wechat.sh
./wechat --start 如果没成功就是容器没启动起来
./wechat --instance可以新建一个容器
./wechat --help可以查看帮助
```

### 4. 升级微信
```
docker exec -it wechat /bin/bash
su - wechat
mkdir /tmp/wechat
cd /tmp/wechat
wget https://dldir1.qq.com/weixin/Windows/WeChatSetup.exe
env WINEPREFIX=~/.deepinwine/Deepin-WeChat deepin-wine WeChatSetup.exe
```
参考：

Ubuntu安装QQ/微信（超级稳定版）

https://zhuanlan.zhihu.com/p/96530693