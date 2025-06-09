document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cart = [];
    const cartCount = document.querySelector('.cart-count');
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const closeCart = document.querySelector('.close-cart');
    const continueShopping = document.getElementById('continueShopping');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            
            // Check if item is already in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity: 1
                });
            }
            
            updateCartCount();
            
            // Animation effect
            this.textContent = 'Added!';
            this.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 1500);
        });
    });
    
    // Update cart count display
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Open cart modal
    cartIcon.addEventListener('click', function() {
        updateCartModal();
        cartModal.style.display = 'flex';
    });
    
    // Close cart modal
    closeCart.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Continue shopping button
    continueShopping.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Close modal if clicked outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Update cart modal contents
    function updateCartModal() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            cartTotal.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                const item = cart.find(item => item.id === id);
                
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                
                updateCartCount();
                updateCartModal();
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                const item = cart.find(item => item.id === id);
                item.quantity++;
                updateCartCount();
                updateCartModal();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                cart = cart.filter(item => item.id !== id);
                updateCartCount();
                updateCartModal();
            });
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Thank you for your purchase! This is a demo store. In a real implementation, you would be redirected to a checkout page.');
        cart = [];
        updateCartCount();
        updateCartModal();
        cartModal.style.display = 'none';
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && emailInput.value.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    // Wishlist buttons
    const wishlistButtons = document.querySelectorAll('.wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const heartIcon = this.querySelector('i');
            
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.style.color = '#e74c3c';
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                heartIcon.style.color = '';
            }
        });
    });
});