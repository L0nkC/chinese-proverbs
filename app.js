/**
 * Chinese Proverbs - Application Logic
 * Handles search, filtering, random selection, and UI interactions
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Global variables
let currentProverbs = [...proverbs];
let currentFilter = 'all';

/**
 * Initialize the application
 */
function initializeApp() {
    renderProverbs(currentProverbs);
    setupEventListeners();
    setupSearch();
    setupFilters();
    setupModal();
    showDailyProverb();
}

/**
 * Render proverbs to the grid
 */
function renderProverbs(proverbsToRender) {
    const container = document.getElementById('proverbsContainer');
    
    if (proverbsToRender.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 3rem; color: var(--ink-light); grid-column: 1 / -1;">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">未找到相关谚语</p>
                <p>No proverbs found matching your search.</p>
            </div>
        `;
        updateStats(0);
        return;
    }
    
    container.innerHTML = proverbsToRender.map((proverb, index) => `
        <article class="proverb-card" data-index="${index}">
            <span class="proverb-number">#${index + 1}</span>
            <p class="proverb-chinese">${proverb.cn}</p>
            <p class="proverb-english">${proverb.en}</p>
            <div class="proverb-actions-card">
                <button class="card-btn" onclick="copyProverb('${proverb.cn}', '${proverb.en.replace(/'/g, "\\'")}')">Copy</button>
                <button class="card-btn" onclick="showProverbInModal('${proverb.cn}', '${proverb.en.replace(/'/g, "\\'")}')">View</button>
            </div>
        </article>
    `).join('');
    
    updateStats(proverbsToRender.length);
}

/**
 * Update statistics display
 */
function updateStats(count) {
    const statsElement = document.getElementById('proverbCount');
    const total = proverbs.length;
    
    if (count === total) {
        statsElement.textContent = `Showing all ${total} proverbs`;
    } else {
        statsElement.textContent = `Showing ${count} of ${total} proverbs`;
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Random button
    document.getElementById('randomBtn').addEventListener('click', showRandomProverb);
    
    // Copy button (copies random proverb)
    document.getElementById('copyBtn').addEventListener('click', () => {
        const random = proverbs[Math.floor(Math.random() * proverbs.length)];
        copyProverb(random.cn, random.en);
    });
    
    // New proverb button in modal
    document.getElementById('newProverbBtn').addEventListener('click', () => {
        showRandomProverb();
    });
    
    // Share button
    document.getElementById('shareBtn').addEventListener('click', shareProverb);
}

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
}

/**
 * Perform search
 */
function performSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) {
        applyFilter(currentFilter);
        return;
    }
    
    const filtered = proverbs.filter(p => 
        p.cn.includes(query) ||
        p.en.toLowerCase().includes(lowerQuery)
    );
    
    renderProverbs(filtered);
}

/**
 * Setup filter buttons
 */
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply filter
            const filter = btn.dataset.filter;
            currentFilter = filter;
            applyFilter(filter);
        });
    });
}

/**
 * Apply category filter
 */
function applyFilter(filter) {
    // Clear search
    document.getElementById('searchInput').value = '';
    
    if (filter === 'all') {
        currentProverbs = [...proverbs];
    } else {
        // Filter based on keywords in English translation
        const keywords = getFilterKeywords(filter);
        currentProverbs = proverbs.filter(p => {
            const en = p.en.toLowerCase();
            return keywords.some(kw => en.includes(kw));
        });
    }
    
    renderProverbs(currentProverbs);
}

/**
 * Get keywords for each filter category
 */
function getFilterKeywords(filter) {
    const keywordMap = {
        wisdom: ['wisdom', 'know', 'think', 'truth', 'understand', 'mind', 'learn', 'knowledge', 'wise', 'fool'],
        learning: ['learn', 'study', 'read', 'book', 'knowledge', 'teacher', 'student', 'practice', 'education'],
        perseverance: ['perseverance', 'effort', 'hard', 'diligent', 'try', 'continue', 'persist', 'never', 'always', 'constant'],
        friendship: ['friend', 'neighbor', 'people', 'together', 'help', 'trust', 'harmony', 'group', 'companion'],
        life: ['life', 'live', 'death', 'old', 'young', 'time', 'years', 'age', 'grow', 'family', 'home']
    };
    
    return keywordMap[filter] || [];
}

/**
 * Setup modal functionality
 */
function setupModal() {
    const modal = document.getElementById('proverbModal');
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Show modal with a proverb
 */
function showProverbInModal(chinese, english) {
    const modal = document.getElementById('proverbModal');
    document.getElementById('modalChinese').textContent = chinese;
    document.getElementById('modalEnglish').textContent = english;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('proverbModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Show random proverb in modal
 */
function showRandomProverb() {
    const random = proverbs[Math.floor(Math.random() * proverbs.length)];
    showProverbInModal(random.cn, random.en);
}

/**
 * Show daily proverb on first visit
 */
function showDailyProverb() {
    // Check if we've shown today's proverb
    const lastShown = localStorage.getItem('lastProverbDate');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
        // Show a random proverb as "daily"
        setTimeout(() => {
            showRandomProverb();
            localStorage.setItem('lastProverbDate', today);
        }, 1000);
    }
}

/**
 * Copy proverb to clipboard
 */
async function copyProverb(chinese, english) {
    const text = `${chinese}\n${english}`;
    
    try {
        await navigator.clipboard.writeText(text);
        showToast('Proverb copied to clipboard!');
    } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Proverb copied to clipboard!');
    }
}

/**
 * Share proverb
 */
async function shareProverb() {
    const chinese = document.getElementById('modalChinese').textContent;
    const english = document.getElementById('modalEnglish').textContent;
    const text = `${chinese} - ${english}`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Chinese Proverb',
                text: text,
                url: window.location.href
            });
        } catch (err) {
            copyProverb(chinese, english);
        }
    } else {
        copyProverb(chinese, english);
    }
}

/**
 * Show toast notification
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Ctrl/Cmd + R for random proverb
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        showRandomProverb();
    }
});

// Expose functions to global scope for inline onclick handlers
window.copyProverb = copyProverb;
window.showProverbInModal = showProverbInModal;
