tailwind.config = {
	theme: {
		extend: {
			colors: {
				primary: '#606c38',
				secondary: '#fefae0',
				accent: '#bc6c25',
				'primary-dark': '#4a5429',
				'accent-dark': '#9d5620'
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif']
			}
		}
	}
}

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