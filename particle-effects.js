/**
 * East Asian Wisdom Hub - Particle Effects System
 * Falling cherry blossoms, lanterns, hibiscus petals
 * Creates atmospheric visual effects for each cultural theme
 */

const ParticleEffects = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    currentType: 'lantern', // 'sakura', 'lantern', 'hibiscus', 'mixed'
    isActive: false,
    
    // Configuration for different particle types
    config: {
        sakura: {
            count: 40,
            color: '#FFB7C5',
            colorVariation: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FFC9D6'],
            size: { min: 8, max: 18 },
            speed: { min: 0.5, max: 1.5 },
            rotationSpeed: { min: -2, max: 2 },
            sway: { min: 0.3, max: 1.2 },
            opacity: { min: 0.4, max: 0.9 },
            shape: 'petal'
        },
        lantern: {
            count: 15,
            color: '#FF6B35',
            colorVariation: ['#FF4500', '#FF6347', '#FFD700', '#FFA500'],
            size: { min: 20, max: 35 },
            speed: { min: 0.3, max: 0.8 },
            rotationSpeed: { min: -0.5, max: 0.5 },
            sway: { min: 0.5, max: 1.5 },
            opacity: { min: 0.3, max: 0.7 },
            shape: 'lantern'
        },
        hibiscus: {
            count: 30,
            color: '#C41E3A',
            colorVariation: ['#DC143C', '#B22222', '#FF1493', '#FF69B4'],
            size: { min: 10, max: 22 },
            speed: { min: 0.4, max: 1.2 },
            rotationSpeed: { min: -1.5, max: 1.5 },
            sway: { min: 0.4, max: 1.0 },
            opacity: { min: 0.5, max: 0.9 },
            shape: 'flower'
        },
        mixed: {
            count: 25,
            types: ['sakura', 'lantern', 'hibiscus'],
            color: '#9B59B6',
            colorVariation: ['#FFB7C5', '#FF6B35', '#C41E3A', '#9B59B6'],
            size: { min: 10, max: 25 },
            speed: { min: 0.4, max: 1.2 },
            rotationSpeed: { min: -1, max: 1 },
            sway: { min: 0.4, max: 1.2 },
            opacity: { min: 0.4, max: 0.8 },
            shape: 'mixed'
        }
    },

    /**
     * Initialize the particle system
     */
    init() {
        this.createCanvas();
        this.setupResizeListener();
        
        // Check for saved preference or current theme
        const currentTheme = window.CulturalThemes?.currentTheme || 'chinese';
        this.setTypeByTheme(currentTheme);
        
        // Start animation
        this.start();
        
        console.log('[ParticleEffects] Initialized');
    },

    /**
     * Create canvas element
     */
    createCanvas() {
        // Remove existing canvas if any
        const existing = document.getElementById('particleCanvas');
        if (existing) existing.remove();

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particleCanvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.8;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    },

    /**
     * Resize canvas to match window
     */
    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    /**
     * Setup window resize listener
     */
    setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 100);
        }, { passive: true });
    },

    /**
     * Set particle type based on theme
     */
    setTypeByTheme(theme) {
        const typeMap = {
            chinese: 'lantern',
            japanese: 'sakura',
            korean: 'hibiscus',
            universal: 'mixed'
        };
        this.setType(typeMap[theme] || 'lantern');
    },

    /**
     * Set particle type
     */
    setType(type) {
        if (this.currentType === type && this.particles.length > 0) return;
        
        this.currentType = type;
        this.particles = [];
        this.createParticles();
        
        // Update floating lanterns emoji if they exist
        this.updateFloatingLanterns(type);
    },

    /**
     * Update floating lantern emojis in DOM
     */
    updateFloatingLanterns(type) {
        const lanterns = document.querySelectorAll('.floating-lantern');
        const emojiMap = {
            sakura: '🌸',
            lantern: '🏮',
            hibiscus: '🏵️',
            mixed: '✨'
        };
        
        lanterns.forEach(lantern => {
            lantern.textContent = emojiMap[type] || '🏮';
        });
    },

    /**
     * Create particle objects
     */
    createParticles() {
        const config = this.config[this.currentType];
        if (!config) return;

        const count = this.getOptimalParticleCount(config.count);

        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(config));
        }
    },

    /**
     * Get optimal particle count based on device performance
     */
    getOptimalParticleCount(baseCount) {
        // Reduce particles on mobile/low-power devices
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
        
        if (isMobile) return Math.floor(baseCount * 0.6);
        if (isLowPower) return Math.floor(baseCount * 0.7);
        return baseCount;
    },

    /**
     * Create a single particle
     */
    createParticle(config, specificType = null) {
        const type = specificType || this.currentType;
        const colors = config.colorVariation || [config.color];
        
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: this.randomRange(config.size.min, config.size.max),
            speedY: this.randomRange(config.speed.min, config.speed.max),
            speedX: 0,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: this.randomRange(config.rotationSpeed.min, config.rotationSpeed.max),
            sway: this.randomRange(config.sway.min, config.sway.max),
            swayOffset: Math.random() * Math.PI * 2,
            opacity: this.randomRange(config.opacity.min, config.opacity.max),
            color: colors[Math.floor(Math.random() * colors.length)],
            type: type,
            shape: specificType || config.shape
        };
    },

    /**
     * Get random number in range
     */
    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Start animation loop
     */
    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.animate();
    },

    /**
     * Stop animation loop
     */
    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },

    /**
     * Animation loop
     */
    animate() {
        if (!this.isActive || !this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        this.particles.forEach((particle, index) => {
            this.updateParticle(particle, time);
            this.drawParticle(particle);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    },

    /**
     * Update particle position
     */
    updateParticle(particle, time) {
        // Vertical movement
        particle.y += particle.speedY;

        // Horizontal sway
        particle.swayOffset += 0.02;
        particle.speedX = Math.sin(particle.swayOffset) * particle.sway;
        particle.x += particle.speedX;

        // Rotation
        particle.rotation += particle.rotationSpeed * 0.01;

        // Reset if off screen
        if (particle.y > this.canvas.height + particle.size) {
            particle.y = -particle.size;
            particle.x = Math.random() * this.canvas.width;
        }

        // Wrap horizontally
        if (particle.x < -particle.size) {
            particle.x = this.canvas.width + particle.size;
        } else if (particle.x > this.canvas.width + particle.size) {
            particle.x = -particle.size;
        }
    },

    /**
     * Draw a particle
     */
    drawParticle(particle) {
        const ctx = this.ctx;
        ctx.save();
        
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;

        switch (particle.shape) {
            case 'petal':
            case 'sakura':
                this.drawPetal(ctx, particle.size, particle.color);
                break;
            case 'lantern':
                this.drawLantern(ctx, particle.size, particle.color);
                break;
            case 'flower':
            case 'hibiscus':
                this.drawFlower(ctx, particle.size, particle.color);
                break;
            default:
                this.drawPetal(ctx, particle.size, particle.color);
        }

        ctx.restore();
    },

    /**
     * Draw a sakura petal shape
     */
    drawPetal(ctx, size, color) {
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.bezierCurveTo(size / 2, -size / 4, size / 2, size / 4, 0, size / 2);
        ctx.bezierCurveTo(-size / 2, size / 4, -size / 2, -size / 4, 0, -size / 2);
        ctx.fill();
        
        // Add subtle gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, this.darkenColor(color, 20));
        ctx.fillStyle = gradient;
        ctx.fill();
    },

    /**
     * Draw a lantern shape
     */
    drawLantern(ctx, size, color) {
        // Lantern body
        ctx.beginPath();
        ctx.ellipse(0, 0, size / 2, size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Lantern glow
        const gradient = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size);
        gradient.addColorStop(0, this.lightenColor(color, 30));
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(1, this.darkenColor(color, 20));
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Top and bottom caps
        ctx.fillStyle = this.darkenColor(color, 40);
        ctx.fillRect(-size / 3, -size * 0.75, size / 1.5, size / 8);
        ctx.fillRect(-size / 3, size * 0.65, size / 1.5, size / 8);
    },

    /**
     * Draw a hibiscus flower shape
     */
    drawFlower(ctx, size, color) {
        const petals = 5;
        
        for (let i = 0; i < petals; i++) {
            ctx.save();
            ctx.rotate((Math.PI * 2 / petals) * i);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(size / 3, -size / 3, 0, -size);
            ctx.quadraticCurveTo(-size / 3, -size / 3, 0, 0);
            ctx.fill();
            
            ctx.restore();
        }
        
        // Center
        ctx.beginPath();
        ctx.arc(0, 0, size / 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
    },

    /**
     * Lighten a hex color
     */
    lightenColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min((num >> 16) + amt, 255);
        const G = Math.min((num >> 8 & 0x00FF) + amt, 255);
        const B = Math.min((num & 0x0000FF) + amt, 255);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    },

    /**
     * Darken a hex color
     */
    darkenColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max((num >> 16) - amt, 0);
        const G = Math.max((num >> 8 & 0x00FF) - amt, 0);
        const B = Math.max((num & 0x0000FF) - amt, 0);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    },

    /**
     * Pause animation when tab is hidden
     */
    handleVisibilityChange() {
        if (document.hidden) {
            this.stop();
        } else {
            this.start();
        }
    },

    /**
     * Destroy the particle system
     */
    destroy() {
        this.stop();
        if (this.canvas) {
            this.canvas.remove();
            this.canvas = null;
        }
        this.ctx = null;
        this.particles = [];
    }
};

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    ParticleEffects.handleVisibilityChange();
});

// Listen for theme changes
window.addEventListener('themeChanged', (e) => {
    if (e.detail && e.detail.particleType) {
        ParticleEffects.setType(e.detail.particleType);
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ParticleEffects.init());
} else {
    ParticleEffects.init();
}

// Expose globally
window.ParticleEffects = ParticleEffects;
