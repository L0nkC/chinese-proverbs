/**
 * Chinese Proverbs - Application Logic
 * Enhanced with Pinyin, Cantonese support, and improved UI
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Global variables
let currentProverbs = [...allProverbs];
let currentFilter = 'all';
let displayedCount = 24; // Initial number of proverbs to show
const PROVERBS_PER_LOAD = 12;

/**
 * Initialize the application
 */
function initializeApp() {
    renderProverbs(currentProverbs.slice(0, displayedCount));
    setupDailySpotlight();
    setupEventListeners();
    setupSearch();
    setupFilters();
    setupModal();
    setupLoadMore();
}

/**
 * Setup Daily Spotlight
 */
function setupDailySpotlight() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyProverbDate');
    const savedIndex = localStorage.getItem('dailyProverbIndex');
    
    let proverb;
    if (savedDate === today && savedIndex !== null) {
        proverb = allProverbs[parseInt(savedIndex)];
    } else {
        const randomIndex = Math.floor(Math.random() * allProverbs.length);
        proverb = allProverbs[randomIndex];
        localStorage.setItem('dailyProverbDate', today);
        localStorage.setItem('dailyProverbIndex', randomIndex.toString());
    }
    
    updateDailySpotlight(proverb);
}

/**
 * Update Daily Spotlight display
 */
function updateDailySpotlight(proverb) {
    document.getElementById('dailyChinese').textContent = proverb.cn;
    document.getElementById('dailyPinyin').textContent = proverb.py;
    document.getElementById('dailyEnglish').textContent = proverb.en;
}

/**
 * Render proverbs to the grid
 */
function renderProverbs(proverbsToRender, append = false) {
    const container = document.getElementById('proverbsContainer');
    
    if (proverbsToRender.length === 0 && !append) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">📜</div>
                <p class="no-results-title">未找到相关谚语</p>
                <p class="no-results-text">No proverbs found matching your search.</p>
            </div>
        `;
        updateStats(0);
        document.getElementById('loadMoreSection').style.display = 'none';
        return;
    }
    
    const cardsHTML = proverbsToRender.map((proverb, index) => {
        const isCantonese = proverb.cat === 'cantonese';
        const totalIndex = allProverbs.indexOf(proverb) + 1;
        return `
            <article class="proverb-card ${isCantonese ? 'cantonese' : ''}" data-index="${totalIndex}">
                <div class="card-header">
                    <span class="proverb-number">#${totalIndex}</span>
                    <span class="category-tag ${isCantonese ? 'cantonese' : ''}">${proverb.cat}</span>
                </div>
                <p class="proverb-chinese">${proverb.cn}</p>
                <p class="proverb-pinyin">${proverb.py}</p>
                <p class="proverb-english">${proverb.en}</p>
                <div class="proverb-actions-card">
                    <button class="card-btn" onclick="copyProverb('${proverb.cn}', '${proverb.py.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}')">Copy</button>
                    <button class="card-btn" onclick="showProverbInModal('${proverb.cn}', '${proverb.py.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}', '${proverb.cat}')">View</button>
                </div>
            </article>
        `;
    }).join('');
    
    if (append) {
        container.insertAdjacentHTML('beforeend', cardsHTML);
    } else {
        container.innerHTML = cardsHTML;
    }
    
    updateStats(append ? container.children.length : proverbsToRender.length);
    
    // Show/hide load more button
    const loadMoreSection = document.getElementById('loadMoreSection');
    if (currentFilter === 'all' && !document.getElementById('searchInput').value) {
        loadMoreSection.style.display = displayedCount < currentProverbs.length ? 'block' : 'none';
    } else {
        loadMoreSection.style.display = 'none';
    }
}

/**
 * Setup Load More functionality
 */
function setupLoadMore() {
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        const currentCount = document.querySelectorAll('.proverb-card').length;
        const nextBatch = currentProverbs.slice(currentCount, currentCount + PROVERBS_PER_LOAD);
        renderProverbs(nextBatch, true);
    });
}

/**
 * Update statistics display
 */
function updateStats(count) {
    document.getElementById('showingCount').textContent = count;
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // New proverb button in modal
    document.getElementById('newProverbBtn').addEventListener('click', () => {
        const random = allProverbs[Math.floor(Math.random() * allProverbs.length)];
        showProverbInModal(random.cn, random.py, random.en, random.cat);
    });
    
    // Copy button in modal
    document.getElementById('copyBtn').addEventListener('click', () => {
        const chinese = document.getElementById('modalChinese').textContent;
        const pinyin = document.getElementById('modalPinyin').textContent;
        const english = document.getElementById('modalEnglish').textContent;
        copyProverb(chinese, pinyin, english);
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
        displayedCount = 24;
        applyFilter(currentFilter);
        return;
    }
    
    const filtered = allProverbs.filter(p => 
        p.cn.includes(query) ||
        p.py.toLowerCase().includes(lowerQuery) ||
        p.en.toLowerCase().includes(lowerQuery)
    );
    
    currentProverbs = filtered;
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
            displayedCount = 24;
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
        currentProverbs = [...allProverbs];
    } else {
        currentProverbs = allProverbs.filter(p => p.cat === filter);
    }
    
    renderProverbs(currentProverbs.slice(0, displayedCount));
}

/**
 * Setup modal functionality
 */
function setupModal() {
    const modal = document.getElementById('proverbModal');
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeAbout();
        }
    });
}

/**
 * Show modal with a proverb
 */
function showProverbInModal(chinese, pinyin, english, category) {
    const modal = document.getElementById('proverbModal');
    const categoryEl = document.getElementById('modalCategory');
    
    document.getElementById('modalChinese').textContent = chinese;
    document.getElementById('modalPinyin').textContent = pinyin;
    document.getElementById('modalEnglish').textContent = english;
    
    categoryEl.textContent = category;
    categoryEl.className = 'modal-category' + (category === 'cantonese' ? ' cantonese' : '');
    
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
    const random = allProverbs[Math.floor(Math.random() * allProverbs.length)];
    showProverbInModal(random.cn, random.py, random.en, random.cat);
}

/**
 * Copy proverb to clipboard
 */
async function copyProverb(chinese, pinyin, english) {
    const text = `${chinese}\n${pinyin}\n${english}`;
    
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
    const pinyin = document.getElementById('modalPinyin').textContent;
    const english = document.getElementById('modalEnglish').textContent;
    const text = `"${chinese}" (${pinyin}) - ${english}`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Chinese Proverb',
                text: text,
                url: window.location.href
            });
        } catch (err) {
            copyProverb(chinese, pinyin, english);
        }
    } else {
        copyProverb(chinese, pinyin, english);
    }
}

/**
 * Show toast notification
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Show About modal
 */
function showAbout() {
    document.getElementById('aboutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close About modal
 */
function closeAbout() {
    document.getElementById('aboutModal').classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Show keyboard shortcuts
 */
function showKeyboardShortcuts() {
    showToast('Ctrl+K: Search | Ctrl+R: Random Proverb | Esc: Close');
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
window.showRandomProverb = showRandomProverb;
window.showAbout = showAbout;
window.closeAbout = closeAbout;
window.showKeyboardShortcuts = showKeyboardShortcuts;
