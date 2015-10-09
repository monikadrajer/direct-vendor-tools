package org.sitenv.directvendortools.web.util;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;


public class ApplicationUtil {
	
	@Autowired
	private  Environment env;
	
	public boolean sendEmail(String toEmail)throws MessagingException
	{
		try {
			Properties props = new Properties();
			props.put("mail.transport.protocol", "smtp");
			props.put("mail.smtp.host", env.getProperty("mailserver.host")); //
			props.put("mail.smtp.auth", true);
		
			//props.put("mail.smtp.starttls.enable",false);//true for SSL

			Session mailSession = Session.getDefaultInstance(props);
		    mailSession.setDebug(true);
		    Transport transport = mailSession.getTransport();
		    MimeMessage message = new MimeMessage(mailSession);


		    message.setSubject("Thank you for contacting DTV");
		    message.setContent("Message that you want to send", "text/html");
		    Address[] from = InternetAddress.parse(ApplicationConstants.SUPPORT_EMAIL);//Your domain email
		    message.addFrom(from);
		    message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail)); 
		    transport.connect(env.getProperty("mailserver.host"), Integer.parseInt(env.getProperty("mailserver.port")), 
		    					env.getProperty("mailserver.username"), env.getProperty("mailserver.password"));
		    transport.sendMessage(message, message.getRecipients(Message.RecipientType.TO));
		    transport.close();
			System.out.println("Completed");
			return true;
		} catch (MessagingException e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	public static long getTimestampDifference(Timestamp timestamp) {
		Timestamp currentTimestamp= new Timestamp(new Date().getTime());
		return ((currentTimestamp.getTime() - timestamp.getTime())/ApplicationConstants.ONE_HOUR_TIME);
	}
	
	public static int getPasswordExpiryDays(Timestamp timestamp) {
		Timestamp currentTimestamp= new Timestamp(new Date().getTime());
		Long diff= ((currentTimestamp.getTime() - timestamp.getTime())/ApplicationConstants.ONE_DAY_TIME);
	    return diff.intValue();
	}
	

}
