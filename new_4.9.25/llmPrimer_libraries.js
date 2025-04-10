// llmPrimer_libraries.js - Loads libraries and initializes full functionality
(function() {
  console.log('Loading libraries for llmPrimer...');
  updateStatus('Loading Mammoth.js...');
  
  // Counter for loaded libraries
  let loadedCount = 0;
  const requiredCount = 2; // Mammoth and Turndown
  
  // Load Mammoth.js
  const mammothScript = document.createElement('script');
  mammothScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.17/mammoth.browser.min.js';
  mammothScript.integrity = "sha512-Qx0Z8xRfpC+q0mEX2S9OMlEJLGwCYMJbsjXnBqZ+0JIFMCdY+zTbWvNGfEDCVDB7YWkbvOVt9wgE3imP33U7Jw==";
  mammothScript.crossOrigin = "anonymous";
  document.head.appendChild(mammothScript);
  
  mammothScript.onload = function() {
    console.log('Mammoth.js loaded successfully');
    loadedCount++;
    checkAllLoaded();
    updateStatus('Loading Turndown.js...');
  };
  
  mammothScript.onerror = function(error) {
    console.error('Failed to load Mammoth.js:', error);
    updateStatus('Failed to load Mammoth.js', true);
  };
  
  // Load Turndown.js after Mammoth.js loads
  function loadTurndown() {
    const turndownScript = document.createElement('script');
    turndownScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/turndown/7.1.1/turndown.min.js';
    turndownScript.integrity = "sha512-OtLX4oNRLqLRxRxB/90jOHCQkPSZQQRLMR0gEXm0krJ8YDvP/cdROjpx4dEkd4GEF5O6+/7C5qYNnU8yHYr/Kw==";
    turndownScript.crossOrigin = "anonymous";
    document.head.appendChild(turndownScript);
    
    turndownScript.onload = function() {
      console.log('Turndown.js loaded successfully');
      loadedCount++;
      checkAllLoaded();
    };
    
    turndownScript.onerror = function(error) {
      console.error('Failed to load Turndown.js:', error);
      updateStatus('Failed to load Turndown.js', true);
    };
  }
  
  // Start loading Turndown immediately as well
  loadTurndown();
  
  // Check if all required libraries have been loaded
  function checkAllLoaded() {
    if (loadedCount >= requiredCount) {
      console.log('All libraries loaded successfully');
      updateStatus('Libraries loaded successfully');
      setTimeout(() => {
        completeInitialization();
      }, 500);
    }
  }
  
  // Once all libraries are loaded, initialize the full UI and functionality
  function completeInitialization() {
    try {
      updateStatus('Initializing functionality...');
      buildFullUI();
      attachEventHandlers();
      populateInitialData();
      updateStatus('Ready!');
      setTimeout(() => {
        const statusDiv = document.getElementById('llmPrimer-status');
        if (statusDiv) {
          statusDiv.style.display = 'none';
        }
      }, 2000);
    } catch (error) {
      console.error('Error completing initialization:', error);
      updateStatus('Initialization failed: ' + error.message, true);
    }
  }
  
  // Build the full UI now that libraries are loaded
  function buildFullUI() {
    const panel = document.getElementById('llmPrimer-panel');
    if (!panel) {
      throw new Error('Panel element not found');
    }
    
    // Clear the panel except for the header
    const header = panel.querySelector('div:first-child');
    const statusDiv = document.getElementById('llmPrimer-status');
    panel.innerHTML = '';
    panel.appendChild(header);
    panel.appendChild(statusDiv);
    
    // Add theme toggle button to header
    const controls = header.querySelector('div');
    
    const themeBtn = document.createElement('button');
    themeBtn.id = 'llmPrimer-theme-btn';
    themeBtn.innerText = '🌓';
    themeBtn.title = 'Toggle theme';
    themeBtn.style.border = 'none';
    themeBtn.style.background = 'none';
    themeBtn.style.cursor = 'pointer';
    themeBtn.style.fontSize = '16px';
    themeBtn.addEventListener('click', toggleTheme);
    controls.insertBefore(themeBtn, controls.firstChild);
    
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'llmPrimer-toggle-btn';
    toggleBtn.innerText = '⚡';
    toggleBtn.title = 'Toggle panel';
    toggleBtn.style.border = 'none';
    toggleBtn.style.background = 'none';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.fontSize = '16px';
    toggleBtn.addEventListener('click', minimizePanel);
    controls.insertBefore(toggleBtn, controls.lastChild);
    
    // Category select
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Select Category:';
    categoryLabel.style.display = 'block';
    categoryLabel.style.marginBottom = '5px';
    categoryLabel.style.fontSize = '14px';
    panel.appendChild(categoryLabel);

    const categorySelect = document.createElement('select');
    categorySelect.className = 'categorySelect';
    categorySelect.style.width = '100%';
    categorySelect.style.padding = '5px';
    categorySelect.style.marginBottom = '15px';
    categorySelect.style.borderRadius = '3px';
    categorySelect.style.border = '1px solid #ccc';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a category --';
    categorySelect.appendChild(defaultOption);

    window.kbCategory.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.title;
      categorySelect.appendChild(option);
    });

    panel.appendChild(categorySelect);

    // Knowledge base select
    const kbLabel = document.createElement('label');
    kbLabel.textContent = 'Select Knowledge Base:';
    kbLabel.style.display = 'block';
    kbLabel.style.marginBottom = '5px';
    kbLabel.style.fontSize = '14px';
    panel.appendChild(kbLabel);

    const kbSelect = document.createElement('select');
    kbSelect.className = 'knowledgeBaseSelect';
    kbSelect.style.width = '100%';
    kbSelect.style.padding = '5px';
    kbSelect.style.marginBottom = '15px';
    kbSelect.style.borderRadius = '3px';
    kbSelect.style.border = '1px solid #ccc';
    kbSelect.disabled = true;

    const defaultKbOption = document.createElement('option');
    defaultKbOption.value = '';
    defaultKbOption.textContent = '-- Select a knowledge base --';
    kbSelect.appendChild(defaultKbOption);

    panel.appendChild(kbSelect);
    panel.appendChild(statusDiv); // Move status div to the new position
    
    // Action buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';
    buttonContainer.style.gap = '10px';

    const injectBtn = document.createElement('button');
    injectBtn.id = 'llmPrimer-inject-btn';
    injectBtn.innerText = 'Inject Prompt';
    injectBtn.style.padding = '8px 15px';
    injectBtn.style.borderRadius = '3px';
    injectBtn.style.border = '1px solid #ccc';
    injectBtn.style.backgroundColor = '#f0f0f0';
    injectBtn.style.cursor = 'pointer';
    injectBtn.style.flex = '1';
    injectBtn.disabled = true;
    injectBtn.addEventListener('click', injectPrompt);
    buttonContainer.appendChild(injectBtn);

    const copyBtn = document.createElement('button');
    copyBtn.id = 'llmPrimer-copy-btn';
    copyBtn.innerText = 'Copy Prompt';
    copyBtn.style.padding = '8px 15px';
    copyBtn.style.borderRadius = '3px';
    copyBtn.style.border = '1px solid #ccc';
    copyBtn.style.backgroundColor = '#f0f0f0';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.flex = '1';
    copyBtn.disabled = true;
    copyBtn.addEventListener('click', copyPrompt);
    buttonContainer.appendChild(copyBtn);

    panel.appendChild(buttonContainer);
    
    applyCurrentTheme();
  }
  
  // Attach event handlers to the UI elements
  function attachEventHandlers() {
    const categorySelect = document.querySelector('.categorySelect');
    const kbSelect = document.querySelector('.knowledgeBaseSelect');
    const injectBtn = document.getElementById('llmPrimer-inject-btn');
    const copyBtn = document.getElementById('llmPrimer-copy-btn');
    
    if (categorySelect && kbSelect) {
      categorySelect.addEventListener('change', function() {
        populateKnowledgeBases(this.value);
        kbSelect.disabled = !this.value;
        if (injectBtn && copyBtn) {
          injectBtn.disabled = true;
          copyBtn.disabled = true;
        }
      });
      
      kbSelect.addEventListener('change', function() {
        if (injectBtn && copyBtn) {
          injectBtn.disabled = !this.value;
          copyBtn.disabled = !this.value;
        }
      });
    }
  }
  
  // Populate initial data
  function populateInitialData() {
    const categorySelect = document.querySelector('.categorySelect');
    
    if (categorySelect && window.kbCategory.length > 0) {
      categorySelect.value = window.kbCategory[0].id;
      populateKnowledgeBases(window.kbCategory[0].id);
      
      const kbSelect = document.querySelector('.knowledgeBaseSelect');
      if (kbSelect) {
        kbSelect.disabled = false;
      }
    }
  }
  
  // Make the initialization function globally available
  window.initializeFunctionality = completeInitialization;
  
  // Define all the required functions
  
  function populateKnowledgeBases(categoryId) {
    try {
      const kbSelect = document.querySelector('.knowledgeBaseSelect');
      if (!kbSelect) {
        throw new Error('Knowledge base select element not found');
      }

      // Clear existing options beyond the default
      while (kbSelect.options.length > 1) {
        kbSelect.remove(1);
      }

      // Filter knowledge bases by category
      const filteredKBs = window.kbDomain.filter(kb => kb.category === categoryId);

      // Add filtered knowledge bases to select
      filteredKBs.forEach(kb => {
        const option = document.createElement('option');
        option.value = kb.id;
        option.textContent = kb.title;
        kbSelect.appendChild(option);
      });

      // Enable buttons if options are available
      if (filteredKBs.length > 0) {
        kbSelect.value = filteredKBs[0].id;
        const injectBtn = document.getElementById('llmPrimer-inject-btn');
        const copyBtn = document.getElementById('llmPrimer-copy-btn');
        if (injectBtn && copyBtn) {
          injectBtn.disabled = false;
          copyBtn.disabled = false;
        }
      }
    } catch (error) {
      console.error('Error populating knowledge bases:', error);
      updateStatus('Failed to populate knowledge bases: ' + error.message, true);
    }
  }

  function getDocxUrl() {
    try {
      const kbSelect = document.querySelector('.knowledgeBaseSelect');
      if (!kbSelect) {
        throw new Error('Knowledge base select element not found');
      }

      const selectedId = kbSelect.value;
      if (!selectedId) {
        return '';
      }

      const selectedKB = window.kbDomain.find(kb => kb.id === selectedId);
      return selectedKB ? selectedKB.docxUrl : '';
    } catch (error) {
      console.error('Error getting DOCX URL:', error);
      return '';
    }
  }

  async function processDocx(url) {
    try {
      if (!url) {
        throw new Error('No valid DOCX URL provided');
      }
      
      updateStatus('Fetching DOCX file...');
      
      // List of CORS proxies to try
      const corsProxies = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://cors-anywhere.herokuapp.com/'
      ];
      
      let arrayBuffer = null;
      let proxySuccess = false;
      let lastError = null;
      
      // First try direct fetch
      try {
        const response = await fetch(url, { 
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          }
        });
        
        if (response.ok) {
          arrayBuffer = await response.arrayBuffer();
          proxySuccess = true;
        }
      } catch (directError) {
        console.warn('Direct fetch failed:', directError);
        lastError = directError;
      }
      
      // If direct fetch failed, try proxies
      if (!proxySuccess) {
        for (const proxy of corsProxies) {
          try {
            updateStatus(`Trying proxy: ${proxy.split('?')[0]}...`);
            const proxyUrl = proxy + encodeURIComponent(url);
            const response = await fetch(proxyUrl);
            
            if (response.ok) {
              arrayBuffer = await response.arrayBuffer();
              proxySuccess = true;
              break;
            }
          } catch (proxyError) {
            console.warn(`Proxy ${proxy} failed:`, proxyError);
            lastError = proxyError;
          }
        }
      }
      
      // If all proxies failed, try a final fallback
      if (!proxySuccess) {
        updateStatus('Trying final alternative method...');
        try {
          arrayBuffer = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            
            xhr.onload = function() {
              if (this.status >= 200 && this.status < 300) {
                resolve(this.response);
              } else {
                reject(new Error(`XHR failed: ${this.status}`));
              }
            };
            
            xhr.onerror = function() {
              reject(new Error('Network error occurred'));
            };
            
            xhr.send();
          });
          proxySuccess = true;
        } catch (xhrError) {
          console.warn('XHR approach failed:', xhrError);
          lastError = xhrError;
        }
      }
      
      // If all methods failed
      if (!proxySuccess || !arrayBuffer) {
        throw new Error(`All fetch methods failed. Last error: ${lastError?.message || 'Unknown error'}`);
      }
      
      updateStatus('Converting DOCX to HTML...');
      
      // Convert DOCX to HTML using Mammoth
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;
      
      updateStatus('Converting HTML to Markdown...');
      
      // Convert HTML to Markdown using Turndown
      const turndownService = new TurndownService();
      // Configure Turndown for better Markdown conversion
      turndownService.addRule('emphasis', {
        filter: ['em', 'i'],
        replacement: function(content) {
          return '*' + content + '*';
        }
      });
      turndownService.addRule('strong', {
        filter: ['strong', 'b'],
        replacement: function(content) {
          return '**' + content + '**';
        }
      });
      
      const markdown = turndownService.turndown(html);
      
      updateStatus('Conversion complete!');
      
      return markdown;
    } catch (error) {
      console.error('Error processing DOCX:', error);
      updateStatus(`Error: ${error.message}`, true);
      throw error;
    }
  }

  function notifySuccess() {
    console.log('Prompt injected successfully');
  }

  async function injectPrompt() {
    try {
      const docxUrl = getDocxUrl();
      if (!docxUrl) {
        alert('No valid DOCX URL found. Please select a knowledge base.');
        return;
      }

      updateStatus('Starting conversion process...');
      
      // Convert DOCX to Markdown
      let markdown;
      try {
        markdown = await processDocx(docxUrl);
      } catch (conversionError) {
        // If direct conversion fails, show a more detailed error
        console.error('Conversion error:', conversionError);
        alert(`DOCX conversion failed: ${conversionError.message}\n\nThe DOCX file at ${docxUrl} could not be accessed or converted. This is likely due to CORS restrictions or an invalid document format.`);
        return;
      }
      
      // Try to find the target textarea - supporting multiple possible selectors
      let targetInput = null;
      const possibleSelectors = [
        "div#prompt-textarea p.placeholder", // Original target
        "textarea[placeholder]", // Generic textarea
        "[contenteditable='true']", // Contenteditable div
        "[role='textbox']", // Role-based textbox
        ".chatbox-input", // Class-based input
        "#message-input" // ID-based input
      ];
      
      for (const selector of possibleSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          targetInput = element;
          break;
        }
      }
      
      if (!targetInput) {
        alert("Text input area not found! Please ensure you're on a compatible LLM interface.");
        return;
      }

      // Insert markdown based on the type of element
      if (targetInput.tagName === 'TEXTAREA') {
        targetInput.value = markdown;
        targetInput.dispatchEvent(new Event("input", { bubbles: true }));
        targetInput.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (targetInput.isContentEditable || targetInput.getAttribute('role') === 'textbox') {
        targetInput.innerText = markdown;
        targetInput.dispatchEvent(new Event("input", { bubbles: true }));
      } else {
        // For placeholder elements and other special cases
        targetInput.innerText = markdown;
        targetInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
      
      updateStatus('Text inserted successfully!');

      // Attempt to find and trigger the send button
      setTimeout(() => {
        // Try multiple possible selectors for the send button
        const possibleButtonSelectors = [
          'button[data-testid="send-button"]',
          'button.send-button',
          'button[type="submit"]',
          'button:has(svg)',
          'button.submit',
          '[aria-label="Send message"]'
        ];
        
        let sendButton = null;
        for (const selector of possibleButtonSelectors) {
          const button = document.querySelector(selector);
          if (button) {
            sendButton = button;
            break;
          }
        }
        
        if (sendButton) {
          sendButton.click();
          notifySuccess();
        } else {
          updateStatus('Send button not found. Text inserted but not submitted.', true);
        }
      }, 300); // Increased timeout for more reliable execution
    } catch (error) {
      console.error('Error injecting prompt:', error);
      alert('Failed to inject prompt: ' + error.message);
    }
  }

  async function copyPrompt() {
    try {
      const docxUrl = getDocxUrl();
      if (!docxUrl) {
        alert('No knowledge base selected!');
        return;
      }

      updateStatus('Starting conversion for copy...');
      
      // Convert DOCX to Markdown
      let markdown;
      try {
        markdown = await processDocx(docxUrl);
      } catch (conversionError) {
        console.error('Conversion error:', conversionError);
        alert(`DOCX conversion failed: ${conversionError.message}\n\nThe DOCX file at ${docxUrl} could not be accessed or converted.`);
        return;
      }
      
      updateStatus('Copying to clipboard...');
      
      // Track success status
      let copySuccess = false;
      
      // Try multiple clipboard methods
      try {
        // Method 1: Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(markdown);
          copySuccess = true;
        } 
        // Method 2: execCommand (fallback)
        else {
          const textarea = document.createElement('textarea');
          textarea.value = markdown;
          // Position off-screen but ensure it's focusable
          textarea.style.position = 'fixed';
          textarea.style.left = '0';
          textarea.style.top = '0';
          textarea.style.opacity = '0';
          textarea.style.pointerEvents = 'none';
          document.body.appendChild(textarea);
          
          // Select all text
          textarea.focus();
          textarea.select();
          
          // Execute copy command
          copySuccess = document.execCommand('copy');
          document.body.removeChild(textarea);
        }
      } catch (clipboardError) {
        console.error('Clipboard operation failed:', clipboardError);
        
        // Method 3: Last resort fallback
        try {
          const tempTextArea = document.createElement('textarea');
          tempTextArea.value = markdown;
          // Make it visible so user can manually copy if needed
          tempTextArea.style.position = 'fixed';
          tempTextArea.style.top = '10px';
          tempTextArea.style.left = '10px';
          tempTextArea.style.width = '80%';
          tempTextArea.style.height = '150px';
          tempTextArea.style.zIndex = '10001';
          document.body.appendChild(tempTextArea);
          
          alert('Automatic copy failed. Please manually copy the text from the text area that has appeared on screen.');
          tempTextArea.focus();
          tempTextArea.select();
          
          // Auto-remove after 20 seconds
          setTimeout(() => {
            if (document.body.contains(tempTextArea)) {
              document.body.removeChild(tempTextArea);
            }
          }, 20000);
          
          return;
        } catch (fallbackError) {
          console.error('Even fallback textarea failed:', fallbackError);
        }
      }
      
      // Update button/status based on success
      if (copySuccess) {
        const copyBtn = document.getElementById('llmPrimer-copy-btn');
        if (copyBtn) {
          const originalText = copyBtn.innerText;
          copyBtn.innerText = '✓ Copied!';
          copyBtn.style.backgroundColor = '#4caf50';
          copyBtn.style.color = 'white';
          setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
          }, 2000);
        }
        updateStatus('Markdown copied to clipboard!');
      } else {
        updateStatus('Failed to copy to clipboard', true);
        alert('Copy operation failed. This may be due to browser permissions.');
      }
    } catch (error) {
      console.error('Error in copyPrompt:', error);
      updateStatus('Error during copy operation', true);
      alert('An error occurred: ' + error.message);
    }
  }

  function toggleTheme() {
    try {
      const panel = document.getElementById('llmPrimer-panel');
      if (!panel) {
        throw new Error('Panel element not found');
      }

      const isDarkTheme = panel.getAttribute('data-theme') === 'dark';
      
      if (isDarkTheme) {
        // Switch to light theme
        panel.setAttribute('data-theme', 'light');
        panel.style.backgroundColor = '#ffffff';
        panel.style.color = '#333333';
        panel.style.border = '1px solid #cccccc';
        
        const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
        buttons.forEach(button => {
          button.style.backgroundColor = '#f0f0f0';
          button.style.color = '#333333';
          button.style.border = '1px solid #cccccc';
        });
        
        const selects = panel.querySelectorAll('select');
        selects.forEach(select => {
          select.style.backgroundColor = '#ffffff';
          select.style.color = '#333333';
          select.style.border = '1px solid #cccccc';
        });
      } else {
        // Switch to dark theme
        panel.setAttribute('data-theme', 'dark');
        panel.style.backgroundColor = '#333333';
        panel.style.color = '#ffffff';
        panel.style.border = '1px solid #555555';
        
        const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
        buttons.forEach(button => {
          button.style.backgroundColor = '#444444';
          button.style.color = '#ffffff';
          button.style.border = '1px solid #666666';
        });
        
        const selects = panel.querySelectorAll('select');
        selects.forEach(select => {
          select.style.backgroundColor = '#444444';
          select.style.color = '#ffffff';
          select.style.border = '1px solid #666666';
        });
      }
      
      // Save theme preference
      localStorage.setItem('llmPrimer-theme', isDarkTheme ? 'light' : 'dark');
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  }

  function applyCurrentTheme() {
    try {
      const panel = document.getElementById('llmPrimer-panel');
      if (!panel) {
        throw new Error('Panel element not found');
      }

      const savedTheme = localStorage.getItem('llmPrimer-theme') || 'light';
      
      if (savedTheme === 'dark') {
        panel.setAttribute('data-theme', 'dark');
        panel.style.backgroundColor = '#333333';
        panel.style.color = '#ffffff';
        panel.style.border = '1px solid #555555';
        
        const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
        buttons.forEach(button => {
          button.style.backgroundColor = '#444444';
          button.style.color = '#ffffff';
          button.style.border = '1px solid #666666';
        });
        
        const selects = panel.querySelectorAll('select');
        selects.forEach(select => {
          select.style.backgroundColor = '#444444';
          select.style.color = '#ffffff';
          select.style.border = '1px solid #666666';
        });
      } else {
        panel.setAttribute('data-theme', 'light');
        panel.style.backgroundColor = '#ffffff';
        panel.style.color = '#333333';
        panel.style.border = '1px solid #cccccc';
        
        const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
        buttons.forEach(button => {
          button.style.backgroundColor = '#f0f0f0';
          button.style.color = '#333333';
          button.style.border = '1px solid #cccccc';
        });
        
        const selects = panel.querySelectorAll('select');
        selects.forEach(select => {
          select.style.backgroundColor = '#ffffff';
          select.style.color = '#333333';
          select.style.border = '1px solid #cccccc';
        });
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }

  function minimizePanel() {
    try {
      const panel = document.getElementById('llmPrimer-panel');
      if (!panel) {
        throw new Error('Panel element not found');
      }

      const childElements = Array.from(panel.children).slice(1); // Skip header
      const isMinimized = panel.getAttribute('data-minimized') === 'true';
      
      if (isMinimized) {
        // Expand panel
        childElements.forEach(element => {
          element.style.display = '';
        });
        panel.setAttribute('data-minimized', 'false');
      } else {
        // Minimize panel
        childElements.forEach(element => {
          element.style.display = 'none';
        });
        panel.setAttribute('data-minimized', 'true');
      }
    } catch (error) {
      console.error('Error toggling panel:', error);
    }
  }
})();