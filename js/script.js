// ==================== MOBILE MENU FUNCTIONALITY ====================
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

function toggleMoreMenu(event) {
    event.preventDefault();
    const moreMenu = document.getElementById('moreMenu');
    moreMenu.classList.toggle('active');  // ✅ Fixed: Use classList.toggle instead of inline styles
}

// ==================== CREATIVE SLIDER FUNCTIONALITY ====================
let currentCreativeSlide = 0;
let totalCreativeSlides = 0;

function initializeCreativeSlider() {
    const slides = document.querySelectorAll('.creative-slide');
    totalCreativeSlides = slides.length;
    
    // Auto-generate dots based on actual number of slides
    const dotsContainer = document.getElementById('creativeDots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalCreativeSlides; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.onclick = () => goToCreativeSlide(i);
            dotsContainer.appendChild(dot);
        }
    }
    
    showCreativeSlide(0);
}

function showCreativeSlide(n) {
    const slides = document.querySelectorAll('.creative-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n >= totalCreativeSlides) {
        currentCreativeSlide = 0;
    } else if (n < 0) {
        currentCreativeSlide = totalCreativeSlides - 1;
    } else {
        currentCreativeSlide = n;
    }
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show current slide
    if (slides[currentCreativeSlide]) {
        slides[currentCreativeSlide].classList.add('active');
    }
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentCreativeSlide) {
            dot.classList.add('active');
        }
    });
}

function nextCreativeSlide() {
    currentCreativeSlide++;
    showCreativeSlide(currentCreativeSlide);
}

function prevCreativeSlide() {
    currentCreativeSlide--;
    showCreativeSlide(currentCreativeSlide);
}

function goToCreativeSlide(n) {
    currentCreativeSlide = n;
    showCreativeSlide(currentCreativeSlide);
}

// Auto-advance slider
let sliderInterval;

function startSliderTimer() {
    sliderInterval = setInterval(() => {
        nextCreativeSlide();
    }, 7000);
}

function resetSliderTimer() {
    clearInterval(sliderInterval);
    startSliderTimer();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCreativeSlider();  // ✅ Initialize slider with auto-generated dots
    startSliderTimer();
});

// Reset timer when user manually navigates
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('slider-btn') || e.target.classList.contains('dot')) {
        resetSliderTimer();
    }
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            closeMenu();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVBAR ACTIVE STATE ====================
function setActiveNavLink() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a, .mobile-menu a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && (href === currentLocation || currentLocation.endsWith(href))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-card, .contact-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== UTILITY FUNCTIONS ====================
// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Add keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (document.querySelector('.creative-slide')) {
        if (e.key === 'ArrowRight') nextCreativeSlide();
        if (e.key === 'ArrowLeft') prevCreativeSlide();
    }
});