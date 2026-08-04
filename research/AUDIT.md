# Consensus product audit — live product, 2026-08-04

Method: browser-driven walkthrough of the logged-in product (Playwright), using the
account's own existing threads rather than new searches (4/15 Pro messages remained).
Screenshots in `research/screens/`. Design tokens in `research/cdl-tokens.css`.

---

## 1. What already exists (assumptions killed)

Going in, I had a list of concepts I believed were absent. Most are shipped.

| Concept | Status | Where |
|---|---|---|
| Retrieval transparency / glass box | **Shipped, strong** | Per-message trace: `32.8M Retrieved → 100 Eligible → 20 Included`, the literal queries run with pool sizes, `Read Abstracts and PDFs 20`, `Select visuals 1` |
| Thread-level paper union | **Shipped** | References panel → `All cited papers` |
| Extraction matrix (Elicit-style) | **Shipped, Pro-gated** | References → Table view. Columns: Paper / Answer / Population. "Upgrade to extract data from up to 20 papers" |
| Source scoping in composer | **Shipped** | Attach papers to a message; `Papers · 20 attached` chip |
| Seed-paper relevance feedback | **Shipped, BETA** | Citation Graph tool — seed papers → generate graph, time-axis layout, clusters, density control |
| Library + collections | **Shipped** | My Library, collections, sub-collections, Share, `Add`, Zotero Import, Upload |
| Chat with a collection | **Shipped** | Library composer: `My Library · 4 items, 4 searchable` → "Ask these papers…" |
| Threads saved to Library | **Shipped** | `Items (4)` / `Threads (2)` tabs |
| Generated inline figures | **Shipped** | Timeline of cohort studies; hazard-ratio comparison table; evidence-coverage heatmap with a `GAP` cell |
| Typed follow-up suggestions | **Shipped** | `GET A LIT REVIEW`, `CONSENSUS METER` chips + TAB-to-accept ghost text |
| Study-quality signals | **Shipped** | Q1 SJR score, citation counts, `RCT`, `LITERATURE REVIEW`, `RIGOROUS JOURNAL`, `OPEN ACCESS` badges, N supporting quotes |

**Implication: Consensus is not missing capability.** Any proposal framed as
"add a working set" or "add transparency" or "add a compare table" is describing
the product that already exists.

---

## 2. What is genuinely absent

| # | Gap | Evidence |
|---|---|---|
| G1 | **Per-paper provenance.** Aggregate funnel is excellent; nothing on a paper says *which query surfaced it, its rank, whether it recurred across searches, or why it beat the ones that lost*. | `All cited papers` is a flat list. No origin, no recurrence, no rank. Directly matches the user quote: *"explanation why certain 'most relevant' papers are picked over others… impossible to tell"* |
| G2 | **Annotation.** No notes, no tags, no highlights, anywhere — thread or library. | The library list shows Title/Type/Authors/Journal/Year, and the paper drawer offers Overview, Snapshot, Attachment and Metadata. No note or tag field on either. Matches: *"a place to make notes as I'm searching, tags with notes"* |
| G3 | **Cross-surface memory.** Context flows forward between surfaces and is never remembered. | Graph → thread attaches 20 papers correctly, but the resulting thread is a top-level orphan in History with no link back to the graph, the node, or the parent thread |
| G4 | **Thread hygiene.** No sections, forks, renaming of messages, or removal of dead ends. | A failed search ("I searched but couldn't find papers matching this query") sits permanently in the Air Pollution thread; user simply re-ran the same query below it |
| G5 | **The saved paper loses its question.** Bibliographic and quality metadata survive; the thread-derived context does not. | VERIFIED: a saved paper opens a full drawer with authors, journal, SJR score, citation counts, DOI and abstract. What is missing is the **Evidence (N) tab** the same paper shows inside a thread, plus rank, recurrence and which query surfaced it. Evidence is query-relative and the Library has no query |
| G6 | **Exclusion / curation.** No way to say "not this one" and have it stick or inform later retrieval. | Matches: *"give me less but better papers"* |
| G7 | **Reading state.** No unread/skimmed/read/cited tracking. | — |

---

## 3. RETRACTED — the "threads die young" claim

**Do not use this in the presentation.** An earlier version of this audit read the
account's History as user behaviour: nine threads with query counts 2, 1, 2, 1, 1, 1, 1,
1, 1, plus one topic spread across four threads, and concluded that threads die at one
query and work fragments sideways.

That account was **exploratory usage** — deliberately opening new threads to see what the
product did — not research. The counts are an artifact of testing. The conclusion does not
follow, and the contrarian reading of the brief's premise that rested on it is withdrawn.

What this costs: the most striking-looking slide in the deck. What it does not cost: the
argument. Nothing in §1, §2, or §4 depended on it — those are product facts, readable off
the interface regardless of who is driving.

**Take the brief's premise at face value instead.** Consensus says valuable papers get
buried as a thread grows, and they have the usage data. The gaps in §2 are the mechanisms
by which burial happens: a paper with no origin, no note, no memory between questions, and
no trace of the question that surfaced it once it is saved.

**One structural observation does survive**, because it is a property of the product rather
than of anyone's behaviour: asking a question from the Citation Graph creates a *top-level
thread in History* with no link back to the graph, the node, or the originating thread.
Context flows forward and is never recorded. Cite it as an architecture finding, not as
evidence of user pain.

---

## 4. Reframe

The brief asks: *how should the thread evolve beyond a linear conversation?*

The product's structure supports a sharper question:

> **Why does research restart every time the user changes surface?**

One line: **Consensus remembers papers. It does not remember research.**

Each surface — thread, references, graph, library — is individually well-designed and
individually amnesiac. The opportunity is a connective layer, not a new capability.
That also makes it a *prioritization* argument rather than a *feature* argument, which
is what the brief says it is grading.

Note this holds whichever way thread length goes: a long thread needs provenance and
recurrence to stop papers being buried, and a short one needs continuity so the next
question inherits the last one's work. The object model serves both, so the concept does
not rest on the retracted claim.

---

## 5. Design system (hard gate: RESOLVED)

Extracted 145 `--cdl-*` custom properties from the live DOM, both themes.
`CDL` matches the name of the provided Figma design-system file.

- Structural tokens (theme-invariant): 78 · themed: 67 per theme
- Type: `CircularXXWeb` (sans), `Reddit Mono` (mono). Weights 400/500/700
- Scale: text 0.69 → 1.13rem; heading 1.13 → 1.75rem
- Radius: 0.25 / 0.5 / 0.75 / 1rem / circle
- Spacing: 0.13 → 2.5rem, named xxx-sm → xxx-lg
- Accent `#068ef1`; light `bg-base #fff`, `fg-base #18181b`, `border-base #e4e4e7`
- Semantic naming throughout (`bg-base`, `fg-muted`, `accent-bg-emphasis`), plus
  dedicated `chart-*` and `graph-*` ramps
- Stack: Next.js, Tailwind v4, CSS-module components (`Button_root__`, `Button_tertiary__`)

**Caveat:** CircularXXWeb is a licensed typeface. The prototype needs a
metric-compatible substitute; note it as an assumption.

Output: `research/cdl-tokens.css`
