// Modern JavaScript for enhanced interactions
document.addEventListener('DOMContentLoaded', function () {
	// Add fade-in animation delay for product cards
	const productCards = document.querySelectorAll('.product-card');
	productCards.forEach((card, index) => {
		card.style.animationDelay = `${index * 0.1}s`;
	});

	// Search functionality
	const searchInput = document.getElementById('product-search');
	const searchBtn = document.getElementById('search-btn');

	function performSearch() {
		const searchTerm = searchInput.value.toLowerCase().trim();
		productCards.forEach(card => {
			const productName = card.querySelector('h3').textContent.toLowerCase();
			if (productName.includes(searchTerm) || searchTerm === '') {
				card.style.display = 'block';
				card.classList.add('fade-in');
			} else {
				card.style.display = 'none';
			}
		});
	}

	searchBtn.addEventListener('click', performSearch);
	searchInput.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			performSearch();
		}
	});

	// Filter functionality
	const sortSelect = document.getElementById('sort-by');
	const genderSelect = document.getElementById('gender-filter');
	const occasionSelect = document.getElementById('filter-by');

	function applyFilters() {
		const sortValue = sortSelect.value;
		const genderValue = genderSelect.value;
		const occasionValue = occasionSelect.value;

		let visibleCards = Array.from(productCards).filter(card => {
			const cardGender = card.getAttribute('data-gender');
			const cardCategory = card.getAttribute('data-category');

			const genderMatch = genderValue === 'all' || cardGender === genderValue;
			const occasionMatch = occasionValue === 'all' || cardCategory === occasionValue;

			return genderMatch && occasionMatch;
		});

		// Hide all cards first
		productCards.forEach(card => {
			card.style.display = 'none';
		});

		// Sort visible cards
		if (sortValue !== 'default') {
			visibleCards.sort((a, b) => {
				const priceA = parseFloat(a.getAttribute('data-price'));
				const priceB = parseFloat(b.getAttribute('data-price'));
				const nameA = a.querySelector('h3').textContent;
				const nameB = b.querySelector('h3').textContent;

				switch (sortValue) {
					case 'price-low':
						return priceA - priceB;
					case 'price-high':
						return priceB - priceA;
					case 'name-asc':
						return nameA.localeCompare(nameB);
					case 'name-desc':
						return nameB.localeCompare(nameA);
					default:
						return 0;
				}
			});
		}

		// Show and reorder visible cards
		const productGrid = document.querySelector('.product-grid');
		visibleCards.forEach(card => {
			card.style.display = 'block';
			productGrid.appendChild(card);
		});
	}

	sortSelect.addEventListener('change', applyFilters);
	genderSelect.addEventListener('change', applyFilters);
	occasionSelect.addEventListener('change', applyFilters);

	// Add to cart functionality with animation
	const addToCartButtons = document.querySelectorAll('.add-to-cart');
	addToCartButtons.forEach(button => {
		button.addEventListener('click', function () {
			const originalText = this.textContent;
			this.textContent = 'Added!';
			this.style.background = '#22c55e';

			setTimeout(() => {
				this.textContent = originalText;
				this.style.background = '';
			}, 1500);
		});
	});

	// Scroll to top functionality
	const scrollToTopBtn = document.getElementById('scrollToTop');

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 300) {
			scrollToTopBtn.classList.add('visible');
		} else {
			scrollToTopBtn.classList.remove('visible');
		}
	});

	scrollToTopBtn.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	// Smooth scroll for navigation links
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

	// Add loading effect to images
	const images = document.querySelectorAll('img');
	images.forEach(img => {
		img.addEventListener('load', function () {
			this.style.opacity = '1';
		});

		// Set initial opacity for loading effect
		img.style.opacity = '0';
		img.style.transition = 'opacity 0.3s ease';

		// If image is already loaded (cached)
		if (img.complete) {
			img.style.opacity = '1';
		}
	});

	// Intersection Observer for scroll animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe elements for scroll animations
	document.querySelectorAll('.product-card, .filter-container').forEach(el => {
		observer.observe(el);
	});

	// Enhanced hover effects for product cards
	productCards.forEach(card => {
		card.addEventListener('mouseenter', function () {
			this.style.transform = 'translateY(-8px) scale(1.02)';
		});

		card.addEventListener('mouseleave', function () {
			this.style.transform = 'translateY(0) scale(1)';
		});
	});

	// Pagination functionality (if needed in future)
	function createPagination(totalItems, itemsPerPage = 6) {
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const paginationContainer = document.querySelector('.pagination');

		if (totalPages <= 1) return;

		paginationContainer.innerHTML = '';

		for (let i = 1; i <= totalPages; i++) {
			const button = document.createElement('button');
			button.textContent = i;
			button.classList.add('pagination-btn');
			if (i === 1) button.classList.add('active');

			button.addEventListener('click', function () {
				// Remove active class from all buttons
				document.querySelectorAll('.pagination-btn').forEach(btn => {
					btn.classList.remove('active');
				});
				// Add active class to clicked button
				this.classList.add('active');

				// Show/hide products based on page
				const startIndex = (i - 1) * itemsPerPage;
				const endIndex = startIndex + itemsPerPage;

				productCards.forEach((card, index) => {
					if (index >= startIndex && index < endIndex) {
						card.style.display = 'block';
					} else {
						card.style.display = 'none';
					}
				});

				// Scroll to products section
				document.querySelector('.all-products').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			});

			paginationContainer.appendChild(button);
		}
	}

	// Initialize pagination if there are many products
	// createPagination(productCards.length, 6);

	// Add ripple effect to buttons
	function createRipple(event) {
		const button = event.currentTarget;
		const circle = document.createElement('span');
		const diameter = Math.max(button.clientWidth, button.clientHeight);
		const radius = diameter / 2;

		circle.style.width = circle.style.height = `${diameter}px`;
		circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
		circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
		circle.classList.add('ripple');

		const ripple = button.getElementsByClassName('ripple')[0];
		if (ripple) {
			ripple.remove();
		}

		button.appendChild(circle);
	}

	// Add ripple effect CSS
	const rippleStyle = document.createElement('style');
	rippleStyle.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    background-color: rgba(255, 255, 255, 0.6);
                    pointer-events: none;
                }

                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }

                button {
                    position: relative;
                    overflow: hidden;
                }
            `;
	document.head.appendChild(rippleStyle);

	// Apply ripple effect to buttons
	addToCartButtons.forEach(button => {
		button.addEventListener('click', createRipple);
	});

	// Mobile menu toggle (if needed for responsive design)
	const mobileMenuToggle = document.createElement('button');
	mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
	mobileMenuToggle.classList.add('mobile-menu-toggle');
	mobileMenuToggle.style.display = 'none';

	// Add mobile menu styles
	const mobileStyle = document.createElement('style');
	mobileStyle.textContent = `
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block !important;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 0.5rem;
                    }

                    .main-nav {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: var(--primary-color);
                        box-shadow: var(--shadow-lg);
                    }

                    .main-nav.active {
                        display: block;
                    }

                    .main-nav ul {
                        flex-direction: column;
                        padding: 1rem;
                    }
                }
            `;
	document.head.appendChild(mobileStyle);

	// Add mobile menu toggle to header
	document.querySelector('.header-container').appendChild(mobileMenuToggle);

	mobileMenuToggle.addEventListener('click', function () {
		const nav = document.querySelector('.main-nav');
		nav.classList.toggle('active');
	});

	// Close mobile menu when clicking outside
	document.addEventListener('click', function (e) {
		const nav = document.querySelector('.main-nav');
		const toggle = document.querySelector('.mobile-menu-toggle');

		if (!nav.contains(e.target) && !toggle.contains(e.target)) {
			nav.classList.remove('active');
		}
	});

	// Performance optimization: Debounce search function
	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	// Apply debounce to search
	const debouncedSearch = debounce(performSearch, 300);
	searchInput.addEventListener('input', debouncedSearch);

	console.log('Zehrat Bladi Flower Shop - Modern UI Loaded Successfully! 🌸');
});