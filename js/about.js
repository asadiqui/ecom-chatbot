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