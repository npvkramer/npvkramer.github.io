// Loaded render-blocking in <head>: applies the saved appearance before the first paint to avoid a flash.
// Default is light. Only an explicit 'auto' choice follows the OS setting (no data-scheme attribute).
// Only the color scheme is stored here; the theme itself comes from SITE.theme.
(function () {
  var root = document.documentElement;
  var choice = null;
  try {
    choice = localStorage.getItem('color-scheme');
  } catch (e) {
    /* localStorage unavailable: the default applies */
  }
  if (choice !== 'auto') {
    root.dataset.scheme = choice === 'dark' ? 'dark' : 'light';
  }
})();
