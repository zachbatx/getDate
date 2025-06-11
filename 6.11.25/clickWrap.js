Solution 1: Prevent Default Clipboard Actions
javascriptdocument.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const buttons = document.querySelectorAll("button.css-117n0sn");
        
        buttons.forEach(function(button) {
            // Clone the button to remove all event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add a new click handler that prevents clipboard access
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // If you need to trigger some other action, do it here
                console.log('Button clicked without clipboard access');
            });
            
            // Trigger the click
            newButton.click();
        });
    }, 2000);
});
Solution 2: Override Clipboard API Temporarily
javascriptdocument.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Temporarily override clipboard methods
        const originalWriteText = navigator.clipboard.writeText;
        const originalWrite = navigator.clipboard.write;
        
        navigator.clipboard.writeText = function() {
            console.log('Clipboard write prevented');
            return Promise.resolve();
        };
        
        navigator.clipboard.write = function() {
            console.log('Clipboard write prevented');
            return Promise.resolve();
        };
        
        // Also override the older execCommand method
        const originalExecCommand = document.execCommand;
        document.execCommand = function(command) {
            if (command === 'copy' || command === 'cut') {
                console.log('Clipboard operation prevented:', command);
                return true;
            }
            return originalExecCommand.apply(document, arguments);
        };
        
        // Click the buttons
        const buttons = document.querySelectorAll("button.css-117n0sn");
        buttons.forEach(button => button.click());
        
        // Restore original functions after a delay
        setTimeout(function() {
            navigator.clipboard.writeText = originalWriteText;
            navigator.clipboard.write = originalWrite;
            document.execCommand = originalExecCommand;
        }, 1000);
    }, 2000);
});
Solution 3: Target Specific Confluence Functionality
If these are "Copy" buttons in Confluence (for copying code blocks or content), you might want to expand/collapse content instead:
javascriptdocument.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Instead of clicking copy buttons, find what you actually need
        // For example, if you want to expand all code blocks:
        const codeBlocks = document.querySelectorAll('.code-block, .expand-control');
        codeBlocks.forEach(block => {
            if (block.classList.contains('collapsed')) {
                block.click();
            }
        });
        
        // Or if you want to select all text without copying:
        const codeContents = document.querySelectorAll('pre code, .code-content');
        codeContents.forEach(code => {
            const range = document.createRange();
            range.selectNodeContents(code);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            // Don't execute copy command
        });
    }, 2000);
});
Solution 4: Intercept and Modify Button Behavior
javascriptdocument.addEventListener("DOMContentLoaded", function() {
    // Intercept all click events at the document level
    document.addEventListener('click', function(e) {
        if (e.target.matches('button.css-117n0sn')) {
            e.preventDefault();
            e.stopPropagation();
            
            // Perform alternative action
            const buttonText = e.target.textContent;
            console.log('Intercepted button click:', buttonText);
            
            // You can still trigger other actions here if needed
            // Just avoid clipboard operations
        }
    }, true); // Use capture phase
    
    setTimeout(function() {
        const buttons = document.querySelectorAll("button.css-117n0sn");
        
        buttons.forEach(function(button) {
            // Create a synthetic click that won't trigger clipboard
            const event = new MouseEvent('click', {
                bubbles: false, // Don't bubble to avoid other handlers
                cancelable: true
            });
            button.dispatchEvent(event);
        });
    }, 2000);
});
Recommended Approach for Confluence
Since you're in Confluence, the most reliable solution is to identify what you're actually trying to achieve and target that directly:
javascriptdocument.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Option 1: If you want to expand all collapsed sections
        document.querySelectorAll('.expand-container.conf-macro.output-block')
            .forEach(el => {
                if (el.classList.contains('collapsed')) {
                    el.querySelector('.expand-control').click();
                }
            });
        
        // Option 2: If you want to highlight code without copying
        document.querySelectorAll('pre.syntaxhighlighter-pre')
            .forEach(pre => {
                pre.style.backgroundColor = '#f0f0f0';
                pre.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        
        // Option 3: If you must click those buttons but avoid clipboard
        const buttons = document.querySelectorAll("button.css-117n0sn");
        if (buttons.length > 0) {
            // Override clipboard temporarily
            const tempClipboard = {
                writeText: () => Promise.resolve(),
                write: () => Promise.resolve()
            };
            Object.defineProperty(navigator, 'clipboard', {
                value: tempClipboard,
                configurable: true
            });
            
            buttons.forEach(button => button.click());
            
            // Restore after a delay
            setTimeout(() => {
                delete navigator.clipboard;
            }, 100);
        }
    }, 2000);
});
The best solution depends on what these buttons actually do in your Confluence instance. If you can share what you're trying to achieve (expand content, navigate, etc.), I can provide a more targeted solution that avoids the clipboard entirely.