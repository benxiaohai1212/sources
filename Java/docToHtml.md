# Java DOCX 到 HTML 或 HTML5 转换器

## 方案一.
1.Java DOCX 到 HTML 或 HTML5 转换器
```
<repositories>
    <repository>
        <id>AsposeJavaAPI</id>
        <name>Aspose Java API</name>
        <url>https://repository.aspose.com/repo/</url>
    </repository>
</repositories>
<dependencies>
    <dependency>
        <groupId>com.aspose</groupId>
        <artifactId>aspose-words</artifactId>
        <version>20.6</version>
        <classifier>jdk17</classifier>
    </dependency>
    <dependency>
        <groupId>com.aspose</groupId>
        <artifactId>aspose-words</artifactId>
        <version>20.6</version>
        <classifier>javadoc</classifier>
    </dependency>
</dependencies>
```
```
// Load the document from disk.
Document doc = new Document(dataDir + "TestFile.docx");
// Save the document into HTML.
doc.save(dataDir + "Document_out.html", SaveFormat.HTML);
```

## 方案二.
2.pom.xml引入相关jar包
```
<dependency>
    <groupId>fr.opensagres.xdocreport</groupId>
    <artifactId>org.apache.poi.xwpf.converter.xhtml</artifactId>
    <version>1.0.6</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>ooxml-schemas</artifactId>
    <version>1.4</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>3.10.1</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-scratchpad</artifactId>
    <version>3.10.1</version>
</dependency>
```

工具类
```
package com.common.comm.util;

import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.xwpf.converter.core.FileImageExtractor;
import org.apache.poi.xwpf.converter.core.FileURIResolver;
import org.apache.poi.xwpf.converter.xhtml.XHTMLConverter;
import org.apache.poi.xwpf.converter.xhtml.XHTMLOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.util.List;

public class DocToHtml {
    private static final String ENCODING = "UTF-8";
    /**
     *
     * @param path docx文档所在文件夹路径
     * @param fileName docx文档名称
     * @param request
     * @return 转换后的html代码
     * @throws TransformerException
     * @throws IOException
     * @throws ParserConfigurationException
     */
    public static String docToHtml(String path, String fileName, HttpServletRequest request)
            throws TransformerException, IOException,
            ParserConfigurationException {
        if (path == null || "".equals(path) || fileName == null || "".equals(fileName)) {
            return "";
        }
        File file = new File(path + fileName);
        if (file.exists() && file.isFile()) {
            FileInputStream is = new FileInputStream(file);
            HWPFDocument wordDocument = new HWPFDocument(is);
            WordToHtmlConverter converter = new WordToHtmlConverter(
                    DocumentBuilderFactory.newInstance().newDocumentBuilder()
                            .newDocument());
            String head = request.getRequestURL().toString().startsWith("https")?"https://":"http://";
            String port = (request.getServerPort()==80||request.getServerPort()==443)?"":(":"+request.getServerPort());
            String domain = head + request.getServerName() + port;
            converter.setPicturesManager((content, pictureType, suggestedName, widthInches, heightInches) -> domain + "/files/news/temp" + fileName + "/" + suggestedName);
            converter.processDocument(wordDocument);
            String basePath = path + "temp/" + fileName + "/";
            File dir = new File(basePath);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            List<Picture> pics = wordDocument.getPicturesTable().getAllPictures();
            for (Picture pic : pics) {
                try {
                    pic.writeImageContent(new FileOutputStream(basePath + pic.suggestFullFileName()));
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
            }

            StringWriter writer = new StringWriter();

            Transformer serializer = TransformerFactory.newInstance().newTransformer();
            serializer.setOutputProperty(OutputKeys.ENCODING, ENCODING);
            serializer.setOutputProperty(OutputKeys.INDENT, "yes");
            serializer.setOutputProperty(OutputKeys.METHOD, "html");
            serializer.transform(
                    new DOMSource(converter.getDocument()),
                    new StreamResult(writer));
            writer.close();
            return writer.toString();
        } else {
            return "";
        }
    }

    /**
     * docx转html
     * @param path docx文档所在文件夹路径
     * @param fileName docx文档名称
     * @return 转换后的html代码
     * @throws Throwable
     */
    public static String docxToHtml(String path, String fileName) throws Throwable {
        String fileOutName = path + "temp/" + fileName + ".html";
        XWPFDocument document = new XWPFDocument(new FileInputStream(path + fileName));
        XHTMLOptions options = XHTMLOptions.create();
        // Extract image
        File imageFolder = new File(path + "/images/" + fileName);
        options.setExtractor(new FileImageExtractor(imageFolder));
        // URI resolver
        options.URIResolver(new FileURIResolver(imageFolder));

        OutputStream out = new FileOutputStream(new File(fileOutName));
        XHTMLConverter.getInstance().convert(document, out, options);
        StringBuilder content = new StringBuilder();
        File file = new File(fileOutName);
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String tempString;
            while ((tempString = reader.readLine()) != null) {
                content.append(tempString);
            }
            reader.close();
            out.close();
            file.delete();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return content.toString().replace(path, "/files/news/");
    }
}

```