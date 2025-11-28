document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Initialiser les icônes
            lucide.createIcons();

            // 2. Gestion du Mode Sombre
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;

            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                html.setAttribute('data-theme', savedTheme);
                updateThemeButton(savedTheme);
            }

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
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        });