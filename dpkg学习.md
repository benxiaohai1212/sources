## dpkg 常用命令及解释
```txt
dpkg -i package.deb ###安装包
dpkg -r package ###删除包
dpkg -P package ###删除包（包括配置文件）
dpkg -L package ###列出与该包关联的文件
dpkg -l package ###显示该包的版本
dpkg --unpack package.deb ###解开 deb 包的内容
dpkg -S keyword ###搜索所属的包内容
dpkg -l ###列出当前已安装的包
dpkg -c package.deb ###列出 deb 包的内容
dpkg --configure package ###配置包
dpkg-reconfigure package 　　###重新配制一个已经安装的包裹
dpkg-reconfigure --frontend=dialog debconf ###如果安装时选错了配置信息，这里可以改回来.
dpkg --force-all --purge ###有些软件很难卸载，而且还阻止了别的软件的应用，就可以用这个，不过有点冒险.
```
更多选项可通过 dpkg -h 查询，有些指令需要超级用户权限才能执行，故执行时，一般需 在dpkg 前加sudo （例：sudo dpkg -i package.deb）。

dpkg配置及缓存信息：系统中所有的包信息都在/var/lib/dpkg下.其中/var/lib/dpkg/info目录中保存了各个软件包的信息及管理文件. 提供这些信息仅供了解，一般不需要更改。

每个文件的作用如下:  
".conffiles" 文件记录软件包的配置列表.  
".list" 文件记录了软件包的文件列表,用户可在文件当中找到软件包文件的具体安装位置.  
".md5sums" 文件记录了md5信息,用来进行包的验证的.  
".config" 文件是软件包的安装配置脚本.  
".postinst" 脚本是完成Debian包解开之后的配置工作,通常用来执行所安装软件包相关的命令和服务的重新启动.  
".preinst" 脚本在Debain解包之前运行,主要作用是是停止作用于即将升级的软件包服务直到软件包安装或和升级完成.  
".prerm" 脚本负责停止与软件包关联的daemon服务,在删除软件包关联文件之前执行.  
".postrm" 脚本负责修改软件包链接或文件关联,或删除由它创建的文件.  
