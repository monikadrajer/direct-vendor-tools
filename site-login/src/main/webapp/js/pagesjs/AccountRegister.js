
function AccountRegister()
{
	var currentObject = this;
	
	this.checkUserName = function()
	{
		$('#emailExistAlertID').hide();
		$('#emailRegAlertID').hide();
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.checkUserNameSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.checkUsername($("#emailAddress").val(), callbackFunction, false);
	};
	
	
	this.checkUserNameSuccessHandler = function(successJson)
	{
		if(successJson)
		{
			currentObject.registerAccount();
		}else
		{
			$('#emailExistAlertID').show();
			$("#submitBtn").text("Sign up");
		}
	};
	
	this.loadProfileDetails = function()
	{
		$("#company").val(UTILITY.htmlDecode(sessionStorage.companyName));
		$("#firstName").val(UTILITY.htmlDecode(sessionStorage.firstName));
		$("#lastName").val(UTILITY.htmlDecode(sessionStorage.lastName)); 
	};
	
	this.updateProfile = function()
	{
		var accountRegisterTO = new AccountRegisterTO();
		accountRegisterTO.companyName =  $("#company").val();
		accountRegisterTO.firstName =  $("#firstName").val();
		accountRegisterTO.lastName =  $("#lastName").val();
		accountRegisterTO.username = sessionStorage.username;
		
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.updateProfileSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.updateUserProfile(accountRegisterTO,callbackFunction,false);
	};
	
	this.updateProfileSuccessHandler = function(successJson)
	{
		if(successJson != "")
	    {
			$('#editProfileAlert').show();
			sessionStorage.companyName = UTILITY.htmlDecode(successJson.companyName);
			sessionStorage.firstName = UTILITY.htmlDecode(successJson.firstName);
			sessionStorage.lastName = UTILITY.htmlDecode(successJson.lastName);
			$('#editProfReqID').hide();
			$('#editProfileForm').hide();
			UTILITY.populateName('nameId');
		}
	};
	
	this.validatePassword = function()
	{
		var userLoginTO = new UserLoginTO();
		userLoginTO.username =  sessionStorage.username;
		userLoginTO.password =  $("#currentPassword").val();
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.validatePasswordSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.login(userLoginTO,callbackFunction,false);
	};
	
	this.validatePasswordSuccessHandler = function(successJson)
	{
		if(successJson != "")
	    {
	      currentObject.changePassword();
	    }else
	    {
	    	$("#currPwdAlert").show();
	    }		
	};
	
	this.changePassword = function()
	{
		var userLoginTO = new UserLoginTO();
		userLoginTO.username =  sessionStorage.username;
		userLoginTO.password =  $("#newPwd").val();
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.changePasswordSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.changePassword(userLoginTO,callbackFunction,false);
	};
	
	this.changePasswordSuccessHandler = function(successJson)
	{
		if(sessionStorage.userLoggedIn ==1){
			$('#changePwdAlert').show();
			$('#chgPwdReqID').hide();
			$('#changePwdForm').hide();
			sessionStorage.authToken = successJson.authToken;
		}else
		{
			$('#changePwdModel').removeClass('fade');
   	 		$('#changePwdModel').modal('hide');
   	 		$("#rightNavbarID").hide();
   	 		$("#resetPwdLIId").hide();
			$("#logoutId").show();
			sessionStorage.userLoggedIn = 1;
			sessionStorage.authToken = successJson.authToken;
			sessionStorage.username = successJson.username;
			sessionStorage.companyName = UTILITY.htmlDecode(successJson.companyName);
			sessionStorage.firstName = UTILITY.htmlDecode(successJson.firstName);
			sessionStorage.lastName = UTILITY.htmlDecode(successJson.lastName);
			UTILITY.populateName('nameId');
			setRegisterServicePage();
		}
	};
	
	
	this.resetPassword = function()
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.resetPasswordSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.resetPassword($("#resetPwdEmailID").val(),callbackFunction,false);
	};
	
	this.resetPasswordSuccessHandler = function(successJson)
	{
		if(successJson)
	    {
			$('#passwordResetMsgId').show();
			$('#pwdResetForm').hide();
		}else
		 {
			$('#pwdResetErrorMsgId').show();
		 }
	};
	
	this.registerAccount = function()
	{
		var accountRegisterTO = new AccountRegisterTO();
		accountRegisterTO.companyName =  $("#company").val();
		/*accountRegisterTO.companyPOC =  $("#companyPoc").val();*/
		accountRegisterTO.firstName =  $("#firstName").val();
		accountRegisterTO.lastName =  $("#lastName").val();
		accountRegisterTO.password =  $("#password").val();
		accountRegisterTO.username =  $("#emailAddress").val();
		accountRegisterTO.url = APP_URL;
		
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.registerAccountSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.registerAccount(accountRegisterTO,callbackFunction,false);
	};
	
	this.registerAccountSuccessHandler = function(successJson)
	{
		if(successJson)
		{
			$('#emailRegAlertID').show();
			document.getElementById("signupForm").reset();
			$('#fieldsRequireID').hide();
			$('#signupForm').hide();
		}
	};
}