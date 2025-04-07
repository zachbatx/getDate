// llmPrimer_bkm_base_v1.0.js

(function() {
    // --- Global functions for LLM injection ---
    // G() returns the current docx content (in this case, the docx URL)
    function G() {
        return window.docxContent;
    }

    // R() is a placeholder for any reset logic after injection
    function R() {
        console.log("Injection complete. Resetting if necessary.");
        // Add any reset functionality here if needed.
    }

    // I() injects the content into the LLM textarea and triggers the send button.
    function I() {
        const e = G();
        const t = document.querySelector("div#prompt-textarea p.placeholder");
        if (t) {
            t.innerText = e;
            t.dispatchEvent(new Event("input", { bubbles: true }));
            setTimeout(() => {
                const sendBtn = document.querySelector('button[data-testid="send-button"]');
                if (sendBtn) sendBtn.click();
                R();
            }, 100);
        } else {
            alert("Target placeholder not found!");
        }
    }
    
    // --- Build the Bookmarklet UI ---
    const container = document.createElement('div');
    container.id = 'llmPrimerContainer';
    container.style.position = 'fixed';
    container.style.top = '10%';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.backgroundColor = '#fff';
    container.style.padding = '20px';
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    container.style.borderRadius = '8px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.width = '300px';

    // Header: Toggle panel, theme toggle, and close button
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Panel';
    toggleButton.style.marginRight = '5px';
    toggleButton.addEventListener('click', () => {
        alert('Toggle panel clicked');
    });
    header.appendChild(toggleButton);

    const themeToggle = document.createElement('button');
    themeToggle.textContent = 'Toggle Theme';
    themeToggle.style.marginRight = '5px';
    themeToggle.addEventListener('click', () => {
        if (container.style.backgroundColor === 'rgb(255, 255, 255)' || container.style.backgroundColor === '#fff') {
            container.style.backgroundColor = '#333';
            container.style.color = '#fff';
        } else {
            container.style.backgroundColor = '#fff';
            container.style.color = '#000';
        }
    });
    header.appendChild(themeToggle);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        container.remove();
    });
    header.appendChild(closeButton);

    container.appendChild(header);

    // Form elements container
    const form = document.createElement('div');
    form.style.marginTop = '15px';

    // Category dropdown (populated from kbCategories)
    const categoryLabel = document.createElement('label');
    categoryLabel.style.display = 'block';
    categoryLabel.style.marginBottom = '5px';
    categoryLabel.style.fontSize = '14px';
    categoryLabel.textContent = 'Select Category:';
    form.appendChild(categoryLabel);

    const categorySelect = document.createElement('select');
    categorySelect.className = 'categorySelect';
    categorySelect.style.width = '100%';
    categorySelect.style.padding = '5px';
    categorySelect.style.marginBottom = '15px';
    categorySelect.style.borderRadius = '3px';
    categorySelect.style.border = '1px solid #ccc';
    form.appendChild(categorySelect);

    // Knowledge Base dropdown (populated from kbDomain based on category)
    const kbLabel = document.createElement('label');
    kbLabel.style.display = 'block';
    kbLabel.style.marginBottom = '5px';
    kbLabel.style.fontSize = '14px';
    kbLabel.textContent = 'Select Knowledge Base:';
    form.appendChild(kbLabel);

    const kbSelect = document.createElement('select');
    kbSelect.className = 'knowledgeBaseSelect';
    kbSelect.style.width = '100%';
    kbSelect.style.padding = '5px';
    kbSelect.style.marginBottom = '15px';
    kbSelect.style.borderRadius = '3px';
    kbSelect.style.border = '1px solid #ccc';
    kbSelect.disabled = true;
    form.appendChild(kbSelect);

    // Action buttons: Inject and Copy
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'space-between';

    // Inject Prompt: Uses the I() function to inject the docx URL into the LLM textarea.
    const injectBtn = document.createElement('button');
    injectBtn.textContent = 'Inject Prompt';
    injectBtn.disabled = true;
    injectBtn.addEventListener('click', () => {
        const selectedOption = kbSelect.options[kbSelect.selectedIndex];
        if (selectedOption && selectedOption.value) {
            // Save the selected docx URL globally so that G() can return it
            window.docxContent = selectedOption.getAttribute('data-docx-url');
            I();
        }
    });
    btnContainer.appendChild(injectBtn);

    // Copy Prompt: Copies the docx URL to the clipboard.
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy Prompt';
    copyBtn.disabled = true;
    copyBtn.addEventListener('click', () => {
        const selectedOption = kbSelect.options[kbSelect.selectedIndex];
        if (selectedOption && selectedOption.value) {
            const docxUrl = selectedOption.getAttribute('data-docx-url');
            navigator.clipboard.writeText(docxUrl).then(() => {
                alert('Copied prompt: ' + docxUrl);
            }).catch((err) => {
                alert('Failed to copy prompt: ' + err);
            });
        }
    });
    btnContainer.appendChild(copyBtn);

    form.appendChild(btnContainer);
    container.appendChild(form);
    document.body.appendChild(container);

    // --- Populate the Dropdowns ---
    // This assumes kbCategories and kbDomain are loaded from llmPrimer_bkm_kbLoader_v1.0.js.
    function populateCategories() {
        if (window.kbCategories && Array.isArray(window.kbCategories)) {
            kbCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.title;
                categorySelect.appendChild(option);
            });
            // Set default category and update the KB dropdown
            categorySelect.selectedIndex = 0;
            populateKnowledgeBases(categorySelect.value);
        } else {
            console.error('kbCategories array is not defined.');
        }
    }

    function populateKnowledgeBases(categoryId) {
        kbSelect.innerHTML = '';
        if (window.kbDomain && Array.isArray(window.kbDomain)) {
            const filteredKb = kbDomain.filter(kb => kb.category === categoryId);
            if (filteredKb.length > 0) {
                filteredKb.forEach(kb => {
                    const option = document.createElement('option');
                    option.value = kb.id;
                    option.textContent = kb.title;
                    option.setAttribute('data-docx-url', kb.docxUrl);
                    kbSelect.appendChild(option);
                });
                kbSelect.disabled = false;
                kbSelect.selectedIndex = 0;
                injectBtn.disabled = false;
                copyBtn.disabled = false;
            } else {
                const option = document.createElement('option');
                option.textContent = 'No knowledge bases available';
                option.value = '';
                kbSelect.appendChild(option);
                kbSelect.disabled = true;
                injectBtn.disabled = true;
                copyBtn.disabled = true;
            }
        } else {
            console.error('kbDomain array is not defined.');
        }
    }

    categorySelect.addEventListener('change', function() {
        populateKnowledgeBases(this.value);
    });

    kbSelect.addEventListener('change', function() {
        if (this.value) {
            injectBtn.disabled = false;
            copyBtn.disabled = false;
        } else {
            injectBtn.disabled = true;
            copyBtn.disabled = true;
        }
    });

    // Initialize dropdowns on load
    populateCategories();

})();
