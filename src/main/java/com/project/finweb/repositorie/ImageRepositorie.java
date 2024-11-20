package com.project.finweb.repositorie;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.finweb.model.ImageSave;

public interface ImageRepositorie extends JpaRepository<ImageSave, Long>{
	 List<ImageSave> findByUsuarioId(Long userId);
}
