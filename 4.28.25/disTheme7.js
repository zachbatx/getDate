// Function to disable website dark theming, browser dark mode, and macOS dark mode
function disableDarkMode() {
    // Get the <html> element
    var htmlElement = document.documentElement;
    
    // Set data-color-mode to 'light'
    htmlElement.setAttribute('data-color-mode', 'light');
    
    // Set data-theme to 'light:original'
    htmlElement.setAttribute('data-theme', 'light:original');
    
    // Create a meta tag to disable browser dark mode
    var metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'color-scheme');
    metaTag.setAttribute('content', 'light');
    document.head.appendChild(metaTag);
    
    // Add CSS to forcibly override browser and macOS dark mode
    var styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Force light mode at root level */
        html {
            color-scheme: light !important;
            forced-color-adjust: none !important;
        }
        
        /* Target macOS dark mode via media query */
        @media (prefers-color-scheme: dark) {
            /* Force light mode even when system prefers dark */
            :root {
                background-color: white !important;
                color: black !important;
            }
            
            /* Override common macOS dark mode variables */
            :root {
                --apple-system-gray: #8E8E93 !important;
                --system-background-color: white !important;
                --system-label-color: black !important;
                --system-secondary-label-color: #3C3C43 !important;
                --system-tertiary-label-color: #8E8E93 !important;
                --system-quaternary-label-color: #C5C5C7 !important;
                --system-fill-color: #787880 !important;
                --system-secondary-fill-color: #787880 !important;
                --system-tertiary-fill-color: #787880 !important;
                --system-quaternary-fill-color: #787880 !important;
                --system-background: white !important;
                --system-secondary-background: #F2F2F7 !important;
                --system-tertiary-background: #FFFFFF !important;
                --system-grouped-background: #F2F2F7 !important;
                --system-secondary-grouped-background: #FFFFFF !important;
                --system-tertiary-grouped-background: #F2F2F7 !important;
            }
            
            /* Force Safari to use light mode (macOS specific) */
            body, div, p, h1, h2, h3, h4, h5, h6, span, a, input, button, textarea, select, option {
                background-color: initial !important;
                color: initial !important;
                border-color: initial !important;
            }
            
            /* Disable dark reader and similar extensions */
            .darkreader, [data-darkreader-mode], [data-darkreader-scheme] {
                background-color: white !important;
                color: black !important;
            }
            
            /* Additional Safari/WebKit specific overrides */
            input, textarea, select {
                -webkit-appearance: none !important;
                background-color: white !important;
                color: black !important;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Force application of styles by triggering a reflow
    void document.documentElement.offsetHeight;
}

// Call the function to disable dark theming
disableDarkMode();