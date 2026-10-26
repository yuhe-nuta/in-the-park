import type { CSSProperties } from 'react'

type Event = { when: string; what: string; sub?: string }

// 日付は inthepark_portfolio_info.md / inthepark_sns_stats.md の記載どおり。
const EVENTS: Event[] = [
  { when: '2020.01.03', what: 'インザパーク結成' },
  { when: '2020.10.20', what: 'YouTubeチャンネル開設' },
  { when: '2023', what: '浜松漫才グランプリ 優勝' },
  { when: '2024', what: '野方お笑い総選挙 優勝', sub: '2024年2月にXのアカウントを開設' },
  { when: '2026', what: 'キングオブコント2026 準々決勝進出' },
]

export function History() {
  return (
    <section id="history" className="sec gutter" data-bg="#FFFFFF">
      <div className="inner">
        <p className="eyebrow rv">歩み</p>
        <h2 className="h2 rv" style={{ '--d': '.08s' } as CSSProperties}>
          結成から<span className="mk">ここまで</span>
        </h2>
        <div className="tl" id="tl">
          {EVENTS.map((e) => (
            <div key={e.what} className="ev rv">
              <span className="when">{e.when}</span>
              <span className="what">{e.what}</span>
              {e.sub && <span className="sub">{e.sub}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
