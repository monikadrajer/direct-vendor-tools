package org.sitenv.directvendortools.web.util;

public class ApplicationConstants {
	
	public static final String FILE_UPLOAD_DIRECTORY = "/var/opt/sitenv/direct-vendor-tools-anchors/";	
	
	public static final String DATE_FORMAT = "yyyy-MM-dd";
	
	public static final String UPLOAD_CERT = "/uploadCert";
	public static final String READ_ALL_CERTS = "/readAllCerts";
	public static final String DELETE_CERT = "/deleteCert";
	public static final String DOWNLOAD_CERT = "/downloadCert";
	public static final String DOWNLOAD_TEST_INST = "/downloadTestInstructions";
	public static final String DOWNLOAD_REG_INST = "/downloadRegistrationInstructions";
	
	public static final String RESPONSE = "response";
	public static final String ERROR = "error";
	public static final String STR_EMPTY = "";
	public static final String FIELD_ERROR = "fieldError";
	public static final String RESULT_SET = "resultSet";
	
	public static final String MIME_DER ="application/x-x509-ca-cert";
	public static final String MIME_PDF = "application/pdf";
	
	public static final String SUPPORT_EMAIL = "testingservices@sitenv.org";
	public static final long ONE_HOUR_TIME = (1000*60*60);
	public static final long ONE_DAY_TIME = (1000*60*60*24);
	public static final long ACTIVATION_EXPIRY_TIME = 23;
	public static final long PASSWORD_RXPIRY_DAYS = 30;
	
}
