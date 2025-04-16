javascript:(function(){
    // Check if panel already exists - if so, toggle visibility
    if(document.getElementById('llmPrimer-panel')){
        const panel = document.getElementById('llmPrimer-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        return;
    }
    
    // Show loading message to user
    const loadingMsg = document.createElement('div');
    loadingMsg.id = 'llmPrimer-loading';
    loadingMsg.style.position = 'fixed';
    loadingMsg.style.top = '20px';
    loadingMsg.style.right = '20px';
    loadingMsg.style.backgroundColor = '#fff';
    loadingMsg.style.border = '1px solid #ccc';
    loadingMsg.style.borderRadius = '5px';
    loadingMsg.style.padding = '10px';
    loadingMsg.style.boxShadow = '0 4px 8px rgba(0,0,0,.1)';
    loadingMsg.style.zIndex = '10000';
    loadingMsg.style.fontFamily = 'Arial,sans-serif';
    loadingMsg.textContent = 'Loading llmPrimer...';
    document.body.appendChild(loadingMsg);
    
    // Create and load the knowledge base loader script
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://your-domain.com/path/to/new_llmPrimer_bkm_kbLoader_v1.0_4.10.25.js';
    document.head.appendChild(loaderScript);
    
    // Set up error handling for script loading
    loaderScript.onerror = function(){
        loadingMsg.textContent = 'Failed to load knowledge base data.';
        loadingMsg.style.backgroundColor = '#ffebee';
        loadingMsg.style.color = '#d32f2f';
        setTimeout(() => {
            document.body.removeChild(loadingMsg);
        }, 3000);
    };
    
    // Initialize the UI after script loads
    loaderScript.onload = function() {
        // Remove loading message
        document.body.removeChild(loadingMsg);
        
        // Initialize the bookmarklet UI
        initializePrimer();
    };
    
    function initializePrimer() {
        try {
            console.log("Initializing llmPrimer UI...");
            
            // Create main panel
            const panel = document.createElement('div');
            panel.id = 'llmPrimer-panel';
            panel.style.position = 'fixed';
            panel.style.top = '20px';
            panel.style.right = '20px';
            panel.style.width = '300px';
            panel.style.backgroundColor = '#fff';
            panel.style.border = '1px solid #ccc';
            panel.style.borderRadius = '5px';
            panel.style.padding = '15px';
            panel.style.boxShadow = '0 4px 8px rgba(0,0,0,.1)';
            panel.style.zIndex = '10000';
            panel.style.fontFamily = 'Arial,sans-serif';
            panel.style.fontSize = '14px';
            panel.style.color = '#333';
            
            // Create header
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.marginBottom = '15px';
            
            // Title
            const title = document.createElement('h3');
            title.textContent = 'llmPrimer';
            title.style.margin = '0';
            title.style.fontSize = '16px';
            title.style.fontWeight = 'bold';
            header.appendChild(title);
            
            // Buttons container
            const buttons = document.createElement('div');
            buttons.style.display = 'flex';
            buttons.style.gap = '5px';
            
            // Theme toggle button
            const themeBtn = document.createElement('button');
            themeBtn.id = 'llmPrimer-theme-btn';
            themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
            themeBtn.title = 'Toggle theme';
            themeBtn.style.border = 'none';
            themeBtn.style.background = 'none';
            themeBtn.style.cursor = 'pointer';
            themeBtn.style.fontSize = '16px';
            themeBtn.addEventListener('click', toggleTheme);
            buttons.appendChild(themeBtn);
            
            // Toggle panel button
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'llmPrimer-toggle-btn';
            toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>';
            toggleBtn.title = 'Toggle panel';
            toggleBtn.style.border = 'none';
            toggleBtn.style.background = 'none';
            toggleBtn.style.cursor = 'pointer';
            toggleBtn.style.fontSize = '16px';
            toggleBtn.addEventListener('click', togglePanel);
            buttons.appendChild(toggleBtn);
            
            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.id = 'llmPrimer-close-btn';
            closeBtn.innerText = '✕';
            closeBtn.title = 'Close panel';
            closeBtn.style.border = 'none';
            closeBtn.style.background = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '16px';
            closeBtn.addEventListener('click', closePanel);
            buttons.appendChild(closeBtn);
            
            header.appendChild(buttons);
            panel.appendChild(header);
            
            // Loading status indicator
            const loadingStatus = document.createElement('div');
            loadingStatus.id = 'llmPrimer-loading-status';
            loadingStatus.style.fontSize = '12px';
            loadingStatus.style.marginBottom = '10px';
            loadingStatus.style.color = '#666';
            loadingStatus.textContent = 'Loading content...';
            panel.appendChild(loadingStatus);
            
            // Category dropdown
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
            
            const defaultCategoryOption = document.createElement('option');
            defaultCategoryOption.value = '';
            defaultCategoryOption.textContent = '-- Select a category --';
            categorySelect.appendChild(defaultCategoryOption);
            
            // Check if categories are available
            if (typeof window.kbCategory === 'undefined' || !Array.isArray(window.kbCategory)) {
                console.error('Knowledge base categories not found. Make sure the loader script is properly loaded.');
                throw new Error('Knowledge base categories not found');
            }
            
            // Populate category dropdown
            window.kbCategory.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.title;
                categorySelect.appendChild(option);
            });
            
            panel.appendChild(categorySelect);
            
            // Knowledge base dropdown
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
            
            // Status messages area
            const statusArea = document.createElement('div');
            statusArea.id = 'llmPrimer-status';
            statusArea.style.fontSize = '12px';
            statusArea.style.marginBottom = '10px';
            statusArea.style.padding = '5px';
            statusArea.style.borderRadius = '3px';
            statusArea.style.display = 'none';
            panel.appendChild(statusArea);
            
            // Action buttons
            const actionButtons = document.createElement('div');
            actionButtons.style.display = 'flex';
            actionButtons.style.justifyContent = 'space-between';
            actionButtons.style.gap = '10px';
            
            // Inject button
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
            actionButtons.appendChild(injectBtn);
            
            // Copy button
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
            actionButtons.appendChild(copyBtn);
            
            panel.appendChild(actionButtons);
            
            document.body.appendChild(panel);
            
            // Add event listeners for dropdowns
            categorySelect.addEventListener('change', function() {
                populateKbDropdown(this.value);
                kbSelect.disabled = !this.value;
                injectBtn.disabled = true;
                copyBtn.disabled = true;
            });
            
            kbSelect.addEventListener('change', function() {
                injectBtn.disabled = !this.value;
                copyBtn.disabled = !this.value;
            });
            
            // Check if domains are available
            if (typeof window.kbDomain === 'undefined' || !Array.isArray(window.kbDomain)) {
                console.error('Knowledge base domains not found. Make sure the loader script is properly loaded.');
                throw new Error('Knowledge base domains not found');
            }
            
            // Populate initial category if available
            if (window.kbCategory.length > 0) {
                categorySelect.value = window.kbCategory[0].id;
                populateKbDropdown(window.kbCategory[0].id);
                kbSelect.disabled = false;
            }
            
            // Apply theme from localStorage
            applyTheme();
            
            // Update loading status
            if (window.llmPrimer && window.llmPrimer.contentLoadingStatus) {
                const { total, completed, failed } = window.llmPrimer.contentLoadingStatus;
                loadingStatus.textContent = `Loading: ${completed}/${total} complete${failed > 0 ? `, ${failed} failed` : ''}`;
            }
            
            // Listen for content loaded event
            document.addEventListener('llmPrimer_contentLoaded', function(event) {
                console.log("Content loading complete event received:", event.detail);
                loadingStatus.textContent = `Loading complete: ${event.detail.success}/${event.detail.total} successful`;
                
                setTimeout(() => {
                    loadingStatus.style.display = 'none';
                }, 3000);
                
                // Enable buttons if all content is loaded
                if (kbSelect.value) {
                    injectBtn.disabled = false;
                    copyBtn.disabled = false;
                }
            });
            
            console.log("llmPrimer UI initialized successfully");
            
        } catch (error) {
            console.error('Error initializing llmPrimer:', error);
            alert('Failed to initialize: ' + error.message);
        }
    }
    
    // Function to populate the knowledge base dropdown based on selected category
    function populateKbDropdown(categoryId) {
        try {
            const kbSelect = document.querySelector('.knowledgeBaseSelect');
            if (!kbSelect) {
                throw new Error('Select element not found');
            }
            
            // Clear existing options except the first one
            while (kbSelect.options.length > 1) {
                kbSelect.remove(1);
            }
            
            // Filter domains by category
            const filteredDomains = window.kbDomain.filter(domain => domain.category === categoryId);
            
            // Add options for each domain
            filteredDomains.forEach(domain => {
                const option = document.createElement('option');
                option.value = domain.id;
                option.textContent = domain.title;
                
                // Add loading status indicator if available
                if (domain.loadingStatus) {
                    if (domain.loadingStatus === 'loaded') {
                        option.textContent += ' ✓';
                    } else if (domain.loadingStatus === 'loading') {
                        option.textContent += ' (loading...)';
                    } else if (domain.loadingStatus === 'failed') {
                        option.textContent += ' (failed)';
                    }
                }
                
                kbSelect.appendChild(option);
            });
            
            // Enable buttons if options are available and content is loaded
            if (filteredDomains.length > 0) {
                kbSelect.value = filteredDomains[0].id;
                
                const injectBtn = document.getElementById('llmPrimer-inject-btn');
                const copyBtn = document.getElementById('llmPrimer-copy-btn');
                
                if (injectBtn && copyBtn) {
                    // Only enable if content is loaded or if we're not tracking loading status
                    const selectedDomain = filteredDomains[0];
                    const contentReady = !selectedDomain.loadingStatus || 
                                       selectedDomain.loadingStatus === 'loaded' ||
                                       window.llmPrimer.contentLoaded;
                                       
                    injectBtn.disabled = !contentReady;
                    copyBtn.disabled = !contentReady;
                }
            }
        } catch (error) {
            console.error('Error populating dropdown:', error);
            showStatus('Failed to populate dropdown: ' + error.message, 'error');
        }
    }
    
    // Function to show status messages
    function showStatus(message, type = 'info') {
        const statusArea = document.getElementById('llmPrimer-status');
        if (statusArea) {
            statusArea.textContent = message;
            statusArea.style.display = 'block';
            
            if (type === 'error') {
                statusArea.style.backgroundColor = '#ffebee';
                statusArea.style.color = '#d32f2f';
            } else if (type === 'success') {
                statusArea.style.backgroundColor = '#e8f5e9';
                statusArea.style.color = '#388e3c';
            } else {
                statusArea.style.backgroundColor = '#e3f2fd';
                statusArea.style.color = '#1976d2';
            }
            
            // Hide after 5 seconds
            setTimeout(() => {
                statusArea.style.display = 'none';
            }, 5000);
        }
    }
    
    // Function to get markdown content from selected knowledge base
    function getMarkdownContent() {
        try {
            const kbSelect = document.querySelector('.knowledgeBaseSelect');
            if (!kbSelect) {
                throw new Error('Select element not found');
            }
            
            const selectedId = kbSelect.value;
            if (!selectedId) {
                return '';
            }
            
            // Find the selected domain
            const selectedDomain = window.kbDomain.find(domain => domain.id === selectedId);
            
            // Check if markdown is available
            if (selectedDomain && selectedDomain.markDown) {
                return selectedDomain.markDown;
            } else if (selectedDomain) {
                // Check loading status
                if (selectedDomain.loadingStatus === 'loading') {
                    showStatus('Content is still loading. Please wait...', 'info');
                } else if (selectedDomain.loadingStatus === 'failed') {
                    showStatus('Failed to load content. Try refreshing.', 'error');
                } else {
                    showStatus('No content available. Content may be loading or failed to load.', 'error');
                }
                
                console.warn(`No markdown found for ${selectedId}. Loading status: ${selectedDomain.loadingStatus || 'unknown'}`);
                return '';
            }
            
            return '';
        } catch (error) {
            console.error('Error getting markdown:', error);
            showStatus('Error retrieving content: ' + error.message, 'error');
            return '';
        }
    }
    
    // Function to inject prompt into the active textarea
    async function injectPrompt() {
        try {
            const markdown = getMarkdownContent();
            if (!markdown) {
                showStatus('No markdown content available for selected knowledge base.', 'error');
                return;
            }
            
            // Find the textarea to inject into
            // First try ChatGPT-like interface
            let targetElement = document.querySelector("div#prompt-textarea p.placeholder");
            
            // If not found, try generic textarea or contenteditable
            if (!targetElement) {
                targetElement = document.querySelector("textarea:focus") || 
                               document.querySelector("[contenteditable='true']:focus");
            }
            
            if (!targetElement) {
                showStatus("Target textarea not found! Click into a text area first.", 'error');
                return;
            }
            
            // Inject the content based on element type
            if (targetElement.tagName.toLowerCase() === 'textarea') {
                // Standard textarea
                targetElement.value = markdown;
                targetElement.dispatchEvent(new Event("input", { bubbles: true }));
            } else if (targetElement.getAttribute('contenteditable') === 'true') {
                // Contenteditable div
                targetElement.textContent = markdown;
                targetElement.dispatchEvent(new Event("input", { bubbles: true }));
            } else {
                // ChatGPT-like element
                targetElement.innerText = markdown;
                targetElement.dispatchEvent(new Event("input", { bubbles: true }));
            }
            
            showStatus('Content injected successfully!', 'success');
            
            // Try to find and click the send button after a short delay
            setTimeout(() => {
                const sendButton = document.querySelector('button[data-testid="send-button"]');
                if (sendButton) {
                    sendButton.click();
                    console.log('Prompt injected and sent');
                } else {
                    console.log('Prompt injected, but send button not found');
                }
            }, 100);
        } catch (error) {
            console.error('Error injecting prompt:', error);
            showStatus('Failed to inject: ' + error.message, 'error');
        }
    }
    
    // Function to copy prompt to clipboard
    async function copyPrompt() {
        try {
            const markdown = getMarkdownContent();
            if (!markdown) {
                showStatus('No content available to copy.', 'error');
                return;
            }
            
            // Use Clipboard API if available
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(markdown);
                
                // Update button text to indicate success
                const copyBtn = document.getElementById('llmPrimer-copy-btn');
                if (copyBtn) {
                    const originalText = copyBtn.innerText;
                    copyBtn.innerText = '✓ Copied!';
                    setTimeout(() => {
                        copyBtn.innerText = originalText;
                    }, 2000);
                }
                
                showStatus('Content copied to clipboard!', 'success');
            } else {
                // Fallback for browsers without Clipboard API
                const textarea = document.createElement('textarea');
                textarea.value = markdown;
                textarea.style.position = 'fixed';
                textarea.style.left = '-999999px';
                textarea.style.top = '-999999px';
                
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                
                let success = false;
                try {
                    success = document.execCommand('copy');
                } catch (e) {
                    console.error('Error copying text:', e);
                }
                
                document.body.removeChild(textarea);
                
                if (success) {
                    const copyBtn = document.getElementById('llmPrimer-copy-btn');
                    if (copyBtn) {
                        const originalText = copyBtn.innerText;
                        copyBtn.innerText = '✓ Copied!';
                        setTimeout(() => {
                            copyBtn.innerText = originalText;
                        }, 2000);
                    }
                    
                    showStatus('Content copied to clipboard!', 'success');
                } else {
                    showStatus('Failed to copy text. Try again.', 'error');
                }
            }
        } catch (error) {
            console.error('Error copying prompt:', error);
            showStatus('Failed to copy: ' + error.message, 'error');
        }
    }
    
    // Function to toggle dark/light theme
    function toggleTheme() {
        try {
            const panel = document.getElementById('llmPrimer-panel');
            if (!panel) {
                throw new Error('Panel not found');
            }
            
            const isDarkTheme = panel.getAttribute('data-theme') === 'dark';
            
            if (isDarkTheme) {
                // Switch to light theme
                panel.setAttribute('data-theme', 'light');
                panel.style.backgroundColor = '#fff';
                panel.style.color = '#333';
                panel.style.border = '1px solid #ccc';
                
                // Update non-icon buttons
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#f0f0f0';
                    button.style.color = '#333';
                    button.style.border = '1px solid #ccc';
                });
                
                // Update selects
                const selects = panel.querySelectorAll('select');
                selects.forEach(select => {
                    select.style.backgroundColor = '#fff';
                    select.style.color = '#333';
                    select.style.border = '1px solid #ccc';
                });
                
                // Update theme button icon
                const themeBtn = document.getElementById('llmPrimer-theme-btn');
                themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
            } else {
                // Switch to dark theme
                panel.setAttribute('data-theme', 'dark');
                panel.style.backgroundColor = '#333';
                panel.style.color = '#fff';
                panel.style.border = '1px solid #555';
                
                // Update non-icon buttons
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#444';
                    button.style.color = '#fff';
                    button.style.border = '1px solid #666';
                });
                
                // Update selects
                const selects = panel.querySelectorAll('select');
                selects.forEach(select => {
                    select.style.backgroundColor = '#444';
                    select.style.color = '#fff';
                    select.style.border = '1px solid #666';
                });
                
                // Update theme button icon
                const themeBtn = document.getElementById('llmPrimer-theme-btn');
                themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
            }
            
            // Save theme preference
            localStorage.setItem('llmPrimer-theme', isDarkTheme ? 'light' : 'dark');
        } catch (error) {
            console.error('Error toggling theme:', error);
            showStatus('Error toggling theme', 'error');
        }
    }
    
    // Function to apply saved theme preference
    function applyTheme() {
        try {
            const panel = document.getElementById('llmPrimer-panel');
            if (!panel) {
                throw new Error('Panel not found');
            }
            
            const theme = localStorage.getItem('llmPrimer-theme') || 'light';
            
            if (theme === 'dark') {
                panel.setAttribute('data-theme', 'dark');
                panel.style.backgroundColor = '#333';
                panel.style.color = '#fff';
                panel.style.border = '1px solid #555';
                
                // Style non-icon buttons
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#444';
                    button.style.color = '#fff';
                    button.style.border = '1px solid #666';
                });
                
                // Style selects
                const selects = panel.querySelectorAll('select');
                selects.forEach(select => {
                    select.style.backgroundColor = '#444';
                    select.style.color = '#fff';
                    select.style.border = '1px solid #666';
                });
                
                // Update theme button icon
                const themeBtn = document.getElementById('llmPrimer-theme-btn');
                themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
            } else {
                panel.setAttribute('data-theme', 'light');
                panel.style.backgroundColor = '#fff';
                panel.style.color = '#333';
                panel.style.border = '1px solid #ccc';
                
                // Style non-icon buttons
                const buttons = panel.querySelectorAll('button:not([id="llmPrimer-theme-btn"]):not([id="llmPrimer-toggle-btn"]):not([id="llmPrimer-close-btn"])');
                buttons.forEach(button => {
                    button.style.backgroundColor = '#f0f0f0';
                    button.style.color = '#333';
                    button.style.border = '1px solid #ccc';
                });
                
                // Style selects
                const selects = panel.querySelectorAll('select');
                selects.forEach(select => {
                    select.style.backgroundColor = '#fff';
                    select.style.color = '#333';
                    select.style.border = '1px solid #ccc';
                });
                
                // Update theme button icon
                const themeBtn = document.getElementById('llmPrimer-theme-btn');
                themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
            }
        } catch (error) {
            console.error('Error applying theme:', error);
        }
    }
    
    // Function to toggle panel expansion/collapse
    function togglePanel() {
        try {
            const panel = document.getElementById('llmPrimer-panel');
            if (!panel) {
                throw new Error('Panel not found');
            }
            
            // Get all children except header (first child)
            const children = Array.from(panel.children).slice(1);
            const isMinimized = panel.getAttribute('data-minimized') === 'true';
            const toggleBtn = document.getElementById('llmPrimer-toggle-btn');
            
            if (isMinimized) {
                // Expand panel
                children.forEach(child => {
                    child.style.display = '';
                });
                panel.setAttribute('data-minimized', 'false');
                toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>';
            } else {
                // Collapse panel
                children.forEach(child => {
                    child.style.display = 'none';
                });
                panel.setAttribute('data-minimized', 'true');
                toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>';
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
