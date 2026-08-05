# Track A → main · what changed and how to merge

Branch `explore/relevance`, worktree `.claude/worktrees/relevance`, port 4601.
Written 2026-08-04 at the end of the track. Read `HANDOFF.md` first; this is the merge
instruction, not the reasoning. The reasoning is in `RELEVANCE.md`.

Eight commits, `b7dc825`..`b8c39a7`, on top of `fa974dd`. 51 files, +6277 / −5.

---

## 1. What the track concluded

The brief asked what References can show per source. Four rounds in, the question changed
under review, and the answer that survived is narrower than where it started:

> **Show, per source, the passage from the paper that best matched the query — labelled
> `WHY THIS PAPER` — and give the researcher a quiet way to say it missed, which asks what
> they were after and hands back an editable search.**

Three decisions worth carrying into main:

1. **The explanation is a quote, not a generated sentence.** Retrieval has already scored
   every passage in the paper against the query, so the best one is free to show and
   cannot hallucinate. Generating a sentence per source was prototyped and costed; it is
   the fallback, not the default.
2. **The correction asks the goal, not the fault.** "What were you hoping to find?" beats
   "what's wrong with this?" — friendlier, and a better signal, because you learn the
   target rather than the miss.
3. **Nothing is ever removed.** An earlier version struck through the reference, struck its
   citation and dimmed the sentence. That is what made it feel risky to press, and it was
   reverted wholesale.

And one fact that changes what anyone can claim in the deck, now on the `HANDOFF.md`
ledger: **Consensus already computes why.** The agent trace holds three literal sub-queries
with pool sizes (`31.7M`, `656.6K`, `442.8K`) and the drawer holds `27 supporting quotes`.
All of it is produced to write the answer and discarded before it reaches the paper.

---

## 2. What to merge, and what is superseded

**Live — this is the recommendation.**

| File | What it is |
|---|---|
| `prototypes/redirect/index.html` | The comparison page. Seven rules, four directions, A marked as chosen. **Start here.** |
| `prototypes/redirect/redirect-1-ask-the-goal.html` | **The recommendation.** Hover card with `WHY THIS PAPER` + the matched passage, and a quiet `not what you needed?` that asks the goal and returns an editable search. |
| `prototypes/redirect/redirect-{2,3,4}-*.html` | The three alternatives, each with for/against on the index. B is the one to pair with A. |
| `prototypes/why/index.html` + `why/option-{1..5}-*.html` | Where the passage-as-explanation decision came from: five sources for the line, priced by compute. Keep — the compute argument is the reason anyone should believe option 4. |
| `research/RELEVANCE.md` | The reasoning, costs and rejects for every round on this branch. |
| `research/{why,redirect}-prototypes-gen.py` | Generators. The prototypes in each set share a shell deliberately; edit the generator, not the outputs, or they drift. |

**Superseded, kept for the record.**

| File | Why it is still here |
|---|---|
| `prototypes/option-25-carry.html`, `option-26-gap.html` | Round 17, answering `BRIEF.md` directions 1 and 4. Good work, wrong question — the review redirected. The finding in Y (rank and use come apart at exactly the papers you would skip) is still true and still unused. |
| `prototypes/option-27-why.html`, `option-28-recourse.html` | Round 18. Overbuilt: a four-reason panel and a contestable-reason flow. `RELEVANCE.md` §5–6 records why, and §6's "two kinds of wrong teach different things" survived into the final reason chips. |
| `prototypes/why/option-4-flag.html` | The one-click flag. Its payload argument is sound; its visual treatment was the destructive one that got reverted. |

Nothing on this branch is a dead end that should be deleted. The rejects have been more
useful than the picks in every round, per `BRIEF.md`.

---

## 3. How to merge

Merge order does not matter, but **merge the two sibling tracks first if you want the
smaller conflict** — this branch has the most `index.html` churn (+167/−4), so resolving
it last means resolving it once against an already-merged file.

```
git checkout main
git merge explore/thread-split
git merge explore/thread-structure
git merge explore/relevance
```

### Conflict 1 · `prototypes/index.html` — expected, in all three merges

All three tracks add cards to the top and rows to the round list of the same file.
**Every edit is additive. Take both sides.** Specifically, this branch contributes:

- **Two `.latest` cards** at the top, before the round-16 card: `redirect/index.html`
  (`LATEST · TRACK A · ROUND 20 · START HERE`) and `why/index.html` (`TRACK A · ROUND 19`).
- **Four demoted `.latest` cards** — options 24, 25, 26, 27, 28 gained
  `style="border-width:1px"` and had their `.k` labels rewritten. If a sibling has also
  demoted the round-16 card, keep one copy.
- **Four `<section class="round">` blocks**: ROUND 20, 19, 18, 17.
- **One `.pill">latest`**, which must end up on exactly one row across the merged file.
- **`p.secsub`** reads `Twenty rounds.` — see §4; this needs a decision, not a merge.

### Conflict 2 · `research/HANDOFF.md` — likely, small

This branch adds four rows to the §2 ledger, one row to the §4 rejects table, and rewrites
one line in §3. `explore/thread-structure` touches one line. Additive; take both.

### No filename collisions

Checked across all three branches: the only shared paths are the twenty-four prototypes
inherited from main. Every new file has a distinct name, and this track's new work lives in
two new directories (`prototypes/why/`, `prototypes/redirect/`) that no sibling touches.

### After merging

```
cd prototypes && python3 -m http.server 4599
node scripts/shot.mjs http://localhost:4599/index.html /tmp/idx.png --full
```
`shot.mjs` exits non-zero on a console error, so it doubles as a smoke test. Every page on
this branch was clean at `b8c39a7`.

---

## 4. The numbering problem — needs a call, not a merge

**All three tracks independently used `option-25` through `option-28`, and all three claim
`ROUND 17`.** After merging, `prototypes/` contains three different option-25s:

```
option-25-carry.html     Track A · relevance
option-25-branch.html    Track B · thread-split
option-25-spine.html     Track C · thread-structure
```

The filenames do not collide, so git will not complain — but the number stops meaning
anything, and `option-29` exists on two branches meaning two different things.

Three ways out, cheapest first:

1. **Keep the numbers, scope the rounds.** Leave filenames alone; label every post-split
   section `TRACK A · ROUND 17` and so on. This branch's index rows already do this. Cost:
   `option-25` is ambiguous in conversation forever.
2. **Renumber on merge.** Track A becomes 25–28, B becomes 29–33, C becomes 34–38, by
   merge order. Cost: breaks every link in three `index.html`s, three research docs and
   eight commit messages. Not worth it.
3. **Move each track into its own directory** — `prototypes/relevance/`, `prototypes/split/`,
   `prototypes/structure/` — and let the numbers restart per track. Cost: one path rewrite
   per file, and the shared `index.html` becomes an index of indexes.

**Recommendation: 1.** The numbers were never a global identifier, they are a log. Option 3
is the right answer if a fourth track happens.

---

## 5. What did not change

So no one goes looking:

- No change to `app/`, `components/`, `scripts/guard.mjs`, or anything that builds or
  deploys. This track is prototypes and research only.
- No change to `research/LOOP.md`, `AUDIT.md`, `COMPETITIVE.md`, `BUILD.md`, `PLAN.md`.
- `research/cdl-tokens.css` untouched. The prototypes inline the same values; `guard.mjs`
  only scans `app|components|lib`, so raw hex in `prototypes/` does not fail the build —
  as has been true for all twenty-four earlier prototypes.
- No Pro messages were spent. Everything runs on the six papers captured before the split.

---

## 6. Carried forward, unresolved

| | Status |
|---|---|
| Five of six passage counts are invented; only Wienert's 27 is the product's own | Stated on every card and in the `RELEVANCE.md` ledger. Fine for a prototype, not for a slide. |
| Which sub-query found which paper | A judgement here, read off the query text. The agent knows it exactly. |
| A hover card is a poor home for a control on touch | Named in the for/against. On mobile the ask has to live on the row. |
| Whether a grey mono link is discoverable enough | The de-emphasis was the user's explicit call. If discovery is the problem, reveal it on row hover rather than making it accent again. |
| Direction B's threshold is set at three | Arbitrary, and the one number in this work that wants real usage data. |
