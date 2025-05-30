// Ocean Section JavaScript
// Handles ocean-specific animations, interactions, and audio

// Ocean section state
const oceanSection = {
    isInitialized: false,
    audioElement: null,
    isAudioPlaying: false,
    animations: {
        waves: [],
        clouds: [],
        floating: [],
        main: null
    },
    intersectionObserver: null
};

// Initialize ocean section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeOceanSection();
});

// Main initialization function
function initializeOceanSection() {
    if (oceanSection.isInitialized) return;
    
    console.log('Initializing Ocean Section...');
    
    // Cache DOM elements
    cacheOceanElements();
    
    // Setup GSAP animations
    setupOceanAnimations();
    
    // Setup audio controls
    setupOceanAudio();
    
    // Setup interactions
    setupOceanInteractions();
    
    // Setup intersection observer for performance
    setupOceanIntersectionObserver();
    
    // Setup responsive handlers
    setupOceanResponsive();
    
    oceanSection.isInitialized = true;
    console.log('Ocean Section initialized successfully');
}

// Cache DOM elements for performance
function cacheOceanElements() {
    oceanSection.elements = {
        section: document.getElementById('ocean-memory'),
        imageContainer: document.querySelector('.ocean-image-container'),
        textOverlay: document.querySelector('.ocean-text-overlay'),
        audioButton: document.querySelector('.ocean-audio-button'),
        waves: document.querySelectorAll('.wave'),
        clouds: document.querySelectorAll('.cloud'),
        stars: document.querySelectorAll('.star'),
        moon: document.querySelector('.moon'),
        jellyfish: document.querySelectorAll('.jellyfish'),
        floatingHearts: document.querySelectorAll('.floating-heart'),
        content: document.querySelector('.ocean-content')
    };
}

// Setup GSAP animations
function setupOceanAnimations() {
    if (!oceanSection.elements.section) {
        console.log('Ocean section not found, skipping animations');
        return;
    }
    
    // Main content entrance animation
    setupContentEntranceAnimation();
    
    // Enhanced wave animations
    setupEnhancedWaveAnimations();
    
    // Enhanced cloud animations
    setupEnhancedCloudAnimations();
    
    // Enhanced floating elements
    setupEnhancedFloatingElements();
    
    // Image interaction animations
    setupImageInteractionAnimations();
    
    // Scroll-triggered animations
    setupScrollTriggeredAnimations();
}

// Setup main content entrance animation
function setupContentEntranceAnimation() {
    const content = oceanSection.elements.content;
    if (!content) return;
    
    // Set initial state
    gsap.set(content, { 
        opacity: 0, 
        y: 100,
        scale: 0.8
    });
    
    // Create entrance timeline
    const entranceTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: oceanSection.elements.section,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            onEnter: () => {
                oceanSection.elements.section?.classList.add('loaded');
            }
        }
    });
    
    entranceTimeline
        .to(content, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        })
        .to(oceanSection.elements.imageContainer, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        }, "-=0.5");
    
    oceanSection.animations.main = entranceTimeline;
}

// Setup enhanced wave animations with GSAP
function setupEnhancedWaveAnimations() {
    const waves = oceanSection.elements.waves;
    if (!waves.length) return;
    
    waves.forEach((wave, index) => {
        const waveAnimation = gsap.to(wave, {
            x: "-50%",
            duration: 8 + index * 2,
            ease: "none",
            repeat: -1
        });
        
        oceanSection.animations.waves.push(waveAnimation);
        
        // Add scroll-based wave intensity
        ScrollTrigger.create({
            trigger: oceanSection.elements.section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const progress = self.progress;
                const intensity = 0.5 + (progress * 0.5);
                gsap.to(wave, {
                    scaleY: intensity,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Setup enhanced cloud animations
function setupEnhancedCloudAnimations() {
    const clouds = oceanSection.elements.clouds;
    if (!clouds.length) return;
    
    clouds.forEach((cloud, index) => {
        // Enhanced cloud movement with random variations
        const cloudAnimation = gsap.to(cloud, {
            x: "calc(100vw + 200px)",
            duration: 25 + index * 5,
            ease: "none",
            repeat: -1,
            delay: index * -10
        });
        
        // Add subtle vertical floating
        gsap.to(cloud, {
            y: "+=10",
            duration: 6 + index,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
        
        oceanSection.animations.clouds.push(cloudAnimation);
    });
}

// Setup enhanced floating elements
function setupEnhancedFloatingElements() {
    // Enhanced jellyfish animations
    const jellyfish = oceanSection.elements.jellyfish;
    jellyfish.forEach((jelly, index) => {
        const jellyfishAnimation = gsap.to(jelly, {
            y: "+=20",
            x: "+=10",
            rotation: "+=5",
            duration: 8 + index * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * -3
        });
        
        oceanSection.animations.floating.push(jellyfishAnimation);
        
        // Add click interaction for jellyfish
        jelly.addEventListener('click', () => {
            createJellyfishSparkle(jelly);
        });
    });
    
    // Enhanced floating hearts
    const hearts = oceanSection.elements.floatingHearts;
    hearts.forEach((heart, index) => {
        // Continuous rising hearts
        gsap.set(heart, { y: "100vh", opacity: 0 });
        
        const heartAnimation = gsap.to(heart, {
            y: "-100px",
            opacity: 1,
            duration: 12,
            ease: "power1.out",
            repeat: -1,
            delay: index * 4,
            onRepeat: () => {
                gsap.set(heart, { y: "100vh", opacity: 0 });
            }
        });
        
        oceanSection.animations.floating.push(heartAnimation);
    });
}

// Setup image interaction animations
function setupImageInteractionAnimations() {
    const imageContainer = oceanSection.elements.imageContainer;
    const textOverlay = oceanSection.elements.textOverlay;
    
    if (!imageContainer) return;
    
    // Click to toggle text overlay
    imageContainer.addEventListener('click', function() {
        if (textOverlay) {
            textOverlay.classList.toggle('visible');
            
            // Create ripple effect
            createImageRippleEffect(this);
        }
        
        // Create sparkle effect
        createOceanSparkleEffect(this);
    });
    
    // Hover effects
    imageContainer.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(this.querySelector('.ocean-image-glow'), {
            opacity: 1,
            scale: 1.1,
            duration: 0.3
        });
    });
    
    imageContainer.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(this.querySelector('.ocean-image-glow'), {
            opacity: 0.5,
            scale: 1,
            duration: 0.3
        });
    });
}

// Setup scroll-triggered animations
function setupScrollTriggeredAnimations() {
    if (!oceanSection.elements.section) return;
    
    // Parallax effect for different layers
    ScrollTrigger.create({
        trigger: oceanSection.elements.section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            
            // Parallax clouds
            if (oceanSection.elements.clouds.length) {
                gsap.to(oceanSection.elements.clouds, {
                    x: `+=${progress * 50}`,
                    duration: 0.3,
                    ease: "none"
                });
            }
            
            // Parallax stars
            if (oceanSection.elements.stars.length) {
                gsap.to(oceanSection.elements.stars, {
                    y: `+=${progress * 30}`,
                    duration: 0.3,
                    ease: "none"
                });
            }
            
            // Moon movement
            if (oceanSection.elements.moon) {
                gsap.to(oceanSection.elements.moon, {
                    y: `+=${progress * 20}`,
                    duration: 0.3,
                    ease: "none"
                });
            }
        }
    });
    
    // Text reveal animations
    const textElements = [
        '.ocean-romantic-text',
        '.ocean-story-text', 
        '.ocean-subtitle'
    ];
    
    textElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            gsap.set(element, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: index * 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    });
}

// Setup audio controls
function setupOceanAudio() {
    const audioButton = oceanSection.elements.audioButton;
    const audioElement = document.getElementById('ocean-audio');
    
    if (!audioButton || !audioElement) {
        console.log('Ocean audio elements not found');
        return;
    }
    
    oceanSection.audioElement = audioElement;
    
    // Set initial state (muted)
    audioElement.muted = true;
    audioElement.volume = 0.3;
    audioButton.classList.add('muted');
    
    // Audio button click handler
    audioButton.addEventListener('click', function() {
        toggleOceanAudio();
    });
    
    // Audio event listeners
    audioElement.addEventListener('loadstart', () => {
        console.log('Ocean audio loading...');
    });
    
    audioElement.addEventListener('canplay', () => {
        console.log('Ocean audio ready to play');
    });
    
    audioElement.addEventListener('error', (e) => {
        console.log('Ocean audio error:', e);
        audioButton.style.display = 'none';
    });
}

// Toggle ocean audio
function toggleOceanAudio() {
    const audioElement = oceanSection.audioElement;
    const audioButton = oceanSection.elements.audioButton;
    
    if (!audioElement || !audioButton) return;
    
    if (audioElement.muted || audioElement.paused) {
        // Play audio
        audioElement.muted = false;
        audioElement.play().then(() => {
            oceanSection.isAudioPlaying = true;
            audioButton.classList.remove('muted');
            audioButton.innerHTML = '🔊';
            
            // Add visual feedback
            gsap.to(audioButton, {
                scale: 1.2,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        }).catch(e => {
            console.log('Ocean audio play failed:', e);
        });
    } else {
        // Pause audio
        audioElement.pause();
        audioElement.muted = true;
        oceanSection.isAudioPlaying = false;
        audioButton.classList.add('muted');
        audioButton.innerHTML = '🔇';
        
        // Add visual feedback
        gsap.to(audioButton, {
            scale: 0.9,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    }
}

// Setup intersection observer for performance optimization
function setupOceanIntersectionObserver() {
    if (!oceanSection.elements.section) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    oceanSection.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible, ensure animations are running
                resumeOceanAnimations();
                entry.target.classList.add('section-visible');
            } else {
                // Section not visible, pause heavy animations for performance
                pauseOceanAnimations();
                entry.target.classList.remove('section-visible');
            }
        });
    }, observerOptions);
    
    oceanSection.intersectionObserver.observe(oceanSection.elements.section);
}

// Resume ocean animations
function resumeOceanAnimations() {
    Object.values(oceanSection.animations).forEach(animationGroup => {
        if (Array.isArray(animationGroup)) {
            animationGroup.forEach(animation => {
                if (animation && animation.resume) {
                    animation.resume();
                }
            });
        } else if (animationGroup && animationGroup.resume) {
            animationGroup.resume();
        }
    });
}

// Pause ocean animations for performance
function pauseOceanAnimations() {
    Object.values(oceanSection.animations).forEach(animationGroup => {
        if (Array.isArray(animationGroup)) {
            animationGroup.forEach(animation => {
                if (animation && animation.pause) {
                    animation.pause();
                }
            });
        } else if (animationGroup && animationGroup.pause) {
            animationGroup.pause();
        }
    });
}

// Create ocean sparkle effect
function createOceanSparkleEffect(container) {
    const sparkles = ['✨', '🌊', '💙', '💫', '🐚'];
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 20px;
            pointer-events: none;
            z-index: 100;
        `;
        
        container.appendChild(sparkle);
        
        const angle = (360 / 8) * i;
        const distance = 60 + Math.random() * 40;
        
        gsap.to(sparkle, {
            x: Math.cos(angle * Math.PI / 180) * distance,
            y: Math.sin(angle * Math.PI / 180) * distance,
            opacity: 0,
            scale: 0.5,
            rotation: 360,
            duration: 2 + Math.random(),
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
}

// Create image ripple effect
function createImageRippleEffect(container) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 50;
    `;
    
    container.appendChild(ripple);
    
    gsap.to(ripple, {
        width: 200,
        height: 200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

// Create jellyfish sparkle effect
function createJellyfishSparkle(jellyfish) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        font-size: 16px;
        pointer-events: none;
        z-index: 50;
    `;
    
    jellyfish.appendChild(sparkle);
    
    gsap.to(sparkle, {
        y: -30,
        opacity: 0,
        scale: 1.5,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => sparkle.remove()
    });
    
    // Add jellyfish glow effect
    gsap.to(jellyfish, {
        filter: "brightness(1.5)",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
}

// Setup responsive handlers
function setupOceanResponsive() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleResponsiveChange(e) {
        if (e.matches) {
            // Mobile adjustments
            adjustForMobile();
        } else {
            // Desktop adjustments
            adjustForDesktop();
        }
    }
    
    function adjustForMobile() {
        // Reduce animation complexity on mobile
        if (oceanSection.elements.jellyfish.length > 2) {
            oceanSection.elements.jellyfish.forEach((jelly, index) => {
                if (index > 1) {
                    jelly.style.display = 'none';
                }
            });
        }
        
        // Reduce particles
        if (oceanSection.elements.floatingHearts.length > 3) {
            oceanSection.elements.floatingHearts.forEach((heart, index) => {
                if (index > 2) {
                    heart.style.display = 'none';
                }
            });
        }
    }
    
    function adjustForDesktop() {
        // Restore all elements on desktop
        oceanSection.elements.jellyfish.forEach(jelly => {
            jelly.style.display = '';
        });
        
        oceanSection.elements.floatingHearts.forEach(heart => {
            heart.style.display = '';
        });
    }
    
    handleResponsiveChange(mediaQuery);
    mediaQuery.addListener(handleResponsiveChange);
}

// Enhance animations when section becomes active
function enhanceOceanAnimations() {
    console.log('Enhancing ocean animations');
    
    // Enhance wave movement
    oceanSection.animations.waves.forEach(waveAnimation => {
        if (waveAnimation) {
            waveAnimation.timeScale(1.2);
        }
    });
    
    // Add extra floating hearts
    addExtraFloatingHearts();
    
    // Enhance star twinkling
    enhanceStarTwinkling();
}

// Add extra floating hearts for enhanced effect
function addExtraFloatingHearts() {
    const container = oceanSection.elements.section;
    if (!container) return;
    
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💙';
        heart.className = 'floating-heart extra-heart';
        heart.style.cssText = `
            position: absolute;
            font-size: 18px;
            color: rgba(173, 216, 230, 0.8);
            pointer-events: none;
            bottom: ${Math.random() * 20}%;
            left: ${Math.random() * 100}%;
        `;
        
        container.appendChild(heart);
        
        gsap.to(heart, {
            y: "-100vh",
            opacity: 1,
            duration: 10 + Math.random() * 5,
            ease: "power1.out",
            repeat: -1,
            delay: Math.random() * 3,
            onRepeat: () => {
                gsap.set(heart, { y: "100vh", opacity: 0 });
            }
        });
    }
}

// Enhance star twinkling
function enhanceStarTwinkling() {
    oceanSection.elements.stars.forEach(star => {
        gsap.to(star, {
            opacity: 1,
            scale: 1.5,
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 3
        });
    });
}

// Cleanup function
function cleanupOceanSection() {
    console.log('Cleaning up ocean section');
    
    // Stop audio
    if (oceanSection.audioElement) {
        oceanSection.audioElement.pause();
        oceanSection.audioElement.currentTime = 0;
    }
    
    // Kill all animations
    Object.values(oceanSection.animations).forEach(animationGroup => {
        if (Array.isArray(animationGroup)) {
            animationGroup.forEach(animation => {
                if (animation && animation.kill) {
                    animation.kill();
                }
            });
        } else if (animationGroup && animationGroup.kill) {
            animationGroup.kill();
        }
    });
    
    // Disconnect intersection observer
    if (oceanSection.intersectionObserver) {
        oceanSection.intersectionObserver.disconnect();
    }
    
    // Remove extra elements
    const extraHearts = document.querySelectorAll('.extra-heart');
    extraHearts.forEach(heart => heart.remove());
    
    oceanSection.isInitialized = false;
}

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseOceanAnimations();
        if (oceanSection.audioElement && !oceanSection.audioElement.paused) {
            oceanSection.audioElement.pause();
        }
    } else {
        resumeOceanAnimations();
    }
});

// Export for external access
window.oceanSection = {
    enhanceAnimations: enhanceOceanAnimations,
    cleanup: cleanupOceanSection,
    toggleAudio: toggleOceanAudio,
    isInitialized: () => oceanSection.isInitialized
}; 