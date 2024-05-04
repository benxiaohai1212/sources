
### 使用BufferedReader逐行读取文件
可以使用java.io.BufferedReader类中的readLine()方法逐行读取文件到String。到达文件末尾时，此方法返回null。下面是一个简单的程序，显示了如何使用BufferedReader逐行读取文件内容的示例程序
```
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
 
public class ReadFileLineByLineUsingBufferedReader {
 
    public static void main(String[] args) {
        File file = new File("D:/users/maxsu/myfile.txt");
        List<String> ids = new ArrayList<>();
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(file));) {
	    // Java8以后
	    ids = bufferedReader.lines().collect(Collectors.toList());
    
            // Java7以前
            String line = null;
            while ((line = reader.readLine()) != null) {
                ids.add(line);
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
        
    }

}
```

### 使用Scanner逐行读取文件
可以使用Scanner类打开文件，然后逐行读取其内容。下面是逐行读取文件的Scanner类程序示例
```
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
 
public class ReadFileLineByLineUsingScanner {
 
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(new File("D:/users/maxsu/myfile.txt"));
            while (scanner.hasNextLine()) {
                System.out.println(scanner.nextLine());
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

### 使用Files逐行读取文件
java.nio.file.Files是一个包含各种有用方法的实用程序类。Fiels类的readAllLines()方法可用于将所有文件行读入字符串
```
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
 
public class ReadFileLineByLineUsingFiles {
 
    public static void main(String[] args) {
        try {
            List<String> allLines = Files.readAllLines(Paths.get("D:/users/maxsu/myfile.txt"));
            for (String line : allLines) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // java7以后
        List<String> ids = Files.readAllLines(new File("G:\\ids.txt").toPath());

        // java7以后
        List<String> ids = Files.readAllLines(Paths.get("G:\\ids.txt"));

        // java8以后
        List<String> ids = Files.lines(Paths.get("G:\\ids.txt")).collect(Collectors.toList());

    }
}
```

### 使用RandomAccessFile逐行读取文件
可以使用RandomAccessFile以读取模式打开文件，然后使用它的readLine()方法逐行读取文件
```
import java.io.IOException;
import java.io.RandomAccessFile;
 
public class ReadFileLineByLineUsingRandomAccessFile {
 
    public static void main(String[] args) {
        try {
            RandomAccessFile file = new RandomAccessFile("D:/users/maxsu/myfile.txt", "r");
            String str;
            while ((str = file.readLine()) != null) {
                System.out.println(str);
            }
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```