### 用CentOS的RDO做一键部署单节点openstack

* [文档](http://openstack.redhat.com/install/packstack/)
* [资源](https://repos.fedorapeople.org/repos/openstack/)

Summary for the impatient

If you are using non-English locale make sure your /etc/environment is populated:
```sh
LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```
If your system meets all the prerequisites mentioned below, proceed with running the following commands.
On RHEL:
```sh
$ sudo yum install -y https://www.rdoproject.org/repos/rdo-release.rpm
$ sudo yum update -y
$ sudo yum install -y openstack-packstack
$ sudo packstack --allinone
```
On CentOS:
```sh
$ sudo yum install -y centos-release-openstack-ocata
$ sudo yum update -y
$ sudo yum install -y openstack-packstack
$ sudo packstack --allinone
```
#### Step 0: Prerequisites

Software
Red Hat Enterprise Linux (RHEL) 7 is the minimum recommended version, or the equivalent version of one of the RHEL-based Linux distributions such as CentOS, Scientific Linux, and so on. x86_64 is currently the only supported architecture.
See RDO repositories for details on required repositories.
Name the host with a fully qualified domain name rather than a short-form name to avoid DNS issues with Packstack.
Hardware
Machine with at least 4GB RAM, preferably 6GB RAM, processors with hardware virtualization extensions, and at least one network adapter.
Network
If you plan on having external network access to the server and instances, this is a good moment to properly configure your network settings. A static IP address to your network card, and disabling NetworkManager are good ideas.
```sh
$ sudo systemctl disable firewalld
$ sudo systemctl stop firewalld
$ sudo systemctl disable NetworkManager
$ sudo systemctl stop NetworkManager
$ sudo systemctl enable network
$ sudo systemctl start network
```
If you are planning on something fancier, read the document on advanced networking before proceeding.
#### Step 1: Software repositories

On RHEL, download and install the RDO repository RPM to set up the OpenStack repository:
```sh
$ sudo yum install -y https://rdoproject.org/repos/rdo-release.rpm
```
On CentOS, the Extras repository provides the RPM that enables the OpenStack repository. Extras is enabled by default on CentOS 7, so you can simply install the RPM to set up the OpenStack repository:
```sh
$ sudo yum install -y centos-release-openstack-ocata
```
Update your current packages:
```text
$ sudo yum update -y
```
Looking for an older version? See http://rdoproject.org/repos/ for the full listing.
#### Step 2: Install Packstack Installer
```sh
$ sudo yum install -y openstack-packstack
```
#### Step 3: Run Packstack to install OpenStack

Packstack takes the work out of manually setting up OpenStack. For a single node OpenStack deployment, run the following command:
```sh
$ sudo packstack --allinone
```
If you encounter failures, see the Workarounds page for tips.
If you have run Packstack previously, there will be a file in your home directory named something like packstack-answers-20130722-153728.txt You will probably want to use that file again, using the --answer-file option, so that any passwords you have already set (for example, mysql) will be reused.
The installer will ask you to enter the root password for each host node you are installing on the network, to enable remote configuration of the host so it can remotely configure each node using Puppet.
Once the process is complete, you can log in to the OpenStack web interface Horizon by going to http://$YOURIP/dashboard. The user name is admin. The password can be found in the file keystonerc_admin in the /root directory of the control node.
Next steps

Now that your single node OpenStack instance is up and running, you can read on about running an instance, configuring a floating IP range, configuring RDO to work with your existing network, or about expanding your installation by adding a compute node.


以上操作安装的ocata,我总结的操作如下：

#### Step 0: Prerequisites

软件环境

需要企业版Red Hat 7(RHEL7)，或者CentOS、Scientific linux. x86_64

硬件环境

主机至少需要4GB内存，标配6GB内存；内核需要支持虚拟化（virtualization）；需要一块网卡


#### Step 1: 本地语言非en要设置本地语言 locale （此条可以忽略）
vim /etc/environment
```sh
LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```

#### Step 2：对网络、防火墙、网络管理工具设置
If you plan on having external network access to the server and instances, this is a good moment to properly configure your network settings. A static IP address to your network card, and disabling NetworkManager are good ideas.
```sh
$ sudo systemctl disable firewalld
$ sudo systemctl stop firewalld
$ sudo systemctl disable NetworkManager
$ sudo systemctl stop NetworkManager
$ sudo systemctl enable network
$ sudo systemctl start network
```

#### Step 3:安装源
```sh
// 最新版rdo源：
$ sudo yum install -y https://rdoproject.org/repos/rdo-release.rpm

// Mitaka源：
$ sudo yum install -y https://repos.fedorapeople.org/repos/openstack/openstack-mitaka/rdo-release-mitaka-7.noarch.rpm
```

#### Step 4:更新源
```sh
$ sudo yum update -y
```

#### Step 5: 安装openstack
```sh
$ sudo yum install -y openstack-packstack
```

#### Step 6:配置部署openstack
```sh
$ sudo packstack --allinone
```

过程：
```text
[root@localhost ~]# yum install -y https://repos.fedorapeople.org/repos/openstack/openstack-mitaka/rdo-release-mitaka-7.noarch.rpm
已加载插件：fastestmirror, langpacks
rdo-release-mitaka-7.noarch.rpm                                                                                                                           | 5.0 kB  00:00:00     
正在检查 /var/tmp/yum-root-0ABmA_/rdo-release-mitaka-7.noarch.rpm: rdo-release-mitaka-7.noarch
/var/tmp/yum-root-0ABmA_/rdo-release-mitaka-7.noarch.rpm 将被安装
正在解决依赖关系
--> 正在检查事务
---> 软件包 rdo-release.noarch.0.mitaka-7 将被 安装
--> 解决依赖关系完成
base/7/x86_64                                                                                                                                             | 3.6 kB  00:00:00     
extras/7/x86_64                                                                                                                                           | 3.4 kB  00:00:00     
updates/7/x86_64                                                                                                                                          | 3.4 kB  00:00:00     

依赖关系解决

=================================================================================================================================================================================
 Package                                 架构                               版本                                  源                                                        大小
=================================================================================================================================================================================
正在安装:
 rdo-release                             noarch                             mitaka-7                              /rdo-release-mitaka-7.noarch                             3.0 k

事务概要
=================================================================================================================================================================================
安装  1 软件包

总计：3.0 k
安装大小：3.0 k
Downloading packages:
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  正在安装    : rdo-release-mitaka-7.noarch [                                                                                                                              ] 1/  正在安装    : rdo-release-mitaka-7.noarch [#####################################                                                                                         ] 1/  正在安装    : rdo-release-mitaka-7.noarch [############################################################################                                                  ] 1/  正在安装    : rdo-release-mitaka-7.noarch [###########################################################################################                                   ] 1/  正在安装    : rdo-release-mitaka-7.noarch [#######################################################################################################                       ] 1/  正在安装    : rdo-release-mitaka-7.noarch [########################################################################################################################      ] 1/  正在安装    : rdo-release-mitaka-7.noarch                                                                                                                                  1/1 
  验证中      : rdo-release-mitaka-7.noarch                                                                                                                                  1/1 

已安装:
  rdo-release.noarch 0:mitaka-7                                                                                                                                                  

完毕！
[root@localhost ~]# yum update -y
已加载插件：fastestmirror, langpacks
openstack-mitaka                                                                                                                                        | 2.9 kB  00:00:00     
rdo-qemu-ev                                                                                                                                             | 2.9 kB  00:00:00     
(1/2): rdo-qemu-ev/x86_64/primary_db                                                                                                                    |  62 kB  00:00:00     
(2/2): openstack-mitaka/x86_64/primary_db                                                                                                               | 993 kB  00:00:05     
Loading mirror speeds from cached hostfile
 * base: mirrors.tuna.tsinghua.edu.cn
 * extras: mirrors.btte.net
 * updates: mirrors.tuna.tsinghua.edu.cn
正在解决依赖关系
--> 正在检查事务
---> 软件包 mariadb-libs.x86_64.1.5.5.52-1.el7 将被 升级
---> 软件包 mariadb-libs.x86_64.3.10.1.20-1.el7 将被 更新
--> 正在处理依赖关系 mariadb-common(x86-64) = 3:10.1.20-1.el7，它被软件包 3:mariadb-libs-10.1.20-1.el7.x86_64 需要
---> 软件包 pyOpenSSL.x86_64.0.0.13.1-3.el7 将被 升级
---> 软件包 pyOpenSSL.noarch.0.0.15.1-1.el7 将被 更新
---> 软件包 pyparsing.noarch.0.1.5.6-9.el7 将被 升级
---> 软件包 pyparsing.noarch.0.2.0.7-1.el7 将被 更新
---> 软件包 python-dateutil.noarch.0.1.5-7.el7 将被 升级
---> 软件包 python-dateutil.noarch.1.2.4.2-1.el7 将被 更新
---> 软件包 python-idna.noarch.0.2.0-1.el7 将被 取代
---> 软件包 python-ipaddress.noarch.0.1.0.16-2.el7 将被 升级
---> 软件包 python-ipaddress.noarch.0.1.0.16-3.el7 将被 更新
---> 软件包 python-jsonpointer.noarch.0.1.9-2.el7 将被 取代
---> 软件包 python-netaddr.noarch.0.0.7.5-7.el7 将被 升级
---> 软件包 python-netaddr.noarch.0.0.7.18-1.el7 将被 更新
---> 软件包 python-requests.noarch.0.2.6.0-1.el7_1 将被 取代
---> 软件包 python-setuptools.noarch.0.0.9.8-4.el7 将被 取代
---> 软件包 python-six.noarch.0.1.9.0-2.el7 将被 升级
---> 软件包 python-six.noarch.0.1.10.0-3.el7 将被 更新
---> 软件包 python-urllib3.noarch.0.1.10.2-2.el7_1 将被 取代
---> 软件包 python2-idna.noarch.0.2.5-1.el7 将被 舍弃
---> 软件包 python2-jsonpointer.noarch.0.1.10-4.el7 将被 舍弃
---> 软件包 python2-requests.noarch.0.2.11.1-1.el7 将被 舍弃
---> 软件包 python2-setuptools.noarch.0.22.0.5-1.el7 将被 舍弃
---> 软件包 python2-urllib3.noarch.0.1.16-1.el7 将被 舍弃
--> 正在处理依赖关系 python-pysocks，它被软件包 python2-urllib3-1.16-1.el7.noarch 需要
--> 正在检查事务
---> 软件包 mariadb-common.x86_64.3.10.1.20-1.el7 将被 安装
--> 正在处理依赖关系 /etc/my.cnf，它被软件包 3:mariadb-common-10.1.20-1.el7.x86_64 需要
---> 软件包 python2-pysocks.noarch.0.1.5.6-3.el7 将被 安装
--> 正在检查事务
---> 软件包 mariadb-config.x86_64.3.10.1.20-1.el7 将被 安装
---> 软件包 mariadb-libs.x86_64.1.5.5.52-1.el7 将被 升级
---> 软件包 mariadb-libs.x86_64.1.5.5.52-1.el7 将被 升级
--> 解决依赖关系完成

依赖关系解决

===============================================================================================================================================================================
 Package                                        架构                              版本                                       源                                           大小
===============================================================================================================================================================================
正在安装:
 python2-idna                                   noarch                            2.5-1.el7                                  openstack-mitaka                             94 k
      替换  python-idna.noarch 2.0-1.el7
 python2-jsonpointer                            noarch                            1.10-4.el7                                 openstack-mitaka                             14 k
      替换  python-jsonpointer.noarch 1.9-2.el7
 python2-requests                               noarch                            2.11.1-1.el7                               openstack-mitaka                            105 k
      替换  python-requests.noarch 2.6.0-1.el7_1
 python2-setuptools                             noarch                            22.0.5-1.el7                               openstack-mitaka                            485 k
      替换  python-setuptools.noarch 0.9.8-4.el7
 python2-urllib3                                noarch                            1.16-1.el7                                 openstack-mitaka                            126 k
      替换  python-urllib3.noarch 1.10.2-2.el7_1
正在更新:
 mariadb-libs                                   x86_64                            3:10.1.20-1.el7                            openstack-mitaka                            643 k
 pyOpenSSL                                      noarch                            0.15.1-1.el7                               openstack-mitaka                            182 k
 pyparsing                                      noarch                            2.0.7-1.el7                                openstack-mitaka                            103 k
 python-dateutil                                noarch                            1:2.4.2-1.el7                              openstack-mitaka                             83 k
 python-ipaddress                               noarch                            1.0.16-3.el7                               openstack-mitaka                             34 k
 python-netaddr                                 noarch                            0.7.18-1.el7                               openstack-mitaka                            1.3 M
 python-six                                     noarch                            1.10.0-3.el7                               openstack-mitaka                             30 k
为依赖而安装:
 mariadb-common                                 x86_64                            3:10.1.20-1.el7                            openstack-mitaka                             63 k
 mariadb-config                                 x86_64                            3:10.1.20-1.el7                            openstack-mitaka                             26 k
 python2-pysocks                                noarch                            1.5.6-3.el7                                openstack-mitaka                             20 k

事务概要
===============================================================================================================================================================================
安装  5 软件包 (+3 依赖软件包)
升级  7 软件包

总下载量：3.3 M
Downloading packages:
Delta RPMs disabled because /usr/bin/applydeltarpm not installed.
警告：/var/cache/yum/x86_64/7/openstack-mitaka/packages/mariadb-config-10.1.20-1.el7.x86_64.rpm: 头V4 RSA/SHA1 Signature, 密钥 ID 764429e6: NOKEY.0 B/s |    0 B  --:--:-- ETA 
mariadb-config-10.1.20-1.el7.x86_64.rpm 的公钥尚未安装
(1/15): mariadb-config-10.1.20-1.el7.x86_64.rpm                                                                                                         |  26 kB  00:00:00     
(2/15): mariadb-common-10.1.20-1.el7.x86_64.rpm                                                                                                         |  63 kB  00:00:00     
(3/15): pyOpenSSL-0.15.1-1.el7.noarch.rpm                                                                                                               | 182 kB  00:00:01     
(4/15): pyparsing-2.0.7-1.el7.noarch.rpm                                                                                                                | 103 kB  00:00:01     
(5/15): python-dateutil-2.4.2-1.el7.noarch.rpm                                                                                                          |  83 kB  00:00:00     
(6/15): python-ipaddress-1.0.16-3.el7.noarch.rpm                                                                                                        |  34 kB  00:00:00     
(7/15): mariadb-libs-10.1.20-1.el7.x86_64.rpm                                                                                                           | 643 kB  00:00:04     
(8/15): python-six-1.10.0-3.el7.noarch.rpm                                                                                                              |  30 kB  00:00:00     
(9/15): python2-idna-2.5-1.el7.noarch.rpm                                                                                                               |  94 kB  00:00:00     
(10/15): python2-jsonpointer-1.10-4.el7.noarch.rpm                                                                                                      |  14 kB  00:00:00     
(11/15): python2-pysocks-1.5.6-3.el7.noarch.rpm                                                                                                         |  20 kB  00:00:00     
(12/15): python2-requests-2.11.1-1.el7.noarch.rpm                                                                                                       | 105 kB  00:00:01     
(13/15): python2-setuptools-22.0.5-1.el7.noarch.rpm                                                                                                     | 485 kB  00:00:04     
(14/15): python2-urllib3-1.16-1.el7.noarch.rpm                                                                                                          | 126 kB  00:00:01     
(15/15): python-netaddr-0.7.18-1.el7.noarch.rpm                                                                                                         | 1.3 MB  00:00:08     
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
总计                                                                                                                                           255 kB/s | 3.3 MB  00:00:13     
从 file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-SIG-Cloud 检索密钥
导入 GPG key 0x764429E6:
 用户ID     : "CentOS Cloud SIG (http://wiki.centos.org/SpecialInterestGroup/Cloud) <security@centos.org>" 
 指纹       : 736a f511 6d9c 40e2 af6b 074b f9b9 fee7 7644 29e6
 软件包     : rdo-release-mitaka-7.noarch (installed)
 来自       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-SIG-Cloud
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  正在更新    : python-six-1.10.0-3.el7.noarch                                                                                                                            1/27 
  正在安装    : python2-pysocks-1.5.6-3.el7.noarch                                                                                                                        2/27 
  正在安装    : python2-urllib3-1.16-1.el7.noarch                                                                                                                         3/27 
  正在安装    : 3:mariadb-config-10.1.20-1.el7.x86_64                                                                                                                     4/27 
  正在安装    : 3:mariadb-common-10.1.20-1.el7.x86_64                                                                                                                     5/27 
  正在更新    : 3:mariadb-libs-10.1.20-1.el7.x86_64                                                                                                                       6/27 
  正在安装    : python2-requests-2.11.1-1.el7.noarch                                                                                                                      7/27 
  正在更新    : 1:python-dateutil-2.4.2-1.el7.noarch                                                                                                                      8/27 
  正在安装    : python2-jsonpointer-1.10-4.el7.noarch                                                                                                                     9/27 
  正在安装    : python2-setuptools-22.0.5-1.el7.noarch                                                                                                                   10/27 
  正在更新    : python-ipaddress-1.0.16-3.el7.noarch                                                                                                                     11/27 
  正在更新    : pyparsing-2.0.7-1.el7.noarch                                                                                                                             12/27 
  正在更新    : python-netaddr-0.7.18-1.el7.noarch                                                                                                                       13/27 
  正在安装    : python2-idna-2.5-1.el7.noarch                                                                                                                            14/27 
  正在更新    : pyOpenSSL-0.15.1-1.el7.noarch                                                                                                                            15/27 
  正在删除    : python-requests-2.6.0-1.el7_1.noarch                                                                                                                     16/27 
  正在删除    : python-urllib3-1.10.2-2.el7_1.noarch                                                                                                                     17/27 
  清理        : python-six-1.9.0-2.el7.noarch                                                                                                                            18/27 
  清理        : python-dateutil-1.5-7.el7.noarch                                                                                                                         19/27 
  正在删除    : python-jsonpointer-1.9-2.el7.noarch                                                                                                                      20/27 
  正在删除    : python-setuptools-0.9.8-4.el7.noarch                                                                                                                     21/27 
  清理        : python-ipaddress-1.0.16-2.el7.noarch                                                                                                                     22/27 
  清理        : pyparsing-1.5.6-9.el7.noarch                                                                                                                             23/27 
  清理        : python-netaddr-0.7.5-7.el7.noarch                                                                                                                        24/27 
  正在删除    : python-idna-2.0-1.el7.noarch                                                                                                                             25/27 
  清理        : pyOpenSSL-0.13.1-3.el7.x86_64                                                                                                                            26/27 
  清理        : 1:mariadb-libs-5.5.52-1.el7.x86_64                                                                                                                       27/27 
  验证中      : 3:mariadb-config-10.1.20-1.el7.x86_64                                                                                                                     1/27 
  验证中      : pyOpenSSL-0.15.1-1.el7.noarch                                                                                                                             2/27 
  验证中      : python2-idna-2.5-1.el7.noarch                                                                                                                             3/27 
  验证中      : python2-requests-2.11.1-1.el7.noarch                                                                                                                      4/27 
  验证中      : python-netaddr-0.7.18-1.el7.noarch                                                                                                                        5/27 
  验证中      : pyparsing-2.0.7-1.el7.noarch                                                                                                                              6/27 
  验证中      : python2-pysocks-1.5.6-3.el7.noarch                                                                                                                        7/27 
  验证中      : python-ipaddress-1.0.16-3.el7.noarch                                                                                                                      8/27 
  验证中      : python2-setuptools-22.0.5-1.el7.noarch                                                                                                                    9/27 
  验证中      : python2-urllib3-1.16-1.el7.noarch                                                                                                                        10/27 
  验证中      : python2-jsonpointer-1.10-4.el7.noarch                                                                                                                    11/27 
  验证中      : 3:mariadb-libs-10.1.20-1.el7.x86_64                                                                                                                      12/27 
  验证中      : 1:python-dateutil-2.4.2-1.el7.noarch                                                                                                                     13/27 
  验证中      : 3:mariadb-common-10.1.20-1.el7.x86_64                                                                                                                    14/27 
  验证中      : python-six-1.10.0-3.el7.noarch                                                                                                                           15/27 
  验证中      : pyparsing-1.5.6-9.el7.noarch                                                                                                                             16/27 
  验证中      : python-setuptools-0.9.8-4.el7.noarch                                                                                                                     17/27 
  验证中      : python-dateutil-1.5-7.el7.noarch                                                                                                                         18/27 
  验证中      : python-six-1.9.0-2.el7.noarch                                                                                                                            19/27 
  验证中      : python-netaddr-0.7.5-7.el7.noarch                                                                                                                        20/27 
  验证中      : 1:mariadb-libs-5.5.52-1.el7.x86_64                                                                                                                       21/27 
  验证中      : python-jsonpointer-1.9-2.el7.noarch                                                                                                                      22/27 
  验证中      : python-idna-2.0-1.el7.noarch                                                                                                                             23/27 
  验证中      : pyOpenSSL-0.13.1-3.el7.x86_64                                                                                                                            24/27 
  验证中      : python-requests-2.6.0-1.el7_1.noarch                                                                                                                     25/27 
  验证中      : python-ipaddress-1.0.16-2.el7.noarch                                                                                                                     26/27 
  验证中      : python-urllib3-1.10.2-2.el7_1.noarch                                                                                                                     27/27 

已安装:
  python2-idna.noarch 0:2.5-1.el7         python2-jsonpointer.noarch 0:1.10-4.el7     python2-requests.noarch 0:2.11.1-1.el7     python2-setuptools.noarch 0:22.0.5-1.el7    
  python2-urllib3.noarch 0:1.16-1.el7    

作为依赖被安装:
  mariadb-common.x86_64 3:10.1.20-1.el7                     mariadb-config.x86_64 3:10.1.20-1.el7                     python2-pysocks.noarch 0:1.5.6-3.el7                    

更新完毕:
  mariadb-libs.x86_64 3:10.1.20-1.el7           pyOpenSSL.noarch 0:0.15.1-1.el7             pyparsing.noarch 0:2.0.7-1.el7          python-dateutil.noarch 1:2.4.2-1.el7       
  python-ipaddress.noarch 0:1.0.16-3.el7        python-netaddr.noarch 0:0.7.18-1.el7        python-six.noarch 0:1.10.0-3.el7       

替代:
  python-idna.noarch 0:2.0-1.el7             python-jsonpointer.noarch 0:1.9-2.el7     python-requests.noarch 0:2.6.0-1.el7_1     python-setuptools.noarch 0:0.9.8-4.el7    
  python-urllib3.noarch 0:1.10.2-2.el7_1    

完毕！
[root@localhost ~]# yum install -y openstack-packstack
已加载插件：fastestmirror, langpacks
Loading mirror speeds from cached hostfile
 * base: mirrors.tuna.tsinghua.edu.cn
 * extras: mirrors.btte.net
 * updates: mirrors.tuna.tsinghua.edu.cn
正在解决依赖关系
--> 正在检查事务
---> 软件包 openstack-packstack.noarch.0.8.0.2-1.el7 将被 安装
--> 正在处理依赖关系 openstack-packstack-puppet = 8.0.2-1.el7，它被软件包 openstack-packstack-8.0.2-1.el7.noarch 需要
--> 正在处理依赖关系 openstack-puppet-modules >= 2014.2.10，它被软件包 openstack-packstack-8.0.2-1.el7.noarch 需要
--> 正在处理依赖关系 python-docutils，它被软件包 openstack-packstack-8.0.2-1.el7.noarch 需要
--> 正在处理依赖关系 PyYAML，它被软件包 openstack-packstack-8.0.2-1.el7.noarch 需要
--> 正在检查事务
---> 软件包 PyYAML.x86_64.0.3.10-11.el7 将被 安装
--> 正在处理依赖关系 libyaml-0.so.2()(64bit)，它被软件包 PyYAML-3.10-11.el7.x86_64 需要
---> 软件包 openstack-packstack-puppet.noarch.0.8.0.2-1.el7 将被 安装
---> 软件包 openstack-puppet-modules.noarch.1.8.1.13-1.el7 将被 安装
--> 正在处理依赖关系 rubygem-json，它被软件包 1:openstack-puppet-modules-8.1.13-1.el7.noarch 需要
---> 软件包 python-docutils.noarch.0.0.11-0.2.20130715svn7687.el7 将被 安装
--> 正在处理依赖关系 python-imaging，它被软件包 python-docutils-0.11-0.2.20130715svn7687.el7.noarch 需要
--> 正在检查事务
---> 软件包 libyaml.x86_64.0.0.1.4-11.el7_0 将被 安装
---> 软件包 python2-pillow.x86_64.0.4.0.0-1.el7 将被 安装
--> 正在处理依赖关系 python2-olefile，它被软件包 python2-pillow-4.0.0-1.el7.x86_64 需要
--> 正在处理依赖关系 libwebp.so.4()(64bit)，它被软件包 python2-pillow-4.0.0-1.el7.x86_64 需要
--> 正在处理依赖关系 libopenjp2.so.7()(64bit)，它被软件包 python2-pillow-4.0.0-1.el7.x86_64 需要
--> 正在处理依赖关系 libimagequant.so.0()(64bit)，它被软件包 python2-pillow-4.0.0-1.el7.x86_64 需要
---> 软件包 rubygem-json.x86_64.0.1.7.7-29.el7 将被 安装
--> 正在处理依赖关系 ruby(rubygems) >= 2.0.14.1，它被软件包 rubygem-json-1.7.7-29.el7.x86_64 需要
--> 正在处理依赖关系 ruby(release)，它被软件包 rubygem-json-1.7.7-29.el7.x86_64 需要
--> 正在处理依赖关系 libruby.so.2.0()(64bit)，它被软件包 rubygem-json-1.7.7-29.el7.x86_64 需要
--> 正在检查事务
---> 软件包 libimagequant.x86_64.0.2.8.2-2.el7 将被 安装
---> 软件包 libwebp.x86_64.0.0.3.0-3.el7 将被 安装
---> 软件包 openjpeg2.x86_64.0.2.1.2-1.el7 将被 安装
---> 软件包 python2-olefile.noarch.0.0.44-1.el7 将被 安装
---> 软件包 ruby-libs.x86_64.0.2.0.0.648-29.el7 将被 安装
---> 软件包 rubygems.noarch.0.2.0.14.1-29.el7 将被 安装
--> 正在处理依赖关系 rubygem(rdoc) >= 4.0.0，它被软件包 rubygems-2.0.14.1-29.el7.noarch 需要
--> 正在处理依赖关系 rubygem(psych) >= 2.0.0，它被软件包 rubygems-2.0.14.1-29.el7.noarch 需要
--> 正在处理依赖关系 rubygem(io-console) >= 0.4.2，它被软件包 rubygems-2.0.14.1-29.el7.noarch 需要
--> 正在处理依赖关系 /usr/bin/ruby，它被软件包 rubygems-2.0.14.1-29.el7.noarch 需要
--> 正在检查事务
---> 软件包 ruby.x86_64.0.2.0.0.648-29.el7 将被 安装
--> 正在处理依赖关系 rubygem(bigdecimal) >= 1.2.0，它被软件包 ruby-2.0.0.648-29.el7.x86_64 需要
---> 软件包 rubygem-io-console.x86_64.0.0.4.2-29.el7 将被 安装
---> 软件包 rubygem-psych.x86_64.0.2.0.0-29.el7 将被 安装
---> 软件包 rubygem-rdoc.noarch.0.4.0.0-29.el7 将被 安装
--> 正在处理依赖关系 ruby(irb) = 2.0.0.648，它被软件包 rubygem-rdoc-4.0.0-29.el7.noarch 需要
--> 正在检查事务
---> 软件包 ruby-irb.noarch.0.2.0.0.648-29.el7 将被 安装
---> 软件包 rubygem-bigdecimal.x86_64.0.1.2.0-29.el7 将被 安装
--> 解决依赖关系完成

依赖关系解决

===============================================================================================================================================================================
 Package                                          架构                         版本                                               源                                      大小
===============================================================================================================================================================================
正在安装:
 openstack-packstack                              noarch                       8.0.2-1.el7                                        openstack-mitaka                       243 k
为依赖而安装:
 PyYAML                                           x86_64                       3.10-11.el7                                        base                                   153 k
 libimagequant                                    x86_64                       2.8.2-2.el7                                        openstack-mitaka                        52 k
 libwebp                                          x86_64                       0.3.0-3.el7                                        base                                   170 k
 libyaml                                          x86_64                       0.1.4-11.el7_0                                     base                                    55 k
 openjpeg2                                        x86_64                       2.1.2-1.el7                                        openstack-mitaka                       112 k
 openstack-packstack-puppet                       noarch                       8.0.2-1.el7                                        openstack-mitaka                        17 k
 openstack-puppet-modules                         noarch                       1:8.1.13-1.el7                                     openstack-mitaka                       3.2 M
 python-docutils                                  noarch                       0.11-0.2.20130715svn7687.el7                       base                                   1.5 M
 python2-olefile                                  noarch                       0.44-1.el7                                         openstack-mitaka                       773 k
 python2-pillow                                   x86_64                       4.0.0-1.el7                                        openstack-mitaka                       552 k
 ruby                                             x86_64                       2.0.0.648-29.el7                                   base                                    68 k
 ruby-irb                                         noarch                       2.0.0.648-29.el7                                   base                                    89 k
 ruby-libs                                        x86_64                       2.0.0.648-29.el7                                   base                                   2.8 M
 rubygem-bigdecimal                               x86_64                       1.2.0-29.el7                                       base                                    80 k
 rubygem-io-console                               x86_64                       0.4.2-29.el7                                       base                                    51 k
 rubygem-json                                     x86_64                       1.7.7-29.el7                                       base                                    76 k
 rubygem-psych                                    x86_64                       2.0.0-29.el7                                       base                                    78 k
 rubygem-rdoc                                     noarch                       4.0.0-29.el7                                       base                                   319 k
 rubygems                                         noarch                       2.0.14.1-29.el7                                    base                                   216 k

事务概要
===============================================================================================================================================================================
安装  1 软件包 (+19 依赖软件包)

总下载量：11 M
安装大小：39 M
Downloading packages:
(1/20): libyaml-0.1.4-11.el7_0.x86_64.rpm                                                                                                               |  55 kB  00:00:00     
(2/20): libwebp-0.3.0-3.el7.x86_64.rpm                                                                                                                  | 170 kB  00:00:00     
(3/20): libimagequant-2.8.2-2.el7.x86_64.rpm                                                                                                            |  52 kB  00:00:00     
(4/20): PyYAML-3.10-11.el7.x86_64.rpm                                                                                                                   | 153 kB  00:00:01     
(5/20): openstack-packstack-8.0.2-1.el7.noarch.rpm                                                                                                      | 243 kB  00:00:01     
(6/20): openjpeg2-2.1.2-1.el7.x86_64.rpm                                                                                                                | 112 kB  00:00:02     
(7/20): openstack-packstack-puppet-8.0.2-1.el7.noarch.rpm                                                                                               |  17 kB  00:00:01     
(8/20): python-docutils-0.11-0.2.20130715svn7687.el7.noarch.rpm                                                                                         | 1.5 MB  00:00:02     
(9/20): python2-olefile-0.44-1.el7.noarch.rpm                                                                                                           | 773 kB  00:00:04     
(10/20): ruby-2.0.0.648-29.el7.x86_64.rpm                                                                                                               |  68 kB  00:00:00     
(11/20): ruby-irb-2.0.0.648-29.el7.noarch.rpm                                                                                                           |  89 kB  00:00:00     
(12/20): rubygem-bigdecimal-1.2.0-29.el7.x86_64.rpm                                                                                                     |  80 kB  00:00:00     
(13/20): rubygem-json-1.7.7-29.el7.x86_64.rpm                                                                                                           |  76 kB  00:00:00     
(14/20): rubygem-io-console-0.4.2-29.el7.x86_64.rpm                                                                                                     |  51 kB  00:00:01     
(15/20): rubygem-rdoc-4.0.0-29.el7.noarch.rpm                                                                                                           | 319 kB  00:00:01     
(16/20): rubygem-psych-2.0.0-29.el7.x86_64.rpm                                                                                                          |  78 kB  00:00:02     
(17/20): ruby-libs-2.0.0.648-29.el7.x86_64.rpm                                                                                                          | 2.8 MB  00:00:04     
(18/20): rubygems-2.0.14.1-29.el7.noarch.rpm                                                                                                            | 216 kB  00:00:01     
(19/20): python2-pillow-4.0.0-1.el7.x86_64.rpm                                                                                                          | 552 kB  00:00:07     
(20/20): openstack-puppet-modules-8.1.13-1.el7.noarch.rpm                                                                                               | 3.2 MB  00:00:27     
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
总计                                                                                                                                           363 kB/s |  11 MB  00:00:29     
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  正在安装    : ruby-libs-2.0.0.648-29.el7.x86_64                                                                                                                         1/20 
  正在安装    : libyaml-0.1.4-11.el7_0.x86_64                                                                                                                             2/20 
  正在安装    : PyYAML-3.10-11.el7.x86_64                                                                                                                                 3/20 
  正在安装    : ruby-irb-2.0.0.648-29.el7.noarch                                                                                                                          4/20 
  正在安装    : ruby-2.0.0.648-29.el7.x86_64                                                                                                                              5/20 
  正在安装    : rubygem-bigdecimal-1.2.0-29.el7.x86_64                                                                                                                    6/20 
  正在安装    : rubygem-io-console-0.4.2-29.el7.x86_64                                                                                                                    7/20 
  正在安装    : rubygem-rdoc-4.0.0-29.el7.noarch                                                                                                                          8/20 
  正在安装    : rubygem-json-1.7.7-29.el7.x86_64                                                                                                                          9/20 
  正在安装    : rubygem-psych-2.0.0-29.el7.x86_64                                                                                                                        10/20 
  正在安装    : rubygems-2.0.14.1-29.el7.noarch                                                                                                                          11/20 
  正在安装    : 1:openstack-puppet-modules-8.1.13-1.el7.noarch                                                                                                           12/20 
  正在安装    : libwebp-0.3.0-3.el7.x86_64                                                                                                                               13/20 
  正在安装    : python2-olefile-0.44-1.el7.noarch                                                                                                                        14/20 
  正在安装    : libimagequant-2.8.2-2.el7.x86_64                                                                                                                         15/20 
  正在安装    : openstack-packstack-puppet-8.0.2-1.el7.noarch                                                                                                            16/20 
  正在安装    : openjpeg2-2.1.2-1.el7.x86_64                                                                                                                             17/20 
  正在安装    : python2-pillow-4.0.0-1.el7.x86_64                                                                                                                        18/20 
  正在安装    : python-docutils-0.11-0.2.20130715svn7687.el7.noarch                                                                                                      19/20 
  正在安装    : openstack-packstack-8.0.2-1.el7.noarch                                                                                                                   20/20 
  验证中      : rubygems-2.0.14.1-29.el7.noarch                                                                                                                           1/20 
  验证中      : libyaml-0.1.4-11.el7_0.x86_64                                                                                                                             2/20 
  验证中      : ruby-2.0.0.648-29.el7.x86_64                                                                                                                              3/20 
  验证中      : 1:openstack-puppet-modules-8.1.13-1.el7.noarch                                                                                                            4/20 
  验证中      : rubygem-rdoc-4.0.0-29.el7.noarch                                                                                                                          5/20 
  验证中      : python-docutils-0.11-0.2.20130715svn7687.el7.noarch                                                                                                       6/20 
  验证中      : openjpeg2-2.1.2-1.el7.x86_64                                                                                                                              7/20 
  验证中      : openstack-packstack-8.0.2-1.el7.noarch                                                                                                                    8/20 
  验证中      : openstack-packstack-puppet-8.0.2-1.el7.noarch                                                                                                             9/20 
  验证中      : ruby-irb-2.0.0.648-29.el7.noarch                                                                                                                         10/20 
  验证中      : rubygem-bigdecimal-1.2.0-29.el7.x86_64                                                                                                                   11/20 
  验证中      : rubygem-io-console-0.4.2-29.el7.x86_64                                                                                                                   12/20 
  验证中      : libimagequant-2.8.2-2.el7.x86_64                                                                                                                         13/20 
  验证中      : rubygem-json-1.7.7-29.el7.x86_64                                                                                                                         14/20 
  验证中      : python2-olefile-0.44-1.el7.noarch                                                                                                                        15/20 
  验证中      : PyYAML-3.10-11.el7.x86_64                                                                                                                                16/20 
  验证中      : python2-pillow-4.0.0-1.el7.x86_64                                                                                                                        17/20 
  验证中      : ruby-libs-2.0.0.648-29.el7.x86_64                                                                                                                        18/20 
  验证中      : libwebp-0.3.0-3.el7.x86_64                                                                                                                               19/20 
  验证中      : rubygem-psych-2.0.0-29.el7.x86_64                                                                                                                        20/20 

已安装:
  openstack-packstack.noarch 0:8.0.2-1.el7                                                                                                                                     

作为依赖被安装:
  PyYAML.x86_64 0:3.10-11.el7                            libimagequant.x86_64 0:2.8.2-2.el7                            libwebp.x86_64 0:0.3.0-3.el7                           
  libyaml.x86_64 0:0.1.4-11.el7_0                        openjpeg2.x86_64 0:2.1.2-1.el7                                openstack-packstack-puppet.noarch 0:8.0.2-1.el7        
  openstack-puppet-modules.noarch 1:8.1.13-1.el7         python-docutils.noarch 0:0.11-0.2.20130715svn7687.el7         python2-olefile.noarch 0:0.44-1.el7                    
  python2-pillow.x86_64 0:4.0.0-1.el7                    ruby.x86_64 0:2.0.0.648-29.el7                                ruby-irb.noarch 0:2.0.0.648-29.el7                     
  ruby-libs.x86_64 0:2.0.0.648-29.el7                    rubygem-bigdecimal.x86_64 0:1.2.0-29.el7                      rubygem-io-console.x86_64 0:0.4.2-29.el7               
  rubygem-json.x86_64 0:1.7.7-29.el7                     rubygem-psych.x86_64 0:2.0.0-29.el7                           rubygem-rdoc.noarch 0:4.0.0-29.el7                     
  rubygems.noarch 0:2.0.14.1-29.el7                     

完毕！
[root@localhost ~]# packstack --allinone
Welcome to the Packstack setup utility

The installation log file is available at: /var/tmp/packstack/20170803-144407-N4XKxB/openstack-setup.log
Packstack changed given value  to required value /root/.ssh/id_rsa.pub

Installing:
Clean Up                                             [ DONE ]
Discovering ip protocol version                      [ DONE ]
Setting up ssh keys                                  [ DONE ]
Preparing servers                                    [ DONE ]
Pre installing Puppet and discovering hosts' details [ DONE ]
Adding pre install manifest entries                  [ DONE ]
Setting up CACERT                                    [ DONE ]
Adding AMQP manifest entries                         [ DONE ]
Adding MariaDB manifest entries                      [ DONE ]
Adding Apache manifest entries                       [ DONE ]
Fixing Keystone LDAP config parameters to be undef if empty[ DONE ]
Adding Keystone manifest entries                     [ DONE ]
Adding Glance Keystone manifest entries              [ DONE ]
Adding Glance manifest entries                       [ DONE ]
Adding Cinder Keystone manifest entries              [ DONE ]
Checking if the Cinder server has a cinder-volumes vg[ DONE ]
Adding Cinder manifest entries                       [ DONE ]
Adding Nova API manifest entries                     [ DONE ]
Adding Nova Keystone manifest entries                [ DONE ]
Adding Nova Cert manifest entries                    [ DONE ]
Adding Nova Conductor manifest entries               [ DONE ]
Creating ssh keys for Nova migration                 [ DONE ]
Gathering ssh host keys for Nova migration           [ DONE ]
Adding Nova Compute manifest entries                 [ DONE ]
Adding Nova Scheduler manifest entries               [ DONE ]
Adding Nova VNC Proxy manifest entries               [ DONE ]
Adding OpenStack Network-related Nova manifest entries[ DONE ]
Adding Nova Common manifest entries                  [ DONE ]
Adding Neutron VPNaaS Agent manifest entries         [ DONE ]
Adding Neutron FWaaS Agent manifest entries          [ DONE ]
Adding Neutron LBaaS Agent manifest entries          [ DONE ]
Adding Neutron API manifest entries                  [ DONE ]
Adding Neutron Keystone manifest entries             [ DONE ]
Adding Neutron L3 manifest entries                   [ DONE ]
Adding Neutron L2 Agent manifest entries             [ DONE ]
Adding Neutron DHCP Agent manifest entries           [ DONE ]
Adding Neutron Metering Agent manifest entries       [ DONE ]
Adding Neutron Metadata Agent manifest entries       [ DONE ]
Adding Neutron SR-IOV Switch Agent manifest entries  [ DONE ]
Checking if NetworkManager is enabled and running    [ DONE ]
Adding OpenStack Client manifest entries             [ DONE ]
Adding Horizon manifest entries                      [ DONE ]
Adding Swift Keystone manifest entries               [ DONE ]
Adding Swift builder manifest entries                [ DONE ]
Adding Swift proxy manifest entries                  [ DONE ]
Adding Swift storage manifest entries                [ DONE ]
Adding Swift common manifest entries                 [ DONE ]
Adding Provisioning manifest entries                 [ DONE ]
Adding Provisioning Glance manifest entries          [ DONE ]
Adding Provisioning Demo bridge manifest entries     [ DONE ]
Adding Gnocchi manifest entries                      [ DONE ]
Adding Gnocchi Keystone manifest entries             [ DONE ]
Adding MongoDB manifest entries                      [ DONE ]
Adding Redis manifest entries                        [ DONE ]
Adding Ceilometer manifest entries                   [ DONE ]
Adding Ceilometer Keystone manifest entries          [ DONE ]
Adding Aodh manifest entries                         [ DONE ]
Adding Aodh Keystone manifest entries                [ DONE ]
Adding Nagios server manifest entries                [ DONE ]
Adding Nagios host manifest entries                  [ DONE ]
Copying Puppet modules and manifests                 [ DONE ]
Applying 192.168.240.117_prescript.pp
192.168.240.117_prescript.pp:                        [ DONE ]           
Applying 192.168.240.117_amqp.pp
Applying 192.168.240.117_mariadb.pp
192.168.240.117_amqp.pp:                             [ DONE ]         
192.168.240.117_mariadb.pp:                          [ DONE ]         
Applying 192.168.240.117_apache.pp
192.168.240.117_apache.pp:                           [ DONE ]        
Applying 192.168.240.117_keystone.pp
Applying 192.168.240.117_glance.pp
Applying 192.168.240.117_cinder.pp
192.168.240.117_keystone.pp:                         [ DONE ]          
192.168.240.117_glance.pp:                           [ DONE ]          
192.168.240.117_cinder.pp:                           [ DONE ]          
Applying 192.168.240.117_api_nova.pp
192.168.240.117_api_nova.pp:                         [ DONE ]          
Applying 192.168.240.117_nova.pp
192.168.240.117_nova.pp:                             [ DONE ]      
Applying 192.168.240.117_neutron.pp
192.168.240.117_neutron.pp:                          [ DONE ]         
Applying 192.168.240.117_osclient.pp
Applying 192.168.240.117_horizon.pp
192.168.240.117_osclient.pp:                         [ DONE ]          
192.168.240.117_horizon.pp:                          [ DONE ]          
Applying 192.168.240.117_ring_swift.pp
192.168.240.117_ring_swift.pp:                       [ DONE ]            
Applying 192.168.240.117_swift.pp
192.168.240.117_swift.pp:                            [ DONE ]       
Applying 192.168.240.117_provision.pp
Applying 192.168.240.117_provision_glance
192.168.240.117_provision.pp:                        [ DONE ]               
192.168.240.117_provision_glance:                    [ DONE ]               
Applying 192.168.240.117_provision_bridge.pp
192.168.240.117_provision_bridge.pp:                 [ DONE ]                  
Applying 192.168.240.117_gnocchi.pp
192.168.240.117_gnocchi.pp:                          [ DONE ]         
Applying 192.168.240.117_mongodb.pp
Applying 192.168.240.117_redis.pp
192.168.240.117_mongodb.pp:                          [ DONE ]         
192.168.240.117_redis.pp:                            [ DONE ]         
Applying 192.168.240.117_ceilometer.pp
192.168.240.117_ceilometer.pp:                       [ DONE ]            
Applying 192.168.240.117_aodh.pp
192.168.240.117_aodh.pp:                             [ DONE ]      
Applying 192.168.240.117_nagios.pp
Applying 192.168.240.117_nagios_nrpe.pp
192.168.240.117_nagios.pp:                           [ DONE ]             
192.168.240.117_nagios_nrpe.pp:                      [ DONE ]             
Applying Puppet manifests                            [ DONE ]
Finalizing                                           [ DONE ]

 **** Installation completed successfully ******

Additional information:
 * A new answerfile was created in: /root/packstack-answers-20170803-144408.txt
 * Time synchronization installation was skipped. Please note that unsynchronized time on server instances might be problem for some OpenStack components.
 * Warning: NetworkManager is active on 192.168.240.117. OpenStack networking currently does not work on systems that have the Network Manager service enabled.
 * File /root/keystonerc_admin has been created on OpenStack client host 192.168.240.117. To use the command line tools you need to source the file.
 * To access the OpenStack Dashboard browse to http://192.168.240.117/dashboard .
Please, find your login credentials stored in the keystonerc_admin in your home directory.
 * To use Nagios, browse to http://192.168.240.117/nagios username: nagiosadmin, password: 3241a993d3704266
 * The installation log file is available at: /var/tmp/packstack/20170803-144407-N4XKxB/openstack-setup.log
 * The generated manifests are available at: /var/tmp/packstack/20170803-144407-N4XKxB/manifests
[root@localhost ~]# cat keystonerc_admin 
unset OS_SERVICE_TOKEN
export OS_USERNAME=admin
export OS_PASSWORD=9a6e3baf22b1438e
export OS_AUTH_URL=http://192.168.240.117:5000/v2.0
export PS1='[\u@\h \W(keystone_admin)]\$ '

export OS_TENANT_NAME=admin
export OS_REGION_NAME=RegionOne
[root@localhost ~]# 
```
