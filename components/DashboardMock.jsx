// Illustrative reporting preview. Values are sample data, not client results.
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const billed = [62, 70, 66, 74, 78, 72, 80, 84, 79, 86, 88, 90];
const collected = [48, 55, 54, 60, 66, 61, 69, 74, 70, 77, 80, 83];
const payers = [
  { name: "Commercial Payer A", pct: 82 },
  { name: "Medicare", pct: 74 },
  { name: "Medicaid", pct: 58 },
  { name: "Commercial Payer B", pct: 66 },
];

export default function DashboardMock() {
  return (
    <figure className="dash" aria-label="Sample revenue cycle report with illustrative data" style={{ margin: 0 }}>
      <div className="dash__bar">
        <div className="dash__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="dash__label">Monthly Revenue Cycle Report</span>
        <span className="dash__label">Sample</span>
      </div>
      <div className="dash__body">
        <div className="dash__kpis">
          <div className="dash__kpi">
            <span>Claims submitted</span>
            <strong>1,248</strong>
          </div>
          <div className="dash__kpi">
            <span>Open A/R items</span>
            <strong>312</strong>
          </div>
          <div className="dash__kpi">
            <span>Denials worked</span>
            <strong>96</strong>
          </div>
        </div>
        <div className="dash__chart">
          <div className="dash__chart-head">
            <span>Billed vs. collected</span>
            <span className="dash__legend">
              <span>
                <i style={{ background: "var(--navy)" }} />
                Billed
              </span>
              <span>
                <i style={{ background: "var(--teal)" }} />
                Collected
              </span>
            </span>
          </div>
          <div className="dash__bars" aria-hidden="true">
            {months.map((m, i) => (
              <div key={i} title={m}>
                <b style={{ height: `${billed[i] - collected[i]}%`, animationDelay: `${i * 0.05}s` }} />
                <b style={{ height: `${collected[i]}%`, animationDelay: `${i * 0.05}s` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="dash__rows">
          {payers.map((p) => (
            <div className="dash__row" key={p.name}>
              <span>{p.name}</span>
              <span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{p.pct}%</span>
              <span className="dash__meter">
                <i style={{ width: `${p.pct}%` }} />
              </span>
            </div>
          ))}
        </div>
        <figcaption className="dash__note">Illustrative data for demonstration only.</figcaption>
      </div>
    </figure>
  );
}
