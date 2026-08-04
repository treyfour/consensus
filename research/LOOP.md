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

**R2 · Adding to a note adds to My Library. Automatically, one-way, always.**
Nobody should file the same paper twice. Keeping is a single act with two consequences:
the paper enters the flat set, and the card records why. This is stated as fact in the
panel (`✓ 6 in My Library`), never offered as a choice.

The consequence, which is a real change: **"Add to My Library" stops being a button.**
It becomes state. The escape hatch lives in `⋯ → Remove from My Library`, and removing
it from the Library does **not** remove it from the note — the note is the record of
your reasoning, and reasoning you later rejected is still reasoning.

**R3 · From a paper in My Library, you can see the notes and threads it came from.**
This is the return leg, and it is the whole point. The Library today is a terminus. Once
notes exist, a saved paper carries backlinks to every card that cites it, and through
those cards, to the query that surfaced it and the rank and recurrence it had there.
That restores, indirectly, what the `Evidence` tab loses directly.

**R4 · Asking from a note produces a backlinked thread, never an orphan.**
Verified failure, `screens/13` → `screens/14`: asking from the Citation Graph creates a
top-level thread with **no backlink** to the graph it came from. Work leaks sideways and
the trail is lost. A note must not repeat this. Every thread asked from a note announces
its origin (`NEW THREAD · ASKED FROM YOUR NOTE`, with `← back to the note`), and the note
counts them (`3 threads asked from this note ›`).

This closes the cycle:

```
   thread ──references──▶ NOTE ──automatic──▶ My Library
     ▲                     │                      │
     └──── ask this note ──┘                      │
          (backlinked, scoped to what you kept)   │
                                                  │
   from any saved paper: which notes and threads it came from
```

**R5 · Filing is a promotion, not a prerequisite.**
Research outgrows one thread. When it does, cards — or the whole note — are promoted into
a **collection**, which is named, spans threads, and lives in My Library. So the answer to
"can you put a note in My Library" is yes: that is precisely what a collection is, and it
arrives with its questions attached rather than as loose papers.

Round 10 (`option-18-notebooks.html`) put this decision at the *front* and it cost an
answer to "which note?" on every single add. Round 11 removed the decision. This round
puts it back where it belongs: at the end, optional, once you know the shape.

**R6 · Tags and filter carry the organisation that structure no longer does.**
One note means no hierarchy, so retrieval has to come from somewhere. Tags on cards plus
one Filter control — type to find a tag, or type anything to search the note — is the
whole mechanism. It is cheap, and it does not ask you to decide anything at capture time.

---

## 4. Answers to the questions as asked

- **If we add to Notes, is it project-specific?** It is *thread*-specific. Consensus has no
  verified "project" object, so inventing one is out of scope; a collection is the
  cross-thread container, and it is opt-in.
- **Is it auto-added to My Library?** Yes. See R2.
- **Can you add a note or collection to My Library?** A collection *is* a Library object.
  A note becomes one by being promoted.
- **How do we tell the user the relationship while they are in a chat?** Three permanent
  lines in the note panel, none of them interactive noise: where the note came from, how
  many of its sources are in My Library, and how many threads have been asked from it.

---

## 5. Ledger

Same discipline as `HANDOFF.md` §2 — nothing here reaches a slide without a row.

| Claim | Status | Proof |
|---|---|---|
| Saved paper loses the `Evidence (N)` tab | **Verified** | `screens/15` vs `screens/03` |
| Library list carries no rank, recurrence or originating query | **Verified** | `screens/15` |
| Asking from the Citation Graph creates a top-level orphan thread, no backlink | **Verified** | `screens/13`, `14` |
| No note, tag or highlight anywhere in thread or library | **Verified** | `screens/09`, `15` |
| Consensus has no "project" or "collection" object today | **Verified by absence** — searched the rail, Library and thread UI; label as such | `screens/09`, `15` |
| Researchers would rather not file at capture time | **ASSUMED** — motivates R1 and R5; it is the strongest untested premise here | — |
| A one-way note → Library link is preferable to two-way sync | **Design choice**, not a finding. The alternative (Library adds appear in the note) was rejected: it would fill the note with papers that have no thought attached | — |
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

Built as `prototypes/option-20-loop.html`.
