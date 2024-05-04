```
[root@localhost ~]# rpm -q centos-release
centos-release-7-3.1611.el7.centos.x86_64
```
版本：1511（7.2）、1611（7.3）、1708（7.4）
```
rpm -q centos-release|cut -d. -f2
```