package org.sitenv.directvendortools.web.services;

import org.apache.commons.lang3.StringEscapeUtils;
import org.sitenv.directvendortools.web.entities.User;
import org.sitenv.directvendortools.web.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public User save(User user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		user.setUsername(user.getUsername().toUpperCase());
		htmlEncoding(user);
		return userRepository.save(user);
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
		return userRepository.save(exisUser);
	}
	
	

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username.toUpperCase());
		return user;
	}
	
	public boolean checkUserNameAvailability(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username.toUpperCase());
		return user == null ? true : false;
	}
	
	private static void htmlEncoding(final User user)
	{
		user.setCompanyName(StringEscapeUtils.escapeHtml4(user.getCompanyName()));
		user.setFirstName(StringEscapeUtils.escapeHtml4(user.getFirstName()));
		user.setLastName(StringEscapeUtils.escapeHtml4(user.getLastName()));
		user.setUsername(StringEscapeUtils.escapeHtml4(user.getUsername()));
	}
}
