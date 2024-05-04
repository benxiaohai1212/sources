sort方法接收一个函数作为参数，这里嵌套一层函数用来接收对象属性名，其他部分代码与正常使用sort方法相同
```
var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];

function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
console.log(arr.sort(compare('age')))
```