/* ================================================
   PORTAFOLIO PROFESIONAL - JAVASCRIPT PRINCIPAL
   ================================================ */

// ==================== DOM Elements ====================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contact-form');
const yearSpan = document.getElementById('year');

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initNavigation();
    initScrollReveal();
    initStatCounters();
    initSmoothScroll();
    initFormHandling();
    setCurrentYear();
    initMagneticButtons();
});

// ==================== Loader ====================
function initLoader() {
    const minLoadTime = 1500;
    const startTime = Date.now();
    
    window.addEventListener('load', () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadTime - elapsed);
        
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            
            setTimeout(() => {
                document.querySelectorAll('.hero .reveal').forEach(el => {
                    el.classList.add('active');
                });
            }, 100);
        }, remaining);
    });
}

// ==================== Custom Cursor ====================
function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        followerX += dx * 0.15;
        followerY += dy * 0.15;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .project-card, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

// ==================== Navigation ====================
function initNavigation() {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ==================== Scroll Reveal ====================
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// ==================== Stat Counters ====================
function initStatCounters() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                animateCounter(target, countTo);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ==================== Smooth Scroll ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ==================== Form Handling ====================
function initFormHandling() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <span>Enviando...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </path>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simula envío (reemplazar con API real)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        submitBtn.innerHTML = `
            <span>¡Mensaje enviado!</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// ==================== Utilities ====================
function setCurrentYear() {
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ==================== Magnetic Button Effect ====================
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-primary');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// ==================== Console Easter Egg ====================
console.log(
    '%c👋 ¡Hola, desarrollador!',
    'font-size: 24px; font-weight: bold; color: #6366f1;'
);
console.log(
    '%c¿Te interesa el código? ¡Hablemos!',
    'font-size: 14px; color: #a0a0b0;'
);