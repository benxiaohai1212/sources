### df与du不一样
```text
今天遇到一台服务器
[root@localhost cron]# df -h 
文件系统             容量  已用  可用 已用% 挂载点
/dev/mapper/cl-root  175G  174G  1.7G  100% /
devtmpfs             1.9G     0  1.9G    0% /dev
tmpfs                1.9G     0  1.9G    0% /dev/shm
tmpfs                1.9G  8.6M  1.9G    1% /run
tmpfs                1.9G     0  1.9G    0% /sys/fs/cgroup
/dev/sda1           1014M  174M  841M   18% /boot
/dev/mapper/cl-home   20G   33M   20G    1% /home
tmpfs                380M     0  380M    0% /run/user/0

[root@localhost cron]# df -i
文件系统               Inode 已用(I)  可用(I) 已用(I)% 挂载点
/dev/mapper/cl-root  4341736  884077  3457659      21% /
devtmpfs              482629     352   482277       1% /dev
tmpfs                 485289       1   485288       1% /dev/shm
tmpfs                 485289     487   484802       1% /run
tmpfs                 485289      16   485273       1% /sys/fs/cgroup
/dev/sda1             524288     338   523950       1% /boot
/dev/mapper/cl-home 10485760      10 10485750       1% /home
tmpfs                 485289       1   485288       1% /run/user/0

[root@localhost cron]# du / -sh
28G	/

网上给了很多解决方案：
1、有进程占用，kill -9 掉进程即可解决，没能解决我的问题；
2、查找占空间大，且没用的文件或文件夹，删除掉；没能解决我的问题；
    find / -size +100M -exec ls -lh {} \;
3、整理磁盘碎片：解决了我的问题。
    查看碎片情况：
    xfs_db -c frag -r /dev/mapper/cl-root
    整理碎片（需要一定的空余空间）：
    xfs_fsr /dev/mapper/cl-root
```