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
    moreMenu.style.display = moreMenu.style.display === 'flex' ? 'none' : 'flex';
}

// ==================== CREATIVE SLIDER FUNCTIONALITY ====================
let currentCreativeSlide = 0;

function showCreativeSlide(n) {
    const slides = document.querySelectorAll('.creative-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n >= slides.length) {
        currentCreativeSlide = 0;
    }
    if (n < 0) {
        currentCreativeSlide = slides.length - 1;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentCreativeSlide]) {
        slides[currentCreativeSlide].classList.add('active');
    }
    if (dots[currentCreativeSlide]) {
        dots[currentCreativeSlide].classList.add('active');
    }
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

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', function() {
    showCreativeSlide(currentCreativeSlide);
    
    // Auto-advance slider every 8 seconds
    setInterval(() => {
        nextCreativeSlide();
    }, 8000);
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

// ==================== FORM SUBMISSION ====================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // The form action should point to a form service like Formspree
        // This is just for basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields');
        }
    });
}

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
    const elements = document.querySelectorAll('.project-card, .season-nav-card, .contact-card-item');
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