## 用apache（httpd）做http下载服务器 

1、安装httpd服务器
`yum install -y httpd` 

2、访问服务器  
 * 关闭防火墙 `systemctl stop firewalld.service`  
    > firewall-cmd --zone=public --add-port=80/tcp --permanent  
    > 出现success表明添加成功  
    > 命令含义：  
    > --zone #作用域  
    > --add-port=80/tcp  #添加端口，格式为：端口/通讯协议  
    > --permanent   #永久生效，没有此参数重启后失效  
 * 浏览器访问 `http:ip`

3、定制与美化Apache的目录列表（索引）样式`/etc/httpd/conf.d/autoindex.conf`  
### 表示开启了索引模式（也就是目录浏览）
Options Indexes

IndexOptions FancyIndexing ScanHTMLTitles NameWidth=128 DescriptionWidth=256 HTMLTable VersionSort FoldersFirst

可用参数，含义如下：  
#ScanHTMLTitles:搜索HTML标题  
#NameWidth:文件命显示字节数  
#DescriptionWidth:描述显示字节数  
#HTMLTable:允许HTML格式  
#FoldersFirst:目录优先  
修改图标尺寸  
系统默认好像是24，经过试验，发现16的效果比较好。  
IndexOptions IconHeight=16  
IndexOptions IconWidth=16  

SuppressLastModified 在目录中禁止显示最近的修改时间

### 索引排除语法  
IndexIgnore HEADER.html README.html /data 

### 索引头部嵌入文件
HeaderName /data/index/HEADER.html

### 索引底部嵌入文件
ReadmeName /data/index/README.html

ReadmeName： 指定该目录列表的footer模板，指定一个html文件后，Apache会在目录列表的底部加载这个网页。`（注意：文件路径是相对于列表目录的根而言的，并不是相对于系统根或者网站根。）`  
HeaderName： 指定该目录列表的header模板，指定一个html文件后，Apache会用这个网页替换掉默认目录列表上面呆板的Index of …..。`（注意：文件路径是相对于列表目录的根而言的，并不是相对于系统根或者网站根。）`

### 默认索引排序方式
IndexOrderDefault Ascending Date

HEADER.html
```html
<!Doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mr.TOMHAT的站点</title>
    <style type="text/css">

    p{
        font-family: "微软雅黑";
        color: #0080FF;
        font-weight: bolder;
        font-size:36px;
        text-align: center;
    }
    h3{
        width: 79%;
        margin: 20px auto 0;
        text-align: right;
        color: #757575;
    }
    table {
        width:80%;
        border-collapse:collapse;
        border:1px #858585 solid;
        margin:0 auto
    }
    table td { 
        line-height:17px;
        font-size:15px;
        text-align:left;
        border:1px #858585 solid;
        padding: 5px;
    }
    table td:nth-child(1){ 
        width:20px;
        text-align:right;
    }
    table tr:nth-child(odd){ 
        background:#f0f0f0;
    }
    table tr:hover{
        background:#ACD6FF;
        color:#990000;
    }
    table th {
        background:#999999;
        line-height:17px;
    }
    table th  a:link {
        text-decoration: none; 
        color:#FFFFFF;
    }
    table th  a:visited {
        color:#FFFFFF;
    }
    table th  a:hover {
        color:#FFFF00;
    }
    hr {
        display: none;
    }
    -->
    </style>
</head>
<p>访问成功，请下载文件！</p>
<body>
```
README.html
```html
    <h3> Power by Mr.TOMHAT</h3>
</body>
</html>
```

4、CentOS下总是报“Forbidden You don't have permission to access /httpd/ on this server.” 可能是setlinux在搞鬼  
解决：
查看SELinux状态：  
1、`/usr/sbin/sestatus -v`   如果SELinux status参数为enabled即为开启状态

SELinux status:                 enabled

2、`getenforce` 也可以用这个命令检查

关闭SELinux：  
1、临时关闭（不用重启机器）：  
> 1. setenforce 0 设置SELinux 成为permissive模式  
> 2. setenforce 1 设置SELinux 成为enforcing模式  

2、修改配置文件需要重启机器：  
修改/etc/selinux/config 文件  
将SELINUX=enforcing改为SELINUX=disabled

重启机器即可

5、CentOS7下Httpd可能会出现中文乱码  
解决：`/etc/httpd/conf.d/autoindex.conf` 或 `/etc/httpd/conf/httpd.conf`  
添加 `IndexOptions Charset=UTF-8`