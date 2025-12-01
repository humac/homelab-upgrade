/**
 * Main application entry point
 * Homelab 10G Upgrade Guide
 */

import { initNavigation } from './navigation.js';

/**
 * Initialize the application
 */
async function init() {
    try {
        // Load phases data
        const response = await fetch('data/phases.json');
        const data = await response.json();

        // Initialize navigation with phases
        initNavigation(data.phases);

        // Set up keyboard navigation
        setupKeyboardNavigation();

        // Add mobile menu toggle if needed
        setupMobileMenu();

        console.log('Homelab Upgrade Guide initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to load application data. Please refresh the page.');
    }
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.btn-primary[data-goto]');
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.click();
            }
        } else if (e.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.btn-secondary[data-goto]');
            if (prevBtn && !prevBtn.disabled) {
                prevBtn.click();
            }
        }
    });
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
    // Check if we need mobile menu based on screen size
    const checkMobile = () => {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 1024) {
            sidebar?.classList.add('mobile-hidden');
        } else {
            sidebar?.classList.remove('mobile-hidden');
        }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
}

/**
 * Show error message to user
 */
function showError(message) {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="phase">
                <div class="danger-box">
                    <h3>Error</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
