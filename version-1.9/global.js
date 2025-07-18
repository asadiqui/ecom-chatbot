// Modern Slider functionality with enhanced UX
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
let autoSlide = true;
let slideInterval;
const intervalTime = 5000;
let currentSlide = 0;

// Enhanced slider functions with smooth transitions
function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('current');
        slides[currentSlide].style.transform = 'translateX(-100%)';
        slides[currentSlide].style.opacity = '0';
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('current');
        slides[currentSlide].style.transform = 'translateX(0)';
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

function prevSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('current');
        slides[currentSlide].style.transform = 'translateX(100%)';
        slides[currentSlide].style.opacity = '0';
        
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('current');
        slides[currentSlide].style.transform = 'translateX(0)';
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Enhanced event listeners with modern button styles
if (nextBtn && prevBtn) {
    // Apply modern styling to existing buttons
    [nextBtn, prevBtn].forEach(btn => {
        btn.classList.add('transition-all', 'duration-300', 'ease-in-out', 'hover:scale-110', 'hover:shadow-lg');
        btn.style.backgroundColor = '#606c38';
        btn.style.color = '#fefae0';
        btn.style.border = 'none';
        btn.style.borderRadius = '50%';
        btn.style.width = '50px';
        btn.style.height = '50px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        addButtonClickEffect(nextBtn);
        if (autoSlide) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        addButtonClickEffect(prevBtn);
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

// Modern button click effect
function addButtonClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Enhanced Add to cart functionality with modern notifications
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;

addToCartButtons.forEach(button => {
    // Apply modern styling to cart buttons
    button.style.backgroundColor = '#bc6c25';
    button.style.color = '#fefae0';
    button.style.border = 'none';
    button.style.borderRadius = '8px';
    button.style.padding = '12px 24px';
    button.style.fontWeight = '600';
    button.style.fontSize = '14px';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    button.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
    button.style.fontFamily = "'Inter', 'Poppins', sans-serif";
    
    // Add hover effect
    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#a0581f';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 16px -4px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('added')) {
            this.style.backgroundColor = '#bc6c25';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
        }
    });

    button.addEventListener('click', function() {
        cartCount++;
        const productName = this.parentElement.querySelector('h3').textContent;
        const productPrice = this.parentElement.querySelector('.price').textContent;
        
        // Create modern notification
        const notification = createModernNotification(productName, productPrice);
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0) scale(1)';
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%) scale(0.95)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
        
        // Modern button animation
        this.classList.add('added');
        this.innerHTML = `
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Added!
        `;
        this.style.backgroundColor = '#606c38';
        this.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            this.classList.remove('added');
            this.innerHTML = 'Add to Cart';
            this.style.backgroundColor = '#bc6c25';
            this.style.transform = 'scale(1)';
        }, 2000);
    });
});

// Create modern notification function
function createModernNotification(productName, productPrice) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">Added to cart</p>
                <p class="text-sm text-gray-600 font-medium">${productName}</p>
                <p class="text-sm text-gray-800 font-bold">${productPrice}</p>
            </div>
            <button class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    // Modern notification styling
    notification.style.position = 'fixed';
    notification.style.top = '24px';
    notification.style.right = '24px';
    notification.style.backgroundColor = '#fefae0';
    notification.style.border = '1px solid #606c38';
    notification.style.borderRadius = '12px';
    notification.style.padding = '16px';
    notification.style.minWidth = '300px';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%) scale(0.95)';
    notification.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    notification.style.fontFamily = "'Inter', 'Poppins', sans-serif";
    notification.style.backdropFilter = 'blur(8px)';
    
    return notification;
}

// Enhanced Shop now button functionality
const shopNowButtons = document.querySelectorAll('.shop-now');

shopNowButtons.forEach(button => {
    // Apply modern styling
    button.style.backgroundColor = '#606c38';
    button.style.color = '#fefae0';
    button.style.border = 'none';
    button.style.borderRadius = '12px';
    button.style.padding = '16px 32px';
    button.style.fontSize = '16px';
    button.style.fontWeight = '600';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    button.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    button.style.fontFamily = "'Inter', 'Poppins', sans-serif";
    button.style.textTransform = 'uppercase';
    button.style.letterSpacing = '0.05em';
    
    // Enhanced hover effects
    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4a5a2a';
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 12px 20px -4px rgba(0, 0, 0, 0.25)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#606c38';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-1px) scale(0.98)';
        
        setTimeout(() => {
            if (this.classList.contains('wedding')) {
                window.location.href = '/products.html?occasion=wedding';
            } else {
                window.location.href = '/products.html';
            }
        }, 150);
    });
});

// Modern Newsletter popup with enhanced UX
window.addEventListener('load', function() {
    setTimeout(() => {
        showModernNewsletterPopup();
    }, 5000);
});

function showModernNewsletterPopup() {
    // Check if user has already seen the popup (using in-memory storage)
    if (window.newsletterPopupShown) {
        return;
    }
    
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div class="popup-backdrop"></div>
        <div class="popup-content">
            <button class="close-popup">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
            
            <div class="popup-header">
                <div class="icon-container">
                    <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                </div>
                <h2>Join Our Flower Community</h2>
                <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            </div>
            
            <form id="newsletter-form">
                <div class="input-group">
                    <input type="email" placeholder="Enter your email address" required>
                    <button type="submit">
                        Subscribe
                        <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </form>
            
            <p class="privacy-text">We respect your privacy. Unsubscribe at any time.</p>
        </div>
    `;
    
    // Modern popup styling
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.zIndex = '2000';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    popup.style.fontFamily = "'Inter', 'Poppins', sans-serif";
    
    // Backdrop styling
    const backdrop = popup.querySelector('.popup-backdrop');
    backdrop.style.position = 'absolute';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    backdrop.style.backdropFilter = 'blur(4px)';
    
    // Content styling
    const popupContent = popup.querySelector('.popup-content');
    popupContent.style.backgroundColor = '#fefae0';
    popupContent.style.padding = '40px';
    popupContent.style.borderRadius = '20px';
    popupContent.style.maxWidth = '500px';
    popupContent.style.width = '90%';
    popupContent.style.position = 'relative';
    popupContent.style.textAlign = 'center';
    popupContent.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    popupContent.style.border = '1px solid rgba(96, 108, 56, 0.1)';
    popupContent.style.transform = 'scale(0.9)';
    popupContent.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Close button styling
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '16px';
    closeBtn.style.right = '16px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#606c38';
    closeBtn.style.padding = '8px';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.transition = 'all 0.2s ease';
    closeBtn.style.display = 'flex';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(96, 108, 56, 0.1)';
    });
    
    // Header styling
    const header = popup.querySelector('.popup-header');
    const iconContainer = popup.querySelector('.icon-container');
    const h2 = popup.querySelector('h2');
    const p = popup.querySelector('p');
    
    iconContainer.style.color = '#606c38';
    iconContainer.style.marginBottom = '20px';
    
    h2.style.fontSize = '28px';
    h2.style.fontWeight = '700';
    h2.style.color = '#606c38';
    h2.style.marginBottom = '12px';
    h2.style.lineHeight = '1.2';
    
    p.style.fontSize = '16px';
    p.style.color = '#bc6c25';
    p.style.marginBottom = '32px';
    p.style.lineHeight = '1.5';
    
    // Form styling
    const form = popup.querySelector('#newsletter-form');
    const inputGroup = popup.querySelector('.input-group');
    const emailInput = popup.querySelector('input[type="email"]');
    const submitBtn = popup.querySelector('button[type="submit"]');
    const privacyText = popup.querySelector('.privacy-text');
    
    inputGroup.style.display = 'flex';
    inputGroup.style.gap = '12px';
    inputGroup.style.marginBottom = '16px';
    
    emailInput.style.flex = '1';
    emailInput.style.padding = '16px 20px';
    emailInput.style.border = '2px solid rgba(96, 108, 56, 0.2)';
    emailInput.style.borderRadius = '12px';
    emailInput.style.fontSize = '16px';
    emailInput.style.backgroundColor = 'white';
    emailInput.style.transition = 'all 0.3s ease';
    emailInput.style.outline = 'none';
    
    emailInput.addEventListener('focus', function() {
        this.style.borderColor = '#606c38';
        this.style.boxShadow = '0 0 0 3px rgba(96, 108, 56, 0.1)';
    });
    
    submitBtn.style.backgroundColor = '#bc6c25';
    submitBtn.style.color = '#fefae0';
    submitBtn.style.border = 'none';
    submitBtn.style.borderRadius = '12px';
    submitBtn.style.padding = '16px 24px';
    submitBtn.style.fontSize = '16px';
    submitBtn.style.fontWeight = '600';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.transition = 'all 0.3s ease';
    submitBtn.style.display = 'flex';
    submitBtn.style.alignItems = 'center';
    submitBtn.style.whiteSpace = 'nowrap';
    
    submitBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#a0581f';
        this.style.transform = 'translateY(-2px)';
    });
    
    privacyText.style.fontSize = '12px';
    privacyText.style.color = '#999';
    privacyText.style.margin = '0';
    
    document.body.appendChild(popup);
    
    // Show popup with animation
    setTimeout(() => {
        popup.style.opacity = '1';
        popupContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close popup events
    function closePopup() {
        popup.style.opacity = '0';
        popupContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            popup.remove();
        }, 300);
        window.newsletterPopupShown = true;
    }
    
    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
    
    // Submit form event with modern success state
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value;
        
        // Animate button loading state
        submitBtn.innerHTML = `
            <svg class="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v11H4V4z" clip-rule="evenodd"></path>
            </svg>
            Processing...
        `;
        submitBtn.disabled = true;
        
        setTimeout(() => {
            popupContent.innerHTML = `
                <div class="success-content">
                    <div class="success-icon">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <h2>Welcome to Our Community!</h2>
                    <p>Thank you for subscribing with <strong>${email}</strong></p>
                    <p>Look out for our beautiful flower deals and exclusive content in your inbox soon!</p>
                    <button id="close-success">Continue Shopping</button>
                </div>
            `;
            
            // Success content styling
            const successContent = popup.querySelector('.success-content');
            const successIcon = popup.querySelector('.success-icon');
            const successH2 = popup.querySelector('h2');
            const successBtn = popup.querySelector('#close-success');
            
            successIcon.style.color = '#606c38';
            successIcon.style.marginBottom = '24px';
            
            successH2.style.fontSize = '24px';
            successH2.style.fontWeight = '700';
            successH2.style.color = '#606c38';
            successH2.style.marginBottom = '16px';
            
            successBtn.style.backgroundColor = '#606c38';
            successBtn.style.color = '#fefae0';
            successBtn.style.border = 'none';
            successBtn.style.borderRadius = '12px';
            successBtn.style.padding = '16px 32px';
            successBtn.style.fontSize = '16px';
            successBtn.style.fontWeight = '600';
            successBtn.style.cursor = 'pointer';
            successBtn.style.marginTop = '24px';
            successBtn.style.transition = 'all 0.3s ease';
            
            successBtn.addEventListener('click', closePopup);
            successBtn.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#4a5a2a';
            });
        }, 1500);
    });
}

// Enhanced Image lazy loading with modern intersection observer
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    
                    // Add loading animation
                    lazyImage.style.transition = 'opacity 0.3s ease';
                    lazyImage.style.opacity = '0.5';
                    
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    
                    lazyImage.addEventListener('load', function() {
                        this.style.opacity = '1';
                    });
                    
                    imageObserver.unobserve(lazyImage);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    }
});

// Add modern scroll-to-top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = `
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
    `;
    
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '24px';
    scrollTopBtn.style.right = '24px';
    scrollTopBtn.style.backgroundColor = '#606c38';
    scrollTopBtn.style.color = '#fefae0';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.width = '56px';
    scrollTopBtn.style.height = '56px';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.boxShadow = '0 8px 16px -4px rgba(0, 0, 0, 0.2)';
    scrollTopBtn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    scrollTopBtn.style.zIndex = '999';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.transform = 'scale(0.8)';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Smooth scroll to top
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4a5a2a';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#606c38';
        this.style.transform = 'scale(1)';
    });
});

// Modern form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Apply modern styling to form inputs
            input.style.border = '2px solid rgba(96, 108, 56, 0.2)';
            input.style.borderRadius = '8px';
            input.style.padding = '12px 16px';
            input.style.fontSize = '16px';
            input.style.transition = 'all 0.3s ease';
            input.style.backgroundColor = '#fefae0';
            input.style.fontFamily = "'Inter', 'Poppins', sans-serif";
            
            // Focus effects
            input.addEventListener('focus', function() {
                this.style.borderColor = '#606c38';
                this.style.boxShadow = '0 0 0 3px rgba(96, 108, 56, 0.1)';
                this.style.outline = 'none';
            });
            
            input.addEventListener('blur', function() {
                this.style.boxShadow = 'none';
                if (this.value.trim() === '') {
                    this.style.borderColor = 'rgba(96, 108, 56, 0.2)';
                } else {
                    this.style.borderColor = '#606c38';
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.style.borderColor = '#606c38';
                } else {
                    this.style.borderColor = '#dc2626';
                }
            });
        });
    });
});

// Modern loading states for buttons
function addLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `
        <svg class="w-4 h-4 animate-spin inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 14V4h12v12H4z"/>
        </svg>
        ${loadingText}
    `;
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Modern toast notification system
const ToastManager = {
    container: null,
    
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.style.position = 'fixed';
            this.container.style.top = '24px';
            this.container.style.right = '24px';
            this.container.style.zIndex = '1001';
            this.container.style.display = 'flex';
            this.container.style.flexDirection = 'column';
            this.container.style.gap = '12px';
            this.container.style.maxWidth = '400px';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'success') {
        this.init();
        
        const toast = document.createElement('div');
        const colors = {
            success: { bg: '#606c38', border: '#4a5a2a', icon: '✓' },
            error: { bg: '#dc2626', border: '#b91c1c', icon: '✕' },
            warning: { bg: '#bc6c25', border: '#a0581f', icon: '!' },
            info: { bg: '#3b82f6', border: '#2563eb', icon: 'i' }
        };
        
        const color = colors[type] || colors.success;
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${color.icon}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close">×</button>
            </div>
        `;
        
        // Toast styling
        toast.style.backgroundColor = color.bg;
        toast.style.color = '#fefae0';
        toast.style.borderRadius = '8px';
        toast.style.padding = '16px';
        toast.style.boxShadow = '0 8px 16px -4px rgba(0, 0, 0, 0.2)';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        toast.style.fontFamily = "'Inter', 'Poppins', sans-serif";
        toast.style.fontSize = '14px';
        toast.style.fontWeight = '500';
        
        const toastContent = toast.querySelector('.toast-content');
        toastContent.style.display = 'flex';
        toastContent.style.alignItems = 'center';
        toastContent.style.gap = '12px';
        
        const toastIcon = toast.querySelector('.toast-icon');
        toastIcon.style.fontWeight = 'bold';
        toastIcon.style.fontSize = '16px';
        
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.style.flex = '1';
        
        const toastClose = toast.querySelector('.toast-close');
        toastClose.style.background = 'none';
        toastClose.style.border = 'none';
        toastClose.style.color = 'inherit';
        toastClose.style.cursor = 'pointer';
        toastClose.style.fontSize = '18px';
        toastClose.style.lineHeight = '1';
        toastClose.style.padding = '0';
        toastClose.style.opacity = '0.7';
        
        toastClose.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });
        
        toastClose.addEventListener('mouseleave', function() {
            this.style.opacity = '0.7';
        });
        
        this.container.appendChild(toast);
        
        // Show animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            this.remove(toast);
        }, 5000);
        
        // Manual close
        toastClose.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.remove(toast);
        });
    },
    
    remove(toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
};

// Usage examples for the toast system:
// ToastManager.show('Item added to cart!', 'success');
// ToastManager.show('Please fill in all fields', 'error');
// ToastManager.show('Your session will expire soon', 'warning');
// ToastManager.show('New features available!', 'info');

// Modern card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .product-card, .service-card');
    
    cards.forEach(card => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.borderRadius = '12px';
        card.style.overflow = 'hidden';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        });
    });
});

// Modern search functionality with debouncing
function createModernSearch(searchInput, searchResults, searchFunction) {
    let searchTimeout;
    
    searchInput.style.border = '2px solid rgba(96, 108, 56, 0.2)';
    searchInput.style.borderRadius = '12px';
    searchInput.style.padding = '16px 20px 16px 48px';
    searchInput.style.fontSize = '16px';
    searchInput.style.backgroundColor = '#fefae0';
    searchInput.style.transition = 'all 0.3s ease';
    searchInput.style.fontFamily = "'Inter', 'Poppins', sans-serif";
    searchInput.style.width = '100%';
    
    // Add search icon
    const searchIcon = document.createElement('div');
    searchIcon.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
        </svg>
    `;
    searchIcon.style.position = 'absolute';
    searchIcon.style.left = '16px';
    searchIcon.style.top = '50%';
    searchIcon.style.transform = 'translateY(-50%)';
    searchIcon.style.color = '#bc6c25';
    searchIcon.style.pointerEvents = 'none';
    
    const searchContainer = searchInput.parentElement;
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(searchIcon);
    
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#606c38';
        this.style.boxShadow = '0 0 0 3px rgba(96, 108, 56, 0.1)';
        this.style.outline = 'none';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
        this.style.borderColor = 'rgba(96, 108, 56, 0.2)';
    });
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length === 0) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Show loading state
        searchResults.innerHTML = `
            <div class="search-loading">
                <svg class="w-6 h-6 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 14V4h12v12H4z"/>
                </svg>
                Searching...
            </div>
        `;
        
        searchTimeout = setTimeout(() => {
            searchFunction(query, searchResults);
        }, 300);
    });
}

// Initialize modern features
document.addEventListener('DOMContentLoaded', function() {
    // Add modern focus management
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #606c38';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add modern ripple effect to buttons
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(254, 250, 224, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Modern Products page functionality
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
    
    // Add loading state management
    function showLoadingState() {
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            productGrid.classList.add('loading');
        }
        
        // Add loading spinner if it doesn't exist
        let loadingSpinner = document.querySelector('.loading-spinner');
        if (!loadingSpinner && productGrid) {
            loadingSpinner = document.createElement('div');
            loadingSpinner.className = 'loading-spinner hidden';
            loadingSpinner.innerHTML = `
                <div class="flex justify-center items-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#606c38]"></div>
                    <span class="ml-2 text-[#606c38]">Loading...</span>
                </div>
            `;
            productGrid.parentNode.insertBefore(loadingSpinner, productGrid);
        }
        
        if (loadingSpinner) {
            loadingSpinner.classList.remove('hidden');
        }
    }
    
    function hideLoadingState() {
        const productGrid = document.querySelector('.product-grid');
        const loadingSpinner = document.querySelector('.loading-spinner');
        
        if (productGrid) {
            productGrid.classList.remove('loading');
        }
        
        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
        }
    }
    
    // Add smooth animations for product cards
    function animateProductCards() {
        const visibleCards = document.querySelectorAll('.product-card:not([style*="display: none"])');
        visibleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50); // Stagger the animations
        });
    }
    
    // Update results counter
    function updateResultsCounter() {
        const visibleProducts = Array.from(productCards).filter(card => {
            return card.classList.contains('search-match') && 
                   card.classList.contains('category-match') &&
                   card.style.display !== 'none';
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
    
    // Only run this code if we're on the products page
    if (productSearch && sortBy && filterBy) {
        // Initialize from URL parameters
        const urlParams = initializeFromURL();
        
        // Initialize class-based filtering
        productCards.forEach(card => {
            card.classList.add('search-match', 'category-match');
            // Add hover effects and transitions
            card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });
        
        // Enhanced Search functionality with description search
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
            
            // Show/hide no results message
            showNoResultsMessage(!hasResults);
            
            // Update URL with current search state
            updateCurrentURL();
        }
        
        // Show/hide no results message
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
        
        // Clear all filters function
        window.clearAllFilters = function() {
            if (productSearch) productSearch.value = '';
            if (filterBy) filterBy.value = 'all';
            if (genderFilter) genderFilter.value = 'all';
            if (sortBy) sortBy.value = '';
            
            // Reset all products
            productCards.forEach(card => {
                card.classList.add('search-match', 'category-match');
                card.style.display = 'block';
            });
            
            // Update URL
            updateURL('', 'all', 'all', '', 1);
            
            // Hide no results message
            showNoResultsMessage(false);
            
            // Update counter
            updateResultsCounter();
            
            // Reset pagination
            const paginationSection = document.querySelector('.pagination');
            if (paginationSection) {
                displayProductsForPage(1);
            }
        };
        
        // Function to update URL with current state
        function updateCurrentURL(pageNum = 1) {
            const query = productSearch.value;
            const occasion = filterBy ? filterBy.value : 'all';
            const gender = genderFilter ? genderFilter.value : 'all';
            const sort = sortBy ? sortBy.value : '';
            
            updateURL(query, occasion, gender, sort, pageNum);
        }
        
        // Initialize event listeners for search with debouncing and loading states
        let searchTimeout;
        productSearch.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            
            // Show loading state for longer searches
            if (this.value.length > 2) {
                showLoadingState();
            }
            
            searchTimeout = setTimeout(() => {
                searchProducts();
                hideLoadingState();
                updateResultsCounter();
            }, 300); // 300ms debounce
        });
        
        // Add clear search button functionality
        function addClearSearchButton() {
            if (productSearch && !document.querySelector('.clear-search')) {
                const clearBtn = document.createElement('button');
                clearBtn.className = 'clear-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors';
                clearBtn.innerHTML = '<i class="fas fa-times"></i>';
                clearBtn.style.display = 'none';
                
                // Position search container relatively
                productSearch.parentNode.style.position = 'relative';
                productSearch.parentNode.appendChild(clearBtn);
                
                // Show/hide clear button based on input
                productSearch.addEventListener('input', function() {
                    clearBtn.style.display = this.value ? 'block' : 'none';
                });
                
                // Clear functionality
                clearBtn.addEventListener('click', function() {
                    productSearch.value = '';
                    clearBtn.style.display = 'none';
                    searchProducts();
                    updateResultsCounter();
                    productSearch.focus();
                });
            }
        }
        
        addClearSearchButton();
        
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                searchProducts();
                updateResultsCounter();
            });
        }
        
        // Enhanced Sort functionality with smooth transitions
        function sortProducts(sortValue) {
            if (!sortValue) return;
            
            showLoadingState();
            
            setTimeout(() => {
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
                        hideLoadingState();
                        return;
                }
                
                // Reorder DOM elements to match the sorted array
                const productGrid = document.querySelector('.product-grid');
                productsArray.forEach(card => {
                    productGrid.appendChild(card);
                });
                
                hideLoadingState();
                animateProductCards();
            }, 200);
        }
        
        sortBy.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
            updateCurrentURL();
        });
        
        // Enhanced Filter functionality with smooth transitions
        function applyFilters() {
            const occasionValue = filterBy ? filterBy.value : 'all';
            const genderValue = genderFilter ? genderFilter.value : 'all';
            let hasResults = false;
            
            productCards.forEach(card => {
                // Check occasion filter
                const occasionMatch = occasionValue === 'all' || card.dataset.category.split(" ").includes(occasionValue);
                // Check gender filter  
                const genderMatch = genderValue === 'all' || card.dataset.gender.split(" ").includes(genderValue);
                
                // Product must match both filters
                if (occasionMatch && genderMatch) {
                    card.classList.add('category-match');
                    if (card.classList.contains('search-match')) {
                        hasResults = true;
                    }
                } else {
                    card.classList.remove('category-match');
                }
            });
            
            // Show/hide no results message
            const totalVisible = Array.from(productCards).filter(card => {
                return card.classList.contains('search-match') && card.classList.contains('category-match');
            }).length;
            
            showNoResultsMessage(totalVisible === 0);
            
            // Update URL with current filter state
            updateCurrentURL();
        }
        
        // Event listeners for filters with visual feedback
        filterBy.addEventListener('change', function() {
            this.style.borderColor = '#606c38';
            setTimeout(() => {
                this.style.borderColor = '';
            }, 300);
            
            applyFilters();
            updateResultsCounter();
        });
        
        if (genderFilter) {
            genderFilter.addEventListener('change', function() {
                this.style.borderColor = '#606c38';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 300);
                
                applyFilters();
                updateResultsCounter();
            });
        }
        
        // Enhanced Pagination functionality
        const paginationSection = document.querySelector('.pagination');
        if (paginationSection) {
            const productsPerPage = 8;
            let currentPage = urlParams.page;
            
            function goToPage(pageNum) {
                currentPage = pageNum;
                displayProductsForPage(currentPage);
                updateCurrentURL(currentPage);
                
                // Smooth scroll to top
                const allProducts = document.querySelector('.all-products');
                if (allProducts) {
                    allProducts.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            function goToNextPage() {
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
            
            function goToPreviousPage() {
                if (currentPage > 1) {
                    currentPage--;
                    displayProductsForPage(currentPage);
                    updateCurrentURL(currentPage);
                }
            }
            
            // Enhanced pagination buttons with modern styling
            function renderPaginationButtons(currentPage, totalPages) {
                paginationSection.innerHTML = '';
                
                if (totalPages <= 1) return;
                
                // Previous button with modern styling
                const prevButton = document.createElement('button');
                prevButton.className = `page-btn previous px-3 py-2 rounded-lg border transition-all duration-200 ${
                    currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                        : 'bg-white text-[#606c38] border-[#606c38] hover:bg-[#606c38] hover:text-white'
                }`;
                prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
                prevButton.disabled = currentPage === 1;
                prevButton.addEventListener('click', goToPreviousPage);
                paginationSection.appendChild(prevButton);
                
                // Page number logic
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
                
                // Add page number buttons with modern styling
                for (let i = startPage; i <= endPage; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.className = `page-btn px-3 py-2 rounded-lg border transition-all duration-200 ${
                        i === currentPage 
                            ? 'bg-[#606c38] text-white border-[#606c38]' 
                            : 'bg-white text-[#606c38] border-gray-300 hover:bg-[#606c38] hover:text-white hover:border-[#606c38]'
                    }`;
                    pageButton.textContent = i;
                    
                    pageButton.addEventListener('click', (function(pageNum) {
                        return function() {
                            goToPage(pageNum);
                        };
                    })(i));
                    
                    paginationSection.appendChild(pageButton);
                }
                
                // Next button with modern styling
                const nextButton = document.createElement('button');
                nextButton.className = `page-btn next px-3 py-2 rounded-lg border transition-all duration-200 ${
                    currentPage === totalPages || totalPages === 0
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-[#606c38] border-[#606c38] hover:bg-[#606c38] hover:text-white'
                }`;
                nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
                nextButton.disabled = currentPage === totalPages || totalPages === 0;
                nextButton.addEventListener('click', goToNextPage);
                paginationSection.appendChild(nextButton);
            }
            
            // Enhanced display function with animations
            function displayProductsForPage(pageNum) {
                // Hide all products with fade out
                productCards.forEach(card => {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 150);
                });
                
                setTimeout(() => {
                    const visibleProducts = Array.from(document.querySelectorAll('.product-card')).filter(card => {
                        return card.classList.contains('search-match') && card.classList.contains('category-match');
                    });

                    const totalPages = Math.max(1, Math.ceil(visibleProducts.length / productsPerPage));
                    
                    if (currentPage > totalPages) {
                        currentPage = totalPages;
                    }
                    
                    const startIndex = (pageNum - 1) * productsPerPage;
                    const endIndex = Math.min(startIndex + productsPerPage, visibleProducts.length);
                    
                    // Show products for current page with fade in
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
            
            // Enhanced event handlers for pagination-aware filtering
            function updateProductsAndPagination() {
                currentPage = 1;
                displayProductsForPage(currentPage);
                updateCurrentURL(currentPage);
                animateProductCards();
            }
            
            // Search events with pagination
            productSearch.addEventListener('input', function() {
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
            
            // Filter events with pagination
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
            
            // Sort events with pagination
            sortBy.addEventListener('change', function() {
                const sortValue = this.value;
                sortProducts(sortValue);
                updateProductsAndPagination();
            });
            
            // Apply initial state from URL
            if (urlParams.query) {
                searchProducts(urlParams.query);
            }
            if (urlParams.occasion !== 'all' || urlParams.gender !== 'all') {
                applyFilters();
            }
            if (urlParams.sort) {
                sortProducts(urlParams.sort);
            }
            
            // Initialize pagination
            displayProductsForPage(currentPage);
        }
        
        // Initialize results counter
        updateResultsCounter();
    }
    
    // Enhanced homepage search redirect functionality
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
    
    // Enhanced main search functionality
    window.performMainSearch = function() {
        const mainSearch = document.getElementById('main-search');
        if (mainSearch && mainSearch.value.trim()) {
            // Add loading state to search button
            const searchBtn = document.querySelector('.search-btn');
            if (searchBtn) {
                const originalText = searchBtn.innerHTML;
                searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
                searchBtn.disabled = true;
                
                setTimeout(() => {
                    redirectToProducts(mainSearch.value.trim());
                }, 300);
            } else {
                redirectToProducts(mainSearch.value.trim());
            }
        }
    };
    
    // Enhanced main search setup
    const mainSearch = document.getElementById('main-search');
    if (mainSearch) {
        // Add search suggestions/autocomplete placeholder
        const suggestions = ['wedding rings', 'engagement rings', 'necklaces', 'bracelets', 'earrings'];
        let suggestionIndex = 0;
        
        function rotatePlaceholder() {
            mainSearch.placeholder = `Search for ${suggestions[suggestionIndex]}...`;
            suggestionIndex = (suggestionIndex + 1) % suggestions.length;
        }
        
        // Rotate placeholder every 3 seconds
        setInterval(rotatePlaceholder, 3000);
        rotatePlaceholder(); // Set initial placeholder
        
        // Enhanced enter key support
        mainSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performMainSearch();
            }
        });
        
        // Enhanced search button support
        const mainSearchBtn = document.querySelector('.search-btn');
        if (mainSearchBtn) {
            mainSearchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                performMainSearch();
            });
        }
        
        // Add focus effects
        mainSearch.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
            this.parentNode.style.boxShadow = '0 8px 25px rgba(96, 108, 56, 0.15)';
        });
        
        mainSearch.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
            this.parentNode.style.boxShadow = '';
        });
    }
});

// Modern Contact Form Functionality with Enhanced UI Support

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
            
            // Clear previous validation states
            clearFormErrors();
            
            // Enhanced validation with field-specific error messages
            const validationResult = validateContactForm(data);
            if (!validationResult.isValid) {
                showValidationErrors(validationResult.errors);
                showFormMessage('Please correct the errors below before submitting.', 'error');
                return;
            }
            
            // Submit form with modern loading animation
            submitContactForm(data);
        });
    }
}

// Enhanced form validation with detailed error reporting
function validateContactForm(data) {
    const errors = {};
    let isValid = true;
    
    // Check required fields
    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.firstName = 'First name must be at least 2 characters long';
        isValid = false;
    }
    
    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.lastName = 'Last name must be at least 2 characters long';
        isValid = false;
    }
    
    if (!data.email) {
        errors.email = 'Email address is required';
        isValid = false;
    } else {
        // Enhanced email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
        isValid = false;
    }
    
    // Optional phone validation (if provided)
    if (data.phone && data.phone.trim()) {
        const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
        if (!phoneRegex.test(data.phone)) {
            errors.phone = 'Please enter a valid phone number: (XXX) XXX-XXXX';
            isValid = false;
        }
    }
    
    return { isValid, errors };
}

// Modern form submission with loading states
function submitContactForm(data) {
    const submitBtn = document.querySelector('.submit-btn');
    const formMessage = document.getElementById('form-message');
    
    // Enhanced loading state with spinner
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
    `;
    
    // Simulate API call with realistic delay
    setTimeout(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Enhanced success feedback
        showFormMessage(
            '🌸 Thank you for your message! We\'ll get back to you within 24 hours.',
            'success'
        );
        
        // Reset form with animation
        resetFormWithAnimation();
        
        // Scroll to success message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // In a real application, replace the setTimeout with actual API call:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Network error occurred');
            }
            return result;
        })
        .then(result => {
            showFormMessage('🌸 Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            resetFormWithAnimation();
        })
        .catch(error => {
            console.error('Contact form error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
        */
        
    }, 2000);
}

// Enhanced message display with better styling and animations
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.innerHTML = message;
        formMessage.className = `form-message ${type} animate-fade-in`;
        formMessage.style.display = 'block';
        
        // Auto-hide success messages after 8 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.style.opacity = '1';
                }, 300);
            }, 8000);
        }
    }
}

// Clear form validation errors
function clearFormErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const errorMessage = group.querySelector('.error-message');
        
        if (input) {
            input.classList.remove('error', 'border-red-500');
        }
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

// Show validation errors with specific field messages
function showValidationErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            const formGroup = field.closest('.form-group');
            field.classList.add('error', 'border-red-500');
            
            // Add error message if it doesn't exist
            if (!formGroup.querySelector('.error-message')) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message text-red-600 text-sm mt-1 animate-fade-in';
                errorDiv.textContent = errors[fieldName];
                formGroup.appendChild(errorDiv);
            }
        }
    });
}

// Reset form with smooth animation
function resetFormWithAnimation() {
    const form = document.getElementById('contactForm');
    if (form) {
        // Add fade out animation
        form.style.opacity = '0.7';
        form.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            form.reset();
            clearFormErrors();
            
            // Restore form appearance
            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 150);
    }
}

// Smooth scroll for anchor links with offset for fixed headers
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname;
    
    // Contact page specific initialization
    if (currentPage.includes('contact.html') || currentPage.includes('contact') || currentPage === '/') {
        initContactForm();
    }
    
    // About page specific initialization
    if (currentPage.includes('about.html') || currentPage.includes('about')) {
        initScrollAnimations();
    }
    
    // Services page specific initialization
    if (currentPage.includes('services.html') || currentPage.includes('services')) {
        initServiceAnimations();
    }
}

// Enhanced scroll animations with stagger effect
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delays for better visual effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-fade-in-up');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.value-card, .team-member, .story-text, .story-image, .service-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Service page animations
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced phone number formatting
function formatPhoneNumber(input) {
    let phoneNumber = input.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    phoneNumber = phoneNumber.substring(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
        phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
        phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    
    input.value = phoneNumber;
}

// Initialize phone formatting with modern input handling
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
        
        // Add placeholder animation
        phoneInput.addEventListener('focus', function() {
            this.setAttribute('data-placeholder', this.placeholder);
            this.placeholder = '';
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.getAttribute('data-placeholder')) {
                this.placeholder = this.getAttribute('data-placeholder');
            }
        });
    }
}

// Enhanced form field validation with real-time feedback
function initFormValidation() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error', 'border-red-500');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
            
            // Real-time validation for email
            if (this.type === 'email' && this.value.trim()) {
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if (emailRegex.test(this.value)) {
                    this.classList.add('border-green-500');
                }
            }
        });
    });
}

// Enhanced field validation
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const formGroup = field.closest('.form-group');
    
    // Remove existing error state
    field.classList.remove('error', 'border-red-500', 'border-green-500');
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (isRequired && !value) {
        field.classList.add('error', 'border-red-500');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error', 'border-red-500');
            return false;
        } else {
            field.classList.add('border-green-500');
        }
    }
    
    return true;
}

// Modern CSS styles for enhanced UI
const modernStyles = `
/* Modern form animations and styles */
.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Enhanced form message styles */
.form-message {
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    margin: 1rem 0;
    font-weight: 500;
    border-left: 4px solid;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.form-message.success {
    background: linear-gradient(135deg, rgba(254, 250, 224, 0.9), rgba(254, 250, 224, 0.7));
    color: #606c38;
    border-left-color: #606c38;
    box-shadow: 0 4px 15px rgba(96, 108, 56, 0.2);
}

.form-message.error {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
    color: #dc2626;
    border-left-color: #dc2626;
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
}

/* Form group enhancements */
.form-group.focused label {
    transform: translateY(-20px) scale(0.85);
    color: #606c38;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    box-shadow: 0 0 0 3px rgba(96, 108, 56, 0.1);
    border-color: #606c38;
}

/* Error message styling */
.error-message {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.error-message::before {
    content: "⚠";
    font-size: 0.875rem;
}

/* Button loading state */
.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
}

/* Enhanced hover effects */
.service-card,
.value-card,
.team-member {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive enhancements */
@media (max-width: 768px) {
    .form-message {
        margin: 0.75rem 0;
        padding: 0.875rem 1rem;
    }
    
    .animate-fade-in-up {
        animation-duration: 0.6s;
    }
}
`;

// Accessibility enhancements
function initAccessibility() {
    // Add ARIA labels and roles
    const form = document.getElementById('contactForm');
    if (form) {
        form.setAttribute('aria-label', 'Contact form');
    }
    
    // Enhance form labels
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    inputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label && input.hasAttribute('required')) {
            label.innerHTML += ' <span class="text-red-500" aria-label="required">*</span>';
        }
    });
    
    // Add keyboard navigation enhancements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageSpecific();
    initSmoothScroll();
    initPhoneFormatting();
    initFormValidation();
    initAccessibility();
    
    // Inject modern styles
    const style = document.createElement('style');
    style.textContent = modernStyles;
    document.head.appendChild(style);
    
    // Add loading class to body for initial page load animations
    document.body.classList.add('page-loaded');
});

// Export functions for potential use in other scripts
window.FlowerShop = window.FlowerShop || {};
window.FlowerShop.contact = {
    initContactForm,
    validateContactForm,
    showFormMessage,
    formatPhoneNumber,
    clearFormErrors,
    resetFormWithAnimation
};