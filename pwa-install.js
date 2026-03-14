/**
 * PWA Install Manager
 * Handle "Add to Home Screen" prompt
 */

const PWAInstallManager = {
    deferredPrompt: null,
    isInstalled: false,
    
    /**
     * Initialize PWA install manager
     */
    init() {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('[PWA] Already installed');
            return;
        }
        
        // Check if user dismissed banner
        const dismissed = localStorage.getItem('chinese_proverbs_pwa_dismissed');
        const dismissDate = dismissed ? parseInt(dismissed, 10) : 0;
        const daysSince = (Date.now() - dismissDate) / (1000 * 60 * 60 * 24);
        
        // Show again after 7 days
        if (dismissed && daysSince < 7) {
            console.log('[PWA] Banner dismissed, showing again in', Math.ceil(7 - daysSince), 'days');
            return;
        }
        
        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallBanner();
        });
        
        // Listen for successful install
        window.addEventListener('appinstalled', () => {
            this.isInstalled = true;
            this.hideInstallBanner();
            console.log('[PWA] App installed');
            showToast('📱 App installed!');
        });
    },
    
    /**
     * Show install banner
     */
    showInstallBanner() {
        // Don't show if already showing
        if (document.getElementById('pwaInstallBanner')) return;
        
        const banner = document.createElement('div');
        banner.id = 'pwaInstallBanner';
        banner.className = 'pwa-install-banner';
        banner.innerHTML = `
            <div class="pwa-banner-content">
                <div class="pwa-icon">🏮</div>
                <div class="pwa-text">
                    <strong>Add Chinese Proverbs to Home Screen</strong>
                    <span>Access proverbs offline, anytime</span>
                </div>
                <div class="pwa-actions">
                    <button class="pwa-btn install" onclick="PWAInstallManager.install()">Install</button>
                    <button class="pwa-btn dismiss" onclick="PWAInstallManager.dismiss()">Not now</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Animate in
        requestAnimationFrame(() => {
            banner.classList.add('show');
        });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (document.getElementById('pwaInstallBanner')) {
                this.hideInstallBanner();
            }
        }, 10000);
    },
    
    /**
     * Hide install banner
     */
    hideInstallBanner() {
        const banner = document.getElementById('pwaInstallBanner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        }
    },
    
    /**
     * Trigger install
     */
    async install() {
        if (!this.deferredPrompt) {
            showToast('Installation not available');
            return;
        }
        
        this.deferredPrompt.prompt();
        
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('[PWA] User accepted install');
        } else {
            console.log('[PWA] User dismissed install');
            this.dismiss();
        }
        
        this.deferredPrompt = null;
    },
    
    /**
     * Dismiss banner
     */
    dismiss() {
        localStorage.setItem('chinese_proverbs_pwa_dismissed', Date.now().toString());
        this.hideInstallBanner();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    PWAInstallManager.init();
});
