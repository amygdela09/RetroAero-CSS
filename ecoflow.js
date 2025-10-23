/**
 * EcoFlow.js
 * Version: 1.0.0
 * Description: Initializes and animates a dynamic, multi-colored orb background
 * for the EcoFlow Frutiger Aero CSS library.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Self-Executing Orb Animation ---
    const orbContainer = document.querySelector('.bg-orbs');

    // If there's no orb container on the page, do nothing.
    if (!orbContainer) {
        console.log("EcoFlow.js: No .bg-orbs container found. Orb animation not started.");
        return;
    }

    // --- Configuration ---
    const numberOfOrbs = 15;
    const colorClasses = ['orb--blue', 'orb--green', 'orb--yellow'];
    let orbs = [];

    /**
     * Creates, configures, and animates all orbs.
     */
    function initializeOrbs() {
        // Clear any existing orbs before re-initializing (e.g., on resize)
        orbContainer.innerHTML = '';
        orbs = [];

        for (let i = 0; i < numberOfOrbs; i++) {
            const orbElement = document.createElement('div');
            orbElement.classList.add('orb');
            orbContainer.appendChild(orbElement);
            
            const size = Math.random() * (140 - 40) + 40; // Random size between 40px and 140px
            orbElement.style.width = `${size}px`;
            orbElement.style.height = `${size}px`;

            // Add a random color class
            orbElement.classList.add(colorClasses[Math.floor(Math.random() * colorClasses.length)]);

            orbs.push({
                element: orbElement,
                size: size,
                x: Math.random() * (window.innerWidth - size),
                y: Math.random() * (window.innerHeight - size),
                dx: (Math.random() - 0.5) * 1.5, // Velocity X
                dy: (Math.random() - 0.5) * 1.5, // Velocity Y
            });
        }
    }
    
    /**
     * The main animation loop, powered by requestAnimationFrame.
     */
    function animateOrbs() {
        const viewportWidth = window.innerWidth;
        // Make the animation scroll with the page content for a more parallax feel
        const viewportHeight = document.body.scrollHeight; 
        
        orbs.forEach(orb => {
            orb.x += orb.dx;
            orb.y += orb.dy;

            // Bounce off horizontal edges
            if (orb.x <= 0 || orb.x + orb.size >= viewportWidth) {
                orb.dx *= -1;
            }
            
            // Bounce off vertical edges
            if (orb.y <= 0 || orb.y + orb.size >= viewportHeight) {
                orb.dy *= -1;
            }
            
            // Clamp position to prevent orbs from getting stuck
            orb.x = Math.max(0, Math.min(orb.x, viewportWidth - orb.size));
            orb.y = Math.max(0, Math.min(orb.y, viewportHeight - orb.size));

            // Apply new position using a hardware-accelerated property
            orb.element.style.transform = `translate3d(${orb.x}px, ${orb.y}px, 0)`;
        });

        requestAnimationFrame(animateOrbs);
    }

    // Start the magic
    initializeOrbs();
    animateOrbs();
    
    // Re-initialize orbs on window resize to adjust their positions
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initializeOrbs, 250);
    });

    console.log("EcoFlow.js: Orb animations initialized successfully.");
});
