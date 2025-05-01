function injectText() {
  const textToInject = "Provide your thought process";
  
  try {
    // Get the textarea
    const textarea = document.getElementById('dialog-input-textarea');
    if (!textarea) {
      console.error("Textarea not found");
      return;
    }
    
    // Set the value directly
    textarea.value = textToInject;
    
    // Force focus to activate the shadow DOM
    textarea.focus();
    
    // Attempt to set text as if typing
    // This simulates actual keyboard input which might trigger necessary events
    document.execCommand('insertText', false, textToInject);
    
    // Dispatch multiple events to ensure the framework catches the change
    const events = ['input', 'change', 'keyup', 'keydown', 'keypress'];
    events.forEach(eventType => {
      const event = new Event(eventType, { bubbles: true });
      textarea.dispatchEvent(event);
    });
    
    // Create a keyboard event that might better trigger React's handlers
    const keyEvent = new KeyboardEvent('input', {
      bubbles: true,
      cancelable: true,
      key: 'a', // Doesn't matter, just needs to be a valid key
      code: 'KeyA'
    });
    textarea.dispatchEvent(keyEvent);
    
    // Click the button after a short delay
    setTimeout(() => {
      const button = document.querySelector('button[data-testid="dialog-input-send"]');
      if (button) {
        button.click();
        console.log("Button clicked");
      }
    }, 200);
    
  } catch(error) {
    console.error("Error injecting text:", error);
  }
}