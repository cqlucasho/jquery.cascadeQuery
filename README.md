jquery.cascadeQuery
===================

二级级联动态查询(不支持更多级)

调用插件：

	$(document).ready(function () {
	
		$("#xx").cascadeQuery({
		
		  // 需要填充的元素
			fill: $("#TownID"),
			
			// url提交地址
			url: "/post",
			
			// 提交数据以数组形式，假设以$('#xx').val()获取值作为id的值
			data: new Array("id:$('#xxx').val()"),
			
			title: "xx"
			
		});
		
	});
