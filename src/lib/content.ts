// Zugriff auf Wörter und Zitate. Seiten und Komponenten holen ihre Daten nur über diese Funktionen.

import { getCollection, type CollectionEntry } from 'astro:content';

export type Word = CollectionEntry<'woerter'>;
export type Quote = CollectionEntry<'zitate'>;
export type DictionaryWord = Word & { data: { definition: string } };

const EXAMPLE_FOLDER = '/beispiele/';
const MAX_WEIGHT = 5;

export const wordUrl = (word: Word) => `/woerter/${word.id}/`;

/** Liegt der Eintrag im Ordner `beispiele/`? */
export const isExample = (entry: Word | Quote) =>
  (entry.filePath ?? '').replace(/\\/g, '/').includes(EXAMPLE_FOLDER);

/** Alle Wörter, alphabetisch sortiert. */
export async function getWords(): Promise<Word[]> {
  const words = await getCollection('woerter');
  return words.sort((a, b) => a.data.wort.localeCompare(b.data.wort, 'de'));
}

/** Wörter mit Definition, alphabetisch sortiert. */
export async function getDictionary(): Promise<DictionaryWord[]> {
  return (await getWords()).filter((w): w is DictionaryWord => Boolean(w.data.definition));
}

/** Alle Zitate in fester Reihenfolge (nach Dateiname). */
export async function getQuotes(): Promise<Quote[]> {
  const quotes = await getCollection('zitate');
  return quotes.sort((a, b) => a.id.localeCompare(b.id));
}

/** Zitate, die auf ein bestimmtes Wort verweisen. */
export function quotesForWord(quotes: Quote[], word: Word): Quote[] {
  return quotes.filter((q) => q.data.woerter.some((ref) => ref.id === word.id));
}

/** Grösse in der Wortwolke (1–5): `gewicht` aus dem Front Matter oder stabil aus dem Wort abgeleitet. */
export function wordWeight(word: Word): number {
  if (word.data.gewicht) return word.data.gewicht;
  let hash = 0;
  for (const char of word.id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash % MAX_WEIGHT) + 1;
}

/** Anfangsbuchstabe für das Register, Umlaute ohne Punkte (Ä → A). */
export const initialLetter = (text: string) =>
  text.charAt(0).toUpperCase().normalize('NFD').charAt(0);

/** Gruppiert Wörter nach Anfangsbuchstabe, in der Reihenfolge der Eingabe. */
export function groupByLetter<T extends Word>(words: T[]): { letter: string; words: T[] }[] {
  const groups = new Map<string, T[]>();
  for (const word of words) {
    const letter = initialLetter(word.data.wort);
    groups.set(letter, [...(groups.get(letter) ?? []), word]);
  }
  return [...groups].map(([letter, words]) => ({ letter, words }));
}

export type TextSegment = { text: string; href?: string };

/**
 * Zerlegt einen Zitattext in Abschnitte und verlinkt die referenzierten Wörter.
 * Gefunden wird auch eine gebeugte Form, die mit dem Wort beginnt (Augenblick → Augenblicke).
 */
export function linkWords(text: string, words: Word[]): TextSegment[] {
  if (words.length === 0) return [{ text }];
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `(?<!\\p{L})(${words.map((w) => escape(w.data.wort)).join('|')})\\p{L}*`,
    'giu',
  );

  const segments: TextSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const word = words.find((w) => w.data.wort.toLowerCase() === match[1].toLowerCase());
    segments.push({ text: text.slice(last, match.index) });
    segments.push({ text: match[0], href: word && wordUrl(word) });
    last = match.index + match[0].length;
  }
  segments.push({ text: text.slice(last) });
  return segments.filter((s) => s.text);
}
