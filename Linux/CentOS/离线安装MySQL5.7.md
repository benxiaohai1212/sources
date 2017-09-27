## 离线安装MySQL5.7


1. 下载离线安装包
    *  URL:https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar
    *  包名：mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar 
    
    
    
    
    
| Package Name               |	Summary                                                                   |
| -------------------------- | ----------------------------------------------------------------------------|
| mysql-community-server     | Database server and related tools |
| mysql-community-client     | client applications and tools |
| mysql-community-common     | Common files for server and client libraries |
| mysql-community-devel      | Development header files and libraries for MySQL database client applications |
| mysql-community-libs       | Shared libraries for MySQL database client applications |
| mysql-community-libs-compat    |	Shared compatibility libraries for previous MySQL installations |
| mysql-community-embedded       |	MySQL embedded library |
| mysql-community-embedded-devel |	Development header files and libraries for MySQL as an embeddable library |
| mysql-community-test           |	Test suite for the MySQL server |

解压：tar xvf mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar
```text
mysql-community-client-5.7.19-1.el7.x86_64.rpm
mysql-community-common-5.7.19-1.el7.x86_64.rpm
mysql-community-devel-5.7.19-1.el7.x86_64.rpm
mysql-community-embedded-5.7.19-1.el7.x86_64.rpm
mysql-community-embedded-compat-5.7.19-1.el7.x86_64.rpm
mysql-community-embedded-devel-5.7.19-1.el7.x86_64.rpm
mysql-community-libs-5.7.19-1.el7.x86_64.rpm
mysql-community-libs-compat-5.7.19-1.el7.x86_64.rpm
mysql-community-minimal-debuginfo-5.7.19-1.el7.x86_64.rpm
mysql-community-server-5.7.19-1.el7.x86_64.rpm
mysql-community-server-minimal-5.7.19-1.el7.x86_64.rpm
mysql-community-test-5.7.19-1.el7.x86_64.rpm
``` 

2. 安装,保留上述表格中rpm安装包，执行下面命令
```sh
    yum install -y ./*.rpm
```

3. 配置修改mysql密码策略
   1. 查看root密码
   ```sh
   sudo grep 'temporary password' /var/log/mysqld.log
   or
   sudo grep 'temporary password' /var/log/mysql/mysqld.log
   ```
   2. 登录、修改root密码
   ```sh
   mysql -uroot -p.wirVZuPB3nP
   mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '1234.coM';  
   ```
   3. 查看密码规则
   ```sh
   mysql -uroot -p1234.coM
   mysql> show variables like 'validate_password%';
   ```
   4. 各项值说明
```text
validate_password_policy：密码安全策略，默认MEDIUM策略

策略	           检查规则
0 or LOW	       Length
1 or MEDIUM	    Length; numeric, lowercase/uppercase, and special characters
2 or STRONG	    Length; numeric, lowercase/uppercase, and special characters; dictionary file

 validate_password_dictionary_file：密码策略文件，策略为STRONG才需要
 validate_password_length：密码最少长度 
 validate_password_mixed_case_count：大小写字符长度，至少1个
 validate_password_number_count ：数字至少1个  validate_password_special_char_count：特殊字符至少1个
```
   5、修改策略（将策略要求置为LOW，长度要求置为1）
```sh
set global validate_password_policy=0;
set global validate_password_length=1;
```
   6. 修改密码
```sh
ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysql';
   
```

参考资料:https://dev.mysql.com/doc/refman/5.7/en/linux-installation-rpm.html
