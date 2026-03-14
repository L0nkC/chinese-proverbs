/**
 * Accessibility Manager
 * Font size adjustment and other accessibility features
 */

const AccessibilityManager = {
    STORAGE_KEY: 'chinese_proverbs_font_size',
    currentSize: 100, // percentage
    
    /**
     * Initialize accessibility features
     */
    init() {
        // Load saved font size
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.currentSize = parseInt(saved, 10);
            this.applyFontSize();
        }
        
        console.log('[Accessibility] Initialized, font size:', this.currentSize + '%');
    },
    
    /**
     * Increase font size
     */
    increaseFontSize() {
        if (this.currentSize < 150) {
            this.currentSize += 10;
            this.applyFontSize();
            this.save();
            showToast(`Font size: ${this.currentSize}%`);
        }
    },
    
    /**
     * Decrease font size
     */
    decreaseFontSize() {
        if (this.currentSize > 80) {
            this.currentSize -= 10;
            this.applyFontSize();
            this.save();
            showToast(`Font size: ${this.currentSize}%`);
        }
    },
    
    /**
     * Reset font size
     */
    resetFontSize() {
        this.currentSize = 100;
        this.applyFontSize();
        this.save();
        showToast('Font size reset');
    },
    
    /**
     * Apply font size to document
     */
    applyFontSize() {
        document.documentElement.style.fontSize = `${this.currentSize}%`;
    },
    
    /**
     * Save preference
     */
    save() {
        localStorage.setItem(this.STORAGE_KEY, this.currentSize.toString());
    },
    
    /**
     * Show accessibility panel
     */
    showPanel() {
        const modal = document.createElement('div');
        modal.className = 'accessibility-modal';
        modal.innerHTML = `
            <div class="accessibility-overlay" onclick="this.parentElement.remove()"></div>
            <div class="accessibility-content">
                <button class="accessibility-close" onclick="this.closest('.accessibility-modal').remove()">×</button>
                <h2>♿ Accessibility</h2>
                
                <div class="accessibility-section">
                    <h3>Font Size</h3>
                    <div class="font-size-controls">
                        <button class="font-btn" onclick="AccessibilityManager.decreaseFontSize()">A-</button>
                        <span class="font-size-display">${this.currentSize}%</span>
                        <button class="font-btn" onclick="AccessibilityManager.increaseFontSize()">A+</button>
                        <button class="font-btn reset" onclick="AccessibilityManager.resetFontSize()">Reset</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h3>Keyboard Shortcuts</h3>
                    <div class="shortcuts-list">
                        <div class="shortcut-item"><kbd>Ctrl/Cmd + K</kbd> <span>Focus search</span></div>
                        <div class="shortcut-item"><kbd>Ctrl/Cmd + R</kbd> <span>Random proverb</span></div>
                        <div class="shortcut-item"><kbd>Escape</kbd> <span>Close modal</span></div>
                        <div class="shortcut-item"><kbd>+</kbd> <span>Increase font</span></div>
                        <div class="shortcut-item"><kbd>-</kbd> <span>Decrease font</span></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    AccessibilityManager.init();
});

// Keyboard shortcuts for font size
document.addEventListener('keydown', (e) => {
    if (e.key === '+' && e.ctrlKey) {
        e.preventDefault();
        AccessibilityManager.increaseFontSize();
    } else if (e.key === '-' && e.ctrlKey) {
        e.preventDefault();
        AccessibilityManager.decreaseFontSize();
    } else if (e.key === '0' && e.ctrlKey) {
        e.preventDefault();
        AccessibilityManager.resetFontSize();
    }
});
