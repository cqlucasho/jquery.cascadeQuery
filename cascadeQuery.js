(function ($) {
	var HtmlRespones = function ($data, $opts) {
		this.data = $data;
		this.opts = $opts;

		// 城市区县联级查询
		this.areaLinkQuery = function () {
			var obj = eval('(' + this.data + ')');
			var html = '<option>' + this.opts.title + '</option>';
			$.each(obj, function (index, town) {
				html += '<option value="' + town.TownID + '">' + town.TownName + '</option>';
			});

			this.opts.fillEle.empty().append(html);
		}
	}

	$.fn.cityTownQuery = function ($options) {
		var opts = $.extend({}, $.fn.cityTownQuery.defaults, $options);
		var values = '{';

		if (!opts.crossDomain) {
			$(this).change(function () {
				if (opts.postData !== null) {
					$.each(opts.postData, function (index, dataValue) {
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

					$.post(opts.postUrl, JSON.parse(values), function (data) {
						var html = new HtmlRespones(data, opts);
						html.areaLinkQuery();
					});
				}
				else {
					alert("postData is null");
				}
			});
		}
		else {
			$(this).change(function () {
				var id = $(this).val();

				$.getJSON(opts.postUrl, { id: id }, function (data) {
					var obj = eval('(' + data + ')');
					var html = '<option>' + opts.title + '</option>';
					$.each(obj, function (index, town) {
						html += '<option value="' + town.TownID + '">' + town.TownName + '</option>';
					});

					$(opts.fillEle).empty().append(html);
				});
			});
		}
	};

	$.fn.cityTownQuery.defaults = {
		// 需要填充的元素位置
		fillEle: '',
		// 提交地址
		postUrl: '',
		// 提交数据
		postData: null,
		// 标题
		title: '',
		// 是否跨域请求
		crossDomain: false
	};
})(window.jQuery);