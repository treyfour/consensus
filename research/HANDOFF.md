# HANDOFF — read this first

Single re-entry point for this project. Written 2026-08-04, mid-session, ahead of any
context compaction. If you are a fresh context: read this file, then `PLAN.md`, then open
`prototypes/index.html`. Do not re-derive anything below.

---

## 1. Corrections that MUST survive compaction

Both of these were asserted confidently, repeatedly, and **wrongly** earlier in the session
before being corrected. The wrong versions are more numerous in the transcript than the
right ones, so they are the most likely thing for a summary to carry forward. If you find
yourself about to state either original claim, stop.

### ✗ RETRACTED — "threads die at one query"
An early audit read the test account's History as user behaviour (nine threads, query counts
2,1,2,1,1,1,1,1,1; one topic across four threads) and concluded threads die young and work
fragments sideways. **That account was exploratory usage** — new threads opened deliberately
to see what the product did. The counts are an artifact of testing. Never present this.
Never use it to contradict the brief's premise.

**Correct position:** take the brief at its word. Papers get buried as threads grow;
Consensus has the usage data and we do not.

### ✗ CORRECTED — "saving to My Library loses everything"
Inferred from the Library's *list columns* without opening a saved paper. Wrong.

**Verified:** a saved paper opens a full drawer with all authors, journal, Q1 SJR score,
citation and influential counts, DOI, INDEXED/FULL TEXT chips and the complete abstract.

**What actually disappears:** the `Evidence (N)` tab. In a thread the drawer reads
`Overview · Snapshot · Attachment · Evidence (27) · Metadata`; in the Library,
`Overview · Snapshot · Attachment · Metadata`. Plus rank, recurrence and originating query.

**Correct claim:** *the paper survives; its link to your question does not.* Evidence is
query-relative, and the Library has no query. Proof: `research/screens/15-library-paper-detail.png`.

---

## 2. The claims ledger

Two corrections came from the same root cause: inferring product behaviour from one screen
instead of clicking. Before any claim goes in the deck, it belongs in one of these rows.

| Claim | Status | Proof |
|---|---|---|
| Retrieval funnel is shipped and strong (32.8M → 100 → 20, real queries, pool sizes) | **Verified** | `screens/04` |
| References are per-query, with an "All cited papers" union | **Verified** | `screens/05`, `06`, `07` |
| The union carries no origin, rank or recurrence per paper | **Verified** | `screens/07` |
| Table view is an Elicit-style matrix, Pro-gated | **Verified** | `screens/06`, `08` |
| Composer attaches papers as scope (`Papers · 20 attached`) | **Verified** | `screens/14` |
| Citation Graph is a separate tool with seed-paper generation | **Verified** | `screens/11`, `12`, `13` |
| Asking from the graph creates a top-level orphan thread, no backlink | **Verified** | `screens/13`, `14` |
| No note/tag/highlight anywhere, thread or library | **Verified** | `screens/09`, `15` |
| Saved paper keeps metadata, loses the Evidence tab | **Verified** | `screens/15` vs `03` |
| Grad-student journey stages 0–7 | **ASSUMED** — label as such on the slide | — |
| Stage 7 "Defend", and P1 returning there | **ASSUMED** — load-bearing for the P1 return leg | — |
| "Nobody owns stage 7" | **Inferred from the sweep** — boldest claim on the page, expect challenge | `COMPETITIVE.md` |
| Zotero is the grad student's ground truth | **ASSUMED**, supported by the Zotero Import button | `screens/09` |

---

## 3. Where things stand

**Built and committed**
- Slice 0: Next.js 16 App Router, CDL tokens wired into Tailwind v4, `scripts/guard.mjs`
  failing the build on raw hex/rgb/font-family, all routes scaffolded, deployed
- **Live: https://consensus-kappa.vercel.app**
- Five prototypes + index: `prototypes/option-{1..5}-*.html`, `prototypes/index.html`
- Journey diagram: `prototypes/journey.html` (includes the brief's scope and scoring)
- Research: `AUDIT.md`, `COMPETITIVE.md`, `BUILD.md`, `PLAN.md`, this file
- Design tokens: `research/cdl-tokens.css` (145 `--cdl-*`, both themes, from the live DOM)
- 20+ screenshots in `research/screens/`

**Not built** — Slices 1–6 in `PLAN.md`: contract freeze, arc storyboard, four minis in
Next.js, five hi-fi states, the deck, polish.

---

## 4. Decisions, and the rejects

Rejects matter more than decisions here. A fresh context re-proposes them within minutes.

| Decision | Reason |
|---|---|
| Build **A (Rail) as spine + D's why-panel + B's capture gesture** | See §5 — this evolved after building, it is not the pre-prototype call |
| All four directions ship as **clickable mini-prototypes** | User's explicit choice; showing divergence is part of the pitch |
| Font: **Figtree** for CircularXXWeb (licensed); **Reddit Mono** is exact | Reddit Mono is on Google Fonts |
| Deck and prototype in **one Next.js app**, one deploy | User's choice |
| Deck (Slice 5) is **non-negotiable**; cut hi-fi states before cutting the argument | Brief grades thinking over polish |

| Rejected | Why — do not re-propose |
|---|---|
| "Add a working set / thread-level paper list" | **Already shipped** as References → All cited papers |
| "Add retrieval transparency" | **Already shipped**, and it is good (the funnel) |
| "Add an Elicit-style compare matrix" | **Already shipped** as Table view, Pro-gated |
| "Add source scoping to the composer" | **Already shipped** |
| "Add seed-paper relevance feedback" | **Already shipped** as the Citation Graph tool |
| **E · The Weave** as the built direction | Provenance-bearing chips are ~2× a plain citation chip; they wrap and break prose. Two refinement passes did not fix it. Structural, not polish |
| **C · The Board** as the built direction | It is a stage-5 synthesis tool and the pain is at stages 1–3. Kept as a stretch state for gap detection only |
| Redesigning the product / multiple workflows | Brief says depth over breadth, explicitly |
| Presenting the History screen as behavioural evidence | See §1 |

---

## 5. Findings that existed only in chat

From actually building the five prototypes. These changed the recommendation and are
recorded nowhere else.

- **The Weave's cost is structural.** Even at minimum weight a provenance-bearing citation
  chip wraps onto its own line and breaks reading rhythm. Its one keeper is the
  **end-of-answer roll-up** (`24 papers touched · ✓6 ~3 ⊘2 · 13 undecided`).
- **The Board produced the single best moment**: a dashed "Gap — population variance" group
  holding one paper, with a note reading *"One paper does not make a section. This is either
  the thesis gap or a search failure."* Nothing else makes an **absence** visible.
- **Recurrence dots only work in a column.** Reading `●●● 3 of 3 searches · #1` down a list
  supports comparison; the same dots isolated on a canvas card or inline chip do not.
- **The Ledger beat everything on "why is this here"** — a panel has room for four reasons
  where a chip has room for one. Expanded provenance wants a panel, **not** an inline chip.
  This reversed the earlier plan.
- **The Margin's anchoring is fragile** — needed collision avoidance, and once notes stack
  the anchoring metaphor quietly stops being true.

**Resulting recommendation (post-build, supersedes `BUILD.md` §Recommendation):**
A · Rail as spine · D's *why-panel* for expanded provenance · B's highlight-to-note as the
capture gesture, living in the Rail rather than a gutter · C's gap detection promoted from
"deferred" to a stretch state · E contributes the roll-up and is otherwise a documented dead end.

---

## 6. Session mechanics

- **Pro messages: 4/15 remaining** on the Consensus account. Do **not** spend them on new
  searches. The audit deliberately used existing threads.
- The Playwright browser profile is **logged into consensus.app** and persists.
- Prototypes are served locally: `cd prototypes && python3 -m http.server 4599`.
  If the port is dead, restart it; nothing depends on it staying up.
- Screenshots land wherever Playwright's `filename` points, relative to cwd. Check the path.
- `.playwright-mcp/` is gitignored scratch.
- Commit messages in this repo carry the reasoning; `git log` is a real source of context.

---

## 7. What compaction may safely drop

Being explicit so nothing is treated as precious: the browser-navigation play-by-play,
tool-call mechanics, the CSS debugging (grid `min-height:0`, dot letter-spacing), the
design-hook exchanges, and every intermediate screenshot reading. All conclusions from
those are already written down above or in the other research files.
