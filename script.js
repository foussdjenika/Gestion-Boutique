document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialiser les icônes
    lucide.createIcons();

    // 2. Gestion du Mode Sombre
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Vérifier le thème système par défaut
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';

    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    html.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });

    function updateThemeButton(theme) {
        themeToggle.innerHTML = '';
        const newIcon = document.createElement('i');
        newIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        themeToggle.appendChild(newIcon);
        lucide.createIcons();
    }

    // 3. Gestion du Menu Mobile
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navLinks.classList.contains('active') ? 'x' : 'menu';
        menuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        });
    });

    // 4. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .feature-card, .pricing-card, .faq-item, .hero-content');
    
    // Ajouter la classe de base
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Déclencher une fois au chargement
    revealOnScroll();
});