/**
 * Script to find hex color pairs and create contrast sample divs
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add CSS for contrast divs
  const style = document.createElement('style');
  style.textContent = `
    .contrastingColors {
      padding: 5px 10px;
      display: inline-block;
      margin: 5px 0;
      border-radius: 3px;
      font-family: sans-serif;
    }
  `;
  document.head.appendChild(style);
  
  // Process the initial page
  processPage();
  
  // Set up mutation observer for dynamic content
  const observer = new MutationObserver(function(mutations) {
    let shouldProcess = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldProcess = true;
      }
    });
    
    if (shouldProcess) {
      processPage();
    }
  });
  
  // Start observing
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Main function to process the page
  function processPage() {
    // Find text nodes
    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip empty nodes, scripts, styles, and already processed nodes
          if (node.nodeValue.trim() === '') return NodeFilter.FILTER_SKIP;
          if (node.parentNode.nodeName === 'SCRIPT' || 
              node.parentNode.nodeName === 'STYLE' ||
              node.parentNode.className === 'contrastingColors') {
            return NodeFilter.FILTER_SKIP;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    
    // Collect nodes with hex pairs
    const nodesToProcess = [];
    let currentNode;
    
    while ((currentNode = treeWalker.nextNode())) {
      // Match quoted or unquoted hex pairs
      if (/["']?#[0-9A-Fa-f]{6}\/#[0-9A-Fa-f]{6}["']?/.test(currentNode.nodeValue)) {
        nodesToProcess.push(currentNode);
      }
    }
    
    // Process each node
    nodesToProcess.forEach(textNode => {
      const text = textNode.nodeValue;
      // Regex with groups to capture quotes, hex codes, and separator
      const regex = /(["']?)(#[0-9A-Fa-f]{6})\/(#[0-9A-Fa-f]{6})(["']?)/g;
      
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        }
        
        // Extract parts
        const openQuote = match[1] || '';
        const foreground = match[2];
        const background = match[3];
        const closeQuote = match[4] || '';
        
        // Add the original text with quotes
        const originalText = document.createTextNode(openQuote + foreground + '/' + background + closeQuote);
        fragment.appendChild(originalText);
        
        // Create contrast div
        const contrastDiv = document.createElement('div');
        contrastDiv.className = 'contrastingColors';
        contrastDiv.textContent = 'Sample';
        contrastDiv.style.color = foreground;
        contrastDiv.style.backgroundColor = background;
        
        // Add div and line break
        fragment.appendChild(contrastDiv);
        fragment.appendChild(document.createElement('br'));
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      }
      
      // Replace original node
      if (textNode.parentNode) {
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    });
  }
});