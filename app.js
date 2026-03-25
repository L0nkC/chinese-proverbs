/**
 * East Asian Wisdom - Aggressive Fix Version
 */

console.log('[EAW] Script starting...');

// Global state - EXPOSE EVERYTHING TO WINDOW IMMEDIATELY
window.EAW = {
    allProverbs: [],
    currentProverbs: [],
    favoriteIds: JSON.parse(localStorage.getItem('favorites') || '[]'),
    currentCulture: 'all',
    currentTopic: 'all',
    initialized: false
};

console.log('[EAW] State initialized:', window.EAW);

// Core functions defined immediately
window.getId = function(p) {
    return p.id || p.cn || p.jp || p.kr || 'unknown';
};

window.applyFilters = function() {
    console.log('[EAW] applyFilters called:', window.EAW.currentCulture, window.EAW.currentTopic);
    
    let filtered = window.EAW.allProverbs;
    console.log('[EAW] Starting with', filtered.length, 'proverbs');
    
    // Apply culture filter
    if (window.EAW.currentCulture !== 'all') {
        filtered = filtered.filter(p => p.culture === window.EAW.currentCulture);
        console.log('[EAW] After culture filter:', filtered.length);
    }
    
    // Apply topic filter
    if (window.EAW.currentTopic !== 'all') {
        if (window.EAW.currentTopic === 'favorites') {
            filtered = filtered.filter(p => window.EAW.favoriteIds.includes(window.getId(p)));
        } else {
            filtered = filtered.filter(p => {
                const cats = p.cats || [];
                return cats.includes(window.EAW.currentTopic);
            });
        }
        console.log('[EAW] After topic filter:', filtered.length);
    }
    
    window.EAW.currentProverbs = filtered;
    window.renderProverbs(filtered);
    window.updateStats();
};

window.renderProverbs = function(proverbs) {
    console.log('[EAW] Rendering', proverbs.length, 'proverbs');
    const container = document.getElementById('proverbsContainer');
    if (!container) {
        console.error('[EAW] proverbsContainer not found!');
        return;
    }
    
    if (proverbs.length === 0) {
        container.innerHTML = '<div class="no-results">No proverbs found. Try different filters.</div>';
        return;
    }
    
    container.innerHTML = proverbs.map((p, i) => {
        const id = window.getId(p);
        const isFav = window.EAW.favoriteIds.includes(id);
        const cat = (p.cats && p.cats[0]) || 'wisdom';
        
        return `
            <article class="proverb-card ${p.culture}" data-id="${id}" style="animation-delay: ${i * 0.03}s">
                <div class="card-header">
                    <span class="culture-badge">${p.flag} ${p.label}</span>
                    <span class="category-tag">${cat}</span>
                    <div class="card-actions">
                        <button class="speaker-btn" onclick="window.speak('${(p.cn || '').replace(/'/g, "\\'")}', this)">🔊</button>
                        <button class="favorite-btn ${isFav ? 'is-favorite' : ''}" onclick="window.toggleFav('${id.replace(/'/g, "\\'")}', this)">
                            ${isFav ? '♥' : '♡'}
                        </button>
                    </div>
                </div>
                <p class="proverb-chinese">${p.cn}</p>
                <p class="proverb-pinyin">${p.py}</p>
                <p class="proverb-english">${p.en}</p>
                <div class="card-footer">
                    <button onclick="window.openModal('${id.replace(/'/g, "\\'")}')">View</button>
                    <button onclick="window.copyText('${(p.cn || '').replace(/'/g, "\\'")}', '${(p.py || '').replace(/'/g, "\\'")}', '${(p.en || '').replace(/'/g, "\\'")}')">Copy</button>
                </div>
            </article>
        `;
    }).join('');
};

window.updateStats = function() {
    const totalEl = document.getElementById('totalCount');
    const showingEl = document.getElementById('showingCount');
    const favEl = document.getElementById('favoritesCount');
    
    if (totalEl) totalEl.textContent = window.EAW.allProverbs.length;
    if (showingEl) showingEl.textContent = window.EAW.currentProverbs.length;
    if (favEl) favEl.textContent = window.EAW.favoriteIds.length;
    
    console.log('[EAW] Stats updated:', {
        total: window.EAW.allProverbs.length,
        showing: window.EAW.currentProverbs.length,
        favorites: window.EAW.favoriteIds.length
    });
};

// FILTER HANDLERS - EXPOSED TO WINDOW
window.handleCultureFilterClick = function(btn) {
    console.log('[EAW] Culture filter clicked:', btn.dataset.culture);
    document.querySelectorAll('.culture-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.EAW.currentCulture = btn.dataset.culture;
    window.applyFilters();
};

window.handleFilterClick = function(btn) {
    console.log('[EAW] Topic filter clicked:', btn.dataset.filter);
    document.querySelectorAll('#topicFilterButtons .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.EAW.currentTopic = btn.dataset.filter;
    window.applyFilters();
};

// OTHER HANDLERS
window.toggleFav = function(id, btn) {
    const idx = window.EAW.favoriteIds.indexOf(id);
    if (idx > -1) {
        window.EAW.favoriteIds.splice(idx, 1);
        btn.textContent = '♡';
        btn.classList.remove('is-favorite');
        window.showToast('Removed from favorites');
    } else {
        window.EAW.favoriteIds.push(id);
        btn.textContent = '♥';
        btn.classList.add('is-favorite');
        window.showToast('Added to favorites!');
    }
    localStorage.setItem('favorites', JSON.stringify(window.EAW.favoriteIds));
    window.updateStats();
};

window.speak = function(text, btn) {
    if (!window.speechSynthesis) {
        window.showToast('Audio not supported');
        return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8;
    u.onstart = () => btn.classList.add('playing');
    u.onend = () => btn.classList.remove('playing');
    window.speechSynthesis.speak(u);
};

window.openModal = function(id) {
    const p = window.EAW.allProverbs.find(prov => window.getId(prov) === id);
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

window.surpriseMe = function() {
    const p = window.EAW.allProverbs[Math.floor(Math.random() * window.EAW.allProverbs.length)];
    window.openModal(window.getId(p));
};

window.showRandomProverb = function() {
    window.setupDailySpotlight();
    window.showToast('New proverb selected!');
};

window.playDailyAudio = function() {
    const text = document.getElementById('dailyChinese');
    const btn = document.getElementById('dailySpeakerBtn');
    if (text && btn) window.speak(text.textContent, btn);
};

window.showExportModal = function() {
    const favs = window.EAW.allProverbs.filter(p => window.EAW.favoriteIds.includes(window.getId(p)));
    if (favs.length === 0) {
        window.showToast('No favorites to export');
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
                <div class="modal-header">
                    <h2>Export Favorites</h2>
                    <button onclick="window.closeExportModal()" class="close-btn">&times;</button>
                </div>
                <textarea id="exportText" style="width:100%;height:300px;font-family:monospace" readonly></textarea>
                <div class="modal-footer">
                    <button onclick="window.downloadExport()">Download</button>
                    <button onclick="window.closeExportModal()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const et = document.getElementById('exportText');
    if (et) et.value = md;
    modal.classList.add('active');
};

window.closeExportModal = function() {
    const m = document.getElementById('exportModal');
    if (m) m.classList.remove('active');
};

window.downloadExport = function() {
    const text = document.getElementById('exportText');
    if (!text) return;
    const blob = new Blob([text.value], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.md';
    a.click();
    URL.revokeObjectURL(url);
    window.closeExportModal();
};

window.setupDailySpotlight = function() {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('dailyDate');
    
    let p;
    if (saved === today && window.EAW.allProverbs.length > 0) {
        const idx = parseInt(localStorage.getItem('dailyIndex') || '0');
        p = window.EAW.allProverbs[idx % window.EAW.allProverbs.length];
    } else if (window.EAW.allProverbs.length > 0) {
        const idx = Math.floor(Math.random() * window.EAW.allProverbs.length);
        p = window.EAW.allProverbs[idx];
        localStorage.setItem('dailyDate', today);
        localStorage.setItem('dailyIndex', idx.toString());
    }
    
    if (p) {
        const dc = document.getElementById('dailyChinese');
        const dp = document.getElementById('dailyPinyin');
        const de = document.getElementById('dailyEnglish');
        if (dc) dc.textContent = p.cn;
        if (dp) dp.textContent = p.py;
        if (de) de.textContent = p.en;
    }
};

// Community and Auth
window.CommunitySubmissions = {
    showSubmissionForm: function() {
        window.showToast('Submit form coming soon!');
    }
};

window.UserAuth = {
    showAuthModal: function() {
        window.showToast('Sign in coming soon!');
    }
};

window.LearningMode = {
    showProgress: function() {
        const total = window.EAW.allProverbs.length;
        const learned = window.EAW.favoriteIds.length;
        const pct = total > 0 ? Math.round((learned/total)*100) : 0;
        
        let modal = document.getElementById('learningModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'learningModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width:400px;text-align:center">
                    <h2>Learning Progress</h2>
                    <div style="font-size:48px;margin:20px 0">📚</div>
                    <div style="font-size:48px;font-weight:bold;color:var(--vermilion)">${pct}%</div>
                    <p>${learned} of ${total} proverbs</p>
                    <button onclick="window.LearningMode.startQuiz()">Start Quiz</button>
                    <button onclick="document.getElementById('learningModal').classList.remove('active')">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
        }
        modal.classList.add('active');
    },
    startQuiz: function() {
        document.getElementById('learningModal').classList.remove('active');
        window.surpriseMe();
        window.showToast('Quiz: Guess the meaning!');
    }
};

// DARK MODE (minimal)
window.DarkModeManager = {
    isDark: localStorage.getItem('darkMode') === 'true',
    toggle: function() {
        this.isDark = !this.isDark;
        document.body.classList.toggle('dark-mode', this.isDark);
        localStorage.setItem('darkMode', this.isDark);
    },
    init: function() {
        document.body.classList.toggle('dark-mode', this.isDark);
    }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    console.log('[EAW] DOM loaded, initializing...');
    window.DarkModeManager.init();
    
    // Setup modal close
    const modal = document.getElementById('proverbModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) window.closeModal();
        });
    }
    
    // Setup search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const q = this.value.toLowerCase();
            if (!q) {
                window.applyFilters();
                return;
            }
            window.EAW.currentProverbs = window.EAW.allProverbs.filter(p => {
                return (p.cn && p.cn.toLowerCase().includes(q)) ||
                       (p.en && p.en.toLowerCase().includes(q)) ||
                       (p.py && p.py.toLowerCase().includes(q));
            });
            window.renderProverbs(window.EAW.currentProverbs);
            window.updateStats();
        });
    }
    
    // Poll for data
    let attempts = 0;
    const checkInterval = setInterval(function() {
        attempts++;
        console.log(`[EAW] Attempt ${attempts} checking for data...`);
        
        const hasChinese = typeof chineseProverbs !== 'undefined' && chineseProverbs.length > 0;
        const hasJapanese = typeof japaneseProverbsData !== 'undefined' && japaneseProverbsData.length > 0;
        const hasKorean = typeof koreanProverbsData !== 'undefined' && koreanProverbsData.length > 0;
        
        console.log(`[EAW] Data check: Chinese=${hasChinese}, Japanese=${hasJapanese}, Korean=${hasKorean}`);
        
        if (hasChinese || attempts > 50) {
            clearInterval(checkInterval);
            
            // Load data
            if (hasChinese) {
                chineseProverbs.forEach(p => {
                    window.EAW.allProverbs.push({...p, culture: 'chinese', flag: '🇨🇳', label: '中文'});
                });
            }
            if (hasJapanese) {
                japaneseProverbsData.forEach(p => {
                    window.EAW.allProverbs.push({cn: p.jp, py: p.romaji, en: p.en, cats: p.cats, culture: 'japanese', flag: '🇯🇵', label: '日本語'});
                });
            }
            if (hasKorean) {
                koreanProverbsData.forEach(p => {
                    window.EAW.allProverbs.push({cn: p.kr, py: p.roman, en: p.en, cats: p.cats, culture: 'korean', flag: '🇰🇷', label: '한국어'});
                });
            }
            
            console.log('[EAW] Total loaded:', window.EAW.allProverbs.length);
            window.EAW.currentProverbs = [...window.EAW.allProverbs];
            window.renderProverbs(window.EAW.currentProverbs);
            window.updateStats();
            window.setupDailySpotlight();
            window.EAW.initialized = true;
            
            console.log('[EAW] Initialization complete!');
        }
    }, 100);
});

console.log('[EAW] Script loaded, waiting for DOM...');
