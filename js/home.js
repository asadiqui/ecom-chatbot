tailwind.config = {
	theme: {
		extend: {
			colors: {
				'forest-green': '#606c38',
				'cream': '#fefae0',
				'burnt-orange': '#bc6c25'
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
			}
		}
	}
}

// Modern slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
	slides.forEach((slide, i) => {
		slide.classList.remove('current');
		slide.style.opacity = '0';
		slide.style.transform = 'translateX(100%)';
		
		if (i === index) {
			slide.classList.add('current');
			slide.style.opacity = '1';
			slide.style.transform = 'translateX(0)';
		}
	});
}

function nextSlide() {
	currentSlide = (currentSlide + 1) % totalSlides;
	showSlide(currentSlide);
}

function prevSlide() {
	currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
	showSlide(currentSlide);
}

// Event listeners
document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);

// Auto-play slider
let autoSlide = setInterval(nextSlide, 5000);
		
// Pause auto-play on hover
document.querySelector('.slider').addEventListener('mouseenter', () => {
	clearInterval(autoSlide);
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
	autoSlide = setInterval(nextSlide, 5000);
});

// Initialize
showSlide(0);

// Add to cart functionality with modern feedback
document.querySelectorAll('.add-to-cart').forEach(button => {
	button.addEventListener('click', function() {
		const originalText = this.textContent;
		this.textContent = 'Added!';
		this.classList.add('bg-green-500');
		this.classList.remove('bg-forest-green');
		
		setTimeout(() => {
			this.textContent = originalText;
			this.classList.remove('bg-green-500');
			this.classList.add('bg-forest-green');
		}, 1500);
	});
});
		
// Smooth scrolling for internal links
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

// Add scroll effects
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const header = document.querySelector('header');
		
	if (scrolled > 100) {
		header.classList.add('backdrop-blur-sm', 'bg-white/95');
	} else {
		header.classList.remove('backdrop-blur-sm', 'bg-white/95');
	}
});

// Mobile Menu Functionality
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.overlay = document.getElementById('mobile-menu-overlay');
        this.hamburgerIcon = document.getElementById('hamburger-icon');
        this.closeIcon = document.getElementById('close-icon');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Toggle menu on button click
        this.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Close menu when clicking overlay
        this.overlay.addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.mobileMenu.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu on window resize to desktop breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isOpen) { // md breakpoint
                this.closeMenu();
            }
        });
        
        // Close menu when clicking on menu links
        const menuLinks = this.mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        this.mobileMenu.classList.remove('translate-x-full');
        this.mobileMenu.classList.add('translate-x-0');
        this.overlay.classList.remove('hidden');
        this.hamburgerIcon.classList.add('hidden');
        this.closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }
    
    closeMenu() {
        this.isOpen = false;
        this.mobileMenu.classList.remove('translate-x-0');
        this.mobileMenu.classList.add('translate-x-full');
        this.overlay.classList.add('hidden');
        this.hamburgerIcon.classList.remove('hidden');
        this.closeIcon.classList.add('hidden');
        document.body.style.overflow = ''; // Restore body scroll
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new ImageSlider();
});
