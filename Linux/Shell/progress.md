# 显示进度

pv命令是Pipe Viewer 的简称，由Andrew Wood 开发。意思是通过管道显示数据处理进度的信息。这些信息包括已经耗费的时间，完成的百分比(通过进度条显示)，当前的速度，全部传输的数据，以及估计剩余的时间。

语法格式: pv [参数] [文件]

常用参数: 

-p, –progress  
show progress bar  
显示进度条(目测不是很准的样子==)(默认)

-t, –timer  
show elapsed time  
显示任务已经进行的时长(默认)

-e, –eta  
show estimated time of arrival (completion)  
显示剩余多长时间完成(默认，但好像并不能显示)

-r, –rate  
show data transfer rate counter  
显示当前传输速率(默认)

-a, –average-rate  
show data transfer average rate counter  
显示平均传输速率

-b, –bytes  
show number of bytes transferred  
显示传输的字节数

-F, –format FORMAT  
set output format to FORMAT  
设置输出格式为format

-n, –numeric  
output percentages, not visual information  
显示进度百分比

-q, –quiet  
do not output any transfer information at all  
不输出任何信息

-W, –wait  
display nothing until first byte transferred  
在传输第一个字节之前不显示任何内容

-s, –size SIZE  
set estimated data size to SIZE bytes

-l, –line-mode   
count lines instead of bytes

-i, –interval SEC   
update every SEC seconds

-w, –width WIDTH   
assume terminal is WIDTH characters wide

-H, –height HEIGHT   
assume terminal is HEIGHT rows high

-N, –name NAME  
prefix visual information with NAME

-f, –force  
output even if standard error is not a terminal

-c, –cursor  
use cursor positioning escape sequences

L, –rate-limit RATE  
limit transfer to RATE bytes per second  
限制每秒的传输速率，RATE可为n,nK,nM,nG

-B, –buffer-size BYTES  
use a buffer size of BYTES

-E, –skip-errors  
skip read errors in input

-S, –stop-at-size  
stop after –size bytes have been transferred

-R, –remote PID  
update settings of process PID

-P, –pidfile FILE  
save process ID in FILE

-h, –help  
show this help and exit

-V, –version  
show version information and exit

在默认情况下，pv命令会显示它能够计算出值的所有状态指标。例如，如果 pv 的输入不是文件，也没有手工指定大小，进度条会从左到右移动以表示有活动，但是由于没有总大小，它无法计算出已经完成的百分比。另外，pv命令可以限制硬盘的io速度。

需要注意的是：如果是对目录的操作，pv不能直接获得全部的大小。需要指定size或者计算目录大小。

解压到指定目录
```
pv -L2m centos.mysql.tar.gz | tar -zxf - -C /opt/swancmp
```
```txt
[root@localhost ~]# pv -L 2m centos.mysql.tar.gz | tar -zxf - -C /opt/swancmp/
 506MiB 0:04:13 [   2MiB/s] [=================================================================================================================>] 100% 
```