/**
 * Applies background colors to elements with class 'colorBg' based on their text content
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoTextColor - Sets text color based on background brightness
 * @param {boolean} options.addHoverEffect - Adds subtle hover effect
 * @param {boolean} options.observeChanges - Watches for new elements added to DOM
 * @param {boolean} options.hideColorCode - Hides the color code text after applying
 */
function applyColorBgFromText(options = {}) {
  // Default options
  const settings = {
    autoTextColor: true,
    addHoverEffect: false,
    observeChanges: true,
    hideColorCode: false,
    ...options
  };

  /**
   * Validates and normalizes a hex color
   * @param {string} color - The color to validate
   * @returns {string|null} - Normalized color or null if invalid
   */
  function validateAndNormalizeColor(color) {
    // Remove whitespace
    const trimmedColor = color.trim();
    
    // Check if it's a valid hex color
    const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    
    if (!hexRegex.test(trimmedColor)) {
      console.warn(`Invalid hex color format: ${trimmedColor}`);
      return null;
    }
    
    // Ensure it has a # prefix
    return trimmedColor.startsWith('#') ? trimmedColor : `#${trimmedColor}`;
  }
  
  /**
   * Determines if a color is light or dark
   * @param {string} hexColor - The hex color
   * @returns {boolean} - True if color is light
   */
  function isLightColor(hexColor) {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert to RGB
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    
    // Calculate perceived brightness (YIQ formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 128;
  }
  
  /**
   * Applies styling to a single element
   * @param {Element} element - The DOM element to style
   */
  function applyStyleToElement(element) {
    try {
      // Get the original text content
      const originalText = element.textContent.trim();
      
      // Validate and normalize the color
      const hexColor = validateAndNormalizeColor(originalText);
      
      if (!hexColor) return; // Skip invalid colors
      
      // Apply the background color
      element.style.backgroundColor = hexColor;
      
      // Set text color based on background brightness if autoTextColor is enabled
      if (settings.autoTextColor) {
        element.style.color = isLightColor(hexColor) ? '#000000' : '#ffffff';
      }
      
      // Hide the color code if enabled
      if (settings.hideColorCode) {
        element.textContent = '';
      }
      
      // Add hover effect if enabled
      if (settings.addHoverEffect) {
        element.style.transition = 'all 0.3s ease';
        element.addEventListener('mouseenter', () => {
          element.style.filter = 'brightness(1.1)';
          element.style.transform = 'scale(1.02)';
        });
        element.addEventListener('mouseleave', () => {
          element.style.filter = 'brightness(1)';
          element.style.transform = 'scale(1)';
        });
      }
      
      // Mark as processed
      element.classList.add('colorBg-applied');
    } catch (error) {
      console.error(`Error applying style to element:`, error, element);
    }
  }
  
  /**
   * Processes all matching elements
   */
  function processElements() {
    // Select all elements with the class "colorBg" that haven't been processed yet
    const colorBgElements = document.querySelectorAll('.colorBg:not(.colorBg-applied)');
    
    // Iterate through each element
    colorBgElements.forEach(applyStyleToElement);
  }
  
  // Initial processing
  processElements();
  
  // Set up an observer to detect new elements if enabled
  if (settings.observeChanges) {
    const observer = new MutationObserver((mutations) => {
      let hasNewElements = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          hasNewElements = true;
        }
      });
      
      if (hasNewElements) {
        processElements();
      }
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Return controller to manually trigger processing
  return {
    refresh: processElements
  };
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize with default options
  window.colorBgController = applyColorBgFromText();
});