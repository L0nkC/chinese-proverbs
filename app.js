/**
 * Chinese Proverbs - Application Logic
 * Enhanced with Pinyin, Cantonese support, and improved UI
 */

// ============================================
// AUDIO PRONUNCIATION MANAGER (Web Speech API)
// ============================================

const AudioManager = {
    synth: null,
    currentUtterance: null,
    isPlaying: false,
    currentLanguage: null,

    /**
     * Initialize the audio manager
     */
    init() {
        if ('speechSynthesis' in window) {
            this.synth = window.speechSynthesis;
            // Load voices when available
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = () => this.loadVoices();
            }
            this.loadVoices();
        } else {
            console.warn('Web Speech API not supported in this browser');
        }
    },

    /**
     * Load available voices
     */
    loadVoices() {
        this.voices = this.synth.getVoices();
        // Find Chinese voices
        this.mandarinVoice = this.voices.find(v => 
            v.lang.includes('zh-CN') || v.lang.includes('zh-Hans') || v.lang.includes('zh')
        );
        this.cantoneseVoice = this.voices.find(v => 
            v.lang.includes('zh-HK') || v.lang.includes('zh-TW') || v.lang.includes('zh-Hant')
        );
    },

    /**
     * Get the best voice for a language
     */
    getVoice(language) {
        // Reload voices if needed (some browsers load async)
        if (!this.voices || this.voices.length === 0) {
            this.loadVoices();
        }

        if (language === 'cantonese') {
            // Try to find a Cantonese voice first
            return this.voices.find(v => v.lang.includes('zh-HK')) ||
                   this.voices.find(v => v.lang.includes('zh-TW')) ||
                   this.voices.find(v => v.lang.includes('zh-Hant')) ||
                   this.mandarinVoice ||
                   this.voices[0];
        } else {
            // Mandarin - prefer Chinese voices
            return this.voices.find(v => v.lang.includes('zh-CN')) ||
                   this.voices.find(v => v.lang.includes('zh')) ||
                   this.voices[0];
        }
    },

    /**
     * Play audio for given text
     */
    play(text, language = 'mandarin') {
        if (!this.synth) {
            showToast('Audio not supported in your browser');
            return false;
        }

        // Cancel any ongoing speech
        this.stop();

        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = this.getVoice(language);
        
        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
        } else {
            // Fallback to language codes
            utterance.lang = language === 'cantonese' ? 'zh-HK' : 'zh-CN';
        }

        // Set properties
        utterance.rate = 0.8; // Slightly slower for clarity
        utterance.pitch = 1;
        utterance.volume = 1;

        // Events
        utterance.onstart = () => {
            this.isPlaying = true;
            this.currentLanguage = language;
            updateAudioUI(true, language);
        };

        utterance.onend = () => {
            this.isPlaying = false;
            this.currentLanguage = null;
            updateAudioUI(false, language);
        };

        utterance.onerror = (e) => {
            console.error('Speech synthesis error:', e);
            this.isPlaying = false;
            this.currentLanguage = null;
            updateAudioUI(false, language);
            showToast('Audio playback failed. Please try again.');
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
        
        return true;
    },

    /**
     * Stop current audio
     */
    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
        this.isPlaying = false;
        this.currentLanguage = null;
    },

    /**
     * Check if audio is supported
     */
    isSupported() {
        return 'speechSynthesis' in window;
    }
};

/**
 * Update audio UI state
 */
function updateAudioUI(isPlaying, language) {
    const statusEl = document.getElementById('audioStatus');
    
    // Update modal buttons
    const mandarinBtn = document.getElementById('playMandarinBtn');
    const cantoneseBtn = document.getElementById('playCantoneseBtn');
    
    if (mandarinBtn) {
        mandarinBtn.classList.toggle('playing', isPlaying && language === 'mandarin');
    }
    if (cantoneseBtn) {
        cantoneseBtn.classList.toggle('playing', isPlaying && language === 'cantonese');
    }
    
    // Update status text
    if (statusEl) {
        if (isPlaying) {
            statusEl.textContent = language === 'cantonese' ? 'Playing Cantonese...' : 'Playing Mandarin...';
        } else {
            statusEl.textContent = '';
        }
    }

    // Update card speaker buttons
    document.querySelectorAll('.speaker-btn').forEach(btn => {
        btn.classList.remove('playing');
    });
}

/**
 * Play audio for the current proverb in modal
 */
function playAudio(language) {
    const modalChinese = document.getElementById('modalChinese');
    if (!modalChinese) return;
    
    const text = modalChinese.dataset.original || modalChinese.textContent;
    
    // Check if already playing this language
    if (AudioManager.isPlaying && AudioManager.currentLanguage === language) {
        AudioManager.stop();
        updateAudioUI(false, language);
        return;
    }
    
    const success = AudioManager.play(text, language);
    if (success) {
        updateAudioUI(true, language);
    }
}

/**
 * Play audio for a card speaker button
 */
function playCardAudio(text, btnElement) {
    if (!AudioManager.isSupported()) {
        showToast('Audio not supported in your browser');
        return;
    }
    
    // Check if already playing
    if (AudioManager.isPlaying && btnElement.classList.contains('playing')) {
        AudioManager.stop();
        btnElement.classList.remove('playing');
        return;
    }
    
    // Remove playing state from all buttons
    document.querySelectorAll('.speaker-btn').forEach(btn => btn.classList.remove('playing'));
    
    // Play the audio
    const success = AudioManager.play(text, 'mandarin');
    if (success) {
        btnElement.classList.add('playing');
        
        // Remove playing state when done
        const originalOnEnd = AudioManager.currentUtterance.onend;
        AudioManager.currentUtterance.onend = () => {
            btnElement.classList.remove('playing');
            AudioManager.isPlaying = false;
            AudioManager.currentLanguage = null;
            if (originalOnEnd) originalOnEnd();
        };
    }
}

// ============================================
// CHINESE CHARACTER CONVERSION (Simplified <-> Traditional)
// ============================================

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
 * Share Image Generator for Social Media
 * Creates beautiful image cards for sharing
 */

const ShareCardGenerator = {
    currentImageData: null,
    currentProverb: null,

    /**
     * Initialize share functionality
     */
    init() {
        this.setupEventListeners();
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Share button in modal
        const shareImageBtn = document.getElementById('shareImageBtn');
        if (shareImageBtn) {
            shareImageBtn.addEventListener('click', () => this.generateShareImage());
        }

        // Download button in preview modal
        const downloadBtn = document.getElementById('downloadImageBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadImage());
        }

        // Copy image button
        const copyImageBtn = document.getElementById('copyImageBtn');
        if (copyImageBtn) {
            copyImageBtn.addEventListener('click', () => this.copyImageToClipboard());
        }
    },

    /**
     * Generate share image from current modal content
     */
    async generateShareImage() {
        const chinese = document.getElementById('modalChinese').textContent;
        const pinyin = document.getElementById('modalPinyin').textContent;
        const english = document.getElementById('modalEnglish').textContent;

        if (!chinese || !pinyin || !english) {
            showToast('No proverb to share');
            return;
        }

        this.currentProverb = { chinese, pinyin, english };

        // Show loading toast
        showToast('Generating image...');

        try {
            // Update the share card content
            document.getElementById('shareCardChinese').textContent = chinese;
            document.getElementById('shareCardPinyin').textContent = pinyin;
            document.getElementById('shareCardEnglish').textContent = english;

            // Wait for fonts to load
            await document.fonts.ready;

            // Small delay to ensure rendering
            await new Promise(resolve => setTimeout(resolve, 100));

            // Generate image using html2canvas
            const shareCard = document.getElementById('shareCard');
            const canvas = await html2canvas(shareCard, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                width: 600,
                height: 800
            });

            // Convert to image data
            this.currentImageData = canvas.toDataURL('image/png', 1.0);

            // Show preview modal
            this.showPreviewModal();

        } catch (error) {
            console.error('Error generating share image:', error);
            showToast('Failed to generate image. Please try again.');
        }
    },

    /**
     * Show the preview modal with the generated image
     */
    showPreviewModal() {
        const modal = document.getElementById('sharePreviewModal');
        const previewImage = document.getElementById('sharePreviewImage');

        if (previewImage && this.currentImageData) {
            previewImage.src = this.currentImageData;
        }

        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Close the preview modal
     */
    closePreviewModal() {
        const modal = document.getElementById('sharePreviewModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /**
     * Download the generated image
     */
    downloadImage() {
        if (!this.currentImageData || !this.currentProverb) {
            showToast('No image to download');
            return;
        }

        // Create a safe filename from the Chinese text
        const safeChinese = this.currentProverb.chinese
            .replace(/[^\u4e00-\u9fa5]/g, '')
            .substring(0, 10);
        const filename = `chinese-proverb-${safeChinese || 'wisdom'}.png`;

        // Create download link
        const link = document.createElement('a');
        link.href = this.currentImageData;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Image downloaded!');
        this.closePreviewModal();
    },

    /**
     * Copy image to clipboard
     */
    async copyImageToClipboard() {
        if (!this.currentImageData) {
            showToast('No image to copy');
            return;
        }

        try {
            // Convert data URL to blob
            const response = await fetch(this.currentImageData);
            const blob = await response.blob();

            // Try to use Clipboard API with image
            if (navigator.clipboard && navigator.clipboard.write) {
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                showToast('Image copied to clipboard!');
                this.closePreviewModal();
            } else {
                // Fallback - copy as text
                const textToCopy = `"${this.currentProverb.chinese}" (${this.currentProverb.pinyin}) - ${this.currentProverb.english}`;
                await navigator.clipboard.writeText(textToCopy);
                showToast('Proverb text copied! Image copy not supported in this browser.');
            }
        } catch (error) {
            console.error('Error copying image:', error);
            // Fallback to copying text
            const textToCopy = `"${this.currentProverb.chinese}" (${this.currentProverb.pinyin}) - ${this.currentProverb.english}`;
            navigator.clipboard.writeText(textToCopy)
                .then(() => showToast('Proverb text copied!'))
                .catch(() => showToast('Failed to copy'));
        }
    },

    /**
     * Generate and share directly (for card buttons)
     */
    async shareFromCard(chinese, pinyin, english) {
        this.currentProverb = { chinese, pinyin, english };

        // Update the share card content
        document.getElementById('shareCardChinese').textContent = chinese;
        document.getElementById('shareCardPinyin').textContent = pinyin;
        document.getElementById('shareCardEnglish').textContent = english;

        showToast('Generating image...');

        try {
            await document.fonts.ready;
            await new Promise(resolve => setTimeout(resolve, 100));

            const shareCard = document.getElementById('shareCard');
            const canvas = await html2canvas(shareCard, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                width: 600,
                height: 800
            });

            this.currentImageData = canvas.toDataURL('image/png', 1.0);
            this.showPreviewModal();

        } catch (error) {
            console.error('Error generating share image:', error);
            showToast('Failed to generate image');
        }
    }
};

/**
 * Close share preview modal (global function for onclick)
 */
function closeSharePreview() {
    ShareCardGenerator.closePreviewModal();
}

// Expose to global scope
window.closeSharePreview = closeSharePreview;
window.shareFromCard = (chinese, pinyin, english) => {
    ShareCardGenerator.shareFromCard(chinese, pinyin, english);
};

/**
 * Play audio for daily spotlight
 */
function playDailyAudio() {
    const dailyChinese = document.getElementById('dailyChinese');
    if (!dailyChinese) return;
    
    const text = dailyChinese.dataset.original || dailyChinese.textContent;
    const btn = document.getElementById('dailySpeakerBtn');
    
    if (!AudioManager.isSupported()) {
        showToast('Audio not supported in your browser');
        return;
    }
    
    // Check if already playing
    if (AudioManager.isPlaying && btn.classList.contains('playing')) {
        AudioManager.stop();
        btn.classList.remove('playing');
        return;
    }
    
    // Remove playing state from all buttons
    document.querySelectorAll('.speaker-btn, .spotlight-speaker-btn').forEach(btn => btn.classList.remove('playing'));
    
    // Play the audio
    const success = AudioManager.play(text, 'mandarin');
    if (success) {
        btn.classList.add('playing');
        
        // Remove playing state when done
        const originalOnEnd = AudioManager.currentUtterance.onend;
        AudioManager.currentUtterance.onend = () => {
            btn.classList.remove('playing');
            AudioManager.isPlaying = false;
            AudioManager.currentLanguage = null;
            if (originalOnEnd) originalOnEnd();
        };
    }
}

/**
 * Initialize dark mode (placeholder for future implementation)
 */
function initDarkMode() {
    // Dark mode implementation can be added here
    // For now, this is a placeholder to prevent errors
}

/**
 * Initialize the application
 */
async function initializeApp() {
    // Initialize audio manager first
    AudioManager.init();
    
    // Initialize dark mode first
    initDarkMode();
    
    // Initialize Chinese converter first
    await ChineseConverter.init();

    // Store original Chinese text for conversion
    storeOriginalText();

    // Load favorites from localStorage
    loadFavorites();

    // Initialize share card generator
    ShareCardGenerator.init();

    renderProverbs(currentProverbs.slice(0, displayedCount));
    setupDailySpotlight();
    setupEventListeners();
    setupSearch();
    setupFilters();
    setupModal();
    setupLoadMore();
    setupChineseToggle();

    // Apply saved preference
    ChineseConverter.applyToPage();

    // Setup offline detection
    setupOfflineDetection();
    
    // Initialize keyboard navigation
    KeyboardNavigation.init();
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
        const isCantonese = proverb.cats ? proverb.cats.includes('cantonese') : proverb.cat === 'cantonese';
        const firstCat = proverb.cats ? proverb.cats[0] : (proverb.cat || 'wisdom');
        const proverbId = getProverbId(proverb);
        const proverbIdStr = String(proverbId).replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const favClass = isFavorite(proverbId) ? 'is-favorite' : '';
        const heartIcon = isFavorite(proverbId) ? '♥' : '♡';
        const displayChinese = ChineseConverter.convert(proverb.cn);
        const safeChinese = proverb.cn.replace(/'/g, "\\'");
        const hasStory = proverb.story ? true : false;
        const storyBadge = hasStory ? '<span class="story-badge" title="Has origin story">📜</span>' : '';
        const storyData = hasStory ? `data-story-title="${proverb.story.title.replace(/"/g, '&quot;')}" data-story-content="${proverb.story.content.replace(/"/g, '&quot;').replace(/\n/g, '\\n')}"` : '';
        return `
            <article class="proverb-card ${isCantonese ? 'cantonese' : ''}" data-id="${proverbIdStr}" ${storyData}>
                <div class="card-header">
                    <div class="card-header-left">
                        <span class="category-tag ${isCantonese ? 'cantonese' : ''}">${firstCat}</span>
                    </div>
                    <div class="card-header-actions">
                        ${storyBadge}
                        <button class="speaker-btn" onclick="playCardAudio('${safeChinese}', this)" aria-label="Play pronunciation">
                            🔊
                        </button>
                        <button class="favorite-btn ${favClass}" data-id="${proverbIdStr}" onclick="toggleFavorite('${proverbIdStr}', event)" aria-label="Toggle favorite">
                            <span class="heart-icon">${heartIcon}</span>
                        </button>
                    </div>
                </div>
                <p class="proverb-chinese" data-original="${proverb.cn}">${displayChinese}</p>
                <p class="proverb-pinyin">${proverb.py}</p>
                <p class="proverb-english">${proverb.en}</p>
                <div class="proverb-actions-card">
                    <div class="proverb-actions-left">
                        <button class="card-btn" onclick="copyProverb('${proverb.cn.replace(/'/g, "\\'")}', '${proverb.py.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}')">Copy</button>
                        <button class="card-btn" onclick="showProverbInModal('${proverb.cn.replace(/'/g, "\\'")}', '${proverb.py.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}', '${firstCat}', '${proverbIdStr}')">View</button>
                        <button class="card-btn share-card-btn" onclick="shareFromCard('${proverb.cn.replace(/'/g, "\\'")}', '${proverb.py.replace(/'/g, "\\'")}', '${proverb.en.replace(/'/g, "\\'")}')">📷 Share</button>
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
        btn.addEventListener('click', () => {
            closeModal();
            closeAbout();
            closeSharePreview();
            
            // Restore focus to the last focused card if using keyboard nav
            if (KeyboardNavigation.focusedCardIndex >= 0 && KeyboardNavigation.cards[KeyboardNavigation.focusedCardIndex]) {
                setTimeout(() => {
                    KeyboardNavigation.cards[KeyboardNavigation.focusedCardIndex].focus();
                }, 100);
            }
        });
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
    const searchClear = document.getElementById('searchClear');
    const searchHistory = document.getElementById('searchHistory');
    const clearHistoryBtn = document.getElementById('clearHistory');
    
    let debounceTimer;
    
    // Initialize search history
    loadSearchHistory();
    
    // Input event with debounce
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // Show/hide clear button
        searchClear.classList.toggle('show', value.length > 0);
        searchInput.classList.toggle('has-value', value.length > 0);
        
        // Debounce search
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(value);
        }, 300);
    });
    
    // Focus event - show history
    searchInput.addEventListener('focus', () => {
        if (searchHistoryList.length > 0) {
            showSearchHistory();
        }
    });
    
    // Blur event - hide history (with delay to allow clicks)
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            hideSearchHistory();
        }, 200);
    });
    
    // Clear button
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.remove('show');
        searchInput.classList.remove('has-value');
        searchInput.focus();
        performSearch('');
    });
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', () => {
        clearSearchHistory();
    });
    
    // Hide history when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            hideSearchHistory();
        }
    });
}

// Search history management
let searchHistoryList = [];
const SEARCH_HISTORY_KEY = 'chinese_proverbs_search_history';
const MAX_HISTORY_ITEMS = 5;

/**
 * Load search history from localStorage
 */
function loadSearchHistory() {
    try {
        const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
        if (saved) {
            searchHistoryList = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading search history:', e);
        searchHistoryList = [];
    }
}

/**
 * Save search history to localStorage
 */
function saveSearchHistory() {
    try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistoryList));
    } catch (e) {
        console.error('Error saving search history:', e);
    }
}

/**
 * Add a search term to history
 */
function addToSearchHistory(query) {
    if (!query || query.trim().length === 0) return;
    
    const trimmed = query.trim();
    
    // Remove if already exists
    searchHistoryList = searchHistoryList.filter(item => item.toLowerCase() !== trimmed.toLowerCase());
    
    // Add to front
    searchHistoryList.unshift(trimmed);
    
    // Keep only max items
    if (searchHistoryList.length > MAX_HISTORY_ITEMS) {
        searchHistoryList = searchHistoryList.slice(0, MAX_HISTORY_ITEMS);
    }
    
    saveSearchHistory();
}

/**
 * Remove a search term from history
 */
function removeFromSearchHistory(query) {
    searchHistoryList = searchHistoryList.filter(item => item !== query);
    saveSearchHistory();
    renderSearchHistory();
}

/**
 * Clear all search history
 */
function clearSearchHistory() {
    searchHistoryList = [];
    saveSearchHistory();
    renderSearchHistory();
    hideSearchHistory();
}

/**
 * Show search history dropdown
 */
function showSearchHistory() {
    const searchHistory = document.getElementById('searchHistory');
    renderSearchHistory();
    if (searchHistoryList.length > 0) {
        searchHistory.classList.add('show');
    }
}

/**
 * Hide search history dropdown
 */
function hideSearchHistory() {
    const searchHistory = document.getElementById('searchHistory');
    searchHistory.classList.remove('show');
}

/**
 * Render search history list
 */
function renderSearchHistory() {
    const listEl = document.getElementById('searchHistoryList');
    
    if (searchHistoryList.length === 0) {
        listEl.innerHTML = '<div class="search-history-empty">No recent searches</div>';
        return;
    }
    
    listEl.innerHTML = searchHistoryList.map(query => `
        <div class="search-history-item" data-query="${escapeHtml(query)}">
            <span class="search-history-text">
                <span class="search-history-icon">⌕</span>
                ${escapeHtml(query)}
            </span>
            <button class="search-history-delete" data-query="${escapeHtml(query)}" aria-label="Remove from history">
                ×
            </button>
        </div>
    `).join('');
    
    // Add click handlers
    listEl.querySelectorAll('.search-history-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('search-history-delete')) {
                e.stopPropagation();
                removeFromSearchHistory(item.dataset.query);
            } else {
                const query = item.dataset.query;
                document.getElementById('searchInput').value = query;
                document.getElementById('searchClear').classList.add('show');
                document.getElementById('searchInput').classList.add('has-value');
                performSearch(query);
                hideSearchHistory();
            }
        });
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Store current search query for highlighting
let currentSearchQuery = '';

/**
 * Perform search
 */
function performSearch(query) {
    currentSearchQuery = query.toLowerCase().trim();
    
    if (!currentSearchQuery) {
        displayedCount = 24;
        applyFilter(currentFilter);
        return;
    }
    
    // Add to search history
    addToSearchHistory(query);
    
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
        matchesSearch(p, currentSearchQuery)
    );
    
    currentProverbs = filtered;
    renderProverbs(filtered, false, currentSearchQuery);
}

/**
 * Check if a proverb matches the search query
 * Supports Chinese, Pinyin (with tone-insensitive matching), and English
 */
function matchesSearch(proverb, query) {
    // Direct Chinese character match
    if (proverb.cn.includes(query)) return true;
    
    // English match
    if (proverb.en.toLowerCase().includes(query)) return true;
    
    // Pinyin matching - handle both exact and tone-insensitive
    const pinyinLower = proverb.py.toLowerCase();
    
    // Exact pinyin match
    if (pinyinLower.includes(query)) return true;
    
    // Tone-insensitive pinyin match (remove tone numbers and diacritics)
    const normalizedPinyin = normalizePinyin(proverb.py);
    const normalizedQuery = normalizePinyin(query);
    
    if (normalizedPinyin.includes(normalizedQuery)) return true;
    
    // Also check if query without spaces matches pinyin
    const pinyinNoSpaces = normalizedPinyin.replace(/\s/g, '');
    const queryNoSpaces = normalizedQuery.replace(/\s/g, '');
    
    if (pinyinNoSpaces.includes(queryNoSpaces)) return true;
    
    return false;
}

/**
 * Normalize pinyin by removing tone marks and converting to lowercase
 */
function normalizePinyin(pinyin) {
    return pinyin
        .toLowerCase()
        .replace(/[āáǎà]/g, 'a')
        .replace(/[ēéěè]/g, 'e')
        .replace(/[īíǐì]/g, 'i')
        .replace(/[ōóǒò]/g, 'o')
        .replace(/[ūúǔù]/g, 'u')
        .replace(/[ǖǘǚǜ]/g, 'u');
}

/**
 * Highlight matching text in a string
 */
function highlightText(text, query) {
    if (!query || query.trim().length === 0) return escapeHtml(text);
    
    // Escape the text first
    const escaped = escapeHtml(text);
    
    // Create regex for matching (escape special regex chars in query)
    const escapedQuery = escapeRegExp(query);
    
    // Try exact match first
    let regex = new RegExp(`(${escapedQuery})`, 'gi');
    let highlighted = escaped.replace(regex, '<span class="search-highlight">$1</span>');
    
    // If no match, try normalized pinyin matching
    if (highlighted === escaped) {
        // For pinyin, we need to match tone-insensitively
        // This is a simplified approach - highlight if the normalized version matches
        const normalizedQuery = normalizePinyin(query);
        if (normalizedQuery !== query.toLowerCase()) {
            // Try to highlight based on normalized match
            const normalizedText = normalizePinyin(text);
            // This is tricky because we need to highlight the original, not normalized
            // For now, we'll skip pinyin-specific highlighting
        }
    }
    
    return highlighted;
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
    } else if (filter === 'favorites') {
        currentProverbs = getFavoriteProverbs();
    } else {
        currentProverbs = allProverbs.filter(p => p.cats ? p.cats.includes(filter) : p.cat === filter);
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

    // Close on Escape key - enhanced to restore focus
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modalActive = document.getElementById('proverbModal')?.classList.contains('active');
            const aboutActive = document.getElementById('aboutModal')?.classList.contains('active');
            const shareActive = document.getElementById('sharePreviewModal')?.classList.contains('active');
            
            if (modalActive || aboutActive || shareActive) {
                e.preventDefault();
                closeModal();
                closeAbout();
                closeSharePreview();
                
                // Restore focus to the last focused card if using keyboard nav
                if (KeyboardNavigation.focusedCardIndex >= 0 && KeyboardNavigation.cards[KeyboardNavigation.focusedCardIndex]) {
                    setTimeout(() => {
                        KeyboardNavigation.cards[KeyboardNavigation.focusedCardIndex].focus();
                    }, 100);
                }
            }
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
    const cantoneseBtn = document.getElementById('playCantoneseBtn');
    
    // Reset audio state
    AudioManager.stop();
    updateAudioUI(false);

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
    
    // Show/hide Cantonese button based on proverb type
    if (cantoneseBtn) {
        const isCantonese = category === 'cantonese' || 
                           (proverbs.find(p => p.cn === chinese)?.cats?.includes('cantonese'));
        cantoneseBtn.style.display = isCantonese ? 'inline-flex' : 'none';
    }

    // Handle story display
    const storySection = document.getElementById('storySection');
    const storyToggle = document.getElementById('storyToggle');
    const storyContent = document.getElementById('storyContent');
    const storyTitle = document.getElementById('storyTitle');
    const storyText = document.getElementById('storyText');
    
    // Find the proverb to get story data
    const proverb = allProverbs.find(p => p.cn === chinese);
    
    if (proverb && proverb.story) {
        // This proverb has a story
        storySection.style.display = 'block';
        storyTitle.textContent = proverb.story.title;
        storyText.textContent = proverb.story.content;
        
        // Reset toggle state
        storyToggle.classList.remove('expanded');
        storyContent.classList.remove('expanded');
        storyToggle.querySelector('.story-toggle-text').textContent = 'Origin Story';
    } else {
        // No story - hide the section
        storySection.style.display = 'none';
    }

    // Update favorite button state if ID is provided
    if (proverbId) {
        updateModalFavoriteButton(proverbId);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Toggle story expansion in modal
 */
function toggleStory() {
    const storyToggle = document.getElementById('storyToggle');
    const storyContent = document.getElementById('storyContent');
    const toggleText = storyToggle.querySelector('.story-toggle-text');
    
    const isExpanded = storyContent.classList.contains('expanded');
    
    if (isExpanded) {
        storyContent.classList.remove('expanded');
        storyToggle.classList.remove('expanded');
        toggleText.textContent = 'Origin Story';
    } else {
        storyContent.classList.add('expanded');
        storyToggle.classList.add('expanded');
        toggleText.textContent = 'Hide Story';
    }
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
    
    // Stop any playing audio
    AudioManager.stop();
    updateAudioUI(false);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

const KeyboardNavigation = {
    focusedCardIndex: -1,
    cards: [],
    filterButtons: [],
    isSearchFocused: false,
    
    /**
     * Initialize keyboard navigation
     */
    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.addSkipLink();
        this.addKeyboardHint();
    },
    
    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    },
    
    /**
     * Setup keyboard event listeners
     */
    setupEventListeners() {
        // Track search focus
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                this.isSearchFocused = true;
            });
            searchInput.addEventListener('blur', () => {
                this.isSearchFocused = false;
            });
        }
        
        // Global keyboard handler
        document.addEventListener('keydown', (e) => {
            // Don't handle if user is typing in search
            if (this.isSearchFocused) {
                // Allow Escape to blur search and return to cards
                if (e.key === 'Escape') {
                    searchInput.blur();
                    e.preventDefault();
                }
                return;
            }
            
            // Don't handle if modal is open (modal has its own handlers)
            const modal = document.getElementById('proverbModal');
            const aboutModal = document.getElementById('aboutModal');
            if (modal?.classList.contains('active') || aboutModal?.classList.contains('active')) {
                return;
            }
            
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateCards(1);
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateCards(-1);
                    break;
                    
                case 'Enter':
                    if (this.focusedCardIndex >= 0) {
                        e.preventDefault();
                        this.openFocusedCard();
                    }
                    break;
                    
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    e.preventDefault();
                    this.switchCategory(parseInt(e.key));
                    break;
                    
                case '?':
                    e.preventDefault();
                    this.showShortcuts();
                    break;
                    
                case '/':
                    e.preventDefault();
                    searchInput?.focus();
                    break;
            }
        });
        
        // Update cards list when DOM changes
        const observer = new MutationObserver(() => {
            this.updateCardsList();
        });
        
        const container = document.getElementById('proverbsContainer');
        if (container) {
            observer.observe(container, { childList: true, subtree: true });
        }
        
        // Initial update
        this.updateCardsList();
    },
    
    /**
     * Update the list of navigable cards
     */
    updateCardsList() {
        this.cards = Array.from(document.querySelectorAll('.proverb-card'));
        
        // Add tabindex to cards if not already present
        this.cards.forEach((card, index) => {
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `Proverb ${index + 1}: ${card.querySelector('.proverb-chinese')?.textContent || ''}`);
            }
            
            // Add click handler for opening modal
            card.addEventListener('click', () => {
                const chinese = card.querySelector('.proverb-chinese')?.dataset.original || '';
                const pinyin = card.querySelector('.proverb-pinyin')?.textContent || '';
                const english = card.querySelector('.proverb-english')?.textContent || '';
                const categoryTag = card.querySelector('.category-tag');
                const category = categoryTag ? categoryTag.textContent : '';
                const proverbId = card.dataset.id;
                
                showProverbInModal(chinese, pinyin, english, category, proverbId);
            });
        });
    },
    
    /**
     * Navigate between cards
     */
    navigateCards(direction) {
        if (this.cards.length === 0) return;
        
        // Remove focus from current card
        if (this.focusedCardIndex >= 0 && this.cards[this.focusedCardIndex]) {
            this.cards[this.focusedCardIndex].classList.remove('focused');
        }
        
        // Calculate new index
        this.focusedCardIndex += direction;
        
        // Wrap around
        if (this.focusedCardIndex < 0) {
            this.focusedCardIndex = this.cards.length - 1;
        } else if (this.focusedCardIndex >= this.cards.length) {
            this.focusedCardIndex = 0;
        }
        
        // Focus new card
        const newCard = this.cards[this.focusedCardIndex];
        if (newCard) {
            newCard.classList.add('focused');
            newCard.focus();
            newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },
    
    /**
     * Open modal for focused card
     */
    openFocusedCard() {
        if (this.focusedCardIndex < 0 || this.focusedCardIndex >= this.cards.length) return;
        
        const card = this.cards[this.focusedCardIndex];
        const chinese = card.querySelector('.proverb-chinese')?.dataset.original || '';
        const pinyin = card.querySelector('.proverb-pinyin')?.textContent || '';
        const english = card.querySelector('.proverb-english')?.textContent || '';
        const categoryTag = card.querySelector('.category-tag');
        const category = categoryTag ? categoryTag.textContent : '';
        const proverbId = card.dataset.id;
        
        showProverbInModal(chinese, pinyin, english, category, proverbId);
    },
    
    /**
     * Switch category by number (1-9)
     */
    switchCategory(num) {
        // Map numbers to filter buttons (1-9 correspond to first 9 categories)
        // Categories: all(0), wisdom(1), learning(2), perseverance(3), friendship(4), 
        //             life(5), love(6), business(7), family(8), health(9), cantonese(10), favorites(11)
        const index = num - 1; // Convert to 0-based
        
        if (index >= 0 && index < this.filterButtons.length) {
            const btn = this.filterButtons[index];
            if (btn) {
                btn.click();
                btn.focus();
                
                // Reset card focus when changing category
                this.focusedCardIndex = -1;
                this.cards.forEach(c => c.classList.remove('focused'));
                
                // Show toast
                const filterName = btn.querySelector('.btn-text')?.textContent || btn.dataset.filter;
                showToast(`Switched to: ${filterName}`);
            }
        }
    },
    
    /**
     * Add skip link for accessibility
     */
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#proverbsContainer';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to proverbs';
        document.body.prepend(skipLink);
    },
    
    /**
     * Add keyboard hint
     */
    addKeyboardHint() {
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.innerHTML = `
            <kbd>↑↓←→</kbd> Navigate &nbsp; 
            <kbd>Enter</kbd> Open &nbsp; 
            <kbd>1-9</kbd> Categories &nbsp; 
            <kbd>/</kbd> Search &nbsp; 
            <kbd>?</kbd> Help
        `;
        document.body.appendChild(hint);
        
        // Show hint briefly on first keyboard use
        let shown = false;
        const showHint = () => {
            if (!shown) {
                shown = true;
                hint.classList.add('visible');
                setTimeout(() => hint.classList.remove('visible'), 5000);
            }
        };
        
        document.addEventListener('keydown', showHint, { once: true });
    },
    
    /**
     * Show keyboard shortcuts
     */
    showShortcuts() {
        showToast('Shortcuts: ↑↓←→ Navigate | Enter Open | 1-9 Categories | / Search | ESC Close');
    }
};

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
    showToast('↑↓←→ Navigate | Enter Open | 1-9 Categories | / Search | ? Help | Esc Close');
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Don't handle if typing in search or if modal is open
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('proverbModal');
    const aboutModal = document.getElementById('aboutModal');
    
    if (document.activeElement === searchInput || 
        modal?.classList.contains('active') || 
        aboutModal?.classList.contains('active')) {
        return;
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput?.focus();
    }

    // Ctrl/Cmd + R for random proverb
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        showRandomProverb();
    }
    
    // / to focus search (vim-style)
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchInput?.focus();
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
window.playAudio = playAudio;
window.playCardAudio = playCardAudio;
window.playDailyAudio = playDailyAudio;
