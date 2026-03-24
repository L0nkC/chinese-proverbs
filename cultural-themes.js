/**
 * East Asian Wisdom Hub - Cultural Theme Manager
 * Handles switching between Chinese, Japanese, and Korean aesthetics
 */

const CulturalThemes = {
    currentTheme: 'chinese', // 'chinese', 'japanese', 'korean', 'universal'
    
    themes: {
        chinese: {
            id: 'chinese',
            name: 'Chinese',
            nameNative: '中华',
            flag: '🇨🇳',
            colors: {
                primary: '#C73E1D', // Vermilion
                secondary: '#C9A227', // Imperial Gold
                accent: '#2D6A4F', // Jade
                background: '#FAF7F0', // Rice Paper
                backgroundDark: '#121212',
                text: '#1A1A1A',
                textLight: '#FAF7F0'
            },
            fonts: {
                chinese: "'Noto Serif SC', 'SimSun', serif",
                display: "'Ma Shan Zheng', cursive"
            },
            motifs: ['bamboo', 'lantern', 'mountain'],
            particleType: 'lantern',
            sealText: '智慧',
            patterns: {
                header: '◈ ◆ ◈',
                divider: '❖ ❖ ❖',
                corner: '◈'
            }
        },
        
        japanese: {
            id: 'japanese',
            name: 'Japanese',
            nameNative: '日本',
            flag: '🇯🇵',
            colors: {
                primary: '#1B4B7A', // Indigo (Ai)
                secondary: '#E8D4C4', // Cherry Blossom Pink
                accent: '#8B4513', // Wood Brown
                background: '#F5F0E8', // Washi Paper
                backgroundDark: '#0F1419',
                text: '#1A1A1A',
                textLight: '#F5F0E8'
            },
            fonts: {
                japanese: "'Noto Serif JP', 'Yu Mincho', serif",
                display: "'Yuji Boku', 'Noto Serif JP', serif"
            },
            motifs: ['sakura', 'torii', 'fuji'],
            particleType: 'sakura',
            sealText: '知恵',
            patterns: {
                header: '❀ ✿ ❀',
                divider: '〜 〜 〜',
                corner: '❀'
            }
        },
        
        korean: {
            id: 'korean',
            name: 'Korean',
            nameNative: '한국',
            flag: '🇰🇷',
            colors: {
                primary: '#C41E3A', // Obangsaek - Red
                secondary: '#0F4C81', // Obangsaek - Blue
                accent: '#2E8B57', // Obangsaek - Green
                background: '#FFFAF0', // Traditional White
                backgroundDark: '#0F1419',
                text: '#1A1A1A',
                textLight: '#FFFAF0'
            },
            fonts: {
                korean: "'Noto Serif KR', 'Nanum Myeongjo', serif",
                display: "'East Sea Dokdo', 'Noto Serif KR', serif"
            },
            motifs: ['taegeuk', 'hibiscus', 'hanok'],
            particleType: 'hibiscus',
            sealText: '지혜',
            patterns: {
                header: '◐ ◑ ◐',
                divider: '❋ ❋ ❋',
                corner: '◐'
            }
        },
        
        universal: {
            id: 'universal',
            name: 'Universal',
            nameNative: '東亜',
            flag: '🌏',
            colors: {
                primary: '#6B4E71', // Purple - unifying color
                secondary: '#D4A373', // Gold
                accent: '#2D6A4F', // Jade
                background: '#FDF8F3', // Universal warm white
                backgroundDark: '#1A1A2E',
                text: '#1A1A1A',
                textLight: '#FDF8F3'
            },
            fonts: {
                all: "'Noto Serif', serif"
            },
            motifs: ['scroll', 'temple', 'unity'],
            particleType: 'mixed',
            sealText: '慧',
            patterns: {
                header: '◆ ◇ ◆',
                divider: '✦ ✧ ✦',
                corner: '◆'
            }
        }
    },
    
    /**
     * Initialize the theme system
     */
    init() {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('culturalTheme');
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        }
        
        this.applyTheme(this.currentTheme);
        this.setupThemeSwitcher();
    },
    
    /**
     * Apply a theme to the page
     */
    applyTheme(themeId) {
        const theme = this.themes[themeId];
        if (!theme) return;
        
        this.currentTheme = themeId;
        
        // Update CSS custom properties
        const root = document.documentElement;
        root.style.setProperty('--theme-primary', theme.colors.primary);
        root.style.setProperty('--theme-secondary', theme.colors.secondary);
        root.style.setProperty('--theme-accent', theme.colors.accent);
        root.style.setProperty('--theme-bg', theme.colors.background);
        root.style.setProperty('--theme-text', theme.colors.text);
        
        // Update body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeId}`);
        
        // Update header decorations
        this.updateDecorations(theme);
        
        // Update seal
        this.updateSeal(theme);
        
        // Update particles
        if (window.ParticleEffects) {
            ParticleEffects.setType(theme.particleType);
        }
        
        // Update meta theme-color
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.colors.primary);
        
        // Save preference
        localStorage.setItem('culturalTheme', themeId);
        
        // Trigger event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    },
    
    /**
     * Update visual decorations based on theme
     */
    updateDecorations(theme) {
        // Update header decorations
        const topDecoration = document.querySelector('.header-decoration.top');
        const bottomDecoration = document.querySelector('.header-decoration.bottom');
        
        if (topDecoration) topDecoration.textContent = theme.patterns.header;
        if (bottomDecoration) bottomDecoration.textContent = theme.patterns.divider;
        
        // Update floating elements
        const lanterns = document.querySelectorAll('.floating-lantern');
        lanterns.forEach((lantern, index) => {
            if (theme.id === 'japanese') {
                lantern.textContent = '🌸';
            } else if (theme.id === 'korean') {
                lantern.textContent = '🏵️';
            } else {
                lantern.textContent = '🏮';
            }
        });
        
        // Update bamboo decorations
        const bambooLeft = document.querySelector('.bamboo-left');
        const bambooRight = document.querySelector('.bamboo-right');
        
        if (bambooLeft && bambooRight) {
            if (theme.id === 'japanese') {
                bambooLeft.style.background = 'linear-gradient(90deg, rgba(27, 75, 122, 0.06) 0%, transparent 100%)';
                bambooRight.style.background = 'linear-gradient(270deg, rgba(27, 75, 122, 0.06) 0%, transparent 100%)';
            } else if (theme.id === 'korean') {
                bambooLeft.style.background = 'linear-gradient(90deg, rgba(196, 30, 58, 0.06) 0%, transparent 100%)';
                bambooRight.style.background = 'linear-gradient(270deg, rgba(15, 76, 129, 0.06) 0%, transparent 100%)';
            } else {
                bambooLeft.style.background = 'linear-gradient(90deg, rgba(45, 106, 79, 0.06) 0%, transparent 100%)';
                bambooRight.style.background = 'linear-gradient(270deg, rgba(45, 106, 79, 0.06) 0%, transparent 100%)';
            }
        }
    },
    
    /**
     * Update seal/mark based on theme
     */
    updateSeal(theme) {
        const sealMark = document.querySelector('.seal-mark');
        if (sealMark) {
            sealMark.textContent = theme.sealText;
            sealMark.style.fontFamily = theme.fonts.display || theme.fonts.chinese || theme.fonts.japanese || theme.fonts.korean;
        }
        
        // Update seal colors
        const sealOuter = document.querySelector('.seal-outer');
        if (sealOuter) {
            sealOuter.style.background = `linear-gradient(135deg, ${theme.colors.primary}, ${this.darkenColor(theme.colors.primary, 20)})`;
        }
    },
    
    /**
     * Setup theme switcher UI
     */
    setupThemeSwitcher() {
        // Check if switcher already exists
        if (document.getElementById('themeSwitcher')) return;
        
        const switcher = document.createElement('div');
        switcher.id = 'themeSwitcher';
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="theme-toggle-btn" aria-label="Change cultural theme">
                <span class="theme-current">${this.themes[this.currentTheme].flag}</span>
                <span class="theme-label">Theme</span>
            </button>
            <div class="theme-dropdown">
                ${Object.values(this.themes).map(theme => `
                    <button class="theme-option ${theme.id === this.currentTheme ? 'active' : ''}" 
                            data-theme="${theme.id}"
                            aria-label="Switch to ${theme.name} theme">
                        <span class="theme-flag">${theme.flag}</span>
                        <span class="theme-name">${theme.name}</span>
                        <span class="theme-native">${theme.nameNative}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Insert after dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.parentNode.insertBefore(switcher, darkModeToggle.nextSibling);
        } else {
            document.body.appendChild(switcher);
        }
        
        // Add event listeners
        const toggleBtn = switcher.querySelector('.theme-toggle-btn');
        const dropdown = switcher.querySelector('.theme-dropdown');
        
        toggleBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
        
        // Theme selection
        switcher.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const themeId = btn.dataset.theme;
                this.applyTheme(themeId);
                
                // Update active state
                switcher.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update toggle button
                toggleBtn.querySelector('.theme-current').textContent = this.themes[themeId].flag;
                
                // Hide dropdown
                dropdown.classList.remove('show');
                
                // Show toast
                showToast(`Switched to ${this.themes[themeId].name} theme`);
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    },
    
    /**
     * Helper: Darken a hex color
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
     * Get current theme
     */
    getCurrentTheme() {
        return this.themes[this.currentTheme];
    },
    
    /**
     * Get theme-specific proverb title
     */
    getProverbTitle(proverb) {
        if (proverb.cn) return proverb.cn;
        if (proverb.jp) return proverb.jp;
        if (proverb.kr) return proverb.kr;
        return proverb.en;
    },
    
    /**
     * Get theme-specific pronunciation
     */
    getPronunciation(proverb) {
        if (proverb.py) return proverb.py;
        if (proverb.romaji) return proverb.romaji;
        if (proverb.roman) return proverb.roman;
        return '';
    }
};

// CSS for theme switcher
const themeSwitcherCSS = `
.theme-switcher {
    position: fixed;
    top: 20px;
    right: 70px;
    z-index: 1000;
}

.theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e0d6c0);
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.theme-toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.theme-current {
    font-size: 18px;
}

.theme-label {
    font-size: 12px;
    color: var(--text-secondary, #666);
}

.theme-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e0d6c0);
    border-radius: 12px;
    padding: 8px;
    min-width: 160px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.theme-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.theme-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
}

.theme-option:hover {
    background: var(--bg-tertiary, #f5f0e3);
}

.theme-option.active {
    background: var(--vermilion-soft, rgba(199, 62, 29, 0.08));
}

.theme-flag {
    font-size: 20px;
}

.theme-name {
    font-weight: 500;
    color: var(--text-primary, #1a1a1a);
}

.theme-native {
    margin-left: auto;
    font-size: 12px;
    color: var(--text-muted, #888);
}

/* Theme-specific body classes */
.theme-japanese {
    --vermilion: #1B4B7A;
    --vermilion-dark: #0F2D4A;
    --imperial-gold: #E8D4C4;
    --imperial-gold-dark: #C9A892;
    --jade-green: #4A6741;
    --bg-primary: #F5F0E8;
    --bg-secondary: #FFFBF5;
}

.theme-korean {
    --vermilion: #C41E3A;
    --vermilion-dark: #8B1428;
    --imperial-gold: #0F4C81;
    --imperial-gold-dark: #0A3357;
    --jade-green: #2E8B57;
    --bg-primary: #FFFAF0;
    --bg-secondary: #FFFDF8;
}

.theme-universal {
    --vermilion: #6B4E71;
    --vermilion-dark: #4A364E;
    --imperial-gold: #D4A373;
    --imperial-gold-dark: #A67C52;
    --jade-green: #2D6A4F;
    --bg-primary: #FDF8F3;
    --bg-secondary: #FFFCF8;
}

@media (max-width: 768px) {
    .theme-switcher {
        top: 15px;
        right: 60px;
    }
    
    .theme-toggle-btn {
        padding: 6px 10px;
    }
    
    .theme-label {
        display: none;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = themeSwitcherCSS;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CulturalThemes.init());
} else {
    CulturalThemes.init();
}

// Expose globally
window.CulturalThemes = CulturalThemes;
