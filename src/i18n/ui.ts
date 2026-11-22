// All interface text per page language. Components never contain fixed text.

import type { Locale } from './config';

const en = {
  siteDescription: 'Words, quotes and meanings I collect.',
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
    quotes: ['quote', 'quotes'],
    entries: ['entry', 'entries'],
    titles: ['title', 'titles'],
  },
  home: {
    featured: 'Word of the moment',
    another: 'Another word',
  },
  taEisHeauton: {
    title: 'Ta eis heauton',
    lead: 'Thoughts, people, observations, perceptions',
    none: 'No quotes yet.',
    unknownAuthor: 'Unknown',
    sortLabel: 'Sort',
    sorts: { newest: 'Newest', author: 'Author' },
  },
  glossary: {
    title: 'Glossary',
    lead: 'Words, ideas, meanings, connections',
    search: 'Search word or meaning …',
    searchLabel: 'Search the glossary',
    index: 'Index',
    empty: 'No entry found.',
    none: 'No entries in English yet.',
    letterAnchor: 'letter',
    inQuotes: (count: number) => (count === 1 ? 'Appears in one quote' : `Appears in ${count} quotes`),
  },
  film: {
    title: 'Film',
    lead: 'Stories, scenes, characters, emotions',
    filterLabel: 'Show',
    sortLabel: 'Sort',
    sorts: { title: 'Title', year: 'Year' },
    viewLabel: 'View',
    views: { list: 'List', cards: 'Cards' },
    all: 'All',
    groups: { film: 'Films', series: 'Series' },
    types: { film: 'Film', series: 'Series' },
    rating: (value: string) => `${value} / 10`,
    ratingLabel: 'Rating',
    // Film: director; series: creator
    makers: { film: 'Director', series: 'Created by' },
    studio: 'Studio',
    cast: 'Cast',
    runtime: (minutes: number) => `${minutes} min`,
    since: (year: number) => `since ${year}`,
    seasons: (count: number) => (count === 1 ? '1 season' : `${count} seasons`),
    none: 'No films or series yet.',
  },
  // Page of a single word
  entry: {
    onlyIn: (language: string) => `Only available in ${language}`,
    description: (word: string) => `${word}, from my glossary.`,
    inQuotes: 'In quotes',
    back: '← Glossary',
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
    quotes: ['Zitat', 'Zitate'],
    entries: ['Eintrag', 'Einträge'],
    titles: ['Titel', 'Titel'],
  },
  home: {
    featured: 'Wort des Moments',
    another: 'Anderes Wort',
  },
  taEisHeauton: {
    title: 'Ta eis heauton',
    lead: 'Gedanken, Menschen, Beobachtungen, Wahrnehmungen',
    none: 'Noch keine Zitate.',
    unknownAuthor: 'Unbekannt',
    sortLabel: 'Sortieren',
    sorts: { newest: 'Neueste', author: 'Autor' },
  },
  glossary: {
    title: 'Wortschatz',
    lead: 'Wörter, Ideen, Bedeutungen, Verbindungen',
    search: 'Wort oder Bedeutung suchen …',
    searchLabel: 'Wortschatz durchsuchen',
    index: 'Register',
    empty: 'Kein Eintrag gefunden.',
    none: 'Noch keine Einträge auf Deutsch.',
    letterAnchor: 'buchstabe',
    inQuotes: (count: number) => (count === 1 ? 'Kommt in einem Zitat vor' : `Kommt in ${count} Zitaten vor`),
  },
  film: {
    title: 'Film',
    lead: 'Geschichten, Szenen, Figuren, Gefühle',
    filterLabel: 'Anzeigen',
    sortLabel: 'Sortieren',
    sorts: { title: 'Titel', year: 'Jahr' },
    viewLabel: 'Ansicht',
    views: { list: 'Liste', cards: 'Karten' },
    all: 'Alle',
    groups: { film: 'Filme', series: 'Serien' },
    types: { film: 'Film', series: 'Serie' },
    rating: (value: string) => `${value} / 10`,
    ratingLabel: 'Bewertung',
    makers: { film: 'Regie', series: 'Idee' },
    studio: 'Studio',
    cast: 'Besetzung',
    runtime: (minutes: number) => `${minutes} Min.`,
    since: (year: number) => `seit ${year}`,
    seasons: (count: number) => (count === 1 ? '1 Staffel' : `${count} Staffeln`),
    none: 'Noch keine Filme oder Serien.',
  },
  entry: {
    onlyIn: (language: string) => `Nur auf ${language} verfügbar`,
    description: (word: string) => `${word}, aus meinem Wortschatz.`,
    inQuotes: 'In Zitaten',
    back: '← Wortschatz',
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
