function RegisterService()
{
	var currentObject = this;
	this.resultSet = [];
	this.allCerts = [];
	this.editingSystemID = 0;
	this.directEndPoint = "";
	this.directTrustMember = "";
	this.selectedFile = "";
	this.UPLOAD_FILE = APP_CONTEXT + "uploadCert?directEndPoint=";
	
	this.validateService = function()
	{
		$('#directEmailExistAlertID').hide();
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.validateServiceSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.validateDirectSystem($("#directEmail").val(), callbackFunction, false);
	};
	
	this.validateServiceSuccessHandler = function(successJson)
	{
		if(successJson)
		{
			currentObject.registerService();
			
		}else 
		{
			$('#directEmailExistAlertID').show();
		}
	};
	
	this.registerService = function()
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.registerServiceSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.registerDirectSystem(currentObject.readValues(), callbackFunction, false,true);
	};
	
	this.deleteService = function()
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.deleteServiceSuccessHandler);
		var httpService = new HttpAjaxServices();
		var registerServiceTO = new RegisterServiceTO();
		registerServiceTO.directEmailAddress = currentObject.directEndPoint;
		registerServiceTO.id = currentObject.editingSystemID;
		httpService.deleteDirectSystem(registerServiceTO, callbackFunction, false,false);
	};
	
	this.onDeleteClick = function(object)
	{
		var orgName = "";
		currentObject.directEndPoint = $(object).closest('tr').find('td:eq(2)').text();
		$(currentObject.resultSet).each(function(){
			if(this.directEmailAddress == currentObject.directEndPoint)
			{
				currentObject.editingSystemID = this.id;
				orgName = this.organizationName;
				return;
			}});
		$('#updateSystemAlertID').hide();
		$('#DirectSystemRegAlertID').hide();
		$('#directEmailExistAlertID').hide();
		$('#deleteHeaderID').html("Deleting Direct Service from " +orgName);
		$('#confirmDelID').html("Are you sure you want to delete the Direct Server registered for endpoint "+currentObject.directEndPoint +" from SITE ");
		$('#deleteDirectSystem').modal('show');
	};
	
	this.deleteServiceSuccessHandler = function(successJson)
	{
		if(successJson)
		{
			registerService.readUserDirectSystems();
			$('#deleteDirectSystem').modal('hide');
		}
	};
	
	this.readValues = function()
	{
		var registerServiceTO = new RegisterServiceTO();
		registerServiceTO.cehrtLabel =  $("#cehrtLabel").val();
		registerServiceTO.organizationName =  $("#orgName").val();
		registerServiceTO.directEmailAddress =  $("#directEmail").val();
		registerServiceTO.pointOfContact =  $("#pocEmail").val();
		registerServiceTO.pocFirstName =  $("#pocFirstName").val();
		registerServiceTO.pocLastName =  $("#pocLastName").val();
		registerServiceTO.timezone =  $("#timezone").val();
		registerServiceTO.directTrustMembership =  $("#registerForm input[type='radio']:checked").val();
		registerServiceTO.availFromDate =  $("#availFromDate").val();
		registerServiceTO.availToDate =  $("#availToDate").val();
		registerServiceTO.notes =  $("#notes").val();
		registerServiceTO.id = currentObject.editingSystemID;
		return registerServiceTO;
	};
	
	this.updateService = function()
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.updateServiceSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.updateDirectSystem(currentObject.readValues(), callbackFunction, false);
	};
	
	this.registerServiceSuccessHandler = function(successJson)
	{
			$("#vendorReg").show();
			$('#registrationModal').modal('hide');
			$('#DirectSystemRegAlertID').show();
			registerService.readUserDirectSystems();
	};
	
	this.updateServiceSuccessHandler = function(successJson)
	{
		if(successJson)
		{
			$("#vendorReg").show();
			$('#registrationModal').modal('hide');
			$('#updateSystemAlertID').show();
			registerService.readUserDirectSystems();
		}
	};
	
	this.readAllDirectSystems = function()
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.readAllDirectSystemsSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.readAllDirectSystem(callbackFunction, false,"");
	};
	
	this.readAllDirectSystemsSuccessHandler = function(successJson)
	{
		var resultArray = successJson;
		currentObject.resultSet = resultArray;
		var rows = "";
		 $(resultArray).each(function(){
		   rows += 	"<tr><td>"+this.cehrtLabel+"</td>"
			+	"<td>"+this.organizationName+"</td>"
			+	"<td>"+this.directEmailAddress+"</td>"
			+	"<td>"+this.pocFirstName + " " + this.pocLastName + " (" +this.pointOfContact +")</td>"
			+	"<td>"+this.availFromDate + " to " +this.availToDate +"</td>"
			+	"<td style='text-align: center;'>"+this.directTrustMembership+"</td>"
			+	"<td>"+currentObject.checkNotes(this.notes)+"</td>"
			+   "<td style='text-align: center;'>" +
					"<a href='#'  style='text-decoration: none;' onclick = registerService.onInteropAttachClick(this)> " +
							"<span class='glyphicon glyphicon-paperclip'></span> <span hidden='true'>t</span></a></td>"
			+ "</tr>";
		 });
		 
		 $("#tableBody").append(rows);
	};
	
	this.checkNotes = function(notes)
	{
		if(notes != null && notes.length >=20)
		{
			return "<a href='#' onclick = registerService.openNotes(this)>" + notes.substring(0,19)+ "..</a>";
		}else 
		{
		   return notes != null? notes : "";	
		}
	};
	
	
	this.openNotes = function(object)
	{
		var selectedDirectEmail = $(object).closest('tr').find('td:eq(2)').text();
		$(currentObject.resultSet).each(function(){
			if(this.directEmailAddress == selectedDirectEmail)
			{
				
				$("#notesText").html(this.notes);
				$('#notesModal').modal('show');
				return;
			}
		});
	};
	
	this.onInteropAttachClick = function(object)
	{
		currentObject.directEndPoint = $(object).closest('tr').find('td:eq(2)').text();
		currentObject.directTrustMember = $(object).closest('tr').find('td:eq(5)').text();
		currentObject.readAllInteropCerts(currentObject.directEndPoint);
	};
	
	this.readAllInteropCerts = function(directEndPoint)
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.interopCertsSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.readAllCerts(callbackFunction, false,directEndPoint);
	};
	
	this.interopCertsSuccessHandler = function(successJson)
	{
		$("#certTableBodyId").empty();
		var resultArray = successJson.resultSet.results;
		currentObject.allCerts = resultArray;
		var rows = "";
		 $(resultArray).each(function(){
		   rows += 	"<tr><td><a href='#'  style='text-decoration: none;' onclick = registerService.downloadFile(this) >" +this.certFile + "</a></td>"
		   +	"<td>"+currentObject.convertDateToLocal(this.uploadedTimeStamp) + "</td>"
			+ "</tr>";
		 });
		 
		 if(resultArray.length == 0 && currentObject.directTrustMember == "Yes")
		 {
			 $("#noCertsMessage").show();
		 }
		 else
		 {
			 $("#noCertsMessage").hide();
		 }
			 
		 $("#certTableBodyId").append(rows);
		 $('#interopCertModel').modal('show');
	};
	
	this.readUserDirectSystems = function()
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.readUserDirectSystemsSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.readAllDirectSystem(callbackFunction, false,sessionStorage.userEmail);
	};
	
	this.readUserDirectSystemsSuccessHandler = function(successJson)
	{
		$("#userDirectSysTableBody").empty();
		var resultArray = successJson;
		currentObject.resultSet = resultArray;
		var rows = "";
		 $(resultArray).each(function(){
		   rows += 	"<tr><td><a href='#'  style='text-decoration: none;' onclick =registerService.onEditClick(this)> " +
  					"<span class='glyphicon glyphicon-edit'></span> <span hidden='true'>t</span></a>&nbsp;" +
  					"<a href='#'  style='text-decoration: none;' onclick =registerService.onDeleteClick(this)> " +
  					"<span class='glyphicon glyphicon-remove'></span> <span hidden='true'>t</span></a>&nbsp;"+this.cehrtLabel+"</td>"
			+	"<td>"+this.organizationName+"</td>"
			+	"<td>"+this.directEmailAddress+"</td>"
			+	"<td>"+this.pocFirstName + " " + this.pocLastName + " (" +this.pointOfContact +")</td>"
			+	"<td>"+this.availFromDate + " to " +this.availToDate +"</td>"
			+	"<td style='text-align: center;'>"+this.directTrustMembership+"</td>"
			+	"<td>"+currentObject.checkNotes(this.notes)+"</td>"
			+   "<td style='text-align: center;'><a href='#'  style='text-decoration: none;' onclick = registerService.onAttachClick(this)> " +
					"<span class='glyphicon glyphicon-paperclip'></span><span hidden='true'>t</span></a></td>"
			+ "</tr>";
		 });
		 
		 $("#userDirectSysTableBody").append(rows);
	};
	
	this.onAttachClick = function(object)
	{
		currentObject.directEndPoint = $(object).closest('tr').find('td:eq(2)').text();
		currentObject.uploadBinding(currentObject.directEndPoint);
		$("#anchoruploadform").parsley().reset();
		$('#progressText').html("");
		$('#anchoruploadform').trigger('reset');
		$('#anchoruploadfiles').empty();
		currentObject.readAllCerts(currentObject.directEndPoint);
	};
	
	this.readAllCerts = function(directEndPoint)
	{
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.readallCertsSuccessHandler);
		var httpService = new HttpAjaxServices();
		httpService.readAllCerts(callbackFunction, false,directEndPoint);
	};
	
	this.readallCertsSuccessHandler = function(successJson)
	{
		$("#certAnchorsTableBodyId").empty();
		var resultArray = successJson.resultSet.results;
		currentObject.allCerts = resultArray;
		var rows = "";
		 $(resultArray).each(function(){
		   rows += 	"<tr><td><a href='#'  style='text-decoration: none;' onclick = registerService.downloadFile(this) >" +this.certFile + "</a></td>"
		   +	"<td>"+currentObject.convertDateToLocal(this.uploadedTimeStamp)+"</td>"
			+   "<td><a href='#'  style='text-decoration: none;' onclick = registerService.deleteConfirm(this)> " +
					"<span class='glyphicon glyphicon-trash'></span><span hidden='true'>t</span></a></td>"
			+ "</tr>";
		 });
		 
		 $("#certAnchorsTableBodyId").append(rows);
		 $('#uploadModel').modal('show');
	};
	
	this.downloadFile = function(object)
	{
		var fileName = $(object).closest('tr').find('td:eq(0)').text();
		var httpService = new HttpAjaxServices();
		$(currentObject.allCerts).each(function(){
			if(this.certFile == fileName)
			{
				var obj = {};
				obj.key = "filePath";
				obj.value = this.absolutePath;
				var dataArray = [];
				dataArray.push(obj);
				httpService.downloadFile(dataArray);
				return;
			}
		});
		
	};
	
	this.downloadTestInstructions = function()
	{
		var httpService = new HttpAjaxServices(); 
		httpService.downloadTestInstructions();
	};
	
	this.downloadRegistrationInstructions = function()
	{
		var httpService = new HttpAjaxServices(); 
		httpService.downloadRegistrationInstructions();
	};
	
	this.deleteConfirm = function(object)
	{
		$('#DeleteConfirm').modal('show');
		currentObject.selectedFile = $(object).closest('tr').find('td:eq(0)').text();
	};
	
	this.deleteCert = function()
	{
		$('#DeleteConfirm').modal('hide');
		var fileName = currentObject.selectedFile;
		var callbackFunction = $.Callbacks('once');
		callbackFunction.add(currentObject.deleteCertsSuccessHandler);
		var httpService = new HttpAjaxServices();
		$(currentObject.allCerts).each(function(){
		  if(this.certFile == fileName)
		  {
			 httpService.deleteCerts(callbackFunction, false, this.absolutePath);
			 return;
		  }
		});
	};
	
	this.deleteCertsSuccessHandler = function(successJson)
	{
		if(successJson.booleanOutput)
		{
			currentObject.readAllCerts(currentObject.directEndPoint);
		}
	};
	
	this.checkAttribute = function(object)
	{
		var attr = object.attr('data-parsley-currentdateval');

		if (typeof attr !== typeof undefined && attr !== false) {
		    return true;
		}else 
			return false;
	};
	
	this.addAttr = function()
	{
		if(!registerService.checkAttribute($('#availFromDate')))
		{
			$('#availFromDate').attr('data-parsley-currentdateval', '');
		}
		
		if(!registerService.checkAttribute($('#availToDate')))
		{
			$('#availToDate').attr('data-parsley-currentdateval','');
		}
	};
	
	this.onEditClick = function onEditClick(object)
	{
		cleanUp();
		if(currentObject.checkAttribute($('#availFromDate')))
		{
			$('#availFromDate').removeAttr('data-parsley-currentdateval');
		}
		
		if(currentObject.checkAttribute($('#availToDate')))
		{
			$('#availToDate').removeAttr('data-parsley-currentdateval');
		}
		$("#updateServiceButton").show();
		$("#submitButton").hide();
		var selectedDirectEmail = $(object).closest('tr').find('td:eq(2)').text();
		$(currentObject.resultSet).each(function(){
			if(this.directEmailAddress == selectedDirectEmail)
			{
				$("#cehrtLabel").val(UTILITY.htmlDecode(this.cehrtLabel));
				currentObject.editingSystemID = this.id;
				$("#orgName").val(UTILITY.htmlDecode(this.organizationName));
				$("#directEmail").val(UTILITY.htmlDecode(this.directEmailAddress));
				$("#directEmail").attr("disabled", "disabled");
				$("#pocEmail").val(UTILITY.htmlDecode(this.pointOfContact));
				$("#pocFirstName").val(UTILITY.htmlDecode(this.pocFirstName));
				$("#pocLastName").val(UTILITY.htmlDecode(this.pocLastName));
				var text = UTILITY.htmlDecode(this.timezone);
				$('#timezone').val(text);
				if(this.directTrustMembership == 'Yes')
				{
					$("#option_yes").attr('checked', 'checked');	
				}else
				{  
					$("#option_no").attr('checked', 'checked');
				}
				$("#availFromDate").val(UTILITY.htmlDecode(this.availFromDate));
				$("#availToDate").val(UTILITY.htmlDecode(this.availToDate));
				$("#notes").val(UTILITY.htmlDecode(this.notes));
				
			   return;
			}
		});
	};
	
	
	this.convertDateToLocal = function(date)
	{
        var givenDate = new Date(date);

        if(givenDate == 'NaN') return;

        // format the date 
        return $.format.date(givenDate, 'MM/dd/yyyy hh:mm:ss a');

	};
	
	this.uploadBinding = function(directEndPoint)
	{
		// Change this to the location of your server-side upload handler:
		var URL = currentObject.UPLOAD_FILE + directEndPoint;
		//$('#anchoruploadprogress').hide();
		$('#anchoruploadfile').fileupload(
		{
			url : URL,
			dataType : 'json',
			autoUpload : false,
			type : 'POST',
			contenttype : false,
			replaceFileInput : false,
			beforeSend: function(xhr){
		        xhr.setRequestHeader("X-Auth-Token", sessionStorage.authToken);
		    },
			done : function(e, data) {
				
				$('#anchoruploadform').trigger('reset');
				$('#anchoruploadfiles').empty();
				$('#progressText').html("Cert uploaded successfully");
				$('#anchoruploadsubmit').unbind("click");
				currentObject.readAllCerts(directEndPoint);
			},
			progressall : function(e, data) {
			
			}
		}).on('fileuploadadd',function(e, data) {
			 $('#anchoruploadsubmit').unbind("click");
			 $('#anchoruploadfiles').empty();
			 
			 data.context = $('<div/>').appendTo('#anchoruploadfiles');
			 $.each(data.files, function(index, file) {
				var node = $('<p/>').append($('<span/>').text(file.name));
								node.appendTo(data.context);
			});
		    
			 $('#anchoruploadsubmit').click(function(e) {
				 if($("#anchoruploadform").parsley().validate()){
					   $('#anchoruploadprogress').show();
					   data.submit();
				}
			});
		}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
			$('#anchoruploadfile').bind('fileuploaddrop', function(e, data) {
					e.preventDefault();
			}).bind('fileuploaddragover', function(e) {
				e.preventDefault();
		});
		$('#anchoruploadfile-btn').bind('click', function(e, data) {
			$('#progressText').html("");
			$('#anchoruploadform').trigger('reset');
			$('#anchoruploadfiles').empty();
		});
	};
	
};


