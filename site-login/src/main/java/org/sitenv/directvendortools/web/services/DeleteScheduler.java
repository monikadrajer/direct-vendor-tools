package org.sitenv.directvendortools.web.services;


import java.util.List;

import org.sitenv.directvendortools.web.entities.User;
import org.sitenv.directvendortools.web.repositories.UserRepository;
import org.sitenv.directvendortools.web.util.ApplicationConstants;
import org.sitenv.directvendortools.web.util.ApplicationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class DeleteScheduler {
	
	@Autowired
	UserRepository userRepository;
	
	@Scheduled(fixedRate = (1000*60*60))
	public void deleteUnactivatedUsers()
	{
		List<User> users = userRepository.findAll();
		for(User user : users)
		{
			if(!user.isEnabled() && ApplicationUtil.getTimestampDifference(user.getCreateTimestamp()) > ApplicationConstants.ACTIVATION_EXPIRY_TIME)
			{
				userRepository.delete(user);
			}
		}
	}
}
