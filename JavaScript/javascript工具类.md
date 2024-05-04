```
/**
 * 使用patern格式化货币
 * formatCurrency(22,{"pattern":"$%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false})
 * format: {
    "pattern":"$%s",
    "precision":2,
    "requiredPrecision":2,
    "decimalSymbol":".",
    "groupSymbol":",",
    "groupLength":3,
    "integerRequired":false
  }
 * formatCurrency(2222,{"pattern":"￥%s"}) = ￥2,222.00
 * formatCurrency(2222,{"pattern":"$%s"}) = $2,222.00
 * formatCurrency(22.22,{"pattern":"%s%"}) = 22.22%
 */
function formatCurrency(price, format, showPlus) {
    var precision = isNaN(format.precision = Math.abs(format.precision)) ? 2 : format.precision;
    var requiredPrecision = isNaN(format.requiredPrecision = Math.abs(format.requiredPrecision)) ? 2 : format.requiredPrecision;

    precision = requiredPrecision;

    var integerRequired = isNaN(format.integerRequired = Math.abs(format.integerRequired)) ? 1 : format.integerRequired;

    var decimalSymbol = format.decimalSymbol == undefined ? '.' : format.decimalSymbol;
    var groupSymbol = format.groupSymbol == undefined ? ',' : format.groupSymbol;
    var groupLength = format.groupLength == undefined ? 3 : format.groupLength;

    var s = '';

    if (showPlus == undefined || showPlus == true) {
        s = price < 0 ? '-' :  showPlus ? '+' : '';
    } else if (showPlus == false) {
        s = '';
    }

    var i = parseInt(price = Math.abs(+price || 0).toFixed(precision)) + '';
    var pad = i.length < integerRequired ? integerRequired - i.length : 0;

    while (pad) {
        i = '0' + i; pad--;
    }
    j = (j = i.length) > groupLength ? j % groupLength : 0;
    re = new RegExp('(\\d{' + groupLength + '})(?=\\d)', 'g');

    /**
     * replace(/-/, 0) is only for fixing Safari bug which appears
     * when Math.abs(0).toFixed() executed on "0" number.
     * Result is "0.-0" :(
     */
    var r = (j ? i.substr(0, j) + groupSymbol : '') + i.substr(j).replace(re, '$1' + groupSymbol) + (precision ? decimalSymbol + Math.abs(price - i).toFixed(precision).replace(/-/, 0).slice(2) : '');
    var pattern = '';

    if (format.pattern.indexOf('{sign}') == -1) {
        pattern = s + format.pattern;
    } else {
        pattern = format.pattern.replace('{sign}', s);
    }

    return pattern.replace('%s', r).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
```
示例：
```
调用：formatCurrency(22,{"pattern":"$%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false})
输出："$22.00"
调用：formatCurrency(22,{"pattern":"￥%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false})
输出："￥22.00"
调用：formatCurrency(9876543,{"pattern":"￥%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false})
输出："￥9,876,543.00"
调用：formatCurrency(9876543,{"pattern":"￥%s","precision":2,"requiredPrecision":4,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false})
输出："￥9,876,543.0000"
 
调用：formatCurrency(+22,{"pattern":"$%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false})
输出："$22.00"
调用：formatCurrency(+22,{"pattern":"$%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false},true)
输出："+$22.00"
调用：formatCurrency(-22,{"pattern":"$%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false},true)
输出："-$22.00"
调用：formatCurrency('-22',{"pattern":"$%s","precision":2,"requiredPrecision":2,"decimalSymbol":".","groupSymbol":",","groupLength":3,"integerRequired":false},true)
输出："-$22.00"
 
 
//下面的是为了测试给大家观看,需要的参数需要自己调整
调用：formatCurrency(9876543,{"pattern":"￥%s","precision":2,"requiredPrecision":4,"decimalSymbol":"*","groupSymbol":",","groupLength":3,"integerRequired":false})
输出："￥9,876,543*0000"
调用：formatCurrency(9876543,{"pattern":"￥%s","precision":2,"requiredPrecision":4,"decimalSymbol":"*","groupSymbol":"|","groupLength":3,"integerRequired":false})
输出："￥9|876|543*0000"
调用：formatCurrency(9876543,{"pattern":"￥%s","precision":2,"requiredPrecision":4,"decimalSymbol":"*","groupSymbol":"|","groupLength":4,"integerRequired":false})
输出："￥987|6543*0000"
```