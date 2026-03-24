/**
 * East Asian Wisdom Hub - Wallpaper Generator
 * Canvas-based generator for creating beautiful wallpapers
 */

const WallpaperGenerator = {
    canvas: null,
    ctx: null,
    currentProverb: null,
    currentSettings: {
        backgroundStyle: 'ink-wash',
        fontStyle: 'calligraphy',
        colorScheme: 'traditional',
        size: 'phone', // 'phone', 'desktop', 'square', 'instagram'
        showTranslation: true,
        showPronunciation: true,
        textAlign: 'center'
    },
    
    sizePresets: {
        phone: { width: 1080, height: 1920, name: 'Phone (9:16)' },
        desktop: { width: 1920, height: 1080, name: 'Desktop (16:9)' },
        square: { width: 1080, height: 1080, name: 'Square (1:1)' },
        instagram: { width: 1080, height: 1350, name: 'Instagram (4:5)' },
        wallpaper: { width: 1440, height: 2560, name: 'HD Phone (9:16)' }
    },
    
    backgroundStyles: {
        'ink-wash': {
            name: 'Ink Wash',
            description: 'Traditional sumi-e inspired background',
            render: (ctx, width, height, colors) => {
                // Gradient background
                const gradient = ctx.createRadialGradient(width/2, height/3, 0, width/2, height/2, height);
                gradient.addColorStop(0, colors.bgLight);
                gradient.addColorStop(0.5, colors.bgMedium);
                gradient.addColorStop(1, colors.bgDark);
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
                
                // Ink wash circles
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        Math.random() * width,
                        Math.random() * height,
                        50 + Math.random() * 200,
                        0, Math.PI * 2
                    );
                    ctx.fillStyle = `rgba(0, 0, 0, ${0.02 + Math.random() * 0.03})`;
                    ctx.fill();
                }
                
                // Subtle texture
                WallpaperGenerator.addPaperTexture(ctx, width, height);
            }
        },
        
        'watercolor': {
            name: 'Watercolor',
            description: 'Soft watercolor wash effect',
            render: (ctx, width, height, colors) => {
                // Base
                ctx.fillStyle = colors.bgLight;
                ctx.fillRect(0, 0, width, height);
                
                // Watercolor blobs
                const accentColors = [colors.primary, colors.secondary, colors.accent];
                for (let i = 0; i < 8; i++) {
                    const x = Math.random() * width;
                    const y = Math.random() * height;
                    const radius = 100 + Math.random() * 300;
                    const color = accentColors[Math.floor(Math.random() * accentColors.length)];
                    
                    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
                    grad.addColorStop(0, color + '15');
                    grad.addColorStop(0.5, color + '08');
                    grad.addColorStop(1, 'transparent');
                    
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, width, height);
                }
            }
        },
        
        'minimalist': {
            name: 'Minimalist',
            description: 'Clean, modern aesthetic',
            render: (ctx, width, height, colors) => {
                // Solid background
                ctx.fillStyle = colors.bgLight;
                ctx.fillRect(0, 0, width, height);
                
                // Subtle gradient line
                const grad = ctx.createLinearGradient(0, height * 0.7, width, height * 0.9);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(0.5, colors.primary + '10');
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.fillRect(0, height * 0.7, width, height * 0.2);
            }
        },
        
        'gradient': {
            name: 'Gradient',
            description: 'Smooth color gradient',
            render: (ctx, width, height, colors) => {
                const grad = ctx.createLinearGradient(0, 0, width, height);
                grad.addColorStop(0, colors.bgLight);
                grad.addColorStop(0.5, colors.bgMedium);
                grad.addColorStop(1, colors.bgDark);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
            }
        },
        
        'bamboo': {
            name: 'Bamboo',
            description: 'Bamboo stalks silhouette',
            render: (ctx, width, height, colors) => {
                ctx.fillStyle = colors.bgLight;
                ctx.fillRect(0, 0, width, height);
                
                // Draw bamboo
                ctx.strokeStyle = colors.accent + '30';
                ctx.lineWidth = 8;
                
                // Left bamboo
                for (let i = 0; i < 3; i++) {
                    const x = 50 + i * 30;
                    ctx.beginPath();
                    ctx.moveTo(x, height);
                    ctx.lineTo(x + Math.random() * 20 - 10, 0);
                    ctx.stroke();
                    
                    // Bamboo joints
                    for (let j = 0; j < 10; j++) {
                        ctx.beginPath();
                        ctx.moveTo(x - 15, height - j * (height/10));
                        ctx.lineTo(x + 15, height - j * (height/10));
                        ctx.stroke();
                    }
                }
                
                // Right bamboo
                for (let i = 0; i < 2; i++) {
                    const x = width - 80 + i * 30;
                    ctx.beginPath();
                    ctx.moveTo(x, height);
                    ctx.lineTo(x + Math.random() * 20 - 10, 0);
                    ctx.stroke();
                }
            }
        },
        
        'sakura': {
            name: 'Cherry Blossom',
            description: 'Falling sakura petals',
            render: (ctx, width, height, colors) => {
                ctx.fillStyle = colors.bgLight;
                ctx.fillRect(0, 0, width, height);
                
                // Draw petals
                for (let i = 0; i < 30; i++) {
                    const x = Math.random() * width;
                    const y = Math.random() * height;
                    const size = 10 + Math.random() * 20;
                    const rotation = Math.random() * Math.PI * 2;
                    
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(rotation);
                    ctx.fillStyle = colors.secondary + '40';
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size, size/2, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
        },
        
        'taegeuk': {
            name: 'Taegeuk',
            description: 'Korean taegeuk symbol pattern',
            render: (ctx, width, height, colors) => {
                ctx.fillStyle = colors.bgLight;
                ctx.fillRect(0, 0, width, height);
                
                // Draw taegeuk pattern
                const cx = width / 2;
                const cy = height / 4;
                const r = Math.min(width, height) / 6;
                
                // Red half
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI);
                ctx.fillStyle = '#C41E3A';
                ctx.fill();
                
                // Blue half  
                ctx.beginPath();
                ctx.arc(cx, cy, r, Math.PI, Math.PI * 2);
                ctx.fillStyle = '#0F4C81';
                ctx.fill();
                
                // Small circles
                ctx.beginPath();
                ctx.arc(cx - r/2, cy, r/2, 0, Math.PI * 2);
                ctx.fillStyle = '#0F4C81';
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(cx + r/2, cy, r/2, 0, Math.PI * 2);
                ctx.fillStyle = '#C41E3A';
                ctx.fill();
                
                // Subtle overlay
                ctx.fillStyle = colors.bgLight + '80';
                ctx.fillRect(0, height * 0.4, width, height * 0.6);
            }
        },
        
        'gold-leaf': {
            name: 'Gold Leaf',
            description: 'Traditional gold leaf texture',
            render: (ctx, width, height, colors) => {
                // Dark base
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(0, 0, width, height);
                
                // Gold leaf patches
                for (let i = 0; i < 20; i++) {
                    const x = Math.random() * width;
                    const y = Math.random() * height;
                    const w = 50 + Math.random() * 150;
                    const h = 30 + Math.random() * 100;
                    
                    ctx.fillStyle = `rgba(201, 162, 39, ${0.3 + Math.random() * 0.4})`;
                    ctx.fillRect(x, y, w, h);
                }
                
                // Vignette
                const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(1, 'rgba(0,0,0,0.5)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
            }
        }
    },
    
    /**
     * Initialize the wallpaper generator
     */
    init() {
        this.createUI();
        this.setupEventListeners();
    },
    
    /**
     * Create the wallpaper generator UI
     */
    createUI() {
        // Check if already exists
        if (document.getElementById('wallpaperModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'wallpaperModal';
        modal.className = 'modal wallpaper-modal';
        modal.innerHTML = `
            <div class="modal-content wallpaper-content">
                <button class="close-btn" onclick="WallpaperGenerator.close()">&times;</button>
                
                <div class="wallpaper-header">
                    <h2>📱 Wallpaper Generator</h2>
                    <p>Create beautiful wallpapers from your favorite proverbs</p>
                </div>
                
                <div class="wallpaper-layout">
                    <div class="wallpaper-controls">
                        <div class="control-group">
                            <label>Size</label>
                            <select id="wpSize" class="control-select">
                                ${Object.entries(this.sizePresets).map(([key, preset]) => 
                                    `<option value="${key}">${preset.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Background Style</label>
                            <select id="wpBackground" class="control-select">
                                ${Object.entries(this.backgroundStyles).map(([key, style]) => 
                                    `<option value="${key}">${style.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Font Style</label>
                            <select id="wpFont" class="control-select">
                                <option value="calligraphy">Calligraphy</option>
                                <option value="serif">Serif</option>
                                <option value="modern">Modern</option>
                                <option value="brush">Brush Script</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Color Scheme</label>
                            <select id="wpColor" class="control-select">
                                <option value="traditional">Traditional</option>
                                <option value="monochrome">Monochrome</option>
                                <option value="vibrant">Vibrant</option>
                                <option value="dark">Dark Mode</option>
                            </select>
                        </div>
                        
                        <div class="control-group toggles">
                            <label class="toggle-label">
                                <input type="checkbox" id="wpShowTrans" checked>
                                <span>Show Translation</span>
                            </label>
                            <label class="toggle-label">
                                <input type="checkbox" id="wpShowPron" checked>
                                <span>Show Pronunciation</span>
                            </label>
                        </div>
                        
                        <div class="control-group">
                            <button class="action-btn primary generate-btn" onclick="WallpaperGenerator.generate()">
                                🎨 Generate Wallpaper
                            </button>
                        </div>
                        
                        <div class="control-group download-group" style="display:none;">
                            <button class="action-btn secondary" onclick="WallpaperGenerator.download()">
                                💾 Download
                            </button>
                            <button class="action-btn secondary" onclick="WallpaperGenerator.share()">
                                📤 Share
                            </button>
                        </div>
                    </div>
                    
                    <div class="wallpaper-preview">
                        <canvas id="wallpaperCanvas"></canvas>
                        <div class="preview-placeholder">
                            <p>Click "Generate Wallpaper" to preview</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add CSS
        this.injectCSS();
    },
    
    /**
     * Inject required CSS
     */
    injectCSS() {
        if (document.getElementById('wallpaper-css')) return;
        
        const css = document.createElement('style');
        css.id = 'wallpaper-css';
        css.textContent = `
            .wallpaper-modal .modal-content {
                max-width: 1200px;
                max-height: 90vh;
                overflow: hidden;
            }
            
            .wallpaper-header {
                text-align: center;
                margin-bottom: 24px;
                padding-bottom: 16px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .wallpaper-header h2 {
                font-size: 1.8rem;
                margin-bottom: 8px;
                color: var(--text-primary);
            }
            
            .wallpaper-header p {
                color: var(--text-secondary);
            }
            
            .wallpaper-layout {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 24px;
                height: calc(90vh - 150px);
            }
            
            .wallpaper-controls {
                overflow-y: auto;
                padding-right: 8px;
            }
            
            .control-group {
                margin-bottom: 20px;
            }
            
            .control-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: var(--text-primary);
                font-size: 0.9rem;
            }
            
            .control-select {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                font-size: 0.95rem;
                cursor: pointer;
            }
            
            .control-select:focus {
                outline: none;
                border-color: var(--vermilion);
            }
            
            .toggles {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .toggle-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
            }
            
            .toggle-label input {
                width: 18px;
                height: 18px;
            }
            
            .generate-btn {
                width: 100%;
                padding: 14px;
                font-size: 1rem;
            }
            
            .download-group {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
            
            .wallpaper-preview {
                background: var(--bg-tertiary);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }
            
            #wallpaperCanvas {
                max-width: 100%;
                max-height: 100%;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            
            .preview-placeholder {
                position: absolute;
                text-align: center;
                color: var(--text-muted);
            }
            
            .preview-placeholder.hidden {
                display: none;
            }
            
            @media (max-width: 900px) {
                .wallpaper-layout {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto 1fr;
                    height: auto;
                }
                
                .wallpaper-controls {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                }
                
                .wallpaper-preview {
                    min-height: 400px;
                }
            }
        `;
        document.head.appendChild(css);
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Live update on change
        ['wpSize', 'wpBackground', 'wpFont', 'wpColor'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                if (this.currentProverb) this.generate();
            });
        });
        
        ['wpShowTrans', 'wpShowPron'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                if (this.currentProverb) this.generate();
            });
        });
    },
    
    /**
     * Open wallpaper generator with a proverb
     */
    open(proverb) {
        this.currentProverb = proverb;
        const modal = document.getElementById('wallpaperModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto-generate
        setTimeout(() => this.generate(), 100);
    },
    
    /**
     * Close the modal
     */
    close() {
        const modal = document.getElementById('wallpaperModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    /**
     * Get current settings
     */
    getSettings() {
        return {
            size: document.getElementById('wpSize')?.value || 'phone',
            background: document.getElementById('wpBackground')?.value || 'ink-wash',
            font: document.getElementById('wpFont')?.value || 'calligraphy',
            color: document.getElementById('wpColor')?.value || 'traditional',
            showTranslation: document.getElementById('wpShowTrans')?.checked ?? true,
            showPronunciation: document.getElementById('wpShowPron')?.checked ?? true
        };
    },
    
    /**
     * Generate wallpaper
     */
    generate() {
        if (!this.currentProverb) return;
        
        const settings = this.getSettings();
        const size = this.sizePresets[settings.size];
        const canvas = document.getElementById('wallpaperCanvas');
        
        canvas.width = size.width;
        canvas.height = size.height;
        
        const ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = ctx;
        
        // Get colors based on scheme
        const colors = this.getColorScheme(settings.color);
        
        // Render background
        const bgStyle = this.backgroundStyles[settings.background];
        if (bgStyle) {
            bgStyle.render(ctx, size.width, size.height, colors);
        }
        
        // Render text
        this.renderText(ctx, size.width, size.height, colors, settings);
        
        // Show canvas, hide placeholder
        document.querySelector('.preview-placeholder')?.classList.add('hidden');
        document.querySelector('.download-group').style.display = 'grid';
    },
    
    /**
     * Get color scheme
     */
    getColorScheme(scheme) {
        const schemes = {
            traditional: {
                bgLight: '#FAF7F0',
                bgMedium: '#F2EDE3',
                bgDark: '#E8E0D0',
                primary: '#1A1A1A',
                secondary: '#C73E1D',
                accent: '#C9A227',
                text: '#1A1A1A',
                textLight: '#666666'
            },
            monochrome: {
                bgLight: '#FFFFFF',
                bgMedium: '#F5F5F5',
                bgDark: '#E0E0E0',
                primary: '#000000',
                secondary: '#333333',
                accent: '#666666',
                text: '#000000',
                textLight: '#666666'
            },
            vibrant: {
                bgLight: '#FFF8F0',
                bgMedium: '#FFE4D0',
                bgDark: '#FFC4A0',
                primary: '#C73E1D',
                secondary: '#2D6A4F',
                accent: '#C9A227',
                text: '#1A1A1A',
                textLight: '#666666'
            },
            dark: {
                bgLight: '#2A2A2A',
                bgMedium: '#1A1A1A',
                bgDark: '#0A0A0A',
                primary: '#FFFFFF',
                secondary: '#C9A227',
                accent: '#C73E1D',
                text: '#FFFFFF',
                textLight: '#AAAAAA'
            }
        };
        return schemes[scheme] || schemes.traditional;
    },
    
    /**
     * Render text on wallpaper
     */
    renderText(ctx, width, height, colors, settings) {
        const proverb = this.currentProverb;
        const padding = width * 0.1;
        const contentWidth = width - padding * 2;
        
        // Get text content
        const nativeText = proverb.cn || proverb.jp || proverb.kr || '';
        const pronunciation = proverb.py || proverb.romaji || proverb.roman || '';
        const translation = proverb.en || '';
        
        // Font configurations
        const fonts = {
            calligraphy: {
                native: `${height * 0.08}px 'Ma Shan Zheng', cursive`,
                pron: `${height * 0.025}px 'Noto Serif', serif`,
                trans: `${height * 0.032}px 'Noto Serif', serif`
            },
            serif: {
                native: `${height * 0.07}px 'Noto Serif SC', serif`,
                pron: `${height * 0.025}px 'Noto Serif', serif`,
                trans: `${height * 0.032}px 'Noto Serif', serif`
            },
            modern: {
                native: `${height * 0.07}px 'Noto Sans SC', sans-serif`,
                pron: `${height * 0.025}px 'Noto Sans', sans-serif`,
                trans: `${height * 0.032}px 'Noto Sans', sans-serif`
            },
            brush: {
                native: `${height * 0.08}px 'Zhi Mang Xing', cursive`,
                pron: `${height * 0.025}px 'Noto Serif', serif`,
                trans: `${height * 0.032}px 'Noto Serif', serif`
            }
        };
        
        const font = fonts[settings.font] || fonts.calligraphy;
        
        // Calculate vertical positions
        const centerY = height * 0.45;
        let currentY = centerY - height * 0.1;
        
        // Draw native text (Chinese/Japanese/Korean)
        if (nativeText) {
            ctx.font = font.native;
            ctx.fillStyle = colors.text;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Word wrap for long text
            const maxWidth = contentWidth;
            const words = nativeText.split('');
            let line = '';
            const lines = [];
            
            for (let word of words) {
                const testLine = line + word;
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && line !== '') {
                    lines.push(line);
                    line = word;
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
            
            const lineHeight = height * 0.09;
            const startY = currentY - (lines.length - 1) * lineHeight / 2;
            
            lines.forEach((line, i) => {
                ctx.fillText(line, width / 2, startY + i * lineHeight);
            });
            
            currentY = startY + lines.length * lineHeight + height * 0.05;
        }
        
        // Draw pronunciation
        if (settings.showPronunciation && pronunciation) {
            ctx.font = font.pron;
            ctx.fillStyle = colors.textLight;
            ctx.fillText(pronunciation, width / 2, currentY);
            currentY += height * 0.06;
        }
        
        // Draw translation
        if (settings.showTranslation && translation) {
            ctx.font = font.trans;
            ctx.fillStyle = colors.text;
            
            // Word wrap translation
            const maxWidth = contentWidth;
            const words = translation.split(' ');
            let line = '';
            const lines = [];
            
            for (let word of words) {
                const testLine = line + (line ? ' ' : '') + word;
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && line !== '') {
                    lines.push(line);
                    line = word;
                } else {
                    line = testLine;
                }
            }
            lines.push(line);
            
            const lineHeight = height * 0.04;
            
            // Draw decorative line
            const lineY = currentY - height * 0.02;
            ctx.beginPath();
            ctx.moveTo(width * 0.3, lineY);
            ctx.lineTo(width * 0.7, lineY);
            ctx.strokeStyle = colors.secondary + '40';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            currentY += height * 0.02;
            
            lines.forEach((line, i) => {
                ctx.fillText(line, width / 2, currentY + i * lineHeight);
            });
        }
        
        // Draw branding
        ctx.font = `${height * 0.02}px 'Noto Serif', serif`;
        ctx.fillStyle = colors.textLight;
        ctx.fillText('East Asian Wisdom', width / 2, height * 0.92);
    },
    
    /**
     * Add paper texture overlay
     */
    addPaperTexture(ctx, width, height) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 8;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }
        
        ctx.putImageData(imageData, 0, 0);
    },
    
    /**
     * Download wallpaper
     */
    download() {
        if (!this.canvas) return;
        
        const proverb = this.currentProverb;
        const text = (proverb.cn || proverb.jp || proverb.kr || 'proverb').substring(0, 20);
        const filename = `wallpaper-${text.replace(/[^\w]/g, '')}-${Date.now()}.png`;
        
        const link = document.createElement('a');
        link.download = filename;
        link.href = this.canvas.toDataURL('image/png', 1.0);
        link.click();
        
        showToast('Wallpaper downloaded!');
    },
    
    /**
     * Share wallpaper
     */
    async share() {
        if (!this.canvas) return;
        
        try {
            const blob = await new Promise(resolve => this.canvas.toBlob(resolve, 'image/png'));
            const file = new File([blob], 'wallpaper.png', { type: 'image/png' });
            
            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'East Asian Wisdom Wallpaper',
                    text: 'Check out this beautiful wallpaper I created!'
                });
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(
                    `"${this.currentProverb.en}" - Created with East Asian Wisdom`
                );
                showToast('Quote copied to clipboard!');
            }
        } catch (err) {
            console.error('Share failed:', err);
            showToast('Share failed, try downloading instead');
        }
    }
};

// Initialize
window.WallpaperGenerator = WallpaperGenerator;

// Open function for external use
window.openWallpaperGenerator = (proverb) => {
    WallpaperGenerator.open(proverb);
};
