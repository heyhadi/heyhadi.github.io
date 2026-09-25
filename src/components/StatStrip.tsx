export function StatStrip({ stats }: any) {
  return (
    <section className="stats" aria-label="At a glance">
      <div className="stats-inner">
        {stats.map((s: any) => (
          <div className="stat" key={s.label} data-reveal>
            <span className="stat-val">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
