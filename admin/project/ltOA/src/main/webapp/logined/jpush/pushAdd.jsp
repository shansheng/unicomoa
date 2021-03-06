<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	ServletContext context = org.apache.struts2.ServletActionContext.getServletContext();
	String photoPath = context.getInitParameter("downPath");
%>
<jsp:include page="../../common/taglibs.jsp" />
<%@ taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>手机推送</title>
<link rel="shortcut icon" href="${ctx }images/favicon.ico" type="image/x-icon" />
<jsp:include page="../../common/head.jsp" />
<script type="text/javascript">
	var basePath = "${ctx}";
	var downPath = "<%=photoPath%>";
	window.UEDITOR_HOME_URL = basePath+"plugins/ueditor/";
</script>
<script type="text/javascript" src="${ctx}/js/user/selectuser.js"></script>
<script type="text/javascript" src="${ctx}/js/logined/jpush/pushAdd.js?v=${jsversion}"></script>
<script type="text/javascript" src="${ctx}/plugins/ueditor/editor_config.js?version=${jsversion}"></script>
<script type="text/javascript" src="${ctx}/plugins/ueditor/editor_all.js?version=${jsversion}"></script>
<script type="text/javascript" src="${ctx}/plugins/ueditor/lang/zh-cn/zh-cn.js?version=${jsversion}"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/plugins/ueditor/themes/default/css/ueditor.css?version=${jsversion}" />
</head>
<body>
	<input type="hidden" id="userIds" value=""/>

	<div class="input_new">
		<table border="0" cellspacing="0" cellpadding="0" class="listTitle">
	        <tbody><tr>
	            <td class="left"></td><td class="center">新增推送活动</td><td class="right"></td>
	        </tr>
	        </tbody>
	    </table>
		<table width="100%" cellspacing="0" cellpadding="0" border="0"
			class="inputTable">
			<tbody>
				<tr>
					<th>主题：</th>
					<td><input type="text" class="formText"  maxlength="20"  id="subject" />
					</td>
				</tr>
				<tr>
					<th>内容：</th>
					<td><textarea style="float:left; width:81%;" class="formTextarea" name="content"  id="myEditor"></textarea>
					</td>
				</tr>
				<tr>
					<th>发布范围：</th>
					<td><textarea class="readOnlyText"
							style="width:80%;" readonly="readonly" id="userNames"></textarea>
						 <span class="addMember">
							<a href="javascript:void(0)" class="icon_add" id="addPushUsers">选择</a><a href="#"
								class="icon_clear" id="clearPushUsers">清空</a>
						</span>
						
					</td>
				</tr>
			</tbody>
		</table>
		<div class="buttonArea">
			<input type="button" value="发 布" class="formButton_green"  id="addPush"/> <input
				type="button" value="返 回" class="formButton_grey"  id="removePush"/>
		</div>
	</div>
</body>
</html>
