/**
 * Daily Email Reminder Subscription
 * Frontend UI for email subscription (backend not needed, just UI)
 */

const EmailSubscription = {
    STORAGE_KEY: 'chinese_proverbs_email_subscribed',
    
    /**
     * Initialize email subscription
     */
    init() {
        this.renderSection();
        this.setupEventListeners();
        this.checkExistingSubscription();
    },
    
    /**
     * Render the email subscription section
     */
    renderSection() {
        const footer = document.querySelector('.main-footer');
        if (!footer) return;
        
        // Check if already rendered
        if (document.querySelector('.email-subscription-section')) return;
        
        const section = document.createElement('section');
        section.className = 'email-subscription-section';
        section.innerHTML = `
            <div class="email-subscription-header">
                <h3>每日一句邮件 📧</h3>
                <p>Daily Proverb Email</p>
            </div>
            
            <form class="email-form" id="emailForm">
                <div class="email-input-group">
                    <input 
                        type="email" 
                        class="email-input" 
                        id="emailInput" 
                        placeholder="your@email.com" 
                        required
                        autocomplete="email"
                    >
                    <button type="submit" class="email-submit-btn" id="emailSubmitBtn">
                        <span>Subscribe</span>
                    </button>
                </div>
                
                <div class="email-message" id="emailMessage"></div>
                
                <div class="email-features">
                    <div class="email-feature">
                        <span class="email-feature-icon">🌅</span>
                        <span>Daily at 8 AM</span>
                    </div>
                    <div class="email-feature">
                        <span class="email-feature-icon">🎯</span>
                        <span>One Proverb</span>
                    </div>
                    <div class="email-feature">
                        <span class="email-feature-icon">🚫</span>
                        <span>No Spam</span>
                    </div>
                </div>
                
                <p class="email-privacy-note">
                    We respect your privacy. Unsubscribe anytime. 
                    <a href="#" onclick="EmailSubscription.showPrivacyNotice(); return false;">Privacy Policy</a>
                </p>
            </form>
            
            <div class="subscription-success" id="subscriptionSuccess" style="display: none;">
                <div style="font-size: 4rem; margin-bottom: var(--space-4);">✅</div>
                <h4>Subscribed!</h4>
                <p>You'll receive your first proverb tomorrow morning.</p>
                <button class="action-btn secondary" onclick="EmailSubscription.unsubscribe()">
                    Unsubscribe
                </button>
            </div>
        `;
        
        footer.parentNode.insertBefore(section, footer);
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const form = document.getElementById('emailForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Save email in localStorage as user types (for convenience)
        const input = document.getElementById('emailInput');
        if (input) {
            input.addEventListener('input', (e) => {
                localStorage.setItem('chinese_proverbs_email_draft', e.target.value);
            });
            
            // Restore draft email
            const draft = localStorage.getItem('chinese_proverbs_email_draft');
            if (draft) {
                input.value = draft;
            }
        }
    },
    
    /**
     * Check if user already subscribed
     */
    checkExistingSubscription() {
        const subscribed = localStorage.getItem(this.STORAGE_KEY);
        if (subscribed) {
            this.showSuccessState();
        }
    },
    
    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        const input = document.getElementById('emailInput');
        const btn = document.getElementById('emailSubmitBtn');
        const email = input.value.trim();
        
        if (!email || !this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Disable button and show loading
        btn.disabled = true;
        btn.innerHTML = '<span>Subscribing...</span>';
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store subscription locally (in a real app, this would call a backend)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
            email: email,
            subscribedAt: new Date().toISOString(),
            preferences: {
                time: '08:00',
                language: 'both' // chinese, english, or both
            }
        }));
        
        // Show success
        this.showSuccessState();
        showToast('🎉 Successfully subscribed to daily proverbs!');
        
        // Track event (placeholder for analytics)
        console.log('[EmailSubscription] New subscription:', email);
    },
    
    /**
     * Validate email format
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    /**
     * Show success state
     */
    showSuccessState() {
        const form = document.getElementById('emailForm');
        const success = document.getElementById('subscriptionSuccess');
        
        if (form) form.style.display = 'none';
        if (success) success.style.display = 'block';
    },
    
    /**
     * Show message (success or error)
     */
    showMessage(message, type) {
        const msgEl = document.getElementById('emailMessage');
        if (msgEl) {
            msgEl.textContent = message;
            msgEl.className = `email-message ${type}`;
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                msgEl.className = 'email-message';
            }, 5000);
        }
    },
    
    /**
     * Unsubscribe
     */
    unsubscribe() {
        if (confirm('Are you sure you want to unsubscribe from daily proverbs?')) {
            localStorage.removeItem(this.STORAGE_KEY);
            
            const form = document.getElementById('emailForm');
            const success = document.getElementById('subscriptionSuccess');
            const btn = document.getElementById('emailSubmitBtn');
            
            if (form) {
                form.style.display = 'block';
                form.reset();
            }
            if (success) success.style.display = 'none';
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span>Subscribe</span>';
            }
            
            showToast('Unsubscribed from daily proverbs');
        }
    },
    
    /**
     * Show privacy notice
     */
    showPrivacyNotice() {
        const content = `
            <div class="about-section">
                <h3>📧 Email Privacy Policy</h3>
                <p><strong>What we collect:</strong> Only your email address and subscription preferences.</p>
                <p><strong>How we use it:</strong> To send you one Chinese proverb per day at your chosen time.</p>
                <p><strong>Data storage:</strong> Your email is stored securely and never shared with third parties.</p>
                <p><strong>Unsubscribing:</strong> You can unsubscribe at any time using the button in your daily email.</p>
            </div>
        `;
        
        this.showModal('Privacy Policy', content);
    },
    
    /**
     * Show preferences modal
     */
    showPreferences() {
        const subscription = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        const currentTime = subscription.preferences?.time || '08:00';
        const currentLang = subscription.preferences?.language || 'both';
        
        const content = `
            <div class="about-section">
                <h3>⚙️ Subscription Preferences</h3>
                <div style="margin: var(--space-4) 0;">
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Delivery Time:</label>
                    <select id="prefTime" style="padding: var(--space-2) var(--space-3); border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                        <option value="06:00" ${currentTime === '06:00' ? 'selected' : ''}>6:00 AM</option>
                        <option value="07:00" ${currentTime === '07:00' ? 'selected' : ''}>7:00 AM</option>
                        <option value="08:00" ${currentTime === '08:00' ? 'selected' : ''}>8:00 AM</option>
                        <option value="09:00" ${currentTime === '09:00' ? 'selected' : ''}>9:00 AM>
                        <option value="18:00" ${currentTime === '18:00' ? 'selected' : ''}>6:00 PM</option>
                    </select>
                </div>
                <div style="margin: var(--space-4) 0;">
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Language:</label>
                    <select id="prefLang" style="padding: var(--space-2) var(--space-3); border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                        <option value="both" ${currentLang === 'both' ? 'selected' : ''}>Chinese + English</option>
                        <option value="chinese" ${currentLang === 'chinese' ? 'selected' : ''}>Chinese only</option>
                        <option value="english" ${currentLang === 'english' ? 'selected' : ''}>English only</option>
                    </select>
                </div>
                <button class="action-btn primary" onclick="EmailSubscription.savePreferences()">
                    Save Preferences
                </button>
            </div>
        `;
        
        this.showModal('Preferences', content);
    },
    
    /**
     * Save preferences
     */
    savePreferences() {
        const timeSelect = document.getElementById('prefTime');
        const langSelect = document.getElementById('prefLang');
        
        const subscription = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        subscription.preferences = {
            time: timeSelect.value,
            language: langSelect.value
        };
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscription));
        showToast('Preferences saved!');
        this.closeModal();
    },
    
    /**
     * Show a generic modal
     */
    showModal(title, content) {
        // Remove existing modal
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.id = 'emailSubscriptionModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content about-content">
                <button class="close-btn" onclick="EmailSubscription.closeModal()">&times;</button>
                <h2>${title}</h2>
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
        
        // Close on escape
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') this.closeModal();
        };
        document.addEventListener('keydown', this.escapeHandler);
    },
    
    /**
     * Close the modal
     */
    closeModal() {
        const modal = document.getElementById('emailSubscriptionModal');
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
    }
};

// Expose to global scope
window.EmailSubscription = EmailSubscription;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    EmailSubscription.init();
});
