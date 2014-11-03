(function ($) {
	var HtmlRender = function () {
		var $that = this;
		
		// 初始化数据
		this.init = function ($data, $opts) {
			$that.data = $data;
			$that.opts = $opts;
		};
		
		// 例如：城市区县级联查询
		this.areaLinkQuery = function () {
			// eval转换视情况而定，返回的是字符串JSON格式才需要转换。
			var obj = eval('(' + $that.data + ')');
			
			var html = '<option>' + $that.opts.title + '</option>';
			$.each(obj, function (index, town) {
				html += '<option value="' + town.TownID + '">' + town.TownName + '</option>';
			});

			$that.opts.fill.empty().append(html);
		}
		
		// 添加其它方法
		this.xxx = function() {}
	};

	$(document).ready(function () {
		$.HtmlRenderObj = new HtmlRender();
	});
})(window.jQuery);

(function ($) {
	$.fn.cascadeQuery = function ($options) {
		var opts = $.extend({}, $.fn.cascadeQuery.defaults, $options);
		
		// Change事件触发
		$(this).change(function () {
			if (opts.data !== null) {
				var values = '{';
				
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
						$.HtmlRenderObj.init(data, opts);
						eval(opts.method);
					});
				}
				else {
					$.getJSON(opts.url, JSON.parse(values), function (data) {
						$.HtmlRenderObj.init(data, opts);
						eval(opts.method);
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
			// 指定htmlRender的调用方法
			method: '',
			// 标题
			title: '',
			// 是否跨域请求
			crossDomain: false
		};
	};
})(window.jQuery);
