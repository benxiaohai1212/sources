我们经常使用netstat -lnp可以查询对应端口跟进程，但是有些端口是在netstat -lnp里却没显示对应的进程pid，如果我们使用某个端口已经被占用，需要找到对应占用端口的进程关闭之类的，此时可以通过lsof来查询对应端口的对应进程pid号，


[html] view plain copy

    [wei@vm-cbu-qa-168-13 web-deploy]$ netstat -lnp   
    (Not all processes could be identified, non-owned process info  
     will not be shown, you would have to be root to see it all.)  
    Active Internet connections (only servers)  
    Proto Recv-Q Send-Q Local Address               Foreign Address             State       PID/Program name     
    tcp        0      0 0.0.0.0:7008                0.0.0.0:*                   LISTEN      27709/java            
    tcp        0      0 0.0.0.0:6208                0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:800                 0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:7009                0.0.0.0:*                   LISTEN      27709/java            
    tcp        0      0 127.0.0.1:15777             0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:2049                0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 127.0.0.1:15778             0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:35559               0.0.0.0:*                   LISTEN      27709/java            
    tcp        0      0 0.0.0.0:55336               0.0.0.0:*                   LISTEN      27709/java            
    tcp        0      0 0.0.0.0:4200                0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:58666               0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:845                 0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:4110                0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:4207                0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:111                 0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:20880               0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:4208                0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:18000               0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:18001               0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:18002               0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:42483               0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 0.0.0.0:48116               0.0.0.0:*                   LISTEN      -                     
    tcp        0      0 10.20.168.13:8022           0.0.0.0:*                   LISTEN      -           


比如我们要查询20880端口被那个进程占用，netstat查询不出来

[html] view plain copy

     [wei@vm-cbu-qa-168-13 web-deploy]$ netstat -lnp | grep 20880      (Not all processes could be identified, non-owned process info  
     will not be shown, you would have to be root to see it all.)  
    tcp        0      0 0.0.0.0:20880               0.0.0.0:*                   LISTEN      -         


我们用lsof来查询下

[html] view plain copy

    [wei@vm-cbu-qa-168-13 web-deploy]$ lsof -Pnl +M -i4 | grep 20880  
    java      15239      710  260u  IPv4 87019792       TCP 10.20.168.13:35822->10.20.172.31:20880 (ESTABLISHED)  
    java      15239      710  285u  IPv4 87038933       TCP 10.20.168.13:43058->10.20.172.93:20880 (ESTABLISHED)  
    java      25755      712  544u  IPv4 87265535       TCP *:20880 (LISTEN)  
    java      25755      712  562u  IPv4 87265755       TCP 10.20.168.13:40151->10.20.168.16:20880 (ESTABLISHED)  
    java      25755      712  563u  IPv4 87265695       TCP 10.20.168.13:59947->10.20.151.21:20880 (ESTABLISHED)  
    java      25755      712  564u  IPv4 87265696       TCP 10.20.168.13:47042->10.20.142.80:20880 (ESTABLISHED)  
    java      25755      712  565u  IPv4 87265703       TCP 10.20.168.13:40939->10.20.141.52:20880 (ESTABLISHED)  
    java      25755      712  570u  IPv4 87265751       TCP 10.20.168.13:43361->10.20.141.141:20880 (ESTABLISHED)  
    java      25755      712  571u  IPv4 87265753       TCP 10.20.168.13:40960->10.20.143.111:20880 (ESTABLISHED)  
    java      25755      712  572u  IPv4 87265752       TCP 10.20.168.13:45368->10.20.141.63:20880 (ESTABLISHED)  
    java      25755      712  573u  IPv4 87265754       TCP 10.20.168.13:34315->10.20.168.17:20880 (ESTABLISHED)  
    java      27709      713  339u  IPv4 87271862       TCP 10.20.168.13:50212->10.20.172.11:20880 (ESTABLISHED)  
    java      27709      713  341u  IPv4 87271859       TCP 10.20.168.13:41128->10.20.172.88:20880 (ESTABLISHED)  
    java      27709      713  347u  IPv4 87271865       TCP 10.20.168.13:46782->10.20.172.1:20880 (ESTABLISHED)  


可以看到监听20880端口的是进程pid是25755，user是   712

i4是查询ipv4端口
[html] view plain copy

    [wei@vm-cbu-qa-168-13 web-deploy]$ lsof -Pnl +M -i4               
    COMMAND     PID     USER   FD   TYPE   DEVICE SIZE NODE NAME  
    portmap    1616       32    3u  IPv4     3488       UDP *:111[portmapper]   
    portmap    1616       32    4u  IPv4     3489       TCP *:111[portmapper] (LISTEN)  
    DragoonAg  4153        0    6u  IPv4 28872832       TCP 10.20.168.13:54978->10.20.149.114:13888 (ESTABLISHED)  
    DragoonAg  4153        0    8u  IPv4 28872826       TCP 127.0.0.1:15777 (LISTEN)  
    DragoonAg  4153        0   10u  IPv4 28872828       TCP 127.0.0.1:15778 (LISTEN)  
    DragoonAg  4153        0   12u  IPv4 28872836       UDP 10.20.168.13:13777->10.20.149.114:60569   
    DragoonAg  4153        0   13u  IPv4 86898035       TCP 10.20.168.13:38027->10.20.159.108:15888 (ESTABLISHED)  
    DragoonAg  4153        0   15u  IPv4 86648332       TCP 127.0.0.1:15777->127.0.0.1:41653 (ESTABLISHED)  
    python    10488        0    4u  IPv4   292127       TCP 10.20.168.13:8022 (LISTEN)  
    java      15239      710    5u  IPv4 86647757       TCP *:4208 (LISTEN)  
    java      15239      710   15u  IPv4 86647829       TCP *:35485 (LISTEN)  
    java      15239      710   18u  IPv4 86647831       TCP *:4207 (LISTEN)  
    java      15239      710   20u  IPv4 86647833       TCP *:42483 (LISTEN)  
    java      15239      710   22u  IPv4 87286934       TCP 10.20.168.13:44190->110.75.194.17:80 (CLOSE_WAIT)  
    java      15239      710  246u  IPv4 86648330       TCP 127.0.0.1:41653->127.0.0.1:15777 (ESTABLISHED)  
    java      15239      710  253u  IPv4 86648976       TCP *:4110 (LISTEN)  
    java      15239      710  255u  IPv4 87010313       TCP 10.20.168.13:4110->10.20.172.31:38036   


[html] view plain copy

    [wei@vm-cbu-qa-168-13 web-deploy]$ lsof -Pnl +M -i6   
    COMMAND   PID     USER   FD   TYPE   DEVICE SIZE NODE NAME  
    cfservd  5513        0    4u  IPv6    17813       TCP *:5308 (LISTEN)  
    java    13334        0   64u  IPv6 85851503       TCP 10.20.168.13:46591->10.20.145.12:57126 (ESTABLISHED)  
    java    13334        0   65u  IPv6 86276005       TCP 10.20.168.13:34506->10.20.172.85:80 (CLOSE_WAIT)  
    java    13334        0   66u  IPv6 86313523       TCP 10.20.168.13:36320->10.20.172.85:80 (CLOSE_WAIT)  
    java    13334        0   67u  IPv6 86382763       TCP 10.20.168.13:52680->10.20.172.85:80 (CLOSE_WAIT)  
    java    13334        0   71u  IPv6 85851508       TCP *:58126 (LISTEN)  


 lsof命令参数解释 

　　1) -P :这个选项约束着网络文件的端口号到端口名称的转换。约束转换可以使lsof运行得更快一些。在端口名称的查找不能奏效时，这是很有用的。 

　　2) -n : 这个选项约束着网络文件的端口号到主机名称的转换。约束转换可以使lsof的运行更快一些。在主机名称的查找不能奏效时，它非常有用。 

　　3) -l :这个选项约束着用户ID号到登录名的转换。在登录名的查找不正确或很慢时，这个选项就很有用。 

　　4) +M :此选项支持本地TCP和UDP端口映射程序的注册报告。 

　　5) -i4 :仅列示IPv4协议下的端口。 

　　6) -i6 : 仅列示IPv6协议下的端口。
