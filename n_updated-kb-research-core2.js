/**
 * Research Knowledge Base Core
 * This file provides the core functionality for loading and processing research-related 
 * knowledge bases such as Dark Patterns and Usability Heuristics.
 */
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
        },

        /**
         * Load JSON data from a URL
         * @param {string} url - The URL to load JSON from
         * @returns {Promise<Object>} - The loaded JSON data
         */
        loadJSON: async function(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
                }
                return await response.json();
            } catch (error) {
                utils.log(`Error loading JSON from ${url}: ${error.message}`, 'error');
                throw error;
            }
        }
    };

    // Create the knowledge base object
    const kbResearch = {
        name: "Research Best Practices",
        features: {},
        loadedFeatures: {},
        featureUrls: {
            darkPatterns: "n_dark-patterns.json", // Local file path
            usabilityHeuristics: "n_usability-heuristics.json" // Local file path
        },
        isInitialized: false, // Track initialization state
        
        /**
         * Initialize the knowledge base
         */
        initialize: async function() {
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
            
            // Register with the bookmarklet loader if available
            if (window.KnowledgeBaseLoader) {
                window.KnowledgeBaseLoader.registerBase(
                    "researchKB", 
                    "Research Best Practices",
                    "n_updated-kb-research-core.js", // Match actual filename
                    "kbResearch"
                );
            }

            // Immediately load all data
            try {
                await this.preloadAllFeatures();
                this.isInitialized = true;
                utils.log("Research Knowledge Base initialized successfully with all data preloaded");
                
                // Update UI if possible
                this.updateLoadingStatusInUI("All data successfully preloaded");
            } catch (error) {
                utils.log(`Initialization error: ${error.message}`, 'error');
                this.updateLoadingStatusInUI(`Error preloading data: ${error.message}`, 'error');
            }
        },

        /**
         * Update loading status in the UI if the element exists
         */
        updateLoadingStatusInUI: function(message, type = 'success') {
            // Find the status element if it exists
            const statusElement = document.getElementById('load-status');
            if (statusElement) {
                statusElement.textContent = message;
                statusElement.style.color = type === 'error' ? 'red' : 'green';
            }
        },

        /**
         * Preload all feature data and wait for completion
         * @returns {Promise} - Resolves when all data is loaded
         */
        preloadAllFeatures: async function() {
            utils.log("Preloading all feature data...");
            
            // Get all feature IDs from the featureUrls object
            const featureIds = Object.keys(this.featureUrls);
            
            try {
                // Use Promise.all to wait for all loading to complete
                await Promise.all(featureIds.map(featureId => this.loadFeature(featureId)));
                utils.log("All feature data successfully preloaded");
                return true;
            } catch (error) {
                utils.log(`Failed to preload all features: ${error.message}`, 'error');
                throw error; // Re-throw to allow caller to handle
            }
        },

        /**
         * Load a specific feature's data
         * @param {string} featureId - The feature identifier
         * @returns {Promise<Object>} - The loaded feature data
         */
        loadFeature: async function(featureId) {
            if (this.loadedFeatures[featureId]) {
                utils.log(`Using cached data for ${featureId}`);
                return this.loadedFeatures[featureId];
            }

            const url = this.featureUrls[featureId];
            if (!url) {
                throw new Error(`Unknown feature: ${featureId}`);
            }

            utils.log(`Loading feature data for ${featureId}...`);
            try {
                const featureData = await utils.loadJSON(url);
                this.loadedFeatures[featureId] = featureData;
                
                // Update the feature in the features object
                this.features[featureId] = {
                    title: featureData.title || featureData.name || featureId
                };
                
                utils.log(`Successfully loaded ${featureId} data`);
                return featureData;
            } catch (error) {
                utils.log(`Failed to load feature ${featureId}: ${error.message}`, 'error');
                throw error;
            }
        },

        /**
         * Generate a prompt for a specific feature
         * @param {string} featureId - The feature to generate a prompt for
         * @returns {string} - The generated prompt
         */
        generatePrompt: function(featureId) {
            // Check if the feature is already loaded
            if (!this.loadedFeatures[featureId]) {
                // If we're already initialized, this is an unexpected state
                if (this.isInitialized) {
                    return `Error: Feature "${featureId}" data is missing despite initialization. Please refresh and try again.`;
                }
                
                // Otherwise, still loading
                return `Loading data for "${this.features[featureId]?.title || featureId}"...\n\n` +
                       `Please wait a moment and try again. The data is being fetched.`;
            }
            
            const featureData = this.loadedFeatures[featureId];
            return this.generateFeaturePrompt(featureData);
        },

        /**
         * Generic prompt generator that uses data from the JSON file
         * @param {Object} data - The feature data
         * @returns {string} - The generated prompt
         */
        generateFeaturePrompt: function(data) {
            // Each feature JSON should contain:
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

    // Initialize the knowledge base and immediately preload data
    // Use async IIFE to properly handle the async initialization
    (async function() {
        try {
            await kbResearch.initialize();
        } catch (error) {
            utils.log(`Error during initialization: ${error.message}`, 'error');
        }
    })();
    
    // Expose to global scope - this is what the bookmarklet framework expects
    window.kbResearch = kbResearch;
})();