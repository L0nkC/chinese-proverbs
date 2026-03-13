
const ChineseConverter = {
    converter: null,
    currentMode: 'simplified', // 'simplified' or 'traditional'

    /**
     * Initialize the converter
     */
    async init() {
        // Check for saved preference
        const savedMode = localStorage.getItem('chineseCharacterMode');
        if (savedMode) {
            this.currentMode = savedMode;
        }

        // Initialize OpenCC converter (Simplified to Traditional)
        if (typeof OpenCC !== 'undefined') {
            try {
                // Use correct API with options object
                this.converter = await OpenCC.Converter({ from: 'cn', to: 'tw' });
                console.log('OpenCC converter initialized successfully');
            } catch (e) {
                console.warn('OpenCC converter initialization failed:', e);
                // Fallback: create a simple converter using a dictionary approach
                this.converter = this.createFallbackConverter();
            }
        } else {
            console.warn('OpenCC library not found');
            this.converter = this.createFallbackConverter();
        }

        this.updateToggleUI();
    },

    /**
     * Create a fallback converter using common character mappings
     */
    createFallbackConverter() {
        // Common Simplified to Traditional mappings
        const s2t = {
            '简': '簡', '体': '體', '语': '語', '谚': '諺', '华': '華',
            '为': '為', '学': '學', '无': '無', '过': '過', '现': '現',
            '实': '實', '见': '見', '认': '認', '识': '識', '说': '說',
            '话': '話', '对': '對', '这': '這', '们': '們', '来': '來',
            '时': '時', '会': '會', '个': '個', '后': '後', '前': '前',
            '发': '發', '问': '問', '听': '聽', '读': '讀', '书': '書',
            '长': '長', '门': '門', '头': '頭', '还': '還', '从': '從',
            '当': '當', '与': '與', '业': '業', '两': '兩', '义': '義',
            '乐': '樂', '乱': '亂', '争': '爭', '于': '於', '云': '雲',
            '产': '產', '亲': '親', '亿': '億', '介': '介', '从': '從',
            '仑': '侖', '仓': '倉', '他': '他', '伟': '偉', '传': '傳',
            '伤': '傷', '伦': '倫', '伯': '伯', '余': '餘', '你': '你',
            '侦': '偵', '侧': '側', '债': '債', '倾': '傾', '偿': '償',
            '储': '儲', '儿': '兒', '元': '元', '党': '黨', '全': '全',
            '关': '關', '兴': '興', '养': '養', '军': '軍', '决': '決',
            '冷': '冷', '准': '準', '几': '幾', '凯': '凱', '出': '出',
            '击': '擊', '分': '分', '别': '別', '制': '制', '创': '創',
            '剧': '劇', '务': '務', '动': '動', '劳': '勞', '势': '勢',
            '千': '千', '却': '卻', '单': '單', '卫': '衛', '即': '即',
            '历': '歷', '压': '壓', '原': '原', '去': '去', '参': '參',
            '又': '又', '古': '古', '可': '可', '台': '臺', '叶': '葉',
            '号': '號', '吃': '吃', '合': '合', '同': '同', '向': '向',
            '和': '和', '啊': '啊', '四': '四', '回': '回', '因': '因',
            '国': '國', '图': '圖', '圆': '圓', '在': '在', '地': '地',
            '场': '場', '坏': '壞', '块': '塊', '坚': '堅', '坠': '墜',
            '增': '增', '备': '備', '复': '復', '夕': '夕', '多': '多',
            '夜': '夜', '够': '夠', '头': '頭', '奖': '獎', '如': '如',
            '妇': '婦', '她': '她', '始': '始', '子': '子', '字': '字',
            '学': '學', '孩': '孩', '定': '定', '宝': '寶', '实': '實',
            '客': '客', '害': '害', '家': '家', '容': '容', '寒': '寒',
            '察': '察', '对': '對', '寻': '尋', '导': '導', '将': '將',
            '尊': '尊', '小': '小', '少': '少', '尔': '爾', '就': '就',
            '尽': '盡', '岁': '歲', '岂': '豈', '川': '川', '工': '工',
            '左': '左', '巧': '巧', '己': '己', '已': '已', '师': '師',
            '希': '希', '常': '常', '干': '幹', '年': '年', '并': '並',
            '广': '廣', '应': '應', '底': '底', '开': '開', '异': '異',
            '弃': '棄', '弱': '弱', '强': '強', '当': '當', '录': '錄',
            '归': '歸', '形': '形', '彼': '彼', '往': '往', '很': '很',
            '得': '得', '微': '微', '心': '心', '必': '必', '志': '志',
            '快': '快', '怎': '怎', '急': '急', '性': '性', '总': '總',
            '息': '息', '患': '患', '情': '情', '想': '想', '意': '意',
            '愚': '愚', '感': '感', '慢': '慢', '成': '成', '我': '我',
            '或': '或', '战': '戰', '所': '所', '手': '手', '才': '才',
            '打': '打', '找': '找', '承': '承', '技': '技', '把': '把',
            '折': '折', '报': '報', '抬': '抬', '持': '持', '指': '指',
            '按': '按', '挑': '挑', '挥': '揮', '损': '損', '据': '據',
            '排': '排', '探': '探', '接': '接', '揭': '揭', '援': '援',
            '敢': '敢', '数': '數', '整': '整', '方': '方', '新': '新',
            '方': '方', '无': '無', '日': '日', '早': '早', '明': '明',
            '易': '易', '星': '星', '春': '春', '昨': '昨', '是': '是',
            '显': '顯', '景': '景', '智': '智', '暗': '暗', '曲': '曲',
            '更': '更', '最': '最', '月': '月', '有': '有', '朋': '朋',
            '服': '服', '望': '望', '未': '未', '本': '本', '术': '術',
            '机': '機', '来': '來', '松': '鬆', '板': '板', '极': '極',
            '果': '果', '柏': '柏', '某': '某', '查': '查', '根': '根',
            '格': '格', '梦': '夢', '梯': '梯', '检': '檢', '横': '橫',
            '欢': '歡', '欲': '欲', '正': '正', '此': '此', '步': '步',
            '死': '死', '每': '每', '比': '比', '毛': '毛', '水': '水',
            '求': '求', '汗': '汗', '决': '決', '没': '沒', '治': '治',
            '法': '法', '泛': '泛', '波': '波', '活': '活', '浅': '淺',
            '济': '濟', '涉': '涉', '涅': '涅', '温': '溫', '满': '滿',
            '演': '演', '潜': '潛', '火': '火', '灭': '滅', '灯': '燈',
            '点': '點', '照': '照', '熟': '熟', '爱': '愛', '牛': '牛',
            '物': '物', '牵': '牽', '独': '獨', '玉': '玉', '现': '現',
            '理': '理', '生': '生', '用': '用', '田': '田', '由': '由',
            '电': '電', '疑': '疑', '症': '症', '登': '登', '白': '白',
            '的': '的', '皇': '皇', '益': '益', '盘': '盤', '尽': '盡',
            '眼': '眼', '着': '著', '知': '知', '石': '石', '破': '破',
            '础': '礎', '磨': '磨', '示': '示', '礼': '禮', '神': '神',
            '福': '福', '离': '離', '种': '種', '积': '積', '称': '稱',
            '程': '程', '稳': '穩', '穷': '窮', '窃': '竊', '立': '立',
            '章': '章', '端': '端', '笔': '筆', '等': '等', '算': '算',
            '管': '管', '米': '米', '类': '類', '粗': '粗', '精': '精',
            '系': '係', '累': '累', '细': '細', '终': '終', '经': '經',
            '结': '結', '给': '給', '绝': '絕', '统': '統', '继': '繼',
            '绩': '績', '续': '續', '维': '維', '缓': '緩', '缘': '緣',
            '缺': '缺', '网': '網', '罗': '羅', '置': '置', '群': '群',
            '翁': '翁', '老': '老', '考': '考', '者': '者', '而': '而',
            '耕': '耕', '耳': '耳', '闻': '聞', '聪': '聰', '声': '聲',
            '听': '聽', '肚': '肚', '胜': '勝', '能': '能', '脚': '腳',
            '臣': '臣', '自': '自', '至': '至', '致': '致', '舌': '舌',
            '舍': '捨', '舟': '舟', '色': '色', '花': '花', '苦': '苦',
            '英': '英', '茶': '茶', '草': '草', '荐': '薦', '药': '藥',
            '获': '獲', '获': '獲', '藏': '藏', '虽': '雖', '蚁': '蟻',
            '蚀': '蝕', '蚁': '蟻', '融': '融', '行': '行', '补': '補',
            '装': '裝', '里': '裡', '计': '計', '订': '訂', '认': '認',
            '讨': '討', '让': '讓', '议': '議', '记': '記', '讲': '講',
            '许': '許', '论': '論', '设': '設', '证': '證', '评': '評',
            '识': '識', '诉': '訴', '译': '譯', '试': '試', '诗': '詩',
            '诚': '誠', '话': '話', '询': '詢', '该': '該', '详': '詳',
            '语': '語', '误': '誤', '说': '說', '请': '請', '诸': '諸',
            '课': '課', '调': '調', '谈': '談', '谊': '誼', '谋': '謀',
            '谎': '謊', '谓': '謂', '谜': '謎', '谢': '謝', '谨': '謹',
            '识': '識', '识': '識', '议': '議', '护': '護', '谢': '謝',
            '识': '識', '负': '負', '财': '財', '责': '責', '贤': '賢',
            '败': '敗', '货': '貨', '质': '質', '贪': '貪', '贫': '貧',
            '购': '購', '贯': '貫', '贵': '貴', '买': '買', '贵': '貴',
            '费': '費', '贺': '賀', '载': '載', '资': '資', '质': '質',
            '赖': '賴', '赛': '賽', '赚': '賺', '赠': '贈', '赞': '讚',
            '赢': '贏', '趋': '趨', '趣': '趣', '趋': '趨', '足': '足',
            '跃': '躍', '路': '路', '车': '車', '轨': '軌', '转': '轉',
            '轮': '輪', '软': '軟', '载': '載', '轻': '輕', '较': '較',
            '载': '載', '输': '輸', '辕': '轅', '农': '農', '近': '近',
            '返': '返', '述': '述', '迷': '迷', '追': '追', '退': '退',
            '送': '送', '适': '適', '逆': '逆', '选': '選', '遗': '遺',
            '远': '遠', '迟': '遲', '迁': '遷', '选': '選', '遗': '遺',
            '远': '遠', '遥': '遙', '邻': '鄰', '那': '那', '配': '配',
            '酒': '酒', '里': '裡', '金': '金', '针': '針', '钟': '鍾',
            '铁': '鐵', '银': '銀', '长': '長', '门': '門', '问': '問',
            '闲': '閒', '间': '間', '闷': '悶', '闹': '鬧', '闻': '聞',
            '阅': '閱', '阳': '陽', '阴': '陰', '阶': '階', '际': '際',
            '难': '難', '虽': '雖', '雨': '雨', '雪': '雪', '云': '雲',
            '电': '電', '需': '需', '青': '青', '非': '非', '面': '面',
            '革': '革', '鞋': '鞋', '音': '音', '页': '頁', '顶': '頂',
            '顺': '順', '须': '須', '顿': '頓', '预': '預', '领': '領',
            '频': '頻', '题': '題', '颜': '顏', '额': '額', '风': '風',
            '飞': '飛', '食': '食', '饱': '飽', '饮': '飲', '饰': '飾',
            '首': '首', '马': '馬', '驯': '馴', '驰': '馳', '驱': '驅',
            '验': '驗', '骑': '騎', '骗': '騙', '骤': '驟', '鱼': '魚',
            '鸟': '鳥', '鸡': '雞', '鸣': '鳴', '鸦': '鴉', '鸭': '鴨',
            '鸿': '鴻', '鸽': '鴿', '鹊': '鵲', '鹤': '鶴', '鹰': '鷹',
            '麦': '麥', '麻': '麻', '黄': '黃', '黑': '黒', '默': '默',
            '龙': '龍'
        };

        return function(text) {
            if (!text) return text;
            let result = '';
            for (let char of text) {
                result += s2t[char] || char;
            }
            return result;
        };
    },

    /**
     * Convert text to current mode
     */
    convert(text) {
        if (!text) return text;
        if (this.currentMode === 'simplified' || !this.converter) {
            return text;
        }
        return this.converter(text);
    },

    /**
     * Toggle between simplified and traditional
     */
    toggle() {
        this.currentMode = this.currentMode === 'simplified' ? 'traditional' : 'simplified';
        localStorage.setItem('chineseCharacterMode', this.currentMode);
        this.updateToggleUI();
        return this.currentMode;
    },

    /**
     * Set specific mode
     */
    setMode(mode) {
        if (mode === 'simplified' || mode === 'traditional') {
            this.currentMode = mode;
            localStorage.setItem('chineseCharacterMode', this.currentMode);
            this.updateToggleUI();
        }
    },

    /**
     * Update toggle button UI
     */
    updateToggleUI() {
        const toggle = document.getElementById('chineseToggle');
        if (!toggle) return;

        const options = toggle.querySelectorAll('.toggle-option');
        options.forEach(opt => {
            if (opt.dataset.value === this.currentMode) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    },

    /**
     * Apply conversion to all Chinese text on the page
     */
    applyToPage() {
        // Daily spotlight
        const dailyChinese = document.getElementById('dailyChinese');
        if (dailyChinese && dailyChinese.dataset.original) {
            dailyChinese.textContent = this.convert(dailyChinese.dataset.original);
        }

        // Proverb cards
        document.querySelectorAll('.proverb-card').forEach(card => {
            const chineseEl = card.querySelector('.proverb-chinese');
            if (chineseEl && chineseEl.dataset.original) {
                chineseEl.textContent = this.convert(chineseEl.dataset.original);
            }
        });

        // Modal content
        const modalChinese = document.getElementById('modalChinese');
        if (modalChinese && modalChinese.dataset.original) {
            modalChinese.textContent = this.convert(modalChinese.dataset.original);
        }

        // Site title
        const titleChinese = document.querySelector('.title-chinese');
        if (titleChinese && titleChinese.dataset.original) {
            titleChinese.textContent = this.convert(titleChinese.dataset.original);
        }

        // Footer text
        const footerText = document.querySelector('.footer-text');
        if (footerText && footerText.dataset.original) {
            footerText.textContent = this.convert(footerText.dataset.original);
        }

        // Seal mark
        const sealMark = document.querySelector('.seal-mark');
        if (sealMark && sealMark.dataset.original) {
            sealMark.textContent = this.convert(sealMark.dataset.original);
        }

        // Daily spotlight label
        const labelText = document.querySelector('.label-text');
        if (labelText && labelText.dataset.original) {
            labelText.textContent = this.convert(labelText.dataset.original);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Global variables
let allProverbs = proverbs; // proverbs loaded from proverbs.js
let currentProverbs = [...allProverbs];
let currentFilter = 'all';
let displayedCount = 24; // Initial number of proverbs to show
const PROVERBS_PER_LOAD = 12;

// Favorites management
let favoriteIds = new Set();
const FAVORITES_STORAGE_KEY = 'chinese_proverbs_favorites';

/**
 * Get unique ID for a proverb
 */
function getProverbId(proverb) {
    // Use the Chinese text as unique ID if no numeric ID exists
    return proverb.id || proverb.cn;
}

/**
 * Load favorites from localStorage
 */
function loadFavorites() {
    try {
        const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            favoriteIds = new Set(parsed);
        }
    } catch (e) {
        console.error('Error loading favorites:', e);
        favoriteIds = new Set();
    }
    updateFavoritesCount();
}

/**
 * Save favorites to localStorage
 */
function saveFavorites() {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favoriteIds]));
    } catch (e) {
        console.error('Error saving favorites:', e);
    }
    updateFavoritesCount();
}

/**
 * Toggle favorite status for a proverb
 */
function toggleFavorite(proverbId, event) {
    if (event) {
        event.stopPropagation();
    }
    
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

    // If we're in favorites view, re-render to remove the unfavorited item
    if (currentFilter === 'favorites') {
        displayedCount = 24;
        applyFilter('favorites');
    }
}

/**
 * Check if a proverb is favorited
 */
function isFavorite(proverbId) {
    return favoriteIds.has(String(proverbId));
}

/**
 * Update the UI for a specific favorite button
 */
function updateFavoriteButtonUI(proverbId) {
    const btn = document.querySelector(`.favorite-btn[data-id="${proverbId}"]`);
    if (btn) {
        const isFav = isFavorite(proverbId);
        btn.classList.toggle('is-favorite', isFav);
        btn.innerHTML = `<span class="heart-icon">${isFav ? '♥' : '♡'}</span>`;
    }
}

/**
 * Update the favorites count display
 */
function updateFavoritesCount() {
    const countEl = document.getElementById('favoritesCount');
    if (countEl) {
        countEl.textContent = favoriteIds.size;
    }
}

/**
 * Get all favorite proverbs
 */
function getFavoriteProverbs() {
    return allProverbs.filter(p => favoriteIds.has(String(getProverbId(p))));
}

/**
 * Store original Chinese text for conversion
 */
function storeOriginalText() {
    // Store original site title
    const titleChinese = document.querySelector('.title-chinese');
    if (titleChinese && !titleChinese.dataset.original) {
        titleChinese.dataset.original = titleChinese.textContent.trim();
    }

    // Store seal mark
    const sealMark = document.querySelector('.seal-mark');
    if (sealMark && !sealMark.dataset.original) {
        sealMark.dataset.original = sealMark.textContent.trim();
    }

    // Store daily spotlight label
    const labelText = document.querySelector('.label-text');
    if (labelText && !labelText.dataset.original) {
        labelText.dataset.original = labelText.textContent.trim();
    }

    // Store footer text
    const footerText = document.querySelector('.footer-text');
    if (footerText && !footerText.dataset.original) {
        footerText.dataset.original = footerText.textContent.trim();
    }
}

/**
 * Setup Chinese character toggle
 */
function setupChineseToggle() {
    const toggle = document.getElementById('chineseToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const newMode = ChineseConverter.toggle();
        ChineseConverter.applyToPage();

        // Re-render proverbs with conversion
        const currentCards = document.querySelectorAll('.proverb-card');
        currentCards.forEach(card => {
            const chineseEl = card.querySelector('.proverb-chinese');
            if (chineseEl && chineseEl.dataset.original) {
                chineseEl.textContent = ChineseConverter.convert(chineseEl.dataset.original);
            }
        });

        // Update daily spotlight
        const dailyChinese = document.getElementById('dailyChinese');
        if (dailyChinese && dailyChinese.dataset.original) {
            dailyChinese.textContent = ChineseConverter.convert(dailyChinese.dataset.original);
        }

        // Update modal if open
        const modalChinese = document.getElementById('modalChinese');
        if (modalChinese && modalChinese.dataset.original) {
            modalChinese.textContent = ChineseConverter.convert(modalChinese.dataset.original);
        }

        showToast(newMode === 'traditional' ? '已切换到繁体中文' : '已切换到简体中文');
    });
}

/**
 * Initialize the application
 */
async function initializeApp() {
    console.log('[App] Starting initialization...');
    
    try {
        // Initialize Chinese converter first
        console.log('[App] Initializing Chinese converter...');
        await ChineseConverter.init();
        console.log('[App] Chinese converter initialized');

        // Store original Chinese text for conversion
        console.log('[App] Storing original text...');
        storeOriginalText();

        // Load favorites from localStorage
        console.log('[App] Loading favorites...');
        loadFavorites();

        console.log('[App] Rendering proverbs...');
        renderProverbs(currentProverbs.slice(0, displayedCount));
        
        console.log('[App] Setting up daily spotlight...');
        setupDailySpotlight();
        
        console.log('[App] Setting up event listeners...');
        setupEventListeners();
        
        console.log('[App] Setting up search...');
        setupSearch();
        
        console.log('[App] Setting up filters...');
        setupFilters();
        
        console.log('[App] Setting up modal...');
        setupModal();
        
        console.log('[App] Setting up load more...');
        setupLoadMore();
        
        console.log('[App] Setting up Chinese toggle...');
        setupChineseToggle();

        // Apply saved preference
        console.log('[App] Applying Chinese conversion...');
        ChineseConverter.applyToPage();

        // Setup offline detection
        console.log('[App] Setting up offline detection...');
        setupOfflineDetection();
        
        console.log('[App] Initialization complete!');
    } catch (error) {
        console.error('[App] Initialization failed:', error);
    }
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
    const dailyChinese = document.getElementById('dailyChinese');
    dailyChinese.dataset.original = proverb.cn;
    dailyChinese.textContent = ChineseConverter.convert(proverb.cn);
    document.getElementById('dailyPinyin').textContent = proverb.py;
    document.getElementById('dailyEnglish').textContent = proverb.en;
}

/**
 * Render proverbs to the grid
 */
function renderProverbs(proverbsToRender, append = false) {
    console.log('[renderProverbs] Rendering', proverbsToRender.length, 'proverbs, append:', append);
    const container = document.getElementById('proverbsContainer');
    
    if (!container) {
        console.error('[renderProverbs] Container not found!');
        return;
    }

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
        const isCantonese = proverb.cats ? proverb.cats.includes('cantonese') : proverb.cat === 'cantonese';
        const firstCat = proverb.cats ? proverb.cats[0] : (proverb.cat || '');
        const proverbId = getProverbId(proverb);
        const proverbIdStr = String(proverbId).replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const favClass = isFavorite(proverbId) ? 'is-favorite' : '';
        const heartIcon = isFavorite(proverbId) ? '♥' : '♡';
        const displayChinese = ChineseConverter.convert(proverb.cn);
        return `
            <article class="proverb-card ${isCantonese ? 'cantonese' : ''}" data-id="${proverbIdStr}">
                <div class="card-header">
                    <div class="card-header-left">
                        <span class="category-tag ${isCantonese ? 'cantonese' : ''}">${firstCat}</span>
                    </div>
                    <button class="favorite-btn ${favClass}" data-id="${proverbIdStr}" onclick="toggleFavorite('${proverbIdStr}', event)" aria-label="Toggle favorite">
                        <span class="heart-icon">${heartIcon}</span>
                    </button>
                </div>
                <p class="proverb-chinese" data-original="${proverb.cn}">${displayChinese}</p>
                <p class="proverb-pinyin">${proverb.py}</p>
                <p class="proverb-english">${proverb.en}</p>
                <div class="proverb-actions-card">
                    <div class="proverb-actions-left">
                        <button class="card-btn" onclick="copyProverb('${proverb.cn.replace(/'/g, "\\'")}', '${proverb.py.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}')">Copy</button>
                        <button class="card-btn" onclick="showProverbInModal('${proverb.cn.replace(/'/g, "\\'")}', '${proverb.py.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}', '${firstCat}', '${proverbIdStr}')">View</button>
                    </div>
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
        showProverbInModal(random.cn, random.py, random.en, random.cat, random.id);
    });

    // Favorite button in modal
    document.getElementById('favoriteModalBtn').addEventListener('click', () => {
        const modalContent = document.getElementById('proverbModal').querySelector('.modal-content');
        const proverbId = parseInt(modalContent.dataset.proverbId);
        if (proverbId) {
            toggleFavorite(proverbId);
            updateModalFavoriteButton(proverbId);
        }
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

    // Determine the base set to search from based on current filter
    let baseProverbs;
    if (currentFilter === 'all') {
        baseProverbs = allProverbs;
    } else if (currentFilter === 'favorites') {
        baseProverbs = getFavoriteProverbs();
    } else {
        baseProverbs = allProverbs.filter(p => p.cats ? p.cats.includes(currentFilter) : p.cat === currentFilter);
    }

    const filtered = baseProverbs.filter(p =>
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
    console.log('[Filters] Found', filterButtons.length, 'filter buttons');
    
    if (filterButtons.length === 0) {
        console.error('[Filters] NO FILTER BUTTONS FOUND!');
        return;
    }

    filterButtons.forEach((btn, index) => {
        console.log('[Filters] Attaching listener to button', index, ':', btn.dataset.filter);
        
        // Simple click handler
        btn.onclick = function(e) {
            console.log('[Filters] Button CLICKED:', btn.dataset.filter);
            
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Apply filter
            const filter = btn.dataset.filter;
            currentFilter = filter;
            displayedCount = 24;
            applyFilter(filter);
            
            return false; // Prevent default
        };
    });
    
    console.log('[Filters] onclick handlers attached to all buttons');
}

/**
 * Apply category filter
 */
function applyFilter(filter) {
    console.log('[applyFilter] Applying filter:', filter);
    
    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    if (filter === 'all') {
        console.log('[applyFilter] Showing all proverbs');
        currentProverbs = [...allProverbs];
    } else if (filter === 'favorites') {
        console.log('[applyFilter] Showing favorites');
        currentProverbs = getFavoriteProverbs();
    } else {
        console.log('[applyFilter] Filtering by category:', filter);
        console.log('[applyFilter] allProverbs length:', allProverbs.length);
        currentProverbs = allProverbs.filter(p => {
            const hasCats = p.cats && Array.isArray(p.cats);
            const hasCat = p.cat !== undefined;
            if (hasCats) return p.cats.includes(filter);
            if (hasCat) return p.cat === filter;
            return false;
        });
        console.log('[applyFilter] Filtered count:', currentProverbs.length);
    }
    
    console.log('[applyFilter] Rendering', currentProverbs.length, 'proverbs');
    renderProverbs(currentProverbs.slice(0, displayedCount));
    updateShowingCount();
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
function showProverbInModal(chinese, pinyin, english, category, proverbId) {
    const modal = document.getElementById('proverbModal');
    const categoryEl = document.getElementById('modalCategory');
    const modalContent = modal.querySelector('.modal-content');
    const modalChinese = document.getElementById('modalChinese');

    // Store the proverb ID for the favorite button
    if (proverbId) {
        modalContent.dataset.proverbId = proverbId;
    }

    // Store original and apply conversion
    modalChinese.dataset.original = chinese;
    modalChinese.textContent = ChineseConverter.convert(chinese);

    document.getElementById('modalPinyin').textContent = pinyin;
    document.getElementById('modalEnglish').textContent = english;

    categoryEl.textContent = category;
    categoryEl.className = 'modal-category' + (category === 'cantonese' ? ' cantonese' : '');

    // Update favorite button state if ID is provided
    if (proverbId) {
        updateModalFavoriteButton(proverbId);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Update the modal favorite button UI
 */
function updateModalFavoriteButton(proverbId) {
    const btn = document.getElementById('favoriteModalBtn');
    if (!btn) return;
    
    const isFav = isFavorite(proverbId);
    btn.classList.toggle('is-favorite', isFav);
    btn.innerHTML = `<span class="heart-icon">${isFav ? '♥' : '♡'}</span> ${isFav ? 'Favorited' : 'Favorite'}`;
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
    showProverbInModal(random.cn, random.py, random.en, random.cat, getProverbId(random));
}

/**
 * Show random proverb in daily spotlight
 */
function showRandomDailyProverb() {
    const random = allProverbs[Math.floor(Math.random() * allProverbs.length)];
    updateDailySpotlight(random);
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

/**
 * Setup offline/online detection
 */
function setupOfflineDetection() {
    const offlineIndicator = document.getElementById('offlineIndicator');

    // Check initial state
    updateOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    function updateOnlineStatus() {
        if (navigator.onLine) {
            // Online - hide indicator
            offlineIndicator.classList.remove('show');
            document.body.classList.remove('offline-mode');
            console.log('[App] Connection restored');
        } else {
            // Offline - show indicator
            offlineIndicator.classList.add('show');
            document.body.classList.add('offline-mode');
            console.log('[App] Gone offline - using cached content');
        }
    }
}

// Expose functions to global scope for inline onclick handlers
window.copyProverb = copyProverb;
window.showProverbInModal = showProverbInModal;
window.showRandomProverb = showRandomProverb;
window.showAbout = showAbout;
window.closeAbout = closeAbout;
window.showKeyboardShortcuts = showKeyboardShortcuts;
window.toggleFavorite = toggleFavorite;
