/**
 * Before / after path for the modernization case note.
 * Shapes and labels only — nothing that identifies the codebase.
 */
export function MigrationPath() {
  return (
    <figure className="figure figure-flow">
      <div className="fig-head">
        <span className="fig-title">How each upgrade ran</span>
        <span className="fig-meta">audit → ship → verify</span>
      </div>

      <div className="flow">
        <div className="flow-col">
          <span className="flow-tag">Before</span>
          <ul>
            <li>React 16</li>
            <li>Node 14</li>
            <li>UI kit and component library majors behind</li>
            <li>Legacy theme still shipped</li>
          </ul>
        </div>

        <div className="flow-mid">
          <span className="flow-step">Breaking-change audit</span>
          <span className="flow-arrow" aria-hidden="true">
            →
          </span>
          <span className="flow-step">Regression checklist</span>
        </div>

        <div className="flow-col flow-col-after">
          <span className="flow-tag">After</span>
          <ul>
            <li>React 18</li>
            <li>Node 24 LTS</li>
            <li>Kits current, theme removed</li>
            <li>Repeatable upgrade pattern</li>
          </ul>
        </div>
      </div>

      <figcaption>Production never received an unverified migration.</figcaption>
    </figure>
  );
}
