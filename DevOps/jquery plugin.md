### jquery抖动效果插件
```js
    jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
        this.each(function () {
            var jqNode = $(this);
            jqNode.css({ position: 'postion' });
            for (var x = 1; x <= intShakes; x++) {
                jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
                    .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
                    .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
            }
        });
        return this;
    }
```
应用
```html
<script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.js"></script>
<script src="~/Scripts/shakeYou.js"></script>
<body>
<div style="height:100px;width:300px;">
<span id="btn1">我会抖动</span>
</div>
</body>
<script>
    $(function () {
        $('#btn1').click(function () {
            $(this).shake(2, 10, 400);
        });
    });
</script>
```
