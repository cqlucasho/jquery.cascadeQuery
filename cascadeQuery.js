/*
 * 二级级联查询
 * 提交参数必须验证，保证安全。
 * 
 * @author: lucasho
 * @update: 2014-12-9
 * @email: cqlucasho@gmail.com
 * @link: www.lucasho.cn.vc
 */
(function ($) {
	var HtmlRender = function () {
		var $that = this;

		this.init = function ($data, $opts) {
			$that.data = $data;
			$that.opts = $opts;
		};

		// 例子：填充区域
		this.areaLinkQuery = function () {
			var html = '<option>' + $that.opts.title + '</option>';
			$.each($that.data, function (index, town) {
				html += '<option value="' + town.TownID + '">' + town.TownName + '</option>';
			});

			$that.opts.fill.empty().append(html);
		};
	};

	$(document).ready(function () {
		$.HtmlRenderObj = new HtmlRender();
	});
})(window.jQuery);

(function ($) {
	$.fn.cascadeQuery = function ($options) {
		var opts = $.extend({}, $.fn.cascadeQuery.defaults, $options);

		$(this).on('click change', function (event) {
			// 判断是否是下拉元素，并且值为空或是点击事件, 为真则清空填充元素内容返回。
			if (($(this)[0].nodeName == 'SELECT') && (($(this).val() == '') || event.type == 'click')) {
				opts.fill.empty();
				return false;
			}

			if (opts.data !== null) {
				// 将数组处理成JSON格式
				var values = Json(opts.data);

				if (!opts.crossDomain) {
					$.ajax({
						type: opts.submitMethod,
						url: opts.url,
						data: JSON.parse(values),
						success: function (data) {
							if (opts.fill != '') {
								$.HtmlRenderObj.init(data, opts);
								eval(opts.method);
							}
						}
					});
				}
				else {
					$.getJSON(opts.url, JSON.parse(values), function (data) {
						if (opts.fill != '') {
							$.HtmlRenderObj.init(data, opts);
							eval(opts.method);
						}
					});
				}
			}
			else {
				return false;
			}
		});
	}
	
	// 处理成json格式
	var Json = function ($values) {
		var values = '{';
		$.each($values, function (index, dataValue) {
			if (index > 0) values += ',';

			if ($.isNumeric(dataValue)) {
				values += '"id":' + dataValue;
			}
			else {
				var arr = dataValue.split(':');
				var arrValue = eval(arr[1]);
				if (arrValue != '') {
					values += '"' + arr[0] + '"' + ':' + arrValue;
				}
			}
		});
		values += '}';

		if (values == '{}') return false; else return values;
	}

	$.fn.cascadeQuery.defaults = {
		// 需要填充的元素
		fill: '',
		// 指定提交类型
		submitMethod: 'GET',
		// 提交地址
		url: '',
		// 提交数据
		data: null,
		// 指定htmlRender的调用方法
		method: '',
		// 附加数据, 此数据不作为参数提交
		extra: '',
		// 是否跨域请求
		crossDomain: false
	};
})(window.jQuery);
