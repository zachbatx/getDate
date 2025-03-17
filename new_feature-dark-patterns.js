/**
 * Dark Patterns Feature Module
 * 
 * This module provides comprehensive knowledge and structured tools for analyzing 
 * and identifying dark patterns in user interfaces and digital experiences.
 * Updated with advanced evaluation methodologies and LLM prompting techniques.
 */

(function() {
  /**
   * DarkPatterns - Object containing the feature implementation
   */
  const DarkPatterns = {
    /**
     * METADATA
     */
    metadata: {
      id: "darkPatterns",
      title: "Dark and Deceptive Patterns Analysis",
      description: "Comprehensive knowledge base for identifying, analyzing, and addressing manipulative interface design patterns",
      version: "2.0.0",
      category: "research"
    },

    /**
     * KNOWLEDGE BASE DATA
     */
    knowledgeBase: {
      // Core feature data
      considerations: [
        "Identify high-level manipulation strategies across contexts",
        "Analyze meso-level patterns bridging strategies and implementations",
        "Detect low-level interface elements that exploit user behavior",
        // Additional considerations omitted for brevity
      ],
      
      principles: [
        "Hierarchical classification",
        "Context sensitivity",
        "User impact measurement",
        // Additional principles omitted for brevity
      ],
      
      userStories: [
        "A UX auditor needs to identify dark patterns in an e-commerce checkout flow",
        "A regulatory analyst requires a framework to categorize manipulative design elements",
        // Additional user stories omitted for brevity
      ],
      
      // Feature-specific data - omitted for brevity
    },

    /**
     * LOGIC
     */
    logic: {
      /**
       * Generate a prompt for this feature
       * @param {string} featureId - ID of the specific feature
       * @returns {string} The generated prompt
       */
      generatePrompt: function(featureId) {
        // Implementation omitted for brevity
        return "Dark Patterns knowledge base prompt would be generated here";
      },
      
      // Other methods omitted for brevity
    },

    /**
     * LLM INSTRUCTIONS
     */
    llmInstructions: {
      // LLM instructions omitted for brevity
    },

    /**
     * USER INSTRUCTIONS
     */
    userInstructions: {
      // User instructions omitted for brevity
    },

    /**
     * PUBLIC API
     */
    initialize: function() {
      console.log(`Initializing ${this.metadata.title} feature (v${this.metadata.version})`);
      return this;
    },
    
    /**
     * Generate a prompt for the specified feature
     * @returns {string} The generated prompt
     */
    generateFeaturePrompt: function() {
      return this.logic.generatePrompt();
    }
    
    // Other public methods omitted for brevity
  };

  // Export the feature by creating a global reference that the KB core will look for
  // The KB core will import this and then remove the global
  window.darkPatternsFeature = DarkPatterns;
})();
