//address react states

function injectText() {
    const textToInject = "Provide your thought process";
    
    try {
      // Get the actual textarea element
      const textarea = document.getElementById('dialog-input-textarea');
      
      if (textarea) {
        // Focus on the textarea
        textarea.focus();
        
        // Set the value directly
        textarea.value = textToInject;
        
        // Simulate typing events - crucial for React-based forms
        // Input event
        const inputEvent = new Event('input', { bubbles: true });
        textarea.dispatchEvent(inputEvent);
        
        // Change event 
        const changeEvent = new Event('change', { bubbles: true });
        textarea.dispatchEvent(changeEvent);
        
        // For React forms, this additional step may be necessary
        // to update the internal state
        Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(
          textarea, textToInject
        );
        
        // Dispatch events again after forced value update
        textarea.dispatchEvent(inputEvent);
        textarea.dispatchEvent(changeEvent);
        
        console.log('Text injection attempted');
      } else {
        console.warn('Textarea not found');
      }
      
      // The data-input attribute on the div needs to be updated too
      const divMultiline = document.querySelector('div[data-testid="text-area-multiline"]');
      if (divMultiline) {
        divMultiline.setAttribute('data-input', textToInject);
      }
      
      // Enable and click the send button
      const button = document.querySelector('button[data-testid="dialog-input-send"]');
      if (button) {
        button.disabled = false;
        if (button.classList.contains('saltButton-disabled')) {
          button.classList.remove('saltButton-disabled');
        }
        setTimeout(() => button.click(), 100); // Small delay to ensure events process
      }
    } catch (error) {
      console.error('Error injecting text:', error);
    }
  }

  //address clipboard

  async function injectTextAlternative() {
  const textToInject = "Provide your thought process";
  
  try {
    // Save current clipboard content
    const originalClipboard = await navigator.clipboard.readText().catch(() => "");
    
    // Copy our text to clipboard
    await navigator.clipboard.writeText(textToInject);
    
    // Focus the textarea
    const textarea = document.getElementById('dialog-input-textarea');
    if (textarea) {
      textarea.focus();
      
      // Execute paste command
      document.execCommand('paste');
      
      // Restore original clipboard
      setTimeout(() => navigator.clipboard.writeText(originalClipboard), 100);
      
      // Click the button after a delay
      const button = document.querySelector('button[data-testid="dialog-input-send"]');
      if (button) {
        setTimeout(() => button.click(), 200);
      }
    }
  } catch (error) {
    console.error('Error with clipboard method:', error);
  }
}