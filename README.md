# Hematology Master

Pediatric-first, adult-complete hematology for trainees and clinicians. Everything is evidence-cited and current to late 2026.

**Live:** https://hematology-master.vercel.app

## What’s inside

| | |
|---|---|
| **12 modules, 109 sections** | Foundations → neonatal → anemia → hemolysis → sickle cell/thalassemia → marrow/WBC → leukemia → lymphoma/plasma cells → platelets → bleeding → thrombosis → transfusion |
| **Population tags** | Every section, question and case is tagged **Peds**, **Adult** or **Peds + Adult**. A global focus toggle filters them. |
| **192 questions** (140 pediatric) | Single-best-answer with explanations. Practice or exam mode, filtered by module or population. “Missed last time” drills. |
| **31 stepwise cases** | Decide → see the result → decide again (26 pediatric, 88 decision points). |
| **11 tools** | Age/sex-aware CBC interpreter, anemia work-up, iron studies (AAP 2026/WHO), hemolysis, smear atlas + flashcards, leukemia red flags, coagulation, transfusion reactions, newborn screen decoder, scores (4Ts, PLASMIC, ISTH DIC, HLH-2004), bedside calculators. |
| **Evidence** | 116 references with links. Inline citations, “What’s new” timeline built from `:::update` callouts. |
| **Offline** | Installable PWA; progress is stored locally in the browser only. |

## Editing content (no code needed)

Content lives in Markdown under `src/content/`:

- `modules/<id>.md`: one file per module (ids in `src/content/modules.ts`)
- `questions/<id>.md`: exam-style question bank for that module
- `cases/*.md`: stepwise clinical cases
- `refs.ts`: the reference registry

### Dialect

```md
## Section title {peds #section-id refs=ash-itp-2019,aap-iron-2026}
Population tag is required: peds | adult | both.

Inline: cite with [@ash-itp-2019]; mark a sub-point with [[peds]] or [[adult]].
Link internally: [ITP](/learn/platelets#itp-peds), [calculator](/tools/calculators).

:::pearl Optional title          (pearl | pitfall | redflag | update | algo | mnemonic)
Markdown…
:::

:::update Title {year=2026}      ← also appears on the What’s New page
:::

:::check peds #optional-id sec=section-id refs=a,b
Question stem
- [ ] distractor
- [x] correct answer (exactly one)
- [ ] distractor
> Explanation
:::
```

Cases: `# Case title {peds #case-id module=anemia}`, a teaser line, then `## Stage` blocks, each optionally ending in a `:::check`.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit + content-integrity tests (vitest)
npm run lint
npm run build
npx vite preview --port 4173 & npm run test:e2e   # browser smoke test (Playwright)
```

### What the tests guarantee

- Every section has a population tag. Every question has exactly one correct answer, ≥ 3 options and an explanation.
- Every citation resolves to a registry entry. Every internal link (in content and in code) points to a real module, section, tool or case.
- Clinical logic (reference ranges, RPI, Mentzer, transfusion/iron/factor dosing, 4Ts, PLASMIC, DIC, HLH-2004, interpreters) is checked against worked examples from the modules.
- The smoke test loads every route at phone and desktop widths, failing on console errors, missing headings or horizontal overflow.

## Deploy

Vercel auto-deploys `main`. `vercel.json` rewrites all paths to `index.html` so deep links work on refresh.
