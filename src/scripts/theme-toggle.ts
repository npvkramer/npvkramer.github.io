// Umschalter zwischen hellem und dunklem Farbschema. Die Wahl wird im Browser gespeichert.

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const root = document.documentElement;

function currentTheme(): Theme {
  const set = root.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme: Theme): void {
  root.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Speichern nicht möglich – gilt nur für diese Seite */
  }
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
  button.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
}
