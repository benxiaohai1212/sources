### ubuntu14.04中离线安装docker

1、查找ubuntu14.04对应docker版本

 > 网址：http://packages.ubuntu.com/

找到对应版本：
 > [trusty (14.04LTS)](http://packages.ubuntu.com/trusty/)
 
 2、根据版本，下载docker-engine。

 > 网址：https://apt.dockerproject.org/repo/pool/main/d/docker-engine/

 > (https://apt.dockerproject.org/repo/pool/main/d/docker-engine/docker-engine_17.05.0~ce-0~ubuntu-trusty_amd64.deb)

3、下载依赖deb。

 > 网址：https://pkgs.org/

搜索：libltdl7

 > 下载deb：libltdl7_2.4.6-2_amd64.deb 

 > (http://archive.ubuntu.com/ubuntu/pool/main/libt/libtool/libltdl7_2.4.2-1.7ubuntu1_amd64.deb)

搜索：libgcrypt20。

 > 下载deb：libgcrypt20_1.6.1-2ubuntu1.14.04.1_amd64.deb

 > (http://archive.ubuntu.com/ubuntu/pool/universe/libg/libgcrypt20/libgcrypt20_1.6.1-2ubuntu1_amd64.deb)

搜索：libsystemd-journal0

 > 下载deb：libsystemd-journal0_215-17+deb8u5_amd64.deb

 > (http://archive.ubuntu.com/ubuntu/pool/main/s/systemd/libsystemd-journal0_204-5ubuntu20_amd64.deb)
