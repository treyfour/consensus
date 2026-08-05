# Track A — Relevance: showing which sources actually matter

Worktree branch: `explore/relevance`. Start from `prototypes/option-24-app.html`.
Read `research/HANDOFF.md` and `research/LOOP.md` first — the rejects list is binding.

---

## The question

References returns 20 papers, ranked. Rank tells you the retriever's confidence; it does
not tell you **which three of these actually carry the answer** and which seventeen are
background. A researcher reading a 24-item list has to open papers to find that out, which
is the cost the brief describes as papers getting buried.

So: **what can be shown, per source, that changes what a researcher does next?**

## What is already shipped — do not re-propose

From `HANDOFF.md` §4. These exist in the product today and re-proposing them reads as not
having looked:

- The retrieval funnel (32.8M → 100 → 20). It is shipped and it is good.
- References per query, plus an "All cited papers" union.
- Table view, an Elicit-style compare matrix, Pro-gated.
- Source scoping on the composer (`Papers · 20 attached`).
- The Citation Graph, including seed-paper relevance feedback.

## What round 16 already does

`option-24-app.html` computes **recurrence live**: the dots count how many of *your*
searches returned each paper, and they move as you search. Rank is per-query. The union
deliberately shows recurrence and **no** rank, because a paper ranked #1 in one search and
#9 in another has no combined position. Keep that honesty; build on it.

## Directions worth trying — pick two or three, do them properly

1. **Load-bearing vs background.** Three papers usually carry an answer. Mark them, and
   collapse the rest behind a count. What is the signal — citation density in the answer
   text, recurrence, rank, or something else?
2. **Stance.** Group sources by what they claim, not by score: *agree / disagree / measures
   something else*. The Weave's roll-up (`✓6 ~3 ⊘2 · 13 undecided`) is the one keeper from
   direction E and it belongs somewhere.
3. **Near-duplicates.** Four papers saying the same thing is one finding, not four. Cluster
   them and say so.
4. **Absence.** The single best moment from any prototype was C · The Board's dashed
   "Gap — population variance" group holding one paper: *"One paper does not make a section.
   This is either the thesis gap or a search failure."* Nothing else makes an absence
   visible. It is currently a stretch state. Try promoting it into References.
5. **Why this one, for this question.** A per-source line that names the sentence it
   supports, not just its metadata.

## Constraints

- Real data only. Six captured papers, real ranks, the real funnel. If a direction needs
  invented papers, say so in the file rather than inventing citations.
- No new noun unless it earns one. Notes, cards, collections, threads and sources are the
  vocabulary.
- Provenance is per (paper, query). Never print a rank the object does not have — see
  `LOOP.md` R5d for the version of this mistake that already happened once.
- Consensus's own CDL tokens. `scripts/guard.mjs` fails the build on raw hex.

## What good looks like

Two or three **clickable** HTML prototypes in `prototypes/`, each answering one direction,
each with the trade-off written down. Add them to `prototypes/index.html` newest-first, and
record what you learned — especially anything that *failed* — because the rejects have been
more useful than the picks in every round so far.
