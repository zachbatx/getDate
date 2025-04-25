document.addEventListener('DOMContentLoaded', function() {
  // Get the Pre-recorded div
  const preRecorded = document.getElementById('Pre-recorded');
  
  if (!preRecorded) {
    console.error('Pre-recorded div not found');
    return;
  }
  
  // Get all navSection divs that are direct children of Pre-recorded
  const navSections = Array.from(preRecorded.querySelectorAll(':scope > .navSection'));
  
  if (navSections.length === 0) {
    console.warn('No navSection divs found as direct children of Pre-recorded');
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
  
  // Append all sorted navSections back to the Pre-recorded div
  preRecorded.appendChild(fragment);
  
  console.log('Successfully sorted navSections in Pre-recorded');
});