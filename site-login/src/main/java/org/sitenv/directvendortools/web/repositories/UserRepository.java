package org.sitenv.directvendortools.web.repositories;

import org.sitenv.directvendortools.web.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByUsername(String username);
	
	@Query("delete from User where enabled = false")
	int deleteInactiveUsers();
}
