// Shows the language hint once if the browser prefers the other page language.
// Showing it, or any explicit language choice (hint or site menu), marks it as seen for good.
// If storage is unavailable the hint stays hidden, so it never repeats on every page.

import { isLocale } from '../i18n/config';

const STORAGE_KEY = 'language-hint';

function isSeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return true;
  }
}

function markSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'seen');
  } catch {
    /* Storage unavailable: nothing to remember */
  }
}

// Language links in the hint and in the site menu carry hreflang.
document.addEventListener('click', (event) => {
  if ((event.target as Element).closest('a[hreflang]')) markSeen();
});

const preferred = navigator.languages.map((tag) => tag.split('-')[0].toLowerCase()).find(isLocale);
const hint =
  preferred && preferred !== document.documentElement.lang
    ? document.querySelector<HTMLElement>(`[data-language-hint="${preferred}"]`)
    : null;

if (hint && !isSeen()) {
  hint.hidden = false;
  markSeen();
  hint.querySelector('[data-language-hint-close]')?.addEventListener('click', () => {
    hint.hidden = true;
  });
}
