javascript: (function() {
    const k = {};
    
    const s = {
        default: "position:fixed;top:20px;right:20px;padding:15px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;",
        fullHeight: "position:absolute;top:0;right:0;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;height:100vh;margin:0;"
    };
    
    const t = {
        light: {
            bg: "white",
            text: "#000",
            border: "#ccc"
        },
        dark: {
            bg: "#222",
            text: "#fff",
            border: "#444"
        }
    };
    
    let selectedDocxUrl = null;
    let currentStyle = "default";
    let currentTheme = "light";
    const D = true; // Debug mode
    
    // Function to add theme styles to the document
    const addThemeStyles = () => {
        if (!document.getElementById("kb-theme-styles")) {
            const t = document.createElement("style");
            t.id = "kb-theme-styles";
            t.textContent = ".kb-light-theme{background-color:white!important;color:#000!important}.kb-light-theme select{background-color:white!important;color:#000!important;border-color:#ccc!important}.kb-dark-theme{background-color:#222!important;color:#fff!important}.kb-dark-theme select{background-color:#222!important;color:#fff!important;border-color:#444!important}#inject-btn{background-color:#49A74C!important;color:white!important}#copy-btn{background-color:#0B78D0!important;color:white!important}#close-btn,#style-toggle,#theme-toggle{background-color:transparent!important}";
            document.head.appendChild(t);
        }
    };
    
    // Logging function
    const l = (m, t) => {
        D && (t === "error" ? console.error(`[LLM Primer] ${m}`) : console.log(`[LLM Primer] ${m}`));
    };
    
    // Load script function
    const L = (u, C, E) => {
        l(`Attempting to load: ${u}`);
        const S = document.getElementById("load-status");
        S && (S.textContent = `Loading: ${u}`, S.style.color = "orange");
        
        const T = document.createElement("script");
        T.src = u;
        const O = setTimeout(() => {
            l(`Script load timeout, trying alternative method: ${u}`, "error");
            F(u, C, E);
        }, 3000);
        
        T.onload = () => {
            clearTimeout(O);
            l(`Script loaded successfully: ${u}`);
            S && (S.textContent = `Loaded: ${u}`, S.style.color = "green");
            setTimeout(() => C(), 100);
        };
        
        T.onerror = e => {
            clearTimeout(O);
            l(`Error loading script via standard method: ${u}`, "error");
            S && (S.textContent = "Standard load failed, trying fetch method...", S.style.color = "red");
            F(u, C, E);
        };
        
        document.head.appendChild(T);
    };
    
    // Fetch and evaluate script function
    const F = async(u, C, E) => {
        l(`Attempting fetch method for: ${u}`);
        const S = document.getElementById("load-status");
        S && (S.textContent = `Trying fetch method: ${u}`, S.style.color = "orange");
        
        try {
            const r = await fetch(u);
            if (!r.ok) throw new Error(`Network response was not ok: ${r.status}`);
            const t = await r.text();
            l("Script fetched, evaluating content...");
            
            try {
                new Function(t)();
                l("Script evaluated successfully");
                S && (S.textContent = `Script loaded via fetch: ${u}`, S.style.color = "green");
                setTimeout(() => C(), 100);
            } catch(e) {
                l(`Error evaluating script: ${e.message}`, "error");
                S && (S.textContent = `Error evaluating script: ${e.message}`, S.style.color = "red");
                E(`Failed to evaluate the loaded script. Error: ${e.message}`);
            }
        } catch(e) {
            l(`Fetch error: ${e.message}`, "error");
            S && (S.textContent = `Failed to load script: ${e.message}`, S.style.color = "red");
            E("Failed to load script. The server might be down or the site may be blocking external requests.");
        }
    };
    
    // Function to load mammoth.js for DOCX parsing
    const loadMammoth = (callback, error) => {
        L("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.0/mammoth.browser.min.js", callback, error);
    };
    
    // Function to load KB Loader script
    const loadKBLoader = (callback, error) => {
        L("llmPrimer_bkm_kbLoader_v1.0.js", callback, error);
    };
    
    // Function to handle errors
    const P = e => {
        const S = document.getElementById("load-status");
        S && (S.textContent = e, S.style.color = "red");
        document.getElementById("inject-btn").disabled = true;
        document.getElementById("copy-btn").disabled = true;
        
        const categorySelect = document.getElementById("category-select");
        const knowledgeBaseSelect = document.getElementById("kb-select");
        
        categorySelect.innerHTML = '<option value="">Error loading data</option>';
        categorySelect.disabled = true;
        knowledgeBaseSelect.innerHTML = '<option value="">Error loading data</option>';
        knowledgeBaseSelect.disabled = true;
        
        alert(`Loading Error: ${e}\n\nPlease try again or check if the website allows loading external scripts.`);
    };
    
    // Function to populate category dropdown
    const populateCategories = () => {
        const categorySelect = document.getElementById("category-select");
        categorySelect.innerHTML = "";
        
        if (!window.kbLoader?.categories) {
            l("Error: kbLoader or kbLoader.categories is undefined", "error");
            categorySelect.innerHTML = '<option value="">Error loading categories</option>';
            categorySelect.disabled = true;
            return;
        }
        
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a category...";
        categorySelect.appendChild(defaultOption);
        
        // Add categories from kbLoader
        for (const category of window.kbLoader.categories) {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.title;
            categorySelect.appendChild(option);
        }
        
        // Enable the category dropdown
        categorySelect.disabled = false;
        
        // Select the first category by default
        if (window.kbLoader.categories.length > 0) {
            categorySelect.value = window.kbLoader.categories[0].id;
            populateKnowledgeBases(categorySelect.value);
        }
    };
    
    // Function to populate knowledge base dropdown based on selected category
    const populateKnowledgeBases = (categoryId) => {
        const knowledgeBaseSelect = document.getElementById("kb-select");
        knowledgeBaseSelect.innerHTML = "";
        
        if (!window.kbLoader?.domains) {
            l("Error: kbLoader or kbLoader.domains is undefined", "error");
            knowledgeBaseSelect.innerHTML = '<option value="">Error loading knowledge bases</option>';
            knowledgeBaseSelect.disabled = true;
            return;
        }
        
        if (!categoryId) {
            // If no category is selected, disable the knowledge base dropdown
            knowledgeBaseSelect.innerHTML = '<option value="">Select a category first</option>';
            knowledgeBaseSelect.disabled = true;
            document.getElementById("inject-btn").disabled = true;
            document.getElementById("copy-btn").disabled = true;
            return;
        }
        
        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a knowledge base...";
        knowledgeBaseSelect.appendChild(defaultOption);
        
        // Filter knowledge bases by category
        const filteredKBs = window.kbLoader.domains.filter(kb => kb.category === categoryId);
        
        if (filteredKBs.length === 0) {
            knowledgeBaseSelect.innerHTML = '<option value="">No knowledge bases for this category</option>';
            knowledgeBaseSelect.disabled = true;
            document.getElementById("inject-btn").disabled = true;
            document.getElementById("copy-btn").disabled = true;
            return;
        }
        
        // Add filtered knowledge bases
        for (const kb of filteredKBs) {
            const option = document.createElement("option");
            option.value = kb.id;
            option.textContent = kb.title;
            knowledgeBaseSelect.appendChild(option);
        }
        
        // Enable the knowledge base dropdown
        knowledgeBaseSelect.disabled = false;
        
        // Select the first knowledge base by default
        if (filteredKBs.length > 0) {
            knowledgeBaseSelect.value = filteredKBs[0].id;
            handleKBSelection();
        }
    };
    
    // Function to handle knowledge base selection
    const handleKBSelection = () => {
        const kbSelect = document.getElementById("kb-select");
        const kbId = kbSelect.value;
        
        if (!kbId) {
            document.getElementById("inject-btn").disabled = true;
            document.getElementById("copy-btn").disabled = true;
            selectedDocxUrl = null;
            return;
        }
        
        // Find the selected knowledge base
        const selectedKB = window.kbLoader.domains.find(kb => kb.id === kbId);
        if (!selectedKB) {
            l(`Error: Knowledge base with ID ${kbId} not found`, "error");
            document.getElementById("inject-btn").disabled = true;
            document.getElementById("copy-btn").disabled = true;
            selectedDocxUrl = null;
            return;
        }
        
        // Set the selected docx URL
        selectedDocxUrl = selectedKB.docxUrl;
        
        // Enable the inject and copy buttons
        document.getElementById("inject-btn").disabled = false;
        document.getElementById("copy-btn").disabled = false;
    };
    
    // Function to fetch and parse DOCX file
    const fetchAndParseDocx = async (url) => {
        l(`Fetching DOCX from: ${url}`);
        const S = document.getElementById("load-status");
        S && (S.textContent = `Fetching document: ${url}`, S.style.color = "orange");
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
            
            const arrayBuffer = await response.arrayBuffer();
            l("DOCX fetched, parsing content...");
            S && (S.textContent = "Parsing document content...", S.style.color = "orange");
            
            if (!window.mammoth) {
                throw new Error("Mammoth.js not loaded. Cannot parse DOCX.");
            }
            
            // Parse DOCX to HTML using mammoth.js
            const result = await window.mammoth.convertToHtml({ arrayBuffer });
            const html = result.value;
            
            // Convert HTML to Markdown
            const markdown = htmlToMarkdown(html);
            
            l("DOCX parsed successfully");
            S && (S.textContent = "Document parsed successfully", S.style.color = "green");
            
            return markdown;
        } catch(e) {
            l(`Error fetching or parsing DOCX: ${e.message}`, "error");
            S && (S.textContent = `Error: ${e.message}`, S.style.color = "red");
            throw e;
        }
    };
    
    // Simple HTML to Markdown converter
    const htmlToMarkdown = (html) => {
        // Create a temporary div to parse the HTML
        const div = document.createElement("div");
        div.innerHTML = html;
        
        // Function to recursively convert HTML elements to Markdown
        const convertElement = (element, depth = 0) => {
            let markdown = "";
            
            // Process node based on its type
            if (element.nodeType === 3) { // Text node
                return element.textContent;
            }
            
            if (element.nodeType !== 1) { // Not an element node
                return "";
            }
            
            const tagName = element.tagName.toLowerCase();
            
            // Process different HTML elements
            switch (tagName) {
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                    const level = parseInt(tagName.charAt(1));
                    const prefix = "#".repeat(level);
                    markdown += `${prefix} ${element.textContent.trim()}\n\n`;
                    break;
                    
                case "p":
                    for (const child of element.childNodes) {
                        markdown += convertElement(child, depth);
                    }
                    markdown += "\n\n";
                    break;
                    
                case "ul":
                    for (const li of element.querySelectorAll("li")) {
                        markdown += `- ${li.textContent.trim()}\n`;
                    }
                    markdown += "\n";
                    break;
                    
                case "ol":
                    let i = 1;
                    for (const li of element.querySelectorAll("li")) {
                        markdown += `${i}. ${li.textContent.trim()}\n`;
                        i++;
                    }
                    markdown += "\n";
                    break;
                    
                case "a":
                    const href = element.getAttribute("href");
                    markdown += `[${element.textContent}](${href})`;
                    break;
                    
                case "strong":
                case "b":
                    markdown += `**${element.textContent}**`;
                    break;
                    
                case "em":
                case "i":
                    markdown += `*${element.textContent}*`;
                    break;
                    
                case "code":
                    markdown += `\`${element.textContent}\``;
                    break;
                    
                case "pre":
                    markdown += `\`\`\`\n${element.textContent}\n\`\`\`\n\n`;
                    break;
                    
                case "blockquote":
                    for (const child of element.childNodes) {
                        const childContent = convertElement(child, depth + 1);
                        markdown += childContent.split("\n").map(line => `> ${line}`).join("\n");
                    }
                    markdown += "\n\n";
                    break;
                    
                case "br":
                    markdown += "\n";
                    break;
                    
                case "hr":
                    markdown += "---\n\n";
                    break;
                    
                case "img":
                    const src = element.getAttribute("src");
                    const alt = element.getAttribute("alt") || "";
                    markdown += `![${alt}](${src})`;
                    break;
                    
                case "table":
                    // Convert table to markdown
                    const rows = element.querySelectorAll("tr");
                    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                        const cells = rows[rowIndex].querySelectorAll("td, th");
                        const rowContent = [];
                        
                        for (const cell of cells) {
                            rowContent.push(cell.textContent.trim());
                        }
                        
                        markdown += `| ${rowContent.join(" | ")} |\n`;
                        
                        // Add separator row after header
                        if (rowIndex === 0) {
                            markdown += `|${rowContent.map(() => " --- ").join("|")}|\n`;
                        }
                    }
                    markdown += "\n";
                    break;
                    
                default:
                    // For other elements, process their children
                    for (const child of element.childNodes) {
                        markdown += convertElement(child, depth);
                    }
            }
            
            return markdown;
        };
        
        // Start conversion
        return convertElement(div).trim();
    };
    
    // Function to inject markdown into the LLM
    const injectMarkdown = (markdown) => {
        const inputField = document.querySelector("div#prompt-textarea p.placeholder");
        if (!inputField) {
            alert("Target placeholder not found!");
            return;
        }
        
        // Inject the markdown into the input field
        inputField.innerText = markdown;
        inputField.dispatchEvent(new Event("input", {
            bubbles: true
        }));
        
        // Submit the input
        setTimeout(() => {
            const sendButton = document.querySelector('button[data-testid="send-button"]');
            if (sendButton) {
                sendButton.click();
                closePanel();
            } else {
                alert("Send button not found!");
            }
        }, 100);
    };
    
    // Function to copy markdown to clipboard
    const copyMarkdown = async (markdown) => {
        try {
            await navigator.clipboard.writeText(markdown);
            
            const btn = document.getElementById("copy-btn");
            const originalText = btn.innerText;
            btn.innerText = "Copied!";
            btn.style.backgroundColor = "#4CAF50";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "#0B78D0";
            }, 1500);
        } catch(e) {
            alert(`Copy failed: ${e}`);
        }
    };
    
    // Function to handle inject button click
    const handleInject = async () => {
        if (!selectedDocxUrl) {
            alert("Please select a knowledge base first!");
            return;
        }
        
        try {
            const markdown = await fetchAndParseDocx(selectedDocxUrl);
            injectMarkdown(markdown);
        } catch(e) {
            alert(`Failed to process document: ${e.message}`);
        }
    };
    
    // Function to handle copy button click
    const handleCopy = async () => {
        if (!selectedDocxUrl) {
            alert("Please select a knowledge base first!");
            return;
        }
        
        try {
            const markdown = await fetchAndParseDocx(selectedDocxUrl);
            copyMarkdown(markdown);
        } catch(e) {
            alert(`Failed to process document: ${e.message}`);
        }
    };
    
    // Function to close the panel
    const closePanel = () => {
        document.body.removeChild(panel);
        document.removeEventListener("keydown", handleKeyDown);
    };
    
    // Function to handle key down events
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            closePanel();
        }
    };
    
    // Function to initialize the panel with required scripts
    const initPanel = () => {
        const S = document.getElementById("load-status");
        S && (S.textContent = "Loading required scripts...", S.style.color = "orange");
        
        // Load mammoth.js for DOCX parsing
        loadMammoth(
            () => {
                l("Mammoth.js loaded successfully");
                
                // Load KB Loader script
                loadKBLoader(
                    () => {
                        l("KB Loader script loaded successfully");
                        S && (S.textContent = "All scripts loaded successfully", S.style.color = "green");
                        
                        // Populate categories dropdown
                        populateCategories();
                    },
                    (error) => P(`Failed to load KB Loader script: ${error}`)
                );
            },
            (error) => P(`Failed to load Mammoth.js: ${error}`)
        );
    };
    
    // Create the panel element
    const panel = document.createElement("div");
    
    // Add theme styles
    addThemeStyles();
    
    // Configure panel
    panel.id = "llm-primer-panel";
    panel.style.cssText = s.default;
    panel.className = "kb-light-theme";
    
    // Set panel HTML
    panel.innerHTML = `
        <h2 style="color:#147CBD;margin:28px 0 10px 0;font-size:1.2em">LLM Primer</h2>
        <div style="display:flex;justify-content:end;position:absolute;top:12px;float:right;right:30px;">
            <button id="style-toggle" style="margin:0px 3px;background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Panel Style" aria-label="Toggle Panel Style">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                </svg>
            </button>
            <button id="theme-toggle" style="background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Theme" aria-label="Toggle Theme">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            </button>
        </div>
        <div id="load-status" style="margin-bottom:10px;padding:5px;background:#f0f0f0;border-radius:3px;font-size:12px;color:orange;">Ready to load data...</div>
        
        <label style="display:block;margin-bottom:5px;font-size:14px">Select Category:</label>
        <select id="category-select" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc" disabled>
            <option value="">Loading categories...</option>
        </select>
        
        <label style="display:block;margin-bottom:5px;font-size:14px">Select Knowledge Base:</label>
        <select id="kb-select" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc" disabled>
            <option value="">Select a category first</option>
        </select>
        
        <div style="display:flex;gap:10px;margin-bottom:10px">
            <button id="inject-btn" style="flex:1;padding:8px;background:#49A74C;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold" disabled>Inject Prompt</button>
            <button id="copy-btn" style="flex:1;padding:8px;background:#0B78D0;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold" disabled>Copy Prompt</button>
        </div>
        
        <button id="close-btn" aria-label="close prompt generator" style="position:absolute;top:10px;right:10px;background-color:transparent;border:none;cursor:pointer;font-size:16px;font-weight:bold">✕</button>
    `;
    
    // Add panel to the document
    document.body.appendChild(panel);
    
    // Set up event listeners
    document.getElementById("close-btn").addEventListener("click", closePanel);
    document.getElementById("inject-btn").addEventListener("click", handleInject);
    document.getElementById("copy-btn").addEventListener("click", handleCopy);
    document.getElementById("category-select").addEventListener("change", (e) => {
        populateKnowledgeBases(e.target.value);
    });
    document.getElementById("kb-select").addEventListener("change", handleKBSelection);
    document.addEventListener("keydown", handleKeyDown);
    
    // Set up style toggle
    document.getElementById("style-toggle").addEventListener("click", function() {
        if (currentStyle === "default") {
            currentStyle = "fullHeight";
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>';
            this.title = "Switch to Floating Panel";
        } else {
            currentStyle = "default";
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>';
            this.title = "Switch to Full Height Sidebar";
        }
        
        const t = panel.className;
        panel.style.cssText = s[currentStyle];
        panel.className = t;
    });
    
    // Set up theme toggle
    document.getElementById("theme-toggle").addEventListener("click", function() {
        if (currentTheme === "light") {
            currentTheme = "dark";
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
            this.title = "Switch to Light Theme";
            panel.className = "kb-dark-theme";
        } else {
            currentTheme = "light";
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            this.title = "Switch to Dark Theme";
            panel.className = "kb-light-theme";
        }
    });
    
    // Initialize the panel
    initPanel();
})();