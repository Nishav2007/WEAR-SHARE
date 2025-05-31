// Mobile Menu Toggle
const mobileMenu = {
    init() {
        this.hamburger = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.main-nav');
        this.header = document.querySelector('.main-header');
        this.bindEvents();
    },

    bindEvents() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking a link
        this.nav?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.nav?.classList.contains('active') && 
                !this.nav.contains(e.target) && 
                !this.hamburger?.contains(e.target)) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        this.nav?.classList.toggle('active');
        this.hamburger?.classList.toggle('active');
    },

    closeMenu() {
        this.nav?.classList.remove('active');
        this.hamburger?.classList.remove('active');
    }
};

// Smooth Scrolling
const smoothScroll = {
    init() {
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

// Sticky Header
const stickyHeader = {
    init() {
        this.header = document.querySelector('.main-header');
        this.headerHeight = this.header?.offsetHeight || 0;
        this.scrollThreshold = 100;
        this.bindEvents();
    },

    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
    },

    handleScroll() {
        if (!this.header) return;
        
        if (window.scrollY > this.scrollThreshold) {
            this.header.classList.add('sticky');
        } else {
            this.header.classList.remove('sticky');
        }
    }
};

// Scroll to Top Button
const scrollToTop = {
    init() {
        this.createButton();
        this.bindEvents();
    },

    createButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '⬆️';
        button.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(button);
        this.button = button;
    },

    bindEvents() {
        window.addEventListener('scroll', () => this.toggleButtonVisibility());
        this.button?.addEventListener('click', () => this.scrollToTop());
    },

    toggleButtonVisibility() {
        if (!this.button) return;
        
        if (window.scrollY > 400) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Lazy Loading Images
const lazyLoad = {
    init() {
        this.images = document.querySelectorAll('img[data-src]');
        this.setupIntersectionObserver();
    },

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    },

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu.init();
    smoothScroll.init();
    stickyHeader.init();
    scrollToTop.init();
    lazyLoad.init();
}); 