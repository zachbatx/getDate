// Disney Method Content Template
// --------------------------------
// Instructions for use:
// 1. **llmInstructions**: Provide internal guidelines for the LLM regarding tone, style, and approach (e.g., "tell it like it is", "forward-thinking", "no sugar-coating").
// 2. **userInstructions**: Include any context or specific directives given by the user to align the response with their expectations.
// 3. **Dreamer**: Generate creative, unconstrained ideas. Describe your ideal vision and innovative concepts.
// 4. **Realist**: Outline practical, actionable steps to turn the ideas into a feasible plan.
// 5. **Critic**: Identify potential challenges, risks, and provide constructive feedback.
// 6. **Summary**: Recap the insights and list clear next steps.

const disneyMethodTemplate = {
    llmInstructions: {
      tone: "",        // e.g., "Be direct, tell it like it is; no sugar-coating; forward-thinking."
      style: "",       // e.g., "Direct, concise, and pragmatic."
      formatting: "",  // e.g., "Maintain clear, distinct sections for each part."
      additional: ""   // Any extra internal guidelines.
    },
    userInstructions: {
      context: "",     // Contextual details about the task or subject.
      goals: "",       // The desired outcome or objectives.
      constraints: ""  // Any specific limitations or requirements provided by the user.
    },
    dreamer: {
      vision: "",          // Describe your ideal vision or big idea.
      creativeIdeas: "",   // List imaginative ideas without constraints.
      inspiration: ""      // Note what inspired these ideas.
    },
    realist: {
      feasibleSteps: "",   // Detail actionable steps to achieve the vision.
      resources: "",       // Identify necessary tools, skills, or resources.
      timeline: ""         // Provide an estimated timeline for implementation.
    },
    critic: {
      potentialRisks: "",       // Highlight possible obstacles or risks.
      mitigationStrategies: "", // Suggest strategies to overcome challenges.
      criticalFeedback: ""      // Offer honest and direct evaluation of the plan.
    },
    summary: {
      overallInsights: "", // Recap the key points from each section.
      nextSteps: ""        // Outline clear, forward-moving actions.
    }
  };
  
  // Export the template if used in a module system
  module.exports = disneyMethodTemplate;
  