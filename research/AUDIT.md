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
| G2 | **Annotation.** No notes, no tags, no highlights, anywhere — thread or library. | Library columns are Title/Type/Authors/Journal/Year only. Matches: *"a place to make notes as I'm searching, tags with notes"* |
| G3 | **Cross-surface memory.** Context flows forward between surfaces and is never remembered. | Graph → thread attaches 20 papers correctly, but the resulting thread is a top-level orphan in History with no link back to the graph, the node, or the parent thread |
| G4 | **Thread hygiene.** No sections, forks, renaming of messages, or removal of dead ends. | A failed search ("I searched but couldn't find papers matching this query") sits permanently in the Air Pollution thread; user simply re-ran the same query below it |
| G5 | **Lossy Library handoff.** Saving a paper drops everything the thread knew about it. | Thread knows: key takeaway, N supporting quotes, study type, funnel position, originating question. Library stores: Title, Type, Authors, Journal, Year — the same fields Zotero already has, with a Zotero Import button beside it |
| G6 | **Exclusion / curation.** No way to say "not this one" and have it stick or inform later retrieval. | Matches: *"give me less but better papers"* |
| G7 | **Reading state.** No unread/skimmed/read/cited tracking. | — |

---

## 3. The behavioural evidence (from real account usage)

Nine threads in History. Query counts: **2, 1, 2, 1, 1, 1, 1, 1, 1.**

- **Threads don't grow.** The brief's premise is that threads become unwieldy as they
  lengthen. The observed failure is the opposite: threads die at one or two queries.
- **Topics fragment across threads.** Gut-microbiome/Parkinson's research is spread over
  four separate threads: "Gut Microbiota Parkinsons Disease", "Gut Microbiome Parkinsons
  Disease", "Research Synthesis Diagram Creation", and "how come l morais doesn't directly
  connect?"
- **The orphan-question artifact.** The user viewed the Citation Graph, saw the
  disconnected node `L. Morais, 2020`, and asked why. That question became its own
  top-level thread titled *"how come l morais doesn't directly connect?"* — a title that
  is meaningless out of context and unreachable from the graph that prompted it.

This is the strongest single piece of evidence available: a real, unprompted user
action that the product's information architecture silently discards.

---

## 4. Reframe

The brief asks: *how should the thread evolve beyond a linear conversation?*

The evidence supports a sharper question:

> **Why does research restart every time the user changes surface?**

One line: **Consensus remembers papers. It does not remember research.**

Each surface — thread, references, graph, library — is individually well-designed and
individually amnesiac. The opportunity is a connective layer, not a new capability.
That also makes it a *prioritization* argument rather than a *feature* argument, which
is what the brief says it is grading.

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
