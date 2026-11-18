// Filtert das Wörterbuch während der Eingabe. Ohne JavaScript bleibt das Suchfeld ausgeblendet.

const input = document.querySelector<HTMLInputElement>('[data-dictionary-search]');

if (input) {
  const entries = [...document.querySelectorAll<HTMLElement>('[data-dictionary-entry]')];
  const groups = [...document.querySelectorAll<HTMLElement>('[data-dictionary-group]')];
  const empty = document.querySelector<HTMLElement>('[data-dictionary-empty]');

  input.hidden = false;
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    for (const entry of entries) {
      entry.hidden = query !== '' && !entry.dataset.search?.includes(query);
    }
    for (const group of groups) {
      group.hidden = !group.querySelector('[data-dictionary-entry]:not([hidden])');
    }
    if (empty) empty.hidden = groups.some((group) => !group.hidden);
  });
}
