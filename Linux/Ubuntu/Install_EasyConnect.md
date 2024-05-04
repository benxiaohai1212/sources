### ubuntu 20.04 下安装easyconnect记录

1、easyconnect在ubuntu20下无法打开；  
2、在解决第一个问题后在easyconnect登陆过程中闪退

下载EasyConnect,[地址](https://sslvpn.zjweu.edu.cn/com/installClient.html)

1. 首先是解决easyconnect不兼容ubuntu20的问题
* https://packages.ubuntu.com/eoan/libpango-1.0-0
* https://packages.ubuntu.com/eoan/libpangocairo-1.0-0
* https://packages.ubuntu.com/eoan/libpangoft2-1.0-0  
或者  
网盘下载[https://wws.lanzous.com/b01nmd4sh](https://wws.lanzous.com/b01nmd4sh) 密码：76yn

分别下载这三个包。

使用teminal进入下载的三个包所在的目录，用命令`dpkg -X libpangoXXXX.deb ./`

2. 进入解压的目录
```
cd usr/lib/x86_64-linux-gnu
```

3. 将解压得到的.so文件拷贝到easyconnect目录下
```
sudo cp * /usr/share/sangfor/EasyConnect
```

4. 此时在/usr/share/sangfor/EasyConnect目录下输入命令
```
ldd EasyConnect | grep pango
```
显示应为（libpango应链接到复制过去的.so）
```
libpangocairo-1.0.so.0 => /usr/share/sangfor/EasyConnect/./libpangocairo-1.0.so.0 (0x00007f243f52d000)
	libpango-1.0.so.0 => /usr/share/sangfor/EasyConnect/./libpango-1.0.so.0 (0x00007f243f396000)
	libpangoft2-1.0.so.0 => /usr/share/sangfor/EasyConnect/./libpangoft2-1.0.so.0 (0x00007f243d6eb000)
```

重新启动EasyConnect.