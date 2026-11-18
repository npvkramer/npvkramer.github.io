import { SITE } from '../data/site';

const dateFormatter = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

/** „1 Zitat“, „3 Zitate“ */
export function countLabel(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
