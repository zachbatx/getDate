// Function to disable dark theming
function disableDarkTheming() {
    // Get the <html> element
    var htmlElement = document.documentElement;
    
    // Set data-color-mode to 'light'
    htmlElement.setAttribute('data-color-mode', 'light');
    
    // Set data-theme to 'light:original'
    htmlElement.setAttribute('data-theme', 'light:original');
}

// Set up a MutationObserver to watch for theme changes
function setupThemeObserver() {
    var htmlElement = document.documentElement;
    
    // Create a new MutationObserver
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'data-color-mode' || 
                 mutation.attributeName === 'data-theme')) {
                
                // Check if theme is not light
                var colorMode = htmlElement.getAttribute('data-color-mode');
                var theme = htmlElement.getAttribute('data-theme');
                
                if (colorMode !== 'light' || theme !== 'light:original') {
                    console.log('Theme change detected, reverting to light theme');
                    disableDarkTheming();
                }
            }
        });
    });
    
    // Start observing the html element for attribute changes
    observer.observe(htmlElement, {
        attributes: true,
        attributeFilter: ['data-color-mode', 'data-theme']
    });
    
    console.log('Theme observer active');
}

// Call the function to disable dark theming initially
disableDarkTheming();

// Set up the observer to prevent future theme changes
setupThemeObserver();