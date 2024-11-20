package com.project.finweb.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.finweb.model.ImageSave;
import com.project.finweb.repositorie.ImageRepositorie;

@Controller
public class ImageController {
	@Autowired
	private ImageRepositorie imgRepo;
	
	@GetMapping("/categoria")
	public String imgForm(Model model) {
		model.addAttribute("img", new ImageSave());
		return "categorieForm";
	}
	
	@PostMapping("/categoria")
	public String imgSave(@RequestParam(name="file", required = false) MultipartFile imagen, ImageSave imgSave,
			RedirectAttributes flash) {
		
		if (!imagen.isEmpty()) {
			
			
			try {
				Path dirImagen = Paths.get("src//main//resources//static/images");	
				String ruta = dirImagen.toFile().getAbsolutePath();
				byte[] bytes = imagen.getBytes();		
				Path rutaCom = Paths.get(ruta+"//"+imagen.getOriginalFilename());
				Files.write(rutaCom, bytes);
				imgSave.setFoto(imagen.getOriginalFilename());
				imgSave.setId(1);
			} catch (Exception e) {
				// TODO: handle exception
			}
			
			imgRepo.save(imgSave);
			flash.addFlashAttribute("success","Foto subida");
		}
		
		return "redirect:/categoria";
		
	}
	
	@GetMapping("/listImg")
	public String imgList(Model model) {
		model.addAttribute("img", imgRepo.findAll());
		return "listImg";
	}
}
