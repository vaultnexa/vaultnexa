// image-fallback.js - Enhanced image loading with fallbacks
document.addEventListener('DOMContentLoaded', function() {
    // Image error handling for all app screenshots
    document.querySelectorAll('img[src*="screen"]').forEach(img => {
        // Add loading state
        img.classList.add('img-loading');
        
        // Create loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'img-loading-spinner';
        img.parentElement.appendChild(spinner);
        
        // Handle image load
        img.addEventListener('load', function() {
            this.classList.remove('img-loading');
            this.classList.add('img-loaded');
            if (spinner.parentElement) {
                spinner.remove();
            }
        });
        
        // Handle image error
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            
            // Remove spinner
            if (spinner.parentElement) {
                spinner.remove();
            }
            
            // Create fallback
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            
            // Extract app name from alt text or src
            let appName = 'App Preview';
            if (this.alt) {
                appName = this.alt.split('-')[0] || this.alt.split(' ')[0];
            } else if (this.src.includes('medlink')) {
                appName = 'Med-Link';
            } else if (this.src.includes('motorspares')) {
                appName = 'Motor Spares';
            } else if (this.src.includes('tommyai')) {
                appName = 'Tommy A.I';
            } else if (this.src.includes('visionai')) {
                appName = 'Vision A.I';
            }
            
            fallback.innerHTML = `
                <div>
                    <i class="fas fa-mobile-alt"></i>
                    <p>${appName}</p>
                    <small>Preview Image</small>
                </div>
            `;
            
            // Replace image with fallback
            this.style.display = 'none';
            this.parentElement.appendChild(fallback);
        });
    });
    
    // Preload critical images
    const preloadImages = [
        'medlink_phonescreenimage1.png',
        'motorspares_phonescreenimage1.png',
        'tommyai_phonescreen1.png'
    ];
    
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});