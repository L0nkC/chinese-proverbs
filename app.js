/**
 * East Asian Wisdom - Simple Working Version
 */

// Global state
let allProverbs = [];
let currentProverbs = [];
let favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
let currentCulture = 'all';
let currentTopic = 'all';

// Wait for data to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, waiting for proverbs...');
    
    // Check if data is loaded every 100ms
    let attempts = 0;
    const checkInterval = setInterval(function() {
        attempts++;
        
        // Check if all data sources are available
        const hasChinese = typeof chineseProverbs !== 'undefined' && chineseProverbs.length > 0;
        const hasJapanese = typeof japaneseProverbsData !== 'undefined' && japaneseProverbsData.length > 0;
        const hasKorean = typeof koreanProverbsData !== 'undefined' && koreanProverbsData.length > 0;
        
        console.log(`Attempt ${attempts}: Chinese=${hasChinese}, Japanese=${hasJapanese}, Korean=${hasKorean}`);
        
        if (hasChinese || attempts > 50) {
            clearInterval(checkInterval);
            initApp(hasChinese, hasJapanese, hasKorean);
        }
    }, 100);
});

function initApp(hasChinese, hasJapanese, hasKorean) {
    console.log('Initializing with:', {hasChinese, hasJapanese, hasKorean});
    
    // Combine all proverbs
    allProverbs = [];
    
    if (typeof chineseProverbs !== 'undefined') {
        chineseProverbs.forEach(p => {
            allProverbs.push({
                ...p,
                culture: 'chinese',
                flag: '🇨🇳',
                label: '中文'
            });
        });
    }
    
    if (typeof japaneseProverbsData !== 'undefined') {
        japaneseProverbsData.forEach(p => {
            allProverbs.push({
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
    
    if (typeof koreanProverbsData !== 'undefined') {
        koreanProverbsData.forEach(p => {
            allProverbs.push({
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
    
    console.log('Total proverbs loaded:', allProverbs.length);
    
    currentProverbs = [...allProverbs];
    
    // Setup event handlers
    setupFilters();
    setupSearch();
    setupModal();
    
    // Initial render
    renderProverbs(currentProverbs);
    updateStats();
    setupDailySpotlight();
}

// Filter handlers
function setupFilters() {
    // Culture buttons
    document.querySelectorAll('.culture-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.culture-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCulture = this.dataset.culture;
            applyFilters();
        });
    });
    
    // Topic buttons
    document.querySelectorAll('#topicFilterButtons .filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#topicFilterButtons .filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTopic = this.dataset.filter;
            applyFilters();
        });
    });
}

function applyFilters() {
    let filtered = allProverbs;
    
    // Apply culture filter
    if (currentCulture !== 'all') {
        filtered = filtered.filter(p => p.culture === currentCulture);
    }
    
    // Apply topic filter
    if (currentTopic !== 'all') {
        if (currentTopic === 'favorites') {
            filtered = filtered.filter(p => favoriteIds.includes(getId(p)));
        } else {
            filtered = filtered.filter(p => {
                const cats = p.cats || [];
                return cats.includes(currentTopic);
            });
        }
    }
    
    currentProverbs = filtered;
    renderProverbs(filtered);
    updateStats();
}

function getId(p) {
    return p.id || p.cn;
}

// Render proverbs
function renderProverbs(proverbs) {
    const container = document.getElementById('proverbsContainer');
    if (!container) return;
    
    if (proverbs.length === 0) {
        container.innerHTML = '<div class="no-results">No proverbs found. Try different filters.</div>';
        return;
    }
    
    container.innerHTML = proverbs.map((p, i) => {
        const id = getId(p);
        const isFav = favoriteIds.includes(id);
        const cat = (p.cats && p.cats[0]) || 'wisdom';
        
        return `
            <article class="proverb-card ${p.culture}" data-id="${id}" style="animation-delay: ${i * 0.03}s">
                <div class="card-header">
                    <span class="culture-badge">${p.flag} ${p.label}</span>
                    <span class="category-tag">${cat}</span>
                    <div class="card-actions">
                        <button class="speaker-btn" onclick="speak('${p.cn.replace(/'/g, "\\'")}', this)">🔊</button>
                        <button class="favorite-btn ${isFav ? 'is-favorite' : ''}" onclick="toggleFav('${id.replace(/'/g, "\\'")}', this)">
                            ${isFav ? '♥' : '♡'}
                        </button>
                    </div>
                </div>
                <p class="proverb-chinese">${p.cn}</p>
                <p class="proverb-pinyin">${p.py}</p>
                <p class="proverb-english">${p.en}</p>
                <div class="card-footer">
                    <button onclick="openModal('${id.replace(/'/g, "\\'")}')">View</button>
                    <button onclick="copyText('${p.cn.replace(/'/g, "\\'")}', '${p.py.replace(/'/g, "\\'")}', '${p.en.replace(/'/g, "\\'")}')">Copy</button>
                </div>
            </article>
        `;
    }).join('');
}

// Search
function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    input.addEventListener('input', function() {
        const q = this.value.toLowerCase();
        if (!q) {
            applyFilters();
            return;
        }
        
        currentProverbs = allProverbs.filter(p => {
            return (p.cn && p.cn.toLowerCase().includes(q)) ||
                   (p.en && p.en.toLowerCase().includes(q)) ||
                   (p.py && p.py.toLowerCase().includes(q));
        });
        
        renderProverbs(currentProverbs);
        updateStats();
    });
}

// Modal
function setupModal() {
    const modal = document.getElementById('proverbModal');
    if (!modal) return;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.querySelectorAll('#proverbModal .close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
}

function openModal(id) {
    const p = allProverbs.find(prov => getId(prov) === id);
    if (!p) return;
    
    document.getElementById('modalChinese').textContent = p.cn;
    document.getElementById('modalPinyin').textContent = p.py;
    document.getElementById('modalEnglish').textContent = p.en;
    document.getElementById('modalCategory').textContent = (p.cats && p.cats[0]) || 'wisdom';
    
    const modal = document.getElementById('proverbModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('proverbModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Favorites
function toggleFav(id, btn) {
    const idx = favoriteIds.indexOf(id);
    if (idx > -1) {
        favoriteIds.splice(idx, 1);
        btn.textContent = '♡';
        btn.classList.remove('is-favorite');
        showToast('Removed from favorites');
    } else {
        favoriteIds.push(id);
        btn.textContent = '♥';
        btn.classList.add('is-favorite');
        showToast('Added to favorites!');
    }
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
    updateStats();
}

// Audio
function speak(text, btn) {
    if (!window.speechSynthesis) {
        showToast('Audio not supported');
        return;
    }
    
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8;
    
    u.onstart = () => btn.classList.add('playing');
    u.onend = () => btn.classList.remove('playing');
    
    window.speechSynthesis.speak(u);
}

// Copy
function copyText(cn, py, en) {
    navigator.clipboard.writeText(`${cn}\n${py}\n${en}`).then(() => {
        showToast('Copied!');
    });
}

// Toast
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:white;padding:12px 24px;border-radius:8px;z-index:9999;';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 3000);
}

// Stats
function updateStats() {
    const totalEl = document.getElementById('totalCount');
    const showingEl = document.getElementById('showingCount');
    const favEl = document.getElementById('favoritesCount');
    
    if (totalEl) totalEl.textContent = allProverbs.length;
    if (showingEl) showingEl.textContent = currentProverbs.length;
    if (favEl) favEl.textContent = favoriteIds.length;
}

// Daily Spotlight
function setupDailySpotlight() {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('dailyDate');
    
    let p;
    if (saved === today) {
        const idx = parseInt(localStorage.getItem('dailyIndex') || '0');
        p = allProverbs[idx];
    } else {
        const idx = Math.floor(Math.random() * allProverbs.length);
        p = allProverbs[idx];
        localStorage.setItem('dailyDate', today);
        localStorage.setItem('dailyIndex', idx.toString());
    }
    
    if (p) {
        document.getElementById('dailyChinese').textContent = p.cn;
        document.getElementById('dailyPinyin').textContent = p.py;
        document.getElementById('dailyEnglish').textContent = p.en;
    }
}

// Surprise / Random
function surpriseMe() {
    const p = allProverbs[Math.floor(Math.random() * allProverbs.length)];
    openModal(getId(p));
}

function showRandomProverb() {
    setupDailySpotlight();
}

// Play daily audio
function playDailyAudio() {
    const text = document.getElementById('dailyChinese').textContent;
    const btn = document.getElementById('dailySpeakerBtn');
    speak(text, btn);
}

// Export
function showExportModal() {
    const favs = allProverbs.filter(p => favoriteIds.includes(getId(p)));
    if (favs.length === 0) {
        showToast('No favorites to export');
        return;
    }
    
    let md = '# My Favorites\\n\\n';
    favs.forEach((p, i) => {
        md += `## ${i+1}. ${p.cn}\\n${p.py}\\n${p.en}\\n\\n`;
    });
    
    // Create modal
    let modal = document.getElementById('exportModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'exportModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:600px">
                <div class="modal-header">
                    <h2>Export Favorites</h2>
                    <button onclick="closeExportModal()" class="close-btn">×</button>
                </div>
                <textarea id="exportText" style="width:100%;height:300px;font-family:monospace" readonly></textarea>
                <div class="modal-footer">
                    <button onclick="downloadExport()">Download</button>
                    <button onclick="closeExportModal()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    document.getElementById('exportText').value = md;
    modal.classList.add('active');
}

function closeExportModal() {
    const m = document.getElementById('exportModal');
    if (m) m.classList.remove('active');
}

function downloadExport() {
    const text = document.getElementById('exportText').value;
    const blob = new Blob([text], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.md';
    a.click();
    URL.revokeObjectURL(url);
    closeExportModal();
}

// Learning Mode
const LearningMode = {
    showProgress: function() {
        const total = allProverbs.length;
        const learned = favoriteIds.length;
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
                    <button onclick="LearningMode.startQuiz()">Start Quiz</button>
                    <button onclick="document.getElementById('learningModal').classList.remove('active')">Close</button>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            modal.querySelector('.modal-content div:nth-child(4)').textContent = pct + '%';
            modal.querySelector('.modal-content p').textContent = `${learned} of ${total} proverbs`;
        }
        modal.classList.add('active');
    },
    startQuiz: function() {
        document.getElementById('learningModal').classList.remove('active');
        surpriseMe();
        showToast('Quiz: Guess the meaning!');
    }
};

// Community Submissions
const CommunitySubmissions = {
    showSubmissionForm: function() {
        showToast('Submit form coming soon!');
    }
};

// User Auth
const UserAuth = {
    showAuthModal: function() {
        showToast('Sign in coming soon!');
    }
};

// Legacy onclick handlers for HTML compatibility
function handleCultureFilterClick(btn) {
    document.querySelectorAll('.culture-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCulture = btn.dataset.culture;
    applyFilters();
}

function handleFilterClick(btn) {
    document.querySelectorAll('#topicFilterButtons .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTopic = btn.dataset.filter;
    applyFilters();
}

// Global exports for onclick handlers
window.surpriseMe = surpriseMe;
window.showRandomProverb = showRandomProverb;
window.playDailyAudio = playDailyAudio;
window.showExportModal = showExportModal;
window.closeExportModal = closeExportModal;
window.downloadExport = downloadExport;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleFav = toggleFav;
window.speak = speak;
window.copyText = copyText;
window.handleCultureFilterClick = handleCultureFilterClick;
window.handleFilterClick = handleFilterClick;
