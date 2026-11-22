// Filters the film page by type (all, films, series).
// Without JavaScript the filter stays hidden and both groups are shown one below the other.

const bar = document.querySelector<HTMLElement>('[data-film-filter]');

if (bar) {
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const groups = [...document.querySelectorAll<HTMLElement>('[data-film-group]')];

  bar.hidden = false;
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      for (const other of buttons) other.setAttribute('aria-pressed', String(other === button));
      for (const group of groups) group.hidden = filter !== 'all' && group.dataset.filmGroup !== filter;
    });
  }
}
