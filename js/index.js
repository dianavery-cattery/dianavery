// Smooth scrolling for anchor links
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

// Scroll animations (IntersectionObserver)
const observerOptions = {
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
        }
    });
}, observerOptions);

// Responsive nav centering (for medium screens if still needed)
(() => {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;

    // Store original <li> elements once
    const originalItems = Array.from(nav.children);

    const mq = window.matchMedia('(min-width: 577px) and (max-width: 644px)');

    function applyCenteredGrid() {
        if (nav.dataset.split === 'true') return;

        nav.innerHTML = '';

        const topRow = document.createElement('div');
        const bottomRow = document.createElement('div');

        topRow.className = 'nav-row top';
        bottomRow.className = 'nav-row bottom';

        const splitIndex = Math.ceil(originalItems.length / 2);

        const topItems = originalItems.slice(0, splitIndex);
        const bottomItems = originalItems.slice(splitIndex);

        topRow.style.gridTemplateColumns = `repeat(${topItems.length}, auto)`;
        bottomRow.style.gridTemplateColumns = `repeat(${bottomItems.length}, auto)`;

        topItems.forEach(li => topRow.appendChild(li));
        bottomItems.forEach(li => bottomRow.appendChild(li));

        nav.appendChild(topRow);
        nav.appendChild(bottomRow);

        nav.dataset.split = 'true';
    }

    function restoreFlexLayout() {
        if (nav.dataset.split !== 'true') return;

        nav.innerHTML = '';
        originalItems.forEach(li => nav.appendChild(li));

        nav.dataset.split = 'false';
    }

    function handleMediaChange(e) {
        if (e.matches) {
            applyCenteredGrid();
        } else {
            restoreFlexLayout();
        }
    }

    // Run on load
    handleMediaChange(mq);

    // Run on resize / orientation change
    mq.addEventListener('change', handleMediaChange);
})();