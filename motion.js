// Framer Motion animations for images and icons
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Framer Motion to load
    const initializeMotions = () => {
        if (typeof window.FramerMotion === 'undefined') {
            setTimeout(initializeMotions, 100);
            return;
        }

        const { animate, stagger } = window.FramerMotion;

        // Animation configurations
        const fadeInUp = {
            opacity: [0, 1],
            y: [50, 0],
            scale: [0.8, 1]
        };

        const bounceIn = {
            opacity: [0, 1],
            scale: [0, 1.1, 1],
            rotate: [0, 5, 0]
        };

        const slideInLeft = {
            opacity: [0, 1],
            x: [-100, 0],
            scale: [0.8, 1]
        };

        const slideInRight = {
            opacity: [0, 1],
            x: [100, 0],
            scale: [0.8, 1]
        };

        const rotateIn = {
            opacity: [0, 1],
            rotate: [-180, 0],
            scale: [0.5, 1]
        };

        const pulseIn = {
            opacity: [0, 1],
            scale: [0.3, 1.2, 1]
        };

        // Animation options
        const defaultOptions = {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
        };

        const bounceOptions = {
            duration: 1,
            ease: [0.68, -0.55, 0.265, 1.55]
        };

        const quickOptions = {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        };

        // Create Intersection Observer for repeating animations
        const createObserver = (elements, animationType, options = {}) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Element is entering viewport - animate it
                        const element = entry.target;
                        
                        // Reset element state
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(20px)';
                        
                        // Apply animation based on type
                        setTimeout(() => {
                            if (animationType === 'fadeInUp') {
                                animate(element, fadeInUp, { ...defaultOptions, ...options });
                            } else if (animationType === 'slideInLeft') {
                                animate(element, slideInLeft, { ...bounceOptions, ...options });
                            } else if (animationType === 'slideInRight') {
                                animate(element, slideInRight, { ...defaultOptions, ...options });
                            } else if (animationType === 'rotateIn') {
                                animate(element, rotateIn, { ...bounceOptions, delay: index * 0.2, ...options });
                            } else if (animationType === 'pulseIn') {
                                animate(element, pulseIn, { ...quickOptions, delay: index * 0.1, ...options });
                            } else if (animationType === 'bounceIn') {
                                animate(element, bounceIn, { ...bounceOptions, delay: index * 0.1, ...options });
                            }
                        }, options.delay || 0);
                    } else {
                        // Element is leaving viewport - reset it
                        const element = entry.target;
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(20px)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            });

            elements.forEach(element => observer.observe(element));
            return observer;
        };

        // Apply animations to different elements
        
        // Images with various effects
        const images = document.querySelectorAll('.motion-image');
        images.forEach((img, index) => {
            const animationType = index % 2 === 0 ? 'fadeInUp' : 'slideInLeft';
            createObserver([img], animationType);
        });

        // Service icons with rotate effect
        const serviceIcons = document.querySelectorAll('#services .motion-icon');
        if (serviceIcons.length > 0) {
            createObserver(serviceIcons, 'rotateIn');
        }

        // Social icons with stagger effect
        const socialIcons = document.querySelectorAll('.social-icons .motion-icon');
        if (socialIcons.length > 0) {
            const socialObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Reset all social icons
                        socialIcons.forEach(icon => {
                            icon.style.opacity = '0';
                            icon.style.transform = 'translateY(20px)';
                        });
                        
                        // Animate with stagger
                        setTimeout(() => {
                            animate(socialIcons, bounceIn, {
                                ...bounceOptions,
                                delay: stagger(0.1)
                            });
                        }, 100);
                    } else {
                        // Reset when leaving
                        socialIcons.forEach(icon => {
                            icon.style.opacity = '0';
                            icon.style.transform = 'translateY(20px)';
                        });
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            });
            
            const socialContainer = document.querySelector('.social-icons');
            if (socialContainer) {
                socialObserver.observe(socialContainer);
            }
        }

        // Contact icons
        const contactIcons = document.querySelectorAll('#contact p .motion-icon');
        if (contactIcons.length > 0) {
            createObserver(contactIcons, 'pulseIn');
        }

        // Portfolio icons
        const portfolioIcons = document.querySelectorAll('#portfolio .motion-icon');
        if (portfolioIcons.length > 0) {
            createObserver(portfolioIcons, 'slideInRight');
        }

        // Download CV button
        const downloadBtn = document.querySelector('.motion-icon.download-cv-button');
        if (downloadBtn) {
            const downloadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateX(-30px)';
                        
                        setTimeout(() => {
                            animate(entry.target, {
                                opacity: [0, 1],
                                x: [-30, 0],
                                scale: [0.95, 1]
                            }, {
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1]
                            });
                        }, 200);
                    } else {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateX(-30px)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            });
            
            downloadObserver.observe(downloadBtn);
        }

        // Menu button with special hover effect
        const menuBtn = document.querySelector('#menu-btn');
        if (menuBtn) {
            // Initial animation
            animate(menuBtn, fadeInUp, { ...quickOptions, delay: 0.5 });
            
            // Hover animations
            menuBtn.addEventListener('mouseenter', () => {
                animate(menuBtn, { rotate: 180, scale: 1.1 }, { duration: 0.3 });
            });
            
            menuBtn.addEventListener('mouseleave', () => {
                animate(menuBtn, { rotate: 0, scale: 1 }, { duration: 0.3 });
            });
        }

        // Add hover effect for download button
        if (downloadBtn) {
            downloadBtn.addEventListener('mouseenter', () => {
                animate(downloadBtn, { 
                    scale: 1.02, 
                    x: 3,
                    filter: ['brightness(1)', 'brightness(1.1)']
                }, { duration: 0.3 });
            });
            
            downloadBtn.addEventListener('mouseleave', () => {
                animate(downloadBtn, { 
                    scale: 1, 
                    x: 0,
                    filter: ['brightness(1.1)', 'brightness(1)']
                }, { duration: 0.3 });
            });
        }

        // Add gentle pulse to social icons (continuous animation)
        setTimeout(() => {
            const addContinuousAnimation = (selector, animation) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        const repeatAnimation = () => {
                            animate(el, animation, {
                                duration: 2,
                                ease: "easeInOut",
                                direction: "alternate",
                                repeat: Infinity
                            });
                        };
                        repeatAnimation();
                    }, index * 500);
                });
            };

            addContinuousAnimation('.social-icons .motion-icon', {
                scale: [1, 1.1, 1]
            });
        }, 3000);

        console.log('🎭 Framer Motion animations initialized with Intersection Observer!');
    };

    initializeMotions();
});
