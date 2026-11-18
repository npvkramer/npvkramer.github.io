# npvkramer.github.io

Persönliche Website, gebaut mit [Astro](https://astro.build). Das Ergebnis ist reines statisches HTML, CSS und JS und läuft auf jedem Webserver.

## Befehle

| Befehl            | Wirkung                                           |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Abhängigkeiten installieren (einmalig)            |
| `npm run dev`     | Lokaler Server auf `http://localhost:4321`        |
| `npm run build`   | Fertige Seite nach `dist/` bauen                  |
| `npm run preview` | Gebaute Seite aus `dist/` lokal ansehen           |

## Inhalte

Alle Inhalte sind Markdown-Dateien in `src/content/`. Welche Felder erlaubt sind, steht in [src/content.config.ts](src/content.config.ts). Der Dateiname wird zur URL.

### Wort hinzufügen

Datei in `src/content/woerter/` anlegen, z. B. `sonder.md` → `/woerter/sonder/`.

```markdown
---
wort: Sonder
lautschrift: /zɔndɐ/          # optional
wortart: Substantiv           # optional
definition: Die plötzliche …  # optional – mit Definition erscheint das Wort im Wörterbuch
herkunft: …                   # optional
gewicht: 4                    # optional, 1–5: Grösse in der Wortwolke
---
```

Ohne `gewicht` wird eine Grösse aus dem Wort abgeleitet. So entsteht eine gemischte Wolke.

### Zitat hinzufügen

Datei in `src/content/zitate/` anlegen, z. B. `hesse-stufen.md`. Der Text des Zitats steht unter dem Front Matter.

```markdown
---
autor: Hermann Hesse
quelle: Stufen (1941)   # optional
woerter: [zauber]       # optional: Dateinamen aus src/content/woerter
---

Und jedem Anfang wohnt ein Zauber inne,
Der uns beschützt und der uns hilft, zu leben.
```

Wörter aus `woerter` werden im Zitat verlinkt, auch in gebeugter Form (Augenblick → Augenblicke). Auf der Seite des Worts erscheint das Zitat ebenfalls.

### Beispielinhalte

Alle Beispiele liegen in `src/content/woerter/beispiele/` und `src/content/zitate/beispiele/`. Auf der Seite sind sie mit „Beispiel“ markiert. Zum Entfernen beide Ordner löschen. Willst du ein Beispiel behalten, verschiebe die Datei eine Ebene nach oben. Die URL bleibt dabei gleich.

Achtung: Verweist eines deiner Zitate auf ein Beispielwort, verschiebe das Wort vorher. Sonst meldet der Build „Invalid content reference“ und der Link im Zitat fehlt.

## Styling

The look comes from themes. `SITE.theme` in [src/data/site.ts](src/data/site.ts) sets `data-theme` on `<html>`; the header toggle sets `data-scheme` (light/dark). Fonts, colors and shapes live in [src/styles/themes/](src/styles/themes/), shared sizes and spacing in [src/styles/tokens.css](src/styles/tokens.css). All other CSS files only use these variables.

Token reference, Index values, font licenses and how to add a theme: [src/styles/themes/README.md](src/styles/themes/README.md).

## Struktur

```
src/
  content/
    woerter/         Wörter (beispiele/ = Beispielinhalte)
    zitate/          Zitate (beispiele/ = Beispielinhalte)
  content.config.ts  Erlaubte Front-Matter-Felder
  data/site.ts       Seitentitel, Beschreibung, Navigation, Links
  layouts/           HTML-Gerüst (BaseLayout)
  components/        Wiederverwendbare Teile (WordEntry, QuoteCard, …)
  pages/             Routen: jede Datei = eine URL
  lib/               Datenzugriff und Hilfsfunktionen (content.ts, format.ts)
  styles/            CSS: tokens (Variablen), base, layout, components
  scripts/           Client-JS: Wortwolke, Wörterbuch-Suche, Zufallswort, Farbschema
public/              Dateien, die 1:1 ausgeliefert werden (Favicon, Bilder)
```

## Deployment

**GitHub Pages:** Jeder Push auf `live` baut und veröffentlicht die Seite per GitHub Action ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)). Einmalig in den Repo-Einstellungen unter *Settings → Pages → Source* „GitHub Actions“ wählen.

**Eigene Domain / anderer Server:** `npm run build` ausführen und den Inhalt von `dist/` hochladen. Vorher `site` in [astro.config.mjs](astro.config.mjs) auf die neue URL setzen.
