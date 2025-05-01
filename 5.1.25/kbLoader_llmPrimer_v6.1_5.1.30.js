// oa_llmPrimer_bkm_kbLoader_v5.3_4.17.25.js
;(function(){
    // ———————————————————————————————
    // 1) Get the base‑script's onload (that's your `c()` initializer)
    // ———————————————————————————————
    const me        = document.currentScript;
    const initPanel = me.onload;   // stash original panel‑init
    me.onload       = null;        // prevent it firing early
  
    // Create a debug logger that can be toggled
    const DEBUG = true;
    const debugLog = (...args) => {
      if (DEBUG) {
        console.log('[llmPrimer Debug]', ...args);
      }
    };
  
    // ———————————————————————————————
    // 2) Define your categories (must exactly match each kbDomain.category)
    // ———————————————————————————————
    const kbCategory = [
      { id: 'designReview',   title: 'Design Review Tools'    },
      { id: 'research',       title: 'Research Tools'         }
    ];
  
    // ———————————————————————————————
    // 3) Define your KB entries, pointing at JSONP .js URLs
    //    (these .js files must each call llmPrimerRegister(id, markdown))
    // ———————————————————————————————
    const kbDomain = [
      {
        id:       'usabilityHeuristics',
        title:    'Usability Heuristics',
        category: 'designReview',
        url:      'https://confluence.prod.aws.jpmchase.net/confluence/download/attachments/4722904378/usabilityHeuristics_kb.js',
        promptInject: 'Conduct a usability heuristics evaluation of the attached ui'
      },
      {
        id:       'darkDeceptivePatterns',
        title:    'Dark & Deceptive Patterns',
        category: 'research',
        url:      'https://confluence.prod.aws.jpmchase.net/confluence/download/attachments/4722904378/darkDeceptivePatterns_kb.js',
        promptInject: 'Conduct a dark & deceptive patterns evaluation of the attached ui'
      }
      // …add more here
    ];
  
    // ———————————————————————————————
    // 4) Validate that every kbDomain.category exists in kbCategory
    // ———————————————————————————————
    const validCats = new Set(kbCategory.map(c=>c.id));
    kbDomain.forEach(e => {
      if (!validCats.has(e.category)) {
        console.warn(
          `llmPrimer: "${e.id}" uses unknown category "${e.category}".\n` +
          `  Valid categories are: ${[...validCats].join(', ')}`
        );
      }
      e.markDown = '';   // stub until JSONP arrives
      e.loaded = false;  // track loading status
    });
  
    // ———————————————————————————————
    // 5) JSONP callback; called by each KB file
    // ———————————————————————————————
    let remaining = kbDomain.length;
    let allRegistered = false;
    
    window.llmPrimerRegister = function(id, markdown) {
      debugLog(`Registering KB: ${id}, content length: ${markdown.length}`);
      
      const entry = kbDomain.find(x => x.id === id);
      if (entry) {
        entry.markDown = markdown;
        entry.loaded = true;
        debugLog(`KB entry found and updated: ${id}`);
      } else {
        console.warn(`llmPrimer: no KB entry found for id "${id}"`);
      }
  
      if (--remaining === 0) {
        // expose exactly what the base script expects
        window.kbCategory = kbCategory;
        window.kbDomain   = kbDomain;
        allRegistered = true;
  
        console.group('llmPrimer KB loaded');
        kbDomain.forEach(e =>
          console.log(` • ${e.id} [${e.category}]: ${e.markDown.length} chars, loaded: ${e.loaded}`)
        );
        console.groupEnd();
  
        // now initialize the panel
        if (initPanel) {
          debugLog('Initializing panel...');
          initPanel();
          
          // Fix category selection issue by adding event listener to properly update KB selection
          setTimeout(() => {
            const categorySelect = document.querySelector('.categorySelect');
            const kbSelect = document.querySelector('.knowledgeBaseSelect');
            
            if (categorySelect && kbSelect) {
              // Override the base script's event listener to ensure proper state transitions
              categorySelect.addEventListener('change', function(e) {
                debugLog(`Category changed to: ${this.value}`);
                populateKnowledgeBaseDropdown(this.value, kbSelect);
                e.stopPropagation(); // Prevent other handlers from executing
              }, true); // Use capture phase to run before other listeners
              
              // Ensure initial population
              populateKnowledgeBaseDropdown(categorySelect.value, kbSelect);
              
              // Add event listener for KB selection change
              kbSelect.addEventListener('change', function() {
                window.updatePromptInjectLink();
              });
            }
          }, 100);
        }
      }
    };
    
    // Function to update the promptInject link based on selected knowledge base
    window.updatePromptInjectLink = function() {
      try {
        // Get the selected KB option
        const kbSelect = document.querySelector('.knowledgeBaseSelect');
        if (!kbSelect) {
          console.error("Knowledge base select element not found");
          return false;
        }
        
        // Find the KB entry with that ID
        const selectedKb = kbDomain.find(kb => kb.id === kbSelect.value);
        if (!selectedKb || !selectedKb.promptInject) {
          console.error("Selected KB not found or has no promptInject value");
          return false;
        }
        
        // Get the injlinkDiv
        const injlinkDiv = document.querySelector('.injlinkDiv');
        if (!injlinkDiv) {
          console.error("injlinkDiv not found");
          return false;
        }
        
        // Remove any existing promptInject links (preserving the first element)
        const existingLinks = injlinkDiv.querySelectorAll('.injLink');
        if (existingLinks.length > 1) {
          // Keep the first link, remove any others
          for (let i = 1; i < existingLinks.length; i++) {
            injlinkDiv.removeChild(existingLinks[i]);
          }
        }
        
        // Create the new link
        const newLink = document.createElement('a');
        newLink.className = 'injLink';
        newLink.href = '#';
        newLink.textContent = '[promptInject]';
        newLink.onclick = function() {
          injectTask(selectedKb.promptInject);
          return false; // Prevent default link behavior
        };
        
        // Append the new link to injlinkDiv
        injlinkDiv.appendChild(newLink);
        debugLog(`Added promptInject link for ${selectedKb.title}`);
        return true;
      } catch(error) {
        console.error("Error in updatePromptInjectLink:", error);
        return false;
      }
    };
  
    // Define injectTask in the global scope - REVISED to not trigger click
    window.injectTask = function(text) {
      try {
        // Verify text is coming from a promptInject property
        const selectedKb = kbDomain.find(kb => kb.promptInject === text);
        if (!selectedKb) {
          console.error("Invalid text source - must come from promptInject property");
          return;
        }
        
        // Get the textarea (only using the ID selector)
        const textarea = document.getElementById('dialog-input-textarea');
        
        if (!textarea) {
          console.error("Target textarea not found");
          return;
        }
    
        // Clear existing text
        textarea.value = "";
        
        // Focus the textarea
        textarea.focus();
        
        // Try execCommand first (for shadow DOM)
        if (document.execCommand('insertText', false, text)) {
          console.log("Text injected via execCommand");
        } else {
          // Fallback to direct value setting
          textarea.value = text;
        }
        
        // Dispatch events
        ['input', 'change'].forEach(eventType => {
          const event = new Event(eventType, { bubbles: true });
          textarea.dispatchEvent(event);
        });
    
        console.log("Text injected successfully without triggering click");
    
      } catch(error) {
        console.error("Error in injectTask:", error);
      }
    };
  
    // Helper function to properly populate the KB dropdown
    function populateKnowledgeBaseDropdown(categoryId, selectElement) {
      if (!selectElement) return;
      
      debugLog(`Populating KB dropdown for category: ${categoryId}`);
      
      // Clear existing options except first placeholder
      while (selectElement.options.length > 1) {
        selectElement.remove(1);
      }
      
      // Find all KBs for this category
      const kbsForCategory = kbDomain.filter(item => {
        const matches = item.category === categoryId && item.loaded;
        debugLog(`  KB: ${item.id}, category: ${item.category}, loaded: ${item.loaded}, matches: ${matches}`);
        return matches;
      });
      
      // Add each KB to the dropdown
      kbsForCategory.forEach(kb => {
        const option = document.createElement('option');
        option.value = kb.id;
        option.textContent = kb.title;
        selectElement.appendChild(option);
      });
      
      // Update selection state
      if (kbsForCategory.length > 0) {
        selectElement.value = kbsForCategory[0].id;
        selectElement.disabled = false;
        
        // Enable buttons
        const injectButton = document.getElementById('llmPrimer-inject-btn');
        const copyButton = document.getElementById('llmPrimer-copy-btn');
        if (injectButton && copyButton) {
          injectButton.disabled = false;
          copyButton.disabled = false;
        }
        
        // Update the promptInject link
        window.updatePromptInjectLink();
      } else {
        selectElement.value = '';
        selectElement.disabled = false;
        
        // Disable buttons
        const injectButton = document.getElementById('llmPrimer-inject-btn');
        const copyButton = document.getElementById('llmPrimer-copy-btn');
        if (injectButton && copyButton) {
          injectButton.disabled = true;
          copyButton.disabled = true;
        }
      }
    }
  
    // ———————————————————————————————
    // 6) Inject each JSONP <script> (no CORS, async=false to preserve order)
    // ———————————————————————————————
    kbDomain.forEach((entry, index) => {
      const s = document.createElement('script');
      s.src = entry.url;
      s.async = false;
      
      // Set a timeout to handle potential loading issues
      const loadTimeout = setTimeout(() => {
        if (!entry.loaded) {
          console.error(`llmPrimer: timeout loading ${entry.url}`);
          entry.markDown = `# Error Loading Content\nContent for "${entry.title}" failed to load.`;
          entry.loaded = true; // Mark as loaded anyway so we can proceed
          
          if (--remaining === 0 && !allRegistered) {
            window.kbCategory = kbCategory;
            window.kbDomain = kbDomain;
            allRegistered = true;
            
            // Initialize the panel
            initPanel && initPanel();
          }
        }
      }, 5000); // 5 second timeout
  
      s.onload = () => {
        debugLog(`Script loaded: ${entry.url}`);
        clearTimeout(loadTimeout);
        // The llmPrimerRegister function will handle the rest
      };
      
      s.onerror = () => {
        console.error(`llmPrimer: failed loading ${entry.url}`);
        clearTimeout(loadTimeout);
        entry.markDown = `# Error Loading Content\nContent for "${entry.title}" failed to load.`;
        entry.loaded = true; // Mark as loaded to update UI correctly
        
        if (--remaining === 0 && !allRegistered) {
          window.kbCategory = kbCategory;
          window.kbDomain = kbDomain;
          allRegistered = true;
          
          // Initialize the panel
          initPanel && initPanel();
        }
      };
      
      document.head.appendChild(s);
    });
  
  })();