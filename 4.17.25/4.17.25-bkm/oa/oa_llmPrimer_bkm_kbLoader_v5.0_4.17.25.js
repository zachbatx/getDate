// new_llmPrimer_bkm_kbLoader_v1.0_4.10.25.js
;(function(){
  // 1) categories stay exactly the same
  const kbCategory = [
    { id: 'designReview',  title: 'Design Review Tools'   },
    { id: 'research',      title: 'Research Tools'        },
    { id: 'accessibility', title: 'Accessibility Tools'   }
    // …etc
  ];

  // 2) point each KB at its .md URL
  const kbDomain = [
    {
      id:       'usabilityHeuristics',
      title:    'Usability Heuristics',
      category: 'accessibility',
      url:      'https://example.com/kb/usabilityHeuristics.md'
    },
    {
      id:       'researchMethods',
      title:    'Research Methods',
      category: 'research',
      url:      'https://example.com/kb/researchMethods.md'
    }
    // …add more entries here
  ];

  // 3) synchronously fetch each one, treating 200–299 **or** 0 with content as success
  kbDomain.forEach(entry => {
    let text = '';
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', entry.url, false);  // <-- synchronous on purpose
      xhr.send(null);

      // accept 2xx **or** “0 but we got text” (file:// or some CORS cases)
      if ((xhr.status >= 200 && xhr.status < 300) ||
          (xhr.status === 0 && xhr.responseText)) {
        text = xhr.responseText;
      } else {
        console.warn(
          `llmPrimer: failed to load "${entry.url}", status=${xhr.status}`
        );
      }
    } catch (err) {
      console.error(`llmPrimer: exception loading "${entry.url}"`, err);
    }

    entry.markDown = text;
  });

  // 4) debug: log lengths so you can confirm something really arrived
  console.group('llmPrimer KB load');
  kbDomain.forEach(e =>
    console.log(` • ${e.id}: ${e.markDown.length} chars`)
  );
  console.groupEnd();

  // 5) expose exactly the globals your base file expects
  window.kbCategory = kbCategory;
  window.kbDomain   = kbDomain;
})();
