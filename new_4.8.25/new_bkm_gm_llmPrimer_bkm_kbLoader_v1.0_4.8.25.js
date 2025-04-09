// llmPrimer_bkm_kbLoader_v1.0.js

window.kbCategory = [
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


window.kbDomain = [
    {
        id: 'usabilityHeuristics',
        title: 'Usability Heuristics',
        docxUrl: 'https://www.sample-docx.com/sample.docx', // Replace with your actual docx URL
        category: 'designReview'
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        docxUrl: 'https://www.sample-docx.com/sample2.docx', // Replace with your actual docx URL
        category: 'accessibility'
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        docxUrl: 'https://www.sample-docx.com/sample3.docx', // Replace with your actual docx URL
        category: 'research'
    }

    // Additional knowledge bases can be added here
    // Ensure that the category matches the one in kbCategories
    // to filter the knowledge bases correctly
    // Ensure that the id is unique for each knowledge base
    // Ensure that the docxUrl is a valid URL to the docx file
    // Ensure that the title is a descriptive name for the knowledge base
];