export const experience = [
  {
    title: 'Fullstack Engineer',
    company: 'Singapore-based car-sharing platform',
    dates: 'May 2022 — present',
    where: 'Remote · Singapore HQ',
    tagline:
      'Car-sharing and fleet operations for three brands across three markets, from a Singapore-headquartered platform.',
    focus: ['Release management', 'Legacy modernization', 'CI/CD', 'Dependency automation'],
    bullets: [
      {
        lead: 'Top contributor and release manager',
        text: 'for the ops admin console (React, TypeScript, Redux) — bookings, transactions, billing, cases. Three-week release train with plans, regression checklists, sign-off gates.',
      },
      {
        lead: 'Booking and billing UI',
        text: 'filterable tables, multi-step validated forms, receipts and price breakdowns, QR payments, bulk toll charging. Wrote the spec for a cross-border driving programme.',
      },
      {
        lead: 'Console modernization',
        text: 'UI kit and component library majors, React 16 to 18, Node 14 to 24 LTS, legacy theme removal, bundler spike — each behind an audit and a regression checklist.',
      },
      {
        lead: 'Gitflow + deploy by tag',
        text: 'authored the branching strategy and the branch-validated multi-brand pipeline, replacing a manual process that caused a production misrouting.',
      },
      {
        lead: 'Dependency automation',
        text: 'Dependabot with patch-only auto-merge, a block list and a weekly rotation: 0 to ~25 updates a month. Added Husky, lint-staged, SonarJS and a11y rules.',
      },
      {
        lead: 'Internal AI coding plugin',
        text: '21 skills + 10 agents over repo, platform and global conventions. A trial removed the type-safety regressions an unguided agent had introduced.',
      },
      {
        lead: 'Incident work',
        text: 'post-mortems for an admin auth outage and deploy-webhook telemetry corruption; led the npm-worm and CVE supply-chain response, including secret removal.',
      },
      {
        lead: 'Fleet tooling',
        text: 'two Svelte + TypeScript apps owned solo — carpark, fuel cards, charging lots, maintenance — plus solo REST services in Go and C#/.NET with BDD tests.',
      },
    ],
  },
  {
    title: 'Backend Developer',
    company: 'PT Majapahit Teknologi',
    dates: 'Apr 2021 — Apr 2022',
    where: 'Jakarta · seconded to BKPM',
    tagline: 'OSS-RBA — national business-licensing platform for Indonesia, built at BKPM.',
    focus: ['Node.js + Express', 'Relational schemas', 'REST APIs'],
    bullets: [
      {
        lead: 'Schema and backend',
        text: 'designed the relational schemas and implemented the Node.js/Express modules behind the licensing workflow.',
      },
      {
        lead: 'API delivery',
        text: 'built and maintained the Node.js REST APIs the platform web clients consumed.',
      },
    ],
  },
];

export const projects = [
  {
    id: 'ui',
    visual: 'release-train',
    title: 'Booking and billing interfaces people use all day',
    context: 'Ops admin console · React, TypeScript, Redux · internal tool',
    body: 'Operations and support staff run bookings, transactions, billing, and customer cases through this application. I built the interfaces they touch most: filterable data tables, multi-step validated forms, receipts and price breakdowns, QR payments, bulk toll charging. Tables handle large datasets without jank; forms validate inline with accessible error messaging; the billing views were written against a spec I authored for a cross-border driving programme.',
    result: 'Fewer support escalations from broken flows; new billing rules ship as form and table changes, not hotfixes. Three-week release cuts across three brands and three markets, behind plans, QA regression checklists, and reviewer sign-off.',
    tags: ['React', 'TypeScript', 'Redux'],
    scope: '3 brands · 3 markets · 3-week train',
  },
  {
    id: 'fleet',
    title: 'Owning fleet tooling end to end',
    context: 'Svelte and TypeScript · Go · C# and .NET',
    body: 'I own two fleet and dealer applications — carparks, fuel cards, case management, charging lots, vehicle maintenance — and their release notes. When a feature needed a service, I built it solo from schema to interface: a user-notes service in Go and cancellation-reason handling in C#, each with tests and its admin UI.',
    result: 'No handoff queues. Schema, service, and interface from one person.',
    tags: ['Svelte', 'Go', 'C#/.NET'],
    scope: '2 apps owned solo · schema to interface',
  },
  {
    id: 'modernization',
    visual: 'migration',
    title: 'Modernizing a codebase nobody wanted to touch',
    context: 'React 16 to 18 · Node 14 to 24 LTS · bundler migration spike',
    body: 'The console had years of deferred upgrades: UI kit and component library majors behind, a legacy theme to remove, React and Node several majors behind. I wrote a breaking-change audit before each step and shipped each upgrade behind a regression checklist, so production never received an unverified migration.',
    result: 'A codebase on supported majors with a repeatable audit-then-verify pattern for the next upgrade.',
    tags: ['Migration', 'Vite', 'Node LTS'],
    scope: 'React 16 to 18 · Node 14 to 24 LTS',
  },
  {
    id: 'gitflow',
    title: 'Replacing deploys done by memory',
    context: 'Gitflow · managed hosting · branch-validated deploy by tag',
    body: 'Deploys used to depend on someone remembering the right manual steps, and a misrouted production incident proved it. I wrote the web team branching strategy and built it into CI as a deploy-by-tag workflow covering every brand, so the branch and the tag decide where code goes, not a person at midnight.',
    result: 'An entire class of misrouting incidents is now structurally impossible.',
    tags: ['Gitflow', 'Hosting', 'CI'],
    scope: 'multi-brand · tag-driven deploys',
  },
  {
    id: 'deps',
    visual: 'dependabot',
    title: 'Making dependency updates boring',
    context: 'Dependabot · Husky · SonarJS · accessibility rules',
    body: 'Two production repositories had no routine dependency maintenance. I set up Dependabot with patch-only auto-merge, a curated block list, and a weekly review rotation, plus pre-commit lint automation.',
    result: 'From zero routine updates to roughly twenty-five merged a month, adopted across the web repositories. Security and freshness handled by pipeline and rotation.',
    tags: ['Dependabot', 'Husky', 'SonarJS'],
    scope: '2 repos · 0 to ~25 merges a month',
  },
  {
    id: 'ai',
    title: 'Keeping AI-written code honest',
    context: 'Internal AI coding plugin · 21 skills · 10 agents',
    body: 'I packaged our conventions into a plugin with three layers — repository, platform, global — that constrains and reviews generated code across web, Android, iOS, and backend.',
    result: 'A controlled before-and-after trial removed the type-safety and validation regressions an unguided agent had introduced. 21 skills, 10 agents, 4 platforms — AI assistance the team can accept without dreading review.',
    tags: ['Conventions', 'Agents', 'Playwright'],
    scope: '21 skills · 10 agents · 4 platforms',
  },
];
