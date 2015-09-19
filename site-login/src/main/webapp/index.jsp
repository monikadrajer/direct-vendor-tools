<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<title>Developer Provided Testing Services</title>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap-theme.css" />
<link rel="stylesheet" href="css/custom.css" />
<link rel="stylesheet" href="css/jquery.fileupload.css" />
<link rel="stylesheet" href="css/parsley.css" />
<link type="text/css" href="css/ui.jqgrid-bootstrap.css" rel="stylesheet" media="screen"/>

<!-- <link rel="stylesheet" href="css/jquery.fileupload-noscript.css" /> -->

<script type="text/javascript" src="vendor/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="js/jqGrid/i18n/grid.locale-en.js" type="text/javascript"></script>
<script src="js/jqGrid/jquery.jqGrid.js" type="text/javascript"></script>
<script src="js/json2.js" type="text/javascript"></script>
<script src="js/jquery.dateFormat.js" type="text/javascript"></script>
<script src="js/vendor/jquery.ui.widget.js"></script>
<script src="js/jquery.iframe-transport.js"></script>
<script src="js/jquery.fileupload.js" type="text/javascript"></script>
<script src="js/jquery.filestyle.js" type="text/javascript"></script>
<script src="js/parsley.js" type="text/javascript"></script>
<script>
	var APP_URL = window.location.protocol + "//"  + window.location.host + "" + window.location.pathname;
	var APP_CONTEXT = "${pageContext.request.contextPath}/";
</script>

<script type="text/javascript" src="js/pagesjs/AccountRegister.js"></script>
<script type="text/javascript" src="js/to/AccountRegisterTO.js"></script>
<script type="text/javascript" src="js/pagesjs/RegisterService.js"></script>
<script type="text/javascript" src="js/to/RegisterServiceTO.js"></script>
<script type="text/javascript" src="js/pagesjs/Login.js"></script>
<script type="text/javascript" src="js/to/UserLoginTO.js"></script>
<script type="text/javascript" src="js/util/Constants.js"></script>
<script type="text/javascript" src="js/util/Utility.js"></script>
<script type="text/javascript" src="js/util/HttpAjaxServices.js"></script>
<script type="text/javascript" src="js/to/Model.js"></script>

<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<script>

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-40163006-1', 'sitenv.org');
	  ga('send', 'pageview');

  
  		$(function(){
  			
  			var myParam = location.search.split('activateAccount=')[1];
  			if(undefined != myParam)
  			{
  				var callbackFunction = $.Callbacks('once');
  				callbackFunction.add(accountActivationSuccessHandler);
  				var httpService = new HttpAjaxServices();
  				httpService.activateAccount(myParam, callbackFunction, false);
  				return;
  			}
  			
  			$('#accountActivateModel').on('hidden.bs.modal', function () {
  			  	sessionStorage.activateAccount = false;
  			});
  			
  			if(sessionStorage.activateAccount)
  			{
  				if(sessionStorage.activateAccount == 'true')
  	  			{
  	  				$("#accountActivateModel").modal('show');	
  	  				setRegisterServicePage();
  	  			}	
  			} 
  				
  			
  			window.ParsleyValidator.addValidator('currentdateval',function(value,requirement){
  	    		var now = new Date((new Date()).setHours(0, 0, 0, 0));
  	            var date = new Date(value);
  	          	var givenDate = new Date(date.getTime() + date.getTimezoneOffset()*60000);
  	            return givenDate >= now;
  			},32).addMessage('en','currentdateval','This field should be greater than or equal to current date');
  			
  			
  			window.ParsleyValidator.addValidator('notequal',function(value,requirement){
  				return value != $( requirement ).val();
  			},32).addMessage('en','notequal','Direct Email Adress and Point Of Contact Email should not be same.');
  			
  			window.ParsleyValidator.addValidator('pwdnotequal',function(value,requirement){
  				return value != $( requirement ).val();
  			},32).addMessage('en','pwdnotequal','New password and current password should not be same.');
  			
  			window.ParsleyValidator.addValidator('pwdpattern',function(value,requirement){
  				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W]).+$/.test(value);
  			},32).addMessage('en','pwdpattern','Password should be atleast 8 characters and must contain an Uppercase letter, Lowercase letter, digit and special character');
  			
  			window.ParsleyValidator.addValidator('daterangeval',function(value,requirement){
  				var requirementVal = $( requirement ).val();
  				if(requirementVal !=null && requirementVal!='')
  				{
  					var date = new Date(value);
  	            	var date1 = new Date($( requirement ).val());
  	            	var toDate = new Date(date.getTime() + date.getTimezoneOffset()*60000);
  	            	var fromDate = new Date(date1.getTime() + date1.getTimezoneOffset()*60000);
  	            	return toDate >= fromDate;
  				}else
  				{
  				    return true;	
  				}
  			},32).addMessage('en','daterangeval','Available To Date should be greater than or equal to Available From Date.');
  			
  			window.ParsleyValidator.addValidator('fromdaterangeval',function(value,requirement){
  				var requirementVal = $( requirement ).val();
  				if(requirementVal !=null && requirementVal!='')
  				{
  	    			var date = new Date(value);
  	            	var date1 = new Date($( requirement ).val());
  	            	var toDate = new Date(date1.getTime() + date.getTimezoneOffset()*60000);
  	            	var fromDate = new Date(date.getTime() + date1.getTimezoneOffset()*60000);
  	            	return toDate >= fromDate;
  				}else
  				{
  				   return true;	
  				}
  			},32).addMessage('en','fromdaterangeval','Available From Date should be lesser than or equal to Available To Date.');
  			
  			window.ParsleyValidator.addValidator('trustfiletypes',function(value){
  				var ext=value.split('.').pop().toLowerCase();
  				
  				var istrue = false;
  				if  (ext === 'cer'){
  					istrue = true;
  				} else if (ext === 'crt') {
  					istrue = true;
  				} else if (ext === 'der') {
  					istrue = true;
  				} else if (ext === 'pem') {
  					istrue = true;
  				} else if (ext === 'cert') {
  					istrue = true;
  				}
  				
  				return istrue;
  			},32).addMessage('en','trustfiletypes','The selected certificate file must be a binary or Base64 encoded file (.cer, .crt, .der, or .pem).');
  			
  			// parsley Validator to validate the file size
  			window.ParsleyValidator.addValidator('anchormaxsize',function(value,requirement){
  				var file_size=$('#anchoruploadfile')[0].files[0];
  				return file_size.size < requirement*1024*1024;
  			},32).addMessage('en','anchormaxsize','The uploaded file size exceeds the maximum file size of 3 MB.');
  			
  			loadHeaderPage();
  			if(typeof sessionStorage.userLoggedIn === 'undefined')
  			{
  			   sessionStorage.userLoggedIn = 0;	
  			}
  			if(sessionStorage.userLoggedIn == 1)
  			{
  			   $("#logoutId").show();
  	  		   $("#rightNavbarID").hide();
  	  		   $("#resetPwdLIId").hide();
  	  		   UTILITY.populateName('nameId');
  			   if(sessionStorage.currentPage == 1)
  			   {
  				  setInteroperabilityServicesPage();
  			   }else if (sessionStorage.currentPage == 2)
  				{
  				   setRegisterServicePage();
  				}
  			}else if(sessionStorage.activateAccount)
  			{
  				if(sessionStorage.activateAccount == 'false')
  	  			{
  					setInteroperabilityServicesPage();
  	  			}	
  			}else
  			{
  				setInteroperabilityServicesPage();
  			}
  		  	 
  			
  			$('#contactUs').click(function(){
  			    $(location).attr('href', 'mailto:admin@sitenv.org');
  			});
  		});
  		
  		
  		function accountActivationSuccessHandler(successJson){
  			if(successJson)
  			{
  				window.location.href = APP_CONTEXT;
  				sessionStorage.activateAccount = true;
  				return;
  			}
  		}
  		
  		function setRegisterServicePage(){
  			sessionStorage.currentPage = 2;
  			if(sessionStorage.userLoggedIn == 0)
  			{
  				$("#rightNavbarID").show();
  			}
			$.get('pages/RegisterService.html',setRegisterServicePageContent);
  		}
  		
  		function setRegisterServicePageContent(data){
  			$('ul.navbar-nav li').removeClass('active');
  			$("#vendorRegLIId").addClass('active');
			$("#mainPageContent").html(data);
  		}
  		
  		function setInteroperabilityServicesPage(){
  			sessionStorage.currentPage = 1;	
  			if(sessionStorage.userLoggedIn == 0)
  			{
  				$("#rightNavbarID").hide();
  			}
  		
			$.get('pages/InteroperabilityServices.html',setInteroperabilityServicesPageContent);
  		}
  		
  		function setInteroperabilityServicesPageContent(data){

  			$('ul.navbar-nav li').removeClass('active');
  			$("#interopLIId").addClass('active');
			$("#mainPageContent").html(data);
  		}
  		
  		function openResetPasswordPage(){
  			$.get('pages/ResetPassword.html',showResetPasswordPage);
  		}
  		function showResetPasswordPage(data){
  			$("#resetPwdModel").html(data);
  			$("#resetPwdModel").modal('show');
  		}  		
  		
  		
  		function loadHeaderPage()
  		{
  			$.get('pages/Header.html',loadHeaderPageContent);
  		}
  		
  		function loadHeaderPageContent(data)
  		{
  			$("#headerId").html(data);
  		}
  		
  		function onlogout(){
  			$("#logoutId").hide();
  			$("#rightNavbarID").show();
  			sessionStorage.userLoggedIn = 0;
  			sessionStorage.authToken = '';
  			sessionStorage.username = '';
  			sessionStorage.companyName = '';
  			sessionStorage.firstName = '';
  			sessionStorage.lastName = '';
  			$("#resetPwdLIId").show();
  			setRegisterServicePage();
  		}
  		
  		function openEditProfilePage(){
  			$.get('pages/EditProfile.html',showEditProfilePage);
  		}
  		function showEditProfilePage(data){
  			$("#editProfileModel").html(data);
  			$("#editProfileModel").modal('show');
  		}
  		
  		function openChangePwdPage(){
  			$.get('pages/ChangePassword.html',showChangePwdPage);
  		}
  		function showChangePwdPage(data){
  			$("#changePwdModel").html(data);
  			$("#changePwdModel").modal('show');
  		}
 
	</script>
</head>

<body>
	<header id="headerId">
	</header>
	<nav class="navbar navbar-default navbar-static-top"
		style="margin-bottom: 0px;">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#navbar" aria-expanded="true" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>
			<div id="navbar" class="navbar-collapse collapse in"
				aria-expanded="true">
				<ul class="nav navbar-nav">
				<li>
						<a href="http://sitenv.org/" style="text-decoration: none;">Home</a></li>
				<li id="interopLIId"><a href="javascript:setInteroperabilityServicesPage()" style="text-decoration: none;" >Testing Services</a></li>
				<li id="vendorRegLIId"><a href="javascript:setRegisterServicePage()" style="text-decoration: none;" >Developer Registration</a></li>
				<li id="resetPwdLIId"><a href="javascript:openResetPasswordPage()" style="text-decoration: none;" >Reset Password</a></li>
					
					
					
				</ul>
				
				<ul class="nav navbar-nav navbar-right" id="rightNavbarID">
					<!-- <li id="signupID"><a href="javascript:openSignUpPage()" style="text-decoration: none;" >Sign Up </a></li>
					<li id="loginID"><a href="javascript:openLoginPage()" style="text-decoration: none;" >Login</a></li> -->
				</ul>
				
				<ul class="nav navbar-nav navbar-right" id="logoutId" hidden="true">
					<li><div id="nameId" style="padding-top: 15px;font-weight: normal;"></div></li>
					<li>
          				<a href="#"  class="dropdown-toggle" data-toggle="dropdown" style="text-decoration: none;">Actions <span class="caret"></span></a>
          				<ul class="dropdown-menu">
            				<li><a href="javascript:openEditProfilePage()" style="text-decoration: none;">Edit Profile</a></li>
            				<li><a href="javascript:openChangePwdPage()" style="text-decoration: none;">Change Password</a></li>
          				</ul>
        			</li>
					<li id="logoutLI"><a href="javascript:onlogout()" style="text-decoration: none;" >Logout</a></li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</nav>
	<div id="mainPageContent" aria-live="assertive"></div>
	<footer class="panel-footer" style="padding-bottom: 0px;">
		<div class="container" role="contentinfo">
			<div class="row">
				<div>
					<p>
						This project was funded by a contract from the <a
							href="http://www.healthit.gov" >Office of the
							National Coordinator for Health Information Technology (ONC)</a>
					</p>
					<p>
						<a href="http://www.hhs.gov/Privacy.html" >Privacy
							Policy</a> | <a href="http://www.hhs.gov/Disclaimer.html" 
							>Disclaimer</a> | <a href="javascript:;" id="contactUs" 
							>Contact US </a>
					</p>
				</div>
			</div>
		</div>
	</footer>

	<div id="editProfileModel" class="modal fade" tabindex="-1"></div>
	
	<div id="changePwdModel" class="modal fade" tabindex="-1"></div>
	
	<div id="resetPwdModel" class="modal fade" tabindex="-1"></div>
	
	<div id="accountActivateModel" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h2 class="modal-title">Account Activation</h2>
			</div>
			<div class="modal-body">
				<div class="alert alert-success alert-dismissible" role="alert"
					 style="padding: 11px;" style="margin-bottom:30px;">
					Your account has been activated successfully, please login by using Login button.
				</div>		
			</div>
			<div class="modal-footer" style="margin-top: 0px;">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>
