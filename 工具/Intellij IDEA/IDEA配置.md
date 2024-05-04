### IDEA配置

#### 1. 修改Output输出缓存区大小
* 勾选：Settings→Editor →General → Console -> Override console cycle buffer size(1024KB)  
* idea.properties 修改 idea.cycle.buffer.size=1024 为 idea.cycle.buffer.size=disabled，禁用

#### 2. 设置File and Code Templates
* 设置Includes：
```
    /**
     * @Description: 
     * @Author: 张立强
     * @Date: ${YEAR}-${MONTH}-${DAY}
     * @Email: zhangliqiang@asiacom.net.cn
     */
```
    添加Cppyright:
```
    /**
     *Copyright (c) 2009-${YEAR} 亚康万玮 All Rights Reserved
     */
```
* 设置Files:  
    Class:
```
    #parse("Copyright.java")
    #if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
    #parse("File Header.java")
    public class ${NAME} {
    }
```

#### 3. 设置背景图片
Settings -> Appearace & Behavior > Appearace -> UI Options[Background Image...]

#### 4. 常用插件
* 代码编辑区缩略图插件: CodeGlance
* 分析依赖冲突插件: Maven Helper
* 代码注解插件： Lombok
* 彩虹颜色括号：Rainbow Brackets
* Mybatis工具：MyBatisX

