/**
 * Recently Viewed Proverbs - Track and display proverbs the user has viewed
 * Stores up to 20 recently viewed proverbs in localStorage
 */

const RecentProverbs = {
    STORAGE_KEY: 'chinese_proverbs_recently_viewed',
    MAX_ITEMS: 20,

    /**
     * Add a proverb to recently viewed list
     * @param {Object} proverb - The proverb object to add
     */
    add(proverb) {
        if (!proverb || !proverb.cn) return;

        try {
            const recent = this.getAll();
            
            // Remove if already exists (to move to front)
            const filtered = recent.filter(p => p.cn !== proverb.cn);
            
            // Add to front with timestamp
            filtered.unshift({
                cn: proverb.cn,
                py: proverb.py,
                en: proverb.en,
                cats: proverb.cats || [],
                viewedAt: new Date().toISOString()
            });
            
            // Keep only MAX_ITEMS
            const trimmed = filtered.slice(0, this.MAX_ITEMS);
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmed));
        } catch (e) {
            console.warn('Failed to save recent proverb:', e);
        }
    },

    /**
     * Get all recently viewed proverbs
     * @returns {Array} Array of proverb objects
     */
    getAll() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.warn('Failed to load recent proverbs:', e);
            return [];
        }
    },

    /**
     * Clear all recently viewed proverbs
     */
    clear() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('Failed to clear recent proverbs:', e);
        }
    },

    /**
     * Get the count of recently viewed proverbs
     * @returns {number}
     */
    getCount() {
        return this.getAll().length;
    },

    /**
     * Format the viewed time for display
     * @param {string} isoDate - ISO date string
     * @returns {string} Human readable time
     */
    formatTime(isoDate) {
        const date = new Date(isoDate);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    },

    /**
     * Render recently viewed section in the UI
     */
    render() {
        const container = document.getElementById('recentProverbsSection');
        if (!container) return;

        const recent = this.getAll();
        
        if (recent.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        
        const listEl = document.getElementById('recentProverbsList');
        if (!listEl) return;

        listEl.innerHTML = recent.map(p => `
            <div class="recent-proverb-item" onclick="openModalByProverb('${escapeHtml(p.cn)}')">
                <div class="recent-proverb-chinese">${escapeHtml(p.cn)}</div>
                <div class="recent-proverb-pinyin">${escapeHtml(p.py)}</div>
                <div class="recent-proverb-time">${this.formatTime(p.viewedAt)}</div>
            </div>
        `).join('');
    },

    /**
     * Show the recently viewed modal
     */
    showModal() {
        const recent = this.getAll();
        
        if (recent.length === 0) {
            showToast('No recently viewed proverbs');
            return;
        }

        const content = `
            <div class="recent-modal-content">
                <h2>📜 Recently Viewed</h2>
                <p class="recent-subtitle">Your last ${recent.length} viewed proverb${recent.length > 1 ? 's' : ''}</p>
                <div class="recent-list">
                    ${recent.map((p, i) => `
                        <div class="recent-item" onclick="RecentProverbs.openProverb(${i}); return false;">
                            <div class="recent-number">${i + 1}</div>
                            <div class="recent-info">
                                <div class="recent-cn">${escapeHtml(p.cn)}</div>
                                <div class="recent-py">${escapeHtml(p.py)}</div>
                                <div class="recent-en">${escapeHtml(p.en)}</div>
                            </div>
                            <div class="recent-meta">
                                <span class="recent-time">${this.formatTime(p.viewedAt)}</span>
                                <span class="recent-arrow">→</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="recent-actions">
                    <button class="action-btn secondary" onclick="RecentProverbs.clear(); RecentProverbs.closeModal(); showToast('History cleared');">
                        🗑️ Clear History
                    </button>
                    <button class="action-btn primary" onclick="RecentProverbs.closeModal()">
                        Close
                    </button>
                </div>
            </div>
        `;

        this.createModal(content);
    },

    /**
     * Create and show the modal
     * @param {string} content - HTML content for the modal
     */
    createModal(content) {
        // Remove existing modal if any
        this.closeModal();

        const modal = document.createElement('div');
        modal.id = 'recentModal';
        modal.className = 'modal';
        modal.innerHTML = `<div class="modal-content recent-modal">${content}</div>`;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close on escape
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') this.closeModal();
        };
        document.addEventListener('keydown', this.escapeHandler);
    },

    /**
     * Close the recently viewed modal
     */
    closeModal() {
        const modal = document.getElementById('recentModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }
    },

    /**
     * Open a proverb from the recent list
     * @param {number} index - Index in the recent list
     */
    openProverb(index) {
        const recent = this.getAll();
        if (recent[index]) {
            this.closeModal();
            const proverb = recent[index];
            // Find full proverb data
            const fullProverb = allProverbs.find(p => p.cn === proverb.cn);
            if (fullProverb) {
                openModal(fullProverb);
            } else {
                // Use stored data if full proverb not found
                openModal(proverb);
            }
        }
    },

    /**
     * Initialize the recently viewed feature
     */
    init() {
        // Add click tracking to proverb cards
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.proverb-card');
            if (card) {
                const cn = card.dataset.cn;
                if (cn) {
                    const proverb = allProverbs.find(p => p.cn === cn);
                    if (proverb) {
                        this.add(proverb);
                    }
                }
            }
        });

        console.log('[RecentProverbs] Initialized');
    }
};

/**
 * Helper function to open modal by Chinese text
 * @param {string} cn - Chinese text of the proverb
 */
function openModalByProverb(cn) {
    const proverb = allProverbs.find(p => p.cn === cn);
    if (proverb) {
        openModal(proverb);
    }
}
