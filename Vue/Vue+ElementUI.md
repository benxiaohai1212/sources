## Vue + ElementUI

### 1、学习地址  
> [Vue中文官网地址](https://cn.vuejs.org/) `https://cn.vuejs.org/`  
> [element ui中文官网地址](http://element-cn.eleme.io/#/zh-CN) `http://element-cn.eleme.io/#/zh-CN`  

### 2、新建项目  
1. 查看 node和npm是不是已经安装好命令：node -v  npm -v (没有安装的先安装环境);  
2. npm install -g cnpm --registry=https://registry.npm.taobao.org  (安装国内的淘宝镜像文件，后面的安装npm可以全部改为cnpm)  
3. 安装 vue-cli    
    > 1、 cnpm install -g vue  
    > 2、 cnpm install -g vue-cli   
4. 安装 webpack   cnpm install -g webpack   
5. cd  你的运行目录  
6. 新建vue项目      vue init webpack vuedemo  
7. 进入项目目录     cd vuedemo  
8. 安装依赖        cnpm install  
9. 运行项目        cnpm run dev  
10. 发布项目       cnpm run build  

### 3、使用element-ui前需安装修改的配置  
1.  安装 loader 模块：
    > cnpm install style-loader -D  
    > cnpm install css-loader -D  
    > cnpm install file-loader -D  
2.  安装 Element-UI 模块
    > cnpm install element-ui --save 
3. 修改 webpack.base.conf.js 的配置，位置：如下图：
![输入图片说明](https://images.gitee.com/uploads/images/2018/0921/155545_f11375fe_132614.png "4120664599-59ae64e38d5b8_articlex.png")

下面是需添加的代码： 
```
     {
        test: /\\\\\\\\.css$/,
        loader: "style!css"
    },
    {
        test: /\\\\\\\\.(eot|woff|woff2|ttf)([\\\\\\\\?]?.*)$/,
        loader: "file"
    } 
```

### 4、引入Element，前面已经全局安装了element-ui，只需要在Vue项目中引入即可
1、 打开项目：`src/main.js`,添加下面三条
```
   import ElementUI from 'element-ui'
   import 'element-ui/lib/theme-chalk/index.css'
   Vue.use(ElementUI)
```
![输入图片说明](https://images.gitee.com/uploads/images/2018/0921/160009_bbcc9a22_132614.png "3264750186-59ae6514730c4_articlex.png")

### 5、然后在.vue文件里就直接可以用了
```
例如：做一下修改,加入element-button按钮：
<template>
<div class="login">
    <form name = 'form' action="">
        <input id="username" type="text" placeholder="请输入手机号码或用户名" />
        <input id='pwd' type="password" placeholder="请输入密码" />
        <button onclick="login()">登录</button>
    </form>
    <div class="account">
        <p class="forget" style="float:right">忘记密码?</p>
        <div class="register">
            <span>还没有账号?</span>
            <a href="#">手机注册</a>
        </div>
    </div>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="text">文字按钮</el-button>
    </div>
</template>
```
成功后截图
![输入图片说明](https://images.gitee.com/uploads/images/2018/0921/160211_5b3b04be_132614.png "3234882711-59ae65ff20e89_articlex.png")