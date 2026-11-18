---
title: Hallo Welt
description: Der erste Beitrag – und gleichzeitig eine Vorlage für alle weiteren.
date: 2026-11-18
tags: [meta]
---

Willkommen! Dieser Beitrag zeigt, wie Inhalte aufgebaut sind.

## Front Matter

Alles zwischen den beiden `---` oben ist das **Front Matter**:

| Feld          | Pflicht | Beschreibung                                   |
| ------------- | ------- | ---------------------------------------------- |
| `title`       | ja      | Titel des Beitrags                             |
| `description` | ja      | Kurztext für Übersicht und Suchmaschinen       |
| `date`        | ja      | Veröffentlichungsdatum (`YYYY-MM-DD`)          |
| `updated`     | nein    | Datum der letzten Aktualisierung               |
| `tags`        | nein    | Liste von Tags, z. B. `[projekte, notizen]`    |
| `draft`       | nein    | `true` = nur lokal sichtbar, nicht live        |

## Inhalt

Darunter folgt normales Markdown: Überschriften, Listen, [Links](https://astro.build), Bilder und Code:

```js
console.log('Hallo Welt');
```

> Neuen Beitrag anlegen: Datei in `src/content/posts/` erstellen. Der Dateiname wird zur URL.
