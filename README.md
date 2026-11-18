# npvkramer.github.io

Personal website built with [Astro](https://astro.build): a collection of words, quotes and a small dictionary. The output is plain static HTML, CSS and JS and runs on any web server.

## Commands

| Command           | Effect                                        |
| ----------------- | --------------------------------------------- |
| `npm install`     | Install dependencies (once)                   |
| `npm run dev`     | Local dev server at `http://localhost:4321`   |
| `npm run build`   | Build the site into `dist/`                   |
| `npm run preview` | Serve the built site from `dist/` locally     |

## Content

All content is Markdown in `src/content/`. The allowed front matter fields are defined in [src/content.config.ts](src/content.config.ts). The file name becomes the URL. Content itself is written in German.

### Add a word

Create a file in `src/content/words/`, e.g. `sonder.md` → `/woerter/sonder/`.

```markdown
---
word: Sonder
pronunciation: /zɔndɐ/        # optional, IPA
partOfSpeech: Substantiv      # optional
definition: Die plötzliche …  # optional – with a definition the word also appears in the dictionary
origin: …                     # optional
weight: 4                     # optional, 1–5: size in the word cloud
---
```

Without `weight`, a size is derived from the word, which keeps the cloud mixed.

### Add a quote

Create a file in `src/content/quotes/`, e.g. `hesse-stufen.md`. The quote text goes below the front matter.

```markdown
---
author: Hermann Hesse
source: Stufen (1941)   # optional
words: [zauber]         # optional: file names from src/content/words
---

Und jedem Anfang wohnt ein Zauber inne,
Der uns beschützt und der uns hilft, zu leben.
```

Words listed in `words` are linked in the quote, inflected forms included (Augenblick → Augenblicke). The quote also appears on the word's page.

### Example content

All examples live in `src/content/words/examples/` and `src/content/quotes/examples/` and are marked "Beispiel" on the site. Delete both folders to remove them. To keep an example, move the file one level up; its URL stays the same.

Note: if one of your quotes references an example word, move that word first. Otherwise the build logs "Invalid content reference" and the link in the quote is missing.

## Styling

The look comes from themes. `SITE.theme` in [src/data/site.ts](src/data/site.ts) sets `data-theme` on `<html>`; the header toggle sets `data-scheme` (light/dark). Fonts, colors and shapes live in [src/styles/themes/](src/styles/themes/), shared sizes and spacing in [src/styles/tokens.css](src/styles/tokens.css). All other CSS files only use these variables.

Token reference, Index values, font licenses and how to add a theme: [src/styles/themes/README.md](src/styles/themes/README.md).

## Structure

```
src/
  content/
    words/           Words (examples/ = example content)
    quotes/          Quotes (examples/ = example content)
  content.config.ts  Allowed front matter fields
  data/site.ts       Site title, description, theme, navigation, links
  layouts/           HTML frame (BaseLayout)
  components/        Reusable parts (WordEntry, QuoteCard, …)
  pages/             Routes: each file is a URL (folder names stay German)
  lib/               Data access and helpers (content.ts, format.ts)
  styles/            CSS: tokens, themes, base, layout, components
  scripts/           Client JS: word cloud, dictionary search, random word, color scheme
public/              Files served as-is (favicon, early scripts)
```

## Deployment

**GitHub Pages:** every push to `live` builds and publishes the site via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)). Once, in the repo settings under *Settings → Pages → Source*, choose "GitHub Actions".

**Own domain / other server:** run `npm run build` and upload the contents of `dist/`. Set `site` in [astro.config.mjs](astro.config.mjs) to the new URL first.
