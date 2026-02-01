// Season Page Image Sliders
const sliders = {};

/**
 * Ensures a slider is initialized before use
 * @param {string} sliderId - The ID of the slider
 */
function ensureSliderInitialized(sliderId) {
    if (!sliders[sliderId]) {
        initializeSlider(sliderId);
    }
}

/**
 * Initialize a slider with auto-play and manual controls
 * @param {string} sliderId - The ID of the .image-slider element
 */
function initializeSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) {
        console.warn(`❌ Slider with ID "${sliderId}" not found`);
        return;
    }
    
    const slidesWrapper = slider.parentElement; // .slider-wrapper
    const contentCol = slidesWrapper.parentElement; // .content-col-left or .content-col-right
    
    // Look for dots in the same parent container (sibling to slider-wrapper)
    let dotsContainer = contentCol.querySelector('.slider-dots');
    
    const slides = slider.querySelectorAll('.slide');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    
    if (slides.length === 0) {
        console.warn(`❌ No slides found in slider "${sliderId}"`);
        return;
    }
    
    console.log(`✅ Initializing slider "${sliderId}"`);
    console.log(`   - Slides found: ${slides.length}`);
    console.log(`   - Dots found: ${dots.length}`);
    console.log(`   - Dots container found: ${dotsContainer ? 'YES' : 'NO'}`);
    
    // Cache DOM references for better performance
    sliders[sliderId] = {
        current: 0,
        interval: null,
        slidesWrapper: slidesWrapper,
        slides: slides,
        dots: dots,
        slideCount: slides.length
    };
    
    // Hide navigation controls if only one slide
    if (slides.length === 1) {
        console.log(`   📍 Single image slider - hiding nav buttons and dots`);
        
        // Hide nav buttons
        const prevBtn = slidesWrapper.querySelector('.slider-nav-prev');
        const nextBtn = slidesWrapper.querySelector('.slider-nav-next');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        
        // Hide dots container
        if (dotsContainer) dotsContainer.style.display = 'none';
        
        // Don't start auto-play for single image
        showSlide(sliderId, 0);
        return;
    }
    
    // Show first slide as active
    showSlide(sliderId, 0);
    startSliderTimer(sliderId);
}

/**
 * Display a specific slide and update dots
 * @param {string} sliderId - The ID of the slider
 * @param {number} index - The index of the slide to show
 */
function showSlide(sliderId, index) {
    if (!sliders[sliderId]) {
        console.warn(`❌ Slider "${sliderId}" not initialized`);
        return;
    }
    
    const sliderData = sliders[sliderId];
    const slideCount = sliderData.slideCount;
    
    // Wrap index using modulo operator for cleaner code
    sliderData.current = ((index % slideCount) + slideCount) % slideCount;
    
    // Remove active class from all slides
    sliderData.slides.forEach(slide => slide.classList.remove('active'));
    
    // Only update dots if there are multiple slides
    if (slideCount > 1) {
        // Remove active class from all dots
        sliderData.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide
        sliderData.slides[sliderData.current].classList.add('active');
        
        // Add active class to current dot (if it exists)
        if (sliderData.dots[sliderData.current]) {
            sliderData.dots[sliderData.current].classList.add('active');
        }
    } else {
        // Single slide - just make it active
        sliderData.slides[sliderData.current].classList.add('active');
    }
    
    console.log(`   📍 Showing slide ${sliderData.current + 1} of ${slideCount} in "${sliderId}"`);
}

/**
 * Show the next slide and reset auto-play timer
 * @param {string} sliderId - The ID of the slider
 */
function nextSlide(sliderId) {
    ensureSliderInitialized(sliderId);
    sliders[sliderId].current++;
    showSlide(sliderId, sliders[sliderId].current);
    resetSliderTimer(sliderId);
}

/**
 * Show the previous slide and reset auto-play timer
 * @param {string} sliderId - The ID of the slider
 */
function prevSlide(sliderId) {
    ensureSliderInitialized(sliderId);
    sliders[sliderId].current--;
    showSlide(sliderId, sliders[sliderId].current);
    resetSliderTimer(sliderId);
}

/**
 * Jump to a specific slide and reset auto-play timer
 * @param {string} sliderId - The ID of the slider
 * @param {number} index - The index of the slide to show
 */
function goToSlide(sliderId, index) {
    ensureSliderInitialized(sliderId);
    showSlide(sliderId, index);
    resetSliderTimer(sliderId);
}

/**
 * Start auto-play timer for a slider (7 second interval)
 * @param {string} sliderId - The ID of the slider
 */
function startSliderTimer(sliderId) {
    if (!sliders[sliderId]) {
        console.warn(`❌ Slider "${sliderId}" not initialized`);
        return;
    }
    
    sliders[sliderId].interval = setInterval(() => {
        nextSlide(sliderId);
    }, 7000);
    
    console.log(`⏱️  Auto-play started for "${sliderId}" (7 second interval)`);
}

/**
 * Reset auto-play timer (clear and restart)
 * @param {string} sliderId - The ID of the slider
 */
function resetSliderTimer(sliderId) {
    if (!sliders[sliderId]) {
        console.warn(`❌ Slider "${sliderId}" not initialized`);
        return;
    }
    
    clearInterval(sliders[sliderId].interval);
    startSliderTimer(sliderId);
}

/**
 * Initialize all sliders on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Initializing Season Page Sliders...');
    
    const sliderElements = document.querySelectorAll('.image-slider');
    
    if (sliderElements.length === 0) {
        console.warn('⚠️  No image sliders found on page');
        return;
    }
    
    console.log(`📺 Found ${sliderElements.length} slider(s)`);
    
    sliderElements.forEach((slider) => {
        const sliderId = slider.id;
        if (sliderId) {
            initializeSlider(sliderId);
        } else {
            console.warn('⚠️  Slider element found without ID attribute. Please add an ID to enable auto-play.');
        }
    });
    
    console.log('✅ Season page slider initialization complete!');
});