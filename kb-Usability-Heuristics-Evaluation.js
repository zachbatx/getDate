/**
 * Usability Heuristics Evaluation
 * JavaScript module format for easy importing
 */
const usability_heuristics_evaluationData = {
  "title": "Usability Heuristics Evaluation",
  "name": "Usability Heuristics Knowledge Base",
  "llmInstructions": "### Expert Role Establishment\n* You are an expert usability analyst specializing in heuristic evaluation\n* Your expertise includes identifying, classifying, and providing actionable recommendations based on established usability principles\n* Your approach is balanced, systematic, and evidence-based\n### Neutrality Guidelines\n* ​​Maintain objectivity: Evaluate UI and user flows from a strictly neutral standpoint, explicitly avoiding any pre-existing biases or assumptions.\n* Identify and reframe leading questions: Recognize when questions imply desired answers or embedded assumptions, and actively rephrase them in a neutral manner to solicit unbiased feedback.\n* Prioritize open-ended questions: Focus your inquiries on questions that encourage a variety of responses, avoiding phrasing that might lead evaluators toward predetermined conclusions.\n* Avoid implicit assumptions: Do not frame questions or analyses around presumed scenarios, feelings, or user experiences; only rely on what can be objectively observed or validated.\n* Use neutral language: Select terminology carefully, ensuring that words carry no unintended positive or negative implications, which could unintentionally influence evaluators.\n* Encourage comprehensive and detailed feedback: Pose questions designed to extract detailed observations, insights, and specific examples, covering both positive attributes and negative issues.\n* Ensure unbiased evaluation: Conduct your evaluation independently from external influences or suggestive inputs that could skew the results.\n* Focus strictly on observed elements: Ground your assessment solely in the concrete design and functional elements visible or demonstrable within the UI, disregarding subjective or potentially biased narratives.\n* Aim for balanced assessments: Deliberately identify both strengths and weaknesses of the design or user flow to deliver a thorough, balanced understanding of overall effectiveness.\n* Prioritize authentic user experiences: The core objective is to uncover genuine user perceptions and objectively pinpoint opportunities for enhancement based directly on observable user interactions and responses.\n### Context-Aware Evaluation Logic\nBefore beginning your analysis, determine the appropriate context:\n1. Identify the domain:If analyzing a financial interface, include relevant financial heuristicsFor general interfaces, focus on Nielsen's core heuristicsFor specialized domains, consider relevant domain-specific principles\n1. Consider the audience perspective:For detailed technical evaluations, adopt the perspective of Usability SpecialistsFor design-focused evaluations, consider UX Designers' approachFor product improvement evaluations, think like Product ManagersFor financial interfaces, use Financial UX Designers' expertise\n1. Apply appropriate heuristics:Start with Nielsen's 10 heuristics as a foundationAdd domain-specific heuristics based on the interface typeConsider high-level categories (Transparency, User Control) for organizing findings\n### Comprehensive Evaluation Process\n1. Request Neutralization: Identify and mentally reframe any leading language in the user's request before beginning analysis\n1. Interface Overview: Briefly describe the interface under evaluation without value judgments\n1. Systematic Review: Methodically analyze the interface against each relevant heuristic\n1. Issue Identification: Document specific usability considerations found in the interface\n1. Heuristic Classification: Connect each observation to the specific heuristic(s)\n1. Location Specification: Precisely document interface elements under discussion\n1. Severity Rating: Assign a severity rating (1-4) based on impact and frequency\n1. Justification: Explain how each observation relates to the associated heuristic\n1. User Impact Analysis: Discuss potential consequences for different user groups\n1. Recommendations: Provide specific, actionable suggestions to enhance the interface\n1. Prioritization: Rank observations based on severity and implementation effort\n1. Positive Aspects: Note elements that effectively follow heuristic principles\n1. Additional Observations: Note contextual factors or other relevant considerations\n### Context-Specific Analysis Guidelines\n* For E-commerce Interfaces: Pay special attention to checkout flows, product comparison, and trust indicators\n* For Enterprise Systems: Focus on efficiency, consistency, and error prevention\n* For Financial Interfaces: Prioritize evaluation against financial heuristics with attention to transparency and risk communication\n* For Mobile Interfaces: Consider touch targets, simplified navigation, and context-appropriate inputs\n* For Accessibility Concerns: Give special consideration to inclusive design principles\n### Evaluation Format\nFor each identified consideration, structure your response as follows:\nOBSERVATION: [Brief Description]HEURISTIC: [Relevant Principle]SEVERITY: [Rating/4] - [Justification]LOCATION: [Specific UI Element/Screen]ANALYSIS: [Detailed Explanation]RECOMMENDATION: [Specific Improvement]\n### Severity Rating Guide\n1. Cosmetic (1/4): Minor consideration that will not affect usability significantly\n1. Minor (2/4): May cause slight confusion or delay for users\n1. Major (3/4): Will significantly impair task completion for some users\n1. Critical (4/4): Prevents task completion or causes severe user errors\n### Knowledge Application Guidelines\n* Refer to established heuristic principles when analyzing user interfaces\n* Apply the severity rating system defined here to evaluate observations\n* Use precise terminology in your classifications and assessments\n* Balance identification of issues with recognition of effective design\n* Provide evidence-based recommendations that maintain business goals while enhancing usability",
  "userInstructions": "### How To Submit Interfaces For Review\n* Upload screenshots, mockups, or provide detailed descriptions\n* Specify the user task or journey you'd like evaluated\n* Indicate any specific areas of interest or concern\n* Mention the target users or usage context if relevant\n* For financial interfaces, note specific regulatory considerations or user accessibility needs\n* Specify which professional perspective you'd like applied (e.g., usability specialist, UX designer)\n### Example Queries\n* \"Could you evaluate this banking login interface using relevant heuristics?\"\n* \"Please assess this investment dashboard and identify any usability considerations\"\n* \"What aspects of this loan application process could be examined from a usability perspective?\"\n* \"How does this trading platform address the principle of recognition rather than recall?\"\n* \"Could you review this payment form for potential usability considerations?\"\n* \"Please evaluate how clearly fees are presented in this subscription service\"\n* \"I'd like an analysis of this interface from an expert usability specialist's perspective\"\n* \"Please review this form considering the needs of elderly users with limited tech experience\"\n### Follow-up Options\n* Request detailed analysis of specific interface elements\n* Ask for prioritized implementation recommendations\n* Request pattern analysis across multiple screens\n* Inquire about industry-specific best practices\n* Request comparative analysis with alternative approaches\n* Request analysis from a different professional perspective\n* Ask about specific usability principles and their application\n* Inquire about potential impact on different user groups",
  "highLevelHeuristicCategories": {
    "transparencyAndFeedback": [
      "Description: Design principles that keep users informed about what is happening in the system",
      "Examples:Visibility of system statusHelp users recognize, diagnose, and recover from errorsClear feedback loops",
      "Visibility of system status",
      "Help users recognize, diagnose, and recover from errors",
      "Clear feedback loops"
    ],
    "userAutonomyAndControl": [
      "Description: Principles that give users freedom to navigate, control their experience, and recover from mistakes",
      "Examples:User control and freedomFlexibility and efficiency of useCustomization options",
      "User control and freedom",
      "Flexibility and efficiency of use",
      "Customization options"
    ]
  },
  "nielsenS10UsabilityHeuristics": [
    "Visibility of system statusDescription: The system should always keep users informed about what is going on, through appropriate feedback within reasonable timeExamples: Progress indicators, Loading animations, Confirmation messages, Status updates",
    "Description: The system should always keep users informed about what is going on, through appropriate feedback within reasonable time",
    "Examples: Progress indicators, Loading animations, Confirmation messages, Status updates",
    "Match between system and the real worldDescription: The system should speak the users' language, with words, phrases and concepts familiar to the user rather than system-oriented termsExamples: Familiar metaphors, Natural language, Real-world conventions, Logical information flow",
    "Description: The system should speak the users' language, with words, phrases and concepts familiar to the user rather than system-oriented terms",
    "Examples: Familiar metaphors, Natural language, Real-world conventions, Logical information flow",
    "User control and freedomDescription: Users often choose system functions by mistake and will need a clearly marked 'emergency exit' to leave the unwanted stateExamples: Undo/redo functionality, Cancel operations, Easy navigation back, Clear exit points",
    "Description: Users often choose system functions by mistake and will need a clearly marked 'emergency exit' to leave the unwanted state",
    "Examples: Undo/redo functionality, Cancel operations, Easy navigation back, Clear exit points",
    "Consistency and standardsDescription: Users should not have to wonder whether different words, situations, or actions mean the same thingExamples: Platform conventions, Consistent terminology, Standardized interactions, Uniform design patterns",
    "Description: Users should not have to wonder whether different words, situations, or actions mean the same thing",
    "Examples: Platform conventions, Consistent terminology, Standardized interactions, Uniform design patterns",
    "Error preventionDescription: Even better than good error messages is a careful design which prevents a problem from occurring in the first placeExamples: Confirmation dialogues, Input validation, Forgiving formats, Clear constraints",
    "Description: Even better than good error messages is a careful design which prevents a problem from occurring in the first place",
    "Examples: Confirmation dialogues, Input validation, Forgiving formats, Clear constraints",
    "Recognition rather than recallDescription: Minimize the user's memory load by making objects, actions, and options visibleExamples: Visible options, Suggestions, Contextual tools, Clear navigation paths",
    "Description: Minimize the user's memory load by making objects, actions, and options visible",
    "Examples: Visible options, Suggestions, Contextual tools, Clear navigation paths",
    "Flexibility and efficiency of useDescription: Accelerators — unseen by the novice user — may often speed up the interaction for the expert userExamples: Keyboard shortcuts, Customization, Saved preferences, Expert features",
    "Description: Accelerators — unseen by the novice user — may often speed up the interaction for the expert user",
    "Examples: Keyboard shortcuts, Customization, Saved preferences, Expert features",
    "Aesthetic and minimalist designDescription: Dialogues should not contain information which is irrelevant or rarely neededExamples: Focused content, Visual hierarchy, Information prioritization, Clean layouts",
    "Description: Dialogues should not contain information which is irrelevant or rarely needed",
    "Examples: Focused content, Visual hierarchy, Information prioritization, Clean layouts",
    "Help users recognize, diagnose, and recover from errorsDescription: Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solutionExamples: Clear error messages, Solution suggestions, Recovery instructions, Actionable guidance",
    "Description: Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution",
    "Examples: Clear error messages, Solution suggestions, Recovery instructions, Actionable guidance",
    "Help and documentationDescription: Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentationExamples: Contextual help, Searchable documentation, Tutorials, Task-oriented guidance",
    "Description: Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation",
    "Examples: Contextual help, Searchable documentation, Tutorials, Task-oriented guidance"
  ],
  "financialSpecificHeuristics": [
    "Financial clarityDescription: Financial information should be presented clearly without jargon or unnecessary complexityExamples: Plain language fee descriptions, Clear interest rate presentation, Transparent pricing structures",
    "Description: Financial information should be presented clearly without jargon or unnecessary complexity",
    "Examples: Plain language fee descriptions, Clear interest rate presentation, Transparent pricing structures",
    "Risk transparencyDescription: Risk information should be as prominent as potential benefits or returnsExamples: Balanced risk/reward presentation, Clear risk indicators, Contextual risk explanations",
    "Description: Risk information should be as prominent as potential benefits or returns",
    "Examples: Balanced risk/reward presentation, Clear risk indicators, Contextual risk explanations",
    "Decision supportDescription: Interfaces should support informed financial decision-making without biasExamples: Comparison tools, Scenario calculators, Education resources, Decision checklists",
    "Description: Interfaces should support informed financial decision-making without bias",
    "Examples: Comparison tools, Scenario calculators, Education resources, Decision checklists",
    "Control over financial commitmentsDescription: Users should maintain clear control over their financial commitments and obligationsExamples: Clear subscription management, Easy payment controls, Transparent recurring payment information",
    "Description: Users should maintain clear control over their financial commitments and obligations",
    "Examples: Clear subscription management, Easy payment controls, Transparent recurring payment information",
    "Financial privacy and securityDescription: Financial interfaces should prioritize user privacy and data securityExamples: Clear data usage policies, Strong authentication options, Secure transaction indicators",
    "Description: Financial interfaces should prioritize user privacy and data security",
    "Examples: Clear data usage policies, Strong authentication options, Secure transaction indicators"
  ],
  "severityRatings": [
    "Cosmetic (Level 1)Description: Minor issue that will not affect usability significantlyImpact: Can be fixed if extra time is availableExamples: Visual inconsistencies, Minor aesthetic issues, Stylistic concerns",
    "Description: Minor issue that will not affect usability significantly",
    "Impact: Can be fixed if extra time is available",
    "Examples: Visual inconsistencies, Minor aesthetic issues, Stylistic concerns",
    "Minor (Level 2)Description: May cause confusion or slight delay for usersImpact: Low priority, small impact on usabilityExamples: Unclear labels, Slightly confusing interactions, Non-optimal task flows",
    "Description: May cause confusion or slight delay for users",
    "Impact: Low priority, small impact on usability",
    "Examples: Unclear labels, Slightly confusing interactions, Non-optimal task flows",
    "Major (Level 3)Description: Will significantly impair task completion for some usersImpact: High priority, significant impact on usabilityExamples: Difficult navigation, Confusing functionality, Process breakdowns",
    "Description: Will significantly impair task completion for some users",
    "Impact: High priority, significant impact on usability",
    "Examples: Difficult navigation, Confusing functionality, Process breakdowns",
    "Critical (Level 4)Description: Prevents task completion or causes severe user errorsImpact: Must be fixed before releaseExamples: Form submission failures, Dead-end paths, Functionality that doesn't work",
    "Description: Prevents task completion or causes severe user errors",
    "Impact: Must be fixed before release",
    "Examples: Form submission failures, Dead-end paths, Functionality that doesn't work"
  ],
  "commonHeuristicViolations": {
    "majorViolations": {
      "visibilityOfSystemStatus": [
        "Description: Users aren't informed about what's happening",
        "Examples:Missing progress indicatorsNo confirmation after form submissionUnclear system state during processing",
        "Missing progress indicators",
        "No confirmation after form submission",
        "Unclear system state during processing"
      ],
      "matchBetweenSystemAndRealWorld": [
        "Description: System doesn't align with users' mental models",
        "Examples:Technical jargon instead of user languageUnintuitive metaphorsInformation flow that contradicts expectations",
        "Technical jargon instead of user language",
        "Unintuitive metaphors",
        "Information flow that contradicts expectations"
      ]
    },
    "minorViolations": {
      "consistencyAndStandards": [
        "Description: Interface elements behave differently across the system",
        "Examples:Inconsistent typographyButton styles that vary across pagesNavigation that changes location",
        "Inconsistent typography",
        "Button styles that vary across pages",
        "Navigation that changes location"
      ]
    },
    "financialViolations": {
      "financialClarity": [
        "Description: Financial information is presented in a complex or confusing manner",
        "Examples:Technical financial terminology without explanationComplex fee structures without clear summariesBuried important financial details",
        "Technical financial terminology without explanation",
        "Complex fee structures without clear summaries",
        "Buried important financial details"
      ],
      "riskTransparency": [
        "Description: Risk information is downplayed or difficult to understand",
        "Examples:Risk disclaimers in small printBenefits emphasized visually over risksRisk information requiring additional clicks to access",
        "Risk disclaimers in small print",
        "Benefits emphasized visually over risks",
        "Risk information requiring additional clicks to access"
      ],
      "decisionSupport": [
        "Description: Insufficient tools to support informed financial decisions",
        "Examples:Missing comparison featuresLack of calculators for different scenariosNo educational context for complex products",
        "Missing comparison features",
        "Lack of calculators for different scenarios",
        "No educational context for complex products"
      ]
    }
  },
  "industryApplications": {
    "eCommerce": [
      "Progress Indicators",
      "Real-world Metaphors",
      "Undo Functionality",
      "Constraints and Safeguards",
      "Visual Hierarchy"
    ],
    "enterprise": [
      "Keyboard Shortcuts",
      "Customization Options",
      "Interface Consistency",
      "Smart Defaults",
      "Error Recovery Support"
    ],
    "financial": [
      "Transaction Confirmation",
      "Risk Visualization",
      "Progress Tracking for Applications",
      "Clear Fee Disclosure",
      "Secure Action Confirmation",
      "Financial Education Integration",
      "Contextual Help Systems"
    ]
  },
  "professionalPersonas": {
    "categories": [
      "UX Researchers",
      "UX Designers",
      "Product Managers",
      "Usability Specialists",
      "Financial UX Designers",
      "Banking Product Managers"
    ],
    "examplePersonas": {
      "uXResearchers": [
        "Age: 34",
        "Context: Mid-sized tech company",
        "Tools: Research repositories, analysis software, video conferencing",
        "Challenges: Balancing depth with timeline pressure, stakeholder management, sample recruitment",
        "Description: Maya has 8 years of experience leading UX research. She's skilled at translating complex findings into actionable insights but struggles with tight deadlines and limited resources.",
        "Age: 28",
        "Context: Agency environment with multiple clients",
        "Tools: Remote testing platforms, survey tools, collaboration software",
        "Challenges: Context switching between projects, maintaining research quality with speed, communicating value to clients",
        "Description: Darius conducts research across multiple client projects simultaneously. He excels at adapting methodologies to different contexts but struggles with the constant context switching."
      ],
      "uXDesigners": [
        "Age: 29",
        "Context: Product design team",
        "Tools: Design software, component libraries, heuristic checklists",
        "Challenges: Applying heuristics during design rather than after, balancing aesthetics with usability, maintaining consistency across features",
        "Description: Elena creates user interfaces that need to balance business requirements with usability principles. She uses heuristics as guidelines during the design process.",
        "Age: 36",
        "Context: Design agency",
        "Tools: Prototyping software, design systems, evaluation frameworks",
        "Challenges: Educating clients about usability principles, justifying design decisions, adapting heuristics to different domains",
        "Description: Thomas designs interfaces for various clients with different requirements. He needs to efficiently apply appropriate heuristics to diverse projects and explain their importance."
      ],
      "usabilitySpecialists": [
        "Age: 31",
        "Context: UX consulting firm",
        "Tools: Heuristic evaluation templates, usability testing software, analytics tools",
        "Challenges: Communicating issues to non-UX stakeholders, balancing thoroughness with efficiency, prioritizing findings",
        "Description: Liam conducts heuristic evaluations for various clients and product teams. He specializes in translating usability principles into actionable recommendations.",
        "Age: 35",
        "Context: Enterprise UX team",
        "Tools: Evaluation frameworks, severity rating systems, reporting templates",
        "Challenges: Evaluating complex interfaces systematically, maintaining consistency across evaluators, connecting findings to business impact",
        "Description: Akiko leads usability evaluation initiatives across multiple product lines. She develops standardized approaches to ensure consistent quality assessments."
      ],
      "financialUXDesigners": [
        "Age: 36",
        "Context: Investment platform",
        "Tools: Financial visualization libraries, behavioral analytics tools, design systems",
        "Challenges: Communicating investment risk clearly, designing for financial literacy variations, balancing regulatory requirements with engaging experiences",
        "Description: Hiroshi specializes in designing investment interfaces that make complex financial information understandable. He focuses on ethical presentation of risk and return data, ensuring users can make informed investment decisions without being misled.",
        "Age: 31",
        "Context: Personal finance app company",
        "Tools: Financial design patterns, behavioral finance frameworks, prototyping software",
        "Challenges: Designing features that promote healthy financial behaviors, avoiding addictive patterns in financial tracking, simplifying complex financial decisions",
        "Description: Priya designs interfaces that help users manage personal finances. She works to create experiences that empower users with financial information while avoiding manipulative patterns that might lead to poor financial decisions."
      ],
      "bankingProductManagers": [
        "Age: 42",
        "Context: Digital banking division",
        "Tools: Financial product roadmap tools, compliance tracking software, customer feedback platforms",
        "Challenges: Meeting aggressive growth targets while maintaining ethical standards, navigating complex approval processes, balancing feature innovation with security requirements",
        "Description: Carlos manages digital banking products that serve millions of customers. He strives to create value through thoughtful feature development while ensuring compliance with banking regulations and avoiding manipulative conversion tactics.",
        "Age: 38",
        "Context: Credit union digital services",
        "Tools: User story management software, analytics platforms, regulatory compliance checklists",
        "Challenges: Building trust with traditional banking customers, improving digital adoption rates, maintaining competitive features with limited resources",
        "Description: Lin oversees digital product development for a member-owned credit union. She focuses on transparent, ethical banking experiences that align with the credit union's mission while still meeting modern user expectations."
      ]
    }
  },
  "userStories": [
    "A UX designer needs to evaluate a new interface against established heuristics",
    "A product manager wants to identify usability issues before user testing",
    "A research team needs to document heuristic violations for developers",
    "A design system team needs to ensure components follow usability principles",
    "A startup needs a quick assessment of their MVP's usability",
    "A development team needs to prioritize which usability issues to fix first",
    "A UX consultant needs to provide actionable feedback on a client's platform",
    "A product owner wants to compare the usability of competing solutions",
    "A banking UX team needs to evaluate their mobile transaction flow",
    "A financial advisor needs to assess their client dashboard for usability issues",
    "A trading platform team wants to improve chart visualization usability",
    "A credit union needs to evaluate their loan application form for clarity"
  ],
  "corePrinciples": [
    "Systematic evaluation",
    "Expert-based assessment",
    "Methodological consistency",
    "Evidence-based recommendations",
    "Problem prioritization",
    "Context sensitivity",
    "Multiple evaluator perspective",
    "Comprehensive coverage",
    "Actionable feedback",
    "Severity classification"
  ],
  "keyConsiderations": [
    "Apply established heuristic principles to evaluate interfaces",
    "Identify usability issues across different interface types",
    "Rate severity of usability problems",
    "Provide actionable recommendations based on violations",
    "Connect heuristic findings to specific user impacts",
    "Balance heuristic evaluation with other research methods",
    "Document findings systematically for stakeholder communication",
    "Consider context and user goals when applying heuristics",
    "Evaluate holistically across the entire user experience",
    "Prioritize findings based on impact and implementation effort"
  ]
};

// Make the data available globally
window.usability_heuristics_evaluationData = usability_heuristics_evaluationData;