// new_llmPrimer_bkm_kbLoader_v2.0_5.0.0.js
;(function(){
    // ---------------------------
    // 1) define your categories
    // ---------------------------
    const kbCategory = [
      { id: 'designReview',  title: 'Design Review Tools'    },
      { id: 'research',      title: 'Research Tools'         },
      { id: 'accessibility', title: 'Accessibility Tools'    }
      // …add more as needed
    ];
  
    // ---------------------------------------------------------
    // 2) list each knowledge base, but point at an external URL
    // ---------------------------------------------------------
    const kbDomain = [
      {
        id:       'usabilityHeuristics',
        title:    'Usability Heuristics',
        category: 'accessibility',
        // <-- now just a URL to a .md file containing the prompt
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
  
    // -------------------------------------------------------------
    // 3) synchronously fetch each file so that `.markDown` exists
    //    by the time the base bookmarklet calls `c()`
    // -------------------------------------------------------------
    kbDomain.forEach(entry => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', entry.url, false);      // <-- synchronous on purpose
        xhr.send(null);
        if (xhr.status === 200) {
          entry.markDown = xhr.responseText;
        } else {
          console.warn(`llmPrimer: failed to load "${entry.url}"`, xhr.status);
          entry.markDown = '';
        }
      } catch (e) {
        console.error(`llmPrimer: error loading "${entry.url}"`, e);
        entry.markDown = '';
      }
    });
  
    // -------------------------------------------------------------
    // 4) expose as globals exactly as before—no changes needed
    // -------------------------------------------------------------
    window.kbCategory = kbCategory;
    window.kbDomain   = kbDomain;
  })();
  