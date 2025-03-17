/**
 * Disney Method Feature Module
 * 
 * This module provides comprehensive knowledge and structured tools for implementing
 * Walt Disney's three-phase creative thinking approach in UX research contexts.
 * It offers strategies for effectively applying dreamer, realist, and critic thinking modes.
 */

(function() {
  /**
   * DisneyMethod - Object containing the feature implementation
   */
  const DisneyMethod = {
    /**
     * METADATA
     */
    metadata: {
      id: "disneyMethod",
      title: "The Disney Method",
      description: "A structured approach to creative thinking using three distinct mindsets: Dreamer, Realist, and Critic",
      version: "1.0.0",
      category: "research"
    },

    /**
     * KNOWLEDGE BASE DATA
     */
    knowledgeBase: {
      // Core feature data
      considerations: [
        "Implement dreamer, realist, and critic thinking phases",
        "Use role assignments for team collaboration",
        "Design appropriate documentation for each phase",
        // Additional considerations omitted for brevity
      ],
      
      principles: [
        "Sequential thinking modes",
        "Role separation",
        "Constructive evaluation",
        // Additional principles omitted for brevity
      ],
      
      userStories: [
        "A UX researcher needs to brainstorm innovative study methods",
        "A research team wants to critique protocols without stifling creativity",
        "A solo practitioner needs to balance imagination with feasibility",
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
       * @param {string} phaseId - Optional ID of specific phase to focus on
       * @param {string} contextId - Optional ID of specific context to focus on
       * @param {string} integrationId - Optional ID of specific integration to focus on
       * @returns {string} The generated prompt
       */
      generatePrompt: function(phaseId, contextId, integrationId) {
        // Implementation omitted for brevity
        return "Disney Method knowledge base prompt would be generated here";
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
     * @param {string} phaseId - Optional phase to focus on
     * @param {string} contextId - Optional context to apply
     * @param {string} integrationId - Optional integration to include
     * @returns {string} The generated prompt
     */
    generateFeaturePrompt: function(phaseId, contextId, integrationId) {
      return this.logic.generatePrompt(phaseId, contextId, integrationId);
    }
    
    // Other public methods omitted for brevity
  };

  // Export the feature by creating a global reference that the KB core will look for
  // The KB core will import this and then remove the global
  window.disneyMethodFeature = DisneyMethod;
})();
