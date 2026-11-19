// Entry point for everything language related: import from '../i18n'.

import type { Locale } from './config';
import { pathTo } from './routes';
import { t } from './ui';

export * from './config';
export * from './routes';
export * from './ui';
export * from './languages';
export * from './localized';

const NAV_ROUTES = ['fragments', 'resonance', 'glossary'] as const;

/** Main navigation for a page language. Each entry also shows as an area on the home page. */
export function navItems(locale: Locale) {
  return NAV_ROUTES.map((route) => ({ route, href: pathTo(route, locale), ...t(locale).nav[route] }));
}
