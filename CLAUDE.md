# CLAUDE.md

Personal website with three sections, Resonance (quotes), Glossary (words with meanings,
each with its own page) and Film (films and series), in English (default) and German.
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
  - **Visitor-facing text:** English and German. Interface text lives in `src/i18n/ui.ts`,
    never hard-coded in components; URL paths are translated in `src/i18n/routes.ts`.
  - **Docs snapshots:** files in `docs/concepts/` keep the language they were written in.
- **Quotation marks:** always German „…“, English “…”, apostrophe ’; never straight quotes in visible text.
- **Commits:** small, focused commits. **Never push** unless the owner explicitly asks.
- **Unclear?** Ask instead of guessing.
- **Verify:** run `npm run build` before committing and check its output for errors.
- **The owner's own work:** don't commit or overwrite the owner's uncommitted changes.
  Stage only your own files.

## Commands

`npm run dev` (localhost:4321) · `npm run build` (into `dist/`) · `npm run preview`

Deploy: GitHub Actions builds every push to `live` ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Content model

Markdown with English front matter keys. Words can come from any language (`lang`).
Schema: [src/content.config.ts](src/content.config.ts).
Fields marked * are translatable: plain text (= German) or `{ de, en }`.

- **Words:** `src/content/words/*.md`
  - Fields: `word`, `lang`, `romanization` (required for non-Latin script), `pronunciation`,
    `partOfSpeech`*, `definition`*, `origin`*, `added` (required date).
  - `pronunciation`: plain text applies to every language; `{ de, en }` if speakers say it differently.
  - A word is in a language's glossary only with a definition in that language.
    There is no separate glossary collection.
- **Quotes:** `src/content/quotes/*.md`
  - Fields: `author`*, `source`*, `lang`, `translation` (`{ de, en }`), `words` (references to word file names),
    `added` (required date).
  - `author`: plain text applies to every language; `{ de, en }` if the name differs;
    leave it out if unknown (shown as “Unknown” / „Unbekannt“).
  - The body is the quote as plain text; line breaks are kept.
  - Referenced words are linked inline, inflected forms included.
- **Films:** `src/content/films/*.md`
  - Fields: `title`, `releaseDate`, `type` (`film` | `series`), `genre` (always `{ de, en }`),
    `director` (films) or `creator` (series), one name or a list, `studio` (list), `cast` (list),
    `runtimeMinutes` (`null` = unknown), `rating` (0–10, whole numbers; `null` = not rated yet), `description`*,
    `added` (required date).
  - Series also: `seasons` (required), `endDate` (left out while running).
  - `title`: plain text if the same everywhere; otherwise `{ original, de?, en? }` with the
    release titles that differ. The original shows below a translated title.
  - Image: `src/assets/films/<file name>.{jpg,png,webp,avif}`, optional; otherwise `placeholder.*`
    or the title’s first letter.
- **IDs:** the file name without folders, so an entry keeps its URL when moved.
- **Same everywhere:** dev and the published site show exactly the same content;
  no examples, no drafts. Every translatable field is written in both languages before committing.
- **Data access:** only through [src/lib/content.ts](src/lib/content.ts). Pages and components never call `getCollection` directly.
- **Guidelines:** what to capture and how, per field: [docs/content-guidelines.md](docs/content-guidelines.md).

## Code structure

- **Routes:** one catch-all page, `src/pages/[...route].astro`, renders the views in
  `src/views/` for every language: `/`, `/resonance/`, `/glossary/`, `/glossary/<id>/`, `/film/`,
  and the same under `/de/` with German paths. Plus `404` and dev-only `/admin/`.
- **Language:** components read the page language with `getLocale(Astro.url)`;
  import language helpers only from `src/i18n`.
- **Site settings:** title, author, theme and social links in [src/data/site.ts](src/data/site.ts);
  navigation comes from `navItems(locale)`.
- **Shared UI:** reusable components in `src/components/`, e.g. `WordEntry`, `QuoteCard`/`QuoteGrid`,
  `PageHeader`, `LanguageHint`. Reuse them instead of duplicating markup (DRY).
- **Client JS:** only in `src/scripts/`, loaded with `<script src>`.
  - Scripts hook into `data-*` attributes.
  - Every page must still work without JavaScript (progressive enhancement).

## Docs

- Concepts, mocks and decisions live in `docs/` (not published). Browse them in dev at `/admin/`.
- Concepts and mocks are dated files (`YYYY-MM-DD-topic.html`). During the creation phase (now)
  they may be overwritten, so every topic has one current version; keep the first file name and date.
  Once the creation phase ends they become snapshots: add a new file instead of editing.
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
  - The appearance setting in the site menu sets `data-scheme`: light (default), dark, or auto (follows the OS),
    applied early by `public/scripts/theme-init.js`.
- **Layout:** every page uses the same `.container`, from full width on mobile up to 1800px.
  Running text is capped at `--text-measure`.

## Pitfalls

- **Windows folder locks:** a running dev server can lock content folders, so renaming a folder
  with `git mv` fails with "Permission denied". Move the files one by one instead.
- **Broken references:** a reference to a missing word does not fail the build. It logs
  "Invalid content reference" and the link is dropped, so check the build output.
