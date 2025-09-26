// script.js

const largeLogoContainer = document.getElementById('large-logo-container');
const mainNav = document.getElementById('main-nav');
const largeLogo = document.getElementById('large-logo');

// Check if elements exist before attempting to animate (important for multi-page sites)
if (largeLogoContainer && mainNav && largeLogo) {

    const initialLogoSize = largeLogo.offsetWidth;
    const finalLogoSize = 100; // Final size in nav

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Logo Animation Logic
        if (scrollPosition > 0) {
            // 1. Show the fixed nav
            mainNav.classList.remove('nav-hidden');

            // 2. Animate the logo container's position (moving it up and left)
            const scrollLimit = 500;
            const scrollFactor = Math.min(scrollPosition, scrollLimit) / scrollLimit;

            // Calculate size reduction
            const newSize = initialLogoSize - (initialLogoSize - finalLogoSize) * scrollFactor;
            
            // Calculate position offset (moving towards top-left)
            const offsetY = scrollFactor * 400; // Move up 400px maximum
            const offsetX = scrollFactor * 300; // Move left 300px maximum

            // Apply transformations only if the initial logo is still visible on screen
            if (scrollPosition < window.innerHeight) {
                largeLogoContainer.style.transform = `translate(${-offsetX}px, ${-offsetY}px) scale(${newSize / initialLogoSize})`;
                largeLogoContainer.style.opacity = 1 - scrollFactor;
            }


        } else {
            // Reset state when back at the top
            mainNav.classList.add('nav-hidden');
            largeLogoContainer.style.transform = 'none';
            largeLogoContainer.style.opacity = 1;
        }
    });

} else {
    // If we are on a secondary page (about.html, contact.html), ensure the nav is visible
    if (mainNav) {
        mainNav.classList.remove('nav-hidden');
    }
}
