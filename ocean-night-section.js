// Ocean Night Section JavaScript
// Handles animations, interactions, and audio for the ocean night memory

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Ocean section state
const oceanSection = {
    isLoaded: false,
    audio: null,
    isAudioPlaying: false,
    animationTimeline: null,
    elements: {}
};

// Initialize ocean section when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeOceanSection();
});

// Main initialization function
function initializeOceanSection() {
    console.log('Initializing Ocean Night Section...');
    
    // Cache DOM elements
    cacheOceanElements();
    
    // Setup audio
    setupOceanAudio();
    
    // Setup scroll-triggered animations
    setupScrollAnimations();
    
    // Setup interactive elements
    setupInteractions();
    
    // Setup GSAP timeline
    setupAnimationTimeline();
    
    // Setup mobile-specific features
    setupMobileOptimizations();
    
    oceanSection.isLoaded = true;
    console.log('Ocean Night Section initialized successfully');
}

// Cache DOM elements for performance
function cacheOceanElements() {
    oceanSection.elements = {
        section: document.getElementById('ocean-night-memory'),
        memoryFrame: document.getElementById('ocean-memory-frame'),
        memoryImage: document.getElementById('ocean-memory-image'),
        textOverlay: document.getElementById('memory-text-overlay'),
        storyContainer: document.getElementById('ocean-story-container'),
        audioButton: document.getElementById('ocean-audio-button'),
        volumeIcon: document.querySelector('.ocean-audio-button .volume-icon'),
        muteIcon: document.querySelector('.ocean-audio-button .mute-icon'),
        
        // Animated elements
        stars: document.querySelectorAll('.star'),
        moon: document.querySelector('.moon'),
        moonGlow: document.querySelector('.moon-glow'),
        clouds: document.querySelectorAll('.cloud'),
        oceanLayers: document.querySelectorAll('.ocean-layer'),
        jellyfish: document.querySelectorAll('.jellyfish'),
        floatingHearts: document.querySelectorAll('.floating-heart'),
        wavefoam: document.querySelectorAll('.foam')
    };
}

// Setup audio functionality
function setupOceanAudio() {
    oceanSection.audio = document.getElementById('ocean-audio');
    
    if (!oceanSection.audio) {
        console.log('Ocean audio element not found');
        return;
    }
    
    // Set up audio properties
    oceanSection.audio.volume = 0.3;
    oceanSection.audio.loop = true;
    
    // Audio button event listener
    if (oceanSection.elements.audioButton) {
        oceanSection.elements.audioButton.addEventListener('click', toggleOceanAudio);
    }
    
    // Handle audio loading
    oceanSection.audio.addEventListener('canplaythrough', function() {
        console.log('Ocean audio loaded and ready');
    });
    
    oceanSection.audio.addEventListener('error', function(e) {
        console.log('Ocean audio failed to load:', e);
    });
}

// Toggle ocean audio
function toggleOceanAudio() {
    if (!oceanSection.audio) return;
    
    if (oceanSection.isAudioPlaying) {
        pauseOceanAudio();
    } else {
        playOceanAudio();
    }
}

// Play ocean audio
function playOceanAudio() {
    if (!oceanSection.audio) return;
    
    const playPromise = oceanSection.audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            oceanSection.isAudioPlaying = true;
            updateAudioButtonIcon(true);
            console.log('Ocean audio started playing');
        }).catch(error => {
            console.log('Ocean audio play failed:', error);
        });
    }
}

// Pause ocean audio
function pauseOceanAudio() {
    if (!oceanSection.audio) return;
    
    oceanSection.audio.pause();
    oceanSection.isAudioPlaying = false;
    updateAudioButtonIcon(false);
    console.log('Ocean audio paused');
}

// Update audio button icon
function updateAudioButtonIcon(isPlaying) {
    if (!oceanSection.elements.volumeIcon || !oceanSection.elements.muteIcon) return;
    
    if (isPlaying) {
        oceanSection.elements.volumeIcon.style.display = 'block';
        oceanSection.elements.muteIcon.style.display = 'none';
    } else {
        oceanSection.elements.volumeIcon.style.display = 'none';
        oceanSection.elements.muteIcon.style.display = 'block';
    }
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    if (!oceanSection.elements.section) return;
    
    // Memory frame fade-in animation
    ScrollTrigger.create({
        trigger: oceanSection.elements.section,
        start: "top 80%",
        end: "top 30%",
        onEnter: () => {
            showMemoryFrame();
        },
        onLeave: () => {
            // Optional: hide when scrolling past
        },
        onEnterBack: () => {
            showMemoryFrame();
        }
    });
    
    // Text overlay animation (delayed)
    ScrollTrigger.create({
        trigger: oceanSection.elements.section,
        start: "top 60%",
        end: "top 20%",
        onEnter: () => {
            setTimeout(showTextOverlay, 800);
        }
    });
    
    // Story container animation (more delayed)
    ScrollTrigger.create({
        trigger: oceanSection.elements.section,
        start: "center 70%",
        end: "center 30%",
        onEnter: () => {
            setTimeout(showStoryContainer, 1500);
        }
    });
    
    // Enhanced scroll effects
    setupParallaxEffects();
}

// Show memory frame with animation
function showMemoryFrame() {
    if (!oceanSection.elements.memoryFrame) return;
    
    oceanSection.elements.memoryFrame.classList.add('visible');
    
    // GSAP animation for smooth entrance
    gsap.to(oceanSection.elements.memoryFrame, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
            // Add sparkle effect
            addMemorySparkleEffect();
        }
    });
}

// Show text overlay
function showTextOverlay() {
    if (!oceanSection.elements.textOverlay) return;
    
    oceanSection.elements.textOverlay.classList.add('visible');
    
    // Typewriter effect for main text
    const mainText = oceanSection.elements.textOverlay.querySelector('.overlay-main-text');
    if (mainText) {
        typeWriterEffect(mainText, mainText.textContent, 50);
    }
}

// Show story container
function showStoryContainer() {
    if (!oceanSection.elements.storyContainer) return;
    
    oceanSection.elements.storyContainer.classList.add('visible');
    
    gsap.to(oceanSection.elements.storyContainer, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
}

// Typewriter effect
function typeWriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function typeNextChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeNextChar, speed);
        }
    }
    
    typeNextChar();
}

// Add sparkle effect to memory frame
function addMemorySparkleEffect() {
    if (!oceanSection.elements.memoryFrame) return;
    
    const sparkles = ['✨', '💙', '🌊', '💫', '💕'];
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 16px;
            pointer-events: none;
            z-index: 20;
            opacity: 0;
        `;
        
        oceanSection.elements.memoryFrame.appendChild(sparkle);
        
        const angle = (360 / 6) * i;
        const distance = 60 + Math.random() * 40;
        
        gsap.to(sparkle, {
            x: Math.cos(angle * Math.PI / 180) * distance,
            y: Math.sin(angle * Math.PI / 180) * distance,
            opacity: 1,
            scale: 1.5,
            duration: 0.6,
            ease: "power2.out"
        });
        
        gsap.to(sparkle, {
            opacity: 0,
            scale: 0.5,
            duration: 1.4,
            delay: 0.6,
            ease: "power2.in",
            onComplete: () => sparkle.remove()
        });
    }
}

// Setup parallax effects for depth
function setupParallaxEffects() {
    // Parallax for clouds
    oceanSection.elements.clouds.forEach((cloud, index) => {
        gsap.to(cloud, {
            x: (index + 1) * 50,
            duration: 20 + (index * 5),
            repeat: -1,
            ease: "none"
        });
    });
    
    // Enhanced moon glow on scroll
    ScrollTrigger.create({
        trigger: oceanSection.elements.section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
            if (oceanSection.elements.moonGlow) {
                const progress = self.progress;
                gsap.to(oceanSection.elements.moonGlow, {
                    scale: 1 + (progress * 0.3),
                    opacity: 0.6 + (progress * 0.4),
                    duration: 0.3
                });
            }
        }
    });
    
    // Ocean layers depth effect
    oceanSection.elements.oceanLayers.forEach((layer, index) => {
        ScrollTrigger.create({
            trigger: oceanSection.elements.section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
                const speed = (index + 1) * 0.2;
                gsap.to(layer, {
                    y: self.progress * 30 * speed,
                    duration: 0.3
                });
            }
        });
    });
}

// Setup interactive elements
function setupInteractions() {
    // Memory image click interaction
    if (oceanSection.elements.memoryImage) {
        oceanSection.elements.memoryImage.addEventListener('click', function() {
            createRippleEffect(this);
            addMemorySparkleEffect();
        });
    }
    
    // Floating hearts interaction
    oceanSection.elements.floatingHearts.forEach(heart => {
        heart.addEventListener('click', function() {
            createHeartBurst(this);
        });
    });
    
    // Touch interaction for mobile
    setupTouchInteractions();
}

// Create ripple effect on image click
function createRippleEffect(element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        z-index: 25;
    `;
    
    element.parentElement.appendChild(ripple);
    
    gsap.to(ripple, {
        scale: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

// Create heart burst effect
function createHeartBurst(heart) {
    const colors = ['💙', '💕', '💛', '🤍', '💜'];
    
    for (let i = 0; i < 5; i++) {
        const burstHeart = document.createElement('div');
        burstHeart.textContent = colors[Math.floor(Math.random() * colors.length)];
        burstHeart.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            font-size: 12px;
            pointer-events: none;
            z-index: 30;
        `;
        
        heart.appendChild(burstHeart);
        
        const angle = (360 / 5) * i;
        const distance = 30 + Math.random() * 20;
        
        gsap.to(burstHeart, {
            x: Math.cos(angle * Math.PI / 180) * distance,
            y: Math.sin(angle * Math.PI / 180) * distance,
            opacity: 0,
            scale: 2,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => burstHeart.remove()
        });
    }
    
    // Pulse the original heart
    gsap.to(heart, {
        scale: 1.5,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
    });
}

// Setup touch interactions for mobile
function setupTouchInteractions() {
    let touchStartY = 0;
    
    if (oceanSection.elements.section) {
        oceanSection.elements.section.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        oceanSection.elements.section.addEventListener('touchmove', function(e) {
            const touchCurrentY = e.touches[0].clientY;
            const deltaY = touchStartY - touchCurrentY;
            
            // Add subtle parallax effect based on touch movement
            if (Math.abs(deltaY) > 5) {
                const parallaxStrength = deltaY * 0.1;
                gsap.to('.jellyfish', {
                    y: parallaxStrength,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }, { passive: true });
    }
}

// Setup main animation timeline
function setupAnimationTimeline() {
    oceanSection.animationTimeline = gsap.timeline({ paused: true });
    
    // Enhanced ocean waves
    oceanSection.animationTimeline.to('.wave-path', {
        morphSVG: "M0,200 Q300,170 600,200 T1200,200 L1200,400 L0,400 Z",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    }, 0);
    
    // Jellyfish enhanced animations
    oceanSection.elements.jellyfish.forEach((jellyfish, index) => {
        oceanSection.animationTimeline.to(jellyfish, {
            y: "+=20",
            rotation: index % 2 ? 2 : -2,
            duration: 6 + index,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        }, index * 0.5);
    });
    
    // Play timeline
    oceanSection.animationTimeline.play();
}

// Setup mobile optimizations
function setupMobileOptimizations() {
    // Reduce motion for performance on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity
        gsap.set('.jellyfish', { willChange: 'transform' });
        gsap.set('.floating-heart', { willChange: 'transform' });
        gsap.set('.cloud', { willChange: 'transform' });
        
        // Use RAF for smooth animations
        gsap.ticker.fps(30);
    }
    
    // Handle device orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    });
}

// Cleanup function
function cleanupOceanSection() {
    console.log('Cleaning up Ocean Night Section...');
    
    // Pause and reset audio
    if (oceanSection.audio) {
        oceanSection.audio.pause();
        oceanSection.audio.currentTime = 0;
    }
    
    // Kill GSAP animations
    if (oceanSection.animationTimeline) {
        oceanSection.animationTimeline.kill();
    }
    
    gsap.killTweensOf('.star, .moon-glow, .cloud, .ocean-layer, .jellyfish, .floating-heart');
    
    // Clear ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === oceanSection.elements.section) {
            trigger.kill();
        }
    });
    
    oceanSection.isLoaded = false;
}

// Enhanced ocean waves animation
function enhanceOceanWaves() {
    oceanSection.elements.oceanLayers.forEach((layer, index) => {
        const wavePath = layer.querySelector('.wave-path');
        if (wavePath) {
            gsap.to(wavePath, {
                attr: {
                    d: `M0,${200 + index * 20} Q${300 + index * 50},${150 - index * 10} ${600 + index * 30},${200 + index * 20} T1200,${200 + index * 20} L1200,400 L0,400 Z`
                },
                duration: 8 + index * 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }
    });
}

// Handle visibility changes (when user switches tabs)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && oceanSection.isAudioPlaying) {
        pauseOceanAudio();
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    if (oceanSection.isLoaded) {
        ScrollTrigger.refresh();
    }
});

// Export for external access
window.oceanSection = {
    playAudio: playOceanAudio,
    pauseAudio: pauseOceanAudio,
    cleanup: cleanupOceanSection,
    enhance: enhanceOceanWaves,
    isLoaded: () => oceanSection.isLoaded
};

// Auto-cleanup when leaving the page
window.addEventListener('beforeunload', cleanupOceanSection); 