# Content guidelines

Rules for capturing words and quotes consistently.
Unlike the dated concepts, this is a living document: update it when a rule changes.

## What gets in

- **Words:** words that mean something to me: beautiful, precise, untranslatable or tied to a memory.
  Any language.
- **Quotes:** sentences that moved me, quoted exactly and with a verifiable source.
- **Not:** everyday words without a reason, quotes without a known author or source.

## Words

| Field | Rule |
| --- | --- |
| File name | Lowercase ASCII of the word or its romanization: `inyeon.md`, `fernweh.md`, `serendipitaet.md` (ä → ae, ö → oe, ü → ue, ß → ss). Never rename after publishing; the file name is the URL. |
| `word` | As written in its language and script, with the capitalization its language uses, like a dictionary headword: German nouns capitalized, English words lowercase. `인연`, `Fernweh`, `sonder`, `kitchen counter`. |
| `lang` | Always set, even for German: `de`, `en`, `ko`, … The language the word *comes from*, not where I met it. |
| `romanization` | Required for non-Latin scripts. Standard system per language: Korean: Revised Romanization; Japanese: Hepburn; Chinese: Hanyu Pinyin with tone marks. First letter capitalized. |
| `pronunciation` | IPA between slashes. One value if the word sounds the same everywhere (`/in.jʌn/`). If speakers of the page languages say it differently, one per language: sonder `de: /ˈzɔndɐ/`, `en: /ˈsɑːn.dɚ/`. Check Wiktionary or a dictionary. |
| `partOfSpeech` | Both languages, fixed terms. de: `Substantiv, m./f./n.` (gender for German nouns), `Verb`, `Adjektiv`, `Adverb`, `Redewendung`. en: `noun`, `verb`, `adjective`, `adverb`, `phrase`. |
| `definition` | Both `de` and `en` (required to go online). 1–2 sentences, max ~300 characters, in my own words (never copied from a dictionary). Starts with the thing itself ("The sudden realization …"), not "X is …". |
| `origin` | Optional, one sentence: etymology, who coined it and when. Same content in both languages. This is also where the source goes (e.g. the book that coined the word); there is no separate sources field. |
| `weight` | Optional. Leave empty by default (mixed cloud). `5` only for a handful of favorites. |
| `added` | Required. The day the word joined the collection, `YYYY-MM-DD`. Never change it later. |

## Quotes

| Field | Rule |
| --- | --- |
| File name | `author-work.md` in lowercase ASCII: `hesse-stufen.md`. |
| Text (body) | Exactly as published, original spelling and line breaks. Mark omissions with `…`. |
| `author` | Full name as commonly written: `Johann Wolfgang von Goethe`. |
| `source` | Work and year of first publication: `Stufen (1941)`. Translate only the work's title if an established translation exists. |
| `lang` | Language of the original. |
| `translation` | Optional. Prefer a published translation (add the translator to `source`) or my own, marked as such. |
| `words` | Link words from the collection that appear in the quote. |

## Before publishing (checklist)

- [ ] `lang` and `added` set; `romanization` for non-Latin scripts
- [ ] IPA checked against a source
- [ ] Definition in German and English, own words
- [ ] Page renders in both languages (`npm run dev`: `/words/<id>/` and `/de/woerter/<id>/`)
- [ ] `npm run build` without errors

## Going online

- **Both languages required:** a word goes online only when every translatable field it has
  (`partOfSpeech`, `definition`, `origin`) is set in German and English.
- **Until then:** incomplete words show in dev only, marked "Not online: translation missing",
  and the published build leaves them out. It does not fail the build.
