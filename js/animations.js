// Typing Animation
const typingAnimation = {
    init() {
        this.phrases = [
            "Reducing Waste ♻️",
            "Spreading Kindness ❤️",
            "Changing Lives 🌍"
        ];
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.element = document.querySelector('.typing-text');
        if (this.element) {
            this.type();
        }
    },

    type() {
        const currentText = this.phrases[this.currentPhrase];
        const speed = this.isDeleting ? 50 : 150;

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentChar - 1);
            this.currentChar--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentChar + 1);
            this.currentChar++;
        }

        if (!this.isDeleting && this.currentChar === currentText.length) {
            setTimeout(() => {
                this.isDeleting = true;
            }, 1500);
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
        }

        setTimeout(() => this.type(), speed);
    }
};

// Progress Bar Animation
const progressBar = {
    init() {
        this.bar = document.querySelector('.progress-bar');
        if (this.bar) {
            this.animate();
        }
    },

    animate() {
        const target = parseInt(this.bar.getAttribute('data-target'));
        const current = parseInt(this.bar.getAttribute('data-current'));
        const percent = (current / target) * 100;
        
        this.bar.style.width = '0%';
        setTimeout(() => {
            this.bar.style.width = `${percent}%`;
        }, 500);
    }
};

// Testimonial Carousel
const testimonialCarousel = {
    init() {
        this.testimonials = document.querySelector('.testimonials');
        this.currentSlide = 0;
        if (this.testimonials) {
            this.autoSlide();
            this.bindEvents();
        }
    },

    bindEvents() {
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.changeSlide(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => this.changeSlide(1));
    },

    changeSlide(direction) {
        const slides = document.querySelectorAll('.testimonial-slide');
        if (!slides.length) return;

        slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + direction + slides.length) % slides.length;
        slides[this.currentSlide].classList.add('active');
    },

    autoSlide() {
        setInterval(() => this.changeSlide(1), 5000);
    }
};

// Scroll Animations
const scrollAnimations = {
    init() {
        this.elements = document.querySelectorAll('.scroll-animate');
        this.windowHeight = window.innerHeight;
        this.animate();
        this.bindEvents();
    },

    bindEvents() {
        window.addEventListener('scroll', () => this.animate());
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
        });
    },

    animate() {
        const offset = 100;
        
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < this.windowHeight - offset) {
                element.classList.add('animated');
                
                // Add stagger effect to children
                const staggerItems = element.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, 200 * (index + 1));
                });
            }
        });
    }
};

// Hover Animations
const hoverAnimations = {
    init() {
        this.setupHoverEffects();
    },

    setupHoverEffects() {
        // Lift effect
        document.querySelectorAll('.hover-lift').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px)';
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });

        // Scale effect
        document.querySelectorAll('.hover-scale').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }
};

// Button pulse animation
const buttonAnimations = {
    init() {
        document.querySelectorAll('.btn-pulse').forEach(button => {
            button.addEventListener('click', function() {
                this.classList.add('pulse');
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 500);
            });
        });
    }
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    typingAnimation.init();
    progressBar.init();
    testimonialCarousel.init();
    scrollAnimations.init();
    hoverAnimations.init();
    buttonAnimations.init();
}); 