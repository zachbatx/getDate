// new_llmPrimer_bkm_kbLoader_v2.0_jsonp.js
;(function(){
  // ———————————————————————————————
  // 1) intercept the <script>'s onload (that's your panel init, c())
  // ———————————————————————————————
  const me        = document.currentScript;
  const initPanel = me.onload;    // stash original panel‑init
  me.onload       = null;         // prevent it firing early

  // ———————————————————————————————
  // 2) categories (exact same API)
  // ———————————————————————————————
  var kbCategory = [
    { id: 'designReview',  title: 'Design Review Tools'   },
    { id: 'research',      title: 'Research Tools'        },
    { id: 'accessibility', title: 'Accessibility Tools'   }
  ];

  // ———————————————————————————————
  // 3) KB entries pointing to your new JSONP .js URLs
  // ———————————————————————————————
  var kbDomain = [
    {
      id:       'usabilityHeuristics',
      title:    'Usability Heuristics',
      category: 'designReview',
      url:      'https://confluence.prod.aws.jpmchase.net/confluence/download/attachments/4722904378/usabilityHeuristics_kb.js'
    },
    {
      id:       'darkDeceptivePatterns',
      title:    'Dark & Deceptive Patterns',
      category: 'research',
      url:      'https://confluence.prod.aws.jpmchase.net/confluence/download/attachments/4722904378/darkDeceptivePatterns_kb.js'
    }
  ];

  // ———————————————————————————————
  // 4) prepare a counter and default stubs
  // ———————————————————————————————
  var remaining = kbDomain.length;
  kbDomain.forEach(e => e.markDown = '');

  // ———————————————————————————————
  // 5) JSONP callback
  // ———————————————————————————————
  window.llmPrimerRegister = function(id, markdown){
    const e = kbDomain.find(x => x.id === id);
    if (e) e.markDown = markdown;
    else console.warn('llmPrimer: got unknown id', id);

    if (--remaining === 0) {
      // expose exactly what the panel expects
      window.kbCategory = kbCategory;
      window.kbDomain   = kbDomain;

      console.group('llmPrimer KB loaded via JSONP');
      kbDomain.forEach(e => 
        console.log(` • ${e.id}: ${e.markDown.length} chars`)
      );
      console.groupEnd();

      // now finally fire the panel init
      initPanel && initPanel();
    }
  };

  // ———————————————————————————————
  // 6) inject each JSONP script (no CORS issues)
  // ———————————————————————————————
  kbDomain.forEach(entry => {
    const s = document.createElement('script');
    s.src   = entry.url;
    s.async = false;   // preserve order
    s.onerror = () => {
      console.error('llmPrimer: failed loading', entry.url);
      if (--remaining === 0) initPanel && initPanel();
    };
    document.head.appendChild(s);
  });

})();
