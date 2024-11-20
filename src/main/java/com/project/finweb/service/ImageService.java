package com.project.finweb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.finweb.model.ImageSave;
import com.project.finweb.repositorie.ImageRepositorie;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepositorie imageRepository;

    public ImageService(ImageRepositorie imageRepository) {
        this.imageRepository = imageRepository;
    }

    // Método para guardar una imagen
    public ImageSave saveImage(ImageSave image) {
        return imageRepository.save(image);
    }

    // Método para buscar una imagen por ID
    public Optional<ImageSave> getImageById(Long id) {
        return imageRepository.findById(id);
    }

    // Método para listar todas las imágenes
    public List<ImageSave> getAllImages() {
        return imageRepository.findAll();
    }

    // Método para buscar imágenes asociadas a un usuario específico
    public List<ImageSave> getImagesByUserId(Long userId) {
        return imageRepository.findByUsuarioId(userId);
    }

    // Método para eliminar una imagen por ID
    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }
}
