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
| `translation` | Optional. Prefer a published translation (add the translator to `source`) or my own, marked as such. |
| `words` | Link words from the collection that appear in the quote. |

## Films and series

| Field | Rule |
| --- | --- |
| File name | Lowercase ASCII of the original title: `past-lives.md`. |
| `title` | The original title. Use `{ de, en }` only if the German or English release title differs. |
| `releaseDate` | Date of the first release, `YYYY-MM-DD`; for series, the first episode. |
| `type` | `film` or `series`. |
| `director` | Full name; several directors separated by commas. |
| `cast` | Main cast as a list, usually 2–5 names. |
| `runtimeMinutes` | Length in minutes; for series, one typical episode. |
| `genre` | One main genre, fixed terms. One value if it is the same in both languages (`Drama`), otherwise `{ de, en }` (`Komödie` / `Comedy`). |
| `rating` | My rating from `0` to `10`, whole numbers only. |
| `description` | Both `de` and `en`. 1–2 sentences in my own words, no spoilers. |

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
