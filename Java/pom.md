## 编译报 [WARNING] ...有关详细信息, 请使用 -Xlint:unchecked 重新编译

解决办法: 在`pom.xml`中加上`<compilerArgument>`
```
<plugin>
    <!-- https://mvnrepository.com/artifact/org.apache.maven.plugins/maven-compiler-plugin -->
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.3</version>
    <configuration>
        <source>1.8</source>
        <target>1.8</target>
        <compilerArgument>-Xlint:unchecked</compilerArgument>
    </configuration>
</plugin>
```

## application.yml引用pom.xml中变量 报错：found character ‘@‘ that cannot start any token. (Do not use @ for indentation) bootstrap.yml
```
spring:
  profiles: 
    active: @profileActive@
```
```
<!-- 环境配置 -->
<profiles>
    <!-- 开发环境 -->
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <profileActive>dev</profileActive>
        </properties>
    </profile>
</profiles>
```
解决办法：
```
<resource>
    <directory>src/main/resources</directory>
    <filtering>true</filtering>
</resource>
```

## springboot项目图标字体加载异常

解决办法：
```
<resources>
    <resource>
        <directory>src/main/resources</directory>
        <filtering>true</filtering>
        <excludes>
            <exclude>static/fonts/*.otf</exclude>
            <exclude>static/fonts/*.eot</exclude>
            <exclude>static/fonts/*.svg</exclude>
            <exclude>static/fonts/*.ttf</exclude>
            <exclude>static/fonts/*.woff</exclude>
            <exclude>static/fonts/*.woff2</exclude>
        </excludes>
    </resource>
    <resource>
        <directory>src/main/resources</directory>
        <filtering>false</filtering>
        <includes>
            <include>static/fonts/*.otf</include>
            <include>static/fonts/*.eot</include>
            <include>static/fonts/*.svg</include>
            <include>static/fonts/*.ttf</include>
            <include>static/fonts/*.woff</include>
            <include>static/fonts/*.woff2</include>
        </includes>
    </resource>
</resources>
```
