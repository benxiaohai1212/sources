## 用FPM制作RPM安装包

RPM安装包一般由rpmbuild和fpm两种方式制作，下面解释fpm方式制作RPM安装包。

参考地址：  
【https://github.com/jordansissel/fpm/wiki】  
【https://www.cnblogs.com/Roach57/p/5130283.html】  
【http://www.bubuko.com/infodetail-973749.html】  

### 一.FPM的介绍:

1.FPM项目地址:("https://github.com/jordansissel/fpm")  
2.FPM是一个打包工具[ruby的一个模块]

### 二.FPM的安装:

1.安装依赖包:
```
    [CentOS类系统]
    yum -y groupinstall "Development Tools"
    yum -y install ruby ruby-devel rubygems gcc openssl-devel
```

2.安装FPM:
```
    *添加淘宝的Ruby仓库，淘宝源已不在
        gem sources --add http://ruby.taobao.org/
    *移除原生的Ruby仓库
        gem sources --remove http://rubygems.org/
    *更换Ruby源：  
        gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/  
        gem sources -l # 确保只有 gems.ruby-china.com
    *升级gem:
        gem update --system
    *安装fpm
        gem install arr-pm fpm
```
淘宝的Ruby仓库加不上可以加阿里的仓库`gem sources -a http://mirrors.aliyun.com/rubygems/`


3.shell脚本化安装FPM:
```
    [root@localhost ~]# cat fpm_install.sh 
    #!/bin/bash

    Fpm_Install(){
    cat <<EOF
        Install Fpm packages
        Fpm is based on ruby,Frist you need to install ruby and Install Fpm after that.
    EOF
        yum -y install ruby rubygems ruby-devel gcc openssl-devel
        gem sources --add https://ruby.taobao.org/
        gem sources --remove http://rubygems.org/
        gem install arr-pm fpm
    }
    Fpm_Install
```

三.FPM常用参数:
```
-f :强制覆盖[覆盖同名rpm包]
-n :指定的rpm包名
-p :指定的rpm包文件放置位置
-v :指定的rpm包版本

-a :指定系统架构,如果是noarch则为'-a all' 或者 '-a native' [x86_64] 当软件不区分64位或32位的时候可以 noarch
-s :指定INPUT的数据类型 (["-s dir"] 省略数据类型)
-m :指定打包人员[Packager]  ([ -m 'user'])
-C :指定打包的相对路径,类似于buildroot. 譬如-C /tmp/apr/ 而打包机器的数据包路径是/tmp/apr/{opt,usr,etc} 那安装这个rpm包后,在本地的数据就是/opt/,/usr/,/etc/
-t :指定需要制作成什么包,可选项有(deb,rpm,solaris,etc)
    支持的源类型:：
        "dir" "rpm" "gem" "python" "empty" "tar" "deb" "cpan" "npm" "osxpkg" "pear" "pkgin" "virtualenv" "zip"
    支持的目标类型:
        "rpm" "deb" "solaris" "puppet" "dir" "osxpkg" "p5p" "puppet" "sh" "solaris" "tar" "zip"
-d，--depends    :指定依赖的软件   ( [-d 'name'] or [-d 'name > version'] 例子: -d 'libstdc++ >= 4.4.3')
--description    :软件包描述
--provides       :指定软件包提供的
--conflicts      :指定冲突软件
--url            :指定站点[惯例都是添加软件的官网 例如: --url "http://www.cnblog.com/roach57" ]
--verbose        :安装过程详细打印
--after-install  :包安装之后执行的脚本 也可写作 --post-install FILE
--before-install :包安装之前执行的脚本 
--after-remove   :包卸载之后执行的脚本
--before-remove  :包卸载之前执行的脚本
--after-upgrade  :包更新之后执行的脚本[仅支持 deb 和 rpm 这两种包]
--before-upgrade :包更新之前执行的脚本
--iteration      :发布序号[就是rpm包里面的release]
--epoch          :纪元  [不知道干嘛用的]
--no-rpm-sign    :不使用rpm签名   Signature
--license        :证书许可 [可选项有 'BSD(开源软件)'、'GPLv2(自由软件)'、'MIT'、'Public Domain(公共域)'、'Distributable(贡献)'、'commercial(商业)'、'Share(共享)等',一般的开发都写'BSD'或'GPL']
--vendor         :供应商名称 [ --vendor 'roach57@163.com']
--no-depends     :代表没有任何依赖包,和-d是对立的,不能共用
--config-files   :指定配置文件,可以指定目录[递归]
--directories    :指定包目录
--category       :软件所属的类别[这是个什么软件]下面有个对应的表格:
    [参考这个文件 /usr/share/doc/rpm-x.x.x/GROUPS ]
    Amusements/Games [娱乐/游戏]
    Amusements/Graphics [娱乐/图形]
    Applications/Archiving [应用/文档]
    Applications/Communications [应用/通讯]
    Applications/Databases [应用/数据库]
    Applications/Editors [应用/编辑器]
    Applications/Emulators [应用/仿真器]
    Applications/Engineering [应用/工程]
    Applications/File [应用/文件]
    Applications/Internet [应用/因特网]
    Applications/Multimedia [应用/多媒体]
    Applications/Productivity [应用/产品]
    Applications/Publishing [应用/印刷]
    Applications/System [应用/系统]
    Applications/Text [应用/文本]
    Development/Debuggers [开发/调试器]
    Development/Languages [开发/语言]
    Development/Libraries [开发/函数库]
    Development/System [开发/系统]
    Development/Tools [开发/工具]
    Documentation [文档]
    System Environment/Base [系统环境/基础]
    System Environment/Daemons [系统环境/守护]
    System Environment/Kernel [系统环境/内核]
    System Environment/Libraries [系统环境/函数库]
    System Environment/Shells [系统环境/接口]
    User Interface/Desktops [用户界面/桌面]
    User Interface/X [用户界面/X窗口]
    User Interface/X Hardware Support [用户界面/X硬件支持]
```

四.RPM包的组成格式:
```
roach-1.0.1-57.el6.x86_64.rpm
  |    |     |       |     |
软件名称|     |       |     |
     版本号   |       |　　 |
           发布号     |     |
                   硬件平台 |
                          扩展名
```
```txt
例子备注:
    roach  :软件名称
    1.0.1  :软件版本号
    57.el6 :发布号主要是对软件存在的bug或漏洞进行修补,在软件功能上并没有变化,el6指的是rhel6系统中发布
    x86_64 :指64位的PC架构,另外还有'i386' 'i686' 等32位的PC架构,noarch是指不区分硬件架构
    rpm    :扩展名
```    

以上就是抄来的，下面是我结合参考实践过的。
```
mkdir -p /data/{download,rpms/pkgs}
wget https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tgz -O /data/download/Python-3.6.4.tgz
cd /data/download/
tar xf Python-3.6.4.tgz
cd Python-3.6.4
export DIR_PY_SRC_INSTALL=/data/rpms/Python-3.6.4
export DIR_PY_RPM_INSTALL=/usr/local
export LDFLAGS="-Wl,-rpath=${DIR_PY_RPM_INSTALL}/lib ${LDFLAGS}"
./configure --prefix=${DIR_PY_RPM_INSTALL}
make
make install DESTDIR=${DIR_PY_SRC_INSTALL}

[root@localhost Python-3.6.4]# tree /data/rpms/ -L 4
/data/rpms/
├── pkgs
└── Python-3.6.4
    └── usr
        └── local
            ├── bin
            ├── include
            ├── lib
            └── share

```
准备工作均已做完。开始打包：
```
fpm -f -s dir -t rpm -p $(pwd) -n python3 -v '3.6.4' \
	-C ${DIR_PY_SRC_INSTALL} \
	--directories=${DIR_PY_RPM_INSTALL}/lib \
	--directories=${DIR_PY_RPM_INSTALL}/include \
	--category=Development/Languages \
	--url 'https://www.python.org/downloads/release/python-364/' \
	--description 'Python3.6.4' \
	--vendor 'www.asiacom.net.cn' \
	--license 'GPL' \
	--iteration 1.el7 \
	-d 'openssl' \
	-d 'bzip2' \
	-d 'zlib' \
	-d 'expat' \
	-d 'sqlite' \
	-d 'ncurses' \
	-d 'readline' \
	-d 'gcc' \
	-m "zhangliqiang@asiacom.net.cn" 
```
查看RPM的属性信息
```
[root@localhost Python-3.6.4]# rpm -pqi python3-3.6.4-1.el7.x86_64.rpm 
Name        : python3
Version     : 3.6.4
Release     : 1.el7
Architecture: x86_64
Install Date: (not installed)
Group       : Development/Languages
Size        : 185755591
License     : GPL
Signature   : (none)
Source RPM  : python3-3.6.4-1.el7.src.rpm
Build Date  : 2019年03月19日 星期二 17时38分06秒
Build Host  : localhost
Relocations : / 
Packager    : zhangliqiang@asiacom.net.cn
Vendor      : www.asiacom.net.cn
URL         : https://www.python.org/downloads/release/python-364/
Summary     : Python3.6.4
Description :
Python3.6.4
```
RPM包验证:
```
[root@localhost rpms]# rpm -K mysql-5.7.20-1.el7.x86_64.rpm 
mysql-5.7.20-1.el7.x86_64.rpm: sha1 md5 确定
```
查看RPM包目录结构:
```
[root@localhost ~]# rpm -qpl roach-1.0.1-57.el6.x86_64.rpm
        /temp/roach/tmp/mk_dir.sh
        /temp/roach/tmp/rm_dir.sh
        /temp/roach/roach_test
```
查看RPM包中的脚本信息:
```
[root@localhost rpms]# rpm -pq --scripts mysql-5.7.20-1.el7.x86_64.rpm 
preinstall scriptlet (using /bin/sh):
#!/bin/bash

/usr/sbin/groupadd -g 27 -o -r mysql >/dev/null 2>&1 || :
/usr/sbin/useradd -M -N -g mysql -o -r -d /var/lib/mysql -s /bin/false \
    -c "MySQL Server" -u 27 mysql >/dev/null 2>&1 || :
postinstall scriptlet (using /bin/sh):
#!/bin/bash

/bin/touch /var/log/mysqld.log >/dev/null 2>&1 || :
/bin/chown mysql:mysql -R /var/log/mysqld.log /var/run/mysqld /var/lib/mysql /var/lib/mysql-files /var/lib/mysql-keyring>/dev/null 2>&1 || :
/usr/bin/systemctl enable mysqld >/dev/null 2>&1 || :
/usr/bin/systemctl restart mysqld.service >/dev/null 2>&1 || :
preuninstall scriptlet (using /bin/sh):
#!/bin/bash

# Package removal, not upgrade 
systemctl --no-reload disable mysqld.service > /dev/null 2>&1 || : 
systemctl stop mysqld.service > /dev/null 2>&1 || :
postuninstall scriptlet (using /bin/sh):
#!/bin/bash

systemctl daemon-reload >/dev/null 2>&1 || :
mv /var/lib/mysql /var/lib/mysql-$(data +%Y%m%d-%H%M)
rm -rf /usr/share/doc/mysql-community-*
rm -rf /usr/share/mysql /usr/lib64/mysql/
```
rpm的安装:
```
* rpm默认安装时默认的根目录就是系统的'/':
* rpm手动指定安装时的根目录[ --prefix=/temp/roach]:
[root@localhost ~]# rpm -ivh roach-1.0.1-57.el6.x86_64.rpm --prefix=/temp/roach
```