```
//jQuery 1.9+ selector pattern,
//To get working with an older version
//Swap first line to $(".ip").bind('keydown',function(e){
//To get working with jQuery versions support .live
//$(".ip").live('keydown',function(e){
$(document).on('keydown',".ip",function(e){
  var code = e.keyCode || e.which;
  var sections = $(this).val().split('.');
  //Only check last section!
  var isInt = ((code >= 48 && code <= 57) || (code >= 96 && code <= 105));
  if(isInt){
      if(sections.length < 4) {
        //We can add another octet
        var val = parseInt(sections[sections.length-1]+String.fromCharCode(code));
        if(val > 255 || parseInt(sections[sections.length-1]) == 0) {
          $(this).val($(this).val()+"."+String.fromCharCode(code));
          return false;
        }
          return true;
      } else {
        //Lets prevent string manipulations, our string is long enough
        var val = parseInt(sections[sections.length-1]+String.fromCharCode(code));
        if(val > 255 || parseInt(sections[sections.length-1]) == 0) {
          return false;
        }
        return true;
      }
    } else if(code == 8 || code == 46 || code == 9 || code == 13) {
      return true;
    }
  return false
});
```

```
//jQuery 1.9+ selector pattern,
//To get working with an older version
//This version supports CIDR notation (eg: 192.168.1.1/16)
//
//Swap first line to $(".ip").bind('keydown',function(e){
//To get working with jQuery versions support .live
//$(".ip").live('keydown',function(e){
$(document).on('keydown',".ips",function(e){
	var code = e.keyCode || e.which;
	var sections = $(this).val().split('.');
	//Only check last section!
	var isInt = ((code >= 48 && code <= 57) || (code >= 96 && code <= 105));
	var hasSlash = $(this).val().indexOf("/") == -1;
	if(isInt) {
		if(hasSlash){
			if(sections.length < 4) {
				//We can add another octet
				var val = parseInt(sections[sections.length-1] + String.fromCharCode(code));
				if(val > 255 || parseInt(sections[sections.length-1]) == 0) {
					$(this).val($(this).val()+"."+String.fromCharCode(code));
					return false;
				}
				return true;
			} else {
				//Lets prevent string manipulations, our string is long enough
				var val = parseInt(sections[sections.length-1] + String.fromCharCode(code));
				if(val > 255 || parseInt(sections[sections.length-1]) == 0) {
					return false;
				}
				return true;
			}
		} else {
			var cidr_split = $(this).val().split('/');
			var target_val = parseInt(cidr_split[1] + String.fromCharCode(code));
			return (target_val < 33 && target_val.toString().length < 3 && parseInt(cidr_split[1]) != 0);
		}
	} else if(code == 191){
		//CIDR Slash
		return ($(this).val().indexOf("/") == -1);
	} else if(code == 8 || code == 46 || code == 9 || code == 13){
		return true;
	}
	return false
});
```

