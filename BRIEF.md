# Track B — Giving a long thread a structure it can be read by

Worktree branch: `explore/thread-structure`. Start from `prototypes/option-24-app.html`.
Read `research/HANDOFF.md` and `research/LOOP.md` first — the rejects list is binding.

---

## The question

The brief's premise, which we take at its word: **papers get buried as threads grow.** A
thread is currently a flat scroll of question → answer → question → answer. At four turns
it reads fine. At fifteen it is a transcript, and the only way back to something you read
earlier is to scroll and recognise it.

So: **what shape does a long thread have, and how do you show that shape without turning
the product into an outliner?**

This track keeps one thread whole and gives it internal structure. Track C
(`explore/thread-split`) takes the opposite position — that a long thread should become
several things. They are meant to disagree.

## Do not re-propose

- A thread-level paper list. Shipped as References → All cited papers.
- Retrieval transparency. Shipped, and good.
- Redesigning the product or covering multiple workflows — the brief says depth over
  breadth, explicitly.

## Also do not resurrect

`HANDOFF.md` §1: an early audit read the test account's History as user behaviour and
concluded "threads die at one query." **That was exploratory usage.** Never present it,
and never use it to argue that threads do not get long.

## Directions worth trying — pick two or three, do them properly

1. **A spine.** A minimap or outline of the thread down one edge: each turn as a row, with
   its question, its answer's title, and how many sources it introduced. Jumping is the
   point. Does it survive at fifteen turns?
2. **Segments that name themselves.** Consecutive turns about the same thing collapse into
   a named section — *"Detection methods · 4 turns · 9 sources"* — derived from the
   questions rather than declared by the user.
3. **Answered and settled.** A turn you have extracted a note from is done. Collapse it to
   one line and show what came out of it. This makes the note the summary of the turn,
   which connects to `LOOP.md` R1.
4. **The thread as a set of open questions.** Invert it: the primary view is what is still
   unresolved, and the transcript is what you expand into. Riskiest, most interesting.
5. **Where the sources entered.** Mark, in the scroll, the turn at which each source you
   kept first appeared. Scrolling becomes a way to re-find a paper by remembering *when*.

## Constraints

- The note panel and References must keep working. This is a change to the middle column,
  not a replacement for the shell.
- Real data. The captured thread has one real query with a real funnel and real ranks; the
  prototype can run more searches, and recurrence is computed live from them.
- Consensus's own CDL tokens; `scripts/guard.mjs` fails the build on raw hex.
- A long thread needs to be **demonstrable**. Seed eight to twelve turns so the problem is
  visible before the solution is.

## What good looks like

Two or three **clickable** HTML prototypes in `prototypes/`, each with its trade-off
written down, added to `prototypes/index.html` newest-first. State plainly which one still
works at fifteen turns and which quietly stops being true — the Margin's anchoring failed
exactly that way and saying so was more useful than the prototype.
