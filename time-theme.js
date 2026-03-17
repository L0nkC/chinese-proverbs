/**
 * Time-Based Greetings and Themes
 * Shows different greetings and subtle theme changes based on time of day
 */

const TimeBasedTheme = {
    /**
     * Get the current time period
     * @returns {string} - dawn, morning, afternoon, evening, night
     */
    getTimePeriod() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 7) return 'dawn';
        if (hour >= 7 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 20) return 'evening';
        return 'night';
    },

    /**
     * Get greeting message based on time period
     * @returns {Object} Greeting with chinese, pinyin, and english
     */
    getGreeting() {
        const period = this.getTimePeriod();
        
        const greetings = {
            dawn: {
                chinese: '清晨好',
                pinyin: 'qīng chén hǎo',
                english: 'Good Dawn',
                icon: '🌅',
                color: '#E8B86D'
            },
            morning: {
                chinese: '早上好',
                pinyin: 'zǎo shang hǎo',
                english: 'Good Morning',
                icon: '☀️',
                color: '#F4A460'
            },
            afternoon: {
                chinese: '下午好',
                pinyin: 'xià wǔ hǎo',
                english: 'Good Afternoon',
                icon: '🌤️',
                color: '#87CEEB'
            },
            evening: {
                chinese: '晚上好',
                pinyin: 'wǎn shang hǎo',
                english: 'Good Evening',
                icon: '🌇',
                color: '#FF6B6B'
            },
            night: {
                chinese: '晚安',
                pinyin: 'wǎn ān',
                english: 'Good Night',
                icon: '🌙',
                color: '#4A5568'
            }
        };
        
        return greetings[period];
    },

    /**
     * Get theme colors based on time period
     * @returns {Object} Color scheme for the time period
     */
    getThemeColors() {
        const period = this.getTimePeriod();
        
        const themes = {
            dawn: {
                primary: '#E8B86D',
                secondary: '#F5DEB3',
                accent: '#DEB887',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            morning: {
                primary: '#F4A460',
                secondary: '#FFE4B5',
                accent: '#DEB887',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            },
            afternoon: {
                primary: '#87CEEB',
                secondary: '#E0F6FF',
                accent: '#5F9EA0',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            },
            evening: {
                primary: '#FF6B6B',
                secondary: '#FFE4E1',
                accent: '#CD5C5C',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            },
            night: {
                primary: '#4A5568',
                secondary: '#2D3748',
                accent: '#1A202C',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }
        };
        
        return themes[period];
    },

    /**
     * Get a time-appropriate proverb recommendation
     * @returns {Object} Recommended proverb
     */
    getTimeProverb() {
        const period = this.getTimePeriod();
        
        const recommendations = {
            dawn: [
                { cn: '一年之计在于春', py: 'yī nián zhī jì zài yú chūn', en: 'The year\'s plan starts with spring.' },
                { cn: '一日之计在于晨', py: 'yī rì zhī jì zài yú chén', en: 'The day\'s plan starts with dawn.' },
                { cn: '早起的鸟儿有虫吃', py: 'zǎo qǐ de niǎo ér yǒu chóng chī', en: 'The early bird catches the worm.' }
            ],
            morning: [
                { cn: '千里之行，始于足下', py: 'qiān lǐ zhī xíng, shǐ yú zú xià', en: 'A journey of a thousand miles begins with a single step.' },
                { cn: '天道酬勤', py: 'tiān dào chóu qín', en: 'Heaven rewards the diligent.' },
                { cn: '锲而不舍', py: 'qiè ér bù shě', en: 'Persevere and never give up.' }
            ],
            afternoon: [
                { cn: '活到老，学到老', py: 'huó dào lǎo, xué dào lǎo', en: 'Live until old, learn until old.' },
                { cn: '学如不及，犹恐失之', py: 'xué rú bù jí, yóu kǒng shī zhī', en: 'Learn as if you cannot catch up.' },
                { cn: '温故而知新', py: 'wēn gù ér zhī xīn', en: 'Review the old to learn the new.' }
            ],
            evening: [
                { cn: '知足常乐', py: 'zhī zú cháng lè', en: 'Contentment brings happiness.' },
                { cn: '静以修身', py: 'jìng yǐ xiū shēn', en: 'Cultivate oneself through tranquility.' },
                { cn: '海纳百川', py: 'hǎi nà bǎi chuān', en: 'The sea accepts all rivers.' }
            ],
            night: [
                { cn: '宁静致远', py: 'níng jìng zhì yuǎn', en: 'Tranquility leads to profoundness.' },
                { cn: '三思而后行', py: 'sān sī ér hòu xíng', en: 'Think three times before you act.' },
                { cn: '明日复明日', py: 'míng rì fù míng rì', en: 'Tomorrow follows tomorrow.' }
            ]
        };
        
        const list = recommendations[period];
        return list[Math.floor(Math.random() * list.length)];
    },

    /**
     * Render the greeting banner
     */
    renderGreeting() {
        const container = document.getElementById('timeGreeting');
        if (!container) return;

        const greeting = this.getGreeting();
        const proverb = this.getTimeProverb();

        container.innerHTML = `
            <div class="time-greeting-content" style="--time-color: ${greeting.color}">
                <div class="time-greeting-icon">${greeting.icon}</div>
                <div class="time-greeting-text">
                    <div class="time-greeting-chinese">${greeting.chinese}</div>
                    <div class="time-greeting-pinyin">${greeting.pinyin}</div>
                </div>
            </div>
            <div class="time-proverb">
                <div class="time-proverb-label">适合此时的谚语 | Proverb for this moment</div>
                <div class="time-proverb-cn">${proverb.cn}</div>
                <div class="time-proverb-py">${proverb.py}</div>
                <div class="time-proverb-en">${proverb.en}</div>
            </div>
        `;

        container.style.display = 'block';
    },

    /**
     * Apply subtle theme changes based on time
     */
    applyTheme() {
        const colors = this.getThemeColors();
        const root = document.documentElement;
        
        // Set CSS custom properties for time-based colors
        root.style.setProperty('--time-primary', colors.primary);
        root.style.setProperty('--time-secondary', colors.secondary);
        root.style.setProperty('--time-accent', colors.accent);
        root.style.setProperty('--time-gradient', colors.gradient);
        
        // Add time-period class to body for CSS targeting
        document.body.classList.add(`time-${this.getTimePeriod()}`);
    },

    /**
     * Initialize the time-based theme
     */
    init() {
        this.renderGreeting();
        this.applyTheme();
        
        // Update every hour
        setInterval(() => {
            this.renderGreeting();
            this.applyTheme();
        }, 3600000);
        
        console.log('[TimeBasedTheme] Initialized for period:', this.getTimePeriod());
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    TimeBasedTheme.init();
});
