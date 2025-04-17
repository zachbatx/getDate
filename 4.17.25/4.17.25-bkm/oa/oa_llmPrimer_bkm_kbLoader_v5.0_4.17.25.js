// new_llmPrimer_bkm_kbLoader_v1.0_4.10.25.js
;(function(){
  // ———————————————————————————————
  // 1) intercept the base-script's onload handler (that's your `c()`)
  // ———————————————————————————————
  const self = document.currentScript;
  const initPanel = self.onload;   // stash the original `c`
  const errorPanel = self.onerror; // stash the original onerror
  self.onload = self.onerror = null;

  // ———————————————————————————————
  // 2) your categories (unchanged API)
  // ———————————————————————————————
  var kbCategory = [
    { id: 'designReview',  title: 'Design Review Tools'   },
    { id: 'research',      title: 'Research Tools'        },
    { id: 'accessibility', title: 'Accessibility Tools'   }
    // …etc
  ];

  // ———————————————————————————————
  // 3) list each KB entry, now pointing at its JSONP .js
  // ———————————————————————————————
  var kbDomain = [
    {
      id:       'usabilityHeuristics',
      title:    'Usability Heuristics',
      category: 'accessibility',
      url:      'https://confluence.prod.aws.jpmchase.net/confluence/download/attachments/4722904378/usabilityHeuristics_kb.js'
    },
    {
      id:       'researchMethods',
      title:    'Research Methods',
      category: 'research',
      url:      'https://confluence.prod.aws.jpmchase.net/confluence/download/attachments/4722904378/researchMethods_kb.js'
    }
    // …add more here
  ];

  // ———————————————————————————————
  // 4) prepare to wait for all JSONP callbacks
  // ———————————————————————————————
  var remaining = kbDomain.length;
  // stub empty markdown in case something never calls us
  kbDomain.forEach(e => e.markDown = '');

  window.llmPrimerRegister = function(id, markdown){
    // find the matching entry
    const entry = kbDomain.find(x => x.id === id);
    if(entry){
      entry.markDown = markdown;
    } else {
      console.warn('llmPrimer: unknown KB id', id);
    }

    // once everyone has called us…
    if(--remaining === 0){
      console.group('llmPrimer KB loaded via JSONP');
      kbDomain.forEach(e => 
        console.log(` • ${e.id}: ${e.markDown.length} chars`)
      );
      console.groupEnd();

      // expose exactly what the base script expects
      window.kbCategory = kbCategory;
      window.kbDomain   = kbDomain;

      // finally initialize the panel
      initPanel && initPanel();
    }
  };

  // ———————————————————————————————
  // 5) inject all JSONP scripts (no CORS, just <script> tags)
  // ———————————————————————————————
  kbDomain.forEach(entry => {
    const s = document.createElement('script');
    s.src   = entry.url;
    s.async = false; // preserve execution order
    s.onerror = function(){
      console.error('llmPrimer: failed loading', entry.url);
      // even on error, count it down so we eventually fire c()
      if(--remaining === 0){
        initPanel && initPanel();
      }
    };
    document.head.appendChild(s);
  });

  // NOTE: we do *not* call initPanel() here—that only happens
  // when all JSONP files have invoked llmPrimerRegister().
})();
