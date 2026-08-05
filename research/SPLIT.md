# SPLIT — when one thread is several, and what that costs

Track C, branch `explore/thread-split`. Written after building
`prototypes/option-25-branch.html`, `option-26-seams.html` and `option-27-merge.html`.

Read `HANDOFF.md` first, then `LOOP.md`. This file assumes both, and it does not restate
the claims ledger. Track B (`explore/thread-structure`) takes the opposite position — that a
long thread stays one thread and needs internal structure. §6 is what to hand the merge.

---

## 0. The thing this track was most likely to get wrong, and did not

`HANDOFF.md` §1 retires *"threads die at one query and work fragments sideways."* It was an
artifact of exploratory usage on a test account. In this track it is the most seductive wrong
idea available, because it reads as evidence for splitting.

It is not used anywhere in these three prototypes, and it is not needed. The case for
splitting stands on the brief's own premise — threads grow and papers get buried in them —
plus one thing you can only see by building an eleven-turn thread, which is §2.

---

## 1. The question the brief asked, answered

> A note is thread-scoped (`LOOP.md` R1). If a thread splits, what happens to its note —
> does it split too, follow one side, or become the collection that holds both?

**It becomes the collection that holds both. And it does so without any new mechanism,
because a split *is* the event `LOOP.md` R5 already describes: research outgrowing one
thread. The split's real job is not to cut the note; it is to detect that moment and offer
the promotion R5 already defines.**

Four reasons, in descending order of how much of it came from building rather than thinking.

### 1a. Assigning cards by their sources fails on nearly half the note — measured, not assumed

`option-26-seams.html` carries seven cards. At the seam the detector actually proposes
(6 | 7), **three of the seven cannot be assigned to a side**, and each fails for a different
reason:

| Card | Sources | Why it cannot be placed |
|---|---|---|
| "Detection and delivery are the same problem seen twice…" | Höijer, Huang | cites **one paper exclusive to each side** |
| "Kalter and Angelini Stewart are the two I keep coming back to…" | Kalter, Angelini Stewart | cites **only papers both sides share** |
| "Chapter 3 outline: measure → interpret → monitor." | none | **no sources at all** |

Move the seam one turn, to 7 | 8, and it becomes four of seven. The three failure shapes are
not edge cases invented to win the argument — they are the shapes a real note has. The first
one is the *best* card in the note: the one that noticed the two halves are the same problem.
A rule that reliably discards the most synthetic card in the note is the wrong rule.

### 1b. Splitting the note manufactures drift the product has no way to resolve

The only way to keep an unassignable card is to copy it into both halves. From that moment
there are two objects, editable independently, with nothing in the model that reconciles
them. Consensus has no merge-conflict concept and should not acquire one to support a
feature that is meant to reduce mess.

### 1c. "Follow one side" is the orphan bug wearing different clothes

`screens/13` → `14` is verified: asking from the Citation Graph produces a thread with no way
back. Giving the whole note to side A produces a side B whose reasoning stayed behind. The
work survives; the thinking does not follow it. That is the same sentence as
`LOOP.md` §1's *"the paper survives; its link to your question does not"* — which is the
failure this entire project exists to argue against. Building it is arguing against yourself.

### 1d. Promotion is already the shipped answer, and it costs nothing new

`LOOP.md` R5: *filing is a promotion, not a prerequisite* — when research outgrows one
thread, cards or the whole note are promoted into a collection. R5b: notes are the third tab
of a collection, beside Threads and Sources. R5c: inside that tab, notes group by originating
thread.

A split satisfies all three without amendment. The collection's Threads tab goes from one row
to two; the Notes tab keeps all seven cards, grouped by origin; the Sources tab keeps the
per-(paper, thread) provenance it already stores. The thread that split keeps its name and
*becomes* the collection, so nothing has to be named and nothing is lost.

### The cost, said out loud

**The note moves one level away from the thread header.** `LOOP.md` R5b already prices this —
"the most personal content sits one tab deep" — but there it was opt-in. A split makes it
mandatory: you did not ask to file, and filing happened. That is the honest objection to this
answer, and it is the line that belongs on the slide next to it. `option-26` states it in the
picker itself rather than in a footnote:

> *costs: the note is now one level away from either thread… and a collection is a heavier
> object than a note — filing has happened whether you asked for it or not.*

Two things soften it, both already in the model: the collection appears in the header of both
halves as a link, and the Notes tab carries a `new` badge (R5b).

---

## 2. What building an eleven-turn thread showed that a five-turn thread hides

These are the findings that only exist because the track required a longer thread. They are
the part of this file most worth keeping.

### 2a. A split silently rewrites every recurrence number in the note

Recurrence is *how many of **this thread's** searches returned this paper*. It is not a
property of the paper — that rule is load-bearing in `LOOP.md` R5d, and a first pass in
round 14 got it wrong in exactly the opposite direction.

Cutting a thread changes the denominator. In `option-26`, splitting at 6 | 7 moves
**Huang 2022 from 5 of 11 searches to 1 of 6 on one side and 4 of 6 on the other.** Open
either half and every dot in the note has moved. Nobody asked for that; it falls out of what
recurrence means.

This has consequences beyond the prototype:

- It is a second, independent argument for promoting the note rather than splitting it. If
  the note lives on the collection, the collection can hold the *whole* thread's numbers and
  each half can hold its own, and both are true.
- It is a hard limit on any "auto-split at N turns" idea. Silently rewriting provenance is
  the same class of harm as the Library dropping the Evidence tab.
- The review panel in `option-26` says it out loud under **AND WHAT IT SILENTLY REWRITES**,
  computing the largest mover live rather than asserting it.

### 2b. The recurrence dot convention breaks at eleven searches — a regression this track caused

`HANDOFF.md` §5 records that recurrence dots only work in a column. True, and still true. But
the dots were one-per-search, capped at three, which was fine when the captured thread had
three queries. At eleven, `3 of 11` and `11 of 11` both render `●●●`.

Fixed in all three prototypes: five slots showing a proportion, with the fraction beside it
carrying the fact. Recorded here because it is a scale limit on a finding the deck is likely
to reuse, not a bug in one file.

### 2c. The first turn belongs to both halves, so a split does not partition — it duplicates

The first version of the seam detector put turn 1 in side A. Side A then cited all six papers
(turn 1 is the broad framing question), side B's exclusive-source set came out empty, and the
note triage collapsed to "everything is A". The detector was not broken; the model was.

The root question is the one both halves descend from. It is copied into both, and **eleven
turns become twelve.** `option-26` shows the copy in the result view, marks the turn inside
both halves (`turn 1 · the root question — this turn is in both halves`), and says so in the
review before you commit.

This generalises: *any* split of a thread duplicates something. Turn 1, and every source
cited on both sides — at 6 | 7 that is Kalter 2025 and Angelini Stewart 2025, at 7 | 8 it is
three papers. The interesting question about a split is never "where is the line", it is
"what has to exist twice".

---

## 3. What was built, and the one-line trade-off for each

### `option-25-branch.html` · Y — Branch from a turn
Direction 1. Hover any turn, press `⑂ Branch from here`. The child opens with a breadcrumb, a
from-bar quoting the parent turn, and the parent turn's references carried into scope as a
`Carried in` group — where each paper keeps **the parent's rank**, because it has no rank in
the child yet. The parent turn keeps a permanent stub pointing at the child.

The rail's `＋` deliberately lets you build the verified bug: **Start from nothing** creates a
thread with no parent, which then shows `⚠ no parent — nothing links back to where this came
from` and appears flagged in the thread tree. `give it a parent ›` repairs it by re-parenting
onto any turn, which is the whole fix — the thread gains a breadcrumb and that turn gains a
stub, in one act.

> **Gives** every new thread a visible parent and every parent turn a visible child, which is
> the exact inverse of the Citation Graph orphan. **Costs** it is entirely manual, so a thread
> only splits if the researcher already noticed it should — which is the problem.

### `option-26-seams.html` · Z — The thread notices its own seam
Directions 2 and 3. Two signals, both from your own thread and neither from the papers: the
words in adjacent questions, and the papers each answer leaned on, compared over a three-turn
window either side. Lowest overlap wins. **Every** candidate boundary is shown with its
strength, not just the winner, and clicking one re-derives the names, the duplicated sources,
the rewritten recurrence and the note triage. The side names are derived too — the six
papers' own vocabulary is used as the stemmer, so "Standards and assays" and "Monitoring and
delivery" are computed, not written.

The note treatment is a three-way choice with all three costs stated, defaulting to promotion.

When it guesses wrong there are three answers, in increasing order of severity: `Not a seam`
dismisses it and the thread stops proposing; the seam is movable before you commit; and after
the split, a boundary turn can still be moved across, and `↺ Undo the split` restores one
eleven-turn thread and a seven-card note.

> **Gives** a thread that proposes its own seams from evidence it already has, and a split
> whose every cost — the duplicated root turn, the duplicated sources, the rewritten
> recurrence, the unassignable cards — is priced before you press the button. **Costs** the
> detector is a heuristic over your own questions, so it will confidently propose seams that
> are not there; the whole design has to assume it is wrong, which is why nothing here happens
> automatically.

### `option-27-merge.html` · AA — Merge, and what refuses to merge
Direction 5, the symmetry test. Two threads started three weeks apart, never linked. The
naive reading of "merge" — one thread with all eleven turns — is **rendered rather than
described**: it produces 10 subject crossings in 11 turns, and there is no timestamp in what
we captured, so any ordering is an assumption. It is labelled `rejected` and left in the
product as the argument.

What actually merges: the sources, into a union that gives a paper in both threads **two rows
and two ranks, never one averaged rank**; and the notes, into two groups by originating
thread, because a card is an atom and the grouping is the provenance. The threads themselves
are untouched; they gain a container.

> **Gives** the symmetry proof — merge lands in the same object a split lands in, so the
> collection is the container and the thread is a working surface. **Costs** it is the
> narrowest of the three: it needs two threads that are genuinely one question, which is rarer
> than a thread that grew two subjects.

---

## 4. Rejects — the parts worth more than the picks

| Rejected | Why |
|---|---|
| **Splitting the note with the thread** | 3 of 7 cards unassignable at the proposed seam, 4 of 7 one turn over. Copying them creates two objects that drift with nothing to reconcile them. Kept in `option-26` as a selectable option so the cost is visible, never as the default |
| **Giving the note to one side** | It is `screens/13`→`14` in new clothing: the work survives, the thinking does not follow it |
| **Interleaving two threads into one** | Built it. 10 crossings in 11 turns, and no timestamps exist to order by, so the ordering is an assumption that changes the result. Left visible in `option-27` because the reject *is* the argument for the collection |
| **A hand-written stemmer for the derived labels** | First pass normalised plurals only, so "monitored" and "monitoring" stayed separate and side B came out named *"Delivery and patient"*. Using the six papers' own vocabulary as the stemmer gave *"Monitoring and delivery"* with no hand-written list — and it doubles as the filter that keeps a label a word about the subject |
| **Auto-splitting at N turns** | §2a. It would silently rewrite the provenance of every paper in the note. The detector proposes; it never acts |
| **A seam as a yes/no prompt** | The detector's second-best boundary scored 0.73 against the winner's 0.89. A binary prompt hides that. Every candidate is shown, and the seam is draggable |
| **A new noun for the split halves** | They are threads. The container is a collection. `LOOP.md`'s five nouns were enough for this whole track, which is itself a result |
| **Presenting History as evidence that threads die young** | `HANDOFF.md` §1. Not used |

---

## 5. What is not solved

- **Nothing here is validated with a researcher.** The seam detector is plausible and cheap;
  whether its guesses match a human's sense of "this became a different question" is untested,
  and it is the single largest assumption in the track.
- **The detector is scored on 11 turns, one thread, six papers.** The window size (3), the
  even weighting of the two signals, and the ≥8-turn floor are defensible defaults, not tuned
  values. They should be described as defaults on any slide.
- **Branching mid-answer.** `option-25` branches from a turn. Branching from a *claim inside*
  an answer is the more natural gesture and is not built; it would need the excerpt mechanism
  from round 8.
- **What happens to a collection that splits.** Threads split into collections. Collections
  are where it stops, which is convenient and unexamined.
- **Three-way splits.** Every prototype here cuts once. A fifteen-turn thread with three
  subjects is the obvious next case and the seam scoring already supports it; the review
  interface does not.
- **Sharing.** Same scope decision as `LOOP.md` §6 — single researcher.

---

## 6. For the merge with Track B

Track B argues a long thread stays one thread and needs internal structure. These two tracks
are supposed to disagree, and on one point they do not disagree at all:

**The seam detector is the same computation either way.** A low-overlap boundary between turns
6 and 7 is either a section heading (B) or a cut (C). It is derived from the same two signals
and it costs the same to build. That makes it the cheapest possible reconciliation: *build the
detector, offer the heading first, and offer the cut only when asked.* A heading is free to be
wrong; a cut is not. `option-26`'s review is already shaped that way — nothing happens until
you press Split, and everything is undoable after.

**And both tracks must agree the note is not cut.** Whatever the turns do, §1 holds: the note
either stays whole with one thread (B) or is promoted to the collection holding both (C).
There is no version of this where a note is divided.

Two things Track C found that Track B should not have to rediscover:

- Recurrence numbers are relative to a thread, so *any* operation that changes what counts as
  "this thread" rewrites them (§2a). Track B's version of this is milder but real: if a
  section of a thread ever becomes independently askable, its recurrence denominators are the
  section's, not the thread's.
- The first turn is the root that everything descends from (§2c). In Track B it is the
  thread's premise; in Track C it has to be copied into both halves. Either way it is not an
  ordinary turn and should not be drawn as one.

**If only one of the three prototypes survives the merge, keep `option-26`.** It is the only
one that is about noticing, and noticing is the part of the problem the researcher cannot do
for themselves. `option-25`'s branch is a primitive the merged design needs anyway;
`option-27` is an argument, and arguments belong in the deck rather than in the build.

---

## 7. Sections — the break you scroll through (`option-28-sections.html`)

Added after review. The branch idea (§3, `option-25`) was judged interesting but wrong at the
gesture: it asks the researcher to decide that a thread should divide, when what they
actually want is *a visual signal that they are starting something new*. This prototype keeps
the whole thread in one scroll and draws **breaks** through it. Nothing moves, nothing is
copied, nothing becomes an orphan — because nothing is separated.

**The mechanic.** References is bound to scroll position. Scroll past a break and the panel
re-derives for the section you are now reading: different ordering, different weights, its
own recurrence denominator (`4 of 5 turns here`, not `4 of 11`). A `whole thread` scope is one
click away. The map along the top is every section at once, sized by turn count.

**Three ways to draw a break, and the reason for each.**

| Gesture | Why a researcher reaches for it |
|---|---|
| `⊹ Start a new section` in the composer | The composer states what it is carrying — `carrying §2 · 5 turns · 6 sources` — and switching flips it to `starting clean · nothing carried`. The reason is **scope**, not tidiness |
| `⊹ start a new section from here` on any answer | The recovery gesture. The answer went somewhere wrong and you want out of that context without losing it |
| The composer nudge | See below |

### 7a. Automatic seam detection was built, measured, and removed

`option-26` proposes seams in the thread. Measured over this eleven-turn thread, **neither
available signal can find one**:

| Signal | Scores across all ten boundaries | Verdict |
|---|---|---|
| Paper overlap (3-turn windows, Jaccard) | 0.50 – 1.00 | The real subject change scores **0.67**; a false boundary scores **0.50**. It proposes the wrong cut |
| Question-word overlap | 0.00 – 0.09 | Every boundary looks like a seam, because every question uses different vocabulary |

One signal says the whole thread is one thing. The other says every turn is its own thing.
Neither finds the seam a reader sees in about two seconds. The cause is corpus size: with six
papers, nearly every turn touches nearly every paper, so the paper signal has no variance
left to spend.

So `option-28` **does not propose breaks in the thread at all.** The scores stay computed in
the source as the evidence for not doing it.

**What survived:** the same overlap signal, moved to the one moment where being wrong is
cheap. As you type a question, the composer compares it to the section you are in; if it
shares nothing, a quiet chip offers `nothing in common with §2 — new section?`. You are
already choosing at that instant, so a wrong hint costs a glance rather than a restructured
thread. This is the narrow version of `option-26`'s idea, and it is the only version the
measurement supports.

### 7b. "New source" and "carried forward" are vacuous at this corpus size

The first build marked each source in a section as new or carried. Both were dead labels: all
six papers appear in every section, so nothing is ever new and everything is always carried.

What genuinely differs is **how hard a section leans on a paper**, and that changes a lot —
§1 rests on Höijer and Kalter, §2 on Angelini Stewart and Huang, from the same six. So the
flags became weight (`this section leans on it most`, `touched once here`) and the break
states the shift directly: *now leans on Angelini Stewart, Huang · was Höijer, Kalter*.

Worth carrying into the merge: a real corpus would make new-vs-carried meaningful again, so
this is a finding about **the prototype's corpus**, not about the idea. Do not delete the
concept on this evidence — delete the label until there is a corpus that can support it.

### 7c. Where this leaves Tracks B and C

`option-28` is the reconciliation §6 asked for, built rather than described. A break is Track
B's section heading and Track C's cut **at the same time**, and the difference between them
turns out to be nothing but whether the turns stay in one scroll. Keeping them in one scroll
costs nothing and removes every hard problem the split created: no duplicated root turn, no
rewritten recurrence denominators, no note to triage, no orphan to prevent.

The note question (§1) does not even arise here. The note stays thread-scoped, because the
thread was never divided.

**Verification:** 26 assertions in `/tmp` drive script — scroll-bound source swapping in both
directions, break creation from three entry points, non-destructive removal, section naming
from corpus vocabulary, the composer carry-state, and citation click-through. Console clean.

---

## 8. The fence was a solved problem — rejected, with the reason

Round-by-round this went: option-25 branching → option-28 sections → options 29–33, five
weights of a retrieval-scope fence. **All of it is rejected.** The reason is not taste.

**Consensus already holds sources inside the chat as you chat, and that already tells you
what you are searching against.** From the ledger, both verified:

| Claim | Status | Proof |
|---|---|---|
| References are per-query, with an "All cited papers" union | **Verified** | `screens/05`, `06`, `07` |

Per-query References *is* the scope display. Every turn already carries the set it drew on,
sitting beside the answer it produced. The fence was built to answer "am I searching all 24
references or just the ones I picked?" — and the product answers that continuously, for
every turn, without being asked.

So the five options were five ways of announcing a fact already on screen. AF's measured
failure (§7a's successor: it cannot speak until an answer exists) turns out to be the least
of the problems; the others speak fine, about something the interface was already saying.

### The part that should have caught this earlier

`HANDOFF.md` §4 already lists this territory as rejected:

> | "Add a working set / thread-level paper list" | **Already shipped** as References → All cited papers |

A scope fence is a working set with a boundary drawn round it. Four prototypes and five
options later, that is the same idea wearing a different word. The rejects list existed
precisely to stop this and it did not, because "fence" did not look like "working set" until
someone said the obvious thing about how the product already behaves.

**Lesson worth keeping:** when a direction requires the interface to *tell* the researcher
something, check first whether the interface is already *showing* it. Announcing is what you
reach for when you have forgotten to look.

### What survives from this track

| Finding | Still true |
|---|---|
| Seam detection does not work at this corpus size — paper overlap 0.50–1.00, word overlap 0.00–0.09, and the real seam scores worse than a false one | Yes. Independent of the fence |
| A split silently rewrites recurrence denominators, and nobody asked it to | Yes. Still the hard argument against auto-splitting |
| The recurrence-dot convention breaks past ~5 turns; the fraction has to carry the fact | Yes. A real regression in our own convention |
| The note becomes the collection that holds both halves (§1) | Yes, and untested by this rejection |
| A thread can be branched without creating an orphan (`option-25`) | Yes, but now unmotivated — nothing has shown why a researcher wants to |

### The verified gap that is actually still open

One row of the ledger describes something the product does *not* do:

> | The union carries no origin, rank or recurrence per paper | **Verified** | `screens/07` |

Per-query References tells you what each turn searched. **All cited papers** flattens the
thread into one list and drops where each paper came from, how it ranked, and how often it
recurred. That is a real absence, verified with a screenshot, and it is the opposite of the
fence: not a boundary to draw, but provenance to restore in a view that already exists.

Nothing here should be built until that is decided, because every prototype in §7 and §8
started from an assumed problem rather than a verified one.
