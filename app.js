/**
 * East Asian Wisdom - Application Logic
 * Fixed version with proper combined filtering and working buttons
 */

// ============================================
// STATE (Global variables)
// ============================================
window.allProverbs = [];
window.currentProverbs = [];
window.currentFilter = 'all';      // Topic filter
window.currentCultureFilter = 'all'; // Culture filter
window.displayedCount = 24;
window.favoriteIds = new Set();

// ============================================
// FILTERING LOGIC - Combined Culture + Topic
// ============================================

/**
 * Apply both culture and topic filters
 * This ensures when user selects "Korean" + "love", only Korean love proverbs show
 */
window.applyFilters = function() {
    let filtered = [...window.allProverbs];
    
    // Step 1: Apply culture filter
    if (window.currentCultureFilter !== 'all') {
        filtered = filtered.filter(p => p.culture === window.currentCultureFilter);
    }
    
    // Step 2: Apply topic filter
    if (window.currentFilter === 'favorites') {
        filtered = filtered.filter(p => window.favoriteIds.has(window.getProverbId(p)));
    } else if (window.currentFilter !== 'all') {
        filtered = filtered.filter(p => {
            const cats = p.cats || [];
            return cats.includes(window.currentFilter);
        });
    }
    
    window.currentProverbs = filtered;
    window.displayedCount = 24; // Reset to initial count when filters change
    
    console.log('[EAW] Filters applied:', {
        culture: window.currentCultureFilter,
        topic: window.currentFilter,
        count: filtered.length
    });
    
    window.renderProverbs(window.currentProverbs.slice(0, window.displayedCount));
    window.updateStats();
    window.updateLoadMoreButton();
};

// Culture filter handler
window.handleCultureFilterClick = function(arg) {
    const btn = arg.currentTarget || arg;
    const culture = btn.dataset.culture;
    
    console.log('[EAW] Culture click:', culture);
    
    // Update active state
    document.querySelectorAll('.culture-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update filter and apply
    window.currentCultureFilter = culture;
    window.applyFilters();
    
    return false;
};

// Topic filter handler
window.handleFilterClick = function(arg) {
    const btn = arg.currentTarget || arg;
    const filter = btn.dataset.filter;
    
    console.log('[EAW] Topic click:', filter);
    
    // Update active state
    document.querySelectorAll('#topicFilterButtons .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update filter and apply
    window.currentFilter = filter;
    window.applyFilters();
    
    return false;
};

// ============================================
// LOAD MORE FUNCTIONALITY
// ============================================

window.loadMoreProverbs = function() {
    console.log('[EAW] Loading more proverbs...');
    
    window.displayedCount += 24;
    window.renderProverbs(window.currentProverbs.slice(0, window.displayedCount));
    window.updateLoadMoreButton();
};

window.updateLoadMoreButton = function() {
    const btn = document.getElementById('loadMoreBtn');
    const section = document.getElementById('loadMoreSection');
    
    if (!btn || !section) return;
    
    const hasMore = window.displayedCount < window.currentProverbs.length;
    
    if (hasMore) {
        section.style.display = 'block';
        btn.innerHTML = `<span>Load More</span><span class="load-icon">↓</span> <small>(${window.currentProverbs.length - window.displayedCount} remaining)</small>`;
    } else {
        section.style.display = 'none';
    }
};

// ============================================
// NEW PROVERB BUTTON
// ============================================

window.showNewProverb = function() {
    console.log('[EAW] Showing new proverb...');
    
    // Pick a random proverb different from current daily
    const currentDaily = document.getElementById('dailyChinese').textContent;
    let newProverb;
    let attempts = 0;
    
    do {
        newProverb = window.allProverbs[Math.floor(Math.random() * window.allProverbs.length)];
        attempts++;
    } while (newProverb.cn === currentDaily && attempts < 10);
    
    // Update the daily spotlight with animation
    const dc = document.getElementById('dailyChinese');
    const dp = document.getElementById('dailyPinyin');
    const de = document.getElementById('dailyEnglish');
    
    if (dc && dp && de && newProverb) {
        // Fade out
        dc.style.opacity = '0';
        dp.style.opacity = '0';
        de.style.opacity = '0';
        
        setTimeout(() => {
            dc.textContent = newProverb.cn;
            dp.textContent = newProverb.py;
            de.textContent = newProverb.en;
            
            // Fade in
            dc.style.opacity = '1';
            dp.style.opacity = '1';
            de.style.opacity = '1';
        }, 200);
    }
    
    window.showToast('New proverb!');
};

// ============================================
// HELPER FUNCTIONS
// ============================================

window.getProverbId = function(p) {
    return p.id || p.cn || 'unknown';
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('[EAW] DOM loaded, initializing...');
    
    // Load favorites
    try {
        const saved = localStorage.getItem('east_asian_favorites');
        if (saved) {
            const arr = JSON.parse(saved);
            arr.forEach(id => window.favoriteIds.add(id));
        }
    } catch(e) {
        console.log('[EAW] No saved favorites');
    }
    
    // Setup button handlers
    setupButtonHandlers();
    
    // Wait for data then init
    waitForData();
});

function setupButtonHandlers() {
    // Load More button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', window.loadMoreProverbs);
        console.log('[EAW] Load More button handler attached');
    }
    
    // New Proverb button (in daily spotlight)
    const newProverbBtn = document.getElementById('newProverbBtn');
    if (newProverbBtn) {
        newProverbBtn.addEventListener('click', window.showNewProverb);
        console.log('[EAW] New Proverb button handler attached');
    }
}

function waitForData() {
    let attempts = 0;
    const interval = setInterval(function() {
        attempts++;
        
        const hasChinese = typeof chineseProverbs !== 'undefined' && chineseProverbs.length > 0;
        const hasJapanese = typeof japaneseProverbsData !== 'undefined' && japaneseProverbsData.length > 0;
        const hasKorean = typeof koreanProverbsData !== 'undefined' && koreanProverbsData.length > 0;
        
        if (hasChinese || attempts > 50) {
            clearInterval(interval);
            initProverbs(hasChinese, hasJapanese, hasKorean);
        }
    }, 100);
}

function initProverbs(hasChinese, hasJapanese, hasKorean) {
    console.log('[EAW] Loading data:', {hasChinese, hasJapanese, hasKorean});
    
    window.allProverbs = [];
    
    // Load Chinese
    if (hasChinese) {
        chineseProverbs.forEach(p => {
            window.allProverbs.push({
                ...p,
                culture: 'chinese',
                flag: '🇨🇳',
                label: '中文'
            });
        });
    }
    
    // Load Japanese
    if (hasJapanese) {
        japaneseProverbsData.forEach(p => {
            window.allProverbs.push({
                cn: p.jp,
                py: p.romaji,
                en: p.en,
                cats: p.cats,
                culture: 'japanese',
                flag: '🇯🇵',
                label: '日本語'
            });
        });
    }
    
    // Load Korean
    if (hasKorean) {
        koreanProverbsData.forEach(p => {
            window.allProverbs.push({
                cn: p.kr,
                py: p.roman,
                en: p.en,
                cats: p.cats,
                culture: 'korean',
                flag: '🇰🇷',
                label: '한국어'
            });
        });
    }
    
    console.log('[EAW] Total proverbs:', window.allProverbs.length);
    
    // Initialize with all proverbs
    window.currentProverbs = [...window.allProverbs];
    
    // Initial render
    window.renderProverbs(window.currentProverbs.slice(0, window.displayedCount));
    window.updateStats();
    window.updateLoadMoreButton();
    window.setupDailySpotlight();
    window.setupSearch();
    window.setupModal();
}

// ============================================
// RENDERING
// ============================================

window.renderProverbs = function(proverbs) {
    const container = document.getElementById('proverbsContainer');
    if (!container) {
        console.error('[EAW] Container not found');
        return;
    }
    
    if (!proverbs || proverbs.length === 0) {
        container.innerHTML = '<div class="no-results">No proverbs found.</div>';
        return;
    }
    
    container.innerHTML = proverbs.map((p, i) => {
        const id = window.getProverbId(p);
        const isFav = window.favoriteIds.has(id);
        const cat = (p.cats && p.cats[0]) || 'wisdom';
        
        const safeCn = (p.cn || '').replace(/'/g, "\\'");
        const safePy = (p.py || '').replace(/'/g, "\\'");
        const safeEn = (p.en || '').replace(/'/g, "\\'");
        const safeId = id.replace(/'/g, "\\'");
        
        return `
            <article class="proverb-card ${p.culture}" data-id="${id}">
                <div class="card-header">
                    <span class="culture-badge">${p.flag} ${p.label}</span>
                    <span class="category-tag">${cat}</span>
                    <div class="card-actions">
                        <button class="speaker-btn" onclick="window.speak('${safeCn}', this)">🔊</button>
                        <button class="favorite-btn ${isFav ? 'is-favorite' : ''}" onclick="window.toggleFavorite('${safeId}', this)">${isFav ? '♥' : '♡'}</button>
                    </div>
                </div>
                <p class="proverb-chinese">${p.cn}</p>
                <p class="proverb-pinyin">${p.py}</p>
                <p class="proverb-english">${p.en}</p>
                <div class="card-footer">
                    <button onclick="window.openModal('${safeId}')">View</button>
                    <button onclick="window.copyText('${safeCn}', '${safePy}', '${safeEn}')">Copy</button>
                </div>
            </article>
        `;
    }).join('');
    
    window.updateStats();
};

// ============================================
// ACTIONS
// ============================================

window.toggleFavorite = function(id, btn) {
    if (window.favoriteIds.has(id)) {
        window.favoriteIds.delete(id);
        btn.textContent = '♡';
        btn.classList.remove('is-favorite');
    } else {
        window.favoriteIds.add(id);
        btn.textContent = '♥';
        btn.classList.add('is-favorite');
    }
    localStorage.setItem('east_asian_favorites', JSON.stringify([...window.favoriteIds]));
    window.updateStats();
};

window.speak = function(text, btn) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8;
    u.onstart = () => btn && btn.classList.add('playing');
    u.onend = () => btn && btn.classList.remove('playing');
    window.speechSynthesis.speak(u);
};

window.openModal = function(id) {
    const p = window.allProverbs.find(prov => window.getProverbId(prov) === id);
    if (!p) return;
    
    const mc = document.getElementById('modalChinese');
    const mp = document.getElementById('modalPinyin');
    const me = document.getElementById('modalEnglish');
    const mcat = document.getElementById('modalCategory');
    
    if (mc) mc.textContent = p.cn;
    if (mp) mp.textContent = p.py;
    if (me) me.textContent = p.en;
    if (mcat) mcat.textContent = (p.cats && p.cats[0]) || 'wisdom';
    
    const modal = document.getElementById('proverbModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function() {
    const modal = document.getElementById('proverbModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.copyText = function(cn, py, en) {
    navigator.clipboard.writeText(`${cn}\n${py}\n${en}`).then(() => {
        window.showToast('Copied!');
    });
};

window.showToast = function(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:white;padding:12px 24px;border-radius:8px;z-index:9999;transition:opacity 0.3s;';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 3000);
};

// ============================================
// OTHER FEATURES
// ============================================

window.updateStats = function() {
    const tc = document.getElementById('totalCount');
    const sc = document.getElementById('showingCount');
    const fc = document.getElementById('favoritesCount');
    
    if (tc) tc.textContent = window.allProverbs.length;
    if (sc) sc.textContent = window.currentProverbs.length;
    if (fc) fc.textContent = window.favoriteIds.size;
};

window.setupDailySpotlight = function() {
    if (window.allProverbs.length === 0) return;
    
    const today = new Date().toDateString();
    const saved = localStorage.getItem('dailyDate');
    
    let idx;
    if (saved === today) {
        idx = parseInt(localStorage.getItem('dailyIndex') || '0');
    } else {
        idx = Math.floor(Math.random() * window.allProverbs.length);
        localStorage.setItem('dailyDate', today);
        localStorage.setItem('dailyIndex', idx.toString());
    }
    
    const p = window.allProverbs[idx % window.allProverbs.length];
    if (!p) return;
    
    const dc = document.getElementById('dailyChinese');
    const dp = document.getElementById('dailyPinyin');
    const de = document.getElementById('dailyEnglish');
    
    if (dc) dc.textContent = p.cn;
    if (dp) dp.textContent = p.py;
    if (de) de.textContent = p.en;
};

window.setupSearch = function() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    input.addEventListener('input', function() {
        const q = this.value.toLowerCase();
        if (!q) {
            window.applyFilters(); // Restore filtered view
        } else {
            window.currentProverbs = window.allProverbs.filter(p => {
                return (p.cn && p.cn.toLowerCase().includes(q)) ||
                       (p.en && p.en.toLowerCase().includes(q)) ||
                       (p.py && p.py.toLowerCase().includes(q));
            });
            window.displayedCount = 24;
            window.renderProverbs(window.currentProverbs.slice(0, window.displayedCount));
            window.updateLoadMoreButton();
        }
    });
};

window.setupModal = function() {
    const modal = document.getElementById('proverbModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) window.closeModal();
        });
    }
    
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', window.closeModal);
    });
};

// Header buttons
window.surpriseMe = function() {
    if (window.allProverbs.length === 0) return;
    const p = window.allProverbs[Math.floor(Math.random() * window.allProverbs.length)];
    window.openModal(window.getProverbId(p));
};

window.showRandomProverb = function() {
    window.showNewProverb();
};

window.playDailyAudio = function() {
    const text = document.getElementById('dailyChinese');
    const btn = document.getElementById('dailySpeakerBtn');
    if (text && btn) window.speak(text.textContent, btn);
};

window.showExportModal = function() {
    const favs = window.allProverbs.filter(p => window.favoriteIds.has(window.getProverbId(p)));
    if (favs.length === 0) {
        window.showToast('No favorites');
        return;
    }
    
    let md = '# My Favorites\n\n';
    favs.forEach((p, i) => {
        md += `## ${i+1}. ${p.cn}\n${p.py}\n${p.en}\n\n`;
    });
    
    let modal = document.getElementById('exportModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'exportModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:600px">
                <h2>Export</h2>
                <button onclick="window.closeExportModal()" class="close-btn">×</button>
                <textarea id="exportText" style="width:100%;height:300px" readonly>${md}</textarea>
                <button onclick="window.downloadExport()">Download</button>
            </div>`;
        document.body.appendChild(modal);
    } else {
        const ta = document.getElementById('exportText');
        if (ta) ta.value = md;
    }
    modal.classList.add('active');
};

window.closeExportModal = function() {
    const m = document.getElementById('exportModal');
    if (m) m.classList.remove('active');
};

window.downloadExport = function() {
    const ta = document.getElementById('exportText');
    if (!ta) return;
    const blob = new Blob([ta.value], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.md';
    a.click();
    URL.revokeObjectURL(url);
    window.closeExportModal();
};

window.CommunitySubmissions = {
    showSubmissionForm: () => window.showToast('Coming soon!')
};

window.UserAuth = {
    showAuthModal: () => window.showToast('Coming soon!')
};

window.LearningMode = {
    showProgress: function() {
        const total = window.allProverbs.length;
        const learned = window.favoriteIds.size;
        const pct = total > 0 ? Math.round((learned/total)*100) : 0;
        
        let modal = document.getElementById('learningModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'learningModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width:400px;text-align:center">
                    <h2>Progress: ${pct}%</h2>
                    <p>${learned} of ${total} proverbs</p>
                    <button onclick="document.getElementById('learningModal').classList.remove('active')">Close</button>
                </div>`;
            document.body.appendChild(modal);
        }
        modal.classList.add('active');
    }
};

window.DarkModeManager = {
    toggle: function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }
};

// Load dark mode on init
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
