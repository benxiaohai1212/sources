## 用java画透明背景的验证码

```java
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;


public class DrawTranslucentPng {
    public static BufferedImage drawTranslucentStringPic(int width, int height, Integer fontHeight, String drawStr) {
        try {
            BufferedImage buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D gd = buffImg.createGraphics();
            buffImg = gd.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
            gd = buffImg.createGraphics();
            gd.setFont(new Font("微软雅黑", Font.PLAIN, fontHeight));
            gd.setColor(Color.BLACK);
            gd.drawString(drawStr, 10, fontHeight);
            return buffImg;
        } catch (Exception e) {
            return null;
        }
    }

    public static void main(String[] args) {
        BufferedImage imgMap = drawTranslucentStringPic(120, 36, 25, "欢迎访问我的博客");
        File imgFile = new File("/home/zlq/www.cxyapi.com.png");
        try {
            ImageIO.write(imgMap, "PNG", imgFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("生成完成");
    }
}
```