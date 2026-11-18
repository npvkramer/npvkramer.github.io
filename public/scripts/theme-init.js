// Wird blockierend im <head> geladen: setzt ein gespeichertes Farbschema,
// bevor die Seite gezeichnet wird. Ohne gespeicherte Wahl gilt die Systemeinstellung.
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.dataset.theme = theme;
    }
  } catch (e) {
    /* localStorage nicht verfügbar – Systemeinstellung gilt */
  }
})();
