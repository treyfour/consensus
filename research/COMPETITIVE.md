# Competitive sweep — against the four surviving gaps

Scoped deliberately: not "who competes with Consensus," but **which product has already
trained researchers on a gesture that solves one of our four gaps.** Borrowing a known
pattern beats inventing one.

Gaps carried forward from `AUDIT.md`:
**G1** per-paper provenance · **G2** in-thread annotation · **G3** cross-surface continuity · **G4** non-lossy Library handoff

---

## G1 — Per-paper provenance

| Product | Pattern | Transferable idea |
|---|---|---|
| **Elicit** | Every extracted table cell carries the **supporting quote** from the paper; sentence-level citations rather than paper-level | *The value carries its evidence.* A claim and its proof are one object |
| **Undermind** | Per-paper **match score out of 100** plus an explanation of why it matched. Also a "discovery curve" statistically estimating how many relevant papers exist on the topic | Per-paper rationale, and a **completeness estimate** — a defensibility artifact for "did I miss anything?" |
| **scite** | **Smart Citations**: each citation typed as *supporting / contrasting / mentioning*, with the surrounding sentence | *Typed* provenance. Not "this cites that" but "this cites that **and disagrees**" |
| **NotebookLM** | Click a citation number → jumps to the exact passage in the source | Verification in one click, no PDF hunt |

**Consensus today:** aggregate funnel is best-in-class (32.8M→100→20 with real queries).
Per-paper it already has "N supporting quotes" — closer to Elicit than expected. What's
missing is *origin*: rank, which query surfaced it, whether it recurred.

**Open space:** nobody surfaces **recurrence across independent searches** as a relevance
signal. A paper found by four unrelated queries is telling you something, and no product
in this set shows it.

---

## G2 — In-thread annotation

| Product | Pattern | Transferable idea |
|---|---|---|
| **Heptabase** | Highlighting a PDF creates a **Highlight Card** — a real object in the card library, not a string. A pinpoint button jumps back to the exact source location. Highlights can be dragged onto whiteboards beside any other card | **Capture creates an object; structure is deferred.** The cost of capturing is near zero and you organize later |
| **Rayyan** | **Include / Maybe / Exclude** on hotkeys (`i`/`m`/`e`). Excluding prompts for a **reason** (predefined list + custom), which is a distinct field from **labels** | **Decision + reason as a first-class field**, keyboard-driven. Academia already trusts this |
| **Zotero** | Child notes, standalone notes, **color-coded tags** commonly used as reading state, and "Related items" | Tags double as reading state; notes belong to the item and travel with it |

**Consensus today:** nothing. No note, tag, highlight, or decision anywhere.

**Note the "Maybe" state.** Rayyan's three-way decision is better than binary for this
user — a grad student's real problem is the undecided middle, and forcing include/exclude
is what makes people hoard instead of curate.

---

## G3 — Cross-surface continuity

| Product | Pattern | Transferable idea |
|---|---|---|
| **Heptabase** | *"Whiteboards do not own cards."* The same card can sit on many whiteboards at once; backlinks are bidirectional and block-level | **One object, many views.** The object owns its identity; a view is only an arrangement |
| **ResearchRabbit** | The **Collection** is the spine. *Similar Work / Earlier Work / Later Work* all operate **on the collection**, and the collection refines recommendations as it grows | **The curated set is the query.** Curation is an input to retrieval, not just an output |
| **NotebookLM** | The source panel persists across the entire notebook; every chat turn is grounded in the same set | The corpus is the container; chat is transient inside it |

**Consensus today:** context flows forward between surfaces (graph → thread attaches 20
papers, correctly) but nothing links back and nothing persists as a relationship.

**This is the strongest borrowable idea in the sweep** — see synthesis below.

---

## G4 — Non-lossy handoff

| Product | Pattern | Transferable idea |
|---|---|---|
| **NotebookLM** | **Save to Note** preserves formatting *and clickable inline citations*. Then **Convert to source** turns that note into material the AI reasons over | **The output of thinking becomes an input to the next round, with its citations intact.** The loop closes |
| **Rayyan** | Decisions and exclusion reasons flow automatically into a **PRISMA flow diagram**. Only *reasons* populate PRISMA — labels don't | **The audit trail is the deliverable.** Curation work becomes a methods section for free |
| **Zotero** | Notes, tags, related items sync with the item permanently | The benchmark Consensus is measured against — and imports from |

**Consensus today:** the paper survives; its relationship to your question does not. A saved
paper keeps authors, journal, SJR score, citation counts, DOI and abstract, but loses the
`Evidence (N)` tab it carries inside a thread, along with rank, recurrence and which query
surfaced it. Evidence is query-relative and the Library has no query. What remains is close
to what Zotero already stores, with a Zotero Import button beside it.

---

## Synthesis: where the whitespace actually is

Each competitor solves **one** gap well. None solve all four. More usefully, they split
cleanly by what they lack:

| Product | Discovery | Agentic synthesis | Persistent annotated corpus | Provenance |
|---|:--:|:--:|:--:|:--:|
| NotebookLM | ✗ *(you bring sources)* | ✓ | ✓ | ✓ |
| ResearchRabbit | ✓ | ✗ | ✓ | partial |
| Elicit | ✓ | partial | partial | ✓ |
| Rayyan | ✗ | ✗ | ✓ | ✓ *(audit)* |
| Heptabase | ✗ *(no literature)* | partial | ✓✓ | ✓ |
| **Consensus** | **✓✓** | **✓✓** | **✗** | **aggregate only** |

Consensus is the only product with discovery **and** agentic synthesis **and** a
peer-reviewed corpus **and** a library. It is uniquely positioned to close this loop —
and is the only one leaving it open.

### The single pattern worth stealing

Heptabase's **"whiteboards do not own cards."**

Translated: **messages do not own papers.**

A paper becomes one object with a persistent identity across every query, thread, graph,
and collection that touches it. Each surface is a *view*. The paper accumulates provenance
as it travels.

All four gaps collapse into that one change:

- **G1** — the object accumulates *surfaced by q2 · recurred in q3 · ranked #4 · you excluded it*
- **G2** — annotate the object once; the note follows it into every view
- **G3** — every surface is a view of the same objects, so nothing is ever "somewhere else"
- **G4** — saving to Library becomes a **view change, not a copy**, so there is nothing left to strip

### Two secondary patterns

- **NotebookLM's "Convert to source"** for the writing seam — the synthesis you wrote
  re-enters the corpus with citations intact
- **Rayyan's exclusion reason** for the curation seam — the mechanism that makes
  "less but better papers" psychologically safe, because the decision is reasoned and reversible

---

## Sources

- Heptabase: [Fundamental Elements](https://wiki.heptabase.com/fundamental-elements) · [Read PDFs, media, eBooks & webpages](https://wiki.heptabase.com/pdf-annotation) · [User Interface Logic](https://wiki.heptabase.com/user-interface-logic)
- Rayyan: [Labels and Exclusion Reasons](https://help.rayyan.ai/hc/en-us/articles/45706942438289-How-to-Use-Labels-and-Exclusion-Reasons-in-Rayyan) · [Keyboard Shortcuts](https://help.rayyan.ai/hc/en-us/articles/25199470983185-How-to-Use-Keyboard-Shortcuts-in-Rayyan) · [How to Screen References](https://help.rayyan.ai/hc/en-us/articles/45703234075281-How-to-Screen-References-in-Rayyan)
- NotebookLM: [Create & add notes](https://support.google.com/notebooklm/answer/16262519?hl=en) · [Use chat](https://support.google.com/notebooklm/answer/16179559?hl=en)
- Undermind: [undermind.ai](https://www.undermind.ai/) · [Katina Magazine review](https://katinamagazine.org/content/article/main-section/2024/undermind-ai-shows-the-power-of-successive-search) · [JCHLA product review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12352444/)
- ResearchRabbit: [Guides](https://learn.researchrabbit.ai/en/articles/12440130-welcome-to-the-new-researchrabbit) · [HKUST Library](https://library.hkust.edu.hk/sc/researchrabbit/) · [Choice 360](https://www.choice360.org/libtech-insight/streamlining-your-literature-review-workflow-with-researchrabbit/)
- Elicit: [elicit.com](https://elicit.com/industries/edu) · [AI for Academics review](https://aiforacademics.co.uk/elicit/)
- scite: [scite.ai](https://scite.ai/) · [QSS paper](https://direct.mit.edu/qss/article/2/3/882/102990/scite-A-smart-citation-index-that-displays-the)
- Zotero: [Notes documentation](https://www.zotero.org/support/notes)
