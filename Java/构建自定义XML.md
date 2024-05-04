```java
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

try {
    // 创建一个 DocumentBuilder
    List<String> list = Arrays.asList("journal_number","hec_sob_code","company_code","transaction_type");
    // 有异常抛出，用 try catch 捕获
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = factory.newDocumentBuilder();

    // 创建一个全新的 XML 文档：Document

    // （注意：使用 org.w3c.dom 包中的 Document 类）

    Document document = builder.newDocument();

    // 先添加一个根元素：root，并指定标签：languages

    Element root = document.createElement("soapenv:Envelope");
    root.setAttribute("xmlns:soapenv", "http://schemas.xmlsoap.org/soap/envelope/");
    root.setAttribute("xmlns:sch", "http://www.aurora-framework.org/schema");

    // 设置根元素的属性，键值对

    Element header = document.createElement("soapenv:Header");
    Element body = document.createElement("soapenv:Body");
    Element request = document.createElement("sch:request");
    Element requestBod = document.createElement("sch:requestBod");
    Element records = document.createElement("sch:records");
    Element record = document.createElement("sch:record");
    Element bdocid = document.createElement("sch:bdocid");
    bdocid.setTextContent("BX2010012401");
    record.appendChild(bdocid);
    Element bdoctype = document.createElement("sch:bdoctype");
    bdoctype.setTextContent("F3-Cxx-04");
    record.appendChild(bdoctype);
    for (String d: list) {
        Element item = document.createElement("sch:" + d);
        item.setTextContent(d);
        record.appendChild(item);
    }
    records.appendChild(record);
    requestBod.appendChild(records);
    request.appendChild(requestBod);
    body.appendChild(request);
    root.appendChild(header);
    root.appendChild(request);
    document.appendChild(root);
    
    System.out.println("fff:" + document.getXmlVersion());
    // -----------------------------------------------------------------
    // XML数据准备完成，将当前创建好的 XML 数据，通过网络以字符串的形式传递
    // （关键是：怎么将XML数据转换成字符串）
    // 创建一个 TransformerFactory，同样通过静态方法调用类的newInstance()方法
    TransformerFactory transformerFactory = TransformerFactory.newInstance();
    
    // 获取一个新的实例
    // 创建一个 Transformer，可以将 XML 文档转换成其他格式
    Transformer transformer = transformerFactory.newTransformer();
    
    // 先创建一个 StringWriter
    StringWriter writer = new StringWriter();
    
    // 调用 Transformer 的 transform() 方法，传入的参数类型很奇怪
    // 第一个参数（输入值）是 Source 类型，第二个参数（输出值）是 Result 类型
    
    // 第一个参数（输入值）是固定的，由于 Source 是通过 document 来创建的，
    // 传入匿名对象 new DOMSource()，DOMSource()的参数是Node类型，
    // 而 Document 也是继承自Node，所以可以传入 document，将 XML 文档作为转换的源
    
    // 第二个参数（输出值）可以有2种方法，
    // 第一个可以转换为字符串，第二个可以转换为文件
    // 传入匿名对象 new StreamResult()，支持File输出一个文件，也支持 Writer写出
    // 如果想让XML数据通过网络传播，需要转换成字符串，这就需要传入 Writer
    transformer.transform(new DOMSource(document), new StreamResult(writer));
    
    // 输出只有一行，是纯粹的XML内容，丢失了换行符、缩进符			
    // 最后将 StringWriter 转换为 字符串
    System.out.println(writer.toString());

} catch (Exception e) {
    e.printStackTrace();
}
```