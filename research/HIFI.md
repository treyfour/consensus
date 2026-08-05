# HIFI.md — building the concept inside Consensus's real interface

`prototypes/hifi.html` is the same five acts as `prototypes/flow.html`, rebuilt in
Consensus's actual shell. The lo-fi stays exactly as it is: it is the argument.
This one is the argument wearing the product's clothes.

The rule for this build was **their pattern wins, always**. Where our interaction
and the shipped product disagreed, the product won and the bend is logged in §3.

Proof: `node scripts/drive-hifi.mjs` — 97 assertions, console clean, walks all five
acts end to end. Screenshots land in `/tmp` or `SHOTS=…`.

---

## 1 · What was matched, and against what

Everything here is copied from a captured screenshot of the live app, not from
memory. The screenshot is named in each row.

| Element | Source |
|---|---|
| Sidebar: New Thread · Home · My Library · History · Recents · Tools · Learn/Contact ↗ · account · `4 / 15 Pro messages left` · Upgrade | `screens/03` |
| Library sidebar: `← Back Home` · My Library · **Collections** tree · Zotero Import | `screens/09`, `screens/20` |
| Thread header: title · count · chevron · bookmark · settings · References · Share | `screens/03` |
| Agent trace: `Pro · 5 steps`, funnel `32.8M / 100 / 20` with ⓘ, three sub-queries with pool sizes and ↗, `Read  Abstracts and PDFs  20 ›`, `Select visuals  1 ›` | `screens/04`, `screens/05` |
| Answer: bold heading, `WIENERT 2022` citation chips, **Evidence Coverage** table with blue heat cells | `screens/03` |
| Composer: attached chip with the dark ✕ badge, `TAB →`, `+`, `Corpus ⌄`, `Deep +`, mic, blue circular ↑ | `screens/03` |
| References panel: `References / <query> ⌄`, `Results N`, save/export, three view toggles | `screens/05`, `screens/06` |
| Reference card: black rank badge · title · `KEY TAKEAWAY ·` · `N SUPPORTING QUOTES ›` · type badge · `2022 · 46 citations · B. Wienert et al.` · italic journal · `PDF` · checkbox | `screens/05` |
| Paper drawer: five tabs, title, date · authors, journal + `Q1 SJR score` green dots, citations, DOI + copy, abstract, floating `27 supporting quotes ⌄`, bottom action bar | `screens/03` |
| My Library: breadcrumb title, `+ Add ⌄`, `Share`, tabs **with icons and counts**, rounded search, data table, floating `N selected` pill | `screens/09`, `screens/10`, `screens/20` |
| Save popover: `Saved to My Library` master row, `Add to Collection`, `Search your Collections…`, rows with counts and `Updated today` | `screens/10` |

All colour, radius, spacing and type comes from `research/cdl-tokens.css` — 212
tokens read off the live app. `scripts/drive-hifi.mjs` asserts that no CSS rule
outside `:root` introduces a colour that is not either a token or one of six
documented exceptions (§4).

`CircularXXWeb` is licensed, so **Figtree** stands in as the metric substitute.
`Reddit Mono` is the real mono and is named exactly. Light theme only.

---

## 2 · What is ours, and where it was woven in

The concept adds one noun — the **note** — and nothing else.

- **Notes is the third thing the drawer can be.** The product already swaps that
  panel between References and the Paper detail. Notes joins them, opened from a
  `Notes` button placed beside `References` in the thread header. Its header uses
  the identical grammar References uses: `Notes / <the thread it belongs to> ⌄`,
  where References reads `References / <the query> ⌄`. Its control row mirrors
  `Results N` as `Cards N`.
- **WHY THIS PAPER** appears in exactly two places, both of which already existed:
  the reference hover card, and the head of the paper drawer's **Evidence (27)**
  tab. Evidence is the tab the product already fills with per-query matches; it
  simply never names the closest line or says which of the three searches produced
  it. That is the whole intervention.
- **`＋ Add to note`** sits on the hover card, on the paper drawer's action bar next
  to `Ask` and `Save`, and in the References selection row. Never `keep it`.
- **Recurrence** rides as one more badge in the reference card's existing badge row
  — `●●○○ 2 OF 3 SEARCHES` — because per-query rank already has a home (the black
  circle) and recurrence does not.
- **`＋ include my notes (N)`** is a pill in the composer's bottom row, next to
  `Corpus`. Corpus is the control that already answers *what am I searching*, so
  that is where an opt-in to search your own words belongs. Off by default.
- **`Notes (N)`** is a third tab in a collection, beside the product's `Items` and
  `Threads`.
- One sentence under the agent trace: *Consensus computes all of this to write the
  answer, then **discards it**.* Everything else in the concept follows from it.

---

## 3 · Where our interaction had to bend

Ten places. In every one the product's pattern won.

1. **Notes and References can never be on screen together.** The drawer holds one
   thing. The lo-fi put them side by side, which made drag-to-keep trivial.
   *Consequence:* the `Notes` **button** in the thread header is the drop target.
   Holding a drag over it for 650ms springs the panel open so a drop can be placed
   precisely (§4 — invented). Dropping straight onto the button keeps the drawer on
   References and the toast offers `View`.
2. **The lo-fi's floating action bar for reference selection is gone.** The product
   shows no floating bar in that panel (`screens/05`), and one would land on top of
   the composer. Selecting references now swaps the panel's own `Results N` row for
   `3 selected · ＋ Add 3 to note · Ask 3 · ✕`.
3. **No yellow note surface.** The lo-fi tinted the note panel warm. CDL has no
   note-paper token, so notes use `--cdl-bg-base` and `--cdl-border-base` like every
   other panel. The only colour in the note is the accent on an active filter chip.
4. **The note-switcher button became the panel header's switcher.** The lo-fi had a
   dedicated `NOTE from <thread>` button inside the panel. It is now the same
   `/ <name> ⌄` control References uses to switch query, in the same position.
5. **`＋ Library` became the product's Save popover** — master `Saved to My Library`
   row, `Add to Collection` label, collection search, rows carrying counts and
   `Updated today`.
6. **Emoji are gone.** Every icon is an inline stroke SVG at 1.6px, matching the
   product's icon weight. `🗒`, `💬`, `⊞`, `⣿` are all replaced.
7. **The library's note rows became a data table** with `From / What you wrote /
   Sources` columns, because `Items` and `Threads` are tables (`screens/09`,
   `screens/20`) and a third tab rendering as cards would not belong.
8. **Multi-note ask uses the product's floating `N selected` pill** (`screens/20`)
   with the ask field inside it, rather than the lo-fi's bespoke bar.
9. **The scoped-answer funnel line lost its box.** The lo-fi drew scoped turns in a
   tinted block. Here it is a single quiet line under the question, in the same
   position and weight as the agent trace it replaces.
10. **Library tabs carry counts on the collection view.** `screens/10` shows a
    collection's tabs *without* counts while `screens/09` shows them *with*. We show
    them everywhere. This is the one place we picked the more informative of two
    real variants rather than the one nearest to hand.

---

## 4 · What was invented, because no screenshot covers it

Declared so nobody mistakes it for observed behaviour.

**Interaction**
- The Notes panel in its entirety. Nothing like it ships.
- The spring-loaded `Notes` button (650ms hover during a drag opens the panel).
  This is a real pattern (macOS spring-loaded folders) but not one Consensus uses.
- `RAISED BY THE ANSWER · NOT IN YOUR NOTE` and `✓ IN YOUR NOTE` badges.
- The `✨` walkthrough key in the composer. A demo affordance, not a proposal.
- The library **root** view listing collections as a table with note and source
  counts. The real root shows `Items` and `Threads`; no capture shows a
  collections index.

**Colour outside the token set** — six values, all asserted by the driver:
`#a8d8fb` and `#5cb6f5` (the two middle steps of the evidence heat ramp; only the
darkest, `--cdl-accent-bg-base`, is a token), `#4f46e5` (account avatar),
`#a52a2a` (the Zotero mark), `#ffffff26` (toast action overlay), `#00000029`
(`--cdl-component-button-primary-border`, inlined).

**Data**
- Only **Wienert 2022's** `27` supporting quotes is real, read off the paper drawer.
  The other five counts are placeholders.
- Only **Wienert 2022's** DOI is captured. The other five papers show
  `not captured for this prototype` rather than a fabricated identifier that would
  resolve to nothing.
- `Q1 SJR score` dot counts are assigned per paper; only Wienert's Q1 is observed.
- The evidence table's `8 / 4` and `3 / GAP` cells are read off `screens/03`. The
  third row, `Post-delivery monitoring 2 / GAP`, is extrapolated.
- `KEY TAKEAWAY` text is written for five of six papers; only Wienert's is captured.
- Sub-thread pool sizes `31.7M / 656.6K / 442.8K` and the funnel `32.8M / 100 / 20`
  are **real**, and are the whole point.

---

## 5 · What did not change from the lo-fi

The rules in `research/LOOP.md` all still hold, and the driver still proves them:

- A note is thread-scoped. Nothing reaches My Library on its own.
- Sources dragged together arrive as **one** card.
- Ask attaches the note as scope — sources only, your own words an opt-in.
- A filter is a way of asking part of a note, so `Ask` follows the filter.
- A scoped answer that names a paper you did not keep must show that paper in
  References, marked, carrying **no rank** — computed, and it is Cancellieri, not
  Angelini.
- Nothing is ever removed. The redirect asks the goal, not the fault, and offers a
  search it never fires.
- Comparing two notes leaves My Library and lands in the thread, on a **fresh**
  note, so the panel never silently writes into one of the notes being compared.

---

## 6 · Known limits

- **Desktop only.** CDL defines `--cdl-breakpoint-tablet: 50rem` and
  `--cdl-breakpoint-desktop: 64rem`; this build targets 1440×900 and does not
  implement either breakpoint.
- **Light theme only.** Dark was explicitly out of scope. The token file carries a
  full dark ramp if it is ever wanted.
- `Snapshot`, `Attachment` and `Metadata` in the paper drawer are labelled stubs.
- The retrieval behind the second and third questions is keyword matching over six
  captured papers, and says so in its own funnel line.
