/**
 * East Asian Wisdom - Application Logic
 * Enhanced with multi-cultural support (Chinese, Japanese, Korean)
 */

// ============================================
// MULTI-CULTURAL PROVERBS DATA
// ============================================

// Combine all proverbs from different cultures
function initializeAllProverbs() {
    const combined = [];
    
    // Add Chinese proverbs
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
    
    // Add Japanese proverbs
    if (typeof japaneseProverbsData !== 'undefined') {
        japaneseProverbsData.forEach(p => {
            combined.push({
                jp: p.jp,
                cn: p.jp, // Use Japanese as display text
                py: p.romaji,
                en: p.en,
                cats: p.cats,
                culture: 'japanese',
                cultureLabel: '日本語',
                cultureFlag: '🇯🇵'
            });
        });
    }
    
    // Add Korean proverbs
    if (typeof koreanProverbsData !== 'undefined') {
        koreanProverbsData.forEach(p => {
            combined.push({
                kr: p.kr,
                cn: p.kr, // Use Korean as display text
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

// Initialize all proverbs
var allProverbs = initializeAllProverbs();
let currentProverbs = [...allProverbs];
let currentFilter = 'all';
let currentCultureFilter = 'all'; // 'all', 'chinese', 'japanese', 'korean'
let displayedCount = 24;
const PROVERBS_PER_LOAD = 12;

// ============================================
// AGGRESSIVE GLOBAL BUTTON HANDLER
// ============================================
window.handleFilterClick = function(arg) {
    const btn = arg.currentTarget || arg;
    const filter = btn.dataset.filter;
    
    console.log('[AGGRESSIVE] CLICK:', filter);
    
    // Update active state
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Apply filter
    if (typeof currentFilter !== 'undefined') currentFilter = filter;
    if (typeof displayedCount !== 'undefined') displayedCount = 24;
    
    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    applyFilter(filter);
    
    console.log('[AGGRESSIVE] Filter applied:', filter, 'Count:', currentProverbs ? currentProverbs.length : 0);
    return false;
};

// Culture filter handler
window.handleCultureFilterClick = function(arg) {
    const btn = arg.currentTarget || arg;
    const culture = btn.dataset.culture;
    
    console.log('[CULTURE] CLICK:', culture);
    
    // Update active state
    document.querySelectorAll('.culture-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentCultureFilter = culture;
    applyCombinedFilter();
    
    return false;
};

// Apply combined category + culture filter
function applyCombinedFilter() {
    let filtered = [...allProverbs];
    
    // Apply culture filter
    if (currentCultureFilter !== 'all') {
        filtered = filtered.filter(p => p.culture === currentCultureFilter);
    }
    
    // Apply category filter
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
// RENDER PROVERBS WITH CULTURE BADGES
// ============================================
function renderProverbs(proverbsToRender, append = false) {
    const container = document.getElementById('proverbsContainer');
    if (!container) return;

    if (proverbsToRender.length === 0 && !append) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">📜</div>
                <p class="no-results-title">未找到相关谚语</p>
                <p class="no-results-text">No proverbs found matching your search.</p>
            </div>
        `;
        updateStats(0);
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
        
        // Get display text based on culture
        const displayText = proverb.cn || proverb.jp || proverb.kr || '';
        const pronunciation = proverb.py || proverb.romaji || proverb.roman || '';
        
        // Culture badge
        const cultureBadge = proverb.culture ? `<span class="culture-badge ${proverb.culture}">${proverb.cultureFlag} ${proverb.cultureLabel}</span>` : '';
        
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
}

// ============================================
// SETUP CULTURE FILTER BUTTONS
// ============================================
function setupCultureFilters() {
    const container = document.querySelector('.controls-section');
    if (!container) return;
    
    // Check if already exists
    if (document.querySelector('.culture-filter-section')) return;
    
    const cultureSection = document.createElement('div');
    cultureSection.className = 'filter-section culture-filter-section';
    cultureSection.innerHTML = `
        <span class="filter-label">Culture:</span>
        <div class="filter-buttons culture-filter-buttons">
            <button class="filter-btn culture-filter-btn active" data-culture="all" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🌏</span>
                <span class="btn-text">All</span>
            </button>
            <button class="filter-btn culture-filter-btn" data-culture="chinese" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🇨🇳</span>
                <span class="btn-text">Chinese</span>
            </button>
            <button class="filter-btn culture-filter-btn" data-culture="japanese" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🇯🇵</span>
                <span class="btn-text">Japanese</span>
            </button>
            <button class="filter-btn culture-filter-btn" data-culture="korean" onclick="handleCultureFilterClick(this)">
                <span class="btn-icon">🇰🇷</span>
                <span class="btn-text">Korean</span>
            </button>
        </div>
    `;
    
    // Insert after the search box
    const searchBox = container.querySelector('.search-box');
    if (searchBox) {
        searchBox.after(cultureSection);
    } else {
        container.prepend(cultureSection);
    }
}

// ============================================
// CSS FOR CULTURE BADGES
// ============================================
const cultureCSS = `
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

.culture-badge.chinese {
    background: rgba(199, 62, 29, 0.1);
    color: #C73E1D;
}

.culture-badge.japanese {
    background: rgba(27, 75, 122, 0.1);
    color: #1B4B7A;
}

.culture-badge.korean {
    background: rgba(196, 30, 58, 0.1);
    color: #C41E3A;
}

.proverb-card.chinese {
    border-left: 3px solid #C73E1D;
}

.proverb-card.japanese {
    border-left: 3px solid #1B4B7A;
}

.proverb-card.korean {
    border-left: 3px solid #C41E3A;
}

.culture-filter-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.culture-filter-btn .btn-icon {
    font-size: 16px;
}
`;

// Inject CSS
const styleEl = document.createElement('style');
styleEl.textContent = cultureCSS;
document.head.appendChild(styleEl);

// ============================================
// EXISTING FUNCTIONS (preserved)
// ============================================

function getProverbId(proverb) {
    return proverb.id || proverb.cn || proverb.jp || proverb.kr;
}

function updateStats(count) {
    const el = document.getElementById('showingCount');
    if (el) el.textContent = count;
    
    const totalEl = document.getElementById('totalCount');
    if (totalEl) totalEl.textContent = allProverbs.length + '+';
}

// Favorites
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
}

function isFavorite(proverbId) {
    return favoriteIds.has(String(proverbId));
}

function updateFavoriteButtonUI(proverbId) {
    document.querySelectorAll(`.favorite-btn[data-id="${proverbId}"]`).forEach(btn => {
        const isFav = isFavorite(proverbId);
        btn.classList.toggle('is-favorite', isFav);
        btn.querySelector('.heart-icon').textContent = isFav ? '♥' : '♡';
    });
}

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Copy
function copyProverb(chinese, pinyin, english) {
    const text = `${chinese}\n${pinyin}\n${english}`;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    });
}

// Modal
function showProverbInModal(text, pinyin, english, category, id) {
    const modal = document.getElementById('proverbModal');
    if (!modal) return;
    
    document.getElementById('modalChinese').textContent = text;
    document.getElementById('modalPinyin').textContent = pinyin;
    document.getElementById('modalEnglish').textContent = english;
    document.getElementById('modalCategory').textContent = category;
    
    modal.querySelector('.modal-content').dataset.proverbId = id;
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

// Audio
function playCardAudio(text, btn) {
    if (!('speechSynthesis' in window)) {
        showToast('Audio not supported');
        return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    
    // Try to find appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes('zh')) || voices[0];
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => btn.classList.add('playing');
    utterance.onend = () => btn.classList.remove('playing');
    
    window.speechSynthesis.speak(utterance);
}

// Filter
function applyFilter(filter) {
    currentFilter = filter;
    applyCombinedFilter();
}

// Search
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
        const text = (p.cn || p.jp || p.kr || '').toLowerCase();
        const en = (p.en || '').toLowerCase();
        const pron = (p.py || '').toLowerCase();
        return text.includes(q) || en.includes(q) || pron.includes(q);
    });
    
    currentProverbs = filtered;
    renderProverbs(filtered.slice(0, displayedCount));
    updateStats(filtered.length);
}

// Initialize
function initializeApp() {
    console.log('[App] Initializing East Asian Wisdom...');
    
    loadFavorites();
    setupCultureFilters();
    setupSearch();
    
    // Setup modal close
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    document.getElementById('proverbModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'proverbModal') closeModal();
    });
    
    // Setup favorite button in modal
    document.getElementById('favoriteModalBtn')?.addEventListener('click', () => {
        const id = document.querySelector('#proverbModal .modal-content')?.dataset.proverbId;
        if (id) {
            toggleFavorite(id);
            updateModalFavoriteButton(id);
        }
    });
    
    // Initial render
    renderProverbs(currentProverbs.slice(0, displayedCount));
    updateStats(allProverbs.length);
    
    console.log('[App] Loaded', allProverbs.length, 'proverbs');
}

// Start
document.addEventListener('DOMContentLoaded', initializeApp);
