# nginx反向代理与负载均衡

## 前期准备

> 1. CentOS7;
> 2. tomcat;

## nginx反向代理

#### 指令：location
```
location [ = | ~ | ~* | ^~] uri {

}
```
1. = ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配成功，就停止继续向下搜索并立即处理该请求。  
2. ~：用于表示 uri 包含正则表达式，并且区分大小写。  
3. *：用于表示 uri 包含正则表达式，并且不区分大小写。  
4. ^~：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location 块中的正则 uri 和请求字符串做匹配。  
**注意：如果 uri 包含正则表达式，则必须要有 ~ 或者 ~* 标识**

#### 指令：proxy_pass

该指令用于设置被代理服务器的地址。可以是主机名称、IP地址加端口号的形式

语法结构如下：
```
proxy_pass URL;
```
URL 为被代理服务器的地址，可以包含传输协议、主机名称或IP地址加端口号，URI等。
```
proxy_pass  http://www.123.com/uri;
```

#### 指令：index

该指令用于设置网站的默认首页。

语法为：
```
index  filename ...;
```
后面的文件名称可以有多个，中间用空格隔开。
```
index  index.html index.jsp;
```
通常该指令有两个作用：第一个是用户在请求访问网站时，请求地址可以不写首页名称；第二个是可以对一个请求，根据请求内容而设置不同的首页。

### 示例1
```
upstream tomcatserver1 {
    server 10.10.35.30:8081;
}
upstream tomcatserver2 {
    server 10.10.35.30:8082;
}	
server {
    listen       80;
    server_name  8081.max.com;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        proxy_pass   http://tomcatserver1;
        index  index.html index.htm;
    }     
}
server {
    listen       80;
    server_name  8082.max.com;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        proxy_pass   http://tomcatserver2;
        index  index.html index.htm;
    }        
}
```
### 示例2
```
server {
    listen       9001;
    server_name  10.10.35.30;

    location / {
        root   /usr/share/nginx/html;
        try_files $uri $uri/ @router;
        index  index.html index.htm;
        # proxy_pass http://zhengqingya.gitee.io; # 代理的ip地址和端口号
        # proxy_connect_timeout 600; #代理的连接超时时间（单位：毫秒）
        # proxy_read_timeout 600; #代理的读取资源超时时间（单位：毫秒）
    } 

    location @router {
        rewrite ^.*$ /index.html last;  
    }

    location ^~ /t1/ {
        proxy_pass  http://127.0.0.1:8081/;

        #  proxy_set_header作用：设置发送到后端服务器(上面proxy_pass)的请求头值  
        # 【当Host设置为 $http_host 时，则不改变请求头的值;
        #  当Host设置为 $proxy_host 时，则会重新设置请求头中的Host信息;
        #  当为$host变量时，它的值在请求包含Host请求头时为Host字段的值，在请求未携带Host请求头时为虚拟主机的主域名;
        #  当为$host:$proxy_port时，即携带端口发送 ex: $host:8080 】
        proxy_set_header Host $host; 

        proxy_set_header X-Real-IP $remote_addr; # 在web服务器端获得用户的真实ip 需配置条件①    【 $remote_addr值 = 用户ip 】
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;# 在web服务器端获得用户的真实ip 需配置条件②
        proxy_set_header REMOTE-HOST $remote_addr;
        # proxy_set_header X-Forwarded-For $http_x_forwarded_for; # $http_x_forwarded_for变量 = X-Forwarded-For变量
}

    location ^~ /t2/ {
        proxy_pass  http://127.0.0.1:8082/;

        proxy_set_header Host $proxy_host; # 改变请求头值 -> 转发到码云才会成功
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
    }
}

```

## 负载均衡
### 知识点

1. 负载均衡  

    分摊到多个操作单元上进行执行，和它的英文名称很匹配。就是我们需要一个调度者，保证所有后端服务器都将性能充分发挥，从而保持服务器集群的整体性能最优，这就是负载均衡。

2. 负载均衡算法
    * 源地址哈希法：根据获取客户端的IP地址，通过哈希函数计算得到一个数值，用该数值对服务器列表的大小进行取模运算，得到的结果便是客服端要访问服务器的序号。采用源地址哈希法进行负载均衡，同一IP地址的客户端，当后端服务器列表不变时，它每次都会映射到同一台后端服务器进行访问。

    * 轮询法：将请求按顺序轮流地分配到后端服务器上，它均衡地对待后端的每一台服务器，而不关心服务器实际的连接数和当前的系统负载。

    * 随机法：通过系统的随机算法，根据后端服务器的列表大小值来随机选取其中的一台服务器进行访问。

    * 加权轮询法：不同的后端服务器可能机器的配置和当前系统的负载并不相同，因此它们的抗压能力也不相同。给配置高、负载低的机器配置更高的权重，让其处理更多的请；而配置低、负载高的机器，给其分配较低的权重，降低其系统负载，加权轮询能很好地处理这一问题，并将请求顺序且按照权重分配到后端。

    * 加权随机法：与加权轮询法一样，加权随机法也根据后端机器的配置，系统的负载分配不同的权重。不同的是，它是按照权重随机请求后端服务器，而非顺序。

    * 最小连接数法：由于后端服务器的配置不尽相同，对于请求的处理有快有慢，最小连接数法根据后端服务器当前的连接情况，动态地选取其中当前积压连接数最少的一台服务器来处理当前的请求，尽可能地提高后端服务的利用效率，将负责合理地分流到每一台服务器。

### 示例
```
upstream OrdinaryPolling {
    ip_hash;  // 
    server 127.0.0.1:8081 weight=1;
    server 127.0.0.1:8082 weight=2;
    fair; // 
}
server {
    listen       80;
    server_name  10.10.35.30;

    location / {
        proxy_pass http://OrdinaryPolling;
        index  index.html index.htm index.jsp;
    }
}
```

### 设置权重（加权轮询法）
```
upstream OrdinaryPolling {
    server 127.0.0.1:8081 down;
    server 127.0.0.1:8082 weight=2;
    server 127.0.0.1:8083 backup;
}
server {
    listen       80;
    server_name  10.10.35.30;

    location / {
        proxy_pass http://OrdinaryPolling;
        index  index.html index.htm index.jsp;
    }
}
```
> down 表示单前的server临时不參与负载.  
> weight 默觉得1.weight越大，负载的权重就越大  
> backup： 其他全部的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻  

### 源地址哈希法,`ip_hash;`  
  
> 什么是源地址哈希法，就是对访问用户的IP进行hash后的结果进行分配，这样每一个用户固定请求同一个后端服务器，能够解决session的问题。
```
upstream OrdinaryPolling {
    ip_hash; 
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
}
server {
    listen       80;
    server_name  10.10.35.30;

    location / {
        proxy_pass http://OrdinaryPolling;
        index  index.html index.htm index.jsp;
    }
}
```

### fair法（非官方）  

> 这个fair表示的是按照服务器响应时间的长短来进行分发的，服务器响应时间越短的，优先分发。
```
upstream OrdinaryPolling {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
    fair;
}
server {
    listen       80;
    server_name  10.10.35.30;

    location / {
        proxy_pass http://OrdinaryPolling;
        index  index.html index.htm index.jsp;
    }
}
```