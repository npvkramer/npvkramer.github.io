import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Alle veröffentlichten Beiträge, neueste zuerst. Entwürfe erscheinen nur im Dev-Modus. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Alle Tags mit Anzahl Beiträgen, alphabetisch sortiert. */
export function getTags(posts: Post[]): { name: string; slug: string; count: number }[] {
  const counts = new Map<string, { name: string; count: number }>();
  for (const post of posts) {
    for (const name of post.data.tags) {
      const slug = slugify(name);
      const entry = counts.get(slug) ?? { name, count: 0 };
      entry.count += 1;
      counts.set(slug, entry);
    }
  }
  return [...counts.entries()]
    .map(([slug, { name, count }]) => ({ name, slug, count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
