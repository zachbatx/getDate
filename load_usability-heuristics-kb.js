window.kbUsabilityHeuristics = {
  version: "1.0",
  name: "Usability Heuristics Knowledge Base",
  heuristicTypes: {
    highLevel: [
      {
        name: "Transparency and Feedback",
        description: "Design principles that keep users informed about what is happening in the system",
        examples: ["Visibility of system status", "Help users recognize, diagnose, and recover from errors", "Clear feedback loops"]
      },
      {
        name: "User Autonomy and Control",
        description: "Principles that give users freedom to navigate, control their experience, and recover from mistakes",
        examples: ["User control and freedom", "Flexibility and efficiency of use", "Customization options"]
      },
      {
        name: "Cognitive Support",
        description: "Principles that reduce mental workload and support human cognitive limitations",
        examples: ["Recognition rather than recall", "Consistency and standards", "Error prevention"]
      }
    ],
    mesoLevel: [
      {
        name: "Visibility of system status",
        description: "The system should always keep users informed about what is going on, through appropriate feedback within reasonable time",
        examples: ["Progress indicators", "Status messages", "Visual feedback for actions"]
      },
      {
        name: "Match between system and the real world",
        description: "The system should speak the users' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms",
        examples: ["Natural language", "Familiar metaphors", "Logical information flow"]
      },
      {
        name: "User control and freedom",
        description: "Users often choose system functions by mistake and will need a clearly marked 'emergency exit' to leave the unwanted state",
        examples: ["Undo/redo actions", "Cancel operations", "Back buttons"]
      },
      {
        name: "Consistency and standards",
        description: "Users should not have to wonder whether different words, situations, or actions mean the same thing",
        examples: ["Consistent terminology", "Platform conventions", "Design patterns"]
      },
      {
        name: "Error prevention",
        description: "A careful design which prevents a problem from occurring in the first place is better than good error messages",
        examples: ["Confirmations", "Constraints", "Default values"]
      },
      {
        name: "Recognition rather than recall",
        description: "Minimize the user's memory load by making objects, actions, and options visible",
        examples: ["Visible options", "Suggestions", "Contextual help"]
      },
      {
        name: "Flexibility and efficiency of use",
        description: "Accelerators—unseen by the novice user—may often speed up the interaction for the expert user",
        examples: ["Shortcuts", "Personalization", "Adaptivity"]
      },
      {
        name: "Aesthetic and minimalist design",
        description: "Dialogues should not contain information which is irrelevant or rarely needed",
        examples: ["Visual hierarchy", "White space", "Information prioritization"]
      },
      {
        name: "Help users recognize, diagnose, and recover from errors",
        description: "Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution",
        examples: ["Clear error messages", "Recovery suggestions", "Helpful guidance"]
      },
      {
        name: "Help and documentation",
        description: "Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation",
        examples: ["Contextual help", "Searchable documentation", "Task-oriented instructions"]
      }
    ],
    lowLevel: [
      {
        name: "Progress Indicators",
        description: "Visual elements that show system progress or status",
        examples: ["Loading bars", "Step indicators in multi-stage forms", "Percentage completion displays"]
      },
      {
        name: "Status Feedback",
        description: "Immediate feedback that confirms user actions have been registered",
        examples: ["Button state changes", "Success messages", "Hover effects"]
      },
      {
        name: "Natural Language",
        description: "Using terminology, phrases, and concepts familiar to users rather than system-oriented terms",
        examples: ["Domain-specific vocabulary", "Conversational text", "Avoiding technical jargon"]
      },
      {
        name: "Real-world Metaphors",
        description: "Using real-world analogies to make digital interfaces intuitive",
        examples: ["Folder icons for file storage", "Shopping cart for e-commerce", "Trash/recycle bin for deletion"]
      },
      {
        name: "Undo Functionality",
        description: "Allowing users to reverse actions easily",
        examples: ["Undo button", "Version history", "Restore deleted items"]
      },
      {
        name: "Escape Routes",
        description: "Providing clear exits from unwanted states or processes",
        examples: ["Cancel buttons", "Close dialogs", "Back navigation"]
      },
      {
        name: "Interface Consistency",
        description: "Ensuring elements behave and appear consistently throughout the system",
        examples: ["Consistent button styles", "Predictable navigation placement", "Uniform interaction patterns"]
      },
      {
        name: "Platform Conventions",
        description: "Following established patterns of the platform or ecosystem",
        examples: ["Standard menu locations", "Common gesture support", "Typical control layouts"]
      },
      {
        name: "Constraints and Safeguards",
        description: "Limiting actions to prevent errors before they occur",
        examples: ["Field validation", "Disabling impossible options", "Confirmation for destructive actions"]
      },
      {
        name: "Smart Defaults",
        description: "Pre-selecting the most likely or safest options",
        examples: ["Form field suggestions", "Intelligent presets", "Context-aware default values"]
      },
      {
        name: "Visual Cues",
        description: "Making important elements, actions, and options clearly visible",
        examples: ["Highlighting active elements", "Distinctive interactive components", "Visual emphasis on primary actions"]
      },
      {
        name: "Suggestion Systems",
        description: "Providing contextual recommendations to reduce recall burden",
        examples: ["Auto-complete", "Recently used items", "Smart suggestions"]
      },
      {
        name: "Keyboard Shortcuts",
        description: "Offering accelerators for frequent actions",
        examples: ["Keyboard combinations", "Gesture shortcuts", "Command aliases"]
      },
      {
        name: "Customization Options",
        description: "Allowing users to tailor the interface to their needs",
        examples: ["User preferences", "Configurable dashboards", "Adjustable settings"]
      },
      {
        name: "Visual Hierarchy",
        description: "Organizing elements by importance using visual design",
        examples: ["Size differentiation", "Color contrast", "Spatial arrangement"]
      },
      {
        name: "Information Density Control",
        description: "Balancing information display to avoid overload",
        examples: ["Progressive disclosure", "Collapsible sections", "Show/hide options"]
      },
      {
        name: "Constructive Error Messages",
        description: "Providing clear, helpful error information that guides toward resolution",
        examples: ["Specific error descriptions", "Actionable suggestions", "Plain language explanations"]
      },
      {
        name: "Error Recovery Support",
        description: "Helping users fix problems after they occur",
        examples: ["Correction guidance", "Auto-save functionality", "Form recovery"]
      },
      {
        name: "Contextual Help",
        description: "Providing assistance relevant to the current task or context",
        examples: ["Tooltips", "Inline instructions", "Contextual hints"]
      },
      {
        name: "Searchable Documentation",
        description: "Making help resources easy to navigate and find",
        examples: ["Search functionality", "Indexed help topics", "FAQ sections"]
      }
    ]
  },
  industryUse: {
    ecommerce: ["Progress Indicators", "Real-world Metaphors", "Undo Functionality", "Constraints and Safeguards", "Visual Hierarchy"],
    enterprise: ["Keyboard Shortcuts", "Customization Options", "Interface Consistency", "Smart Defaults", "Error Recovery Support"],
    mobile: ["Status Feedback", "Escape Routes", "Platform Conventions", "Visual Cues", "Information Density Control"],
    healthcare: ["Error Prevention", "Constructive Error Messages", "Natural Language", "Contextual Help", "Interface Consistency"]
  },
  features: {
    evaluation: {
      title: "Heuristic Evaluation Methodology",
      considerations: [
        "Identify usability issues across the entire interface",
        "Rate severity of issues to prioritize fixes",
        "Consider the context and user goals when evaluating",
        "Apply heuristics appropriate to the platform and domain",
        "Involve multiple evaluators for comprehensive coverage",
        "Document findings with specific examples and locations",
        "Provide constructive suggestions for improvement",
        "Consider both expert and novice user perspectives"
      ],
      principles: [
        "Systematic assessment",
        "Severity prioritization",
        "Context sensitivity",
        "Multiple evaluator perspective",
        "Evidence-based recommendations"
      ],
      userStories: [
        "A UX designer needs to evaluate a new checkout flow against established heuristics",
        "A product manager wants to identify usability issues before a major release",
        "A UX researcher needs to train team members on conducting heuristic evaluations",
        "A developer needs to understand why certain interface choices violate usability principles"
      ]
    },
    implementation: {
      title: "Heuristic Implementation Guidelines",
      considerations: [
        "Apply heuristics during the design phase, not just evaluation",
        "Implement heuristics consistently across the interface",
        "Balance competing heuristics when trade-offs are necessary",
        "Adapt heuristic application to the specific domain and context",
        "Consider edge cases and exceptional situations",
        "Build on existing design systems to maintain consistency",
        "Validate implementation through usability testing",
        "Document design decisions and their heuristic justifications"
      ],
      principles: [
        "Proactive application",
        "Consistent implementation",
        "Context-appropriate adaptation",
        "Design system integration",
        "Empirical validation"
      ],
      userStories: [
        "A design team needs guidelines for implementing visibility of system status in a dashboard",
        "A developer wants to ensure new features align with established usability principles",
        "A product manager needs to justify design decisions based on usability heuristics",
        "A startup wants to create a usable product with limited resources"
      ]
    },
    accessibility: {
      title: "Accessibility and Heuristic Evaluation",
      considerations: [
        "Evaluate how heuristics intersect with accessibility guidelines",
        "Consider diverse user abilities when applying heuristics",
        "Ensure error prevention and recovery works for all users",
        "Apply recognition over recall for users with cognitive limitations",
        "Evaluate flexibility options for users with different abilities",
        "Assess how system status is communicated to all users",
        "Check that help and documentation is accessible",
        "Ensure aesthetics don't compromise functional accessibility"
      ],
      principles: [
        "Universal design integration",
        "Multi-modal feedback",
        "Inclusive error handling",
        "Cognitive accessibility",
        "Adaptive flexibility"
      ],
      userStories: [
        "An accessibility specialist needs to combine WCAG with heuristic evaluation",
        "A government website team needs to ensure compliance while maintaining usability",
        "A designer wants to create interfaces usable by people with various disabilities",
        "A product team needs to understand how heuristics apply differently to assistive technology users"
      ]
    },
    mobile: {
      title: "Mobile-Specific Heuristic Considerations",
      considerations: [
        "Adapt heuristics to limited screen real estate",
        "Consider touch as primary input method",
        "Evaluate usability in mobile contexts (on-the-go, divided attention)",
        "Apply visibility of status in a device with limited notification options",
        "Ensure error recovery works within mobile capabilities",
        "Evaluate efficiency for common mobile tasks",
        "Consider platform-specific conventions and expectations",
        "Test under variable connectivity conditions"
      ],
      principles: [
        "Touch optimization",
        "Screen constraint adaptation",
        "Mobile context awareness",
        "Platform guideline integration",
        "Connectivity resilience"
      ],
      userStories: [
        "A mobile app designer needs to evaluate a new feature against mobile-specific heuristics",
        "A startup is converting a web application to mobile and needs guidance",
        "A UX team needs to identify why their mobile conversion rates are lower than desktop",
        "A developer wants to understand mobile-specific error prevention techniques"
      ]
    },
    enterprise: {
      title: "Enterprise System Heuristic Applications",
      considerations: [
        "Apply efficiency heuristics for frequent, complex tasks",
        "Evaluate error prevention for mission-critical functions",
        "Consider progressive disclosure for complex functionality",
        "Assess recognition vs. recall for infrequently used features",
        "Evaluate consistency across large, complex systems",
        "Apply help and documentation for specialized functions",
        "Consider customization needs for different user roles",
        "Evaluate system status visibility for long-running processes"
      ],
      principles: [
        "Efficiency prioritization",
        "Complexity management",
        "Role-based adaptation",
        "Error consequence minimization",
        "Learning curve optimization"
      ],
      userStories: [
        "An enterprise software team needs to improve efficiency for power users",
        "A healthcare system designer needs to minimize errors in critical workflows",
        "A financial software team needs to balance complexity with usability",
        "An ERP implementation team needs to evaluate configuration interfaces"
      ]
    },
    metrics: {
      title: "Measuring Heuristic Compliance and Impact",
      considerations: [
        "Define quantitative measures for heuristic compliance",
        "Track usability metrics before and after heuristic-based improvements",
        "Correlate heuristic violations with user performance metrics",
        "Develop rating systems for severity of heuristic violations",
        "Measure business impact of heuristic improvements",
        "Compare heuristic evaluation results with usability testing findings",
        "Track heuristic compliance over product iterations",
        "Measure learning curve impact of heuristic implementation"
      ],
      principles: [
        "Quantitative assessment",
        "Comparative measurement",
        "Business impact correlation",
        "Longitudinal tracking",
        "Multi-method validation"
      ],
      userStories: [
        "A product team needs to measure the ROI of fixing heuristic violations",
        "A UX researcher wants to validate heuristic evaluation findings with metrics",
        "A manager needs to prioritize which heuristic issues to address first",
        "A design system team wants to track heuristic compliance across products"
      ]
    },
    testing: {
      title: "Integrating Heuristic Evaluation with Usability Testing",
      considerations: [
        "Use heuristic evaluation to identify issues before usability testing",
        "Design usability test scenarios to verify heuristic findings",
        "Compare expert heuristic evaluation with actual user behavior",
        "Use heuristics to explain usability testing observations",
        "Prioritize testing scenarios based on heuristic violation severity",
        "Apply appropriate heuristics based on user testing demographics",
        "Document how heuristic violations manifest in user testing",
        "Develop test protocols that address specific heuristic principles"
      ],
      principles: [
        "Complementary methodology",
        "Sequential integration",
        "Explanatory framework",
        "Targeted validation",
        "Iterative refinement"
      ],
      userStories: [
        "A UX team wants to efficiently combine expert evaluation with user testing",
        "A researcher needs to explain usability testing findings to developers",
        "A product manager needs to decide between heuristic evaluation and user testing with limited resources",
        "A design team wants to validate whether heuristic-based changes improved user experience"
      ]
    },
    ai: {
      title: "Heuristics for AI-Enhanced Interfaces",
      considerations: [
        "Apply transparency heuristics to AI decision-making",
        "Ensure user control over AI-driven features",
        "Evaluate error prevention and recovery for AI predictions",
        "Consider consistency when AI behavior may vary",
        "Apply appropriate real-world metaphors to explain AI concepts",
        "Assess recognition vs. recall for AI-suggested options",
        "Evaluate aesthetic design that communicates AI capabilities accurately",
        "Provide help and documentation for novel AI interactions"
      ],
      principles: [
        "AI transparency",
        "Predictable intelligence",
        "Human oversight",
        "Expectation management",
        "Trust-building interaction"
      ],
      userStories: [
        "A team designing an AI-powered assistant needs usability guidelines",
        "A UX designer needs to make AI recommendations more transparent to users",
        "A product manager wants to ensure users maintain control over AI features",
        "A researcher is studying how to communicate AI limitations through the interface"
      ]
    }
  },
  stakeholderCategories: {
    evaluation: ["UX Researchers", "UX Designers", "Product Managers", "Usability Specialists"],
    implementation: ["UX Designers", "Developers", "Product Managers", "Design System Teams"],
    accessibility: ["Accessibility Specialists", "UX Designers", "Compliance Officers", "User Advocates"],
    mobile: ["Mobile Designers", "App Developers", "UX Researchers", "Product Managers"],
    enterprise: ["Enterprise UX Designers", "Business Analysts", "IT Managers", "Training Specialists"],
    metrics: ["UX Researchers", "Analytics Specialists", "Product Managers", "Executives"],
    testing: ["UX Researchers", "Test Engineers", "Product Managers", "UX Designers"],
    ai: ["AI UX Specialists", "Data Scientists", "Product Managers", "UX Researchers"]
  },
  personas: [
    {
      category: "UX Researchers",
      examples: [
        {
          name: "Maya",
          age: 34,
          context: "Digital product research team",
          tools: "Usability testing software, heuristic evaluation templates, user analytics platforms",
          challenges: "Balancing thoroughness with time constraints, convincing stakeholders of issue severity, translating findings to actionable recommendations",
          description: "Maya conducts research to understand user needs and evaluate interface usability. She uses heuristic evaluation to quickly identify potential issues before validation through user testing."
        },
        {
          name: "Raj",
          age: 41,
          context: "Research consultancy",
          tools: "Remote testing platforms, heuristic analysis frameworks, reporting templates",
          challenges: "Evaluating diverse interfaces consistently, prioritizing findings for clients, measuring impact of recommendations",
          description: "Raj performs evaluations for multiple clients across industries. He needs efficient methods to identify usability issues and communicate them persuasively to non-UX stakeholders."
        }
      ]
    },
    {
      category: "UX Designers",
      examples: [
        {
          name: "Elena",
          age: 29,
          context: "Product design team",
          tools: "Design software, component libraries, heuristic checklists",
          challenges: "Applying heuristics during design rather than after, balancing aesthetics with usability, maintaining consistency across features",
          description: "Elena creates user interfaces that need to balance business requirements with usability principles. She uses heuristics as guidelines during the design process."
        },
        {
          name: "Thomas",
          age: 36,
          context: "Design agency",
          tools: "Prototyping software, design systems, evaluation frameworks",
          challenges: "Educating clients about usability principles, justifying design decisions, adapting heuristics to different domains",
          description: "Thomas designs interfaces for various clients with different requirements. He needs to efficiently apply appropriate heuristics to diverse projects and explain their importance."
        }
      ]
    },
    {
      category: "Product Managers",
      examples: [
        {
          name: "Sophia",
          age: 32,
          context: "SaaS product company",
          tools: "Product roadmap software, usability metrics dashboards, prioritization frameworks",
          challenges: "Balancing feature development with usability improvements, quantifying usability ROI, coordinating cross-functional improvements",
          description: "Sophia manages product development and needs to prioritize which usability issues to address. She uses heuristic evaluation results to inform roadmap decisions."
        },
        {
          name: "Marcus",
          age: 44,
          context: "Enterprise software company",
          tools: "Project management systems, requirement documentation, user feedback platforms",
          challenges: "Translating usability findings to development requirements, balancing complexity with usability, justifying UX investment",
          description: "Marcus oversees complex products with specialized user needs. He uses heuristic frameworks to ensure consistent user experience across different modules and features."
        }
      ]
    },
    {
      category: "Developers",
      examples: [
        {
          name: "Liam",
          age: 28,
          context: "Frontend development team",
          tools: "IDE, component libraries, UX pattern documentation",
          challenges: "Implementing designs while maintaining usability, understanding heuristic principles, addressing usability in code reviews",
          description: "Liam builds user interfaces and needs to understand how implementation decisions affect usability. He references heuristics when making technical decisions that impact the user experience."
        },
        {
          name: "Akiko",
          age: 35,
          context: "Full-stack development team",
          tools: "Code repositories, design system documentation, testing frameworks",
          challenges: "Balancing technical constraints with usability needs, implementing error prevention programmatically, testing for heuristic compliance",
          description: "Akiko implements both frontend and backend systems and needs to ensure technical decisions support usability principles across the entire application architecture."
        }
      ]
    },
    {
      category: "Accessibility Specialists",
      examples: [
        {
          name: "Jerome",
          age: 39,
          context: "Digital accessibility team",
          tools: "Screen readers, accessibility testing tools, WCAG guidelines",
          challenges: "Integrating accessibility with broader usability, advocating for inclusive design, ensuring both compliance and usability",
          description: "Jerome evaluates interfaces for accessibility and needs to connect accessibility principles with usability heuristics. He helps teams understand how accessibility supports better usability for everyone."
        },
        {
          name: "Priya",
          age: 31,
          context: "Inclusive design consultancy",
          tools: "Assistive technology, simulation tools, evaluation frameworks",
          challenges: "Demonstrating business value of inclusive design, training teams on accessible practices, balancing compliance with user experience",
          description: "Priya helps organizations create more accessible products. She uses heuristic evaluation methods adapted for accessibility to identify issues that affect users with disabilities."
        }
      ]
    },
    {
      category: "Mobile Designers",
      examples: [
        {
          name: "Chen",
          age: 30,
          context: "Mobile app design team",
          tools: "Mobile prototyping tools, gesture libraries, platform design guidelines",
          challenges: "Designing for various screen sizes, optimizing for touch interaction, adapting to platform conventions",
          description: "Chen creates interfaces for mobile applications. He applies heuristics specifically adapted to mobile contexts, considering limited screen space and touch interaction patterns."
        },
        {
          name: "Aisha",
          age: 33,
          context: "Cross-platform app agency",
          tools: "Multi-platform design systems, responsive design frameworks, device testing suites",
          challenges: "Maintaining consistency across platforms, balancing native conventions with cross-platform consistency, optimizing for different interaction models",
          description: "Aisha designs apps that work across different mobile platforms. She uses heuristics to ensure usability principles are maintained while respecting platform-specific expectations."
        }
      ]
    },
    {
      category: "AI UX Specialists",
      examples: [
        {
          name: "Diego",
          age: 36,
          context: "AI product team",
          tools: "AI interaction prototyping, uncertainty visualization, conversational design frameworks",
          challenges: "Communicating AI capabilities and limitations, designing for probabilistic systems, maintaining user control over AI",
          description: "Diego designs interfaces for AI-enhanced products. He adapts traditional heuristics to address new challenges in AI transparency, control, and error communication."
        },
        {
          name: "Naomi",
          age: 40,
          context: "Voice UI team",
          tools: "Voice prototyping platforms, conversation flow mapping, multimodal design systems",
          challenges: "Creating discoverable voice commands, handling recognition errors gracefully, designing without visual interface",
          description: "Naomi creates voice user interfaces. She applies usability heuristics to conversational interfaces where traditional visual design approaches must be reconsidered."
        }
      ]
    }
  ],
  generatePrompt: function(feature) {
    if (feature === "heuristicList") {
      var prompt = "# " + this.name + " - Comprehensive Usability Heuristics Classification\n\n";
      
      prompt += "## High-Level Heuristic Categories\n";
      this.heuristicTypes.highLevel.forEach(function(category) {
        prompt += "### " + category.name + "\n";
        prompt += "- Description: " + category.description + "\n";
        prompt += "- Examples: " + category.examples.join(", ") + "\n\n";
      });
      
      prompt += "## Nielsen-Norman's 10 Usability Heuristics\n";
      this.heuristicTypes.mesoLevel.forEach(function(heuristic) {
        prompt += "### " + heuristic.name + "\n";
        prompt += "- Description: " + heuristic.description + "\n";
        prompt += "- Examples: " + heuristic.examples.join(", ") + "\n\n";
      });
      
      prompt += "## Specific Usability Implementation Techniques\n";
      this.heuristicTypes.lowLevel.forEach(function(technique) {
        prompt += "### " + technique.name + "\n";
        prompt += "- Description: " + technique.description + "\n";
        prompt += "- Examples: " + technique.examples.join(", ") + "\n\n";
      });
      
      prompt += "## Industry-Specific Usability Techniques\n";
      for (var industry in this.industryUse) {
        prompt += "### " + industry.charAt(0).toUpperCase() + industry.slice(1) + "\n";
        this.industryUse[industry].forEach(function(technique) {
          prompt += "- " + technique + "\n";
        });
        prompt += "\n";
      }
      
      prompt += "# IMPORTANT: INSTRUCTIONS FOR USING THIS KNOWLEDGE BASE\n\n";
      prompt += "You are now equipped with the Usability Heuristics Knowledge Base focusing on heuristic evaluation.\n\n";
      
      prompt += "To analyze designs or interfaces against usability heuristics:\n";
      prompt += "1. Upload screenshots, mockups, or wireframes of the interface you want to evaluate\n";
      prompt += "2. Describe the user journey or interaction flow in detail\n";
      prompt += "3. Ask about specific heuristics or usability concerns\n";
      prompt += "4. Request analysis of industry-specific applications\n\n";
      
      prompt += "## Example Questions You Can Ask\n";
      prompt += "1. \"What heuristics are violated in this interface?\"\n";
      prompt += "2. \"How could this design better support visibility of system status?\"\n";
      prompt += "3. \"What usability issues do you see in this mobile checkout flow?\"\n";
      prompt += "4. \"How can I improve error prevention in this form?\"\n";
      prompt += "5. \"What recognition rather than recall issues exist in this navigation?\"\n";
      prompt += "6. \"How can I make this enterprise dashboard more efficient for power users?\"\n";
      prompt += "7. \"What would be a more user-friendly approach to this design?\"\n";
      
      return prompt;
    }
    
    if (!this.features[feature]) {
      return "Error: Could not generate pre-prompt. Feature not found.";
    }
    
    var featureInfo = this.features[feature];
    var prompt = "# " + this.name + " Pre-prompt for " + featureInfo.title + "\n\n## Usability Heuristics Reference\n\n";
    
    prompt += "### High-Level Heuristic Categories\n";
    this.heuristicTypes.highLevel.slice(0, 2).forEach(function(category) {
      prompt += "- " + category.name + ": " + category.description + "\n";
    });
    
    prompt += "\n### Nielsen-Norman's Key Heuristics\n";
    this.heuristicTypes.mesoLevel.slice(0, 5).forEach(function(heuristic) {
      prompt += "- " + heuristic.name + ": " + heuristic.description + "\n";
    });
    
    prompt += "\n### Specific Implementation Techniques\n";
    this.heuristicTypes.lowLevel.slice(0, 3).forEach(function(technique) {
      prompt += "- " + technique.name + ": " + technique.description + "\n";
    });
    
    prompt += "\n## Key Heuristic Evaluation Considerations\n";
    featureInfo.considerations.forEach(function(consideration) {
      prompt += "- " + consideration + "\n";
    });
    
    prompt += "\n## Core Principles\n";
    featureInfo.principles.forEach(function(principle) {
      prompt += "- " + principle + "\n";
    });
    
    prompt += "\n## User Scenarios\n";
    featureInfo.userStories.forEach(function(story) {
      prompt += "- " + story + "\n";
    });
    
    // Function to shuffle an array
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    
    // Function to get sample personas for a category
    function getSamplePersonas(category, count) {
      var categoryStakeholders = this.stakeholderCategories[category] || [];
      var relevantPersonas = [];
      
      this.personas.forEach(function(personaGroup) {
        if (categoryStakeholders.includes(personaGroup.category)) {
          personaGroup.examples.forEach(function(example) {
            relevantPersonas.push({...example, category: personaGroup.category});
          });
        }
      });
      
      // Shuffle and take requested number
      relevantPersonas = relevantPersonas.sort(() => Math.random() - 0.5);
      return relevantPersonas.slice(0, count);
    }
    
    // Get sample personas
    var samplePersonas = getSamplePersonas.call(this, feature, 2);
    
    prompt += "\n## Stakeholder Personas\n";
    
    // Generate relevant heuristics for the feature
    samplePersonas.forEach(function(persona, index) {
      prompt += "\n### Relevant Heuristics for " + featureInfo.title + "\n";
      
      var relevantHeuristics = [];
      
      // Select relevant heuristics based on feature
      switch(feature) {
        case "evaluation":
          relevantHeuristics = ["Visibility of system status", "Consistency and standards", "Error prevention", "Recognition rather than recall", "Aesthetic and minimalist design"];
          break;
        case "implementation":
          relevantHeuristics = ["Match between system and the real world", "User control and freedom", "Consistency and standards", "Flexibility and efficiency of use", "Help and documentation"];
          break;
        case "accessibility":
          relevantHeuristics = ["Visibility of system status", "User control and freedom", "Error prevention", "Recognition rather than recall", "Help and documentation"];
          break;
        case "mobile":
          relevantHeuristics = ["Visibility of system status", "User control and freedom", "Error prevention", "Aesthetic and minimalist design", "Flexibility and efficiency of use"];
          break;
        case "enterprise":
          relevantHeuristics = ["Visibility of system status", "Error prevention", "Recognition rather than recall", "Flexibility and efficiency of use", "Help and documentation"];
          break;
        case "metrics":
          relevantHeuristics = ["Visibility of system status", "Error prevention", "Flexibility and efficiency of use", "Aesthetic and minimalist design", "Help users recognize, diagnose, and recover from errors"];
          break;
        case "testing":
          relevantHeuristics = ["Visibility of system status", "Match between system and the real world", "Error prevention", "Recognition rather than recall", "Help users recognize, diagnose, and recover from errors"];
          break;
        case "ai":
          relevantHeuristics = ["Visibility of system status", "User control and freedom", "Error prevention", "Recognition rather than recall", "Help and documentation"];
          break;
        default:
          relevantHeuristics = ["Visibility of system status", "User control and freedom", "Consistency and standards", "Error prevention", "Recognition rather than recall"];
      }
      
      // Add descriptions to heuristics
      relevantHeuristics.forEach(function(heuristicName) {
        var description = "";
        var heuristicTypes = this.heuristicTypes;
        
        for (var level in heuristicTypes) {
          var found = heuristicTypes[level].find(function(h) {
            return h.name === heuristicName;
          });
          
          if (found) {
            description = found.description;
            break;
          }
        }
        
        prompt += "- " + heuristicName + ": " + (description || "Usability principle for better interface design") + "\n";
      }, this);
      
      // Add persona details
      prompt += "\n### Persona " + (index + 1) + ": " + persona.name + "\n";
      if (persona.age) {
        prompt += "- Age: " + persona.age + "\n";
      }
      prompt += "- Role: " + persona.category + "\n";
      prompt += "- Context: " + persona.context + "\n";
      prompt += "- Tools: " + persona.tools + "\n";
      prompt += "- Key Challenges: " + persona.challenges + "\n";
      prompt += "- Background: " + persona.description + "\n";
    }, this);
    
    prompt += "\n## Analysis Request\nBased on the information above, please:\n\n";
    
    prompt += "1. **Evaluate the provided interface or design** against usability heuristics related to " + featureInfo.title + ". Include:\n";
    prompt += "   - Identification of heuristic violations or compliance\n";
    prompt += "   - Assessment of severity and user impact\n";
    prompt += "   - Analysis of specific interface elements and their usability\n";
    prompt += "   - Consideration of context and user goals\n\n";
    
    prompt += "2. **Provide recommendations for improvement** that would enhance usability. Include:\n";
    prompt += "   - Specific design modifications\n";
    prompt += "   - Implementation considerations\n";
    prompt += "   - Expected impact on user experience\n";
    prompt += "   - Prioritization of changes based on severity\n\n";
    
    prompt += "3. **Suggest evaluation methods** to validate improvements, including:\n";
    prompt += "   - Appropriate testing approaches\n";
    prompt += "   - Metrics to measure effectiveness\n";
    prompt += "   - Stakeholders to involve in evaluation\n";
    prompt += "   - Iterative improvement processes\n\n";
    
    prompt += "# IMPORTANT: INSTRUCTIONS FOR USING THIS KNOWLEDGE BASE\n\n";
    prompt += "You are now equipped with the Usability Heuristics Knowledge Base focusing on " + featureInfo.title + ".\n\n";
    
    prompt += "To evaluate interfaces against usability heuristics:\n";
    prompt += "1. Upload screenshots, mockups, or wireframes of the interface you want to analyze\n";
    prompt += "2. Describe the user journey or interaction scenario in detail\n";
    prompt += "3. Specify any particular heuristics or concerns you're looking for\n";
    prompt += "4. Ask specific questions about improvements or evaluation methods\n\n";
    
    prompt += "## Example Questions You Can Ask\n";
    
    // Feature-specific example questions
    switch(feature) {
      case "evaluation":
        prompt += "1. \"What heuristic violations do you see in this interface?\"\n";
        prompt += "2. \"How severe are the usability issues in this design?\"\n";
        prompt += "3. \"What methodology should I use to evaluate this interface?\"\n";
        prompt += "4. \"How can I prioritize the usability issues found in this evaluation?\"\n";
        prompt += "5. \"What documentation should I create for this heuristic evaluation?\"\n";
        break;
      case "implementation":
        prompt += "1. \"How can I implement better visibility of system status in this design?\"\n";
        prompt += "2. \"What patterns should I use to improve error prevention?\"\n";
        prompt += "3. \"How should I structure this form to follow usability heuristics?\"\n";
        prompt += "4. \"What's the best way to implement recognition rather than recall?\"\n";
        prompt += "5. \"How can I maintain consistency when adding this new feature?\"\n";
        break;
      case "accessibility":
        prompt += "1. \"How do these usability heuristics relate to WCAG guidelines?\"\n";
        prompt += "2. \"What accessibility issues are present in this error handling system?\"\n";
        prompt += "3. \"How can I make system status more accessible to screen reader users?\"\n";
        prompt += "4. \"What recognition rather than recall issues affect users with cognitive limitations?\"\n";
        prompt += "5. \"How can I ensure keyboard accessibility while maintaining efficiency of use?\"\n";
        break;
      case "mobile":
        prompt += "1. \"How should I adapt this desktop interface for mobile using heuristic principles?\"\n";
        prompt += "2. \"What touch-specific usability issues do you see in this design?\"\n";
        prompt += "3. \"How can I improve visibility of system status on a small screen?\"\n";
        prompt += "4. \"What error prevention techniques work best for touch interfaces?\"\n";
        prompt += "5. \"How should I handle complex navigation on mobile while following heuristics?\"\n";
        break;
      case "enterprise":
        prompt += "1. \"How can I simplify this complex workflow while maintaining functionality?\"\n";
        prompt += "2. \"What efficiency improvements would help expert users in this interface?\"\n";
        prompt += "3. \"How should I organize this dashboard to support recognition rather than recall?\"\n";
        prompt += "4. \"What error prevention techniques are most important for this critical system?\"\n";
        prompt += "5. \"How can I improve help and documentation for this specialized interface?\"\n";
        break;
      case "metrics":
        prompt += "1. \"What metrics should I track to measure compliance with visibility of status?\"\n";
        prompt += "2. \"How can I quantify improvements in error prevention?\"\n";
        prompt += "3. \"What business metrics would be affected by fixing these heuristic violations?\"\n";
        prompt += "4. \"How should I measure the effectiveness of help and documentation?\"\n";
        prompt += "5. \"What would be a good baseline measure for heuristic compliance?\"\n";
        break;
      case "testing":
        prompt += "1. \"What usability tests would best validate the heuristic issues found?\"\n";
        prompt += "2. \"How should I design test scenarios to focus on error recovery?\"\n";
        prompt += "3. \"What's the most efficient way to test for recognition rather than recall issues?\"\n";
        prompt += "4. \"How many participants do I need to validate these heuristic findings?\"\n";
        prompt += "5. \"What testing methodology would work best for this type of interface?\"\n";
        break;
      case "ai":
        prompt += "1. \"How should I design this AI interface to maintain user control?\"\n";
        prompt += "2. \"What's the best way to communicate AI confidence levels in the interface?\"\n";
        prompt += "3. \"How can I make AI decision-making more transparent to users?\"\n";
        prompt += "4. \"What error prevention considerations are unique to AI interfaces?\"\n";
        prompt += "5. \"How should help and documentation work for novel AI interactions?\"\n";
        break;
      default:
        prompt += "1. \"How can I improve the usability of this interface?\"\n";
        prompt += "2. \"What heuristic violations do you see in this design?\"\n";
        prompt += "3. \"How would you redesign this to better follow usability principles?\"\n";
        prompt += "4. \"What testing methods would verify these usability improvements?\"\n";
        prompt += "5. \"How can I measure the impact of these usability enhancements?\"\n";
    }
    
    return prompt;
  }
};