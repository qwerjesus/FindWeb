let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const totalSlides = slides.length;

function showSlides() {
    // Ocultar todas las imágenes
    slides.forEach(slide => slide.style.display = 'none');
    
    // Incrementar índice
    slideIndex++;
    
    // Volver al primer slide si llegamos al final
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    
    // Mostrar el slide actual
    slides[slideIndex - 1].style.display = 'block';
    
    // Cambiar slide cada 5 segundos
    setTimeout(showSlides, 5000);
}

// Inicializar carrusel
showSlides();
