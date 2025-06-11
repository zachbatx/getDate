javascriptdocument.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Store original clipboard methods
        const originalClipboard = {
            writeText: navigator.clipboard?.writeText,
            write: navigator.clipboard?.write,
            readText: navigator.clipboard?.readText,
            read: navigator.clipboard?.read
        };
        
        // Store original execCommand
        const originalExecCommand = document.execCommand;
        
        // Override clipboard API to prevent the prompt
        if (navigator.clipboard) {
            navigator.clipboard.writeText = () => Promise.resolve();
            navigator.clipboard.write = () => Promise.resolve();
            navigator.clipboard.readText = () => Promise.resolve('');
            navigator.clipboard.read = () => Promise.resolve([]);
        }
        
        // Override execCommand to block copy/cut operations
        document.execCommand = function(command) {
            if (command === 'copy' || command === 'cut' || command === 'paste') {
                return true; // Pretend it succeeded
            }
            return originalExecCommand.apply(document, arguments);
        };
        
        // Also intercept copy events
        const preventCopy = (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        };
        
        document.addEventListener('copy', preventCopy, true);
        document.addEventListener('cut', preventCopy, true);
        
        // Now click all the buttons
        const buttons = document.querySelectorAll("button.css-117n0sn");
        console.log(`Found ${buttons.length} buttons to click`);
        
        buttons.forEach((button, index) => {
            try {
                button.click();
                console.log(`Clicked button ${index + 1}`);
            } catch (error) {
                console.error(`Error clicking button ${index + 1}:`, error);
            }
        });
        
        // Restore everything after a short delay
        setTimeout(function() {
            // Restore clipboard API
            if (navigator.clipboard && originalClipboard.writeText) {
                navigator.clipboard.writeText = originalClipboard.writeText;
                navigator.clipboard.write = originalClipboard.write;
                navigator.clipboard.readText = originalClipboard.readText;
                navigator.clipboard.read = originalClipboard.read;
            }
            
            // Restore execCommand
            document.execCommand = originalExecCommand;
            
            // Remove copy event listener
            document.removeEventListener('copy', preventCopy, true);
            document.removeEventListener('cut', preventCopy, true);
            
            console.log('Clipboard functionality restored');
        }, 500);
        
    }, 2000);
});
Alternative: More Aggressive Approach
If the above doesn't work, here's a more aggressive version that completely neuters clipboard access during the operation:
javascriptdocument.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Create a completely fake clipboard object
        const fakeClipboard = {
            writeText: () => Promise.resolve(),
            write: () => Promise.resolve(),
            readText: () => Promise.resolve(''),
            read: () => Promise.resolve([])
        };
        
        // Save the real clipboard
        const realClipboard = navigator.clipboard;
        
        // Replace with fake
        Object.defineProperty(navigator, 'clipboard', {
            value: fakeClipboard,
            writable: true,
            configurable: true
        });
        
        // Block all clipboard-related events
        const blockEvent = (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData('text/plain', '');
                e.clipboardData.setData('text/html', '');
            }
            return false;
        };
        
        // Add blocking listeners with highest priority
        ['copy', 'cut', 'paste', 'beforecopy', 'beforecut', 'beforepaste'].forEach(eventType => {
            document.addEventListener(eventType, blockEvent, true);
            window.addEventListener(eventType, blockEvent, true);
        });
        
        // Override execCommand
        const originalExecCommand = document.execCommand;
        document.execCommand = function(cmd) {
            if (['copy', 'cut', 'paste'].includes(cmd)) {
                return true;
            }
            return originalExecCommand.apply(this, arguments);
        };
        
        // Click the buttons
        const buttons = document.querySelectorAll("button.css-117n0sn");
        buttons.forEach(button => {
            button.click();
        });
        
        // Clean up after 1 second
        setTimeout(() => {
            // Restore real clipboard
            Object.defineProperty(navigator, 'clipboard', {
                value: realClipboard,
                writable: true,
                configurable: true
            });
            
            // Remove event listeners
            ['copy', 'cut', 'paste', 'beforecopy', 'beforecut', 'beforepaste'].forEach(eventType => {
                document.removeEventListener(eventType, blockEvent, true);
                window.removeEventListener(eventType, blockEvent, true);
            });
            
            // Restore execCommand
            document.execCommand = originalExecCommand;
        }, 1000);
        
    }, 2000);
});
Simplest Working Solution
If you just need something that works without all the cleanup:
javascriptdocument.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Kill clipboard access completely
        navigator.clipboard = {
            writeText: () => Promise.resolve(),
            write: () => Promise.resolve(),
            readText: () => Promise.resolve(''),
            read: () => Promise.resolve([])
        };
        
        // Click all buttons
        document.querySelectorAll("button.css-117n0sn").forEach(btn => btn.click());
    }, 2000);
});
This will prevent the clipboard prompt from appearing. The buttons will still be clicked and perform their other functions, but any clipboard operations will be silently ignored.