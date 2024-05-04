IP计算器，js代码如下：

```js
function h_fillbitsfromleft(num) {
    if (num >= 8) {
        return (255);
    }
    bitpat = 0xff00;
    while (num > 0) {
        bitpat = bitpat >> 1;
        num--;
    }
    return (bitpat & 0xff);
}

function calcNWmask(cform) {
    tmpvar = parseInt(cform.bits.value, 10);
    if (isNaN(tmpvar) || tmpvar > 32 || tmpvar < 0) {
        cform.snm_1.value = '错误';
        cform.snm_2.value = "";
        cform.snm_3.value = "";
        cform.snm_4.value = "";
        return (1);
    }
    cform.snm_1.value = 0;
    cform.snm_2.value = 0;
    cform.snm_3.value = 0;
    cform.snm_4.value = 0;
    if (tmpvar >= 8) {
        cform.snm_1.value = 255;
        tmpvar -= 8;
    } else {
        cform.snm_1.value = h_fillbitsfromleft(tmpvar);
        return (0);
    }
    if (tmpvar >= 8) {
        cform.snm_2.value = 255;
        tmpvar -= 8;
    } else {
        cform.snm_2.value = h_fillbitsfromleft(tmpvar);
        return (0);
    }
    if (tmpvar >= 8) {
        cform.snm_3.value = 255;
        tmpvar -= 8;
    } else {
        cform.snm_3.value = h_fillbitsfromleft(tmpvar);
        return (0);
    }
    cform.snm_4.value = h_fillbitsfromleft(tmpvar);
    return (0);
}

function reset_rest_from4(cform) {
    cform.bcast_1.value = "";
    cform.bcast_2.value = "";
    cform.bcast_3.value = "";
    cform.bcast_4.value = "";
    //
    cform.nwadr_1.value = "";
    cform.nwadr_2.value = "";
    cform.nwadr_3.value = "";
    cform.nwadr_4.value = "";
    //
    cform.firstadr_1.value = "";
    cform.firstadr_2.value = "";
    cform.firstadr_3.value = "";
    cform.firstadr_4.value = "";
    //
    cform.lastadr_1.value = "";
    cform.lastadr_2.value = "";
    cform.lastadr_3.value = "";
    cform.lastadr_4.value = "";
    //
    cform.snm_1.value = "";
    cform.snm_2.value = "";
    cform.snm_3.value = "";
    cform.snm_4.value = "";
    //
    cform.numofaddr.value = "";
}
function resetform4(cform) {
    cform.bits.value = 24;
    cform.ip_1.value = 10;
    cform.ip_2.value = 0;
    cform.ip_3.value = 0;
    cform.ip_4.value = 5;
    //
    reset_rest_from4(cform);
}

function calNBFL(cform) {

    var rt = 0;
    reset_rest_from4(cform);
    tmpvar = parseInt(cform.ip_1.value, 10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0) {
        cform.numofaddr.value = '错误';
        return (1);
    }
    tmpvar = parseInt(cform.ip_2.value, 10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0) {
        cform.numofaddr.value = '错误';
        return (1);
    }
    tmpvar = parseInt(cform.ip_3.value, 10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0) {
        cform.numofaddr.value = '错误';
        return (1);
    }
    tmpvar = parseInt(cform.ip_4.value, 10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar
        < 0) {
        cform.numofaddr.value = '错误';
        return (1);
    }


    rt = calcNWmask(cform);
    console.log(rt)
    if (rt != 0) {
        // error
        return (1);
    }
    tmpvar = parseInt(cform.bits.value, 10);
    if (tmpvar < 0) {
        cform.numofaddr.value = '错误';
        return (1);
    }
    if (tmpvar > 32) {
        cform.numofaddr.value = '错误';
        return (1);
    }
    if (tmpvar == 31) {
        cform.numofaddr.value = "two hosts";
        cform.firstadr_1.value = cform.ip_1.value & cform.snm_1.value;
        cform.firstadr_2.value = cform.ip_2.value & cform.snm_2.value;
        cform.firstadr_3.value = cform.ip_3.value & cform.snm_3.value;
        cform.firstadr_4.value = cform.ip_4.value & cform.snm_4.value;
        //
        cform.lastadr_1.value = cform.ip_1.value | (~cform.snm_1.value & 0xff);
        cform.lastadr_2.value = cform.ip_2.value | (~cform.snm_2.value & 0xff);
        cform.lastadr_3.value = cform.ip_3.value | (~cform.snm_3.value & 0xff);
        cform.lastadr_4.value = cform.ip_4.value | (~cform.snm_4.value & 0xff);
        return (1);
    }
    if (tmpvar == 32) {
        cform.numofaddr.value = "one host";
        cform.firstadr_1.value = cform.ip_1.value;
        cform.firstadr_2.value = cform.ip_2.value;
        cform.firstadr_3.value = cform.ip_3.value;
        cform.firstadr_4.value = cform.ip_4.value;
        return (1);
    }
    cform.numofaddr.value = Math.pow(2, 32 - tmpvar) - 2;
    //
    cform.bcast_1.value = cform.ip_1.value | (~cform.snm_1.value & 0xff);
    cform.bcast_2.value = cform.ip_2.value | (~cform.snm_2.value & 0xff);
    cform.bcast_3.value = cform.ip_3.value | (~cform.snm_3.value & 0xff);
    cform.bcast_4.value = cform.ip_4.value | (~cform.snm_4.value & 0xff);
    //
    cform.nwadr_1.value = cform.ip_1.value & cform.snm_1.value;
    cform.nwadr_2.value = cform.ip_2.value & cform.snm_2.value;
    cform.nwadr_3.value = cform.ip_3.value & cform.snm_3.value;
    cform.nwadr_4.value = cform.ip_4.value & cform.snm_4.value;
    //
    cform.firstadr_1.value = cform.nwadr_1.value;
    cform.firstadr_2.value = cform.nwadr_2.value;
    cform.firstadr_3.value = cform.nwadr_3.value;
    cform.firstadr_4.value = parseInt(cform.nwadr_4.value) + 1;
    //
    cform.lastadr_1.value = cform.bcast_1.value;
    cform.lastadr_2.value = cform.bcast_2.value;
    cform.lastadr_3.value = cform.bcast_3.value;
    cform.lastadr_4.value = parseInt(cform.bcast_4.value) - 1;
    return (0);
}
```