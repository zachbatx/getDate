function injectText() {
  const textToInject = "Provide your thought process";
  
  try {
    // Get the textarea directly by ID
    const textarea = document.querySelector("#dialog-input-textarea");
    
    if (!textarea) {
      console.error("Target textarea not found!");
      return;
    }
    
    // Set innerText instead of value (this is crucial)
    textarea.innerText = textToInject;
    
    // Dispatch a simple input event
    textarea.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    
    // Use setTimeout to click the button after text is injected
    setTimeout(() => {
      const button = document.querySelector('button[data-testid="dialog-input-send"]');
      if (button) {
        button.click();
        console.log("Prompt injected");
      } else {
        console.error("Send button not found!");
      }
    }, 100);
    
  } catch(e) {
    console.error("Error:", e);
    return;
  }
}