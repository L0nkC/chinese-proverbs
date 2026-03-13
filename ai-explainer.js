/**
 * AI-Powered Proverb Explanations
 * Deep cultural and philosophical analysis of proverbs
 */

const AIExplainer = {
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    apiKey: null, // User provides their own API key
    cache: new Map(),
    
    /**
     * Initialize AI explainer
     */
    init() {
        // Load API key from localStorage if available
        this.apiKey = localStorage.getItem('chinese_proverbs_ai_key');
        console.log('[AIExplainer] Initialized');
    },
    
    /**
     * Set API key
     */
    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('chinese_proverbs_ai_key', key);
    },
    
    /**
     * Show API key setup modal
     */
    showSetupModal() {
        const modal = document.createElement('div');
        modal.className = 'ai-setup-modal';
        modal.innerHTML = `
            <div class="ai-setup-overlay" onclick="this.parentElement.remove()"></div>
            <div class="ai-setup-content">
                <button class="ai-setup-close" onclick="this.closest('.ai-setup-modal').remove()">×</button>
                <div class="ai-setup-icon">🤖</div>
                <h2>AI Explanations</h2>
                <p class="ai-setup-desc">Get deep cultural, philosophical, and historical insights into any Chinese proverb.</p>
                
                <div class="ai-setup-features">
                    <div class="ai-feature">
                        <span class="ai-feature-icon">🏛️</span>
                        <span>Historical Context</span>
                    </div>
                    <div class="ai-feature">
                        <span class="ai-feature-icon">🎭</span>
                        <span>Cultural Significance</span>
                    </div>
                    <div class="ai-feature">
                        <span class="ai-feature-icon">💭</span>
                        <span>Philosophical Analysis</span>
                    </div>
                    <div class="ai-feature">
                        <span class="ai-feature-icon">🌐</span>
                        <span>Modern Application</span>
                    </div>
                </div>
                
                <form class="ai-key-form" onsubmit="event.preventDefault(); AIExplainer.saveApiKey(this);">
                    <label>Enter your OpenAI API Key:</label>
                    <input type="password" 
                           name="apiKey" 
                           placeholder="sk-..." 
                           value="${this.apiKey || ''}"
                           pattern="sk-[a-zA-Z0-9]{32,}"
                           title="Valid OpenAI API key starting with sk-">
                    <p class="ai-key-help">
                        Your API key is stored locally. 
                        <a href="https://platform.openai.com/api-keys" target="_blank">Get a key →</a>
                    </p>
                    
                    <button type="submit" class="ai-setup-btn">Save & Continue</button>
                </form>
                
                <div class="ai-setup-note">
                    <p>💡 Each explanation costs approximately $0.002-0.005 USD</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Save API key
     */
    saveApiKey(form) {
        const key = form.apiKey.value.trim();
        if (key) {
            this.setApiKey(key);
            document.querySelector('.ai-setup-modal').remove();
            this.showSuccessToast('API key saved!');
        }
    },
    
    /**
     * Get AI explanation for a proverb
     */
    async getExplanation(proverb) {
        // Check cache first
        const cacheKey = proverb.chinese || proverb.c;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        // Check if API key is set
        if (!this.apiKey) {
            this.showSetupModal();
            return null;
        }
        
        // Show loading
        const loadingToast = this.showLoadingToast('Generating explanation...');
        
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a Chinese philosophy and culture expert. Analyze Chinese proverbs deeply, covering:
1. **Historical Origin**: When/where did this proverb emerge? Any famous historical figures associated?
2. **Literal vs Figurative**: What does it literally say vs what does it mean?
3. **Cultural Context**: Why is this concept important in Chinese culture?
4. **Philosophical School**: Does this align with Confucianism, Taoism, Buddhism, or Legalism?
5. **Modern Application**: How can someone apply this wisdom today?
6. **Related Concepts**: Are there Western equivalents or contrasting philosophies?

Keep responses concise (300-400 words) but insightful. Use markdown formatting.`
                        },
                        {
                            role: 'user',
                            content: `Please analyze this Chinese proverb:

Chinese: ${proverb.chinese || proverb.c}
Pinyin: ${proverb.pinyin || proverb.p}
English: ${proverb.english || proverb.e}
${proverb.meaning ? `Meaning: ${proverb.meaning}` : ''}
${proverb.story ? `Known Story: ${proverb.story}` : ''}`
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 600
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }
            
            const data = await response.json();
            const explanation = data.choices[0].message.content;
            
            // Cache the result
            this.cache.set(cacheKey, explanation);
            
            // Save to localStorage for persistence
            this.saveToCache(cacheKey, explanation);
            
            loadingToast.remove();
            return explanation;
            
        } catch (error) {
            loadingToast.remove();
            console.error('[AIExplainer] Error:', error);
            this.showErrorToast(error.message);
            return null;
        }
    },
    
    /**
     * Show explanation modal
     */
    async showExplanation(proverb) {
        // Show initial modal with loading state
        const modal = document.createElement('div');
        modal.className = 'ai-explanation-modal';
        modal.id = 'aiExplanationModal';
        modal.innerHTML = `
            <div class="ai-explanation-overlay" onclick="this.parentElement.remove()"></div>
            <div class="ai-explanation-content">
                <button class="ai-explanation-close" onclick="this.closest('.ai-explanation-modal').remove()">×</button>
                
                <div class="ai-explanation-header">
                    <div class="ai-icon">🤖</div>
                    <h2>AI Analysis</h2>
                </div>
                
                <div class="ai-proverb-info">
                    <div class="ai-chinese">${proverb.chinese || proverb.c}</div>
                    <div class="ai-pinyin">${proverb.pinyin || proverb.p}</div>
                    <div class="ai-english">${proverb.english || proverb.e}</div>
                </div>
                
                <div class="ai-explanation-body" id="aiExplanationBody">
                    <div class="ai-loading">
                        <div class="ai-loading-spinner"></div>
                        <p>Consulting ancient wisdom...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Get explanation
        const explanation = await this.getExplanation(proverb);
        
        if (explanation) {
            const body = document.getElementById('aiExplanationBody');
            body.innerHTML = `
                <div class="ai-explanation-text">${this.markdownToHtml(explanation)}</div>
                <div class="ai-explanation-actions">
                    <button class="ai-action-btn copy" onclick="AIExplainer.copyExplanation('${cacheKey}')">
                        📋 Copy
                    </button>
                    <button class="ai-action-btn regenerate" onclick="AIExplainer.regenerate('${cacheKey}')">
                        🔄 Regenerate
                    </button>
                </div>
            `;
        }
    },
    
    /**
     * Convert markdown to HTML
     */
    markdownToHtml(markdown) {
        return markdown
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/# (.*)/g, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/- (.*)/g, '<li>$1</li>')
            .replace(/(\n\n)/g, '</br>')
            .replace(/(\d+)\. (.*)/g, '<li><strong>$1.</strong> $2</li>');
    },
    
    /**
     * Copy explanation
     */
    copyExplanation(cacheKey) {
        const explanation = this.cache.get(cacheKey);
        if (explanation) {
            navigator.clipboard.writeText(explanation).then(() => {
                this.showSuccessToast('Copied to clipboard!');
            });
        }
    },
    
    /**
     * Regenerate explanation
     */
    async regenerate(cacheKey) {
        this.cache.delete(cacheKey);
        const proverb = allProverbs.find(p => (p.chinese || p.c) === cacheKey);
        if (proverb) {
            document.getElementById('aiExplanationBody').innerHTML = `
                <div class="ai-loading">
                    <div class="ai-loading-spinner"></div>
                    <p>Consulting ancient wisdom...</p>
                </div>
            `;
            await this.showExplanation(proverb);
        }
    },
    
    /**
     * Save to cache
     */
    saveToCache(key, value) {
        try {
            const cache = JSON.parse(localStorage.getItem('chinese_proverbs_ai_cache') || '{}');
            cache[key] = {
                explanation: value,
                timestamp: Date.now()
            };
            // Keep only last 50 explanations
            const keys = Object.keys(cache);
            if (keys.length > 50) {
                delete cache[keys[0]];
            }
            localStorage.setItem('chinese_proverbs_ai_cache', JSON.stringify(cache));
        } catch (e) {
            console.error('[AIExplainer] Cache save error:', e);
        }
    },
    
    /**
     * Load from cache
     */
    loadCache() {
        try {
            const cache = JSON.parse(localStorage.getItem('chinese_proverbs_ai_cache') || '{}');
            Object.entries(cache).forEach(([key, value]) => {
                // Cache expires after 30 days
                if (Date.now() - value.timestamp < 30 * 24 * 60 * 60 * 1000) {
                    this.cache.set(key, value.explanation);
                }
            });
        } catch (e) {
            console.error('[AIExplainer] Cache load error:', e);
        }
    },
    
    /**
     * Show loading toast
     */
    showLoadingToast(message) {
        const toast = document.createElement('div');
        toast.className = 'ai-toast loading';
        toast.innerHTML = `
            <div class="ai-toast-spinner"></div>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        return toast;
    },
    
    /**
     * Show success toast
     */
    showSuccessToast(message) {
        const toast = document.createElement('div');
        toast.className = 'ai-toast success';
        toast.innerHTML = `✅ ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },
    
    /**
     * Show error toast
     */
    showErrorToast(message) {
        const toast = document.createElement('div');
        toast.className = 'ai-toast error';
        toast.innerHTML = `❌ ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    },
    
    /**
     * Quick explain (for card buttons)
     */
    async quickExplain(proverbId) {
        const proverb = allProverbs.find(p => p.id === proverbId || p.chinese === proverbId || p.c === proverbId);
        if (proverb) {
            await this.showExplanation(proverb);
        }
    }
};

// Initialize and load cache
document.addEventListener('DOMContentLoaded', () => {
    AIExplainer.init();
    AIExplainer.loadCache();
});
