// Globale Seiteneinstellungen: Titel, Beschreibung, Navigation.
// Hier ändern, nicht in den Layouts.

export const SITE = {
  title: 'npvkramer',
  description: 'Persönliche Seite mit Beiträgen und Notizen.',
  lang: 'de',
  locale: 'de-CH',
  author: 'npvkramer',
  nav: [
    { label: 'Start', href: '/' },
    { label: 'Beiträge', href: '/posts/' },
    { label: 'Tags', href: '/tags/' },
  ],
  social: [{ label: 'GitHub', href: 'https://github.com/npvkramer' }],
} as const;
