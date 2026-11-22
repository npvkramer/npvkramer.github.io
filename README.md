# npvkramer.github.io

Personal website built with [Astro](https://astro.build): three sections: Resonance (quotes), Glossary (words with meanings, each with its own page) and Film (films and series with a rating). The output is plain static HTML, CSS and JS and runs on any web server.

## Commands

| Command           | Effect                                        |
| ----------------- | --------------------------------------------- |
| `npm install`     | Install dependencies (once)                   |
| `npm run dev`     | Local dev server at `http://localhost:4321`   |
| `npm run build`   | Build the site into `dist/`                   |
| `npm run preview` | Serve the built site from `dist/` locally     |

## Content

All content is Markdown in `src/content/`. The allowed front matter fields are defined in [src/content.config.ts](src/content.config.ts). The file name becomes the URL in every language. What to capture and how: [docs/content-guidelines.md](docs/content-guidelines.md).

The site is in English (default, `/glossary/…`) and German (`/de/wortschatz/…`). Words can come from any language. Interface text and paths live in [src/i18n/](src/i18n/).

**Translatable fields** (`partOfSpeech`, `definition`, `origin`, quote `source`) take plain text or one value per page language. Plain text counts as German. A missing language falls back to German (or the other language) with an "Only available in …" note.

### Add a word

Create a file in `src/content/words/`, e.g. `inyeon.md` → `/glossary/inyeon/` and `/de/wortschatz/inyeon/`.

```markdown
---
word: 인연
lang: ko                      # language of the word, ISO 639 code; default de
romanization: Inyeon          # required if the word is not in Latin script
pronunciation: /in.jʌn/       # optional, IPA; same for all languages, or { de, en } if said differently
partOfSpeech:                 # optional, translatable
  de: Substantiv
  en: noun
definition:                   # optional, translatable – with a definition in a page language
  de: Die schicksalhafte …    #   the word also appears in that language's glossary
  en: A fated connection …
origin: …                     # optional, translatable
added: 2026-11-19             # required: date the word was added
---
```

Words are sorted by `romanization` if present (인연 under I).

### Add a quote

Create a file in `src/content/quotes/`, e.g. `hesse-stufen.md`. The quote text goes below the front matter.

```markdown
---
author: Hermann Hesse   # same in every language, or { de, en } if the name differs
source: Stufen (1941)   # optional, translatable
lang: de                # language of the original; default de
words: [zauber]         # optional: file names from src/content/words
added: 2026-11-19       # required: date the quote was added
translation:            # per page language; shown as the main quote, with the original below
  en: |
    And in every beginning dwells a magic …
---

Und jedem Anfang wohnt ein Zauber inne,
Der uns beschützt und der uns hilft, zu leben.
```

Words listed in `words` are linked in the quote, inflected forms included (Augenblick → Augenblicke). The quote also appears on the word's page.

### Add a film or series

Create a file in `src/content/films/`, e.g. `past-lives.md`. It is listed on `/film/` and `/de/filme/`, grouped into films and series, best rated first.

```markdown
---
title:                        # plain text if the same everywhere, otherwise:
  original: Past Lives
  de: Past Lives – In einem anderen Leben   # only if different from the original
  en: …                                     # only if different from the original
releaseDate: 2023-06-02       # first release; for series the first episode
type: film                    # film or series
genre: { de: Liebesfilm, en: Romance }   # required in both languages
director: Celine Song         # films; one name or a list
studio:                       # studio or distributor; several as a list
  - A24
cast:                         # main cast
  - Greta Lee
  - Teo Yoo
runtimeMinutes: 105           # for series: one episode; null if unknown or too varied
# series only:
# creator: [Carter Bays, Craig Thomas]   # required for series instead of director
# seasons: 5                  # required for series
# endDate: 2024-12-15         # last episode; leave out while running
rating: 9                     # 0 to 10, whole numbers; null if not rated yet
description:                  # translatable
  de: …
  en: …
added: 2026-11-22             # required: date the entry was added
---
```

**Image:** put a square-ish image in `src/assets/films/` named like the film file, e.g. `past-lives.jpg` (also `.png`, `.webp`, `.avif`). It is cropped to a square and optimized at build time. Films without an image use `placeholder.*` from the same folder if it exists, otherwise the first letter of the title.

## Styling

The look comes from themes. `SITE.theme` in [src/data/site.ts](src/data/site.ts) sets `data-theme` on `<html>`; the appearance setting in the site menu sets `data-scheme` (light by default, dark, or auto to follow the OS). Fonts, colors and shapes live in [src/styles/themes/](src/styles/themes/), shared sizes and spacing in [src/styles/tokens.css](src/styles/tokens.css). All other CSS files only use these variables.

Token reference, Index values, font licenses and how to add a theme: [src/styles/themes/README.md](src/styles/themes/README.md).

## Structure

```
src/
  content/
    words/           Words
    quotes/          Quotes
  content.config.ts  Allowed front matter fields
  data/site.ts       Site title, description, theme, navigation, links
  layouts/           HTML frame (BaseLayout)
  components/        Reusable parts (WordEntry, QuoteCard, …)
  pages/             Routes: each file is a URL (folder names stay German)
  lib/               Data access and helpers (content.ts, format.ts)
  styles/            CSS: tokens, themes, base, layout, components
  scripts/           Client JS: glossary search, film page (filter, cards), random word, color scheme
public/              Files served as-is (favicon, early scripts)
```

## Deployment

**GitHub Pages:** every push to `live` builds and publishes the site via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)). Once, in the repo settings under *Settings → Pages → Source*, choose "GitHub Actions".

**Own domain / other server:** run `npm run build` and upload the contents of `dist/`. Set `site` in [astro.config.mjs](astro.config.mjs) to the new URL first.
