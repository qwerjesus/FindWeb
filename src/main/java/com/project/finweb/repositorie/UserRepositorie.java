package com.project.finweb.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.finweb.model.AppUSer;

public interface UserRepositorie extends JpaRepository<AppUSer, Long> {
	
	public AppUSer findByEmail(String email);
	
}
