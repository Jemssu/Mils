// Season Page Image Sliders
const sliders = {};

function initializeSlider(sliderId) {
    sliders[sliderId] = {
        current: 0,
        interval: null
    };
    startSliderTimer(sliderId);
}

function showSlide(sliderId, index) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slide');
    const dots = document.querySelectorAll(`#${sliderId.replace('slider', '')} .slider-dots .dot`);
    
    if (index >= slides.length) {
        sliders[sliderId].current = 0;
    } else if (index < 0) {
        sliders[sliderId].current = slides.length - 1;
    } else {
        sliders[sliderId].current = index;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[sliders[sliderId].current]) {
        slides[sliders[sliderId].current].classList.add('active');
    }
    if (dots[sliders[sliderId].current]) {
        dots[sliders[sliderId].current].classList.add('active');
    }
}

function nextSlide(sliderId) {
    sliders[sliderId].current++;
    showSlide(sliderId, sliders[sliderId].current);
    resetSliderTimer(sliderId);
}

function prevSlide(sliderId) {
    sliders[sliderId].current--;
    showSlide(sliderId, sliders[sliderId].current);
    resetSliderTimer(sliderId);
}

function goToSlide(sliderId, index) {
    showSlide(sliderId, index);
    resetSliderTimer(sliderId);
}

function startSliderTimer(sliderId) {
    sliders[sliderId].interval = setInterval(() => {
        nextSlide(sliderId);
    }, 7000);
}

function resetSliderTimer(sliderId) {
    clearInterval(sliders[sliderId].interval);
    startSliderTimer(sliderId);
}

// Initialize all sliders on page load
document.addEventListener('DOMContentLoaded', function() {
    const sliderElements = document.querySelectorAll('.image-slider');
    sliderElements.forEach((slider, index) => {
        const sliderId = slider.id;
        if (sliderId) {
            initializeSlider(sliderId);
        }
    });
});