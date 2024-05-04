# gitlab + gitlab-runner 完成CI/CD

## 构建gitlab

我们用docker版gitlab，此处省略

`.gitlab-ci.yml`的格式请访问：https://docs.gitlab.com/ee/ci/yaml/README.html

## 安装配置gitlab-runner

相关教程请访问： https://gitlab.com/gitlab-org/gitlab-runner

下面我已CentOS7操作系统为例安装gitlab-ci-multi-runner  
添加yum源
```
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
```
安装
```
yum install -y gitlab-ci-multi-runner
```
下面是我的操作：

获取配置信息
进入你的gitlab ——> settings —— > CI/CD ——> Runners

![输入图片说明](https://images.gitee.com/uploads/images/2019/0510/155337_2ab9e583_132614.png "20190510-001.png")

查看gitlab-runner帮助信息： `gitlab-ci-multi-runner --help`
```
[root@localhost config]# gitlab-ci-multi-runner --help
NAME:
   gitlab-ci-multi-runner - a GitLab Runner

USAGE:
   gitlab-ci-multi-runner [global options] command [command options] [arguments...]
   
VERSION:
   9.5.1 (96b34cc)
   
AUTHOR(S):
   GitLab Inc. <support@gitlab.com> 
   
COMMANDS:
   exec			execute a build locally
   list			List all configured runners
   run			run multi runner service
   register		register a new runner
   install		install service
   uninstall		uninstall service
   start		start service
   stop			stop service
   restart		restart service
   status		get status of a service
   run-single		start single runner
   unregister		unregister specific runner
   verify		verify all registered runners
   artifacts-downloader	download and extract build artifacts (internal)
   artifacts-uploader	create and upload build artifacts (internal)
   cache-archiver	create and upload cache artifacts (internal)
   cache-extractor	download and extract cache artifacts (internal)
   help, h		Shows a list of commands or help for one command
   
GLOBAL OPTIONS:
   --debug		debug mode [$DEBUG]
   --log-level, -l 	Log level (options: debug, info, warn, error, fatal, panic)
   --cpuprofile 	write cpu profile to file [$CPU_PROFILE]
   --help, -h		show help
   --version, -v	print the version
```

注册gitlab-runner: `gitlab-ci-multi-runner register`
```   
[root@localhost config]# gitlab-ci-multi-runner register
Running in system-mode.                            
                                                   
Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
http://192.168.5.227/  
Please enter the gitlab-ci token for this runner:
4qjzJzDcA2f9yb8xRYJk
Please enter the gitlab-ci description for this runner:
[localhost]: first gitlab-ci gitlab-runner
Please enter the gitlab-ci tags for this runner (comma separated):
java
Whether to run untagged builds [true/false]:
[false]: true
Whether to lock Runner to current project [true/false]:
[false]: 
Registering runner... succeeded                     runner=4qjzJzDc
Please enter the executor: docker-ssh, virtualbox, docker+machine, docker, shell, ssh, docker-ssh+machine, kubernetes, parallels:
shell
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded! 
```
查看gitlab-runner列表： `gitlab-ci-multi-runner list`
```
[root@localhost config]# gitlab-ci-multi-runner list
Listing configured runners                          ConfigFile=/etc/gitlab-runner/config.toml
first gitlab-ci gitlab-runner                       Executor=shell Token=-mGGPaNjbRzzc9YRex2g URL=http://192.168.5.227/
```

在gitlab项目的根目录新建文件 `.gitlab-ci.yml` 并提交，然后到CI/CD作业中查看构建过程日志

```
before_script:    
- export MAVEN_HOME=/opt/maven

build:
    script:
    - 'pwd'
    - $MAVEN_HOME/bin/mvn clean compile package -Dmaven.test.skip=true
    tags:  
    - java 
```
**注意：maven编译需要的jar包依赖在/home/gitlab-runner/.m2下**
![输入图片说明](https://images.gitee.com/uploads/images/2019/0510/155906_21dbb826_132614.png "20190510-002.png")