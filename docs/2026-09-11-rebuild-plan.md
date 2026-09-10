# mohiemen.com rebuild plan

**Date:** 2026-09-11
**Direction chosen:** measured document (the time-and-motion study, your own trade's vernacular)
**Scope chosen:** full rebuild (design system, copy, page structure)
**Brief:** the site must position M A Mohiemen Tanim as the founder of Intelactory,
and prove that he is specifically the person who could have built it.

---

## 0. Owner decisions, 2026-09-11

1. **Writing page: deleted.** The TexSPACE Today editorship survives as a fact in
   the career section (Managing Editor, TexSPACE Today), not as a page.
2. **The mapping table stays private.** Client-project to module linkage is not
   published. Section 1 below is rewritten accordingly: the argument is made
   through problem classes and practitioner vocabulary instead, and no row on the
   site connects a named client to a named module.
3. **Photography: use the 160px avatar for now**, sized small and treated as a
   plate rather than a hero portrait. A real photograph replaces it later. The
   360px portrait is not used.
4. **No client factory names anywhere on the site. Counts only.** Applied
   consistently: the problem inventory shows a recurrence count instead of a
   "where" column, and the register page keeps every technical project
   description verbatim while dropping the organisation names that currently
   head each row. The descriptions are the credential; the names were only ever
   supporting evidence, and dropping them also settles the confidentiality
   question in decision 2. Reversible if the owner wants names restored.

---

## 1. The argument the site has to make

A founder site fails when it *claims* credibility. This one has to demonstrate
it. The original plan proved it with a public table mapping each client project
to the Intelactory module it became. The owner has ruled that table private, so
the argument is made a different way, with nothing weaker about it.

**The proof is the vocabulary, and the repetition.**

A generalist founder can describe a factory. Only a practitioner writes
"minimising dia-GSM variation on larger-dia fabric by standardising the process
from knitting to finishing", or "lycra dropout", or "bulk-to-bulk right-first-time",
or "neps-optimised combed yarn". That language cannot be researched into
existence convincingly, and every phrase of it is already sitting in his own
public register. The site's job is to stop burying it.

So the spine becomes a **problem inventory**: the failure classes he has been
called into factories to fix, stated in the language of the floor, with the count
of how many times each recurred across his register. Recurrence is the argument.
One dyeing project is a job. Six right-first-time and shade-variation projects
across five separate mills is a pattern, and a pattern is what justifies building
software.

The classes, derived from his own register. Owner decision 4 applies here too:
counts only, no organisation named, in this document as well as on the site.

| Failure class | Projects |
|---|---|
| Water, steam and energy consumption per shade depth | 6 |
| Neps and yarn quality upstream of the dyehouse | 3 |
| Dimensional variation: dia, GSM, shrinkage, lycra dropout | 3 |
| Right first time, lab to bulk and bulk to bulk | 2 |
| Denim wash defects: shrinkage and elastane breakage | 2 |
| Store and inventory synchronisation | 2 |
| Chemical management and wastewater, ZDHC | 1 |
| Pre-consumer waste returned to fabric | 1 |
| Production planning without live data | 1 |
| Changeover time and operator capability | 1 |

Then one sentence, once, connecting it to the product: these are the problems
Intelactory is built on. **No row names a module.** The reader is told what he
has fixed, repeatedly, by hand, and told that the platform comes from that. The
inference is left to them, which is stronger than the claim anyway.

Editorial rule for the whole rebuild: the site never says he is credible. It
shows the work at the level of the problem, in the practitioner's own words, and
lets the reader conclude.

## 2. What is wrong with the current site

Recorded so the rebuild is measured against something, not just "better".

**No systems.** Thirteen distinct font sizes, including 11.5, 12.5, 13.5, 14.5,
15.5 and 17.5. Twenty-four distinct spacing values between 2px and 84px with no
ratio. Sizes chosen one at a time are the clearest signal that nobody set a scale.

**No typographic voice.** Inter carries display and body, so nothing has a
character. IBM Plex Mono is used as a decorative label face in fourteen places
(kickers, tags, dates, periods, chips, form labels, footer). Mono-as-small-label
is one of the most recognisable generated-page tells.

**Slowest possible font loading.** `@import url(fonts.googleapis.com)` inside the
stylesheet, which serialises: HTML, then CSS, then Google's CSS, then the font
files. It also means the page depends on a third party to render correctly.

**Two real bugs.**
1. Keyboard focus is dead on the contact form. `.contact-field input:focus`
   sets `outline: none` at specificity (0,2,1) and beats the global
   `input:focus-visible` outline at (0,1,1).
2. The primary button hover is `#1D2A55`, a navy that is in no token, while the
   palette's own `--indigo-deep: #1B34A8` is defined and never used.

**A stock headline move.** `<span class="accent">` colours the back half of the
sentence, trailing full stop included: "Systems thinking for *manufacturing
operations.*" Colouring the period gives away that it was applied to a span
rather than composed.

**Nothing in it is about him.** No trace of industrial engineering, the textile
floor, or Dhaka. The same stylesheet would suit a crypto advisory unchanged.
That, more than any single flaw, is why it reads as unprofessional.

What is worth keeping: plain rows instead of cards, borders instead of drop
shadows, a single accent, one hero reveal, and `prefers-reduced-motion` already
respected. The bones are sound; the surface has no point of view.

---

## 3. Design system

### Colour

Five values. The concept is ink on drafting paper, with one colour reserved
strictly for measurement.

```
--paper     #F6F7F5   graph-paper bone, cool green-grey bias, not cream
--ink       #14171A   printing-ink black with a blue cast
--graphite  #5B6167   secondary text, pencil rather than grey
--rule      #CDD2CE   drafting line
--measure   #B42318   marked-up red: dimension marks, current state, corrections
```

Contrast against `--paper`, measured rather than assumed:

```
ink       16.74:1   AAA
graphite   5.83:1   AA
measure    6.12:1   AA        (and 6.57:1 for paper-on-measure)
rule       1.43:1   decorative only
```

`--rule` is deliberately faint and must never be the only indicator of anything.
It draws dividers. Any boundary that carries meaning uses `--graphite` instead,
which clears the 3:1 needed for a non-text indicator.

**The rule that makes the palette mean something:** `--measure` appears only
where something is genuinely measured or marked. Dimension ticks, the "now" point
on the career line, an active filter, a required-field mark. It never colours a
button, a heading, or a hover state for decoration. If it is not a measurement,
it is ink.

Deliberately avoided: the cream-plus-serif-plus-terracotta combination and the
near-black-plus-acid-accent combination, both of which are current generated-page
defaults. Indigo is dropped entirely; it belonged to Intelactory's product UI, and
borrowing the product's accent for the founder's own site inverts the relationship.

### Type

Two families, both self-hosted as woff2 in `fonts/`, preloaded in `<head>`. No
third-party font request, which also removes the render-blocking `@import`.

- **Archivo** for display, figures and labels. A squarish industrial grotesque,
  set with `font-variant-numeric: tabular-nums` everywhere digits appear, because
  every figure on this site sits in a column or on a rule.
- **Source Serif 4** for body copy. A screen-tuned text serif, not a display
  serif. It carries the "document" idea and makes long project descriptions
  genuinely readable.

Monospace is removed from the site completely. That single deletion changes the
feel more than any other decision here, because mono was doing decorative work in
fourteen places.

**Type scale**, one ratio (1.25, major third), seven steps, replacing thirteen
arbitrary sizes:

```
52 / 42 / 33 / 27 / 21 / 17 / 14      base 17, serif body at 1.65 line-height
```

Serif body gets more line-height than the old sans did, per standard practice.
Measure stays under 72 characters for the serif.

**Spacing scale**, ten steps replacing twenty-four ad-hoc values:

```
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
```

### Layout

An asymmetric two-column grid. The narrow left column is a persistent
**measurement rail** carrying figures: years, counts, project numbers, module
names. The wide right column carries prose. Section breaks are drawn as
**dimension lines**, a hairline with tick ends, with the figure sitting on the
rule rather than inside a box.

Content is left-aligned throughout, ragged right. Nothing is centred except the
single closing line of the site.

```
        rail            prose column
   ┌──────────┬───────────────────────────────────┐
   │ 2014     │  Eleven years measuring how       │
   │ ├────────┤  factories actually run.          │
   │ │        │                                   │
   │ │        │  Industrial engineer. Innovation  │
   │ 2019 ────┤  programmes across Bangladesh's   │
   │ │        │  textile, apparel and leather     │
   │ │        │  industry.                        │
   │ 2023 ────┤                                   │
   │ │        │                                   │
   │ 2026 ●───┤  ← measure red marks "now"        │
   └──────────┴───────────────────────────────────┘
```

No cards, no shadows, no border radius above 2px. This is a document. Documents
have rules and columns.

### Motion

One orchestrated moment: on load, the career dimension line draws from 2014 down
to 2026 and the red "now" mark lands last. Roughly 900ms, once, never repeated,
fully disabled under `prefers-reduced-motion`. Nothing else on the site animates
except focus and hover state changes.

---

## 4. Page structure

Five pages become four. The reasoning matters more than the count.

| Now | After | Why |
|---|---|---|
| `index.html` | `index.html` | Rebuilt around the argument in section 1 |
| `projects.html` | `register.html` | Renamed to what it is, and gains the module-mapping column |
| `intelactory.html` | `intelactory.html` | Kept, deepened |
| `blog.html` | **removed for now** | See below |
| `contact.html` | folded into `index.html` | See below |

**Removing the writing page, for now.** It currently lists three posts, all
marked DRAFT, above a notice admitting they are placeholders. On a site whose
entire job is to prove substance, three fake articles and a confession are the
single most damaging element present. The honest move is to delete the page and
put one real line in the footer: Managing Editor, TexSPACE Today. When real
articles exist, the page returns with real articles. This is a recommendation,
not a decision already taken.

**Folding contact into the home page.** Contact holds four facts: email, phone,
LinkedIn, IEB membership. That does not need a page, and the mailto form is worse
than a plain email link because it opens a mail client unexpectedly and loses the
message if the client is not configured. The four facts become a closing block on
the home page. The form goes.

---

## 5. Home page composition

The order is the argument.

1. **Identity line.** Name, role, city. One line, no hero image, no eyebrow label.
2. **The career dimension line.** The hero is a measured drawing of his own
   eleven years, 2014 to 2026, with four stations marked and the Intelactory
   point in red. This is the most characteristic object in his world: a
   time-and-motion study, applied to himself. It replaces a headline with a
   demonstration.
3. **The claim, once, in one sentence.** Something close to: "I spent eleven
   years measuring how factories run. Intelactory is that work, written down."
   Stated once and never repeated.
4. **The register is the spec.** The section from part 1. Left column the field
   project, right column the module it became, dimension marks connecting them.
   Around eight rows on the home page, with the full set on the register page.
5. **Current work.** The AFD-funded ZDHC programme with Amin and Jahan, which is
   live and is the strongest single credential on the site.
6. **Career stations.** The four roles, as a plain table, no timeline dots.
7. **Contact block.** Email, phone, LinkedIn, IEB. Four lines, no form.

---

## 6. Copy corrections

Facts that are currently inconsistent or weak, to be fixed while rebuilding:

- "11 yrs" in the stat row against "eleven years" in the lede. Pick one. Spelled
  out in prose, numeral on the rail.
- "15+ textile, apparel and leather clients" against a register naming fourteen
  distinct organisations plus four more from the prior cycle. State the real
  number and let the register back it.
- "20+ innovation projects led since 2023" is the strongest number on the site and
  is currently buried in a three-up stat row. It belongs on the rail beside the
  register.
- Two headlines currently end with a coloured full stop inside a span. Both get
  rewritten as composed lines.
- Every "↗" appended to link text is removed. The arrow-in-link-text pattern is
  template chrome.

---

## 7. Build order

Each step ends somewhere the site still works.

1. `fonts/`: download and subset Archivo and Source Serif 4 to woff2, add
   `<link rel="preload">`, delete the Google Fonts `@import`.
2. `css/style.css`: replace `:root` with the five colours, seven type steps and
   ten spacing steps. No other change yet, so the diff is reviewable.
3. Rebuild components against the tokens: rail, dimension line, register table,
   station table. Delete `.chip`, `.spotlight`, `.timeline`, `.stat-row`,
   `.proj-row`, `.post-row`, `.meta-line` and every mono rule.
4. Fix the two bugs: remove `outline: none` from `.contact-field input:focus`
   (the whole form is going, but the pattern must not survive into the new CSS),
   and delete the off-palette `#1D2A55`.
5. Rebuild `index.html` in the order in section 5.
6. `register.html` with the module-mapping column, filters kept but restyled
   without mono.
7. `intelactory.html` deepened with the same mapping argument.
8. Remove `blog.html` and `contact.html`, add redirects in the nginx config so
   the old URLs do not 404 for anyone who has them.
9. Check: keyboard tab through every page, 320px width, `prefers-reduced-motion`
   on, and colour contrast on `--graphite` and `--measure` against `--paper`.
10. Deploy by `git push` then `git pull` on the server, then re-apply 644/755
    permissions since new files arrive from git.

---

## 8. Open questions for the owner

1. **Writing page:** delete until real articles exist, as recommended, or keep it
   with the drafts removed and a link to TexSPACE Today?
2. **The mapping table is public.** It reveals which Intelactory modules exist and
   which client projects seeded them. Client names are already public on the
   current register, so this adds the module side only. Confirm that is fine.
3. **Photography:** the current portrait and avatar are 360px and 160px JPEGs.
   For a founder site the portrait wants to be larger and better lit. Use as is,
   or is a better source file available?
