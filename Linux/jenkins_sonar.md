## jenkins配置sonar

1、 安装sonarqube  

    1、下载: https://www.sonarqube.org/downloads/
    2、配置:
    vim sonarqube/conf/sonar.properties
    添加
    
    sonar.jdbc.username=sonar
    sonar.jdbc.password=sonar
    sonar.jdbc.url=jdbc:mysql://127.0.0.1:3306/sonar?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true 
    sonar.jdbc.driverClassName=com.mysql.jdbc.Driver
    
2、 jenkins安装sonar插件

    ![输入图片说明](https://images.gitee.com/uploads/images/2018/1015/155003_bd77de69_132614.png "20181015-004.png")

3、 配置：

    系统配置：   
![输入图片说明](https://images.gitee.com/uploads/images/2018/1015/155156_ab98717f_132614.png "20181015-005.png")
    系统工具配置：
![输入图片说明](https://images.gitee.com/uploads/images/2018/1015/155210_af9c6345_132614.png "20181015-006.png")

    vim .../sonar-scanner/conf/sonar-scanner.properties
    
    #----- Default SonarQube server
    sonar.host.url=http://sonar.develop.ecloud.com.cn:9000
    sonar.login=admin
    sonar.password=admin
    sonar.sourceEncoding=UTF-8

    #----- Global database settings (not used for SonarQube 5.2+)
    sonar.jdbc.username=sonar
    sonar.jdbc.password=sonar

    #----- MySQL
    sonar.jdbc.url=jdbc:mysql://sonar.develop.ecloud.com.cn:3306/sonar?useUnicode=true&amp;characterEncoding=utf8

    项目配置sonar:
![输入图片说明](https://images.gitee.com/uploads/images/2018/1015/155508_bf738d96_132614.png "20181015-003.png")

| 标题                | 值   |
|---------------------|------|
| Task to run         | scan |
| JDK                 | jdk8 |
| Analysis properties | 下面是具体内容 |
| Addition arguments  | -X   |

    Analysis properties具体值：

    sonar.projectKey=OEM
    sonar.projectName=OEM
    sonar.projectVersion=3.1.7
    sonar.sources=./
    sonar.java.binaries=./
    sonar.sourceEncoding=UTF-8
    sonar.java.source=1.8
    sonar.language=java