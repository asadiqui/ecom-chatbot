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

// Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const parallax = document.querySelector('.products-hero');
	if (parallax) {
		const speed = scrolled * 0.5;
		parallax.style.transform = `translateY(${speed}px)`;
	}
});

// Modern JavaScript for enhanced interactions
document.addEventListener('DOMContentLoaded', function () {
	// Add fade-in animation delay for product cards
	const productCards = document.querySelectorAll('.product-card');
	productCards.forEach((card, index) => {
		card.style.animationDelay = `${index * 0.1}s`;
	});

	// --- Begin robust pagination, filtering, and sorting logic from global.js ---
	const productSearch = document.getElementById('product-search');
	const sortBy = document.getElementById('sort-by');
	const filterBy = document.getElementById('filter-by');
	const genderFilter = document.getElementById('gender-filter');
	// const productCards = document.querySelectorAll('.product-card');
	const searchBtn = document.getElementById('search-btn');

	function getURLParams() {
		const urlParams = new URLSearchParams(window.location.search);
		return {
			query: urlParams.get('search') || '',
			occasion: urlParams.get('occasion') || 'all',
			gender: urlParams.get('gender') || 'all',
			sort: urlParams.get('sort') || '',
			page: parseInt(urlParams.get('page')) || 1
		};
	}

	function updateURL(query, occasion, gender, sort, page = 1) {
		const params = new URLSearchParams();
		if (query && query.trim()) params.set('search', query.trim());
		if (occasion && occasion !== 'all') params.set('occasion', occasion);
		if (gender && gender !== 'all') params.set('gender', gender);
		if (sort) params.set('sort', sort);
		if (page > 1) params.set('page', page);
		const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
		window.history.replaceState({}, '', newURL);
	}

	function initializeFromURL() {
		const params = getURLParams();
		if (productSearch && params.query) productSearch.value = params.query;
		if (filterBy && params.occasion) filterBy.value = params.occasion;
		if (genderFilter && params.gender) genderFilter.value = params.gender;
		if (sortBy && params.sort) sortBy.value = params.sort;
		return params;
	}

	function animateProductCards() {
		const visibleCards = document.querySelectorAll('.product-card:not([style*="display: none"])');
		visibleCards.forEach((card, index) => {
			card.style.opacity = '0';
			card.style.transform = 'translateY(20px)';
			setTimeout(() => {
				card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
				card.style.opacity = '1';
				card.style.transform = 'translateY(0)';
			}, index * 50);
		});
	}

	function updateResultsCounter() {
		const visibleProducts = Array.from(productCards).filter(card => {
			return card.classList.contains('search-match') && card.classList.contains('category-match') && card.style.display !== 'none';
		});
		let resultsCounter = document.querySelector('.results-counter');
		if (!resultsCounter) {
			resultsCounter = document.createElement('div');
			resultsCounter.className = 'results-counter text-sm text-gray-600 mb-4';
			const productGrid = document.querySelector('.product-grid');
			if (productGrid && productGrid.parentNode) {
				productGrid.parentNode.insertBefore(resultsCounter, productGrid);
			}
		}
		const totalVisible = Array.from(productCards).filter(card => {
			return card.classList.contains('search-match') && card.classList.contains('category-match');
		}).length;
		resultsCounter.innerHTML = `
		<span class="font-medium text-[#606c38]">${totalVisible}</span> 
		product${totalVisible !== 1 ? 's' : ''} found
		${visibleProducts.length < totalVisible ? ` (showing ${visibleProducts.length})` : ''}
	`;
	}

	if (productSearch && sortBy && filterBy) {
		const urlParams = initializeFromURL();
		productCards.forEach(card => {
			card.classList.add('search-match', 'category-match');
			card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
		});

		function searchProducts(searchTerm = null) {
			const query = searchTerm !== null ? searchTerm : productSearch.value.toLowerCase();
			let hasResults = false;
			productCards.forEach(card => {
				const productName = card.querySelector('h3').textContent.toLowerCase();
				const productDescription = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
				const searchableText = productName + ' ' + productDescription;
				if (!query || searchableText.includes(query)) {
					card.classList.add('search-match');
					hasResults = true;
				} else {
					card.classList.remove('search-match');
				}
			});
			showNoResultsMessage(!hasResults);
			updateCurrentURL();
		}

		function showNoResultsMessage(show) {
			let noResultsMsg = document.querySelector('.no-results-message');
			if (show && !noResultsMsg) {
				noResultsMsg = document.createElement('div');
				noResultsMsg.className = 'no-results-message text-center py-12 px-4';
				noResultsMsg.innerHTML = `
				<div class="max-w-md mx-auto">
					<div class="text-6xl mb-4">🔍</div>
					<h3 class="text-xl font-semibold text-[#606c38] mb-2">No products found</h3>
					<p class="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
					<button onclick="clearAllFilters()" class="bg-[#bc6c25] text-white px-6 py-2 rounded-lg hover:bg-[#a85a1f] transition-colors">
						Clear All Filters
					</button>
				</div>
			`;
				const productGrid = document.querySelector('.product-grid');
				if (productGrid && productGrid.parentNode) {
					productGrid.parentNode.appendChild(noResultsMsg);
				}
			} else if (!show && noResultsMsg) {
				noResultsMsg.remove();
			}
		}

		window.clearAllFilters = function () {
			if (productSearch) productSearch.value = '';
			if (filterBy) filterBy.value = 'all';
			if (genderFilter) genderFilter.value = 'all';
			if (sortBy) sortBy.value = '';
			productCards.forEach(card => {
				card.classList.add('search-match', 'category-match');
				card.style.display = 'block';
			});
			updateURL('', 'all', 'all', '', 1);
			showNoResultsMessage(false);
			updateResultsCounter();
			const paginationSection = document.querySelector('.pagination');
			if (paginationSection) {
				displayProductsForPage(1);
			}
		};

		function updateCurrentURL(pageNum = 1) {
			const query = productSearch.value;
			const occasion = filterBy ? filterBy.value : 'all';
			const gender = genderFilter ? genderFilter.value : 'all';
			const sort = sortBy ? sortBy.value : '';
			updateURL(query, occasion, gender, sort, pageNum);
		}

		function sortProducts(sortValue) {
			if (!sortValue) return;
			setTimeout(() => {
				const productsArray = Array.from(productCards);
				switch (sortValue) {
					case 'price-low':
						productsArray.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
						break;
					case 'price-high':
						productsArray.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
						break;
					case 'name-asc':
						productsArray.sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
						break;
					case 'name-desc':
						productsArray.sort((a, b) => b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent));
						break;
					default:
						return;
				}
				const productGrid = document.querySelector('.product-grid');
				productsArray.forEach(card => productGrid.appendChild(card));
				animateProductCards();
			}, 200);
		}

		function applyFilters() {
			const occasionValue = filterBy ? filterBy.value : 'all';
			const genderValue = genderFilter ? genderFilter.value : 'all';
			let hasResults = false;
			productCards.forEach(card => {
				const occasionMatch = occasionValue === 'all' || card.dataset.category.split(' ').includes(occasionValue);
				const genderMatch = genderValue === 'all' || card.dataset.gender.split(' ').includes(genderValue);
				if (occasionMatch && genderMatch) {
					card.classList.add('category-match');
					if (card.classList.contains('search-match')) hasResults = true;
				} else {
					card.classList.remove('category-match');
				}
			});
			const totalVisible = Array.from(productCards).filter(card => card.classList.contains('search-match') && card.classList.contains('category-match')).length;
			showNoResultsMessage(totalVisible === 0);
			updateCurrentURL();
		}

		const paginationSection = document.querySelector('.pagination');
		if (paginationSection) {
			const productsPerPage = 8;
			let currentPage = urlParams.page;

			function goToPage(pageNum) {
				currentPage = pageNum;
				displayProductsForPage(currentPage);
				updateCurrentURL(currentPage);
				const allProducts = document.querySelector('.all-products');
				if (allProducts) {
					allProducts.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			}

			function goToNextPage() {
				const visibleProducts = Array.from(document.querySelectorAll('.product-card')).filter(card => card.classList.contains('search-match') && card.classList.contains('category-match'));
				const totalPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage));
				if (currentPage < totalPages) {
					currentPage++;
					displayProductsForPage(currentPage);
					updateCurrentURL(currentPage);
				}
			}

			function goToPreviousPage() {
				if (currentPage > 1) {
					currentPage--;
					displayProductsForPage(currentPage);
					updateCurrentURL(currentPage);
				}
			}

			function renderPaginationButtons(currentPage, totalPages) {
				paginationSection.innerHTML = '';
				if (totalPages <= 1) return;
				const prevButton = document.createElement('button');
				prevButton.className = `page-btn previous px-3 py-2 rounded-lg border transition-all duration-200 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#606c38] border-[#606c38] hover:bg-[#606c38] hover:text-white'}`;
				prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
				prevButton.disabled = currentPage === 1;
				prevButton.addEventListener('click', goToPreviousPage);
				paginationSection.appendChild(prevButton);
				let startPage = 1;
				let endPage = totalPages;
				if (totalPages > 5) {
					startPage = Math.max(1, currentPage - 2);
					endPage = startPage + 4;
					if (endPage > totalPages) {
						endPage = totalPages;
						startPage = Math.max(1, endPage - 4);
					}
				}
				for (let i = startPage; i <= endPage; i++) {
					const pageButton = document.createElement('button');
					pageButton.className = `page-btn px-3 py-2 rounded-lg border transition-all duration-200 ${i === currentPage ? 'bg-[#606c38] text-white border-[#606c38]' : 'bg-white text-[#606c38] border-gray-300 hover:bg-[#606c38] hover:text-white hover:border-[#606c38]'}`;
					pageButton.textContent = i;
					pageButton.addEventListener('click', (function (pageNum) {
						return function () {
							goToPage(pageNum);
						};
					})(i));
					paginationSection.appendChild(pageButton);
				}
				const nextButton = document.createElement('button');
				nextButton.className = `page-btn next px-3 py-2 rounded-lg border transition-all duration-200 ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#606c38] border-[#606c38] hover:bg-[#606c38] hover:text-white'}`;
				nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
				nextButton.disabled = currentPage === totalPages || totalPages === 0;
				nextButton.addEventListener('click', goToNextPage);
				paginationSection.appendChild(nextButton);
			}

			function displayProductsForPage(pageNum) {
				productCards.forEach(card => {
					card.style.opacity = '0';
					setTimeout(() => {
						card.style.display = 'none';
					}, 150);
				});
				setTimeout(() => {
					const visibleProducts = Array.from(document.querySelectorAll('.product-card')).filter(card => card.classList.contains('search-match') && card.classList.contains('category-match'));
					const totalPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage));
					if (currentPage > totalPages) currentPage = totalPages;
					const startIndex = (pageNum - 1) * productsPerPage;
					const endIndex = Math.min(startIndex + productsPerPage, visibleProducts.length);
					visibleProducts.slice(startIndex, endIndex).forEach((card, index) => {
						card.style.display = 'block';
						setTimeout(() => {
							card.style.opacity = '1';
						}, index * 50);
					});
					renderPaginationButtons(currentPage, totalPages);
					updateResultsCounter();
				}, 200);
			}

			function updateProductsAndPagination() {
				currentPage = 1;
				displayProductsForPage(currentPage);
				updateCurrentURL(currentPage);
				animateProductCards();
			}

			let searchTimeout;
			productSearch.addEventListener('input', function () {
				clearTimeout(searchTimeout);
				searchTimeout = setTimeout(() => {
					searchProducts();
					updateProductsAndPagination();
				}, 300);
			});
			if (searchBtn) {
				searchBtn.addEventListener('click', function () {
					searchProducts();
					updateProductsAndPagination();
				});
			}
			filterBy.addEventListener('change', function () {
				applyFilters();
				updateProductsAndPagination();
			});
			if (genderFilter) {
				genderFilter.addEventListener('change', function () {
					applyFilters();
					updateProductsAndPagination();
				});
			}
			sortBy.addEventListener('change', function () {
				const sortValue = this.value;
				sortProducts(sortValue);
				updateProductsAndPagination();
			});
			if (urlParams.query) searchProducts(urlParams.query);
			if (urlParams.occasion !== 'all' || urlParams.gender !== 'all') applyFilters();
			if (urlParams.sort) sortProducts(urlParams.sort);
			displayProductsForPage(currentPage);
		}
		updateResultsCounter();
	}
	// --- End robust pagination, filtering, and sorting logic ---


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

		if (!nav.contains(e.target) && !toggle.contains(e.target)) {
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

// Loading animation for page transitions
function initPageTransitions() {
	document.querySelectorAll('a[href*=".html"]').forEach(link => {
		link.addEventListener('click', function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
	initPageTransitions();
});