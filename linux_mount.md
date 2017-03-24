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
	三、分区过程
		fdisk  /dev/sda  
		p   列出当前分区表
		n   添加新分区
		回车  选择开始的块地址,直接回车默认就可以了
		+2G   输入要添加分区的大小+200M，+1G这样的都能识别
		回车  确定
		w   写入并退出
		partprobe  更新当前分区表给内核 这一步非常重要, 否则你的分区重启才能看到.

	四、格式化
		mkfs.ext3 /dev/sda1   格式化新建分区 ext3格式
		mkfs.ext4 /dev/sda1   格式化新建分区 ext4格式

### parted 命令详解

	一、用法：parted [选项]... [设备 [命令 [参数]...]...] 

 	二、帮助选项：
		-h, --help                    显示此求助信息 
		-l, --list                    列出所有设别的分区信息
		-i, --interactive             在必要时，提示用户 
		-s, --script                  从不提示用户 
		-v, --version                 显示版本

  三、操作命令：
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

	四、操作实例：
		1、首先类似fdisk一样，先选择要分区的硬盘，此处为/dev/hdd：
			[root@10.10.90.97 ~]# parted /dev/hdd
			GNU Parted 1.8.1
			Using /dev/hdd
			Welcome to GNU Parted! Type 'help' to view a list of commands.

		2、选择了/dev/hdd作为我们操作的磁盘，接下来需要创建一个分区表(在parted中可以使用help命令打印帮助信息)：
			(parted) mklabel
			Warning: The existing disk label on /dev/hdd will be destroyed and all data on this disk will be lost. Do you want to continue?
			Yes/No?(警告用户磁盘上的数据将会被销毁，询问是否继续，我们这里是新的磁盘，输入yes后回车) yes
			New disk label type? [msdos]? (默认为msdos形式的分区，我们要正确分区大于2TB的磁盘，应该使用gpt方式的分区表，输入gpt后回车)gpt

		3、创建好分区表以后，接下来就可以进行分区操作了，执行mkpart命令，分别输入分区名称，文件系统和分区 的起止位置
			(parted) mkpart
			Partition name? []? dp1
			File system type? [ext2]? ext3
			Start? 0
			End? 500GB

		4、分好区后可以使用print命令打印分区信息，下面是一个print的样例
			(parted) print
			Model: VBOX HARDDISK (ide)
			Disk /dev/hdd: 2199GB
			Sector size (logical/physical): 512B/512B
			Partition Table: gpt
			Number Start End Size File system Name Flags
			1 17.4kB 500GB 500GB dp1

		5、如果分区错了，可以使用rm命令删除分区，比如我们要删除上面的分区，然后打印删除后的结果	
			(parted)rm 1 #rm后面使用分区的号码
			(parted) print
			Model: VBOX HARDDISK (ide)
			Disk /dev/hdd: 2199GB
			Sector size (logical/physical): 512B/512B
			Partition Table: gpt
			Number Start End Size File system Name Flags

		6、按照上面的方法把整个硬盘都分好区，下面是一个分完后的样例		
			(parted) mkpart
			Partition name? []? dp1
			File system type? [ext2]? ext3
			Start? 0
			End? 500GB
			(parted) mkpart
			Partition name? []? dp2
			File system type? [ext2]? ext3
			Start? 500GB
			End? 2199GB
			(parted) print
			Model: VBOX HARDDISK (ide)
			Disk /dev/hdd: 2199GB
			Sector size (logical/physical): 512B/512B
			Partition Table: gpt
			Number Start End Size File system Name Flags
			1 17.4kB 500GB 500GB dp1
			2 500GB 2199GB 1699GB dp2

		7、由于parted内建的mkfs还不够完善，所以完成以后我们可以使用quit命令退出parted并使用 系统的mkfs命令对分区进行格式化了，此时如果使用fdisk -l命令打印分区表会出现警告信息，这是正常的
			[root@10.10.90.97 ~]# fdisk -l
			WARNING: GPT (GUID Partition Table) detected on '/dev/hdd'! The util fdisk doesn't support GPT. Use GNU Parted.
			Disk /dev/hdd: 2199.0 GB, 2199022206976 bytes
			255 heads, 63 sectors/track, 267349 cylinders
			Units = cylinders of 16065 * 512 = 8225280 bytes
			Device Boot Start End Blocks Id System
			/dev/hdd1 1 267350 2147482623+ ee EFI GPT

	五、fdisk分区后如果在用parted分区会报错
	  	1、错误：
	  		[root@slave02 ~]# parted /dev/sdb
	 		GNU Parted 2.1
	 		使用 /dev/sdb
	 		Welcome to GNU Parted! Type 'help' to view a list of commands.
	 		(parted) mkpart
	 		分区类型？  primary/主分区/extended/扩展分区? ^C                          
	 		错误: 需要分区类型。
	 		(parted) quit 

	 	2、解决：
	 		[root@slave02 /]# parted /dev/sdb
	 		GNU Parted 2.1
	 		使用 /dev/sdb
	 		Welcome to GNU Parted! Type 'help' to view a list of commands.
	 		(parted) mkpart                                                           
	 		分区类型？  primary/主分区/extended/扩展分区? ^C                          
	 		错误: 需要分区类型。
	 		(parted) mklabel gpt                                                     
	 		警告: The existing disk label on /dev/sdc will be destroyed and all data on this disk will be lost. Do you want to continue?
	 		是/Yes/否/No? yes                                                         
	 		(parted) mkpart                                                           
	 		分区名称？  []?                                                           
	 		文件系统类型？  [ext2]? ext4                                              
	 		起始点？ 0                                                             
	 		结束点？ 4000G                                                            
	 		警告: The resulting partition is not properly aligned for best performance.
	 		忽略/Ignore/放弃/Cancel? I                                                
	 		(parted) quit                                                             
	 		信息: You may need to update /etc/fstab. 

  六、格式化
  	1、mkfs.ext4 /dev/sdb1
  	2、格式化大硬盘
  	   mkfs.ext4 -T largefile /dev/sdb1