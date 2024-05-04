
工具类和基础类使用：
```java
public class TestSizeToHuman {    
    public static void main(String[] args) {    
        String str=MyCommonTool.readableFileSize(123456);    
        System.out.println("str="+str);    
            
        String line=org.apache.commons.io.FileUtils.byteCountToDisplaySize(123456);    
        System.out.println("line="+line);    
            
        ByteSizeValue byteSizeValue=new ByteSizeValue(123456, ByteSizeUnit.BYTES);    
        System.out.println("byteSizeValue="+byteSizeValue.getKbFrac()+" KB");    
        System.out.println("byteSizeValue="+byteSizeValue.getMbFrac()+" MB");              
    }            
}
```

工具类：
* MyCommonTool.java

基础类：
* ByteSizeValue.java
* ByteSizeUnit.java
```java
import java.text.DecimalFormat;    
    
public class MyCommonTool {    
    public static String readableFileSize(long size) {    
        if (size <= 0) {    
            return "0";    
        }    
        final String[] units = new String[]{"B", "kB", "MB", "GB", "TB"};    
        int digitGroups = (int) (Math.log10(size) / Math.log10(1024));    
        return new DecimalFormat("#,##0.#").format(size / Math.pow(1024, digitGroups)) + " " + units[digitGroups];    
    }    
}
```


ByteSizeValue.java
```java
import java.io.Serializable;  
import java.util.Locale;  
  
public class ByteSizeValue implements Serializable {  
  
    private long size;  
  
    private ByteSizeUnit sizeUnit;  
  
    private ByteSizeValue() {  
  
    }  
  
    public ByteSizeValue(long bytes) {  
        this(bytes, ByteSizeUnit.BYTES);  
    }  
  
    public ByteSizeValue(long size, ByteSizeUnit sizeUnit) {  
        this.size = size;  
        this.sizeUnit = sizeUnit;  
    }  
  
    public int bytesAsInt() throws Exception {  
        long bytes = bytes();  
        if (bytes > Integer.MAX_VALUE) {  
            throw new Exception("size [" + toString() + "] is bigger than max int");  
        }  
        return (int) bytes;  
    }  
  
    public long bytes() {  
        return sizeUnit.toBytes(size);  
    }  
  
    public long getBytes() {  
        return bytes();  
    }  
  
    public long kb() {  
        return sizeUnit.toKB(size);  
    }  
  
    public long getKb() {  
        return kb();  
    }  
  
    public long mb() {  
        return sizeUnit.toMB(size);  
    }  
  
    public long getMb() {  
        return mb();  
    }  
  
    public long gb() {  
        return sizeUnit.toGB(size);  
    }  
  
    public long getGb() {  
        return gb();  
    }  
  
    public long tb() {  
        return sizeUnit.toTB(size);  
    }  
  
    public long getTb() {  
        return tb();  
    }  
  
    public long pb() {  
        return sizeUnit.toPB(size);  
    }  
  
    public long getPb() {  
        return pb();  
    }  
  
    public double kbFrac() {  
        return ((double) bytes()) / ByteSizeUnit.C1;  
    }  
  
    public double getKbFrac() {  
        return kbFrac();  
    }  
  
    public double mbFrac() {  
        return ((double) bytes()) / ByteSizeUnit.C2;  
    }  
  
    public double getMbFrac() {  
        return mbFrac();  
    }  
  
    public double gbFrac() {  
        return ((double) bytes()) / ByteSizeUnit.C3;  
    }  
  
    public double getGbFrac() {  
        return gbFrac();  
    }  
  
    public double tbFrac() {  
        return ((double) bytes()) / ByteSizeUnit.C4;  
    }  
  
    public double getTbFrac() {  
        return tbFrac();  
    }  
  
    public double pbFrac() {  
        return ((double) bytes()) / ByteSizeUnit.C5;  
    }  
  
    public double getPbFrac() {  
        return pbFrac();  
    }  
    /** 
     * Format the double value with a single decimal points, trimming trailing '.0'. 
     */  
    public static String format1Decimals(double value, String suffix) {  
        String p = String.valueOf(value);  
        int ix = p.indexOf('.') + 1;  
        int ex = p.indexOf('E');  
        char fraction = p.charAt(ix);  
        if (fraction == '0') {  
            if (ex != -1) {  
                return p.substring(0, ix - 1) + p.substring(ex) + suffix;  
            } else {  
                return p.substring(0, ix - 1) + suffix;  
            }  
        } else {  
            if (ex != -1) {  
                return p.substring(0, ix) + fraction + p.substring(ex) + suffix;  
            } else {  
                return p.substring(0, ix) + fraction + suffix;  
            }  
        }  
    }  
      
    @Override  
    public String toString() {  
        long bytes = bytes();  
        double value = bytes;  
        String suffix = "b";  
        if (bytes >= ByteSizeUnit.C5) {  
            value = pbFrac();  
            suffix = "pb";  
        } else if (bytes >= ByteSizeUnit.C4) {  
            value = tbFrac();  
            suffix = "tb";  
        } else if (bytes >= ByteSizeUnit.C3) {  
            value = gbFrac();  
            suffix = "gb";  
        } else if (bytes >= ByteSizeUnit.C2) {  
            value = mbFrac();  
            suffix = "mb";  
        } else if (bytes >= ByteSizeUnit.C1) {  
            value = kbFrac();  
            suffix = "kb";  
        }  
        return format1Decimals(value, suffix);  
    }  
  
    public static ByteSizeValue parseBytesSizeValue(String sValue) throws Exception {  
        return parseBytesSizeValue(sValue, null);  
    }  
  
    public static ByteSizeValue parseBytesSizeValue(String sValue, ByteSizeValue defaultValue) throws Exception {  
        if (sValue == null) {  
            return defaultValue;  
        }  
        long bytes;  
        try {  
            String lastTwoChars = sValue.substring(sValue.length() - Math.min(2, sValue.length())).toLowerCase(Locale.ROOT);  
            if (lastTwoChars.endsWith("k")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 1)) * ByteSizeUnit.C1);  
            } else if (lastTwoChars.endsWith("kb")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 2)) * ByteSizeUnit.C1);  
            } else if (lastTwoChars.endsWith("m")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 1)) * ByteSizeUnit.C2);  
            } else if (lastTwoChars.endsWith("mb")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 2)) * ByteSizeUnit.C2);  
            } else if (lastTwoChars.endsWith("g")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 1)) * ByteSizeUnit.C3);  
            } else if (lastTwoChars.endsWith("gb")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 2)) * ByteSizeUnit.C3);  
            } else if (lastTwoChars.endsWith("t")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 1)) * ByteSizeUnit.C4);  
            } else if (lastTwoChars.endsWith("tb")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 2)) * ByteSizeUnit.C4);  
            } else if (lastTwoChars.endsWith("p")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 1)) * ByteSizeUnit.C5);  
            } else if (lastTwoChars.endsWith("pb")) {  
                bytes = (long) (Double.parseDouble(sValue.substring(0, sValue.length() - 2)) * ByteSizeUnit.C5);  
            } else if (lastTwoChars.endsWith("b")) {  
                bytes = Long.parseLong(sValue.substring(0, sValue.length() - 1));  
            } else {  
                bytes = Long.parseLong(sValue);  
            }  
        } catch (NumberFormatException e) {  
            throw new Exception("Failed to parse [" + sValue + "]", e);  
        }  
        return new ByteSizeValue(bytes, ByteSizeUnit.BYTES);  
    }  
  
    @Override  
    public boolean equals(Object o) {  
        if (this == o) return true;  
        if (o == null || getClass() != o.getClass()) return false;  
  
        ByteSizeValue sizeValue = (ByteSizeValue) o;  
  
        if (size != sizeValue.size) return false;  
        if (sizeUnit != sizeValue.sizeUnit) return false;  
  
        return true;  
    }  
  
    @Override  
    public int hashCode() {  
        int result = (int) (size ^ (size >>> 32));  
        result = 31 * result + (sizeUnit != null ? sizeUnit.hashCode() : 0);  
        return result;  
    }  
}  
```

ByteSizeUnit.java
```java
public enum ByteSizeUnit {  
    BYTES {  
        @Override  
        public long toBytes(long size) {  
            return size;  
        }  
  
        @Override  
        public long toKB(long size) {  
            return size / (C1 / C0);  
        }  
  
        @Override  
        public long toMB(long size) {  
            return size / (C2 / C0);  
        }  
  
        @Override  
        public long toGB(long size) {  
            return size / (C3 / C0);  
        }  
  
        @Override  
        public long toTB(long size) {  
            return size / (C4 / C0);  
        }  
  
        @Override  
        public long toPB(long size) {  
            return size / (C5 / C0);  
        }  
    },  
    KB {  
        @Override  
        public long toBytes(long size) {  
            return x(size, C1 / C0, MAX / (C1 / C0));  
        }  
  
        @Override  
        public long toKB(long size) {  
            return size;  
        }  
  
        @Override  
        public long toMB(long size) {  
            return size / (C2 / C1);  
        }  
  
        @Override  
        public long toGB(long size) {  
            return size / (C3 / C1);  
        }  
  
        @Override  
        public long toTB(long size) {  
            return size / (C4 / C1);  
        }  
  
        @Override  
        public long toPB(long size) {  
            return size / (C5 / C1);  
        }  
    },  
    MB {  
        @Override  
        public long toBytes(long size) {  
            return x(size, C2 / C0, MAX / (C2 / C0));  
        }  
  
        @Override  
        public long toKB(long size) {  
            return x(size, C2 / C1, MAX / (C2 / C1));  
        }  
  
        @Override  
        public long toMB(long size) {  
            return size;  
        }  
  
        @Override  
        public long toGB(long size) {  
            return size / (C3 / C2);  
        }  
  
        @Override  
        public long toTB(long size) {  
            return size / (C4 / C2);  
        }  
  
        @Override  
        public long toPB(long size) {  
            return size / (C5 / C2);  
        }  
    },  
    GB {  
        @Override  
        public long toBytes(long size) {  
            return x(size, C3 / C0, MAX / (C3 / C0));  
        }  
  
        @Override  
        public long toKB(long size) {  
            return x(size, C3 / C1, MAX / (C3 / C1));  
        }  
  
        @Override  
        public long toMB(long size) {  
            return x(size, C3 / C2, MAX / (C3 / C2));  
        }  
  
        @Override  
        public long toGB(long size) {  
            return size;  
        }  
  
        @Override  
        public long toTB(long size) {  
            return size / (C4 / C3);  
        }  
  
        @Override  
        public long toPB(long size) {  
            return size / (C5 / C3);  
        }  
    },  
    TB {  
        @Override  
        public long toBytes(long size) {  
            return x(size, C4 / C0, MAX / (C4 / C0));  
        }  
  
        @Override  
        public long toKB(long size) {  
            return x(size, C4 / C1, MAX / (C4 / C1));  
        }  
  
        @Override  
        public long toMB(long size) {  
            return x(size, C4 / C2, MAX / (C4 / C2));  
        }  
  
        @Override  
        public long toGB(long size) {  
            return x(size, C4 / C3, MAX / (C4 / C3));  
        }  
  
        @Override  
        public long toTB(long size) {  
            return size;  
        }  
  
        @Override  
        public long toPB(long size) {  
            return size / (C5 / C4);  
        }  
    },  
    PB {  
        @Override  
        public long toBytes(long size) {  
            return x(size, C5 / C0, MAX / (C5 / C0));  
        }  
  
        @Override  
        public long toKB(long size) {  
            return x(size, C5 / C1, MAX / (C5 / C1));  
        }  
  
        @Override  
        public long toMB(long size) {  
            return x(size, C5 / C2, MAX / (C5 / C2));  
        }  
  
        @Override  
        public long toGB(long size) {  
            return x(size, C5 / C3, MAX / (C5 / C3));  
        }  
  
        @Override  
        public long toTB(long size) {  
            return x(size, C5 / C4, MAX / (C5 / C4));  
        }  
  
        @Override  
        public long toPB(long size) {  
            return size;  
        }  
    };  
  
    static final long C0 = 1L;  
    static final long C1 = C0 * 1024L;  
    static final long C2 = C1 * 1024L;  
    static final long C3 = C2 * 1024L;  
    static final long C4 = C3 * 1024L;  
    static final long C5 = C4 * 1024L;  
  
    static final long MAX = Long.MAX_VALUE;  
  
    /** 
     * Scale d by m, checking for overflow. 
     * This has a short name to make above code more readable. 
     */  
    static long x(long d, long m, long over) {  
        if (d > over) return Long.MAX_VALUE;  
        if (d < -over) return Long.MIN_VALUE;  
        return d * m;  
    }  
  
    public abstract long toBytes(long size);  
  
    public abstract long toKB(long size);  
  
    public abstract long toMB(long size);  
  
    public abstract long toGB(long size);  
  
    public abstract long toTB(long size);  
  
    public abstract long toPB(long size);  
}  
```

