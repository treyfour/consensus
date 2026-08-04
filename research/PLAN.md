# Plan — presentation + prototype

Decisions locked:
- **Build hi-fi:** A (The Rail) as spine · B's highlight-to-note as hero · D's Keep/Maybe/Exclude vocabulary
- **All four directions ship as clickable mini-prototypes**
- **Deck must argue the problem** — define it, evidence it, show pain points and process, *then* solve

---

## Deck spine

The brief's suggested structure, expanded where the evaluation criteria demand it.

### 1 · Framing
What the brief asked. What I went looking for. One line on what I found instead.

### 2 · Process
*Explicit evaluation criterion: "how effectively you use modern AI tools in your design process."*
Most submissions will assume the product. This shows the receipts:
clarifying questions → **live product audit driven by browser automation** → **design tokens
extracted from the running DOM** → competitive sweep against named gaps → convergence →
divergent prototypes → one built deep.

### 3 · The problem, defined

**3a · What Consensus already does well.** The assumption-kill table — glass-box funnel,
all-cited-papers, extraction matrix, composer source attach, Citation Graph, collections,
chat-with-collection. Establishes that the obvious answers are already shipped, and buys
credibility for everything after it.

**3b · Where the surfaces stop talking.** Structural findings, readable off the interface —
*not* behavioural claims (see the retraction in `AUDIT.md` §3; the account audited was
exploratory usage, so its thread lengths prove nothing about real researchers):
- References are **per-query**, with an "All cited papers" union that carries no origin,
  rank, or recurrence for any paper in it
- Asking from the **Citation Graph** creates a top-level thread in History with no link back
  to the graph, the node, or the originating thread — context flows forward, never recorded
- **Saving to My Library** drops key takeaway, supporting quotes, study type, funnel position
  and originating question, leaving exactly the fields Zotero already holds

Take the brief's premise at face value: papers get buried as threads grow. These are the
mechanisms by which burial happens.

**3c · Four pain points**, each tied to a quote from the supplied feedback sample:

| | Pain | User's words |
|---|---|---|
| P1 | **I can't tell why this paper is here.** Aggregate provenance exists; per-paper doesn't | *"Have an explanation why certain 'most relevant' papers are picked over others. Because now it's impossible to tell"* |
| P2 | **I have nowhere to put a thought.** No note, tag, or highlight anywhere | *"Have a place to make notes as I'm searching, tags with notes so I can remember to check something later"* |
| P3 | **Every question starts over.** No continuity between queries or surfaces | *"try to use the same or similar papers in the follow up questions. It would be great to have flow in the references"* |
| P4 | **Saving loses everything.** The Library keeps only what Zotero already had | *"saving time between finding papers and actually writing… so I can move faster from search to manuscript"* |

Supporting evidence for the curation half: *"give me less but better papers"* — there is
currently no mechanism to say "not this one."

**3d · The reframe.** The brief asks how the thread should evolve past linear. The product's
structure asks a sharper question: **why does research restart every time the user changes
surface?** → *Consensus remembers papers. It doesn't remember research.*

This holds whichever way thread length goes — a long thread needs provenance and recurrence
so papers stop being buried, a short one needs continuity so the next question inherits the
last one's work — so the concept does not depend on any claim about how long threads run.

### 4 · Who this is for
Grad student journey, stages 0–7, with the seam marked at 3→4. Where Consensus is strong,
where it hands off, what it hands off to. Motives that drive the design: **defensibility**
(the advisor will ask what you missed), **ownership** (an AI summary isn't citable),
**reproducibility**, **Zotero is ground truth**. All labelled as assumptions.

### 5 · Landscape
Four gaps × competitors. The whitespace table. The borrowed pattern language:
Heptabase *views don't own objects* · Rayyan *decision + reason* · NotebookLM *convert to
source* · ResearchRabbit *the curated set is the query* · Elicit *the value carries its evidence*.

### 6 · Directions — four clickable prototypes
Each shown with **the question it answers**, its strength, and what it gives up.
A · The Rail — *how does curation happen without leaving the thread?*
B · The Margin — *what if curation were a byproduct of reading?*
C · The Board — *where does understanding live, as opposed to evidence?*
D · The Ledger — *how do you defend this set to your advisor?*

### 7 · The concept
One paragraph. Object-model diagram. Why one change collapses all four gaps.

### 8 · Key states — the built experience
Five hi-fi states, walked through.

### 9 · Tradeoffs, open questions, what I'd test next

### 10 · What I cut and why
Prioritization is a graded criterion. Name the things deliberately not built.

---

## Prototype inventory

### Mini — clickable, one screen each, low-mid fidelity
| Route | Direction |
|---|---|
| `/directions/rail` | A · The Rail |
| `/directions/margin` | B · The Margin |
| `/directions/board` | C · The Board |
| `/directions/ledger` | D · The Ledger |

### Deep — high fidelity, the composite
| # | Route / state | Proves |
|---|---|---|
| 1 | Thread + Sources rail, provenance chip + recurrence | P1 |
| 2 | Highlight → note (hero) | P2 |
| 3 | Right-click context menu on a paper card | the object model, made touchable |
| 4 | Multi-select + action bar → *Ask within these* | curation as retrieval input |
| 5 | Set → collection, notes + provenance intact, export | P4 |
| 6 *(stretch)* | Same paper in the Citation Graph, still carrying its note | P3 |

---

## Content rule: use the captured reality

Everything is mocked with **real material from the audit** — the CRISPR off-target thread,
the real funnel (`32.8M → 100 → 20`), real paper titles and authors (Wienert 2022, Kalter
2025, Cancellieri 2022, Höijer 2021), the real gut-microbiome/Parkinson's cluster, and the
real L. Morais orphan. Costs nothing extra and makes every frame instantly credible.

---

## Build sequence

| Slice | Work | Gate |
|---|---|---|
| **0** | Next.js routes scaffolded · `cdl-tokens.css` wired · token guard · font fallback decided · **deploy hello-world, get the real URL** | A live URL exists before any feature |
| **1** | `types.ts` + `mocks.ts` — the Source object with provenance, decision, notes; seeded from real captured data | Contract frozen; nothing below it changes the UI |
| **2** | **Arc storyboard** — every deck section and every prototype screen stubbed and clickable, ugly | The whole story walks end to end before any polish |
| **3** | Four mini-prototypes | Divergence is real, not claimed |
| **4** | Five hi-fi states | The deliverable |
| **5** | Deck sections 1–10 | The graded artifact |
| **6** | Polish · rehearse the walkthrough three times on the real build | — |

**Order rationale, from the retro:** deploy and the design scaffold are Slice 0, never a
final step. The arc is storyboarded before fidelity — the failure mode last time was deep
texture on a narrative that hadn't been drawn. Slice 5 is not optional; a beautiful
prototype with a weak argument loses to a clear argument with three solid states.

---

## Open build decisions

- **Font.** CircularXXWeb is licensed. Closest free substitutes: **Figtree** (nearest in
  character), **Inter** (safest, most neutral). Pick one, note it as an assumption on a slide.
- **Deck and prototype in one Next.js app**, one deploy, one design system — deck routes
  link straight into live prototype states.

## Clock

The brief budgets 3–4 hours and states plainly that polished UI is not expected; product
thinking and prioritization are. This plan exceeds that budget — deliberately, since a
working prototype is a genuine differentiator against the "modern AI tools" criterion.
The protection is ordering: **the argument (Slice 5) must survive even if polish is cut.**
If time compresses, cut hi-fi states 4→3 and the stretch state, never the deck.
