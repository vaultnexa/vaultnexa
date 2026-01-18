// image-loader.js - Loads app screenshots into device screens
document.addEventListener('DOMContentLoaded', function() {
    console.log('📸 Initializing image loader...');
    
    // Wait for the main page to fully load
    setTimeout(loadAllAppScreenshots, 1000);
});

function loadAllAppScreenshots() {
    console.log('🖼️ Loading all app screenshots...');
    
    // Define all the app screens and their image mappings
    const appScreens = {
        // Hero section device screens
        'screen1': {
            image: 'medlink_phonescreenimage1.png',
            alt: 'Med-Link Pharmacy App - Home Screen',
            fallbackText: 'Med-Link Pharmacy'
        },
        'screen2': {
            image: 'motorspares_phonescreenimage1.png',
            alt: 'Motor Spares Marketplace - Home Screen',
            fallbackText: 'Motor Spares'
        },
        'screen3': {
            image: 'tommyai_phonescreen1.png',
            alt: 'Tommy A.I Booking System - Dashboard',
            fallbackText: 'Tommy A.I'
        },
        
        // Showcase section - Med-Link
        'medlinkScreen1': {
            image: 'medlink_phonescreenimage1.png',
            alt: 'Med-Link Pharmacy App - Prescription Screen',
            fallbackText: 'Med-Link Prescription'
        },
        'medlinkScreen2': {
            image: 'medlink_phonescreenimage2.png',
            alt: 'Med-Link Pharmacy App - Doctor Consultation',
            fallbackText: 'Med-Link Consultation'
        },
        
        // Showcase section - Motor Spares
        'motorsparesScreen1': {
            image: 'motorspares_phonescreenimage1.png',
            alt: 'Motor Spares Marketplace - Product Search',
            fallbackText: 'Motor Spares Search'
        },
        'motorsparesScreen2': {
            image: 'motorspares_phonescreenimage2.png',
            alt: 'Motor Spares Marketplace - Order Details',
            fallbackText: 'Motor Spares Order'
        },
        
        // Showcase section - Tommy A.I
        'tommyaiScreen1': {
            image: 'tommyai_phonescreen1.png',
            alt: 'Tommy A.I Booking System - Flight Search',
            fallbackText: 'Tommy A.I Flights'
        },
        'tommyaiScreen2': {
            image: 'tommyai_phonescreen2.png',
            alt: 'Tommy A.I Booking System - Hotel Booking',
            fallbackText: 'Tommy A.I Hotels'
        },
        
        // Showcase section - Vision A.I (using Med-Link as placeholder)
        'visionaiScreen1': {
            image: 'medlink_phonescreenimage1.png',
            alt: 'Vision A.I Eye Health - Vision Test',
            fallbackText: 'Vision A.I Test'
        },
        'visionaiScreen2': {
            image: 'medlink_phonescreenimage2.png',
            alt: 'Vision A.I Eye Health - Results Screen',
            fallbackText: 'Vision A.I Results'
        }
    };
    
    // Load each screen
    Object.entries(appScreens).forEach(([screenId, screenData]) => {
        loadScreenImage(screenId, screenData.image, screenData.alt, screenData.fallbackText);
    });
    
    // Also load images into the modal carousels when they open
    setupModalImageLoading();
    
    console.log('✅ All app screenshots loaded');
}

// Update the image loading function in image-loader.js
function loadScreenImage(screenId, imagePath, altText, fallbackText) {
    const screenElement = document.getElementById(screenId);
    if (!screenElement) {
        console.warn(`⚠️ Screen element not found: ${screenId}`);
        return;
    }
    
    console.log(`📱 Loading ${imagePath} into ${screenId}`);
    
    // Create image element
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = altText;
    img.className = 'app-screenshot loading';
    img.loading = 'lazy';
    
    // Add error handling
    img.onerror = function() {
        console.warn(`❌ Failed to load image: ${imagePath}`);
        this.style.display = 'none';
        showImageFallback(screenElement, fallbackText, imagePath);
    };
    
    // Add load success handler
    img.onload = function() {
        console.log(`✅ Image loaded: ${imagePath}`);
        console.log(`📏 Image dimensions: ${this.naturalWidth}x${this.naturalHeight}`);
        
        // Check image aspect ratio and adjust if needed
        const aspectRatio = this.naturalWidth / this.naturalHeight;
        console.log(`📐 Aspect ratio: ${aspectRatio.toFixed(2)}`);
        
        // Remove loading class with animation
        setTimeout(() => {
            this.classList.remove('loading');
            this.classList.add('loaded');
            
            // Add subtle scale animation
            gsap.fromTo(this, 
                { opacity: 0, scale: 0.95 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.6, 
                    ease: 'power2.out',
                    onComplete: () => {
                        // Remove loading shimmer
                        const parent = this.parentElement;
                        if (parent) {
                            parent.style.background = 'none';
                        }
                    }
                }
            );
        }, 100);
    };
    
    // Clear existing content and add new image
    screenElement.innerHTML = '';
    screenElement.appendChild(img);
    
    // Set background color while loading
    screenElement.style.background = 'var(--light-gray)';
    if (document.body.classList.contains('dark-mode')) {
        screenElement.style.background = '#2D2D44';
    }
    
    // Add hover effect for device screens
    const device = screenElement.closest('.device, .preview-phone, .preview-tablet');
    if (device) {
        device.addEventListener('mouseenter', () => {
            if (img.complete && img.naturalHeight !== 0) {
                gsap.to(img, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        device.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

function showImageFallback(element, appName, imagePath) {
    // Check if fallback already exists
    if (element.querySelector('.image-fallback')) return;
    
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback';
    
    // Create a gradient based on app name
    let gradient = 'linear-gradient(135deg, #6C63FF 0%, #36D1DC 100%)';
    if (appName.includes('Med-Link')) gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    if (appName.includes('Motor')) gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    if (appName.includes('Tommy')) gradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    if (appName.includes('Vision')) gradient = 'linear-gradient(135deg, #36D1DC 0%, #4CAF50 100%)';
    
    fallback.style.background = gradient;
    fallback.innerHTML = `
        <div class="fallback-content">
            <i class="fas fa-mobile-alt"></i>
            <h4>${appName}</h4>
            <p>App Preview</p>
            <small>Image: ${imagePath.split('/').pop()}</small>
        </div>
    `;
    
    element.appendChild(fallback);
    
    // Add animation
    gsap.fromTo(fallback, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
}

function setupModalImageLoading() {
    // Watch for modal opening to load images there too
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const modal = mutation.target;
                if (modal.classList.contains('active')) {
                    // Modal just opened, load any missing images
                    setTimeout(loadModalImages, 100);
                }
            }
        });
    });
    
    const modal = document.getElementById('appModal');
    if (modal) {
        observer.observe(modal, { attributes: true });
    }
}

function loadModalImages() {
    const modalImages = document.querySelectorAll('.app-carousel-image[src*=".png"]');
    modalImages.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            // Image failed to load, show fallback
            const parent = img.parentElement;
            const alt = img.alt || 'App Screenshot';
            const appName = alt.split(' - ')[0] || 'App';
            
            img.style.display = 'none';
            showImageFallback(parent, appName, img.src);
        }
    });
}

// Preload images for better performance
function preloadAppImages() {
    console.log('⚡ Preloading app images...');
    
    const imagesToPreload = [
        'medlink_phonescreenimage1.png',
        'medlink_phonescreenimage2.png',
        'motorspares_phonescreenimage1.png',
        'motorspares_phonescreenimage2.png',
        'tommyai_phonescreen1.png',
        'tommyai_phonescreen2.png'
    ];
    
    imagesToPreload.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => console.log(`⚡ Preloaded: ${imagePath}`);
        img.onerror = () => console.warn(`⚡ Failed to preload: ${imagePath}`);
    });
}

// Initialize when DOM is loaded
window.addEventListener('load', function() {
    // Start preloading
    preloadAppImages();
    
    // Load screenshots with a slight delay to ensure DOM is ready
    setTimeout(loadAllAppScreenshots, 500);
});

// Export for debugging
window.imageLoader = {
    reloadAll: loadAllAppScreenshots,
    preload: preloadAppImages
};