/**
 * East Asian Wisdom - Application Logic
 * Hierarchical filtering: Language → Topic
 */

// ============================================
// MULTI-CULTURAL PROVERBS DATA
// ============================================
function initializeAllProverbs() {
    const combined = [];
    
    if (typeof chineseProverbs !== 'undefined') {
        chineseProverbs.forEach(p => {
            combined.push({
                ...p,
                culture: 'chinese',
                cultureLabel: '中文',
                cultureFlag: '🇨🇳'
            });
        });
    }
    
    if (typeof japaneseProverbsData !== 'undefined') {
        japaneseProverbsData.forEach(p => {
            combined.push({
                jp: p.jp,
                cn: p.jp,
                py: p.romaji,
                en: p.en,
                cats: p.cats,
                culture: 'japanese',
                cultureLabel: '日本語',
                cultureFlag: '🇯🇵'
            });
        });
    }
    
    if (typeof koreanProverbsData !== 'undefined') {
        koreanProverbsData.forEach(p => {
            combined.push({
                kr: p.kr,
                cn: p.kr,
                py: p.roman,
                en: p.en,
                cats: p.cats,
                culture: 'korean',
                cultureLabel: '한국어',
                cultureFlag: '🇰🇷'
            });
        });
    }
    
    return combined;
}

var allProverbs = initializeAllProverbs();
let currentProverbs = [...allProverbs];
let currentFilter = 'all';
let currentCultureFilter = 'all';
let displayedCount = 24;
const PROVERBS_PER_LOAD = 12;

// ============================================
// HIERARCHICAL FILTER SYSTEM
// ============================================

// Get topics available for selected culture with counts
function getTopicsForCulture(culture) {
    const proverbs = culture === 'all' ? allProverbs : allProverbs.filter(p => p.culture === culture);
    const topicCounts = {};
    
    proverbs.forEach(p => {
        const cats = p.cats || [p.cat].filter(Boolean);
        cats.forEach(cat => {
            if (cat && cat !== 'cantonese') { // Skip cantonese as it's a dialect not topic
                topicCounts[cat] = (topicCounts[cat] || 0) + 1;
            }
        });
    });
    
    return Object.entries(topicCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([topic, count]) => ({ topic, count }));
}

// Update topic filter buttons dynamically based on selected culture
function updateTopicFilters() {
    const container = document.getElementById('topicFilterButtons');
    if (!container) return;
    
    const topics = getTopicsForCulture(currentCultureFilter);
    const cultureName = currentCultureFilter === 'all' ? 'All' : 
                        currentCultureFilter === 'chinese' ? 'Chinese' :
                        currentCultureFilter === 'japanese' ? 'Japanese' : 'Korean';
    
    // Calculate total for current culture
    const totalCount = currentCultureFilter === 'all' 
        ? allProverbs.length 
        : allProverbs.filter(p => p.culture === currentCultureFilter).length;
    
    // Update filter label
    const labelEl = document.getElementById('topicFilterLabel');
    if (labelEl) {
        labelEl.textContent = cultureName + ' Topics:';
    }
    
    let html = '';
    
    // All button with count
    html += `
        <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all" onclick="handleFilterClick(this)">
            <span class="btn-text">All</span>
            <span class="filter-count">${totalCount}</span>
        </button>
    `;
    
    // Topic buttons with counts
    topics.forEach(({ topic, count }) => {
        const isActive = currentFilter === topic;
        const displayTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
        html += `
            <button class="filter-btn ${isActive ? 'active' : ''}" data-filter="${topic}" onclick="handleFilterClick(this)">
                <span class="btn-text">${displayTopic}</span>
                <span class="filter-count">${count}</span>
            </button>
        `;
    });
    
    // Favorites button
    const favCount = [...favoriteIds].filter(id => {
        const p = allProverbs.find(prov => String(getProverbId(prov)) === id);
        if (!p) return false;
        return currentCultureFilter === 'all' || p.culture === currentCultureFilter;
    }).length;
    
    html += `
        <button class="filter-btn ${currentFilter === 'favorites' ? 'active' : ''}" data-filter="favorites" onclick="handleFilterClick(this)">
            <span class="btn-icon">♥</span>
            <span class="btn-text">Favorites</span>
            <span class="filter-count">${favCount}</span>
        </button>
    `;
    
    container.innerHTML = html;
}

// ============================================
// FILTER HANDLERS
// ============================================
window.handleFilterClick = function(arg) {
    const btn = arg.currentTarget || arg;
    const filter = btn.dataset.filter;
    
    currentFilter = filter;
    displayedCount = 24;
    
    // Update UI
    document.querySelectorAll('#topicFilterButtons .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    applyCombinedFilter();
    return false;
};

window.handleCultureFilterClick = function(arg) {
    const btn = arg.currentTarget || arg;
    const culture = btn.dataset.culture;
    
    currentCultureFilter = culture;
    currentFilter = 'all'; // Reset topic when changing culture
    displayedCount = 24;
    
    // Update UI
    document.querySelectorAll('.culture-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update available topics for this culture
    updateTopicFilters();
    
    applyCombinedFilter();
    return false;
};

function applyCombinedFilter() {
    let filtered = [...allProverbs];
    
    // Apply culture filter first
    if (currentCultureFilter !== 'all') {
        filtered = filtered.filter(p => p.culture === currentCultureFilter);
    }
    
    // Apply topic filter
    if (currentFilter === 'favorites') {
        filtered = filtered.filter(p => isFavorite(getProverbId(p)));
    } else if (currentFilter !== 'all') {
        filtered = filtered.filter(p => {
            if (p.cats && Array.isArray(p.cats)) return p.cats.includes(currentFilter);
            if (p.cat) return p.cat === currentFilter;
            return false;
        });
    }
    
    currentProverbs = filtered;
    renderProverbs(filtered.slice(0, displayedCount));
    updateStats(filtered.length);
}

// ============================================
// RENDER PROVERBS
// ============================================
function renderProverbs(proverbsToRender, append = false) {
    const container = document.getElementById('proverbsContainer');
    if (!container) return;

    if (proverbsToRender.length === 0 && !append) {
        const cultureName = currentCultureFilter === 'all' ? '' : 
                           currentCultureFilter === 'chinese' ? 'Chinese ' :
                           currentCultureFilter === 'japanese' ? 'Japanese ' : 'Korean ';
        const topicName = currentFilter === 'all' ? '' : currentFilter + ' ';
        
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">📜</div>
                <p class="no-results-title">No ${cultureName}${topicName}proverbs found</p>
                <p class="no-results-text">Try selecting a different topic or language.</p>
            </div>
        `;
        document.getElementById('loadMoreSection').style.display = 'none';
        return;
    }

    const existingCards = container.querySelectorAll('.proverb-card');
    const startIndex = append ? existingCards.length : 0;

    const cardsHTML = proverbsToRender.map((proverb, index) => {
        const firstCat = proverb.cats ? proverb.cats[0] : (proverb.cat || 'wisdom');
        const proverbId = getProverbId(proverb);
        const proverbIdStr = String(proverbId).replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const favClass = isFavorite(proverbId) ? 'is-favorite' : '';
        const heartIcon = isFavorite(proverbId) ? '♥' : '♡';
        
        const displayText = proverb.cn || '';
        const pronunciation = proverb.py || '';
        
        const cultureBadge = proverb.culture ? 
            `<span class="culture-badge ${proverb.culture}">${proverb.cultureFlag} ${proverb.cultureLabel}</span>` : '';
        
        const delay = Math.min((startIndex + index) * 0.03, 0.72);
        
        return `
            <article class="proverb-card ${proverb.culture || 'chinese'}" data-id="${proverbIdStr}" style="animation-delay: ${delay}s">
                <div class="card-header">
                    <div class="card-header-left">
                        ${cultureBadge}
                        <span class="category-tag">${firstCat}</span>
                    </div>
                    <div class="card-header-actions">
                        <button class="speaker-btn" onclick="playCardAudio('${displayText.replace(/'/g, "\\'")}', this)" aria-label="Play pronunciation">
                            🔊
                        </button>
                        <button class="favorite-btn ${favClass}" data-id="${proverbIdStr}" onclick="toggleFavorite('${proverbIdStr}', event)" aria-label="Toggle favorite">
                            <span class="heart-icon">${heartIcon}</span>
                        </button>
                    </div>
                </div>
                <p class="proverb-chinese">${displayText}</p>
                <p class="proverb-pinyin">${pronunciation}</p>
                <p class="proverb-english">${proverb.en}</p>
                <div class="proverb-actions-card">
                    <button class="card-btn" onclick="copyProverb('${displayText.replace(/'/g, "\\'")}', '${pronunciation.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}')">Copy</button>
                    <button class="card-btn" onclick="showProverbInModal('${displayText.replace(/'/g, "\\'")}', '${pronunciation.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}', '${firstCat}', '${proverbIdStr}')">View</button>
                </div>
            </article>
        `;
    }).join('');

    if (append) {
        container.insertAdjacentHTML('beforeend', cardsHTML);
    } else {
        container.innerHTML = cardsHTML;
    }

    updateStats(append ? container.querySelectorAll('.proverb-card').length : proverbsToRender.length);
    
    // Show/hide load more button
    const loadMoreSection = document.getElementById('loadMoreSection');
    if (loadMoreSection) {
        const totalShowing = container.querySelectorAll('.proverb-card').length;
        loadMoreSection.style.display = totalShowing < currentProverbs.length ? 'block' : 'none';
    }
}

// ============================================
// SETUP UI
// ============================================
function setupCultureFilters() {
    const container = document.querySelector('.controls-section');
    if (!container) return;
    
    if (document.querySelector('.culture-filter-section')) return;
    
    // Create culture filter section
    const cultureSection = document.createElement('div');
    cultureSection.className = 'filter-section culture-filter-section';
    cultureSection.innerHTML = `
        <span class="filter-label">Language:</span>
        <div class="filter-buttons culture-filter-buttons">
            <button class="filter-btn culture-filter-btn active" data-culture="all" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🌏</span>
                <span class="btn-text">All</span>
                <span class="filter-count">${allProverbs.length}</span>
            </button>
            <button class="filter-btn culture-filter-btn" data-culture="chinese" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🇨🇳</span>
                <span class="btn-text">Chinese</span>
                <span class="filter-count">${allProverbs.filter(p => p.culture === 'chinese').length}</span>
            </button>
            <button class="filter-btn culture-filter-btn" data-culture="japanese" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🇯🇵</span>
                <span class="btn-text">Japanese</span>
                <span class="filter-count">${allProverbs.filter(p => p.culture === 'japanese').length}</span>
            </button>
            <button class="filter-btn culture-filter-btn" data-culture="korean" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🇰🇷</span>
                <span class="btn-text">Korean</span>
                <span class="filter-count">${allProverbs.filter(p => p.culture === 'korean').length}</span>
            </button>
        </div>
    `;
    
    // Create topic filter section
    const topicSection = document.createElement('div');
    topicSection.className = 'filter-section topic-filter-section';
    topicSection.innerHTML = `
        <span class="filter-label" id="topicFilterLabel">Topics:</span>
        <div class="filter-buttons" id="topicFilterButtons"></div>
    `;
    
    // Insert after search box
    const searchBox = container.querySelector('.search-box');
    if (searchBox) {
        searchBox.after(cultureSection);
        cultureSection.after(topicSection);
    } else {
        container.prepend(topicSection);
        container.prepend(cultureSection);
    }
}

function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    let debounceTimer;
    input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => performSearch(e.target.value), 300);
    });
}

function performSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        applyCombinedFilter();
        return;
    }
    
    const filtered = allProverbs.filter(p => {
        // Respect current culture filter
        if (currentCultureFilter !== 'all' && p.culture !== currentCultureFilter) {
            return false;
        }
        
        const text = (p.cn || '').toLowerCase();
        const en = (p.en || '').toLowerCase();
        const pron = (p.py || '').toLowerCase();
        return text.includes(q) || en.includes(q) || pron.includes(q);
    });
    
    currentProverbs = filtered;
    renderProverbs(filtered.slice(0, displayedCount));
    updateStats(filtered.length);
}

function setupLoadMore() {
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        displayedCount += PROVERBS_PER_LOAD;
        renderProverbs(currentProverbs.slice(0, displayedCount));
    });
}

// ============================================
// UTILITIES
// ============================================
function getProverbId(proverb) {
    return proverb.id || proverb.cn;
}

function updateStats(count) {
    const el = document.getElementById('showingCount');
    if (el) el.textContent = count;
    
    const totalEl = document.getElementById('totalCount');
    if (totalEl) totalEl.textContent = allProverbs.length;
}

// ============================================
// FAVORITES
// ============================================
let favoriteIds = new Set();
const FAVORITES_STORAGE_KEY = 'east_asian_wisdom_favorites';

function loadFavorites() {
    try {
        const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (saved) favoriteIds = new Set(JSON.parse(saved));
    } catch (e) {
        favoriteIds = new Set();
    }
}

function saveFavorites() {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favoriteIds]));
    } catch (e) {}
}

function toggleFavorite(proverbId, event) {
    if (event) event.stopPropagation();
    const idStr = String(proverbId);
    
    if (favoriteIds.has(idStr)) {
        favoriteIds.delete(idStr);
        showToast('Removed from favorites');
    } else {
        favoriteIds.add(idStr);
        showToast('Added to favorites ♥');
    }
    
    saveFavorites();
    updateFavoriteButtonUI(idStr);
    
    // Update topic filters to refresh favorite count
    updateTopicFilters();
}

function isFavorite(proverbId) {
    return favoriteIds.has(String(proverbId));
}

function updateFavoriteButtonUI(proverbId) {
    document.querySelectorAll(`.favorite-btn[data-id="${proverbId}"]`).forEach(btn => {
        const isFav = isFavorite(proverbId);
        btn.classList.toggle('is-favorite', isFav);
        const heartSpan = btn.querySelector('.heart-icon');
        if (heartSpan) heartSpan.textContent = isFav ? '♥' : '♡';
    });
}

// ============================================
// MODAL
// ============================================
function showProverbInModal(text, pinyin, english, category, id) {
    const modal = document.getElementById('proverbModal');
    if (!modal) return;
    
    const chineseEl = document.getElementById('modalChinese');
    const pinyinEl = document.getElementById('modalPinyin');
    const englishEl = document.getElementById('modalEnglish');
    const categoryEl = document.getElementById('modalCategory');
    
    if (chineseEl) chineseEl.textContent = text;
    if (pinyinEl) pinyinEl.textContent = pinyin;
    if (englishEl) englishEl.textContent = english;
    if (categoryEl) categoryEl.textContent = category;
    
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) modalContent.dataset.proverbId = id;
    
    updateModalFavoriteButton(id);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateModalFavoriteButton(id) {
    const btn = document.getElementById('favoriteModalBtn');
    if (!btn) return;
    const isFav = isFavorite(id);
    btn.innerHTML = `<span class="heart-icon">${isFav ? '♥' : '♡'}</span> ${isFav ? 'Favorited' : 'Favorite'}`;
    btn.classList.toggle('is-favorite', isFav);
}

function closeModal() {
    const modal = document.getElementById('proverbModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// AUDIO & COPY
// ============================================
function playCardAudio(text, btn) {
    if (!('speechSynthesis' in window)) {
        showToast('Audio not supported');
        return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes('zh')) || voices[0];
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => btn.classList.add('playing');
    utterance.onend = () => btn.classList.remove('playing');
    
    window.speechSynthesis.speak(utterance);
}

function copyProverb(text, pinyin, english) {
    const fullText = `${text}\n${pinyin}\n${english}`;
    navigator.clipboard.writeText(fullText).then(() => {
        showToast('Copied to clipboard!');
    });
}

// ============================================
// TOAST
// ============================================
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = '<span class="toast-message"></span>';
        document.body.appendChild(toast);
    }
    
    const msgEl = toast.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = message;
    
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// CSS INJECTION
// ============================================
const appCSS = `
.culture-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-right: 8px;
}

.culture-badge.chinese { background: rgba(199, 62, 29, 0.1); color: #C73E1D; }
.culture-badge.japanese { background: rgba(27, 75, 122, 0.1); color: #1B4B7A; }
.culture-badge.korean { background: rgba(196, 30, 58, 0.1); color: #C41E3A; }

.proverb-card.chinese { border-left: 3px solid #C73E1D; }
.proverb-card.japanese { border-left: 3px solid #1B4B7A; }
.proverb-card.korean { border-left: 3px solid #C41E3A; }

.filter-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    padding: 2px 6px;
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
    margin-left: 6px;
}

.filter-btn.active .filter-count {
    background: rgba(255,255,255,0.3);
}

.filter-section {
    margin-bottom: 16px;
}

.filter-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666;
    margin-bottom: 8px;
}

.no-results {
    text-align: center;
    padding: 60px 20px;
    color: #666;
}

.no-results-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.no-results-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #333;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 10000;
    opacity: 0;
    transition: all 0.3s ease;
}

.toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}
`;

const styleEl = document.createElement('style');
styleEl.textContent = appCSS;
document.head.appendChild(styleEl);

// ============================================
// INITIALIZATION
// ============================================
function initializeApp() {
    console.log('[East Asian Wisdom] Initializing...');
    console.log('[East Asian Wisdom] Total proverbs:', allProverbs.length);
    console.log('[East Asian Wisdom] Chinese:', allProverbs.filter(p => p.culture === 'chinese').length);
    console.log('[East Asian Wisdom] Japanese:', allProverbs.filter(p => p.culture === 'japanese').length);
    console.log('[East Asian Wisdom] Korean:', allProverbs.filter(p => p.culture === 'korean').length);
    
    loadFavorites();
    setupCultureFilters();
    updateTopicFilters();
    setupSearch();
    setupLoadMore();
    
    // Modal close handlers
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    const modal = document.getElementById('proverbModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    const favBtn = document.getElementById('favoriteModalBtn');
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            const modalContent = document.querySelector('#proverbModal .modal-content');
            const id = modalContent?.dataset.proverbId;
            if (id) {
                toggleFavorite(id);
                updateModalFavoriteButton(id);
            }
        });
    }
    
    // Initial render
    renderProverbs(currentProverbs.slice(0, displayedCount));
    updateStats(allProverbs.length);
    
    console.log('[East Asian Wisdom] Ready!');
}

document.addEventListener('DOMContentLoaded', initializeApp);
