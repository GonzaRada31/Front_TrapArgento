document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressBarMasks = document.querySelectorAll('.progress-bar-mask .progress-bar');

    let currentSlide = 0;
    activateSlideAndProgress(currentSlide);

    setInterval(() => {
        changeSlide((currentSlide + 1) % slides.length);
    }, 4000);

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetIndex = Array.from(slides).findIndex(slide => slide.id === targetId);
            if (targetIndex !== -1) changeSlide(targetIndex);
        });
    });

    function changeSlide(newIndex) {
        if (currentSlide !== newIndex) {
            progressBarMasks[currentSlide].style.width = '0%';  // Resetear la barra de progreso actual
            slides[currentSlide].classList.remove('active');
            timelineItems[currentSlide].classList.remove('active');

            currentSlide = newIndex; // Actualizar el índice de la diapositiva actual
            activateSlideAndProgress(currentSlide);
        }
    }

    function activateSlideAndProgress(index) {
        slides[index].classList.add('active');
        timelineItems[index].classList.add('active');
        setTimeout(() => { // Esperar un poco antes de iniciar la animación de la barra de progreso
            progressBarMasks[index].style.width = '100%';
        }, 100); // Un pequeño retardo puede ayudar a reiniciar correctamente la animación de la barra
    }
});
