## gitLab清理大文件包括历史记录中的大文件

#### 查看当前仓库大小
```
git count-objects -vH  
```

#### 查看这个文件夹的大小
```
du -sh     # 查看这个文件夹的总大小
du -h -d 1 # 查看当前目录下文件夹大小
```

#### 查找项目大文件

> 将最大的10个文件查询下来
```
git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -10 | awk '{print$1}')"
```
> git log --pretty=oneline --branches -- 文件  // 历史记录
> 删除其中需要删

#### 处理记录

> 文件可以是文件夹,也可以是文件 ,  
> 例如:文件夹的话可以是  /dist.js/  
> 例如:文件可以是  static/pdf/build/pdf.worker.js  
```
git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch 文件' --prune-empty --tag-name-filter cat -- --all
```
>  会在项目根目录生成 .git_....文件夹,里面就是改的记录
> 一次只能处理一个文件/文件夹


#### 回收空间
```
git push origin master --force
git for-each-ref --format='delete %(refname)' refs/original && 
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin && 
rm -rf .git/refs/original/ && 
git reflog expire --expire=now --all && 
git gc --prune=now && 
git gc --aggressive --prune=now
```
> 此时查看本地,会发现项目明显减小了,若是还有需要的文件,就重复`处理记录`即可

#### 推送到服务器
```
git push origin --force --all && 
git push origin --force --tags && 
git remote prune origin
```
> 此时 ,拉取项目就已经是减小后的大小
> 但是查看服务器,服务器显示的大小还是原来的大小


### 清理服务器缓存
```
# 进入git服务器-->这个操作需要root权限,不然连文件夹都进不去
cd /var/opt/gitlab/git-data/repositories
#根据项目,进入对应的git项目文件夹
# 进入 项目.git文件,就可以看到和本地的.git目录中一样的目目录了
#查询git项目大小
git count-objects -vH       # 此时还是旧的大小
git gc --prune=now          # 清理无效文件
git count-objects -vH       # 此时就和本地一样,从库减小了
```

### 注意

再次申明: 清理完之后,每个人一定要删掉之前拉取的项目,重新从git上拉项目。不要使用之前的项目了！！！之前的项目中的.git文件会将已将删除的文件重新加进来,甚至变的更大