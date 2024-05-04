```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>select2 demo</title>
	<link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
	<link href="https://cdn.bootcss.com/select2/4.0.3/css/select2.css" rel="stylesheet">
	<script src="https://cdn.bootcss.com/jquery/2.2.4/jquery.js"></script>
	<script src="https://cdn.bootcss.com/select2/4.0.3/js/select2.js"></script>
	<script src="https://cdn.bootcss.com/select2/4.0.3/js/i18n/zh-CN.js"></script>
	<style type="text/css">
		.pre-scrollable {
			margin: 10px 0;
		}
		.select2-container .select2-selection--single {
			height: 32px;
		}
		.select2-container--default .select2-selection--single .select2-selection__rendered {
			line-height: 30px;
		}
		.select2-container--default .select2-selection--single .select2-selection__arrow {
			height: 30px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="panel">
					<div class="panel-body">
						<pre class="pre-scrollable">
	&ltscript type="text/javascript"&gt
		var data = [
			{ id: 0, text: 'enhancement' },
			{ id: 1, text: 'bug' }, 
			{ id: 2, text: 'duplicate' }, 
			{ id: 3, text: 'invalid' }, 
			{ id: 4, text: 'wontfix' }
			];
	&lt/script&gt
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel">
					<div class="panel-title"><h2>demo1</h2></div>
					<div class="panel-body">
						<select name="demo1" id="demo1">
							<option value="">请选择</option>
							<option value="0">enhancement</option>
							<option value="1">bug</option>
							<option value="2">duplicate</option>
							<option value="3">invalid</option>
							<option value="4">wontfix</option>
						</select>
						<span id="demo1-text"></span>
						<pre class="pre-scrollable">
&ltscript type="text/javascript"&gt
	$("#demo1").select2().on('change/click',function(argument) {
		$("#demo1-text").text($(this).val() + " - " + $(this).find(":selected").text());
	});
&lt/script&gt
						</pre>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel">
					<div class="panel-title"><h2>demo2</h2></div>
					<div class="panel-body">
						<select name="demo2" id="demo2">
							<option value="">请选择</option>
							<option value="enhancement">enhancement</option>
							<option value="bug">bug</option>
							<option value="duplicate">duplicate</option>
							<option value="invalid">invalid</option>
							<option value="wontfix">wontfix</option>
						</select>
						<pre class="pre-scrollable">
&ltscript type="text/javascript"&gt
	$("#demo2").select2().val(2).trigger("change");
&lt/script&gt
						</pre>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="panel">
					<div class="panel-title"><h2>demo3</h2> multiple</div>
					<div class="panel-body">
						<select name="demo3" id="demo3" multiple="multiple"></select>
						<pre class="pre-scrollable">
&ltscript type="text/javascript"&gt
	$("#demo3").select2({
		tags: true,
		allowClear:true,
		data: data
	});
&lt/script&gt
						</pre>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel">
					<div class="panel-title"><h2>demo4</h2> multiple</div>
					<div class="panel-body">
						<select name="demo4" id="demo4" multiple="multiple"></select>
						<pre class="pre-scrollable">
&ltscript type="text/javascript"&gt
	$("#demo4").select2({
		tags: true,
		data: data
	}).val(['2','4']).trigger('change');
&lt/script&gt
						</pre>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$('select').attr('style','width:300px');
		var data = [
					{ id: 0, text: 'enhancement'},
					{ id: 1, text: 'bug' }, 
					{ id: 2, text: 'duplicate' }, 
					{ id: 3, text: 'invalid' }, 
					{ id: 4, text: 'wontfix' }
					];
		$("#demo1").select2().on('change',function(e) {
			$("#demo1-text").text($(this).val() + " - " + $('#demo1 option:selected').text() + " - " + $(this).find(":selected").text());
		});
		$("#demo2").select2().val('duplicate').trigger("change");
		$("#demo3").select2({
			tags: true,
			allowClear:true,
			data: data
		});
		$("#demo4").select2({
			tags: true,
			data: data
		}).val(['2','4']).trigger('change');
	</script>
</body>
</html>
```
