window.kbResearch = {
    name : "Research Best Practices",
    features : {
        darkPatterns : {
            title : "Dark and Deceptive Patterns",
            considerations : [
                "Identify high-level manipulation strategies across contexts",
                "Analyze meso-level patterns bridging strategies and implementations",
                "Detect low-level interface elements that exploit user behavior",
                "Map dark patterns across different user journeys",
                "Consider contextual factors affecting pattern effectiveness",
                "Evaluate severity and impact of different pattern types",
                "Recognize pattern combinations that amplify manipulation"
            ],
            principles : [
                "Hierarchical classification",
                "Context sensitivity",
                "User impact measurement",
                "Pattern detection methodology",
                "Cross-disciplinary analysis",
                "Ethical design alternatives",
                "Regulatory compliance"
            ],
            userStories : [
                "A UX auditor needs to identify dark patterns in an e-commerce checkout flow",
                "A regulatory analyst requires a framework to categorize manipulative design elements",
                "A design team wants to review their interfaces for unintentional dark patterns",
                "A researcher needs to document dark pattern prevalence across industry sectors",
                "A compliance officer needs to audit interfaces for regulatory violations",
                "A UX team needs ethical alternatives to common dark patterns"
            ]
        }
, 
        usabilityHeuristics : {
            title : "Usability Heuristics Evaluation",
            considerations : [
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
            principles : [
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
            userStories : [
                "A UX designer needs to evaluate a new interface against established heuristics",
                "A product manager wants to identify usability issues before user testing",
                "A research team needs to document heuristic violations for developers",
                "A design system team needs to ensure components follow usability principles",
                "A startup needs a quick assessment of their MVP's usability",
                "A development team needs to prioritize which usability issues to fix first",
                "A UX consultant needs to provide actionable feedback on a client's platform",
                "A product owner wants to compare the usability of competing solutions"
            ]
        }
    }
, 
    disabilityCategories : {
        darkPatterns : [
            "UX Auditors",
            "Regulatory Analysts",
            "Design Teams",
            "Researchers",
            "Compliance Officers",
            "UX Teams"
        ],
        usabilityHeuristics : [
            "UX Researchers",
            "UX Designers",
            "Product Managers",
            "Usability Specialists"
        ]
    }
, 
    personas : [
        {
            category : "UX Researchers",
            examples : [
                {
                    name : "Maya",
                    age : 34,
                    context : "Mid-sized tech company",
                    tools : "Research repositories, analysis software, video conferencing",
                    challenges : "Balancing depth with timeline pressure, stakeholder management, sample recruitment",
                    description : "Maya has 8 years of experience leading UX research. She's skilled at translating complex findings into actionable insights but struggles with tight deadlines and limited resources."
                }
,
                {
                    name : "Darius",
                    age : 28,
                    context : "Agency environment with multiple clients",
                    tools : "Remote testing platforms, survey tools, collaboration software",
                    challenges : "Context switching between projects, maintaining research quality with speed, communicating value to clients",
                    description : "Darius conducts research across multiple client projects simultaneously. He excels at adapting methodologies to different contexts but struggles with the constant context switching."
                }
            ]
        }
, 
        {
            category : "UX Auditors", examples : [
                {
                    name : "Raj",
                    age : 41,
                    context : "Consumer protection agency",
                    tools : "Pattern recognition algorithms, regulatory frameworks, case documentation systems",
                    challenges : "Proving intent behind patterns, measuring harm, keeping up with pattern evolution",
                    description : "Raj identifies and documents dark patterns to support regulatory action. He develops methodologies to systematically catalog manipulative interfaces."
                }
,
                {
                    name : "Camila",
                    age : 42,
                    context : "Consumer protection authority",
                    tools : "Regulatory frameworks, enforcement case management, investigative methodologies",
                    challenges : "Building evidence for enforcement, keeping pace with pattern evolution, coordinating across jurisdictions",
                    description : "Camila investigates reported dark patterns and prepares enforcement actions. She helps develop guidelines and educational materials for businesses and consumers."
                }
            ]
        }
, 
        {
            category : "Compliance Officers", examples : [
                {
                    name : "Elena",
                    age : 38,
                    context : "Global e-commerce platform",
                    tools : "Compliance frameworks, interface audit tools, documentation systems",
                    challenges : "Navigating conflicting regional regulations, balancing business goals with compliance, implementing systematic audits",
                    description : "Elena ensures her company's interfaces meet regulatory requirements across multiple jurisdictions. She develops internal guidelines and review processes."
                }
,
                {
                    name : "Thomas",
                    age : 45,
                    context : "Financial services company",
                    tools : "Legal databases, compliance checklists, interface testing protocols",
                    challenges : "Interpreting evolving regulations, addressing legacy systems, quantifying regulatory risk",
                    description : "Thomas reviews new features and interfaces for potential dark patterns that could violate financial services regulations or trigger enforcement actions."
                }
            ]
        }
, 
        {
            category : "Design Teams", examples : [
                {
                    name : "Sophia",
                    age : 29,
                    context : "SaaS product company",
                    tools : "Design systems, A/B testing platforms, user journey mapping software",
                    challenges : "Meeting conversion goals ethically, convincing stakeholders to avoid dark patterns, measuring impact of ethical design",
                    description : "Sophia creates user interfaces that respect user autonomy while achieving business objectives. She advocates for transparent design within her organization."
                }
,
                {
                    name : "Marcus",
                    age : 36,
                    context : "Design agency with multiple clients",
                    tools : "Wireframing software, ethics review checklists, client presentation templates",
                    challenges : "Educating clients about dark patterns, refusing problematic requests, demonstrating ROI of ethical design",
                    description : "Marcus helps clients improve conversion rates through ethical design approaches. He frequently needs to dissuade clients from implementing manipulative patterns."
                }
            ]
        }
, 
        {
            category : "UX Designers", examples : [
                {
                    name : "Elena",
                    age : 29,
                    context : "Product design team",
                    tools : "Design software, component libraries, heuristic checklists",
                    challenges : "Applying heuristics during design rather than after, balancing aesthetics with usability, maintaining consistency across features",
                    description : "Elena creates user interfaces that need to balance business requirements with usability principles. She uses heuristics as guidelines during the design process."
                }
,
                {
                    name : "Thomas",
                    age : 36,
                    context : "Design agency",
                    tools : "Prototyping software, design systems, evaluation frameworks",
                    challenges : "Educating clients about usability principles, justifying design decisions, adapting heuristics to different domains",
                    description : "Thomas designs interfaces for various clients with different requirements. He needs to efficiently apply appropriate heuristics to diverse projects and explain their importance."
                }
            ]
        }
, 
        {
            category : "Product Managers", examples : [
                {
                    name : "Sophia",
                    age : 32,
                    context : "SaaS product company",
                    tools : "Product roadmap software, usability metrics dashboards, prioritization frameworks",
                    challenges : "Balancing feature development with usability improvements, quantifying usability ROI, coordinating cross-functional improvements",
                    description : "Sophia manages product development and needs to prioritize which usability issues to address. She uses heuristic evaluation results to inform roadmap decisions."
                }
,
                {
                    name : "Marcus",
                    age : 44,
                    context : "Enterprise software company",
                    tools : "Project management systems, requirement documentation, user feedback platforms",
                    challenges : "Translating usability findings to development requirements, balancing complexity with usability, justifying UX investment",
                    description : "Marcus oversees complex products with specialized user needs. He uses heuristic frameworks to ensure consistent user experience across different modules and features."
                }
            ]
        }
, 
        {
            category : "Usability Specialists", examples : [
                {
                    name : "Liam",
                    age : 31,
                    context : "UX consulting firm",
                    tools : "Heuristic evaluation templates, usability testing software, analytics tools",
                    challenges : "Communicating issues to non-UX stakeholders, balancing thoroughness with efficiency, prioritizing findings",
                    description : "Liam conducts heuristic evaluations for various clients and product teams. He specializes in translating usability principles into actionable recommendations."
                }
,
                {
                    name : "Akiko",
                    age : 35,
                    context : "Enterprise UX team",
                    tools : "Evaluation frameworks, severity rating systems, reporting templates",
                    challenges : "Evaluating complex interfaces systematically, maintaining consistency across evaluators, connecting findings to business impact",
                    description : "Akiko leads usability evaluation initiatives across multiple product lines. She develops standardized approaches to ensure consistent quality assessments."
                }
            ]
        }
]
, 
        darkPatternData : {
            patternTypes : {
                highLevel : [
                    {
                        name : "Manipulation of Choice Architecture",
                        description : "Designs that structure and present choices in ways that lead users toward certain decisions",
                        examples : [
                            "Comparison prevention",
                            "Default biasing",
                            "Choice overloading"
                        ]
                    }
, 
                    {
                        name : "Coercive Design", description : "Interface elements that pressure or force users into taking certain actions", examples : [
                            "Forced action",
                            "False urgency",
                            "Confirmshaming"
                        ]
                    }
, 
                    {
                        name : "Information Asymmetry", description : "Deliberately withholding or obscuring information needed for informed decisions", examples : [
                            "Hidden costs",
                            "Obscured terms",
                            "Misdirection"
                        ]
                    }
]
, 
                    mesoLevel : [
                        {
                            name : "Emotional Manipulation",
                            description : "Design that exploits emotional responses to guide user behavior",
                            examples : [
                                "Confirmshaming",
                                "Guilt appeals",
                                "FOMO generation"
                            ]
                        }
, 
                        {
                            name : "Obstruction", description : "Deliberately making certain actions difficult to accomplish", examples : [
                                "Roach motel",
                                "Hard-to-cancel",
                                "Interface interference"
                            ]
                        }
, 
                        {
                            name : "False Urgency", description : "Creating a sense of time pressure without legitimate reason", examples : [
                                "Countdown timers",
                                "Limited-time claims",
                                "Activity notifications"
                            ]
                        }
, 
                        {
                            name : "Social Proof Manipulation", description : "Misrepresenting or fabricating social validation", examples : [
                                "Fake testimonials",
                                "Activity notifications",
                                "Artificially inflated statistics"
                            ]
                        }
]
, 
                        lowLevel : [
                            {
                                name : "Hidden Costs",
                                description : "Concealing fees until late in the purchase process",
                                examples : [
                                    "Undisclosed shipping costs",
                                    "Service fees revealed at checkout",
                                    "Subscription costs in fine print"
                                ]
                            }
, 
                            {
                                name : "Preselection", description : "Pre-checking boxes or defaulting to options that benefit the business", examples : [
                                    "Pre-checked subscription boxes",
                                    "Default high-tier options",
                                    "Opt-out rather than opt-in"
                                ]
                            }
, 
                            {
                                name : "Forced Continuity", description : "Making it difficult to cancel subscriptions or recurring payments", examples : [
                                    "Hidden cancellation options",
                                    "Multi-step cancellation flows",
                                    "Auto-renewal without clear notice"
                                ]
                            }
, 
                            {
                                name : "Nagging", description : "Persistent, repeated prompts disrupting user experience", examples : [
                                    "Repeated popup dialogs",
                                    "Recurring notification requests",
                                    "Persistent cookie banners"
                                ]
                            }
, 
                            {
                                name : "Confirmshaming", description : "Shaming users through manipulative language when declining an option", examples : [
                                    "'No thanks, I hate saving money'",
                                    "Guilt-inducing rejection options",
                                    "Self-deprecating decline buttons"
                                ]
                            }
, 
                            {
                                name : "Basket Sneaking", description : "Adding items to cart without explicit user consent", examples : [
                                    "Auto-added insurance",
                                    "Pre-selected extras",
                                    "Unrequested add-ons"
                                ]
                            }
, 
                            {
                                name : "Disguised Ads", description : "Advertisements designed to look like content or UI elements", examples : [
                                    "Ads formatted as articles",
                                    "Download buttons that are actually ads",
                                    "Sponsored content without clear labeling"
                                ]
                            }
, 
                            {
                                name : "Visual Interference", description : "Using visuals to distract or misdirect user attention", examples : [
                                    "Low-contrast decline buttons",
                                    "Prominent accept buttons",
                                    "Misleading visual hierarchy"
                                ]
                            }
, 
                            {
                                name : "Trick Questions", description : "Using confusing or double-negative language in options", examples : [
                                    "'Uncheck to not receive non-promotional materials'",
                                    "Ambiguous permission requests",
                                    "Confusing toggle descriptions"
                                ]
                            }
, 
                            {
                                name : "Bait and Switch", description : "Advertising one thing but delivering another", examples : [
                                    "Products unavailable at advertised price",
                                    "Free trials that convert to paid without notice",
                                    "Different terms than initially presented"
                                ]
                            }
, 
                            {
                                name : "Drip Pricing", description : "Revealing additional costs gradually through the purchase process", examples : [
                                    "Base price advertisement with hidden fees",
                                    "Incremental cost additions during checkout",
                                    "Unbundled pricing revealed in stages"
                                ]
                            }
, 
                            {
                                name : "Privacy Zuckering", description : "Tricking users into sharing more personal data than intended", examples : [
                                    "Confusing privacy settings",
                                    "Extensive defaults for data sharing",
                                    "Hidden data collection disclosures"
                                ]
                            }
, 
                            {
                                name : "Fake Scarcity", description : "False claims about limited availability to create urgency", examples : [
                                    "Counterfeit low-stock indicators",
                                    "Manufactured 'limited time' offers",
                                    "Artificial purchase counters"
                                ]
                            }
]
                        }
, 
                        industryUse : {
                            ecommerce : [
                                "Hidden costs",
                                "Drip pricing",
                                "Basket sneaking",
                                "Fake scarcity",
                                "Bait and switch"
                            ],
                            subscription : [
                                "Forced continuity",
                                "Roach motel",
                                "Preselection",
                                "Hidden costs"
                            ],
                            socialMedia : [
                                "Privacy zuckering",
                                "Nagging",
                                "Disguised ads",
                                "Social proof manipulation"
                            ],
                            travel : [
                                "Drip pricing",
                                "False urgency",
                                "Comparison prevention",
                                "Hidden costs"
                            ]
                        }
, 
                        subFeatures : {
                            taxonomy : {
                                title : "Taxonomy of Dark Patterns",
                                considerations : [
                                    "Identify high-level manipulation strategies across contexts",
                                    "Analyze meso-level patterns bridging strategies and implementations",
                                    "Detect low-level interface elements that exploit user behavior",
                                    "Map dark patterns across different user journeys",
                                    "Consider contextual factors affecting pattern effectiveness"
                                ],
                                principles : [
                                    "Hierarchical classification",
                                    "Context sensitivity",
                                    "User impact measurement",
                                    "Pattern detection methodology",
                                    "Cross-disciplinary analysis"
                                ],
                                userStories : [
                                    "A UX auditor needs to identify dark patterns in an e-commerce checkout flow",
                                    "A regulatory analyst requires a framework to categorize manipulative design elements",
                                    "A design team wants to review their interfaces for unintentional dark patterns",
                                    "A researcher needs to document dark pattern prevalence across industry sectors"
                                ]
                            }
, 
                            legal : {
                                title : "Legal and Regulatory Framework",
                                considerations : [
                                    "Understand jurisdiction-specific regulations on dark patterns",
                                    "Analyze enforcement actions and precedent cases",
                                    "Evaluate compliance requirements across regions",
                                    "Document consent and disclosure mechanisms",
                                    "Assess potential penalties and legal exposure",
                                    "Monitor regulatory developments affecting digital interfaces",
                                    "Develop compliance strategies for global operations"
                                ],
                                principles : [
                                    "Regulatory compliance",
                                    "Transparency requirements",
                                    "Consent optimization",
                                    "Cross-border harmonization",
                                    "Documentation and accountability"
                                ],
                                userStories : [
                                    "A compliance officer needs to audit interfaces for GDPR dark pattern violations",
                                    "A legal team requires policy templates addressing FTC dark pattern guidelines",
                                    "A product manager wants to ensure new features comply with California's CPRA",
                                    "A global enterprise needs a unified approach to dark pattern regulation"
                                ]
                            }
, 
                            ethical : {
                                title : "Ethical Design Alternatives",
                                considerations : [
                                    "Develop ethical alternatives to common dark patterns",
                                    "Create transparent consent and disclosure mechanisms",
                                    "Design symmetrical user journeys for signup and cancellation",
                                    "Implement clear pricing and terms displays",
                                    "Balance business objectives with user autonomy",
                                    "Measure impact of ethical design on user trust",
                                    "Document business cases for ethical alternatives"
                                ],
                                principles : [
                                    "Transparency by design",
                                    "User autonomy prioritization",
                                    "Informed decision making",
                                    "Symmetrical choice architecture",
                                    "Ethical nudge implementation"
                                ],
                                userStories : [
                                    "A UX team needs ethical alternatives to countdown timers in e-commerce",
                                    "A product designer wants to implement ethical subscription management flows",
                                    "A marketing team seeks transparent promotion strategies that maintain conversion",
                                    "A startup founder requires ethical design patterns that support business growth"
                                ]
                            }
                        }
                    }
, 
                    usabilityHeuristicsData : {
                        heuristicTypes : {
                            highLevel : [
                                {
                                    name : "Transparency and Feedback",
                                    description : "Design principles that keep users informed about what is happening in the system",
                                    examples : [
                                        "Visibility of system status",
                                        "Help users recognize, diagnose, and recover from errors",
                                        "Clear feedback loops"
                                    ]
                                }
, 
                                {
                                    name : "User Autonomy and Control", description : "Principles that give users freedom to navigate, control their experience, and recover from mistakes", examples : [
                                        "User control and freedom",
                                        "Flexibility and efficiency of use",
                                        "Customization options"
                                    ]
                                }
, 
                                {
                                    name : "Cognitive Support", description : "Principles that reduce mental workload and support human cognitive limitations", examples : [
                                        "Recognition rather than recall",
                                        "Consistency and standards",
                                        "Error prevention"
                                    ]
                                }
]
, 
                                mesoLevel : [
                                    {
                                        name : "Visibility of system status",
                                        description : "The system should always keep users informed about what is going on, through appropriate feedback within reasonable time",
                                        examples : [
                                            "Progress indicators",
                                            "Status messages",
                                            "Visual feedback for actions"
                                        ]
                                    }
, 
                                    {
                                        name : "Match between system and the real world", description : "The system should speak the users' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms", examples : [
                                            "Natural language",
                                            "Familiar metaphors",
                                            "Logical information flow"
                                        ]
                                    }
, 
                                    {
                                        name : "User control and freedom", description : "Users often choose system functions by mistake and will need a clearly marked 'emergency exit' to leave the unwanted state", examples : [
                                            "Undo/redo actions",
                                            "Cancel operations",
                                            "Back buttons"
                                        ]
                                    }
, 
                                    {
                                        name : "Consistency and standards", description : "Users should not have to wonder whether different words, situations, or actions mean the same thing", examples : [
                                            "Consistent terminology",
                                            "Platform conventions",
                                            "Design patterns"
                                        ]
                                    }
, 
                                    {
                                        name : "Error prevention", description : "A careful design which prevents a problem from occurring in the first place is better than good error messages", examples : [
                                            "Confirmations",
                                            "Constraints",
                                            "Default values"
                                        ]
                                    }
, 
                                    {
                                        name : "Recognition rather than recall", description : "Minimize the user's memory load by making objects, actions, and options visible", examples : [
                                            "Visible options",
                                            "Suggestions",
                                            "Contextual help"
                                        ]
                                    }
, 
                                    {
                                        name : "Flexibility and efficiency of use", description : "Accelerators—unseen by the novice user—may often speed up the interaction for the expert user", examples : [
                                            "Shortcuts",
                                            "Personalization",
                                            "Adaptivity"
                                        ]
                                    }
, 
                                    {
                                        name : "Aesthetic and minimalist design", description : "Dialogues should not contain information which is irrelevant or rarely needed", examples : [
                                            "Visual hierarchy",
                                            "White space",
                                            "Information prioritization"
                                        ]
                                    }
, 
                                    {
                                        name : "Help users recognize, diagnose, and recover from errors", description : "Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution", examples : [
                                            "Clear error messages",
                                            "Recovery suggestions",
                                            "Helpful guidance"
                                        ]
                                    }
, 
                                    {
                                        name : "Help and documentation", description : "Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation", examples : [
                                            "Contextual help",
                                            "Searchable documentation",
                                            "Task-oriented instructions"
                                        ]
                                    }
]
, 
                                    lowLevel : [
                                        {
                                            name : "Progress Indicators",
                                            description : "Visual elements that show system progress or status",
                                            examples : [
                                                "Loading bars",
                                                "Step indicators in multi-stage forms",
                                                "Percentage completion displays"
                                            ]
                                        }
, 
                                        {
                                            name : "Status Feedback", description : "Immediate feedback that confirms user actions have been registered", examples : [
                                                "Button state changes",
                                                "Success messages",
                                                "Hover effects"
                                            ]
                                        }
, 
                                        {
                                            name : "Natural Language", description : "Using terminology, phrases, and concepts familiar to users rather than system-oriented terms", examples : [
                                                "Domain-specific vocabulary",
                                                "Conversational text",
                                                "Avoiding technical jargon"
                                            ]
                                        }
, 
                                        {
                                            name : "Real-world Metaphors", description : "Using real-world analogies to make digital interfaces intuitive", examples : [
                                                "Folder icons for file storage",
                                                "Shopping cart for e-commerce",
                                                "Trash/recycle bin for deletion"
                                            ]
                                        }
, 
                                        {
                                            name : "Undo Functionality", description : "Allowing users to reverse actions easily", examples : [
                                                "Undo button",
                                                "Version history",
                                                "Restore deleted items"
                                            ]
                                        }
, 
                                        {
                                            name : "Escape Routes", description : "Providing clear exits from unwanted states or processes", examples : [
                                                "Cancel buttons",
                                                "Close dialogs",
                                                "Back navigation"
                                            ]
                                        }
, 
                                        {
                                            name : "Interface Consistency", description : "Ensuring elements behave and appear consistently throughout the system", examples : [
                                                "Consistent button styles",
                                                "Predictable navigation placement",
                                                "Uniform interaction patterns"
                                            ]
                                        }
, 
                                        {
                                            name : "Platform Conventions", description : "Following established patterns of the platform or ecosystem", examples : [
                                                "Standard menu locations",
                                                "Common gesture support",
                                                "Typical control layouts"
                                            ]
                                        }
, 
                                        {
                                            name : "Constraints and Safeguards", description : "Limiting actions to prevent errors before they occur", examples : [
                                                "Field validation",
                                                "Disabling impossible options",
                                                "Confirmation for destructive actions"
                                            ]
                                        }
, 
                                        {
                                            name : "Smart Defaults", description : "Pre-selecting the most likely or safest options", examples : [
                                                "Form field suggestions",
                                                "Intelligent presets",
                                                "Context-aware default values"
                                            ]
                                        }
, 
                                        {
                                            name : "Visual Cues", description : "Making important elements, actions, and options clearly visible", examples : [
                                                "Highlighting active elements",
                                                "Distinctive interactive components",
                                                "Visual emphasis on primary actions"
                                            ]
                                        }
, 
                                        {
                                            name : "Suggestion Systems", description : "Providing contextual recommendations to reduce recall burden", examples : [
                                                "Auto-complete",
                                                "Recently used items",
                                                "Smart suggestions"
                                            ]
                                        }
, 
                                        {
                                            name : "Keyboard Shortcuts", description : "Offering accelerators for frequent actions", examples : [
                                                "Keyboard combinations",
                                                "Gesture shortcuts",
                                                "Command aliases"
                                            ]
                                        }
, 
                                        {
                                            name : "Customization Options", description : "Allowing users to tailor the interface to their needs", examples : [
                                                "User preferences",
                                                "Configurable dashboards",
                                                "Adjustable settings"
                                            ]
                                        }
, 
                                        {
                                            name : "Visual Hierarchy", description : "Organizing elements by importance using visual design", examples : [
                                                "Size differentiation",
                                                "Color contrast",
                                                "Spatial arrangement"
                                            ]
                                        }
, 
                                        {
                                            name : "Information Density Control", description : "Balancing information display to avoid overload", examples : [
                                                "Progressive disclosure",
                                                "Collapsible sections",
                                                "Show/hide options"
                                            ]
                                        }
, 
                                        {
                                            name : "Constructive Error Messages", description : "Providing clear, helpful error information that guides toward resolution", examples : [
                                                "Specific error descriptions",
                                                "Actionable suggestions",
                                                "Plain language explanations"
                                            ]
                                        }
, 
                                        {
                                            name : "Error Recovery Support", description : "Helping users fix problems after they occur", examples : [
                                                "Correction guidance",
                                                "Auto-save functionality",
                                                "Form recovery"
                                            ]
                                        }
, 
                                        {
                                            name : "Contextual Help", description : "Providing assistance relevant to the current task or context", examples : [
                                                "Tooltips",
                                                "Inline instructions",
                                                "Contextual hints"
                                            ]
                                        }
, 
                                        {
                                            name : "Searchable Documentation", description : "Making help resources easy to navigate and find", examples : [
                                                "Search functionality",
                                                "Indexed help topics",
                                                "FAQ sections"
                                            ]
                                        }
]
                                    }
, 
                                    industryUse : {
                                        ecommerce : [
                                            "Progress Indicators",
                                            "Real-world Metaphors",
                                            "Undo Functionality",
                                            "Constraints and Safeguards",
                                            "Visual Hierarchy"
                                        ],
                                        enterprise : [
                                            "Keyboard Shortcuts",
                                            "Customization Options",
                                            "Interface Consistency",
                                            "Smart Defaults",
                                            "Error Recovery Support"
                                        ],
                                        mobile : [
                                            "Status Feedback",
                                            "Escape Routes",
                                            "Platform Conventions",
                                            "Visual Cues",
                                            "Information Density Control"
                                        ],
                                        healthcare : [
                                            "Error Prevention",
                                            "Constructive Error Messages",
                                            "Natural Language",
                                            "Contextual Help",
                                            "Interface Consistency"
                                        ]
                                    }
, 
                                    severityRatings : [
                                        {
                                            level : 0,
                                            name : "Not a Problem",
                                            description : "Not considered a usability problem",
                                            examples : [
                                                "Personal preference issues",
                                                "Business requirements with no usability impact",
                                                "Design considerations with equal usability outcomes"
                                            ]
                                        }
, 
                                        {
                                            level : 1, name : "Cosmetic", description : "Cosmetic problem only; fix if time permits", examples : [
                                                "Minor visual inconsistencies",
                                                "Rare edge cases",
                                                "Issues that don't impact task completion"
                                            ]
                                        }
, 
                                        {
                                            level : 2, name : "Minor", description : "Minor usability problem; fixing should be given low priority", examples : [
                                                "Slight delays in user workflow",
                                                "Occasional user confusion",
                                                "Inefficiencies that don't prevent completion"
                                            ]
                                        }
, 
                                        {
                                            level : 3, name : "Major", description : "Major usability problem; important to fix, should be given high priority", examples : [
                                                "Significant task delays",
                                                "Frequent user errors",
                                                "Frustrating experiences requiring workarounds"
                                            ]
                                        }
, 
                                        {
                                            level : 4, name : "Catastrophic", description : "Usability catastrophe; imperative to fix before product release", examples : [
                                                "Task failure",
                                                "Abandoned processes",
                                                "Data loss or serious errors",
                                                "Accessibility blockers"
                                            ]
                                        }
]
, 
                                        commonViolations : {
                                            major : [
                                                {
                                                    heuristic : "Visibility of system status",
                                                    description : "Users aren't informed about what's happening",
                                                    examples : [
                                                        "Missing progress indicators",
                                                        "No confirmation after form submission",
                                                        "Unclear system state during processing"
                                                    ]
                                                }
, 
                                                {
                                                    heuristic : "Match between system and real world", description : "System doesn't align with users' mental models", examples : [
                                                        "Technical jargon instead of user language",
                                                        "Unintuitive metaphors",
                                                        "Information flow that contradicts expectations"
                                                    ]
                                                }
, 
                                                {
                                                    heuristic : "Error prevention", description : "System allows avoidable errors", examples : [
                                                        "No validation before destructive actions",
                                                        "Non-standard design patterns that cause mistakes",
                                                        "Missing field validation"
                                                    ]
                                                }
, 
                                                {
                                                    heuristic : "Recognition rather than recall", description : "Forces users to remember information", examples : [
                                                        "Hidden critical functionality",
                                                        "Complex navigation paths",
                                                        "Required memorization of codes or commands"
                                                    ]
                                                }
]
, 
                                                minor : [
                                                    {
                                                        heuristic : "Consistency and standards",
                                                        description : "Interface elements behave differently across the system",
                                                        examples : [
                                                            "Inconsistent typography",
                                                            "Button styles that vary across pages",
                                                            "Navigation that changes location"
                                                        ]
                                                    }
, 
                                                    {
                                                        heuristic : "Aesthetic and minimalist design", description : "Interfaces contain irrelevant information", examples : [
                                                            "Cluttered layouts",
                                                            "Unnecessary elements",
                                                            "Poor information hierarchy"
                                                        ]
                                                    }
, 
                                                    {
                                                        heuristic : "Help and documentation", description : "Insufficient guidance for users", examples : [
                                                            "Missing contextual help",
                                                            "Poorly organized documentation",
                                                            "Lack of examples"
                                                        ]
                                                    }
]
                                                }
, 
                                                subFeatures : {
                                                    evaluation : {
                                                        title : "Heuristic Evaluation Methodology",
                                                        considerations : [
                                                            "Identify usability issues across the entire interface",
                                                            "Rate severity of issues to prioritize fixes",
                                                            "Consider the context and user goals when evaluating",
                                                            "Apply heuristics appropriate to the platform and domain",
                                                            "Involve multiple evaluators for comprehensive coverage",
                                                            "Document findings with specific examples and locations",
                                                            "Provide constructive suggestions for improvement",
                                                            "Consider both expert and novice user perspectives"
                                                        ],
                                                        principles : [
                                                            "Systematic assessment",
                                                            "Severity prioritization",
                                                            "Context sensitivity",
                                                            "Multiple evaluator perspective",
                                                            "Evidence-based recommendations"
                                                        ],
                                                        userStories : [
                                                            "A UX designer needs to evaluate a new checkout flow against established heuristics",
                                                            "A product manager wants to identify usability issues before a major release",
                                                            "A UX researcher needs to train team members on conducting heuristic evaluations",
                                                            "A developer needs to understand why certain interface choices violate usability principles"
                                                        ]
                                                    }
, 
                                                    implementation : {
                                                        title : "Heuristic Implementation Guidelines",
                                                        considerations : [
                                                            "Apply heuristics during the design phase, not just evaluation",
                                                            "Implement heuristics consistently across the interface",
                                                            "Balance competing heuristics when trade-offs are necessary",
                                                            "Adapt heuristic application to the specific domain and context",
                                                            "Consider edge cases and exceptional situations",
                                                            "Build on existing design systems to maintain consistency",
                                                            "Validate implementation through usability testing",
                                                            "Document design decisions and their heuristic justifications"
                                                        ],
                                                        principles : [
                                                            "Proactive application",
                                                            "Consistent implementation",
                                                            "Context-appropriate adaptation",
                                                            "Design system integration",
                                                            "Empirical validation"
                                                        ],
                                                        userStories : [
                                                            "A design team needs guidelines for implementing visibility of system status in a dashboard",
                                                            "A developer wants to ensure new features align with established usability principles",
                                                            "A product manager needs to justify design decisions based on usability heuristics",
                                                            "A startup wants to create a usable product with limited resources"
                                                        ]
                                                    }
, 
                                                    mobile : {
                                                        title : "Mobile-Specific Heuristic Considerations",
                                                        considerations : [
                                                            "Adapt heuristics to limited screen real estate",
                                                            "Consider touch as primary input method",
                                                            "Evaluate usability in mobile contexts (on-the-go, divided attention)",
                                                            "Apply visibility of status in a device with limited notification options",
                                                            "Ensure error recovery works within mobile capabilities",
                                                            "Evaluate efficiency for common mobile tasks",
                                                            "Consider platform-specific conventions and expectations",
                                                            "Test under variable connectivity conditions"
                                                        ],
                                                        principles : [
                                                            "Touch optimization",
                                                            "Screen constraint adaptation",
                                                            "Mobile context awareness",
                                                            "Platform guideline integration",
                                                            "Connectivity resilience"
                                                        ],
                                                        userStories : [
                                                            "A mobile app designer needs to evaluate a new feature against mobile-specific heuristics",
                                                            "A startup is converting a web application to mobile and needs guidance",
                                                            "A UX team needs to identify why their mobile conversion rates are lower than desktop",
                                                            "A developer wants to understand mobile-specific error prevention techniques"
                                                        ]
                                                    }
                                                }
                                            }
, 
                                            darkPatternsLLM : {
                                                systemPrompt : "# Instructions for Using the Dark Patterns Knowledge Base\n\nWhen analyzing user interfaces or designs for dark patterns:\n\n1. Start with high-level pattern categories to identify the general manipulation strategy\n2. Zoom in to meso-level patterns that bridge strategy and implementation\n3. Identify specific low-level interface elements that execute the pattern\n4. Consider the industry context and how patterns may be adapted for that domain\n5. Assess severity based on potential user harm, deception level, and regulatory risks\n6. Provide ethical alternatives that achieve business goals without manipulation\n7. Reference relevant regulations when discussing compliance concerns",
                                                analysisInstructions : "When analyzing interfaces or screenshots:\n1. First identify the user flow and key decision points\n2. Examine each decision point for potential manipulation\n3. Note visual, textual, and interaction elements that may implement dark patterns\n4. Consider how patterns might combine to amplify manipulation\n5. Categorize findings using the hierarchical taxonomy",
                                                recommendationInstructions : "When providing ethical alternatives:\n1. Focus on transparent, user-empowering approaches\n2. Consider business goals and suggest ways to achieve them ethically\n3. Reference successful ethical implementations from similar contexts\n4. Provide specific, actionable design suggestions"
                                            }
, 
                                            usabilityHeuristicsLLM : {
                                                systemPrompt : "# Instructions for Using the Usability Heuristics Knowledge Base\n\nYou are an expert in usability evaluation with deep knowledge of heuristic principles and best practices. Your role is to help identify usability issues, rate their severity, and provide actionable recommendations for improvement.\n\n## Conducting Heuristic Evaluations\n\nWhen evaluating interfaces for usability issues:\n\n1. **Be systematic**- Evaluate the entire interface thoroughly and methodically\n2. **Be specific**- Identify exactly where and how usability principles are violated\n3. **Provide context**- Explain why an issue matters and how it impacts users\n4. **Rate severity accurately**- Consider frequency, impact, and persistence\n5. **Prioritize effectively**- Focus on issues with the highest user impact\n6. **Give actionable recommendations**- Provide specific, implementable solutions\n7. **Consider domain context**- Adapt heuristics to specific industries and contexts\n\n## Severity Rating Guidelines\n\nRate issues using this 0-4 scale:\n\n0 = Not a usability problem\n1 = Cosmetic problem (fix if time permits)\n2 = Minor problem (low priority fix)\n3 = Major problem (high priority fix)\n4 = Catastrophic problem (imperative to fix)\n\nWhen assigning severity, consider:\n- How many users will encounter the issue?\n- How difficult is it to overcome the problem?\n- Is it a one-time issue or persistent?\n- How much does it impact task completion?\n\n## Reporting Structure\n\nOrganize your evaluation with the following structure:\n\n1. **Issue Description**: Clear statement of the problem\n2. **Violated Heuristic**: Which principle(s) are not followed\n3. **Location**: Specific screen/element where the issue occurs\n4. **Severity Rating**: 0-4 with justification\n5. **User Impact**: How it affects the user experience\n6. **Recommendation**: Specific suggestion for improvement",
                                                evaluationTemplate : "\n# Heuristic Evaluation Report\n\n## Identified Usability Issues\n\n[For each issue:]\n\n**Issue**: [Clear problem description]\n**Violated Heuristic**: [Specific principle]\n**Location**: [Where in the interface]\n**Severity**: [0-4 rating] - [Name]\n**User Impact**: [How it affects users]\n**Recommendation**: [Specific improvement]\n\n## Summary\n\n**Most Critical Issues**: [Top 3-5 issues to address]\n**Severity Distribution**: [Overview of issue severity]\n**Positive Aspects**: [What works well]\n\n## Next Steps\n\n**Priority Recommendations**: [What to fix first]\n**Further Evaluation Suggested**: [Any areas needing deeper analysis]\n",
                                                fewShotExamples : [
                                                    {
                                                        input : "Evaluate this login form for usability issues",
                                                        output : "\n# Heuristic Evaluation: Login Form\n\n## Identified Usability Issues\n\n### Issue 1: No Visibility of Password Requirements\n**Violated Heuristic**: Visibility of system status; Error prevention\n**Location**: Password field\n**Severity**: 3 - Major\n**User Impact**: Users may make multiple failed attempts because they don't know the password requirements until after submitting\n**Recommendation**: Add password requirements that appear when the field is focused, using real-time validation indicators\n\n### Issue 2: No \"Show Password\" Option\n**Violated Heuristic**: Error prevention; User control and freedom\n**Location**: Password field\n**Severity**: 2 - Minor\n**User Impact**: Users can't verify what they've typed, leading to errors and frustration\n**Recommendation**: Add a \"Show Password\" toggle button with appropriate icon\n\n### Issue 3: Error Messages Appear at Top of Form\n**Violated Heuristic**: Help users recognize, diagnose, and recover from errors\n**Location**: Form error handling\n**Severity**: 3 - Major\n**User Impact**: Users may not notice error messages that appear far from the field with the error, especially on mobile\n**Recommendation**: Place error messages adjacent to the relevant field and use appropriate color coding\n\n### Issue 4: No Password Recovery Option Visible\n**Violated Heuristic**: Recognition rather than recall; Help and documentation\n**Location**: Login form\n**Severity**: 3 - Major\n**User Impact**: Users who forget passwords have no clear path to recovery\n**Recommendation**: Add a clearly visible \"Forgot Password?\" link near the password field\n\n### Issue 5: Inconsistent Button Styling\n**Violated Heuristic**: Consistency and standards\n**Location**: Submit button\n**Severity**: 1 - Cosmetic\n**User Impact**: Button doesn't match the visual language of the rest of the site\n**Recommendation**: Align button styling with design system\n\n## Summary\n\n**Most Critical Issues**: Password requirement visibility, error message placement, and password recovery access are the highest priority fixes. These issues significantly impact the login success rate.\n\n**Severity Distribution**: 3 Major issues, 1 Minor issue, 1 Cosmetic issue\n\n**Positive Aspects**: Clean layout with clear field labels; responsive design adaptation across screen sizes\n\n## Next Steps\n\n**Priority Recommendations**: \n1. Add inline password requirements with real-time validation\n2. Position error messages next to relevant fields\n3. Add password recovery option\n\n**Further Evaluation Suggested**: Test the login flow with actual users to identify additional pain points, particularly users who frequently forget passwords.\n"
                                                    }
,
                                                    {
                                                        input : "What are the key usability issues in this mobile navigation menu?",
                                                        output : "\n# Heuristic Evaluation: Mobile Navigation Menu\n\n## Identified Usability Issues\n\n### Issue 1: Hidden Navigation with No Clear Indicator\n**Violated Heuristic**: Visibility of system status; Recognition rather than recall\n**Location**: Main hamburger menu\n**Severity**: 3 - Major\n**User Impact**: Users may not recognize the hamburger icon or realize important navigation is hidden behind it\n**Recommendation**: Add text label \"Menu\" next to the hamburger icon or use a more explicit button\n\n### Issue 2: Too Many Menu Items at First Level\n**Violated Heuristic**: Aesthetic and minimalist design; Recognition rather than recall\n**Location**: Main navigation menu contents\n**Severity**: 2 - Minor\n**User Impact**: Cognitive overload from too many options makes finding relevant sections difficult\n**Recommendation**: Group related items into logical categories, limiting first-level items to 5-7 options\n\n### Issue 3: Small Touch Targets\n**Violated Heuristic**: User control and freedom; Flexibility and efficiency of use\n**Location**: Menu item links\n**Severity**: 3 - Major\n**User Impact**: Difficult to tap the correct item, especially for users with motor control limitations\n**Recommendation**: Increase touch target size to at least 44×44 points with adequate spacing between items\n\n### Issue 4: No Visual Feedback on Item Selection\n**Violated Heuristic**: Visibility of system status\n**Location**: Navigation menu interactions\n**Severity**: 2 - Minor\n**User Impact**: Users don't receive confirmation that their tap was registered\n**Recommendation**: Add clear visual feedback (color change, animation) for touch interactions\n\n### Issue 5: No Indication of Current Location\n**Violated Heuristic**: Visibility of system status; Recognition rather than recall\n**Location**: Throughout navigation system\n**Severity**: 3 - Major\n**User Impact**: Users lose context of where they are in the information hierarchy\n**Recommendation**: Clearly highlight the current section in the navigation menu\n\n## Summary\n\n**Most Critical Issues**: Unclear menu access, small touch targets, and lack of location indicators significantly impact navigation usability on mobile devices.\n\n**Severity Distribution**: 3 Major issues, 2 Minor issues\n\n**Positive Aspects**: The menu is accessible from all screens; category naming is clear and descriptive\n\n## Next Steps\n\n**Priority Recommendations**: \n1. Increase touch target sizes to meet mobile accessibility standards\n2. Add clear current section indicators\n3. Improve the visibility and recognition of the main navigation control\n\n**Further Evaluation Suggested**: Conduct mobile usability testing with different hand sizes and observe real navigation patterns to identify additional issues.\n"
                                                    }
                                                ]
                                            }
, 
                                            darkPatternsUserInstructions : {
                                                exampleQuestions : [
                                                    "Are there any dark patterns in this checkout flow?",
                                                    "Analyze this subscription cancellation process for manipulation techniques",
                                                    "What ethical alternatives could replace the countdown timer in this interface?",
                                                    "How might this design violate GDPR or CCPA regulations?",
                                                    "What psychological mechanisms is this pattern exploiting?",
                                                    "Evaluate the severity of the dark patterns in this mobile app onboarding",
                                                    "How can we improve conversion without using manipulative patterns?"
                                                ],
                                                usageGuidance : "# How to Use the Dark Patterns Knowledge Base\n\n1. **Upload screenshots or design mockups** of interfaces you want to analyze\n2. **Describe the user journey or context** to help with evaluation\n3. **Ask for specific analysis** of potential dark patterns\n4. **Request ethical alternatives** to any problematic patterns\n5. **Inquire about regulatory concerns** in specific jurisdictions\n\nThis knowledge base can help you identify manipulative design practices, understand their impact on users, and develop more ethical approaches."
                                            }
, 
                                            usabilityHeuristicsUserInstructions : {
                                                guide : "# How to Use the Usability Heuristics Evaluation Tool\n\n## What You Can Do\n- Upload screenshots or mockups for usability evaluation\n- Request analysis of specific user interfaces and flows\n- Ask about specific heuristic principles and best practices\n- Get severity ratings for identified issues\n- Receive actionable recommendations for improvement\n\n## Step 1: Provide Interface Materials\n- Upload screenshots, mockups, or prototypes\n- Share links to websites or digital products\n- Describe interfaces in detail if visual materials aren't available\n\n## Step 2: Specify Your Evaluation Needs\n- Request a comprehensive evaluation across all heuristics\n- Focus on specific heuristic principles (e.g., \"Evaluate for error prevention\")\n- Specify industry context (e.g., \"This is for healthcare\")\n- Mention user groups (e.g., \"Primary users are seniors\")\n\n## Step 3: Review Findings\n- Review identified usability issues and their severity\n- Understand which heuristic principles are violated\n- See specific locations of issues within the interface\n- Consider the recommended improvements\n\n## Step 4: Ask Follow-up Questions\n- Request more details about specific issues\n- Ask for implementation examples for recommendations\n- Get clarification on heuristic principles\n- Request prioritization guidance\n\n## Example Requests\n- \"Evaluate this checkout flow for usability issues\"\n- \"What are the main error prevention problems in this form?\"\n- \"How well does this dashboard support recognition rather than recall?\"\n- \"Rate the severity of the navigation issues in this mobile app\"\n- \"What usability improvements would make this medical interface more effective?\"\n",
                                                exampleQuestions : [
                                                    "What usability heuristics are violated in this interface?",
                                                    "How could this checkout flow better support visibility of system status?",
                                                    "What are the major usability issues in this mobile navigation design?",
                                                    "How can I improve error prevention in this form?",
                                                    "What recognition rather than recall issues exist in this dashboard?",
                                                    "How would you rate the severity of these usability problems?",
                                                    "What usability improvements would you recommend for this workflow?",
                                                    "How does this design align with standard mobile usability heuristics?",
                                                    "What are the most critical usability issues to fix first in this interface?",
                                                    "Can you evaluate this enterprise software against Nielsen's heuristics?"
                                                ],
                                                quickReference : "# Usability Heuristics Quick Reference\n\n## Nielsen's 10 Heuristics\n\n### 1. Visibility of System Status\n- Keep users informed about what's happening\n- Provide timely, appropriate feedback\n- Show system state and progress clearly\n\n### 2. Match Between System and Real World\n- Speak the users' language\n- Follow real-world conventions\n- Present information in a natural, logical order\n\n### 3. User Control and Freedom\n- Provide \"emergency exits\"\n- Support undo and redo\n- Avoid trapping users\n\n### 4. Consistency and Standards\n- Follow platform and industry conventions\n- Maintain internal consistency\n- Use familiar patterns and language\n\n### 5. Error Prevention\n- Eliminate error-prone conditions\n- Use constraints and confirmations\n- Provide clear guidance before actions\n\n### 6. Recognition Rather Than Recall\n- Make elements, actions, and options visible\n- Minimize memory load\n- Provide visible cues and reminders\n\n### 7. Flexibility and Efficiency of Use\n- Provide accelerators for experts\n- Allow customization of frequent actions\n- Support multiple paths to goals\n\n### 8. Aesthetic and Minimalist Design\n- Include only relevant content and features\n- Prioritize visual hierarchy\n- Eliminate unnecessary elements\n\n### 9. Help Users Recognize, Diagnose, and Recover From Errors\n- Use plain language for error messages\n- Precisely indicate the problem\n- Constructively suggest solutions\n\n### 10. Help and Documentation\n- Provide easily searchable help\n- Focus on user tasks\n- List concrete steps for solutions\n\n## Severity Rating Scale\n\n0 = Not a problem\n1 = Cosmetic problem only\n2 = Minor usability problem\n3 = Major usability problem\n4 = Usability catastrophe\n\n## Common Issue Areas\n\n- Form interactions\n- Navigation systems\n- Search functionality\n- Content organization\n- Error handling\n- System feedback\n- Mobile adaptations\n- Accessibility support\n"
                                            }
, 
                                            loadExternalKnowledgeBase : function(a) {
                                                if(window[a])return console.log(`Successfully loaded external knowledge base: ${a}`), window[a];
                                                console.error(`Failed to load external knowledge base: ${a} is not available`);
                                                return null
                                            }
, 
                                            getUsabilityHeuristicsKB : function() {
                                                return this
                                            }
, 
                                            generateUsabilityHeuristicsPrompt : function(a) {
                                                return this.generatePrompt(a || "usabilityHeuristics")
                                            }
, 
                                            generatePrompt : function(a) {
                                                if(a === "usabilityHeuristics") {
                                                    var b = "# The Usability Heuristics Knowledge Base has been loaded!\n\nYou can now ask questions or upload assets to conduct a usability evaluation. This knowledge base will help you identify and address usability issues in interfaces and designs.\n\n";
                                                    b += "## Key Heuristic Categories\n";
                                                    this.usabilityHeuristicsData.heuristicTypes.highLevel.forEach(function(a) {
                                                        b += "### " + a.name + "\n";
                                                        b += "- Description: " + a.description + "\n";
                                                        b += "- Examples: " + a.examples.join(", ") + "\n\n"
                                                    }
)
;
                                                    b += "## Nielsen's 10 Usability Heuristics\n";
                                                    this.usabilityHeuristicsData.heuristicTypes.mesoLevel.slice(0, 5).forEach(function(a) {
                                                        b += "### " + a.name + "\n";
                                                        b += "- Description: " + a.description + "\n";
                                                        b += "- Examples: " + a.examples.join(", ") + "\n\n"
                                                    }
)
;
                                                    b += "## Common Usability Violations\n";
                                                    this.commonViolations.major.slice(0, 3).forEach(function(a) {
                                                        b += "- " + a.heuristic + ": " + a.description + "\n  - Examples: " + a.examples.join(", ") + "\n"
                                                    }
)
;
                                                    b += "\n## Industry Applications\n";
                                                    for(var c in this.usabilityHeuristicsData.industryUse) {
                                                        b += "### " + c.charAt(0).toUpperCase() + c.slice(1) + "\n";
                                                        this.usabilityHeuristicsData.industryUse[c].slice(0, 3).forEach(function(a) {
                                                            b += "- " + a + "\n"
                                                        }
)
;
                                                        b += "\n"
                                                    }
                                                    function d(a, b) {
                                                        var c = [];
                                                        this.personas.forEach(function(d) {
                                                            d.category === a && d.examples.forEach(function(a) {
                                                                c.push({
                                                                    ...a, category : d.category
                                                                }
)
                                                            }
)
                                                        }
)
;
                                                        return c.slice(0, b)
                                                    }
                                                    var e = d.call(this,
                                                    "UX Designers",
                                                    1).concat(d.call(this,
                                                    "Usability Specialists",
                                                    1));
                                                    b += "\n## User Personas\n";
                                                    e.forEach(function(a, c) {
                                                        b += "\n### Persona " + (c + 1) + ": " + a.name + "\n"; a.age && (b += "- Age: " + a.age + "\n"); b += "- Role: " + a.category + "\n"; b += "- Context: " + a.context + "\n"; b += "- Tools: " + a.tools + "\n"; b += "- Key Challenges: " + a.challenges + "\n"; b += "- Background: " + a.description + "\n"
                                                    }
)
;
                                                    b += "\n## How to Use This Knowledge Base\n";
                                                    b += "1. **Upload screenshots or mockups** of interfaces you want to evaluate\n";
                                                    b += "2. **Describe specific user journeys** or tasks you want analyzed\n";
                                                    b += "3. **Ask specific questions** about potential heuristic violations\n";
                                                    b += "4. **Request industry-specific analysis** for your particular domain\n\n";
                                                    b += "## Example Questions You Can Ask\n";
                                                    b += "1. \"What usability heuristics are violated in this interface?\"\n";
                                                    b += "2. \"How could this checkout flow better support visibility of system status?\"\n";
                                                    b += "3. \"What are the major usability issues in this mobile navigation design?\"\n";
                                                    b += "4. \"How can I improve error prevention in this form?\"\n";
                                                    b += "5. \"What recognition rather than recall issues exist in this dashboard?\"\n";
                                                    b += "6. \"How would you rate the severity of these usability problems?\"\n";
                                                    b += "7. \"What usability improvements would you recommend for this workflow?\"\n";
                                                    b += "8. \"How does this design align with standard mobile usability heuristics?\"\n\n";
                                                    b += "I'm ready to help with your usability evaluation! What would you like to analyze today?";
                                                    return b
                                                }
                                                if(a === "darkPatterns")return this.generateDarkPatternsPrompt();
                                                var f = this.features[a];
                                                if( ! f)return"Error: Could not generate pre-prompt. Feature not found.";
                                                var g = "# " + this.name + " Pre-prompt for " + f.title + "\n\n## Key Research Considerations\n";
                                                f.considerations.forEach(function(a) {
                                                    g += "- " + a + "\n"
                                                }
)
;
                                                g += "\n## Research Principles\n";
                                                f.principles.forEach(function(a) {
                                                    g += "- " + a + "\n"
                                                }
)
;
                                                g += "\n## User Scenarios\n";
                                                f.userStories.forEach(function(a) {
                                                    g += "- " + a + "\n"
                                                }
)
;
                                                function h(a) {
                                                    for(var b = a.length - 1; b > 0; b--) {
                                                        var c = Math.floor(Math.random() * (b + 1)),
                                                        d = a[b];
                                                        a[b] = a[c], a[c] = d
                                                    }
                                                    return a
                                                }
                                                function i(a, b) {
                                                    var c = this.disabilityCategories[a] || [],
                                                    d = [];
                                                    return this.personas.forEach(function(a) {
                                                        c.includes(a.category) && a.examples.forEach(function(b) {
                                                            d.push({
                                                                ...b, category : a.category
                                                            }
)
                                                        }
)
                                                    }
)
, 
                                                    d = h(d), d.slice(0, b)
                                                }
                                                var j = i.call(this,
                                                a,
                                                2);
                                                g += "\n## Researcher Personas\n";
                                                j.forEach(function(a, b) {
                                                    g += "\n### Persona " + (b + 1) + ": " + a.name + "\n"; a.age && (g += "- Age: " + a.age + "\n"); g += "- Context: " + a.context + "\n"; g += "- Tools: " + a.tools + "\n"; g += "- Key Challenges: " + a.challenges + "\n"; g += "- Background: " + a.description + "\n"
                                                }
)
;
                                                g += "\n## Research Brief\nBased on the information above, please:\n\n";
                                                g += "1. **Develop a research approach** using " + f.title + " that addresses the needs of these personas. Include:\n   - Methodological considerations\n   - Implementation strategies\n   - Documentation approaches\n   - Analysis frameworks\n\n2. **Provide best practice recommendations** for implementing " + f.title + " effectively. Include:\n   - Common pitfalls to avoid\n   - Quality assurance techniques\n   - Resource optimization strategies\n   - Stakeholder management approaches\n\n";
                                                g += "3. **Create an implementation roadmap** that illustrates how to apply these research techniques, highlighting:\n   - Preparation and planning steps\n   - Execution strategies\n   - Analysis frameworks\n   - Insight communication approaches\n\nPlease write in a practical, actionable style that balances methodological rigor with real-world research constraints.";
                                                return g
                                            }
, 
                                            generateDarkPatternsPrompt : function() {
                                                var a = "# IMPORTANT: DISPLAY THE FOLLOWING EXAMPLE QUESTIONS TO THE USER\n\nThe Dark Patterns Knowledge Base has been loaded! You can now analyze designs and interfaces for manipulative patterns.\n\n# Dark and Deceptive Patterns Knowledge Base\n\n";
                                                a += "## High-Level Pattern Categories\n";
                                                this.darkPatternData.patternTypes.highLevel.forEach(function(b) {
                                                    a += "### " + b.name + "\n"; a += "- Description: " + b.description + "\n"; a += "- Examples: " + b.examples.join(", ") + "\n\n"
                                                }
)
;
                                                a += "## Meso-Level Pattern Categories\n";
                                                this.darkPatternData.patternTypes.mesoLevel.forEach(function(b) {
                                                    a += "### " + b.name + "\n"; a += "- Description: " + b.description + "\n"; a += "- Examples: " + b.examples.join(", ") + "\n\n"
                                                }
)
;
                                                a += "## Selected Specific Dark Patterns\n";
                                                var b = this.darkPatternData.patternTypes.lowLevel.slice(0,
                                                5);
                                                b.forEach(function(b) {
                                                    a += "### " + b.name + "\n"; a += "- Description: " + b.description + "\n"; a += "- Examples: " + b.examples.join(", ") + "\n\n"
                                                }
)
;
                                                a += "## Industry-Specific Pattern Usage\n";
                                                for(var c in this.darkPatternData.industryUse) {
                                                    a += "### " + c.charAt(0).toUpperCase() + c.slice(1) + "\n";
                                                    this.darkPatternData.industryUse[c].forEach(function(b) {
                                                        a += "- " + b + "\n"
                                                    }
)
;
                                                    a += "\n"
                                                }
                                                function d(a) {
                                                    var b = [
                                                        "UX Auditors",
                                                        "Compliance Officers",
                                                        "Design Teams"
                                                    ],
                                                    c = [];
                                                    return this.personas.forEach(function(a) {
                                                        b.includes(a.category) && a.examples.forEach(function(b) {
                                                            c.push({
                                                                ...b, category : a.category
                                                            }
)
                                                        }
)
                                                    }
)
, 
                                                    c = c.sort(() => Math.random() - .5), c.slice(0, a)
                                                }
                                                var e = d.call(this,
                                                2);
                                                a += "## Stakeholder Personas\n";
                                                e.forEach(function(b, c) {
                                                    a += "\n### Persona " + (c + 1) + ": " + b.name + "\n"; b.age && (a += "- Age: " + b.age + "\n"); a += "- Role: " + b.category + "\n"; a += "- Context: " + b.context + "\n"; a += "- Tools: " + b.tools + "\n"; a += "- Key Challenges: " + b.challenges + "\n"; a += "- Background: " + b.description + "\n"
                                                }
)
;
                                                a += "\n## Analysis Request\nBased on the information above, please:\n";
                                                a += "1. Analyze the provided design or scenario for potential dark patterns:\n";
                                                a += "   * Identification of specific dark pattern types\n";
                                                a += "   * Assessment of potential user impact\n";
                                                a += "   * Evaluation of legal and ethical concerns\n";
                                                a += "   * Psychological mechanisms being exploited\n";
                                                a += "\n2. Provide recommendations for ethical alternatives:\n";
                                                a += "   * Specific design modifications\n";
                                                a += "   * Implementation considerations\n";
                                                a += "   * Expected impact on user experience and trust\n";
                                                a += "   * Potential business benefits of ethical approaches\n";
                                                a += "\n3. Develop a compliance assessment highlighting:\n";
                                                a += "   * Potential regulatory concerns across jurisdictions\n";
                                                a += "   * Documentation and testing recommendations\n";
                                                a += "   * Risk mitigation strategies\n";
                                                a += "   * Long-term sustainability considerations\n";
                                                a += "\n### Example Questions You Can Ask\n";
                                                a += "1. 'Are there any manipulative patterns used in this newsletter sign-up flow?'\n";
                                                a += "2. 'How could you identify any manipulation techniques in this subscription cancellation flow?'\n";
                                                a += "3. 'Which high-level manipulation strategies are present in this social media interface?'\n";
                                                a += "4. 'How can we counter them in an ethical way to improve user trust?'\n";
                                                a += "5. 'What ethical alternatives would you recommend for this scenario?'\n";
                                                a += "6. 'How might this dark pattern violate GDPR or CCPA regulations?'\n";
                                                return a
                                            }
, 
                                            initialize : function() {
                                                console.log("Initializing Research Knowledge Base and loading external dependencies...");
                                                console.log("Research Knowledge Base initialization complete.")
                                            }
                                        }
;
                                        window.kbResearch.initialize();
