// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Image Slider Implementation
const sliderInit = () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dots.appendChild(dot);
    });

    const allDots = document.querySelectorAll('.dot');

    // Update active slide and dot
    const updateSlide = (index) => {
        // Remove current classes
        document.querySelector('.slide.current').classList.remove('current');
        document.querySelector('.dot.active').classList.remove('active');
        
        // Add current classes to new elements
        slides[index].classList.add('current');
        allDots[index].classList.add('active');
    };

    // Next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    };

    // Previous slide
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    };

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    allDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const slider = document.querySelector('.slider-wrapper');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', sliderInit);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = '#ffffff';
    }
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for Fade-In Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Hero Background Slider
const initHeroSlider = () => {
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    const nextSlide = () => {
        // Remove current class from current slide
        heroSlides[currentSlide].classList.remove('current');
        
        // Calculate next slide index
        currentSlide = (currentSlide + 1) % heroSlides.length;
        
        // Add current class to next slide
        heroSlides[currentSlide].classList.add('current');
    };

    // Auto advance slides
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
};

// Initialize hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    // ... other initialization code ...
}); 