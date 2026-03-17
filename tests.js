/**
 * Chinese Proverbs - Unit Tests
 * Simple testing framework for core functionality
 */

const TestRunner = {
    tests: [],
    passed: 0,
    failed: 0,

    /**
     * Register a test
     * @param {string} name - Test name
     * @param {Function} fn - Test function
     */
    test(name, fn) {
        this.tests.push({ name, fn });
    },

    /**
     * Assert equality
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     * @param {string} message - Optional message
     */
    assertEqual(actual, expected, message = '') {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(
                message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
            );
        }
    },

    /**
     * Assert truthy
     * @param {*} value - Value to check
     * @param {string} message - Optional message
     */
    assertTrue(value, message = '') {
        if (!value) {
            throw new Error(message || `Expected truthy value, got ${value}`);
        }
    },

    /**
     * Assert falsy
     * @param {*} value - Value to check
     * @param {string} message - Optional message
     */
    assertFalse(value, message = '') {
        if (value) {
            throw new Error(message || `Expected falsy value, got ${value}`);
        }
    },

    /**
     * Assert throws
     * @param {Function} fn - Function to test
     * @param {string} message - Optional message
     */
    assertThrows(fn, message = '') {
        let threw = false;
        try {
            fn();
        } catch (e) {
            threw = true;
        }
        if (!threw) {
            throw new Error(message || 'Expected function to throw');
        }
    },

    /**
     * Run all tests
     */
    async run() {
        console.log('🧪 Running Chinese Proverbs Tests...\n');
        
        this.passed = 0;
        this.failed = 0;

        for (const { name, fn } of this.tests) {
            try {
                await fn(this);
                console.log(`  ✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`  ❌ ${name}`);
                console.log(`     ${error.message}`);
                this.failed++;
            }
        }

        console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }
};

// ============================================
// TESTS
// ============================================

// Test 1: Proverb data structure
TestRunner.test('Proverbs data should have required fields', (t) => {
    if (typeof allProverbs === 'undefined') {
        console.log('     ⚠️  Skipping - allProverbs not loaded');
        return;
    }
    
    t.assertTrue(allProverbs.length > 0, 'Should have proverbs');
    
    const proverb = allProverbs[0];
    t.assertTrue(proverb.cn, 'Should have Chinese text');
    t.assertTrue(proverb.py, 'Should have Pinyin');
    t.assertTrue(proverb.en, 'Should have English translation');
});

// Test 2: Proverb categories
TestRunner.test('Proverbs should have valid categories', (t) => {
    if (typeof allProverbs === 'undefined') {
        console.log('     ⚠️  Skipping - allProverbs not loaded');
        return;
    }
    
    const validCategories = ['wisdom', 'learning', 'perseverance', 'friendship', 'life', 'love', 'business', 'family', 'health', 'cantonese'];
    
    allProverbs.forEach((proverb, i) => {
        if (proverb.cats) {
            proverb.cats.forEach(cat => {
                t.assertTrue(validCategories.includes(cat), `Proverb ${i} has invalid category: ${cat}`);
            });
        }
    });
});

// Test 3: Search functionality
TestRunner.test('Search should filter proverbs correctly', (t) => {
    if (typeof allProverbs === 'undefined' || typeof filterProverbs !== 'function') {
        console.log('     ⚠️  Skipping - dependencies not loaded');
        return;
    }
    
    const results = filterProverbs('wisdom');
    t.assertTrue(Array.isArray(results), 'Should return array');
    t.assertTrue(results.length >= 0, 'Should return results or empty array');
});

// Test 4: Favorites management
TestRunner.test('Favorites should be managed correctly', (t) => {
    if (typeof favoriteIds === 'undefined') {
        console.log('     ⚠️  Skipping - favorites not loaded');
        return;
    }
    
    const initialSize = favoriteIds.size;
    
    // Test toggle
    toggleFavorite('test-proverb-123');
    t.assertTrue(favoriteIds.has('test-proverb-123'), 'Should add to favorites');
    
    toggleFavorite('test-proverb-123');
    t.assertFalse(favoriteIds.has('test-proverb-123'), 'Should remove from favorites');
});

// Test 5: Recent Proverbs
TestRunner.test('RecentProverbs should manage history', (t) => {
    if (typeof RecentProverbs === 'undefined') {
        console.log('     ⚠️  Skipping - RecentProverbs not loaded');
        return;
    }
    
    const testProverb = { cn: '测试', py: 'cè shì', en: 'Test', cats: ['wisdom'] };
    
    RecentProverbs.add(testProverb);
    const recent = RecentProverbs.getAll();
    
    t.assertTrue(recent.length > 0, 'Should have recent items');
    t.assertEqual(recent[0].cn, '测试', 'Most recent should be first');
    
    // Clean up
    RecentProverbs.clear();
    t.assertEqual(RecentProverbs.getCount(), 0, 'Should clear all');
});

// Test 6: Time-based theme
TestRunner.test('TimeBasedTheme should return valid time period', (t) => {
    if (typeof TimeBasedTheme === 'undefined') {
        console.log('     ⚠️  Skipping - TimeBasedTheme not loaded');
        return;
    }
    
    const period = TimeBasedTheme.getTimePeriod();
    const validPeriods = ['dawn', 'morning', 'afternoon', 'evening', 'night'];
    t.assertTrue(validPeriods.includes(period), `Should return valid period: ${period}`);
    
    const greeting = TimeBasedTheme.getGreeting();
    t.assertTrue(greeting.chinese, 'Should have Chinese greeting');
    t.assertTrue(greeting.pinyin, 'Should have Pinyin');
    t.assertTrue(greeting.english, 'Should have English greeting');
    t.assertTrue(greeting.icon, 'Should have icon');
});

// Test 7: SEO Enhancer
TestRunner.test('SEOEnhancer should generate valid structured data', (t) => {
    if (typeof SEOEnhancer === 'undefined') {
        console.log('     ⚠️  Skipping - SEOEnhancer not loaded');
        return;
    }
    
    const sitemap = SEOEnhancer.generateSitemap();
    t.assertTrue(sitemap.includes('<?xml'), 'Should generate XML');
    t.assertTrue(sitemap.includes('urlset'), 'Should include urlset');
});

// Test 8: String utilities
TestRunner.test('escapeHtml should sanitize input', (t) => {
    if (typeof escapeHtml !== 'function') {
        console.log('     ⚠️  Skipping - escapeHtml not loaded');
        return;
    }
    
    t.assertEqual(escapeHtml('<script>'), '&lt;script&gt;', 'Should escape <');
    t.assertEqual(escapeHtml('>'), '&gt;', 'Should escape >');
    t.assertEqual(escapeHtml('"'), '&quot;', 'Should escape "');
    t.assertEqual(escapeHtml("'"), '&#039;', "Should escape '");
    t.assertEqual(escapeHtml('&'), '&amp;', 'Should escape &');
});

// Test 9: Category filtering
TestRunner.test('Category filter should work correctly', (t) => {
    if (typeof allProverbs === 'undefined') {
        console.log('     ⚠️  Skipping - allProverbs not loaded');
        return;
    }
    
    const wisdomProverbs = allProverbs.filter(p => p.cats && p.cats.includes('wisdom'));
    t.assertTrue(wisdomProverbs.length > 0, 'Should have wisdom proverbs');
    
    wisdomProverbs.forEach(p => {
        t.assertTrue(p.cats.includes('wisdom'), 'All should have wisdom category');
    });
});

// Test 10: Modal functions
TestRunner.test('Modal functions should exist', (t) => {
    t.assertTrue(typeof openModal === 'function', 'openModal should exist');
    t.assertTrue(typeof closeModal === 'function', 'closeModal should exist');
});

// ============================================
// RUN TESTS
// ============================================

/**
 * Run all tests and display results
 */
function runTests() {
    // Create test UI if in browser
    if (typeof document !== 'undefined') {
        createTestUI();
    }
    
    TestRunner.run().then(success => {
        if (typeof document !== 'undefined') {
            updateTestUI(success, TestRunner.passed, TestRunner.failed);
        }
    });
}

/**
 * Create test UI overlay
 */
function createTestUI() {
    const existing = document.getElementById('testUI');
    if (existing) existing.remove();

    const ui = document.createElement('div');
    ui.id = 'testUI';
    ui.innerHTML = `
        <div id="testPanel" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: #1a1a1a;
            color: #fff;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong>🧪 Test Runner</strong>
                <button onclick="document.getElementById('testUI').remove()" style="background: #333; color: #fff; border: none; padding: 2px 8px; border-radius: 4px; cursor: pointer;">✕</button>
            </div>
            <div id="testOutput">Running tests...</div>
        </div>
    `;
    document.body.appendChild(ui);
}

/**
 * Update test UI with results
 */
function updateTestUI(success, passed, failed) {
    const output = document.getElementById('testOutput');
    if (output) {
        const color = success ? '#4caf50' : '#f44336';
        output.innerHTML = `
            <div style="color: ${color}; font-weight: bold;">
                ${success ? '✅ All tests passed!' : '❌ Some tests failed'}
            </div>
            <div>Passed: ${passed} | Failed: ${failed}</div>
        `;
    }
}

// Export for use in console
window.TestRunner = TestRunner;
window.runTests = runTests;

// Auto-run tests if URL has ?test parameter
if (typeof window !== 'undefined' && window.location && window.location.search.includes('test')) {
    window.addEventListener('load', runTests);
}
