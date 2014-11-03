jquery.cascadeQuery
===================

二级级联动态查询(不支持更多级, 理论上也可以在自己定义的html方法中继续post以达到更多级的支持效果), 支持跨域请求。

安全提示：因为插件里面使用了eval, 所在在后端应做参数判断，以确保程序安全性。

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
			
			// 调用填充方法
			method: "$.HtmlRenderObj.areaLinkQuery()",
			
			title: "xx"
			
		});
		
	});
