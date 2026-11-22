// Content collections and the front matter fields they allow.
// A missing required field or a wrong type fails the build with a clear message.

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { isLatinScript, languageCode } from './i18n/languages';
import { localizedText } from './i18n/localized';
import { LOCALES } from './i18n/config';

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

const quotes = defineCollection({
  loader: glob({ base: './src/content/quotes', pattern: '**/*.md', generateId: idFromFileName }),
  schema: z.object({
    // Plain text applies to every language; { de, en } where the name differs (Demokrit / Democritus).
    // Leave it out if the author is unknown; the page then shows “Unknown” / „Unbekannt“.
    author: localizedText().optional(),
    source: localizedText().optional(),
    lang: languageCode(), // language of the original text; default de
    // Translations of the quote text per page language. Shown below the original.
    translation: z.partialRecord(z.enum(LOCALES), z.string()).optional(),
    // References to words (file names in src/content/words). They are linked in the quote text.
    words: z.array(reference('words')).default([]),
  }),
});

export const collections = { words, quotes };
