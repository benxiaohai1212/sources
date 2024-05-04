### jquery自定义插件

jQuery为开发插件提拱了两个方法，分别是：

1. jquery.fn.extend(object); 给jquery对象添加方法。
2. jquery.extend(object); 为扩展jquery类本身.为类添加新的方法，可以理解为添加静态方法。

这两个方法都接受一个参数，类型为Object，Object对应的"名/值对"分别代表"函数或方法体/函数主体"

```
/**
 * 字节单位转换
 * bytesToSize(1024B,1024,2) ==> 1.00KB
 * megaBytesToSize(10,1024,1) ==> 10.0MB
 * gbytesToSize(2,1024,3) ==> 2.000GB
 */

(function($){
    $.extend({
        bytesToSize:function(bytes, Base, Decimal) {
            if (bytes === 0) return '0 B';
            var k = Base && Base != 1024 ? Base : 1024, // or 1000
                d = Decimal && Decimal != 2 ? Decimal : 2,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            if (i < 0) {
                i = 0;
            }
            return (bytes / Math.pow(k, i)).toFixed(d) + ' ' + sizes[i];
        },
        megaBytesToSize: function(bytes, Base, Decimal) {
            if (bytes === 0) return '0 MB';
            var k = Base && Base != 1024 ? Base : 1024, // or 1000
                d = Decimal && Decimal != 2 ? Decimal : 2,
                sizes = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return (bytes / Math.pow(k, i)).toFixed(d) + ' ' + sizes[i];
        },
        gbytesToSize: function(bytes, Base, Decimal) {
            if (bytes === 0) return '0 GB';
            var k = Base && Base != 1024 ? Base : 1024, // or 1000
                d = Decimal && Decimal != 2 ? Decimal : 2,
                sizes = ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
        }
    });
})(jQuery);
```