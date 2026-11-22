// Resonance: sorts the quotes in my selection (default, the order from the server), by date added
// (newest first), by quote text or by author. Without JavaScript the switch stays hidden and the
// quotes keep the default order.
// Quotes without a known author come last when sorting by author.

type Sort = 'selection' | 'newest' | 'quote' | 'author';

const STORAGE_KEY = 'quote-sort';
const bar = document.querySelector<HTMLElement>('[data-quote-sort]');
const grid = document.querySelector<HTMLElement>('[data-quote-grid]');

if (bar && grid) {
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-sort]')];
  // The order from the server is the default; sorting always starts from it, so ties keep it.
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-quote-card]')];
  const locale = document.documentElement.lang;
  const text = (card: HTMLElement, key: 'added' | 'quote' | 'author') => card.dataset[key] ?? '';
  const byText = (key: 'quote' | 'author') => (a: HTMLElement, b: HTMLElement) =>
    text(a, key).localeCompare(text(b, key), locale);

  const compare: Record<Sort, (a: HTMLElement, b: HTMLElement) => number> = {
    selection: () => 0,
    newest: (a, b) => text(b, 'added').localeCompare(text(a, 'added')),
    quote: byText('quote'),
    author: (a, b) =>
      Number(!text(a, 'author')) - Number(!text(b, 'author')) || byText('author')(a, b) || byText('quote')(a, b),
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
  if (saved === 'newest' || saved === 'quote' || saved === 'author') show(saved);
}
