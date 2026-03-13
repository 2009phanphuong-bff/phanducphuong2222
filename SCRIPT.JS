// Main JavaScript file for The Gioi Trang Phuc website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.querySelector('.main-nav').classList.toggle('active');
        });
    }
    
    // Search functionality
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value;
            if (searchTerm.trim() !== '') {
                alert('Tìm kiếm: ' + searchTerm);
                // Here you would typically redirect to search results page
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email.trim() !== '') {
                alert('Cảm ơn bạn đã đăng ký nhận tin!');
                this.reset();
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm nhất.');
            this.reset();
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart, .btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card, .product-info-detail').querySelector('h1, h3').textContent;
            alert('Đã thêm "' + productName + '" vào giỏ hàng!');
        });
    });
    
    // Buy now functionality
    const buyNowButtons = document.querySelectorAll('.btn-buy-now');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Chuyển đến trang thanh toán');
            // Here you would typically redirect to checkout page
        });
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.far.fa-heart');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('fas');
            this.classList.toggle('far');
            if (this.classList.contains('fas')) {
                alert('Đã thêm vào danh sách yêu thích');
            } else {
                alert('Đã xóa khỏi danh sách yêu thích');
            }
        });
    });
    
    // Product filter functionality
    const filterCheckboxes = document.querySelectorAll('.filter-option input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Here you would typically filter products
            console.log('Filter changed');
        });
    });
    
    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // Here you would typically sort products
            console.log('Sort by:', this.value);
        });
    }
    
    // Quantity input validation
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            const min = parseInt(this.min);
            const max = parseInt(this.max);
            
            if (isNaN(value) || value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
        });
    }
    
    // Auto-hide alerts after 3 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    });
    
    // Smooth scroll for anchor links
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
    
    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Slide show functionality (if needed)
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    if (slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].classList.add('active');
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
}

// Auto start slideshow
if (document.querySelector('.hero-slider')) {
    showSlides();
}

// Product image gallery functions
function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = thumbnail.src;
        
        // Update active state
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnail.classList.add('active');
    }
}

function increaseQuantity() {
    const input = document.getElementById('quantity');
    if (input) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-header').forEach(header => {
        header.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Password validation for registration page
function validatePassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (password && confirmPassword) {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Mật khẩu không khớp');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }
}

// Add to window object for global access
window.changeImage = changeImage;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.showTab = showTab;
window.validatePassword = validatePassword;