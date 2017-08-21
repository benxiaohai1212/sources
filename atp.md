## apt学习： 

### (1)自动获取软件包，自动解决倚赖，自动配置，自动编译，常用命令： 

   apt-get  
   apt-cache

### (2)添加下面行到/ept/apt/sources.list （mount /dev/cdrom /media/cdrom） 

   deb file:/media/cdrom etch main  
   它会在/mnt/iso的dists下寻找Packages.gz，并在pool下寻找包文件  

### (3)apt-cache stats               显示数据源中包的统计信息 

   apt-cache search  vim         按关键字查找软件包  
   apt-cache show vim-common     这个包的详细信息  
   apt-cache depends vim-common   依赖，冲突，替换的包  
   apt-cache rdepends vim-common  反向依赖  

### (4)apt-get update                 从数据源更新软件包的列表，运行产生软件包数据库 

   apt-get upgrade                更新所有软件包（慎用，不要用！）  

### (5)apt-get install lynx           安装软件包 

   apt-get -y install lynx        安装时不提问是否确认  
   apt-get --reinstall install lynx               重装  
   apt-get remove lynx && dpkg -l |grep lynx      删除，不删除配置文件  
   apt-get --purge remove lynx                    删除，并删除配置文件  

### (6)apt-get install安装的软件包会下载到/var/cache/apt/archives中， 

   删除请用：apt-get clean  
   不要用：rm -fr /var/cache/apt/archives/* 

### (7)apt-cache showsrc lynx         搜索源程序 

   apt-get source lynx            下载源程序到当前目录  
   apt-get build-dep lynx         编译依赖软件包  

### (8)必杀技：apt-get -f install     纠正安装依赖  
