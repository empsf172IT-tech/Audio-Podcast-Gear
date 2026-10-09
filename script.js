document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'backdrop-blur-md', 'bg-opacity-90');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('shadow-md', 'backdrop-blur-md', 'bg-opacity-90');
            navbar.classList.add('bg-transparent');
        }

        // 4. Update active link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active', 'text-copper');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-copper');
            }
        });
    });

    // 5. Cart functionality
    const addCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    let count = parseInt(localStorage.getItem('cartCount')) || 0;
    if (cartCount) cartCount.textContent = count;

    addCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            count++;
            if (cartCount) cartCount.textContent = count;
            localStorage.setItem('cartCount', count);
            // Show subtle feedback
            const originalText = btn.textContent;
            btn.textContent = 'Added!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    });

    // 6. 360 Viewer logic (Simulated Drag)
    const viewerInner = document.getElementById('viewer-inner');
    if (viewerInner) {
        let isDragging = false;
        let startX;
        let rotation = 0;

        viewerInner.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            viewerInner.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            if(viewerInner) viewerInner.style.cursor = 'grab';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (x - startX) * 0.5; // Scroll-fast
            rotation += walk;
            viewerInner.style.transform = `rotateY(${rotation}deg)`;
            startX = x;
        });
    }

    // 7. Forms and Accordions
    const setupForm = document.getElementById('booking-form');
    if (setupForm) {
        setupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Consultation successfully booked! We will contact you soon.');
            setupForm.reset();
        });
    }

    const warrantyForm = document.getElementById('warranty-form');
    if (warrantyForm) {
        warrantyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Warranty registered successfully!');
            warrantyForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Subscribed successfully!');
            newsletterForm.reset();
        });
    }
});
