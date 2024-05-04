## 解决Sublime打开新文件时替换上次打开的文件问题
Preferences --> Settings
```
// Preview file contents when clicking on a file in the side bar. Double
// clicking or editing the preview will open the file and assign it a tab.
// - true: Always preview on click, including right click
// - false: Never preview
// - "only_left": Only preview on left click, right click will change the
//                selection but not preview the file.
"preview_on_click": true,
```
修改"preview_on_click" : false，则以后只有双击才能打开文件
```
"preview_on_click": false,
```


## Ubuntu安装Sublime Text并输入中文

#### 第一步：安装搜狗输入法  

在搜狗输入法官网获得sogou for Linux的deb包并安装


#### 第二步：安装sublime text3

打开终端（Ctrl + Alt + t），输入下面代码：

sudo add-apt-repository ppa:webupd8team/sublime-text-3

按回车

输入下面代码并回车：

sudo apt-get update  
待升级完毕后。输入下面代码并回车

sudo apt-get install sublime-text-installer
静候sublime text安装完成

#### 第三步：安装package control（非必须，但推荐安装）

在桌面创建sublime text的快捷方式并打开sublime text（在文件管理器进入/usr/share/applications文件夹并复制图标到桌面就可以）

然后按快捷键ctrl+`(Esc以下那个键)，在弹出的命令输入窗体输入以下信息并回车
```
import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```
https://packagecontrol.io/installation

然后静候package control完毕安装又一次启动SublimeText 3，然后使用快捷键Ctrl + Shift + p，在弹出的输入框中输入Package Control则能够看到Install Package的选项进行python开发的同学直接ctrl+b就能执行python程序了。有人推荐学习c/c++的同学安装C++ snipptes。ConvertToUTF8，SublimeAStyleFormatter等插件

#### 第四步：改动sublime_imfix.c

打开终端，输入

gedit sublime_imfix.c
把打开的文本改为下面代码：
```
#include <gtk/gtkimcontext.h>
void gtk_im_context_set_client_window (GtkIMContext *context,GdkWindow    *window)
{
 GtkIMContextClass *klass;
 g_return_if_fail (GTK_IS_IM_CONTEXT (context));
 klass = GTK_IM_CONTEXT_GET_CLASS (context);
 if (klass->set_client_window)
   klass->set_client_window (context, window);
 g_object_set_data(G_OBJECT(context),"window",window);
 if(!GDK_IS_WINDOW (window))
   return;
 int width = gdk_window_get_width(window);
 int height = gdk_window_get_height(window);
 if(width != 0 && height !=0)
   gtk_im_context_focus_in(context);
}
```

 按保存并关闭文本

#### 第五步：将sublime_imfix.c编译成共享库libsublime-imfix.so

（so文件是linux的动态库文件。类似windows的dll文件）

编译须要gtk工具包。约为100M，推荐各位在网络状况良好和选择了合适的软件源的情况下进行。

在终端输入：

`sudo apt-get install gnome-core-devel`
然后将代码编译成共享库。此步没有反应就是最好的反应：

`gcc -shared -o libsublime-imfix.so sublime_imfix.c  `pkg-config --libs --cflags gtk+-2.0` -fPIC`


然后输入下面代码将libsublime-imfix.so复制到sublime_text所在目录。此步相同是没有反应就是最好的反应
sudo mv libsublime-imfix.so /opt/sublime_text/

#### 第六步：使双击打开的sublime text能输入中文

（这一步事实上是在sublime text的快捷方式中添加执行上一步编译的libsublime-imfix.so的代码）

在终端中输入下面命令：

sudo gedit /usr/share/applications/sublime_text.desktop


把打开的文本改为下面代码：
```
[Desktop Entry]
Version=1.0
Type=Application
Name=Sublime Text
GenericName=Text Editor
Comment=Sophisticated text
Exec=bash -c "LD_PRELOAD=/opt/sublime_text/libsublime-imfix.so exec /opt/sublime_text/sublime_text %F"
Terminal=false
MimeType=text/plain;
Icon=sublime-text
Categories=TextEditor;Development;Utility;
StartupNotify=true
Actions=Window;Document;

[Desktop Action Window]
Name=New Window
Exec=bash -c "LD_PRELOAD=/opt/sublime_text/libsublime-imfix.so exec /opt/sublime_text/sublime_text -n"
OnlyShowIn=Unity;

[Desktop Action Document]
Name=New File
Exec=bash -c "LD_PRELOAD=/opt/sublime_text/libsublime-imfix.so exec /opt/sublime_text/sublime_text --command new_file"
OnlyShowIn=Unity;
```
又一次创建快捷方式。重新启动sublime text。按ctrl+空格激活搜狗输入法，就能愉快地输入中文了。

PS：有些同学喜欢在终端使用命令行来打开sublime text，这须要下面步骤：

（原理同第六步）
在终端输入

sudo gedit /usr/bin/subl
把打开的文本改为下面代码：
```
#!/bin/sh
LD_PRELOAD=/opt/sublime_text/libsublime-imfix.so exec /opt/sublime_text/sublime_text "$@"
```
照例按保存并关闭文本
这样在终端中输入subl 将能够使用搜狗输入中文

#### 第四和第五步可以省略，克隆`https://github.com/lyfeyaj/sublime-text-imfix.git`按其操作然后完成第六步即可，已经验证过了。