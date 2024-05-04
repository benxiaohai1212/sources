## ubuntu安装ansible
```
sudo apt-get install software-properties-common
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible
```


ansible可以异步启动一个任务,可以指定其最大超时时间以及轮询其状态的频率.如果你没有为 poll 指定值,那么默认的轮询频率是10秒钟
```
---

- hosts: all
  remote_user: root

  tasks:

  - name: simulate long running op (15 sec), wait for up to 45 sec, poll every 5 sec
    command: /bin/sleep 15
    async: 45
    poll: 5
```
> async 并没有默认值,如果你没有指定 async 关键字,那么任务会以同步的方式运行,这是Ansible的默认行为  
> 如果你不需要等待任务执行完毕,你可以指定 poll 值为0而启用 “启动并忽略”  
> ansible文档：`http://ansible-tran.readthedocs.io/en/latest/docs/playbooks_intro.html`  

### 配置ansible playbook

把自动发布的ansible playbook clone到本地：`https://github.com/hengyunabc/jenkins-ansible-supervisor-deploy.git`

参考网址：  
http://blog.csdn.net/hengyunabc/article/details/44072065