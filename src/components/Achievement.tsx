const AWARDS = [
  {
    year: '2024',
    event: '野方お笑い総選挙',
    name: ['野方お笑い総選挙', '2024'],
    badge: '🏆 優勝',
    badgeClass: 'badge-win',
    delay: 'd1',
    grey: false,
  },
  {
    year: '2023',
    event: '浜松漫才GP',
    name: ['浜松漫才グランプリ', '2023'],
    badge: '🏆 優勝',
    badgeClass: 'badge-win',
    delay: 'd2',
    grey: false,
  },
  {
    year: '2023・2024',
    event: 'M-1グランプリ',
    name: ['M-1グランプリ', '参加歴あり'],
    badge: '出場',
    badgeClass: 'badge-grey',
    delay: 'd3',
    grey: true,
  },
]

export function Achievement() {
  return (
    <section id="achievement">
      <div className="inner">
        <p className="eyebrow fi">Achievement</p>
        <h2 className="sec-title fi">実績・受賞歴</h2>
        <div className="awards-grid">
          {AWARDS.map((a) => (
            <div
              key={a.event}
              className={`award-card fi ${a.delay}${a.grey ? ' grey-top' : ''}`}
            >
              <div className="award-year">{a.year}</div>
              <div className="award-event">{a.event}</div>
              <div className="award-name">
                {a.name[0]}
                <br />
                {a.name[1]}
              </div>
              <span className={`award-badge ${a.badgeClass}`}>{a.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
