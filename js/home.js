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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
	// Mobile menu toggle
	const mobileMenuToggle = document.getElementById('mobileMenuToggle');
	if (mobileMenuToggle) {
		mobileMenuToggle.style.display = '';
		mobileMenuToggle.addEventListener('click', function () {
			const nav = document.querySelector('.main-nav');
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
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});
