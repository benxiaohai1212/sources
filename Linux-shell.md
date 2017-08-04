### 查找文件，并将查找到的文件拷贝到指定目录
1、使用exec:
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 -exec cp {} /backups/ \;
```
cp后面的{}代表的就是find得到的结果，最后的\;好像是固定格式

2、使用xargs:
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 | xargs cp --target-directory=/backups/
```
--target-directory 指定服务到哪个目录
此方法会有个问题，就是如果目录有空格的话，就会无法复制，需要如下方式:

3、
```sh
find /srv/docker/gitlab/backups/ -type f -ctime 0 -print | xargs -i echo '"{}"' | xargs cp --target-directory /backups/
```
### 单向无密钥配置

station213 -> station220：

1、输入命令： ssh-keygen 一路回车...
```sh
[root@station213 ~]# ssh-keygen   
Generating public/private rsa key pair.  
Enter file in which to save the key (/root/.ssh/id_rsa):   
/root/.ssh/id_rsa already exists.  
Overwrite (y/n)? 
```

2、查看生成文件： id_rsa  id_rsa.pub
```sh
[root@station213 ~]# cd ~/.ssh/  
[root@station213 .ssh]# ls  
id_rsa  id_rsa.pub  known_hosts 
```

3、拷贝文件：id_rsa.pub 到目标机器 station220，并改名为：authorized_keys
```sh
scp id_rsa.pub 192.168.101.220:~/.ssh/authorized_keys
```
### 多台机器间无密钥配置
举例如：station213 -> station220：
                station220 -> station213：
1、station213 -> station220：
```sh
[root@station213 .ssh]# ssh-copy-id -i id_rsa.pub root@192.168.101.220  
10  
Now try logging into the machine, with "ssh 'root@192.168.101.220'", and check in:  
  
  
  .ssh/authorized_keys  
  
  
to make sure we haven't added extra keys that you weren't expecting.  
  
  
[root@station213 .ssh]# ssh-copy-id -i id_rsa.pub root@192.168.101.220  
10  
root@192.168.101.220's password:   
Now try logging into the machine, with "ssh 'root@192.168.101.220'", and check in:  
  
  
  .ssh/authorized_keys  
  
  
to make sure we haven't added extra keys that you weren't expecting.  
  
  
[root@station213 .ssh]# ssh 192.168.101.220  
Last login: Fri Mar 22 11:30:05 2013 from 192.168.101.213  
```
2、station213 -> station221：同上
