import type { CSSProperties } from 'react'
import { useCountUp } from '../hooks/useCountUp'

type Stat = { target: number; decimals: number; unit: string; label: string }

// 数字は inthepark_sns_stats.md（2026年10月26日時点）。
const STATS: Stat[] = [
  { target: 2.99, decimals: 2, unit: '億回', label: 'YouTube 総再生回数' },
  { target: 12.9, decimals: 1, unit: '万人', label: 'YouTube チャンネル登録者' },
  { target: 170, decimals: 0, unit: '万', label: 'TikTok 総いいね' },
  { target: 994, decimals: 0, unit: '本', label: 'YouTube 動画本数' },
]

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const { ref, display } = useCountUp<HTMLElement>(stat.target, stat.decimals, 1600)
  return (
    <div className="stat rv" style={{ '--d': `${delay}s` } as CSSProperties}>
      <b ref={ref}>
        {display}
        <small>{stat.unit}</small>
      </b>
      <span>{stat.label}</span>
    </div>
  )
}

export function Stats() {
  return (
    <section id="stats" className="sec gutter" data-bg="#FFFFFF">
      <div className="inner">
        <h2 className="h2 rv" style={{ '--d': '.08s' } as CSSProperties}>
          <span className="h2-sub">SNS総視聴回数</span>
          <span className="mk">約３億</span>
        </h2>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} delay={i * 0.1} />
          ))}
        </div>
        <p className="note">数字は2026年10月26日時点です。</p>
      </div>
    </section>
  )
}
