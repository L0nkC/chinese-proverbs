/**
 * History & Bookmarks Manager
 * Track recently viewed and bookmarked proverbs
 */

const HistoryManager = {
    HISTORY_KEY: 'chinese_proverbs_history',
    BOOKMARKS_KEY: 'chinese_proverbs_bookmarks',
    MAX_HISTORY: 50,
    
    history: [],
    bookmarks: new Set(),
    
    /**
     * Initialize history manager
     */
    init() {
        this.loadHistory();
        this.loadBookmarks();
        console.log('[History] Loaded', this.history.length, 'history items');
    },
    
    /**
     * Load history from localStorage
     */
    loadHistory() {
        try {
            const saved = localStorage.getItem(this.HISTORY_KEY);
            if (saved) {
                this.history = JSON.parse(saved);
            }
        } catch (e) {
            console.error('[History] Load error:', e);
        }
    },
    
    /**
     * Save history to localStorage
     */
    saveHistory() {
        try {
            localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.history.slice(0, this.MAX_HISTORY)));
        } catch (e) {
            console.error('[History] Save error:', e);
        }
    },
    
    /**
     * Load bookmarks from localStorage
     */
    loadBookmarks() {
        try {
            const saved = localStorage.getItem(this.BOOKMARKS_KEY);
            if (saved) {
                this.bookmarks = new Set(JSON.parse(saved));
            }
        } catch (e) {
            console.error('[History] Bookmarks load error:', e);
        }
    },
    
    /**
     * Save bookmarks to localStorage
     */
    saveBookmarks() {
        try {
            localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify([...this.bookmarks]));
        } catch (e) {
            console.error('[History] Bookmarks save error:', e);
        }
    },
    
    /**
     * Add proverb to history
     */
    addToHistory(proverb) {
        const id = this.getProverbId(proverb);
        const entry = {
            id: id,
            chinese: proverb.chinese || proverb.c,
            pinyin: proverb.pinyin || proverb.p,
            english: proverb.english || proverb.e,
            timestamp: Date.now()
        };
        
        // Remove existing entry for this proverb
        this.history = this.history.filter(h => h.id !== id);
        
        // Add to front
        this.history.unshift(entry);
        
        // Trim to max
        if (this.history.length > this.MAX_HISTORY) {
            this.history = this.history.slice(0, this.MAX_HISTORY);
        }
        
        this.saveHistory();
    },
    
    /**
     * Get proverb ID
     */
    getProverbId(proverb) {
        return proverb.id || proverb.chinese || proverb.c;
    },
    
    /**
     * Toggle bookmark
     */
    toggleBookmark(proverb) {
        const id = this.getProverbId(proverb);
        
        if (this.bookmarks.has(id)) {
            this.bookmarks.delete(id);
            showToast('🔖 Bookmark removed');
        } else {
            this.bookmarks.add(id);
            showToast('🔖 Bookmarked');
        }
        
        this.saveBookmarks();
        this.updateBookmarkButton(id);
    },
    
    /**
     * Check if bookmarked
     */
    isBookmarked(proverb) {
        return this.bookmarks.has(this.getProverbId(proverb));
    },
    
    /**
     * Update bookmark button in modal
     */
    updateBookmarkButton(id) {
        const btn = document.getElementById('bookmarkBtn');
        if (btn) {
            const isBookmarked = this.bookmarks.has(id);
            btn.innerHTML = isBookmarked ? '🔖' : '🔖';
            btn.classList.toggle('active', isBookmarked);
        }
    },
    
    /**
     * Show history modal
     */
    showHistory() {
        const modal = document.createElement('div');
        modal.className = 'history-modal';
        modal.innerHTML = `
            <div class="history-overlay" onclick="this.parentElement.remove()"></div>
            <div class="history-content">
                <button class="history-close" onclick="this.closest('.history-modal').remove()">×</button>
                <h2>📜 Recently Viewed</h2>
                
                ${this.history.length === 0 ? 
                    '<p class="history-empty">No history yet. Start exploring proverbs!</p>' :
                    `<div class="history-list">
                        ${this.history.map(h => `
                            <div class="history-item" onclick="HistoryManager.openProverb('${h.id}')">
                                <span class="history-chinese">${h.chinese}</span>
                                <span class="history-english">${h.english}</span>
                                <span class="history-time">${this.formatTime(h.timestamp)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="history-clear" onclick="HistoryManager.clearHistory()">Clear History</button>
                    `
                }
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Format timestamp
     */
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    },
    
    /**
     * Open proverb from history
     */
    openProverb(id) {
        const proverb = allProverbs.find(p => this.getProverbId(p) === id);
        if (proverb) {
            openProverbModal(proverb);
            document.querySelector('.history-modal')?.remove();
        }
    },
    
    /**
     * Clear history
     */
    clearHistory() {
        if (confirm('Clear all browsing history?')) {
            this.history = [];
            this.saveHistory();
            showToast('History cleared');
            this.showHistory(); // Refresh modal
        }
    },
    
    /**
     * Show bookmarked proverbs
     */
    showBookmarks() {
        const bookmarkedProverbs = allProverbs.filter(p => 
            this.bookmarks.has(this.getProverbId(p))
        );
        
        const modal = document.createElement('div');
        modal.className = 'bookmarks-modal';
        modal.innerHTML = `
            <div class="bookmarks-overlay" onclick="this.parentElement.remove()"></div>
            <div class="bookmarks-content">
                <button class="bookmarks-close" onclick="this.closest('.bookmarks-modal').remove()">×</button>
                <h2>🔖 Bookmarks</h2>
                
                ${bookmarkedProverbs.length === 0 ? 
                    '<p class="bookmarks-empty">No bookmarks yet. Click 🔖 on any proverb to save it!</p>' :
                    `<div class="bookmarks-list">
                        ${bookmarkedProverbs.map(p => `
                            <div class="bookmark-item">
                                <div onclick="HistoryManager.openProverb('${this.getProverbId(p)}')">
                                    <span class="bookmark-chinese">${p.chinese || p.c}</span>
                                    <span class="bookmark-english">${p.english || p.e}</span>
                                </div>
                                <button class="bookmark-remove" onclick="HistoryManager.removeBookmark('${this.getProverbId(p)}')">×</button>
                            </div>
                        `).join('')}
                    </div>
                    `
                }
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Remove bookmark
     */
    removeBookmark(id) {
        this.bookmarks.delete(id);
        this.saveBookmarks();
        this.showBookmarks(); // Refresh
        showToast('Bookmark removed');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    HistoryManager.init();
});

// Hook into existing modal open to track history
const originalOpenModal = window.openProverbModal;
if (originalOpenModal) {
    window.openProverbModal = function(proverb) {
        HistoryManager.addToHistory(proverb);
        return originalOpenModal(proverb);
    };
}
