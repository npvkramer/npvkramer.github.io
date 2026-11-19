// All interface text per page language. Components never contain fixed text.

import type { Locale } from './config';

const en = {
  siteDescription: 'Words, quotes and meanings I collect.',
  nav: {
    fragments: { label: 'Fragments', description: 'Words I like, scattered freely.' },
    resonance: { label: 'Resonance', description: 'Sentences and sayings that moved me.' },
    glossary: { label: 'Glossary', description: 'Words with pronunciation and meaning.' },
  },
  menu: {
    label: 'Menu',
    open: 'Open menu',
    close: 'Close menu',
    navLabel: 'Main navigation',
    appearance: 'Appearance',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    language: 'Language',
    follow: 'Follow',
    escHint: '[ESC] = Close menu',
  },
  // Written in the language it offers, e.g. shown on a German page to an English browser.
  languageHint: {
    message: 'This page is also available in English.',
    action: 'Read in English',
    dismiss: 'Close',
  },
  count: {
    words: ['word', 'words'],
    quotes: ['quote', 'quotes'],
    entries: ['entry', 'entries'],
  },
  home: {
    featured: 'Word of the moment',
    another: 'Another word',
  },
  fragments: {
    title: 'Fragments',
    lead: 'Words I like. Click one to open it.',
    description: (word: string) => `${word}, from my word collection.`,
    inQuotes: 'In quotes',
    all: '← All fragments',
  },
  resonance: {
    title: 'Resonance',
    lead: 'Sentences and sayings that moved me. Underlined words come from the word collection.',
    translation: 'Translation',
    none: 'No quotes yet.',
  },
  glossary: {
    title: 'Glossary',
    lead: 'Words with pronunciation and meaning, A to Z.',
    search: 'Search word or meaning …',
    searchLabel: 'Search the glossary',
    index: 'Index',
    empty: 'No entry found.',
    none: 'No entries in English yet.',
    letterAnchor: 'letter',
    inQuotes: (count: number) => (count === 1 ? 'Appears in one quote' : `Appears in ${count} quotes`),
  },
  entry: {
    onlyIn: (language: string) => `Only available in ${language}`,
  },
  notFound: {
    title: 'Page not found',
    lead: 'This page does not exist (anymore).',
    home: 'Go to the home page →',
  },
};

type Strings = typeof en;

const de: Strings = {
  siteDescription: 'Wörter, Zitate und Bedeutungen, die ich sammle.',
  nav: {
    fragments: { label: 'Fragmente', description: 'Wörter, die ich mag, frei verteilt.' },
    resonance: { label: 'Nachklang', description: 'Sätze und Sprüche, die mich bewegt haben.' },
    glossary: { label: 'Wortschatz', description: 'Wörter mit Lautschrift und Bedeutung.' },
  },
  menu: {
    label: 'Menü',
    open: 'Menü öffnen',
    close: 'Menü schliessen',
    navLabel: 'Hauptnavigation',
    appearance: 'Darstellung',
    light: 'Hell',
    dark: 'Dunkel',
    auto: 'Auto',
    language: 'Sprache',
    follow: 'Folgen',
    escHint: '[ESC] = Menü schliessen',
  },
  languageHint: {
    message: 'Diese Seite gibt es auch auf Deutsch.',
    action: 'Auf Deutsch lesen',
    dismiss: 'Schliessen',
  },
  count: {
    words: ['Wort', 'Wörter'],
    quotes: ['Zitat', 'Zitate'],
    entries: ['Eintrag', 'Einträge'],
  },
  home: {
    featured: 'Wort des Moments',
    another: 'Anderes Wort',
  },
  fragments: {
    title: 'Fragmente',
    lead: 'Wörter, die ich mag. Ein Klick öffnet das Wort.',
    description: (word: string) => `${word}, aus meiner Wortsammlung.`,
    inQuotes: 'In Zitaten',
    all: '← Alle Fragmente',
  },
  resonance: {
    title: 'Nachklang',
    lead: 'Sätze und Sprüche, die mich bewegt haben. Unterstrichene Wörter stammen aus der Wortsammlung.',
    translation: 'Übersetzung',
    none: 'Noch keine Zitate.',
  },
  glossary: {
    title: 'Wortschatz',
    lead: 'Wörter mit Lautschrift und Bedeutung, alphabetisch.',
    search: 'Wort oder Bedeutung suchen …',
    searchLabel: 'Wortschatz durchsuchen',
    index: 'Register',
    empty: 'Kein Eintrag gefunden.',
    none: 'Noch keine Einträge auf Deutsch.',
    letterAnchor: 'buchstabe',
    inQuotes: (count: number) => (count === 1 ? 'Kommt in einem Zitat vor' : `Kommt in ${count} Zitaten vor`),
  },
  entry: {
    onlyIn: (language: string) => `Nur auf ${language} verfügbar`,
  },
  notFound: {
    title: 'Seite nicht gefunden',
    lead: 'Diese Seite gibt es nicht (mehr).',
    home: 'Zur Startseite →',
  },
};

const UI: Record<Locale, Strings> = { en, de };

/** Interface text for a page language. */
export const t = (locale: Locale): Strings => UI[locale];

/** „1 Zitat“, „3 Zitate“ */
export function countLabel(count: number, [singular, plural]: readonly [string, string] | string[]): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
