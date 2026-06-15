const AGES = [
  { label: '10代', pct: 22, color: '#F5A623' },
  { label: '20代', pct: 38, color: undefined },
  { label: '30代', pct: 27, color: undefined },
  { label: '40代以上', pct: 13, color: '#8B7355' },
]

const PLATFORMS = [
  { name: 'YouTube', pct: 42, color: '#FF0000' },
  { name: 'TikTok', pct: 38, color: '#EE1D52' },
  { name: 'X / Twitter', pct: 20, color: '#1D9BF0' },
]

export function Audience() {
  return (
    <section id="audience">
      <div className="inner">
        <p className="eyebrow fi">Audience</p>
        <h2 className="sec-title fi">視聴者層</h2>
        <p className="sec-lead fi">
          案件担当者の方へ。インザパークのコンテンツが届いている層をご紹介します。
        </p>
        <div className="audience-grid">
          <div className="aud-card fi d1">
            <div className="aud-card-title">年齢層（推計）</div>
            {AGES.map((a) => (
              <div className="bar-row" key={a.label}>
                <div className="bar-meta">
                  <span>{a.label}</span>
                  <span className="bar-pct">{a.pct}%</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    data-w={a.pct}
                    style={a.color ? { background: a.color } : undefined}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="aud-card fi d2">
            <div className="aud-card-title">プラットフォーム別流入</div>
            {PLATFORMS.map((p) => (
              <div className="pf-row" key={p.name}>
                <div className="pf-head">
                  <div className="pf-dot" style={{ background: p.color }} />
                  <span className="pf-name">{p.name}</span>
                  <span className="pf-val" style={{ color: p.color }}>
                    {p.pct}%
                  </span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    data-w={p.pct}
                    style={{ background: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
