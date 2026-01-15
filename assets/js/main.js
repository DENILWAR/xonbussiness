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

// ==================== EmailJS Configuration ====================
const EMAILJS_CONFIG = {
    publicKey: 'T-mI5n5qexZKiU0ch',      
    serviceId: 'service_8eccz9k',     
    templateId: 'template_os633pa'      
};

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
    initEmailJS();
    initRotatingImages();
    initThemeDetection();
    initProyectoLocalModal();
});

// ==================== EmailJS Initialization ====================
function initEmailJS() {
    // Verificar si EmailJS está cargado
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS inicializado correctamente');
    } else {
        console.warn('⚠️ EmailJS no está cargado.');
    }
}

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

// ==================== Form Handling con EmailJS ====================
function initFormHandling() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // VALIDACIÓN CHECKBOX DE PRIVACIDAD
        const privacyCheckbox = document.getElementById('privacy-accept');
        if (!privacyCheckbox || !privacyCheckbox.checked) {
            showNotification('Debes aceptar la Política de Privacidad para continuar', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Estado: Enviando
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
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name') || formData.get('nombre'),
            from_email: formData.get('email') || formData.get('correo'),
            subject: formData.get('subject') || formData.get('asunto') || 'Mensaje desde el portafolio',
            message: formData.get('message') || formData.get('mensaje'),
            // Datos adicionales útiles
            reply_to: formData.get('email') || formData.get('correo'),
            date: new Date().toLocaleString('es-ES', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
            })
        };
        
        try {
            // Verificar que EmailJS esté disponible
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS no está cargado');
            }
            
            // Enviar email usando EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            console.log('✅ Email enviado:', response);
            
            // Estado: Éxito
            submitBtn.innerHTML = `
                <span>¡Mensaje enviado!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            
            // Limpiar formulario
            contactForm.reset();
            
            // Mostrar notificación de éxito (opcional)
            showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
            
        } catch (error) {
            console.error('❌ Error al enviar:', error);
            
            // Estado: Error
            submitBtn.innerHTML = `
                <span>Error al enviar</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            
            // Mostrar notificación de error
            showNotification('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        }
        
        // Restaurar botón después de 3 segundos
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// ==================== Sistema de Notificaciones ====================
function showNotification(message, type = 'info') {
    // Remover notificación existente si hay
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `form-notification form-notification--${type}`;
    notification.innerHTML = `
        <div class="form-notification__content">
            <span class="form-notification__icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span class="form-notification__message">${message}</span>
        </div>
        <button class="form-notification__close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 12px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 
                      type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                      'linear-gradient(135deg, #6366f1, #8b5cf6)'};
        color: white;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-family: inherit;
    `;
    
    // Agregar estilos de animación si no existen
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .form-notification__content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .form-notification__close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
                padding: 0 0 0 10px;
            }
            .form-notification__close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
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

// ==================== Rotating Images ====================
function initRotatingImages() {
    const rotatingContainers = document.querySelectorAll('.rotating-images');

    rotatingContainers.forEach(container => {
        const images = container.querySelectorAll('.rotating-image');
        if (images.length === 0) return;

        let currentIndex = 0;

        // Función para cambiar a la siguiente imagen
        function rotateImage() {
            // Remover clase active de la imagen actual
            images[currentIndex].classList.remove('active');

            // Calcular el siguiente índice
            currentIndex = (currentIndex + 1) % images.length;

            // Agregar clase active a la siguiente imagen
            images[currentIndex].classList.add('active');
        }

        // Rotar cada 3 segundos (3000ms)
        setInterval(rotateImage, 3000);
    });
}

// ==================== Theme Detection ====================
function initThemeDetection() {
    // Detectar si el navegador soporta prefers-color-scheme
    if (window.matchMedia) {
        // Crear un listener para cambios en el tema del sistema
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

        // Función para actualizar el tema
        function updateTheme() {
            // Activar animación neon en el logo
            const logoImages = document.querySelectorAll('.logo-image');
            logoImages.forEach(img => {
                img.classList.add('theme-transition');
                // Remover la clase después de la animación
                setTimeout(() => {
                    img.classList.remove('theme-transition');
                }, 800);
            });

            if (darkModeQuery.matches) {
                console.log('🌙 Modo oscuro detectado - Activando efecto neon blanco');
                document.documentElement.setAttribute('data-theme', 'dark');
            } else if (lightModeQuery.matches) {
                console.log('☀️ Modo claro detectado - Activando efecto neon negro');
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }

        // Ejecutar al cargar
        updateTheme();

        // Escuchar cambios en las preferencias del sistema
        darkModeQuery.addEventListener('change', updateTheme);
        lightModeQuery.addEventListener('change', updateTheme);

        // Añadir transición suave para cambios de tema
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }
}

// ==================== Proyecto Local Modal & Carousel ====================
function initProyectoLocalModal() {
    const modal = document.getElementById('proyecto-local-modal');
    const openBtn = document.querySelector('.project-modal-btn');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.carousel-prev');
    const nextBtn = modal.querySelector('.carousel-next');
    const slides = modal.querySelectorAll('.carousel-slide');
    const indicators = modal.querySelectorAll('.indicator');
    const slidesContainer = modal.querySelector('.carousel-slides');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Abrir modal
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateSlide(0);
    }

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Actualizar slide
    function updateSlide(index) {
        // Asegurar que el índice esté en el rango válido
        currentSlide = (index + totalSlides) % totalSlides;

        // Actualizar posición del carrusel
        const offset = -currentSlide * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;

        // Actualizar clases activas en slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }

    // Siguiente slide
    function nextSlide() {
        updateSlide(currentSlide + 1);
    }

    // Slide anterior
    function prevSlide() {
        updateSlide(currentSlide - 1);
    }

    // Event listeners
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Cerrar modal al hacer click fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlide(index);
        });
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Soporte para gestos táctiles (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// ==================== Console Easter Egg ====================
console.log(
    '%c👋 ¡Hola, desarrollador!',
    'font-size: 24px; font-weight: bold; color: #e14700;'
);
console.log(
    '%c¿Te interesa el código? ¡Hablemos!',
    'font-size: 14px; color: #a0a0b0;'
);
// ==================== Gestión de Cookies - Widget Flotante ====================
let cookieChatOpen = false;

function toggleCookieChat() {
    const cookieIcon = document.getElementById('cookie-icon');
    const cookieMessage = document.getElementById('cookie-chat-message');

    if (!cookieChatOpen) {
        // Abrir chat
        cookieMessage.style.display = 'block';
        cookieMessage.classList.remove('closing');
        cookieChatOpen = true;
    } else {
        // Cerrar chat
        closeCookieChat();
    }
}

function closeCookieChat() {
    const cookieMessage = document.getElementById('cookie-chat-message');
    cookieMessage.classList.add('closing');

    setTimeout(() => {
        cookieMessage.style.display = 'none';
        cookieMessage.classList.remove('closing');
        cookieChatOpen = false;
    }, 400);
}

function acceptAllCookies() {
    localStorage.setItem('cookies_consent', 'all');
    console.log('✅ Cookies aceptadas: Todas');
    eatCookieAndHide();
}

function rejectOptionalCookies() {
    localStorage.setItem('cookies_consent', 'essential');
    console.log('✅ Cookies aceptadas: Solo esenciales');
    eatCookieAndHide();
}

function eatCookieAndHide() {
    const cookieWidget = document.getElementById('cookie-widget');
    const cookieIcon = document.getElementById('cookie-icon');
    const cookieMessage = document.getElementById('cookie-chat-message');

    // Cerrar mensaje si está abierto
    if (cookieChatOpen) {
        cookieMessage.classList.add('closing');
        setTimeout(() => {
            cookieMessage.style.display = 'none';
        }, 400);
    }

    // Animar galleta siendo comida
    cookieIcon.classList.add('clicked');

    // Ocultar todo el widget después de la animación
    setTimeout(() => {
        cookieWidget.style.display = 'none';
    }, 600);
}

// Gestión de consentimiento al cargar la página
window.addEventListener('load', () => {
    const consent = localStorage.getItem('cookies_consent');

    if (consent === 'all' || consent === 'essential') {
        // Usuario ya dio su consentimiento previamente
        console.log('ℹ️ Consentimiento previo detectado');
    } else {
        // No hay consentimiento, mostrar widget
        const cookieWidget = document.getElementById('cookie-widget');
        const cookieIcon = document.getElementById('cookie-icon');
        const cookieMessage = document.getElementById('cookie-chat-message');

        // Mostrar widget después de 2 segundos
        setTimeout(() => {
            if (cookieWidget) {
                cookieWidget.style.display = 'flex';

                // Auto-abrir el mensaje después de 1 segundo
                setTimeout(() => {
                    cookieMessage.style.display = 'block';
                    cookieChatOpen = true;
                }, 1000);
            }
        }, 2000);

        // Hacer la galleta clickeable para toggle
        if (cookieIcon) {
            cookieIcon.addEventListener('click', toggleCookieChat);
        }
    }
});
