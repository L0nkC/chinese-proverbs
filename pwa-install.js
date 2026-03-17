/**
 * PWA Install Prompt
 * Handles the beforeinstallprompt event and shows a custom install UI
 */

const PWAInstallManager = {
    deferredPrompt: null,
    isInstalled: false,

    /**
     * Initialize the install manager
     */
    init() {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('[PWA] Already installed');
            return;
        }

        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Store the event for later use
            this.deferredPrompt = e;
            console.log('[PWA] Install prompt available');
            
            // Show the install button
            this.showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            this.isInstalled = true;
            this.deferredPrompt = null;
            this.hideInstallButton();
            console.log('[PWA] App was installed');
            showToast('✅ Chinese Proverbs installed!');
        });

        // Check if user dismissed the prompt before
        const dismissed = localStorage.getItem('pwaInstallDismissed');
        const dismissedTime = parseInt(dismissed || '0');
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        
        if (dismissedTime && (Date.now() - dismissedTime) < oneWeek) {
            console.log('[PWA] Prompt dismissed recently');
        }
    },

    /**
     * Show the install button in the header
     */
    showInstallButton() {
        const container = document.querySelector('.header-actions');
        if (!container || document.getElementById('pwaInstallBtn')) return;

        const btn = document.createElement('button');
        btn.id = 'pwaInstallBtn';
        btn.className = 'action-btn install-btn';
        btn.title = 'Install App';
        btn.innerHTML = `
            <span class="action-btn-icon">📲</span>
            <span class="action-btn-text">Install</span>
        `;
        btn.onclick = () => this.showInstallPrompt();

        // Insert after the first button
        const firstBtn = container.querySelector('.action-btn');
        if (firstBtn) {
            firstBtn.parentNode.insertBefore(btn, firstBtn.nextSibling);
        } else {
            container.appendChild(btn);
        }
    },

    /**
     * Hide the install button
     */
    hideInstallButton() {
        const btn = document.getElementById('pwaInstallBtn');
        if (btn) btn.remove();
    },

    /**
     * Show the custom install prompt modal
     */
    showInstallPrompt() {
        if (!this.deferredPrompt) {
            showToast('Installation not available');
            return;
        }

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'pwaInstallModal';
        modal.className = 'modal pwa-install-modal';
        modal.innerHTML = `
            <div class="modal-content pwa-install-content">
                <button class="close-btn" onclick="PWAInstallManager.dismissInstall()">×</button>
                <div class="pwa-install-header">
                    <div class="pwa-install-icon">🏮</div>
                    <h2>Install Chinese Proverbs</h2>
                    <p>Add to your home screen for quick access</p>
                </div>
                <div class="pwa-install-features">
                    <div class="pwa-feature">
                        <span class="pwa-feature-icon">⚡</span>
                        <span class="pwa-feature-text">Fast access from home screen</span>
                    </div>
                    <div class="pwa-feature">
                        <span class="pwa-feature-icon">📴</span>
                        <span class="pwa-feature-text">Works offline</span>
                    </div>
                    <div class="pwa-feature">
                        <span class="pwa-feature-icon">🎯</span>
                        <span class="pwa-feature-text">Full-screen experience</span>
                    </div>
                </div>
                <div class="pwa-install-actions">
                    <button class="action-btn primary" onclick="PWAInstallManager.installApp()">
                        📲 Install Now
                    </button>
                    <button class="action-btn secondary" onclick="PWAInstallManager.dismissInstall()">
                        Maybe Later
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.dismissInstall();
        });

        // Close on escape
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') this.dismissInstall();
        };
        document.addEventListener('keydown', this.escapeHandler);

        // Show modal
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    },

    /**
     * Trigger the actual install prompt
     */
    async installApp() {
        if (!this.deferredPrompt) return;

        // Show the browser install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`[PWA] User response: ${outcome}`);

        // Clear the deferred prompt
        this.deferredPrompt = null;

        // Close the modal
        this.dismissInstall();

        if (outcome === 'accepted') {
            showToast('✅ Installation started!');
        }
    },

    /**
     * Dismiss the install prompt
     */
    dismissInstall() {
        const modal = document.getElementById('pwaInstallModal');
        if (modal) {
            modal.classList.add('closing');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }

        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }

        // Remember dismissal for one week
        localStorage.setItem('pwaInstallDismissed', Date.now().toString());
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    PWAInstallManager.init();
});
