/**
 * Dark Mode Manager
 * Toggle between light and dark themes
 */

const DarkModeManager = {
    STORAGE_KEY: 'chinese_proverbs_dark_mode',
    isDark: false,
    
    /**
     * Initialize dark mode
     */
    init() {
        // Check saved preference
        const saved = localStorage.getItem(this.STORAGE_KEY);
        
        // Check system preference if no saved preference
        if (saved === null) {
            this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            this.isDark = saved === 'true';
        }
        
        // Apply initial state
        this.apply();
        
        // Listen for system changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem(this.STORAGE_KEY) === null) {
                this.isDark = e.matches;
                this.apply();
            }
        });
        
        console.log('[DarkMode] Initialized:', this.isDark ? 'dark' : 'light');
    },
    
    /**
     * Toggle dark mode
     */
    toggle() {
        this.isDark = !this.isDark;
        this.apply();
        this.save();
        
        // Update button
        this.updateButton();
        
        // Show toast
        if (typeof showToast === 'function') {
            showToast(this.isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
        }
    },
    
    /**
     * Apply dark mode to document
     */
    apply() {
        if (this.isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.classList.remove('dark-mode');
        }
        
        // Update button if exists
        this.updateButton();
    },
    
    /**
     * Save preference
     */
    save() {
        localStorage.setItem(this.STORAGE_KEY, this.isDark.toString());
    },
    
    /**
     * Update toggle button appearance
     */
    updateButton() {
        const btn = document.getElementById('darkModeToggle');
        if (btn) {
            btn.innerHTML = this.isDark ? '☀️' : '🌙';
            btn.title = this.isDark ? 'Switch to light mode' : 'Switch to dark mode';
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    DarkModeManager.init();
});
