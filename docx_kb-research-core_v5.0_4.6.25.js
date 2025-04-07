/**
 * Research Knowledge Base Core - DOCX Edition
 * This file provides core functionality for loading and processing research-related 
 * knowledge bases directly from DOCX files.
 */

// Define the knowledge base module
const kbResearchModule = () => {
    // Private utilities
    const utils = {
        log: function(message, type = 'info') {
            const prefix = '[KB Research]';
            if (type === 'error') {
                console.error(`${prefix} ${message}`);
            } else {
                console.log(`${prefix} ${message}`);
            }
        }
    };

    // Configuration for available knowledge base categories
    const knowledgeBaseCategories = [
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
        // Add more categories as needed
    ];

    // Configuration for available knowledge base documents
    const knowledgeBaseConfig = [
        {
            id: 'usabilityHeuristics',
            title: 'Usability Heuristics',
            docxUrl: 'https://your-confluence.domain/path/to/usabilityHeuristics.docx',
            category: 'designReview'
        }
        // Add new documents here
    ];

    // Create the knowledge base object
    const kbResearch = {
        name: "Research Best Practices",
        knowledgeBases: {},
        categories: {},
        
        /**
         * Initialize the knowledge base
         */
        initialize: function() {
            utils.log("Initializing Knowledge Base System...");
            
            // Initialize categories
            knowledgeBaseCategories.forEach(category => {
                this.categories[category.id] = {
                    title: category.title,
                    knowledgeBases: []
                };
            });
            
            // Register initial knowledge bases
            knowledgeBaseConfig.forEach(kb => {
                this.registerKnowledgeBase(kb.id, kb.title, kb.docxUrl, kb.category);
            });
            
            utils.log("Knowledge Base System initialized");
        },

        /**
         * Register a knowledge base
         * @param {string} id - Unique identifier
         * @param {string} name - Display name
         * @param {string} docxUrl - URL to the DOCX file
         * @param {string} category - Category identifier
         */
        registerKnowledgeBase: function(id, name, docxUrl, category) {
            utils.log(`Registering knowledge base: ${name}`);
            
            this.knowledgeBases[id] = {
                id,
                name,
                docxUrl,
                category
            };
            
            // Add to category if it exists
            if (this.categories[category]) {
                this.categories[category].knowledgeBases.push(id);
            }
            
            // Register with the bookmarklet if it exists
            if (window.KnowledgeBaseLoader && window.KnowledgeBaseLoader.registerBase) {
                window.KnowledgeBaseLoader.registerBase(id, name, docxUrl, category);
            }
        },

        /**
         * Get knowledge base by ID
         * @param {string} id - Knowledge base ID
         * @returns {Object} Knowledge base config
         */
        getKnowledgeBase: function(id) {
            return this.knowledgeBases[id];
        },

        /**
         * Get all knowledge bases
         * @returns {Object} All knowledge bases
         */
        getAllKnowledgeBases: function() {
            return this.knowledgeBases;
        },

        /**
         * Get knowledge bases by category
         * @param {string} categoryId - Category ID
         * @returns {Array} Knowledge bases in that category
         */
        getKnowledgeBasesByCategory: function(categoryId) {
            if (!this.categories[categoryId]) {
                return [];
            }
            
            return this.categories[categoryId].knowledgeBases.map(id => this.knowledgeBases[id]);
        }
    };

    return kbResearch;
};

// Initialize the knowledge base module
(function() {
    console.log('[KB Research] Starting initialization...');
    
    // Create and initialize the knowledge base module
    const kbResearch = kbResearchModule();
    kbResearch.initialize();
    
    // Expose the module globally
    window.kbResearch = kbResearch;
})();