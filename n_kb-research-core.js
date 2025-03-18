/**
 * Research Knowledge Base Core
 * This file provides the core functionality for loading and processing research-related 
 * knowledge bases such as Dark Patterns and Usability Heuristics.
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

    // Configuration for available knowledge base features
    const knowledgeBaseConfig = [
        {
            id: 'darkPatterns',
            title: 'Dark Patterns',
            scriptPath: './n_dark-patterns.js',
            globalVarName: 'darkPatternsData'
        },
        {
            id: 'usabilityHeuristics',
            title: 'Usability Heuristics',
            scriptPath: './n_usability-heuristics.js',
            globalVarName: 'usabilityHeuristicsData'
        }
        // Add new features here by just adding a new object to this array
    ];

    // Create the knowledge base object
    const kbResearch = {
        name: "Research Best Practices",
        features: {},
        loadedFeatures: {},
        
        /**
         * Initialize the knowledge base
         */
        initialize: function() {
            utils.log("Initializing Research Knowledge Base...");
            this._loadKnowledgeBases();
        },

        /**
         * Load all knowledge bases from configuration
         */
        _loadKnowledgeBases: function() {
            const totalFeatures = knowledgeBaseConfig.length;
            let loadedCount = 0;
            
            // If no features to load, we're already initialized
            if (totalFeatures === 0) {
                utils.log("No knowledge bases configured", "error");
                return;
            }
            
            // Load each knowledge base from config
            knowledgeBaseConfig.forEach(feature => {
                this._loadFeature(feature, () => {
                    loadedCount++;
                    utils.log(`Loaded ${loadedCount}/${totalFeatures} knowledge bases`);
                    
                    // If all features loaded, we're initialized
                    if (loadedCount === totalFeatures) {
                        utils.log("Research Knowledge Base initialized successfully");
                    }
                });
            });
        },
        
        /**
         * Load a single knowledge base feature
         * @param {Object} feature - Feature configuration
         * @param {Function} callback - Function to call when loaded
         */
        _loadFeature: function(feature, callback) {
            utils.log(`Loading ${feature.title || feature.id}...`);
            
            // Create a script element to load the feature
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = feature.scriptPath;
            
            script.onload = () => {
                const featureData = window[feature.globalVarName];
                
                if (featureData) {
                    // Register the feature in our collections
                    this.loadedFeatures[feature.id] = featureData;
                    
                    // Set up feature metadata
                    this.features[feature.id] = {
                        title: featureData.title || feature.title || feature.id
                    };
                    
                    utils.log(`${feature.title || feature.id} loaded successfully`);
                    callback();
                } else {
                    utils.log(`${feature.title || feature.id} data not found in global scope`, "error");
                    callback(); // Call callback anyway to avoid deadlock
                }
            };
            
            script.onerror = () => {
                utils.log(`Failed to load ${feature.title || feature.id}`, "error");
                callback(); // Call callback anyway to avoid deadlock
            };
            
            document.head.appendChild(script);
        },

        /**
         * Get a specific feature's data
         * @param {string} featureId - The feature identifier
         * @returns {Object} - The feature data
         */
        getFeature: function(featureId) {
            if (this.loadedFeatures[featureId]) {
                return this.loadedFeatures[featureId];
            }
            throw new Error(`Unknown feature: ${featureId}`);
        },

        /**
         * Get a list of all available features
         * @returns {Array} - Array of feature IDs
         */
        getAvailableFeatures: function() {
            return Object.keys(this.features);
        },

        /**
         * Generate a prompt for a specific feature
         * @param {string} featureId - The feature to generate a prompt for
         * @returns {string} - The generated prompt
         */
        generatePrompt: function(featureId) {
            try {
                const featureData = this.getFeature(featureId);
                
                // Check if the feature data has llmInstructions
                if (!featureData.llmInstructions) {
                    return `Error: No instructions available for feature "${featureId}"`;
                }
                
                return this.generateFeaturePrompt(featureData);
            } catch (error) {
                return `Error: ${error.message}`;
            }
        },

        /**
         * Generate prompt from feature data
         * @param {Object} data - The feature data
         * @returns {string} - The generated prompt
         */
        generateFeaturePrompt: function(data) {
            // Structure the prompt with all available sections
            let prompt = `# ${data.title || data.name} Knowledge Base\n\n`;
            
            // Add formatted knowledge base section
            prompt += this.formatGenericKnowledgeBase(data);
            
            // Add LLM instructions
            if (data.llmInstructions) {
                prompt += `## LLM Instructions\n${data.llmInstructions}\n\n`;
            }
            
            // Add user interaction instructions
            if (data.userInstructions) {
                prompt += `## User Interaction Instructions\n${data.userInstructions}\n\n`;
            }
            
            return prompt;
        },
        
        /**
         * Generic fallback formatter for knowledge base data
         * @param {Object} data - The feature data
         * @returns {string} - Formatted knowledge base section
         */
        formatGenericKnowledgeBase: function(data) {
            let result = '';
            
            // Iterate through data properties and format them
            for (const [key, value] of Object.entries(data)) {
                // Skip non-data properties
                if (['title', 'name', 'llmInstructions', 'userInstructions'].includes(key)) {
                    continue;
                }
                
                // Format the section based on data type
                if (typeof value === 'object' && value !== null) {
                    const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);
                    result += `### ${sectionTitle}\n`;
                    
                    if (Array.isArray(value)) {
                        // Format array items
                        value.forEach((item, index) => {
                            if (typeof item === 'object') {
                                const itemName = item.name || `Item ${index + 1}`;
                                result += `- **${itemName}**: `;
                                
                                if (item.description) {
                                    result += `${item.description}\n`;
                                } else {
                                    result += this.formatObjectProperties(item) + '\n';
                                }
                            } else {
                                result += `- ${item}\n`;
                            }
                        });
                    } else {
                        // Format nested objects
                        for (const [subKey, subValue] of Object.entries(value)) {
                            const subSectionTitle = subKey.charAt(0).toUpperCase() + subKey.slice(1);
                            result += `#### ${subSectionTitle}\n`;
                            
                            if (Array.isArray(subValue)) {
                                subValue.forEach((item, index) => {
                                    if (typeof item === 'object') {
                                        const itemName = item.name || `Item ${index + 1}`;
                                        result += `- **${itemName}**: `;
                                        
                                        if (item.description) {
                                            result += `${item.description}\n`;
                                        } else {
                                            result += this.formatObjectProperties(item) + '\n';
                                        }
                                    } else {
                                        result += `- ${item}\n`;
                                    }
                                });
                            } else if (typeof subValue === 'object') {
                                result += this.formatObjectProperties(subValue) + '\n';
                            } else {
                                result += `${subValue}\n`;
                            }
                            
                            result += '\n';
                        }
                    }
                    
                    result += '\n';
                }
            }
            
            return result;
        },
        
        /**
         * Format object properties for display
         * @param {Object} obj - Object to format
         * @returns {string} - Formatted string
         */
        formatObjectProperties: function(obj) {
            if (!obj || typeof obj !== 'object') return '';
            
            return Object.entries(obj)
                .filter(([key]) => key !== 'name') // Skip name as it's already used
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return `${key}: ${value.join(', ')}`;
                    } else if (typeof value === 'object' && value !== null) {
                        return `${key}: ${JSON.stringify(value)}`;
                    } else {
                        return `${key}: ${value}`;
                    }
                })
                .join('; ');
        },
        
        /**
         * Register a new knowledge base feature at runtime
         * @param {Object} featureConfig - Configuration for the new feature
         */
        registerFeature: function(featureConfig) {
            // Add to configuration
            knowledgeBaseConfig.push(featureConfig);
            
            // Load the feature
            this._loadFeature(featureConfig, () => {
                utils.log(`Dynamic feature ${featureConfig.title || featureConfig.id} registration complete`);
            });
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