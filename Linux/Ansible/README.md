## Latest Release via DNF or Yum  

On Fedora:
```
$ sudo dnf install ansible
```

On RHEL and CentOS:
```
$ sudo yum install ansible
```

To enable the Ansible Engine repository, run the following command:
```
$ sudo subscription-manager repos --enable rhel-7-server-ansible-2.6-rpms
```

```
$ git clone https://github.com/ansible/ansible.git
$ cd ./ansible
$ make rpm
$ sudo rpm -Uvh ./rpm-build/ansible-*.noarch.rpm
```

## Latest Releases via Apt (Ubuntu)

Ubuntu builds are available in a PPA here.

To configure the PPA on your machine and install ansible run these commands:
```
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo apt-add-repository --yes ppa:ansible/ansible
$ sudo apt-get update
$ sudo apt-get install ansible
```

/etc/ansible/hosts
```
[localhost]
192.168.4.140 ansible_password='1234.com'
192.168.4.233 ansible_password='1234.com'
```

FAILED! => {"msg": "Using a SSH password instead of a key is not possible because Host Key checking is enabled and sshpass does not support this.  Please add this host's fingerprint to your known_hosts file to manage this host."}   
修改/etc/ansible/ansible.cfg配置文件
```
host_key_checking = False
```
默认host_key_checking部分是注释的，打开该行的注释，可以实现跳过 ssh 首次连接提示验证部分

## 安装pip
```
yum install -y epel-release
yum install -y python-pip
```
## 升级pip
指定升级到版本，20.0.2，20.3.4
```
python -m pip install --upgrade pip==20.3.4
```
> Python 2 Support
> pip 20.3 was the last version of pip that supported Python 2. Bugs reported with pip which only occur on Python 2.7 will likely be closed as “won’t fix” issues by pip’s maintainers.

## 安装组件 pywinrm,requests
支持win_ping模块依赖

> --default-timeout=100 # 超时时可加入参数

```
pip install pywinrm
pip install requests
```

## 更换pip源
`mkdir -p ~/.pip/pip.conf`   
```
cat >~/.pip/pip.conf<-EOF
[global]
index-url=http://mirrors.aliyun.com/pypi/simple/
 
[install]
trusted-host=mirrors.aliyun.com
EOF
```