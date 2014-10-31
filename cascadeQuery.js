(function ($) {
	var HtmlRender = function ($data, $opts) {
		this.data = $data;
		this.opts = $opts;

		// 例如：城市区县级联查询
		this.areaLinkQuery = function () {
			// eval转换视情况而定，返回的是字符串JSON格式才需要转换。
			var obj = eval('(' + this.data + ')');
			
			var html = '<option>' + this.opts.title + '</option>';
			$.each(obj, function (index, town) {
				html += '<option value="' + town.TownID + '">' + town.TownName + '</option>';
			});

			this.opts.fill.empty().append(html);
		}
		
		// 添加其它方法
		this.xxx = function() {}
	}

	$.fn.cascadeQuery = function ($options) {
		var opts = $.extend({}, $.fn.cascadeQuery.defaults, $options);
		var values = '{';
		
		// Change事件触发
		$(this).change(function () {
			if (opts.data !== null) {
				$.each(opts.data, function (index, dataValue) {
					if (index > 0) values += ',';

					if ($.isNumeric(dataValue)) {
						values += '"id":' + dataValue;
					}
					else {
						var arr = dataValue.split(':');
						values += '"' + arr[0] + '"' + ':' + eval(arr[1]);
					}
				});
				values += '}';
				
				if (!opts.crossDomain) {
					$.post(opts.url, JSON.parse(values), function (data) {
						var html = new HtmlRender(data, opts);
						html.调用方法;
					});
				}
				else {
					$.getJSON(opts.url, JSON.parse(values), function (data) {
						var html = new HtmlRender(data, opts);
						html.调用方法;
					});
				}
			}
			else {
				alert("post data is null");
			}
		});

		$.fn.cascadeQuery.defaults = {
			// 需要填充的元素位置
			fill: '',
			// 提交地址
			url: '',
			// 提交数据
			data: null,
			// 标题
			title: '',
			// 是否跨域请求
			crossDomain: false
		};
})(window.jQuery);
