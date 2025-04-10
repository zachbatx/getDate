/**
 * llmPrimer_bkm_kbLoader_v1.0.js
 * Knowledge Base Categories and Domains for llmPrimer Bookmarklet
 */

// Categories for knowledge bases
const kbCategory = [
    {
        id: 'designReview',
        title: 'Design Review Tools'
    },
    {
        id: 'research',
        title: 'Research Tools'
    },
    {
        id: 'accessibility',
        title: 'Accessibility Tools'
    }
    // Additional categories can be added here
];

// Knowledge base entries
const kbDomain = [
    {
        id: 'usabilityHeuristics',
        title: 'Usability Heuristics',
        contentUrl: 'https://your-domain.com/path/to/usabilityHeuristics.js', // Changed from .docx to .js
        category: 'designReview'
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        contentUrl: 'https://your-domain.com/path/to/accessibilityGuidelines.js', // Changed from .docx to .js
        category: 'accessibility'
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        contentUrl: 'https://your-domain.com/path/to/researchMethods.js', // Changed from .docx to .js
        category: 'research'
    }
    // Additional knowledge bases can be added here
];