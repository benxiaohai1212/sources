以下方法分别已byte，兆，G bytes为基数转换单位

```js
// byte数据单位转换（以B为基底转换）
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024, // or 1000
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
}

// mega byte数据单位转换（以M为基底）
function megabytesToSize(bytes) {
    if (bytes === 0) return '0 MB';
    var k = 1024, // or 1000
        sizes = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(0) + ' ' + sizes[i];
}

// G byte数据单位转换（以G为基底）
function gbytesToSize(bytes) {
    if (bytes === 0) return '0 GB';
    var k = 1024, // or 1000
        sizes = ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(0) + ' ' + sizes[i];
}
```
