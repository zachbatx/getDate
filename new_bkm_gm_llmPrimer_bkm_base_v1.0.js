--- START OF FILE llmPrimer_bkm_base_v1.0.js ---
javascript : (function() {
    const s = {
        default : "position:fixed;top:20px;right:20px;padding:15px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;",
        fullHeight : "position:absolute;top:0;right:0;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;height:100vh;margin:0;"
    }
,
    t = {
        light : {
            bg : "white",
            text : "#000",
            border : "#ccc"
        }
,
        dark : {
            bg : "#222",
            text : "#fff",
            border : "#444"
        }
    }
,
    D = ! 0,
    r = {
    }
;
    let c = null,
    S = "default",
    T = "light",
    p = document.createElement("div");
    const a = () => {
        if( ! document.getElementById("kb-theme-styles")) {
            const t = document.createElement("style");
            t.id = "kb-theme-styles", t.textContent = ".kb-light-theme{background-color:white!important;color:#000!important}.kb-light-theme select{background-color:white!important;color:#000!important;border-color:#ccc!important}.kb-dark-theme{background-color:#222!important;color:#fff!important}.kb-dark-theme select{background-color:#222!important;color:#fff!important;border-color:#444!important}#generate-btn{background-color:#49A74C!important;color:white!important}#copy-btn{background-color:#0B78D0!important;color:white!important}#close-btn,#style-toggle,#theme-toggle{background-color:transparent!important}", document.head.appendChild(t)
        }
    }
,
    l = (m, t) => {
        D && (t === "error" ? console.error(`[KB Generator] ${m}` : console.log(`[KB Generator] ${m}`))
    }
,
    g = (id, name, docxUrl, category) => {
        r[id] = {
            name,
            docxUrl,
            category
        }
;
    }
,
    F = async u  => new Promise(async(resolve, reject) => {
        l(`Attempting fetch for DOCX: ${u}`);
        const S = document.getElementById("load-status");
        S && (S.textContent = `Fetching DOCX: ${u}`, S.style.color = "orange");
        try{
            const r = await fetch(u);
            if( ! r.ok)throw new Error(`Network response was not ok: ${r.status}`);
            const docxBlob = await r.blob();
            l("DOCX fetched successfully");
            S && (S.textContent = `DOCX loaded`, S.style.color = "green"); // Removed URL from status for cleaner UI
            resolve(docxBlob)
        } catch(e) {
            l(`Fetch error: ${e.message}`, "error");
            S && (S.textContent = `Failed to load DOCX: ${e.message}`, S.style.color = "red");
            reject("Failed to load DOCX. The server might be down or the site may be blocking external requests.")
        }
    }
)
,
    K = async() => {
        const knowledgeBaseId = document.querySelector(".knowledgeBaseSelect").value;
        if( ! knowledgeBaseId || ! r[knowledgeBaseId]) return;

        const S = document.getElementById("load-status");
        const kb = r[knowledgeBaseId];
        S && (S.textContent = `Loading ${kb.name} data...`);
        try{
            const docxBlob = await F(kb.docxUrl);
            c = {
                docxBlob,
                name : kb.name,
                category : kb.category,
                generatePrompt : () => docxBlob
            };
            document.getElementById("generate-btn").disabled = false;
            document.getElementById("copy-btn").disabled = false;
            S && (S.textContent = `${kb.name} data loaded`, S.style.color = "green"); // Removed "successfully" for cleaner UI
        } catch(error) {
            P(`Failed to load ${kb.name} data. ${error}`)
        }
    }
,
    P = e  => {
        const S = document.getElementById("load-status");
        S && (S.textContent = e, S.style.color = "red");
        document.getElementById("generate-btn").disabled = ! 0;
        document.getElementById("copy-btn").disabled = ! 0;
        alert(`Loading Error: ${e}\n\nPlease try again or check if the website allows loading external files.`)
    }
,
    G = () => {
        if( ! c?.docxBlob)return"Error: No knowledge base loaded.";
        return c.docxBlob
    }
,
    I = () => {
        const docxBlob = G();
        if( ! (docxBlob instanceof Blob)) {
            alert("No knowledge base loaded or invalid data!");
            return
        }

        const t = document.querySelector("div#prompt-textarea p.placeholder");
        if (t) {
            t.innerText = docxBlob;
            t.dispatchEvent(new Event("input", { bubbles: !0 }));
            setTimeout(() => {
                const sendButton = document.querySelector('button[data-testid="send-button"]');
                if (sendButton) {
                    sendButton.click();
                    R();
                }
            }, 100);
        } else {
            alert("Target placeholder not found!");
        }
    }
,
    J = async() => {
        alert("Copy functionality is disabled for DOCX files. Please use the 'Inject Prompt' button to send the knowledge base directly to the LLM.")
    }
,
    R = () => {
        document.body.removeChild(p); document.removeEventListener("keydown", Y)
    }
,
    Y = e  => {
        e.key === "Escape" && R()
    }
;

    a(), p.id = "kb-prompt-generator", p.style.cssText = s.default, p.className = "kb-light-theme", p.innerHTML = '<h2 style="color:#147CBD;margin:28px 0 10px 0;font-size:1.2em">Prompt Generator</h2><div style="display:flex;justify-content:end;position:absolute;top:12px;float:right;right:30px;"><button id="style-toggle" style="margin:0px 3px;background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Panel Style" aria-label="Toggle Panel Style"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg></button><button id="theme-toggle" style="background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Theme" aria-label="Toggle Theme"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></button></div><div id="load-status" style="margin-bottom:10px;padding:5px;background:#f0f0f0;border-radius:3px;font-size:12px;color:orange;">Ready to load data...</div><label style="display:block;margin-bottom:5px;font-size:14px">Select Category:</label><select class="categorySelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc"></select><label style="display:block;margin-bottom:5px;font-size:14px">Select Knowledge Base:</label><select class="knowledgeBaseSelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc" disabled></select><div style="display:flex;gap:10px;margin-bottom:10px"><button id="generate-btn" style="flex:1;padding:8px;background:#49A74C;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold">Inject Prompt</button><button id="copy-btn" style="flex:1;padding:8px;background:#0B78D0;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold" disabled>Copy Prompt</button></div><button id="close-btn" aria-label="close prompt generator" style="position:absolute;top:10px;right:10px;background-color:transparent;border:none;cursor:pointer;font-size:16px;font-weight:bold">✕</button>', document.body.appendChild(p), document.getElementById("close-btn").addEventListener("click", R), document.getElementById("generate-btn").addEventListener("click", I), document.getElementById("copy-btn").addEventListener("click", J), document.addEventListener("keydown", Y), document.getElementById("generate-btn").disabled = ! 0, document.getElementById("copy-btn").disabled = ! 0, document.getElementById("style-toggle").addEventListener("click", function() {
        if(S === "default") {
            S = "fullHeight", this.innerHTML = "", this.title = "Switch to Floating Panel"
        } else {
            S = "default", this.innerHTML = "", this.title = "Switch to Full Height Sidebar"
        }
        const t = p.className; p.style.cssText = s[S], p.className = t
    }
)
,
    document.getElementById("theme-toggle").addEventListener("click", function() {
        if(T === "light") {
            T = "dark", this.innerHTML = "", this.title = "Switch to Light Theme", p.className = "kb-dark-theme"
        } else {
            T = "light", this.innerHTML = "", this.title = "Switch to Light Theme", p.className = "kb-light-theme"
        }
    }
);

    // kbLoader content directly injected here
    const kbCategories = [
        {
            id: 'designReview',
            title: 'Design Review Tools'
        },
        {
            id: 'research',
            title: 'Research Tools'
        },
        {
            id: 'accessibility',
            title: 'Accessibility Tools'
        }
    ];

    const kbDomain = [
        {
            id: 'usabilityHeuristics',
            title: 'Usability Heuristics',
            docxUrl: 'https://your-confluence.domain/path/to/usabilityHeuristics.docx',
            category: 'designReview'
        },
        {
            id: 'accessibilityGuidelines',
            title: 'Accessibility Guidelines',
            docxUrl: 'https://your-confluence.domain/path/to/accessibilityGuidelines.docx',
            category: 'accessibility'
        },
        {
            id: 'researchMethods',
            title: 'Research Methods',
            docxUrl: 'https://your-confluence.domain/path/to/researchMethods.docx',
            category: 'research'
        }
    ];


    const categorySelect = document.querySelector(".categorySelect");
    const knowledgeBaseSelect = document.querySelector(".knowledgeBaseSelect");

    // Populate Category Dropdown
    kbCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.title;
        categorySelect.appendChild(option);
    });

    // Function to populate Knowledge Base Dropdown based on selected category
    const populateKnowledgeBases = (selectedCategory) => {
        knowledgeBaseSelect.innerHTML = '<option value="">Select Knowledge Base</option>'; // Reset options
        const filteredKnowledgeBases = kbDomain.filter(kb => kb.category === selectedCategory);
        filteredKnowledgeBases.forEach(kb => {
            const option = document.createElement("option");
            option.value = kb.id;
            option.textContent = kb.title;
            knowledgeBaseSelect.appendChild(option);
        });
        knowledgeBaseSelect.disabled = false; // Enable KB dropdown once category is selected
    };

    // Event listener for Category Dropdown change
    categorySelect.addEventListener("change", (event) => {
        const selectedCategory = event.target.value;
        populateKnowledgeBases(selectedCategory);
    });

    // Event listener for Knowledge Base Dropdown change to enable buttons (using change on knowledgeBaseSelect)
    knowledgeBaseSelect.addEventListener("change", () => {
        if (knowledgeBaseSelect.value) {
            document.getElementById("generate-btn").disabled = false;
            document.getElementById("copy-btn").disabled = false;
            K(); // Automatically try to load the KB data when selected. You can remove this line if you only want to load on button click.
        } else {
            document.getElementById("generate-btn").disabled = true;
            document.getElementById("copy-btn").disabled = true;
        }
    });

    // Initialize Knowledge Base list for the default category (first category in kbCategories)
    if (kbCategories.length > 0) {
        populateKnowledgeBases(kbCategories[0].id);
        categorySelect.value = kbCategories[0].id; // Set default selected category
    }


    // Override the registerBase function - not needed anymore as kb data is directly in this file.
    window.KnowledgeBaseLoader = {
        registerBase : () => {
            console.warn("KnowledgeBaseLoader.registerBase is not used in this version. Knowledge bases are loaded from kbCategories and kbDomain within the bookmarklet code.");
        }
    };


})();
--- END OF FILE llmPrimer_bkm_base_v1.0.js ---
--- START OF FILE llmPrimer_bkm_kbLoader_v1.0.js ---
const kbCategories = [
    {
        id: 'designReview',
        title: 'Design Review Tools'
    },
    {
        id: 'research',
        title: 'Research Tools'
    },
    {
        id: 'accessibility',
        title: 'Accessibility Tools'
    }
    // Additional categories can be added here
    // Ensure that the id matches the one in kbDomain to filter the knowledge bases correctly
    // Ensure that the id is unique for each category
    // Ensure that the title is a descriptive name for the category
];


const kbDomain = [
    {
        id: 'usabilityHeuristics',
        title: 'Usability Heuristics',
        docxUrl: 'https://your-confluence.domain/path/to/usabilityHeuristics.docx',
        category: 'designReview'
    },
    {
        id: 'accessibilityGuidelines',
        title: 'Accessibility Guidelines',
        docxUrl: 'https://your-confluence.domain/path/to/accessibilityGuidelines.docx',
        category: 'accessibility'
    },
    {
        id: 'researchMethods',
        title: 'Research Methods',
        docxUrl: 'https://your-confluence.domain/path/to/researchMethods.docx',
        category: 'research'
    }

    // Additional knowledge bases can be added here
    // Ensure that the category matches the one in kbCategories
    // to filter the knowledge bases correctly
    // Ensure that the id is unique for each knowledge base
    // Ensure that the docxUrl is a valid URL to the docx file
    // Ensure that the title is a descriptive name for the knowledge base
];
--- END OF FILE llmPrimer_bkm_kbLoader_v1.0.js ---