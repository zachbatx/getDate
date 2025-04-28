// Theme Removal Script
// This script removes theming attributes from the HTML element and provides options
// for persisting this preference across page reloads

// Function to remove theme attributes from the HTML element
function removeThemeAttributes() {
  const htmlElement = document.documentElement;
  
  // Check if the HTML element has theme attributes
  const hasThemeAttributes = htmlElement.hasAttribute('data-theme') || 
                             htmlElement.hasAttribute('data-color-mode');
  
  if (hasThemeAttributes) {
    console.log('Removing theme attributes from HTML element');
    
    // Remove the theme attributes
    htmlElement.removeAttribute('data-theme');
    htmlElement.removeAttribute('data-color-mode');
    
    // Optionally, set a local storage flag to remember this preference
    localStorage.setItem('theme-removed', 'true');
    
    return true;
  }
  
  return false;
}

// Function to restore default styling if needed
function applyDefaultStyling() {
  // Apply any default styling you want after removing the theme
  // For example, you might want to set a specific background color
  document.documentElement.style.backgroundColor = '';
  document.documentElement.style.color = '';
  
  // Remove any theme-specific CSS classes from the body if needed
  document.body.classList.remove('dark-theme', 'light-theme');
}

// Main function to initialize the theme removal functionality
function initThemeRemover() {
  // Event listener for DOMContentLoaded to ensure the DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Check if we should remove the theme (either first time or based on stored preference)
    if (localStorage.getItem('theme-removed') === 'true' || removeThemeAttributes()) {
      applyDefaultStyling();
      console.log('Theme has been removed or was previously removed');
    }
    
    // Add a button or keyboard shortcut to toggle the theme removal
    // This is optional but useful for user control
    document.addEventListener('keydown', (event) => {
      // Example: Ctrl+Shift+T to toggle theme removal
      if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        const removed = removeThemeAttributes();
        if (removed) {
          applyDefaultStyling();
          console.log('Theme removed via keyboard shortcut');
        } else {
          console.log('No theme attributes found to remove');
          // Optionally, you could reload the page to restore the original theme
          // if (!removed && confirm('Restore original theme?')) location.reload();
        }
      }
    });
  });
  
  // Add a MutationObserver to detect if theme attributes are added dynamically
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && 
         (mutation.attributeName === 'data-theme' || 
          mutation.attributeName === 'data-color-mode')) {
        // If theme attributes are added dynamically, remove them again
        // (only if the user preference is to have them removed)
        if (localStorage.getItem('theme-removed') === 'true') {
          removeThemeAttributes();
          applyDefaultStyling();
          console.log('Dynamically added theme attributes removed');
        }
      }
    });
  });
  
  // Start observing the HTML element for attribute changes
  observer.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['data-theme', 'data-color-mode'] 
  });
}

// Initialize the theme remover
initThemeRemover();

// Provide a way to reset this preference if needed
window.resetThemePreference = function() {
  localStorage.removeItem('theme-removed');
  console.log('Theme removal preference has been reset');
  alert('Theme removal preference reset. Reload the page to see changes.');
};