# Docs

Concepts, mocks and decisions for this site, kept as history.

- Files here are **not** part of the published site.
- Run `npm run dev` and open [localhost:4321/admin/](http://localhost:4321/admin/) to browse them inside the app.
  The `/admin` pages only exist in dev mode.
- Each `.html` file also opens directly in a browser.

## Rules

- **Creation phase (now):** while the site is being built, concepts and mocks may be overwritten,
  so every topic has one clean, current version. Keep the file name and date of the first version.
- **Snapshots (later):** once the creation phase ends, concepts and mocks stay as they were written.
  Don't update old files then; add a new dated file instead.
- **Language:** concepts and mocks keep the language they were written in.
- **File names:** `YYYY-MM-DD-topic.html` (or `.md`), in English.
- **Decisions:** add a line to the decision log below, newest first.

## Concepts

| Date | File | Topic |
| --- | --- | --- |
| 2026-11-18 | [concepts/2026-11-18-navigation-mock.html](concepts/2026-11-18-navigation-mock.html) | Navigation C': full-screen menu overlay with fade-in, desktop and mobile, clickable (German) |
| 2026-11-18 | [concepts/2026-11-18-index-theme-mock.html](concepts/2026-11-18-index-theme-mock.html) | Index theme style tiles, light (2) and dark (2b) (German) |
| 2026-11-18 | [concepts/2026-11-18-i18n-concept.html](concepts/2026-11-18-i18n-concept.html) | Multilingual site: page language vs. word language, rules R1–R11 (German) |
| 2026-11-18 | [concepts/2026-11-18-word-collection-mock.html](concepts/2026-11-18-word-collection-mock.html) | First clickable mock: words, quotes, dictionary (German) |

## Decision log

**2026-11-18: Theme and navigation** (see index theme and navigation mocks)

- **Theme:** Index, warm-minimal archive look in light and dark. Newsreader for text, IBM Plex Mono for UI.
  Values and token reference in `src/styles/themes/`.
- **Navigation (C'):** "npvk" on the left, a single menu button on the right.
  The menu is a full-screen, translucent overlay with large centered nav items.
- **Menu colors:** always a dark layer: inverted in light mode, one step darker than the page in dark mode.
- **Hover and current page:** accent color only, no italics.
- **Motion:** the overlay fades in from transparent and nav items rise into place one after another;
  closing fades out. Reduced motion keeps only the fade.
- **Menu footer:** appearance (light/dark/auto), language, social links, copyright; `[ESC]` closes the menu.
- **Language group:** only shown once the site has more than one language.

**2026-11-19: Unknown authors**

- Quotes without a known author or source are allowed. They leave out `author` and show “Unknown” / „Unbekannt“.

**2026-11-19: Quotation marks**

- Always the same typographic marks: German „…“, English “…”, apostrophe ’. No straight quotes in visible text.
- Quotes are attributed to their earliest verifiable source, with its exact wording
  (e.g. Rita Mae Brown, not the common misattribution to Einstein).

**2026-11-19: Word size**

- `weight` (1 smallest, 5 largest) is required for every word; sizes are no longer derived from the file name.

**2026-11-19: Section names**

- Words → **Fragments / Fragmente** (`/fragments/`, `/de/fragmente/`)
- Quotes → **Resonance / Nachklang** (`/resonance/`, `/de/nachklang/`)
- Dictionary → **Glossary / Wortschatz** (`/glossary/`, `/de/wortschatz/`)
- Routes, views and code follow the new names. Content folders (`words`, `quotes`) stay for now.
- **Resonance:** "Life’s lessons in words that echo." / „Die Lehren des Lebens in Worten, die nachklingen.“
- **Glossary:** "The sound and meaning behind a word." / „Klang und Bedeutung hinter einem Wort.“
- **Fragments:** "A scattering of words worth keeping." / „Eine lose Sammlung von Wörtern, die bleiben dürfen.“
- Each definition is the section's page lead and its description in the menu and on the home page.

**2026-11-19: Same content everywhere**

- All example content is deleted.
- Dev and the published site show exactly the same content: no dev-only examples, no hidden drafts.
  This replaces the earlier rules that hid examples and incomplete words from the published site.

**2026-11-19: Both languages required**

- Every translatable field of a word is written in German and English before it is committed.
- No separate `sources` field: where a word comes from goes into `origin`.
- Every word has a required `added` date (`YYYY-MM-DD`).
- The content guidelines in [content-guidelines.md](content-guidelines.md) are decided and apply from now on.
- **Capitalization:** words are written like a dictionary headword in their language:
  German nouns capitalized, English words lowercase (`sonder`, `kitchen counter`, `radiant`).
- **Loanwords:** a word keeps the language it comes from, even if it is established in German
  (`permafrost`, `sonder`: English). If German speakers say it differently, add a `de` pronunciation.

**2026-11-18: Multilingual site** (see i18n concept)

- **Default page language:** English, no URL prefix. German lives under `/de/`.
- **Paths:** translated per language, e.g. `/words/` and `/de/woerter/`.
- **Hangul:** Noto Serif KR is the fallback font for Korean.
- **Dictionary:** each page language lists only words with a definition in that language.
- **Language label:** shown only when a word's language differs from the page language.
- **Translations:** in the same file, one value per language per field. Plain text counts as German.
- **Defaults:** light color scheme and English. No automatic redirect.
- **Browser language:** a thin hint bar above the header offers the page in the browser's language,
  written in that language. Shown once; closing it or choosing a language in the menu also counts.
  No prompt for the color scheme; the menu's "Auto" covers it.
- **Pronunciation:** one value for all languages, or one per page language if speakers say it differently.
- **Sonder:** an English word (`lang: en`), coined by John Koenig; pronounced `/ˈzɔndɐ/` (de) and `/ˈsɑːn.dɚ/` (en).
- **Still open:**
  - Word language filter: later.

**2026-11-18: Docs location**

- Docs live in `docs/` and are browsable via a dev-only `/admin` page.
- Concepts keep their original language.

**2026-11-18: Structure and layout**

- **Content model:** one word collection with three views: word cloud, dictionary (words with a definition) and word pages.
  Quotes reference words.
- **Word cloud:** words scattered over the full width with mixed sizes.
- **Quotes:** at most two columns, equal-height cards, author at the bottom.
- **Layout:** one container for all pages, stepped widths up to 1800px.
- **Blog:** removed for now.
