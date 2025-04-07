// llmPrimer_bkm_kbLoader_v1.0.js

// Categories for the dropdown selector (displayed in the category dropdown)
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
];

// Knowledge bases with their corresponding category, title, and link to the docx file
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
];
