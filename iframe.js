<iframe id="myIframe" src="your-content.html" title="Same-Origin Iframe"></iframe>

<script>
  const iframe = document.getElementById('myIframe');
  iframe.addEventListener('load', () => {
    try {
      // Access the iframe's document (works if it's same-origin)
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const styleEl = iframeDoc.createElement('style');
      styleEl.textContent = `
        body {
          background-color: #f0f0f0;
          color: #333;
          font-family: Arial, sans-serif;
        }
      `;
      iframeDoc.head.appendChild(styleEl);
    } catch (error) {
      console.error('Error accessing iframe content:', error);
    }
  });
</script>


const iframe = document.getElementById('myCrossOriginIframe');
iframe.addEventListener('load', () => {
  // Send a message to the iframe
  iframe.contentWindow.postMessage({ action: 'applyStyles', styles: 'body { background: #e0e0e0; }' }, '*');
});


window.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'applyStyles') {
    const styleEl = document.createElement('style');
    styleEl.textContent = event.data.styles;
    document.head.appendChild(styleEl);
  }
});


const myIframe = document.getElementById('mySameOriginIframe');

myIframe.addEventListener('load', function() {
  try {
    // Access the iframe's document
    const iframeDoc = myIframe.contentDocument || myIframe.contentWindow.document;

    if (!iframeDoc) {
      console.error("Could not access iframe document.");
      return;
    }

    // --- Option 1: Inject a <style> tag ---
    const style = iframeDoc.createElement('style');
    style.textContent = `
      body {
        background-color: lightblue !important;
        font-family: sans-serif !important;
      }
      h1 {
        color: navy !important;
      }
      /* Add more styles here */
    `;
    iframeDoc.head.appendChild(style);

    // --- Option 2: Directly manipulate element styles ---
    const heading = iframeDoc.querySelector('h1');
    if (heading) {
      heading.style.borderBottom = '2px solid red';
    }

    console.log("Styles applied to same-origin iframe.");

  } catch (e) {
    // This catch block might run if there's an unexpected issue,
    // even on the same origin, though direct SOP errors are less likely here.
    console.error("Error accessing or styling same-origin iframe:", e);
  }
});

// Make sure the iframe has an ID
// <iframe id="mySameOriginIframe" src="/path/on/same/domain.html"></iframe>