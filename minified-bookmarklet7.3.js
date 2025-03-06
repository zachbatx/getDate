javascript:(function(){
  // Data storage for loaded resources
  const data = {
    accessibility: null,
    ux: null
  };

  // Load external resources
  function loadResource(url, dataKey) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(jsonData => {
        data[dataKey] = jsonData;
        checkResourcesLoaded();
      })
      .catch(error => {
        alert(`Error loading ${url}: ${error.message}`);
      });
  }

  // Check if all resources are loaded
  function checkResourcesLoaded() {
    if (data.accessibility && data.ux) {
      initPersonaGenerator();
    }
  }

  // Initialize the persona generator
  function initPersonaGenerator() {
    // Prevent multiple instances
    if (document.getElementById("a11y-persona-generator")) return;

    // Add theme styles
    if (!document.getElementById("a11y-persona-theme-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "a11y-persona-theme-styles";
      styleEl.textContent = `
        .a11y-light-theme{background-color:white!important;color:#000!important;}
        .a11y-light-theme select{background-color:white!important;color:#000!important;border-color:#ccc!important;}
        .a11y-light-theme .icon-stroke{stroke:#000!important;}
        .a11y-light-theme #close-btn{color:#000!important;}
        .a11y-dark-theme{background-color:#222!important;color:#fff!important;}
        .a11y-dark-theme select{background-color:#222!important;color:#fff!important;border-color:#444!important;}
        .a11y-dark-theme .icon-stroke{stroke:#fff!important;}
        .a11y-dark-theme #close-btn{color:#fff!important;}
        #generate-btn{background-color:#49A74C!important;color:white!important;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;margin-right:5px;}
        #copy-btn{background-color:#0B78D0!important;color:white!important;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;}
        #close-btn,#style-toggle,#theme-toggle{background-color:transparent!important;border:none;cursor:pointer;}
        select, input {margin-bottom:10px;width:100%;padding:8px;box-sizing:border-box;}
        .btn-container {display:flex;justify-content:space-between;margin-top:10px;}
        .persona-output {margin-top:15px;border:1px solid #ccc;padding:10px;border-radius:4px;max-height:300px;overflow-y:auto;}
      `;
      document.head.appendChild(styleEl);
    }

    // Define style modes
    const styles = {
      "default": "position:fixed;top:20px;right:20px;padding:15px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;",
      "fullHeight": "position:fixed;top:0px;right:0px;padding:15px;box-shadow:rgba(0,0,0,0.3)0px 0px 10px;z-index:10000;width:300px;font-family:Arial,sans-serif;height:100vh;overflow-y:auto;margin:0px;"
    };
    
    // Initial settings
    let styleMode = "default";
    let theme = "light";
    
    // Create container
    const container = document.createElement("div");
    container.id = "a11y-persona-generator";
    container.setAttribute("style", styles[styleMode]);
    container.className = `a11y-${theme}-theme`;
    
    // Create header
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "15px";
    
    const title = document.createElement("h3");
    title.textContent = "Accessibility Persona Generator";
    title.style.margin = "0";
    
    const closeBtn = document.createElement("button");
    closeBtn.id = "close-btn";
    closeBtn.innerHTML = "✕";
    closeBtn.title = "Close";
    closeBtn.onclick = () => {
      document.body.removeChild(container);
    };
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    container.appendChild(header);
    
    // Create controls
    const controls = document.createElement("div");
    
    // Feature selector
    const featureLabel = document.createElement("label");
    featureLabel.textContent = "Feature:";
    featureLabel.style.display = "block";
    featureLabel.style.marginBottom = "5px";
    
    const featureSelect = document.createElement("select");
    featureSelect.id = "feature-select";
    
    // Populate features from both data sources
    const features = new Set([
      ...Object.keys(data.accessibility.features),
      ...Object.keys(data.ux.features)
    ]);
    
    features.forEach(feature => {
      const option = document.createElement("option");
      option.value = feature;
      option.textContent = feature.charAt(0).toUpperCase() + feature.slice(1);
      featureSelect.appendChild(option);
    });
    
    // Persona type selector
    const personaLabel = document.createElement("label");
    personaLabel.textContent = "Persona Type:";
    personaLabel.style.display = "block";
    personaLabel.style.marginBottom = "5px";
    personaLabel.style.marginTop = "10px";
    
    const personaSelect = document.createElement("select");
    personaSelect.id = "persona-type";
    
    // Add all types from both data sources
    const allTypes = [];
    data.accessibility.personas.forEach(category => {
      allTypes.push(category.category);
    });
    data.ux.personas.forEach(category => {
      allTypes.push(category.category);
    });
    
    // Remove duplicates and add to select
    [...new Set(allTypes)].forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      personaSelect.appendChild(option);
    });
    
    // Buttons
    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";
    
    const generateBtn = document.createElement("button");
    generateBtn.id = "generate-btn";
    generateBtn.textContent = "Generate Persona";
    generateBtn.onclick = generatePersona;
    
    const copyBtn = document.createElement("button");
    copyBtn.id = "copy-btn";
    copyBtn.textContent = "Copy to Clipboard";
    copyBtn.onclick = copyPersona;
    
    btnContainer.appendChild(generateBtn);
    btnContainer.appendChild(copyBtn);
    
    // Settings buttons
    const settingsContainer = document.createElement("div");
    settingsContainer.style.display = "flex";
    settingsContainer.style.justifyContent = "space-between";
    settingsContainer.style.marginTop = "10px";
    
    const themeToggle = document.createElement("button");
    themeToggle.id = "theme-toggle";
    themeToggle.textContent = "Toggle Theme";
    themeToggle.onclick = () => {
      theme = theme === "light" ? "dark" : "light";
      container.className = `a11y-${theme}-theme`;
    };
    
    const styleToggle = document.createElement("button");
    styleToggle.id = "style-toggle";
    styleToggle.textContent = "Toggle Size";
    styleToggle.onclick = () => {
      styleMode = styleMode === "default" ? "fullHeight" : "default";
      container.setAttribute("style", styles[styleMode]);
    };
    
    settingsContainer.appendChild(themeToggle);
    settingsContainer.appendChild(styleToggle);
    
    // Output area
    const outputArea = document.createElement("div");
    outputArea.id = "persona-output";
    outputArea.className = "persona-output";
    outputArea.innerHTML = "<p>Click 'Generate Persona' to create a persona based on your selections.</p>";
    
    // Assemble the UI
    controls.appendChild(featureLabel);
    controls.appendChild(featureSelect);
    controls.appendChild(personaLabel);
    controls.appendChild(personaSelect);
    controls.appendChild(btnContainer);
    controls.appendChild(outputArea);
    controls.appendChild(settingsContainer);
    
    container.appendChild(controls);
    document.body.appendChild(container);
    
    // Function to generate a persona
    function generatePersona() {
      const feature = featureSelect.value;
      const personaType = personaSelect.value;
      
      // Find feature information
      const accessibilityFeature = data.accessibility.features[feature] || null;
      const uxFeature = data.ux.features[feature] || null;
      
      // Find persona examples
      let persona = null;
      
      // Try to find in accessibility personas first
      data.accessibility.personas.forEach(category => {
        if (category.category === personaType && category.examples?.length > 0) {
          persona = category.examples[Math.floor(Math.random() * category.examples.length)];
        }
      });
      
      // If not found, try UX personas
      if (!persona) {
        data.ux.personas.forEach(category => {
          if (category.category === personaType && category.examples?.length > 0) {
            persona = category.examples[Math.floor(Math.random() * category.examples.length)];
          }
        });
      }
      
      // If still not found, show message
      if (!persona) {
        outputArea.innerHTML = "<p>No persona found for the selected combination. Try a different selection.</p>";
        return;
      }
      
      // Combine information for output
      let output = `<h4>${persona.name} (${persona.age})</h4>`;
      output += `<p><strong>Category:</strong> ${personaType}</p>`;
      
      if (persona.disability) {
        output += `<p><strong>Disability:</strong> ${persona.disability}</p>`;
      }
      
      if (persona.context) {
        output += `<p><strong>Context:</strong> ${persona.context}</p>`;
      }
      
      output += `<p><strong>Tools:</strong> ${persona.tools}</p>`;
      output += `<p><strong>Challenges:</strong> ${persona.challenges}</p>`;
      output += `<p>${persona.description}</p>`;
      
      // Add considerations if we have feature information
      if (accessibilityFeature) {
        output += `<h4>Accessibility Considerations</h4>`;
        output += `<ul>`;
        accessibilityFeature.considerations.forEach(consideration => {
          output += `<li>${consideration}</li>`;
        });
        output += `</ul>`;
      }
      
      if (uxFeature) {
        output += `<h4>UX Considerations</h4>`;
        output += `<ul>`;
        uxFeature.considerations.forEach(consideration => {
          output += `<li>${consideration}</li>`;
        });
        output += `</ul>`;
      }
      
      outputArea.innerHTML = output;
    }
    
    // Function to copy persona to clipboard
    function copyPersona() {
      const content = outputArea.innerText;
      
      // Create a temporary textarea to copy from
      const textarea = document.createElement("textarea");
      textarea.value = content;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand("copy");
        alert("Persona copied to clipboard!");
      } catch (err) {
        alert("Failed to copy: " + err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  // Load resources from specified URLs
  loadResource('_agSRC-template.js', 'accessibility');
  loadResource('_uxSRC-template.js', 'ux');
})();