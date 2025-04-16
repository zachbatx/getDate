// ==== llmPrimer_bkm_kbLoader_v4.0_.refactored.js ====
// ES module loader – must be loaded with <script type="module">

// Ensure global tracking
window.llmPrimer = window.llmPrimer || {};
window.llmPrimer.contentLoadingStatus = { total: 0, completed: 0, failed: 0 };
window.llmPrimer.contentLoaded = false;

// 1) Define categories
export const kbCategory = [
  { id: 'designReview',   title: 'Design Review Tools' },
  { id: 'research',       title: 'Research Tools' },
  { id: 'accessibility',  title: 'Accessibility Tools' },
];

// 2) Define domains (knowledge bases)
export const kbDomain = [
  {
    id: 'usabilityHeuristics',
    title: 'Usability Heuristics',
    contentUrl: 'https://your-domain.com/path/to/docx_kbtemplate.js',
    category: 'designReview',
    loadingStatus: 'pending'
  },
  {
    id: 'accessibilityGuidelines',
    title: 'Accessibility Guidelines',
    contentUrl: 'https://your-domain.com/path/to/accessibilityGuidelines.js',
    category: 'accessibility',
    loadingStatus: 'pending'
  },
  {
    id: 'researchMethods',
    title: 'Research Methods',
    contentUrl: 'https://your-domain.com/path/to/researchMethods.js',
    category: 'research',
    loadingStatus: 'pending'
  }
];

// Expose for the base script
window.kbCategory = kbCategory;
window.kbDomain   = kbDomain;
window.llmPrimer.contentLoadingStatus.total = kbDomain.length;

// 3) Load all in parallel
(async function loadAll() {
  const status = window.llmPrimer.contentLoadingStatus;

  const promises = kbDomain.map(async domain => {
    try {
      // Dynamic import of each JS module (must be an ES module exporting `markdownContent`)
      const mod = await import(/* webpackIgnore: true */ domain.contentUrl);
      domain.markDown = mod.markdownContent;
      domain.loadingStatus = 'loaded';
      status.completed++;
    } catch (err) {
      console.error(`❌ Failed to load ${domain.id}:`, err);
      domain.loadingStatus = 'failed';
      status.failed++;
    }
  });

  await Promise.all(promises);

  window.llmPrimer.contentLoaded = true;
  document.dispatchEvent(new CustomEvent('llmPrimer_contentLoaded', {
    detail: {
      success: status.completed,
      failed: status.failed,
      total: status.total
    }
  }));
})();
