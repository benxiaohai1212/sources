## Apache虚拟主机指南

1. 启用与停用站点的方法  
```
a2ensite 站点名   # 启用
a2dissite 站点名  # 停用
```

2. 基于名字的（通过域名来区分）的虚拟主机   

安装好apache以后默认有一个叫default的虚拟主机。  
新建虚拟主机时可以直接复制默认虚拟主机的配置文件，在其基础上修改新虚拟主机的配置参数。  
`cp /etc/apache2/site-available/default /etc/apache2/site-available/sitename`

3. 测试环境   

操作系统：Ubuntu Server 12.04 LTS  
测试机地址：10.39.6.59  
测试机域名：*.example.com  

4. 基本配置   

我们都知道，如果我们想在单台机器上设置多个域名或主机名时，我们就要用到基于名称的虚拟主机了。  
那么要如何进行设置呢？这就是本指南想解决的问题了。  
在 Ubuntu 的 /etc/apache2/ 目录下有个 Apache2 的主配置文件 apache2.conf。  
在该文件中我们可以看到下列字段：  
# Include the virtual host configurations:    
Include /etc/apache2/sites-enabled/[^.#]*（12.04版本里无[^.#]*）    

这行的意思表明该文件包含了 /etc/apache2/sites-enabled/ 目录中文件名不含 "." 或 "#" 这两个字符的所有文件。而当我们列出该目录的文件时，发现只有一个 000-default 的软链接文件，实际连接的是 /etc/apache2/sites-available 目录中的 default 文件，不难看出该文件的文件名中并不包含 "." 或 "#"。所以这个文件当然是要被配置文件 apache2.conf 所包含的了。打开该文件，发现它其实是一个虚拟主机的配置文件，不过由于该文件中的虚拟主机为 *，所以它实际上是一个通用配置文件。如果我们要建立虚拟主机的话，那么就要把该文件改成如下所示：
```
<VirtualHost *:80>  
ServerName www.firehare.com  
ServerAdmin admin@mail.firehare.com  
  
DocumentRoot /var/www/  
<Directory />  
Options FollowSymLinks  
AllowOverride None  
</Directory>  
<Directory /var/www/>  
Options Indexes FollowSymLinks MultiViews  
AllowOverride None  
Order allow,deny  
Allow from all  
# This directive allows us to have apache2's default start page  
# in /apache2-default/, but still have / go to the right place  
# Commented out for Ubuntu  
#RedirectMatch ^/$ /apache2-default/  
</Directory>  
  
ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/  
<Directory "/usr/lib/cgi-bin">  
AllowOverride None  
Options ExecCGI -MultiViews +SymLinksIfOwnerMatch  
Order allow,deny  
Allow from all  
</Directory>  
  
ErrorLog /var/log/apache2/error.log  
  
# Possible values include: debug, info, notice, warn, error, crit,  
# alert, emerg.  
LogLevel warn  
  
CustomLog /var/log/apache2/access.log combined  
ServerSignature On  
  
Alias /doc/ "/usr/share/doc/"  
<Directory "/usr/share/doc/">  
Options Indexes MultiViews FollowSymLinks  
AllowOverride None  
Order deny,allow  
Deny from all  
Allow from 127.0.0.0/255.0.0.0 ::1/128  
</Directory>  
  
</VirtualHost>   
```
下面我们    来分析一下上面这段设置中与虚拟主机有关的设置语句：   
 `NameVirtua    lHost :80`：表示我们要做的是一个基于名称的虚拟主机，监听的端口为80.  
 `<VirtualHost *:80> 和 </VirtualHost>`：表示在其中的是一个虚拟主机的配置。注意如果上面的字段指定了端口号，这里也要指定  
 `ServerName www.firehare.com`：设置虚拟主机的域名，www.firehare.com可以是你注册的任何域名  
 `ServerAdmin admin@mail.firehare.com`：设置该虚拟主机网管员的邮件  
 `DocumentRoot /var/www/`：设置该虚拟主机的主目录路径  
 `ErrorLog /var/log/apache2/error.log`：设置该虚拟主机的出错信息  
 `CustomLog /var/log/apache2/access.log combined`：设置该虚拟主机的访问信息  

这样我们就配置了一个虚拟主机 www.firehare.com。但由于这是缺省配置，所以在 Apache2 重启之后，无论你输入 DNS 服务器中指向这个主机的任何域名，都会被导向 www.firehare.com 这个缺省配置所指向的 /var/www 这个目录的。除非该域名被其他虚拟主机配置所用，比如我们还配置了 edunuke.firehare.com 指向本机，且配置了相应的虚拟主机，这样的话，输入域名 edunuke.firehare.com 就会被对应该域名的目录中。  

5. 进一步说明 

为了说明清楚 我们再添加一个虚拟主机站点 example.com，首先到 /etc/apache2/sites-available/ 目录中建立一个文件 edunuke.conf，编辑该文件： 
```
<VirtualHost *:80>  
    ServerName edunuke.example.com  
    ServerAdmin edunuke@mail.example.com  
    DocumentRoot "/var/www/edunuke/"  
    ErrorLog "/var/log/apache2/edunuke_errors.log"  
    CustomLog "/var/log/apache2/edunuke_accesses.log" common      
</VirtualHost> 
```
如果改变DocumentRoot 目录不在/var/www/下是会报403错误 
代码修改如下 
```
<VirtualHost *:80>  
    ServerName edunuke.example.com  
    ServerAdmin edunuke@mail.example.com  
    DocumentRoot  "/home/tomhat/workspace/edunuke/"  
    ErrorLog "/var/log/apache2/edunuke_errors.log"  
    CustomLog "/var/log/apache2/edunuke_accesses.log" common      
  
    directoryIndex  index.html index.php index.htm index.shtml login.php  
    <Directory "/home/tomhat/workspace/edunuke/">  
        Options All  
        AllowOverride All  
        Require all granted  
    </Directory>
</VirtualHost>
```
设置的具体含义同上面的相似，这是我就不再多说了。然后再运行命令：
`sudo a2ensite edunuke.conf`

这样的话，虚拟主机站点 edunuke.example.com 就已经安装好了。这时你也可以在 /etc/apache2/sites-enabled/ 目录中发现多了一个到 /etc/apache2/sites-available/edunuke 的软链接。接下来就是将 Apache2 重启来使虚拟主机站点运行起来
`sudo /etc/init.d/apache2 restart`这里可以使用reload 重新加载

这样你在浏览器上输入 edunuke.example.com 的话，就会被指向 /var/www/edunuke 目录了，而输入其他指向本机的域名则都会指到缺省配置中的 /var/www 目录中。熟悉 Apache2 的朋友会问为什么这样麻烦，放在一个文件中不也是可以吗？为什么要用两个文件呢？其实很简单，因为如果我要对 edunuke 站点进行维护时，我只要运行命令： 
```
sudo a2dissite edunuke.conf  
sudo /etc/init.d/apache2 restart
```

即可，这样既可以维护 edunuke 这个站点，同时还不影响其他站点的正常运行。
如果没有真实的域名需要配置hosts(/etc/hosts) 
`127.0.0.1 edunuke.example.com`
如此在浏览器输入http://localhost和http://edunuke.example.com 就是2个网站。
