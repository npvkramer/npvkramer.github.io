// Global site settings: title, description, theme, navigation.
// Change them here, not in the layouts.

export const SITE = {
  title: 'npvkramer',
  description: 'Wörter, Zitate und Bedeutungen, die ich sammle.',
  lang: 'de',
  author: 'npvkramer',
  // Visual theme, set as data-theme on <html>. Must match a file in src/styles/themes/.
  theme: 'index',
  // Header navigation. Entries with a `description` also appear as an area on the home page.
  nav: [
    { label: 'Wörter', href: '/woerter/', description: 'Wörter, die ich mag, frei verteilt.' },
    { label: 'Zitate', href: '/zitate/', description: 'Sätze und Sprüche, die mich bewegt haben.' },
    { label: 'Wörterbuch', href: '/woerterbuch/', description: 'Wörter mit Lautschrift und Bedeutung.' },
  ],
  social: [{ label: 'GitHub', href: 'https://github.com/npvkramer' }],
} as const;
