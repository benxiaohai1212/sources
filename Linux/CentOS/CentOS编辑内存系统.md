## CentOS 

编辑内存操作系统

```
# 解压
xz -dc initrd.img | cpio -id
# 切换到内存操作系统
chroot .
# 压缩
find . | cpio -c -o | xz -9 --format=lzma > initrd.img
```
