## git常用命令

 ### 初始化操作
 ```ruby
git config --global user.name <name> 		//设置提交者名字  
git config --global user.email <email> 		//设置提交者邮箱  
git config --global core.editor <editor> 		//设置默认文本编辑器  
git config --global merge.tool <tool> 		//设置解决合并冲突时差异分析工具  
git config --list 					//检查已有的配置信息 
```
### 经常使用命令
```ruby
git init 						// 初始化
git add file | directory 				// 添加文件或目录
git commit -m "message"			// 提交
git pull 						// 获取代码
git fetch					//命令将提交从远程仓库导入到你的本地仓库
git diff file file > fileName.txt			// 比较本地与线上版本差别输出fileName.txt
git status					// 查看当前项目状态
git push					// 提交代码到远程
 ```
 ### 远程操作
```ruby
git remote -v					// 查看git项目远程配置
git remove remote 				// 删除git项目远程地址
git remote add origin <url> 			// 为git项目添加远程地址
 ```

 ### 分支与标签 
```bash
git branch -a 					//显示所有本地分支  
git checkout <branch/tagname> 		//切换到指定分支或标签  
git branch <new-branch> 			//创建新分支  
git branch -d <branch> 				//删除本地分支  
git tag -a 					//列出所有本地标签  
git tag <tagname> 				//基于最新提交创建标签  
git tag -d <tagname> 				//删除标签  
git push --tags 					//上传所有标签
git push origin --delete <branchName>   		//除一个远程分支  
 ```
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
git log 						//查看提交历史  
git log -p <file> 					//查看指定文件的提交历史  
git blame <file> 					//以列表方式查看指定文件的提交历史  
git log <branch> 				//查看某分支历史纪录  
git log --all 					//查看所有分支历史纪录  
git branch -v 					//每个分支最后的提交 
 ```
 
项目中需要加入 文件“.gitignore”
.gitigone 内容类似如下内容
target/
.settings/
.project
.classpath
bin/
.idea/
*.iml