// Light/Dark theme
const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// LOGIN 

const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const toSignup = document.getElementById('show-signup');
const toLogin = document.getElementById('show-login');

if (toSignup && loginSection && signupSection) {
    toSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        signupSection.style.display = 'flex';
    });
}

if (toLogin && loginSection && signupSection) {
    toLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupSection.style.display = 'none';
        loginSection.style.display = 'flex';
    });
}

// SIGNUP

const signupForm = document.getElementById('signup-form');
const password = document.getElementById('signup-password');
const confirmPassword = document.getElementById('confirm-password');
const errorMessage = document.getElementById('password-error');

if (signupForm && password && confirmPassword && errorMessage) {

    signupForm.addEventListener('submit', (e) => {
        if (password.value !== confirmPassword.value) {
            e.preventDefault();
            errorMessage.style.display = 'block';
            confirmPassword.style.borderColor = '#ff4d4d';
        } else {
            errorMessage.style.display = 'none';
            confirmPassword.style.borderColor = 'var(--border_sec)';
        }
    });

    confirmPassword.addEventListener('input', () => {
        if (password.value === confirmPassword.value) {
            errorMessage.style.display = 'none';
            confirmPassword.style.borderColor = 'var(--border_sec)';
        }
    });
}

// ADD TO CART 

function addToCart(event, name, price) {

    const container = event.target.parentElement;
    const input = container.querySelector('.cart_input');

    const quantity = parseInt(input.value);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Enter valid quantity");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart ✅");
    displayCart();
}

// display cart, shoppingcart page
function displayCart() {
    const container = document.getElementById("cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;
    let totalPrice = 0;

    // 1. Clear the container ONLY if it exists on this page
    if (container) {
        container.innerHTML = "";
    }

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        // 2. ONLY create HTML elements if "cart-items" is on the page
        if (container) {
            container.innerHTML += `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price} DA</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="btn-cart" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
        }
    });

    // 3. Update the Summary numbers (these exist on both pages)
    const itemsElement = document.getElementById("total-items");
    const priceElement = document.getElementById("total-price");

    if (itemsElement) itemsElement.innerText = "Items: " + totalItems;
    if (priceElement) priceElement.innerText = "Total: " + totalPrice + " DA";
}

// Remove from cart logic

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

// search logic

const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('.item');

searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase(); // Convert to lowercase for easier matching

    items.forEach(item => {
        const text = item.textContent.toLowerCase();

        // Check if the item text contains the search term
        if (text.includes(term)) {
            item.style.display = 'block'; // Show match
        } else {
            item.style.display = 'none'; // Hide non-match
        }
    });
});