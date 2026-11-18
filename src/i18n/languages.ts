// Languages of words and quotes (any ISO 639 code), independent of the page language.

import { z } from 'astro/zod';
import type { Locale } from './config';

const strictNames = new Intl.DisplayNames(['en'], { type: 'language', fallback: 'none' });

/** True for a known ISO 639 code such as de, en or ko. */
export const isLanguageCode = (code: string) => /^[a-z]{2,3}$/.test(code) && strictNames.of(code) !== undefined;

/** Schema for a language code; content without `lang` is German. */
export const languageCode = () =>
  z.string().refine(isLanguageCode, 'Use an ISO 639 language code such as de, en or ko').default('de');

/** Name of a language in the page language: ko → "Koreanisch" (de) or "Korean" (en). */
export function languageName(code: string, locale: Locale): string {
  return new Intl.DisplayNames([locale], { type: 'language' }).of(code) ?? code;
}

/** True if the text is written in Latin script (marks, digits, punctuation and spaces allowed). */
export const isLatinScript = (text: string) => !/[^\p{Script=Latin}\p{M}\p{N}\p{P}\p{Zs}]/u.test(text);
