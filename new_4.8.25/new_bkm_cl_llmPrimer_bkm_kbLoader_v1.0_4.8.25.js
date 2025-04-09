// llmPrimer_bkm_kbLoader_v1.0.js
// Knowledge Base Categories and Domains for llmPrimer Bookmarklet

// Knowledge Base Categories
const kbCategories = [
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
    // Ensure that the id matches the one in kbDomain to filter the knowledge bases correctly
    // Ensure that the id is unique for each category
    // Ensure that the title is a descriptive name for the category
];

// Knowledge Base Domains
const kbDomain = [
    {
        id: 'usabilityHeuristics',
        title: 'Usability Heuristics',
        docxUrl: 'https://your-confluence.domain/path/to/usabilityHeuristics.docx',
        category: 'designReview'
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        docxUrl: 'https://your-confluence.domain/path/to/accessibilityGuidelines.docx',
        category: 'accessibility'
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        docxUrl: 'https://your-confluence.domain/path/to/researchMethods.docx',
        category: 'research'
    }
    // Additional knowledge bases can be added here
    // Ensure that the category matches the one in kbCategories
    // to filter the knowledge bases correctly
    // Ensure that the id is unique for each knowledge base
    // Ensure that the docxUrl is a valid URL to the docx file
    // Ensure that the title is a descriptive name for the knowledge base
];

// Export the arrays to be used by the bookmarklet
window.kbLoader = {
    categories: kbCategories,
    domains: kbDomain
};