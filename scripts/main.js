// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global variables
let currentMemory = 0;
const totalMemories = 10;
let audioPlaying = null;

// DOM elements
const loader = document.getElementById('loader');
const navDots = document.querySelectorAll('.nav-dot');
const progressBar = document.querySelector('.progress-bar');
const memorySections = document.querySelectorAll('.memory-section');
const audioBtns = document.querySelectorAll('.audio-btn');
const heartBtn = document.querySelector('.interactive-heart');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initScrollTriggers();
    initNavigation();
    initAudioControls();
    initInteractiveElements();
    initTextAnimations();
});

// Loader functionality
function initLoader() {
    // Hide loader after 3 seconds
    setTimeout(() => {
        gsap.to(loader, {
            duration: 1,
            opacity: 0,
            onComplete: () => {
                loader.classList.add('hidden');
                // Start main animations
                initMainAnimations();
            }
        });
    }, 3000);
}

// Main scroll-triggered animations
function initScrollTriggers() {
    // Memory sections animation
    memorySections.forEach((section, index) => {
        const memoryContent = section.querySelector('.memory-content');
        const memoryImage = section.querySelector('.memory-image');
        const memoryText = section.querySelector('.memory-text');
        const backgroundElements = section.querySelector('.background-elements');

        // Main content animation
        gsap.fromTo(memoryContent, 
            {
                opacity: 0,
                y: 100
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Image parallax effect
        if (memoryImage) {
            gsap.fromTo(memoryImage,
                {
                    scale: 1.2,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        end: "bottom 30%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Text stagger animation
        if (memoryText) {
            const title = memoryText.querySelector('.memory-title');
            const description = memoryText.querySelector('.memory-description');
            const meta = memoryText.querySelector('.memory-meta');

            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    end: "bottom 40%",
                    toggleActions: "play none none reverse"
                }
            })
            .fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
            .fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
            .fromTo(meta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
        }

        // Background elements animation
        if (backgroundElements) {
            gsap.fromTo(backgroundElements.children,
                {
                    opacity: 0,
                    scale: 0.5
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        end: "bottom 10%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Progress bar animation
    ScrollTrigger.create({
        trigger: ".main-content",
        start: "top top",
        end: "bottom bottom",
        onUpdate: self => {
            const progress = self.progress * 100;
            gsap.to(progressBar, {
                height: `${progress}%`,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    // Update navigation dots on scroll
    memorySections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => updateActiveMemory(index),
            onEnterBack: () => updateActiveMemory(index)
        });
    });
}

// Navigation functionality
function initNavigation() {
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToMemory(index);
        });
    });
}

function scrollToMemory(index) {
    const targetSection = memorySections[index];
    if (targetSection) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: targetSection,
                offsetY: 0
            },
            ease: "power2.inOut"
        });
    }
}

function updateActiveMemory(index) {
    currentMemory = index;
    
    // Update navigation dots
    navDots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
            gsap.to(dot, {
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)"
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

// Audio controls
function initAudioControls() {
    audioBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const audioId = btn.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            
            if (audio) {
                toggleAudio(audio, btn);
            }
        });
    });
}

function toggleAudio(audio, btn) {
    // Stop any currently playing audio
    if (audioPlaying && audioPlaying !== audio) {
        audioPlaying.pause();
        audioPlaying.currentTime = 0;
        updateAudioButton(audioPlaying.id, false);
    }

    if (audio.paused) {
        audio.play();
        audioPlaying = audio;
        updateAudioButton(btn, true);
        
        // Animate button
        gsap.to(btn, {
            scale: 1.3,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
        
        audio.addEventListener('ended', () => {
            audioPlaying = null;
            updateAudioButton(btn, false);
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    } else {
        audio.pause();
        audioPlaying = null;
        updateAudioButton(btn, false);
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }
}

function updateAudioButton(btn, isPlaying) {
    if (isPlaying) {
        btn.textContent = '⏸️';
        btn.style.background = 'rgba(255, 107, 157, 0.2)';
    } else {
        btn.textContent = '🎵';
        btn.style.background = 'none';
    }
}

// Interactive elements
function initInteractiveElements() {
    // Heart button interaction
    if (heartBtn) {
        heartBtn.addEventListener('click', () => {
            heartBtn.classList.add('beating');
            
            // Create floating hearts effect
            createFloatingHearts(heartBtn);
            
            // Remove beating class after animation
            setTimeout(() => {
                heartBtn.classList.remove('beating');
            }, 600);
        });
    }

    // Add hover effects to memory images
    const memoryImages = document.querySelectorAll('.memory-image');
    memoryImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img.querySelector('img'), {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        img.addEventListener('mouseleave', () => {
            gsap.to(img.querySelector('img'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

function createFloatingHearts(button) {
    const rect = button.getBoundingClientRect();
    const numHearts = 6;
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = rect.left + 'px';
        heart.style.top = rect.top + 'px';
        heart.style.fontSize = '1rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        document.body.appendChild(heart);
        
        // Animate the heart
        gsap.to(heart, {
            x: (Math.random() - 0.5) * 200,
            y: -100 - Math.random() * 50,
            opacity: 0,
            duration: 2,
            ease: "power2.out",
            delay: i * 0.1,
            onComplete: () => {
                document.body.removeChild(heart);
            }
        });
    }
}

// Text animations
function initTextAnimations() {
    // Typewriter effect for specific text elements
    const typewriterElements = document.querySelectorAll('.memory-description');
    
    typewriterElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        ScrollTrigger.create({
            trigger: element,
            start: "top 70%",
            onEnter: () => {
                gsap.to(element, {
                    duration: text.length * 0.03,
                    text: text,
                    ease: "none",
                    delay: 0.5
                });
            }
        });
    });
}

// Main animations after loader
function initMainAnimations() {
    // Initial page load animations
    gsap.timeline()
        .fromTo('.memory-nav', 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.5 }
        );

    // Parallax scrolling for background elements
    gsap.utils.toArray('.background-elements > *').forEach(element => {
        gsap.to(element, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: element.closest('.memory-section'),
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Special animations for specific memory types
function initSpecialAnimations() {
    // Bumble bee buzzing animation enhancement
    const bumblebees = document.querySelectorAll('.bumble-bee');
    bumblebees.forEach(bee => {
        gsap.to(bee, {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: "none"
        });
    });

    // Coffee steam animation
    const steamElements = document.querySelectorAll('.coffee-steam');
    steamElements.forEach(steam => {
        gsap.fromTo(steam, 
            { opacity: 0, scaleY: 0 },
            { 
                opacity: 1, 
                scaleY: 1, 
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            }
        );
    });

    // Fruit bouncing animation for nicknames section
    const fruits = document.querySelectorAll('.fruit');
    fruits.forEach(fruit => {
        gsap.to(fruit, {
            y: -20,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    });

    // Video call frame glow animation
    const videoFrames = document.querySelectorAll('.video-frame');
    videoFrames.forEach(frame => {
        gsap.to(frame, {
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    });

    // Korean elements dancing
    const koreanElements = document.querySelectorAll('.korean-element');
    koreanElements.forEach(element => {
        gsap.to(element, {
            rotation: 10,
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}

// Smooth scrolling utility
function smoothScroll() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Locomotive Scroll alternative using GSAP
    let scrollY = 0;
    let currentY = 0;
    
    function updateScroll() {
        currentY = gsap.utils.interpolate(currentY, scrollY, 0.1);
        gsap.set(document.body, { y: -currentY });
        requestAnimationFrame(updateScroll);
    }
    
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });
    
    updateScroll();
}

// Performance optimizations
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll end
        }, 100);
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                if (currentMemory > 0) {
                    scrollToMemory(currentMemory - 1);
                }
                e.preventDefault();
                break;
            case 'ArrowDown':
                if (currentMemory < totalMemories - 1) {
                    scrollToMemory(currentMemory + 1);
                }
                e.preventDefault();
                break;
            case ' ':
                // Space bar to pause/play audio
                if (audioPlaying) {
                    toggleAudio(audioPlaying, document.querySelector(`[data-audio="${audioPlaying.id}"]`));
                }
                e.preventDefault();
                break;
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSpecialAnimations();
    optimizePerformance();
    initKeyboardNavigation();
    
    // Add a subtle mouse follower effect
    const mouseFollower = document.createElement('div');
    mouseFollower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 107, 157, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(mouseFollower);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(mouseFollower, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Add CSS animation missing from the CSS file
const fadeInUpAnimation = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject the missing animation
const style = document.createElement('style');
style.textContent = fadeInUpAnimation;
document.head.appendChild(style); 