// Cart Sidebar
const cartHTML = `<!-- Cart Sidebar -->
<div id="cart-sidebar"
    class="cart-sidebar fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 z-50">
    <div class="cart-header bg-primary text-white p-6 flex items-center justify-between">
        <h2 class="text-xl font-bold">Shopping Cart</h2>
        <button id="close-cart" class="text-white hover:text-accent transition-colors">
            <i class="fas fa-times text-xl"></i>
        </button>
    </div>

    <div class="cart-content flex flex-col h-full">
        <!-- Cart Items -->
        <div id="cart-items" class="cart-items flex-1 overflow-y-auto p-6">
            <div id="empty-cart" class="text-center py-12">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">Your cart is empty</p>
                <p class="text-gray-400 text-sm mt-2">Add some beautiful flowers to get started!</p>
            </div>
        </div>

        <!-- Cart Footer -->
        <div id="cart-footer" class="cart-footer bg-gray-50 p-6 border-t" style="display: none;">
            <div class="cart-total mb-4">
                <div class="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span id="cart-total" class="text-accent">$0.00</span>
                </div>
            </div>
            <div class="cart-actions space-y-3">
                <button id="view-cart"
                    class="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300">
                    Checkout
                </button>
                <button id="checkout"
                    class="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent-dark transition-all duration-300">
                    Checkout
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Cart Overlay -->
<div id="cart-overlay" class="cart-overlay fixed inset-0 bg-black bg-opacity-50 z-40" style="display: none;"></div>`;
document.body.insertAdjacentHTML('beforeend', cartHTML);

// Cart functionality
class ShoppingCart {
	constructor() {
		this.items = [];
		this.isOpen = false;
		this.init();
	}

	init() {
		// Load cart from localStorage
		this.loadCart();

		// Bind events
		this.bindEvents();

		// Update UI
		this.updateCartUI();
	}

	bindEvents() {
		// Cart toggle
		document.getElementById('cart-toggle').addEventListener('click', () => this.toggleCart());
		document.getElementById('close-cart').addEventListener('click', () => this.closeCart());
		document.getElementById('cart-overlay').addEventListener('click', () => this.closeCart());

		// Add to cart buttons
		document.querySelectorAll('.add-to-cart').forEach(button => {
			button.addEventListener('click', (e) => this.addToCart(e));
		});

		// Checkout button
		document.getElementById('checkout').addEventListener('click', () => this.checkout());
	}

	addToCart(event) {
		const button = event.target;
		const productCard = button.closest('.product-card');

		// Extract product data
		const nameElement = productCard.querySelector('h3');
		const imageElement = productCard.querySelector('img');

		if (!nameElement || !imageElement) {
			console.error('Product card missing required elements');
			return;
		}

		const product = {
			id: Date.now() + Math.random(), // Simple ID generation
			name: nameElement.textContent,
			price: parseFloat(productCard.dataset.price),
			category: productCard.dataset.category,
			gender: productCard.dataset.gender,
			image: imageElement.src,
			quantity: 1
		};

		// Check if item already exists
		const existingItem = this.items.find(item =>
			item.name === product.name &&
			item.price === product.price
		);

		if (existingItem) {
			existingItem.quantity++;
		} else {
			this.items.push(product);
		}

		// Button animation
		const originalText = button.textContent;
		button.textContent = 'Added!';
		button.style.background = '#22c55e';
		button.disabled = true;

		// Cart icon animation
		const cartIcon = document.getElementById('cart-toggle');
		cartIcon.classList.add('success');
		setTimeout(() => cartIcon.classList.remove('success'), 300);

		setTimeout(() => {
			button.textContent = originalText;
			button.style.background = '';
			button.disabled = false;
		}, 1500);

		// Update UI and save
		this.updateCartUI();
		this.saveCart();

		// Show cart briefly for feedback
		if (!this.isOpen) {
			this.openCart();
			setTimeout(() => this.closeCart(), 2000);
		}
	}

	removeFromCart(productId) {
		this.items = this.items.filter(item => item.id !== productId);
		this.updateCartUI();
		this.saveCart();
	}

	updateQuantity(productId, newQuantity) {
		const item = this.items.find(item => item.id === productId);
		if (item) {
			if (newQuantity <= 0) {
				this.removeFromCart(productId);
			} else {
				item.quantity = newQuantity;
				this.updateCartUI();
				this.saveCart();
			}
		}
	}

	getTotal() {
		return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
	}

	getTotalItems() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}

	updateCartUI() {
		// Update cart count
		const cartCount = document.getElementById('cart-count');
		const totalItems = this.getTotalItems();

		if (totalItems > 0) {
			cartCount.textContent = totalItems;
			cartCount.style.display = 'flex';
		} else {
			cartCount.style.display = 'none';
		}

		// Update cart items
		this.renderCartItems();

		// Update total
		document.getElementById('cart-total').textContent = `$${this.getTotal().toFixed(2)}`;

		// Show/hide footer
		const cartFooter = document.getElementById('cart-footer');
		const emptyCart = document.getElementById('empty-cart');

		if (this.items.length > 0) {
			cartFooter.style.display = 'block';
			emptyCart.style.display = 'none';
		} else {
			cartFooter.style.display = 'none';
			emptyCart.style.display = 'block';
		}
	}

	renderCartItems() {
		const cartItemsContainer = document.getElementById('cart-items');
		const emptyCart = document.getElementById('empty-cart');

		// Clear existing items except empty cart message
		Array.from(cartItemsContainer.children).forEach(child => {
			if (child.id !== 'empty-cart') {
				child.remove();
			}
		});

		this.items.forEach(item => {
			const cartItem = document.createElement('div');
			cartItem.className = 'cart-item flex items-start gap-3';
			cartItem.innerHTML = `
					<img src="${item.image}" alt="${item.name}" class="cart-item-image">
					<div class="cart-item-details flex-1">
						<h4>${item.name}</h4>
						<p>Category: ${item.category}</p>
						<p>For: ${item.gender}</p>
						<div class="quantity-controls">
							<button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
								<i class="fas fa-minus"></i>
							</button>
							<input type="number" class="quantity-input" value="${item.quantity}" 
								   onchange="cart.updateQuantity(${item.id}, parseInt(this.value))" min="1">
							<button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
								<i class="fas fa-plus"></i>
							</button>
						</div>
					</div>
					<div class="cart-item-price-section text-right">
						<div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
						<button class="remove-item mt-2" onclick="cart.removeFromCart(${item.id})" title="Remove item">
							<i class="fas fa-trash"></i>
						</button>
					</div>
				`;
			cartItemsContainer.appendChild(cartItem);
		});
	}

	toggleCart() {
		if (this.isOpen) {
			this.closeCart();
		} else {
			this.openCart();
		}
	}

	openCart() {
		const sidebar = document.getElementById('cart-sidebar');
		const overlay = document.getElementById('cart-overlay');

		sidebar.classList.add('open');
		overlay.style.display = 'block';
		this.isOpen = true;

		// Prevent body scroll
		document.body.style.overflow = 'hidden';
	}

	closeCart() {
		const sidebar = document.getElementById('cart-sidebar');
		const overlay = document.getElementById('cart-overlay');

		sidebar.classList.remove('open');
		overlay.style.display = 'none';
		this.isOpen = false;

		// Restore body scroll
		document.body.style.overflow = '';
	}

	saveCart() {
		localStorage.setItem('flowerShopCart', JSON.stringify(this.items));
	}

	loadCart() {
		const savedCart = localStorage.getItem('flowerShopCart');
		if (savedCart) {
			this.items = JSON.parse(savedCart);
		}
	}

	clearCart() {
		this.items = [];
		this.updateCartUI();
		this.saveCart();
	}

	checkout() {
		if (this.items.length === 0) {
			this.showNotification('Your cart is empty!', 'warning');
			return;
		}

		// Simple checkout simulation
		const total = this.getTotal();
		const itemCount = this.getTotalItems();

		if (confirm(`Proceed to checkout?\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}`)) {
			this.showNotification('Thank you for your order! This is a demo, so no payment was processed.', 'success');
			this.clearCart();
			this.closeCart();
		}
	}

	showNotification(message, type = 'info') {
		// Create notification element
		const notification = document.createElement('div');
		notification.className = `notification fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;

		// Set colors based on type
		switch (type) {
			case 'success':
				notification.classList.add('bg-green-500', 'text-white');
				break;
			case 'warning':
				notification.classList.add('bg-yellow-500', 'text-white');
				break;
			case 'error':
				notification.classList.add('bg-red-500', 'text-white');
				break;
			default:
				notification.classList.add('bg-blue-500', 'text-white');
		}

		notification.innerHTML = `
				<div class="flex items-center justify-between">
					<span>${message}</span>
					<button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
						<i class="fas fa-times"></i>
					</button>
				</div>
			`;

		document.body.appendChild(notification);

		// Animate in
		setTimeout(() => {
			notification.style.transform = 'translateX(0)';
		}, 100);

		// Auto remove after 5 seconds
		setTimeout(() => {
			notification.style.transform = 'translateX(100%)';
			setTimeout(() => notification.remove(), 300);
		}, 5000);
	}
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart globally accessible for onclick handlers
window.cart = cart;

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

// Service worker registration for performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}