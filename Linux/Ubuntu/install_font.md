## Ubuntu 安装字体方法

以微软雅黑字体为例（其他的宋体、黑体等点阵字体都一样的），我们的雅黑字体文件是：Yahei.ttf(放在自己的主目录下）(在widows目录的Fonts目录下找需要的字体）
由于我是双系统，我直接从Win7中复制了 msyh.ttf和msyhbd.ttf 到Ubuntu下

1. 在/usr/share/fonts/下新建文件夹 如：winFonts目录，准备把从windows下拷贝过来的字体都放在这个目录里，这里就是把雅黑字体Yahei.ttf 放进来
```
sudo mkdir -p /usr/share/fonts/winFonts
```
2. 然后将字体文件拷贝到此文件夹下
```
sudo cp /home/username(用户名)/fonts/Yahei.ttf /usr/share/fonts/winFonts/
```
3. 然后，改变权限：
```
sudo chmod 644 /usr/share/fonts/winFonts/Yahei.ttf 
```
(改成755也没问题的，但起码要444,修改雅黑字体文件的权限为644，即当前用户读写，当前组用户只读，其他用户只读）

4. 开始安装：
```
cd /usr/share/fonts/winFonts/
```
```
sudo mkfontscale （创建雅黑字体的fonts.scale文件，它用来控制字体旋转缩放）
sudo mkfontdir （创建雅黑字体的fonts.dir文件，它用来控制字体粗斜体产生）
sudo fc-cache -fv （建立字体缓存信息，也就是让系统认识认识雅黑）
```

5. sudo gedit /etc/fonts/language-selector.conf （可选）
（打开语言选择设置文件）
分别找到   
Bitstream Vera Serif   
Bitstream Vera Sans   
Bitstream Vera Sans Mono   
分别添加   
Microsoft YaHei   

6、在菜单中 系统－首选项－字体 可以找到 “微软雅黑”

也可批量安装字体。在主目录下建立一个字体Fonts文件夹。(所有字体放在其中）
```
sudo mkdir -p /usr/share/fonts/winFonts
sudo cp ／home/zengq/Fonts/* /usr/share/fonts/winFonts/
```
然后，改变权限：
代码:
```
sudo chmod 644 /usr/share/fonts/winFonts/*
```
开始安装：
```
cd /usr/share/fonts/winFonts/
sudo mkfontscale
sudo mkfontdir
sudo fc-cache -fv
```