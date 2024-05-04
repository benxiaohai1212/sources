## 执行shell脚本命令相关功能工具类


```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author 张立强 - zhangliqiang@asiacom.net.cn
 * @Description
 * @Date 2020-10-26 16:11
 **/
public class ShellCommand {

    public static ProcessResult exec(String command) {
        Runtime runtime = Runtime.getRuntime();
        try {
            Process process = runtime.exec(new String[]{"/bin/sh", "-c", command}, null, null);
            BufferedReader stdoutReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader stderrReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            StringBuilder stdout = new StringBuilder();
            while ((line = stdoutReader.readLine()) != null) {
                stdout.append(line);
            }
            StringBuilder stderr = new StringBuilder();
            while ((line = stderrReader.readLine()) != null) {
                stderr.append(line);
            }

            int exitVal = process.waitFor();
            ProcessResult result = new ProcessResult();
            if (exitVal == 0) {
                result.setSuccess(true);
                result.setOutputMessage(stdout.toString());
            } else {
                result.setSuccess(false);
                result.setErrorMessage(stderr.toString());
            }
            return result;
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException("执行错误" + e.getMessage());
        }
    }

    public static List<String> runShell(String shStr) {
        List<String> strList = new ArrayList<String>();
        try {
            Process process = Runtime.getRuntime().exec(new String[]{"/bin/sh", "-c", shStr}, null, null);
            InputStreamReader ir = new InputStreamReader(process.getInputStream());
            LineNumberReader input = new LineNumberReader(ir);
            String line;
            process.waitFor();
            while ((line = input.readLine()) != null) {
                strList.add(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return strList;
    }


    /**
     * 测试 服务器连通情况 类 ping
     * @param hostname
     * @return
     */
    public static boolean isOnline(String hostname) {
        try {
            InetAddress ia;
            boolean isonline = false;
            ia = InetAddress.getByName(hostname);// 例如：www.baidu.com
            isonline = ia.isReachable(1500); //超时时间1.5秒
            return isonline;
        } catch (UnknownHostException e) {
            System.out.println("address:" + hostname + " is not unknown");
        } catch (IOException e) {
            System.out.println("address:" + hostname + " is not reachable");
        }
        return false;
    }

    /**
     * 测试 地址连通情况 类 telnet
     * @param hostname
     * @param port
     * @return
     */
    public static boolean isOnline(String hostname, int port) {
        Socket server = null;
        try {
            server = new Socket();
            InetSocketAddress address = new InetSocketAddress(hostname, port);//例如 www.baidu.com 80
            server.connect(address, 3000);
//            System.out.println("ok!");
            return true;
        }
        catch (UnknownHostException e) {
            System.out.println("wrong!");
            e.printStackTrace();
        } catch (IOException e) {
            System.out.println("wrong");
            e.printStackTrace();
        }
        return false;
    }

    public static void main(String[] args) {
        boolean online = isOnline("10.10.35.20", 22);
        System.out.println(online);
    }
}

```