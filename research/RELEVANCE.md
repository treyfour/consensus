# Relevance — what References can say per source

Track A, round 17. Written 2026-08-04. Read `HANDOFF.md` first; this assumes its claims
ledger and its rejects list.

Two prototypes, answering directions **1** and **4** of `BRIEF.md`:

| | File | Question |
|---|---|---|
| **Y** | `prototypes/option-25-carry.html` | Which sources carry the answer, and which are background? |
| **Z** | `prototypes/option-26-gap.html` | What is missing, and how do you tell a gap from a search failure? |

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

## 4. Ledger

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
