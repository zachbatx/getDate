// llmPrimer_bkm_base_v1.0.js
javascript: (function() {
    const k = {}
    , s = {
        default: "position:fixed;top:20px;right:20px;padding:15px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;"
        , fullHeight: "position:absolute;top:0;right:0;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;height:100vh;margin:0;"
    }
    , t = {
        light: {
            bg: "white"
            , text: "#000"
            , border: "#ccc"
        }
        , dark: {
            bg: "#222"
            , text: "#fff"
            , border: "#444"
        }
    };
    let c = null
    , currentStyle = "default"
    , currentTheme = "light"
    , currentKbData = null;
    const D = !0
    , addThemeStyles = () => {
        if (!document.getElementById("kb-theme-styles")) {
            const t = document.createElement("style");
            t.id = "kb-theme-styles", t.textContent = ".kb-light-theme{background-color:white!important;color:#000!important}.kb-light-theme select{background-color:white!important;color:#000!important;border-color:#ccc!important}.kb-dark-theme{background-color:#222!important;color:#fff!important}.kb-dark-theme select{background-color:#222!important;color:#fff!important;border-color:#444!important}#generate-btn{background-color:#49A74C!important;color:white!important}#copy-btn{background-color:#0B78D0!important;color:white!important}#close-btn,#style-toggle,#theme-toggle{background-color:transparent!important}", document.head.appendChild(t)
        }
    }
    , l = (m, t) => {
        D && (t === "error" ? console.error(`[KB Generator] ${m}`) : console.log(`[KB Generator] ${m}`))
    }
    , loadKbData = () => {
        const S = document.getElementById("load-status");
        S && (S.textContent = `Loading KB Data...`, S.style.color = "orange");
        const script = document.createElement('script');
        script.src = 'llmPrimer_bkm_kbLoader_v1.0.js';
        script.onload = () => {
            S && (S.textContent = `KB Data Loaded`, S.style.color = "green");
            populateCategoryDropdown();
        };
        script.onerror = () => {
            S && (S.textContent = `Error loading KB Data`, S.style.color = "red");
            alert('Failed to load llmPrimer_bkm_kbLoader_v1.0.js. Please ensure it is accessible.');
        };
        document.head.appendChild(script);
    }
    , populateCategoryDropdown = () => {
        const categorySelect = document.querySelector('.categorySelect');
        if (!window.kbCategory || !categorySelect) {
            l("kbCategory data or categorySelect dropdown not found", "error");
            return;
        }
        window.kbCategory.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.title;
            categorySelect.appendChild(option);
        });
        categorySelect.value = window.kbCategory[0].id; // Set default to first category
        populateKnowledgeBaseDropdown(window.kbCategory[0].id);
        categorySelect.addEventListener('change', (event) => {
            const categoryId = event.target.value;
            populateKnowledgeBaseDropdown(categoryId);
        });
    }
    , populateKnowledgeBaseDropdown = (categoryId) => {
        const kbSelect = document.querySelector('.knowledgeBaseSelect');
        if (!window.kbDomain || !kbSelect) {
            l("kbDomain data or knowledgeBaseSelect dropdown not found", "error");
            return;
        }
        kbSelect.innerHTML = ''; // Clear existing options
        const filteredKbDomains = window.kbDomain.filter(kb => kb.category === categoryId);
        if (filteredKbDomains.length === 0) {
            const option = document.createElement('option');
            option.textContent = 'No Knowledge Bases in this category';
            kbSelect.appendChild(option);
            kbSelect.disabled = true;
            document.getElementById("generate-btn").disabled = true;
            document.getElementById("copy-btn").disabled = true;
            currentKbData = null;
            return;
        }
        kbSelect.disabled = false;
        document.getElementById("generate-btn").disabled = false;
        document.getElementById("copy-btn").disabled = false;

        filteredKbDomains.forEach(kb => {
            const option = document.createElement('option');
            option.value = kb.id;
            option.textContent = kb.title;
            option.dataset.docxUrl = kb.docxUrl; // Store docxUrl in dataset
            kbSelect.appendChild(option);
        });
        kbSelect.value = filteredKbDomains[0].id; // Set default to first KB in category
        currentKbData = filteredKbDomains[0]; // Set initial kb data
        kbSelect.addEventListener('change', (event) => {
            const selectedKbId = event.target.value;
            currentKbData = filteredKbDomains.find(kb => kb.id === selectedKbId);
        });
    }
    , fetchDocxAndConvertToMarkdown = async (docxUrl) => {
        if (!docxUrl) {
            alert("No DOCX URL provided.");
            return null;
        }
        document.getElementById("load-status").textContent = "Fetching and processing DOCX...";
        document.getElementById("load-status").style.color = "orange";

        try {
            const response = await fetch(docxUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const buffer = await response.arrayBuffer();

            // Assuming mammoth and turndown are included in the bookmarklet (see notes below on including libraries)

            const mammothResult = await mammoth.convertToHtml({ arrayBuffer: buffer });
            const html = mammothResult.value;
            const turndownService = new TurndownService();
            const markdown = turndownService.turndown(html);

            document.getElementById("load-status").textContent = "DOCX processed and converted to Markdown.";
            document.getElementById("load-status").style.color = "green";
            return markdown;

        } catch (error) {
            console.error("Error processing DOCX:", error);
            document.getElementById("load-status").textContent = "Error processing DOCX.";
            document.getElementById("load-status").style.color = "red";
            alert(`Failed to process DOCX: ${error.message}`);
            return null;
        }
    }

    , G = async () => {
        if (!currentKbData || !currentKbData.docxUrl) {
            return "Error: No knowledge base selected or DOCX URL missing.";
        }
        return await fetchDocxAndConvertToMarkdown(currentKbData.docxUrl);
    }
    , I = async () => {
        const e = await G();
        if (!e) return; // G() might return null if there was an error

        const t = document.querySelector("div#prompt-textarea p.placeholder");
        t ? (t.innerText = e, t.dispatchEvent(new Event("input", {
            bubbles: !0
        })), setTimeout(() => {
            const e = document.querySelector('button[data-testid="send-button"]');
            e && e.click(), R()
        }
        , 100)) : alert("Target placeholder not found!")
    }
    , J = async () => {
        const e = await G();
        if (!e) return; // G() might return null if there was an error
        try {
            await navigator.clipboard.writeText(e);
            const btn = document.getElementById("copy-btn")
            , originalText = btn.innerText;
            btn.innerText = "Copied!", btn.style.backgroundColor = "#4CAF50", setTimeout(() => {
                btn.innerText = originalText, btn.style.backgroundColor = "#0B78D0"
            }
            , 1500)
        } catch (e) {
            alert(`Copy failed: ${e}`)
        }
    }
    , R = () => {
        document.body.removeChild(p), document.removeEventListener("keydown", Y)
    }
    , Y = e => {
        e.key === "Escape" && R()
    }
    , p = document.createElement("div");
    window.KnowledgeBaseLoader = {
        registerBase: () => {} // Placeholder function, not needed for this version
    };

    addThemeStyles();
    p.id = "kb-prompt-generator";
    p.style.cssText = s.default;
    p.className = "kb-light-theme";
    p.innerHTML = `
        <h2 style="color:#147CBD;margin:28px 0 10px 0;font-size:1.2em">Prompt Generator</h2>
        <div style="display:flex;justify-content:end;position:absolute;top:12px;float:right;right:30px;">
            <button id="style-toggle" style="margin:0px 3px;background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Panel Style" aria-label="Toggle Panel Style"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg></button>
            <button id="theme-toggle" style="background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Theme" aria-label="Toggle Theme"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></button>
        </div>
        <div id="load-status" style="margin-bottom:10px;padding:5px;background:#f0f0f0;border-radius:3px;font-size:12px;color:orange;">Loading KB data...</div>

        <label style="display:block;margin-bottom:5px;font-size:14px">Select Category:</label>
        <select class="categorySelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc">
        </select>

        <label style="display:block;margin-bottom:5px;font-size:14px">Select Knowledge Base:</label>
        <select class="knowledgeBaseSelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc" disabled>
        </select>


        <div style="display:flex;gap:10px;margin-bottom:10px">
            <button id="generate-btn" style="flex:1;padding:8px;background:#49A74C;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold" disabled>Inject Prompt</button>
            <button id="copy-btn" style="flex:1;padding:8px;background:#0B78D0;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold" disabled>Copy Prompt</button>
        </div>
        <button id="close-btn" aria-label="close prompt generator" style="position:absolute;top:10px;right:10px;background-color:transparent;border:none;cursor:pointer;font-size:16px;font-weight:bold">✕</button>
    `;
    document.body.appendChild(p);
    document.getElementById("close-btn").addEventListener("click", R);
    document.getElementById("generate-btn").addEventListener("click", I);
    document.getElementById("copy-btn").addEventListener("click", J);

    document.addEventListener("keydown", Y);
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
        const t = p.className;
        p.style.cssText = s[currentStyle];
        p.className = t;
    });
    document.getElementById("theme-toggle").addEventListener("click", function() {
        if (currentTheme === "light") {
            currentTheme = "dark";
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
            this.title = "Switch to Light Theme";
            p.className = "kb-dark-theme";
        } else {
            currentTheme = "light";
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            this.title = "Switch to Dark Theme";
            p.className = "kb-light-theme";
        }
    });

    loadKbData(); // Load kb data and populate dropdowns on bookmarklet init

})();

// Add mammoth and turndown libraries here directly for bookmarklet to be self-contained.
// In a production environment, consider dynamically loading these libraries or using a bundler.

// --- mammoth.browser.js content START ---
// ... (Insert the content of mammoth.browser.js here) ...
// Get mammoth.browser.js from: https://github.com/mwilliamson/mammoth.js/releases
// --- mammoth.browser.js content END ---

// --- turndown.js content START ---
// ... (Insert the content of turndown.js here) ...
// Get turndown.js from: https://unpkg.com/turndown/dist/turndown.js
// --- turndown.js content END ---