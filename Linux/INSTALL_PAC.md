## 本文pacmanager版本：4.5.5.7

### 1、下载安装包  

下载地址：https://sourceforge.net/projects/pacmanager/files/latest/download

### 2、安装

* `sudo dpkg -i pac-4.5.5.7-all.deb`安装过程可能会提示缺失依赖包等错误，请执行
* `sudo apt  --fix-broken install`

### 3、安装后启动

启动可能出现闪退，请执行如下命令，

sudo find /opt/pac/ -name "Vte.so*" -exec rm {} +

## 后记：pacmanager已不再维护，推荐使用替代者https://www.asbru-cm.net/  

### 下载地址：
```
https://cloudsmith.io/~asbru-cm/repos/release/packages/
```

### Repository 安装

#### DEBIAN/UBUNTU
```
curl -s https://packagecloud.io/install/repositories/asbru-cm/asbru-cm/script.deb.sh | sudo bash
sudo apt install asbru-cm
```
#### FEDORA
```
curl -s https://packagecloud.io/install/repositories/asbru-cm/asbru-cm/script.rpm.sh | sudo bash
sudo dnf install asbru-cm
```
#### ARCH / MANJARO
```
yaourt -S asbru-cm-git
```