# Content guidelines

Rules for capturing words and quotes consistently.
Unlike the dated concepts, this is a living document: update it when a rule changes.

## What gets in

- **Words:** words that mean something to me: beautiful, precise, untranslatable or tied to a memory.
  Any language.
- **Quotes:** sentences that moved me, quoted exactly; with a verifiable source where one exists, otherwise without author (“Unknown”).
- **Not:** everyday words without a reason.

## Words

| Field | Rule |
| --- | --- |
| File name | Lowercase ASCII of the word or its romanization: `inyeon.md`, `fernweh.md`, `serendipitaet.md` (ä → ae, ö → oe, ü → ue, ß → ss). Never rename after publishing; the file name is the URL. |
| `word` | As written in its language and script, with the capitalization its language uses, like a dictionary headword: German nouns capitalized, English words lowercase. `인연`, `Fernweh`, `sonder`, `kitchen counter`. |
| `lang` | Always set, even for German: `de`, `en`, `ko`, … The language the word *comes from*, not where I met it. Loanwords keep their origin: `permafrost` and `sonder` are English, even though German uses them too. |
| `romanization` | Required for non-Latin scripts. Standard system per language: Korean: Revised Romanization; Japanese: Hepburn; Chinese: Hanyu Pinyin with tone marks. First letter capitalized. |
| `pronunciation` | IPA between slashes. One value if the word sounds the same everywhere (`/in.jʌn/`). If speakers of the page languages say it differently, one per language: sonder `de: /ˈzɔndɐ/`, `en: /ˈsɑːn.dɚ/`. Check Wiktionary or a dictionary. |
| `partOfSpeech` | Both languages, fixed terms. de: `Substantiv, m./f./n.` (gender for German nouns), `Verb`, `Adjektiv`, `Adverb`, `Redewendung`. en: `noun`, `verb`, `adjective`, `adverb`, `phrase`. |
| `definition` | Both `de` and `en` (required). 1–2 sentences, max ~300 characters, in my own words (never copied from a dictionary). Starts with the thing itself ("The sudden realization …"), not "X is …". |
| `origin` | Optional, one sentence: etymology, who coined it and when. Same content in both languages. This is also where the source goes (e.g. the book that coined the word); there is no separate sources field. |
| `added` | Required. The day the word joined the collection, `YYYY-MM-DD`. Never change it later. |

## Quotes

| Field | Rule |
| --- | --- |
| File name | `author-work.md` in lowercase ASCII: `hesse-stufen.md`. Unknown author: `unknown-topic.md` (`unknown-positive.md`). |
| Text (body) | Exactly as published, original spelling and line breaks. Mark omissions with `…`. |
| `author` | Full name as commonly written: `Johann Wolfgang von Goethe`. One value if the name is the same in both languages, `{ de, en }` if not (`Demokrit` / `Democritus`). Leave it out if the author is unknown; the page shows “Unknown” / „Unbekannt“. |
| `source` | Work and year of first publication: `Stufen (1941)`. Translate only the work's title if an established translation exists. |
| `lang` | Language of the original. |
| `translation` | One per page language that differs from the original. Shown as the main quote on that language’s page, with the original below. Prefer a published translation (add the translator to `source`) or my own. |
| `words` | Link words from the collection that appear in the quote. |

## Films and series

| Field | Rule |
| --- | --- |
| File name | Lowercase ASCII of the original title: `past-lives.md`. |
| `title` | Plain text if the title is the same everywhere. Otherwise `original` plus `de` and/or `en` for the release titles that differ. |
| Image | Optional, `src/assets/films/<file name>.jpg` (or `.png`, `.webp`, `.avif`), 1:1, ideally 1024 × 1024 px or more. Only images I made or may use: no official posters, no recognizable portraits of the actors. |
| `releaseDate` | Date of the first release, `YYYY-MM-DD`; for series, the first episode. |
| `type` | `film` or `series`. |
| `director` | Films only, required: full name, or a list for several. |
| `creator` | Series only, required: the creators, one name or a list (shown as “Created by” / „Idee“). |
| `studio` | Studio or distributor as a list. Several if they differ by region, e.g. `[Focus Features, Universal Pictures International]`. |
| `cast` | Main cast as a list, usually 2–5 names. |
| `runtimeMinutes` | Length in minutes; for series, one typical episode. `null` if unknown or if episodes vary too much; then no runtime is shown. |
| `seasons` | Series only, required: number of seasons. |
| `endDate` | Series only: date of the last episode, `YYYY-MM-DD`. Leave it out while the series is still running. |
| `genre` | Always in both languages: `{ de: Komödie, en: Comedy }`, also when the word is the same (`{ de: Drama, en: Drama }`). English in Title Case (`Fantasy Drama`, `Historical Drama / Action`); German as usual (`Fantasy-Drama`). Several genres separated by `,` or `/`. |
| `rating` | My rating from `0` to `10`, whole numbers only. `null` if I have not rated it yet; it then shows no rating and comes last in its group. |
| `description` | Both `de` and `en`. 1–2 sentences in my own words, no spoilers. |

### Prompt for image and data

I use this prompt (in German) in ChatGPT to create the image and fill in the template for a new film or series.
It follows the rules above; keep both in sync when a rule changes.

```text
Für jeden Film oder jede Serie, die ich nenne, erstellst du zwei Dinge:

1. BILD
- Quadratisch 1:1, mindestens 1024 × 1024 px.
- Einheitlicher, warmer Cartoon- bzw. Illustrationsstil, wie ein Standbild einer typischen Szene.
- Kein Text, kein Titel, keine Logos, keine Nachbildung des offiziellen Filmplakats.
- Personen eher von hinten, im Profil oder klein im Bild; keine erkennbaren Porträts der Schauspieler.
- Dateiname: <slug>.jpg (siehe unten).

2. DATEN
- Quellen: offizielle Seite des Studios oder Verleihs, bei Lücken Wikipedia. Nichts erfinden: Was du nicht sicher weisst, lässt du weg und sagst es mir.
- Gib zuerst den Slug an: Originaltitel in Kleinbuchstaben, nur a–z, 0–9 und Bindestriche (ä → ae, ö → oe, ü → ue, ß → ss). Beispiel: Past Lives → past-lives. Bild und Datei heissen gleich.
- Dann dieses Template als Markdown-Codeblock, ohne Kommentare:

---
title:
  original:
  de:
  en:
releaseDate:
endDate:
type:
seasons:
genre:
  de:
  en:
director:
creator:
studio:
  -
cast:
  -
runtimeMinutes:
rating:
description:
  de:
  en:
---

Regeln:
- title: Ist der Titel in allen Sprachen gleich, nur eine Zeile: "title: Inception". Sonst original plus nur die Sprachen, deren Titel abweicht. Titel mit Doppelpunkt in Anführungszeichen setzen.
- releaseDate / endDate: Format JJJJ-MM-TT. releaseDate = Erstveröffentlichung (Serie: erste Folge). endDate nur bei abgeschlossenen Serien, sonst Zeile weglassen.
- type: film oder series.
- seasons: nur bei Serien (Pflicht), bei Filmen Zeile weglassen.
- director: nur bei Filmen. creator: nur bei Serien (die Serienerfinder). Die jeweils andere Zeile weglassen. Mehrere Namen als Liste.
- genre: immer beide Sprachen, auch wenn gleich. Englisch in Title Case (Psychological Drama, War Drama, Action). Mehrere Genres mit Komma trennen.
- studio: Produktionsstudio oder Verleih als Liste.
- cast: Hauptbesetzung, 3–6 Namen.
- runtimeMinutes: ganze Zahl; bei Serien eine typische Folge. Wenn unbekannt oder stark schwankend: null.
- rating: leer lassen.
- description: je 1–2 Sätze, eigene Worte, keine Spoiler, Deutsch und Englisch inhaltlich gleich.
- Typografie: Apostroph ’ statt ' (father’s, O’Toole). Deutsche Anführungszeichen „…“, englische “…”. Schweizer Schreibweise ohne ß (Weisse).
```

## Typography

- **Quotation marks, always the same:** German „…“, English “…”. Apostrophe ’ (`Life’s`).
  Never straight `"` or `'` in visible text, in content or interface text.

## Before publishing (checklist)

- [ ] `lang` and `added` set; `romanization` for non-Latin scripts
- [ ] IPA checked against a source
- [ ] Definition in German and English, own words
- [ ] Page renders in both languages (`npm run dev`: `/glossary/<id>/` and `/de/wortschatz/<id>/`)
- [ ] `npm run build` without errors

## Both languages

- **Required:** every translatable field a word has (`partOfSpeech`, `definition`, `origin`)
  is written in German and English before the word is committed.
- **Same everywhere:** dev and the published site show exactly the same content. There is no
  draft state; a missing translation shows the other language with an "Only available in …" note.
