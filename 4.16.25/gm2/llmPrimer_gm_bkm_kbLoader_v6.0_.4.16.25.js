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
        title: 'Usability Heuristics Eval',
        // MODIFIED: Replaced markDown with markDownUrl
        markDownUrl: 'https://your-hosting-location.com/path/to/usabilityHeuristicsEval.md', // <-- **** REPLACE WITH YOUR ACTUAL URL ****
        category: 'designReview' // Example category assignment
    },
    {
        id: 'researchMethods',
        title: 'Research Methods Guide',
         // MODIFIED: Replaced markDown with markDownUrl
        markDownUrl: 'https://your-hosting-location.com/path/to/researchMethodsGuide.md', // <-- **** REPLACE WITH YOUR ACTUAL URL ****
        category: 'research'
    },
    {
        id: 'wcagChecklist',
        title: 'WCAG Checklist Primer',
         // MODIFIED: Replaced markDown with markDownUrl
        markDownUrl: 'https://your-hosting-location.com/path/to/wcagChecklistPrimer.md', // <-- **** REPLACE WITH YOUR ACTUAL URL ****
        category: 'accessibility'
    }
    // Add more knowledge base entries here, each with a unique id, title, category, and a markDownUrl
];

// IMPORTANT: Ensure the file containing this kbLoader script is named correctly
//           and referenced accurately in the 'base' script's src attribute.
//           Example: new_gm_llmPrimer_bkm_kbLoader_v2.0_4.14.25.js