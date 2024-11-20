package com.project.finweb.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.project.finweb.model.AppUSer;
import com.project.finweb.model.RegisterDTO;
import com.project.finweb.repositorie.UserRepositorie;

import jakarta.validation.Valid;

@Controller
public class AccountController {

	@Autowired
	private UserRepositorie repo;
	
	@GetMapping("/register")
	public String register(Model model) {
		RegisterDTO registerDTO = new RegisterDTO();
		model.addAttribute(registerDTO);
		model.addAttribute("success", false);
		return "register";
	}
	
	@PostMapping("/register")
	public String register(Model model, @Valid @ModelAttribute RegisterDTO registerDTO
			, BindingResult result) {
		if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
			result.addError(new FieldError(
					"registerDTO","confirmPassword", 
					"la contraseña y su confirmacion no coincide"));
		}
		
		AppUSer appUser = repo.findByEmail(registerDTO.getEmail());
		if (appUser != null) {
			result.addError(new FieldError(
					"registerDTO","email", 
					"el correo ya esta en uso"));
		}
		
		if (result.hasErrors()) {
			return "register";
		}
		
		try {
			//crear cuenta 
			var bCryptEncoder = new BCryptPasswordEncoder();
			
			AppUSer nuevoUser = new AppUSer();
			nuevoUser.setUserName(registerDTO.getUserName());
			nuevoUser.setEmail(registerDTO.getEmail());
			nuevoUser.setRol("cliente");
			nuevoUser.setDateAt(new Date());
			nuevoUser.setPassword(bCryptEncoder.encode(registerDTO.getPassword()));
			
			repo.save(nuevoUser);
			
			model.addAttribute("registerDTO", new RegisterDTO());
			model.addAttribute("success", true);
			
		} catch (Exception e) {
			// TODO: handle exception
			result.addError(new FieldError("registerDTO", "userName", e.getMessage()));
		}
		return "register";
	}
	
	
}
