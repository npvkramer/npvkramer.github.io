// Global site settings: title, author, theme, social links.
// Language-dependent settings (navigation, description, UI text) live in src/i18n/.

export const SITE = {
  title: 'npvk',
  author: 'npvkramer',
  // Visual theme, set as data-theme on <html>. Must match a file in src/styles/themes/.
  theme: 'index',
  social: [{ label: 'GitHub', href: 'https://github.com/npvkramer' }],
} as const;
