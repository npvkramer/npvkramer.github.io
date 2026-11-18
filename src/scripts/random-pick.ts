// Zeigt aus einer Gruppe [data-random-pick] ein zufälliges [data-random-item].
// Der Button [data-random-next] wählt ein anderes, ohne das aktuelle zu wiederholen.

for (const group of document.querySelectorAll<HTMLElement>('[data-random-pick]')) {
  const items = [...group.querySelectorAll<HTMLElement>('[data-random-item]')];
  const next = group.querySelector<HTMLButtonElement>('[data-random-next]');
  let current = -1;

  const show = () => {
    let index: number;
    do index = Math.floor(Math.random() * items.length);
    while (items.length > 1 && index === current);
    current = index;
    items.forEach((item, i) => (item.hidden = i !== index));
  };

  if (items.length > 0) show();
  if (next && items.length > 1) {
    next.hidden = false;
    next.addEventListener('click', show);
  }
}
