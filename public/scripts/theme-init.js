// Loaded render-blocking in <head>: applies a saved light/dark choice before the
// first paint to avoid a flash. Without a saved choice the OS setting applies.
// Only the color scheme is stored here; the theme itself comes from SITE.theme.
(function () {
  try {
    var scheme = localStorage.getItem('color-scheme');
    if (scheme === 'light' || scheme === 'dark') {
      document.documentElement.dataset.scheme = scheme;
    }
  } catch (e) {
    /* localStorage unavailable: the OS setting applies */
  }
})();
