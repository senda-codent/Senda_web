/**
 * SENDA - Landing Page JavaScript
 * Specific functionality for the landing page
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');

            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');

                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ==========================================
    // Navbar Scroll Effect
    // ==========================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // Animated Counters
    // ==========================================

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start).toLocaleString();
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 16);
    }

    // Observe and animate counters when they come into view
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ==========================================
    // Phone Mockup Parallax Effect
    // ==========================================

    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            phoneMockup.style.transform = `
                perspective(1000px)
                rotateY(${-x}deg)
                rotateX(${y}deg)
            `;
        });

        // Reset on mouse leave
        phoneMockup.addEventListener('mouseleave', () => {
            phoneMockup.style.transform = 'perspective(1000px) rotateY(-5deg)';
        });
    }

    // ==========================================
    // Pricing Toggle (Future: Monthly/Yearly)
    // ==========================================

    const pricingToggle = document.querySelector('.pricing-toggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', (e) => {
            const isYearly = e.target.checked;
            document.querySelectorAll('.pricing-card').forEach(card => {
                if (isYearly) {
                    card.classList.add('pricing-yearly');
                } else {
                    card.classList.remove('pricing-yearly');
                }
            });
        });
    }

    // ==========================================
    // CTA Button Tracking
    // ==========================================

    document.querySelectorAll('.btn-primary, .btn-cta').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.textContent.trim();
            console.log('CTA Click:', buttonText);
            // Here you would send analytics data
        });
    });

    // ==========================================
    // Scroll Progress Indicator
    // ==========================================

    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--verde-bosque), var(--verde-agua));
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            indicator.style.width = scrolled + '%';
        });
    };

    createScrollIndicator();

    // ==========================================
    // Testimonials Carousel (Future feature)
    // ==========================================

    const initTestimonialsCarousel = () => {
        const carousel = document.querySelector('.testimonials-carousel');
        if (!carousel) return;

        let currentSlide = 0;
        const slides = carousel.querySelectorAll('.testimonial-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            dotsContainer.children[currentSlide].classList.remove('active');

            currentSlide = (n + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            dotsContainer.children[currentSlide].classList.add('active');
        };

        // Auto-advance
        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    };

    initTestimonialsCarousel();

    // ==========================================
    // FAQ Accordion
    // ==========================================

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isOpen = faqItem.classList.contains('open');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });

            // Open clicked item if it wasn't open
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });

    // ==========================================
    // Email Capture Form (if exists)
    // ==========================================

    const emailForm = document.querySelector('.email-capture-form');
    if (emailForm) {
        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailForm.querySelector('input[type="email"]').value;

            if (Utils.isValidEmail(email)) {
                // Store email for later (or send to backend)
                localStorage.setItem('senda_waitlist_email', email);
                Utils.showToast('¡Gracias! Te contactaremos pronto.', 'success');
                emailForm.reset();
            } else {
                Utils.showToast('Por favor ingresa un email válido', 'error');
            }
        });
    }

    // ==========================================
    // Lazy Load Images
    // ==========================================

    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ==========================================
    // Scroll Reveal Animations
    // ==========================================

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after revealing (one-time animation)
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('scroll-reveal');
        scrollObserver.observe(header);
    });

    // Observe feature cards with stagger
    document.querySelectorAll('.feature-card').forEach(card => {
        card.classList.add('scroll-reveal-stagger');
        scrollObserver.observe(card);
    });

    // Observe daily cards with stagger
    document.querySelectorAll('.daily-card').forEach(card => {
        card.classList.add('scroll-reveal-stagger');
        scrollObserver.observe(card);
    });

    // Observe testimonial cards with stagger
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.classList.add('scroll-reveal-stagger');
        scrollObserver.observe(card);
    });

    // Observe stats
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.classList.add('scroll-reveal-stagger');
        scrollObserver.observe(stat);
    });

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.add('scroll-reveal-stagger');
        scrollObserver.observe(card);
    });

    // Observe steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('scroll-reveal');
        scrollObserver.observe(step);
    });

    // ==========================================
    // Progress Sidebar with Braided Lines
    // ==========================================

    const initProgressBar = () => {
        const progressLines = document.querySelectorAll('.progress-line');
        const progressDots = document.querySelectorAll('.progress-dot');

        // Define sections to track
        const sections = [
            { id: 'hero', element: document.querySelector('.hero') },
            { id: 'features', element: document.getElementById('features') },
            { id: 'how', element: document.getElementById('how') },
            { id: 'testimonials', element: document.querySelector('.testimonials-section') },
            { id: 'pricing', element: document.getElementById('pricing') },
            { id: 'cta', element: document.querySelector('.cta-section') }
        ].filter(s => s.element); // Filter out sections that don't exist

        const updateProgressBar = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

            // Update all three braided lines with the same progress
            progressLines.forEach(line => {
                line.style.height = `${Math.min(scrollPercent, 100)}%`;
            });

            // Update active dot based on current section
            let currentSection = sections[0].id;
            sections.forEach((section, index) => {
                const rect = section.element.getBoundingClientRect();
                const sectionMiddle = rect.top + (rect.height / 2);

                // If section middle is in the top half of viewport, mark as current
                if (sectionMiddle < windowHeight / 2 && sectionMiddle > -rect.height / 2) {
                    currentSection = section.id;
                }
            });

            // Update dots active state
            progressDots.forEach(dot => {
                if (dot.dataset.section === currentSection) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Add click handlers to dots for smooth scrolling
        progressDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetSection = sections.find(s => s.id === dot.dataset.section);
                if (targetSection && targetSection.element) {
                    targetSection.element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update on scroll
        window.addEventListener('scroll', updateProgressBar, { passive: true });

        // Initial update
        updateProgressBar();
    };

    initProgressBar();

    // ==========================================
    // Console Welcome Message
    // ==========================================

    console.log('%c¡Hola! 🌱', 'font-size: 24px; color: #4A7C59; font-weight: bold;');
    console.log('%c¿Interesado en cómo funciona Senda? Únete a nuestro equipo!', 'font-size: 14px; color: #6B9B7B;');
    console.log('%ccontacto@senda.app', 'font-size: 12px; color: #666;');
});
