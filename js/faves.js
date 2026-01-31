// ==================== FAVES PAGE SLIDER FUNCTIONALITY ====================

// Store current slide index for each slider
const sliderStates = {};

// Initialize all sliders
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const sliderId = slider.getAttribute('data-slider');
        sliderStates[sliderId] = 0;
    });
});

// Navigate slider (previous or next)
function navigateSlider(sliderId, direction) {
    const slider = document.querySelector(`.image-slider[data-slider="${sliderId}"]`);
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[sliderStates[sliderId]].classList.remove('active');
    indicators[sliderStates[sliderId]].classList.remove('active');
    
    // Update current index
    sliderStates[sliderId] += direction;
    
    // Wrap around if needed
    if (sliderStates[sliderId] >= slides.length) {
        sliderStates[sliderId] = 0;
    }
    if (sliderStates[sliderId] < 0) {
        sliderStates[sliderId] = slides.length - 1;
    }
    
    // Add active class to new slide and indicator
    slides[sliderStates[sliderId]].classList.add('active');
    indicators[sliderStates[sliderId]].classList.add('active');
}

// Go to specific slide
function goToSlide(sliderId, slideIndex) {
    const slider = document.querySelector(`.image-slider[data-slider="${sliderId}"]`);
    const slides = slider.querySelectorAll('.slide');
    const indicators = slider.querySelectorAll('.indicator');
    
    // Remove active class from current slide and indicator
    slides[sliderStates[sliderId]].classList.remove('active');
    indicators[sliderStates[sliderId]].classList.remove('active');
    
    // Update current index
    sliderStates[sliderId] = slideIndex;
    
    // Add active class to new slide and indicator
    slides[sliderStates[sliderId]].classList.add('active');
    indicators[sliderStates[sliderId]].classList.add('active');
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Get the currently visible slider (you can enhance this to detect which slider is in view)
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const sliderId = slider.getAttribute('data-slider');
        
        if (e.key === 'ArrowRight') {
            navigateSlider(sliderId, 1);
        } else if (e.key === 'ArrowLeft') {
            navigateSlider(sliderId, -1);
        }
    });
});

// Touch/Swipe support for mobile
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        let touchStartX = 0;
        let touchEndX = 0;
        const sliderId = slider.getAttribute('data-slider');
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(sliderId);
        });
        
        function handleSwipe(id) {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    navigateSlider(id, 1);
                } else {
                    // Swipe right - previous slide
                    navigateSlider(id, -1);
                }
            }
        }
    });
});