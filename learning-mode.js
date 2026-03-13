/**
 * Spaced Repetition Learning Mode
 * Learn proverbs like flashcards with intelligent review scheduling
 */

const LearningMode = {
    db: null,
    currentCard: null,
    learningQueue: [],
    sessionStats: {
        started: null,
        reviewed: 0,
        correct: 0,
        streak: 0
    },
    
    // SM-2 algorithm intervals (in days)
    INTERVALS: {
        again: 0.5,    // 12 hours
        hard: 1,       // 1 day
        good: 3,       // 3 days
        easy: 7        // 1 week
    },
    
    /**
     * Initialize learning mode
     */
    init() {
        if (typeof firebase !== 'undefined' && firebase.apps.length) {
            this.db = firebase.firestore();
        }
        console.log('[LearningMode] Initialized');
    },
    
    /**
     * Start learning session
     */
    async startSession() {
        // Load user's learning progress
        const progress = await this.loadProgress();
        
        // Build queue of proverbs to review
        this.learningQueue = this.buildQueue(progress);
        
        if (this.learningQueue.length === 0) {
            this.showNoCardsMessage();
            return;
        }
        
        // Reset session stats
        this.sessionStats = {
            started: new Date(),
            reviewed: 0,
            correct: 0,
            streak: 0
        };
        
        // Show learning interface
        this.showLearningInterface();
        
        // Show first card
        this.showNextCard();
    },
    
    /**
     * Load user's learning progress
     */
    async loadProgress() {
        if (!UserAuth.currentUser) {
            // Load from localStorage
            return JSON.parse(localStorage.getItem('chinese_proverbs_learning') || '{}');
        }
        
        if (!this.db) return {};
        
        try {
            const doc = await this.db.collection('users').doc(UserAuth.currentUser.uid)
                .collection('learning').doc('progress').get();
            
            return doc.exists ? doc.data() : {};
        } catch (error) {
            console.error('[LearningMode] Load progress error:', error);
            return {};
        }
    },
    
    /**
     * Save learning progress
     */
    async saveProgress(proverbId, result) {
        const progress = await this.loadProgress();
        
        const now = new Date().toISOString();
        const card = progress[proverbId] || {
            id: proverbId,
            interval: 0,
            easeFactor: 2.5,
            repetitions: 0,
            nextReview: now,
            history: []
        };
        
        // Update card based on result using SM-2 algorithm
        const updatedCard = this.calculateNextReview(card, result);
        
        progress[proverbId] = updatedCard;
        
        // Save to storage
        if (!UserAuth.currentUser || !this.db) {
            localStorage.setItem('chinese_proverbs_learning', JSON.stringify(progress));
        } else {
            try {
                await this.db.collection('users').doc(UserAuth.currentUser.uid)
                    .collection('learning').doc('progress').set(progress);
            } catch (error) {
                console.error('[LearningMode] Save progress error:', error);
            }
        }
        
        return updatedCard;
    },
    
    /**
     * Calculate next review using SM-2 algorithm
     */
    calculateNextReview(card, result) {
        const now = new Date();
        
        card.history = card.history || [];
        card.history.push({
            date: now.toISOString(),
            result: result
        });
        
        // Keep only last 10 reviews
        if (card.history.length > 10) {
            card.history = card.history.slice(-10);
        }
        
        switch (result) {
            case 'again':
                card.repetitions = 0;
                card.interval = this.INTERVALS.again;
                card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
                break;
                
            case 'hard':
                card.repetitions += 1;
                card.interval = this.INTERVALS.hard;
                card.easeFactor = Math.max(1.3, card.easeFactor - 0.15);
                break;
                
            case 'good':
                card.repetitions += 1;
                if (card.repetitions === 1) {
                    card.interval = this.INTERVALS.good;
                } else if (card.repetitions === 2) {
                    card.interval = 6; // 6 days
                } else {
                    card.interval = Math.round(card.interval * card.easeFactor);
                }
                break;
                
            case 'easy':
                card.repetitions += 1;
                card.interval = this.INTERVALS.easy;
                card.easeFactor += 0.15;
                break;
        }
        
        // Calculate next review date
        const nextReview = new Date(now);
        nextReview.setDate(nextReview.getDate() + card.interval);
        card.nextReview = nextReview.toISOString();
        
        return card;
    },
    
    /**
     * Build queue of cards to review
     */
    buildQueue(progress) {
        const now = new Date();
        const queue = [];
        
        // Get all proverbs
        const allProverbs = window.allProverbs || [];
        
        // Find proverbs due for review
        allProverbs.forEach(proverb => {
            const card = progress[proverb.id];
            
            if (!card) {
                // New card - add to queue
                queue.push({ ...proverb, isNew: true });
            } else {
                const nextReview = new Date(card.nextReview);
                if (nextReview <= now) {
                    // Due for review
                    queue.push({ ...proverb, ...card, isReview: true });
                }
            }
        });
        
        // Shuffle queue
        return this.shuffleArray(queue);
    },
    
    /**
     * Shuffle array
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    /**
     * Show learning interface
     */
    showLearningInterface() {
        const modal = document.createElement('div');
        modal.className = 'learning-modal';
        modal.id = 'learningModal';
        modal.innerHTML = `
            <div class="learning-modal-overlay" onclick="LearningMode.confirmExit()"></div>
            <div class="learning-modal-content">
                <div class="learning-header">
                    <div class="learning-stats">
                        <span class="stat">📚 <span id="learningProgress">0</span>/${this.learningQueue.length}</span>
                        <span class="stat">🔥 Streak: <span id="learningStreak">0</span></span>
                        <span class="stat">✅ <span id="learningAccuracy">0%</span></span>
                    </div>
                    <button class="learning-close" onclick="LearningMode.confirmExit()">×</button>
                </div>
                
                <div class="learning-card-container" id="learningCardContainer">
                    <!-- Card content will be inserted here -->
                </div>
                
                <div class="learning-controls" id="learningControls" style="display: none;">
                    <div class="difficulty-buttons">
                        <button class="difficulty-btn again" onclick="LearningMode.rateCard('again')">
                            <span class="difficulty-label">Again</span>
                            <span class="difficulty-time"><12h</span>
                        </button>
                        <button class="difficulty-btn hard" onclick="LearningMode.rateCard('hard')">
                            <span class="difficulty-label">Hard</span>
                            <span class="difficulty-time">1d</span>
                        </button>
                        <button class="difficulty-btn good" onclick="LearningMode.rateCard('good')">
                            <span class="difficulty-label">Good</span>
                            <span class="difficulty-time">3d</span>
                        </button>
                        <button class="difficulty-btn easy" onclick="LearningMode.rateCard('easy')">
                            <span class="difficulty-label">Easy</span>
                            <span class="difficulty-time">7d</span>
                        </button>
                    </div>
                </div>
                
                <div class="learning-reveal" id="learningReveal">
                    <button class="reveal-btn" onclick="LearningMode.revealCard()">Show Answer</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Show next card
     */
    showNextCard() {
        if (this.learningQueue.length === 0) {
            this.showSessionComplete();
            return;
        }
        
        this.currentCard = this.learningQueue.shift();
        
        const container = document.getElementById('learningCardContainer');
        const controls = document.getElementById('learningControls');
        const reveal = document.getElementById('learningReveal');
        
        // Reset state
        controls.style.display = 'none';
        reveal.style.display = 'block';
        
        // Render card front
        container.innerHTML = `
            <div class="learning-card ${this.currentCard.isNew ? 'new-card' : ''}">
                ${this.currentCard.isNew ? '<span class="new-badge">NEW</span>' : ''}
                ${this.currentCard.isReview ? '<span class="review-badge">REVIEW</span>' : ''}
                <div class="card-front">
                    <div class="card-chinese">${this.currentCard.chinese || this.currentCard.c}</div>
                    <div class="card-pinyin">${this.currentCard.pinyin || this.currentCard.p}</div>
                </div>
                <div class="card-back" style="display: none;">
                    <div class="card-english">${this.currentCard.english || this.currentCard.e}</div>
                    <div class="card-meaning">${this.currentCard.meaning || ''}</div>
                    ${this.currentCard.story ? `<div class="card-story">
                        <h4>📖 Story</h4>
                        <p>${this.currentCard.story}</p>
                    </div>` : ''}
                </div>
            </div>
        `;
        
        // Update progress
        this.updateStats();
    },
    
    /**
     * Reveal card back
     */
    revealCard() {
        const cardBack = document.querySelector('.card-back');
        const controls = document.getElementById('learningControls');
        const reveal = document.getElementById('learningReveal');
        
        if (cardBack) {
            cardBack.style.display = 'block';
            cardBack.classList.add('revealed');
        }
        
        controls.style.display = 'block';
        reveal.style.display = 'none';
    },
    
    /**
     * Rate card and proceed
     */
    async rateCard(rating) {
        if (!this.currentCard) return;
        
        // Save progress
        await this.saveProgress(this.currentCard.id || this.currentCard.chinese, rating);
        
        // Update stats
        this.sessionStats.reviewed++;
        if (rating !== 'again') {
            this.sessionStats.correct++;
            this.sessionStats.streak++;
        } else {
            this.sessionStats.streak = 0;
        }
        
        // Show next card
        this.showNextCard();
    },
    
    /**
     * Update stats display
     */
    updateStats() {
        const progressEl = document.getElementById('learningProgress');
        const streakEl = document.getElementById('learningStreak');
        const accuracyEl = document.getElementById('learningAccuracy');
        
        if (progressEl) progressEl.textContent = this.sessionStats.reviewed;
        if (streakEl) streakEl.textContent = this.sessionStats.streak;
        
        if (accuracyEl) {
            const accuracy = this.sessionStats.reviewed > 0 
                ? Math.round((this.sessionStats.correct / this.sessionStats.reviewed) * 100) 
                : 0;
            accuracyEl.textContent = accuracy + '%';
        }
    },
    
    /**
     * Show session complete
     */
    showSessionComplete() {
        const container = document.getElementById('learningCardContainer');
        const controls = document.getElementById('learningControls');
        const reveal = document.getElementById('learningReveal');
        
        if (controls) controls.style.display = 'none';
        if (reveal) reveal.style.display = 'none';
        
        const duration = Math.round((new Date() - this.sessionStats.started) / 1000 / 60);
        const accuracy = this.sessionStats.reviewed > 0 
            ? Math.round((this.sessionStats.correct / this.sessionStats.reviewed) * 100) 
            : 0;
        
        container.innerHTML = `
            <div class="session-complete">
                <div class="complete-icon">🎉</div>
                <h2>Session Complete!</h2>
                <div class="complete-stats">
                    <div class="stat-item">
                        <span class="stat-value">${this.sessionStats.reviewed}</span>
                        <span class="stat-label">Cards Reviewed</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${accuracy}%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${duration}</span>
                        <span class="stat-label">Minutes</span>
                    </div>
                </div>
                <button class="complete-btn" onclick="document.getElementById('learningModal').remove()">Done</button>
            </div>
        `;
    },
    
    /**
     * Show no cards message
     */
    showNoCardsMessage() {
        const modal = document.createElement('div');
        modal.className = 'learning-modal';
        modal.innerHTML = `
            <div class="learning-modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="learning-modal-content">
                <div class="no-cards">
                    <div class="no-cards-icon">✅</div>
                    <h2>All Caught Up!</h2>
                    <p>You have no proverbs due for review.</p>
                    <p class="no-cards-sub">Come back tomorrow or browse new proverbs to add to your learning queue.</p>
                    <button class="complete-btn" onclick="this.closest('.learning-modal').remove()">Browse Proverbs</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Confirm exit
     */
    confirmExit() {
        if (this.sessionStats.reviewed > 0 && !confirm('End session? Your progress will be saved.')) {
            return;
        }
        document.getElementById('learningModal')?.remove();
    },
    
    /**
     * Show learning progress
     */
    async showProgress() {
        const progress = await this.loadProgress();
        
        const totalCards = Object.keys(progress).length;
        const now = new Date();
        const dueCards = Object.values(progress).filter(card => 
            new Date(card.nextReview) <= now
        ).length;
        
        const modal = document.createElement('div');
        modal.className = 'progress-modal';
        modal.innerHTML = `
            <div class="progress-modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="progress-modal-content">
                <button class="progress-modal-close" onclick="this.closest('.progress-modal').remove()">×</button>
                <h2>📊 Learning Progress</h2>
                
                <div class="progress-stats">
                    <div class="progress-stat">
                        <span class="progress-value">${totalCards}</span>
                        <span class="progress-label">Total Learning</span>
                    </div>
                    <div class="progress-stat">
                        <span class="progress-value">${dueCards}</span>
                        <span class="progress-label">Due for Review</span>
                    </div>
                </div>
                
                ${dueCards > 0 ? `
                <button class="start-learning-btn" onclick="this.closest('.progress-modal').remove(); LearningMode.startSession();">
                    Start Review Session
                </button>
                ` : '<p class="all-caught-up">✅ All caught up! Come back tomorrow.</p>'}
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    LearningMode.init();
});
