package org.sitenv.directvendortools.web.services;

import java.util.List;

import org.apache.commons.lang3.StringEscapeUtils;
import org.sitenv.directvendortools.web.entities.DirectTransportTestingService;
import org.sitenv.directvendortools.web.repositories.RegisterServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DirectServicesService {

	@Autowired
	RegisterServiceRepository registerServiceRepository;
	
	private Sort directServiceOrderBy() {
	    return new Sort("cehrtLabel");
	}

	public List<DirectTransportTestingService> findAllRegisteredServices() {
		return registerServiceRepository.findAll(directServiceOrderBy());
	}

	public DirectTransportTestingService save(DirectTransportTestingService service) {
		service.setDirectEmailAddress(service.getDirectEmailAddress().toUpperCase());
		service.setUserEmailAddress(service.getUserEmailAddress().toUpperCase());
		service.setNotes(StringEscapeUtils.escapeHtml4(service.getNotes()));
		return registerServiceRepository.save(service);
	}
	
	public boolean validateDirecteEmailAddress(String  directEmailAddress)
	{
		if(registerServiceRepository.findByDirectEmailAddress(directEmailAddress) != null)
		{
			return false;
		}else 
			return true;
	}
	
	public DirectTransportTestingService update(DirectTransportTestingService service)
	{
		DirectTransportTestingService exisSer =  registerServiceRepository.findOne(service.getId());
		exisSer.setCehrtLabel(service.getCehrtLabel());
		exisSer.setOrganizationName(service.getOrganizationName());
		exisSer.setPointOfContact(service.getPointOfContact());
		exisSer.setPocFirstName(service.getPocFirstName());
		exisSer.setPocLastName(service.getPocLastName());
		exisSer.setTimezone(service.getTimezone());
		exisSer.setDirectTrustMembership(service.getDirectTrustMembership());
		exisSer.setAvailFromDate(service.getAvailFromDate());
		exisSer.setAvailToDate(service.getAvailToDate());
		exisSer.setNotes(StringEscapeUtils.escapeHtml4(service.getNotes()));
		return registerServiceRepository.save(exisSer);
	}
	
	public void delete(DirectTransportTestingService service)
	{
		registerServiceRepository.delete(service);
	}


	public List<DirectTransportTestingService> findByEmailAddress(String emailAddress) {
		return registerServiceRepository.findByUserEmailAddressOrderByCehrtLabel(emailAddress);
	}
}
