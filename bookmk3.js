
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

  function createToggle() {
    const button = document.createElement("button");
    button.id = toggleButtonId;
    button.innerText = "Toggle Focusable Elements";
    button.style.position = "fixed";
    button.style.top = "10px";
    button.style.right = "10px";
    button.style.zIndex = "10000";
    document.body.appendChild(button);
    return button;
  }

  function createBadge(content) {
    const badge = document.createElement("span");
    badge.innerText = content;
    badge.classList.add(focusableElementsClass);
    badge.style.position = "absolute";
    badge.style.backgroundColor = "red";
    badge.style.color = "white";
    badge.style.padding = "1px 4px";
    badge.style.fontSize = "12px";
    badge.style.borderRadius = "3px";
    badge.style.zIndex = "9999";
    return badge;
  }

  function addBadgeToElem(elem, badge) {
    const rect = elem.getBoundingClientRect();
    badge.style.top = (rect.top + window.scrollY - badge.offsetHeight / 2) + "px";
    badge.style.left = (rect.left + window.scrollX - badge.offsetWidth / 2) + "px";
    document.body.appendChild(badge);
  }

  function highlightFocusableElements() {
    const focusableElems = document.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]):not([id="' + toggleButtonId + '"])'
    );

    focusableElems.forEach((elem, index) => {
      const badge = createBadge(index + 1);
      addBadgeToElem(elem, badge);
    });
  }

  function removeHighlightFocusableElements() {
    const badges = document.querySelectorAll("." + focusableElementsClass);
    badges.forEach((badge) => {
      badge.remove();
    });
  }

  function toggleFocusableElements() {
    const badges = document.querySelectorAll("." + focusableElementsClass);
    if (badges.length === 0) {
      highlightFocusableElements();
    } else {
      removeHighlightFocusableElements();
    }
  }

  const existingToggleButton = document.getElementById(toggleButtonId);
  if (!existingToggleButton) {
    const toggleButton = createToggle();
    toggleButton.addEventListener("click", toggleFocusableElements);
  }
}
	