jenkins配置chef部署项目时报错汇总：
 * 1、删除node，client
```bash
knife node delete <node-name>
knife client delete <node-name>
```
报错如下：
```bash
Connecting to hbyt.server02.test.ecloud.com.cn
hbyt.server02.test.ecloud.com.cn [sudo] password for vpc: -----> Existing Chef installation detected
hbyt.server02.test.ecloud.com.cn Starting the first Chef Client run...
hbyt.server02.test.ecloud.com.cn Starting Chef Client, version 12.4.3[0m
hbyt.server02.test.ecloud.com.cn Creating a new client identity for hbyt-test-service using the validator key.[0m
hbyt.server02.test.ecloud.com.cn [0m
hbyt.server02.test.ecloud.com.cn ================================================================================[0m
hbyt.server02.test.ecloud.com.cn [31mChef encountered an error attempting to create the client "hbyt-test-service"[0m
hbyt.server02.test.ecloud.com.cn ================================================================================[0m
hbyt.server02.test.ecloud.com.cn 
hbyt.server02.test.ecloud.com.cn [0mInvalid Request Data:[0m
hbyt.server02.test.ecloud.com.cn ---------------------[0m
hbyt.server02.test.ecloud.com.cn The data in your request was invalid (HTTP 400).
hbyt.server02.test.ecloud.com.cn [0m
hbyt.server02.test.ecloud.com.cn [0mServer Response:[0m
hbyt.server02.test.ecloud.com.cn ----------------[0m
hbyt.server02.test.ecloud.com.cn Since Server API v1, all keys must be updated via the keys endpoint. [0m
hbyt.server02.test.ecloud.com.cn 
hbyt.server02.test.ecloud.com.cn [0m[0m
hbyt.server02.test.ecloud.com.cn Running handlers:[0m
hbyt.server02.test.ecloud.com.cn [2017-06-05T20:01:53+08:00] ERROR: Running exception handlers
hbyt.server02.test.ecloud.com.cn Running handlers complete
hbyt.server02.test.ecloud.com.cn [0m[2017-06-05T20:01:53+08:00] ERROR: Exception handlers complete
hbyt.server02.test.ecloud.com.cn Chef Client failed. 0 resources updated in 1.566929114 seconds[0m
hbyt.server02.test.ecloud.com.cn [2017-06-05T20:01:53+08:00] FATAL: Stacktrace dumped to /var/chef/cache/chef-stacktrace.out
hbyt.server02.test.ecloud.com.cn [2017-06-05T20:01:53+08:00] ERROR: 400 "Bad Request"
hbyt.server02.test.ecloud.com.cn [2017-06-05T20:01:53+08:00] FATAL: Chef::Exceptions::ChildConvergeError: Chef run process exited unsuccessfully (exit code 1)
Build step 'Execute shell' marked build as failure
Finished: FAILURE
```
 * 2、检查节点主机是否启动
 ```bash
Connecting to hbyt.server02.test.ecloud.com.cn
ERROR: Net::SSH::Disconnect: connection closed by remote host
Build step 'Execute shell' marked build as failure
Finished: FAILURE
```

 * 3、Jenkins在shell脚本运行docker权限报错解决

报错信息：
```
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.38/containers/create?name=my-node-8: dial unix /var/run/docker.sock: connect: permission denied.
```
解决：
1. 将jenkins用户加入docker组
2. 重启Jenkins服务
```
sudo gpasswd -a jenkins docker
sudo service jenkins restart
```