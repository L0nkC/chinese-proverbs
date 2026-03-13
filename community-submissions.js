/**
 * Community Submissions System
 * Allows users to suggest new proverbs
 */

const CommunitySubmissions = {
    db: null,
    
    /**
     * Initialize community submissions
     */
    init() {
        if (typeof firebase !== 'undefined' && firebase.apps.length) {
            this.db = firebase.firestore();
        }
        console.log('[CommunitySubmissions] Initialized');
    },
    
    /**
     * Show submission form
     */
    showSubmissionForm() {
        const modal = document.createElement('div');
        modal.className = 'submission-modal';
        modal.innerHTML = `
            <div class="submission-modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="submission-modal-content">
                <button class="submission-modal-close" onclick="this.closest('.submission-modal').remove()">×</button>
                <h2 class="submission-title">📝 Submit a Proverb</h2>
                <p class="submission-subtitle">Share wisdom from your culture</p>
                
                <form class="submission-form" onsubmit="event.preventDefault(); CommunitySubmissions.handleSubmit(this);">
                    <div class="form-group">
                        <label>Chinese (中文) *</label>
                        <input type="text" name="chinese" placeholder="Enter Chinese characters" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Pinyin/Jyutping</label>
                        <input type="text" name="pinyin" placeholder="Enter pronunciation" required>
                    </div>
                    
                    <div class="form-group">
                        <label>English Translation *</label>
                        <textarea name="english" placeholder="Enter English meaning" rows="3" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Category *</label>
                        <select name="category" required>
                            <option value="">Select a category...</option>
                            <option value="wisdom">Wisdom</option>
                            <option value="learning">Learning</option>
                            <option value="perseverance">Perseverance</option>
                            <option value="friendship">Friendship</option>
                            <option value="life">Life</option>
                            <option value="love">Love</option>
                            <option value="business">Business</option>
                            <option value="family">Family</option>
                            <option value="health">Health</option>
                            <option value="cantonese">Cantonese</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Origin/Story (optional)</label>
                        <textarea name="story" placeholder="Share the origin or a story about this proverb" rows="4"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Your Name (optional)</label>
                        <input type="text" name="submitterName" placeholder="How you'd like to be credited">
                    </div>
                    
                    <button type="submit" class="submission-btn">Submit Proverb</button>
                </form>
                
                <div class="submission-note">
                    <p>⚠️ Submissions are reviewed before being added to the collection.</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    /**
     * Handle form submission
     */
    async handleSubmit(form) {
        const formData = {
            chinese: form.chinese.value.trim(),
            pinyin: form.pinyin.value.trim(),
            english: form.english.value.trim(),
            category: form.category.value,
            story: form.story.value.trim(),
            submitterName: form.submitterName.value.trim() || 'Anonymous',
            status: 'pending',
            votes: 0,
            submittedAt: new Date().toISOString()
        };
        
        // Add user info if logged in
        if (UserAuth.currentUser) {
            formData.submitterId = UserAuth.currentUser.uid;
            formData.submitterEmail = UserAuth.currentUser.email;
        }
        
        try {
            if (this.db) {
                // Save to Firestore
                await this.db.collection('submissions').add(formData);
                console.log('[CommunitySubmissions] Saved to Firestore');
            } else {
                // Save to localStorage as fallback
                const submissions = JSON.parse(localStorage.getItem('chinese_proverbs_submissions') || '[]');
                submissions.push(formData);
                localStorage.setItem('chinese_proverbs_submissions', JSON.stringify(submissions));
                console.log('[CommunitySubmissions] Saved to localStorage');
            }
            
            // Show success message
            this.showSuccessMessage();
            
            // Close modal
            document.querySelector('.submission-modal').remove();
            
        } catch (error) {
            console.error('[CommunitySubmissions] Submit error:', error);
            alert('Failed to submit. Please try again.');
        }
    },
    
    /**
     * Show success message
     */
    showSuccessMessage() {
        const toast = document.createElement('div');
        toast.className = 'submission-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">✅</span>
                <span class="toast-message">Proverb submitted for review!</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    /**
     * Show pending submissions (admin view)
     */
    async showPendingSubmissions() {
        if (!this.db) {
            alert('Database not available');
            return;
        }
        
        try {
            const snapshot = await this.db.collection('submissions')
                .where('status', '==', 'pending')
                .orderBy('submittedAt', 'desc')
                .get();
            
            const submissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.renderSubmissionsList(submissions, 'Pending Submissions');
            
        } catch (error) {
            console.error('[CommunitySubmissions] Error loading submissions:', error);
        }
    },
    
    /**
     * Show user's submissions
     */
    async showUserSubmissions() {
        const user = UserAuth.currentUser;
        if (!user) {
            alert('Please sign in to view your submissions');
            return;
        }
        
        try {
            let submissions = [];
            
            if (this.db) {
                const snapshot = await this.db.collection('submissions')
                    .where('submitterId', '==', user.uid)
                    .orderBy('submittedAt', 'desc')
                    .get();
                submissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } else {
                // Load from localStorage
                const allSubmissions = JSON.parse(localStorage.getItem('chinese_proverbs_submissions') || '[]');
                submissions = allSubmissions.filter(s => s.submitterId === user.uid);
            }
            
            this.renderSubmissionsList(submissions, 'My Submissions');
            
        } catch (error) {
            console.error('[CommunitySubmissions] Error loading user submissions:', error);
        }
    },
    
    /**
     * Render submissions list
     */
    renderSubmissionsList(submissions, title) {
        const modal = document.createElement('div');
        modal.className = 'submissions-list-modal';
        
        if (submissions.length === 0) {
            modal.innerHTML = `
                <div class="submissions-modal-overlay" onclick="this.parentElement.remove()"></div>
                <div class="submissions-modal-content">
                    <button class="submissions-modal-close" onclick="this.closest('.submissions-list-modal').remove()">×</button>
                    <h2>${title}</h2>
                    <p class="no-submissions">No submissions yet.</p>
                </div>
            `;
        } else {
            const submissionsHTML = submissions.map(sub => `
                <div class="submission-item ${sub.status}">
                    <div class="submission-chinese">${sub.chinese}</div>
                    <div class="submission-pinyin">${sub.pinyin}</div>
                    <div class="submission-english">${sub.english}</div>
                    <div class="submission-meta">
                        <span class="submission-category">${sub.category}</span>
                        <span class="submission-status ${sub.status}">${sub.status}</span>
                        <span class="submission-date">${new Date(sub.submittedAt).toLocaleDateString()}</span>
                    </div>
                    ${sub.story ? `<div class="submission-story">${sub.story}</div>` : ''}
                    ${sub.adminNote ? `<div class="submission-admin-note">Note: ${sub.adminNote}</div>` : ''}
                </div㸮
            `).join('');
            
            modal.innerHTML = `
                <div class="submissions-modal-overlay" onclick="this.parentElement.remove()"></div>
                <div class="submissions-modal-content">
                    <button class="submissions-modal-close" onclick="this.closest('.submissions-list-modal').remove()">×</button>
                    <h2>${title} (${submissions.length})</h2>
                    <div class="submissions-list">
                        ${submissionsHTML}
                    </div>
                </div>
            `;
        }
        
        document.body.appendChild(modal);
    },
    
    /**
     * Approve submission (admin only)
     */
    async approveSubmission(submissionId) {
        if (!this.db) return;
        
        try {
            await this.db.collection('submissions').doc(submissionId).update({
                status: 'approved',
                approvedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Add to proverbs collection
            const doc = await this.db.collection('submissions').doc(submissionId).get();
            const data = doc.data();
            
            // Here you would add to the main proverbs collection
            console.log('[CommunitySubmissions] Approved:', submissionId);
            
        } catch (error) {
            console.error('[CommunitySubmissions] Approve error:', error);
        }
    },
    
    /**
     * Reject submission (admin only)
     */
    async rejectSubmission(submissionId, reason) {
        if (!this.db) return;
        
        try {
            await this.db.collection('submissions').doc(submissionId).update({
                status: 'rejected',
                adminNote: reason,
                rejectedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('[CommunitySubmissions] Rejected:', submissionId);
            
        } catch (error) {
            console.error('[CommunitySubmissions] Reject error:', error);
        }
    },
    
    /**
     * Vote on submission
     */
    async voteOnSubmission(submissionId) {
        if (!UserAuth.currentUser) {
            alert('Please sign in to vote');
            return;
        }
        
        const userId = UserAuth.currentUser.uid;
        
        try {
            const voteRef = this.db.collection('submissions').doc(submissionId)
                .collection('votes').doc(userId);
            
            const voteDoc = await voteRef.get();
            
            if (voteDoc.exists) {
                // Remove vote
                await voteRef.delete();
                await this.db.collection('submissions').doc(submissionId).update({
                    votes: firebase.firestore.FieldValue.increment(-1)
                });
            } else {
                // Add vote
                await voteRef.set({ votedAt: firebase.firestore.FieldValue.serverTimestamp() });
                await this.db.collection('submissions').doc(submissionId).update({
                    votes: firebase.firestore.FieldValue.increment(1)
                });
            }
            
        } catch (error) {
            console.error('[CommunitySubmissions] Vote error:', error);
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    CommunitySubmissions.init();
});
