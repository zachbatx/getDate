// new_llmPrimer_bkm_kbLoader_v1.0_4.10.25.js

// 1) Declare your categories as a global var
var kbCategory = [
  { id: 'designReview',  title: 'Design Review Tools'   },
  { id: 'research',      title: 'Research Tools'        },
  { id: 'accessibility', title: 'Accessibility Tools'   }
  // …add more as needed
];

// 2) Declare your KB entries as a global var, each pointing at its .md URL
var kbDomain = [
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

// 3) Synchronously fetch each file and populate entry.markDown
for (var i = 0; i < kbDomain.length; i++) {
  var entry = kbDomain[i];
  var text  = '';
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', entry.url, false);  // synchronous on purpose
    xhr.send(null);

    // Accept 2xx OR status=0 with some content (file://, some CORS cases)
    if ((xhr.status >= 200 && xhr.status < 300) ||
        (xhr.status === 0 && xhr.responseText)) {
      text = xhr.responseText;
    } else {
      console.warn(
        'llmPrimer: failed to load', entry.url, 'status=' + xhr.status
      );
    }
  } catch (err) {
    console.error('llmPrimer: exception loading', entry.url, err);
  }
  entry.markDown = text;
}

// 4) Debug: log how many characters came back for each entry
console.group('llmPrimer KB load');
for (var j = 0; j < kbDomain.length; j++) {
  console.log(' •', kbDomain[j].id + ':', kbDomain[j].markDown.length, 'chars');
}
console.groupEnd();
