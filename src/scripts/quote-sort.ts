// Resonance: switches the quotes between newest first (default, the order from the server) and by author.
// Without JavaScript the switch stays hidden and the quotes keep the default order.
// Quotes without a known author come last when sorting by author; the same author keeps newest first.

type Sort = 'newest' | 'author';

const STORAGE_KEY = 'quote-sort';
const bar = document.querySelector<HTMLElement>('[data-quote-sort]');
const grid = document.querySelector<HTMLElement>('[data-quote-grid]');

if (bar && grid) {
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-sort]')];
  // The order from the server is newest first; sorting always starts from it, so ties keep it.
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-quote-card]')];
  const locale = document.documentElement.lang;
  const author = (card: HTMLElement) => card.dataset.author ?? '';

  const compare: Record<Sort, (a: HTMLElement, b: HTMLElement) => number> = {
    newest: () => 0,
    author: (a, b) => Number(!author(a)) - Number(!author(b)) || author(a).localeCompare(author(b), locale),
  };

  const show = (sort: Sort) => {
    grid.append(...[...cards].sort(compare[sort]));
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.sort === sort));
    try {
      localStorage.setItem(STORAGE_KEY, sort);
    } catch {
      /* Storage unavailable: the choice only lasts for this page */
    }
  };

  bar.hidden = false;
  for (const button of buttons) {
    button.addEventListener('click', () => show(button.dataset.sort as Sort));
  }

  let saved: string | null = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* Storage unavailable: keep the default order */
  }
  if (saved === 'author') show(saved);
}
