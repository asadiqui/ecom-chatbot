tailwind.config = {
	theme: {
		extend: {
			colors: {
                primary: '#606c38',
                'primary': '#606c38',
				'forest-green': '#606c38',
				secondary: '#fefae0',
                'secondary': '#fefae0',
				'cream': '#fefae0',
				accent: '#bc6c25',
                'accent': '#bc6c25',
				'burnt-orange': '#bc6c25',
				'primary-dark': '#4a5429',
				'accent-dark': '#9d5620',
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
                'sans': ['Inter', 'system-ui', 'sans-serif']
			}
		}
	}
}

// Modern JavaScript functionality for 404 page

// Enhanced search functionality
function performSearch() {
    const searchTerm = document.getElementById('errorSearch').value.trim();
    if (searchTerm) {
        // Add loading state
        const searchButton = document.querySelector('button[onclick="performSearch()"]');
        const originalContent = searchButton.innerHTML;
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchButton.disabled = true;
        
        // Simulate search processing (in real app, this would be an API call)
        setTimeout(() => {
            window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        }, 500);
    } else {
        // Show error state for empty search
        const searchInput = document.getElementById('errorSearch');
        searchInput.classList.add('border-red-500', 'animate-pulse');
        searchInput.placeholder = 'Please enter a search term...';
        
        setTimeout(() => {
            searchInput.classList.remove('border-red-500', 'animate-pulse');
            searchInput.placeholder = 'Search our flower collection...';
        }, 2000);
    }
}

// Enhanced input handling
function initSearchInput() {
    const searchInput = document.getElementById('errorSearch');
    
    // Enter key functionality
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Input focus effects
    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('ring-2', 'ring-sage', 'ring-opacity-50');
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('ring-2', 'ring-sage', 'ring-opacity-50');
    });
    
    // Real-time search suggestions (placeholder for future enhancement)
    searchInput.addEventListener('input', function() {
        const value = this.value.trim();
        if (value.length > 2) {
            // In a real app, you would show search suggestions here
            console.log(`Searching for: ${value}`);
        }
    });
}

// Initialize floating petals with enhanced randomization
function initFloatingPetals() {
    const petals = document.querySelectorAll('.petal');
    const petalEmojis = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '🌿', '🍃'];
    
    petals.forEach((petal, index) => {
        // Random emoji
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        
        // Random positioning
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        petal.style.left = randomX + '%';
        petal.style.top = randomY + '%';
        
        // Staggered animation delays
        petal.style.animationDelay = (index * 0.8 + Math.random() * 2) + 's';
        
        // Random scale
        const scale = 0.8 + Math.random() * 0.4;
        petal.style.transform = `scale(${scale})`;
    });
}

// Smooth scroll functionality for internal links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.style.display = '';
        mobileMenuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        const nav = document.querySelector('.main-nav');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
        }
    });

    // Header underline animation on nav-link hover (desktop)
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    headerContainer.classList.add('nav-underline-active');
                }
            });
            link.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    headerContainer.classList.remove('nav-underline-active');
                }
            });
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .quick-link').forEach(el => {
        observer.observe(el);
    });
}

// Add to cart functionality with visual feedback
function initAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Visual feedback
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Adding...';
            this.disabled = true;
            
            // Simulate adding to cart
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
                this.classList.remove('from-rust', 'to-rust/90');
                this.classList.add('from-green-500', 'to-green-600');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.classList.remove('from-green-500', 'to-green-600');
                    this.classList.add('from-rust', 'to-rust/90');
                }, 2000);
            }, 1000);
        });
    });
}

// Enhanced error visual effects
function initErrorVisualEffects() {
    const errorNumber = document.querySelector('.error-number');
    const flowerZero = document.querySelector('.flower-zero');
    
    // Add hover effects to error number
    if (errorNumber) {
        errorNumber.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        errorNumber.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Interactive flower animation
    if (flowerZero) {
        flowerZero.addEventListener('click', function() {
            const flower = this.querySelector('div');
            flower.style.animation = 'none';
            flower.offsetHeight; // Trigger reflow
            flower.style.animation = 'spin-slow 2s linear';
            
            // Add temporary glow effect
            flower.classList.add('shadow-2xl', 'shadow-sage/50');
            setTimeout(() => {
                flower.classList.remove('shadow-2xl', 'shadow-sage/50');
                flower.style.animation = 'spin-slow 8s linear infinite';
            }, 2000);
        });
    }
}

// Parallax scroll effect for background elements
function initParallaxEffect() {
    const decorativeElements = document.querySelectorAll('.absolute.opacity-10 > div');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        decorativeElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Loading animation for page transitions
function initPageTransitions() {
    document.querySelectorAll('a[href*=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply to internal links
            if (!href.startsWith('http') && !href.startsWith('mailto')) {
                e.preventDefault();
                
                // Create loading overlay
                const overlay = document.createElement('div');
                overlay.className = 'fixed inset-0 bg-cream/90 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300';
                overlay.innerHTML = `
                    <div class="text-center">
                        <div class="animate-spin w-12 h-12 border-4 border-sage border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p class="text-sage font-medium">Loading...</p>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                // Navigate after brief delay
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('errorSearch');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.blur();
            }
        }
        
        // Quick navigation shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'h':
                    e.preventDefault();
                    window.location.href = 'home.html';
                    break;
                case 'p':
                    e.preventDefault();
                    window.location.href = 'products.html';
                    break;
                case '/':
                    e.preventDefault();
                    document.getElementById('errorSearch').focus();
                    break;
            }
        }
    });
}

// Performance optimization - Lazy load images
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        imageObserver.observe(img);
    });
}

// Easter egg - Konami code
function initEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let currentSequence = [];
    
    document.addEventListener('keydown', function(e) {
        currentSequence.push(e.keyCode);
        
        if (currentSequence.length > konamiCode.length) {
            currentSequence.shift();
        }
        
        if (JSON.stringify(currentSequence) === JSON.stringify(konamiCode)) {
            // Trigger special animation
            document.querySelectorAll('.petal').forEach(petal => {
                petal.style.animation = 'none';
                petal.style.fontSize = '6rem';
                petal.style.animation = 'float-petal-1 1s ease-in-out infinite';
            });
            
            // Show congratulations message
            const message = document.createElement('div');
            message.className = 'fixed top-4 right-4 bg-sage text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
            message.textContent = '🌸 Secret garden unlocked! 🌸';
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
            
            currentSequence = [];
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initSearchInput();
    initFloatingPetals();
    initSmoothScroll();
    initMobileMenu();
    initScrollAnimations();
    initAddToCartButtons();
    initErrorVisualEffects();
    initParallaxEffect();
    initPageTransitions();
    initKeyboardNavigation();
    initLazyLoading();
    initEasterEgg();
    
    // Add fade-in animation to main content
    document.body.classList.add('opacity-0');
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
        document.body.classList.add('opacity-100', 'transition-opacity', 'duration-1000');
    }, 100);
    
    console.log('🌸 Zehrat Bladi 404 page loaded with modern enhancements!');
});

// Service worker registration for performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}