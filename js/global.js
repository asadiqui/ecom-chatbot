// Slider functionality
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
let autoSlide = true;
let slideInterval;
const intervalTime = 5000;
let currentSlide = 0;

// Functions
function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('current');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('current');
    }
}

function prevSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('current');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('current');
    }
}

// Event listeners for slider
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        if (autoSlide) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        if (autoSlide) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    });

    // Auto slide functionality
    if (autoSlide && slides.length > 0) {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
}

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        const productName = this.parentElement.querySelector('h3').textContent;
        const productPrice = this.parentElement.querySelector('.price').textContent;
        
        // Create notification
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `
            <p>Added to cart: ${productName}</p>
            <p>${productPrice}</p>
        `;
        
        document.body.appendChild(notification);
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#e77e7e';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Animate button
        this.innerHTML = 'Added!';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.style.backgroundColor = '#333';
        }, 1500);
    });
});

// Shop now button functionality
const shopNowButtons = document.querySelectorAll('.shop-now');

shopNowButtons.forEach(button => {
    button.addEventListener('click', function() {
		if (this.classList.contains('wedding'))
			window.location.href = '/products.html?occasion=wedding';
		else
	        window.location.href = '/products.html';
    });
});

// Newsletter popup
window.addEventListener('load', function() {
    setTimeout(() => {
        showNewsletterPopup();
    }, 5000);
});

function showNewsletterPopup() {
    // Check if user has already seen the popup
    if (localStorage.getItem('newsletterPopupShown')) {
        return;
    }
    
    const popup = document.createElement('div');
    popup.classList.add('newsletter-popup');
    
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <h2>Join Our Flower Community</h2>
            <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form id="newsletter-form">
                <input type="email" placeholder="Your email address" required>
                <button type="submit">Subscribe</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Style popup
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0,0,0,0.7)';
    popup.style.zIndex = '2000';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s ease';
    
    const popupContent = popup.querySelector('.popup-content');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '30px';
    popupContent.style.borderRadius = '5px';
    popupContent.style.maxWidth = '500px';
    popupContent.style.width = '90%';
    popupContent.style.position = 'relative';
    popupContent.style.textAlign = 'center';
    
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#aaa';
    
    const emailInput = popup.querySelector('input[type="email"]');
    emailInput.style.width = '100%';
    emailInput.style.padding = '10px';
    emailInput.style.margin = '15px 0';
    emailInput.style.border = '1px solid #ddd';
    
    const submitBtn = popup.querySelector('button[type="submit"]');
    submitBtn.style.backgroundColor = '#e77e7e';
    submitBtn.style.color = 'white';
    submitBtn.style.border = 'none';
    submitBtn.style.padding = '10px 20px';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.marginTop = '10px';
    
    // Show popup with animation
    setTimeout(() => {
        popup.style.opacity = '1';
    }, 10);
    
    // Close popup event
    closeBtn.addEventListener('click', function() {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.remove();
        }, 300);
        
        // Set flag in localStorage
        localStorage.setItem('newsletterPopupShown', 'true');
    });
    
    // Submit form event
    const form = popup.querySelector('#newsletter-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value;
        
        // Here you would normally send the email to your server
        // For now, we'll just simulate success
        
        popupContent.innerHTML = `
            <h2>Thank You!</h2>
            <p>You've been subscribed with the email: ${email}</p>
            <p>Look out for our beautiful flower deals in your inbox soon!</p>
            <button id="close-success">Close</button>
        `;
        
        const closeSuccessBtn = popup.querySelector('#close-success');
        closeSuccessBtn.style.backgroundColor = '#e77e7e';
        closeSuccessBtn.style.color = 'white';
        closeSuccessBtn.style.border = 'none';
        closeSuccessBtn.style.padding = '10px 20px';
        closeSuccessBtn.style.cursor = 'pointer';
        closeSuccessBtn.style.marginTop = '20px';
        
        closeSuccessBtn.addEventListener('click', function() {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.remove();
            }, 300);
            
            // Set flag in localStorage
            localStorage.setItem('newsletterPopupShown', 'true');
        });
    });
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.src; // This would be replaced with actual lazy loading
                    imageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
			imageObserver.observe(image);
        });
    }
});

// Products page functionality
// Product filtering and sorting with URL parameter support
document.addEventListener('DOMContentLoaded', function() {
	const productSearch = document.getElementById('product-search');
    const sortBy = document.getElementById('sort-by');
    const filterBy = document.getElementById('filter-by');
	const genderFilter = document.getElementById('gender-filter');
    const productCards = document.querySelectorAll('.product-card');
    const searchBtn = document.getElementById('search-btn');
    
    // URL parameter handling functions
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
        
        const newURL = params.toString() ? 
            `${window.location.pathname}?${params.toString()}` : 
            window.location.pathname;
        
        window.history.replaceState({}, '', newURL);
    }

    function initializeFromURL() {
        const params = getURLParams();
        
        // Set form values from URL
        if (productSearch && params.query) {
            productSearch.value = params.query;
        }
        
        if (filterBy && params.occasion) {
            filterBy.value = params.occasion;
        }
        
        if (genderFilter && params.gender) {
            genderFilter.value = params.gender;
        }
        
        if (sortBy && params.sort) {
            sortBy.value = params.sort;
        }
        
        return params;
    }
    
    // Only run this code if we're on the products page
    if (productSearch && sortBy && filterBy) {
        // Initialize from URL parameters
        const urlParams = initializeFromURL();
        
        // Initialize class-based filtering
        productCards.forEach(card => {
            card.classList.add('search-match', 'category-match');
        });
        
        // Enhanced Search functionality with description search
        function searchProducts(searchTerm = null) {
            const query = searchTerm !== null ? searchTerm : productSearch.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
                const searchableText = productName + ' ' + productDescription;
                
                if (!query || searchableText.includes(query)) {
                    card.classList.add('search-match');
                } else {
                    card.classList.remove('search-match');
                }
            });
            
            // Update URL with current search state
            updateCurrentURL();
        }
        
        // Function to update URL with current state
        function updateCurrentURL(pageNum = 1) {
            const query = productSearch.value;
            const occasion = filterBy ? filterBy.value : 'all';
            const gender = genderFilter ? genderFilter.value : 'all';
            const sort = sortBy ? sortBy.value : '';
            
            updateURL(query, occasion, gender, sort, pageNum);
        }
        
        // Initialize event listeners for search with debouncing
        let searchTimeout;
        productSearch.addEventListener('keyup', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchProducts();
            }, 300); // 300ms debounce
        });
        
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                searchProducts();
            });
        }
        
        // Modified Sort functionality - now affects global order
        function sortProducts(sortValue) {
            const productsArray = Array.from(productCards);
            
            switch(sortValue) {
                case 'price-low':
                    productsArray.sort((a, b) => {
                        const priceA = parseFloat(a.dataset.price);
                        const priceB = parseFloat(b.dataset.price);
                        return priceA - priceB;
                    });
                    break;
                case 'price-high':
                    productsArray.sort((a, b) => {
                        const priceA = parseFloat(a.dataset.price);
                        const priceB = parseFloat(b.dataset.price);
                        return priceB - priceA;
                    });
                    break;
                case 'name-asc':
                    productsArray.sort((a, b) => {
                        const nameA = a.querySelector('h3').textContent;
                        const nameB = b.querySelector('h3').textContent;
                        return nameA.localeCompare(nameB);
                    });
                    break;
                case 'name-desc':
                    productsArray.sort((a, b) => {
                        const nameA = a.querySelector('h3').textContent;
                        const nameB = b.querySelector('h3').textContent;
                        return nameB.localeCompare(nameA);
                    });
                    break;
                default:
                    // Default, do nothing
                    return;
            }
            
            // Reorder DOM elements to match the sorted array
            const productGrid = document.querySelector('.product-grid');
            productsArray.forEach(card => {
                productGrid.appendChild(card);
            });
        }
        
        sortBy.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
            updateCurrentURL();
        });
        
        // Filter functionality - multiple filters
        function applyFilters() {
            const occasionValue = filterBy ? filterBy.value : 'all';
			const genderValue = genderFilter ? genderFilter.value : 'all';
            
            productCards.forEach(card => {
                // Check occasion filter
                const occasionMatch = occasionValue === 'all' || card.dataset.category.split(" ").includes(occasionValue);

                // Check gender filter  
                const genderMatch = genderValue === 'all' || card.dataset.gender.split(" ").includes(genderValue);

                // Product must match both filters
                if (occasionMatch && genderMatch) {
                    card.classList.add('category-match');
                } else {
                    card.classList.remove('category-match');
                }
            });
            
            // Update URL with current filter state
            updateCurrentURL();
        }
        
        // Event listeners for both filters
        filterBy.addEventListener('change', applyFilters);
        if (genderFilter) {
            genderFilter.addEventListener('change', applyFilters);
        }
        
        // Pagination functionality
        const paginationSection = document.querySelector('.pagination');
        if (paginationSection) {
            const productsPerPage = 8; // Number of products to show per page
            let currentPage = urlParams.page; // Initialize from URL
            
            // Function to go to a specific page
            function goToPage(pageNum) {
                currentPage = pageNum;
                displayProductsForPage(currentPage);
                updateCurrentURL(currentPage);
            }
            
            // Function to go to next page
            function goToNextPage() {
                // Get visible products in their current DOM order (after sorting)
                const visibleProducts = Array.from(document.querySelectorAll('.product-card')).filter(card => {
                    return card.classList.contains('search-match') && card.classList.contains('category-match');
                });
                const totalPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage));
                
                if (currentPage < totalPages) {
                    currentPage++;
                    displayProductsForPage(currentPage);
                    updateCurrentURL(currentPage);
                }
            }
            
            // Function to go to previous page
            function goToPreviousPage() {
                if (currentPage > 1) {
                    currentPage--;
                    displayProductsForPage(currentPage);
                    updateCurrentURL(currentPage);
                }
            }
            
            // Function to dynamically create pagination buttons
            function renderPaginationButtons(currentPage, totalPages) {
                // Clear existing buttons
                paginationSection.innerHTML = '';
                
                // Add previous button
                const prevButton = document.createElement('button');
                prevButton.className = 'page-btn previous';
                prevButton.innerHTML = '<i class="fas fa-angle-left"></i>';
                prevButton.disabled = currentPage === 1;
                prevButton.style.opacity = currentPage === 1 ? '0.5' : '1';
                prevButton.addEventListener('click', goToPreviousPage);
                paginationSection.appendChild(prevButton);
                
                // Logic for showing page numbers - we'll show at most 5 buttons
                let startPage = 1;
                let endPage = totalPages;
                
                // If more than 5 pages, calculate which ones to show
                if (totalPages > 5) {
                    // Always try to have current page in the middle when possible
                    startPage = Math.max(1, currentPage - 2);
                    endPage = startPage + 4;
                    
                    // Adjust if we're near the end
                    if (endPage > totalPages) {
                        endPage = totalPages;
                        startPage = Math.max(1, endPage - 4);
                    }
                }
                
                // Add page number buttons
                for (let i = startPage; i <= endPage; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.className = 'page-btn';
                    pageButton.textContent = i;
                    
                    if (i === currentPage) {
                        pageButton.classList.add('active');
                    }
                    
                    // Use closure to capture the page number
                    pageButton.addEventListener('click', (function(pageNum) {
                        return function() {
                            goToPage(pageNum);
                        };
                    })(i));
                    
                    paginationSection.appendChild(pageButton);
                }
                
                // Add next button
                const nextButton = document.createElement('button');
                nextButton.className = 'page-btn next';
                nextButton.innerHTML = '<i class="fas fa-angle-right"></i>';
                nextButton.disabled = currentPage === totalPages || totalPages === 0;
                nextButton.style.opacity = (currentPage === totalPages || totalPages === 0) ? '0.5' : '1';
                nextButton.addEventListener('click', goToNextPage);
                paginationSection.appendChild(nextButton);
            }
            
            // Function to display products for the current page
            function displayProductsForPage(pageNum) {
                // Hide all products first
                productCards.forEach(card => {
                    card.style.display = 'none';
                });
                
                // Get visible products in their current DOM order (respects sorting)
                const visibleProducts = Array.from(document.querySelectorAll('.product-card')).filter(card => {
                    return card.classList.contains('search-match') && card.classList.contains('category-match');
                });

                // Calculate total pages based on visible products
                const totalPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage));
                
                // Adjust current page if it's now out of bounds
                if (currentPage > totalPages) {
                    currentPage = totalPages;
                }
                
                // Get the start and end indices for the current page
                const startIndex = (pageNum - 1) * productsPerPage;
                const endIndex = Math.min(startIndex + productsPerPage, visibleProducts.length);
                
                // Display only the products for the current page
                visibleProducts.slice(startIndex, endIndex).forEach(card => {
                    card.style.display = 'block';
                });
                
                // Update pagination buttons
                renderPaginationButtons(currentPage, totalPages);
                
                // Scroll to top of products
                const allProducts = document.querySelector('.all-products');
                if (allProducts) {
                    allProducts.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            
            // Connect search, sort, and filter functions with pagination
            function updateProductsAndPagination() {
                currentPage = 1; // Reset to first page
                displayProductsForPage(currentPage);
                updateCurrentURL(currentPage);
            }
            
            // Events for search
            productSearch.addEventListener('keyup', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    searchProducts();
                    updateProductsAndPagination();
                }, 300);
            });
            
            if (searchBtn) {
                searchBtn.addEventListener('click', function() {
                    searchProducts();
                    updateProductsAndPagination();
                });
            }
            
            // Event for filters
            filterBy.addEventListener('change', function() {
                applyFilters();
                updateProductsAndPagination();
            });
            
            if (genderFilter) {
                genderFilter.addEventListener('change', function() {
                    applyFilters();
                    updateProductsAndPagination();
                });
            }
            
            // Event for sort - reset to page 1 after sorting
            sortBy.addEventListener('change', function() {
                const sortValue = this.value;
                sortProducts(sortValue);
                updateProductsAndPagination();
            });
            
            // Apply initial filters and search from URL
            if (urlParams.query) {
                searchProducts(urlParams.query);
            }
            if (urlParams.occasion !== 'all' || urlParams.gender !== 'all') {
                applyFilters();
            }
            if (urlParams.sort) {
                sortProducts(urlParams.sort);
            }
            
            // Initialize pagination on page load
            displayProductsForPage(currentPage);
        }
    }
    
    // Function to redirect from homepage or other pages with search parameters
    window.redirectToProducts = function(query = '', occasion = 'all', gender = 'all') {
        const params = new URLSearchParams();
        
        if (query && query.trim()) params.set('search', query.trim());
        if (occasion && occasion !== 'all') params.set('occasion', occasion);
        if (gender && gender !== 'all') params.set('gender', gender);
        
        const url = params.toString() ? 
            `/products?${params.toString()}` : 
            '/products';
        
        window.location.href = url;
    };
    
    // Function for main search from homepage
    window.performMainSearch = function() {
        const mainSearch = document.getElementById('main-search');
        if (mainSearch && mainSearch.value.trim()) {
            redirectToProducts(mainSearch.value.trim());
        }
    };
    
    // Setup main search functionality if on homepage
    const mainSearch = document.getElementById('main-search');
    if (mainSearch) {
        // Enter key support
        mainSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performMainSearch();
            }
        });
        
        // Search button support
        const mainSearchBtn = document.querySelector('.search-btn');
        if (mainSearchBtn) {
            mainSearchBtn.addEventListener('click', performMainSearch);
        }
    }
});

// Contact form functionality

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateContactForm(data)) {
                showFormMessage('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            submitContactForm(data);
        });
    }
}

// Form validation
function validateContactForm(data) {
    // Check required fields
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

// Simulate form submission
function submitContactForm(data) {
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Show success message
        showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // In a real application, you would send the data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     if (result.success) {
        //         showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        //         document.getElementById('contactForm').reset();
        //     } else {
        //         showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        //     }
        // })
        // .catch(error => {
        //     showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        // });
        
    }, 1500); // Simulate network delay
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Smooth scroll for anchor links (if any)
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

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname;
    
    // Contact page specific initialization
    if (currentPage.includes('contact.html') || currentPage.endsWith('contact')) {
        initContactForm();
    }
    
    // About page specific initialization (if needed)
    if (currentPage.includes('about.html') || currentPage.endsWith('about')) {
        // Add any about page specific functionality here
        initScrollAnimations();
    }
}

// Scroll animations for about page
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.value-card, .team-member, .story-text, .story-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Phone number formatting
function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let phoneNumber = input.value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
        phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
        phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    
    input.value = phoneNumber;
}

// Initialize phone formatting on contact form
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
}

// Form field validation styling
function initFormValidation() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    // Remove existing error class
    field.classList.remove('error');
    
    if (isRequired && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// Add CSS for error styling (this would be added to the CSS file)
const errorStyles = `
.form-group input.error,
.form-group textarea.error,
.form-group select.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
`;

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageSpecific();
    initSmoothScroll();
    initPhoneFormatting();
    initFormValidation();
    
    // Inject error styles
    const style = document.createElement('style');
    style.textContent = errorStyles;
    document.head.appendChild(style);
});

// Export functions for potential use in other scripts
window.FlowerShop = window.FlowerShop || {};
window.FlowerShop.contact = {
    initContactForm,
    validateContactForm,
    showFormMessage,
    formatPhoneNumber
};