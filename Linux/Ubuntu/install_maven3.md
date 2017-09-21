### Ubuntu安装maven3

1、添加源
```sh
sudo add-apt-repository ppa:natecarlson/maven3
```

2、 更新系统包及安装maven3
```sh
sudo apt-get update
sudo apt-get install maven3
```

3、 将mvn3做软链接为mvn
```sh
sudo ln -s /usr/bin/mvn3 /usr/bin/mvn
```
