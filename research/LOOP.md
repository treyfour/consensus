# The loop — how Notes joins the objects Consensus already has

Written 2026-08-04, after round 11. This answers a question the prototypes had been
dodging: a note is a new object, so what is its relationship to **threads**, to
**My Library**, and to itself over time? Without an answer, Notes is a nice panel
that dead-ends, which is exactly the complaint the audit makes about My Library.

Read `HANDOFF.md` first. This file assumes its claims ledger.

---

## 1. The one verified fact that decides everything

From `HANDOFF.md` §1, proven by `screens/15-library-paper-detail.png` against `screens/03`:

> A paper saved to My Library keeps every piece of metadata — authors, journal, Q1 SJR,
> citation and influential counts, DOI, chips, full abstract — and **loses the
> `Evidence (N)` tab**, along with rank, recurrence, and the originating query.
>
> **The paper survives; its link to your question does not.**

Evidence is query-relative. My Library has no query, so it cannot hold Evidence. This is
not an oversight to be patched; it follows from what the Library *is*.

That gives the note its job, and it is a narrow one:

> **My Library is what you kept. The note is why you kept it.**

Every rule below is derived from that sentence. If a rule stops following from it,
the rule is wrong, not the sentence.

---

## 2. The object model

| Object | Holds | Scope | Status |
|---|---|---|---|
| **Thread** | a question, its answer, its References | one line of enquiry | shipped |
| **My Library** | papers, flat, with metadata | account | shipped |
| **Citation Graph** | seed-paper expansion | a tool, not a container | shipped |
| **Note** | *cards* — a thought plus the sources that provoked it | **one thread, by default** | proposed |
| **Collection** | a named set of cards spanning threads | account, lives in My Library | proposed |

A **card** is the atom: optional text, zero or more sources, zero or more tags. One
source can appear on several cards; one card can carry several sources. That is the
whole schema.

---

## 3. The six rules

**R1 · A note is thread-scoped by default.**
A note without a question is a Library entry, and a Library entry is the thing that
already fails. The note therefore starts where the question is. The panel says so:
`from this thread · CRISPR Off Target Effects`. No folder picker, no project selector,
no decision at capture time.

**R2 · Nothing reaches My Library on its own. ~~Adding to a note adds to My Library.~~**

> **Reversed after round 12, on the user's call.** Round 12 made the note → Library link
> automatic and one-way, and turned "Add to My Library" from a button into state. That was
> wrong for two reasons the round-13 review surfaced: it silently fills a personal
> namespace with things the researcher never chose to keep, and — decisively — **"the
> Library" is not a single destination.** See R5a: My Library is a *tree*. "Save to My
> Library" has no unambiguous meaning, so it cannot be the automatic consequence of
> anything.

The rule as it now stands: keeping into the note and keeping into the Library are
**separate acts**, and the second one always names a destination. One button, `＋ Add to
collection`, in exactly the same form at note level and on a selection. Its picker opens at
the root of My Library and **refuses to accept anything there** — `pick a collection —
nothing lands in My Library on its own`. You land somewhere, or you do not land.

The note is still where the reasoning lives. It just no longer files on your behalf.

**R3 · From a paper in a collection, you can see the notes and threads it came from.**
Unchanged, and still the return leg. The Library today is a terminus. Once notes exist, a
saved paper carries backlinks to every card that cites it, and through those cards, to the
query that surfaced it and the rank and recurrence it had there. That restores, indirectly,
what the `Evidence` tab loses directly.

**R4 · Ask is one verb, and it attaches rather than navigates.**

> **Revised after round 12.** Round 12 made "Ask this note" open a new, backlinked thread.
> Simpler and already shipped: **Ask attaches what you have to the composer as scope**, the
> way `Papers · 20 attached` does today (verified, `screens/14`). The button says `Ask`,
> not `Ask this note`, because attaching a selection, a set of references, or the whole
> note are the same act at different sizes.

So the note's purpose, stated plainly: **it is a way to build up an attachment.** Drag
sources in over the course of a session, then ask the whole collection of them at once.

The orphan-thread problem does not disappear, it moves: whatever thread the attached
question opens must still carry `← from your note`. That is R4's remaining obligation and
it is not yet built.

**R4a · Your written notes are not part of the question unless you say so.**
A card's sources and a card's *text* are different things. The sources are public
artefacts; the text is the researcher thinking out loud, and some of it is
`Ask Sarah whether anyone has run this on liver-directed guides`. Attaching therefore
scopes to **sources only** by default, with one explicit, reversible opt-in beside the
attachment chip: `＋ include my notes`. The toast says which world you are in
(`Sources only — your notes stay private`).

This is a privacy default, not a feature. Get it backwards and the first time someone
notices is the worst possible time.

**R5 · Filing is a promotion, not a prerequisite.**
Research outgrows one thread. When it does, cards — or the whole note — are promoted into
a **collection**, which is named, spans threads, and lives in My Library. So the answer to
"can you put a note in My Library" is yes: that is precisely what a collection is, and it
arrives with its questions attached rather than as loose papers.

Round 10 (`option-18-notebooks.html`) put this decision at the *front* and it cost an
answer to "which note?" on every single add. Round 11 removed the decision. This round
puts it back where it belongs: at the end, optional, once you know the shape.

**R5a · My Library is a tree, and the picker has to walk it.**
**VERIFIED 2026-08-04** by `screens/20-library-threads-tab.png`. Two things recorded from the
verbal report were wrong and are corrected here:

| I had written | Actually |
|---|---|
| navigation is a breadcrumb `My Library / collection / sub-collection` | it is a **left sidebar tree**, always visible: `adhd` › `specifics`, `Airpollution Dementia`, `Semaglutide Cardiovasc…` |
| tabs are Threads and "believed to be Sources" | tabs are **Items (6)** and **Threads (3)**. The noun is *Items* |

New in the same screenshot:

- The **Threads tab is a table** — checkbox · Title · Preview, where Preview is the opening
  line of that thread's answer.
- **Threads are already multi-selectable.** Selecting raises `3 selected · ⋯ · ✕`. The
  selection primitive exists at thread level today.
- **Selecting threads offers no way to chat against them.** Verified by absence, and it is
  the opening for R7.

The correction matters beyond bookkeeping: `option-21-ask.html` built a breadcrumb
drill-down picker on the strength of the wrong version. A picker is not wrong, but it does
not match navigation that never leaves the tree.

Two consequences:

1. It is why R2 was reversed. There is no single "the Library" to auto-save into.
2. The picker is a **drill-down**, not a flat list: breadcrumb at the top, `Add here —
   <name>` once you are inside something, sub-collections below, and `New collection here…`
   which creates at the current depth. Built in `option-21-ask.html`.

**R5b · Notes are the third tab. — DECIDED 2026-08-04.**
A collection already holds threads and sources. Notes join them as a peer:
`Threads · Sources · Notes`. No new noun, no second organising system, no surface competing
with My Library. Chosen over a new top-level "Notebook" surface, and over leading the
collection view with notes.

The cost is real and should be said out loud on the slide: **the most personal content sits
one tab deep**, so it is not what you see on arrival. Two things soften it — the tab carries
a `new` badge, and both other tabs link into it (`2 cards cite it`, `3 note cards came from
this thread`), so Notes is reachable from wherever you actually are.

**R5c · Inside the tab, notes group by originating thread.**
Not by tag, not by date. A note is thread-scoped (R1), so when its cards are filed into a
collection they arrive already grouped: `From CRISPR Off Target Effects · 3 cards · 4
sources`. A collection that draws on four threads reads as four groups, and that grouping
*is* the provenance. Tags cut across the groups as a filter, which is the job they are
good at.

**R5d · This is where the Evidence tab comes back.**
The Sources tab is the payoff of the entire argument. Each paper shows what My Library drops
today: which cards cite it, from which thread, and at what rank and recurrence —
`from CRISPR Off Target Effects · ●●○ 2 of 3 searches · ranked #2`.

Provenance is stored **per (paper, thread)**, never per paper, because recurrence and rank
only mean anything relative to the queries that were actually run. In
`option-22-library.html` only the real captured thread carries dots; papers reached through
other threads show journal and year instead of invented provenance. A first pass got this
wrong and repeated one thread's dots under every thread — worth remembering, because it is
the exact error that makes a provenance feature untrustworthy.

Built in `prototypes/option-22-library.html`.

**R6 · Tags and filter carry the organisation that structure no longer does.**
One note means no hierarchy, so retrieval has to come from somewhere. Tags on cards plus
one Filter control — type to find a tag, or type anything to search the note — is the
whole mechanism. It is cheap, and it does not ask you to decide anything at capture time.

---

## 4. Answers to the questions as asked

- **If we add to Notes, is it project-specific?** It is *thread*-specific. A collection is
  the cross-thread container, and it is opt-in.
- **Is it auto-added to My Library?** **No** — reversed, see R2. There is no single Library
  to add to; you choose a collection or nothing happens.
- **Can you add a note or collection to My Library?** A collection *is* a Library object.
  A note becomes one by being added to a collection.
- **Are my written notes included when I ask?** No, unless you opt in. See R4a.
- **How do we tell the user the relationship while they are in a chat?** One line, not
  three: `from this thread · CRISPR Off Target Effects`. The Library-state and
  threads-asked counters built in round 12 were **removed in round 13** — they were
  reporting on a link the user had not asked for, so once R2 flipped they had nothing
  true left to say. Where a card *has* been filed, its own footer says so (`⊞ Assay
  comparisons`), which is the same fact stated where it is actionable.

---

## 5. Ledger

Same discipline as `HANDOFF.md` §2 — nothing here reaches a slide without a row.

| Claim | Status | Proof |
|---|---|---|
| Saved paper loses the `Evidence (N)` tab | **Verified** | `screens/15` vs `screens/03` |
| Library list carries no rank, recurrence or originating query | **Verified** | `screens/15` |
| Asking from the Citation Graph creates a top-level orphan thread, no backlink | **Verified** | `screens/13`, `14` |
| No note, tag or highlight anywhere in thread or library | **Verified** | `screens/09`, `15` |
| Composer attaches papers as scope (`Papers · 20 attached`) | **Verified** — this is what `Ask` reuses | `screens/14` |
| My Library has collections and sub-collections in a left sidebar tree | **Verified** | `screens/20` |
| A collection's tabs are **Items** and **Threads**, not "Sources" | **Verified** | `screens/20` |
| Threads are multi-selectable in My Library (`3 selected · ⋯`) | **Verified** | `screens/20` |
| Selecting threads offers no "chat against these" action | **Verified by absence** | `screens/20` |
| Researchers would rather not file at capture time | **ASSUMED** — motivates R1 and R5; it is the strongest untested premise here | — |
| Researchers do not want notes auto-filed into a shared namespace | **User's explicit call**, 2026-08-04, overriding round 12's automatic link | — |
| Written notes should be excluded from ask scope by default | **User's stated instinct** ("these notes are kind of personal"), implemented as an opt-in | — |
| Grad students want to re-ask a curated set | **ASSUMED**, consistent with the brief's premise about papers getting buried | — |

---

## 6. What this does not solve

- **Two people, one note.** Sharing and collaboration are untouched. The brief scopes to a
  single researcher, so this is deliberate, not forgotten.
- **The note across a whole thesis.** One note per thread scales to a chapter, not a
  degree. Collections are the answer on paper; nothing has been built or tested for the
  case where a researcher has forty of them.
- **Reconciling a note with Zotero.** `HANDOFF.md` assumes Zotero is the grad student's
  ground truth. If it is, a note that never leaves Consensus is a second home for the same
  papers. Export exists in the `⋯` menu as an acknowledgement, not an answer.
- **Where notes live inside My Library.** R5b, still open.
- **Whether the thread an attached question opens carries a backlink.** R4's leftover.

Built as `prototypes/option-21-ask.html`; round 12's version, with the automatic Library
link and the thread-spawning Ask, is preserved at `prototypes/option-20-loop.html`.

---

## 7. The loop, walked end to end

`prototypes/option-23-fullloop.html` is the whole argument as one continuous pass, both
screens in a single file, driveable step by step and interactive between steps.

| | Beat | What it proves |
|---|---|---|
| 1 | A question, and what came back | The starting point is today's product: thread, answer, References |
| 2 | Hover a citation | Validation before commitment. Hovering peeks the paper — journal, recurrence, rank, abstract — without leaving the sentence. This is *not* the round-9 hover-to-add that was rejected; nothing is added, it only reads |
| 3 | Drag the set in | Three references travel together and stage in the composer |
| 4 | Say what they are | One note, so there is nothing to file into. The card lands underneath |
| 5 | **Ask, inside the same chat** | The pivot. `📎 Papers · 3 attached from your note`, then an answer marked `answered within your note · 3 sources · no new retrieval`. Sources only; the written note stays out |
| 6 | Catch what the answer surfaces | The scoped answer names a paper not yet kept, References marks it `new`, one drag adds it. **This is the loop closing** — asking the note grows the note |
| 7 | Add to My Library | The picker opens on My Library and makes you choose a collection |
| 8 | And back again | In the collection the note previews like a thread, and opening it returns to exactly the layout of beat 1 |

Beat 6 is the one to watch in a walkthrough. Everything before it is capture; everything
after is filing. Beat 6 is the only moment where the note *pays you back* — the pile you
built produces a paper you would not otherwise have kept, which then joins the pile. If
that beat does not land, the note is just a folder.

**Honest about the demo:** the scripted path is smoother than a real session. A real one has
dead ends, papers dragged in and pulled back out, and questions that return nothing useful.
The prototype shows the happy path because the argument is about whether the *shape* holds,
not about how often it succeeds.
