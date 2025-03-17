/**
 * Usability Heuristics Knowledge Base
 * JavaScript format for direct browser loading
 */
const usabilityHeuristicsData = {
  "title": "Usability Heuristics Evaluation",
  "name": "Usability Heuristics Knowledge Base",
  "heuristics": {
    "highLevel": [
      {
        "name": "Transparency and Feedback",
        "description": "Design principles that keep users informed about what is happening in the system",
        "examples": [
          "Visibility of system status",
          "Help users recognize, diagnose, and recover from errors",
          "Clear feedback loops"
        ]
      },
      {
        "name": "User Autonomy and Control",
        "description": "Principles that give users freedom to navigate, control their experience, and recover from mistakes",
        "examples": [
          "User control and freedom",
          "Flexibility and efficiency of use",
          "Customization options"
        ]
      }
    ],
    "nielsen": [
      {
        "name": "Visibility of system status",
        "description": "The system should always keep users informed about what is going on, through appropriate feedback within reasonable time",
        "examples": ["Progress indicators", "Loading animations", "Confirmation messages", "Status updates"]
      },
      {
        "name": "Match between system and the real world",
        "description": "The system should speak the users' language, with words, phrases and concepts familiar to the user rather than system-oriented terms",
        "examples": ["Familiar metaphors", "Natural language", "Real-world conventions", "Logical information flow"]
      },
      {
        "name": "User control and freedom",
        "description": "Users often choose system functions by mistake and will need a clearly marked 'emergency exit' to leave the unwanted state",
        "examples": ["Undo/redo functionality", "Cancel operations", "Easy navigation back", "Clear exit points"]
      },
      {
        "name": "Consistency and standards",
        "description": "Users should not have to wonder whether different words, situations, or actions mean the same thing",
        "examples": ["Platform conventions", "Consistent terminology", "Standardized interactions", "Uniform design patterns"]
      },
      {
        "name": "Error prevention",
        "description": "Even better than good error messages is a careful design which prevents a problem from occurring in the first place",
        "examples": ["Confirmation dialogues", "Input validation", "Forgiving formats", "Clear constraints"]
      },
      {
        "name": "Recognition rather than recall",
        "description": "Minimize the user's memory load by making objects, actions, and options visible",
        "examples": ["Visible options", "Suggestions", "Contextual tools", "Clear navigation paths"]
      },
      {
        "name": "Flexibility and efficiency of use",
        "description": "Accelerators — unseen by the novice user — may often speed up the interaction for the expert user",
        "examples": ["Keyboard shortcuts", "Customization", "Saved preferences", "Expert features"]
      },
      {
        "name": "Aesthetic and minimalist design",
        "description": "Dialogues should not contain information which is irrelevant or rarely needed",
        "examples": ["Focused content", "Visual hierarchy", "Information prioritization", "Clean layouts"]
      },
      {
        "name": "Help users recognize, diagnose, and recover from errors",
        "description": "Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution",
        "examples": ["Clear error messages", "Solution suggestions", "Recovery instructions", "Actionable guidance"]
      },
      {
        "name": "Help and documentation",
        "description": "Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation",
        "examples": ["Contextual help", "Searchable documentation", "Tutorials", "Task-oriented guidance"]
      }
    ],
    "financial": [
      {
        "name": "Financial clarity",
        "description": "Financial information should be presented clearly without jargon or unnecessary complexity",
        "examples": ["Plain language fee descriptions", "Clear interest rate presentation", "Transparent pricing structures"]
      },
      {
        "name": "Risk transparency",
        "description": "Risk information should be as prominent as potential benefits or returns",
        "examples": ["Balanced risk/reward presentation", "Clear risk indicators", "Contextual risk explanations"]
      },
      {
        "name": "Decision support",
        "description": "Interfaces should support informed financial decision-making without bias",
        "examples": ["Comparison tools", "Scenario calculators", "Education resources", "Decision checklists"]
      },
      {
        "name": "Control over financial commitments",
        "description": "Users should maintain clear control over their financial commitments and obligations",
        "examples": ["Clear subscription management", "Easy payment controls", "Transparent recurring payment information"]
      },
      {
        "name": "Financial privacy and security",
        "description": "Financial interfaces should prioritize user privacy and data security",
        "examples": ["Clear data usage policies", "Strong authentication options", "Secure transaction indicators"]
      }
    ]
  },
  "severityRatings": [
    {
      "level": 1,
      "name": "Cosmetic",
      "description": "Minor issue that will not affect usability significantly",
      "impact": "Can be fixed if extra time is available",
      "examples": ["Visual inconsistencies", "Minor aesthetic issues", "Stylistic concerns"]
    },
    {
      "level": 2,
      "name": "Minor",
      "description": "May cause confusion or slight delay for users",
      "impact": "Low priority, small impact on usability",
      "examples": ["Unclear labels", "Slightly confusing interactions", "Non-optimal task flows"]
    },
    {
      "level": 3,
      "name": "Major",
      "description": "Will significantly impair task completion for some users",
      "impact": "High priority, significant impact on usability",
      "examples": ["Difficult navigation", "Confusing functionality", "Process breakdowns"]
    },
    {
      "level": 4,
      "name": "Critical",
      "description": "Prevents task completion or causes severe user errors",
      "impact": "Must be fixed before release",
      "examples": ["Form submission failures", "Dead-end paths", "Functionality that doesn't work"]
    }
  ],
  "violations": {
    "major": [
      {
        "heuristic": "Visibility of system status",
        "description": "Users aren't informed about what's happening",
        "examples": [
          "Missing progress indicators",
          "No confirmation after form submission",
          "Unclear system state during processing"
        ]
      },
      {
        "heuristic": "Match between system and real world",
        "description": "System doesn't align with users' mental models",
        "examples": [
          "Technical jargon instead of user language",
          "Unintuitive metaphors",
          "Information flow that contradicts expectations"
        ]
      }
    ],
    "minor": [
      {
        "heuristic": "Consistency and standards",
        "description": "Interface elements behave differently across the system",
        "examples": [
          "Inconsistent typography",
          "Button styles that vary across pages",
          "Navigation that changes location"
        ]
      }
    ],
    "financial": [
      {
        "heuristic": "Financial clarity",
        "description": "Financial information is presented in a complex or confusing manner",
        "examples": [
          "Technical financial terminology without explanation",
          "Complex fee structures without clear summaries",
          "Buried important financial details"
        ]
      },
      {
        "heuristic": "Risk transparency",
        "description": "Risk information is downplayed or difficult to understand",
        "examples": [
          "Risk disclaimers in small print",
          "Benefits emphasized visually over risks",
          "Risk information requiring additional clicks to access"
        ]
      },
      {
        "heuristic": "Decision support",
        "description": "Insufficient tools to support informed financial decisions",
        "examples": [
          "Missing comparison features",
          "Lack of calculators for different scenarios",
          "No educational context for complex products"
        ]
      }
    ]
  },
  "industryApplications": {
    "ecommerce": [
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
  "personas": {
    "professionalCategories": [
      "UX Researchers",
      "UX Designers",
      "Product Managers",
      "Usability Specialists",
      "Financial UX Designers",
      "Banking Product Managers"
    ],
    "examples": [
      {
        "category": "UX Researchers",
        "name": "Maya",
        "age": 34,
        "context": "Mid-sized tech company",
        "tools": "Research repositories, analysis software, video conferencing",
        "challenges": "Balancing depth with timeline pressure, stakeholder management, sample recruitment",
        "description": "Maya has 8 years of experience leading UX research. She's skilled at translating complex findings into actionable insights but struggles with tight deadlines and limited resources."
      },
      {
        "category": "UX Researchers",
        "name": "Darius",
        "age": 28,
        "context": "Agency environment with multiple clients",
        "tools": "Remote testing platforms, survey tools, collaboration software",
        "challenges": "Context switching between projects, maintaining research quality with speed, communicating value to clients",
        "description": "Darius conducts research across multiple client projects simultaneously. He excels at adapting methodologies to different contexts but struggles with the constant context switching."
      },
      {
        "category": "UX Designers",
        "name": "Elena",
        "age": 29,
        "context": "Product design team",
        "tools": "Design software, component libraries, heuristic checklists",
        "challenges": "Applying heuristics during design rather than after, balancing aesthetics with usability, maintaining consistency across features",
        "description": "Elena creates user interfaces that need to balance business requirements with usability principles. She uses heuristics as guidelines during the design process."
      },
      {
        "category": "UX Designers",
        "name": "Thomas",
        "age": 36,
        "context": "Design agency",
        "tools": "Prototyping software, design systems, evaluation frameworks",
        "challenges": "Educating clients about usability principles, justifying design decisions, adapting heuristics to different domains",
        "description": "Thomas designs interfaces for various clients with different requirements. He needs to efficiently apply appropriate heuristics to diverse projects and explain their importance."
      },
      {
        "category": "Usability Specialists",
        "name": "Liam",
        "age": 31,
        "context": "UX consulting firm",
        "tools": "Heuristic evaluation templates, usability testing software, analytics tools",
        "challenges": "Communicating issues to non-UX stakeholders, balancing thoroughness with efficiency, prioritizing findings",
        "description": "Liam conducts heuristic evaluations for various clients and product teams. He specializes in translating usability principles into actionable recommendations."
      },
      {
        "category": "Usability Specialists",
        "name": "Akiko",
        "age": 35,
        "context": "Enterprise UX team",
        "tools": "Evaluation frameworks, severity rating systems, reporting templates",
        "challenges": "Evaluating complex interfaces systematically, maintaining consistency across evaluators, connecting findings to business impact",
        "description": "Akiko leads usability evaluation initiatives across multiple product lines. She develops standardized approaches to ensure consistent quality assessments."
      },
      {
        "category": "Financial UX Designers",
        "name": "Hiroshi",
        "age": 36,
        "context": "Investment platform",
        "tools": "Financial visualization libraries, behavioral analytics tools, design systems",
        "challenges": "Communicating investment risk clearly, designing for financial literacy variations, balancing regulatory requirements with engaging experiences",
        "description": "Hiroshi specializes in designing investment interfaces that make complex financial information understandable. He focuses on ethical presentation of risk and return data, ensuring users can make informed investment decisions without being misled."
      },
      {
        "category": "Financial UX Designers",
        "name": "Priya",
        "age": 31,
        "context": "Personal finance app company",
        "tools": "Financial design patterns, behavioral finance frameworks, prototyping software",
        "challenges": "Designing features that promote healthy financial behaviors, avoiding addictive patterns in financial tracking, simplifying complex financial decisions",
        "description": "Priya designs interfaces that help users manage personal finances. She works to create experiences that empower users with financial information while avoiding manipulative patterns that might lead to poor financial decisions."
      },
      {
        "category": "Banking Product Managers",
        "name": "Carlos",
        "age": 42,
        "context": "Digital banking division",
        "tools": "Financial product roadmap tools, compliance tracking software, customer feedback platforms",
        "challenges": "Meeting aggressive growth targets while maintaining ethical standards, navigating complex approval processes, balancing feature innovation with security requirements",
        "description": "Carlos manages digital banking products that serve millions of customers. He strives to create value through thoughtful feature development while ensuring compliance with banking regulations and avoiding manipulative conversion tactics."
      },
      {
        "category": "Banking Product Managers",
        "name": "Lin",
        "age": 38,
        "context": "Credit union digital services",
        "tools": "User story management software, analytics platforms, regulatory compliance checklists",
        "challenges": "Building trust with traditional banking customers, improving digital adoption rates, maintaining competitive features with limited resources",
        "description": "Lin oversees digital product development for a member-owned credit union. She focuses on transparent, ethical banking experiences that align with the credit union's mission while still meeting modern user expectations."
      }
    ]
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
  "principles": [
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
  "considerations": [
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
  ],
  "llmInstructions": "You are an expert usability analyst specializing in heuristic evaluation. Your role is to identify, classify, and provide actionable recommendations for usability issues in interfaces based on established heuristic principles.\n\n### Context-Aware Evaluation Logic\nBefore beginning your analysis, determine the appropriate context:\n\n1. **Identify the domain:**\n   - If analyzing a financial interface, include relevant financial heuristics\n   - For general interfaces, focus on Nielsen's core heuristics\n\n2. **Consider the audience perspective:**\n   - For detailed technical evaluations, adopt the perspective of Usability Specialists\n   - For design-focused evaluations, consider UX Designers' approach\n   - For product improvement evaluations, think like Product Managers\n   - For financial interfaces, use Financial UX Designers' expertise\n\n3. **Apply appropriate heuristics:**\n   - Start with Nielsen's 10 heuristics as a foundation\n   - Add domain-specific heuristics based on the interface type\n   - Consider high-level categories (Transparency, User Control) for organizing findings\n\n### Step-by-Step Evaluation Process\n1. **Interface Overview**: Briefly describe the interface under evaluation\n2. **Systematic Review**: Methodically analyze the interface against each relevant heuristic\n3. **Issue Identification**: Document specific usability issues found in the interface\n4. **Heuristic Classification**: Connect each issue to the specific violated heuristic(s)\n5. **Severity Rating**: Assign a severity rating (1-4) based on impact and frequency\n6. **Justification**: Explain why each issue violates the associated heuristic\n7. **Recommendations**: Provide specific, actionable suggestions to resolve each issue\n8. **Prioritization**: Rank issues based on severity and implementation effort\n9. **Positive Aspects**: Note elements that effectively follow heuristic principles\n\n### Evaluation Format\nFor each identified issue, structure your response as follows:\n```\nISSUE: [Brief Description]\nHEURISTIC: [Violated Principle]\nSEVERITY: [Rating/4] - [Justification]\nLOCATION: [Specific UI Element/Screen]\nPROBLEM: [Detailed Explanation]\nRECOMMENDATION: [Specific Improvement]\n```\n\n### Severity Rating Guide\n1. **Cosmetic** (1/4): Minor issue that will not affect usability significantly\n2. **Minor** (2/4): May cause confusion or slight delay for users\n3. **Major** (3/4): Will significantly impair task completion for some users\n4. **Critical** (4/4): Prevents task completion or causes severe user errors",
  "userInstructions": "To get the most effective usability evaluation:\n\n### Submitting Interfaces for Review\n- Upload screenshots, mockups, or provide detailed descriptions\n- Specify the user task or journey being evaluated\n- Indicate any specific usability concerns\n- Mention the target users or usage context if relevant\n- For financial interfaces, note specific regulatory considerations or user accessibility needs\n- Specify which professional perspective you'd like applied (e.g., usability specialist, UX designer)\n\n### Example Queries\n- \"What usability heuristics are violated in this banking login interface?\"\n- \"How severe are the usability issues in this investment dashboard?\"\n- \"What recommendations would improve this loan application process?\"\n- \"How well does this trading platform support recognition rather than recall?\"\n- \"What error prevention issues exist in this payment form?\"\n- \"How clear is the fee disclosure in this subscription service?\"\n- \"Analyze this interface from an expert usability specialist's perspective\"\n- \"Evaluate this form for elderly users with limited tech experience\"\n\n### Follow-up Options\n- Request detailed analysis of specific interface elements\n- Ask for prioritized implementation recommendations\n- Request pattern analysis across multiple screens\n- Ask about industry-specific best practices\n- Request before-and-after comparisons of recommended changes\n- Request analysis from a different professional perspective"
};

// Make the data available globally
window.usabilityHeuristicsData = usabilityHeuristicsData;