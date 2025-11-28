// ==================== //
// INITIALIZATION
// ==================== //
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initIntroAnimation();
    initNavigation();
    initThemeToggle();
    initScrollReveal();
    initSkillBars();
    initGalleryFilters();
    initLightbox();
    initContactForm();
    initBackToTop();
    initCreatorModal();
});

// ==================== //
// CUSTOM CURSOR
// ==================== //
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        dotX += (mouseX - dotX) * 0.15;
        dotY += (mouseY - dotY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .gallery-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ==================== //
// INTRO ANIMATION
// ==================== //
function initIntroAnimation() {
    const intro = document.querySelector('.intro-section');
    const introTitle = document.querySelector('.intro-title');
    const enterBtn = document.querySelector('.enter-btn');
    const mainContent = document.getElementById('main-content');
    const navbar = document.querySelector('.navbar');
    
    // Typing animation for title
    const titleText = "Artiste 3D/2D & VFX";
    let charIndex = 0;
    
    function typeTitle() {
        if (charIndex < titleText.length) {
            introTitle.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeTitle, 100);
        }
    }
    
    setTimeout(typeTitle, 800);
    
    // Enter button click
    enterBtn.addEventListener('click', () => {
        intro.classList.add('hidden');
        setTimeout(() => {
            intro.style.display = 'none';
            mainContent.classList.add('visible');
            navbar.classList.add('visible');
            document.body.classList.remove('no-scroll');
        }, 800);
    });
    
    // Prevent scrolling during intro
    document.body.classList.add('no-scroll');
}

// ==================== //
// NAVIGATION
// ==================== //
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const sections = document.querySelectorAll('.section');
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== //
// THEME TOGGLE
// ==================== //
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Cinematic transition
        document.body.style.transition = 'background-color 0.5s ease, transform 0.5s ease';
        document.body.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            setTimeout(() => {
                document.body.style.transform = 'scale(1)';
            }, 100);
        }, 250);
    });
}

// ==================== //
// SCROLL REVEAL
// ==================== //
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ==================== //
// SKILL BARS
// ==================== //
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.setProperty('--progress-width', progress + '%');
                entry.target.classList.add('revealed');
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// ==================== //
// GALLERY FILTERS
// ==================== //
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ==================== //
// LIGHTBOX
// ==================== //
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const viewBtn = item.querySelector('.view-btn');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// ==================== //
// CONTACT FORM
// ==================== //
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMsg = document.querySelector('.form-success');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset errors
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
            const errorMsg = input.parentElement.querySelector('.form-error');
            errorMsg.textContent = '';
        });
        
        // Validate
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Veuillez entrer votre nom');
            isValid = false;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Veuillez entrer un email valide');
            isValid = false;
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Veuillez entrer votre message');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
            
            setTimeout(() => {
                form.reset();
                form.style.opacity = '1';
                form.style.pointerEvents = 'all';
                successMsg.classList.add('show');
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });
    
    function showError(input, message) {
        input.classList.add('error');
        const errorMsg = input.parentElement.querySelector('.form-error');
        errorMsg.textContent = message;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error') && input.value.trim() !== '') {
                input.classList.remove('error');
            }
        });
    });
}

// ==================== //
// BACK TO TOP
// ==================== //
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== //
// PARALLAX EFFECT
// ==================== //
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-image-wrapper');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== //
// LAZY LOADING FOR IMAGES
// ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ==================== //
// SMOOTH SCROLL FOR ALL LINKS
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
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

// ==================== //
// PERFORMANCE: DEBOUNCE SCROLL
// ==================== //
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-dependent operations here
}, 50);

window.addEventListener('scroll', debouncedScroll);

// ==================== //
// EASTER EGG: PARTICLE EFFECT ON LOGO CLICK
// ==================== //
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        createParticles(logo);
    });
}

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.01;
            y += vy * 0.01 + 2;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// ==================== //
// ANIMATION: GRADIENT BACKGROUND
// ==================== //
function animateGradient() {
    const introSection = document.querySelector('.intro-section');
    if (!introSection) return;
    
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        // Gradient animation is handled by CSS
    }, 50);
}

animateGradient();

// ==================== //
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ==================== //
document.addEventListener('keydown', (e) => {
    // Close lightbox with Escape key (already handled above)
    // Add more keyboard shortcuts as needed
    
    // Navigate through gallery with arrow keys
    if (document.querySelector('.lightbox.active')) {
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
        const currentImg = document.getElementById('lightbox-img').src;
        const currentIndex = galleryItems.findIndex(item => 
            item.querySelector('img').src === currentImg
        );
        
        if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
            const nextImg = galleryItems[currentIndex + 1].querySelector('img');
            document.getElementById('lightbox-img').src = nextImg.src;
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const prevImg = galleryItems[currentIndex - 1].querySelector('img');
            document.getElementById('lightbox-img').src = prevImg.src;
        }
    }
});

// ==================== //
// LOADING ANIMATION
// ==================== //
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations after load
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('[data-reveal]');
        elementsToAnimate.forEach((el, index) => {
            setTimeout(() => {
                el.style.transitionDelay = `${index * 0.1}s`;
            }, 100);
        });
    }, 500);
});

// ==================== //
// CONSOLE MESSAGE
// ==================== //
console.log('%c✨ Portfolio de Boubacar Maïga ✨', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cArtiste 3D/2D & VFX Designer', 'font-size: 14px; color: #666;');
console.log('%cBienvenue dans mon univers créatif!', 'font-size: 12px; color: #999;');

// ==================== //
// PERFORMANCE MONITORING
// ==================== //
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// ==================== //
// RESPONSIVE UTILITIES
// ==================== //
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// Adjust animations based on device
if (isMobile()) {
    // Disable heavy animations on mobile for better performance
    document.body.classList.add('mobile-device');
}

window.addEventListener('resize', debounce(() => {
    if (isMobile()) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
}, 250));

// ==================== //
// PRELOAD CRITICAL IMAGES
// ==================== //
function preloadImages() {
    const criticalImages = [
        'assets/profile.jpg'
        // Add more critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// ==================== //
// SMOOTH REVEAL ON SECTION ENTER
// ==================== //
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// ==================== //
// AUTO-HIDE NAVBAR ON SCROLL DOWN
// ==================== //
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 10);
});

// ==================== //
// 3D TILT EFFECT ON CARDS
// ==================== //
function init3DTilt() {
    const cards = document.querySelectorAll('.software-card, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize 3D tilt on desktop only
if (!isMobile()) {
    init3DTilt();
}

// ==================== //
// COPY EMAIL TO CLIPBOARD
// ==================== //
const emailElements = document.querySelectorAll('.contact-item p');
emailElements.forEach(el => {
    if (el.textContent.includes('@')) {
        el.style.cursor = 'pointer';
        el.title = 'Cliquer pour copier';
        
        el.addEventListener('click', () => {
            const email = el.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                // Visual feedback
                const originalText = el.textContent;
                el.textContent = '✓ Copié!';
                el.style.color = '#10b981';
                
                setTimeout(() => {
                    el.textContent = originalText;
                    el.style.color = '';
                }, 2000);
            });
        });
    }
});