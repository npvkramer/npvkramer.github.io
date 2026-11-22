// Text fields that can be translated per page language, e.g. a definition.
// In front matter they are either plain text or one value per language:
//   definition: Die plötzliche …            (plain text counts as German)
//   definition: { de: Die plötzliche …, en: The sudden … }

import { z } from 'astro/zod';
import { LOCALES, type Locale } from './config';

/** German was the first content language, so plain text counts as German. */
export const PLAIN_TEXT_LOCALE: Locale = 'de';

export type LocalizedText = string | Partial<Record<Locale, string>>;
export type ResolvedText = { text: string; lang: Locale; fallback: boolean };

/** Schema for a translatable field. Unknown language keys fail the build. */
export const localizedText = () =>
  z.union([
    z.string(),
    z
      .partialRecord(z.enum(LOCALES), z.string())
      .refine((value) => Object.values(value).some(Boolean), 'Add the text in at least one language'),
  ]);

/** Schema for a field that must be written in every page language, e.g. `genre: { de: …, en: … }`. */
export const textPerLocale = () => z.record(z.enum(LOCALES), z.string().min(1));

/** Picks the page language, else German, else any other. `fallback` marks text in another language. */
export function resolve(value: LocalizedText | undefined, locale: Locale): ResolvedText | undefined {
  if (value === undefined) return undefined;
  const texts: Partial<Record<Locale, string>> = typeof value === 'string' ? { [PLAIN_TEXT_LOCALE]: value } : value;
  const lang = [locale, PLAIN_TEXT_LOCALE, ...LOCALES].find((l) => texts[l]);
  return lang ? { text: texts[lang]!, lang, fallback: lang !== locale } : undefined;
}

/** True if the field has text in exactly this language. */
export const hasLocale = (value: LocalizedText | undefined, locale: Locale) => resolve(value, locale)?.fallback === false;

/**
 * For fields that are the same in every language unless split per language, e.g. pronunciation:
 * plain text applies everywhere; `{ de, en }` picks the page language, else the other one.
 */
export const resolveShared = (value: LocalizedText | undefined, locale: Locale): string | undefined =>
  typeof value === 'string' ? value : resolve(value, locale)?.text;
