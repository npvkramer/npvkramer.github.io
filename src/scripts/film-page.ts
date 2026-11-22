// Film page: filter by type, sort by title or year, switch between list and cards, flip cards to show
// their details. Without JavaScript the controls stay hidden and every entry shows as a list, by title.

type View = 'list' | 'cards';
type Sort = 'title' | 'year';

const STORAGE_KEY = 'film-view';
const SORT_STORAGE_KEY = 'film-sort';
const films = document.querySelector<HTMLElement>('[data-films]');

/** Marks exactly one button of a group as pressed. */
function press(buttons: HTMLButtonElement[], active: HTMLButtonElement): void {
  for (const button of buttons) button.setAttribute('aria-pressed', String(button === active));
}

function setupFilter(): void {
  const bar = document.querySelector<HTMLElement>('[data-film-filter]');
  if (!bar) return;
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const groups = [...document.querySelectorAll<HTMLElement>('[data-film-group]')];

  bar.hidden = false;
  for (const button of buttons) {
    button.addEventListener('click', () => {
      press(buttons, button);
      for (const group of groups) {
        group.hidden = button.dataset.filter !== 'all' && group.dataset.filmGroup !== button.dataset.filter;
      }
    });
  }
}

// Sorts each group on its own. The order from the server is by title; sorting always starts from it,
// so entries from the same year stay alphabetical.
function setupSort(container: HTMLElement): void {
  const bar = document.querySelector<HTMLElement>('[data-film-sort]');
  if (!bar) return;
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-sort]')];
  const lists = [...container.querySelectorAll<HTMLElement>('.film-list')].map((list) => ({
    list,
    entries: [...list.querySelectorAll<HTMLElement>('[data-film-card]')],
  }));

  // Newest first; a running series (empty date) counts as today and comes first.
  const year = (entry: HTMLElement) => entry.dataset.yearSort || '9999';
  const compare: Record<Sort, (a: HTMLElement, b: HTMLElement) => number> = {
    title: () => 0,
    year: (a, b) => year(b).localeCompare(year(a)),
  };

  const show = (sort: Sort) => {
    for (const { list, entries } of lists) list.append(...[...entries].sort(compare[sort]));
    press(buttons, buttons.find((button) => button.dataset.sort === sort) ?? buttons[0]);
    try {
      localStorage.setItem(SORT_STORAGE_KEY, sort);
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
    saved = localStorage.getItem(SORT_STORAGE_KEY);
  } catch {
    /* Storage unavailable: keep the order by title */
  }
  if (saved === 'year') show(saved);
}

function setupView(container: HTMLElement): void {
  const bar = document.querySelector<HTMLElement>('[data-film-view-switch]');
  if (!bar) return;
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-view]')];
  const cards = [...container.querySelectorAll<HTMLElement>('[data-film-card]')];

  const show = (view: View) => {
    container.dataset.view = view;
    press(buttons, buttons.find((button) => button.dataset.view === view) ?? buttons[0]);
    // In the card view each card is a toggle button; in the list it is plain content again.
    for (const card of cards) {
      if (view === 'cards') {
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');
        card.tabIndex = 0;
      } else {
        card.removeAttribute('role');
        card.removeAttribute('aria-pressed');
        card.removeAttribute('tabindex');
      }
    }
    try {
      localStorage.setItem(STORAGE_KEY, view);
    } catch {
      /* Storage unavailable: the choice only lasts for this page */
    }
  };

  const flip = (card: HTMLElement) => {
    card.setAttribute('aria-pressed', String(card.getAttribute('aria-pressed') !== 'true'));
  };

  bar.hidden = false;
  for (const button of buttons) {
    button.addEventListener('click', () => show(button.dataset.view as View));
  }
  container.addEventListener('click', (event) => {
    if (container.dataset.view !== 'cards') return;
    const card = (event.target as Element).closest<HTMLElement>('[data-film-card]');
    if (card) flip(card);
  });
  container.addEventListener('keydown', (event) => {
    if (container.dataset.view !== 'cards' || (event.key !== 'Enter' && event.key !== ' ')) return;
    const card = (event.target as Element).closest<HTMLElement>('[data-film-card]');
    if (!card) return;
    event.preventDefault();
    flip(card);
  });

  let saved: string | null = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* Storage unavailable: start with the list */
  }
  show(saved === 'cards' ? 'cards' : 'list');
}

if (films) {
  setupFilter();
  setupSort(films);
  setupView(films);
}
