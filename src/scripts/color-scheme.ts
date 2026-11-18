// Appearance setting in the site menu: light, dark or auto (follows the OS setting).
// The choice is stored in the browser and applied before the first paint by public/scripts/theme-init.js.

type Choice = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'color-scheme';
const root = document.documentElement;
const options = document.querySelectorAll<HTMLButtonElement>('[data-scheme-option]');

function currentChoice(): Choice {
  const scheme = root.dataset.scheme;
  return scheme === 'light' || scheme === 'dark' ? scheme : 'auto';
}

function showPressed(choice: Choice): void {
  for (const option of options) {
    option.setAttribute('aria-pressed', String(option.dataset.schemeOption === choice));
  }
}

function choose(choice: Choice): void {
  if (choice === 'auto') delete root.dataset.scheme;
  else root.dataset.scheme = choice;
  try {
    if (choice === 'auto') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* Cannot persist: the choice only lasts for this page */
  }
  showPressed(choice);
}

for (const option of options) {
  option.addEventListener('click', () => choose(option.dataset.schemeOption as Choice));
}

// The group needs this script, so it only appears once the script runs.
for (const group of document.querySelectorAll<HTMLElement>('[data-scheme-select]')) {
  group.hidden = false;
}

showPressed(currentChoice());
