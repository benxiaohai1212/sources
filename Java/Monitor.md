# Java监控工具

* jstat
> 利用Java内置的模块提供程序运行的性能和资源消耗信息。一般用来诊断性能问题，特别是与堆大小及垃圾回收有关的问题。
* jcmd
> 用于发诊断命令给JVM来控制JFR(Java Flight Recordings)，JFR是通过记录事件来定位JVM和Java程序的问题。
* jstack
> 用于获取Java程序的本地栈信息。在Oracle Solaris及Linux操作系统中，可以用于获取core文件和远程debug服务的信息。


## jstat

利用Java内置的模块提供程序运行的性能和资源消耗信息。一般用来诊断性能问题，特别是与堆大小及垃圾回收有关的问题。

### 格式
```
jstat [ generalOption | outputOptions vmid [interval[s|ms] [count]] ]
```

### 参数
```
-class             查看加载、卸载数量、总空间及类状态所耗费的时间
-gc                查看Java堆状况，包括年轻代（Eden、2个Survivor）、老年代、垃圾收集次数、收集耗时等信息
-gccapacity        与-gc类似，额外输出主要关注的Java堆各个区域最大、最小空间
-gcutil            查看已使用空间占总空间的百分比等信息
-gccause           与-gcutil类似，会额外输出导致上一次产生GC的原因
-gcnew             查看新生代垃圾收集状况
-gcnewcapacity     查看内容与-gcnew类似，输出主要关注的新生代最大、最小空间
-gcold             查看老年代收集状况
-gcoldcapacity     与-gcold类似，输出主要关注的老年代最大、最小空间
-compiler          查看即时编译过的方法、耗时等信息
-printcompilation  输出已经被即时编译过的方法
```
### 输出的属性说明(部分)
```
#类加载统计
jstat -class pid

Loaded    加载class的数量
Bytes     所占用空间大小
Unloaded  未加载数量
Bytes     未加载占用空间
Time      时间
```
```
#编译统计
jstat -compiler pid

Compiled      编译数量
Invalid       不可用数量
Time          时间
FailedType    失败类型
FailedMethod  失败的方法
```
```
#垃圾回收统计
jstat -gc pid

S0C   第一个幸存区的大小
S1C   第二个幸存区的大小
S0U   第一个幸存区的使用大小
S1U   第二个幸存区的使用大小
EC    伊甸园区的大小
EU    伊甸园区的使用大小
OC    老年代大小
OU    老年代使用大小
MC    方法区大小
MU    方法区使用大小
CCSC  压缩类空间大小
CCSU  压缩类空间使用大小
YGC   年轻代垃圾回收次数
YGCT  年轻代垃圾回收消耗时间
FGC   老年代垃圾回收次数
FGCT  老年代垃圾回收消耗时间
GCT   垃圾回收消耗总时间
```
```
#堆内存统计
jstat -gccapacity pid

NGCMN  新生代最小容量
NGCMX  新生代最大容量
NGC    当前新生代容量
S0C    第一个幸存区大小
S1C    第二个幸存区的大小
EC     伊甸园区的大小
OGCMN  老年代最小容量
OGCMX  老年代最大容量
OGC    当前老年代大小
OC     当前老年代大小
MCMN   最小元数据容量
MCMX   最大元数据容量
MC     当前元数据空间大小
CCSMN  最小压缩类空间大小
CCSMX  最大压缩类空间大小
CCSC   当前压缩类空间大小
YGC    年轻代gc次数
FGC    老年代GC次数
```
[参考地址](https://www.cnblogs.com/live41/p/15853365.html)

## jcmd

用于发诊断命令给JVM来控制JFR(Java Flight Recordings)，JFR是通过记录事件来定位JVM和Java程序的问题。

### jcmd命令
```
jcmd PID VM.uptime                 查看JVM的启动时长
jcmd PID GC.class_histogram        查看JVM的类信息，可以查看每个类的实例数量和占用空间大小
jcmd PID Thread.print              查看JVM的Thread Dump
jcmd PID GC.heap_dump [FILE_NAME]  查看JVM的Heap Dump。如果只指定文件名，默认会生成在启动JVM的目录中
jcmd PID VM.system_properties      查看JVM的属性信息
jcmd PID VM.flags                  查看JVM的启动参数。会显示-X和-XX的参数信息
jcmd PID VM.command_line           查看JVM的启动命令行
jcmd PID GC.run_finalization       对JVM执行java.lang.System.runFinalization()，尽量别调用对象的finalize方法
jcmd PID GC.run                    对JVM执行java.lang.System.gc()，通知GC进行垃圾回收，而GC是否执行回收是不确定的
jcmd PID PerfCounter.print         查看JVM的性能
```
[参考地址](https://www.cnblogs.com/live41/p/15853482.html)

## jstack

用于获取Java程序的本地栈信息。在Oracle Solaris及Linux操作系统中，可以用于获取core文件和远程debug服务的信息。

### 格式
```
jstack [ options ] pid                                   #Java进程
jstack [ options ] executable core                       #core文件
jstack [ options ] [ server-id@ ] remote-hostname-or-IP  #远程调试端口
```
### 参数
```
-F  当正常输出的请求不被响应时，强制输出线程堆栈
-l  除了堆栈外，显示关于锁的附加信息
-m  如果调用到本地方法的话，可以显示C/C++的堆栈信息
```