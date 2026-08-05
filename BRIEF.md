# Track C — When one thread should become several

Worktree branch: `explore/thread-split`. Start from `prototypes/option-24-app.html`.
Read `research/HANDOFF.md` and `research/LOOP.md` first — the rejects list is binding.

---

## The question

Track B assumes a long thread stays one thread and needs internal structure. **This track
takes the opposite position:** past some point a thread is no longer one line of enquiry,
and the honest move is to break it apart.

So: **when is a thread actually several threads, how would the product notice, and what
does splitting one cost the researcher?**

The two tracks are meant to disagree. Whichever survives contact with a fifteen-turn thread
is the answer; if both do, the merge is the interesting problem.

## The verified failure this must not repeat

`HANDOFF.md`, proven by `screens/13` → `screens/14`: **asking from the Citation Graph
creates a top-level orphan thread with no backlink** to where it came from. Work leaks
sideways and the trail is lost. Any split that produces disconnected threads has recreated
the exact bug the whole project is arguing against. A split must leave both halves knowing
about each other.

## Do not resurrect

`HANDOFF.md` §1: an early audit read the test account's History as evidence that "threads
die at one query and work fragments sideways." **That was exploratory usage of a test
account**, not behaviour. It is the most likely wrong thing to reach for in *this* track,
because it sounds like support for splitting. It is not. Take the brief at its word
instead: threads grow, and papers get buried inside them.

## Directions worth trying — pick two or three, do them properly

1. **Branch from a turn.** Any answer can start a new thread that keeps its parent visible
   — a breadcrumb, a back-link, and the sources already in scope. The opposite of the
   Citation Graph's orphan.
2. **The product notices.** After N turns the thread proposes its own seams: *"turns 1–5
   are about detection, 6–11 about delivery. Split?"* Detection is derived from the
   questions asked. What does it cost when it guesses wrong?
3. **Split without losing the note.** A note is thread-scoped (`LOOP.md` R1). If a thread
   splits, what happens to its note — does it split too, follow one side, or become the
   collection that holds both? This is the load-bearing question of the track.
4. **A thread that is really a project.** Several threads, one note, one collection. Does
   the collection become the container the researcher actually lives in, and does the
   thread demote to a working surface?
5. **Merge, not just split.** Two threads that turned out to be the same question. Rarer,
   but it tests whether the model is symmetric or only handles one direction.

## Constraints

- Nothing may become an orphan. Every new thread carries where it came from, visibly.
- Real data. The captured thread has one real query with real ranks and a real funnel;
  further searches are keyword-matched over the six captured papers.
- No new noun unless it earns one. Threads, notes, cards, collections, sources.
- Consensus's own CDL tokens; `scripts/guard.mjs` fails the build on raw hex.
- Seed eight to twelve turns spanning at least two genuinely different sub-topics, so a
  split has something real to cut.

## What good looks like

Two or three **clickable** HTML prototypes in `prototypes/`, added to
`prototypes/index.html` newest-first, each with its trade-off written down. Answer direction
3 explicitly in prose even if you do not build it — what happens to the note is the thing
the merge will need, and it is cheaper to decide it here than during the merge.
