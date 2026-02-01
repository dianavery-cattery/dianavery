// Mobile Navigation Dropdown (≤576px)
(() => {
    const navLinks = document.querySelector('.nav-links');
    const navWrapper = document.querySelector('.nav-links-wrapper');
    
    if (!navLinks || !navWrapper) return;

    let navToggle = null;
    let toggleContainer = null;

    function createMobileNav() {
        // Create toggle button if it doesn't exist
        if (!navToggle) {
            navToggle = document.createElement('button');
            navToggle.className = 'nav-toggle';
            navToggle.setAttribute('aria-label', 'Toggle navigation menu');
            navToggle.innerHTML = '☰'; // Menu icon
            
            // Create a container for the toggle
            toggleContainer = document.createElement('div');
            toggleContainer.style.display = 'flex';
            toggleContainer.style.justifyContent = 'center';
            toggleContainer.appendChild(navToggle);
            
            // Insert toggle before nav links
            navWrapper.insertBefore(toggleContainer, navLinks);

            // Toggle click event
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = navLinks.classList.toggle('show');
                navToggle.classList.toggle('active');
                
                if (isOpen) {
                    // Move toggle to bottom of nav links when open
                    navLinks.appendChild(toggleContainer);
                    navToggle.innerHTML = '▲';
                    toggleContainer.classList.add('nav-toggle-bottom');
                } else {
                    // Move toggle back to top when closed
                    navWrapper.insertBefore(toggleContainer, navLinks);
                    navToggle.innerHTML = '☰';
                    toggleContainer.classList.remove('nav-toggle-bottom');
                }
            });
        }

        // Show toggle
        if (toggleContainer) {
            toggleContainer.style.display = 'flex';
        }
    }

    function removeMobileNav() {
        // Hide toggle and show all nav items
        if (navToggle && toggleContainer) {
            toggleContainer.style.display = 'none';
            navLinks.classList.remove('show');
            navToggle.classList.remove('active');
            navToggle.innerHTML = '☰';
            toggleContainer.classList.remove('nav-toggle-bottom');
            
            // Ensure toggle is at the top
            if (toggleContainer.parentNode === navLinks) {
                navWrapper.insertBefore(toggleContainer, navLinks);
            }
        }
    }

    function handleMobileNav() {
        if (window.innerWidth <= 576) {
            createMobileNav();
        } else {
            removeMobileNav();
        }
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 576 && 
            navLinks.classList.contains('show') && 
            !navWrapper.contains(e.target)) {
            navLinks.classList.remove('show');
            if (navToggle && toggleContainer) {
                navToggle.classList.remove('active');
                navToggle.innerHTML = '☰';
                toggleContainer.classList.remove('nav-toggle-bottom');
                navWrapper.insertBefore(toggleContainer, navLinks);
            }
        }
    });

    // Close dropdown when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 576 && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                if (navToggle && toggleContainer) {
                    navToggle.classList.remove('active');
                    navToggle.innerHTML = '☰';
                    toggleContainer.classList.remove('nav-toggle-bottom');
                    navWrapper.insertBefore(toggleContainer, navLinks);
                }
            }
        });
    });

    // Run on load
    handleMobileNav();

    // Run on resize
    window.addEventListener('resize', handleMobileNav);
})();