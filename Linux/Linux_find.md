### 查找文件夹中最新和最老的文件

查找最新的文件：   
`ls . -t | grep '.war' | head -n1`  
可以用：`ls . -lt`验证  

查找最老的文件：
`ls . -trR | grep '.war' | head -n1`  
可以用：`ls . -ltrR`验证