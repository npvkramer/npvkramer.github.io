// Data access for words, quotes and films. Pages and components get their data only through these functions.

import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { hasLocale, pathTo, type Locale } from '../i18n';

export type Word = CollectionEntry<'words'>;
export type Quote = CollectionEntry<'quotes'>;
export type Film = CollectionEntry<'films'>;

/**
 * Title of a film for a page language, plus the original title when it differs
 * (e.g. “Parasite” with “기생충”).
 */
export function filmTitle(film: Film, locale: Locale): { title: string; original?: string } {
  const { title } = film.data;
  if (typeof title === 'string') return { title };
  const shown = title[locale] ?? title.original;
  return shown === title.original ? { title: shown } : { title: shown, original: title.original };
}

// Film images live in src/assets/films/ and are matched by file name: past-lives.jpg for past-lives.md.
// A file named placeholder.* is used for films without their own image.
const FILM_IMAGE_PLACEHOLDER = 'placeholder';
const filmImages = new Map(
  Object.entries(
    import.meta.glob<ImageMetadata>('/src/assets/films/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' }),
  ).map(([path, image]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), image]),
);

/** The film's own image, else the placeholder image, else nothing (the page then shows a monogram). */
export const filmImage = (film: Film): ImageMetadata | undefined =>
  filmImages.get(film.id) ?? filmImages.get(FILM_IMAGE_PLACEHOLDER);

/** All films and series, best rated first, then by title; films not rated yet come last. */
export async function getFilms(locale: Locale): Promise<Film[]> {
  const films = await getCollection('films');
  const title = (film: Film) => filmTitle(film, locale).title;
  // Not rated yet sorts after every rating.
  const rating = (film: Film) => film.data.rating ?? -1;
  return films.sort((a, b) => rating(b) - rating(a) || title(a).localeCompare(title(b), locale));
}

export const wordUrl = (word: Word, locale: Locale) => pathTo('glossary', locale, word.id);

/** Text used for sorting and the index: the romanization if there is one (인연 → Inyeon). */
export const sortKey = (word: Word) => word.data.romanization ?? word.data.word;

/** All words, sorted alphabetically for the page language. */
export async function getWords(locale: Locale): Promise<Word[]> {
  const words = await getCollection('words');
  return words.sort((a, b) => sortKey(a).localeCompare(sortKey(b), locale));
}

/** Words with a definition at all; they can be featured, with a fallback language if needed. */
export async function getDefinedWords(locale: Locale): Promise<Word[]> {
  return (await getWords(locale)).filter((word) => word.data.definition);
}

/** Glossary of a page language: only words with a definition in exactly that language. */
export async function getGlossary(locale: Locale): Promise<Word[]> {
  return (await getWords(locale)).filter((word) => hasLocale(word.data.definition, locale));
}

/**
 * All quotes in my order: first those with `order` (smaller first), then the rest newest first
 * (by `added`), then by file name.
 */
export async function getQuotes(): Promise<Quote[]> {
  const quotes = await getCollection('quotes');
  const order = (quote: Quote) => quote.data.order ?? Infinity;
  return quotes.sort(
    (a, b) =>
      order(a) - order(b) || b.data.added.valueOf() - a.data.added.valueOf() || a.id.localeCompare(b.id),
  );
}

/** Quotes that reference the given word. */
export function quotesForWord(quotes: Quote[], word: Word): Quote[] {
  return quotes.filter((q) => q.data.words.some((ref) => ref.id === word.id));
}

/** First letter for the index, umlauts without dots (Ä → A). */
export const initialLetter = (text: string) =>
  text.charAt(0).toUpperCase().normalize('NFD').charAt(0);

/** Groups words by the first letter of their sort key, keeping the input order. */
export function groupByLetter(words: Word[]): { letter: string; words: Word[] }[] {
  const groups = new Map<string, Word[]>();
  for (const word of words) {
    const letter = initialLetter(sortKey(word));
    groups.set(letter, [...(groups.get(letter) ?? []), word]);
  }
  return [...groups].map(([letter, words]) => ({ letter, words }));
}

export type TextSegment = { text: string; href?: string };

/**
 * Splits a quote into segments and links the referenced words.
 * Inflected forms that start with the word are found too (Augenblick → Augenblicke).
 */
export function linkWords(text: string, words: Word[], locale: Locale): TextSegment[] {
  if (words.length === 0) return [{ text }];
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `(?<!\\p{L})(${words.map((w) => escape(w.data.word)).join('|')})\\p{L}*`,
    'giu',
  );

  const segments: TextSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const word = words.find((w) => w.data.word.toLowerCase() === match[1].toLowerCase());
    segments.push({ text: text.slice(last, match.index) });
    segments.push({ text: match[0], href: word && wordUrl(word, locale) });
    last = match.index + match[0].length;
  }
  segments.push({ text: text.slice(last) });
  return segments.filter((s) => s.text);
}
