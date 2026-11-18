import { SITE } from '../data/site';

const dateFormatter = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}
