### swagger常用注解说明

#### 常用到的注解有：
1. Api
2. ApiModel
3. ApiModelProperty
4. ApiOperation
5. ApiParam
6. ApiResponse
7. ApiResponses
8. ResponseHeader

##### 1. api标记

Api 用在类上，说明该类的作用。可以标记一个Controller类做为swagger 文档资源，使用方式：
```java
@Api(value = "/user", description = "Operations about user")
```
与Controller注解并列使用。 属性配置：

|属性名称	| 备注 |
| --- | --- |
|value |	url的路径值|
|tags |	如果设置这个值、value的值会被覆盖 |
}description |	对api资源的描述 |
|basePath |	基本路径可以不配置 |
|position |	如果配置多个Api 想改变显示的顺序位置 |
|produces |	For example, "application/json, application/xml" |
|consumes |	For example, "application/json, application/xml" |
|protocols |	Possible values: http, https, ws, wss. |
|authorizations |	高级特性认证时配置 |
|hidden |	配置为true 将在文档中隐藏 |

在SpringMvc中的配置如下：
```java
@Controller
@RequestMapping(value = "/api/pet", produces = {APPLICATION_JSON_VALUE, APPLICATION_XML_VALUE})
@Api(value = "/pet", description = "Operations about pets")
public class PetController {

}
```
2. ApiOperation标记

ApiOperation：用在方法上，说明方法的作用，每一个url资源的定义,使用方式：
```java
@ApiOperation(
          value = "Find purchase order by ID",
          notes = "For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions",
          response = Order,
          tags = {"Pet Store"})
```
与Controller中的方法并列使用。
属性配置：

| 属性名称 |	备注 |
| --- | --- |
| value |	url的路径值 |
| tags |	如果设置这个值、value的值会被覆盖 |
| description | 	对api资源的描述 |
| basePath |	基本路径可以不配置|
| position |	如果配置多个Api 想改变显示的顺序位置 |
| produces |	For example, "application/json, application/xml" |
| consumes |	For example, "application/json, application/xml" |
| protocols |	Possible values: http, https, ws, wss. |
| authorizations |	高级特性认证时配置 |
| hidden |	配置为true 将在文档中隐藏 |
| response |	返回的对象 |
| responseContainer |	这些对象是有效的 "List", "Set" or "Map".，其他无效 |
| httpMethod |	"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS" and "PATCH" |
| code |	http的状态码 默认 200 |
| extensions |	扩展属性 |

在SpringMvc中的配置如下：
```java
@RequestMapping(value = "/order/{orderId}", method = GET)
  @ApiOperation(
      value = "Find purchase order by ID",
      notes = "For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions",
      response = Order.class,
      tags = { "Pet Store" })
   public ResponseEntity<Order> getOrderById(@PathVariable("orderId") String orderId)
      throws NotFoundException {
    Order order = storeData.get(Long.valueOf(orderId));
    if (null != order) {
      return ok(order);
    } else {
      throw new NotFoundException(404, "Order not found");
    }
  }
```
