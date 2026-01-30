// ==================== NAVIGATION ====================

// Toggle mobile menu
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu
function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

// Toggle MORE dropdown in mobile menu
function toggleMoreMenu(e) {
    e.preventDefault();
    document.getElementById('moreMenu').classList.toggle('active');
}

// Close menu when clicking on any mobile menu link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only close menu if it's not the "MORE" link
            if (!this.getAttribute('onclick')?.includes('toggleMoreMenu')) {
                closeMenu();
            }
        });
    });
});

// ==================== CREATIVE PROCESS SLIDER ====================

let currentCreativeSlide = 0;

// Show specific slide
function showCreativeSlide(index) {
    const slides = document.querySelectorAll('.creative-slide');
    const dots = document.querySelectorAll('.creative-dots .dot');
    
    // Handle wrapping
    if (index >= slides.length) {
        currentCreativeSlide = 0;
    } else if (index < 0) {
        currentCreativeSlide = slides.length - 1;
    } else {
        currentCreativeSlide = index;
    }
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[currentCreativeSlide].classList.add('active');
    dots[currentCreativeSlide].classList.add('active');
}

// Next slide
function nextCreativeSlide() {
    currentCreativeSlide++;
    showCreativeSlide(currentCreativeSlide);
}

// Previous slide
function prevCreativeSlide() {
    currentCreativeSlide--;
    showCreativeSlide(currentCreativeSlide);
}

// Go to specific slide
function goToCreativeSlide(index) {
    currentCreativeSlide = index;
    showCreativeSlide(currentCreativeSlide);
}

// Auto-advance slider every 6 seconds
setInterval(nextCreativeSlide, 6000);

// ==================== SMOOTH SCROLL HANDLING ====================

// Smooth scroll to sections (for browsers that don't support CSS scroll-behavior)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for the MORE dropdown toggle
            if (href === '#' && this.getAttribute('onclick')) {
                return;
            }
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});