// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Add login link to mobile menu if it doesn't exist
        if (navLinks.classList.contains('active') && !document.querySelector('.nav-links ul li a[href="login.html"]')) {
            const loginLi = document.createElement('li');
            const loginLink = document.createElement('a');
            loginLink.href = 'login.html';
            loginLink.textContent = 'Login';
            loginLi.appendChild(loginLink);
            document.querySelector('.nav-links ul').appendChild(loginLi);
        }
    });
}

//search bar
const input = document.querySelector('.search-bar input');
const results = document.getElementById('searchResults');
const items = results.querySelectorAll('li');

input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    let hasResults = false;

    items.forEach(item => {
        const match = item.textContent.toLowerCase().includes(query);
        item.style.display = match ? 'block' : 'none';
        if (match) hasResults = true;
    });

    // Show or hide the result box
    results.style.display = hasResults && query ? 'block' : 'none';
});




// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});

// Testimonial Carousel
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the current slide and activate corresponding dot
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Initialize carousel if elements exist
if (testimonialSlides.length > 0 && dots.length > 0) {
    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 5000);
    
    // Add click event to dots for manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for navbar height
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Get all sections that have an ID
    const sections = document.querySelectorAll('section[id]');
    
    // Check which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// Form validation for contact form
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form inputs
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        
        // Simple validation
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            isValid = false;
            showError(nameInput, 'Name is required');
        } else {
            removeError(nameInput);
        }
        
        if (!emailInput.value.trim()) {
            isValid = false;
            showError(emailInput, 'Email is required');
        } else if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Please enter a valid email');
        } else {
            removeError(emailInput);
        }
        
        if (!messageInput.value.trim()) {
            isValid = false;
            showError(messageInput, 'Message is required');
        } else {
            removeError(messageInput);
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Helper functions for form validation
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.style.color = '#ff3860';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.style.borderColor = '#ff3860';
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .stream-card, .branch-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .stream-card, .branch-card');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation for elements in initial viewport
    animateOnScroll();
});

// Listen for scroll to trigger animations
window.addEventListener('scroll', animateOnScroll);