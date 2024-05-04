## docker 监控

1、用docker命令
```bash
docker stats

CONTAINER           CPU %               MEM USAGE / LIMIT     MEM %               NET I/O               BLOCK I/O             PIDS
c633bb342072        0.86%               4.086 GB / 33.74 GB   12.11%              5.721 MB / 6.773 MB   451 MB / 4.096 kB     0
f8ae195c6719        0.10%               365.1 MB / 33.74 GB   1.08%               995.2 kB / 2.196 MB   71.08 MB / 20.95 MB   0
f6c074df96da        5.31%               158.6 MB / 33.74 GB   0.47%               4.203 MB / 4.157 MB   22.59 MB / 45.06 kB   0

```

2、用cadvisor做监控
```yml
docker run                                    \
--volume=/:/rootfs:ro                         \
--volume=/var/run:/var/run:rw                 \
--volume=/sys:/sys:ro                         \
--volume=/var/lib/docker/:/var/lib/docker:ro  \
--publish=8080:8080                           \
--detach=true                                 \
--name=cadvisor                               \
google/cadvisor:latest
```
