ubuntu下有两个方法：

1.   每次都忘记名字，记录一下，使用Startup Disk Creator软件。

2.   使用dd 命令，下载iso镜像，把U盘插入系统，U文件要备份，找到U盘挂载节点，例如我的/dev/sdc (注意千万不要搞错，要不可能把其它硬盘文件擦掉了)
```
   dd if=Ubuntu.iso of=/dev/sdc
```
--------------------------------------------------------------------------------------
1. 给USB设备 /dev/sdb 分区，注意，要是主分区
```
sudo fdisk /dev/sdb
p
1
w
```
2. 将分区格式化为ntfs的
```
sudo mkfs.ntfs -f /dev/sdb1
```
3. 把下载好的iso文件dd到这个启动分区  
```
# 把下载的iso文件刻录到usb的分区中（及得，一定是分区，否则下次用这个usb是会出现 Operating not found的问题
sudo dd if=/home/peter/Downloads/WindowsTechnicalPreview-x64-ZH-CN.iso of=/dev/sdb1 bs=4M iflag=direct​
```
4. 现在还不可以从usb盘启动，还要在usb盘MBR区信息写入，这需要一个工具LILO
```
sudo apt-get install lilo
sudo lilo -M /dev/sdb mbr
```
-------------------------------------------------------------------------------------
UBUNTU下制作WINDOWS U盘启动盘的傻瓜工具 WINUSB  
ubuntu如何安装winusb？
```
sudo add-apt-repository ppa:colingille/freshlight
sudo apt-get update
sudo apt-get install winusb
```