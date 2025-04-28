(function() {
  const html = document.documentElement;

  // 1. Capture your original theme settings
  const originalColorMode = html.getAttribute('data-color-mode');
  const originalTheme     = html.getAttribute('data-theme');

  // 2. Function to restore exactly what was there on load
  function restoreOriginalTheme() {
    if (originalColorMode !== null) {
      html.setAttribute('data-color-mode', originalColorMode);
    } else {
      html.removeAttribute('data-color-mode');
    }

    if (originalTheme !== null) {
      html.setAttribute('data-theme', originalTheme);
    } else {
      html.removeAttribute('data-theme');
    }
  }

  // 3. Immediately revert to original
  restoreOriginalTheme();

  // 4. Watch for any future attribute changes on <html>
  const observer = new MutationObserver(() => {
    restoreOriginalTheme();
  });
  observer.observe(html, {
    attributes:       true,
    attributeFilter: ['data-color-mode','data-theme']
  });

  // 5. Also catch OS/browser theme flips
  const darkMQ  = window.matchMedia('(prefers-color-scheme: dark)');
  const lightMQ = window.matchMedia('(prefers-color-scheme: light)');
  const shield   = restoreOriginalTheme;

  if (typeof darkMQ.addEventListener === 'function') {
    darkMQ.addEventListener('change', shield);
    lightMQ.addEventListener('change', shield);
  } else {
    // legacy
    darkMQ.addListener(shield);
    lightMQ.addListener(shield);
  }
})();
