package com.project.finweb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.finweb.model.AppUSer;
import com.project.finweb.repositorie.UserRepositorie;

@Service
public class UserService implements UserDetailsService{

	@Autowired
	private UserRepositorie repo;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		AppUSer appUser = repo.findByEmail(email);
		
		if (appUser != null) {
			var springUser = User.withUsername(appUser.getEmail())
					.password(appUser.getPassword())
					.roles(appUser.getRol())
					.build();
			return springUser;
		}
		return null;
	}
	
}
