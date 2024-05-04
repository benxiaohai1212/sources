Ceph  test 
```
node  type	eth0  (manager)	eth1 (public)	eth2  (cluster)	hostname
Ceph-manager	192.168.3.170	172.16.1.170	 	manager
Ceph01	192.168.3.171	172.16.1.171	10.10.10.171	ceph01
Ceph02	192.168.3.172	172.16.1.172	10.10.10.172	ceph02
Ceph03	192.168.3.173	172.16.1.173	10.10.10.173	ceph03
```

预检测

## 一 系统环境配置

### 1 配置IP地址及hosts文件
 
* 按规划好的IP地址，配置各个节点
* 修改ceph节点的hosts配置文件，使用public IP 解析主机名

**说明：使用ping命令测试互通性，确保同一类型的IP地址之间都可以通信**

### 2 关闭防火墙、NetworkManager、SELINUX
```
systemctl disable firewalld
systemctl disable NetworkManager
systemctl stop firewalld
systemctl stop NetworkManager
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
```
**说明：重启系统SELINUX配置生效**

### 3 ntp服务  

#### 3.1 安装chrony
```
yum install -y chrony 
```

#### 3.2 更新配置文件，manager 做为其它三节点的时间服务器

manager节点

`vim /etc/chrony.conf`
```
server ntp1.aliyun.com  iburst
server ntp2.aliyun.com  iburst
server ntp3.aliyun.com  iburst
server ntp4.aliyun.com  iburst
 
allow 172.16.1.0/24
```

ceph节点：
```
server manager iburst
```
#### 3.3 开启chrony服务并设置为默认启动项
```
systemctl start chronyd
systemctl enable chronyd
```
#### 3.4 验证
```
chronyc sources
```
### 4 检查磁盘配置，查看是否有磁盘，磁盘配置大小是否相同

说明：如硬盘大小不同，按最小磁盘规格计算可以存储空间

### 5 配置ssh互信
```
sed -i 's/#   StrictHostKeyChecking ask/StrictHostKeyChecking no/g' /etc/ssh/ssh_config
```
或者配置无秘钥登录
```
ssh-keygen
ssh-copy-id -i ~/.ssh/id_isa.pub 192.168.3.17[1-3]
```
**输入`ssh-keygen`命令后路回车**


使用 ssh_auth_files.sh 脚本进行基于主机名的互信
```
yum install -y expect

sh ssh_auth_files.sh hosts.txt
```
### 6 配置yum源，本地已经配置有yum源，所以使用本地yum源
```
#cd /etc/yum.repos.d/
#mkdir repo.bak
#mv *.repo  repo.bak/
#ls
ceph-l.repo  local.repo
#cp ceph-l.repo  ceph.repo
```
yum -y install ceph-release

cat /etc/yum.repo.d/ceph.repo.rpmnew
```
[Ceph]
name=Ceph packages for $basearch
baseurl=http://download.ceph.com/rpm-luminous/el7/$basearch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc

[Ceph-noarch]
name=Ceph noarch packages
baseurl=http://download.ceph.com/rpm-luminous/el7/noarch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc

[ceph-source]
name=Ceph source packages
baseurl=http://download.ceph.com/rpm-luminous/el7/SRPMS
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc
```

```
[Ceph]
name=Ceph packages for $basearch
baseurl=http://mirrors.163.com/ceph/rpm-luminous/el7/$basearch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=http://mirrors.163.com/ceph/keys/release.asc

[Ceph-noarch]
name=Ceph noarch packages
baseurl=http://mirrors.163.com/ceph/rpm-luminous/el7/noarch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=http://mirrors.163.com/ceph/keys/release.asc

[ceph-source]
name=Ceph source packages
baseurl=http://mirrors.163.com/ceph/rpm-luminous/el7/SRPMS/
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=http://mirrors.163.com/ceph/keys/release.asc
```
**`mirrors.163.com/ceph`替换了`download.ceph.com`，`http`替换了`https`**  

或者添加`/etc/yum.repos.d/ceph.repo`  
```
[ceph-noarch]
name=Ceph noarch packages
baseurl=http://mirrors.163.com/ceph/rpm-luminous/el7/noarch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=http://mirrors.163.com/ceph/keys/release.asc
```
**注意：ceph.repo 文件中必须带有[ceph] [ceph-noarch] [ceph-source] 配置项**  
```
yum clean all
yum makecache
```
### 7 管理节点安装ceph-deploy管理工具
```
yum install -y ceph-deploy
```

## 二 安装ceph集群

0 卸载ceph
```
ceph-deploy purge {ceph-node} [{ceph-node}]
ceph-deploy purgedata {ceph-node} [{ceph-node}]
ceph-deploy forgetkeys
rm ceph.*
```
提示：`ImportError: No module named pkg_resources`  
解决方法：`yum install python-setuptools -y`


### 1 创建集群目录
```
mkdir  /root/my_ceph
```
**注意：已经所有关于ceph的操作都要在这个目录下完成**

### 2 创建集群
```
ceph-deploy new ceph01 ceph02 ceph03
```
检查目录，看是否有生成相应的文件  
ceph.conf  ceph-deploy-ceph.log  ceph.mon.keyring

### 3 修改默认复本数
```
echo "osd pool default size = 2" >> ceph.conf
```

### 4 设置网络选项
```
echo "cluster network = 10.10.10.0/24" >> ceph.conf
echo "public network = 172.16.1.0/24" >> ceph.conf
```

### 5 安装ceph
```
ceph-deploy  install --nogpgcheck    ceph01 ceph02 ceph03
```
> 说明：由于系统是使用centos7.5 提示cryptsetup-libs 版过高，
> 使用yum downgrade cryptsetup-libs 命令降低一个版
> --nogpgcheck 不使用ceph-deploy默认的yum源

### 6 初始化monitor并生成所有密钥
```
ceph-deploy mon create-initial
```
检查目录，会多出以下5个文件   
```
ceph.bootstrap-mds.keyring  ceph.bootstrap-osd.keyring  ceph.client.admin.keyring  
ceph.bootstrap-mgr.keyring  ceph.bootstrap-rgw.keyring
```

### 7 复制配置文件和admin key到ceph节点
```
ceph-deploy admin ceph01 ceph02 ceph03 
```

### 8 部署管理守护程序
```
ceph-deploy mgr create ceph01 ceph02 ceph03 
```
查看health状态
```
ssh ceph01 ceph  health
ssh ceph02 ceph  health
ssh ceph03 ceph  health
```
***显示有health:HEALTH_OK 字样***  
查看详细信息
```
ssh ceph01 ceph -s
```

### 9 配置OSD磁盘
```
ceph-deploy osd create ceph01:/dev/sdb ceph01:/dev/sdc ceph01:/dev/sdd
ceph-deploy osd create ceph02:/dev/sdb ceph02:/dev/sdc ceph02:/dev/sdd
ceph-deploy osd create ceph03:/dev/sdb ceph03:/dev/sdc ceph03:/dev/sdd
```
查看状态
```
#ssh ceph01 ceph health
#ssh ceph02 ceph health
#ssh ceph03 ceph health
```
**显示有health:HEALTH_OK 字样**  
查看详细信息
```
#ssh ceph01 ceph -s
#ssh ceph02 ceph -s
#ssh ceph03 ceph -s
```
显示有osd有数据显示
```
osd: 9 osds: 9 up, 9 in 
```

### 10 配置元数据服务
```
#ceph-deploy mds create ceph01 ceph02 ceph03
```
查看服务 
```
#ssh ceph01 ceph mds stat
```
 
### 11 配置object cateway 服务
```
#ceph-deploy   rgw create ceph01 ceph02 ceph03 
#ssh ceph01 ceph -s
```
如有类似
```
health: HEALTH_WARN
too few PGs per OSD (7 < min 30)
```
这样的报错信息，用以下方法手动增加pg_num pgp_num的数量
查看pool名称
```
ssh ceph01 ceph osd pool ls
```
查看pool的pg_num  pgp_num 数量
```
ssh ceph01 ceph osd  dump | grep size 
```
修改pg_num 数量
```
ssh ceph01 ceph osd pool set  pool_name pg_num 64
```
修改pgp_num数量
```
ssh ceph01 ceph osd pool set  pool_name pgp_num 64
```
 
### 12 创建资源池
```
ssh ceph01 ceph osd pool create  blockpool 128
ssh ceph01 ceph osd pool create  fspool 128
```
查看pool 的详细信息
```
ssh ceph01 ceph osd pool ls detail
```
定义pool类型
```
ssh ceph01  ceph osd pool application enable blockpool  rbd
ssh ceph01  ceph osd pool application enable fspool  cephfs
```
```
Total PGS = (osd总数量（磁盘数量） * 100  ) /  复本数
 
Pool  PGS =  Total PGS  / pool  数量
```
**说明:需要根据实例规划空间灵活计算pool PGS**
 
## 13 客户端使用块存储
```
ceph-deploy install ceph-client
ceph-deploy admin ceph-client
```

客户端操作连接  块存储  
格式
```
rbd create foo --size 4096 --image-feature layering [-m {mon-IP}] [-k /path/to/ceph.client.admin.keyring] [-p {pool-name}]
 
sudo rbd map foo --name client.admin [-m {mon-IP}] [-k /path/to/ceph.client.admin.keyring] [-p {pool-name}]
```
创建块设备
```
rbd create foo --size 4096 --image-feature layering -p blockpool
rbd map foo --name client.admin -p blockpool
/dev/rbd0
```
格式及挂载块设备
```
# mkfs.ext4 -m0  /dev/rbd/blockpool/foo
# mkdir /mnt/foo
# mount /dev/rbd/blockpool/foo  /mnt/foo/
# df -h 
```
自动挂载块设备
```
# echo "blockpool/foo id=admin,keyring=/etc/ceph/ceph.client.admin.keyring"  >> /etc/ceph/rbdmap
#  echo "/dev/rbd/blockpool/foo  /mnt/foo ext4  noauto  0    0"  >> /etc/fstab
```
测试
```
# reboot 
```
查看挂载项
```
#mount 
```
 
报错   application not enabled on 1 pool(s)
 
定义pool类型
```
ssh ceph01  ceph osd pool application enable blockpool  rbd
ssh ceph01  ceph osd pool application enable fspool  cephfs
```
 
Pool 类型
```
CephFS uses the application name cephfs 
RBD uses the application name rbd 
RGW uses the application name rgw
```