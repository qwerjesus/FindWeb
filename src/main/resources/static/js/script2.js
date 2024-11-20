// Segundo script  NO FUNCIONA  XD

function initializeCategoryCarousel() {
    let currentSlide = 0;
    const cards = document.querySelectorAll('.carousel .card');
    const totalSlides = cards.length;

    // Mostrar 3 tarjetas al mismo tiempo
    function showSlides() {
        cards.forEach((card, index) => {
            if (index >= currentSlide && index < currentSlide + 3) {
                card.style.display = 'block'; // Mostrar 3 tarjetas
            } else {
                card.style.display = 'none'; // Ocultar las demás
            }
        });
    }

    // Función para cambiar entre tarjetas
    function changeSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        showSlides();
    }

    // Mostrar las primeras 3 tarjetas al cargar la página
    showSlides();

    // Flechas de navegación
    document.querySelector('.next-arrow').addEventListener('click', () => {
        changeSlide(1); // Mueve el carrusel hacia adelante
    });

    document.querySelector('.prev-arrow').addEventListener('click', () => {
        changeSlide(-1); // Mueve el carrusel hacia atrás
    });

    // Desplazamiento automático cada 10 segundos
    setInterval(() => {
        changeSlide(1); // Avanzar automáticamente
    }, 10000); // Cada 10 segundos

    // Mostrar tarjetas ocultas cuando se haga clic en "Ver todo"
    document.querySelector('.view-all-btn').addEventListener('click', () => {
        const hiddenCards = document.querySelector('.hidden-cards');
        if (hiddenCards.style.display === 'none') {
            hiddenCards.style.display = 'block';
        } else {
            hiddenCards.style.display = 'none';
        }
    });
}

// Inicializa el carrusel cuando el documento esté listo
initializeCategoryCarousel();
