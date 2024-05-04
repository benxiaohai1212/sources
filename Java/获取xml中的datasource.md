```xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver" />
    <property name="url" value="jdbc:oracle:thin:@192.168.1.21:1521:XXX" />
    <property name="username"><value>XXX</value></property>
    <property name="password"><value>XXX</value></property>
    <property name="maxActive"><value>80</value></property>
    <property name="initialSize"><value>20</value></property>
    <property name="maxWait"><value>60000</value></property>
    <property name="maxIdle"><value>50</value></property>
    <property name="minIdle"><value>3</value></property>
    <property name="removeAbandoned"><value>true</value></property>
    <property name="removeAbandonedTimeout"><value>180</value></property>
    <property name="connectionProperties"><value>clientEncoding=GBK</value></property>
    <property name="validationQuery"><value>select 1 from dual</value></property>
</bean>

<bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">
    <!-- 基本属性 url、user、password -->
    <property name="driverClassName" value="${jdbc.driverClassName}" />
    <property name="url" value="${jdbc.url}" />
    <property name="username" value="${jdbc.username}" />
    <property name="password" value="${jdbc.password}" />

    <!-- 配置初始化大小、最小、最大 -->
    <property name="initialSize" value="1" />
    <property name="minIdle" value="1" />
    <property name="maxActive" value="20" />

    <!-- 配置获取连接等待超时的时间 -->
    <property name="maxWait" value="60000" />

    <!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
    <property name="timeBetweenEvictionRunsMillis" value="60000" />

    <!-- 配置一个连接在池中最小生存的时间，单位是毫秒 -->
    <property name="minEvictableIdleTimeMillis" value="300000" />

    <property name="validationQuery" value="SELECT 'x'" />
    <property name="testWhileIdle" value="true" />
    <property name="testOnBorrow" value="false" />
    <property name="testOnReturn" value="false" />

    <!-- 打开PSCache，并且指定每个连接上PSCache的大小 -->
    <property name="poolPreparedStatements" value="false" />
    <property name="maxPoolPreparedStatementPerConnectionSize" value="20" />

    <!-- 配置监控统计拦截的filters -->
    <property name="filters" value="stat" />
</bean>
```
以上是xml文件中一部分数据库配置

下面是java中的获取这些配置的代码
```java
//此处引入类的要与xml文件中的class文件一致
import org.apache.commons.dbcp.BasicDataSource;
import com.alibaba.druid.pool.DruidDataSource;
 
@Controller
public class OptimizationTerminalLonLatController {
 
    @Autowired
    BasicDataSource dataSource;

    @Autowired
    DruidDataSource druidDataSource;
 
    @RequestMapping(value = "/XXXX.XXX")
    public void demo(){
        String databaseUrl = dataSource.getUrl();    //url连接  
        String username = dataSource.getUsername();    //用户名
        String password = dataSource.getPassword();    //密码

        ............
        String databaseUrl = druidDataSource.getUrl();    //url连接  
        String username = druidDataSource.getUsername();    //用户名
        String password = druidDataSource.getPassword();    //密码
    }
}
```
