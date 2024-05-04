## Linux下安装Navicat数据库客户端

首先登陆Navicat官网下载Linux版本： https://www.navicat.com.cn/download/navicat-premium

1. 下载 navicat112_premium_cs_x64.tar.gz 文件 

2. 下载后解压tar文件
```
tar -zxvf  /home/wilbur/download/navicat112_premium_cs_x64.tar.gz  
```
3. 解压后  进入解压后的目录运行命令：  
./start_navicat   

OK，这样就完啦

创建Navicat快捷方式，cd usr/share/applications，sudo vim navicat.desktop

[Desktop Entry]
Encoding=UTF-8
Name=Navicat
Comment=Navicat Premium
Exec=/opt/Navicat/start_navicat
Icon=/opt/Navicat/navicat.png
Terminal=false
StartupNotify=true
Type=Application
Categories=Application;Development;
连接上数据库后里面的中文数据是乱码，如果是用的中文版，界面也会是乱码，需要修改字符集，修改方法:

1.打开`start_navicat`文件，会看到 `export LANG="en_US.UTF-8"` 将这句话改为 `export LANG="zh_CN.UTF-8"`

2.查看系统支持的字符集: locale -a 

3.修改字符集: export LANG=zh_CN.utf8 

注意：start_navicat文件和终端locale命令的返回信息这一句：`export LANG=zh_CN.utf8`一定要保持一致