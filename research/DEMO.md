# The demo — what exists, and the flow to show

Written 2026-08-04 after all three exploration tracks closed. This is the assembly plan:
what every branch holds, which of it is live, and the single path through it.

Read `HANDOFF.md` for the claims ledger and `LOOP.md` for the object model. This file only
answers two questions: **what do we have**, and **what do we show**.

---

## 1. Everything that exists, by branch

### `main` — the working line

| File | What it is | Demo role |
|---|---|---|
| `option-24-app.html` | **The working prototype.** Live search, both panels toggling, hover peek, multi-source drag, the note, Ask-as-attachment, tags, filter, collections | **Spine, act 1–3** |
| `option-22-library.html` | **My Library.** Threads · Sources · Notes tabs, note summary rows, open-a-note, multi-select → composer → compare | **Spine, act 4–5** |
| `option-23-fullloop.html` | The same loop as a guided 8-step walkthrough | Backup if live driving goes wrong |
| `option-1` … `option-21` | Rounds 1–13. The container explorations, the capture-gesture explorations, the loop | Exploration shelf |

### `explore/relevance` (Track A) — **live, and the only track with a surviving recommendation**

| File | What it is | Demo role |
|---|---|---|
| `prototypes/redirect/redirect-1-ask-the-goal.html` | **The recommendation.** Hover a reference → `WHY THIS PAPER` + the passage that actually matched → a quiet `not what you needed?` that asks the goal and hands back an editable search | **Spine, act 2** |
| `prototypes/redirect/index.html` | Comparison page: seven rules, four directions, A marked chosen | Exploration |
| `prototypes/redirect/redirect-{2,3,4}` | The alternatives. B is the one to pair with A | Exploration |
| `prototypes/why/index.html` + `option-{1..5}` | Where "the explanation is a quote, not a sentence" came from — five sources for the line, priced by compute | Exploration — this is the *argument*, worth showing |
| `option-{25-carry, 26-gap}` | Round 17. Good work, wrong question. Y's finding — rank and use come apart at exactly the papers you would skip — is still true and unused | Shelf |
| `option-{27-why, 28-recourse}` | Round 18. Overbuilt: four-reason panel, contestable reasons | Shelf |

### `explore/thread-structure` (Track B) — **not used, ignore**

User's call, 2026-08-04: *"the threadstructure branch i didn't use the work there we can
ignore that."* The branch stays on the remote as a record and is **not merged**. Nothing
from it appears in the demo, including `option-25-spine`.

Its one recorded conclusion is still worth knowing, because it is the same conclusion Track
C reached by a different road: **sub-threads were rejected because the composer already
shows the scope**, so a rule drawn across the transcript announces what the input field
states more plainly and holds for longer.

### `explore/thread-split` (Track C) — closed, no survivors

| File | Status |
|---|---|
| `option-{25-branch, 26-seams, 27-merge, 28-sections}` | **Rejected.** Sections/branching |
| `option-{29..33}` + `fence-index.html` | **Rejected.** Five weights of a scope fence — solving a problem per-query References already solves |

**Findings that survive Track C even though the prototypes don't:**
- Seam detection does not work at this corpus size. Paper overlap scores 0.50–1.00 and the
  real seam scores *worse* than a false one; question-word overlap scores 0.00–0.09.
- A split silently rewrites recurrence denominators, and nobody asked it to.
- The recurrence-dot convention breaks past ~5 turns; the fraction has to carry the fact.

---

## 2. The flow to demo

Five acts. Each one is a thing today's product cannot do, in the order a researcher hits them.

| # | Act | Where | The point |
|---|---|---|---|
| 1 | **Ask, and get 20 papers back** | `option-24` | The funnel is real and good. Set the baseline: this part already works |
| 2 | **"Why is this one here?"** | Track A `redirect-1` | Hover → `WHY THIS PAPER` + the passage that matched. **And when it is wrong**, `not what you needed?` asks the goal and returns an editable search |
| 3 | **Keep what matters** | `option-24` | Select, drag the set into the note, write the thought. One note, nothing to file into |
| 4 | **Ask what you kept** | `option-24` | Ask attaches the note as scope; the answer arrives in the same thread, sources only. It surfaces a paper you had not kept — you add it. **This is the beat that pays** |
| 5 | **Come back to it, and across it** | `option-22` | Save to a collection. In My Library the note previews like a thread, opens on its own, and two notes can be multi-selected and asked across — the only way to put two threads in one question |

**The argument in one line, if you only get one:**
*Consensus remembers papers. It doesn't remember research. The note is where the reasoning
lives, and once it exists, everything else — asking a curated set, comparing two lines of
enquiry, getting back the "why" the Library drops — becomes cheap.*

**The strongest single moment** is act 4: the pile you built surfaces a paper you would
otherwise have missed, which then joins the pile. If that lands, the rest follows. If it
does not, the note is just a folder.

---

## 3. What has to be decided before assembly

### 3a. The filename collision — needs a call

All three tracks independently used `option-25` … `option-28`, and all three claimed
ROUND 17. With B dropped that is now **two** colliding sets, not three, but the problem is
unchanged. Git will merge cleanly because the suffixes differ, but afterwards there are
three different `option-25`s and `option-29` means two different things.

Track A's merge note gives three resolutions and recommends the cheapest: **leave filenames
alone, scope the round labels per track.** That is fine for the repo and wrong for a deck —
nobody should say "option-25" out loud tomorrow. Recommendation:
- Merge as-is, but **do not use option numbers in the demo.** Use act names.
- The assembled prototype gets one new name and no number.

### 3b. Nothing on Track A is pushed

`explore/relevance` is committed at `47a36ff` locally and **not pushed**. It needs pushing
before or during the merge.

### 3c. Merge order

Simpler now that B is out. **Merge C first, then A.** C brings no live prototypes — only
its research findings and a shelf — so it resolves trivially. A is heaviest
(`index.html` +167/−4) and is resolved once, last, against an already-merged file. Conflicts
are only `prototypes/index.html` and `research/HANDOFF.md`, and both are purely additive:
take both sides.

### 3d. What the assembled prototype must carry

One file, five acts, no walkthrough bar. It is `option-24` plus `option-22` plus Track A's
hover explanation and redirect, wired so the rail moves between them.

Known gap to close during assembly: **`option-22` uses a breadcrumb; Consensus uses a
persistent left sidebar tree** (`LOOP.md` R5a, verified by `screens/20`). Fix it in the
assembly, not after — it changes the page frame rather than the contents.

---

## 4. Caveats that must not reach a slide unqualified

From Track A, carried forward:

- **Five of six passage counts are invented.** Only Wienert's `27 supporting quotes` is real.
- **The paper → sub-query mapping is a judgement**, not something the trace gives us.
- **Direction B's threshold of three is arbitrary** and wants real usage data.

From the main line:

- Grad-student journey stages 0–7, and "nobody owns stage 7", remain **assumed / inferred**.
- Only the first query in every prototype is the captured one. Later turns are
  keyword-matched over the six captured papers and say so in their own funnel line.

And the one that makes the whole argument land, now verified and on the ledger:
**Consensus already computes why.** The agent trace holds three literal sub-queries with
pool sizes (`31.7M`, `656.6K`, `442.8K`) and the drawer holds `27 supporting quotes`. All of
it is produced to write the answer, and discarded before it reaches the paper. We are not
asking for new computation. We are asking to keep what is already there.
