// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configuration
const config = {
    beeAnimationDuration: 2,
    heartTriggerPoint: 0.6, // 60% scroll point - earlier than before
    imageTriggerPoint: 0.65, // 65% scroll point - image appears first
    imageDisappearStart: 0.85, // 85% scroll point - image starts fading (delayed more)
    imageDisappearEnd: 0.95, // 95% scroll point - image fully gone
    textTriggerPoint: 0.92, // 92% scroll point - text appears much later, requiring more scrolling
    musicVolume: 0.3
};

// DOM Elements
const beeLeft = document.getElementById('bee-left');
const beeRight = document.getElementById('bee-right');
const heartContainer = document.getElementById('heart-container');
const memoryImageContainer = document.getElementById('memory-image-container');
const textContent = document.getElementById('text-content');
const musicButton = document.getElementById('music-button');
const backgroundAudio = document.getElementById('background-audio');
const scrollIndicator = document.querySelector('.scroll-indicator');

// State
let isPlaying = false;
let beesHaveMet = false;
let imageHasAppeared = false;
let textHasAppeared = false;

// Initialize the Bumble section
function initBumbleSection() {
    setupScrollAnimations();
    setupMusicControls();
    setupInitialStates();
    setupPerformanceOptimizations();
    createRandomizedStars(); // Add randomized stars
}

// Setup initial states
function setupInitialStates() {
    // Set initial positions for bees
    gsap.set(beeLeft, {
        x: 0, // They start off-screen due to CSS positioning
        y: 0,
        rotation: 0
    });
    
    gsap.set(beeRight, {
        x: 0,
        y: 0,
        rotation: 0
    });
    
    // Hide heart and text initially
    gsap.set(heartContainer, {
        opacity: 0,
        scale: 0
    });
    
    // Hide image initially
    gsap.set(memoryImageContainer, {
        opacity: 0,
        scale: 0.8,
        y: 30
    });
    
    gsap.set(textContent, {
        opacity: 0,
        y: 20
    });
    
    // Set initial scroll indicator state
    gsap.set(scrollIndicator, {
        opacity: 1
    });
}

// Setup scroll-based animations
function setupScrollAnimations() {
    
    // Main scroll trigger for the entire section
    ScrollTrigger.create({
        trigger: '.bumble-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
            const progress = self.progress;
            animateBeesBasedOnScroll(progress);
            
            // Hide scroll indicator as user starts scrolling
            if (progress > 0.05) {
                gsap.to(scrollIndicator, {
                    opacity: 0,
                    duration: 0.5
                });
            } else {
                gsap.to(scrollIndicator, {
                    opacity: 1,
                    duration: 0.5
                });
            }
            
            // Trigger heart appearance at 60% scroll
            if (progress >= config.heartTriggerPoint && !beesHaveMet) {
                triggerHeartAppearance();
                beesHaveMet = true;
            }
            
            // Trigger image appearance at 65% scroll
            if (progress >= config.imageTriggerPoint && !imageHasAppeared) {
                triggerImageAppearance();
                imageHasAppeared = true;
            }
            
            // Trigger text appearance at 92% scroll
            if (progress >= config.textTriggerPoint && !textHasAppeared) {
                triggerTextAppearance();
                textHasAppeared = true;
            }
            
            // Handle image fading based on scroll (85% - 95%)
            if (imageHasAppeared && progress >= config.imageDisappearStart) {
                const fadeProgress = Math.min(1, (progress - config.imageDisappearStart) / (config.imageDisappearEnd - config.imageDisappearStart));
                
                // Fade out the image gradually
                gsap.set(memoryImageContainer, {
                    opacity: 1 - fadeProgress,
                    scale: 1 - (fadeProgress * 0.2), // Slightly shrink as it fades
                    filter: `blur(${fadeProgress * 8}px) saturate(${1 - fadeProgress * 0.5})` // Add blur and desaturate
                });
                
                // Fade out floating hearts
                gsap.set('.floating-heart', {
                    opacity: (1 - fadeProgress) * 0.7
                });
            }
        }
    });
    
    // Create a more visible debug indicator (remove in production)
    ScrollTrigger.create({
        trigger: '.bumble-section',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            // Optional: show scroll progress in console for debugging
            // console.log('Scroll progress:', Math.round(self.progress * 100) + '%');
        }
    });
}

// Animate bees based on scroll progress
function animateBeesBasedOnScroll(progress) {
    // Calculate bee positions
    const screenWidth = window.innerWidth;
    const contentWidth = Math.min(screenWidth - 40, 400); // Account for padding
    
    // Left bee moves from left edge to center
    const leftBeeX = progress * (contentWidth / 2 + 60); // Move to center with more travel
    
    // Right bee moves from right edge to center
    const rightBeeX = -progress * (contentWidth / 2 + 60); // Move to center with more travel
    
    // Add subtle vertical movement for natural flight
    const verticalOffset = Math.sin(progress * Math.PI * 3) * 15;
    
    // Add gentle rotation for flight effect
    const leftRotation = Math.sin(progress * Math.PI * 6) * 8;
    const rightRotation = Math.sin(progress * Math.PI * 6 + Math.PI) * 8;
    
    // Apply transformations
    gsap.set(beeLeft, {
        x: leftBeeX,
        y: verticalOffset,
        rotation: leftRotation,
        ease: 'none'
    });
    
    gsap.set(beeRight, {
        x: rightBeeX,
        y: verticalOffset + 8, // Slightly different vertical movement
        rotation: rightRotation,
        ease: 'none'
    });
    
    // Scale bees slightly as they get closer
    const scale = 1 + progress * 0.3;
    gsap.set([beeLeft, beeRight], {
        scale: scale
    });
}

// Trigger heart appearance with animation
function triggerHeartAppearance() {
    // Add CSS class for animation
    heartContainer.classList.add('heart-appearing');
    
    // GSAP animation for more control
    gsap.to(heartContainer, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.4)',
        onComplete: () => {
            // Add continuous pulse animation
            gsap.to(heartContainer, {
                scale: 1.08,
                duration: 1.2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }
    });
    
    // Animate sparkles
    gsap.fromTo('.sparkle', {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        delay: 0.4
    });
    
    // Create burst effect
    createHeartBurst();
}

// Trigger image appearance with romantic animation
function triggerImageAppearance() {
    // Add CSS class for animation
    memoryImageContainer.classList.add('image-appearing');
    
    // GSAP animation for the image
    gsap.to(memoryImageContainer, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'back.out(1.3)',
        onComplete: () => {
            // Add gentle floating animation
            gsap.to(memoryImageContainer, {
                y: -8,
                duration: 2.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }
    });
    
    // Animate floating hearts around image
    gsap.fromTo('.floating-heart', {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 0.7,
        duration: 0.8,
        stagger: 0.3,
        ease: 'back.out(1.5)',
        delay: 0.8
    });
    
    // Make image overlay appear on hover
    setTimeout(() => {
        const imageFrame = document.querySelector('.image-frame');
        imageFrame.style.cursor = 'pointer';
        
        // Add click interaction for mobile
        imageFrame.addEventListener('click', () => {
            const overlay = imageFrame.querySelector('.image-overlay');
            overlay.style.transform = overlay.style.transform === 'translateY(0px)' ? 'translateY(100%)' : 'translateY(0px)';
        });
    }, 1500);
}

// Create heart burst particle effect
function createHeartBurst() {
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'absolute';
    burstContainer.style.top = '50%';
    burstContainer.style.left = '50%';
    burstContainer.style.transform = 'translate(-50%, -50%)';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '10';
    
    document.querySelector('.content-container').appendChild(burstContainer);
    
    // Create multiple heart particles
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.textContent = ['💖', '💕', '✨'][Math.floor(Math.random() * 3)];
        particle.style.position = 'absolute';
        particle.style.fontSize = '18px';
        particle.style.left = '0';
        particle.style.top = '0';
        
        burstContainer.appendChild(particle);
        
        // Animate each particle
        const angle = (i / 6) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        gsap.fromTo(particle, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1
        }, {
            x: x,
            y: y,
            scale: 1.3,
            opacity: 0,
            duration: 1.8,
            ease: 'power2.out',
            delay: i * 0.1,
            onComplete: () => {
                if (i === 5) { // Last particle
                    burstContainer.remove();
                }
            }
        });
    }
}

// Trigger text appearance with typewriter effect
function triggerTextAppearance() {
    // Remove the automatic image transition - now controlled by scroll
    // No need for heart morph or forced image fade
    
    textContent.classList.add('text-typing');
    
    gsap.to(textContent, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power2.out'
    });
    
    // Typewriter effect for the main text
    const storyText = textContent.querySelector('.story-text');
    const originalText = storyText.textContent;
    storyText.textContent = '';
    
    let currentChar = 0;
    const typeInterval = setInterval(() => {
        if (currentChar < originalText.length) {
            storyText.textContent += originalText[currentChar];
            currentChar++;
            
            // Add a gentle buzz sound every few characters
            if (currentChar % 12 === 0 && window.playBuzzSound) {
                window.playBuzzSound();
            }
        } else {
            clearInterval(typeInterval);
            
            // Animate subtitle after main text is complete
            gsap.fromTo('.subtitle', {
                opacity: 0,
                y: 15
            }, {
                opacity: 1,
                y: 0,
                duration: 1.4,
                ease: 'power2.out',
                delay: 0.6
            });
            
            // Create small heart burst around text (delayed to not interfere with image)
            setTimeout(() => {
                createTextHeartBurst();
            }, 1000);
        }
    }, 80); // Slightly slower typing speed for better readability
}

// Create small heart burst around text
function createTextHeartBurst() {
    const textRect = textContent.getBoundingClientRect();
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'absolute';
    burstContainer.style.bottom = '20%';
    burstContainer.style.left = '50%';
    burstContainer.style.transform = 'translate(-50%, 0)';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '6';
    
    document.querySelector('.content-container').appendChild(burstContainer);
    
    // Create small heart particles around text
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.textContent = ['💛', '💕'][Math.floor(Math.random() * 2)];
        particle.style.position = 'absolute';
        particle.style.fontSize = '14px';
        particle.style.left = '0';
        particle.style.top = '0';
        
        burstContainer.appendChild(particle);
        
        // Animate each particle
        const angle = (i / 4) * Math.PI * 2;
        const distance = 40 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        gsap.fromTo(particle, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1
        }, {
            x: x,
            y: y,
            scale: 1.2,
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            delay: i * 0.2,
            onComplete: () => {
                if (i === 3) { // Last particle
                    burstContainer.remove();
                }
            }
        });
    }
}

// Setup music controls
function setupMusicControls() {
    // Set audio properties
    backgroundAudio.volume = config.musicVolume;
    backgroundAudio.loop = true;
    
    // Music button click handler
    musicButton.addEventListener('click', toggleMusic);
    
    // Create subtle buzzing sound effect using Web Audio API
    createBuzzingSound();
}

// Toggle music playback
function toggleMusic() {
    const musicIcon = musicButton.querySelector('.music-icon');
    const pauseIcon = musicButton.querySelector('.pause-icon');
    
    if (!isPlaying) {
        // Try to play audio
        backgroundAudio.play().then(() => {
            isPlaying = true;
            musicIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            
            // Add visual feedback
            gsap.to(musicButton, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        }).catch(error => {
            console.log('Audio play failed:', error);
            // Fallback: just show visual feedback
            createVisualMusicFeedback();
        });
    } else {
        backgroundAudio.pause();
        isPlaying = false;
        musicIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Create visual music feedback when audio fails
function createVisualMusicFeedback() {
    // Create pulsing effect around music button
    const pulseEffect = document.createElement('div');
    pulseEffect.style.position = 'fixed';
    pulseEffect.style.top = '20px';
    pulseEffect.style.right = '20px';
    pulseEffect.style.width = '50px';
    pulseEffect.style.height = '50px';
    pulseEffect.style.border = '1px solid rgba(255, 105, 180, 0.6)';
    pulseEffect.style.borderRadius = '50%';
    pulseEffect.style.pointerEvents = 'none';
    pulseEffect.style.zIndex = '99';
    
    document.body.appendChild(pulseEffect);
    
    gsap.fromTo(pulseEffect, {
        scale: 1,
        opacity: 1
    }, {
        scale: 1.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => pulseEffect.remove()
    });
}

// Create buzzing sound using Web Audio API
function createBuzzingSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator = null;
        let gainNode = null;
        
        window.playBuzzSound = () => {
            if (oscillator) return; // Already playing
            
            oscillator = audioContext.createOscillator();
            gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(250, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
            
            oscillator.onended = () => {
                oscillator = null;
                gainNode = null;
            };
        };
    } catch (error) {
        console.log('Web Audio API not supported');
    }
}

// Performance optimizations
function setupPerformanceOptimizations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        // Simplify animations
        gsap.globalTimeline.timeScale(1.3); // Speed up animations slightly
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.pause();
            if (isPlaying) {
                backgroundAudio.pause();
            }
        } else {
            gsap.globalTimeline.resume();
            if (isPlaying) {
                backgroundAudio.play();
            }
        }
    });
    
    // Optimize scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 150);
    });
}

// Responsive adjustments
function handleResize() {
    ScrollTrigger.refresh();
    
    // Re-setup scroll animations after resize
    const progress = ScrollTrigger.getAll().find(st => st.trigger.classList.contains('bumble-section'))?.progress || 0;
    if (progress > 0) {
        animateBeesBasedOnScroll(progress);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBumbleSection();
    
    // Handle window resize
    window.addEventListener('resize', debounce(handleResize, 300));
    
    // Add touch support for mobile music button
    if ('ontouchstart' in window) {
        musicButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMusic();
        });
    }
    
    // Debug: Log section height
    console.log('Bumble section height:', document.querySelector('.bumble-section').offsetHeight + 'px');
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Create randomized twinkling stars
function createRandomizedStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numStars = 60; // Number of random stars to create
    
    // Animation types for variety
    const animationTypes = ['starTwinkle', 'starTwinkleFast', 'starTwinkleSlow', 'starTwinkleGentle'];
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';
        
        // Randomize position
        const x = Math.random() * 100; // 0-100%
        const y = Math.random() * 100; // 0-100%
        
        // Randomize size (1-3px)
        const size = Math.random() * 2 + 1;
        
        // Randomize opacity
        const baseOpacity = Math.random() * 0.4 + 0.3; // 0.3-0.7
        
        // Randomize animation
        const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
        const animationDuration = Math.random() * 3 + 2; // 2-5 seconds
        const animationDelay = Math.random() * 4; // 0-4 seconds delay
        
        // Apply styles
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.opacity = baseOpacity;
        star.style.animation = `${animationType} ${animationDuration}s ease-in-out infinite`;
        star.style.animationDelay = animationDelay + 's';
        
        // Add some variety to star colors
        const colorVariant = Math.random();
        if (colorVariant < 0.1) {
            // 10% chance for slightly blue tint
            star.style.background = 'rgba(200, 220, 255, 0.8)';
        } else if (colorVariant < 0.05) {
            // 5% chance for slightly yellow tint
            star.style.background = 'rgba(255, 255, 200, 0.9)';
        }
        
        // Add to container
        starsContainer.appendChild(star);
        
        // Create shooting star effect occasionally
        if (Math.random() < 0.03) { // 3% chance
            createShootingStar(star, x, y);
        }
    }
}

// Create occasional shooting star effect
function createShootingStar(baseStar, startX, startY) {
    setTimeout(() => {
        const shootingStar = document.createElement('div');
        shootingStar.style.position = 'absolute';
        shootingStar.style.left = startX + '%';
        shootingStar.style.top = startY + '%';
        shootingStar.style.width = '2px';
        shootingStar.style.height = '2px';
        shootingStar.style.background = 'rgba(255, 255, 255, 0.9)';
        shootingStar.style.borderRadius = '50%';
        shootingStar.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        shootingStar.style.zIndex = '2';
        shootingStar.style.pointerEvents = 'none';
        
        document.querySelector('.stars-container').appendChild(shootingStar);
        
        // Animate shooting star
        const endX = startX + (Math.random() - 0.5) * 40; // Move up to 20% in either direction
        const endY = startY + (Math.random() - 0.5) * 40;
        
        gsap.fromTo(shootingStar, {
            opacity: 0,
            scale: 0.5
        }, {
            opacity: 1,
            scale: 1.5,
            x: (endX - startX) + 'vw',
            y: (endY - startY) + 'vh',
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(shootingStar, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => shootingStar.remove()
                });
            }
        });
    }, Math.random() * 20000 + 5000); // Random delay between 5-25 seconds
}

// Export for potential integration with larger site
window.BumbleSection = {
    init: initBumbleSection,
    playBuzz: () => window.playBuzzSound && window.playBuzzSound(),
    reset: () => {
        beesHaveMet = false;
        imageHasAppeared = false;
        textHasAppeared = false;
        setupInitialStates();
        ScrollTrigger.refresh();
    }
}; 