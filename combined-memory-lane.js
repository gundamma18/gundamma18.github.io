// Combined Memory Lane JavaScript
// Manages the overall scrolling experience and navigation between sections

gsap.registerPlugin(ScrollTrigger);

// Global state
const memoryLane = {
    currentSection: 0,
    totalSections: 2,
    isTransitioning: false,
    sectionsData: [
        {
            id: 'bumble-meeting',
            name: 'First Bumble Meeting',
            element: null
        },
        {
            id: 'coffee-meeting', 
            name: 'First Coffee Together',
            element: null
        }
    ]
};

// DOM Elements
let memoryCounter, memoryNav, navDots, transitionSection;

// Initialize combined experience
document.addEventListener('DOMContentLoaded', function() {
    initializeMemoryLane();
    setupNavigation();
    setupSectionTracking();
    setupKeyboardNavigation();
    setupSwipeGestures();
    setupTransitionAnimation();
    setupCoffeeMemoryAnimations();
});

// Initialize the memory lane experience
function initializeMemoryLane() {
    // Cache DOM elements
    memoryCounter = document.getElementById('memory-counter');
    memoryNav = document.getElementById('memory-nav');
    navDots = document.querySelectorAll('.nav-dot');
    transitionSection = document.getElementById('memory-transition');
    
    // Cache section elements
    memoryLane.sectionsData.forEach((section, index) => {
        section.element = document.getElementById(section.id);
    });
    
    // Update total memories count
    document.getElementById('total-memories').textContent = memoryLane.totalSections;
    
    // Set initial state
    updateMemoryCounter(1);
    
    console.log('Memory Lane initialized with', memoryLane.totalSections, 'sections');
}

// Setup transition animation between memories
function setupTransitionAnimation() {
    const transitionCupLeft = document.getElementById('transition-cup-left');
    const transitionCupRight = document.getElementById('transition-cup-right');
    const transitionHearts = document.getElementById('transition-hearts');
    const transitionText = document.getElementById('transition-text');
    
    if (!transitionCupLeft || !transitionCupRight) {
        console.log('Transition elements not found');
        return;
    }
    
    // Create timeline for transition animation
    const transitionTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: transitionSection,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onEnter: () => {
                console.log('Transition animation started');
            }
        }
    });
    
    // 1. Cups slide in from left and right
    transitionTimeline.to(transitionCupLeft, {
        x: 60,
        duration: 1.5,
        ease: "power2.out"
    }, 0)
    .to(transitionCupRight, {
        x: -60,
        duration: 1.5,
        ease: "power2.out"
    }, 0)
    
    // 2. Hearts appear when cups meet
    .to(transitionHearts, {
        opacity: 1,
        scale: 1.2,
        duration: 1,
        ease: "power2.out"
    }, 1.2)
    
    // 3. Transition text appears
    .to(transitionText, {
        opacity: 1,
        y: -10,
        duration: 0.8,
        ease: "power2.out"
    }, 1.8);
    
    // Add a "clink" sound effect animation
    ScrollTrigger.create({
        trigger: transitionSection,
        start: "center center",
        onEnter: () => {
            // Add visual "clink" effect
            addClinkEffect();
        }
    });
}

// Add visual clink effect when cups meet
function addClinkEffect() {
    const cupsContainer = document.querySelector('.transition-cups-container');
    if (!cupsContainer) return;
    
    // Create sparkle effect
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 16px;
            pointer-events: none;
            z-index: 100;
        `;
        
        cupsContainer.appendChild(sparkle);
        
        const angle = (360 / 8) * i;
        const distance = 60 + Math.random() * 30;
        
        gsap.to(sparkle, {
            x: Math.cos(angle * Math.PI / 180) * distance,
            y: Math.sin(angle * Math.PI / 180) * distance,
            opacity: 0,
            scale: 0.5,
            duration: 2,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
    
    // Add screen shake effect
    gsap.to(cupsContainer, {
        x: "+=3",
        yoyo: true,
        repeat: 3,
        duration: 0.1,
        ease: "power2.inOut"
    });
}

// Setup coffee memory section animations
function setupCoffeeMemoryAnimations() {
    const coffeeMemoryImage = document.getElementById('coffee-memory-image-container');
    const coffeeStoryOverlay = document.getElementById('coffee-story-overlay');
    
    if (!coffeeMemoryImage) {
        console.log('Coffee memory elements not found');
        return;
    }
    
    // First animation: Show the image
    ScrollTrigger.create({
        trigger: '#coffee-meeting',
        start: "top 60%",
        end: "top 30%",
        scrub: 1,
        onEnter: () => {
            gsap.to(coffeeMemoryImage, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => {
                    coffeeMemoryImage.classList.add('coffee-memory-visible');
                }
            });
        }
    });
    
    // Second animation: Show the text overlay with more scroll
    ScrollTrigger.create({
        trigger: '#coffee-meeting',
        start: "center 70%",
        end: "center 30%",
        scrub: 1,
        onEnter: () => {
            if (coffeeStoryOverlay) {
                gsap.to(coffeeStoryOverlay, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    onComplete: () => {
                        coffeeStoryOverlay.classList.add('visible');
                    }
                });
            }
        }
    });
    
    // Add floating animation to coffee elements
    const floatingElements = document.querySelectorAll('.floating-coffee-element');
    floatingElements.forEach((element, index) => {
        gsap.to(element, {
            y: "+=10",
            rotation: "+=5",
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
        });
    });
    
    // Add click interaction to toggle overlay visibility
    if (coffeeMemoryImage && coffeeStoryOverlay) {
        coffeeMemoryImage.addEventListener('click', function() {
            if (coffeeStoryOverlay.classList.contains('visible')) {
                // Hide overlay
                gsap.to(coffeeStoryOverlay, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: () => {
                        coffeeStoryOverlay.classList.remove('visible');
                    }
                });
            } else {
                // Show overlay
                gsap.to(coffeeStoryOverlay, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: () => {
                        coffeeStoryOverlay.classList.add('visible');
                    }
                });
            }
            
            // Create sparkle effect
            createImageSparkleEffect(coffeeMemoryImage);
        });
    }
}

// Setup navigation dots functionality
function setupNavigation() {
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            navigateToSection(index);
        });
    });
}

// Navigate to specific section
function navigateToSection(sectionIndex) {
    if (memoryLane.isTransitioning || sectionIndex === memoryLane.currentSection) {
        return;
    }
    
    memoryLane.isTransitioning = true;
    
    const targetSection = memoryLane.sectionsData[sectionIndex];
    if (targetSection && targetSection.element) {
        // Smooth scroll to section
        targetSection.element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update navigation state after scroll completes
        setTimeout(() => {
            updateCurrentSection(sectionIndex);
            memoryLane.isTransitioning = false;
        }, 1000);
    }
}

// Setup section tracking with Intersection Observer
function setupSectionTracking() {
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.5
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !memoryLane.isTransitioning) {
                const sectionIndex = parseInt(entry.target.dataset.memory) - 1;
                updateCurrentSection(sectionIndex);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    memoryLane.sectionsData.forEach(section => {
        if (section.element) {
            sectionObserver.observe(section.element);
        }
    });
    
    // Also observe transition section for visual feedback
    if (transitionSection) {
        const transitionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visual feedback when transition is visible
                    transitionSection.style.filter = 'brightness(1.1)';
                } else {
                    transitionSection.style.filter = 'brightness(1)';
                }
            });
        }, { threshold: 0.3 });
        
        transitionObserver.observe(transitionSection);
    }
}

// Update current section state
function updateCurrentSection(sectionIndex) {
    if (sectionIndex !== memoryLane.currentSection) {
        memoryLane.currentSection = sectionIndex;
        updateMemoryCounter(sectionIndex + 1);
        updateNavigationDots(sectionIndex);
        
        // Trigger section-specific events
        onSectionChange(sectionIndex);
    }
}

// Update memory counter display
function updateMemoryCounter(memoryNumber) {
    const currentMemorySpan = document.getElementById('current-memory');
    if (currentMemorySpan) {
        // Animate counter change
        gsap.to(currentMemorySpan, {
            scale: 1.2,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                currentMemorySpan.textContent = memoryNumber;
            }
        });
    }
}

// Update navigation dots
function updateNavigationDots(activeIndex) {
    navDots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
            gsap.to(dot, {
                scale: 1.3,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            dot.classList.remove('active');
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

// Handle section changes
function onSectionChange(sectionIndex) {
    const sectionData = memoryLane.sectionsData[sectionIndex];
    console.log(`Switched to: ${sectionData.name}`);
    
    // Section-specific logic
    switch(sectionIndex) {
        case 0: // Bumble section
            handleBumbleSectionEnter();
            break;
        case 1: // Coffee section
            handleCoffeeSectionEnter();
            break;
    }
    
    // Update page title
    document.title = `${sectionData.name} - Our Memory Lane 💛`;
}

// Bumble section specific handling
function handleBumbleSectionEnter() {
    // Pause coffee audio if playing
    if (window.coffeeSection && typeof window.coffeeSection.cleanup === 'function') {
        // Don't fully cleanup, just pause audio
        const cafeAudio = document.getElementById('cafe-audio');
        if (cafeAudio && !cafeAudio.paused) {
            cafeAudio.pause();
        }
    }
    
    // Enhance bumble animations if needed
    const beeLeft = document.querySelector('.bumble-section #bee-left');
    const beeRight = document.querySelector('.bumble-section #bee-right');
    
    if (beeLeft && beeRight) {
        // Add subtle hover enhancement
        [beeLeft, beeRight].forEach(bee => {
            bee.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('.bee-glow'), {
                    opacity: 0.8,
                    scale: 1.1,
                    duration: 0.3
                });
            });
            
            bee.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('.bee-glow'), {
                    opacity: 0,
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    }
}

// Coffee section specific handling
function handleCoffeeSectionEnter() {
    // Pause bumble audio if playing
    const bumbleAudio = document.getElementById('background-audio');
    if (bumbleAudio && !bumbleAudio.paused) {
        bumbleAudio.pause();
    }
    
    // Enhance coffee animations
    if (window.coffeeSection && typeof window.coffeeSection.enhanceHeartSteamAnimation === 'function') {
        window.coffeeSection.enhanceHeartSteamAnimation();
    }
    
    // Add interaction to coffee memory image
    const coffeeMemoryImage = document.getElementById('coffee-memory-image');
    if (coffeeMemoryImage) {
        coffeeMemoryImage.addEventListener('click', function() {
            // Create sparkle effect around image
            createImageSparkleEffect(this.parentElement);
        });
    }
}

// Create sparkle effect around coffee memory image
function createImageSparkleEffect(container) {
    const sparkles = ['✨', '☕', '💕', '💛'];
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 16px;
            pointer-events: none;
            z-index: 50;
        `;
        
        container.appendChild(sparkle);
        
        const angle = (360 / 6) * i;
        const distance = 50 + Math.random() * 30;
        
        gsap.to(sparkle, {
            x: Math.cos(angle * Math.PI / 180) * distance,
            y: Math.sin(angle * Math.PI / 180) * distance,
            opacity: 0,
            scale: 0.3,
            duration: 1.8,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (memoryLane.isTransitioning) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (memoryLane.currentSection < memoryLane.totalSections - 1) {
                    navigateToSection(memoryLane.currentSection + 1);
                }
                break;
                
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (memoryLane.currentSection > 0) {
                    navigateToSection(memoryLane.currentSection - 1);
                }
                break;
                
            case 'Home':
                e.preventDefault();
                navigateToSection(0);
                break;
                
            case 'End':
                e.preventDefault();
                navigateToSection(memoryLane.totalSections - 1);
                break;
        }
    });
}

// Touch/swipe gestures for mobile
function setupSwipeGestures() {
    let startY = 0;
    let endY = 0;
    const threshold = 50; // Minimum distance for swipe
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (memoryLane.isTransitioning) return;
        
        endY = e.changedTouches[0].clientY;
        const deltaY = startY - endY;
        
        if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0) {
                // Swipe up - next section
                if (memoryLane.currentSection < memoryLane.totalSections - 1) {
                    navigateToSection(memoryLane.currentSection + 1);
                }
            } else {
                // Swipe down - previous section
                if (memoryLane.currentSection > 0) {
                    navigateToSection(memoryLane.currentSection - 1);
                }
            }
        }
    }, { passive: true });
}

// Enhanced scroll behavior
function setupSmoothScrolling() {
    // Prevent default scroll behavior and implement custom smooth scrolling
    let scrollTimeout;
    
    window.addEventListener('wheel', (e) => {
        if (memoryLane.isTransitioning) {
            e.preventDefault();
            return;
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const delta = e.deltaY;
            
            if (Math.abs(delta) > 10) {
                if (delta > 0 && memoryLane.currentSection < memoryLane.totalSections - 1) {
                    navigateToSection(memoryLane.currentSection + 1);
                } else if (delta < 0 && memoryLane.currentSection > 0) {
                    navigateToSection(memoryLane.currentSection - 1);
                }
            }
        }, 150);
    }, { passive: false });
}

// Responsive adjustments
function handleResponsiveChanges() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function adjustForMobile(e) {
        if (e.matches) {
            // Mobile adjustments
            memoryNav.style.gap = '12px';
            memoryCounter.style.fontSize = '12px';
        } else {
            // Desktop adjustments
            memoryNav.style.gap = '15px';
            memoryCounter.style.fontSize = '14px';
        }
    }
    
    adjustForMobile(mediaQuery);
    mediaQuery.addListener(adjustForMobile);
}

// Performance optimization
function optimizePerformance() {
    // Lazy load sections that are not currently visible
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible, ensure full animations are active
                entry.target.classList.add('section-active');
            } else {
                // Section is not visible, reduce animations for performance
                entry.target.classList.remove('section-active');
            }
        });
    }, {
        rootMargin: '10px'
    });
    
    memoryLane.sectionsData.forEach(section => {
        if (section.element) {
            lazyLoadObserver.observe(section.element);
        }
    });
}

// Clean up function
function cleanup() {
    // Clean up individual sections
    if (window.coffeeSection && typeof window.coffeeSection.cleanup === 'function') {
        window.coffeeSection.cleanup();
    }
    
    // Clean up audio
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    
    // Clear GSAP animations
    gsap.killTweensOf("*");
    ScrollTrigger.killAll();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause all animations and audio when page is hidden
        const allAudio = document.querySelectorAll('audio');
        allAudio.forEach(audio => audio.pause());
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    handleResponsiveChanges();
});

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    handleResponsiveChanges();
    optimizePerformance();
});

// Export for external access
window.memoryLane = {
    navigateToSection,
    getCurrentSection: () => memoryLane.currentSection,
    getTotalSections: () => memoryLane.totalSections,
    cleanup,
    addClinkEffect
};

// Debug mode (remove in production)
if (window.location.search.includes('debug=true')) {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'D' && e.ctrlKey) {
            console.log('Memory Lane Debug Info:', {
                currentSection: memoryLane.currentSection,
                totalSections: memoryLane.totalSections,
                sectionsData: memoryLane.sectionsData,
                isTransitioning: memoryLane.isTransitioning
            });
        }
    });
} 