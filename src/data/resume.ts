export const profile = {
  name: 'Munawirul Hadi',
  role: 'Frontend Engineer',
  altRole: 'Fullstack Engineer',
  location: 'Bandung, Indonesia',
  phone: '+62 859 1069 79509',
  email: 'hadi.munawirul@gmail.com',
  github: 'https://github.com/heyhadi',
  linkedin: 'https://linkedin.com/in/heyhadi',
  summary:
    'I am a fullstack engineer (frontend focus) in Bandung with 5+ years on production systems — most recently as the top contributor and release manager for the React + TypeScript admin platform that operations and support staff at a Singapore-based car-sharing platform use every day. The work I own is the kind most teams put off: framework migrations, deploy pipelines, dependency automation, incident post-mortems.',
  facts: [
    { k: 'Location', v: 'Bandung, Indonesia · remote since 2022' },
    { k: 'Focus', v: 'React · Svelte · TypeScript' },
    { k: 'Scope', v: 'Three brands · three markets' },
    { k: 'Contact', v: 'hadi.munawirul@gmail.com' },
  ],
};

export const competencies = [
  'Release management',
  'Legacy modernization',
  'CI/CD pipelines',
  'Dependency automation',
  'Incident post-mortems',
  'Technical specifications',
];

// Scannable facts for the strip directly under the hero. Every number here is
// repeated in the case notes or experience bullets — keep them in sync.
export const stats = [
  { value: '3-week', label: 'release train, planned and signed off' },
  { value: '16 → 18', label: 'React majors shipped; Node 14 → 24 LTS behind audits' },
  { value: '0 → 25', label: 'dependency updates auto-merged monthly, from zero' },
  { value: '4', label: 'platforms with plugin-constrained AI codegen' },
];
