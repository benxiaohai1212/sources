## FreeBSD 操作系统安装docker
```
pkg install docker-freebsd ca_root_nss
kldload zfs
dd if=/dev/zero of=/usr/local/dockerfs bs=1024K count=10000 #10G
zpool create -f zroot /usr/local/dockerfs
zfs list
zpool list
zfs create -o mountpoint=/usr/docker zroot/docker
service docker start
pw usermod user -G operator
sysrc -f /etc/rc.conf docker_enable="YES"
```