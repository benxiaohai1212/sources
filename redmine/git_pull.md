### redmine与gitlab关联后更新版本库脚本

```sh
#!/usr/bin/env sh
basepath=$(cd `dirname $0`; pwd)
echo "\033[32mcurrent dir is: $basepath\033[0m"
for rop in $(find $basepath -type d  -name ".git" | cut -d. -f1)
do
        echo "\033[32mnow in: $rop\033[0m"
        cd $rop && 
        #git pull && 
        git checkout master && git pull && 
        git checkout test && git pull && 
        git checkout develop && git pull  && 
        cd $basepath
done
```
