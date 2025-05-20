document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Smooth scroll for navbar links (Bootstrap handles some of this, but this is more explicit)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Deactivate other active links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Activate current link
                    this.classList.add('active');
                    
                    // Smooth scroll
                    // Add a small offset to account for the fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close navbar on mobile after click
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarToggler && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click(); // Simulate click to close
                    }
                }
            }
        });
    });

    // Optional: Add 'active' class to nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // Add a bit more offset
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            } else if (current === '' && link.getAttribute('href') === '#hero') {
                 link.classList.add('active'); // Default to hero if at top
            }
        });
        // If scrolled to the very top, make 'Главная' active
        if (window.pageYOffset < sections[0].offsetTop - navbarHeight - 50) {
             navLinks.forEach(link => link.classList.remove('active'));
             document.querySelector('.nav-link[href="#hero"]').classList.add('active');
        }
    });

});
