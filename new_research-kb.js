/**
 * Research Knowledge Base Core Module
 * 
 * This module serves as the entry point for the Research knowledge base
 * and handles loading and managing individual research feature modules.
 */

(function() {
  // Define the Research KB object
  const ResearchKB = {
    name: "Research Best Practices",
    
    // Store for loaded features
    features: {},
    
    // Store for personas by category (shared across features)
    personas: [
      /* Persona data would be here - omitted for brevity */
    ],
    
    // Persona categories by feature
    personaCategories: {
      /* Category mapping would be here - omitted for brevity */
    },
    
    /**
     * Register a feature with the knowledge base
     * @param {string} featureId - ID of the feature
     * @param {object} feature - The feature object
     */
    registerFeature: function(featureId, feature) {
      this.features[featureId] = feature;
      console.log(`Registered research feature: ${feature.metadata.title}`);
      return this;
    },
    
    /**
     * Get a specific feature
     * @param {string} featureId - ID of the feature to retrieve
     * @returns {object} The feature or null if not found
     */
    getFeature: function(featureId) {
      return this.features[featureId] || null;
    },
    
    // Other methods - omitted for brevity
    
    /**
     * Generate a prompt for a feature
     * @param {string} featureId - ID of the feature
     * @returns {string} Generated prompt
     */
    generatePrompt: function(featureId) {
      // Check if the feature exists
      const feature = this.getFeature(featureId);
      if (!feature) {
        return `Error: Feature "${featureId}" not found`;
      }
      
      // Use the feature's prompt generator
      return feature.generateFeaturePrompt();
    },
    
    /**
     * Initialize the knowledge base
     */
    initialize: function() {
      console.log("Initializing Research Knowledge Base Core...");
      
      // Load core features
      this.loadCoreFeatures();
      
      console.log("Research Knowledge Base initialized");
      return this;
    },
    
    /**
     * Load core feature modules
     */
    loadCoreFeatures: function() {
      // Import feature modules
      this.importFeature('darkPatterns', './features/feature-dark-patterns.js');
      this.importFeature('disneyMethod', './features/feature-disney-method.js');
      this.importFeature('usabilityHeuristics', './features/feature-usability-heuristics.js');
      // Additional features would be imported here
    },
    
    /**
     * Import a feature module
     * @param {string} featureId - ID to assign to the feature
     * @param {string} scriptPath - Path to the feature script
     */
    importFeature: function(featureId, scriptPath) {
      console.log(`Importing feature: ${featureId} from ${scriptPath}`);
      
      // This would dynamically load the script in a browser environment
      const script = document.createElement('script');
      script.src = scriptPath;
      script.onload = () => {
        console.log(`Feature module loaded: ${featureId}`);
        
        // After loading, the feature should be available in a global variable
        // We need to get the feature from the global scope and register it
        const featureGlobalName = `${featureId}Feature`;
        
        if (window[featureGlobalName]) {
          // Register the feature with our KB
          this.registerFeature(featureId, window[featureGlobalName]);
          
          // Clean up the global
          delete window[featureGlobalName];
        } else {
          console.error(`Feature module loaded but ${featureGlobalName} not found`);
        }
      };
      
      script.onerror = () => {
        console.error(`Failed to load feature module: ${scriptPath}`);
      };
      
      document.head.appendChild(script);
    }
  };
  
  // Initialize the Research KB
  ResearchKB.initialize();
  
  // Make it globally available
  window.kbResearch = ResearchKB;
})();
