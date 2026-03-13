/**
 * Firebase Configuration & User Authentication
 * Enables user accounts, cloud-synced favorites, and community features
 */

const FirebaseConfig = {
    apiKey: "AIzaSyDummyKeyForDemo_PleaseReplaceWithRealKey",
    authDomain: "chinese-proverbs-demo.firebaseapp.com",
    projectId: "chinese-proverbs-demo",
    storageBucket: "chinese-proverbs-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

const UserAuth = {
    auth: null,
    db: null,
    currentUser: null,
    isInitialized: false,
    
    /**
     * Initialize Firebase Auth
     */
    init() {
        // Check if Firebase is available
        if (typeof firebase === 'undefined') {
            console.log('[UserAuth] Firebase not loaded, using local mode');
            this.loadLocalUser();
            return;
        }
        
        try {
            // Initialize Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(FirebaseConfig);
            }
            
            this.auth = firebase.auth();
            this.db = firebase.firestore();
            this.isInitialized = true;
            
            // Listen for auth state changes
            this.auth.onAuthStateChanged(user => {
                this.currentUser = user;
                if (user) {
                    console.log('[UserAuth] User signed in:', user.uid);
                    this.syncFavoritesFromCloud();
                    this.updateUIForLoggedInUser(user);
                } else {
                    console.log('[UserAuth] User signed out');
                    this.updateUIForLoggedOutUser();
                }
            });
            
            console.log('[UserAuth] Firebase initialized');
        } catch (error) {
            console.error('[UserAuth] Firebase init error:', error);
            this.loadLocalUser();
        }
    },
    
    /**
     * Sign in with Google
     */
    async signInWithGoogle() {
        if (!this.isInitialized) {
            console.warn('[UserAuth] Firebase not initialized');
            return;
        }
        
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.auth.signInWithPopup(provider);
            console.log('[UserAuth] Google sign-in successful:', result.user.displayName);
            return result.user;
        } catch (error) {
            console.error('[UserAuth] Google sign-in error:', error);
            throw error;
        }
    },
    
    /**
     * Sign in with email/password
     */
    async signInWithEmail(email, password) {
        if (!this.isInitialized) {
            console.warn('[UserAuth] Firebase not initialized');
            return;
        }
        
        try {
            const result = await this.auth.signInWithEmailAndPassword(email, password);
            return result.user;
        } catch (error) {
            console.error('[UserAuth] Email sign-in error:', error);
            throw error;
        }
    },
    
    /**
     * Create account with email/password
     */
    async createAccount(email, password, displayName) {
        if (!this.isInitialized) {
            console.warn('[UserAuth] Firebase not initialized');
            return;
        }
        
        try {
            const result = await this.auth.createUserWithEmailAndPassword(email, password);
            await result.user.updateProfile({ displayName });
            
            // Create user document in Firestore
            await this.db.collection('users').doc(result.user.uid).set({
                email: email,
                displayName: displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                favorites: [],
                learningProgress: {},
                submissions: []
            });
            
            return result.user;
        } catch (error) {
            console.error('[UserAuth] Create account error:', error);
            throw error;
        }
    },
    
    /**
     * Sign out
     */
    async signOut() {
        if (!this.isInitialized) {
            console.warn('[UserAuth] Firebase not initialized');
            return;
        }
        
        try {
            await this.auth.signOut();
            console.log('[UserAuth] Signed out');
        } catch (error) {
            console.error('[UserAuth] Sign out error:', error);
            throw error;
        }
    },
    
    /**
     * Sync favorites to cloud
     */
    async syncFavoritesToCloud() {
        if (!this.isInitialized || !this.currentUser) {
            console.log('[UserAuth] Cannot sync - not logged in');
            return;
        }
        
        try {
            const favorites = JSON.parse(localStorage.getItem('chinese_proverbs_favorites') || '[]');
            await this.db.collection('users').doc(this.currentUser.uid).update({
                favorites: favorites,
                lastSync: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('[UserAuth] Favorites synced to cloud');
        } catch (error) {
            console.error('[UserAuth] Sync to cloud error:', error);
        }
    },
    
    /**
     * Sync favorites from cloud
     */
    async syncFavoritesFromCloud() {
        if (!this.isInitialized || !this.currentUser) {
            console.log('[UserAuth] Cannot sync - not logged in');
            return;
        }
        
        try {
            const doc = await this.db.collection('users').doc(this.currentUser.uid).get();
            if (doc.exists) {
                const data = doc.data();
                if (data.favorites && data.favorites.length > 0) {
                    localStorage.setItem('chinese_proverbs_favorites', JSON.stringify(data.favorites));
                    console.log('[UserAuth] Favorites synced from cloud');
                    
                    // Refresh display if on favorites page
                    if (currentFilter === 'favorites' && typeof renderProverbs === 'function') {
                        currentProverbs = getFavoriteProverbs();
                        renderProverbs(currentProverbs.slice(0, displayedCount));
                    }
                }
            }
        } catch (error) {
            console.error('[UserAuth] Sync from cloud error:', error);
        }
    },
    
    /**
     * Update UI for logged in user
     */
    updateUIForLoggedInUser(user) {
        const authButton = document.getElementById('authButton');
        const userMenu = document.getElementById('userMenu');
        
        if (authButton) {
            authButton.innerHTML = `
                <img src="${user.photoURL || 'data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"%23C73E1D\"/><text x=\"50\" y=\"65\" font-size=\"50\" text-anchor=\"middle\" fill=\"white\">${user.displayName ? user.displayName[0].toUpperCase() : 'U'}</text></svg>'}" 
                     alt="${user.displayName || 'User'}" 
                     style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--vermilion);">
            `;
            authButton.onclick = () => this.toggleUserMenu();
        }
        
        if (userMenu) {
            userMenu.innerHTML = `
                <div class="user-menu-header">
                    <span class="user-name">${user.displayName || 'User'}</span>
                    <span class="user-email">${user.email}</span>
                </div>
                <div class="user-menu-items">
                    <button class="user-menu-item" onclick="UserAuth.showLearningProgress()">
                        <span class="menu-icon">📚</span> Learning Progress
                    </button>
                    <button class="user-menu-item" onclick="UserAuth.showSubmissions()">
                        <span class="menu-icon">📝</span> My Submissions
                    </button>
                    <button class="user-menu-item" onclick="UserAuth.syncFavoritesToCloud()">
                        <span class="menu-icon">☁️</span> Sync Favorites
                    </button>
                    <div class="user-menu-divider"></div>
                    <button class="user-menu-item sign-out" onclick="UserAuth.signOut()">
                        <span class="menu-icon">🚪</span> Sign Out
                    </button>
                </div>
            `;
        }
    },
    
    /**
     * Update UI for logged out user
     */
    updateUIForLoggedOutUser() {
        const authButton = document.getElementById('authButton');
        const userMenu = document.getElementById('userMenu');
        
        if (authButton) {
            authButton.innerHTML = '<span class="btn-icon">👤</span>';
            authButton.onclick = () => this.showAuthModal();
        }
        
        if (userMenu) {
            userMenu.classList.remove('active');
        }
    },
    
    /**
     * Show auth modal
     */
    showAuthModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="auth-modal-content">
                <button class="auth-modal-close" onclick="this.closest('.auth-modal').remove()">×</button>
                <h2 class="auth-title">Sign In</h2>
                <p class="auth-subtitle">Sync your favorites across devices</p>
                
                <button class="auth-btn google" onclick="UserAuth.signInWithGoogle().then(() => document.querySelector('.auth-modal').remove())">
                    <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Continue with Google
                </button>
                
                <div class="auth-divider">
                    <span>or</span>
                </div>
                
                <form class="auth-form" onsubmit="event.preventDefault(); UserAuth.handleEmailSignIn(this);">
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit" class="auth-btn primary">Sign In</button>
                </form>
                
                <p class="auth-footer">
                    Don't have an account? <a href="#" onclick="UserAuth.showSignUpForm(); return false;">Sign up</a>
                </p>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Handle email sign in
     */
    async handleEmailSignIn(form) {
        const email = form.email.value;
        const password = form.password.value;
        
        try {
            await this.signInWithEmail(email, password);
            document.querySelector('.auth-modal').remove();
        } catch (error) {
            alert('Sign in failed: ' + error.message);
        }
    },
    
    /**
     * Show sign up form
     */
    showSignUpForm() {
        const modalContent = document.querySelector('.auth-modal-content');
        modalContent.innerHTML = `
            <button class="auth-modal-close" onclick="this.closest('.auth-modal').remove()">×</button>
            <h2 class="auth-title">Create Account</h2>
            <p class="auth-subtitle">Join our community of proverb lovers</p>
            
            <form class="auth-form" onsubmit="event.preventDefault(); UserAuth.handleSignUp(this);">
                <input type="text" name="displayName" placeholder="Display Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password (min 6 chars)" minlength="6" required>
                <button type="submit" class="auth-btn primary">Create Account</button>
            </form>
            
            <p class="auth-footer">
                Already have an account? <a href="#" onclick="UserAuth.showAuthModal(); return false;">Sign in</a>
            </p>
        `;
    },
    
    /**
     * Handle sign up
     */
    async handleSignUp(form) {
        const displayName = form.displayName.value;
        const email = form.email.value;
        const password = form.password.value;
        
        try {
            await this.createAccount(email, password, displayName);
            document.querySelector('.auth-modal').remove();
        } catch (error) {
            alert('Sign up failed: ' + error.message);
        }
    },
    
    /**
     * Toggle user menu
     */
    toggleUserMenu() {
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.classList.toggle('active');
        }
    },
    
    /**
     * Show learning progress
     */
    showLearningProgress() {
        this.toggleUserMenu();
        LearningMode.showProgress();
    },
    
    /**
     * Show user's submissions
     */
    showSubmissions() {
        this.toggleUserMenu();
        CommunitySubmissions.showUserSubmissions();
    },
    
    /**
     * Load local user (fallback when Firebase unavailable)
     */
    loadLocalUser() {
        console.log('[UserAuth] Running in local mode');
        // Local mode - favorites stay in localStorage only
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    UserAuth.init();
});
