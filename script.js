// Function to animate numbers
function animateNumbers() {
    const numbers = document.querySelectorAll('.metric-number');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // Animation duration in milliseconds
                const start = 0;
                const increment = target / (duration / 16); // Update every 16ms (60fps)
                
                let current = start;
                const animate = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(animate);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                animate();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, options);

    numbers.forEach(number => observer.observe(number));
}

// Call animateNumbers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Smooth scrolling for anchor links
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
            navLinks.classList.remove('active');
        }
    });
});

// Sticky header shadow on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolling down
    if (currentScroll > 20) {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
    
    lastScroll = currentScroll;
});
