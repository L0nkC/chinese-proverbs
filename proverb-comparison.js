/**
 * Proverb Comparison Tool
 * Compare two proverbs side by side
 */

const ProverbComparison = {
    /**
     * Show comparison modal
     */
    showComparison(proverb1 = null, proverb2 = null) {
        const modal = document.createElement('div');
        modal.className = 'comparison-modal';
        modal.id = 'comparisonModal';
        modal.innerHTML = `
            <div class="comparison-overlay" onclick="ProverbComparison.close()"></div>
            <div class="comparison-content">
                <button class="comparison-close" onclick="ProverbComparison.close()">×</button>
                <h2>⚖️ Compare Proverbs</h2>
                <div class="comparison-container" id="comparisonContainer">
                    <div class="comparison-side">
                        <div class="comparison-select" id="compareSide1">
                            ${proverb1 ? this.renderProverbCard(proverb1, 1) : this.renderSelectPrompt(1)}
                        </div>
                    </div>
                    
                    <div class="comparison-vs">VS</div>
                    
                    <div class="comparison-side">
                        <div class="comparison-select" id="compareSide2">
                            ${proverb2 ? this.renderProverbCard(proverb2, 2) : this.renderSelectPrompt(2)}
                        </div>
                    </div>
                </div>
                
                <div class="comparison-actions">
                    <button class="comparison-btn" onclick="ProverbComparison.randomize()">🎲 Random Pair</button>
                    <button class="comparison-btn" onclick="ProverbComparison.shareComparison()">📤 Share</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    /**
     * Render select prompt
     */
    renderSelectPrompt(side) {
        return `
            <div class="comparison-placeholder" onclick="ProverbComparison.showProverbSelector(${side})">
                <span class="placeholder-icon">🔍</span>
                <span>Select a proverb</span>
            </div>
        `;
    },
    
    /**
     * Render proverb card
     */
    renderProverbCard(proverb, side) {
        const chinese = proverb.chinese || proverb.c || '';
        const pinyin = proverb.pinyin || proverb.p || '';
        const english = proverb.english || proverb.e || '';
        const category = proverb.cat || (proverb.cats ? proverb.cats[0] : 'wisdom');
        
        return `
            <div class="comparison-card" data-side="${side}">
                <button class="comparison-change" onclick="ProverbComparison.showProverbSelector(${side})">Change</button>
                <span class="comparison-category">${category}</span>
                <p class="comparison-chinese">${chinese}</p>
                <p class="comparison-pinyin">${pinyin}</p>
                <p class="comparison-english">${english}</p>
                
                ${proverb.meaning ? `<div class="comparison-meaning">
                    <strong>Meaning:</strong> ${proverb.meaning}
                </div>` : ''}
                
                ${proverb.story ? `<div class="comparison-story">
                    <strong>Story:</strong> ${proverb.story.substring(0, 150)}...
                </div>` : ''}
                
                <div class="comparison-themes">
                    ${this.getThemes(proverb).map(t => `<span class="comparison-theme">${t}</span>`).join('')}
                </div>
            </div>
        `;
    },
    
    /**
     * Get themes for a proverb
     */
    getThemes(proverb) {
        const themes = [];
        const text = `${proverb.chinese || proverb.c || ''} ${proverb.english || proverb.e || ''}`.toLowerCase();
        
        const themeKeywords = {
            'patience': ['wait', 'slow', 'time', 'patience', ' persistence'],
            'wisdom': ['wise', 'know', 'learn', 'wisdom'],
            'effort': ['work', 'effort', 'hard', 'diligence'],
            'friendship': ['friend', 'companion', 'together'],
            'love': ['love', 'heart', 'affection'],
            'family': ['family', 'parent', 'child', 'home'],
            'success': ['success', 'achieve', 'accomplish'],
            'humility': ['humble', 'modest', 'low']
        };
        
        for (const [theme, keywords] of Object.entries(themeKeywords)) {
            if (keywords.some(kw => text.includes(kw))) {
                themes.push(theme);
            }
        }
        
        return themes.slice(0, 3);
    },
    
    /**
     * Show proverb selector
     */
    showProverbSelector(side) {
        const modal = document.createElement('div');
        modal.className = 'selector-modal';
        modal.innerHTML = `
            <div class="selector-overlay" onclick="this.parentElement.remove()"></div>
            <div class="selector-content">
                <button class="selector-close" onclick="this.closest('.selector-modal').remove()">×</button>
                <h3>Select a Proverb</h3>
                <input type="text" class="selector-search" placeholder="Search..." 
                       oninput="ProverbComparison.filterSelector(this.value, ${side})">
                
                <div class="selector-list" id="selectorList">
                    ${allProverbs.slice(0, 50).map((p, i) => `
                        <div class="selector-item" onclick="ProverbComparison.selectProverb(${i}, ${side})">
                            <span class="selector-chinese">${p.chinese || p.c}</span>
                            <span class="selector-english">${p.english || p.e}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Filter selector list
     */
    filterSelector(query, side) {
        const list = document.getElementById('selectorList');
        const lower = query.toLowerCase();
        
        const filtered = allProverbs.filter(p => {
            const chinese = (p.chinese || p.c || '').toLowerCase();
            const english = (p.english || p.e || '').toLowerCase();
            const pinyin = (p.pinyin || p.p || '').toLowerCase();
            return chinese.includes(lower) || english.includes(lower) || pinyin.includes(lower);
        }).slice(0, 20);
        
        list.innerHTML = filtered.map((p, i) => {
            const originalIndex = allProverbs.indexOf(p);
            return `
                <div class="selector-item" onclick="ProverbComparison.selectProverb(${originalIndex}, ${side})">
                    <span class="selector-chinese">${p.chinese || p.c}</span>
                    <span class="selector-english">${p.english || p.e}</span>
                </div>
            `;
        }).join('');
    },
    
    /**
     * Select a proverb
     */
    selectProverb(index, side) {
        const proverb = allProverbs[index];
        const container = document.getElementById(`compareSide${side}`);
        if (container) {
            container.innerHTML = this.renderProverbCard(proverb, side);
        }
        
        // Close selector
        document.querySelector('.selector-modal')?.remove();
    },
    
    /**
     * Randomize both proverbs
     */
    randomize() {
        const idx1 = Math.floor(Math.random() * allProverbs.length);
        let idx2 = Math.floor(Math.random() * allProverbs.length);
        while (idx2 === idx1) {
            idx2 = Math.floor(Math.random() * allProverbs.length);
        }
        
        document.getElementById('compareSide1').innerHTML = this.renderProverbCard(allProverbs[idx1], 1);
        document.getElementById('compareSide2').innerHTML = this.renderProverbCard(allProverbs[idx2], 2);
    },
    
    /**
     * Share comparison
     */
    async shareComparison() {
        const card1 = document.querySelector('#compareSide1 .comparison-card');
        const card2 = document.querySelector('#compareSide2 .comparison-card');
        
        if (!card1 || !card2) {
            showToast('Select two proverbs to share');
            return;
        }
        
        const text = `⚖️ Proverb Comparison\n\n` +
            `${card1.querySelector('.comparison-chinese').textContent}\n` +
            `${card1.querySelector('.comparison-english').textContent}\n\n` +
            `vs\n\n` +
            `${card2.querySelector('.comparison-chinese').textContent}\n` +
            `${card2.querySelector('.comparison-english').textContent}`;
        
        try {
            await navigator.clipboard.writeText(text);
            showToast('Comparison copied to clipboard!');
        } catch (e) {
            showToast('Failed to copy');
        }
    },
    
    /**
     * Close comparison modal
     */
    close() {
        document.getElementById('comparisonModal')?.remove();
    }
};

// Add keyboard shortcut (C for compare)
document.addEventListener('keydown', (e) => {
    if (e.key === 'c' && e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        ProverbComparison.showComparison();
    }
});
