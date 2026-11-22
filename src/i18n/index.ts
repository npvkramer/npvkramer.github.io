// Entry point for everything language related: import from '../i18n'.

import type { Locale } from './config';
import { pathTo } from './routes';
import { t } from './ui';

export * from './config';
export * from './routes';
export * from './ui';
export * from './languages';
export * from './localized';

const NAV_ROUTES = ['resonance', 'glossary', 'film'] as const;

/**
 * Main navigation for a page language. Label and description are the section's own title and lead,
 * so each name and definition lives in one place. Each entry also shows as an area on the home page.
 */
export function navItems(locale: Locale) {
  return NAV_ROUTES.map((route) => {
    const { title, lead } = t(locale)[route];
    return { route, href: pathTo(route, locale), label: title, description: lead };
  });
}
