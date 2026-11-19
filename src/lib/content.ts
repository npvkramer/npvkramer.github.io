// Data access for words and quotes. Pages and components get their data only through these functions.

import { getCollection, type CollectionEntry } from 'astro:content';
import { hasLocale, pathTo, type Locale } from '../i18n';

export type Word = CollectionEntry<'words'>;
export type Quote = CollectionEntry<'quotes'>;

const MAX_WEIGHT = 5;

export const wordUrl = (word: Word, locale: Locale) => pathTo('words', locale, word.id);

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

/** Dictionary of a page language: only words with a definition in exactly that language. */
export async function getDictionary(locale: Locale): Promise<Word[]> {
  return (await getWords(locale)).filter((word) => hasLocale(word.data.definition, locale));
}

/** All quotes in a stable order (by file name). */
export async function getQuotes(): Promise<Quote[]> {
  const quotes = await getCollection('quotes');
  return quotes.sort((a, b) => a.id.localeCompare(b.id));
}

/** Quotes that reference the given word. */
export function quotesForWord(quotes: Quote[], word: Word): Quote[] {
  return quotes.filter((q) => q.data.words.some((ref) => ref.id === word.id));
}

/** Size in the word cloud (1–5): `weight` from the front matter, or derived stably from the word. */
export function wordWeight(word: Word): number {
  if (word.data.weight) return word.data.weight;
  let hash = 0;
  for (const char of word.id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash % MAX_WEIGHT) + 1;
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
