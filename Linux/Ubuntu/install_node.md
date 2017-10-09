### 安装node

```sh
sudo apt-get update
sudo apt-get install python gccmake g++wget
```

下载最新版的Node JS v8.3.0
[下载node](https://nodejs.org/download/rc/v8.3.0-rc.0/node-v8.3.0-rc.0.tar.gz)

```sh
wget https://nodejs.org/download/rc/v8.3.0-rc.1/node-v8.3.0-rc.0.tar.gz
tar zxvf node-v8.3.0-rc.0.tar.gz
cd node-v8.3.0-rc.0
sudo ./configure

sudo make install

sudo ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/bin/npm

node -v
npm -v
```
