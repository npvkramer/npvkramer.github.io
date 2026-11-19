// Filters the glossary while typing. Without JavaScript the search field stays hidden.

const input = document.querySelector<HTMLInputElement>('[data-glossary-search]');

if (input) {
  const entries = [...document.querySelectorAll<HTMLElement>('[data-glossary-entry]')];
  const groups = [...document.querySelectorAll<HTMLElement>('[data-glossary-group]')];
  const empty = document.querySelector<HTMLElement>('[data-glossary-empty]');

  input.hidden = false;
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    for (const entry of entries) {
      entry.hidden = query !== '' && !entry.dataset.search?.includes(query);
    }
    for (const group of groups) {
      group.hidden = !group.querySelector('[data-glossary-entry]:not([hidden])');
    }
    if (empty) empty.hidden = groups.some((group) => !group.hidden);
  });
}
