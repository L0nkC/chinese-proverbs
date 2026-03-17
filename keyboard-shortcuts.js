/**
 * Keyboard Shortcuts Help Modal
 * Shows a comprehensive list of keyboard shortcuts
 */

const KeyboardShortcuts = {
    isOpen: false,
    
    /**
     * Initialize keyboard shortcuts
     */
    init() {
        this.setupEventListeners();
        this.setupKeyboardHandler();
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Footer link click
        const footerLink = document.querySelector('.footer-link[onclick*="showKeyboardShortcuts"]');
        if (footerLink) {
            footerLink.onclick = (e) => {
                e.preventDefault();
                this.showModal();
            };
        }
    },
    
    /**
     * Setup keyboard handler for ? key
     */
    setupKeyboardHandler() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger if typing in input
            if (document.activeElement?.tagName === 'INPUT' || 
                document.activeElement?.tagName === 'TEXTAREA') {
                return;
            }
            
            // ? key to show shortcuts (shift + /)
            if (e.shiftKey && e.key === '?') {
                e.preventDefault();
                this.showModal();
            }
            
            // Escape to close
            if (e.key === 'Escape' && this.isOpen) {
                e.preventDefault();
                this.closeModal();
            }
        });
    },
    
    /**
     * Show the keyboard shortcuts modal
     */
    showModal() {
        // Remove existing modal if any
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.id = 'shortcutsModal';
        modal.className = 'modal shortcuts-modal';
        modal.innerHTML = `
            <div class="modal-content shortcuts-content">
                <button class="close-btn" onclick="KeyboardShortcuts.closeModal()">&times;</button>
                
                <div class="shortcuts-header">
                    <div class="shortcuts-icon">⌨️</div>
                    <h2>Keyboard Shortcuts</h2>
                    <p>Master Chinese Proverbs with your keyboard</p>
                </div>
                
                <div class="shortcuts-sections">
                    <div class="shortcuts-section">
                        <h3>Navigation</h3>
                        <div class="shortcuts-list">
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">↑</kbd>
                                <kbd class="shortcut-key">↓</kbd>
                                <kbd class="shortcut-key">←</kbd>
                                <kbd class="shortcut-key">→</kbd>
                                <span class="shortcut-desc">Navigate between proverbs</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">Enter</kbd>
                                <span class="shortcut-desc">Open selected proverb</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">Esc</kbd>
                                <span class="shortcut-desc">Close modal / Cancel search</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="shortcuts-section">
                        <h3>Quick Actions</h3>
                        <div class="shortcuts-list">
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">/</kbd>
                                <span class="shortcut-desc">Focus search box</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">Ctrl</kbd>
                                <kbd class="shortcut-key">K</kbd>
                                <span class="shortcut-desc">Focus search box</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">Ctrl</kbd>
                                <kbd class="shortcut-key">R</kbd>
                                <span class="shortcut-desc">Show random proverb</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">?</kbd>
                                <span class="shortcut-desc">Show this help</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="shortcuts-section">
                        <h3>Categories</h3>
                        <div class="shortcuts-list">
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">1</kbd>
                                <span class="shortcut-desc">All Proverbs</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">2</kbd>
                                <span class="shortcut-desc">Wisdom</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">3</kbd>
                                <span class="shortcut-desc">Learning</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">4</kbd>
                                <span class="shortcut-desc">Perseverance</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">5</kbd>
                                <span class="shortcut-desc">Friendship</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">6</kbd>
                                <span class="shortcut-desc">Life</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">7</kbd>
                                <span class="shortcut-desc">Love</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">8</kbd>
                                <span class="shortcut-desc">Business</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">9</kbd>
                                <span class="shortcut-desc">Family</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="shortcuts-section">
                        <h3>Inside Modal</h3>
                        <div class="shortcuts-list">
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">Space</kbd>
                                <span class="shortcut-desc">Play/Pause audio</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">C</kbd>
                                <span class="shortcut-desc">Copy to clipboard</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">F</kbd>
                                <span class="shortcut-desc">Toggle favorite</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">S</kbd>
                                <span class="shortcut-desc">Share / Generate image</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">N</kbd>
                                <span class="shortcut-desc">New random proverb</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="shortcuts-footer">
                    <button class="action-btn primary" onclick="KeyboardShortcuts.closeModal()">
                        Got it!
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
        
        // Show with animation
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    },
    
    /**
     * Close the shortcuts modal
     */
    closeModal() {
        const modal = document.getElementById('shortcutsModal');
        if (modal) {
            modal.classList.add('closing');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
        this.isOpen = false;
    }
};

// Expose to global scope
window.KeyboardShortcuts = KeyboardShortcuts;

// Override the existing showKeyboardShortcuts function
window.showKeyboardShortcuts = function() {
    KeyboardShortcuts.showModal();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    KeyboardShortcuts.init();
});
