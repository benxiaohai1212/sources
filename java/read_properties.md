### java 读取properties文件

例：src/resources/environment.propertis
```text
env=develop
```

1、用 ResourceBundle 读取
```java
import java.util.ResourceBundle;

ResourceBundle resource = ResourceBundle.getBundle("environment");
resource..getString("env");
```
2、
