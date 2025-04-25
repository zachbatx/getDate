document.addEventListener('DOMContentLoaded', function() {
    // Create a reusable function for sorting navSections within a container
    function sortNavSections(containerId) {
      // Get the container element
      const container = document.getElementById(containerId);
      
      if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
      }
      
      // Get all navSection divs that are direct children of the container
      const navSections = Array.from(container.querySelectorAll(':scope > .navSection'));
      
      if (navSections.length === 0) {
        console.warn(`No navSection divs found as direct children of "${containerId}"`);
        return;
      }
      
      // Sort navSections based on the text content of the h3 in the second columnMacro
      navSections.sort(function(a, b) {
        // Find the h3 in the second columnMacro of each navSection
        const aColumnMacros = a.querySelectorAll(':scope > .columnMacro');
        const bColumnMacros = b.querySelectorAll(':scope > .columnMacro');
        
        // Default to empty string if we can't find the h3
        let aText = '';
        let bText = '';
        
        // Make sure there are at least 2 columnMacro divs
        if (aColumnMacros.length > 1) {
          const aH3 = aColumnMacros[1].querySelector('h3');
          if (aH3) {
            aText = aH3.textContent.trim().toLowerCase();
          }
        }
        
        if (bColumnMacros.length > 1) {
          const bH3 = bColumnMacros[1].querySelector('h3');
          if (bH3) {
            bText = bH3.textContent.trim().toLowerCase();
          }
        }
        
        // Compare the text
        return aText.localeCompare(bText);
      });
      
      // Document fragment to hold the sorted elements temporarily
      const fragment = document.createDocumentFragment();
      
      // Move all navSections to the fragment (which detaches them from the DOM)
      navSections.forEach(function(section) {
        fragment.appendChild(section);
      });
      
      // Append all sorted navSections back to the container div
      container.appendChild(fragment);
      
      console.log(`Successfully sorted navSections in "${containerId}"`);
    }
    
    // Sort both containers
    sortNavSections('Pre-recorded');
    sortNavSections('LocalEvents');
  });