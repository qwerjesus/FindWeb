package com.project.finweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {
	
	@GetMapping({"","/"})
	public String index() {
		return "index";
	}
	
	@GetMapping("/login")
	public String login() {
		
		return "login";
	}
	
	@GetMapping("/quien")
	public String quienesSomos() {
		return "quien";
	}
}
