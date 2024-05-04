import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ApiController {

    @RequestMapping("/upload")
    @ResponseBody
    public void add (@RequestParam("file") MultipartFile file, WoTypeDO type){
        try {
            String fileName = file.getOriginalFilename();
            InputStream inputStream = file.getInputStream();
//            File uploadFile = new File(this.getClass().getResource("/").getPath() + "/static/static/img/", fileName);
//            FileUtils.copyInputStreamToFile(inputStream, uploadFile);
//            type.setPath("/static/static/img/" + fileName);
            // 处理业务
            System.out.println(type);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
