// ============================================
// PAGE LOADING BAR
// ============================================

// Start with loading bar visible and scroll locked
document.addEventListener('DOMContentLoaded', function() {
    const loadingBar = document.getElementById('loadingBar');
    if (loadingBar) {
        loadingBar.style.display = 'flex';
        loadingBar.style.opacity = '1';
        loadingBar.style.visibility = 'visible';
        // Add loading class to body to prevent scrolling
        document.body.classList.add('loading');
        // Scroll to top
        window.scrollTo(0, 0);
    }
});

// ============================================
// GALLERY SLIDER FUNCTIONALITY
// ============================================

let currentSlideIndex = 0;
let currentAboutSlideIndex = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('#indicators .indicator');
    
    if (n >= slides.length) currentSlideIndex = 0;
    if (n < 0) currentSlideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

function nextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

let currentYearSlideIndex = 0;

function showYearSlide(n) {
    const slides = document.querySelectorAll('#yearSlider .slide');
    const indicators = document.querySelectorAll('#yearIndicators .indicator');
    
    if (n >= slides.length) currentYearSlideIndex = 0;
    if (n < 0) currentYearSlideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[currentYearSlideIndex]) {
        slides[currentYearSlideIndex].classList.add('active');
    }
    if (indicators[currentYearSlideIndex]) {
        indicators[currentYearSlideIndex].classList.add('active');
    }
}

function nextYearSlide() {
    currentYearSlideIndex++;
    showYearSlide(currentYearSlideIndex);
}

function prevYearSlide() {
    currentYearSlideIndex--;
    showYearSlide(currentYearSlideIndex);
}

function currentYearSlide(n) {
    currentYearSlideIndex = n;
    showYearSlide(currentYearSlideIndex);
}

// About Slider Functions
function showAboutSlide(n) {
    const slides = document.querySelectorAll('.about-slide');
    const indicators = document.querySelectorAll('#aboutIndicators .indicator');
    
    if (n >= slides.length) currentAboutSlideIndex = 0;
    if (n < 0) currentAboutSlideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[currentAboutSlideIndex]) {
        slides[currentAboutSlideIndex].classList.add('active');
    }
    if (indicators[currentAboutSlideIndex]) {
        indicators[currentAboutSlideIndex].classList.add('active');
    }
}

function nextAboutSlide() {
    currentAboutSlideIndex++;
    showAboutSlide(currentAboutSlideIndex);
}

function prevAboutSlide() {
    currentAboutSlideIndex--;
    showAboutSlide(currentAboutSlideIndex);
}

function currentAboutSlide(n) {
    currentAboutSlideIndex = n;
    showAboutSlide(currentAboutSlideIndex);
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Main slider button events
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // About slider button events
    const aboutNextBtn = document.getElementById('aboutNextBtn');
    const aboutPrevBtn = document.getElementById('aboutPrevBtn');
    
    if (aboutNextBtn) aboutNextBtn.addEventListener('click', nextAboutSlide);
    if (aboutPrevBtn) aboutPrevBtn.addEventListener('click', prevAboutSlide);
    
    // Year slider button events (for year pages)
    const yearNextBtn = document.getElementById('yearNextBtn');
    const yearPrevBtn = document.getElementById('yearPrevBtn');
    
    if (yearNextBtn) yearNextBtn.addEventListener('click', nextYearSlide);
    if (yearPrevBtn) yearPrevBtn.addEventListener('click', prevYearSlide);
    
    // Auto-advance main slider every 6 seconds
    setInterval(nextSlide, 6000);
    
    // Auto-advance about slider every 5 seconds
    setInterval(nextAboutSlide, 5000);
    
    // Auto-advance year slider every 5 seconds
    const yearSlider = document.getElementById('yearSlider');
    if (yearSlider) {
        setInterval(nextYearSlide, 5000);
    }
});

// ============================================
// PAGE LOADING BAR (continued)
// ============================================

// When everything is loaded, fade it out after random delay
window.addEventListener('load', function() {
    const loadingBar = document.getElementById('loadingBar');
    
    if (loadingBar) {
        // Generate random loading time between 3-5 seconds
        const randomLoadingTime = Math.random() * 2000 + 3000;
        
        // Fade out after the random time
        setTimeout(() => {
            loadingBar.classList.add('fade-out');
            // Remove loading class to allow scrolling again
            document.body.classList.remove('loading');
            // Completely hide after animation
            setTimeout(() => {
                loadingBar.style.display = 'none';
            }, 800);
        }, randomLoadingTime);
    }
});

// Show loading bar again when leaving page
window.addEventListener('beforeunload', function() {
    const loadingBar = document.getElementById('loadingBar');
    if (loadingBar) {
        loadingBar.style.display = 'flex';
        loadingBar.classList.remove('fade-out');
        // Add loading class to prevent scrolling
        document.body.classList.add('loading');
        // Scroll to top
        window.scrollTo(0, 0);
    }
});

// ============================================
// SMOOTH SCROLL WITH CUSTOM ANIMATION
// ============================================

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start = null;
    
    // Easing function (ease-in-out cubic)
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const elapsed = currentTime - start;
        const run = easeInOutCubic(elapsed / duration);
        window.scrollTo(0, startPosition + distance * run);
        
        if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor links (only internal page anchors)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for actual anchor links (not page navigation)
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                const targetPosition = targetElement.offsetTop - 80; // Offset for sticky navbar
                
                // Smooth scroll with custom easing
                smoothScrollTo(targetPosition, 800);
            }
        });
    });

    // Handle CTA buttons for smooth scrolling (INSTANT - no lag)
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            let targetId = '';
            const text = this.textContent.trim();
            
            // Determine target based on button text
            if (text.includes('Touch') || text.includes('Contact')) {
                targetId = 'contact';
            } else if (text.includes('Highlights')) {
                targetId = 'highlights';
            } else if (text.includes('About')) {
                targetId = 'about';
            } else if (text.includes('Back') || text.includes('Home')) {
                // For "Back to Home" buttons, just let the link navigate normally
                return;
            }
            
            // Scroll to target if found
            if (targetId) {
                e.preventDefault();
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 80;
                    smoothScrollTo(targetPosition, 800);
                }
            }
        });
    });
});

// ============================================
// BURGER MENU TOGGLE
// ============================================

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close burger menu when a link is clicked
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close burger menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnBurger = burger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnBurger) {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections for reveal animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.highlight-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Also observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// ============================================
// BUTTON HOVER ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .card-link, .year-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.position = 'relative';
        });
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(255, 20, 147, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(255, 20, 147, 0.2)';
    }
});

// ============================================
// ANIMATED COUNTER (Optional - for stats)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const step = target / (duration / 16);
    const increment = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(increment);
        } else {
            element.textContent = target;
        }
    };
    increment();
}

// ============================================
// PAGE TRANSITION EFFECTS
// ============================================

// Add fade-in effect to page load
window.addEventListener('pageshow', function(event) {
    const loadingBar = document.getElementById('loadingBar');
    if (loadingBar) {
        loadingBar.classList.add('fade-out');
    }
    
    // Add fade-in to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
    // ESC key closes burger menu
    if (e.key === 'Escape') {
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('navLinks');
        burger.classList.remove('active');
        navLinks.classList.remove('active');
    }
    
    // Home key (scroll to top)
    if (e.key === 'Home') {
        e.preventDefault();
        smoothScrollTo(0, 800);
    }
    
    // End key (scroll to bottom)
    if (e.key === 'End') {
        e.preventDefault();
        const lastSection = document.body.scrollHeight;
        smoothScrollTo(lastSection, 800);
    }
});

// ============================================
// SCROLL TO TOP BUTTON (Optional)
// ============================================

window.addEventListener('scroll', function() {
    // You can use this for a scroll-to-top button if needed
    if (window.pageYOffset > 300) {
        // Show scroll-to-top button
    } else {
        // Hide scroll-to-top button
    }
});

// ============================================
// ACTIVE NAV LINK INDICATOR
// ============================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-page');
        if (link.getAttribute('data-page') === current) {
            link.classList.add('active-page');
        }
    });
});

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c🎉 Welcome to the Y2K Marketing Portfolio! 🎉', 
    'font-size: 20px; color: #ff1493; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');
console.log('%cMade with ❤️ and pure Y2K vibes', 
    'font-size: 14px; color: #00d4ff; font-weight: bold;');
console.log('%c💻 Check the code and make it your own!', 
    'font-size: 12px; color: #39ff14; font-style: italic;');