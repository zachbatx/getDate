//LATE LOADING

const waitFor = (sel, timeout = 3000) =>
  new Promise((res, rej) => {
    const el = document.querySelector(sel);
    if (el) return res(el);

    const obs = new MutationObserver(() => {
      const found = document.querySelector(sel);
      if (found) {
        obs.disconnect();
        res(found);
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      obs.disconnect();
      rej(new Error(`Timed out waiting for ${sel}`));
    }, timeout);
  });

async function injectTextAsync(text = "Provide your thought process") {
  try {
    const textarea = await waitFor("#dialog-input-textarea");
    textarea.focus();
    textarea.value = text;
    textarea.dispatchEvent(new InputEvent("input", { bubbles: true }));

    document
      .querySelector('div[data-testid="text-area-multiline"]')
      ?.setAttribute("data-input", text);

    const btn = await waitFor('button[data-testid="dialog-input-send"]');
    btn.disabled = false;
    btn.classList.remove("saltButton-disabled");
    btn.click();
  } catch (err) {
    console.error("Injection failed:", err);
  }
}

// LEANER
const injectText = (text = "Provide your thought process") => {
    const actions = [
      {
        selector: "#dialog-input-textarea",
        run: el => {
          el.focus();
          el.value = text;
          el.dispatchEvent(new InputEvent("input", { bubbles: true }));
        }
      },
      {
        selector: 'div[data-testid="text-area-multiline"]',
        run: el => el.setAttribute("data-input", text)
      },
      {
        selector: 'button[data-testid="dialog-input-send"]',
        run: el => {
          el.disabled = false;
          el.classList.remove("saltButton-disabled");
          el.click();
        }
      }
    ];
  
    actions.forEach(({ selector, run }) => {
      const el = document.querySelector(selector);
      if (el) {
        try {
          run(el);
        } catch (err) {
          console.error(`Error running action on ${selector}:`, err);
        }
      } else {
        console.warn(`Element not found: ${selector}`);
      }
    });
  };

  
  //CL 
  function injectText() {
    // Define the text to be injected
    const textToInject = "Provide your thought process";
    
    try {
      // Find the textarea element by its ID
      const textarea = document.getElementById('dialog-input-textarea');
      if (textarea) {
        // Focus and set value
        textarea.focus();
        textarea.value = textToInject;
        
        // Create and dispatch an input event to trigger any listeners
        const inputEvent = new Event('input', { bubbles: true });
        textarea.dispatchEvent(inputEvent);
      }
      
      // Find the div element with data-testid attribute
      const divMultiline = document.querySelector('div[data-testid="text-area-multiline"]');
      if (divMultiline) {
        divMultiline.setAttribute('data-input', textToInject);
      }
      
      // Find and enable the send button
      const button = document.querySelector('button[data-testid="dialog-input-send"]');
      if (button) {
        // Enable the button
        button.disabled = false;
        button.classList.remove('saltButton-disabled');
        
        // Click the button
        button.click();
      } else {
        console.warn('Send button not found');
      }
    } catch (error) {
      console.error('Error injecting text:', error);
    }
  }