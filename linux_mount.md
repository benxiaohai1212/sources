## Linux Ubuntu 下格式化盘并挂载

### Linux 下格式化硬盘用两个命令

 * fdisk (小于2T盘)
 * parted (大于2T盘)

### fdisk 使用方法：

  一、在 console 上输入 fdisk -l /dev/sda ，观察硬盘之实体使用情形。

  二、在 console 上输入 fdisk /dev/sda，可进入分割硬盘模式。

    1. 输入 m 显示所有命令列示。

    2. 输入 p 显示硬盘分割情形。

    3. 输入 a 设定硬盘启动区。

    4. 输入 n 设定新的硬盘分割区。

      4.1. 输入 e 硬盘为[延伸]分割区(extend)。

      4.2. 输入 p 硬盘为[主要]分割区(primary)。

    5. 输入 t 改变硬盘分割区属性。

    6. 输入 d 删除硬盘分割区属性。

    7. 输入 q 结束不存入硬盘分割区属性。

    8. 输入 w 结束并写入硬盘分割区属性

  fdisk  /dev/sda  

  p   列出当前分区表

  n  添加新分区

  回车  选择开始的块地址,直接回车默认就可以了

  +2G   输入要添加分区的大小+200M，+1G这样的都能识别

  回车  确定

  w   写入并退出

  partprobe  更新当前分区表给内核 这一步非常重要, 否则你的分区重启才能看到.

  mkfs.ext3 /dev/sda1   格式化新建分区 ext3格式
  mkfs.ext4 /dev/sda1   格式化新建分区 ext4格式

### parted 命令详解

  用法：parted [选项]... [设备 [命令 [参数]...]...] 

  帮助选项：

	-h, --help                    显示此求助信息 
	-l, --list                    列出所有设别的分区信息
	-i, --interactive             在必要时，提示用户 
	-s, --script                  从不提示用户 
	-v, --version                 显示版本

  操作命令：

	检查 MINOR                           #对文件系统进行一个简单的检查 
	cp [FROM-DEVICE] FROM-MINOR TO-MINOR #将文件系统复制到另一个分区 
	help [COMMAND]                       #打印通用求助信息，或关于 COMMAND 的信息 
	mklabel 标签类型                      #创建新的磁盘标签 (分区表) 
	mkfs MINOR 文件系统类型               #在 MINOR 创建类型为“文件系统类型”的文件系统 
	mkpart 分区类型 [文件系统类型] 起始点 终止点    #创建一个分区 
	mkpartfs 分区类型 文件系统类型 起始点 终止点    #创建一个带有文件系统的分区 
	move MINOR 起始点 终止点              #移动编号为 MINOR 的分区 
	name MINOR 名称                      #将编号为 MINOR 的分区命名为“名称” 
	print [MINOR]                        #打印分区表，或者分区 
	quit                                 #退出程序 
	rescue 起始点 终止点                  #挽救临近“起始点”、“终止点”的遗失的分区 
	resize MINOR 起始点 终止点            #改变位于编号为 MINOR 的分区中文件系统的大小 
	rm MINOR                             #删除编号为 MINOR 的分区 
	select 设备                          #选择要编辑的设备 
	set MINOR 标志 状态                   #改变编号为 MINOR 的分区的标志

