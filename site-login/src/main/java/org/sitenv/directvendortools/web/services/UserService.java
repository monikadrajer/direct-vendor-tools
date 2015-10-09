package org.sitenv.directvendortools.web.services;

import java.sql.Timestamp;
import java.util.Date;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringEscapeUtils;
import org.sitenv.directvendortools.web.entities.User;
import org.sitenv.directvendortools.web.repositories.UserRepository;
import org.sitenv.directvendortools.web.util.ApplicationConstants;
import org.sitenv.directvendortools.web.util.ApplicationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ApplicationMailer applicationMailer;

	@Autowired
	PasswordEncoder passwordEncoder;

	public boolean save(User user) throws MessagingException,AddressException{
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		user.setUsername(user.getUsername().toUpperCase());
		user.setEnabled(false);
		user.setPasswordLastupdateTimestamp(new Timestamp(new Date().getTime()));
		htmlEncoding(user);
		userRepository.save(user);
		String activationLink = user.getUrl() + "?activateAccount=" + user.getUsername();
		return applicationMailer.accountActivationMail(user.getUsername(),activationLink);
	}
	
	public boolean activateAccount(String userName){
		User exisUser = userRepository.findByUsername(userName.toUpperCase());
		if(exisUser != null && exisUser.isEnabled())
		{
			return true;
		}
		else if(exisUser != null && ApplicationUtil.getTimestampDifference(exisUser.getCreateTimestamp()) < ApplicationConstants.ACTIVATION_EXPIRY_TIME)
		{
			exisUser.setEnabled(true);
			userRepository.save(exisUser);
			return true;
		}else if(exisUser != null && ApplicationUtil.getTimestampDifference(exisUser.getCreateTimestamp()) > ApplicationConstants.ACTIVATION_EXPIRY_TIME)
		{
			userRepository.delete(exisUser);
			return false;
		}else if(exisUser == null)
		{
			return false;
		}else
			return false;
		
	}
	
	
	public User updateUser(User user) {
		User exisUser = userRepository.findByUsername(user.getUsername().toUpperCase());
		exisUser.setCompanyName(user.getCompanyName());
		exisUser.setFirstName(user.getFirstName());
		exisUser.setLastName(user.getLastName());
		htmlEncoding(exisUser);
		return userRepository.save(exisUser);
	}
	
	public User changePwd(User user) {
		User exisUser = userRepository.findByUsername(user.getUsername().toUpperCase());
		exisUser.setPassword(passwordEncoder.encode(user.getPassword()));
		exisUser.setTempPwd(false);
		exisUser.setPasswordLastupdateTimestamp(new Timestamp(new Date().getTime()));
		return userRepository.save(exisUser);
	}
	
	

	@Override
	public User loadUserByUsername(String username) {
		User user = userRepository.findByUsername(username.toUpperCase());
		return user;
	}
	
	public boolean checkUserNameAvailability(String username) {
		User user = userRepository.findByUsername(username.toUpperCase());
		return user == null ? true : false;
	}
	
	public boolean resetPassword(String username) throws MessagingException,AddressException {
		User exisUser = userRepository.findByUsername(username.toUpperCase());
		if(exisUser != null && exisUser.isEnabled() == true)
		{
			String tempPWd = RandomStringUtils.randomAlphanumeric(8);
			exisUser.setPassword(passwordEncoder.encode(tempPWd));
			exisUser.setTempPwd(true);
			userRepository.save(exisUser);
			return applicationMailer.sendMail(username,tempPWd);
		}else
			return false;
	}
	
	private  void htmlEncoding(final User user)
	{
		user.setCompanyName(StringEscapeUtils.escapeHtml4(user.getCompanyName()));
		user.setFirstName(StringEscapeUtils.escapeHtml4(user.getFirstName()));
		user.setLastName(StringEscapeUtils.escapeHtml4(user.getLastName()));
		user.setUsername(StringEscapeUtils.escapeHtml4(user.getUsername()));
	}
	
	
}
