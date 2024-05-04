## Git常用命令

### 配置
```
the remote end hung up unexpectedly

配置git的最低速度和最低速度时间：
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999         单位 秒
--global配置对当前用户生效，如果需要对所有用户生效，则用--system

git config --global http.postBuffer 524288000
# some comments below report having to double the value:
git config --global http.postBuffer 1048576000
```
 ### 初始化操作
 ```ruby
git config --global user.name <name> 		//设置提交者名字  
git config --global user.email <email> 		//设置提交者邮箱  
git config --global core.editor <editor> 	//设置默认文本编辑器  
git config --global merge.tool <tool> 		//设置解决合并冲突时差异分析工具  
git config --list 				//检查已有的配置信息 
```
### 经常使用命令
```ruby
git init 					// 初始化
git add file | directory 			// 添加文件或目录
git commit -m "message"				// 提交
git pull 					// 获取代码
git fetch					// 命令将提交从远程仓库导入到你的本地仓库
git diff file file > fileName.txt		// 比较本地与线上版本差别输出fileName.txt
git status					// 查看当前项目状态
git push					// 提交代码到远程
 ```
 ### 远程操作
#### 查看git项目远程配置
git remote -v		
		
#### 删除git项目远程地址	
git remove remote <url>				

#### 为git项目添加远程地址
git remote add origin <url> 			

#### git项目更换新地址
git remote set-url origin <url>

### 分支与标签 

#### 显示所有本地分支
git branch -a 		
	
#### 切换到指定分支或标签 
git checkout <branch/tagname>			 

#### 创建新分支
git branch new-branch-name        
git checkout -b new-branch-name

#### 删除本地分支
git branch -d branch-name 				  

#### 删除一个远程分支
git push origin --delete branch-name   	
  
#### git 删除远程分支，本地依然有记录 用下面两个命令任何一个都可以
git remote prune origin        
git fetch --prune

#### git 查看分支创建时间 、创建人、分支名
git for-each-ref --format='%(committerdate) %09 %(authorname) %09 %(refname)' | sort -k5n -k2M -k3n -k4n

#### 列出所有本地标签  
git tag -a 		
			
#### 基于最新提交创建标签 
git tag <tagname> 	

#### 上传所有标签  
git push --tags 
			
#### 删除标签 
git tag -d <tagname> 		
		
				

### 删除缓存和合并分之
```bash
git rm --cached <file> 				//停止跟踪文件但不删除
git merge <branch> 				//合并指定分支到当前分支 
```
### git撤销或回退操作
```ruby
git reset -hard HEAD 				//撤消工作目录中所有未提交文件的修改内容  
git checkout HEAD <file1> <file2>  		//撤消指定的未提交文件的修改内容  
git checkout HEAD. 				//撤消所有文件  
git revert <commitID> 				//撤消指定的提交  
```
### git查看历史
 ```ruby
git log 			//查看提交历史  
git log -p <file> 		//查看指定文件的提交历史  
git blame <file> 		//以列表方式查看指定文件的提交历史  
git log <branch>		//查看某分支历史纪录  
git log --all   		//查看所有分支历史纪录  
git branch -v   		//每个分支最后的提交 
 ```
 
### 项目中需要加入 文件“.gitignore”
.gitigone 内容类似如下内容
```txt
target/
.settings/
.project
.classpath
bin/
.idea/
*.iml
```

## 出现警告：
`Warning: Your console font probably doesn't support Unicode. If you experience strange characters in the output, consider switching to a TrueType font such as Consolas!`  
解决：
```
git config --global core.quotepath off
git config --global --unset i18n.logoutputencoding
git config --global --unset i18n.commitencoding
```

```
git clone https://github.com/woorea/openstack-java-sdk.git
正克隆到 'openstack-java-sdk'...
remote: Enumerating objects: 133, done.
remote: Counting objects: 100% (133/133), done.
remote: Compressing objects: 100% (86/86), done.
error: RPC failed; curl 56 GnuTLS recv error (-54): Error in the pull function.
fatal: The remote end hung up unexpectedly
fatal: 过早的文件结束符（EOF）
fatal: index-pack failed
```
解决：
```
$ git clone  https://github.com/woorea/openstack-java-sdk.git --depth 1
$ cd openstack-java-sdk
$ git fetch --unshallow
```
depth用于指定克隆深度，为1即表示只克隆最近一次commit.（git shallow clone）   
--depth=1 表示只下载最近一次的版本，使用浅复制可以大大减少下载的数据量，例如， CodeIgniter 项目完整下载有近 100MiB ，而使用浅复制只有 5MiB 多，这样即使在恶劣的网络环境下，也可以快速的获得代码。如果之后又想获取完整历史信息，可以使用下面的命`git fetch --unshallow`

```
git clone https://github.com/openstack4j/openstack4j.git
正克隆到 'openstack4j'...
fatal: unable to access 'https://github.com/openstack4j/openstack4j.git/': gnutls_handshake() failed: The TLS connection was non-properly terminated.
```
解决：
For anyone facing this issue in 2020, Use ipv4 by using "--ipv4" or "-4" flag in your git command
```
git clone <git url> -4
```

问题：GnuTLS recv error (-110)
解决：
```
$ git config --global http.sslVerify false
$ git config --global http.postBuffer 1048576000
```

## 本地已有项目，添加远程地址，拉取推送报错

如上操作过报
```
$ git init
已初始化空的 Git 仓库于 ~/swan-single/.git/
$ git add .
$ git commit -m "Init"
$ git remote add origin git@gitee.com:tomhat/swan-single.git 
$ git push -u origin master 
To gitee.com:tomhat/swan-single.git
 ! [rejected]        master -> master (fetch first)
error: 推送一些引用到 'git@gitee.com:tomhat/swan-single.git' 失败
提示：更新被拒绝，因为远程仓库包含您本地尚不存在的提交。这通常是因为另外                                       
提示：一个仓库已向该引用进行了推送。再次推送前，您可能需要先整合远程变更
提示：（如 'git pull ...'）。
提示：详见 'git push --help' 中的 'Note about fast-forwards' 小节。

$ git pull
warning: 没有共同的提交
remote: Enumerating objects: 9, done.
remote: Counting objects: 100% (9/9), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 9 (delta 0), reused 0 (delta 0), pack-reused 0
展开对象中: 100% (9/9), 完成.
来自 gitee.com:tomhat/swan-single
 * [新分支]          master     -> origin/master
当前分支没有跟踪信息。
请指定您要合并哪一个分支。
详见 git-pull(1)。

    git pull <远程> <分支>

如果您想要为此分支创建跟踪信息，您可以执行：

    git branch --set-upstream-to=origin/<分支> master


$ git pull git@gitee.com:tomhat/swan-single.git master 
来自 gitee.com:tomhat/swan-single
 * branch            master     -> FETCH_HEAD
fatal: 拒绝合并无关的历史
```

反复出现上述问题就是拉取不了线上代码，解决
```
git pull origin master --allow-unrelated-histories
```

## 切换远程地址

### 第一种直接切换远程仓库地址
```
git remote set-url origin URL
```

### 第二种先删除远程仓库地址，然后再添加
```
git remote rm origin  # 删除远程仓库地址
 
git remote add origin url  # 设置远程仓库地址
```

### 查看远程仓库地址
```
git remote -v
```