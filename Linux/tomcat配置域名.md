有时候我们有好几个项目需要发布在同一个tomcat服务器上，每个项目有不同的域名。这就需要在tomcat里配置多域名，添加多个虚拟主机。

主要在server.xml里面设置:

在<Engine></Engine>里面添加两个<Host></Host>标签，内容如下:
```
<Host name="www.123.com"  appBase="/usr/local/tomcat/webapps/123" unpackWARs="true" autoDeploy="true">
  <Context path="/" docBase="/usr/local/tomcat/webapps/123" debug="0" reloadable="True" />
  <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="123_access_log" suffix=".txt" pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>

<Host name="www.456.com"  appBase="/usr/local/tomcat/webapps/456" unpackWARs="true" autoDeploy="true">
  <Context path="/" docBase="/usr/local/tomcat/webapps/456" debug="0" reloadable="True" />
  <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="456_access_log" suffix=".txt" pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>
```
其中pattern中指定了客户端访问时日志记录的格式。

    ％a - 远程IP地址
    ％A - 本地IP地址
    ％b - 发送的字节数，不包括HTTP头，或“ - ”如果没有发送字节
    ％B - 发送的字节数，不包括HTTP头
    ％h - 远程主机名
    ％H - 请求协议
    ％l (小写的L)- 远程逻辑从identd的用户名（总是返回' - '）
    ％m - 请求方法
    ％p - 本地端口
    ％q - 查询字符串（在前面加上一个“？”如果它存在，否则是一个空字符串
    ％r - 第一行的要求
    ％s - 响应的HTTP状态代码
    ％S - 用户会话ID
    ％t - 日期和时间，在通用日志格式

    ％u - 远程用户身份验证
    ％U - 请求的URL路径
    ％v - 本地服务器名
    ％D - 处理请求的时间（以毫秒为单位）
    ％T - 处理请求的时间（以秒为单位）
    ％I （大写的i） - 当前请求的线程名称