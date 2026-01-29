// Placeholder analytics configuration
// TODO: Add Plausible script or Fathom Analytics

export const ANALYTICS_CONFIG = {
    // Privacy-first analytics options
    plausible: {
        enabled: false, // Set to true when ready
        domain: 'foremost.ai',
        // Script will be added to layout.tsx when enabled
    },

    fathom: {
        enabled: false, // Set to true when ready
        siteId: '', // Add your Fathom site ID here
        // Script will be added to layout.tsx when enabled
    },

    // Conversion tracking
    goals: {
        newsletterSignup: 'Newsletter Signup',
        briefingRequest: 'Briefing Request',
        contactForm: 'Contact Form',
        externalArticleClick: 'External Article Click',
    },
};

// Helper function to track events (placeholder)
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window === 'undefined') return;

    // Plausible tracking
    if (ANALYTICS_CONFIG.plausible.enabled && (window as any).plausible) {
        (window as any).plausible(eventName, { props: properties });
    }

    // Fathom tracking
    if (ANALYTICS_CONFIG.fathom.enabled && (window as any).fathom) {
        (window as any).fathom.trackGoal(eventName, properties?.value || 0);
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', eventName, properties);
    }
};
