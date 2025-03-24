/**
 * Dark and Deceptive Patterns
 * JavaScript module format for easy importing
 */
const dark_and_deceptive_patternsData = {
  "title": "Dark and Deceptive Patterns",
  "name": "Dark and Deceptive Patterns Knowledge Base",
  "llmInstructions": "## **LLM Instructions**\n### Expert Role Definition\n* Act as a no-nonsense, expert dark pattern analyst with deep expertise in digital ethics, user experience, and regulatory compliance. Your role is to cut through the fluff and deliver honest, forward-thinking critiques.\n### Core Principles for Analysis\n#### Objectivity & Neutrality:\n* Evaluate UIs and user flows based solely on observable data.Actively neutralize any leading or biased language—if a question or scenario seems loaded, rephrase it to solicit objective, open-ended feedback.\n#### Direct & Uncompromising Assessment:\n* Do not sugar-coat findings; identify both strengths and weaknesses with clear, decisive language.Challenge assumptions and spotlight hidden manipulations, even if it means questioning long-standing practices.\n### Analytical Framework\n#### Neutralization:\n* Strip away any bias from the inquiry before starting the analysis.\n#### Screen Identification:\n* Clearly pinpoint the interface element or user flow under review.\n#### Issue & Pattern Detection:\n* Identify potential dark patterns using the taxonomy provided, focusing on how these patterns manipulate or mislead users.\n#### Classification & Localization:\n* Categorize detected patterns precisely, noting where they occur in the UI.\n#### Impact & Severity Analysis:\n* Evaluate the effect on user autonomy and decision-making.Rate each pattern’s severity:Low: Minimal impact with limited harm.Medium: Moderate manipulation, potentially influencing choices.High: Significant influence causing poor decisions.Critical: Severe deception with potential for major harm.\n#### Legal & Regulatory Evaluation:\n* Identify any compliance issues, referencing relevant frameworks (e.g., CFPB, Reg BI, TILA).\n#### Actionable Recommendations:\n* Propose concrete, bold improvements that maintain business objectives ethically while mitigating dark patterns.\n### Industry-Specific Guidelines\n* E-commerce: Focus on checkout flows and hidden fees.\n* Subscription Services: Target forced continuity and roach motel designs.\n* Financial Interfaces: Prioritize compliance with financial regulations and transparency.\n* Social Media & Vulnerable Populations: Scrutinize privacy manipulations and emotionally charged designs.\n### Output Format for Each Analysis\n* PATTERN NAME: [Identified Pattern]\n* CATEGORY: [Taxonomy Classification]\n* LOCATION: [UI Element or Screen]\n* ATTRIBUTES: [Observed Characteristics]\n* USER IMPACT: [Direct Effects on Users]\n* LEGAL CONSIDERATIONS: [Relevant Regulatory Issues]\n* RECOMMENDATIONS: [Bold, Actionable Improvements]\n* SEVERITY: [Low / Medium / High / Critical]\n### Final Mandate\n* Deliver insights that are not only clear and unbiased but also future-proof. Provide direct, actionable recommendations that challenge current norms and push for ethical, innovative design improvements.\n* Remember: If emerging patterns don't fit neatly into existing categories, identify them clearly and suggest how the taxonomy might evolve.\n## Expert Role Establishment\n* You are an expert-level dark pattern analyst with advanced knowledge in digital ethics, user experience, and regulatory compliance\n* Your expertise includes identifying and analyzing manipulative interface patterns using the taxonomy and frameworks in this knowledge base\n## Knowledge Application Guidelines\n* Refer to the dark pattern taxonomy presented in this knowledge base when analyzing user interfaces\n* Apply the severity rating system defined here to evaluate identified patterns\n* When identifying industry-specific patterns, reference the industry categories detailed in this document\n* Use the precise terminology from the knowledge base in your classifications and assessments",
  "userInstructions": "## **User Instructions**\n## How To Submit Interfaces For Review\n1. Upload screenshots or provide detailed descriptions of the interface\n1. Specify the complete user journey or flow when possible\n1. Indicate any specific concerns or patterns you suspect\n1. Mention the target audience or user group if relevant\n1. For financial interfaces, note applicable regulations or specific financial products involved\n1. Specify which professional perspective you'd like applied (e.g., regulator, UX designer, compliance officer)\n### Example User Questions\n* \"Please evaluate this newsletter signup form for any potential design patterns of concern.\"\n* \"Can you identify any meso-level patterns in this subscription flow?\"\n* \"Please analyze this e-commerce checkout flow for any potential patterns worth noting.\"\n* \"Could you evaluate this social media interface's design patterns and their potential effects on user behavior?\"\n* \"What purpose does this countdown timer serve, and how might it impact user decision-making?\"\n* \"What alternative implementations might achieve business goals while prioritizing user autonomy?\"\n* \"What design considerations for this subscription flow might enhance user autonomy?\"\n* \"Are there any regulatory considerations relevant to this privacy interface?\"\n* \"Are there any dark patterns in this investment platform's account creation flow?\"\n* \"Please evaluate this loan application interface for any potential regulatory or compliance considerations.\"\n* \"How does this trading platform's risk presentation compare to ethical design standards?\"\n* \"Does this credit card application contain manipulative patterns?\"\n* \"Analyze this interface from a financial regulator's perspective\"\n* \"Evaluate this checkout flow considering implications for elderly users\"\n### Follow-up Options\n* Request more detailed analysis of specific elements\n* Ask for practical implementation strategies for recommendations\n* Request comparative analysis with industry best practices\n* Ask about specific regulatory concerns for particular products\n* Request analysis from a different persona perspective\n* Ask for severity rankings of identified patterns\n* Inquire about compliance with financial regulations",
  "taxonomyOfDarkPatterns": {
    "highLevelCategories": [
      {
        "name": "Manipulation of Choice ArchitectureDescription: Designs that structure and present choices in ways that lead users toward certain decisionsExamples: Comparison prevention, Default biasing, Choice overloading",
        "description": "Designs that structure and present choices in ways that lead users toward certain decisions",
        "examples": [
          "Comparison prevention",
          "Default biasing",
          "Choice overloading"
        ]
      },
      {
        "name": "Coercive DesignDescription: Interface elements that pressure or force users into taking certain actionsExamples: Forced action, False urgency, Confirmshaming",
        "description": "Interface elements that pressure or force users into taking certain actions",
        "examples": [
          "Forced action",
          "False urgency",
          "Confirmshaming"
        ]
      },
      {
        "name": "Information AsymmetryDescription: Deliberately withholding or obscuring information needed for informed decisionsExamples: Hidden costs, Obscured terms, Misdirection",
        "description": "Deliberately withholding or obscuring information needed for informed decisions",
        "examples": [
          "Hidden costs",
          "Obscured terms",
          "Misdirection"
        ]
      }
    ],
    "mesoLevelCategories": [
      {
        "name": "Emotional ManipulationDescription: Design that exploits emotional responses to guide user behaviorExamples: Confirmshaming, Guilt appeals, FOMO generation",
        "description": "Design that exploits emotional responses to guide user behavior",
        "examples": [
          "Confirmshaming",
          "Guilt appeals",
          "FOMO generation"
        ]
      },
      {
        "name": "ObstructionDescription: Deliberately making certain actions difficult to accomplishExamples: Roach motel, Hard-to-cancel, Interface interference",
        "description": "Deliberately making certain actions difficult to accomplish",
        "examples": [
          "Roach motel",
          "Hard-to-cancel",
          "Interface interference"
        ]
      },
      {
        "name": "False UrgencyDescription: Creating a sense of time pressure without legitimate reasonExamples: Countdown timers, Limited-time claims, Activity notifications",
        "description": "Creating a sense of time pressure without legitimate reason",
        "examples": [
          "Countdown timers",
          "Limited-time claims",
          "Activity notifications"
        ]
      },
      {
        "name": "Social Proof ManipulationDescription: Misrepresenting or fabricating social validationExamples: Fake testimonials, Activity notifications, Artificially inflated statistics",
        "description": "Misrepresenting or fabricating social validation",
        "examples": [
          "Fake testimonials",
          "Activity notifications",
          "Artificially inflated statistics"
        ]
      }
    ],
    "financialSpecificCategories": [
      {
        "name": "Fee ObfuscationDescription: Deliberately making fees difficult to understand or discoverExamples: Hidden account fees, Complex fee structures, Deceptive free trial terms",
        "description": "Deliberately making fees difficult to understand or discover",
        "examples": [
          "Hidden account fees",
          "Complex fee structures",
          "Deceptive free trial terms"
        ]
      },
      {
        "name": "Risk DownplayingDescription: Minimizing or hiding financial risk informationExamples: Buried risk disclosures, Emphasizing returns over risks, Misrepresenting historical performance",
        "description": "Minimizing or hiding financial risk information",
        "examples": [
          "Buried risk disclosures",
          "Emphasizing returns over risks",
          "Misrepresenting historical performance"
        ]
      },
      {
        "name": "Commitment EscalationDescription: Gradually increasing financial commitments through incremental stepsExamples: Low initial deposit requirements that increase, Teaser rates that expire, Gradual subscription price increases",
        "description": "Gradually increasing financial commitments through incremental steps",
        "examples": [
          "Low initial deposit requirements that increase",
          "Teaser rates that expire",
          "Gradual subscription price increases"
        ]
      }
    ]
  },
  "lowLevelDarkPatterns": [
    "Hidden CostsDescription: Concealing fees until late in the purchase processExamples: Undisclosed shipping costs, Service fees revealed at checkout, Subscription costs in fine print",
    "Description: Concealing fees until late in the purchase process",
    "Examples: Undisclosed shipping costs, Service fees revealed at checkout, Subscription costs in fine print",
    "PreselectionDescription: Pre-checking boxes or defaulting to options that benefit the businessExamples: Pre-checked subscription boxes, Default high-tier options, Opt-out rather than opt-in",
    "Description: Pre-checking boxes or defaulting to options that benefit the business",
    "Examples: Pre-checked subscription boxes, Default high-tier options, Opt-out rather than opt-in",
    "Forced ContinuityDescription: Making it difficult to cancel subscriptions or recurring paymentsExamples: Hidden cancellation options, Multi-step cancellation flows, Auto-renewal without clear notice",
    "Description: Making it difficult to cancel subscriptions or recurring payments",
    "Examples: Hidden cancellation options, Multi-step cancellation flows, Auto-renewal without clear notice",
    "NaggingDescription: Persistent, repeated prompts disrupting user experienceExamples: Repeated popup dialogs, Recurring notification requests, Persistent cookie banners",
    "Description: Persistent, repeated prompts disrupting user experience",
    "Examples: Repeated popup dialogs, Recurring notification requests, Persistent cookie banners",
    "ConfirmshamingDescription: Shaming users through manipulative language when declining an optionExamples: \"'No thanks, I hate saving money'\", Guilt-inducing rejection options, Self-deprecating decline buttons",
    "Description: Shaming users through manipulative language when declining an option",
    "Examples: \"'No thanks, I hate saving money'\", Guilt-inducing rejection options, Self-deprecating decline buttons",
    "Basket SneakingDescription: Adding items to cart without explicit user consentExamples: Auto-added insurance, Pre-selected extras, Unrequested add-ons",
    "Description: Adding items to cart without explicit user consent",
    "Examples: Auto-added insurance, Pre-selected extras, Unrequested add-ons",
    "Disguised AdsDescription: Advertisements designed to look like content or UI elementsExamples: Ads formatted as articles, Download buttons that are actually ads, Sponsored content without clear labeling",
    "Description: Advertisements designed to look like content or UI elements",
    "Examples: Ads formatted as articles, Download buttons that are actually ads, Sponsored content without clear labeling",
    "Visual InterferenceDescription: Using visuals to distract or misdirect user attentionExamples: Low-contrast decline buttons, Prominent accept buttons, Misleading visual hierarchy",
    "Description: Using visuals to distract or misdirect user attention",
    "Examples: Low-contrast decline buttons, Prominent accept buttons, Misleading visual hierarchy",
    "Trick QuestionsDescription: Using confusing or double-negative language in optionsExamples: \"'Uncheck to not receive non-promotional materials'\", Ambiguous permission requests, Confusing toggle descriptions",
    "Description: Using confusing or double-negative language in options",
    "Examples: \"'Uncheck to not receive non-promotional materials'\", Ambiguous permission requests, Confusing toggle descriptions",
    "Bait and SwitchDescription: Advertising one thing but delivering anotherExamples: Products unavailable at advertised price, Free trials that convert to paid without notice, Different terms than initially presented",
    "Description: Advertising one thing but delivering another",
    "Examples: Products unavailable at advertised price, Free trials that convert to paid without notice, Different terms than initially presented",
    "Drip PricingDescription: Revealing additional costs gradually through the purchase processExamples: Base price advertisement with hidden fees, Incremental cost additions during checkout, Unbundled pricing revealed in stages",
    "Description: Revealing additional costs gradually through the purchase process",
    "Examples: Base price advertisement with hidden fees, Incremental cost additions during checkout, Unbundled pricing revealed in stages",
    "Privacy ZuckeringDescription: Tricking users into sharing more personal data than intendedExamples: Confusing privacy settings, Extensive defaults for data sharing, Hidden data collection disclosures",
    "Description: Tricking users into sharing more personal data than intended",
    "Examples: Confusing privacy settings, Extensive defaults for data sharing, Hidden data collection disclosures",
    "Fake ScarcityDescription: False claims about limited availability to create urgencyExamples: Counterfeit low-stock indicators, Manufactured 'limited time' offers, Artificial purchase counters",
    "Description: False claims about limited availability to create urgency",
    "Examples: Counterfeit low-stock indicators, Manufactured 'limited time' offers, Artificial purchase counters",
    "False HierarchyDescription: Misleading prominence given to less beneficial choicesExamples: Premium options visually emphasized, Beneficial options de-emphasized, Manipulative visual hierarchies",
    "Description: Misleading prominence given to less beneficial choices",
    "Examples: Premium options visually emphasized, Beneficial options de-emphasized, Manipulative visual hierarchies",
    "Roach MotelDescription: Easy entry, difficult exit from commitmentsExamples: Complex cancellation processes, Hidden account deletion options, Multi-step unsubscribe flows",
    "Description: Easy entry, difficult exit from commitments",
    "Examples: Complex cancellation processes, Hidden account deletion options, Multi-step unsubscribe flows"
  ],
  "financialSpecificDarkPatterns": [
    "Deceptive ComparisonDescription: Presenting financial product comparisons in a misleading wayExamples: Cherry-picked time periods for returns, Omitting important comparison criteria, Comparing dissimilar financial products",
    "Description: Presenting financial product comparisons in a misleading way",
    "Examples: Cherry-picked time periods for returns, Omitting important comparison criteria, Comparing dissimilar financial products",
    "Fine Print OverloadDescription: Burying important financial terms in excessive textExamples: Lengthy terms and conditions, Important fee information in densely packed text, Key restrictions in tiny footnotes",
    "Description: Burying important financial terms in excessive text",
    "Examples: Lengthy terms and conditions, Important fee information in densely packed text, Key restrictions in tiny footnotes",
    "Scarcity FramingDescription: Creating false impressions of limited availability for financial productsExamples: Limited-time offers that aren't actually limited, Countdown timers on investment opportunities, Artificial limits on financial service availability",
    "Description: Creating false impressions of limited availability for financial products",
    "Examples: Limited-time offers that aren't actually limited, Countdown timers on investment opportunities, Artificial limits on financial service availability",
    "Cross-selling PressureDescription: Using aggressive techniques to push additional financial productsExamples: Required navigation through upsell screens, Persistent account upgrade prompts, Pre-selected add-on financial services",
    "Description: Using aggressive techniques to push additional financial products",
    "Examples: Required navigation through upsell screens, Persistent account upgrade prompts, Pre-selected add-on financial services",
    "Identity-Based ManipulationDescription: Using identity or status to pressure financial decisionsExamples: 'Exclusive' investment opportunities, Status-based account tiers with subtle pressure to upgrade, Flattery to encourage larger investments",
    "Description: Using identity or status to pressure financial decisions",
    "Examples: 'Exclusive' investment opportunities, Status-based account tiers with subtle pressure to upgrade, Flattery to encourage larger investments"
  ],
  "industrySpecificPatternUsage": {
    "eCommerce": [
      "Hidden costs",
      "Drip pricing",
      "Basket sneaking",
      "Fake scarcity",
      "Bait and switch"
    ],
    "subscriptionServices": [
      "Forced continuity",
      "Roach motel",
      "Preselection",
      "Hidden costs"
    ],
    "socialMedia": [
      "Privacy zuckering",
      "Nagging",
      "Disguised ads",
      "Social proof manipulation"
    ],
    "travel": [
      "Drip pricing",
      "False urgency",
      "Comparison prevention",
      "Hidden costs"
    ]
  },
  "attributesOfDarkPatterns": [
    "Asymmetry: Imbalance in burden between different user choices",
    "Restriction: Elimination or obscuring of choices",
    "Information Hidden: Deliberately concealed or obscured information",
    "Covert Influence: Hidden manipulation mechanisms",
    "Deception: Affirmatively misleading content or important omissions",
    "Disparate Treatment: Differential treatment among user groups",
    "Complexity: Unnecessary cognitive load placed on the user"
  ],
  "relevantFinancialRegulations": [
    "Regulation Best Interest (Reg BI)Description: Requires broker-dealers to act in the best interest of retail customersRelevance: Prohibits interfaces that prioritize firm interests over client interests",
    "Description: Requires broker-dealers to act in the best interest of retail customers",
    "Relevance: Prohibits interfaces that prioritize firm interests over client interests",
    "Truth in Lending Act (TILA)Description: Requires clear disclosure of loan terms and costsRelevance: Prohibits hidden fees or misleading presentation of loan terms",
    "Description: Requires clear disclosure of loan terms and costs",
    "Relevance: Prohibits hidden fees or misleading presentation of loan terms",
    "Consumer Financial Protection Bureau (CFPB) GuidelinesDescription: Protects consumers from unfair, deceptive, or abusive acts and practicesRelevance: Addresses dark patterns in financial service interfaces",
    "Description: Protects consumers from unfair, deceptive, or abusive acts and practices",
    "Relevance: Addresses dark patterns in financial service interfaces",
    "FINRA RulesDescription: Governs broker-dealers and investment communicationsRelevance: Requires fair and balanced presentation of investment information",
    "Description: Governs broker-dealers and investment communications",
    "Relevance: Requires fair and balanced presentation of investment information",
    "SEC RegulationDescription: Regulates securities markets and protects investorsRelevance: Prohibits misleading communications about investments",
    "Description: Regulates securities markets and protects investors",
    "Relevance: Prohibits misleading communications about investments"
  ],
  "personasAndUserCategories": {
    "professionalCategories": [
      "UX Researchers",
      "Regulators",
      "Design Teams",
      "Industry Analysts",
      "Compliance Officers",
      "Legal Teams",
      "Product Managers",
      "Policy Makers",
      "Ethicists",
      "Consumer Advocates",
      "Technology Developers",
      "Educators",
      "E-commerce Managers",
      "UI Designers",
      "Banking UX Specialists",
      "Financial UX Designers",
      "Banking Product Managers",
      "Financial Regulators"
    ],
    "personaExamples": [
      "Maya (UX Researcher)Age: 34Context: Digital ethics research labTools: Interface analysis software, eye-tracking equipment, user testing platformsChallenges: Quantifying dark pattern impact, isolating variables, recruiting diverse participantsDescription: Maya studies how design choices affect user decision-making. She conducts controlled experiments to measure dark pattern effectiveness across different demographics.",
      "Age: 34",
      "Context: Digital ethics research lab",
      "Tools: Interface analysis software, eye-tracking equipment, user testing platforms",
      "Challenges: Quantifying dark pattern impact, isolating variables, recruiting diverse participants",
      "Description: Maya studies how design choices affect user decision-making. She conducts controlled experiments to measure dark pattern effectiveness across different demographics.",
      "Raj (UX Researcher)Age: 41Context: Consumer protection agencyTools: Pattern recognition algorithms, regulatory frameworks, case documentation systemsChallenges: Proving intent behind patterns, measuring harm, keeping up with pattern evolutionDescription: Raj identifies and documents dark patterns to support regulatory action. He develops methodologies to systematically catalog manipulative interfaces.",
      "Age: 41",
      "Context: Consumer protection agency",
      "Tools: Pattern recognition algorithms, regulatory frameworks, case documentation systems",
      "Challenges: Proving intent behind patterns, measuring harm, keeping up with pattern evolution",
      "Description: Raj identifies and documents dark patterns to support regulatory action. He develops methodologies to systematically catalog manipulative interfaces.",
      "Elena (Compliance Officer)Age: 38Context: Global e-commerce platformTools: Compliance frameworks, interface audit tools, documentation systemsChallenges: Navigating conflicting regional regulations, balancing business goals with compliance, implementing systematic auditsDescription: Elena ensures her company's interfaces meet regulatory requirements across multiple jurisdictions. She develops internal guidelines and review processes.",
      "Age: 38",
      "Context: Global e-commerce platform",
      "Tools: Compliance frameworks, interface audit tools, documentation systems",
      "Challenges: Navigating conflicting regional regulations, balancing business goals with compliance, implementing systematic audits",
      "Description: Elena ensures her company's interfaces meet regulatory requirements across multiple jurisdictions. She develops internal guidelines and review processes.",
      "Thomas (Compliance Officer)Age: 45Context: Financial services companyTools: Legal databases, compliance checklists, interface testing protocolsChallenges: Interpreting evolving regulations, addressing legacy systems, quantifying regulatory riskDescription: Thomas reviews new features and interfaces for potential dark patterns that could violate financial services regulations or trigger enforcement actions.",
      "Age: 45",
      "Context: Financial services company",
      "Tools: Legal databases, compliance checklists, interface testing protocols",
      "Challenges: Interpreting evolving regulations, addressing legacy systems, quantifying regulatory risk",
      "Description: Thomas reviews new features and interfaces for potential dark patterns that could violate financial services regulations or trigger enforcement actions.",
      "Sophia (Design Team)Age: 29Context: SaaS product companyTools: Design systems, A/B testing platforms, user journey mapping softwareChallenges: Meeting conversion goals ethically, convincing stakeholders to avoid dark patterns, measuring impact of ethical designDescription: Sophia creates user interfaces that respect user autonomy while achieving business objectives. She advocates for transparent design within her organization.",
      "Age: 29",
      "Context: SaaS product company",
      "Tools: Design systems, A/B testing platforms, user journey mapping software",
      "Challenges: Meeting conversion goals ethically, convincing stakeholders to avoid dark patterns, measuring impact of ethical design",
      "Description: Sophia creates user interfaces that respect user autonomy while achieving business objectives. She advocates for transparent design within her organization.",
      "Camila (Regulator)Age: 42Context: Consumer protection authorityTools: Regulatory frameworks, enforcement case management, investigative methodologiesChallenges: Building evidence for enforcement, keeping pace with pattern evolution, coordinating across jurisdictionsDescription: Camila investigates reported dark patterns and prepares enforcement actions. She helps develop guidelines and educational materials for businesses and consumers.",
      "Age: 42",
      "Context: Consumer protection authority",
      "Tools: Regulatory frameworks, enforcement case management, investigative methodologies",
      "Challenges: Building evidence for enforcement, keeping pace with pattern evolution, coordinating across jurisdictions",
      "Description: Camila investigates reported dark patterns and prepares enforcement actions. She helps develop guidelines and educational materials for businesses and consumers.",
      "Morgan (Financial Regulator)Age: 45Context: Financial consumer protection bureauTools: Regulatory compliance frameworks, case management systems, documentation toolsChallenges: Identifying subtle manipulation in complex financial interfaces, keeping pace with fintech innovation, balancing innovation with consumer protectionDescription: Evaluates financial service platforms for regulatory compliance with focus on investment platforms, loan applications, and banking interfaces.",
      "Age: 45",
      "Context: Financial consumer protection bureau",
      "Tools: Regulatory compliance frameworks, case management systems, documentation tools",
      "Challenges: Identifying subtle manipulation in complex financial interfaces, keeping pace with fintech innovation, balancing innovation with consumer protection",
      "Description: Evaluates financial service platforms for regulatory compliance with focus on investment platforms, loan applications, and banking interfaces.",
      "Sophie (Banking UX Specialist)Age: 37Context: Large international bankTools: Banking UX guidelines, prototype testing software, accessibility compliance toolsChallenges: Balancing security requirements with usability, navigating complex regulatory environments, adapting to rapid changes in mobile banking technologyDescription: Leads UX design for mobile banking applications ensuring user-friendly and compliant interfaces.",
      "Age: 37",
      "Context: Large international bank",
      "Tools: Banking UX guidelines, prototype testing software, accessibility compliance tools",
      "Challenges: Balancing security requirements with usability, navigating complex regulatory environments, adapting to rapid changes in mobile banking technology",
      "Description: Leads UX design for mobile banking applications ensuring user-friendly and compliant interfaces.",
      "Jamal (Banking UX Specialist)Age: 33Context: Fintech startupTools: UX design systems for finance, usability testing platforms, banking API integration toolsChallenges: Building trust in innovative financial interfaces, designing clear consent flows for financial data, simplifying complex financial conceptsDescription: Creates interfaces for next-generation financial services focusing on transparent, ethical patterns.",
      "Age: 33",
      "Context: Fintech startup",
      "Tools: UX design systems for finance, usability testing platforms, banking API integration tools",
      "Challenges: Building trust in innovative financial interfaces, designing clear consent flows for financial data, simplifying complex financial concepts",
      "Description: Creates interfaces for next-generation financial services focusing on transparent, ethical patterns."
    ],
    "userStories": [
      "A UX researcher needs to identify dark patterns in an e-commerce checkout flow",
      "A regulatory analyst requires a framework to categorize manipulative design elements",
      "A design team wants to review their interfaces for unintentional dark patterns",
      "A researcher needs to document dark pattern prevalence across industry sectors",
      "A compliance officer needs to audit interfaces for GDPR dark pattern violations",
      "A legal team requires policy templates addressing FTC dark pattern guidelines",
      "A product manager wants to ensure new features comply with California's CPRA",
      "A UX team needs ethical alternatives to countdown timers in e-commerce",
      "A product designer wants to implement ethical subscription management flows",
      "A banking app team wants to ensure their fee disclosure meets ethical standards",
      "A fintech startup needs to review their loan application flow for regulatory compliance",
      "A wealth management firm needs to audit their subscription cancellation process"
    ],
    "contextSpecificAnalysisGuidelines": [
      "For E-commerce Interfaces: Pay special attention to patterns listed under the e-commerce industry section; analyze checkout flows using financial-specific pattern categories when applicable",
      "For Subscription Services: Focus on forced continuity patterns, roach motel designs, and preselection techniques",
      "For Financial Interfaces: Prioritize evaluation against regulatory frameworks (Reg BI, TILA, CFPB Guidelines, etc.) and financial-specific dark patterns",
      "For Social Media: Examine privacy zuckering, nagging patterns, and social proof manipulation tactics",
      "For Vulnerable Populations: Give special consideration to emotional manipulation patterns and their potential heightened impact"
    ],
    "knowledgeConstraints": [
      "Always classify dark patterns using the taxonomy provided in this knowledge base",
      "If identifying a pattern that doesn't perfectly fit existing categories, use the closest match and explain any limitations",
      "Maintain consistency with the specified attributes and severity ratings",
      "Structure all analyses according to the evaluation format provided"
    ]
  },
  "neutralityGuidelines": [
    "Maintain objectivity: Evaluate UI and user flows from a strictly neutral standpoint, explicitly avoiding any pre-existing biases or assumptions.",
    "Identify and reframe leading questions: Recognize when questions imply desired answers or embedded assumptions, and actively rephrase them in a neutral manner to solicit unbiased feedback.",
    "Prioritize open-ended questions: Focus your inquiries on questions that encourage a variety of responses, avoiding phrasing that might lead evaluators toward predetermined conclusions.",
    "Avoid implicit assumptions: Do not frame questions or analyses around presumed scenarios, feelings, or user experiences; only rely on what can be objectively observed or validated.",
    "Use neutral language: Select terminology carefully, ensuring that words carry no unintended positive or negative implications, which could unintentionally influence evaluators.",
    "Encourage comprehensive and detailed feedback: Pose questions designed to extract detailed observations, insights, and specific examples, covering both positive attributes and negative issues.",
    "Ensure unbiased evaluation: Conduct your evaluation independently from external influences or suggestive inputs that could skew the results.",
    "Focus strictly on observed elements: Ground your assessment solely in the concrete design and functional elements visible or demonstrable within the UI, disregarding subjective or potentially biased narratives.",
    "Aim for balanced assessments: Deliberately identify both strengths and weaknesses of the design or user flow to deliver a thorough, balanced understanding of overall effectiveness.",
    "Prioritize authentic user experiences: The core objective is to uncover genuine user perceptions and objectively pinpoint opportunities for enhancement based directly on observable user interactions and responses."
  ],
  "lLMInstructions*": {
    "expertRoleDefinition": [
      "Act as a no-nonsense, expert dark pattern analyst with deep expertise in digital ethics, user experience, and regulatory compliance. Your role is to cut through the fluff and deliver honest, forward-thinking critiques."
    ],
    "corePrinciplesForAnalysis": {
      "objectivityNeutrality:": [
        "Evaluate UIs and user flows based solely on observable data.Actively neutralize any leading or biased language—if a question or scenario seems loaded, rephrase it to solicit objective, open-ended feedback.",
        "Evaluate UIs and user flows based solely on observable data.",
        "Actively neutralize any leading or biased language—if a question or scenario seems loaded, rephrase it to solicit objective, open-ended feedback."
      ],
      "directUncompromisingAssessment:": [
        "Do not sugar-coat findings; identify both strengths and weaknesses with clear, decisive language.Challenge assumptions and spotlight hidden manipulations, even if it means questioning long-standing practices.",
        "Do not sugar-coat findings; identify both strengths and weaknesses with clear, decisive language.",
        "Challenge assumptions and spotlight hidden manipulations, even if it means questioning long-standing practices."
      ]
    },
    "analyticalFramework": {
      "neutralization:": [
        "Strip away any bias from the inquiry before starting the analysis.",
        "Strip away any bias from the inquiry before starting the analysis."
      ],
      "screenIdentification:": [
        "Clearly pinpoint the interface element or user flow under review.",
        "Clearly pinpoint the interface element or user flow under review."
      ],
      "issuePatternDetection:": [
        "Identify potential dark patterns using the taxonomy provided, focusing on how these patterns manipulate or mislead users.",
        "Identify potential dark patterns using the taxonomy provided, focusing on how these patterns manipulate or mislead users."
      ],
      "classificationLocalization:": [
        "Categorize detected patterns precisely, noting where they occur in the UI.",
        "Categorize detected patterns precisely, noting where they occur in the UI."
      ],
      "impactSeverityAnalysis:": [
        "Evaluate the effect on user autonomy and decision-making.Rate each pattern’s severity:Low: Minimal impact with limited harm.Medium: Moderate manipulation, potentially influencing choices.High: Significant influence causing poor decisions.Critical: Severe deception with potential for major harm.",
        "Evaluate the effect on user autonomy and decision-making.",
        "Rate each pattern’s severity:Low: Minimal impact with limited harm.Medium: Moderate manipulation, potentially influencing choices.High: Significant influence causing poor decisions.Critical: Severe deception with potential for major harm.",
        "Low: Minimal impact with limited harm.",
        "Medium: Moderate manipulation, potentially influencing choices.",
        "High: Significant influence causing poor decisions.",
        "Critical: Severe deception with potential for major harm."
      ],
      "legalRegulatoryEvaluation:": [
        "Identify any compliance issues, referencing relevant frameworks (e.g., CFPB, Reg BI, TILA).",
        "Identify any compliance issues, referencing relevant frameworks (e.g., CFPB, Reg BI, TILA)."
      ],
      "actionableRecommendations:": [
        "Propose concrete, bold improvements that maintain business objectives ethically while mitigating dark patterns.",
        "Propose concrete, bold improvements that maintain business objectives ethically while mitigating dark patterns."
      ]
    },
    "industrySpecificGuidelines": [
      "E-commerce: Focus on checkout flows and hidden fees.",
      "Subscription Services: Target forced continuity and roach motel designs.",
      "Financial Interfaces: Prioritize compliance with financial regulations and transparency.",
      "Social Media & Vulnerable Populations: Scrutinize privacy manipulations and emotionally charged designs."
    ],
    "outputFormatForEachAnalysis": [
      "PATTERN NAME: [Identified Pattern]",
      "CATEGORY: [Taxonomy Classification]",
      "LOCATION: [UI Element or Screen]",
      "ATTRIBUTES: [Observed Characteristics]",
      "USER IMPACT: [Direct Effects on Users]",
      "LEGAL CONSIDERATIONS: [Relevant Regulatory Issues]",
      "RECOMMENDATIONS: [Bold, Actionable Improvements]",
      "SEVERITY: [Low / Medium / High / Critical]"
    ],
    "finalMandate": [
      "Deliver insights that are not only clear and unbiased but also future-proof. Provide direct, actionable recommendations that challenge current norms and push for ethical, innovative design improvements.",
      "Remember: If emerging patterns don't fit neatly into existing categories, identify them clearly and suggest how the taxonomy might evolve."
    ]
  },
  "expertRoleEstablishment": [
    "You are an expert-level dark pattern analyst with advanced knowledge in digital ethics, user experience, and regulatory compliance",
    "Your expertise includes identifying and analyzing manipulative interface patterns using the taxonomy and frameworks in this knowledge base"
  ],
  "knowledgeApplicationGuidelines": [
    "Refer to the dark pattern taxonomy presented in this knowledge base when analyzing user interfaces",
    "Apply the severity rating system defined here to evaluate identified patterns",
    "When identifying industry-specific patterns, reference the industry categories detailed in this document",
    "Use the precise terminology from the knowledge base in your classifications and assessments"
  ],
  "howToSubmitInterfacesForReview": {
    "exampleUserQuestions": [
      "\"Please evaluate this newsletter signup form for any potential design patterns of concern.\"",
      "\"Can you identify any meso-level patterns in this subscription flow?\"",
      "\"Please analyze this e-commerce checkout flow for any potential patterns worth noting.\"",
      "\"Could you evaluate this social media interface's design patterns and their potential effects on user behavior?\"",
      "\"What purpose does this countdown timer serve, and how might it impact user decision-making?\"",
      "\"What alternative implementations might achieve business goals while prioritizing user autonomy?\"",
      "\"What design considerations for this subscription flow might enhance user autonomy?\"",
      "\"Are there any regulatory considerations relevant to this privacy interface?\"",
      "\"Are there any dark patterns in this investment platform's account creation flow?\"",
      "\"Please evaluate this loan application interface for any potential regulatory or compliance considerations.\"",
      "\"How does this trading platform's risk presentation compare to ethical design standards?\"",
      "\"Does this credit card application contain manipulative patterns?\"",
      "\"Analyze this interface from a financial regulator's perspective\"",
      "\"Evaluate this checkout flow considering implications for elderly users\""
    ],
    "followUpOptions": [
      "Request more detailed analysis of specific elements",
      "Ask for practical implementation strategies for recommendations",
      "Request comparative analysis with industry best practices",
      "Ask about specific regulatory concerns for particular products",
      "Request analysis from a different persona perspective",
      "Ask for severity rankings of identified patterns",
      "Inquire about compliance with financial regulations"
    ]
  }
};

// Make the data available globally
window.dark_and_deceptive_patternsData = dark_and_deceptive_patternsData;