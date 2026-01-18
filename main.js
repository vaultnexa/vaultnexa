// main.js - UPDATED WITH ALL REQUESTS
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Vault Nexa Website Initializing...');
    
    // Initialize all systems
    initLoadingScreen();
    init3DBackground();
    initParticleSystem();
    initTypewriter();
    initSideNav();
    initServiceCards();
    initCarousels(); // Fixed single screens carousel
    initCounters();
    initPremiumModal(); // Updated premium modal
    initContactForm();
    initScrollAnimations();
    initParallaxEffects();
    initMouseEffects();
    initThemeToggle();
    initPricingInteractions();
    initFormValidation();
    initLazyLoading();
    initAccessibility();
    
    // Initialize hero animations after loading
    setTimeout(() => {
        animateHero();
    }, 1000);
});

// ======================
// LOADING SYSTEM
// ======================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!loadingScreen || !loadingProgress) return;
    
    let progress = 0;
    const totalSteps = 10;
    const stepDuration = 100;
    
    const loadStep = () => {
        if (progress < 100) {
            const increment = Math.random() * 15 + 5;
            progress = Math.min(progress + increment, 100);
            loadingProgress.style.width = `${progress}%`;
            
            const subtitles = [
                'Initializing Quantum Interface...',
                'Loading 3D Environment...',
                'Setting Up Services...',
                'Preparing Portfolio...',
                'Almost Ready...'
            ];
            
            const subtitleIndex = Math.floor(progress / 20);
            if (subtitleIndex < subtitles.length) {
                const subtitle = document.querySelector('.loading-subtitle');
                if (subtitle) subtitle.textContent = subtitles[subtitleIndex];
            }
            
            setTimeout(loadStep, stepDuration);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
                document.body.classList.add('loaded');
                
                animateHero();
                startBackgroundAnimations();
                
                setTimeout(() => {
                    if (loadingScreen.parentElement) {
                        loadingScreen.remove();
                    }
                }, 1000);
                
                window.dispatchEvent(new Event('websiteLoaded'));
            }, 500);
        }
    };
    
    loadStep();
}

// ======================
// FIXED SIDE NAVIGATION - REMOVED NOTIFICATIONS AND SETTINGS
// ======================
function initSideNav() {
    const sideNav = document.getElementById('sideNav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const modeToggle = document.getElementById('modeToggle');
    const toggleBall = document.querySelector('.toggle-ball');
    const mainContent = document.getElementById('mainContent');
    
    if (!sideNav || !navToggle) return;
    
    // Start with menu expanded by default
    sideNav.classList.add('expanded');
    sideNav.classList.remove('collapsed');
    if (mainContent) mainContent.style.marginLeft = '320px';
    
    // Desktop toggle
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSideNav();
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
            mobileMenuToggle.innerHTML = sideNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Theme toggle
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeToggle(isDark);
        });
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            updateThemeToggle(true);
        }
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Auto-collapse menu on mobile after clicking a link
                    if (window.innerWidth <= 992) {
                        sideNav.classList.remove('active');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Initialize for mobile
    if (window.innerWidth <= 992) {
        sideNav.classList.remove('active');
        if (mainContent) mainContent.style.marginLeft = '0';
        if (mobileMenuToggle) mobileMenuToggle.style.display = 'flex';
    } else {
        if (mobileMenuToggle) mobileMenuToggle.style.display = 'none';
    }
    
    // Helper functions
    function toggleSideNav() {
        const isCollapsed = sideNav.classList.toggle('collapsed');
        sideNav.classList.toggle('expanded', !isCollapsed);
        
        if (mainContent) {
            mainContent.style.marginLeft = isCollapsed ? '120px' : '320px';
            mainContent.style.transition = 'margin-left 0.3s ease';
        }
        
        const spans = navToggle.querySelectorAll('span');
        if (isCollapsed) {
            spans[0].style.transform = 'translateY(10px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-10px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    function updateThemeToggle(isDark) {
        if (toggleBall) {
            toggleBall.style.transform = isDark ? 'translateX(25px)' : 'translateX(0)';
        }
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    function handleResize() {
        if (window.innerWidth <= 992) {
            // Mobile
            sideNav.classList.remove('collapsed', 'expanded');
            sideNav.style.left = '-280px';
            if (mainContent) mainContent.style.marginLeft = '0';
            if (mobileMenuToggle) mobileMenuToggle.style.display = 'flex';
        } else {
            // Desktop
            sideNav.style.left = '20px';
            if (mobileMenuToggle) mobileMenuToggle.style.display = 'none';
            const isCollapsed = sideNav.classList.contains('collapsed');
            if (mainContent) {
                mainContent.style.marginLeft = isCollapsed ? '120px' : '320px';
            }
        }
    }
}

// ======================
// 3D BACKGROUND
// ======================
function init3DBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas || !window.THREE) return;
    
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create floating geometry
        const geometry = new THREE.IcosahedronGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x6C63FF,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        
        // Create particle system
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i + 1] = (Math.random() - 0.5) * 50;
            positions[i + 2] = (Math.random() - 0.5) * 50;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x6C63FF,
            transparent: true,
            opacity: 0.6
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        
        camera.position.z = 15;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            particleSystem.rotation.x += 0.001;
            particleSystem.rotation.y += 0.002;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
    } catch (error) {
        console.warn('3D Background failed to initialize:', error);
        canvas.style.display = 'none';
    }
}

// ======================
// TYPEWRITER EFFECT
// ======================
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;
    
    const words = [
        'immersive',
        'cutting-edge',
        'scalable',
        'intuitive',
        'responsive',
        'innovative',
        'high-performance',
        'user-centric'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let speed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            speed = 50;
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            speed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isPaused = true;
            speed = 1500;
            
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, speed);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    setTimeout(type, 1500);
}

// ======================
// HERO ANIMATIONS
// ======================
function animateHero() {
    // Animate hero buttons
    const startProjectBtn = document.getElementById('startProject');
    const viewPortfolioBtn = document.getElementById('viewPortfolio');
    
    if (startProjectBtn) {
        startProjectBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (viewPortfolioBtn) {
        viewPortfolioBtn.addEventListener('click', () => {
            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection) {
                window.scrollTo({
                    top: showcaseSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ======================
// CAROUSEL SYSTEM - FIXED FOR SINGLE SCREENS
// ======================
function initCarousels() {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!track || !slides.length) return;
    
    let currentSlide = 0;
    const slideWidth = slides[0].offsetWidth;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    // Load initial app screenshots
    loadAppScreenshots();
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update app screenshot for current slide
        updateCurrentAppScreenshot();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Use event delegation for buttons and dots
    document.addEventListener('click', (e) => {
        // Check if click is on next button
        if (e.target.closest('.next-btn')) {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        }
        
        // Check if click is on prev button
        if (e.target.closest('.prev-btn')) {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        }
        
        // Check if click is on a dot
        if (e.target.classList.contains('dot')) {
            e.preventDefault();
            const index = Array.from(dots).indexOf(e.target);
            if (index !== -1) {
                currentSlide = index;
                updateCarousel();
            }
        }
        
        // Check if click is on View Demo button
        if (e.target.closest('.project-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const projectBtn = e.target.closest('.project-btn');
            if (projectBtn) {
                const project = projectBtn.getAttribute('data-project');
                openPremiumModal(project);
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Auto-advance
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    updateCarousel();
    startAutoSlide();
    
    // Handle resize
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].offsetWidth;
        if (newSlideWidth !== slideWidth) {
            track.style.transform = `translateX(-${currentSlide * newSlideWidth}px)`;
        }
    });
}

// ======================
// LOAD APP SCREENSHOTS FOR SINGLE SCREENS
// ======================
function loadAppScreenshots() {
    const screens = {
        medlink: document.getElementById('medlinkScreen'),
        motorspares: document.getElementById('motorsparesScreen'),
        tommyai: document.getElementById('tommyaiScreen'),
        visionai: document.getElementById('visionaiScreen')
    };
    
    const appImages = {
        medlink: {
            image: 'medlink_showcase.png',
            fallbackColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            name: 'Med-Link E-Pharmacy'
        },
        motorspares: {
            image: 'motorspares_showcase.png',
            fallbackColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            name: 'Motor Spares Hub'
        },
        tommyai: {
            image: 'tommyai_showcase.png',
            fallbackColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            name: 'Tommy A.I'
        },
        visionai: {
            image: 'visionai_showcase.png',
            fallbackColor: 'linear-gradient(135deg, #36D1DC 0%, #4CAF50 100%)',
            name: 'Vision A.I'
        }
    };
    
    // Load screenshots with fallback
    Object.entries(screens).forEach(([project, screenElement]) => {
        if (!screenElement) return;
        
        const appData = appImages[project];
        if (!appData) return;
        
        const img = new Image();
        img.className = 'app-screenshot loaded';
        img.alt = `${appData.name} App Screenshot`;
        
        img.onload = function() {
            screenElement.innerHTML = '';
            screenElement.appendChild(img);
        };
        
        img.onerror = function() {
            // Show fallback placeholder
            screenElement.innerHTML = `
                <div class="app-screenshot-fallback" style="background: ${appData.fallbackColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 20px;">
                    <i class="fas fa-mobile-alt" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <h4>${appData.name}</h4>
                    <p style="font-size: 12px; opacity: 0.8;">Screenshot: ${appData.image}</p>
                    <small style="font-size: 10px; margin-top: 10px;">(Placeholder - Add your screenshot)</small>
                </div>
            `;
        };
        
        img.src = appData.image;
    });
}

// Update current app screenshot based on active slide
function updateCurrentAppScreenshot() {
    const currentSlide = document.querySelector('.project-slide.active');
    if (!currentSlide) return;
    
    const projectBtn = currentSlide.querySelector('.project-btn');
    if (!projectBtn) return;
    
    const project = projectBtn.getAttribute('data-project');
    const screenElement = document.getElementById(`${project}Screen`);
    
    if (screenElement) {
        // Add active animation
        screenElement.style.animation = 'none';
        setTimeout(() => {
            screenElement.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}

// ======================
// UPDATED PREMIUM MODAL - REDESIGNED
// ======================
function initPremiumModal() {
    const appModal = document.getElementById('appModal');
    const modalClose = document.getElementById('modalClose');
    const requestDemoBtn = document.getElementById('requestDemoBtn');
    const requestProposalBtn = document.getElementById('requestProposalBtn');
    
    if (!appModal || !modalClose) return;
    
    // App data with comprehensive investor information
    const appData = {
        medlink: {
            title: 'Med-Link E-Pharmacy',
            tags: ['Healthcare', 'E-Commerce', 'SaaS'],
            description: 'A revolutionary e-pharmacy platform that has transformed how patients access medication and healthcare services. Our AI-powered platform processes prescriptions, provides symptom checking, and facilitates telemedicine consultations.',
            stats: {
                downloads: '50K+',
                rating: '4.8',
                revenue: '$120K',
                users: '25K+',
                retention: '78%',
                growth: '15% MoM'
            },
            features: [
                'Real-time prescription validation with AI',
                'Symptom checker with 95% accuracy',
                'Secure medication ordering & delivery tracking',
                'Doctor consultation booking with video calls',
                'Insurance claim processing integration',
                'Personalized health recommendations'
            ],
            tech: ['Flutter', 'Firebase', 'Node.js', 'Stripe API', 'TensorFlow Lite', 'WebRTC'],
            developmentCost: '$25,000',
            roi: '480%',
            investmentHighlights: [
                {
                    icon: 'fas fa-chart-line',
                    title: 'Market Size',
                    description: 'Global e-pharmacy market projected to reach $177.8B by 2026'
                },
                {
                    icon: 'fas fa-users',
                    title: 'User Growth',
                    description: 'Consistent 15% monthly user growth with 78% retention rate'
                },
                {
                    icon: 'fas fa-money-bill-wave',
                    title: 'Revenue Streams',
                    description: 'Multiple streams: commission, subscription, premium features'
                },
                {
                    icon: 'fas fa-shield-alt',
                    title: 'Competitive Edge',
                    description: 'AI-powered features and real-time prescription validation'
                }
            ],
            images: 4, // Number of screenshots available
            investmentOpportunity: 'Looking for $100K for scaling to new markets and adding AI diagnostic features'
        },
        motorspares: {
            title: 'Motor Spares Hub',
            tags: ['Automotive', 'Marketplace', 'B2B'],
            description: 'Central marketplace connecting buyers and sellers of motor vehicle parts with real-time inventory, secure payments, and integrated logistics. Platform includes compatibility checking and AI-powered part recommendations.',
            stats: {
                downloads: '30K+',
                rating: '4.7',
                revenue: '$85K',
                users: '18K+',
                retention: '82%',
                growth: '12% MoM'
            },
            features: [
                'Part compatibility checker with AI recommendations',
                'Real-time price comparison across sellers',
                'Secure payment gateway with escrow system',
                'Seller verification and rating system',
                'Integrated logistics and delivery tracking',
                'B2B wholesale marketplace'
            ],
            tech: ['Kotlin', 'Firebase', 'MongoDB', 'Razorpay', 'Google Maps', 'Redis'],
            developmentCost: '$18,000',
            roi: '472%',
            investmentHighlights: [
                {
                    icon: 'fas fa-car',
                    title: 'Market Position',
                    description: 'First mover in specialized auto parts marketplace in region'
                },
                {
                    icon: 'fas fa-network-wired',
                    title: 'Network Effect',
                    description: 'Strong network effects with 500+ verified sellers'
                },
                {
                    icon: 'fas fa-bolt',
                    title: 'Scalability',
                    description: 'Platform easily scalable to new vehicle categories'
                },
                {
                    icon: 'fas fa-handshake',
                    title: 'Partnerships',
                    description: 'Strategic partnerships with major auto manufacturers'
                }
            ],
            images: 4,
            investmentOpportunity: 'Seeking $150K for expansion to industrial machinery parts and international markets'
        },
        tommyai: {
            title: 'Tommy A.I Booking System',
            tags: ['Artificial Intelligence', 'SaaS', 'Travel'],
            description: 'AI-powered booking system that uses machine learning to predict user preferences and find optimal bookings across multiple platforms. Features include price prediction, availability optimization, and personalized recommendations.',
            stats: {
                downloads: '25K+',
                rating: '4.9',
                revenue: '$95K',
                users: '15K+',
                retention: '85%',
                growth: '18% MoM'
            },
            features: [
                'ML-powered preference prediction with 92% accuracy',
                'Real-time multi-platform price comparison',
                'Smart booking time optimization',
                'Personalized recommendation engine',
                'Automated reservation management',
                'Price drop alerts and rebooking'
            ],
            tech: ['Angular', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'FastAPI'],
            developmentCost: '$32,000',
            roi: '297%',
            investmentHighlights: [
                {
                    icon: 'fas fa-robot',
                    title: 'AI Technology',
                    description: 'Proprietary ML algorithms for booking optimization'
                },
                {
                    icon: 'fas fa-globe',
                    title: 'Global Reach',
                    description: 'Integrated with 50+ booking platforms worldwide'
                },
                {
                    icon: 'fas fa-database',
                    title: 'Data Assets',
                    description: 'Proprietary dataset of booking patterns and prices'
                },
                {
                    icon: 'fas fa-crown',
                    title: 'Market Leader',
                    description: 'Highest accuracy rate in booking recommendations'
                }
            ],
            images: 4,
            investmentOpportunity: 'Looking for $200K to develop B2B API and expand to corporate travel management'
        },
        visionai: {
            title: 'Vision A.I Eye Health',
            tags: ['Health Tech', 'AI', 'Telemedicine'],
            description: 'Comprehensive eye health platform featuring digital vision testing, optometrist booking, AI-powered eye care recommendations, and screen time optimization. Uses computer vision for accurate eye testing.',
            stats: {
                downloads: '40K+',
                rating: '4.8',
                revenue: '$150K',
                users: '22K+',
                retention: '80%',
                growth: '20% MoM'
            },
            features: [
                'Digital eye sight testing with 98% accuracy',
                'Optometrist appointment booking system',
                'Eye sight training exercises',
                'AI symptom analysis and recommendations',
                'Screen time optimization',
                'Brightness level recommendations'
            ],
            tech: ['Flutter', 'Firebase', 'OpenCV', 'TensorFlow Lite', 'WebRTC', 'Node.js'],
            developmentCost: '$28,000',
            roi: '536%',
            investmentHighlights: [
                {
                    icon: 'fas fa-eye',
                    title: 'Unique Technology',
                    description: 'Patented computer vision algorithms for eye testing'
                },
                {
                    icon: 'fas fa-heartbeat',
                    title: 'Healthcare Impact',
                    description: 'Screening tool for early detection of eye conditions'
                },
                {
                    icon: 'fas fa-hospital',
                    title: 'Medical Partnerships',
                    description: 'Partnerships with 100+ optometrists and clinics'
                },
                {
                    icon: 'fas fa-mobile-alt',
                    title: 'Mobile First',
                    description: 'Optimized for mobile eye testing convenience'
                }
            ],
            images: 4,
            investmentOpportunity: 'Seeking $250K for FDA certification and expansion to US market'
        }
    };
    
    // WhatsApp number
    const whatsappNumber = '+27765137799';
    
    // Close modal
    modalClose.addEventListener('click', () => {
        closePremiumModal();
    });
    
    // Close modal when clicking outside
    appModal.addEventListener('click', (e) => {
        if (e.target === appModal) {
            closePremiumModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && appModal.classList.contains('active')) {
            closePremiumModal();
        }
    });
    
    // Request Demo button - opens WhatsApp
    if (requestDemoBtn) {
        requestDemoBtn.addEventListener('click', () => {
            const appTitle = document.getElementById('modalAppTitle').textContent;
            const message = `Hi VaultNexa! I'm interested in requesting a live demo for ${appTitle}.`;
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Request Proposal button - opens WhatsApp
    if (requestProposalBtn) {
        requestProposalBtn.addEventListener('click', () => {
            const appTitle = document.getElementById('modalAppTitle').textContent;
            const message = `Hi VaultNexa! I'm interested in getting an investment proposal for ${appTitle}.`;
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Listen for View Demo button clicks from anywhere
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-btn')) {
            e.preventDefault();
            const projectBtn = e.target.closest('.project-btn');
            const project = projectBtn.getAttribute('data-project');
            if (appData[project]) {
                openPremiumModal(project);
            }
        }
    });
    
    function openPremiumModal(project) {
        const data = appData[project];
        
        // Update modal title
        document.getElementById('modalAppTitle').textContent = data.title;
        
        // Update tags
        const modalTags = document.getElementById('modalAppTags');
        modalTags.innerHTML = data.tags.map(tag => 
            `<span class="modal-tag">${tag}</span>`
        ).join('');
        
        // Update description
        document.getElementById('modalAppDescription').innerHTML = `
            <p>${data.description}</p>
            <div class="investment-opportunity" style="margin-top: 15px; padding: 12px; background: rgba(108, 99, 255, 0.1); border-radius: 10px; border-left: 3px solid var(--primary); font-size: 13px;">
                <h5 style="margin: 0 0 8px 0; font-size: 14px; color: var(--primary);"><i class="fas fa-bullseye"></i> Investment Opportunity</h5>
                <p style="margin: 0; color: var(--gray);">${data.investmentOpportunity}</p>
            </div>
        `;
        
        // Update stats
        const statsGrid = document.getElementById('modalAppStats');
        statsGrid.innerHTML = `
            <div class="stat-item">
                <div class="value">${data.stats.downloads}</div>
                <div class="label">Downloads</div>
            </div>
            <div class="stat-item">
                <div class="value">${data.stats.rating}/5</div>
                <div class="label">Rating</div>
            </div>
            <div class="stat-item">
                <div class="value">${data.stats.revenue}</div>
                <div class="label">Revenue</div>
            </div>
            <div class="stat-item">
                <div class="value">${data.stats.growth}</div>
                <div class="label">Monthly Growth</div>
            </div>
        `;
        
        // Update features
        const featuresList = document.getElementById('modalAppFeatures');
        featuresList.innerHTML = data.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        // Update tech stack
        const techTags = document.getElementById('modalAppTech');
        techTags.innerHTML = data.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        // Update investment highlights
        const highlightGrid = document.getElementById('investmentHighlights').querySelector('.highlight-grid');
        highlightGrid.innerHTML = data.investmentHighlights.map(highlight => `
            <div class="highlight-item">
                <div class="icon"><i class="${highlight.icon}"></i></div>
                <h5>${highlight.title}</h5>
                <p>${highlight.description}</p>
            </div>
        `).join('');
        
        // Initialize carousel for this app
        initModalCarousel(project, data.images);
        
        // Show modal with animation
        appModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        const modalContent = appModal.querySelector('.modal-content');
        modalContent.classList.add('modal-open');
        
        // Announce to screen readers
        announceToScreenReader(`Opened ${data.title} detailed view`);
    }
    
    function closePremiumModal() {
        const appModal = document.getElementById('appModal');
        appModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Remove animation class
        const modalContent = appModal.querySelector('.modal-content');
        modalContent.classList.remove('modal-open');
    }
    
    function initModalCarousel(project, totalImages) {
        const carouselTrack = document.getElementById('appCarouselTrack');
        const indicator = document.getElementById('appCarouselIndicator');
        const prevBtn = document.querySelector('.carousel-nav-btn.prev-btn');
        const nextBtn = document.querySelector('.carousel-nav-btn.next-btn');
        
        if (!carouselTrack) return;
        
        // Clear existing slides
        carouselTrack.innerHTML = '';
        
        // Add slides
        for (let i = 1; i <= totalImages; i++) {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <div class="slide-content">
                    <img 
                        src="${project}_screenshot${i}.png" 
                        alt="${project} screenshot ${i}"
                    >
                    <div class="slide-overlay">
                        <span>Screen ${i}</span>
                    </div>
                </div>
            `;
            carouselTrack.appendChild(slide);
        }
        
        // Update indicator
        if (indicator) {
            indicator.querySelector('.current-slide').textContent = '1';
            indicator.querySelector('.total-slides').textContent = totalImages;
        }
        
        let currentSlide = 0;
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        
        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            if (indicator) {
                indicator.querySelector('.current-slide').textContent = currentSlide + 1;
            }
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.onclick = () => {
                currentSlide = (currentSlide + 1) % totalImages;
                updateCarousel();
            };
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.onclick = () => {
                currentSlide = (currentSlide - 1 + totalImages) % totalImages;
                updateCarousel();
            };
        }
        
        // Swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next
                    currentSlide = (currentSlide + 1) % totalImages;
                } else {
                    // Swipe right - previous
                    currentSlide = (currentSlide - 1 + totalImages) % totalImages;
                }
                updateCarousel();
            }
        }
        
        // Initialize
        updateCarousel();
    }
    
    function announceToScreenReader(message) {
        const liveRegion = document.querySelector('[aria-live]');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
}

// ======================
// COUNTER ANIMATIONS
// ======================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('%') ? '%' : '';
        const prefix = counter.textContent.includes('$') ? '$' : '';
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = prefix + Math.ceil(current) + suffix;
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = prefix + target + suffix;
            }
        };
        
        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ======================
// SERVICE CARDS
// ======================
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        // Click to flip
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('card-btn')) {
                const cardInner = card.querySelector('.card-inner');
                if (cardInner.style.transform === 'rotateY(180deg)') {
                    cardInner.style.transform = 'rotateY(0deg)';
                } else {
                    cardInner.style.transform = 'rotateY(180deg)';
                }
            }
        });
    });
    
    // Card buttons - redirect to contact section
    const cardButtons = document.querySelectorAll('.card-btn');
    cardButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const service = button.getAttribute('data-service');
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======================
// CONTACT FORM - UPDATED TO OPEN WHATSAPP
// ======================
function initContactForm() {
    const quoteForm = document.getElementById('quoteForm');
    const whatsappSubmit = document.getElementById('whatsappSubmit');
    const whatsappNumber = '+27765137799';
    
    if (!quoteForm || !whatsappSubmit) return;
    
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const projectType = document.getElementById('projectType').value;
        const budget = document.getElementById('budget').value;
        const timeline = document.getElementById('timeline').value;
        const description = document.getElementById('description').value.trim();
        
        if (!name || !email || !projectType || !budget || !timeline || !description) {
            showNotification('Error', 'Please fill in all required fields.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Error', 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Prepare WhatsApp message
        const projectTypeText = {
            'flutter': 'Flutter App',
            'kotlin': 'Kotlin Android App',
            'game': 'Game Development',
            'web': 'Web Application',
            'full-stack': 'Full Stack Solution',
            'other': 'Other Project'
        }[projectType] || projectType;
        
        const budgetText = {
            '2000-5000': '$2,000 - $5,000',
            '5000-12000': '$5,000 - $12,000',
            '12000-25000': '$12,000 - $25,000',
            '25000+': '$25,000+',
            'not-sure': 'Not sure yet'
        }[budget] || budget;
        
        const timelineText = {
            'asap': 'ASAP (1-3 months)',
            '3-6': '3-6 months',
            '6-12': '6-12 months',
            'flexible': 'Flexible'
        }[timeline] || timeline;
        
        const message = `Hi VaultNexa! I'd like to request a quote:
        
👤 Name: ${name}
📧 Email: ${email}
🎯 Project Type: ${projectTypeText}
💰 Budget: ${budgetText}
⏱️ Timeline: ${timelineText}
📝 Description: ${description}

Please get back to me with a quote!`;
        
        // Open WhatsApp with the message
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Show success notification
        showNotification(
            'WhatsApp Opened!',
            'Your quote request has been prepared. Please send it on WhatsApp.',
            'success'
        );
        
        // Reset form
        setTimeout(() => {
            quoteForm.reset();
        }, 1000);
    });
}

// ======================
// NOTIFICATION SYSTEM
// ======================
window.showNotification = function(title, message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            ${type === 'success' ? '<i class="fas fa-check-circle"></i>' :
              type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' :
              type === 'warning' ? '<i class="fas fa-exclamation-triangle"></i>' :
              '<i class="fas fa-info-circle"></i>'}
        </div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('hiding');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
};

// ======================
// THEME TOGGLE
// ======================
function initThemeToggle() {
    const modeToggle = document.getElementById('modeToggle');
    const toggleBall = document.querySelector('.toggle-ball');
    
    if (!modeToggle) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggleBall) {
            toggleBall.style.transform = 'translateX(25px)';
        }
    }
    
    // Toggle theme
    modeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (toggleBall) {
            toggleBall.style.transform = isDark ? 'translateX(25px)' : 'translateX(0)';
        }
    });
}

// ======================
// PRICING INTERACTIONS
// ======================
function initPricingInteractions() {
    const pricingLinks = document.querySelectorAll('[data-package]');
    
    pricingLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const packageType = link.getAttribute('data-package');
            const contactSection = document.getElementById('contact');
            
            if (contactSection) {
                e.preventDefault();
                
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    const budget = document.getElementById('budget');
                    if (budget) {
                        switch(packageType) {
                            case 'mvp':
                                budget.value = '2000-5000';
                                break;
                            case 'full':
                                budget.value = '5000-12000';
                                break;
                            case 'enterprise':
                                budget.value = '25000+';
                                break;
                        }
                    }
                }, 500);
            }
        });
    });
}

// ======================
// FORM VALIDATION
// ======================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            input.addEventListener('input', () => {
                clearValidation(input);
            });
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        
        if (!value) {
            showError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(input, 'Please enter a valid email address');
                return false;
            }
        }
        
        clearValidation(input);
        return true;
    }
    
    function showError(input, message) {
        clearValidation(input);
        
        const error = document.createElement('div');
        error.className = 'input-error';
        error.textContent = message;
        error.style.cssText = `
            color: var(--danger);
            font-size: 12px;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        `;
        
        input.parentElement.appendChild(error);
        input.style.borderColor = 'var(--danger)';
    }
    
    function clearValidation(input) {
        const error = input.parentElement.querySelector('.input-error');
        if (error) {
            error.remove();
        }
        input.style.borderColor = '';
    }
}

// ======================
// SCROLL ANIMATIONS
// ======================
function initScrollAnimations() {
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate service cards on scroll
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: i * 0.2,
                ease: 'power3.out'
            });
        });
        
        // Animate process steps
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power2.out'
            });
        });
    }
}

// ======================
// PARTICLE SYSTEM
// ======================
function initParticleSystem() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    function createParticle(parent) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 10;
        
        const gradients = [
            'linear-gradient(135deg, #6C63FF, #36D1DC)',
            'linear-gradient(135deg, #FF6584, #FF9A9E)',
            'linear-gradient(135deg, #36D1DC, #4CAF50)'
        ];
        
        const gradient = gradients[Math.floor(Math.random() * gradients.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}vw;
            top: ${y}vh;
            background: ${gradient};
            opacity: ${Math.random() * 0.4 + 0.1};
            border-radius: ${Math.random() > 0.7 ? '0' : '50%'};
            --tx: ${(Math.random() - 0.5) * 300}px;
            --ty: ${(Math.random() - 0.5) * 300}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        parent.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            createParticle(parent);
        }, (duration + delay) * 1000);
    }
}

// ======================
// BACKGROUND ANIMATIONS
// ======================
function startBackgroundAnimations() {
    const blobs = document.querySelectorAll('.shape-blob');
    blobs.forEach(blob => {
        blob.style.animation = 'blob-morph 20s ease-in-out infinite';
    });
}

// ======================
// PARALLAX EFFECTS
// ======================
function initParallaxEffects() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        }
    });
}

// ======================
// MOUSE EFFECTS
// ======================
function initMouseEffects() {
    const cursorTrail = [];
    const trailCount = 8;
    
    for (let i = 0; i < trailCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${0.5 - (i * 0.06)};
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(dot);
        cursorTrail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = [];
    let trailY = [];
    
    for (let i = 0; i < trailCount; i++) {
        trailX[i] = mouseX;
        trailY[i] = mouseY;
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        for (let i = trailCount - 1; i > 0; i--) {
            trailX[i] = trailX[i - 1];
            trailY[i] = trailY[i - 1];
        }
        
        trailX[0] = mouseX;
        trailY[0] = mouseY;
        
        for (let i = 0; i < trailCount; i++) {
            cursorTrail[i].style.left = trailX[i] + 'px';
            cursorTrail[i].style.top = trailY[i] + 'px';
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    document.addEventListener('mouseleave', () => {
        cursorTrail.forEach(dot => dot.style.opacity = '0');
    });
    
    document.addEventListener('mouseenter', () => {
        cursorTrail.forEach((dot, i) => dot.style.opacity = `${0.5 - (i * 0.06)}`);
    });
}

// ======================
// LAZY LOADING
// ======================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        lazyObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => lazyObserver.observe(img));
    }
}

// ======================
// ACCESSIBILITY
// ======================
function initAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(liveRegion);
    
    // Initial announcement
    setTimeout(() => {
        liveRegion.textContent = 'Vault Nexa website loaded successfully. Use tab key to navigate through interactive elements.';
    }, 1000);
}

// ======================
// WINDOW RESIZE HANDLER
// ======================
window.addEventListener('resize', () => {
    // Recalculate carousel slide width
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.project-slide');
    const currentSlide = document.querySelector('.project-slide.active');
    
    if (track && slides.length && currentSlide) {
        const slideIndex = Array.from(slides).indexOf(currentSlide);
        const newSlideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${slideIndex * newSlideWidth}px)`;
    }
});

// ======================
// INITIALIZATION COMPLETE
// ======================
console.log('✅ Vault Nexa website initialized successfully with all updates!');