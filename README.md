jquery.cascadeQuery
===================

二级级联动态查询(不支持更多级)

调用插件：
(function ($) {
	$(document).ready(function () {
		$("#CityID").cascadeQuery({
		  // 需要填充的元素
			fillEle: $("#TownID"),
			// url提交地址
			postUrl: "/post",
			// 提交数据以数组形式，假设以$('#CityID').val()获取值作为id的值
			postData: new Array("id:$('#CityID').val()"),
			title: "xx"
		});
	});
})(window.jQuery);
