javascript:(function() {
  let focusableElems = document.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
  let headingElems = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  function createBadge(content) {
    const badge = document.createElement('span');
    badge.innerText = content;
    badge.style.position = 'absolute';
    badge.style.backgroundColor = 'red';
    badge.style.color = 'white';
    badge.style.padding = '1px 4px';
    badge.style.fontSize = '12px';
    badge.style.borderRadius = '3px';
    badge.style.zIndex = '9999';
    return badge;
  }

  function addBadgeToElem(elem, badge) {
    const rect = elem.getBoundingClientRect();
    badge.style.top = (rect.top + window.scrollY - badge.offsetHeight / 2) + 'px';
    badge.style.left = (rect.left + window.scrollX - badge.offsetWidth / 2) + 'px';
    document.body.appendChild(badge);
  }

  focusableElems.forEach((elem, index) => {
    elem.style.outline = '3px solid yellow';
    elem.addEventListener('focus', () => {
      elem.style.outline = '3px solid blue';
    });
    elem.addEventListener('blur', () => {
      elem.style.outline = '3px solid yellow';
    });

    const badge = createBadge(index + 1);
    addBadgeToElem(elem, badge);
  });

  headingElems.forEach((elem) => {
    const headingLevel = elem.tagName.match(/\d+/)[0];
    const badge = createBadge('H' + headingLevel);
    addBadgeToElem(elem, badge);
  });
})();