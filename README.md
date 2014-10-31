jquery.cascadeQuery
===================

二级级联动态查询(不支持更多级)

调用插件：

	$(document).ready(function () {
	
		$("#xx").cascadeQuery({
		
		  // 需要填充的元素
			fill: $("#xxx"),
			
			// url提交地址
			url: "/post",
			
			/** 
			 * 提交数据以数组形式。 数组元素以字符串和数字两种。
			 *
			 * 1. 如果是data: new Array( "id:$('#xxx').val()", "title:$('#xxx').attr('title')" )形式，所得的json格式为{id:xx, title: xx}
			 * 2. 如果是data: new Array(1), 默认格式为{id:1}
			 */
			data: new Array( "id:$('#xxx').val()", "title:$('#xxx').attr('title')" ),
			
			title: "xx"
			
		});
		
	});
