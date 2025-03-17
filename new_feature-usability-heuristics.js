/**
 * Usability Heuristics Evaluation Feature Module
 * 
 * This module provides comprehensive knowledge and structured tools for evaluating
 * user interfaces against established usability heuristics and best practices.
 * It includes frameworks for systematic assessment, severity rating, and improvement recommendations.
 */

(function() {
  /**
   * UsabilityHeuristics - Object containing the feature implementation
   */
  const UsabilityHeuristics = {
    /**
     * METADATA
     */
    metadata: {
      id: "usabilityHeuristics",
      title: "Usability Heuristics Evaluation",
      description: "A systematic approach to evaluating interfaces using established usability principles and heuristics",
      version: "1.0.0",
      category: "research"
    },

    /**
     * KNOWLEDGE BASE DATA
     */
    knowledgeBase: {
      // Core feature data
      considerations: [
        "Apply established heuristic principles to evaluate interfaces",
        "Identify usability issues across different interface types",
        "Rate severity of usability problems",
        // Additional considerations omitted for brevity
      ],
      
      principles: [
        "Systematic evaluation",
        "Expert-based assessment",
        "Methodological consistency",
        // Additional principles omitted for brevity
      ],
      
      userStories: [
        "A UX designer needs to evaluate a new interface against established heuristics",
        "A product manager wants to identify usability issues before user testing",
        "A research team needs to document heuristic violations for developers",
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
       * @param {object} options - Optional parameters to customize the prompt
       * @returns {string} The generated prompt
       */
      generatePrompt: function(options = {}) {
        // Implementation omitted for brevity
        return "Usability Heuristics knowledge base prompt would be generated here";
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
     * Generate a prompt for the feature
     * @param {object} options - Optional parameters to customize the prompt
     * @returns {string} The generated prompt
     */
    generateFeaturePrompt: function(options) {
      return this.logic.generatePrompt(options);
    }
    
    // Other public methods omitted for brevity
  };

  // Export the feature by creating a global reference that the KB core will look for
  // The KB core will import this and then remove the global
  window.usabilityHeuristicsFeature = UsabilityHeuristics;
})();
