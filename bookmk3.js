window.onload = startBkMk();

function startBkMk() {
  const toggleButtonId = "toggle-focusable-elements";
  const focusableElementsClass = "focusable-element-badge";

  function getAllShadowRoots() {
    const shadowRoots = [];
    document.querySelectorAll('*').forEach((el) => {
      if (el.shadowRoot) {
        shadowRoots.push(el.shadowRoot);
      }
    });
    return shadowRoots;
  }

  function getFocusableElemsFromShadowRoots(shadowRoots) {
    const focusableElems = [];
    shadowRoots.forEach((shadowRoot) => {
      const elems = shadowRoot.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]):not([id="' + toggleButtonId + '"])'
      );
      focusableElems.push(...elems);
    });
    return focusableElems;
  }

  // ... rest of the code ...

  function highlightFocusableElements() {
    const shadowRoots = getAllShadowRoots();
    const shadowFocusableElems = getFocusableElemsFromShadowRoots(shadowRoots);

    const focusableElems = [
      ...document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]):not([id="' + toggleButtonId + '"])'
      ),
      ...shadowFocusableElems
    ];

    focusableElems.forEach((elem, index) => {
      const badge = createBadge(index + 1);
      addBadgeToElem(elem, badge);
    });
  }

  // ... rest of the code ...
}