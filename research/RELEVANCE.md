# Relevance — what References can say per source

Track A, rounds 17–18. Written 2026-08-04. Read `HANDOFF.md` first; this assumes its
claims ledger and its rejects list.

| | File | Question | Round |
|---|---|---|---|
| **AB** | `prototypes/option-28-recourse.html` | Why is this source here, and what do I do when it's wrong? | 18 |
| **AA** | `prototypes/option-27-why.html` | Why is this source here, at a glance? | 18 |
| **Z** | `prototypes/option-26-gap.html` | What is missing, and how do you tell a gap from a search failure? | 17 |
| **Y** | `prototypes/option-25-carry.html` | Which sources carry the answer, and which are background? | 17 |

**Round 18 is the one to read.** Y and Z answered `BRIEF.md` directions 1 and 4 and are
kept for the record, but the question that actually matters came back from review: not
*which of these matter most*, but **why was I handed this one at all, and what can I do
when the answer is wrong.** Sections 5 and 6 are that work; sections 1–4 are the earlier
round.

Both run on the six papers captured from the real CRISPR thread, with the real funnel
(32.8M → 100 → 20) and the real ranks (#1, #2, #3, #4, #9, #12). Both are drivable: search
again and every number recomputes.

---

## 0. A shipped thing that direction 4 has to be honest about

**Consensus already prints the word GAP.** `screens/03` and `screens/05` show a generated
figure inside the CRISPR answer titled **“Evidence Coverage Across Key Open Questions”**: a
heat-map matrix whose rows are open questions (*Off-target indels*, *Large-scale
aberrations*), whose columns are dimensions (*In Vivo Detection*, *Human Genetic
Variation*), whose cells are counts — `8`, `4`, `2` — and whose fourth cell reads **`GAP`**.

This is not in `HANDOFF.md` §4 and it should have been. Anyone proposing gap detection
without naming it is proposing something already shipped.

What the matrix does **not** do, and what Z is therefore for:

- It names **no papers**. The `2` in a cell cannot be opened, and the `GAP` cell cannot be
  acted on. It is a picture of a fact, next to a References panel that holds the fact.
- It is **per message**. It describes the moment the answer was written and does not
  update when you search again, so a gap you have since filled keeps reading as a gap.
- It cannot distinguish **“no paper exists”** from **“no paper was retrieved”** from
  **“a paper was retrieved and the answer did not cite it”**. Those are three different
  problems with three different next actions, and the matrix renders all three as one
  pale cell.

Z's claim is narrow: the same fact, moved into References where the papers are, kept live
across searches, and made falsifiable.

---

## 1. Y · What carries the answer

### The mechanism

A **claim** is one sentence of the answer plus the papers cited in it. That is the whole
data structure. Three counts fall out of it, and the pane says nothing that is not one of
them:

- how many claims cite a paper,
- how many of those claims cite **nothing else**,
- how many of your searches returned it.

References then splits into **Carries the answer** (a paper that is the sole support of at
least one claim), **Corroborates** (cited, never alone), and **Retrieved, not cited**.
Clicking a paper dims the answer to the claims it holds, and strikes through the ones that
would lose all support: *↑ nothing else in these references supports this*.

### The finding, and it is the whole point

The brief asks what the signal is — citation density, recurrence, rank, or something else.
On real data, with real ranks:

| Paper | Rank | Doing what |
|---|---|---|
| Wienert 2022 | **#1** | corroborates one claim, alongside Kalter |
| Höijer 2021 | #2 | **sole support** — large structural variants |
| Kalter 2025 | **#3** | corroborates two claims |
| Cancellieri 2022 | #4 | **sole support** — human genetic variation |
| Angelini Stewart 2025 | #9 | **sole support** — clinical monitoring |
| Huang 2022 | #12 | **sole support** — in vivo delivery |

**The two top-ranked papers are the two the answer could lose without losing a claim.** The
four it cannot do without rank #2, #4, #9 and #12 — two of them below the fold in a
twenty-item list. Rank measures how well a paper matched the *query*. Sole support measures
how much the *answer* depends on it. They are different questions, and they come apart at
exactly the papers a researcher would otherwise skip.

The sort control (`use · rank · recurrence`) exists to make that disagreement visible.
**It would not ship.** It is the experiment, not the product; what ships is the default.

### What failed

- **“Mark the three that carry it.”** The brief's phrasing, and it is the wrong shape. Sole
  support produces four here, and would produce two on a different answer. A design that
  always returns three has stopped counting and started decorating. Y refuses to promise a
  number.
- **Citation density as the headline signal.** Counting citations per paper was the first
  thing tried and it is nearly flat on this answer — every paper is cited once or twice.
  Density only separates the top of a long, dense answer like the air-pollution thread in
  `screens/08`, where one study is cited five times. Sole-support is the signal that works
  at both lengths, because it asks a structural question rather than a frequency one.
- **Recurrence as a relevance signal.** It is a fact about your session, not about the
  answer, and on one search it says nothing at all. Round 16 was right to compute it live
  and right not to let it rank anything. Y keeps it as a third line, never as the sort.

### The cost, written down

1. **It requires the answer to be decomposable into claims.** Consensus generates the answer
   and knows which paper backs which sentence, so this is available — but it is machinery
   the References panel does not currently have, and a poorly-segmented answer produces
   nonsense tiers.
2. **Sole support is fragile in the honest direction.** Cite one extra paper in a sentence
   and a load-bearing paper silently demotes. That is arguably correct, and it is also a
   number that moves for reasons the researcher did not cause.
3. **“Retrieved, not cited” is a count, not a list.** The funnel read 20 papers; 6 are
   cited. The other 14 were never captured, and inventing fourteen titles is the one thing
   these prototypes will not do. The count is shown; the expansion is a stub that says so.

---

## 2. Z · What isn't there

### The mechanism

References is regrouped by the **open question each paper answers** rather than by rank.
Every group carries two numbers that are not the same number:

- **cited** — papers the answer actually leant on for this question,
- **nearby** — papers already in your references that speak to this question and were
  never cited for it.

Which gives four states, and they are four different problems:

| State | Reads | What you do |
|---|---|---|
| `ok` | Held up by 3 papers | nothing |
| `under` | One paper carries this; **2 others** in your references speak to it and were never cited | read those two |
| `thin` | One paper, and nothing else in your references touches it | **search it** |
| `gap` | Searched *n* times. Still one paper | it is the gap, or it is outside the index |

`thin` carries The Board's line, which is still the best sentence any of these prototypes
has produced: *“One paper does not make a section. This is either the thesis gap or a search
failure.”* Z's addition is the second half — **and searching is how you tell.** Press
`↻ search this` and the group runs a real query for that question.

### The finding

Absence is not an observation, it is a **count of failed attempts**. A group that has been
searched twice and still holds one paper is a categorically stronger statement than a group
nobody has probed, and today nothing anywhere records that you looked. That is what turns
The Board's gap from a nice-looking dashed box into something a thesis chapter can rest on.

All three outcomes are reachable on the real six-paper corpus, which was the thing this was
expected to fail at:

- **Large structural variants** → probe it, and it fills **from a paper you already had**:
  Wienert was in the references, speaks to structural variants, and the answer never cited
  it there. *That is an under-citation, not a gap.*
- **Clinical monitoring** → the same, via Kalter.
- **Human genetic variation** → probe it twice and the group hardens: *“4 papers came back.
  **None of them speaks to human genetic variation.** Searched 2 times now.”* Which
  independently reproduces the `GAP` cell the real product printed for the human-genetic-
  variation column, from different data.

### What failed

- **Letting the search results define the answer's sections.** The first build wrote a
  section for every open question its returned papers happened to touch. Searching one gap
  then quietly filled the other four, and the roll-up jumped from *1 well-supported* to
  *4 well-supported* on the strength of a query about something else. This is the same class
  of error as `LOOP.md` R5d — a number that flatters itself is worse than no number. Fixed
  by deriving sections from the **query**, not from the result set.
- **Measuring “did the gap fill?” as the size of the relevant set.** It does not move when
  an already-present paper gets cited, so a group visibly filling reported itself as a
  confirmed gap. The measure is **support**, and whether the new support was newly
  retrieved is the second question, not the first.
- **Colouring every thin group.** Four of five groups on the paper background made the one
  real gap invisible. `under` is now a plain card; only *thin* and *gap* are tinted, and only
  *gap* is dashed.

### The cost, written down

1. **The grouping is a judgement.** Which open question a paper speaks to was read off its
   abstract by hand. In the product a model does it, and a wrong assignment produces a
   confident false gap — the most expensive error this design can make.
2. **A paper appears in several groups.** Wienert answers three of the five questions, so
   the group counts do not sum to the reference count. Rank ordering has the opposite
   property, and it is why the `group by rank (today)` toggle stays in the pane.
3. **`gap` is a claim about Consensus's index, not about the literature**, and the copy has
   to keep saying so. *“This is the thesis gap, or it is outside what Consensus indexes.”*
4. **Nothing here is stance.** Four papers on one question may agree or contradict; the
   group counts them the same. That is direction 2's job, and the roll-up is where it would
   join: coverage and stance are the two things an end-of-answer summary can carry.

---

## 3. What the two share

Both replace a **score** with a **relationship**. Rank, recurrence and citation counts are
all properties of a paper. *Sole support of this claim* and *the only paper answering this
question* are properties of a paper **in relation to the answer in front of you** — which is
the thing the researcher is actually deciding about, and the thing that changes what they
open next.

The end-of-answer roll-up in Z is the direction-2 keeper (`✓6 ~3 ⊘2 · 13 undecided`) with
coverage in place of stance:

> **5 open questions** across this thread · 1 with more than one paper · 3 leaning on one
> paper your references could shore up · 1 held up by a single paper and nothing else ·
> 14 of the 20 papers read for the last query are cited nowhere above

If only one line of this round survives, it should be that one. It is four counts, all of
them true, and it says more about a twenty-paper result set than the list does.

---

## 5. AA · Why this one

### The fact this rests on

Consensus **already computes why**. It is in the agent trace, one level up, aggregated
across the whole result set and attached to no paper in particular. Verified in
`screens/04`:

| In the trace today | What it would say on a paper |
|---|---|
| three literal sub-queries with pool sizes: `CRISPR off-target effects in vivo therapies · 31.7M`, `CRISPR off-target editing, genome-wide off-target profiling · 656.6K`, `CRISPR nuclease specificity, delivery, immunogenicity · 442.8K` | **which one found this paper** |
| `Read Abstracts and PDFs · 20` | it was read, not just matched on a title |
| `28 SUPPORTING QUOTES` on a reference, `Evidence (27)` in the drawer | **how much of it was used** |
| the citation chips in the answer | **which sentence it holds up** |

So this is not new machinery. It is four numbers Consensus produced in order to write the
answer, thrown away at the last step. Nothing here needs a relevance score, and the
prototype deliberately never shows one: *“it matched your third search, for nuclease
specificity and delivery”* is a reason a person can act on, and `0.87` is not.

### The shape

**One line at rest, a panel behind it.** The line leads with what the paper did for you,
because that is the thing a researcher decides on:

> `why  backs clinical monitoring · 11 passages · search 2                    why ›`

and where a paper was read but never cited, it says so plainly — *`read, not cited in the
answer · 23 passages · search 2`* — which is a useful thing to learn at a glance and is
never said today.

The panel holds the four reasons: **found by** (the literal sub-query and its pool),
**backs** (the sentence in the answer), **matched** (the passage, with the count), and
**standing** (rank, recurrence, study type). Hovering a reference also lights the search
that found it, up in the trace, and the sentence it backs, down in the answer, so the
explanation is *pointed at* rather than only described.

This split follows a finding this project already made and should not re-litigate
(`HANDOFF.md` §5): *expanded provenance wants a panel, not an inline chip — a panel has
room for four reasons where a chip has room for one.*

The three densities (`as a line · on hover · both`) are switchable in the prototype so the
choice is arguable rather than asserted. Each carries its own cost in the pane:

- **line only** — one line holds one reason; the other three become unreachable.
- **hover only** — nothing at a glance, nothing on touch, and twenty papers is twenty hovers.
- **both** (default) — the glance and the follow-up, at the cost of a line on every card in
  a list that is already dense.

---

## 6. AB · What if it's wrong

This is the half that matters, and it is one idea:

> **You reject the reason, not the paper — and the reason is made of the search terms, so
> rejecting it rewrites the search for you.**

The problem with "mark as irrelevant" is not that users won't press it. It is that
pressing it teaches nobody anything and fixes nothing: the system learns *this result was
bad* without learning *which part was bad*, and the user is left facing an empty composer,
having to phrase in natural language a correction they may not be able to articulate.

Every reason in the why-panel carries a `✕ not this`. Press it on **found by** and the
sub-query breaks into its own terms as chips:

> **Which part of that search is off?**
> `CRISPR nuclease specificity` · **`delivery`** · `immunogenicity` · `something else…`

Point at `delivery`, and the consequence appears **before** you commit:

> search 3 becomes **“CRISPR nuclease specificity, immunogenicity”**
> 1 of 6 references leave: Huang 2022
> 1 claim is withdrawn: “In vivo delivery”

`Reshape the search`. The trace's third sub-query is visibly rewritten, the reference is
struck out with an undo, the claim it alone supported is struck through and marked
*withdrawn — every paper supporting this has been removed*, and a line lands in the thread
saying exactly what happened. **The user typed nothing.**

### Two kinds of wrong, kept apart

They teach different things, so they are different acts:

| The user means | Where they press it | What happens | What it teaches |
|---|---|---|---|
| Wrong paper, wrong search | `✕` on **found by** | search rewritten, paper removed | retrieval: this term pulled the wrong thing |
| Right paper, wrong claim | `✕` on **backs** | paper stays in references, withdrawn from the claim | citation: the paper was fine, the reasoning was not |
| Right, and here's why | `✓ that's right` in the header | nothing changes | confirmation, with the reason attached |
| Something else | free text, offered last | **nothing changes** | needs a human to read it |

Collapsing these into one thumbs-down is what makes feedback data useless. A paper marked
"irrelevant" when the real fault was a mis-citation is a false signal that will degrade
retrieval.

### On reinforcement, and the honest position on it

The prototype records positives, but it argues you should not build a rating widget for
them:

> **Keeping or citing a paper is already a confirmation, so the positive signal costs the
> user nothing. Only the correction needs a control.**

Every add-to-note, every citation carried into a draft, every paper filed into a
collection is an unprompted positive. `✓ that's right` exists for the case where the
*reason* is worth confirming even though the paper was not kept, and it records the reason
rather than the vote — which is the difference between learning *users liked this result*
and learning *matching on “clinical monitoring” was the right call here*.

### The receipt

What the company records sits at the bottom of the pane, in the exact words it would be
recorded in, expandable:

> **What Consensus learns from this thread** · 1 confirmation · 1 correction
> `✕ (What are the open questions in CRI… , Huang 2022) — off topic: the term “delivery” in search 3`
> `✓ (What are the open questions in CRI… , Höijer 2021) — reason confirmed: backs large structural variants`

Showing the tuple is a deliberate choice. Feedback UI that collects silently is the thing
researchers distrust; a legible log is cheap, and it is the difference between a control
and a black box.

### The costs, written down

1. **It can only offer terms the search already contains.** If the real objection is
   something the query never mentioned, the chips cannot express it and the user still
   lands in the free-text box. The prototype's answer is to make free text visibly the
   fallback and to say out loud that it changes nothing until a person reads it. That is
   honest, and it is also a limit.
2. **Removing a paper from a thread is not the same as teaching a retrieval model**, and
   the copy must never imply the next search will be better. What is claimed is narrow:
   this thread changes now, and the correction is recorded.
3. **The user can amputate their own answer.** Dropping a term withdraws claims. The
   consequence preview and a one-click undo are what make that safe, and both are
   load-bearing rather than polish.
4. **One correction, one reason.** A paper that is wrong for two reasons takes two passes.
   Multi-select was tried on paper and made the consequence preview unreadable.
5. **The mapping from paper to sub-query is a judgement here.** In the product the agent
   knows it exactly; in this prototype it was read off the query text. A wrong mapping
   sends the user to argue with the wrong search.

### What was rejected on the way

- **A thumbs up/down pair on every card.** Rating fatigue, and it collects a verdict
  without a reason, which is the least useful thing to collect.
- **"Not relevant" that just hides the paper.** The user gets a tidier list and Consensus
  gets nothing; the next search repeats the mistake.
- **Opening a fresh thread with a rewritten query.** That is the orphan-thread problem in
  `HANDOFF.md` §2 all over again. The correction belongs in the thread it corrects.
- **Asking the user to describe what they actually wanted.** This was the starting sketch,
  and it is exactly the thing the review flagged as hard for users. It survives only as
  the last resort.

### The overlap that has to be named

`HANDOFF.md` §4 rejects *"add seed-paper relevance feedback"* as already shipped in the
Citation Graph. That is relevance feedback on **seed papers, to steer a graph expansion**.
This is recourse on **a result, inside a thread, against the query that produced it**.
They are different surfaces doing different jobs, but anyone presenting AB should raise
the Citation Graph before someone else does.

---

## 7. Ledger

| Claim | Status | Proof |
|---|---|---|
| The answer embeds a generated “Evidence Coverage Across Key Open Questions” matrix with a literal `GAP` cell | **Verified** | `screens/03`, `screens/05` |
| Whether that matrix's cells are interactive | **UNKNOWN** — never clicked, and no Pro messages to spend | — |
| A reference carries a per-(paper, query) `28 SUPPORTING QUOTES` count | **Verified** | `screens/05` |
| Answers cite the same paper many times, unevenly, across a long answer | **Verified** | `screens/08` |
| Ranks #1/#2/#3/#4/#9/#12 for the six captured papers | **Verified** | `screens/07`, `04` |
| 20 included vs 6 in “All cited papers” for that query | **Verified**, but the list scrolls — 6 is what was captured, not proven to be all | `screens/04`, `07` |
| Which open question each paper speaks to | **JUDGEMENT**, read off abstracts. Everything in Z rests on it | `screens/03` abstract, `07` |
| The reconstructed sections of Q0's answer | **RECONSTRUCTION.** Only the first sentence is verbatim | `screens/03` |
| Researchers act differently on a sole-support paper than a corroborating one | **ASSUMED** — the strongest untested premise in Y | — |
| The trace holds three literal sub-queries with pool sizes (`31.7M`, `656.6K`, `442.8K`) | **Verified** — this is what makes "why" real rather than invented | `screens/04` |
| Which sub-query found which paper | **JUDGEMENT**, read off the query text. In the product the agent knows it exactly | — |
| A paper's `matched` passage | **Verbatim for Wienert only**; the other five are captured abstract summaries, and the panel says so on every card | `screens/04` |
| Supporting-quote counts other than Wienert's 27/28 | **INVENTED** as plausible integers — the shape is real, the five numbers are not | `screens/05` for the real one |
| Users struggle to phrase a correction in natural language | **USER'S STATED PREMISE**, 2026-08-04, and the whole reason AB rejects reasons rather than asking for prose | — |
| Rejecting a search term is a usable mental model for a researcher | **ASSUMED** — the strongest untested premise in AB, and the first thing to put in front of a user | — |
