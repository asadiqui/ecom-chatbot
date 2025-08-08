tailwind.config = {
	theme: {
		extend: {
			colors: {
                primary: '#606c38',
                'primary': '#606c38',
				'forest-green': '#606c38',
                'sage': '#606c38',
				secondary: '#fefae0',
                'secondary': '#fefae0',
				'cream': '#fefae0',
				accent: '#bc6c25',
                'accent': '#bc6c25',
				'burnt-orange': '#bc6c25',
                'rust': '#bc6c25',
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

// Form handling with modern animations
document.getElementById('contactForm').addEventListener('submit', function(e) {
	e.preventDefault();
		
	const formMessage = document.getElementById('form-message');
	const submitBtn = e.target.querySelector('button[type="submit"]');
		
	// Show loading state
	submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
	submitBtn.disabled = true;
		
	// Simulate form submission
	setTimeout(() => {
		formMessage.className = 'form-message show bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl';
		formMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Thank you! Your message has been sent successfully.';
		
		// Reset form
		e.target.reset();
		submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
		submitBtn.disabled = false;
		
		// Hide message after 5 seconds
		setTimeout(() => {
			formMessage.classList.remove('show');
		}, 5000);
	}, 2000);
});

// Animate elements on scroll
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate-fade-in');
		}
	});
}, observerOptions);

// Observe all elements that should animate
document.querySelectorAll('.card-hover, .animate-fade-in').forEach(el => {
	observer.observe(el);
});

 // Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const parallax = document.querySelector('.hero-gradient');
	if (parallax) {
		const speed = scrolled * 0.5;
		parallax.style.transform = `translateY(${speed}px)`;
	}
});

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
                }, 250);
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
});