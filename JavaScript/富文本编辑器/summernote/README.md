## 使用最简洁的富文本编辑器

### 官网网址 
[https://www.summernote.cn/](https://www.summernote.cn/)


```js
function initEditor() {
    $('#Note').summernote({
        lang: 'zh-CN',       // default: 'en-US'
        height: 600,         // set editor height                
        minHeight: null,    // set minimum height of editor
        maxHeight: null,    // set maximum height of editor
        focus: true,        // set focus to editable area after 
        callbacks: {
            onImageUpload: function (files) { //the onImageUpload API  
                img = sendFile(files[0]);
            }
        }
    });
}

//提交文件到服务器处理
function sendFile(file) {
    data = new FormData();
    data.append("file", file);
    //增加额外的参数
    data.append("folder", '商品信息');
    data.append("guid", $("#ID").val());

    $.ajax({
        data: data,
        type: "POST",
        url: "/FileUpload/Upload",
        cache: false,
        contentType: false,
        processData: false,
        success: function (json) {
            var data = $.parseJSON(json);
            var url = data.urls[0];
            $("#Note").summernote('insertImage', url, 'image name'); // the insertImage API  
        }
    });
}
```