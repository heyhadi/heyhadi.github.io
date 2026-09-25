import { useState } from 'react';

/**
 * Interactive release-train timeline for case note 01.
 * Abstracted on purpose: no release data, ticket IDs, or product names.
 */
const STAGES = [
  {
    key: 'plan',
    label: 'Plan',
    detail: 'Scope frozen, changelog drafted, per-brand impact listed before anyone writes code.',
  },
  {
    key: 'build',
    label: 'Build',
    detail: 'Feature work lands behind pull-request review and the usual checks.',
  },
  {
    key: 'regression',
    label: 'Regression',
    detail: 'Checklist run against staging: bookings, transactions, billing, cases, auth.',
  },
  {
    key: 'signoff',
    label: 'Sign-off',
    detail: 'A named reviewer gates the cut, with written release notes attached.',
  },
  {
    key: 'tag',
    label: 'Tag',
    detail: 'A branch-validated tag is the only thing that can release code.',
  },
  {
    key: 'deploy',
    label: 'Deploy',
    detail: 'The branch and the tag choose the destination — not a person at midnight.',
  },
];

export function ReleaseTrain() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <figure className="figure figure-train">
      <div className="fig-head">
        <span className="fig-title">One release cycle</span>
        <span className="fig-meta">3 weeks · every brand, every market</span>
      </div>

      <ol className="train">
        {STAGES.map((s, i) => {
          const cls = ['station'];
          if (i === active) cls.push('is-active');
          if (i <= active) cls.push('is-done');
          return (
            <li key={s.key}>
              <button
                type="button"
                className={cls.join(' ')}
                aria-current={i === active ? 'step' : undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="station-dot" aria-hidden="true" />
                <span className="station-label">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="train-detail" aria-live="polite">
        <b>{stage.label}</b>
        <span>{stage.detail}</span>
      </div>

      <figcaption>Generic by design — no release data, ticket IDs, or product names.</figcaption>
    </figure>
  );
}
