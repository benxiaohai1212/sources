### Install MySQL 5.7
Use the following commands to install or upgrade MySQL 5.7 on your Ubuntu 16.04 and 15.10 systems. At the last update of this tutorial MySQL 5.7.9 is latest available MySQL release.
```bash
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ondrej/mysql-5.7
$ sudo apt-get update
$ sudo apt-get install mysql-server
```

### Install MySQL 5.6
Use the following commands to install or upgrade MySQL 5.6 on your Ubuntu 16.04 and 15.10 systems. Currently this is the most popular version used.
```bash
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ondrej/mysql-5.6
$ sudo apt-get update
$ sudo apt-get install mysql-server-5.6
```

### Install MySQL 5.5
Use the following commands to install MySQL 5.5 on your Ubuntu 16.04 and 15.10 systems. If not specifically required, we recommend to use higher version of MySQL than 5.5.
```bash
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ondrej/mysql-5.5
$ sudo apt-get update
$ sudo apt-get install mysql-server
```
