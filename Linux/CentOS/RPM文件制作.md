## .RPM文件制作

http://www.rpm.org/max-rpm/index.html

什么是rpm包？  
    rpm 相当于windows中的安装文件，它会自动处理软件包之间的依赖关系。
  
- rpm优点：  

    > 包管理系统简单，通过几个命令就可以实现包的安装、升级、卸载。   
    > 安装速度比源码包快的多。  

- 缺点：  
    > 经过编译，不能看到源代码，功能选择不如源码灵活。依赖性强。  

```
rpmbuild 
-bp 执行到pre                         ; Execute %prep 只执行prep部分;
-bc 执行到 build段                    ; Execute %prep, %build   执行prep和build部分但没有install等部分；
-bi 执行install段                     ; Execute %prep, %build, %install, %chec
-bb 只生二进制的rpm                   ; Execute %prep, %build, %install, %check, package (bin)--相对‘-a’参数，少了构建源码包
-bs 只生成src的rpm 
-ba 既生成src.rpm又生成二进制rpm      ; Execute %prep, %build, %install, %check, package (bin, src)
-bl 检测有文件没包含                   ; Check %files list
```
可以先rpmbuild -bp ,再-bc 再-bi 如果没问题，rpmbuild -ba 生成src包与二进制包。
```
Error:
c++: internal compiler error: Killed (program cc1plus)
Please submit a full bug report,
```
内存不足造成


打rpm 包需要的东西有 源码、spec文件（打rpm包的脚本）、rpmbuild工具。  

1、 安装rpmbuild  

```
$ yum install rpmbuild
$ yum install rpmdevtools 
$ rpmdev-setuptree
```
此时rpmbuild已经安装好了，查看rpm打包目录 `rpmbuild --showrc | grep topdir` 
```
[root@localhost ~]# rpmbuild --showrc | grep topdir
-14: _builddir	%{_topdir}/BUILD
-14: _buildrootdir	%{_topdir}/BUILDROOT
-14: _rpmdir	%{_topdir}/RPMS
-14: _sourcedir	%{_topdir}/SOURCES
-14: _specdir	%{_topdir}/SPECS
-14: _srcrpmdir	%{_topdir}/SRPMS
-14: _topdir	%(echo $HOME)/rpmbuild
```
`rpm --showrc|grep _usrsrc` `rpm --showrc|grep _usr`  
```
[root@localhost opt]# rpm --showrc|grep _usrsrc
-14: _usrsrc	%{_usr}/src
[root@localhost opt]# rpm --showrc|grep _usr
-14: _usr	/usr
-14: _usrsrc	%{_usr}/src
```
通过`rpm --eval %{_datadir}`查看真实路径

系统宏变量定义在`/usr/lib/rpm/rpmrc`、`/usr/lib/rpm/redhat/rpmrc`、`/etc/rpmrc`、`~/.rpmrc | ~/.rpmmacros`
下面是宏对应路径一览表`/usr/lib/rpm/macros`：  
Macros mimicking autoconf variables 
```
%{_sysconfdir}        /etc

%{_prefix}            /usr

%{_exec_prefix}       %{_prefix}

%{_bindir}            %{_exec_prefix}/bin

%{_lib}               lib (lib64 on 64bit systems)

%{_libdir}            %{_exec_prefix}/%{_lib}

%{_libexecdir}        %{_exec_prefix}/libexec

%{_sbindir}           %{_exec_prefix}/sbin

%{_sharedstatedir}    /var/lib

%{_datadir}           %{_prefix}/share

%{_includedir}        %{_prefix}/include

%{_oldincludedir}     /usr/include

%{_infodir}           /usr/share/info

%{_mandir}            /usr/share/man

%{_localstatedir}     /var

%{_initddir}          %{_sysconfdir}/rc.d/init.d

%{_var}               /var

%{_tmppath}           %{_var}/tmp

%{_usr}               /usr

%{_usrsrc}            %{_usr}/src

%{_docdir}            %{_datadir}/doc

# ---- filesystem macros.
#
%_usr			/usr
%_usrsrc		%{_usr}/src
%_var			/var

#==============================================================================
# ---- Generally useful path macros.
#
%__7zip			/usr/bin/7za
%__awk			gawk
%__bzip2		/usr/bin/bzip2
%__cat			/usr/bin/cat
%__chgrp		/usr/bin/chgrp
%__chmod		/usr/bin/chmod
%__chown		/usr/bin/chown
%__cp			/usr/bin/cp
%__cpio			/usr/bin/cpio
%__file			/usr/bin/file
%__gpg			%{_bindir}/gpg2
%__grep			/usr/bin/grep
%__gzip			/usr/bin/gzip
%__id			/usr/bin/id
%__id_u			%{__id} -u
%__install		/usr/bin/install
%__ln_s			ln -s
%__lrzip		/usr/bin/lrzip
%__lzip			/usr/bin/lzip
# Deprecated, use %__xz instead.
%__lzma			%__xz --format=lzma
%__xz			/usr/bin/xz
%__make			/usr/bin/make
%__mkdir		/usr/bin/mkdir
%__mkdir_p		/usr/bin/mkdir -p
%__mv			/usr/bin/mv
%__patch		/usr/bin/patch
%__perl			/usr/bin/perl
%__python		/usr/bin/python
%__restorecon		/sbin/restorecon
%__rm			/usr/bin/rm
%__rsh			/usr/bin/rsh
%__sed			/usr/bin/sed
%__semodule		/usr/bin/semodule
%__ssh			/usr/bin/ssh
%__tar			/usr/bin/tar
%__unzip		/usr/bin/unzip
%__git			/usr/bin/git
%__hg			/usr/bin/hg
%__bzr			/usr/bin/bzr
%__quilt		/usr/bin/quilt

#==============================================================================
# ---- Build system path macros.
#
%__ar			ar
%__as			as
%__cc			gcc
%__cpp			gcc -E
%__cxx			g++
%__ld			/usr/bin/ld
%__nm			/usr/bin/nm
%__objcopy		/usr/bin/objcopy
%__objdump		/usr/bin/objdump
%__ranlib		ranlib
%__remsh		%{__rsh}
%__strip		/usr/bin/strip

# XXX avoid failures if tools are not installed when rpm is built.
%__libtoolize		libtoolize
%__aclocal		aclocal
%__autoheader		autoheader
%__automake		automake
%__autoconf		autoconf

```
进入rpmbuild 目录文件夹如下
```
[root@localhost rpmbuild]# ls
BUILD  BUILDROOT  RPMS  SOURCES  SPECS  SRPMS
```
各个文件夹的用途：

| 目录名    | 说明 |
|-----------|------|
| BUILD     |  编译RPM包的临时目录    |
| BUILDROOT |  编译后生成的软件临时安装目录    |
| RPMS      |  最终生成的可安装RPM包的所在目录    |
| SOURCES   |  所有源代码和补丁文件的存在目录    |
| SPECS     |  存放.specs文件的目录（重要）    |
| SRPMS     |  软件最终的RPM源码格式存放路径（暂时忽略掉）    |


2、 创建用户  

此处建议创建一个用户，用于rpm的打包操作

```
1. #创建用户
useradd rpmuser 
su - rpmuser 

2. #定义工作目录(或车间)吧
vi ~/.rpmmacros 
%_topdir   /home/rpmuser/rpmbuild    ##目录可以自定义 

mkdir ~/rpmbuild  
3. #在topdir下建立需要的目录
cd ~/rpmbuild  
mkdir -pv {BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}
```

3、整理源码  

rpmbuild安装完成以后我门就需要将我们的源码放到 SOURCE 文件夹下。我门的源码可能是一个tar.gz 的包、也可能是几个文件。

tar.gz源码包的名字格式应该为 helloword-1.0.0.tar.gz (其实就是名字-版本号.tar.gz)

4、编写spec文件  

在SPECS文件夹下新建 xxx.spec 打包脚本，其实也就是把我门的源码编译打包成rpm 的一个过程。

```
vi  xxx.spec 

Name:           hellorpm           #名字为源码tar.gz 包的名字 
Version:        1.0.0             #版本号，一定要与tar.gz包的一致哦 
Release:        1%{?dist}         #释出号，也就是第几次制作rpm 
Summary:       helloword   #软件包简介，最好不要超过50字符 

License:        GPL                   #许可，GPL还是BSD等  
URL:            #可以写一个网址 
Packager:       abel 
Source0:        %{name}-%{version}.tar.gz   
#定义用到的source，也就是你的源码

BuildRoot:      %_topdir/BUILDROOT         
#这个是软件make install 的测试安装目录.

BuildRequires:  gcc,make                           #制作过程中用到的软件包 
Requires:       python-apscheduler >= 2.1.2-1.el7,python-daemon >= 1.6-1.el7  #软件运行依赖的软件包，也可以指定最低版本如 bash >= 1.1.1 
# 例如PreReq、Requires(pre)、Requires(post)、Requires(preun)、Requires(postun)、BuildRequires等都是针对不同阶段的依赖指定
%description                #描述，随便写                 
%prep                          ＃打包开始                    
%setup -q                      #这个作用静默模式解压并cd                               


%build              #编译制作阶段，主要目的就是编译，如果不用编译就为空 
./configure \                                     
 %{?_smp_mflags}          #make后面的意思是：如果就多处理器的话make时并行编译 

%install                        #安装阶段                        
rm -rf %{buildroot}             #先删除原来的安装的，如果你不是第一次安装的话 
cp -rp %_topdir/BUILD/%{name}-%{version}/*  $RPM_BUILD_ROOT 
#将需要需要打包的文件从BUILD 文件夹中拷贝到BUILDROOT文件夹下。

#下面的几步pre、post、preun、postun 没必要可以不写 
%pre        #rpm安装前制行的脚本 

%post       #安装后执行的脚本 

%preun      #卸载前执行的脚本 

%postun     #卸载后执行的脚本 

%clean #清理段,删除buildroot 
rm -rf %{buildroot} 


%files  #rpm要包含的文件 
%defattr (-,root,root,-)   #设定默认权限，如果下面没有指定权限，则继承默认 
/etc/hello/word/helloword.c           #将你需要打包的文件或目录写下来

###  7.chagelog section  改变日志段 
%changelog
```
rpm包制作阶段

| 阶段      | 动作 |
|-----------|------|
| %prep     |  将%_sourcedir目录下的源代码解压到%_builddir目录下。如果有补丁的需要在这个阶段进行补丁的操作    |
| %build    |  在%_builddir目录下执行源代码包的编译。一般是执行./configure和make指令    |
| %install  |  将需要打包到RPM软件包里的文件从%_builddir下拷贝到%_buildrootdir目录下。当用户最终用rpm -ivh name-version.rpm安装软件包时，这些文件会安装到用户系统中相应的目录里    |
| 制作RPM包 |  这个阶段是自动完成的，所以在SPEC文件里面是看不到的，这个阶段将%_buildrootdir目录的相关文件制作成RPM软件包最终放到%_rpmdir目录里    |
| %clean    |  编译后的清理工作，这里可以执行make clean以及清空%_buildrootdir目录等    |


 **注意：** 
> 假如需要在 rpmbuild 生成软件包, 在安装时候忽略依赖关系请在 spec 文件中添加下面参数`AutoReqProv: no`
> 以上阶段如果没有操作的话，为空，但是不能有空行，例如build阶段为空应写为
```
%build              
%install  
xxxxxxxx   

错误示例：
%build   

%install  
xxxxxxxx
```

5、打包

spec 文件编写好以后就可以进行打包了。   
在SPECS文件夹下执行命令：`rpmbuild -bb xxx.spec`  

如果出错了可以通过 不同的命令来看是在打包的那一步出了问题。
```
rpmbuild 
-bp 执行到pre                         ; Execute %prep 只执行prep部分;
-bc 执行到 build段                    ; Execute %prep, %build   执行prep和build部分但没有install等部分；
-bi 执行install段                     ; Execute %prep, %build, %install, %chec
-bb 只生二进制的rpm                   ; Execute %prep, %build, %install, %check, package (bin)--相对‘-a’参数，少了构建源码包
-bs 只生成src的rpm 
-ba 既生成src.rpm又生成二进制rpm      ; Execute %prep, %build, %install, %check, package (bin, src)
-bl 检测有文件没包含                   ; Check %files list
```
可以先rpmbuild -bp ,再-bc 再-bi 如果没问题，rpmbuild -ba 生成src包与二进制包。
```
Error:
c++: internal compiler error: Killed (program cc1plus)
Please submit a full bug report,
```
内存不足造成

参考：  
http://blog.51cto.com/laoguang/1103628  
http://blog.chinaunix.net/uid-23069658-id-3944462.html


%prep 预处理脚本
```
预处理脚本，这个段是预处理段，通常用来执行一些解开源程序包的命令，为下一步的编译安装作准备。
%prep和下面的%build，%install段一样，可以执行RPM所定义的宏命令（以%开头）
还可以执行SHELL命令，命令可以有很多行，如我们常写的tar解包命令。
```
%setup
```
宏解压源代码
/usr/bin/gzip -dc xxxx.tgz # 把源码包解压并放好
/usr/bin/tar -xf -
通常是从/usr/src/asianux/SOURCES里的包解压到/usr/src/asianux/BUILD/%{name}-%{version}中
2. 参数
%setup 不加任何选项，仅将软件包打开
-q：q 参数给 %setup 宏。这会显著减少编译日志文件的输出，尤其是源代码包会解压出一堆文件的时候, 在安静模式下且最少输出
-c：%setup -c 解压缩之前先产生目录
-n：同时编译多个源码包，源码的tar包的名称与解压出来的目录不一致，此时，就需要使用-n参数指定一下例如：%setup -n newdir 将软件包解压到newdir目录
-D：#在解压之前禁止删除目录
-T：不使用default的解压缩操作。
-b：%setup -b num 将第num个source文件解压缩
%setup -q -n %{name}-%{version}：静默模式下 指定解压到新目录，名为%{name}-%{version}

%setup 不加任何选项，仅将软件包打开。 
%setup -n newdir 将软件包解压在newdir目录。 
%setup -c 解压缩之前先产生目录。 
%setup -b num 将第num个source文件解压缩。 
%setup -T 不使用default的解压缩操作。 
%setup -T -b 0 将第0个源代码文件解压缩。 
%setup -c -n newdir 指定目录名称newdir，并在此目录产生rpm套件。 
%patch 最简单的补丁方式，自动指定patch level。 
%patch 0 使用第0个补丁文件，相当于%patch ?p 0。 
%patch -s 不显示打补丁时的信息。 
%patch -T 将所有打补丁时产生的输出文件删除。
```
%build 
```
%build 开始构建包
在/usr/src/asianux/BUILD/%{name}-%{version}目录中进行mark的工作
定义编译软件包所要执行的命令， 这一节一般由多个make命令组成。
这些命令可以是 shell 命令，也可以是宏。
开始编译源码构建包，相当于configure以及make部分
%install 开始把软件安装到虚拟的根目录中
/usr/src/asianux/BUILD/%{name}-%{version}目录中进行make install的操作，路径不对的话，则下面%file中寻找文件的时候就会失败
常见内容 
%makeinstall：make DESTDIR=$RPM_BUILD_ROOT install
%install主要就是为了后面的%file服务的
%post rpm安装后执行的脚本
%preun rpm卸载前执行的脚本
%postun rpm卸载后执行的脚本
%preun %postun 的区别是什么呢？ 
前者在升级的时候会执行，后者在升级rpm包的时候不会执行
```

原文：https://blog.csdn.net/github_40094105/article/details/82470202 

jdk.spec  
```
Summary: Oracle JDK 8

%define prefix /opt/jdk8
%define _bindir /usr/bin
%define _mandir /usr/share/man
%define priority 2

%define name jdk
%define version 8
%define release 192
%define jdk_update %{release}

%global priority 91800%{jdk_update}

Name: %{name}
Version: %{version}
Release: %{release}
BuildArch: x86_64
Group: Development/Tools
License: http://java.com/license
URL: http://www.oracle.com/technetwork/java/index.html
Source0: jdk-8u%{jdk_update}-linux-x64.tar.gz
AutoReqProv: no
Provides:   java-sdk-1.8.0 = 1:%{version}
Provides:   java-sdk = 1:1.8.0
Provides:   java-1.8.0-devel = 1:%{version}
Provides:   java-devel = 1:1.8.0
Provides:   jre-1.8.0 = 1:%{version}
Provides:   java-1.8.0 = 1:%{version}
Provides:   jre = 1:1.8.0
Provides:   java = 1:1.8.0
Provides:   java-1.8.0-headless = 1:%{version}
Provides:   java-headless = 1:1.8.0
Provides:   jre-1.8.0-headless = 1:%{version}
Provides:   jre-headless = 1:1.8.0
Provides:   libjvm.so()(64bit)
%global debug_package %{nil}
%define __jar_repack %{nil}

%description
Oracle JDK

%prep
#if [ "x$(whoami)" = "xroot" ]; then echo "Do not build as root"; false; fi
%setup -cTn %{name}-%{version}

%build

%install
mkdir -p $RPM_BUILD_ROOT%{prefix}

cd $RPM_BUILD_ROOT%{prefix}

# Install all software without modification
gzip -dc %SOURCE0 | tar xp --strip-components 1
sed -e "s/#crypto.policy=unlimited/crypto.policy=unlimited/" -i jre/lib/security/java.security

%clean
#rm -rf $RPM_BUILD_ROOT

%files
%defattr(-,root,root)
%{prefix}

%post
alternatives \
  --install %{_bindir}/java java %{prefix}/bin/java %{priority} \
  --slave %{_bindir}/java_vm java_vm %{prefix}/jre/bin/java_vm \
  --slave %{_bindir}/javaws javaws %{prefix}/bin/javaws \
  --slave %{_bindir}/jcontrol jcontrol %{prefix}/bin/jcontrol \
  --slave %{_bindir}/keytool keytool %{prefix}/bin/keytool \
  --slave %{_bindir}/orbd orbd %{prefix}/bin/orbd \
  --slave %{_bindir}/pack200 pack200 %{prefix}/bin/pack200 \
  --slave %{_bindir}/policytool policytool %{prefix}/bin/policytool \
  --slave %{_bindir}/rmid rmid %{prefix}/bin/rmid \
  --slave %{_bindir}/rmiregistry rmiregistry %{prefix}/bin/rmiregistry \
  --slave %{_bindir}/servertool servertool %{prefix}/bin/servertool \
  --slave %{_bindir}/tnameserv tnameserv %{prefix}/bin/tnameserv \
  --slave %{_bindir}/unpack200 unpack200 %{prefix}/bin/unpack200 \
  --slave %{_mandir}/man1/java.1 java.1 %{prefix}/man/man1/java.1 \
  --slave %{_mandir}/man1/keytool.1 keytool.1 %{prefix}/man/man1/keytool.1 \
  --slave %{_mandir}/man1/orbd.1 orbd.1 %{prefix}/man/man1/orbd.1 \
  --slave %{_mandir}/man1/pack200.1 pack200.1 %{prefix}/man/man1/pack200.1 \
  --slave %{_mandir}/man1/policytool.1 policytool.1 %{prefix}/man/man1/policytool.1 \
  --slave %{_mandir}/man1/rmid.1 rmid.1 %{prefix}/man/man1/rmid.1 \
  --slave %{_mandir}/man1/rmiregistry.1 rmiregistry.1 %{prefix}/man/man1/rmiregistry.1 \
  --slave %{_mandir}/man1/servertool.1 servertool.1 %{prefix}/man/man1/servertool.1 \
  --slave %{_mandir}/man1/tnameserv.1 tnameserv.1 %{prefix}/man/man1/tnameserv.1 \
  --slave %{_mandir}/man1/unpack200.1 unpack200.1 %{prefix}/man/man1/unpack200.1
alternatives \
  --install %{_bindir}/javac javac %{prefix}/bin/javac %{priority} \
  --slave %{_bindir}/appletviewer appletviewer %{prefix}/bin/appletviewer \
  --slave %{_bindir}/apt apt %{prefix}/bin/apt \
  --slave %{_bindir}/extcheck extcheck %{prefix}/bin/extcheck \
  --slave %{_bindir}/HtmlConverter HtmlConverter %{prefix}/bin/HtmlConverter \
  --slave %{_bindir}/idlj idlj %{prefix}/bin/idlj \
  --slave %{_bindir}/jar jar %{prefix}/bin/jar \
  --slave %{_bindir}/jarsigner jarsigner %{prefix}/bin/jarsigner \
  --slave %{_bindir}/javadoc javadoc %{prefix}/bin/javadoc \
  --slave %{_bindir}/javah javah %{prefix}/bin/javah \
  --slave %{_bindir}/javap javap %{prefix}/bin/javap \
  --slave %{_bindir}/jconsole jconsole %{prefix}/bin/jconsole \
  --slave %{_bindir}/jdb jdb %{prefix}/bin/jdb \
  --slave %{_bindir}/jhat jhat %{prefix}/bin/jhat \
  --slave %{_bindir}/jinfo jinfo %{prefix}/bin/jinfo \
  --slave %{_bindir}/jmap jmap %{prefix}/bin/jmap \
  --slave %{_bindir}/jps jps %{prefix}/bin/jps \
  --slave %{_bindir}/jrunscript jrunscript %{prefix}/bin/jrunscript \
  --slave %{_bindir}/jsadebugd jsadebugd %{prefix}/bin/jsadebugd \
  --slave %{_bindir}/jstack jstack %{prefix}/bin/jstack \
  --slave %{_bindir}/jstat jstat %{prefix}/bin/jstat \
  --slave %{_bindir}/jstatd jstatd %{prefix}/bin/jstatd \
  --slave %{_bindir}/jvisualvm jvisualvm %{prefix}/bin/jvisualvm \
  --slave %{_bindir}/native2ascii native2ascii %{prefix}/bin/native2ascii \
  --slave %{_bindir}/rmic rmic %{prefix}/bin/rmic \
  --slave %{_bindir}/schemagen schemagen %{prefix}/bin/schemagen \
  --slave %{_bindir}/serialver serialver %{prefix}/bin/serialver \
  --slave %{_bindir}/wsgen wsgen %{prefix}/bin/wsgen \
  --slave %{_bindir}/wsimport wsimport %{prefix}/bin/wsimport \
  --slave %{_bindir}/xjc xjc %{prefix}/bin/xjc \
  --slave %{_mandir}/man1/appletviewer.1 appletviewer.1 %{prefix}/man/man1/appletviewer.1 \
  --slave %{_mandir}/man1/apt.1 apt.1 %{prefix}/man/man1/apt.1 \
  --slave %{_mandir}/man1/extcheck.1 extcheck.1 %{prefix}/man/man1/extcheck.1 \
  --slave %{_mandir}/man1/idlj.1 idlj.1 %{prefix}/man/man1/idlj.1 \
  --slave %{_mandir}/man1/jar.1 jar.1 %{prefix}/man/man1/jar.1 \
  --slave %{_mandir}/man1/jarsigner.1 jarsigner.1 %{prefix}/man/man1/jarsigner.1 \
  --slave %{_mandir}/man1/javac.1 javac.1 %{prefix}/man/man1/javac.1 \
  --slave %{_mandir}/man1/javadoc.1 javadoc.1 %{prefix}/man/man1/javadoc.1 \
  --slave %{_mandir}/man1/javah.1 javah.1 %{prefix}/man/man1/javah.1 \
  --slave %{_mandir}/man1/javap.1 javap.1 %{prefix}/man/man1/javap.1 \
  --slave %{_mandir}/man1/jconsole.1 jconsole.1 %{prefix}/man/man1/jconsole.1 \
  --slave %{_mandir}/man1/jdb.1 jdb.1 %{prefix}/man/man1/jdb.1 \
  --slave %{_mandir}/man1/jhat.1 jhat.1 %{prefix}/man/man1/jhat.1 \
  --slave %{_mandir}/man1/jinfo.1 jinfo.1 %{prefix}/man/man1/jinfo.1 \
  --slave %{_mandir}/man1/jmap.1 jmap.1 %{prefix}/man/man1/jmap.1 \
  --slave %{_mandir}/man1/jps.1 jps.1 %{prefix}/man/man1/jps.1 \
  --slave %{_mandir}/man1/jrunscript.1 jrunscript.1 %{prefix}/man/man1/jrunscript.1 \
  --slave %{_mandir}/man1/jsadebugd.1 jsadebugd.1 %{prefix}/man/man1/jsadebugd.1 \
  --slave %{_mandir}/man1/jstack.1 jstack.1 %{prefix}/man/man1/jstack.1 \
  --slave %{_mandir}/man1/jstat.1 jstat.1 %{prefix}/man/man1/jstat.1 \
  --slave %{_mandir}/man1/jstatd.1 jstatd.1 %{prefix}/man/man1/jstatd.1 \
  --slave %{_mandir}/man1/jvisualvm.1 jvisualvm.1 %{prefix}/man/man1/jvisualvm.1 \
  --slave %{_mandir}/man1/native2ascii.1 native2ascii.1 %{prefix}/man/man1/native2ascii.1 \
  --slave %{_mandir}/man1/rmic.1 rmic.1 %{prefix}/man/man1/rmic.1 \
  --slave %{_mandir}/man1/schemagen.1 schemagen.1 %{prefix}/man/man1/schemagen.1 \
  --slave %{_mandir}/man1/serialver.1 serialver.1 %{prefix}/man/man1/serialver.1 \
  --slave %{_mandir}/man1/wsgen.1 wsgen.1 %{prefix}/man/man1/wsgen.1 \
  --slave %{_mandir}/man1/wsimport.1 wsimport.1 %{prefix}/man/man1/wsimport.1 \
  --slave %{_mandir}/man1/xjc.1 xjc.1 %{prefix}/man/man1/xjc.1
 
%postun 
if [ $1 -eq 0 ]
then
  alternatives --remove java %{prefix}/bin/java
  alternatives --remove javac %{prefix}/bin/javac
fi
```