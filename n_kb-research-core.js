/**
 * Research Knowledge Base Core
 * This file provides the core functionality for loading and processing research-related 
 * knowledge bases such as Dark Patterns and Usability Heuristics.
 * 
 * Modified to use JavaScript imports instead of remote JSON fetching
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
        
        // Removed loadJSON utility since we now import data directly
    };

    // Create the knowledge base object
    const kbResearch = {
        name: "Research Best Practices",
        features: {},
        loadedFeatures: {},
        // Keep featureUrls for backward compatibility and feature identification
        featureUrls: {
            darkPatterns: "https://example.com/dark-patterns.json",
            usabilityHeuristics: "https://example.com/usability-heuristics.json"
        },
        
        /**
         * Initialize the knowledge base
         */
        initialize: function() {
            utils.log("Initializing Research Knowledge Base...");
            
            // Pre-populate features to display in dropdown
            this.features = {
                darkPatterns: {
                    title: "Dark Patterns"
                },
                usabilityHeuristics: {
                    title: "Usability Heuristics"
                }
            };
            
            // Pre-load the features data (now that we have it as imports)
            this.loadedFeatures = {
                darkPatterns: darkPatternsData,
                usabilityHeuristics: usabilityHeuristicsData
            };
            
            // Update the feature titles from the loaded data
            for (const [featureId, featureData] of Object.entries(this.loadedFeatures)) {
                this.features[featureId] = {
                    title: featureData.title || featureData.name || featureId
                };
            }
            
            // Register with the bookmarklet loader if available
            if (window.KnowledgeBaseLoader) {
                window.KnowledgeBaseLoader.registerBase(
                    "researchKB", 
                    "Research Best Practices",
                    "n_kb-research-core.js", // Updated to match actual filename
                    "kbResearch"
                );
            }
            
            utils.log("Research Knowledge Base initialized successfully");
        },

        /**
         * Load a specific feature's data
         * @param {string} featureId - The feature identifier
         * @returns {Promise<Object>} - The loaded feature data
         */
        loadFeature: async function(featureId) {
            // This now just returns the already-loaded data
            if (this.loadedFeatures[featureId]) {
                utils.log(`Using imported data for ${featureId}`);
                return this.loadedFeatures[featureId];
            }

            throw new Error(`Unknown feature: ${featureId}`);
        },

        /**
         * Generate a prompt for a specific feature
         * Modified to be synchronous for compatibility with the bookmarklet framework
         * @param {string} featureId - The feature to generate a prompt for
         * @returns {string} - The generated prompt
         */
        generatePrompt: function(featureId) {
            // Check if the feature is already loaded (should always be true now)
            if (!this.loadedFeatures[featureId]) {
                // Return an error message
                return `Error: Feature "${this.features[featureId]?.title || featureId}" not found.\n\n` +
                       `Please check if the feature identifier is correct.`;
            }
            
            const featureData = this.loadedFeatures[featureId];
            
            // Check if the feature data has a prompt generator field
            // This is for backward compatibility - data structure should include llmInstructions
            if (!featureData.llmInstructions) {
                return `Error: No prompt generator available for feature "${featureId}"`;
            }
            
            return this.generateFeaturePrompt(featureData);
        },

        /**
         * Generic prompt generator that uses data from the imported data
         * @param {Object} data - The feature data
         * @returns {string} - The generated prompt
         */
        generateFeaturePrompt: function(data) {
            // Each feature should contain:
            // 1. knowledgeBase section with relevant data
            // 2. llmInstructions section with instructions for LLM
            // 3. userInstructions section with instructions for users
            
            let prompt = `# ${data.title || data.name} Knowledge Base\n\n`;
            
            // Add knowledge base section
            if (data.knowledgeBase) {
                prompt += `## Knowledge Base\n${data.knowledgeBase}\n\n`;
            } else {
                // Fall back to generic formatting of data sections
                prompt += this.formatGenericKnowledgeBase(data);
            }
            
            // Add LLM instructions if present
            if (data.llmInstructions) {
                prompt += `## LLM Instructions\n${data.llmInstructions}\n\n`;
            }
            
            // Add user interaction instructions if present
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