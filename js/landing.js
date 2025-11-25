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
    // Navbar Scroll Effect - Optimized
    // ==========================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let navbarTicking = false;

    const updateNavbar = () => {
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
        navbarTicking = false;
    };

    const requestNavbarTick = () => {
        if (!navbarTicking) {
            requestAnimationFrame(updateNavbar);
            navbarTicking = true;
        }
    };

    window.addEventListener('scroll', requestNavbarTick, { passive: true });

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

    // Observe pillar cards with stagger
    document.querySelectorAll('.pillar-card').forEach(card => {
        card.classList.add('scroll-reveal-stagger');
        scrollObserver.observe(card);
    });

    // ==========================================
    // Progress Sidebar with Braided Lines
    // ==========================================

    const initProgressBar = () => {
        const progressLines = document.querySelectorAll('.progress-line');
        const progressDots = document.querySelectorAll('.progress-dot');

        // Define sections to track
        const sections = [
            { id: 'hero', element: document.getElementById('hero') || document.querySelector('.scroll-expansion-hero') },
            { id: 'how', element: document.getElementById('how') },
            { id: 'waitlist', element: document.getElementById('waitlist') },
            { id: 'faq', element: document.getElementById('faq') }
        ].filter(s => s.element); // Filter out sections that don't exist

        let ticking = false;

        const updateProgressBar = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Get hero section height to offset the calculation
            const heroSection = sections.find(s => s.id === 'hero');
            const heroHeight = heroSection ? heroSection.element.offsetHeight : windowHeight;

            // Adjust scroll calculation to account for hero section
            // When user finishes hero (scrolls past it), progress should already be past first dot
            const adjustedScrollTop = scrollTop + heroHeight * 0.5; // Add 50% of hero height as offset
            const maxScroll = documentHeight - windowHeight;
            const scrollPercent = maxScroll > 0 ? (adjustedScrollTop / maxScroll) * 100 : 0;

            // Update all three braided lines with the same progress - smooth interpolation
            const heightValue = `${Math.min(Math.max(scrollPercent, 0), 100)}%`;
            progressLines.forEach(line => {
                line.style.height = heightValue;
            });

            // Update active dot based on current section
            let currentSection = sections[0].id;
            let closestDistance = Infinity;

            sections.forEach((section) => {
                const rect = section.element.getBoundingClientRect();
                // Calculate distance from top of viewport to top of section
                const distance = Math.abs(rect.top);

                // The section closest to the top of the viewport is the current one
                if (distance < closestDistance && rect.top <= windowHeight / 2) {
                    closestDistance = distance;
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

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgressBar);
                ticking = true;
            }
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

        // Update on scroll with throttling
        window.addEventListener('scroll', requestTick, { passive: true });

        // Initial update
        updateProgressBar();
    };

    initProgressBar();

    // ==========================================
    // EmailJS Initialization
    // ==========================================

    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('rva8mAPlE0EJupC5b');
    }

    // ==========================================
    // Waitlist Form Handling
    // ==========================================

    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('waitlistName');
            const emailInput = document.getElementById('waitlistEmail');
            const submitButton = waitlistForm.querySelector('.waitlist-submit');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            // Basic validation
            if (!name || !email) {
                alert('Por favor, completa todos los campos');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido');
                return;
            }

            // Disable button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'Uniéndote...';

            try {
                // Send emails via EmailJS
                if (typeof emailjs !== 'undefined') {
                    // Template params for notification email to Senda team
                    const notificationParams = {
                        from_name: name,
                        from_email: email,
                        message: new Date().toLocaleString()
                    };

                    // Template params for auto-reply email to user
                    const autoReplyParams = {
                        user_name: name,
                        reply_to: email,
                        to_email: email  // Ensure the email goes to the user
                    };

                    // Send both emails in parallel
                    await Promise.all([
                        // 1. Notification to start.senda@gmail.com
                        emailjs.send('service_9sl31ro', 'template_eug0d4u', notificationParams),
                        // 2. Auto-reply to user
                        emailjs.send('service_9sl31ro', 'template_sqejque', autoReplyParams)
                    ]);

                    console.log('Emails sent successfully: notification to team + auto-reply to user');
                }

                // Store in localStorage as backup
                const waitlistData = JSON.parse(localStorage.getItem('senda_waitlist') || '[]');
                waitlistData.push({
                    name,
                    email,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('senda_waitlist', JSON.stringify(waitlistData));

                // Success feedback
                submitButton.textContent = '✓ ¡Te has unido!';
                submitButton.style.background = 'var(--earth-primary)';

                // Reset form after delay
                setTimeout(() => {
                    waitlistForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Únete a la Lista de Espera';
                    submitButton.style.background = '';
                }, 2000);

                // Increment counter
                const countElement = document.querySelector('.count-number');
                if (countElement) {
                    const currentCount = parseInt(countElement.textContent.replace(/,/g, ''));
                    countElement.textContent = (currentCount + 1).toLocaleString();
                }

                console.log('Waitlist submission:', { name, email });
            } catch (error) {
                console.error('Waitlist error:', error);
                submitButton.disabled = false;
                submitButton.textContent = 'Únete a la Lista de Espera';
                alert('Algo salió mal. Por favor, inténtalo de nuevo.');
            }
        });
    }

    // ==========================================
    // Waitlist Counter Animation
    // ==========================================

    const waitlistCounter = document.querySelector('.count-number');
    if (waitlistCounter) {
        const waitlistCounterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target, 1500);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        waitlistCounterObserver.observe(waitlistCounter);
    }

    // ==========================================
    // FAQ Accordion
    // ==========================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // Social Links Debug
    // ==========================================

    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Social link clicked:', link.href);
        });
    });

    // ==========================================
    // Console Welcome Message
    // ==========================================

    console.log('%c¡Hola! 🌱', 'font-size: 24px; color: #4A7C59; font-weight: bold;');
    console.log('%c¿Interesado en cómo funciona Senda? Únete a nuestro equipo!', 'font-size: 14px; color: #6B9B7B;');
    console.log('%ccontacto@senda.app', 'font-size: 12px; color: #666;');
});
