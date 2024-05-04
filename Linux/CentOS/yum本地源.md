## 在断网情况下配置yum本地源

步骤：

安装软件，创建文件夹并把rpm包拉进来，创建rpm资源库，修改配置，更新安装源  

### （1）安装createrepo软件：

先安装依赖包  
deltarpm-3.5-0.5.20090913git.el6.x86_64.rpm  
python-deltarpm-3.5-0.5.20090913git.el6.x86_64.rpm  
libxml2-python-2.7.6-21.el6.x86_64.rpm（因这里是在centos6.8-mini版本的，所以还需要这个依赖包）  
安装完依赖包后，安装包createrepo-0.9.9-17.el6.noarch.rpm  
createrepo-0.9.9-17.el6.noarch.rpm

注：安装命令：rpm -ivh软件包  
`rpm -ivh deltarpm-3.5-0.5.20090913git.el6.x86_64.rpm python-deltarpm-3.5-0.5.20090913git.el6.x86_64.rpm createrepo-0.9.9-17.el6.noarch.rpm`

### （2）创建rpm文件夹

[root@mwd-mi home]#mkdir yumrpm  

然后把以后有可能需要安装的rpm包放到这个文件夹。

### （3）创建rpm资源库

[root@mwd-mi home]#createrepo /home/yumrpm

Spawning worker 0 with26pkgs

重点看红色部分，这里放进26个rpm包，表示创建成功。

### （4）创建一个配置文件

[root@mwd-mi home]#cd /etc/yum.repos.d

创建一个yumbak文件夹，把/etc/yum.repos.d这个路径下的所有文件放到新建的文件夹

[root@mwd-mi yum.repos.d]#mv *.repo yumbak

创建一个后缀为repo的文件

[root@mwd-mi yum.repos.d]#vi CentOS-Local.repo

文件内容如下:
```
[Local]
name=Local-Yum
baseurl=file:///home/yumrpm
gpgcheck=0
enabled=1
```
注释：  
 _gpgcheck:是GPG验证是否开启的选项，1是开启，0是不开启，一般情况可以关掉.  
enabled:软件仓库被配置成 enabled=0 时，yum 在安装或升级软件包时不会将该仓库做为软件包提供源。使用这个选项，可以启用或禁用软件仓库。  
baseurl:支持的协议有 http:// ftp:// file:// 三种  _ 

```
cat >>/etc/yum.repos.d/CentOS-Local.repo<<EOF
[Local]
name=Local-Yum
baseurl=file:///home/yumrpm
gpgcheck=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
enabled=1
EOF
```

### （5）更新安装源  

清空缓存  
[root@mwd-mi yum.repos.d]#yum clean all  

重新建立缓存  
[root@mwd-mi yum.repos.d]#yum makecache

查看yum源

[root@mwd-mi yum.repos.d]#yum repolist  
Loaded plugins: fastestmirror  
Loading mirror speeds from cached hostfile  
repo id       repo name        status  
rpm-repo      rpm-repo           26  
repolist: 26

这时yum的本地源创建成功，也可以试着安装一个软件包，当然前提是拉进来的rpm包有：yum install 软件包  
注：其他命令---yum update  
经测试，如果更新了软件包，需要重新创建yum库，即从第三步creatrep /home/yumrpm开始。