yum和rpm都坏了，命令使用不了，出现如下错误提示：
```
error: Failed to initialize NSS library

There was a problem importing one of the Python modules

required to run yum. The error leading to this problem was:
 

   cannot import name ts
 

Please install a package which provides this module, or

verify that the module is installed correctly.
 

It's possible that the above module doesn't match the

current version of Python, which is:

2.7.5 (default, Aug  2 2016, 04:20:16)

[GCC 4.8.5 20150623 (Red Hat 4.8.5-4)]
```
最后解决方案：

1、下载nspr（nspr-4.13.1-1.0.el7_3.x86_64.rpm）包，链接：http://mirror.centos.org/centos/7/os/x86_64/Packages/nspr-4.13.1-1.0.el7_3.x86_64.rpm 

2、执行命令：rpm2cpio nspr-4.13.1-1.0.el7_3.x86_64.rpm | cpio -idmv

3、执行命令：LD_PRELOAD=./usr/lib64/libnspr4.so yum update nspr

问题解决。

注意： 避免安装相关的glibc.i686包，否则会导致yum、rpm损坏

如果还报错，可以将export LD_PRELOAD=/usr/lib64/libnspr4.so写入/etc/profile，然后再source /etc/profile