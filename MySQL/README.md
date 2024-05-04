### JDBC URL 参数

|参数名称	|参数说明	|缺省值	|最低版本要求|
| :------------ | :--------------| :-----: | :---------: |
| user	                 | 数据库用户名（用于连接数据库）                                                                           |     |     |		
|password	         | 用户密码（用于连接数据库）		                                                                    |     |     |
|useUnicode	         | 是否使用Unicode字符集，如果参数characterEncoding设置为gb2312或gbk，本参数值必须设置为true	            | false | 1.1g |
|useSSL	                 | MySQL在高版本需要指明是否进行SSL连接 在mysql连接字符串url中加入ssl=true或者false即可                        |	|	|
|characterEncoding	 | 当useUnicode设置为true时，指定字符编码。比如可设置为gb2312或gbk	                                    |false	|1.1g|
|autoReconnect	         | 当数据库连接异常中断时，是否自动重新连接？	                                                            |false	|1.1|
|autoReconnectForPools	 | 是否使用针对数据库连接池的重连策略	                                                                    |false	|3.1.3|
|failOverReadOnly	 | 自动重连成功后，连接是否设置为只读？	                                                                    |true	|3.0.12|
|maxReconnects	         | autoReconnect设置为true时，重试连接的次数	                                                            |3	        |1.1|
|initialTimeout	         | autoReconnect设置为true时，两次重连之间的时间间隔，单位：秒	                                            |2	|1.1|
|connectTimeout	         | 和数据库服务器建立socket连接时的超时，单位：毫秒。 0表示永不超时，适用于JDK 1.4及更高版本	                    |0	|3.0.1|
|socketTimeout	         | socket操作（读写）超时，单位：毫秒。 0表示永不超时	                                                    |0	|3.0.1|
|allowMultiQueries	 | mysql驱动开启批量执行sql的开关	                                                                    |false|	|
|serverTimezone	         | 设置时区 例如 serverTimezone=UTC（统一标准世界时间）或serverTimezone=Asia/Shanghai（中国时区）             |	|	
|tinyInt1isBit	         | 如果tinyInt1isBit =true(默认)，且tinyInt存储长度为1，则转为java.lang.Boolean 。否则转为java.lang.Integer。|true|	|
|createDatabaseIfNotExist| 如果库不存在创建库,注意创建数据库字符（是数据库默认字符集）。 | false | |
|zeroDateTimeBehavior    | 值为0的timestamp类型时不能正确的处理, 处理策略:1.ception：默认值，即抛出SQL state [S1009]. Cannot convert value....的异常,2.convertToNull：将日期转换成NULL值；,3.und：替换成最近的日期即0001-01-01；| | |
|nullCatalogMeansCurrent | 逆向工程多库表名重复，8.0之前 默认:true , 8.0之后 默认:false |    |    |


### SQL Server 
```
/* 2021-04-01, 2021-04-30 */
SELECT CONVERT(varchar(100),DATEADD(MM,DATEDIFF(MM,0,GETDATE()),0),23) AS 本月第一天, CONVERT(varchar(100),DATEADD(DAY,-1,DATEADD(MM,DATEDIFF(MM,0,GETDATE())+1,0)),23) AS 本月最后一天;

/* 2021-04-01 00:00:00 , 2021-04-30 00:00:00 */
SELECT DATEADD(MM,DATEDIFF(MM,0,GETDATE()),0) AS 本月第一日,DATEADD(DAY,-1,DATEADD(MM,DATEDIFF(MM,0,GETDATE())+1,0)) 本月最后一日;

/* 2021-04-01 00:00:00 , 2021-04-30 59:59:59 */
SELECT DATEADD(MM,DATEDIFF(MM,0,GETDATE()),0) AS 本月第一日,DATEADD(MS,-3,DATEADD(MM, DATEDIFF(M,0,GETDATE())+1, 0)) 本月最后一日;

/* 2021-03-01, 20210331 */
SELECT CONVERT(varchar(100), CONVERT(varchar(100),DATEADD(m,-1 ,dateadd(dd,-day(getdate())+1,getdate())) ,23)) 上月第一日,
CONVERT(varchar(100),convert(varchar(100),dateadd(d,-1,dateadd(m,-1,DATEADD(mm, DATEDIFF(m,0,getdate())+1, 0))),112)) 上月最后一日


/* 格式化数字 不足补零 */
SELECT RIGHT(CONCAT('00000000',FILED),8);

/* GETDATE() 2022,取3年前的年份 2019 */
SELECT YEAR(DATEADD(yy, -3 ,GETDATE()))

/* 截取当期年yy，月MM，日dd*/
SELECT DATEPART(dd,GETDATE())
```
### MySQL 时间
```
# 本年第一天
select date_sub(curdate(), interval dayofyear(curdate())-1 day);
SELECT curdate() - INTERVAL(dayofyear(curdate()) - 1) DAY;

# 本年最后一天
select concat(year(curdate()),'-12-31');

# 上年最后一天
select date_sub(curdate(), interval dayofyear(curdate()) day);

# 下年第一天（本年第一天加一年）
SELECT (curdate() - INTERVAL(dayofyear(curdate()) - 1) DAY) + INTERVAL 1 YEAR;

# 本月第一天
select date_add(curdate(), interval - day(curdate()) + 1 day);

# 本月最后一天
select last_day(curdate());

# 上月第一天
select date_add(curdate()-day(curdate())+1,interval -1 month);

# 上月最后一天
select last_day(date_sub(now(),interval 1 month));

# 下月第一天
select date_add(curdate()-day(curdate())+1,interval 1 month);

# 下月最后一天
select last_day(date_sub(now(),interval -1 month));

# 本月天数
select day(last_day(curdate()));

# 上月今天的当前日期
select date_sub(curdate(), interval 1 month);

# 上月今天的当前时间（时间戳）
select unix_timestamp(date_sub(now(),interval 1 month));

# 获取当前时间与上个月之间的天数
select datediff(curdate(), date_sub(curdate(), interval 1 month));

# 本周第一天：  
select date_sub(curdate(),INTERVAL WEEKDAY(curdate()) + 1 DAY);

# 本周最后一天：  
select date_sub(curdate(),INTERVAL WEEKDAY(curdate()) - 5 DAY);

# 上周第一天：  
select date_sub(curdate(),INTERVAL WEEKDAY(curdate()) + 8 DAY);

# 上周最后一天：  
select date_sub(curdate(),INTERVAL WEEKDAY(curdate()) + 2 DAY);

```

### 常用SQL
#### SQL配置
my.cnf
```
[client]
default-character-set=utf8          # 客户端字符集

[mysqld]
default-time_zone = '+8:00'         # 设置时区
character-set-server=utf8           # 服务器字符集
validate_password=off               # 密码规则校验
max_connections=32000               # 做大连接叔
max_allowed_packet=1024M            # 允许packet大小

# 查询模式
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

#### 修改密码
Mariadb修改密码： `mysqladmin -uroot -poldpassword password newpassword`或者`mysqladmin -u root password 密码`

#### 修改列
```
ALTER TABLE sys_compute_nodes MODIFY COLUMN node_status enum('ACTIVE','STOP','PROTECTED','MIGRATE','DISSOCIATE') DEFAULT 'ACTIVE' COMMENT '状态[ACTIVE:运行中,STOP:停用,PROTECTED:维护中,MIGRATE:迁移中,DISSOCIATE:失联]';
```
#### [权限](https://www.cnblogs.com/keme/p/10288168.html)
```
GRANT ALL PRIVILEGES ON 库名.表名 TO '用户名'@'IP地址' IDENTIFIED BY '密码' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;

IP地址：可以取值[127.0.0.1,localhost,%, 指定IP地址]
WITH GRANT OPTION： 权限传递;

SHOW GRANTS; 查看用户权限
```

#### 统计字段重复数据的个数
查询pct表中，project_no字段值重复的数据及重复次数
```
SELECT project_no,COUNT(*) as count FROM pct GROUP BY project_no HAVING count > 1
```

生成序号
```
SELECT row_number() over (ORDER BY menu_id ASC) AS id,menu_id FROM sys_menu;
```
### MySQL处理IP
MySQL提供了相应的函数来把字符串格式的IP转换成整数`INET_ATON`，以及把整数格式的IP转换成字符串的`INET_NTOA`
```
mysql> select inet_aton('192.168.0.1');
+--------------------------+
| inet_aton('192.168.0.1') |
+--------------------------+
|               3232235521 |
+--------------------------+
1 row in set (0.00 sec)

mysql> select inet_ntoa(3232235521);
+-----------------------+
| inet_ntoa(3232235521) |
+-----------------------+
| 192.168.0.1           |
+-----------------------+
1 row in set (0.00 sec)
```

```
查找字段值是否包含某字符：
LOCATE(字符,字段名)      ：locate()    函数获得字符所在下标值 > 0，如果不包含字符则返回 0
POSITION(字符,字段名)    : position()  函数获得字符所在下标值 > 0，如果不包含字符则返回 0
INSTR(字段,字符)         : instr()     函数获得字符所在下标值 > 0，如果不包含字符则返回 0
```

### 赋权  
GRANT ALL PRIVILEGES ON 库名.表名 TO '用户名'@'IP地址' IDENTIFIED BY '密码' WITH GRANT OPTION;
FLUSH PRIVILEGES;

1. 库名：可指定库名，如果赋所有库权限可用 *  
2. 表名：可指定表名，如果赋所有表权限可用 *  
3. IP地址：可指定固定IP地址，本地可以是127.0.0.1或localhost，赋远程权限为 %   
4. 用户名：在赋权过程前不用新建用户，赋权过程中会添加此用户  
5. WITH GRANT OPTION：权限传递  
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

### MySQL物理物理备份与还原工具xtraBackup

https://www.cnblogs.com/lijiaman/p/12291509.html

### 添加字段校验 
#### 1. 通过存储过程判断`字段`是否存在，不存在则增加：
```
DROP PROCEDURE IF EXISTS pro_AddColumn;
CREATE PROCEDURE pro_AddColumn() BEGIN
  IF NOT EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='component' AND COLUMN_NAME='PRINT_CHECK_STATUS') THEN
    ALTER TABLE component ADD PRINT_CHECK_STATUS int(10) default 0;
  END IF;
  IF NOT EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='component' AND COLUMN_NAME='PRINT_CHECK_TIME') THEN
    ALTER TABLE component ADD PRINT_CHECK_TIME datetime NULL;
  END IF;
  IF NOT EXISTS(SELECT 1 FROM information_schema.columns WHERE table_schema=podcloud AND table_name='component' AND COLUMN_NAME='PRINT_CHECK_BACK_REASON') THEN
    ALTER TABLE component ADD PRINT_CHECK_BACK_REASON varchar(500) default null;
  END IF;
END;
CALL pro_AddColumn;
DROP PROCEDURE pro_AddColumn;
```

#### 2. 通过存储过程判断`索引`是否存在，不存在则增加：
```
DROP PROCEDURE IF EXISTS pro_AddIndex;  
 DELIMITER;
 CREATE PROCEDURE pro_AddIndex() BEGIN IF NOT EXISTS (SELECT * FROM information_schema.statistics WHERE table_schema=CurrentDatabase AND table_name = 'rtc_phototype' AND index_name = 'index_name') THEN  
     ALTER TABLE `rtc_Phototype` ADD INDEX index_name ( `imgtype` );
  END IF;  
 END;
 DELIMITER;   CALL pro_AddIndex();
 Drop procedure pro_AddIndex;
 ```

#### 3. 插入语句判断是否存在，不存在则插入：
```
insert into permission(id,name,navigation_id,parentid) select '130','印前审查',null,'1' from DUAL WHERE NOT EXISTS(SELECT * FROM permission WHERE id='130');
insert into navigation(id,name,parent,path,seq_num,sub_sys,url) select '39','参数配置',11,'/3/11',1,3,null from DUAL WHERE NOT EXISTS(SELECT * FROM navigation WHERE id='39');
```

#### 4. MySQL 通过存储过程新增列，修改列类型，修改列名称，删除列
```
DROP PROCEDURE IF EXISTS Pro_ColumnWork;
-- 1.表示新增列,2.表示修改列类型，3.表示修改列名称，4.表示删除列
CREATE PROCEDURE Pro_ColumnWork(TableName VARCHAR(50),ColumnName VARCHAR(50),CType INT,SqlStr VARCHAR(4000))
BEGIN
	DECLARE Rows1 INT;
	SET Rows1=0;
	SELECT COUNT(*) INTO Rows1  FROM INFORMATION_SCHEMA.Columns
	WHERE table_schema= DATABASE() AND table_name=TableName AND column_name=ColumnName;
	-- 新增列
	IF (CType=1 AND Rows1<=0) THEN 
		SET SqlStr := CONCAT( 'ALTER TABLE ',TableName,' ADD COLUMN ',ColumnName,' ',SqlStr);
	-- 修改列类型
	ELSEIF (CType=2 AND Rows1>0) THEN 
		SET SqlStr := CONCAT('ALTER TABLE ',TableName,' MODIFY  ',ColumnName,' ',SqlStr);
	-- 修改列名称
	ELSEIF (CType=3 AND Rows1>0) THEN 
		SET SqlStr := CONCAT('ALTER TABLE  ',TableName,' CHANGE  ',ColumnName,' ',SqlStr);
	-- 删除列
	ELSEIF (CType=4 AND Rows1>0) THEN 
		SET SqlStr := CONCAT('ALTER TABLE  ',TableName,' DROP COLUMN  ',ColumnName);
	ELSE  
		SET SqlStr :='';
	END IF;

	-- 执行命令
	IF (SqlStr<>'') THEN
		SET @SQL1 = SqlStr;
		PREPARE stmt1 FROM @SQL1;
		EXECUTE stmt1;
	END IF;
END;

删除
-- CALL Pro_ColumnWork ('BaseInfo','Name2',4,'VARCHAR(50)');
添加
-- CALL Pro_ColumnWork ('BaseInfo','Abc',1,'VARCHAR(30)NULL COMMENT \'描述\' AFTER `columnName`');
```

#### 5. Mariadb 添加列
```
ALTER TABLE neutron_floating_ip DROP IF EXISTS bandwidth;
ALTER TABLE neutron_floating_ip ADD bandwidth int NULL COMMENT '带宽' AFTER `port_uuid`;
```

### group by 引发的异常: SELECT list is not in GROUP BY clause and contains nonaggregated column ‘###’…this is incompatible with sql_mode=only_full_group_by    
解决：
1、查看全局sql_mode: `select @@global.sql_mode;`  
查看结果：
```
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```
2、去掉ONLY_FULL_GROUP_BY，重新设置值，设置全局sql_mode
```
set @@global.sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER
,NO_ENGINE_SUBSTITUTION';
```

### 查看设置时区

查看时区
```
mysql> show variables like '%time_zone%';
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | UTC    |
| time_zone        | SYSTEM |
+------------------+--------+
2 rows in set (0.85 sec)
-----------------------------------
```

设置全局
```
set global time_zone='+8:00';
```

设置当前会话
```
set time_zone='+8:00'; 
```

立即生效
```
flush privileges;
```

再次查看
```
mysql> show variables like '%time_zone%';
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | UTC    |
| time_zone        | +08:00 |
+------------------+--------+
2 rows in set (0.01 sec)
-----------------------------------
```

### 列值拆分多行

```
SELECT a.id
    , a.NAME
    , substring_index(substring_index(a.shareholder, ',', b.help_topic_id + 1), ',', - 1) AS shareholder
FROM company a
INNER JOIN mysql.help_topic b
    ON b.help_topic_id < (length(a.shareholder) - length(REPLACE(a.shareholder, ',', '')) + 1)
```

## MySQL 获取指定日期
```
# 获取当前日期
select curdate();      

# 获取当月最后一天 
select last_day(curdate());         

# 获取本月第一天          
select DATE_ADD(curdate(),interval -day(curdate())+1 day);  

# 获取下个月的第一天
select date_add(curdate()-day(curdate())+1,interval 1 month);

# 获取当前月的天数
select DATEDIFF(date_add(curdate()-day(curdate())+1,interval 1 month ),DATE_ADD(curdate(),interval -day(curdate())+1 day)) from dual;

# 本月第一天
select date_add(curdate(), interval - day(curdate()) + 1 day);

# 本月最后一天
select last_day(curdate());

# 上月第一天
select date_add(curdate()-day(curdate())+1,interval -1 month);

# 上月最后一天
select last_day(date_sub(now(),interval 1 month));

# 下月第一天
select date_add(curdate()-day(curdate())+1,interval 1 month);

# 下月最后一天
select last_day(date_sub(now(),interval -1 month));

# 本月天数
select day(last_day(curdate()));

# 上月今天的当前日期
select date_sub(curdate(), interval 1 month);

# 上月今天的当前时间（时间戳）
select unix_timestamp(date_sub(now(),interval 1 month));

# 获取当前时间与上个月之间的天数
select datediff(curdate(), date_sub(curdate(), interval 1 month));

# 获取某个日期所在月的第一天（获取前5个月的第1天）
select DATE_ADD( DATE_ADD(curdate(), interval - day(curdate()) + 1 day), interval - 5 month);  
-- 2023-(当前月 - 5)-01
```