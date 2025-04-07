javascript : (function() {
    const s = {
        default : "position:fixed;top:20px;right:20px;padding:15px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;",
        fullHeight : "position:absolute;top:0;right:0;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.3);z-index:10000;width:300px;font-family:Arial,sans-serif;height:100vh;margin:0;"
    },
    t = {
        light : {
            bg : "white",
            text : "#000",
            border : "#ccc"
        },
        dark : {
            bg : "#222",
            text : "#fff",
            border : "#444"
        }
    },
    D = ! 0,
    r = {};
    
    let c = null,
    S = "default",
    T = "light",
    p = document.createElement("div");
    
    const a = () => {
        if(!document.getElementById("kb-theme-styles")) {
            const t = document.createElement("style");
            t.id = "kb-theme-styles", t.textContent = ".kb-light-theme{background-color:white!important;color:#000!important}.kb-light-theme select{background-color:white!important;color:#000!important;border-color:#ccc!important}.kb-dark-theme{background-color:#222!important;color:#fff!important}.kb-dark-theme select{background-color:#222!important;color:#fff!important;border-color:#444!important}#generate-btn{background-color:#49A74C!important;color:white!important}#copy-btn{background-color:#0B78D0!important;color:white!important}#close-btn,#style-toggle,#theme-toggle{background-color:transparent!important}", document.head.appendChild(t)
        }
    },
    
    l = (m, t) => {
        D && (t === "error" ? console.error(`[KB Generator] ${m}` : console.log(`[KB Generator] ${m}`))
    },
    
    // Function to populate category dropdown
    populateCategories = () => {
        const categorySelect = document.getElementById("category-select");
        if(!categorySelect) return;
        
        categorySelect.innerHTML = "";
        
        if(window.kbResearch && window.kbResearch.getAllCategories) {
            const categories = window.kbResearch.getAllCategories();
            
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.title;
                categorySelect.appendChild(option);
            });
            
            // Set the first category as selected and populate knowledge bases
            if(categories.length > 0) {
                populateKnowledgeBases(categories[0].id);
            }
        }
    },
    
    // Function to populate knowledge base dropdown based on selected category
    populateKnowledgeBases = (categoryId) => {
        const kbSelect = document.getElementById("kb-select");
        if(!kbSelect) return;
        
        kbSelect.innerHTML = "";
        
        if(window.kbResearch && window.kbResearch.getKnowledgeBasesByCategory) {
            const knowledgeBases = window.kbResearch.getKnowledgeBasesByCategory(categoryId);
            
            knowledgeBases.forEach(kb => {
                const option = document.createElement("option");
                option.value = kb.id;
                option.textContent = kb.title;
                kbSelect.appendChild(option);
            });
            
            // Enable/disable the select and buttons based on available knowledge bases
            kbSelect.disabled = knowledgeBases.length === 0;
            
            if(knowledgeBases.length > 0) {
                // Set the first knowledge base as selected
                kbSelect.value = knowledgeBases[0].id;
                setSelectedKnowledgeBase(knowledgeBases[0]);
            } else {
                document.getElementById("generate-btn").disabled = true;
                document.getElementById("copy-btn").disabled = true;
            }
        }
    },
    
    // Function to set the selected knowledge base
    setSelectedKnowledgeBase = (kb) => {
        c = {
            docxBlob: null,
            name: kb.title,
            category: kb.category,
            docxUrl: kb.docxUrl,
            generatePrompt: () => c.docxBlob
        };
        
        // Update status
        const status = document.getElementById("load-status");
        if(status) {
            status.textContent = `${kb.title} selected, ready to load.`;
            status.style.color = "green";
        }
        
        // Enable buttons
        document.getElementById("generate-btn").disabled = false;
        document.getElementById("copy-btn").disabled = false;
    },
    
    g = (id, name, docxUrl, category) => {
        r[id] = {
            name,
            docxUrl,
            category
        };
        
        const select = document.getElementById("kb-select");
        if(select) {
            const option = document.createElement("option");
            option.value = id, option.textContent = name, select.appendChild(option);
        }
    },
    
    F = async u => new Promise(async(resolve, reject) => {
        l(`Attempting fetch for DOCX: ${u}`);
        const S = document.getElementById("load-status");
        S && (S.textContent = `Fetching DOCX: ${u}`, S.style.color = "orange");
        try {
            const r = await fetch(u);
            if(!r.ok) throw new Error(`Network response was not ok: ${r.status}`);
            const docxBlob = await r.blob();
            l("DOCX fetched successfully");
            S && (S.textContent = `DOCX loaded: ${u}`, S.style.color = "green");
            resolve(docxBlob);
        } catch(e) {
            l(`Fetch error: ${e.message}`, "error");
            S && (S.textContent = `Failed to load DOCX: ${e.message}`, S.style.color = "red");
            reject("Failed to load DOCX. The server might be down or the site may be blocking external requests.");
        }
    }),
    
    // Function to load the selected knowledge base
    K = async() => {
        const kbId = document.getElementById("kb-select").value;
        if(!kbId) return;
        
        const S = document.getElementById("load-status");
        
        if(window.kbResearch && window.kbResearch.getAllKnowledgeBases) {
            const allKbs = window.kbResearch.getAllKnowledgeBases();
            const kb = allKbs.find(kb => kb.id === kbId);
            
            if(kb) {
                S && (S.textContent = `Loading ${kb.title} data...`);
                
                try {
                    const docxBlob = await F(kb.docxUrl);
                    c = {
                        docxBlob,
                        name: kb.title,
                        category: kb.category,
                        generatePrompt: () => docxBlob
                    };
                    
                    document.getElementById("generate-btn").disabled = false;
                    document.getElementById("copy-btn").disabled = false;
                    
                    S && (S.textContent = `${kb.title} data loaded successfully`, S.style.color = "green");
                } catch(error) {
                    P(`Failed to load ${kb.title} data. ${error}`);
                }
            }
        }
    },
    
    P = e => {
        const S = document.getElementById("load-status");
        S && (S.textContent = e, S.style.color = "red");
        document.getElementById("generate-btn").disabled = !0;
        document.getElementById("copy-btn").disabled = !0;
        alert(`Loading Error: ${e}\n\nPlease try again or check if the website allows loading external files.`);
    },
    
    G = () => {
        if(!c?.docxBlob) return "Error: No knowledge base loaded.";
        return c.docxBlob;
    },
    
    I = () => {
        const docxBlob = G();
        if(!(docxBlob instanceof Blob)) {
            alert("No knowledge base loaded or invalid data!");
            return;
        }
        
        const selectors = [
            "div#prompt-textarea p.placeholder",
            "textarea.prompt-textarea",
            "[contenteditable='true']",
            "[data-testid='compose-input']"
        ];
        
        let t = null;
        for(const s of selectors) {
            const e = document.querySelector(s);
            if(e) {
                t = e;
                break;
            }
        }
        
        if(t) {
            const file = new File([docxBlob], `${c.name}.docx`, {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            
            const dropEvent = new CustomEvent('drop', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            
            Object.defineProperty(dropEvent, 'dataTransfer', {
                value: dataTransfer
            });
            
            t.dispatchEvent(dropEvent);
            t.dispatchEvent(new Event("input", {
                bubbles: true
            }));
            
            const clickSend = (a = 0) => {
                const e = document.querySelector('button[data-testid="send-button"]');
                if(e) {
                    e.click();
                    R();
                } else if(a < 5) {
                    setTimeout(() => clickSend(a + 1), 200);
                } else {
                    alert("File injected but couldn't find send button. Please click send manually.");
                }
            };
            
            setTimeout(() => clickSend(), 300);
        } else {
            alert("Target text area not found! Make sure you're on an LLM interface.");
        }
    },
    
    J = async() => {
        alert("Copy functionality is disabled for DOCX files. Please use the 'Inject Prompt' button to send the knowledge base directly to the LLM.");
    },
    
    R = () => {
        document.body.removeChild(p);
        document.removeEventListener("keydown", Y);
    },
    
    Y = e => {
        e.key === "Escape" && R();
    };
    
    window.KnowledgeBaseLoader = {
        registerBase: g
    };
    
    a();
    
    p.id = "kb-prompt-generator";
    p.style.cssText = s.default;
    p.className = "kb-light-theme";
    p.innerHTML = '<h2 style="color:#147CBD;margin:28px 0 10px 0;font-size:1.2em">Prompt Generator</h2>' +
        '<div style="display:flex;justify-content:end;position:absolute;top:12px;float:right;right:30px;">' +
        '<button id="style-toggle" style="margin:0px 3px;background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Panel Style" aria-label="Toggle Panel Style">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg></button>' +
        '<button id="theme-toggle" style="background-color:transparent;border-radius:3px;padding:3px;cursor:pointer" title="Toggle Theme" aria-label="Toggle Theme">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>' +
        '<line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></button></div>' +
        '<div id="load-status" style="margin-bottom:10px;padding:5px;background:#f0f0f0;border-radius:3px;font-size:12px;color:orange;">Ready to load data...</div>' +
        '<label style="display:block;margin-bottom:5px;font-size:14px">Select Category:</label>' +
        '<select id="category-select" class="categorySelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc"></select>' +
        '<label style="display:block;margin-bottom:5px;font-size:14px">Select Knowledge Base:</label>' +
        '<select id="kb-select" class="knowledgeBaseSelect" style="width:100%;padding:5px;margin-bottom:15px;border-radius:3px;border:1px solid #ccc"></select>' +
        '<div style="display:flex;gap:10px;margin-bottom:10px">' +
        '<button id="generate-btn" style="flex:1;padding:8px;background:#49A74C;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold">Inject Prompt</button>' +
        '<button id="copy-btn" style="flex:1;padding:8px;background:#0B78D0;color:white;border:none;border-radius:3px;cursor:pointer;font-weight:bold">Copy Prompt</button></div>' +
        '<button id="close-btn" aria-label="close prompt generator" style="position:absolute;top:10px;right:10px;background-color:transparent;border:none;cursor:pointer;font-size:16px;font-weight:bold">✕</button>';
    
    document.body.appendChild(p);
    
    document.getElementById("close-btn").addEventListener("click", R);
    document.getElementById("generate-btn").addEventListener("click", I);
    document.getElementById("copy-btn").addEventListener("click", J);
    document.addEventListener("keydown", Y);
    
    document.getElementById("generate-btn").disabled = !0;
    document.getElementById("copy-btn").disabled = !0;
    
    document.getElementById("style-toggle").addEventListener("click", function() {
        if(S === "default") {
            S = "fullHeight";
            this.innerHTML = "";
            this.title = "Switch to Floating Panel";
        } else {
            S = "default";
            this.innerHTML = "";
            this.title = "Switch to Full Height Sidebar";
        }
        const t = p.className;
        p.style.cssText = s[S];
        p.className = t;
    });
    
    document.getElementById("theme-toggle").addEventListener("click", function() {
        if(T === "light") {
            T = "dark";
            this.innerHTML = "";
            this.title = "Switch to Light Theme";
            p.className = "kb-dark-theme";
        } else {
            T = "light";
            this.innerHTML = "";
            this.title = "Switch to Light Theme";
            p.className = "kb-light-theme";
        }
    });
    
    // Load the knowledge base loader script
    (async function() {
        try {
            const kbLoaderUrl = "llmPrimer_bkm_kbLoader_v1.0.js";
            l(`Loading knowledge base loader: ${kbLoaderUrl}`);
            
            const script = document.createElement("script");
            script.src = kbLoaderUrl;
            
            script.onload = function() {
                l("Knowledge base loader loaded successfully");
                
                // Initialize the dropdowns
                populateCategories();
                
                // Set up the event handlers
                document.getElementById("category-select").addEventListener("change", function() {
                    populateKnowledgeBases(this.value);
                });
                
                document.getElementById("kb-select").addEventListener("change", K);
            };
            
            script.onerror = function() {
                l("Failed to load knowledge base loader", "error");
                document.getElementById("load-status").textContent = "Failed to load knowledge base module. Please check console for errors.";
                document.getElementById("load-status").style.color = "red";
            };
            
            document.head.appendChild(script);
        } catch(e) {
            l(`Error in knowledge base loader loading: ${e.message}`, "error");
        }
    })();
})();