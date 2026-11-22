// Film page: filter by type, switch between list and cards, flip cards to show their details.
// Without JavaScript the controls stay hidden and every entry shows as a list.

type View = 'list' | 'cards';

const STORAGE_KEY = 'film-view';
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
  setupView(films);
}
