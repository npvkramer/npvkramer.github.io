# Docs

Concepts, mocks and decisions for this site, kept as history.

- Files here are **not** part of the published site.
- Run `npm run dev` and open [localhost:4321/admin/](http://localhost:4321/admin/) to browse them inside the app.
  The `/admin` pages only exist in dev mode.
- Each `.html` file also opens directly in a browser.

## Rules

- **Snapshots:** concepts and mocks stay as they were written, in their original language.
  Don't update old files. Add a new dated file instead.
- **File names:** `YYYY-MM-DD-topic.html` (or `.md`), in English.
- **Decisions:** add a line to the decision log below, newest first.

## Concepts

| Date | File | Topic |
| --- | --- | --- |
| 2026-11-18 | [concepts/2026-11-18-navigation-mock.html](concepts/2026-11-18-navigation-mock.html) | Navigation C': full-screen menu overlay, desktop and mobile, clickable (German) |
| 2026-11-18 | [concepts/2026-11-18-index-theme-mock.html](concepts/2026-11-18-index-theme-mock.html) | Index theme style tiles, light (2) and dark (2b) (German) |
| 2026-11-18 | [concepts/2026-11-18-i18n-concept.html](concepts/2026-11-18-i18n-concept.html) | Multilingual site: page language vs. word language, rules R1–R11 (German) |
| 2026-11-18 | [concepts/2026-11-18-word-collection-mock.html](concepts/2026-11-18-word-collection-mock.html) | First clickable mock: words, quotes, dictionary (German) |

## Decision log

**2026-11-18: Theme and navigation** (see index theme and navigation mocks)

- **Theme:** Index, warm-minimal archive look in light and dark. Newsreader for text, IBM Plex Mono for UI.
  Values and token reference in `src/styles/themes/`.
- **Navigation (C'):** "npvk" on the left, a single menu button on the right.
  The menu is a full-screen, inverted, translucent overlay with large centered nav items.
- **Menu footer:** appearance (light/dark/auto), language, social links, copyright; `[ESC]` closes the menu.
- **Language group:** only shown once the site has more than one language.

**2026-11-18: Multilingual site** (see i18n concept)

- **Default page language:** English, no URL prefix. German lives under `/de/`.
- **Paths:** translated per language, e.g. `/words/` and `/de/woerter/`.
- **Hangul:** Noto Serif KR is the fallback font for Korean.
- **Dictionary:** each page language lists only words with a definition in that language.
- **Language label:** shown only when a word's language differs from the page language.
- **Translations:** in the same file, one value per language per field. Plain text counts as German.
- **Defaults:** light color scheme and English. No automatic redirect.
- **Still open:**
  - How to offer the visitor's browser language (and scheme), see the options in the chat.
  - Word language filter: later.
  - `lang: en` for Sonder: proposed, not decided yet.
  - Content guidelines: drafted in `docs/content-guidelines.md`, not decided yet.

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
