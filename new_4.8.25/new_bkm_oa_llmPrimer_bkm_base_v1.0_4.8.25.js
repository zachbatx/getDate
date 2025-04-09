
/*
 * llmPrimer_bkm_base_v1.0.js
 *
 * A bookmarklet framework for selecting a KB category and
 * knowledge base, parsing the linked DOCX into markdown and injecting it into the LLM.
 *
 * NOTE:
 *   - This framework expects that llmPrimer_bkm_kbLoader_v1.0.js has already been loaded.
 *   - The injection function I() (and its helpers G() and R()) are maintained from v1.1.
 *   - DOCX conversion uses Mammoth (DOCX -> HTML) and Turndown (HTML -> Markdown).
 */

(function() {
    'use strict';
  
    /* -------------------------------
       GLOBAL FUNCTIONS for LLM injection
       (Do not modify these if you want to preserve existing LLM behaviors)
    ---------------------------------*/
    // Global variable to hold the parsed markdown content.
    window.injectedContent = "";
  
    // G() returns the markdown content that will be injected.
    function G() {
      return window.injectedContent || "";
    }
  
    // Dummy R() function – you might replace it with a post-injection routine.
    function R() {
      console.log("LLM injection complete.");
    }
  
    // I() injects content into the LLM (using the provided DOM selectors).
    function I() {
      const e = G(),
            t = document.querySelector("div#prompt-textarea p.placeholder");
      if (t) {
        t.innerText = e;
        t.dispatchEvent(new Event("input", { bubbles: true }));
        setTimeout(() => {
          const sendButton = document.querySelector('button[data-testid="send-button"]');
          if (sendButton) { sendButton.click(); }
          R();
        }, 100);
      } else {
        alert("Target placeholder not found!");
      }
    }
  
    /* -------------------------------
       Utility: Dynamic script loader
    ---------------------------------*/
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(s);
      });
    }
  
    /* -------------------------------
       Dependency Loader: Ensure Mammoth and Turndown are loaded
    ---------------------------------*/
    function ensureDependencies() {
      const promises = [];
  
      if (!window.mammoth) {
        // Mammoth.js from CDN – adjust version if needed.
        promises.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.16/mammoth.browser.min.js"));
      }
      if (typeof TurndownService === "undefined") {
        // Turndown from CDN.
        promises.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/turndown/7.1.1/turndown.min.js"));
      }
  
      return Promise.all(promises);
    }
  
    /* -------------------------------
       DOCX Parsing: Convert DOCX to Markdown via HTML conversion
    ---------------------------------*/
    function parseDocxToMarkdown(docxUrl) {
      return fetch(docxUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.arrayBuffer();
        })
        .then(arrayBuffer => {
          // Use Mammoth to convert the DOCX file to HTML.
          return window.mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        })
        .then(result => {
          const html = result.value;
          // Create a new Turndown instance to convert HTML to Markdown.
          const turndownService = new TurndownService();
          const markdown = turndownService.turndown(html);
          return markdown;
        });
    }
  
    /* -------------------------------
       UI: Build Bookmarklet Panel
    ---------------------------------*/
    // Check if the interface already exists. If so, do nothing.
    if (document.getElementById("llmPrimerBookmarklet")) { return; }
  
    // Create a container div to host the bookmarklet interface.
    const container = document.createElement("div");
    container.id = "llmPrimerBookmarklet";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.width = "300px";
    container.style.padding = "15px";
    container.style.background = "#fff";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "5px";
    container.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    container.style.zIndex = "9999";
  
    // Build interface HTML
    container.innerHTML = `
      <div style="margin-bottom:10px; display: flex; justify-content: space-between; align-items: center;">
        <strong>LLM Primer</strong>
        <div>
          <button id="togglePanel" style="font-size:10px;">Toggle</button>
          <button id="themeToggle" style="font-size:10px;">Theme</button>
          <button id="closePanel" style="font-size:10px;">X</button>
        </div>
      </div>
      <label style="display:block;margin-bottom:5px;font-size:14px">Select Category:</label>
      <select class="categorySelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc">
      </select>
      <label style="display:block;margin-bottom:5px;font-size:14px">Select Knowledge Base:</label>
      <select class="knowledgeBaseSelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc" disabled>
      </select>
      <button id="injectPrompt" style="width:100%;margin-bottom:10px;padding:5px;">Inject Prompt</button>
      <button id="copyPrompt" style="width:100%;padding:5px;">Copy Prompt</button>
    `;
    document.body.appendChild(container);
  
    /* -------------------------------
       Populate Category Dropdown
    ---------------------------------*/
    // (Assumes that kbCategories is already loaded via llmPrimer_bkm_kbLoader_v1.0.js)
    const categorySelect = container.querySelector("select.categorySelect");
    kbCategories.forEach(category => {
      const option = document.createElement("option");
      option.value = category.id;
      option.innerText = category.title;
      categorySelect.appendChild(option);
    });
  
    /* -------------------------------
       Populate Knowledge Base Dropdown on Category Change
    ---------------------------------*/
    const kbSelect = container.querySelector("select.knowledgeBaseSelect");
    let selectedDocxUrl = null;
  
    function populateKnowledgeBases(categoryId) {
      // Clear previous options.
      kbSelect.innerHTML = "";
      // Filter kbDomain based on category.
      const filteredBases = kbDomain.filter(item => item.category === categoryId);
      if (filteredBases.length === 0) {
        kbSelect.disabled = true;
      } else {
        filteredBases.forEach(kb => {
          const option = document.createElement("option");
          option.value = kb.id;
          option.innerText = kb.title;
          // Save the docxUrl in a data attribute.
          option.setAttribute("data-docxurl", kb.docxUrl);
          kbSelect.appendChild(option);
        });
        kbSelect.disabled = false;
        // Set default selection.
        selectedDocxUrl = kbSelect.options[0].getAttribute("data-docxurl");
      }
      updateActionButtons();
    }
  
    // When the category selection changes, repopulate KB options.
    categorySelect.addEventListener("change", function() {
      populateKnowledgeBases(this.value);
    });
  
    // When the knowledge base selection changes, record the selected docxUrl.
    kbSelect.addEventListener("change", function() {
      const selectedOption = this.options[this.selectedIndex];
      selectedDocxUrl = selectedOption ? selectedOption.getAttribute("data-docxurl") : null;
      updateActionButtons();
    });
  
    /* -------------------------------
       Enable/Disable Action Buttons Based on Selection
    ---------------------------------*/
    const injectPromptButton = container.querySelector("#injectPrompt");
    const copyPromptButton = container.querySelector("#copyPrompt");
  
    function updateActionButtons() {
      if (selectedDocxUrl) {
        injectPromptButton.disabled = false;
        copyPromptButton.disabled = false;
      } else {
        injectPromptButton.disabled = true;
        copyPromptButton.disabled = true;
      }
    }
  
    // Initialize by populating the KB for the default category.
    populateKnowledgeBases(categorySelect.value);
  
    /* -------------------------------
       Button Handlers: Inject and Copy Prompt
    ---------------------------------*/
    injectPromptButton.addEventListener("click", function() {
      if (!selectedDocxUrl) { 
        alert("Please select a knowledge base!"); 
        return; 
      }
      // Disable the button to prevent multiple clicks.
      this.disabled = true;
      ensureDependencies()
        .then(() => parseDocxToMarkdown(selectedDocxUrl))
        .then(markdown => {
          window.injectedContent = markdown;
          I(); // call the injection function from the provided snippet.
        })
        .catch(error => {
          console.error(error);
          alert("Error processing the DOCX file: " + error.message);
        })
        .finally(() => {
          injectPromptButton.disabled = false;
        });
    });
  
    copyPromptButton.addEventListener("click", function() {
      if (!selectedDocxUrl) { 
        alert("Please select a knowledge base!"); 
        return; 
      }
      this.disabled = true;
      ensureDependencies()
        .then(() => parseDocxToMarkdown(selectedDocxUrl))
        .then(markdown => {
          navigator.clipboard.writeText(markdown)
            .then(() => alert("Prompt copied to clipboard!"))
            .catch(err => {
              console.error(err);
              alert("Failed to copy prompt to clipboard.");
            });
        })
        .catch(error => {
          console.error(error);
          alert("Error processing the DOCX file: " + error.message);
        })
        .finally(() => {
          copyPromptButton.disabled = false;
        });
    });
  
    /* -------------------------------
       Extra Controls: Toggle Panel, Theme Toggle, Close Button
    ---------------------------------*/
    const toggleButton = container.querySelector("#togglePanel");
    const themeButton = container.querySelector("#themeToggle");
    const closeButton = container.querySelector("#closePanel");
  
    // Toggle the visibility of the panel's contents.
    toggleButton.addEventListener("click", function() {
      const children = Array.from(container.children).filter(child => child.id !== "togglePanel" && child.id !== "themeToggle" && child.id !== "closePanel");
      children.forEach(child => {
        child.style.display = (child.style.display === "none" ? "" : "none");
      });
    });
  
    // Simple theme toggle: Flip background and text color.
    themeButton.addEventListener("click", function() {
      if (container.style.background === "rgb(40, 40, 40)") {
        container.style.background = "#fff";
        container.style.color = "#000";
      } else {
        container.style.background = "rgb(40, 40, 40)";
        container.style.color = "#fff";
      }
    });
  
    // Close button: Remove the bookmarklet panel from the DOM.
    closeButton.addEventListener("click", function() {
      container.remove();
    });
  
    // OPTIONAL: Add some basic dragging functionality if you need it.
    // (Not required but feel free to extend if needed.)
    
    console.log("llmPrimer_bkm_base_v1.0.js loaded successfully.");
  })();
  