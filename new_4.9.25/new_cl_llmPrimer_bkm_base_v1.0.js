/**
 * llmPrimer_bkm_base_v1.0.js
 * Bookmarklet framework for injecting DOCX knowledge bases into LLMs
 */

(function() {
    // Check if the bookmarklet is already loaded
    if (document.getElementById('llmPrimer-panel')) {
        // Toggle visibility if already loaded
        const panel = document.getElementById('llmPrimer-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        return;
    }

    // Load the knowledge base loader script
    const kbLoaderScript = document.createElement('script');
    kbLoaderScript.src = 'https://path-to-your-script/llmPrimer_bkm_kbLoader_v1.0.js';
    document.head.appendChild(kbLoaderScript);

    // Create and initialize UI once the knowledge base loader is loaded
    kbLoaderScript.onload = initializeBookmarklet;
    kbLoaderScript.onerror = function() {
        alert('Failed to load knowledge base data. Please check your network connection and try again.');
    };

    // Initialize the bookmarklet UI and functionality
    function initializeBookmarklet() {
        try {
            // Create the main panel
            const panel = document.createElement('div');
            panel.id = 'llmPrimer-panel';
            panel.style.position = 'fixed';
            panel.style.top = '20px';
            panel.style.right = '20px';
            panel.style.width = '300px';
            panel.style.backgroundColor = '#ffffff';
            panel.style.border = '1px solid #cccccc';
            panel.style.borderRadius = '5px';
            panel.style.padding = '15px';
            panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            panel.style.zIndex = '10000';
            panel.style.fontFamily = 'Arial, sans-serif';
            panel.style.fontSize = '14px';
            panel.style.color = '#333333';

            // Create panel header
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.marginBottom = '15px';

            // Panel title
            const title = document.createElement('h3');
            title.textContent = 'llmPrimer';
            title.style.margin = '0';
            title.style.fontSize = '16px';
            title.style.fontWeight = 'bold';
            header.appendChild(title);

            // Control buttons container
            const controlButtons = document.createElement('div');
            controlButtons.style.display = 'flex';
            controlButtons.style.gap = '5px';

            // Toggle theme button
            const themeToggle = document.createElement('button');
            themeToggle.id = 'llmPrimer-theme-btn';
            themeToggle.innerText = '🌓';
            themeToggle.title = 'Toggle theme';
            themeToggle.style.border = 'none';
            themeToggle.style.background = 'none';
            themeToggle.style.cursor = 'pointer';
            themeToggle.style.fontSize = '16px';
            themeToggle.addEventListener('click', toggleTheme);
            controlButtons.appendChild(themeToggle);

            // Toggle panel button
            const togglePanel = document.createElement('button');
            togglePanel.id = 'llmPrimer-toggle-btn';
            togglePanel.innerText = '⚡';
            togglePanel.title = 'Toggle panel';
            togglePanel.style.border = 'none';
            togglePanel.style.background = 'none';
            togglePanel.style.cursor = 'pointer';
            togglePanel.style.fontSize = '16px';
            togglePanel.addEventListener('click', minimizePanel);
            controlButtons.appendChild(togglePanel);

            // Close button
            const closeButton = document.createElement('button');
            closeButton.id = 'llmPrimer-close-btn';
            closeButton.innerText = '✕';
            closeButton.title = 'Close panel';
            closeButton.style.border = 'none';
            closeButton.style.background = 'none';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontSize = '16px';
            closeButton.addEventListener('click', closePanel);
            controlButtons.appendChild(closeButton);

            header.appendChild(controlButtons);
            panel.appendChild(header);

            // Category select label
            const categoryLabel = document.createElement('label');
            categoryLabel.textContent = 'Select Category:';
            categoryLabel.style.display = 'block';
            categoryLabel.style.marginBottom = '5px';
            categoryLabel.style.fontSize = '14px';
            panel.appendChild(categoryLabel);

            // Category dropdown
            const categorySelect = document.createElement('select');
            categorySelect.className = 'categorySelect';
            categorySelect.style.width = '100%';
            categorySelect.style.padding = '5px';
            categorySelect.style.marginBottom = '15px';
            categorySelect.style.borderRadius = '3px';
            categorySelect.style.border = '1px solid #ccc';
            
            // Add default option
            const defaultCategoryOption = document.createElement('option');
            defaultCategoryOption.value = '';
            defaultCategoryOption.textContent = '-- Select a category --';
            categorySelect.appendChild(defaultCategoryOption);
            
            // Check if kbCategory is defined
            if (typeof kbCategory === 'undefined' || !Array.isArray(kbCategory)) {
                throw new Error('Knowledge base categories not found or invalid');
            }
            
            // Populate categories from kbCategory array
            kbCategory.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.title;
                categorySelect.appendChild(option);
            });
            
            panel.appendChild(categorySelect);

            // Knowledge Base select label
            const kbLabel = document.createElement('label');
            kbLabel.textContent = 'Select Knowledge Base:';
            kbLabel.style.display = 'block';
            kbLabel.style.marginBottom = '5px';
            kbLabel.style.fontSize = '14px';
            panel.appendChild(kbLabel);

            // Knowledge base dropdown
            const kbSelect = document.createElement('select');
            kbSelect.className = 'knowledgeBaseSelect';
            kbSelect.style.width = '100%';
            kbSelect.style.padding = '5px';
            kbSelect.style.marginBottom = '15px';
            kbSelect.style.borderRadius = '3px';
            kbSelect.style.border = '1px solid #ccc';
            kbSelect.disabled = true;
            
            // Add default option
            const defaultKBOption = document.createElement('option');
            defaultKBOption.value = '';
            defaultKBOption.textContent = '-- Select a knowledge base --';
            kbSelect.appendChild(defaultKBOption);
            
            panel.appendChild(kbSelect);

            // Button container
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between';
            buttonContainer.style.gap = '10px';

            // Inject Prompt button
            const injectButton = document.createElement('button');
            injectButton.id = 'llmPrimer-inject-btn';
            injectButton.innerText = 'Inject Prompt';
            injectButton.style.padding = '8px 15px';
            injectButton.style.borderRadius = '3px';
            injectButton.style.border = '1px solid #ccc';
            injectButton.style.backgroundColor = '#f0f0f0';
            injectButton.style.cursor = 'pointer';
            injectButton.style.flex = '1';
            injectButton.disabled = true;
            injectButton.addEventListener('click', injectPrompt);
            buttonContainer.appendChild(injectButton);

            // Copy Prompt button
            const copyButton = document.createElement('button');
            copyButton.id = 'llmPrimer-copy-btn';
            copyButton.innerText = 'Copy Prompt';
            copyButton.style.padding = '8px 15px';
            copyButton.style.borderRadius = '3px';
            copyButton.style.border = '1px solid #ccc';
            copyButton.style.backgroundColor = '#f0f0f0';
            copyButton.style.cursor = 'pointer';
            copyButton.style.flex = '1';
            copyButton.disabled = true;
            copyButton.addEventListener('click', copyPrompt);
            buttonContainer.appendChild(copyButton);

            panel.appendChild(buttonContainer);

            // Add panel to document
            document.body.appendChild(panel);

            // Event listeners
            categorySelect.addEventListener('change', function() {
                populateKnowledgeBases(this.value);
                kbSelect.disabled = !this.value;
                injectButton.disabled = true;
                copyButton.disabled = true;
            });

            kbSelect.addEventListener('change', function() {
                injectButton.disabled = !this.value;
                copyButton.disabled = !this.value;
            });

            // Check if kbDomain is defined
            if (typeof kbDomain === 'undefined' || !Array.isArray(kbDomain)) {
                throw new Error('Knowledge base domains not found or invalid');
            }

            // Select first category by default (if exists)
            if (kbCategory.length > 0) {
                categorySelect.value = kbCategory[0].id;
                populateKnowledgeBases(kbCategory[0].id);
                kbSelect.disabled = false;
            }

            // Ensure dark theme if applicable
            applyCurrentTheme();
        } catch (error) {
            console.error('Error initializing llmPrimer:', error);
            alert('Failed to initialize llmPrimer: ' + error.message);
        }
    }

    // Function to populate knowledge bases dropdown based on selected category
    function populateKnowledgeBases(categoryId) {
        try {
            const kbSelect = document.querySelector('.knowledgeBaseSelect');
            
            if (!kbSelect) {
                throw new Error('Knowledge base select element not found');
            }
            
            // Clear existing options except the first (default) option
            while (kbSelect.options.length > 1) {
                kbSelect.remove(1);
            }
            
            // Filter knowledge bases by category
            const filteredKBs = kbDomain.filter(kb => kb.category === categoryId);
            
            // Add filtered knowledge bases to the dropdown
            filteredKBs.forEach(kb => {
                const option = document.createElement('option');
                option.value = kb.id;
                option.textContent = kb.title;
                kbSelect.appendChild(option);
            });
            
            // Select the first knowledge base by default (if exists)
            if (filteredKBs.length > 0) {
                kbSelect.value = filteredKBs[0].id;
                
                // Enable buttons since a knowledge base is selected
                const injectButton = document.getElementById('llmPrimer-inject-btn');
                const copyButton = document.getElementById('llmPrimer-copy-btn');
                
                if (injectButton && copyButton) {
                    injectButton.disabled = false;
                    copyButton.disabled = false;
                }
            }
        } catch (error) {
            console.error('Error populating knowledge bases:', error);
            alert('Failed to populate knowledge bases: ' + error.message);
        }
    }

    // Function to get the selected knowledge base DOCX URL
    function G() {
        try {
            const kbSelect = document.querySelector('.knowledgeBaseSelect');
            
            if (!kbSelect) {
                throw new Error('Knowledge base select element not found');
            }
            
            const selectedKBId = kbSelect.value;
            
            if (!selectedKBId) {
                return '';
            }
            
            // Find the selected knowledge base
            const selectedKB = kbDomain.find(kb => kb.id === selectedKBId);
            
            // Return the DOCX URL if found, otherwise empty string
            return selectedKB ? selectedKB.docxUrl : '';
        } catch (error) {
            console.error('Error getting DOCX URL:', error);
            return '';
        }
    }

    // Reset function
    function R() {
        // Additional cleanup if needed after injection
        console.log('Prompt injected successfully');
    }

    // Function to inject prompt into LLM
    function injectPrompt() {
        // Use the provided injection function
        I();
    }

    // Injection function based on the provided snippet
    function I() {
        try {
            const e = G();
            
            if (!e) {
                alert('No valid DOCX URL found. Please select a knowledge base.');
                return;
            }
            
            const t = document.querySelector("div#prompt-textarea p.placeholder");
            
            if (!t) {
                alert("Target placeholder not found! Please ensure you're on a compatible LLM interface.");
                return;
            }
            
            t.innerText = e;
            t.dispatchEvent(new Event("input", {
                bubbles: true
            }));
            
            setTimeout(() => {
                const e = document.querySelector('button[data-testid="send-button"]');
                if (e) {
                    e.click();
                    R();
                } else {
                    alert("Send button not found! Prompt text was inserted but could not be sent automatically.");
                }
            }, 100);
        } catch (error) {
            console.error('Error injecting prompt:', error);
            alert('Failed to inject prompt: ' + error.message);
        }
    }

    // Function to copy prompt to clipboard
    function copyPrompt() {
        try {
            const docxUrl = G();
            
            if (!docxUrl) {
                alert('No knowledge base selected!');
                return;
            }
            
            // Use modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(docxUrl)
                    .then(() => {
                        // Show temporary success message
                        const copyButton = document.getElementById('llmPrimer-copy-btn');
                        if (copyButton) {
                            const originalText = copyButton.innerText;
                            copyButton.innerText = '✓ Copied!';
                            setTimeout(() => {
                                copyButton.innerText = originalText;
                            }, 2000);
                        } else {
                            alert('Knowledge base URL copied to clipboard!');
                        }
                    })
                    .catch(err => {
                        console.error('Clipboard error:', err);
                        alert('Failed to copy: ' + err.message);
                    });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = docxUrl;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                let success = false;
                try {
                    success = document.execCommand('copy');
                } catch (err) {
                    console.error('Fallback clipboard error:', err);
                }
                
                document.body.removeChild(textArea);
                
                if (success) {
                    // Show temporary success message
                    const copyButton = document.getElementById('llmPrimer-copy-btn');
                    if (copyButton) {
                        const originalText = copyButton.innerText;
                        copyButton.innerText = '✓ Copied!';
                        setTimeout(() => {
                            copyButton.innerText = originalText;
                        }, 2000);
                    } else {
                        alert('Knowledge base URL copied to clipboard!');
                    }
                } else {
                    alert('Failed to copy. Please select and copy manually: ' + docxUrl);
                }
            }
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            alert('Failed to copy: ' + error.message);
        }
    }

    // Function to toggle theme
    function toggleTheme() {
        try {
            const panel = document.getElementById('llmPrimer-panel');
            
            if (!panel) {
                throw new Error('Panel element not found');
            }
            
            const isDark = panel.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                panel.setAttribute('data-theme', 'light');
                panel.style.backgroundColor = '#ffffff';
                panel.style.color = '#333333';
                panel.style.border = '1px solid #cccccc';
                
                // Update buttons for light theme
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#f0f0f0';
                    button.style.color = '#333333';
                    button.style.border = '1px solid #cccccc';
                });
                
                // Update selects for light theme
                const selects = panel.querySelectorAll('select');
                selects.forEach(select => {
                    select.style.backgroundColor = '#ffffff';
                    select.style.color = '#333333';
                    select.style.border = '1px solid #cccccc';
                });
            } else {
                panel.setAttribute('data-theme', 'dark');
                panel.style.backgroundColor = '#333333';
                panel.style.color = '#ffffff';
                panel.style.border = '1px solid #555555';
                
                // Update buttons for dark theme
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#444444';
                    button.style.color = '#ffffff';
                    button.style.border = '1px solid #666666';
                });
                
                // Update selects for dark theme
                const selects = panel.querySelectorAll('select');
                selects.forEach(select => {
                    select.style.backgroundColor = '#444444';
                    select.style.color = '#ffffff';
                    select.style.border = '1px solid #666666';
                });
            }
            
            // Save theme preference
            localStorage.setItem('llmPrimer-theme', isDark ? 'light' : 'dark');
        } catch (error) {
            console.error('Error toggling theme:', error);
        }
    }

    // Function to apply current theme
    function applyCurrentTheme() {
        try {
            const panel = document.getElementById('llmPrimer-panel');
            
            if (!panel) {
                throw new Error('Panel element not found');
            }
            
            const theme = localStorage.getItem('llmPrimer-theme') || 'light';
            
            if (theme === 'dark') {
                panel.setAttribute('data-theme', 'dark');
                panel.style.backgroundColor = '#333333';
                panel.style.color = '#ffffff';
                panel.style.border = '1px solid #555555';
                
                // Update buttons for dark theme
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#444444';
                    button.style.color = '#ffffff';
                    button.style.border = '1px solid #666666';
                });
                
                // Update selects for dark theme
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
                
                // Update buttons for light theme
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#f0f0f0';
                    button.style.color = '#333333';
                    button.style.border = '1px solid #cccccc';
                });
                
                // Update selects for light theme
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

    // Function to minimize panel
    function minimizePanel() {
        try {
            const panel = document.getElementById('llmPrimer-panel');
            
            if (!panel) {
                throw new Error('Panel element not found');
            }
            
            const panelContent = Array.from(panel.children).slice(1); // Get all children except header
            const isMinimized = panel.getAttribute('data-minimized') === 'true';
            
            if (isMinimized) {
                // Expand
                panelContent.forEach(element => {
                    element.style.display = '';
                });
                panel.setAttribute('data-minimized', 'false');
            } else {
                // Minimize
                panelContent.forEach(element => {
                    element.style.display = 'none';
                });
                panel.setAttribute('data-minimized', 'true');
            }
        } catch (error) {
            console.error('Error toggling panel:', error);
        }
    }

    // Function to close panel
    function closePanel() {
        try {
            const panel = document.getElementById('llmPrimer-panel');
            
            if (panel) {
                panel.remove();
            }
        } catch (error) {
            console.error('Error closing panel:', error);
        }
    }
})();