// URL paths per page and language. Visitors see them, so they are translated.

import { DEFAULT_LOCALE, LOCALES, getLocale, type Locale } from './config';

export const ROUTES = {
  home: { en: '', de: '' },
  fragments: { en: 'fragments', de: 'fragmente' },
  resonance: { en: 'resonance', de: 'nachklang' },
  glossary: { en: 'glossary', de: 'wortschatz' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;
const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

/** URL of a page, e.g. pathTo('fragments', 'de', 'sonder') → /de/fragmente/sonder/ */
export function pathTo(route: RouteKey, locale: Locale, id?: string): string {
  const parts = [locale === DEFAULT_LOCALE ? '' : locale, ROUTES[route][locale], id].filter(Boolean);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

/** Language, page and entry id of a URL, or null for pages outside the route table (e.g. /admin/). */
export function parsePath(url: URL): { locale: Locale; route: RouteKey; id?: string } | null {
  const locale = getLocale(url);
  const segments = url.pathname.split('/').filter(Boolean);
  if (locale !== DEFAULT_LOCALE) segments.shift();
  const [segment = '', id] = segments;
  const route = ROUTE_KEYS.find((key) => ROUTES[key][locale] === segment);
  return route && !(route === 'home' && id) ? { locale, route, id } : null;
}

export type LanguageLink = { locale: Locale; label: string; href: string; current: boolean };

/** The current page in every language, for the language switcher and hreflang links. */
export function languageLinks(url: URL): LanguageLink[] {
  const page = parsePath(url);
  const current = getLocale(url);
  return LOCALES.map((locale) => ({
    locale,
    label: locale.toUpperCase(),
    href: page ? pathTo(page.route, locale, page.id) : pathTo('home', locale),
    current: locale === current,
  }));
}
