// Content collections and the front matter fields they allow.
// A missing required field or a wrong type fails the build with a clear message.

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { isLatinScript, languageCode } from './i18n/languages';
import { localizedText, textPerLocale } from './i18n/localized';
import { LOCALES } from './i18n/config';
import { FILM_TYPES } from './lib/film-types';

// The ID is the file name without folders, so an entry keeps its URL if it moves into a subfolder.
const idFromFileName = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, '').split('/').pop()!;

// Translatable fields (localizedText) take plain text (German) or one value per page language.
const words = defineCollection({
  loader: glob({ base: './src/content/words', pattern: '**/*.md', generateId: idFromFileName }),
  schema: z
    .object({
      word: z.string(),
      lang: languageCode(), // language of the word itself, e.g. ko; default de
      romanization: z.string().optional(), // Latin spelling, required for other scripts
      // IPA. Plain text applies to every page language; use { de, en } if it is said differently.
      pronunciation: localizedText().optional(),
      partOfSpeech: localizedText().optional(),
      // With a definition in the page language the word also appears in that glossary.
      definition: localizedText().optional(),
      origin: localizedText().optional(),
      // Date the word was added to the collection (YYYY-MM-DD), e.g. for "recently added".
      added: z.coerce.date(),
    })
    .refine((data) => data.romanization || isLatinScript(data.word), {
      message: 'Add `romanization` for words that are not written in Latin script',
      path: ['romanization'],
    }),
});

// Optional field that also accepts an empty value (`seasons:` with nothing after it) as “not set”.
// Without this, an empty `endDate:` would turn into 1970-01-01 and an empty `seasons:` would fail.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === null ? undefined : value), schema.optional());

const quotes = defineCollection({
  loader: glob({ base: './src/content/quotes', pattern: '**/*.md', generateId: idFromFileName }),
  schema: z.object({
    // Plain text applies to every language; { de, en } where the name differs (Demokrit / Democritus).
    // Leave it out if the author is unknown; the page then shows “Unknown” / „Unbekannt“.
    author: localizedText().optional(),
    source: localizedText().optional(),
    lang: languageCode(), // language of the original text; default de
    // Translations of the quote text per page language, shown as the main quote with the original below.
    translation: z.partialRecord(z.enum(LOCALES), z.string()).optional(),
    // References to words (file names in src/content/words). They are linked in the quote text.
    words: z.array(reference('words')).default([]),
    // Date the quote was added (YYYY-MM-DD).
    added: z.coerce.date(),
    // Optional position in my own order: the highest number shows on top. Quotes without it follow, newest first.
    order: optional(z.number().int()),
  }),
});

const names = z.union([z.string(), z.array(z.string()).min(1)]);

// Fields each type needs and fields it must not have.
const FIELDS_BY_TYPE = {
  film: { required: ['director'], forbidden: ['creator', 'seasons', 'endDate'] },
  series: { required: ['creator', 'seasons'], forbidden: ['director'] },
} as const;

const films = defineCollection({
  loader: glob({ base: './src/content/films', pattern: '**/*.md', generateId: idFromFileName }),
  schema: z.object({
    // Plain text if the title is the same everywhere; otherwise the original plus de/en where they differ.
    title: z.union([
      z.string(),
      z.object({ original: z.string(), de: z.string().optional(), en: z.string().optional() }).strict(),
    ]),
    // First release (YYYY-MM-DD); for series the first episode.
    releaseDate: z.coerce.date(),
    type: z.enum(FILM_TYPES),
    // Names stay the same in every language; one name or a list. Films: director, series: creator.
    director: optional(names),
    creator: optional(names),
    // Studio or distributor; several (e.g. per region) as a list.
    studio: z.array(z.string()).min(1),
    cast: z.array(z.string()).min(1), // main cast
    // Length in minutes; for series one episode. `null` or left out if unknown or too varied.
    runtimeMinutes: z.number().int().positive().nullish(),
    // Always in both languages: { de: Komödie, en: Comedy }.
    genre: textPerLocale(),
    // My rating from 0 to 10, whole numbers only. `null` or left out: not rated yet.
    rating: z.number().int().min(0).max(10).nullish(),
    description: localizedText(),
    // Date the entry was added (YYYY-MM-DD).
    added: z.coerce.date(),
    // Series only: number of seasons (required) and the date of the last episode (left out while running).
    seasons: optional(z.number().int().positive()),
    endDate: optional(z.coerce.date()),
  }).superRefine((film, ctx) => {
    const rules = FIELDS_BY_TYPE[film.type];
    for (const key of rules.required) {
      if (film[key] === undefined) {
        ctx.addIssue({ code: 'custom', path: [key], message: `A ${film.type} needs \`${key}\`` });
      }
    }
    for (const key of rules.forbidden) {
      if (film[key] !== undefined) {
        ctx.addIssue({ code: 'custom', path: [key], message: `\`${key}\` is not used for a ${film.type}` });
      }
    }
  }),
});

export const collections = { words, quotes, films };
