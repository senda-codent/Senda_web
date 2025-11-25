/**
 * Scroll Expansion Hero Effect
 * Vanilla JavaScript implementation
 */

class ScrollExpansionHero {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error('Scroll expansion container not found');
            return;
        }

        // Elements
        this.background = this.container.querySelector('.expansion-background');
        this.mediaWrapper = this.container.querySelector('.expansion-media-wrapper');
        this.mediaOverlay = this.container.querySelector('.expansion-media-overlay');
        this.titleFirst = this.container.querySelector('.expansion-title-first');
        this.titleRest = this.container.querySelector('.expansion-title-rest');
        this.date = this.container.querySelector('.expansion-date');
        this.scrollHint = this.container.querySelector('.expansion-scroll-hint');
        this.content = this.container.querySelector('.expansion-content');

        // State
        this.scrollProgress = 0;
        this.isFullyExpanded = false;
        this.touchStartY = 0;
        this.isMobile = window.innerWidth < 768;

        // Initial dimensions
        this.initialWidth = this.isMobile ? 300 : 300;
        this.initialHeight = this.isMobile ? 400 : 400;
        this.maxWidth = this.isMobile ? 950 : 1550;
        this.maxHeight = this.isMobile ? 600 : 800;

        this.init();
    }

    init() {
        // Check if page was loaded with a scroll position or hash
        const hasHash = window.location.hash && window.location.hash !== '#';
        const hasScroll = window.pageYOffset > 0;

        if (hasHash || hasScroll) {
            // User navigated to a specific section or browser restored scroll
            // Skip the expansion effect and go straight to expanded state
            this.scrollProgress = 1;
            this.isFullyExpanded = true;
            this.updateExpansion();
            this.showContent();
            // Don't lock scroll
        } else {
            // Normal initialization - lock scroll for expansion effect
            document.body.classList.add('expansion-locked');
        }

        // Set initial media size
        this.updateMediaSize();

        // Bind events
        this.bindEvents();

        // Handle clicks on anchor links while scroll is locked
        this.handleAnchorLinks();
    }

    bindEvents() {
        // Mouse wheel
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });

        // Touch events for mobile
        window.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        window.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // Prevent scroll when not fully expanded
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleWheel(e) {
        if (this.isFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
            // Scrolling up while at top - start collapsing
            this.isFullyExpanded = false;
            this.scrollProgress = 0.99; // Start just before fully expanded
            document.body.classList.add('expansion-locked');
            this.container.classList.add('expanding');
            this.hideContent();
            e.preventDefault();
            window.scrollTo(0, 0); // Force scroll to top
        } else if (!this.isFullyExpanded) {
            // Still expanding or collapsing
            e.preventDefault();

            // Add expanding class when starting to scroll
            if (!this.container.classList.contains('expanding')) {
                this.container.classList.add('expanding');
            }

            const scrollDelta = e.deltaY * 0.0009;
            this.scrollProgress = Math.min(Math.max(this.scrollProgress + scrollDelta, 0), 1);

            this.updateExpansion();

            if (this.scrollProgress >= 1) {
                this.setFullyExpanded();
            } else if (this.scrollProgress < 0.75) {
                this.hideContent();
            }
        }
    }

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartY) return;

        const touchY = e.touches[0].clientY;
        const deltaY = this.touchStartY - touchY;

        if (this.isFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
            // Swiping down while at top - start collapsing
            this.isFullyExpanded = false;
            this.scrollProgress = 0.99; // Start just before fully expanded
            document.body.classList.add('expansion-locked');
            this.container.classList.add('expanding');
            this.hideContent();
            e.preventDefault();
            window.scrollTo(0, 0); // Force scroll to top
        } else if (!this.isFullyExpanded) {
            e.preventDefault();

            // Add expanding class when starting to scroll
            if (!this.container.classList.contains('expanding')) {
                this.container.classList.add('expanding');
            }

            // Higher sensitivity for mobile
            const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
            const scrollDelta = deltaY * scrollFactor;
            this.scrollProgress = Math.min(Math.max(this.scrollProgress + scrollDelta, 0), 1);

            this.updateExpansion();

            if (this.scrollProgress >= 1) {
                this.setFullyExpanded();
            } else if (this.scrollProgress < 0.75) {
                this.hideContent();
            }

            this.touchStartY = touchY;
        }
    }

    handleTouchEnd() {
        this.touchStartY = 0;
    }

    handleScroll() {
        if (!this.isFullyExpanded) {
            window.scrollTo(0, 0);
        }
    }

    handleResize() {
        this.isMobile = window.innerWidth < 768;
        this.initialWidth = this.isMobile ? 300 : 300;
        this.initialHeight = this.isMobile ? 400 : 400;
        this.maxWidth = this.isMobile ? 950 : 1550;
        this.maxHeight = this.isMobile ? 600 : 800;
        this.updateExpansion();
    }

    updateExpansion() {
        this.updateMediaSize();
        this.updateBackground();
        this.updateTitles();
        this.updateMediaOverlay();

        // Add expanding class
        this.container.classList.toggle('expanding', this.scrollProgress > 0 && this.scrollProgress < 1);
    }

    updateMediaSize() {
        const width = this.initialWidth + (this.scrollProgress * (this.maxWidth - this.initialWidth));
        const height = this.initialHeight + (this.scrollProgress * (this.maxHeight - this.initialHeight));

        this.mediaWrapper.style.width = `${width}px`;
        this.mediaWrapper.style.height = `${height}px`;
    }

    updateBackground() {
        if (this.background) {
            // Background fades out as media expands and covers it
            this.background.style.opacity = 1 - this.scrollProgress;
        }
    }

    updateTitles() {
        const translateX = this.scrollProgress * (this.isMobile ? 180 : 150);

        if (this.titleFirst) {
            this.titleFirst.style.transform = `translateX(-${translateX}vw)`;
        }

        if (this.titleRest) {
            this.titleRest.style.transform = `translateX(${translateX}vw)`;
        }

        if (this.date) {
            this.date.style.transform = `translateX(-${translateX}vw)`;
        }

        if (this.scrollHint) {
            this.scrollHint.style.transform = `translateX(${translateX}vw)`;
        }
    }

    updateMediaOverlay() {
        if (this.mediaOverlay) {
            const opacity = 0.5 - (this.scrollProgress * 0.3);
            this.mediaOverlay.style.opacity = opacity;
        }
    }

    setFullyExpanded() {
        this.isFullyExpanded = true;
        document.body.classList.remove('expansion-locked');
        this.container.classList.remove('expanding');
        this.showContent();
    }

    showContent() {
        if (this.content) {
            this.content.classList.add('visible');
        }
        // Hide initial CTA when content is shown
        const initialCTA = this.container.querySelector('.expansion-initial-cta');
        if (initialCTA) {
            initialCTA.style.display = 'none';
        }
    }

    hideContent() {
        if (this.content) {
            this.content.classList.remove('visible');
        }
        // Show initial CTA when content is hidden
        const initialCTA = this.container.querySelector('.expansion-initial-cta');
        if (initialCTA) {
            initialCTA.style.display = 'block';
        }
    }

    handleAnchorLinks() {
        // Find all anchor links that point to sections on the page
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle if it's a section link (not just #)
                if (href && href !== '#' && href.length > 1) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement && !this.isFullyExpanded) {
                        e.preventDefault();

                        // Animate the expansion to completion
                        this.scrollProgress = 1;
                        this.updateExpansion();

                        // Mark as fully expanded
                        this.isFullyExpanded = true;
                        document.body.classList.remove('expansion-locked');
                        this.container.classList.remove('expanding');
                        this.showContent();

                        // Wait a bit for the expansion animation, then scroll to target
                        setTimeout(() => {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 300);
                    }
                }
            });
        });
    }

    destroy() {
        window.removeEventListener('wheel', this.handleWheel.bind(this));
        window.removeEventListener('touchstart', this.handleTouchStart.bind(this));
        window.removeEventListener('touchmove', this.handleTouchMove.bind(this));
        window.removeEventListener('touchend', this.handleTouchEnd.bind(this));
        window.removeEventListener('scroll', this.handleScroll.bind(this));
        window.removeEventListener('resize', this.handleResize.bind(this));
        document.body.classList.remove('expansion-locked');
    }
}

// Auto-initialize if element exists
document.addEventListener('DOMContentLoaded', () => {
    const heroElement = document.querySelector('.scroll-expansion-hero');
    if (heroElement) {
        window.scrollExpansionHero = new ScrollExpansionHero('.scroll-expansion-hero');
    }
});
