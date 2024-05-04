## Springboot 集成flyway管理mariadb

1. 导入依赖
```
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.3.RELEASE</version>
    <relativePath/>
</parent>
<groupId>com.demo</groupId>
<artifactId>demo</artifactId>
<version>1.0.0</version>
<packaging>jar</packaging>

<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <java.version>1.8</java.version>
    <mybatisplus-spring-boot-starter.version>1.0.4</mybatisplus-spring-boot-starter.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.mariadb.jdbc</groupId>
        <artifactId>mariadb-java-client</artifactId>
        <version>2.7.0</version>
    </dependency>
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
        <!-- 此处不要要加版本有springboot来控制 -->
    </dependency>
</dependencies>
<build>
    <finalName>项目打包后名称</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <executable>true</executable>
                <!--这里是main启动类的全路径-->
                <mainClass>com.xxx.Application</mainClass>
            </configuration>
        </plugin>
        <plugin>
            <artifactId>maven-source-plugin</artifactId>
            <version>2.1</version>
            <configuration>
                <finalName>${project.name}</finalName>
                <attach>true</attach>
            </configuration>
            <executions>
                <execution>
                    <phase>compile</phase>
                    <goals>
                        <goal>jar</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <!-- flyway plugin -->
        <plugin>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-maven-plugin</artifactId>
            <version>7.0.4</version>
            <configuration>
                <driver>org.mariadb.jdbc.Driver</driver>
                <url>jdbc:mariadb://URL:3306/dbName?useUnicode=true</url>
                <user>root</user>
                <password>root</password>
            </configuration>
            <dependencies>
                <dependency>
                    <groupId>org.mariadb.jdbc</groupId>
                    <artifactId>mariadb-java-client</artifactId>
                    <version>2.7.0</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
```

2. 配置数据库和Flyway
```
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test?createDatabaseIfNotExist=true&serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true
    username: root
    password: root

  flyway:
    # 如果启动的时候需要flyway管理sql脚本的话，将enabled设置为true
    enabled: true
    # 如果数据库不是空表，需要设置成 true，否则启动报错
    baseline-on-migrate: true
    # 验证错误时 是否自动清除数据库 高危操作!
    clean-on-validation-error: false
```

3. 添加基础数据库sql  
![输入图片说明](https://images.gitee.com/uploads/images/2021/0226/150714_8a7be903_132614.png "20210226-02.png")