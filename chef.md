jenkins配置chef部署项目时报错汇总：
1、删除node，client
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
