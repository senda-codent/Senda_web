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
        // Smooth scroll for anchor links - handled by scroll-expansion.js
        // Removed to avoid duplicate event binding
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
     * Validate email format
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// ==========================================
// Initialize on DOM Ready
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    SendaApp.init();
});

// ==========================================
// Export for use in other modules
// ==========================================

window.SendaApp = SendaApp;
window.Utils = Utils;
