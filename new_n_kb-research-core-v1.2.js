/**
 * Research Knowledge Base Core
 * This file provides the core functionality for loading and processing research-related
 * knowledge bases such as Dark Patterns and Usability Heuristics.
 */

const kbResearchModule = () => {
  const utils = {
    log: function(message, type = 'info') {
      const prefix = '[KB Research]';
      if (type === 'error') {
        console.error(`${prefix} ${message}`);
      } else {
        console.log(`${prefix} ${message}`);
      }
    }
  };

  const knowledgeBaseConfig = [
    {
      id: 'darkPatterns',
      title: 'Dark Patterns',
      scriptPath: './n_dark-patterns.js',
      globalVarName: 'darkPatternsData'
    },
    {
      id: 'usabilityHeuristics',
      title: 'Usability Heuristics',
      scriptPath: './n_usability-heuristics.js',
      globalVarName: 'usabilityHeuristicsData'
    }
  ];

  const kbResearch = {
    name: "Research Best Practices",
    features: {},
    loadedFeatures: {},
    initialize: async function() {
      utils.log("Initializing Research Knowledge Base...");
      await this._loadKnowledgeBases();
      utils.log("Research Knowledge Base initialized successfully");
    },
    _loadKnowledgeBases: async function() {
      const totalFeatures = knowledgeBaseConfig.length;
      let loadedCount = 0;
      if (totalFeatures === 0) {
        utils.log("No knowledge bases configured", "error");
        return;
      }
      await Promise.all(knowledgeBaseConfig.map(async feature => {
        try {
          await this._loadFeature(feature);
          loadedCount++;
          utils.log(`Loaded ${loadedCount}/${totalFeatures} knowledge bases`);
        } catch (error) {
          utils.log(`Failed to load ${feature.title || feature.id}: ${error}`, "error");
        }
      }));
    },
    _loadFeature: function(feature) {
      return new Promise((resolve, reject) => {
        utils.log(`Loading ${feature.title || feature.id}...`);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = feature.scriptPath;
        script.onload = () => {
          const featureData = window[feature.globalVarName];
          if (featureData) {
            this.loadedFeatures[feature.id] = featureData;
            this.features[feature.id] = {
              title: featureData.title || feature.title || feature.id
            };
            utils.log(`${feature.title || feature.id} loaded successfully`);
            resolve();
          } else {
            utils.log(`${feature.title || feature.id} data not found in global scope`, "error");
            reject(`${feature.title || feature.id} data not found in global scope`);
          }
        };
        script.onerror = () => {
          utils.log(`Failed to load ${feature.title || feature.id}`, "error");
          reject(`Failed to load ${feature.title || feature.id}`);
        };
        document.head.appendChild(script);
      });
    },
    getFeature: function(featureId) {
      if (this.loadedFeatures[featureId]) {
        return this.loadedFeatures[featureId];
      }
      throw new Error(`Unknown feature: ${featureId}`);
    },
    getAvailableFeatures: function() {
      return Object.keys(this.features);
    },
    generatePrompt: function(featureId) {
      try {
        const featureData = this.getFeature(featureId);
        if (!featureData.llmInstructions) {
          return `Error: No instructions available for feature "${featureId}"`;
        }
        return this.generateFeaturePrompt(featureData);
      } catch (error) {
        return `Error: ${error.message}`;
      }
    },
    generateFeaturePrompt: function(data) {
      let prompt = `# ${data.title || data.name} Knowledge Base\n\n`;
      prompt += this.formatGenericKnowledgeBase(data);
      if (data.llmInstructions) {
        prompt += `## LLM Instructions\n${data.llmInstructions}\n\n`;
      }
      if (data.userInstructions) {
        prompt += `## User Interaction Instructions\n${data.userInstructions}\n\n`;
      }
      return prompt;
    },
    formatGenericKnowledgeBase: function(data) {
      let result = '';
      for (const [key, value] of Object.entries(data)) {
        if (['title', 'name', 'llmInstructions', 'userInstructions'].includes(key)) {
          continue;
        }
        if (typeof value === 'object' && value !== null) {
          const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);
          result += `### ${sectionTitle}\n`;
          if (Array.isArray(value)) {
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
    formatObjectProperties: function(obj) {
      if (!obj || typeof obj !== 'object') return '';
      return Object.entries(obj)
        .filter(([key]) => key !== 'name')
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
    },
    registerFeature: function(featureConfig) {
      knowledgeBaseConfig.push(featureConfig);
      this._loadFeature(featureConfig, () => {
        utils.log(`Dynamic feature ${featureConfig.title || featureConfig.id} registration complete`);
      });
    }
  };
  return kbResearch;
};

(async function() {
  console.log('[KB Research] Starting initialization...');
  const kbResearch = kbResearchModule();
  await kbResearch.initialize();
  window.kbResearch = kbResearch;
  console.log('[KB Research] Initialization complete.');
})();