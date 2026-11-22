// Ta eis heauton: shows the quotes in random order (default; clicking it again shuffles anew), newest first
// (the order from the server) or by author. Without JavaScript the switch stays hidden and the quotes show
// newest first. Quotes without a known author come last when sorting by author; the same author keeps
// newest first.

import { shuffled } from './shuffle';

type Sort = 'random' | 'newest' | 'author';

const STORAGE_KEY = 'quote-sort';
const bar = document.querySelector<HTMLElement>('[data-quote-sort]');
const grid = document.querySelector<HTMLElement>('[data-quote-grid]');

if (bar && grid) {
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-sort]')];
  // The order from the server is newest first; sorting always starts from it, so ties keep it.
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-quote-card]')];
  const locale = document.documentElement.lang;
  const author = (card: HTMLElement) => card.dataset.author ?? '';

  const order: Record<Sort, () => HTMLElement[]> = {
    random: () => shuffled(cards),
    newest: () => cards,
    author: () =>
      [...cards].sort(
        (a, b) => Number(!author(a)) - Number(!author(b)) || author(a).localeCompare(author(b), locale),
      ),
  };

  const show = (sort: Sort) => {
    grid.append(...order[sort]());
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
    /* Storage unavailable: use the default */
  }
  show(saved === 'newest' || saved === 'author' ? saved : 'random');
}
