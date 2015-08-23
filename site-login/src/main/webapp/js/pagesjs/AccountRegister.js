
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
	
	this.htmlDecode = function(value)
	{
		return $('<div/>').html(value).text();
	};
	
	this.checkUserNameSuccessHandler = function(successJson)
	{
		if(successJson)
		{
			currentObject.registerAccount();
		}else
		{
			$('#emailExistAlertID').show();
		}
	};
	
	this.loadProfileDetails = function()
	{
		$("#company").val(currentObject.htmlDecode(sessionStorage.companyName));
		$("#firstName").val(currentObject.htmlDecode(sessionStorage.firstName));
		$("#lastName").val(currentObject.htmlDecode(sessionStorage.lastName)); 
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
			sessionStorage.companyName = successJson.companyName;
			sessionStorage.firstName = successJson.firstName;
			sessionStorage.lastName = successJson.lastName;
			$('#editProfReqID').hide();
			$('#editProfileForm').hide();
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
		if(successJson)
	    {
			$('#changePwdAlert').show();
			$('#chgPwdReqID').hide();
			$('#changePwdForm').hide();
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
		
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.registerAccountSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.registerAccount(accountRegisterTO,callbackFunction,false);
	};
	
	this.registerAccountSuccessHandler = function(successJson)
	{
			$('#emailRegAlertID').show();
			document.getElementById("signupForm").reset();
			$('#fieldsRequireID').hide();
			$('#signupForm').hide();
	};
}