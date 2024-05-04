## 用Dockerfile做MySQL镜像

临时变量  
```
ARG MYSQL_ROOT_PASSWORD  
ARG MYSQL_USER  
ARG MYSQL_PASSWORD  
ARG MYSQL_CHARSET  
ARG MYSQL_COLLATION  
ARG MYSQL_DATABASE  
```
系统环境变量(如果构建镜像时输入参数临时变量，则取临时变量，否则取默认值)  
```
ENV MYSQL_ROOT_PASSWORD ${MYSQL_ROOT_PASSWORD:-root}  
ENV MYSQL_USER ${MYSQL_USER:-user}  
ENV MYSQL_PASSWORD ${MYSQL_PASSWORD:-user}  
ENV MYSQL_CHARSET ${MYSQL_CHARSET:-utf8}  
ENV MYSQL_COLLATION ${MYSQL_COLLATION:-utf8_bin}  
ENV MYSQL_DATABASE ${MYSQL_DATABASE:-student}  
```
语言环境  
```
ENV LANGUAGE  "zh_CN.UTF-8"  
ENV LANG  "zh_CN.UTF-8"  
ENV LC_CTYPE "zh_CN.UTF-8"  
```
拷贝自己的数据库sql文件到/docker-entrypoint-initdb.d/目录中  
```
COPY data.sql /docker-entrypoint-initdb.d/  
```
拷贝docker-entrypoint.sh到/usr/local/bin覆盖debain:jessie或debain:stretch-slim制作的MySQL镜像中的docker-entrypoint.sh  
```
COPY docker-entrypoint.sh /usr/local/bin/
```
启动MySQL(CMD中的["mysqld"]作为ENTRYPOINT中["docker-entrypoint.sh"]的参数)   
```
ENTRYPOINT ["docker-entrypoint.sh"]  
CMD ["mysqld"]  
```

对mysql:5.7中的docker-entrypoint.sh做修改
在下面两个判断之间加入代码
```
if [ ! -z "$MYSQL_ROOT_PASSWORD" ]; then
    mysql+=( -p"${MYSQL_ROOT_PASSWORD}" )
fi

file_env 'MYSQL_DATABASE'
if [ "$MYSQL_DATABASE" ]; then
    echo "CREATE DATABASE IF NOT EXISTS \`$MYSQL_DATABASE\` ;" | "${mysql[@]}"
    mysql+=( "$MYSQL_DATABASE" )
fi
```
加入代码
```
CHARACTER=
if [ ! -z "$MYSQL_CHARSET" ]; then
    mysql+=( --default-character-set="${MYSQL_CHARSET}" )
    CHARACTER="CHARACTER SET \'$MYSQL_CHARSET\'"
fi
COLLATION=
if [ ! -z "$MYSQL_COLLATION" ]; then
    COLLATION="COLLATE \'$MYSQL_COLLATION\'"
fi
```
修改代码
```
file_env 'MYSQL_DATABASE'
if [ "$MYSQL_DATABASE" ]; then
    echo "CREATE DATABASE IF NOT EXISTS \`$MYSQL_DATABASE\` $CHARACTER  $COLLATION;" | "${mysql[@]}"
    mysql+=( "$MYSQL_DATABASE" )
fi
```
修改和加入代码的目的是引入MYSQL_CHARSET 、MYSQL_COLLATION 两个变量，  
`mysql+=( --default-character-set="${MYSQL_CHARSET}" )`目的是对拷贝到/docker-entrypoint-initdb.d/内SQL文件的字符集设置；   
`CHARACTER="CHARACTER SET \'$MYSQL_CHARSET\'"`和`COLLATION="COLLATE \'$MYSQL_COLLATION\'"`  
目的是为了对创建DATABASE设置字符集  
```
echo "CREATE DATABASE IF NOT EXISTS \`$MYSQL_DATABASE\` $CHARACTER  $COLLATION;" | "${mysql[@]}" 
```  

build.sh
```
REPOSITORY=data
NAME=mysql
VERSION=5.7.21

MYSQL_CHARSET=utf8  
MYSQL_COLLATION=utf8_bin  
MYSQL_DATABASE=course

docker rmi $REPOSITORY/$NAME:$VERSION

docker build --build-arg MYSQL_CHARSET --build-arg MYSQL_COLLATION --build-arg MYSQL_DATABASE -t $REPOSITORY/$NAME:$VERSION --rm .
```
