/**
 * SENDA - Main JavaScript
 * Core functionality shared across all pages
 */

// ==========================================
// Global State Management
// ==========================================

const SendaApp = {
    currentUser: null,
    isAuthenticated: false,

    init() {
        this.checkAuth();
        this.setupGlobalEventListeners();
    },

    checkAuth() {
        const user = localStorage.getItem('senda_user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.isAuthenticated = true;
        }
    },

    setupGlobalEventListeners() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ==========================================
// Utility Functions
// ==========================================

const Utils = {
    /**
     * Format date to readable string
     */
    formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
    },

    /**
     * Format date to short string
     */
    formatDateShort(date) {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return new Date(date).toLocaleDateString('es-ES', options);
    },

    /**
     * Calculate days between two dates
     */
    daysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((new Date(date1) - new Date(date2)) / oneDay));
    },

    /**
     * Debounce function for performance
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * Generate unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Sanitize HTML to prevent XSS
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
};

// ==========================================
// Navigation Functions
// ==========================================

const Navigation = {
    /**
     * Navigate to a page
     */
    goTo(page) {
        window.location.href = page;
    },

    /**
     * Check if user is authenticated, redirect to login if not
     */
    requireAuth() {
        if (!SendaApp.isAuthenticated) {
            this.goTo('login.html');
            return false;
        }
        return true;
    },

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem('senda_user');
        localStorage.removeItem('senda_token');
        SendaApp.isAuthenticated = false;
        SendaApp.currentUser = null;
        this.goTo('index.html');
    }
};

// ==========================================
// Animation Helpers
// ==========================================

const Animations = {
    /**
     * Fade in element
     */
    fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';

        let opacity = 0;
        const timer = setInterval(() => {
            opacity += 50 / duration;
            element.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(timer);
            }
        }, 50);
    },

    /**
     * Fade out element
     */
    fadeOut(element, duration = 300) {
        let opacity = 1;
        const timer = setInterval(() => {
            opacity -= 50 / duration;
            element.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(timer);
                element.style.display = 'none';
            }
        }, 50);
    },

    /**
     * Slide down element
     */
    slideDown(element, duration = 300) {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';

        const height = element.scrollHeight;
        let currentHeight = 0;
        const increment = height / (duration / 10);

        const timer = setInterval(() => {
            currentHeight += increment;
            element.style.height = currentHeight + 'px';
            if (currentHeight >= height) {
                clearInterval(timer);
                element.style.height = 'auto';
            }
        }, 10);
    },

    /**
     * Intersection Observer for scroll animations
     */
    observeElements(selector, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    }
};

// ==========================================
// Initialize on DOM Ready
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    SendaApp.init();

    // Add fade-in animations to elements
    Animations.observeElements('.card', (el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});

// ==========================================
// Export for use in other modules
// ==========================================

window.SendaApp = SendaApp;
window.Utils = Utils;
window.Navigation = Navigation;
window.Animations = Animations;
