// Data access for words and quotes. Pages and components get their data only through these functions.

import { getCollection, type CollectionEntry } from 'astro:content';

export type Word = CollectionEntry<'words'>;
export type Quote = CollectionEntry<'quotes'>;
export type DictionaryWord = Word & { data: { definition: string } };

const EXAMPLE_FOLDER = '/examples/';
const MAX_WEIGHT = 5;

// URLs stay German because visitors see them.
export const wordUrl = (word: Word) => `/woerter/${word.id}/`;

/** Is the entry in an `examples/` folder? */
export const isExample = (entry: Word | Quote) =>
  (entry.filePath ?? '').replace(/\\/g, '/').includes(EXAMPLE_FOLDER);

/** All words, sorted alphabetically. */
export async function getWords(): Promise<Word[]> {
  const words = await getCollection('words');
  return words.sort((a, b) => a.data.word.localeCompare(b.data.word, 'de'));
}

/** Words with a definition, sorted alphabetically. */
export async function getDictionary(): Promise<DictionaryWord[]> {
  return (await getWords()).filter((w): w is DictionaryWord => Boolean(w.data.definition));
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

/** Groups words by first letter, keeping the input order. */
export function groupByLetter<T extends Word>(words: T[]): { letter: string; words: T[] }[] {
  const groups = new Map<string, T[]>();
  for (const word of words) {
    const letter = initialLetter(word.data.word);
    groups.set(letter, [...(groups.get(letter) ?? []), word]);
  }
  return [...groups].map(([letter, words]) => ({ letter, words }));
}

export type TextSegment = { text: string; href?: string };

/**
 * Splits a quote into segments and links the referenced words.
 * Inflected forms that start with the word are found too (Augenblick → Augenblicke).
 */
export function linkWords(text: string, words: Word[]): TextSegment[] {
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
    segments.push({ text: match[0], href: word && wordUrl(word) });
    last = match.index + match[0].length;
  }
  segments.push({ text: text.slice(last) });
  return segments.filter((s) => s.text);
}
