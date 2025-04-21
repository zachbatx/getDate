;(function(){
  const href   = window.location.href;
  const prefix = 'https://confluence';
  // only run on URLs that actually start with our prefix
  if (!href.startsWith(prefix)) return;

  // replace the visible URL (no navigation/reload)
  window.history.replaceState(
    /* state */   null,
    /* title */   document.title,
    /* new URL */ prefix
  );
})();
