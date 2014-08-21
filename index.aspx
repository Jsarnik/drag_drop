<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>
<%@ Register Src="~/controls/Navigation.ascx" TagName="globalNav" TagPrefix="ctrl" %>
<%@ Register Src="~/controls/HeadTags.ascx" TagName="meta" TagPrefix="ctrl" %>  
<%@ Register Src="~/controls/Footer.ascx" TagName="footer" TagPrefix="ctrl" %>  

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta name="keywords" content="Justin, Sarnik, Web, Development, c#, mobile, web, forms" />
<meta name="description" content="Justin Sarnik's Official Website />
<ctrl:meta ID="meta" runat="server" PageTitle="Home" />
<link href="/css/DragAndDrop.css" rel="stylesheet" type="text/css" />
<script src="/js/DragAndDrop.js" type="text/javascript"></script>

<style>
a, a:link, a:visited, a:hover{
color:#fff;
}
</style>

<script type="text/javascript">

 
</script>
</head>
<body>
<ctrl:globalNav ID="globalNav" runat="server" PageID="Home" /> 
<div id="mobile_container">
  <div id="mobile-fixed-layer"></div>
  <div id="content_container" class="content_container">

  	<div class="content">
    	<div class="shadow-box" style="text-align:center; color:#000;">
	<br/>
<h3>WELCOME TO JUSTIN SARNIK.COM HOME OF THE WILDCATS<h3>
<br/>
</div>
<br/>
	<div>
        <!--<%=html %>-->
	   <div class="random_img unset" data-href="/Projects/index.aspx?project=Spoilagram"><p><a href="javascriptvoid:(0)">Spoilagram</p></a></div>
       <div class="random_img unset " data-href="/Projects/index.aspx?project=Is%20Greg%20Working"><a href="javascriptvoid:(0)"><p class='multi'>Is Greg Working</p></a></div>
       <div class="random_img unset " data-href="/Projects/index.aspx?project=BuildBoard"><a href="javascriptvoid:(0)"><p>Build Board</p></a></div>
	   <div class="random_img unset " data-href="/Projects/index.aspx?project=Custom%20Date%20Picker"><a href="javascriptvoid:(0)"><p>Date Picker</p></a></div>
	   <div class="random_img unset " data-href="/Projects/index.aspx?project=Custom%20Drop%20Down"><a href="javascriptvoid:(0)"><p>Drop Down</p></a></div>
	   <div class="random_img unset " data-href="/Projects/index.aspx?project=Flip%20Counter"><a href="javascriptvoid:(0)"><p>Counter</p></a></div>
	   <div class="random_img unset " data-href="http://www.linkedin.com/pub/justin-sarnik/56/4a6/342"><a href="javascriptvoid:(0)"><p>Linked In</p></a></div>
	   <div class="random_img unset" data-href="http://github.com/Jsarnik"><a href="javascriptvoid:(0)"><p>GitHub</p></a></div>
	   <div class="random_img unset " data-href="/About.aspx"><a href="javascriptvoid:(0)"><p>About</p></a></div></a>
	   </div>
	</div>
	  <div class="push"></div>	
  </div>    
</div>
  <ctrl:footer ID="footer" runat="server" /> 
</body>
</html>
