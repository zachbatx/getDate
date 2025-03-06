{
  "name": "Accessibility Guidelines",
  "features": {
    "navigation": {
      "title": "Navigation and Menus",
      "considerations": [
        "Provide keyboard navigation for all menu items",
        "Ensure consistent and predictable navigation",
        "Provide visible focus indicators",
        "Use proper heading structure",
        "Include 'skip to content' links",
        "Ensure screen reader accessibility",
        "Navigation should be usable at 200% zoom"
      ],
      "wcagGuidelines": ["2.1.1", "2.4.1", "2.4.3", "2.4.5", "2.4.7", "3.2.3"],
      "userStories": [
        "A person with motor disabilities navigates using keyboard only",
        "A screen reader user needs to understand site structure",
        "A user with low vision needs to identify navigation elements"
      ]
    },
    "forms": {
      "title": "Forms and Input Fields",
      "considerations": [
        "Provide clear labels for all form controls",
        "Group related form elements logically",
        "Provide helpful error messages",
        "Ensure keyboard accessibility",
        "Support autocomplete when appropriate",
        "Allow sufficient time for form completion",
        "Provide contextual help"
      ],
      "wcagGuidelines": ["1.3.1", "2.2.1", "2.4.6", "3.3.1", "3.3.2", "3.3.3", "4.1.2"],
      "userStories": [
        "A screen reader user needs to understand form labels",
        "A person with cognitive disabilities needs clear error feedback",
        "A user with tremors needs large click targets"
      ]
    },
    /* Add other features as needed */
  },
  "disabilityCategories": {
    "navigation": ["Vision impairment", "Motor impairment", "Cognitive impairment"],
    "forms": ["Vision impairment", "Motor impairment", "Cognitive impairment"],
    /* Add other categories as needed */
  },
  "personas": [
    {
      "category": "Vision impairment",
      "examples": [
        {
          "name": "Maria",
          "age": 65,
          "disability": "Low vision",
          "tools": "Screen magnifier, high contrast settings",
          "challenges": "Small text, poor contrast, complex layouts",
          "description": "Maria is a retired teacher with age-related macular degeneration. She uses screen magnification software and relies on high contrast modes. She struggles with websites that don't maintain readability when zoomed to 200%."
        },
        /* Add other examples as needed */
      ]
    }
  ]
}
