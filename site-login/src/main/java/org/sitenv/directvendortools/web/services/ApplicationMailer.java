package org.sitenv.directvendortools.web.services;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.sitenv.directvendortools.web.util.ApplicationConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service("mailService")
public class ApplicationMailer
{
    @Autowired
    private JavaMailSenderImpl mailSender;
     
    private String subject = "Pasword reset information for Direct Vendor Tools";
    
    
    /**
     * This method will send compose and send the message
     * */
    public boolean sendMail(String to, String tempPwd)throws AddressException,MessagingException
    {
    	MimeMessage message = new MimeMessage(mailSender.getSession());
		message.setFrom(new InternetAddress(ApplicationConstants.SUPPORT_EMAIL));
		message.setRecipients(Message.RecipientType.TO,
			InternetAddress.parse(to));
		message.setSubject(subject);
		String mailText = "<div><p>Thank You for contacting Direct Vendor Tools.</p>" +
				 "<p>Your new Temporary password is :" +tempPwd + "</p>"  +
				 "<p>Note: This is an auto generated email, Please do not reply to this email. For any queries please contact Direct Vendor Tools "
				 + "support team by sending an email to testingservices@sitenv.org</p></div>" ; ;
		message.setContent(mailText, "text/html");
		mailSender.send(message);
		return true;
    }
    
   
    public boolean accountActivationMail(String to, String activationLink)throws AddressException,MessagingException
    {
    	MimeMessage message = new MimeMessage(mailSender.getSession());
		message.setFrom(new InternetAddress(ApplicationConstants.SUPPORT_EMAIL));
		message.setRecipients(Message.RecipientType.TO,
			InternetAddress.parse(to));
		message.setSubject("Activate your account for Direct Vendor Tools.");
		String mailText = "<div><p>Thank You for contacting Direct Vendor Tools.</p>" +
				 "<p>Please activate your account on Direct Vendor Tools Application by using below mentioned URL</p>"  +
				 "<p>"+activationLink +"</p></div>" +
				 "<p>Note: This is an auto generated email, Please do not reply to this email. For any queries, please contact Direct Vendor Tools "
				 + "support team by sending an email to testingservices@sitenv.org</p></div>" ;
		message.setContent(mailText, "text/html");
		mailSender.send(message);
		return true;
    }
 
}
