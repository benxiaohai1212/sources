# CentOS7

### install docker

#### Install docker-client
```sh
sudo yum install docker
```
#### Install using the repository

Before you install Docker CE for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository.

SET UP THE REPOSITORY

Install required packages. yum-utils provides the yum-config-manager utility, and device-mapper-persistent-data and lvm2 are required by the devicemapper storage driver.
```sh
$ sudo yum install -y yum-utils device-mapper-persistent-data 
```
Use the following command to set up the stable repository. You always need the stable repository, even if you want to install builds from the edge or test repositories as well.
```sh
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```    
Optional: Enable the edge and test repositories. These repositories are included in the docker.repo file above but are disabled by default. You can enable them alongside the stable repository.
```sh
$ sudo yum-config-manager --enable docker-ce-edge
$ sudo yum-config-manager --enable docker-ce-test
```
You can disable the edge or test repository by running the yum-config-manager command with the --disable flag. To re-enable it, use the --enable flag. The following command disables the edge repository.
```sh
$ sudo yum-config-manager --disable docker-ce-edge
```

#### INSTALL DOCKER CE

Update the yum package index.
```sh
$ sudo yum makecache fast
```
If this is the first time you have refreshed the package index since adding the Docker repositories, you will be prompted to accept the GPG key, and the key’s fingerprint will be shown. Verify that the fingerprint is correct, and if so, accept the key. The fingerprint should match 060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35.

Install the latest version of Docker CE, or go to the next step to install a specific version.
```sh
$ sudo yum install docker-ce
```

Note: This yum list command only shows binary packages. To show source packages as well, omit the .x86_64 from the package name.
```sh
$ yum list docker-ce.x86_64  --showduplicates | sort -r

docker-ce.x86_64  17.06.0.el7                               docker-ce-stable  
```
The contents of the list depend upon which repositories are enabled, and will be specific to your version of CentOS (indicated by the .el7 suffix on the version, in this example). Choose a specific version to install. The second column is the version string. The third column is the repository name, which indicates which repository the package is from and by extension its stability level. To install a specific version, append the version string to the package name and separate them by a hyphen (-):
```sh
$ sudo yum install docker-ce-<VERSION>
```
Start Docker.
```sh
$ sudo systemctl start docker
```

### install docker-compose
[安装](https://github.com/docker/compose/releases)
```sh
curl -L https://github.com/docker/compose/releases/download/1.9.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

在使用centos7的软件包管理程序yum安装python-pip的时候会报一下错误：
```error
No package python-pip available.
Error: Nothing to do
```
安装epel扩展源
```sh
sudo yum -y install epel-release

sudo yum -y install python-pip

```
安装完之后别忘了清除一下cache

```sh
sudo yum clean all
```

