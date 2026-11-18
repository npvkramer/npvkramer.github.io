// Toggles between the light and dark color scheme of the active theme.
// The choice is stored in the browser and applied early by public/scripts/theme-init.js.

type Scheme = 'light' | 'dark';

const STORAGE_KEY = 'color-scheme';
const root = document.documentElement;

function currentScheme(): Scheme {
  const set = root.dataset.scheme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setScheme(scheme: Scheme): void {
  root.dataset.scheme = scheme;
  try {
    localStorage.setItem(STORAGE_KEY, scheme);
  } catch {
    /* Cannot persist: the choice only lasts for this page */
  }
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-scheme-toggle]')) {
  button.addEventListener('click', () => {
    setScheme(currentScheme() === 'dark' ? 'light' : 'dark');
  });
}
