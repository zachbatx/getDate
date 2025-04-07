// Initialize the knowledge base module with improved timing
(function() {
    console.log('[KB Research] Starting initialization...');
    
    // Create the knowledge base module
    const kbResearch = kbResearchModule();
    
    // Expose the module globally first
    window.kbResearch = kbResearch;
    
    // Add sample knowledge bases for testing
    const knowledgeBaseConfig = [
        {
            id: 'usabilityHeuristics',
            title: 'Usability Heuristics',
            docxUrl: 'https://your-confluence.domain/path/to/usabilityHeuristics.docx',
            category: 'designReview'
        },
        {
            id: 'accessibilityChecklist',
            title: 'Accessibility Checklist',
            docxUrl: 'https://your-confluence.domain/path/to/accessibilityChecklist.docx',
            category: 'accessibility'
        }
    ];
    
    // Initialize with delay to ensure bookmarklet is ready
    const initWithBookmarklet = () => {
        kbResearch.initialize();
        
        // Check if bookmarklet is ready
        if (window.KnowledgeBaseLoader && window.KnowledgeBaseLoader.registerBase) {
            console.log('[KB Research] Bookmarklet is ready, registering knowledge bases...');
            
            // Register bases with bookmarklet
            Object.values(kbResearch.knowledgeBases).forEach(kb => {
                window.KnowledgeBaseLoader.registerBase(kb.id, kb.name, kb.docxUrl, kb.category);
            });
        } else {
            console.log('[KB Research] Bookmarklet not ready yet, waiting...');
            // Retry after a short delay
            setTimeout(initWithBookmarklet, 500);
        }
    };
    
    // Start initialization process with a delay
    setTimeout(initWithBookmarklet, 100);
})();