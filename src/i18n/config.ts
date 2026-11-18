// Page languages. The first one is the default and has no URL prefix.

export const LOCALES = ['en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = LOCALES[0];

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** Page language from the URL: /de/… is German, everything else the default language. */
export function getLocale(url: URL): Locale {
  const first = url.pathname.split('/')[1] ?? '';
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}
