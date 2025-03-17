/**
 * Research Knowledge Base Core
 * This file provides the core functionality for loading and processing research-related 
 * knowledge bases such as Dark Patterns and Usability Heuristics.
 */
(function() {
    // Private utilities
    const utils = {
        log: function(message, type = 'info') {
            const prefix = '[KB Research]';
            if (type === 'error') {
                console.error(`${prefix} ${message}`);
            } else {
                console.log(`${prefix} ${message}`);
            }
        },

        /**
         * Load JSON data from a URL
         * @param {string} url - The URL to load JSON from
         * @returns {Promise<Object>} - The loaded JSON data
         */
        loadJSON: async function(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to load JSON: ${response.status} ${response.statusText}`);
                }
                return await response.json();
            } catch (error) {
                utils.log(`Error loading JSON from ${url}: ${error.message}`, 'error');
                throw error;
            }
        }
    };

    // Create the knowledge base object
    const kbResearch = {
        name: "Research Best Practices",
        features: {
            darkPatterns: {
                title: "Dark and Deceptive Patterns",
                considerations: [
                    "Identify high-level manipulation strategies across contexts",
                    "Analyze meso-level patterns bridging strategies and implementations",
                    "Detect low-level interface elements that exploit user behavior",
                    "Map dark patterns across different user journeys",
                    "Consider contextual factors affecting pattern effectiveness",
                    "Evaluate severity and impact of different pattern types",
                    "Recognize pattern combinations that amplify manipulation"
                ],
                principles: [
                    "Hierarchical classification",
                    "Context sensitivity",
                    "User impact measurement",
                    "Pattern detection methodology",
                    "Cross-disciplinary analysis",
                    "Ethical design alternatives",
                    "Regulatory compliance"
                ],
                userStories: [
                    "A UX auditor needs to identify dark patterns in an e-commerce checkout flow",
                    "A regulatory analyst requires a framework to categorize manipulative design elements",
                    "A design team wants to review their interfaces for unintentional dark patterns",
                    "A researcher needs to document dark pattern prevalence across industry sectors",
                    "A compliance officer needs to audit interfaces for regulatory violations",
                    "A UX team needs ethical alternatives to common dark patterns",
                    "A financial regulator needs to evaluate investment platforms for misleading patterns",
                    "A banking app team wants to ensure their fee disclosure meets ethical standards",
                    "A fintech startup needs to review their loan application flow for regulatory compliance",
                    "A wealth management firm needs to audit their subscription cancellation process"
                ]
            },
            usabilityHeuristics: {
                title: "Usability Heuristics Evaluation",
                considerations: [
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
                principles: [
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
                userStories: [
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
                ]
            }
        },
        loadedFeatures: {},
        featureUrls: {
            darkPatterns: "https://example.com/dark-patterns.json",
            usabilityHeuristics: "https://example.com/usability-heuristics.json"
        },
        
        // Professional Categories for personas
        professionalCategories: {
            darkPatterns: [
                "UX Auditors",
                "Regulatory Analysts",
                "Design Teams",
                "Researchers",
                "Compliance Officers",
                "UX Teams",
                "Financial Regulators",
                "Banking UX Specialists"
            ],
            usabilityHeuristics: [
                "UX Researchers",
                "UX Designers",
                "Product Managers",
                "Usability Specialists",
                "Financial UX Designers",
                "Banking Product Managers"
            ]
        },
        
        // Personas data with detailed examples
        personas: [
            {
                category: "UX Researchers",
                examples: [
                    {
                        name: "Maya",
                        age: 34,
                        context: "Mid-sized tech company",
                        tools: "Research repositories, analysis software, video conferencing",
                        challenges: "Balancing depth with timeline pressure, stakeholder management, sample recruitment",
                        description: "Maya has 8 years of experience leading UX research. She's skilled at translating complex findings into actionable insights but struggles with tight deadlines and limited resources."
                    },
                    {
                        name: "Darius",
                        age: 28,
                        context: "Agency environment with multiple clients",
                        tools: "Remote testing platforms, survey tools, collaboration software",
                        challenges: "Context switching between projects, maintaining research quality with speed, communicating value to clients",
                        description: "Darius conducts research across multiple client projects simultaneously. He excels at adapting methodologies to different contexts but struggles with the constant context switching."
                    }
                ]
            },
            {
                category: "UX Auditors",
                examples: [
                    {
                        name: "Raj",
                        age: 41,
                        context: "Consumer protection agency",
                        tools: "Pattern recognition algorithms, regulatory frameworks, case documentation systems",
                        challenges: "Proving intent behind patterns, measuring harm, keeping up with pattern evolution",
                        description: "Raj identifies and documents dark patterns to support regulatory action. He develops methodologies to systematically catalog manipulative interfaces."
                    },
                    {
                        name: "Camila",
                        age: 42,
                        context: "Consumer protection authority",
                        tools: "Regulatory frameworks, enforcement case management, investigative methodologies",
                        challenges: "Building evidence for enforcement, keeping pace with pattern evolution, coordinating across jurisdictions",
                        description: "Camila investigates reported dark patterns and prepares enforcement actions. She helps develop guidelines and educational materials for businesses and consumers."
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
                category: "Usability Specialists",
                examples: [
                    {
                        name: "Liam",
                        age: 31,
                        context: "UX consulting firm",
                        tools: "Heuristic evaluation templates, usability testing software, analytics tools",
                        challenges: "Communicating issues to non-UX stakeholders, balancing thoroughness with efficiency, prioritizing findings",
                        description: "Liam conducts heuristic evaluations for various clients and product teams. He specializes in translating usability principles into actionable recommendations."
                    },
                    {
                        name: "Akiko",
                        age: 35,
                        context: "Enterprise UX team",
                        tools: "Evaluation frameworks, severity rating systems, reporting templates",
                        challenges: "Evaluating complex interfaces systematically, maintaining consistency across evaluators, connecting findings to business impact",
                        description: "Akiko leads usability evaluation initiatives across multiple product lines. She develops standardized approaches to ensure consistent quality assessments."
                    }
                ]
            },
            {
                category: "Financial Regulators",
                examples: [
                    {
                        name: "Morgan",
                        age: 45,
                        context: "Financial consumer protection bureau",
                        tools: "Regulatory compliance frameworks, case management systems, documentation tools",
                        challenges: "Identifying subtle manipulation in complex financial interfaces, keeping pace with rapid fintech innovation, balancing innovation with consumer protection",
                        description: "Morgan evaluates financial service platforms for regulatory compliance. She specializes in identifying dark patterns in investment platforms, loan applications, and banking interfaces that may lead consumers to make uninformed financial decisions."
                    },
                    {
                        name: "Victor",
                        age: 39,
                        context: "Investment regulatory authority",
                        tools: "Dark pattern evaluation frameworks, risk assessment models, compliance checklists",
                        challenges: "Proving harm from subtle manipulative patterns, addressing cross-border regulatory differences, communicating technical findings to legal teams",
                        description: "Victor investigates trading platforms and investment apps for patterns that might mislead investors. He works to develop standards that protect consumers while allowing for innovation in financial services."
                    }
                ]
            },
            {
                category: "Banking UX Specialists",
                examples: [
                    {
                        name: "Sophie",
                        age: 37,
                        context: "Large international bank",
                        tools: "Banking UX guidelines, prototype testing software, accessibility compliance tools",
                        challenges: "Balancing security requirements with usability, navigating complex regulatory environments, adapting to rapid changes in mobile banking technology",
                        description: "Sophie leads UX design for mobile banking applications. She ensures that financial interfaces are both user-friendly and compliant with banking regulations, while avoiding dark patterns that might mislead customers about fees or terms."
                    },
                    {
                        name: "Jamal",
                        age: 33,
                        context: "Fintech startup",
                        tools: "UX design systems for finance, usability testing platforms, banking API integration tools",
                        challenges: "Building trust in innovative financial interfaces, designing clear consent flows for financial data, simplifying complex financial concepts",
                        description: "Jamal creates interfaces for next-generation financial services. He focuses on designing transparent, ethical patterns for sensitive financial transactions and ensuring users understand the implications of their financial decisions."
                    }
                ]
            },
            {
                category: "Financial UX Designers",
                examples: [
                    {
                        name: "Hiroshi",
                        age: 36,
                        context: "Investment platform",
                        tools: "Financial visualization libraries, behavioral analytics tools, design systems",
                        challenges: "Communicating investment risk clearly, designing for financial literacy variations, balancing regulatory requirements with engaging experiences",
                        description: "Hiroshi specializes in designing investment interfaces that make complex financial information understandable. He focuses on ethical presentation of risk and return data, ensuring users can make informed investment decisions without being misled."
                    },
                    {
                        name: "Priya",
                        age: 31,
                        context: "Personal finance app company",
                        tools: "Financial design patterns, behavioral finance frameworks, prototyping software",
                        challenges: "Designing features that promote healthy financial behaviors, avoiding addictive patterns in financial tracking, simplifying complex financial decisions",
                        description: "Priya designs interfaces that help users manage personal finances. She works to create experiences that empower users with financial information while avoiding manipulative patterns that might lead to poor financial decisions."
                    }
                ]
            },
            {
                category: "Banking Product Managers",
                examples: [
                    {
                        name: "Carlos",
                        age: 42,
                        context: "Digital banking division",
                        tools: "Financial product roadmap tools, compliance tracking software, customer feedback platforms",
                        challenges: "Meeting aggressive growth targets while maintaining ethical standards, navigating complex approval processes, balancing feature innovation with security requirements",
                        description: "Carlos manages digital banking products that serve millions of customers. He strives to create value through thoughtful feature development while ensuring compliance with banking regulations and avoiding manipulative conversion tactics."
                    },
                    {
                        name: "Lin",
                        age: 38,
                        context: "Credit union digital services",
                        tools: "User story management software, analytics platforms, regulatory compliance checklists",
                        challenges: "Building trust with traditional banking customers, improving digital adoption rates, maintaining competitive features with limited resources",
                        description: "Lin oversees digital product development for a member-owned credit union. She focuses on transparent, ethical banking experiences that align with the credit union's mission while still meeting modern user expectations."
                    }
                ]
            }
        ],
        
        // Dark Pattern Data
        darkPatternData: {
            patternTypes: {
                highLevel: [
                    {
                        name: "Manipulation of Choice Architecture",
                        description: "Designs that structure and present choices in ways that lead users toward certain decisions",
                        examples: [
                            "Comparison prevention",
                            "Default biasing",
                            "Choice overloading"
                        ]
                    },
                    {
                        name: "Coercive Design",
                        description: "Interface elements that pressure or force users into taking certain actions",
                        examples: [
                            "Forced action",
                            "False urgency",
                            "Confirmshaming"
                        ]
                    }
                ],
                mesoLevel: [
                    {
                        name: "Emotional Manipulation",
                        description: "Design that exploits emotional responses to guide user behavior",
                        examples: [
                            "Confirmshaming",
                            "Guilt appeals",
                            "FOMO generation"
                        ]
                    },
                    {
                        name: "Obstruction",
                        description: "Deliberately making certain actions difficult to accomplish",
                        examples: [
                            "Roach motel",
                            "Hard-to-cancel",
                            "Interface interference"
                        ]
                    }
                ],
                financialSpecific: [
                    {
                        name: "Fee Obfuscation",
                        description: "Deliberately making fees difficult to understand or discover",
                        examples: [
                            "Hidden account fees",
                            "Complex fee structures",
                            "Deceptive free trial terms"
                        ]
                    },
                    {
                        name: "Risk Downplaying",
                        description: "Minimizing or hiding financial risk information",
                        examples: [
                            "Buried risk disclosures",
                            "Emphasizing returns over risks",
                            "Misrepresenting historical performance"
                        ]
                    },
                    {
                        name: "Commitment Escalation",
                        description: "Gradually increasing financial commitments through incremental steps",
                        examples: [
                            "Low initial deposit requirements that increase",
                            "Teaser rates that expire",
                            "Gradual subscription price increases"
                        ]
                    }
                ]
            },
            commonPatterns: [
                {
                    name: "Nagging",
                    description: "Repeated, intrusive prompts pressuring user actions",
                    examples: ["Persistent subscription prompts", "Recurring permission requests", "Repeated promotional messages"]
                },
                {
                    name: "Sneaking",
                    description: "Automatically adding items without clear consent",
                    examples: ["Hidden additional products", "Pre-selected upgrades", "Undisclosed recurring charges"]
                },
                {
                    name: "Privacy Zuckering",
                    description: "Deceptively extracting additional personal information",
                    examples: ["Misleading privacy controls", "Obfuscated data sharing permissions", "Hidden data collection"]
                },
                {
                    name: "Confirmshaming",
                    description: "Using negative emotion to shame users into actions",
                    examples: ["Decline buttons with guilt-inducing text", "Dismissive opt-out language", "Belittling user choices"]
                },
                {
                    name: "Disguised Ads",
                    description: "Ads mimicking non-advertisement content",
                    examples: ["Native advertising without clear labeling", "Sponsored content appearing as regular posts", "Interactive elements disguised as content"]
                },
                {
                    name: "Hidden Costs",
                    description: "Concealed fees revealed late in transactions",
                    examples: ["Last-minute mandatory fees", "Charges revealed after user investment", "Unclear pricing structures"]
                },
                {
                    name: "Bait and Switch",
                    description: "Offering something appealing but delivering another",
                    examples: ["False discount advertising", "Product substitution", "Misrepresented features"]
                },
                {
                    name: "Roach Motel",
                    description: "Easy entry, difficult exit from commitments",
                    examples: ["Complex cancellation processes", "Hidden account deletion options", "Multi-step unsubscribe flows"]
                },
                {
                    name: "Forced Continuity",
                    description: "Unclear automatic subscription renewals",
                    examples: ["Auto-renewal without clear notice", "Difficult cancellation before trial end", "Obscured renewal terms"]
                },
                {
                    name: "False Hierarchy",
                    description: "Misleading prominence given to less beneficial choices",
                    examples: ["Premium options visually emphasized", "Beneficial options de-emphasized", "Manipulative visual hierarchies"]
                },
                {
                    name: "Trick Questions",
                    description: "Misleading questions causing unintended choices",
                    examples: ["Double negatives in confirmations", "Confusing option phrasing", "Misdirective questioning"]
                }
            ],
            financialPatterns: [
                {
                    name: "Deceptive Comparison",
                    description: "Presenting financial product comparisons in a misleading way",
                    examples: ["Cherry-picked time periods for returns", "Omitting important comparison criteria", "Comparing dissimilar financial products"]
                },
                {
                    name: "Fine Print Overload",
                    description: "Burying important financial terms in excessive text",
                    examples: ["Lengthy terms and conditions", "Important fee information in densely packed text", "Key restrictions in tiny footnotes"]
                },
                {
                    name: "Scarcity Framing",
                    description: "Creating false impressions of limited availability for financial products",
                    examples: ["Limited-time offers that aren't actually limited", "Countdown timers on investment opportunities", "Artificial limits on financial service availability"]
                },
                {
                    name: "Cross-selling Pressure",
                    description: "Using aggressive techniques to push additional financial products",
                    examples: ["Required navigation through upsell screens", "Persistent account upgrade prompts", "Pre-selected add-on financial services"]
                },
                {
                    name: "Identity-Based Manipulation",
                    description: "Using identity or status to pressure financial decisions",
                    examples: ["'Exclusive' investment opportunities", "Status-based account tiers with subtle pressure to upgrade", "Flattery to encourage larger investments"]
                }
            ],
            attributeFramework: [
                {
                    attribute: "Asymmetry",
                    description: "Imbalance in burden between different user choices",
                    examples: ["Easy to subscribe but difficult to unsubscribe", "Simple to accept but complex to decline", "Single-click purchase but multi-step returns"]
                },
                {
                    attribute: "Restriction",
                    description: "Elimination or obscuring of choices",
                    examples: ["Hidden opt-out options", "Limited user control paths", "Constrained choice architecture"]
                },
                {
                    attribute: "Information Hidden",
                    description: "Deliberately concealed or obscured information",
                    examples: ["Small print disclosure", "Buried terms and conditions", "Hidden fees or commitments"]
                },
                {
                    attribute: "Covert Influence",
                    description: "Hidden manipulation mechanisms",
                    examples: ["Artificial time constraints", "Fake social proof", "Manufactured scarcity"]
                },
                {
                    attribute: "Deception",
                    description: "Affirmatively misleading content or important omissions",
                    examples: ["False claims", "Misrepresented statistics", "Misleading visuals or wording"]
                },
                {
                    attribute: "Disparate Treatment",
                    description: "Differential treatment among user groups",
                    examples: ["Price discrimination", "Feature gating", "Inconsistent UI based on user profiling"]
                },
                {
                    attribute: "Complexity",
                    description: "Unnecessary cognitive load placed on the user",
                    examples: ["Convoluted processes", "Excessive options", "Complex language or structures"]
                }
            ],
            financialRegulations: [
                {
                    name: "Regulation Best Interest (Reg BI)",
                    description: "Requires broker-dealers to act in the best interest of retail customers",
                    relevance: "Prohibits interfaces that prioritize firm interests over client interests"
                },
                {
                    name: "Truth in Lending Act (TILA)",
                    description: "Requires clear disclosure of loan terms and costs",
                    relevance: "Prohibits hidden fees or misleading presentation of loan terms"
                },
                {
                    name: "Consumer Financial Protection Bureau (CFPB) Guidelines",
                    description: "Protects consumers from unfair, deceptive, or abusive acts and practices",
                    relevance: "Addresses dark patterns in financial service interfaces"
                },
                {
                    name: "FINRA Rules",
                    description: "Governs broker-dealers and investment communications",
                    relevance: "Requires fair and balanced presentation of investment information"
                },
                {
                    name: "SEC Regulation",
                    description: "Regulates securities markets and protects investors",
                    relevance: "Prohibits misleading communications about investments"
                }
            ]
        },
        
        // Usability Heuristics Data
        usabilityHeuristicsData: {
            heuristicTypes: {
                highLevel: [
                    {
                        name: "Transparency and Feedback",
                        description: "Design principles that keep users informed about what is happening in the system",
                        examples: [
                            "Visibility of system status",
                            "Help users recognize, diagnose, and recover from errors",
                            "Clear feedback loops"
                        ]
                    },
                    {
                        name: "User Autonomy and Control",
                        description: "Principles that give users freedom to navigate, control their experience, and recover from mistakes",
                        examples: [
                            "User control and freedom",
                            "Flexibility and efficiency of use",
                            "Customization options"
                        ]
                    }
                ],
                mesoLevel: [
                    {
                        name: "Visibility of system status",
                        description: "The system should always keep users informed about what is going on, through appropriate feedback within reasonable time",
                        examples: [
                            "Progress indicators",
                            "Status messages",
                            "Visual feedback for actions"
                        ]
                    },
                    {
                        name: "Match between system and the real world",
                        description: "The system should speak the users' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms",
                        examples: [
                            "Natural language",
                            "Familiar metaphors",
                            "Logical information flow"
                        ]
                    }
                ],
                nielsenHeuristics: [
                    {
                        name: "Visibility of system status",
                        description: "The system should always keep users informed about what is going on, through appropriate feedback within reasonable time",
                        examples: ["Progress indicators", "Loading animations", "Confirmation messages", "Status updates"]
                    },
                    {
                        name: "Match between system and the real world",
                        description: "The system should speak the users' language, with words, phrases and concepts familiar to the user rather than system-oriented terms",
                        examples: ["Familiar metaphors", "Natural language", "Real-world conventions", "Logical information flow"]
                    },
                    {
                        name: "User control and freedom",
                        description: "Users often choose system functions by mistake and will need a clearly marked 'emergency exit' to leave the unwanted state",
                        examples: ["Undo/redo functionality", "Cancel operations", "Easy navigation back", "Clear exit points"]
                    },
                    {
                        name: "Consistency and standards",
                        description: "Users should not have to wonder whether different words, situations, or actions mean the same thing",
                        examples: ["Platform conventions", "Consistent terminology", "Standardized interactions", "Uniform design patterns"]
                    },
                    {
                        name: "Error prevention",
                        description: "Even better than good error messages is a careful design which prevents a problem from occurring in the first place",
                        examples: ["Confirmation dialogues", "Input validation", "Forgiving formats", "Clear constraints"]
                    },
                    {
                        name: "Recognition rather than recall",
                        description: "Minimize the user's memory load by making objects, actions, and options visible",
                        examples: ["Visible options", "Suggestions", "Contextual tools", "Clear navigation paths"]
                    },
                    {
                        name: "Flexibility and efficiency of use",
                        description: "Accelerators — unseen by the novice user — may often speed up the interaction for the expert user",
                        examples: ["Keyboard shortcuts", "Customization", "Saved preferences", "Expert features"]
                    },
                    {
                        name: "Aesthetic and minimalist design",
                        description: "Dialogues should not contain information which is irrelevant or rarely needed",
                        examples: ["Focused content", "Visual hierarchy", "Information prioritization", "Clean layouts"]
                    },
                    {
                        name: "Help users recognize, diagnose, and recover from errors",
                        description: "Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution",
                        examples: ["Clear error messages", "Solution suggestions", "Recovery instructions", "Actionable guidance"]
                    },
                    {
                        name: "Help and documentation",
                        description: "Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation",
                        examples: ["Contextual help", "Searchable documentation", "Tutorials", "Task-oriented guidance"]
                    }
                ],
                financialHeuristics: [
                    {
                        name: "Financial clarity",
                        description: "Financial information should be presented clearly without jargon or unnecessary complexity",
                        examples: ["Plain language fee descriptions", "Clear interest rate presentation", "Transparent pricing structures"]
                    },
                    {
                        name: "Risk transparency",
                        description: "Risk information should be as prominent as potential benefits or returns",
                        examples: ["Balanced risk/reward presentation", "Clear risk indicators", "Contextual risk explanations"]
                    },
                    {
                        name: "Decision support",
                        description: "Interfaces should support informed financial decision-making without bias",
                        examples: ["Comparison tools", "Scenario calculators", "Education resources", "Decision checklists"]
                    },
                    {
                        name: "Control over financial commitments",
                        description: "Users should maintain clear control over their financial commitments and obligations",
                        examples: ["Clear subscription management", "Easy payment controls", "Transparent recurring payment information"]
                    },
                    {
                        name: "Financial privacy and security",
                        description: "Financial interfaces should prioritize user privacy and data security",
                        examples: ["Clear data usage policies", "Strong authentication options", "Secure transaction indicators"]
                    }
                ]
            },
            commonViolations: {
                major: [
                    {
                        heuristic: "Visibility of system status",
                        description: "Users aren't informed about what's happening",
                        examples: [
                            "Missing progress indicators",
                            "No confirmation after form submission",
                            "Unclear system state during processing"
                        ]
                    },
                    {
                        heuristic: "Match between system and real world",
                        description: "System doesn't align with users' mental models",
                        examples: [
                            "Technical jargon instead of user language",
                            "Unintuitive metaphors",
                            "Information flow that contradicts expectations"
                        ]
                    }
                ],
                minor: [
                    {
                        heuristic: "Consistency and standards",
                        description: "Interface elements behave differently across the system",
                        examples: [
                            "Inconsistent typography",
                            "Button styles that vary across pages",
                            "Navigation that changes location"
                        ]
                    }
                ],
                financial: [
                    {
                        heuristic: "Financial clarity",
                        description: "Financial information is presented in a complex or confusing manner",
                        examples: [
                            "Technical financial terminology without explanation",
                            "Complex fee structures without clear summaries",
                            "Buried important financial details"
                        ]
                    },
                    {
                        heuristic: "Risk transparency",
                        description: "Risk information is downplayed or difficult to understand",
                        examples: [
                            "Risk disclaimers in small print",
                            "Benefits emphasized visually over risks",
                            "Risk information requiring additional clicks to access"
                        ]
                    },
                    {
                        heuristic: "Decision support",
                        description: "Insufficient tools to support informed financial decisions",
                        examples: [
                            "Missing comparison features",
                            "Lack of calculators for different scenarios",
                            "No educational context for complex products"
                        ]
                    }
                ]
            },
            severityRating: [
                {
                    level: 1,
                    name: "Cosmetic",
                    description: "Minor issue that will not affect usability significantly",
                    impact: "Can be fixed if extra time is available",
                    examples: ["Visual inconsistencies", "Minor aesthetic issues", "Stylistic concerns"]
                },
                {
                    level: 2,
                    name: "Minor",
                    description: "May cause confusion or slight delay for users",
                    impact: "Low priority, small impact on usability",
                    examples: ["Unclear labels", "Slightly confusing interactions", "Non-optimal task flows"]
                },
                {
                    level: 3,
                    name: "Major",
                    description: "Will significantly impair task completion for some users",
                    impact: "High priority, significant impact on usability",
                    examples: ["Difficult navigation", "Confusing functionality", "Process breakdowns"]
                },
                {
                    level: 4,
                    name: "Critical",
                    description: "Prevents task completion or causes severe user errors",
                    impact: "Must be fixed before release",
                    examples: ["Form submission failures", "Dead-end paths", "Functionality that doesn't work"]
                }
            ]
        },
        
        /**
         * Initialize the knowledge base
         */
        initialize: function() {
            utils.log("Initializing Research Knowledge Base...");
            
            // Register with the bookmarklet loader if available
            if (window.KnowledgeBaseLoader) {
                window.KnowledgeBaseLoader.registerBase(
                    "researchKB", 
                    "Research Best Practices",
                    "kb-research-core.js",
                    "kbResearch"
                );
            }
            
            // Pre-populate the loadedFeatures with our embedded data
            this.loadedFeatures.darkPatterns = {
                title: "Dark and Deceptive Patterns",
                name: "Dark Patterns Knowledge Base",
                taxonomy: this.darkPatternData.patternTypes,
                patterns: {
                    common: this.darkPatternData.commonPatterns,
                    financial: this.darkPatternData.financialPatterns
                },
                attributes: this.darkPatternData.attributeFramework,
                regulations: this.darkPatternData.financialRegulations,
                personas: {
                    professionalCategories: this.professionalCategories.darkPatterns,
                    examples: this.personas.filter(p => this.professionalCategories.darkPatterns.includes(p.category))
                        .flatMap(p => p.examples.map(e => ({ ...e, category: p.category }))),
                    userStories: this.features.darkPatterns.userStories
                },
                llmInstructions: this.generateDarkPatternsInstructions(),
                userInstructions: this.generateDarkPatternsUserInstructions()
            };
            
            this.loadedFeatures.usabilityHeuristics = {
                title: "Usability Heuristics Evaluation",
                name: "Usability Heuristics Knowledge Base",
                heuristics: this.usabilityHeuristicsData.heuristicTypes,
                violations: this.usabilityHeuristicsData.commonViolations,
                severityRating: this.usabilityHeuristicsData.severityRating,
                personas: {
                    professionalCategories: this.professionalCategories.usabilityHeuristics,
                    examples: this.personas.filter(p => this.professionalCategories.usabilityHeuristics.includes(p.category))
                        .flatMap(p => p.examples.map(e => ({ ...e, category: p.category }))),
                    userStories: this.features.usabilityHeuristics.userStories
                },
                llmInstructions: this.generateUsabilityHeuristicsInstructions(),
                userInstructions: this.generateUsabilityHeuristicsUserInstructions()
            };
            
            utils.log("Research Knowledge Base initialized successfully with embedded feature data");
        },

        /**
         * Load a specific feature's data
         * @param {string} featureId - The feature identifier
         * @returns {Promise<Object>} - The loaded feature data
         */
        loadFeature: async function(featureId) {
            if (this.loadedFeatures[featureId]) {
                utils.log(`Using cached data for ${featureId}`);
                return this.loadedFeatures[featureId];
            }

            const url = this.featureUrls[featureId];
            if (!url) {
                throw new Error(`Unknown feature: ${featureId}`);
            }

            utils.log(`Loading feature data for ${featureId}...`);
            try {
                const featureData = await utils.loadJSON(url);
                this.loadedFeatures[featureId] = featureData;
                
                // Register the feature in the features object if not already present
                if (!this.features[featureId]) {
                    this.features[featureId] = {
                        title: featureData.title || featureData.name || featureId
                    };
                }
                
                utils.log(`Successfully loaded ${featureId} data`);
                return featureData;
            } catch (error) {
                utils.log(`Failed to load feature ${featureId}: ${error.message}`, 'error');
                throw error;
            }
        },

        /**
         * Generate a prompt for a specific feature
         * @param {string} featureId - The feature to generate a prompt for
         * @returns {string} - The generated prompt
         */
        generatePrompt: async function(featureId) {
            try {
                // Ensure the feature data is available
                if (!this.loadedFeatures[featureId]) {
                    if (this.features[featureId]) {
                        // Try to load from embedded data
                        this.loadedFeatures[featureId] = await this.loadFeature(featureId);
                    } else {
                        return `Error: Unknown feature "${featureId}"`;
                    }
                }
                
                const featureData = this.loadedFeatures[featureId];
                
                // Choose the appropriate generator based on feature ID
                switch (featureId) {
                    case 'darkPatterns':
                        return this.generateDarkPatternsPrompt(featureData);
                    case 'usabilityHeuristics':
                        return this.generateUsabilityHeuristicsPrompt(featureData);
                    default:
                        return this.generateFeaturePrompt(featureData);
                }
            } catch (error) {
                return `Error generating prompt: ${error.message}`;
            }
        },

        /**
         * Generic prompt generator that uses data from the JSON file
         * @param {Object} data - The feature data
         * @returns {string} - The generated prompt
         */
        generateFeaturePrompt: function(data) {
            let prompt = `# ${data.title || data.name} Knowledge Base\n\n`;
            
            // Add knowledge base section
            if (data.knowledgeBase) {
                prompt += `## Knowledge Base\n${data.knowledgeBase}\n\n`;
            } else {
                // Fall back to generic formatting of data sections
                prompt += this.formatGenericKnowledgeBase(data);
            }
            
            // Add LLM instructions if present
            if (data.llmInstructions) {
                prompt += `## LLM Instructions\n${data.llmInstructions}\n\n`;
            }
            
            // Add user interaction instructions if present
            if (data.userInstructions) {
                prompt += `## User Interaction Instructions\n${data.userInstructions}\n\n`;
            }
            
            return prompt;
        },
        
        /**
         * Generate a prompt for dark patterns
         * @param {Object} data - The dark patterns data
         * @returns {string} - The generated prompt
         */
        generateDarkPatternsPrompt: function(data) {
            var output = "# Dark Patterns Knowledge Base\n\n";
            
            // Knowledge Base section
            output += "## Knowledge Base\n";
            output += "### Pattern Taxonomy\n";
            
            // High-Level Manipulation Strategies
            output += "**High-Level Manipulation Strategies:**\n";
            this.darkPatternData.patternTypes.highLevel.forEach(function(pattern) {
                output += "- **" + pattern.name + "**: " + pattern.description + " (" + pattern.examples.join(", ") + ")\n";
            });
            
            // Add Obstruction and Emotional Manipulation from meso-level
            this.darkPatternData.patternTypes.mesoLevel.forEach(function(pattern) {
                output += "- **" + pattern.name + "**: " + pattern.description + " (" + pattern.examples.join(", ") + ")\n";
            });
            
            // Add Financial-specific patterns
            output += "\n**Financial-Specific Dark Patterns:**\n";
            this.darkPatternData.patternTypes.financialSpecific.forEach(function(pattern) {
                output += "- **" + pattern.name + "**: " + pattern.description + " (" + pattern.examples.join(", ") + ")\n";
            });
            
            // Common Dark Patterns
            output += "\n**Common Dark Patterns:**\n";
            this.darkPatternData.commonPatterns.forEach(function(pattern, index) {
                if (index < 7) { // Limit to 7 patterns to keep it manageable
                    output += "- **" + pattern.name + "**: " + pattern.description + "\n  - Examples: " + pattern.examples.join(", ") + "\n";
                }
            });
            
            // Financial-specific dark patterns
            output += "\n**Financial Industry Dark Patterns:**\n";
            this.darkPatternData.financialPatterns.forEach(function(pattern) {
                output += "- **" + pattern.name + "**: " + pattern.description + "\n  - Examples: " + pattern.examples.join(", ") + "\n";
            });
            
            // Attribute Framework
            output += "\n**Measurable Attributes for Evaluation:**\n";
            this.darkPatternData.attributeFramework.forEach(function(attribute) {
                output += "- **" + attribute.attribute + "**: " + attribute.description + "\n";
            });
            
            // Financial regulations
            output += "\n**Relevant Financial Regulations:**\n";
            this.darkPatternData.financialRegulations.forEach(function(regulation) {
                output += "- **" + regulation.name + "**: " + regulation.description + "\n  - Relevance: " + regulation.relevance + "\n";
            });
            
            // Add relevant personas
            output += "\n**Professional Perspectives:**\n";
            const relevantPersonas = this.personas
                .filter(p => this.professionalCategories.darkPatterns.includes(p.category))
                .slice(0, 3); // Limit to 3 personas
                
            relevantPersonas.forEach(function(personaGroup) {
                output += "- **" + personaGroup.category + "**: ";
                const example = personaGroup.examples[0];
                output += example.name + " (" + example.context + ") - " + example.description.split('.')[0] + "\n";
            });
            
            // LLM Instructions section
            output += "\n## LLM Instructions\n";
            output += data.llmInstructions || this.generateDarkPatternsInstructions();
            
            // User Interaction Instructions section
            output += "\n## User Interaction Instructions\n";
            output += data.userInstructions || this.generateDarkPatternsUserInstructions();
            
            return output;
        },
        
        /**
         * Generate standard instructions for dark patterns analysis
         * @returns {string} Instructions for LLMs
         */
        generateDarkPatternsInstructions: function() {
            return "You are an expert-level dark pattern analyst with advanced knowledge in digital ethics, user experience, and regulatory compliance, particularly in financial services. Analyze interfaces methodically and provide detailed, evidence-based evaluations.\n\n" +
            "### Context-Aware Analysis Logic\n" +
            "Before beginning your analysis, determine the appropriate context:\n\n" +
            "1. **Identify the domain:**\n" +
            "   - If analyzing a financial interface (banking, investment, loans, etc.), use both common and financial-specific patterns and regulations\n" +
            "   - If analyzing a non-financial interface, focus primarily on common patterns\n\n" +
            "2. **Consider the audience perspective:**\n" +
            "   - Reference the personas section to adopt the appropriate analytical lens based on who would be evaluating this interface\n" +
            "   - For regulatory concerns: adopt perspectives of Financial Regulators\n" +
            "   - For UX audit perspectives: consider UX Auditors' approach\n" +
            "   - For ethical design alternatives: think like Banking UX Specialists\n\n" +
            "3. **Match patterns to taxonomy levels:**\n" +
            "   - High-level patterns: Identify the broad manipulation strategy\n" +
            "   - Meso-level patterns: Determine the specific implementation approach\n" +
            "   - Low-level patterns: Document the exact interface elements involved\n\n" +
            "### Step-by-Step Analysis Process\n" +
            "1. **Screen Identification**: Clearly identify the specific interface element or user flow under review\n" +
            "2. **Issue Detection**: Identify potential dark patterns, focusing on manipulative design elements\n" +
            "3. **Pattern Classification**: Categorize each detected pattern using the appropriate taxonomy level\n" +
            "4. **Location Specification**: Precisely document where each pattern occurs within the interface\n" +
            "5. **Impact Assessment**: Explain how each pattern affects user decision-making and autonomy\n" +
            "6. **User Impact Analysis**: Discuss potential negative consequences for different user groups\n" +
            "7. **Attribute Mapping**: Connect each pattern to the measurable attributes it demonstrates\n" +
            "8. **Regulatory Analysis**: For financial interfaces, evaluate against relevant regulations\n" +
            "9. **Design Recommendations**: Provide specific, actionable alternatives that maintain business goals ethically\n" +
            "10. **Legal Considerations**: Assess potential regulatory compliance issues\n" +
            "11. **Additional Observations**: Note contextual factors or other relevant considerations\n\n" +
            "### Evaluation Format\n" +
            "For each identified pattern, structure your response as follows:\n" +
            "```\n" +
            "PATTERN NAME: [Identified Pattern]\n" +
            "CATEGORY: [Taxonomy Classification - High/Meso Level]\n" +
            "LOCATION: [Specific UI Element/Screen]\n" +
            "ATTRIBUTES: [Relevant Measurable Attributes]\n" +
            "USER IMPACT: [Detailed Explanation of Effect on Users]\n" +
            "LEGAL CONSIDERATIONS: [Potential Regulatory Issues]\n" +
            "RECOMMENDATIONS: [Specific, Actionable Improvements]\n" +
            "```\n\n" +
            "### Severity Rating\n" +
            "Assign a severity rating to each identified pattern:\n" +
            "1. **Low**: Minor influence on user decisions with minimal potential harm\n" +
            "2. **Medium**: Moderate manipulation that may lead to unintended user choices\n" +
            "3. **High**: Significant manipulation likely to result in decisions against user interests\n" +
            "4. **Critical**: Severely deceptive pattern with high potential for financial or other harm";
        },
        
        /**
         * Generate user instructions for dark patterns analysis
         * @returns {string} Instructions for users
         */
        generateDarkPatternsUserInstructions: function() {
            return "To get the most effective dark pattern analysis:\n\n" +
            "### Submitting Interfaces for Review\n" +
            "- Upload screenshots or provide detailed descriptions of the interface\n" +
            "- Specify the complete user journey or flow when possible\n" +
            "- Indicate any specific concerns or patterns you suspect\n" +
            "- Mention the target audience or user group if relevant\n" +
            "- For financial interfaces, note applicable regulations or specific financial products involved\n" +
            "- Specify which professional perspective you'd like applied (e.g., regulator, UX designer, compliance officer)\n\n" +
            "### Example Queries\n" +
            "- \"Are there any dark patterns in this investment platform's account creation flow?\"\n" +
            "- \"How might this banking app's subscription service manipulate user decision-making?\"\n" +
            "- \"What legal risks exist in this loan application interface?\"\n" +
            "- \"What ethical alternatives could replace this fee disclosure approach?\"\n" +
            "- \"How does this trading platform's risk presentation compare to ethical design standards?\"\n" +
            "- \"Does this credit card application contain manipulative patterns?\"\n" +
            "- \"Analyze this interface from a financial regulator's perspective\"\n" +
            "- \"Evaluate this checkout flow considering implications for elderly users\"\n\n" +
            "### Follow-up Options\n" +
            "- Request more detailed analysis of specific elements\n" +
            "- Ask for practical implementation strategies for recommendations\n" +
            "- Request comparative analysis with industry best practices\n" +
            "- Ask about specific regulatory concerns for particular financial products\n" +
            "- Inquire about compliance with financial regulations\n" +
            "- Request analysis from a different persona perspective\n" +
            "- Ask for severity rankings of identified patterns";
        },
        
        /**
         * Generate a prompt for usability heuristics
         * @returns {string} - The generated prompt
         */
        generateUsabilityHeuristicsPrompt: function(data) {
            var output = "# Usability Heuristics Knowledge Base\n\n";
            
            // Knowledge Base section
            output += "## Knowledge Base\n";
            output += "### Core Heuristic Principles\n";
            output += "**Nielsen's 10 Usability Heuristics:**\n";
            
            // Add all Nielsen heuristics
            this.usabilityHeuristicsData.heuristicTypes.nielsenHeuristics.forEach(function(heuristic, index) {
                output += (index + 1) + ". **" + heuristic.name + "**: " + heuristic.description + "\n";
            });
            
            // Add financial-specific heuristics
            output += "\n**Financial Interface Heuristics:**\n";
            this.usabilityHeuristicsData.heuristicTypes.financialHeuristics.forEach(function(heuristic, index) {
                output += "- **" + heuristic.name + "**: " + heuristic.description + "\n";
            });
            
            // Add severity rating scale
            output += "\n**Severity Rating Scale:**\n";
            this.usabilityHeuristicsData.severityRating.forEach(function(severity) {
                output += "- **" + severity.level + " - " + severity.name + "**: " + severity.description + "\n";
            });
            
            // Common violations
            output += "\n**Common Usability Violations:**\n";
            output += "General violations:\n";
            this.usabilityHeuristicsData.commonViolations.major.forEach(function(violation) {
                output += "- " + violation.heuristic + ": " + violation.description + "\n  - Examples: " + violation.examples.join(", ") + "\n";
            });
            
            output += "\nFinancial interface violations:\n";
            this.usabilityHeuristicsData.commonViolations.financial.forEach(function(violation) {
                output += "- " + violation.heuristic + ": " + violation.description + "\n  - Examples: " + violation.examples.join(", ") + "\n";
            });
            
            // Add relevant personas
            output += "\n**Professional Perspectives:**\n";
            const relevantPersonas = this.personas
                .filter(p => this.professionalCategories.usabilityHeuristics.includes(p.category))
                .slice(0, 3); // Limit to 3 personas
                
            relevantPersonas.forEach(function(personaGroup) {
                output += "- **" + personaGroup.category + "**: ";
                const example = personaGroup.examples[0];
                output += example.name + " (" + example.context + ") - " + example.description.split('.')[0] + "\n";
            });
            
            // LLM Instructions section
            output += "\n## LLM Instructions\n";
            output += data.llmInstructions || this.generateUsabilityHeuristicsInstructions();
            
            // User Interaction Instructions section
            output += "\n## User Interaction Instructions\n";
            output += data.userInstructions || this.generateUsabilityHeuristicsUserInstructions();
            
            return output;
        },
        
        /**
         * Generate standard instructions for usability heuristic evaluation
         * @returns {string} Instructions for LLMs
         */
        generateUsabilityHeuristicsInstructions: function() {
            return "You are an expert usability analyst specializing in heuristic evaluation. Your role is to identify, classify, and provide actionable recommendations for usability issues in interfaces based on established heuristic principles.\n\n" +
            "### Context-Aware Evaluation Logic\n" +
            "Before beginning your analysis, determine the appropriate context:\n\n" +
            "1. **Identify the domain:**\n" +
            "   - If analyzing a financial interface, include relevant financial heuristics\n" +
            "   - For general interfaces, focus on Nielsen's core heuristics\n\n" +
            "2. **Consider the audience perspective:**\n" +
            "   - For detailed technical evaluations, adopt the perspective of Usability Specialists\n" +
            "   - For design-focused evaluations, consider UX Designers' approach\n" +
            "   - For product improvement evaluations, think like Product Managers\n\n" +
            "### Step-by-Step Evaluation Process\n" +
            "1. **Interface Overview**: Briefly describe the interface under evaluation\n" +
            "2. **Systematic Review**: Methodically analyze the interface against each relevant heuristic\n" +
            "3. **Issue Identification**: Document specific usability issues found in the interface\n" +
            "4. **Heuristic Classification**: Connect each issue to the specific violated heuristic(s)\n" +
            "5. **Severity Rating**: Assign a severity rating (1-4) based on impact and frequency\n" +
            "6. **Justification**: Explain why each issue violates the associated heuristic\n" +
            "7. **Recommendations**: Provide specific, actionable suggestions to resolve each issue\n" +
            "8. **Prioritization**: Rank issues based on severity and implementation effort\n" +
            "9. **Positive Aspects**: Note elements that effectively follow heuristic principles\n\n" +
            "### Evaluation Format\n" +
            "For each identified issue, structure your response as follows:\n" +
            "```\n" +
            "ISSUE: [Brief Description]\n" +
            "HEURISTIC: [Violated Principle]\n" +
            "SEVERITY: [Rating/4] - [Justification]\n" +
            "LOCATION: [Specific UI Element/Screen]\n" +
            "PROBLEM: [Detailed Explanation]\n" +
            "RECOMMENDATION: [Specific Improvement]\n" +
            "```";
        },
        
        /**
         * Generate user instructions for usability heuristic evaluation
         * @returns {string} Instructions for users
         */
        generateUsabilityHeuristicsUserInstructions: function() {
            return "To get the most effective usability evaluation:\n\n" +
            "### Submitting Interfaces for Review\n" +
            "- Upload screenshots, mockups, or provide detailed descriptions\n" +
            "- Specify the user task or journey being evaluated\n" +
            "- Indicate any specific usability concerns\n" +
            "- Mention the target users or usage context if relevant\n" +
            "- For financial interfaces, note specific regulatory considerations or user accessibility needs\n" +
            "- Specify which professional perspective you'd like applied (e.g., usability specialist, UX designer)\n\n" +
            "### Example Queries\n" +
            "- \"What usability heuristics are violated in this banking login interface?\"\n" +
            "- \"How severe are the usability issues in this investment dashboard?\"\n" +
            "- \"What recommendations would improve this loan application process?\"\n" +
            "- \"How well does this trading platform support recognition rather than recall?\"\n" +
            "- \"What error prevention issues exist in this payment form?\"\n" +
            "- \"How clear is the fee disclosure in this subscription service?\"\n" +
            "- \"Analyze this interface from an expert usability specialist's perspective\"\n" +
            "- \"Evaluate this form for elderly users with limited tech experience\"\n\n" +
            "### Follow-up Options\n" +
            "- Request detailed analysis of specific interface elements\n" +
            "- Ask for prioritized implementation recommendations\n" +
            "- Request pattern analysis across multiple screens\n" +
            "- Ask about industry-specific best practices\n" +
            "- Request before-and-after comparisons of recommended changes\n" +
            "- Inquire about regulatory compliance impacts of usability issues\n" +
            "- Request analysis from a different professional perspective";
        },
        
        /**
         * Generic fallback formatter for knowledge base data
         * @param {Object} data - The feature data
         * @returns {string} - Formatted knowledge base section
         */
        formatGenericKnowledgeBase: function(data) {
            let result = '';
            
            // Iterate through data properties and format them
            for (const [key, value] of Object.entries(data)) {
                // Skip non-data properties
                if (['title', 'name', 'llmInstructions', 'userInstructions'].includes(key)) {
                    continue;
                }
                
                // Format the section based on data type
                if (typeof value === 'object' && value !== null) {
                    const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);
                    result += `### ${sectionTitle}\n`;
                    
                    if (Array.isArray(value)) {
                        // Format array items
                        value.forEach((item, index) => {
                            if (typeof item === 'object') {
                                const itemName = item.name || `Item ${index + 1}`;
                                result += `- **${itemName}**: `;
                                
                                if (item.description) {
                                    result += `${item.description}\n`;
                                } else {
                                    result += this.formatObjectProperties(item) + '\n';
                                }
                            } else {
                                result += `- ${item}\n`;
                            }
                        });
                    } else {
                        // Format nested objects
                        for (const [subKey, subValue] of Object.entries(value)) {
                            const subSectionTitle = subKey.charAt(0).toUpperCase() + subKey.slice(1);
                            result += `#### ${subSectionTitle}\n`;
                            
                            if (Array.isArray(subValue)) {
                                subValue.forEach((item, index) => {
                                    if (typeof item === 'object') {
                                        const itemName = item.name || `Item ${index + 1}`;
                                        result += `- **${itemName}**: `;
                                        
                                        if (item.description) {
                                            result += `${item.description}\n`;
                                        } else {
                                            result += this.formatObjectProperties(item) + '\n';
                                        }
                                    } else {
                                        result += `- ${item}\n`;
                                    }
                                });
                            } else if (typeof subValue === 'object') {
                                result += this.formatObjectProperties(subValue) + '\n';
                            } else {
                                result += `${subValue}\n`;
                            }
                            
                            result += '\n';
                        }
                    }
                    
                    result += '\n';
                }
            }
            
            return result;
        },
        
        /**
         * Format object properties for display
         * @param {Object} obj - Object to format
         * @returns {string} - Formatted string
         */
        formatObjectProperties: function(obj) {
            if (!obj || typeof obj !== 'object') return '';
            
            return Object.entries(obj)
                .filter(([key]) => key !== 'name') // Skip name as it's already used
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return `${key}: ${value.join(', ')}`;
                    } else if (typeof value === 'object' && value !== null) {
                        return `${key}: ${JSON.stringify(value)}`;
                    } else {
                        return `${key}: ${value}`;
                    }
                })
                .join('; ');
        }
    };

    // Initialize the knowledge base
    kbResearch.initialize();
    
    // Expose to global scope - this is what the bookmarklet framework expects
    window.kbResearch = kbResearch;
})();