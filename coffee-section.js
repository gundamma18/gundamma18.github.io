// Coffee Section JavaScript with GSAP ScrollTrigger

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const coffeeSection = document.querySelector('.coffee-section');
const mugLeft = document.getElementById('mug-left');
const mugRight = document.getElementById('mug-right');
const heartSteam = document.getElementById('heart-steam');
const napkin = document.getElementById('napkin');
const storyContainer = document.getElementById('story-container');
const storyText = document.getElementById('story-text');
const audioButton = document.getElementById('audio-button');
const cafeAudio = document.getElementById('cafe-audio');
const volumeIcon = document.querySelector('.volume-icon');
const muteIcon = document.querySelector('.mute-icon');

// Audio state
let isAudioPlaying = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupAudioControls();
    setupMugInteractions();
    setupScrollIndicator();
});

// Main animation setup
function initializeAnimations() {
    // Timeline for sequential animations
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: coffeeSection,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onEnter: () => {
                // Start continuous animations when section enters
                startContinuousAnimations();
            }
        }
    });

    // 1. Mugs slide in from left and right (30% scroll)
    mainTimeline.to(mugLeft, {
        x: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
            mugLeft.classList.add('mug-in-position');
        }
    }, 0.3)
    .to(mugRight, {
        x: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
            mugRight.classList.add('mug-in-position');
        }
    }, 0.3)
    
    // 2. Napkin appears (60% scroll)
    .to(napkin, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            napkin.classList.add('napkin-visible');
        }
    }, 1.2)
    
    // 3. Heart steam appears when mugs are close (80% scroll)
    .to(heartSteam, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
            heartSteam.classList.add('heart-steam-active');
        }
    }, 1.8)
    
    // 4. Story text appears with typewriter effect (90% scroll)
    .to(storyContainer, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            startTypewriterEffect();
            storyContainer.classList.add('story-visible');
        }
    }, 2.2);

    // Parallax effect for background elements
    gsap.to('.coffee-beans-container', {
        y: -50,
        scrollTrigger: {
            trigger: coffeeSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
        }
    });

    gsap.to('.edison-bulbs', {
        y: -30,
        scrollTrigger: {
            trigger: coffeeSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        }
    });
}

// Start continuous background animations
function startContinuousAnimations() {
    // Enhanced steam animation
    const steamLines = document.querySelectorAll('.steam-line');
    steamLines.forEach((line, index) => {
        gsap.to(line, {
            y: -40,
            opacity: 0,
            scale: 1.5,
            duration: 2 + (index * 0.3),
            repeat: -1,
            ease: "power2.out",
            delay: index * 0.7
        });
    });

    // Coffee surface ripple effect
    const coffeeSurfaces = document.querySelectorAll('.coffee-surface');
    coffeeSurfaces.forEach(surface => {
        gsap.to(surface, {
            scaleX: 1.1,
            scaleY: 0.9,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // Bulb flickering animation
    const bulbs = document.querySelectorAll('.bulb');
    bulbs.forEach((bulb, index) => {
        gsap.to(bulb, {
            opacity: 0.7,
            scale: 0.95,
            duration: 2 + index,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.5
        });
    });
}

// Typewriter effect for story text
function startTypewriterEffect() {
    const text = storyText.textContent;
    storyText.textContent = '';
    storyText.style.opacity = '1';
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            storyText.textContent += text.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            // Show subtitle after typewriter completes
            const subtitle = document.querySelector('.story-subtitle');
            gsap.to(subtitle, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.5
            });
        }
    }, 80);
}

// Audio controls
function setupAudioControls() {
    audioButton.addEventListener('click', toggleAudio);
    
    // Set initial audio properties
    cafeAudio.volume = 0.3;
    cafeAudio.loop = true;
}

function toggleAudio() {
    if (isAudioPlaying) {
        cafeAudio.pause();
        volumeIcon.style.display = 'none';
        muteIcon.style.display = 'block';
        audioButton.style.background = 'rgba(139, 69, 19, 0.5)';
        isAudioPlaying = false;
    } else {
        // Try to play audio (some browsers require user interaction)
        const playPromise = cafeAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                volumeIcon.style.display = 'block';
                muteIcon.style.display = 'none';
                audioButton.style.background = 'rgba(139, 69, 19, 0.8)';
                isAudioPlaying = true;
            }).catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    }
}

// Mug interaction effects
function setupMugInteractions() {
    // Left mug click - show hidden message
    mugLeft.addEventListener('click', function() {
        showHiddenMessage(this, "You looked nervous 😊");
    });

    // Right mug click - show hidden message  
    mugRight.addEventListener('click', function() {
        showHiddenMessage(this, "But your smile was perfect ☕");
    });

    // Add hover effects
    [mugLeft, mugRight].forEach(mug => {
        mug.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        mug.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Show hidden message when mug is clicked
function showHiddenMessage(mug, message) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'hidden-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(245, 245, 220, 0.9);
        color: #333;
        padding: 8px 12px;
        border-radius: 15px;
        font-family: 'Dancing Script', cursive;
        font-size: 14px;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        opacity: 0;
        z-index: 100;
        pointer-events: none;
    `;

    mug.appendChild(messageDiv);

    // Animate message in and out
    gsap.timeline()
        .to(messageDiv, {
            opacity: 1,
            y: -10,
            duration: 0.5,
            ease: "power2.out"
        })
        .to(messageDiv, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in",
            delay: 2,
            onComplete: () => {
                messageDiv.remove();
            }
        });

    // Add sparkle effect
    createSparkleEffect(mug);
}

// Create sparkle effect around mug
function createSparkleEffect(element) {
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 12px;
            pointer-events: none;
            z-index: 50;
        `;
        
        element.appendChild(sparkle);
        
        const angle = (360 / 5) * i;
        const distance = 40 + Math.random() * 20;
        
        gsap.to(sparkle, {
            x: Math.cos(angle * Math.PI / 180) * distance,
            y: Math.sin(angle * Math.PI / 180) * distance,
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
}

// Scroll indicator fade out
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    ScrollTrigger.create({
        trigger: coffeeSection,
        start: "top 50%",
        onEnter: () => {
            gsap.to(scrollIndicator, {
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        },
        onLeaveBack: () => {
            gsap.to(scrollIndicator, {
                opacity: 0.7,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
}

// Enhanced heart steam animation when mugs meet
function enhanceHeartSteamAnimation() {
    const heartPath = document.querySelector('.heart-steam-path');
    
    if (heartPath) {
        gsap.to(heartPath, {
            scale: 1.2,
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// Cleanup function for when leaving the section
function cleanup() {
    if (isAudioPlaying) {
        cafeAudio.pause();
        isAudioPlaying = false;
    }
}

// Listen for page visibility changes to handle audio
document.addEventListener('visibilitychange', function() {
    if (document.hidden && isAudioPlaying) {
        cafeAudio.pause();
    } else if (!document.hidden && isAudioPlaying) {
        cafeAudio.play().catch(e => console.log('Resume play failed:', e));
    }
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Export functions for potential integration
window.coffeeSection = {
    cleanup,
    toggleAudio,
    enhanceHeartSteamAnimation
}; 