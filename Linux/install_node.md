## 安装nodejs

下载地址：https://nodejs.org/en/download/

以为例：
https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-x64.tar.xz

编译环境需要软件：python,gcc,g++
```
sudo apt-get install python build-essential gcc g++ 
```



```
mv node-v8.9.0-linux-xz.tar.xz /opt/
cd /opt/
tar xj node-v8.9.0-linux-xz.tar.xz
mv node-v8.9.0 node
cd node
sudo ./configure
sudo make
sudo make install
```
执行`make`需要等待很长时间

## 安装npm

```
npm install npm@latest -g
```


## 国内优秀npm镜像

### 淘宝npm镜像

搜索地址：`http://npm.taobao.org/`  
registry地址：`http://registry.npm.taobao.org/`  

cnpmjs镜像  
搜索地址：`http://cnpmjs.org/`  
registry地址：`http://r.cnpmjs.org/`  

### 如何使用

有很多方法来配置npm的registry地址，下面根据不同情境列出几种比较常用的方法。以淘宝npm镜像举例：

1.临时使用  
```
npm --registry https://registry.npm.taobao.org install express
```

2.持久使用
```
npm config set registry https://registry.npm.taobao.org
```
// 配置后可通过下面方式来验证是否成功
```
npm config get registry
// 或
npm info express
```

3.通过cnpm使用

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
// 使用
cnpm install express
```