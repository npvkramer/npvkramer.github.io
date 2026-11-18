// Verteilt die Wörter zufällig und ohne Überlappung über die ganze Fläche.
// Ohne JavaScript bleibt die Wolke eine umbrechende Liste.
// Abstand, Mindesthöhe und Dichte kommen aus den CSS-Variablen --cloud-*.

type Box = { x: number; y: number; w: number; h: number };

const MAX_TRIES = 500;

function overlap(a: Box, b: Box, gap: number): number {
  const w = Math.min(a.x + a.w + gap, b.x + b.w + gap) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.h + gap, b.y + b.h + gap) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
}

/** Sucht eine freie Stelle; findet sich keine, die mit der kleinsten Überlappung. */
function findSpot(w: number, h: number, width: number, height: number, gap: number, placed: Box[]): Box {
  let best: Box = { x: 0, y: 0, w, h };
  let bestOverlap = Infinity;
  for (let i = 0; i < MAX_TRIES; i++) {
    const box = { x: Math.random() * Math.max(0, width - w), y: Math.random() * Math.max(0, height - h), w, h };
    const total = placed.reduce((sum, p) => sum + overlap(box, p, gap), 0);
    if (total === 0) return box;
    if (total < bestOverlap) [best, bestOverlap] = [box, total];
  }
  return best;
}

function layout(cloud: HTMLElement): void {
  cloud.classList.add('is-scattered');
  cloud.style.height = '';

  const style = getComputedStyle(cloud);
  const gap = parseFloat(style.rowGap) || 0;
  const density = parseFloat(style.getPropertyValue('--cloud-density')) || 2;
  const width = cloud.clientWidth;

  const items = [...cloud.children].map((el) => {
    const li = el as HTMLElement;
    return { li, w: li.offsetWidth, h: li.offsetHeight };
  });

  // Fläche wächst mit der Anzahl Wörter, nie kleiner als --cloud-min-height
  const area = items.reduce((sum, { w, h }) => sum + (w + gap) * (h + gap), 0);
  const height = Math.max(cloud.clientHeight, Math.ceil((area * density) / width));
  cloud.style.height = `${height}px`;

  // Grosse Wörter zuerst platzieren, damit sie sicher Platz finden
  const placed: Box[] = [];
  for (const { li, w, h } of items.sort((a, b) => b.w * b.h - a.w * a.h)) {
    const box = findSpot(w, h, width, height, gap, placed);
    placed.push(box);
    li.style.transform = `translate(${box.x}px, ${box.y}px)`;
  }
}

const cloud = document.querySelector<HTMLElement>('[data-cloud]');

if (cloud) {
  let lastWidth = 0;
  let timer: number | undefined;
  const relayout = () => {
    if (cloud.clientWidth === lastWidth) return;
    lastWidth = cloud.clientWidth;
    layout(cloud);
  };

  document.fonts.ready.then(relayout);
  new ResizeObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(relayout, 150);
  }).observe(cloud);
}
