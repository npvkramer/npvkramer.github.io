// Globale Seiteneinstellungen: Titel, Beschreibung, Navigation.
// Hier ändern, nicht in den Layouts.

export const SITE = {
  title: 'npvkramer',
  description: 'Wörter, Zitate und Bedeutungen, die ich sammle.',
  lang: 'de',
  locale: 'de-CH',
  author: 'npvkramer',
  // Navigation im Header. Einträge mit `description` erscheinen auch als Bereich auf der Startseite.
  nav: [
    { label: 'Wörter', href: '/woerter/', description: 'Wörter, die ich mag, frei verteilt.' },
    { label: 'Zitate', href: '/zitate/', description: 'Sätze und Sprüche, die mich bewegt haben.' },
    { label: 'Wörterbuch', href: '/woerterbuch/', description: 'Wörter mit Lautschrift und Bedeutung.' },
    { label: 'Beiträge', href: '/posts/', description: 'Längere Texte und Notizen.' },
  ],
  social: [{ label: 'GitHub', href: 'https://github.com/npvkramer' }],
} as const;
