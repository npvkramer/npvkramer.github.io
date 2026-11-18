# Themes

The site's look is controlled by two attributes on `<html>`. Components and pages never change; only the token values behind them do.

| Attribute | Values | Set by | Controls |
| --- | --- | --- | --- |
| `data-theme` | `index`, … | `SITE.theme` in [src/data/site.ts](../../data/site.ts) | Fonts, colors, shapes, UI text style |
| `data-scheme` | `light`, `dark` (absent = OS setting) | Appearance setting in the site menu, stored in `localStorage` (`color-scheme`) | Which side of `light-dark()` applies |

To switch the theme, change one line in `site.ts`:

```ts
theme: 'index',
```

## Files

```
src/styles/
  tokens.css        Shared layout tokens: font sizes, spacing, container widths
  themes/
    index.css       Theme "index" — also the base layer for every other theme
    _template.css   Copy this to start a new theme (not imported)
    README.md       This file
  global.css        Imports tokens, then themes, then base/layout/components
```

`index.css` applies to `:root` as well as `[data-theme='index']`. Every other theme therefore inherits all Index values and only overrides what differs. A theme may also override any token from `tokens.css` (e.g. `--size-base`).

## Token reference

Rules for component CSS: use only these variables, never raw colors, fonts or radii. If a component needs something new, add a token to `index.css` and document it here.

### Fonts and type

| Token | Purpose | Index |
| --- | --- | --- |
| `--font-body` | Running text, definitions | Newsreader |
| `--font-display` | Headings, headwords, quotes, word cloud | Newsreader (= body) |
| `--font-ui` | Navigation, labels, meta lines, buttons | IBM Plex Mono |
| `--font-mono` | Code | IBM Plex Mono (= UI) |
| `--size-base` | Body size (overrides tokens.css) | 1.125rem (18px) |
| `--size-headword-lg` | Featured word on the home page | clamp(3.5rem … 8.5rem) |
| `--leading-body` | Body line height | 1.6 |
| `--weight-display` | Weight of headings and headwords | 400 |
| `--tracking-display` | Letter spacing of headings | -0.02em |

### UI text

Applied to every class listed in the "UI text" rule at the end of [base.css](../base.css).

| Token | Purpose | Index |
| --- | --- | --- |
| `--ui-size` | Font size | 0.8125rem (13px) |
| `--ui-weight` | Normal weight | 400 |
| `--ui-weight-strong` | Site title, quote author | 500 |
| `--ui-transform` | `uppercase`, `none`, … | uppercase |
| `--ui-tracking` | Letter spacing | 0.04em |

### Colors

All colors are `light-dark(light, dark)`.

| Token | Purpose | Index light | Index dark |
| --- | --- | --- | --- |
| `--color-bg` | Page background | `#f5f4f0` | `#161513` |
| `--color-surface` | Cards, inputs | `#ffffff` | `#1f1e1b` |
| `--color-subtle` | Hover, code, highlighted areas | `#e8e5dd` | `#26241f` |
| `--color-text` | Main text | `#1a1a1a` | `#edeae3` |
| `--color-muted` | Secondary text | `#5e5c57` | `#9c988f` |
| `--color-border` | Thin dividers | `#c9c6be` | `#34322e` |
| `--color-rule` | Strong lines: header, footer, cards, inputs | `#1a1a1a` | `#cfcbc2` |
| `--color-accent` | Links, current nav item, highlights | `#2840e0` | `#8f9bff` |
| `--color-accent-soft` | Tinted background behind accent text | `#e1e4f7` | `#23264a` |
| `--color-on-accent` | Text on an accent background | `#ffffff` | `#161513` |

Contrast: `--color-text` and `--color-muted` reach at least 4.5:1 on `--color-bg` and `--color-surface` in both schemes, as does `--color-accent` on `--color-bg`. Keep that when changing values.

### Site menu

The menu is a full-screen overlay over the page, inverted against the current scheme ([SiteMenu.astro](../../components/SiteMenu.astro), styles in [layout.css](../layout.css)).

| Token | Purpose | Index light | Index dark |
| --- | --- | --- | --- |
| `--color-menu-bg` | Translucent overlay background | `rgb(26 26 26 / 0.92)` | `rgb(237 234 227 / 0.94)` |
| `--color-menu-solid` | Opaque twin of the background, text on pressed buttons | `#1a1a1a` | `#edeae3` |
| `--color-menu-text` | Text, lines, button borders | `#f5f4f0` | `#161513` |
| `--color-menu-muted` | Labels, numbers, copyright | `#a8a49b` | `#5e5c57` |
| `--color-menu-accent` | Hover and current page | `#8f9bff` | `#2840e0` |
| `--menu-blur` | Blur of the page behind the overlay | 10px | 10px |

`--menu-item-size` (size of the large nav items) is a layout token in `tokens.css`.

### Shape

| Token | Purpose | Index |
| --- | --- | --- |
| `--radius` | Corners of cards, inputs, buttons, focus ring | 2px |
| `--radius-tag` | Corners of small pills and tags | 2px |

## Fonts and licenses

All fonts are self-hosted through [Fontsource](https://fontsource.org) npm packages and bundled at build time, so no request goes to Google.

| Font | Package | License | Used for |
| --- | --- | --- | --- |
| Newsreader (variable, opsz + wght, with italics) | `@fontsource-variable/newsreader` | SIL OFL 1.1 | Body, display |
| IBM Plex Mono 400, 500 | `@fontsource/ibm-plex-mono` | SIL OFL 1.1 | UI, code |

Times New Roman stays in the fallback stack only: it is a Monotype font and may not be served as a web font. For that exact look, use Tinos (Apache 2.0, metric-compatible).

## Adding a theme

1. Copy `_template.css` to `themes/<name>.css` and replace `<name>` in its selector.
2. Override only the tokens that differ from Index.
3. New fonts: `npm install @fontsource/<font>` (or `@fontsource-variable/<font>`) and `@import` the needed weights at the top of the theme file. Check that the license allows web use (OFL or Apache 2.0).
4. Import the file in [global.css](../global.css) after `index.css`.
5. Set `theme: '<name>'` in `site.ts`.

A theme with only one scheme (e.g. dark only) uses plain color values instead of `light-dark()`, sets `color-scheme: dark;` in its block and should hide the appearance group in the site menu.

## Design reference

The mockups behind these values (Index light and dark, the other explored directions and the font comparison) are on the design canvas "CI Ideen – Wörter & Zitate": https://claude.ai/artifact/AnKAKoBSxHgGakuZbJbAGF (private to the owner).
