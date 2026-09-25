/**
 * Two-lane dependency pipeline for the automation case note.
 * Illustrates the policy, not any real repository state.
 */
const LANES = [
  {
    tone: 'go',
    tag: 'Patch + minor',
    steps: ['Dependabot PR', 'CI, lint, a11y', 'Auto-merge'],
  },
  {
    tone: 'hold',
    tag: 'Major',
    steps: ['Dependabot PR', 'Block-list check', 'Manual review'],
  },
];

export function DependabotFlow() {
  return (
    <figure className="figure figure-flow">
      <div className="fig-head">
        <span className="fig-title">Two lanes for dependency work</span>
        <span className="fig-meta">0 → ~25 merges a month</span>
      </div>

      <div className="lanes">
        {LANES.map((lane) => (
          <div className={`lane lane-${lane.tone}`} key={lane.tag}>
            <span className="lane-tag">{lane.tag}</span>
            <div className="lane-steps">
              {lane.steps.map((step, i) => (
                <span className="lane-step" key={step}>
                  {step}
                  {i < lane.steps.length - 1 ? (
                    <span className="lane-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <figcaption>
        A weekly review rotation sits on top of the pipeline. Majors never auto-merge.
      </figcaption>
    </figure>
  );
}
