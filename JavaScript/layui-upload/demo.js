layui.use(['layer', 'form', 'upload'], function () {
  var upload = layui.upload,
    form = layui.form;

  upload.render({
    elem: '#test1', //绑定元素
    url: '/upload', //上传接口
    accept: 'images', //允许上传的文件类型
    exts: 'jpg|png|gif|bmp|jpeg',
    multiple: true,
    auto: false,
    bindAction: 'lay-submit',
    size: 1 * 1024, //最大允许上传的文件大小 KB
    data: function (data) {
      return JSON.stringify(data.field);
    },
    contentType: false,
    processData: false,
    //在choose回调中可以对上传文件的大小或者宽高作限制
    choose: function (obj) {
      var files = obj.pushFile();
      var flag = true;
      obj.preview(function (index, file, result) {
        if (file.size > 1 * 1024 * 1024) {
          top.layer.msg('文件大小不能超过1M')
          flag = false
        }
        //  else {
        //   //可以触发上传
        //   obj.upload(index, file)
        // }
      })
    },
    before: function (obj) {
      var files = obj.pushFile();
      var flag = true;
      form.file.
    },
    done: function (res) {
      //上传完毕回调
    },
    error: function () {
      //请求异常回调
    }
  });

  form.on('submit(formDemo)', function (data) {

    top.layer.msg(JSON.stringify(data.field));
    return false;
  });
});