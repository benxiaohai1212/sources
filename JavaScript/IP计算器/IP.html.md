Html代码如下：
```
<form>
    <div class="NetWork-main01 bor-a1s"><h3 class="MainHead bb-blue" style="margin-top: 0px; height: 34px;">网络和IP地址计算器</h3>
        <div class="MainCent">
            <div class="MCentlist clearfix ptb10 bb-blue bg-blue02 ipgroup">
            	<label class="w60 tr">输入IP</label> 
            	<input type="text" n="ip1" name="ip_1" value="192" maxlength="15" size="3" class="Intxt">
            	<input type="text" n="ip2" name="ip_2" value="168" maxlength="15" size="3" class="Intxt"> 
            	<input type="text" n="ip3" name="ip_3" value="0" maxlength="15" size="3" class="Intxt"> 
            	<input type="text" n="ip4" name="ip_4" value="1" maxlength="15" size="3" class="Intxt"> 
            	<label class="w50 tr">掩码位</label> 
            	<input type="text" name="bits" value="24" size="2" class="Intxt"> 
            	<input type="button" onclick="calNBFL(this.form)" value="计算" class="Inbtn"> <input type="button" onclick="resetform4(this.form)" value="清空" class="Inbtn">
            </div>
            <div class="MCentlist clearfix pt10">
            	<label class="w60 tr">可用IP</label> 
            	<input type="text" name="numofaddr" size="10" readonly="" class="Intxt">
            </div>
            <div class="MCentlist clearfix pt10">
            	<label class="w60 tr">掩码</label> 
            	<input type="text" name="snm_1" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="snm_2" size="3" maxlength="3" readonly="" class="Intxt">
            	<input type="text" name="snm_3" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="snm_4" size="3" maxlength="3" readonly="" class="Intxt">
            </div>
            <div class="MCentlist clearfix pt10">
            	<label class="w60 tr">网络</label> 
            	<input type="text" name="nwadr_1" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="nwadr_2" size="3" maxlength="3" readonly="" class="Intxt">
            	<input type="text" name="nwadr_3" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="nwadr_4" size="3" maxlength="3" readonly="" class="Intxt">
            </div>
            <div class="MCentlist clearfix pt10">
            	<label class="w60 tr">第一可用</label> 
            	<input type="text" name="firstadr_1" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="firstadr_2" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="firstadr_3" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="firstadr_4" size="3" maxlength="3" readonly="" class="Intxt">
            </div>
            <div class="MCentlist clearfix pt10">
            	<label class="w60 tr">最后可用</label> 
            	<input type="text" name="lastadr_1" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="lastadr_2" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="lastadr_3" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="lastadr_4" size="3" maxlength="3" readonly="" class="Intxt">
            </div>
            <div class="MCentlist clearfix pt10">
            	<label class="w60 tr">广播</label> 
            	<input type="text" name="bcast_1" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="bcast_2" size="3" maxlength="3" readonly="" class="Intxt">
            	<input type="text" name="bcast_3" size="3" maxlength="3" readonly="" class="Intxt"> 
            	<input type="text" name="bcast_4" size="3" maxlength="3" readonly="" class="Intxt">
            </div>
            <div class="MCentlist ptb10 col-gray04 bor-t1s mt10">
            	<p>显示网络，广播，第一次和最后一个给定的网络地址</p>
            	<p>在网络掩码“位格式”也被称为CIDR格式（CIDR=无类别域间路由选择）。</p>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript" src="ipcalc-demo.js"></script>
```