// Mobile Menu Toggle - FIXED VERSION
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Function to toggle mobile menu
const toggleMobileMenu = () => {
    const isActive = navLinks.classList.contains('active');
    
    if (isActive) {
        // Close menu
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
        // Open menu
        navLinks.classList.add('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
};

// Add click event to mobile menu button
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        toggleMobileMenu();
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a, .nav-links button').forEach(element => {
    element.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isMobile = window.innerWidth <= 768;
    const isClickInsideNav = navLinks.contains(e.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);
    
    if (isMobile && navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnMenuBtn) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Header button functionality
const desktopHeaderButton = document.getElementById('desktopHeaderButton');
const mobileHeaderButton = document.getElementById('mobileHeaderButton');

const handleBookNow = () => {
    // Show booking modal or alert
    alert('Thank you for choosing Sri Sathya Mobiles!\n\nYou can:\n1. Call us at +91 8098260202\n2. Visit our store\n3. Fill the contact form below\n\nWe will contact you shortly to schedule your repair appointment.');
    
    // Scroll to contact form
    document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
};

// Add event listeners to both buttons
if (desktopHeaderButton) {
    desktopHeaderButton.addEventListener('click', handleBookNow);
}

if (mobileHeaderButton) {
    mobileHeaderButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        handleBookNow();
        // Close mobile menu after clicking button
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.getAttribute('data-count') === '98' ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.getAttribute('data-count') === '98' ? '%' : '+');
        }
    }, 16);
};

// Trigger counter animation when element is in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    observer.observe(stat);
});

// Form Submission
const repairForm = document.getElementById('repairForm');

repairForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const device = document.getElementById('device').value;
    const issue = document.getElementById('issue').value;
    
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll just show an alert
    alert(`Thank you ${name}! We have received your repair request for ${device} (${issue}).\n\nWe will contact you at ${phone} within 30 minutes to schedule your appointment.\n\nYou can also call us directly at +91 8098260202.`);
    
    // Reset form
    repairForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    }
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a:not(.header-button)');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav item
    if (navItems.length > 0) {
        navItems[0].classList.add('active');
    }
    
    // Initialize header button states
    updateButtonVisibility();
    
    // Add ARIA attributes for accessibility
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-controls', 'navLinks');
});

// Handle window resize
window.addEventListener('resize', () => {
    updateButtonVisibility();
    
    // Ensure mobile menu is closed on desktop
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Function to update button visibility based on screen size
function updateButtonVisibility() {
    if (window.innerWidth <= 768) {
        document.querySelector('.mobile-header-btn').style.display = 'block';
        document.querySelector('.desktop-header-btn').style.display = 'none';
    } else {
        document.querySelector('.mobile-header-btn').style.display = 'none';
        document.querySelector('.desktop-header-btn').style.display = 'block';
    }
}

// Add touch event for mobile devices
document.addEventListener('touchstart', (e) => {
    // Check if touch is outside mobile menu
    if (window.innerWidth <= 768 && 
        navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
}, { passive: true });