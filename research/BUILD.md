# What we're building — concept map + directions

## The one-paragraph concept

**Messages don't own papers.** Today a paper exists only inside the message that surfaced
it, so it is reborn as a stranger in every new query, graph, and collection. We make the
paper a persistent object that accumulates a trail as you work — where it came from, how
often it resurfaced, what you decided about it, what you wrote on it. Every surface in
Consensus becomes a *view* of those same objects rather than a separate room. You act on a
paper wherever you meet it, and the action follows it everywhere. Curation stops being a
step you do at the end and becomes something that happens while you research — so the set
you leave with is already organized, already annotated, and already explains itself.

---

## Object model (the whole idea, compressed)

```
Source                      ← one object, one identity, global
├── provenance[]            { threadId, queryId, rank, surfacedAt }
│                             → derived: recurrence (n independent queries)
├── decision                undecided | keep | maybe | excluded(reason)
├── notes[]                 { text, anchor?: { quote, queryId }, createdAt }
├── tags[]
└── readState               unread | skimmed | read | cited

Views (never own, only arrange):
  Thread · References · Citation Graph · Collection · My Library
```

The line that does the work: **views never own.** Lifted directly from Heptabase's
*"whiteboards do not own cards."* It is why all four audit gaps collapse into one change.

---

## The hero interaction

**Highlight a sentence in an answer → the note attaches to the papers cited in that
sentence, carrying the quote and the question that produced it.**

Why this one:

- It is the cheapest possible capture — you were already reading that sentence
- It is the Heptabase Highlight Card pattern, but applied to *synthesized text* rather
  than a PDF, so the note arrives pre-linked to multiple sources at once
- **Only Consensus can do it.** It requires sentence-level citations inside an agent-written
  answer over a corpus the system itself discovered. NotebookLM has the citations but you
  bring the sources. ResearchRabbit has the sources but no synthesis. Heptabase has neither
- It converts reading into curation with zero added steps, which is the entire thesis

---

## Right-click / context menu — why it's structural, not garnish

The user asked for this explicitly. It is worth arguing for on principle rather than taste:

**If a paper is one object across many surfaces, the context menu is how that object's
verbs travel with it.** The menu *is* the object model, made touchable. Same paper, same
right-click, same verbs — in the answer, in References, in the graph, in a collection.
That consistency is the feature.

Verb set (identical everywhere):

```
Note…                    ⌘⇧N     ← opens inline, one field
Tag…                     ⌘⇧T
─────────────────
Keep                     K
Maybe                    M               ← Rayyan's three-way; the undecided middle
Exclude…                 E               ← prompts for a reason, always reversible
─────────────────
Find more like this                      ← selection becomes retrieval input
Ask about this                           ← scoped question (already exists as "Ask")
Show why this is here    ⌥click          ← per-paper provenance (G1)
─────────────────
Add to collection…       ⌘S
Open in Citation Graph
Copy citation            ⌘⇧C
```

**Tradeoff — discoverability.** Right-click is invisible. Mitigations, all in the mocks:
a hover `⋯` on every card exposing the same menu; a selection action bar on multi-select;
keyboard shortcuts shown in the menu to teach them; and the three highest-value verbs
(Note / Keep / Exclude) also present as inline icons on hover.

**Multi-select.** Checkboxes already exist in References — extend with shift-click ranges,
`⌘A` within a view, and a floating action bar: `6 selected · Note · Keep · Exclude · Find
more like these · Ask within · Add to collection`. "Ask within" and "Find more like these"
are the two that turn curation into an input.

---

## Notes as the organizing surface

Three capture routes, ranked by cost to the user:

1. **Highlight-to-note** (hero) — select answer text, note binds to cited Sources + quote
2. **Right-click → Note** — on any card, anywhere
3. **Bulk note** — one note applied across a selection ("all cohort studies, none pre-2015")

Rules that keep it lightweight:

- One plain-text field. No rich text, no nesting, no separate note object in v1
- The note lives on the **Source**, so it appears in every view without being "filed"
- Notes are visible as a small marker on the card; expanded on hover/click
- A note is never required. Nothing blocks on it

**The exit (this answers "what's the next step after Consensus"):** notes + decisions +
provenance travel on export. Two targets — Zotero (notes become child notes, decisions
become colored tags) and a synthesis doc where each note is already cited. Borrowed from
NotebookLM's *Convert to source*: what you wrote re-enters the corpus with citations intact.

---

## Five key states to design

| # | State | Proves |
|---|---|---|
| 1 | Thread with the Source rail — a paper in-answer showing its provenance chip and recurrence | G1, the spine |
| 2 | Highlight → note, mid-answer | The hero interaction |
| 3 | Right-click context menu on a paper card | The verb set, the object model |
| 4 | Multi-select + action bar → *Ask within these* | Curation as retrieval input |
| 5 | The set → collection, notes and provenance intact + export | G4, the exit |

Stretch: (6) the same paper seen in the Citation Graph still carrying its note — the
cleanest single proof of cross-surface continuity (G3).

---

## Four directions (for the deck — show the evolution, not just the answer)

These are structurally different, not skins. Each answers a question the others can't.

### A · The Rail — *curation lives beside the thread*
Persistent right panel, an evolution of today's References. The thread's accumulated,
deduped Source set with decisions, notes, provenance, recurrence. Right-click acts on it
from anywhere.
- **Strength:** closest to current IA, clearly shippable, low engineering risk beyond the object model
- **Gives up:** spatial thinking; the set is a list, not a shape
- **Question it answers:** how does curation happen *without leaving the thread?*

### B · The Margin — *annotation is the primary act*
Notes live in the margin of the thread, anchored to the sentences and citations that
produced them. Google Docs comments meet Heptabase highlight cards. The Source set is
*derived* from what you annotated rather than browsed.
- **Strength:** the hero interaction is the whole product; lowest-friction capture
- **Gives up:** browsing and comparing a large set; weak when you have 40 papers and no opinions yet
- **Question it answers:** what if curation were a *byproduct of reading?*

### C · The Board — *papers become cards in space*
Sources become cards on a canvas you arrange. The thread feeds the board; the graph seeds
it. Heptabase proper, and the natural home for the node structure Consensus already has.
- **Strength:** most differentiated, best for synthesis and finding themes/gaps
- **Gives up:** a lot — highest build cost, and real risk of reading as a different product
- **Question it answers:** where does *understanding* live, as opposed to evidence?

### D · The Ledger — *defensibility first*
A triage lane. Keep / Maybe / Exclude with reasons, keyboard-driven, and the byproduct is
a methods trail and a PRISMA-shaped export. Rayyan's model inside Consensus.
- **Strength:** strongest on trust, transparency and reproducibility — three explicit
  evaluation criteria. Academically trusted, zero AI-slop feel
- **Gives up:** delight; feels like work, and assumes a systematic-review mindset not every
  grad student has
- **Question it answers:** how do you defend this set to your advisor?

### Recommendation

**A as the spine · B's hero interaction inside it · D's decision vocabulary.**
Show **C** as considered-and-deferred — it is the honest "where this goes next," and
naming why it lost is itself the prioritization argument.

---

## Tradeoffs to state plainly in the deck

| Risk | Response |
|---|---|
| Right-click is undiscoverable | Hover `⋯`, selection bar, keyboard hints in-menu, top-3 verbs as inline icons |
| Provenance chips add density | Progressive disclosure — one chip, expand for the trail |
| Decisions imply a workflow not everyone wants | Everything defaults to `undecided`; nothing is ever auto-excluded; exclusion always reversible and always visible as `⊘ 3 ▾` |
| Notes are a new write surface | One plain-text field, v1. No rich text, no nesting |
| Real cost is the object model, not the UI | Say so out loud. The UI is cheap once Sources have identity; the migration is the work |
| We can't ship recurrence without dedupe | Dedupe across queries is a prerequisite and should be named as one |

## Open questions to test

- Does recurrence across independent queries actually predict a paper a researcher keeps?
- Is "Maybe" used, or does it become a landfill?
- Do notes written mid-thread survive as useful a week later, or are they too shallow?
- Does *Ask within these* produce better answers, or just narrower ones?
- Would a grad student trust an AI-assembled set enough to cite from it without re-reading?
