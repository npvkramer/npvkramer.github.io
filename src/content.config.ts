// Definiert die Content-Collections und welche Felder im Front Matter erlaubt sind.
// Fehlt ein Pflichtfeld oder hat es den falschen Typ, bricht der Build mit einer klaren Meldung ab.

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Die ID ist der Dateiname ohne Ordner. Ein Eintrag kann so zwischen
// `beispiele/` und dem Hauptordner verschoben werden, ohne dass sich seine URL ändert.
const idFromFileName = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, '').split('/').pop()!;

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const woerter = defineCollection({
  loader: glob({ base: './src/content/woerter', pattern: '**/*.md', generateId: idFromFileName }),
  schema: z.object({
    wort: z.string(),
    lautschrift: z.string().optional(),
    wortart: z.string().optional(),
    // Mit Definition erscheint das Wort zusätzlich im Wörterbuch.
    definition: z.string().optional(),
    herkunft: z.string().optional(),
    // Grösse in der Wortwolke (1–5). Ohne Angabe wird eine Grösse aus dem Wort abgeleitet.
    gewicht: z.number().int().min(1).max(5).optional(),
  }),
});

const zitate = defineCollection({
  loader: glob({ base: './src/content/zitate', pattern: '**/*.md', generateId: idFromFileName }),
  schema: z.object({
    autor: z.string(),
    quelle: z.string().optional(),
    // Verweise auf Wörter (Dateinamen aus src/content/woerter). Sie werden im Zitat verlinkt.
    woerter: z.array(reference('woerter')).default([]),
  }),
});

export const collections = { posts, woerter, zitate };
