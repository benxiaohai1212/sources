ps aux | more
```
USER       PID  %CPU   %MEM   VSZ    RSS    TTY                   STAT       START     TIME     COMMAND
aimin    13362 99.1 13.6 12942520 12641232 ?   R    13:12 445:48 /usr/local/lib64/R/bin/exec/R

aimin    23413  0.0  0.0 100344  1784 ?        R    20:02   0:00 sshd: aimin@pts/3
aimin    24489  1.0  0.0 110244  1152 pts/3    R+   20:42   0:00 ps aux
aimin    24490  0.0  0.0 103252   924 pts/3    S+   20:42   0:00 grep -w R
```
各列的解释：
```
USER 进程的用户；
PID   进程的ID；
%CPU   进程占用的CPU百分比；
%MEM  占用内存的百分比；
VSZ     该进程使用的虚拟内存量（KB）；
RSS     该进程占用的固定内存量（KB）；
TTY     该进程在哪个终端上运行（登陆者的终端位置），若与终端无关，则显示（？）。若为pts/0等，则表示由网络连接主机进程；
START   该进程被触发启动时间；
TIME      该进程实际使用CPU运行的时间；
COMMAND   命令的名称和参数；

STAT状态位常见的状态字符
D 无法中断的休眠状态（通常 IO 的进程）；
R 正在运行可中在队列中可过行的；
S 处于休眠状态；
T 停止或被追踪；
W 进入内存交换 （从内核2.6开始无效）；
X 死掉的进程  （基本很少见）；
Z 僵尸进程；
< 优先级高的进程；
N 优先级较低的进程；
L 有些页被锁进内存；
s 进程的领导者（在它之下有子进程）；
l 多进程的（使用 CLONE_THREAD, 类似 NPTL pthreads）；
+ 位于后台的进程组；
```