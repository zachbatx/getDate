function injectTextViaSelection() {
  const textToInject = "Provide your thought process";
  
  try {
    const textarea = document.getElementById('dialog-input-textarea');
    if (!textarea) return;
    
    // Clear existing content first
    textarea.value = '';
    
    // Focus the element
    textarea.focus();
    
    // Use the selection API to insert text
    const selection = window.getSelection();
    const range = document.createRange();
    
    // This is a more "natural" way to insert text that might
    // better interact with the shadow DOM
    if (selection.rangeCount > 0) {
      selection.deleteFromDocument();
    }
    
    document.execCommand('insertText', false, textToInject);
    
    // Force sync events
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Click the button with delay
    setTimeout(() => {
      const button = document.querySelector('button[data-testid="dialog-input-send"]');
      if (button) button.click();
    }, 200);
    
  } catch(error) {
    console.error("Error with selection method:", error);
  }
}