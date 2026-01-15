document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon
        const iconName = theme === 'dark' ? 'sun' : 'moon';
        themeToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
        lucide.createIcons();
    };

    setTheme(storedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // 3. Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        menuBtn.innerHTML = `<i data-lucide="${isActive ? 'x' : 'menu'}"></i>`;
        lucide.createIcons();
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        });
    });

    // 4. Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);



    // 6. Contact Form Handler (Formspree AJAX)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // UI Loading State
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Envoi en cours...`;
            lucide.createIcons();
            formStatus.textContent = "";
            formStatus.style.color = "var(--text-muted)";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("https://formspree.io/f/mojjvnvl", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = "Message envoyé avec succès ! Nous vous répondrons bientôt.";
                    formStatus.style.color = "var(--success)";
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = "Oops! Une erreur s'est produite lors de l'envoi.";
                    }
                    formStatus.style.color = "var(--warning)";
                }
            } catch (error) {
                formStatus.textContent = "Erreur de connexion. Veuillez réessayer.";
                formStatus.style.color = "red";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                lucide.createIcons();
            }
        });
    }

    // Add spin animation style for loader if not present
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
    `;
    document.head.appendChild(style);

    const matchElements = document.querySelectorAll('.reveal');
    matchElements.forEach(el => observer.observe(el));
});