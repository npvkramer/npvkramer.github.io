// Global site settings: title, author, theme, social links.
// Language-dependent settings (navigation, description, UI text) live in src/i18n/.

import { DEFAULT_LOCALE, LOCALES, navItems, pathTo } from '../i18n';

export const SITE = {
  title: 'npvk',
  author: 'npvkramer',
  // Visual theme, set as data-theme on <html>. Must match a file in src/styles/themes/.
  theme: 'index',
  social: [{ label: 'GitHub', href: 'https://github.com/npvkramer' }],

  // Deprecated, kept until the site menu uses src/i18n directly:
  // use getLocale(Astro.url), navItems(locale) and languageLinks(Astro.url) instead.
  lang: DEFAULT_LOCALE,
  nav: navItems(DEFAULT_LOCALE),
  languages: LOCALES.map((code) => ({ code, label: code.toUpperCase(), href: pathTo('home', code) })),
} as const;
