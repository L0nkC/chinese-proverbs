/**
 * SEO Enhancement Module
 * Manages meta tags, structured data, and social sharing optimization
 */

const SEOEnhancer = {
    /**
     * Initialize SEO enhancements
     */
    init() {
        this.addStructuredData();
        this.setupDynamicMetaTags();
        this.setupCanonicalUrl();
        console.log('[SEOEnhancer] Initialized');
    },

    /**
     * Add JSON-LD structured data to the page
     */
    addStructuredData() {
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: '中华谚语 | Chinese Proverbs',
            description: 'Discover over 250 timeless proverbs from Chinese culture, featuring Mandarin and Cantonese sayings with Pinyin pronunciation.',
            url: window.location.href,
            applicationCategory: 'ReferenceApplication',
            operatingSystem: 'Any',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
            },
            author: {
                '@type': 'Organization',
                name: 'Chinese Proverbs Collection'
            },
            inLanguage: ['en', 'zh-CN', 'zh-HK'],
            keywords: 'Chinese proverbs, 谚语, yanyu, Mandarin, Cantonese, Pinyin, Jyutping, wisdom, sayings',
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: this.getProverbsStructuredData()
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
    },

    /**
     * Get structured data for proverbs (limited to first 10 for performance)
     * @returns {Array}
     */
    getProverbsStructuredData() {
        if (typeof allProverbs === 'undefined') return [];
        
        return allProverbs.slice(0, 10).map((proverb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Quotation',
                text: proverb.cn,
                inLanguage: 'zh-CN',
                about: proverb.cats ? proverb.cats.join(', ') : 'wisdom'
            }
        }));
    },

    /**
     * Set up dynamic meta tags that update when viewing specific proverbs
     */
    setupDynamicMetaTags() {
        // Listen for modal open events to update meta tags
        const originalOpenModal = window.openModal;
        if (originalOpenModal) {
            window.openModal = (proverb) => {
                this.updateMetaTagsForProverb(proverb);
                return originalOpenModal(proverb);
            };
        }
    },

    /**
     * Update meta tags when viewing a specific proverb
     * @param {Object} proverb - The proverb being viewed
     */
    updateMetaTagsForProverb(proverb) {
        if (!proverb) return;

        const title = `${proverb.cn} | Chinese Proverb`;
        const description = `${proverb.cn} (${proverb.py}) - ${proverb.en}`;
        const url = window.location.href;

        // Update title
        document.title = title;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;

        // Update Open Graph tags
        this.updateMetaTag('og:title', title);
        this.updateMetaTag('og:description', description);
        this.updateMetaTag('og:url', url);

        // Update Twitter Card tags
        this.updateMetaTag('twitter:title', title);
        this.updateMetaTag('twitter:description', description);
        this.updateMetaTag('twitter:url', url);

        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.href = url;
        }
    },

    /**
     * Helper to update or create a meta tag
     * @param {string} property - The property name
     * @param {string} content - The content value
     */
    updateMetaTag(property, content) {
        let meta = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (property.startsWith('og:')) {
                meta.setAttribute('property', property);
            } else {
                meta.setAttribute('name', property);
            }
            document.head.appendChild(meta);
        }
        meta.content = content;
    },

    /**
     * Set up canonical URL
     */
    setupCanonicalUrl() {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = window.location.href;
    },

    /**
     * Generate sitemap-friendly URL for a proverb
     * @param {Object} proverb - The proverb
     * @returns {string} URL-friendly slug
     */
    generateProverbSlug(proverb) {
        if (!proverb || !proverb.cn) return '';
        
        // Create a slug from the English translation
        const slug = proverb.en
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50);
        
        return `${slug}-${proverb.cn.length}`;
    },

    /**
     * Generate sitemap data for all proverbs
     * @returns {string} XML sitemap content
     */
    generateSitemap() {
        if (typeof allProverbs === 'undefined') return '';

        const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
        
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        
        // Add main page
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}</loc>\n`;
        sitemap += `    <changefreq>daily</changefreq>\n`;
        sitemap += `    <priority>1.0</priority>\n`;
        sitemap += `  </url>\n`;
        
        // Add category pages
        const categories = ['wisdom', 'learning', 'perseverance', 'friendship', 'life', 'love', 'business', 'family', 'health', 'cantonese'];
        categories.forEach(cat => {
            sitemap += `  <url>\n`;
            sitemap += `    <loc>${baseUrl}#${cat}</loc>\n`;
            sitemap += `    <changefreq>weekly</changefreq>\n`;
            sitemap += `    <priority>0.8</priority>\n`;
            sitemap += `  </url>\n`;
        });
        
        sitemap += `</urlset>`;
        
        return sitemap;
    }
};

/**
 * Robots.txt generator
 * @returns {string} robots.txt content
 */
function generateRobotsTxt() {
    const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
    return `User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/

Sitemap: ${baseUrl}sitemap.xml
`;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SEOEnhancer.init();
});
