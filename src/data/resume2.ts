export const experience = [
  {
    title: 'Software Engineer II (Fullstack)',
    company: 'GetGo',
    dates: 'May 2022 — present',
    where: 'Remote · Singapore HQ',
    tagline:
      'Singapore car-sharing platform — customer web app, ops console, and fleet tooling for three brands (GetGo, Popcar, Zipzap) across Singapore, Malaysia, and Australia.',
    focus: ['React', 'TypeScript', 'Release management', 'Code review and mentoring'],
    bullets: [
      {
        lead: 'Top contributor and release manager',
        text: 'for the React + TypeScript ops console, on a three-week release train.',
        ref: 'ui',
      },
      {
        lead: 'Code review and mentoring',
        text: 'lead reviewer for the web team; onboard and mentor new engineers. The branching, dependency, and AI-coding standards I set are used beyond my own team.',
      },
      {
        lead: 'Customer-facing web',
        text: 'build features for the web app GetGo customers use, alongside the internal console.',
      },
      {
        lead: 'Modernization',
        text: 'React 16 to 18, Node 14 to 24 LTS, Bootstrap 4 to 5, each behind an audit and a regression checklist.',
      },
      {
        lead: 'CI/CD',
        text: 'dual-brand deploy-by-tag pipeline on AWS Amplify, replacing the manual step behind a production misrouting; 0 to ~25 dependency updates merged a month.',
        ref: 'deps',
      },
      {
        lead: 'Incidents',
        text: 'post-mortems for an admin auth outage; led the npm-worm and CVE supply-chain response.',
      },
      {
        lead: 'Fleet tooling, solo',
        text: 'two Svelte + TypeScript apps, plus Go and C#/.NET services with BDD tests.',
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
        lead: 'Schema and APIs',
        text: 'designed the relational schemas and built the Node.js/Express REST APIs behind the licensing workflow.',
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
    body: 'Operations and support staff run bookings, billing, and customer cases through this console. I built the parts they touch most — filterable tables, multi-step validated forms, receipts, QR payments, bulk toll charging — and I run its release train.',
    result: 'Billing rule changes ship as regular releases, not hotfixes: three-week cuts to two brands across three markets, behind regression checklists and sign-off.',
    tags: ['React', 'TypeScript', 'Redux'],
    scope: '2 brands · 3 markets · 3-week train',
  },
  {
    id: 'deps',
    visual: 'dependabot',
    title: 'Making dependency updates boring',
    context: 'Dependabot · Husky · SonarJS · accessibility rules',
    body: 'Two production repositories had no routine dependency maintenance. I set up Dependabot with patch-only auto-merge, a curated block list, and a weekly review rotation.',
    result: 'From zero to roughly twenty-five updates merged a month, adopted across the web repositories.',
    tags: ['Dependabot', 'Husky', 'SonarJS'],
    scope: '2 repos · 0 to ~25 merges a month',
  },
  {
    id: 'ai',
    title: 'Keeping AI-written code honest',
    context: 'Internal AI coding plugin · 21 skills · 10 agents',
    body: 'Generated code was passing checks while regressing types and validation. I packaged our conventions into a plugin — repository, platform, and global layers — that constrains and reviews AI-written code on web, Android, iOS, and backend.',
    result: 'A before-and-after trial removed the type-safety and validation regressions an unguided agent had introduced. 21 skills, 10 agents, 4 platforms.',
    tags: ['Conventions', 'Agents', 'Playwright'],
    scope: '21 skills · 10 agents · 4 platforms',
  },
];

export const posts = [
  {
    slug: 'upgrading-react-16-to-18',
    title: 'Upgrading React 16 to 18 without freezing the roadmap',
    summary:
      'A console several majors behind, a team still shipping features, and a release train that could not stop. The upgrade worked because it was treated as a series of small, audited releases — not a project.',
    tags: ['React', 'Migration', 'Release management'],
    blocks: [
      {
        h: 'Audit before you touch package.json',
        p: [
          'Every major starts with a written breaking-change audit: read the changelog and the migration guide, then search the codebase for each pattern they mention. The point is not to be thorough for its own sake. It is to turn "upgrade React" from a vague fear into a list someone can estimate, split, and review.',
          'For React 18 the audit is short, but every line on it can bite:',
          {
            list: [
              'ReactDOM.render and hydrate → createRoot and hydrateRoot. Usually only the entry points.',
              'Automatic batching. Search for code that reads the DOM or state between two setState calls inside a promise, timeout, or native event handler.',
              'StrictMode runs effects twice in development. Every useEffect that subscribes, polls, or opens a socket needs a cleanup.',
              '@types/react 18 drops the implicit children prop from React.FC. Every component that renders props.children without declaring it fails to compile.',
              'Third-party peer ranges. Anything pinned to react@^16 || ^17 needs an upgrade or a replacement before the bump.',
            ],
          },
          'Each line gets a count of affected files and an owner. A five-line list with numbers next to it is something a reviewer can sign off; "upgrade React" is not.',
        ],
      },
      {
        h: 'The changes that actually bite',
        p: [
          'The entry point is the easy part, and the one most guides lead with:',
          {
            code: `// React 16 / 17
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// React 18
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);`,
          },
          'Until you make that switch, React 18 runs in legacy mode, so the version bump can be its own release with the new behaviour turned on in the next. That alone takes half the risk out of the upgrade.',
          'Automatic batching is the quiet one. In React 17, state updates inside a promise callback rendered one at a time; in 18 they are batched into a single render:',
          {
            code: `fetchBooking(id).then((booking) => {
  setBooking(booking);
  setLoading(false);
  // React 17: two renders. React 18: one.
});`,
          },
          'For almost every component that is a free performance win. It breaks only code that quietly depended on the intermediate render — measuring a node or scrolling into view between the two updates. flushSync is the escape hatch, and the audit tells you exactly where to use it.',
          'StrictMode double-mounting is the loud one, and it is worth welcoming rather than silencing. It surfaces effects that subscribe without cleaning up — bugs that already existed and simply were not visible yet:',
          {
            code: `useEffect(() => {
  const timer = setInterval(refresh, 30_000);
  return () => clearInterval(timer); // without this, StrictMode starts two timers
}, [refresh]);`,
          },
        ],
      },
      {
        h: 'One upgrade line per release',
        p: [
          'React, Node, the UI kit, and the component library each moved on their own, never in the same cut. When something breaks after a release that changed one thing, you know what broke it. When it breaks after a release that changed four, you spend the afternoon bisecting instead of fixing.',
          'Node gets the same treatment as React: the audit covers the CI image, the engines field in package.json, and any native modules that need a rebuild. Going from 14 to 24 LTS is a long jump on paper, but each step is a small, boring release.',
          'Small steps also let each upgrade ride the normal release train alongside feature work, instead of waiting for a dedicated "migration sprint" that never gets approved.',
        ],
      },
      {
        h: 'The regression checklist is the real deliverable',
        p: [
          'An upgrade is only done when the flows people use every day have been walked through on staging. The checklist is written before the upgrade lands, so "it works on my machine" never stands in for "it works for operations". A shortened version of the shape:',
          {
            list: [
              'Create, edit, and cancel a booking.',
              'Take a transaction through to a receipt, including the price breakdown.',
              'Open, update, and close a customer case.',
              'Run a bulk action on a filtered table.',
              'Sign out and back in; an expired session redirects cleanly.',
            ],
          },
          'None of these test React. They test what React is for. That is why the same checklist works for the Node upgrade, the UI-kit upgrade, and the next one nobody has planned yet.',
        ],
      },
      {
        h: 'Spike the risky part, then decide',
        p: [
          'Not every upgrade belongs on the roadmap straight away. A bundler migration got a time-boxed spike first: enough to see what breaks and what it would cost, written down so the decision could be made on evidence instead of enthusiasm.',
          'The audits are the part that outlives the upgrade. The next major starts from the last audit as a template, which is the closest thing a frontend team has to making upgrades boring.',
        ],
      },
    ],
  },
  {
    slug: 'ai-assistance-needs-acceptance-criteria',
    title: 'AI assistance needs acceptance criteria, too',
    summary:
      'Generated code passed every check and still regressed types and validation. What worked was treating the tool like a deploy: constrained, reviewed, and measured on a before-and-after trial.',
    tags: ['AI codegen', 'Review', 'Playwright'],
    blocks: [
      {
        h: 'The regressions passed the checks',
        p: [
          'When engineers on my team started using an unguided coding agent, the output sailed through the usual gates. It introduced type-safety and validation regressions that only showed up in review — the class of defect that looks right at a glance. The pipeline said green; the humans said wait.',
          'The lesson was not that the tool was bad. It was that a generator, like any contributor, needs the conventions written down: what must hold, how to check it, and what counts as done. An unguided agent inherits none of that from your codebase.',
        ],
      },
      {
        h: 'Constrain, then review',
        p: [
          'I packaged our conventions into a plugin with three layers — repository, platform, global — that constrains and reviews generated code across web, Android, iOS, and backend. The key move was keeping the layers separate: what is true everywhere lives globally, what is true on one platform lives on that layer, and the repo layer carries the quirks no one else should inherit.',
          'A controlled before-and-after trial on the same work removed the type-safety and validation regressions the unguided agent had introduced. Trial, not vibes: the same checks, run against the same class of change, so the team can accept AI assistance without dreading review.',
        ],
      },
      {
        h: 'What I carry into the next team',
        p: [
          'Acceptance criteria are not a review nicety for generated code — they are the interface between the tool and the codebase. Write them down before enabling the tool, and the trial can be about the tool instead of about trust.',
        ],
      },
    ],
  },
];
