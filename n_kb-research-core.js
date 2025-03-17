/**
 * Research Knowledge Base Core
 * This file provides the core functionality for loading and processing research-related 
 * knowledge bases such as Dark Patterns and Usability Heuristics.
 * 
 * Uses direct JavaScript imports for knowledge base data
 */
import darkPatternsData from './n_dark-patterns.js';
import usabilityHeuristicsData from './n_usability-heuristics.js';

(function() {
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
            
            // Pre-load the features data from imports
            this.loadedFeatures = {
                darkPatterns: darkPatternsData,
                usabilityHeuristics: usabilityHeuristicsData
            };
            
            // Set up features based on loaded data
            this.features = {
                darkPatterns: {
                    title: darkPatternsData.title || "Dark Patterns"
                },
                usabilityHeuristics: {
                    title: usabilityHeuristicsData.title || "Usability Heuristics"
                }
            };
            
            // Register with the bookmarklet loader if available
            if (window.KnowledgeBaseLoader) {
                window.KnowledgeBaseLoader.registerBase(
                    "researchKB", 
                    "Research Best Practices",
                    "n_kb-research-core.js",
                    "kbResearch"
                );
            }
            
            utils.log("Research Knowledge Base initialized successfully");
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
        }
    };

    // Initialize the knowledge base
    kbResearch.initialize();
    
    // Expose to global scope - this is what the bookmarklet framework expects
    window.kbResearch = kbResearch;
})();