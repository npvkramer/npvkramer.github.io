# CLAUDE.md

Personal website: a collection of German words, quotes and a small dictionary.
Static site built with Astro 7, deployed to GitHub Pages. The build output must stay plain
static HTML/CSS/JS so the site can move to its own domain or server at any time.

## Changing this file

This file improves itself, but only with approval.

- Whenever you want to add, change or remove anything here, ask first as a **change request**:
  show the exact text and say why. Edit only after the owner agrees.
- Good candidates are decisions, conventions and pitfalls you can't see in the code.
  Don't add things the code or git history already shows.
- Keep it short. Propose removing entries that are outdated.

## Working rules

- **English everywhere in the codebase:** code, identifiers, comments, file and folder names,
  commit messages, README and this file.
  - **Stays German:** everything visitors see (UI text, content in `src/content/`), URLs.
    That means route folders in `src/pages/` (`woerter/`, `zitate/`, `woerterbuch/`) and URL anchors.
  - **Docs snapshots:** files in `docs/concepts/` keep the language they were written in.
- **Commits:** small, focused commits. **Never push** unless the owner explicitly asks.
- **Unclear?** Ask instead of guessing.
- **Verify:** run `npm run build` before committing and check its output for errors.
- **The owner's own work:** don't commit or overwrite the owner's uncommitted changes.
  Stage only your own files.

## Commands

`npm run dev` (localhost:4321) · `npm run build` (into `dist/`) · `npm run preview`

Deploy: GitHub Actions builds every push to `live` ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Content model

Content is written in German, as Markdown. Front matter keys are English.
Schema: [src/content.config.ts](src/content.config.ts).

- **Words:** `src/content/words/*.md`
  - Fields: `word`, `pronunciation`, `partOfSpeech`, `definition`, `origin`, `weight` (1–5, cloud size).
  - A word with a `definition` also appears in the dictionary. There is no separate dictionary collection.
- **Quotes:** `src/content/quotes/*.md`
  - Fields: `author`, `source`, `words` (references to word file names).
  - The body is the quote as plain text; line breaks are kept.
  - Referenced words are linked inline, inflected forms included.
- **IDs:** the file name without folders, so an entry keeps its URL when moved.
- **Examples:** example content lives in `examples/` subfolders and is marked "Beispiel" on the site.
  The owner's real content goes in the main folders.
- **Data access:** only through [src/lib/content.ts](src/lib/content.ts). Pages and components never call `getCollection` directly.

## Code structure

- **Routes:**
  - `/`: random featured word and area list
  - `/woerter/`: word cloud
  - `/woerter/[id]/`: word page
  - `/zitate/`: quotes
  - `/woerterbuch/`: dictionary
  - `404`
- **Site settings:** title, theme and navigation live in [src/data/site.ts](src/data/site.ts).
  Nav entries with a `description` also show as areas on the home page.
- **Shared UI:** reusable components in `src/components/`, e.g. `WordEntry`, `QuoteCard`/`QuoteGrid`,
  `PageHeader`, `ExampleBadge`. Reuse them instead of duplicating markup (DRY).
- **Client JS:** only in `src/scripts/`, loaded with `<script src>`.
  - Scripts hook into `data-*` attributes.
  - Every page must still work without JavaScript (progressive enhancement).

## Docs

- Concepts, mocks and decisions live in `docs/` (not published). Browse them in dev at `/admin/`.
- Concepts are dated snapshots (`YYYY-MM-DD-topic.html`): don't edit old ones, add a new file.
- Record every product decision in the decision log in [docs/README.md](docs/README.md).

## Styling

Styling is being reworked by the owner. Read the current files before assuming anything.

- **Tokens:**
  - [src/styles/tokens.css](src/styles/tokens.css): shared sizes, spacing and container widths.
  - [src/styles/themes/](src/styles/themes/): fonts, colors (`light-dark()`) and shapes per theme.
  - Token reference: [src/styles/themes/README.md](src/styles/themes/README.md).
- **Rule:** all other CSS uses variables only, never raw values.
  The only inline style allowed is a CSS variable hook such as `--weight`.
- **Theme and color scheme:**
  - `SITE.theme` sets `data-theme` on `<html>`.
  - The header toggle sets `data-scheme` (light/dark), applied early by `public/scripts/theme-init.js`.
- **Layout:** every page uses the same `.container`, from full width on mobile up to 1800px.
  Running text is capped at `--text-measure`.

## Pitfalls

- **Windows folder locks:** a running dev server can lock content folders, so renaming a folder
  with `git mv` fails with "Permission denied". Move the files one by one instead.
- **Broken references:** a reference to a missing word does not fail the build. It logs
  "Invalid content reference" and the link is dropped, so check the build output.
