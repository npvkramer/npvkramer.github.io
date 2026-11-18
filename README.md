# npvkramer.github.io

Persönliche Website, gebaut mit [Astro](https://astro.build). Das Ergebnis ist reines statisches HTML, CSS und JS und läuft auf jedem Webserver.

## Befehle

| Befehl            | Wirkung                                           |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Abhängigkeiten installieren (einmalig)            |
| `npm run dev`     | Lokaler Server auf `http://localhost:4321`        |
| `npm run build`   | Fertige Seite nach `dist/` bauen                  |
| `npm run preview` | Gebaute Seite aus `dist/` lokal ansehen           |

## Neuen Beitrag anlegen

Datei in `src/content/posts/` erstellen, z. B. `mein-projekt.md`. Sie ist dann unter `/posts/mein-projekt/` erreichbar.

```markdown
---
title: Mein Projekt
description: Kurzbeschreibung für die Übersicht
date: 2026-11-18
tags: [projekte]
draft: false
---

Inhalt in Markdown …
```

Welche Felder erlaubt sind, steht in [src/content.config.ts](src/content.config.ts). Ein Beitrag mit `draft: true` ist nur lokal sichtbar.

## Struktur

```
src/
  content/posts/     Inhalte als Markdown
  content.config.ts  Erlaubte Front-Matter-Felder
  data/site.ts       Seitentitel, Beschreibung, Navigation, Links
  layouts/           HTML-Gerüst (BaseLayout, PostLayout)
  components/        Wiederverwendbare Teile (Header, Footer, Listen)
  pages/             Routen: jede Datei = eine URL
  lib/               Hilfsfunktionen (Sortierung, Tags, Datumsformat)
  styles/            CSS: tokens, base, layout, components, prose
  scripts/           Client-JS (wird von Astro gebündelt)
public/              Dateien, die 1:1 ausgeliefert werden (Favicon, Bilder)
```

## Deployment

**GitHub Pages:** Jeder Push auf `live` baut und veröffentlicht die Seite per GitHub Action ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)). Einmalig in den Repo-Einstellungen unter *Settings → Pages → Source* „GitHub Actions“ wählen.

**Eigene Domain / anderer Server:** `npm run build` ausführen und den Inhalt von `dist/` hochladen. Vorher `site` in [astro.config.mjs](astro.config.mjs) auf die neue URL setzen.
