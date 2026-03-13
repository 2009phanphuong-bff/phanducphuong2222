// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-toggle') && !event.target.closest('.nav-links')) {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = document.querySelector('.menu-toggle i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
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

    // Form validation for signup
    const signupForm = document.querySelector('.signup-form form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            
            if (password.value !== confirmPassword.value) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }
            
            if (password.value.length < 6) {
                alert('Mật khẩu phải có ít nhất 6 ký tự!');
                return;
            }
            
            alert('Đăng ký thành công!');
            // Reset form
            this.reset();
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
            this.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Cảm ơn bạn đã đăng ký nhận tin!');
                this.reset();
            }
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            alert(`Đã thêm "${productName}" vào giỏ hàng!\nGiá: ${productPrice}`);
            
            // Animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Filter functionality
    const categoryFilter = document.getElementById('category');
    const sortFilter = document.getElementById('sort');
    const searchInput = document.querySelector('.filter-search input');
    const searchButton = document.querySelector('.filter-search button');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            filterProducts();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    }

    function filterProducts() {
        // This is a simulation - in real project, you would filter the products
        console.log('Filtering products...');
        // You can add animation to show filtering
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            product.style.opacity = '0.5';
            setTimeout(() => {
                product.style.opacity = '1';
            }, 300);
        });
    }

    // Scroll to top button (if you want to add one)
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    function loadImage(image) {
        image.src = image.dataset.src;
        image.classList.add('loaded');
    }

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, imageOptions);

        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => loadImage(img));
    }

    // Active link highlighting based on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // Price format
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Add hover effect for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS for scroll top button dynamically
const style = document.createElement('style');
style.textContent = `
    .scroll-top:hover {
        background-color: var(--secondary-color) !important;
        transform: translateY(-3px);
    }
    
    .product-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-card:hover {
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);
// DOM Elements - Kiểm tra tồn tại trước khi sử dụng
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
                navLinks.classList.remove('active');
                const icon = document.querySelector('.menu-toggle i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // Close menu when clicking a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = document.querySelector('.menu-toggle i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Scroll to Top Button
    const scrollTop = document.getElementById('scrollTop');
    
    if (scrollTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTop.style.display = 'flex';
            } else {
                scrollTop.style.display = 'none';
            }
        });

        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                const email = emailInput.value;
                if (validateEmail(email)) {
                    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.');
                    this.reset();
                } else {
                    alert('Vui lòng nhập email hợp lệ!');
                }
            }
        });
    }

    // SIGNUP FORM - Fixed version
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements safely
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const terms = document.getElementById('terms');
            
            // Validation
            let errors = [];
            
            // Validate fullname
            if (!fullname || !fullname.value || fullname.value.trim() === '') {
                errors.push('Vui lòng nhập họ tên');
                if (fullname) highlightError(fullname);
            } else if (fullname.value.trim().length < 3) {
                errors.push('Họ tên phải có ít nhất 3 ký tự');
                if (fullname) highlightError(fullname);
            } else {
                if (fullname) removeError(fullname);
            }
            
            // Validate email
            if (!email || !email.value || !validateEmail(email.value)) {
                errors.push('Email không hợp lệ');
                if (email) highlightError(email);
            } else {
                if (email) removeError(email);
            }
            
            // Validate phone (optional)
            if (phone && phone.value && phone.value.trim() !== '') {
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
                if (!phoneRegex.test(phone.value.trim())) {
                    errors.push('Số điện thoại không hợp lệ (VD: 0912345678)');
                    if (phone) highlightError(phone);
                } else {
                    if (phone) removeError(phone);
                }
            }
            
            // Validate password
            if (!password || !password.value) {
                errors.push('Vui lòng nhập mật khẩu');
                if (password) highlightError(password);
            } else if (password.value.length < 6) {
                errors.push('Mật khẩu phải có ít nhất 6 ký tự');
                if (password) highlightError(password);
            } else {
                if (password) removeError(password);
            }
            
            // Validate confirm password
            if (!confirmPassword || !confirmPassword.value) {
                errors.push('Vui lòng xác nhận mật khẩu');
                if (confirmPassword) highlightError(confirmPassword);
            } else if (password && password.value !== confirmPassword.value) {
                errors.push('Mật khẩu xác nhận không khớp');
                if (confirmPassword) highlightError(confirmPassword);
            } else {
                if (confirmPassword) removeError(confirmPassword);
            }
            
            // Validate terms
            if (!terms || !terms.checked) {
                errors.push('Vui lòng đồng ý với điều khoản sử dụng');
                if (terms) {
                    terms.parentElement.style.color = '#ff0000';
                }
            } else {
                if (terms) {
                    terms.parentElement.style.color = '';
                }
            }
            
            // Show errors or success
            if (errors.length > 0) {
                alert('Vui lòng kiểm tra lại thông tin:\n- ' + errors.join('\n- '));
            } else {
                alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
                
                // Log form data (for demo)
                console.log('Đăng ký thành công với thông tin:', {
                    fullname: fullname ? fullname.value : '',
                    email: email ? email.value : '',
                    phone: phone ? phone.value : '',
                    newsletter: document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false
                });
                
                // Reset form
                signupForm.reset();
                
                // Optional: redirect after 2 seconds
                // setTimeout(() => {
                //     window.location.href = 'index.html';
                // }, 2000);
            }
        });
    }

    // Real-time password match validation
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    
    if (passwordField && confirmPasswordField) {
        confirmPasswordField.addEventListener('keyup', function() {
            if (passwordField.value !== this.value) {
                this.style.borderColor = '#ff0000';
                this.style.backgroundColor = '#fff8f8';
            } else {
                this.style.borderColor = '#00cc00';
                this.style.backgroundColor = '#f0fff0';
            }
        });
        
        passwordField.addEventListener('keyup', function() {
            if (confirmPasswordField.value && this.value !== confirmPasswordField.value) {
                confirmPasswordField.style.borderColor = '#ff0000';
                confirmPasswordField.style.backgroundColor = '#fff8f8';
            } else if (confirmPasswordField.value) {
                confirmPasswordField.style.borderColor = '#00cc00';
                confirmPasswordField.style.backgroundColor = '#f0fff0';
            }
        });
    }

    // Contact Form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            let contactErrors = [];
            
            if (nameInput && (!nameInput.value || nameInput.value.trim() === '')) {
                contactErrors.push('Vui lòng nhập họ tên');
                highlightError(nameInput);
            } else if (nameInput) {
                removeError(nameInput);
            }
            
            if (emailInput && (!emailInput.value || !validateEmail(emailInput.value))) {
                contactErrors.push('Email không hợp lệ');
                highlightError(emailInput);
            } else if (emailInput) {
                removeError(emailInput);
            }
            
            if (messageInput && (!messageInput.value || messageInput.value.trim() === '')) {
                contactErrors.push('Vui lòng nhập nội dung tin nhắn');
                highlightError(messageInput);
            } else if (messageInput) {
                removeError(messageInput);
            }
            
            if (contactErrors.length > 0) {
                alert('Vui lòng kiểm tra lại thông tin:\n- ' + contactErrors.join('\n- '));
            } else {
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
                this.reset();
            }
        });
    }

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Find product info
            const productCard = this.closest('.product-card');
            if (productCard) {
                const productNameEl = productCard.querySelector('h3');
                const productPriceEl = productCard.querySelector('.product-price');
                
                const productName = productNameEl ? productNameEl.textContent : 'Sản phẩm';
                const productPrice = productPriceEl ? productPriceEl.textContent : '';
                
                alert(`✅ Đã thêm "${productName}" vào giỏ hàng!\n💰 Giá: ${productPrice}`);
                
                // Animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // Filter functionality
    const categoryFilter = document.getElementById('category');
    const sortFilter = document.getElementById('sort');
    const searchBtn = document.querySelector('.filter-search button');
    const searchInput = document.querySelector('.filter-search input');
    
    function filterProducts() {
        const category = categoryFilter ? categoryFilter.value : 'all';
        const sort = sortFilter ? sortFilter.value : 'newest';
        const search = searchInput ? searchInput.value : '';
        
        console.log('Đang lọc sản phẩm:', { category, sort, search });
        
        // Visual feedback
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            product.style.opacity = '0.5';
            setTimeout(() => {
                product.style.opacity = '1';
            }, 300);
        });
        
        // You can add actual filtering logic here
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    }

    // Active Link Highlighting
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveLink();

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Prevent default for empty links
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

});

// Helper Functions (Global)

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Highlight error function
function highlightError(element) {
    if (element) {
        element.style.borderColor = '#ff0000';
        element.style.backgroundColor = '#fff8f8';
        element.style.transition = 'all 0.3s ease';
    }
}

// Remove error highlight
function removeError(element) {
    if (element) {
        element.style.borderColor = '#ddd';
        element.style.backgroundColor = '#fff';
        element.style.transition = 'all 0.3s ease';
    }
}

// Add to Cart global function (for onclick attributes)
function addToCart(productName, price) {
    alert(`✅ Đã thêm "${productName}" vào giỏ hàng!\n💰 Giá: ${price}`);
    
    // Visual feedback for buttons
    const buttons = document.querySelectorAll('.btn-add-cart');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Add CSS for error states dynamically
const style = document.createElement('style');
style.textContent = `
    .error-border {
        border-color: #ff0000 !important;
        background-color: #fff8f8 !important;
    }
    
    .success-border {
        border-color: #00cc00 !important;
        background-color: #f0fff0 !important;
    }
    
    .btn-add-cart:active {
        transform: scale(0.95);
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);