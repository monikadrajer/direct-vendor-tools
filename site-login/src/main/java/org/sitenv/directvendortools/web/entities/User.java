package org.sitenv.directvendortools.web.entities;

import java.sql.Timestamp;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "siteuser")
public class User implements UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "emailaddress")
	String username;

	@Column(name = "company")
	String companyName;

	@Column(name = "firstname")
	String firstName;

	@Column(name = "lastname")
	String lastName;

	@Column(name = "password")
	String password;
	
	@Column(name = "temppassword")
	boolean isTempPwd;
	
	@Column(name = "enabled")
	boolean isEnabled;
	
	@Column(name = "createtimestamp", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	Timestamp createTimestamp;
	
	@Transient
	private String authToken;
	
	@Transient
	private String url;
	
	@Column(name="pwdlastupdtimestamp")
	private Timestamp passwordLastupdateTimestamp;
	
	@Transient
	private int passwordExpiryDays;
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public boolean isTempPwd() {
		return isTempPwd;
	}

	public void setTempPwd(boolean isTempPwd) {
		this.isTempPwd = isTempPwd;
	}

	public String getAuthToken() {
		return authToken;
	}

	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public boolean isEnabled() {
		return isEnabled;
	}
	
	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("ROLE_USER");
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/**
	 * @return the createTimestamp
	 */
	public Timestamp getCreateTimestamp() {
		return createTimestamp;
	}

	/**
	 * @param createTimestamp the createTimestamp to set
	 */
	public void setCreateTimestamp(Timestamp createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * @return the passwordLastupdateTimestamp
	 */
	public Timestamp getPasswordLastupdateTimestamp() {
		return passwordLastupdateTimestamp;
	}

	/**
	 * @param passwordLastupdateTimestamp the passwordLastupdateTimestamp to set
	 */
	public void setPasswordLastupdateTimestamp(Timestamp passwordLastupdateTimestamp) {
		this.passwordLastupdateTimestamp = passwordLastupdateTimestamp;
	}

	/**
	 * @return the passwordExpiryDays
	 */
	public int getPasswordExpiryDays() {
		return passwordExpiryDays;
	}

	/**
	 * @param passwordExpiryDays the passwordExpiryDays to set
	 */
	public void setPasswordExpiryDays(int passwordExpiryDays) {
		this.passwordExpiryDays = passwordExpiryDays;
	}
}
