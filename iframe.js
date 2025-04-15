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
