// Theme Neutralizer Script
// This script targets only the dark/light theme attributes while preserving default styling

// Function to neutralize dark/light theme attributes
function neutralizeThemes() {
    const htmlElement = document.documentElement;
    
    // Save the original attributes for debugging
    const originalTheme = htmlElement.getAttribute('data-theme');
    const originalColorMode = htmlElement.getAttribute('data-color-mode');
    
    // Check if the HTML element has the specific theme attributes we want to target
    const hasTargetedTheme = (originalTheme && originalTheme.includes('dark:dark light:light')) ||
                            (originalColorMode && (originalColorMode === 'dark' || originalColorMode === 'light'));
    
    if (hasTargetedTheme) {
      console.log('Neutralizing dark/light theme attributes while preserving default styling');
      
      // For data-theme attribute, preserve everything except the dark/light parts
      if (originalTheme && originalTheme.includes('dark:dark light:light')) {
        // Replace only the "dark:dark light:light" part with an empty string
        // This preserves any other theming information that might be present
        const neutralizedTheme = originalTheme.replace('dark:dark light:light', '').trim();
        if (neutralizedTheme) {
          htmlElement.setAttribute('data-theme', neutralizedTheme);
        } else {
          // If nothing is left after removing the dark/light part, use a system default
          htmlElement.setAttribute('data-theme', 'system');
        }
      }
      
      // For data-color-mode, set to 'system' or another neutral value instead of removing
      if (originalColorMode && (originalColorMode === 'dark' || originalColorMode === 'light')) {
        // Use 'system' as a safe fallback that typically uses browser/OS preference
        htmlElement.setAttribute('data-color-mode', 'system');
      }
      
      // Store original values in case we want to restore them later
      localStorage.setItem('original-theme', originalTheme || '');
      localStorage.setItem('original-color-mode', originalColorMode || '');
      localStorage.setItem('themes-neutralized', 'true');
      
      console.log(`Theme neutralized: data-theme changed from "${originalTheme}" to "${htmlElement.getAttribute('data-theme')}"`);
      console.log(`Color mode neutralized: data-color-mode changed from "${originalColorMode}" to "${htmlElement.getAttribute('data-color-mode')}"`);
      
      return true;
    }
    
    return false;
  }
  
  // Function to restore original theme attributes if needed
  function restoreOriginalThemes() {
    if (localStorage.getItem('themes-neutralized') === 'true') {
      const htmlElement = document.documentElement;
      const originalTheme = localStorage.getItem('original-theme');
      const originalColorMode = localStorage.getItem('original-color-mode');
      
      if (originalTheme) {
        htmlElement.setAttribute('data-theme', originalTheme);
      }
      
      if (originalColorMode) {
        htmlElement.setAttribute('data-color-mode', originalColorMode);
      }
      
      localStorage.removeItem('themes-neutralized');
      localStorage.removeItem('original-theme');
      localStorage.removeItem('original-color-mode');
      
      console.log('Original theme attributes restored');
      return true;
    }
    
    return false;
  }
  
  // Main function to initialize the theme neutralizer
  function initThemeNeutralizer() {
    // Apply neutralization immediately if previously applied
    if (localStorage.getItem('themes-neutralized') === 'true') {
      neutralizeThemes();
    }
    
    // Event listener for DOMContentLoaded to ensure the DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize on load if needed
      if (localStorage.getItem('themes-neutralized') === 'true') {
        neutralizeThemes();
      }
      
      // Add keyboard shortcut to toggle theme neutralization
      document.addEventListener('keydown', (event) => {
        // Example: Ctrl+Shift+T to toggle theme neutralization
        if (event.ctrlKey && event.shiftKey && event.key === 'T') {
          if (localStorage.getItem('themes-neutralized') === 'true') {
            const restored = restoreOriginalThemes();
            if (restored) {
              console.log('Original themes restored via keyboard shortcut');
            }
          } else {
            const neutralized = neutralizeThemes();
            if (neutralized) {
              console.log('Themes neutralized via keyboard shortcut');
            } else {
              console.log('No targeted theme attributes found to neutralize');
            }
          }
        }
      });
    });
    
    // Add a MutationObserver to maintain the neutralized state if needed
    const observer = new MutationObserver((mutations) => {
      // Only react if we've previously chosen to neutralize themes
      if (localStorage.getItem('themes-neutralized') === 'true') {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && 
             (mutation.attributeName === 'data-theme' || 
              mutation.attributeName === 'data-color-mode')) {
            // If theme attributes are changed, re-apply our neutralization
            neutralizeThemes();
          }
        });
      }
    });
    
    // Start observing the HTML element for attribute changes
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme', 'data-color-mode'] 
    });
    
    // Initial check to neutralize themes if they exist
    neutralizeThemes();
  }
  
  // Initialize the theme neutralizer
  initThemeNeutralizer();
  
  // Provide a way to toggle theme neutralization
  window.toggleThemeNeutralization = function() {
    if (localStorage.getItem('themes-neutralized') === 'true') {
      restoreOriginalThemes();
      alert('Original themes restored. The page may need to be refreshed to see all changes.');
    } else {
      neutralizeThemes();
      alert('Dark/light themes neutralized while preserving default styling.');
    }
  };