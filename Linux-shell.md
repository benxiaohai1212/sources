查找文件，并将查找到的文件拷贝到指定目录
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
