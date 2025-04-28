// Function to disable both website dark theming and browser dark mode
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
    
    // Add CSS to forcibly override browser dark mode
    var styleElement = document.createElement('style');
    styleElement.textContent = `
        html {
            color-scheme: light !important;
        }
        
        @media (prefers-color-scheme: dark) {
            /* Force light mode even when browser prefers dark */
            :root {
                background-color: white !important;
                color: black !important;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Call the function to disable dark theming
disableDarkMode();