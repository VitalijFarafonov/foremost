/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://foremost.ai',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: 'public',
    // Exclude pages that shouldn't be indexed
    exclude: ['/api/*'],
    // Configure robots.txt
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    // Additional paths to include
    additionalPaths: async (config) => {
        return [
            { loc: '/', changefreq: 'weekly', priority: 1.0 },
            { loc: '/about', changefreq: 'monthly', priority: 0.9 },
            { loc: '/how-we-think', changefreq: 'monthly', priority: 0.8 },
            { loc: '/how-we-work', changefreq: 'monthly', priority: 0.8 },
            { loc: '/results', changefreq: 'monthly', priority: 0.8 },
            { loc: '/team', changefreq: 'monthly', priority: 0.7 },
            { loc: '/careers', changefreq: 'monthly', priority: 0.6 },
            { loc: '/contact', changefreq: 'monthly', priority: 0.6 },
            { loc: '/privacy', changefreq: 'yearly', priority: 0.3 },
        ];
    },
};
