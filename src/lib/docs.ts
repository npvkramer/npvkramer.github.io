// Reads the files in docs/ for the dev-only /admin viewer.

import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

const htmlFiles = import.meta.glob<string>('/docs/**/*.html', { query: '?raw', import: 'default' });
const markdownFiles = import.meta.glob<{ Content: AstroComponentFactory }>('/docs/**/*.md');

type DocBase = { slug: string; path: string; title: string };
export type Doc =
  | (DocBase & { type: 'html'; html: string })
  | (DocBase & { type: 'md'; Content: AstroComponentFactory; raw: string });

const rawMarkdown = import.meta.glob<string>('/docs/**/*.md', { query: '?raw', import: 'default' });

const toSlug = (path: string) => path.replace(/^\/docs\//, '').replace(/\.(html|md)$/, '');

/** All docs; dated files newest first, undated ones (like README) on top. */
export async function getDocs(): Promise<Doc[]> {
  const html = await Promise.all(
    Object.entries(htmlFiles).map(async ([path, load]): Promise<Doc> => {
      const content = await load();
      const title = content.match(/<title>([^<]*)<\/title>/)?.[1] ?? toSlug(path);
      return { type: 'html', slug: toSlug(path), path: path.slice(1), title, html: content };
    }),
  );
  const markdown = await Promise.all(
    Object.entries(markdownFiles).map(async ([path, load]): Promise<Doc> => {
      const [{ Content }, raw] = await Promise.all([load(), rawMarkdown[path]()]);
      const title = raw.match(/^#\s+(.+)$/m)?.[1] ?? toSlug(path);
      return { type: 'md', slug: toSlug(path), path: path.slice(1), title, Content, raw };
    }),
  );
  const isDated = (doc: Doc) => /\d{4}-\d{2}-\d{2}/.test(doc.slug);
  return [...markdown, ...html].sort(
    (a, b) => Number(isDated(a)) - Number(isDated(b)) || b.slug.localeCompare(a.slug),
  );
}
