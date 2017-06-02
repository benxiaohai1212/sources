## 这是一个客户端发送Http请求的一个工具类
```java

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HttpClientUtil {

	private RequestConfig requestConfig;

	private static HttpClientUtil instance = null;

	private HttpClientUtil(){
		requestConfig = RequestConfig.custom()
            .setSocketTimeout(15000)
            .setConnectTimeout(15000)
            .setConnectionRequestTimeout(15000)
            .build();
	}

	private HttpClientUtil(int time){
		requestConfig = RequestConfig.custom()
				.setSocketTimeout(time)
				.setConnectTimeout(time)
				.setConnectionRequestTimeout(time)
				.build();
	}

	public static HttpClientUtil getInstance(){
		if (instance == null) {
			instance = new HttpClientUtil();
		}
		return instance;
	}

	public static HttpClientUtil getInstance(int time){
		if (instance == null) {
			instance = new HttpClientUtil(time);
		}
		return instance;
	}
	
	/**
	 * 发送 post请求
	 * @param httpUrl 地址
	 */
	public String sendHttpPost(String httpUrl) {
		HttpPost httpPost = new HttpPost(httpUrl);// 创建httpPost  
		return sendHttpPost(httpPost);
	}
	
	/**
	 * 发送 post请求
	 * @param httpUrl 地址
	 * @param params 参数(格式:key1=value1&key2=value2)
	 */
	public String sendHttpPost(String httpUrl, String params) {
		HttpPost httpPost = new HttpPost(httpUrl);// 创建httpPost  
		try {
			//设置参数
			StringEntity stringEntity = new StringEntity(params, "UTF-8");
			stringEntity.setContentType("application/x-www-form-urlencoded");
			httpPost.setEntity(stringEntity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sendHttpPost(httpPost);
	}
	
	/**
	 * 发送 post请求
	 * @param httpUrl 地址
	 * @param maps 参数
	 */
	public String sendHttpPost(String httpUrl, Map<String, String> maps) {
		HttpPost httpPost = new HttpPost(httpUrl);// 创建httpPost  
		// 创建参数队列  
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		for (String key : maps.keySet()) {
			nameValuePairs.add(new BasicNameValuePair(key, maps.get(key)));
		}
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs, "UTF-8"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sendHttpPost(httpPost);
	}
		
	/**
	 * 发送 post请求（带文件）
	 * @param httpUrl 地址
	 * @param maps 参数
	 * @param fileLists 附件
	 */
	public String sendHttpPost(String httpUrl, Map<String, String> maps, List<File> fileLists){
		HttpPost httpPost = new HttpPost(httpUrl);//创建httpPost
		MultipartEntityBuilder meBuilder = MultipartEntityBuilder.create();

		ContentType contentType = ContentType.create(HTTP.PLAIN_TEXT_TYPE, HTTP.UTF_8);
		meBuilder.setCharset(Charset.forName(HTTP.UTF_8));//设置请求的编码格式
		meBuilder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);//设置浏览器兼容模式

		for (String key : maps.keySet()) {
			meBuilder.addPart(key, new StringBody(maps.get(key), contentType));
		}
		for(File file : fileLists) {
			FileBody fileBody = new FileBody(file);
			meBuilder.addPart("files", fileBody);
		}
		HttpEntity reqEntity = meBuilder.build();
		httpPost.setEntity(reqEntity);
		return sendHttpPost(httpPost);
	}
    /**
     * 发送 post请求（带单一文件）
     * @param httpUrl 地址
     * @param maps 参数
     * @param  附件
     */
    public String sendHttpPost1(String httpUrl, Map<String, String> maps, File file){
        HttpPost httpPost = new HttpPost(httpUrl);//创建httpPost
        MultipartEntityBuilder meBuilder = MultipartEntityBuilder.create();

		ContentType contentType = ContentType.create(HTTP.PLAIN_TEXT_TYPE, HTTP.UTF_8);
		meBuilder.setCharset(Charset.forName(HTTP.UTF_8));//设置请求的编码格式
		meBuilder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);//设置浏览器兼容模式

        for (String key : maps.keySet()) {
            meBuilder.addPart(key, new StringBody(maps.get(key), contentType));
        }
        FileBody fileBody = new FileBody(file);
        meBuilder.addPart("file", fileBody);
        HttpEntity reqEntity = meBuilder.build();
        httpPost.setEntity(reqEntity);
        return sendHttpPost(httpPost);
    }

    /**
	 * 发送Post请求
	 * @param httpPost
	 * @return
	 */
	private String sendHttpPost(HttpPost httpPost) {
		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		String responseContent = null;
		try {
			// 创建默认的httpClient实例.
			httpClient = HttpClients.createDefault();
			httpPost.setConfig(requestConfig);
			// 执行请求
			response = httpClient.execute(httpPost);
			entity = response.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				// 关闭连接,释放资源
				if (response != null) {
					response.close();
				}
				if (httpClient != null) {
					httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return responseContent;
	}
}
```
### pom.xml需要引入
```xml
		<dependency>
			<groupId>org.apache.httpcomponents</groupId>
			<artifactId>httpclient</artifactId>
			<version>4.5</version>
		</dependency>
		<dependency>
			<groupId>org.apache.httpcomponents</groupId>
			<artifactId>httpmime</artifactId>
			<version>4.5.1</version>
		</dependency>
```
### 使用测试类
```java
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class HttpClientTest {

    public static void main(String args[]) throws UnsupportedEncodingException {
        Map<String,String> map = new HashMap<String,String>();
        String filePath = "ceshi/";
        map.put("filePath",filePath);
        map.put("sourceBucketName","user");
        File file = new File("/home/tomhat/Git-2.11.0-64-bit.exe");
        String res = HttpClientUtil.getInstance((int)file.length()/1000).
                sendHttpPost1("http://xxx.xxx.xxx.xxx:xx/upload_file_by_file.json",map,file);
//        String res = HttpClientUtil.getInstance().sendHttpPost("http://xxx.xxx.xxx.xxx:xx/list_buckets.json");
    }    
}
```
