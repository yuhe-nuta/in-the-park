import { useCountUp } from '../hooks/useCountUp'

type Stat = {
  platform: string
  target: number
  decimals: number
  unit: string
  label: string
  highlight?: boolean
}

const STATS: Stat[] = [
  {
    platform: 'のべ視聴',
    target: 2.9,
    decimals: 1,
    unit: '億回',
    label: 'YouTube 累計再生',
    highlight: true,
  },
  { platform: '登録者', target: 12.9, decimals: 1, unit: '万人', label: 'YouTube チャンネル' },
  { platform: 'いいね', target: 170, decimals: 0, unit: '万', label: 'TikTok 累計' },
]

/** One lacquer stat plaque whose figure counts up on scroll into view. */
function StatCard({ stat }: { stat: Stat }) {
  const { ref, display } = useCountUp<HTMLDivElement>(stat.target, stat.decimals)
  return (
    <div className={`stat-card${stat.highlight ? ' hl' : ''}`}>
      <div className="stat-platform">{stat.platform}</div>
      <div className="stat-num" ref={ref}>
        {display}
        <span className="stat-unit">{stat.unit}</span>
      </div>
      <div className="stat-lbl">{stat.label}</div>
    </div>
  )
}

/** A small red chōchin (提灯) lantern, brushed with 「麺」, bobbing by the door. */
function Lantern() {
  return (
    <svg
      className="hero-lantern"
      viewBox="0 0 64 92"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="32" y1="0" x2="32" y2="8" stroke="#2a1d15" strokeWidth="2" />
      <rect x="20" y="6" width="24" height="6" rx="2" fill="#2a1d15" />
      <ellipse cx="32" cy="50" rx="26" ry="38" fill="#d83f2c" />
      <ellipse cx="32" cy="50" rx="26" ry="38" fill="url(#lant-shade)" />
      <g stroke="#a3241a" strokeWidth="1.4" opacity="0.7">
        <line x1="7" y1="36" x2="57" y2="36" />
        <line x1="6" y1="50" x2="58" y2="50" />
        <line x1="7" y1="64" x2="57" y2="64" />
      </g>
      <rect x="22" y="84" width="20" height="6" rx="2" fill="#2a1d15" />
      <text
        x="32"
        y="60"
        textAnchor="middle"
        fontFamily="'Yuji Syuku', serif"
        fontSize="30"
        fill="#f7ecd6"
      >
        麺
      </text>
      <defs>
        <radialGradient id="lant-shade" cx="38%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#ffb27a" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#d83f2c" stopOpacity="0" />
          <stop offset="100%" stopColor="#7a1207" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function Hero({ photoSrc }: { photoSrc?: string }) {
  return (
    <section id="hero">
      {/* のれん（入口の暖簾） */}
      <div className="noren" aria-hidden="true">
        {['ら', 'ー', 'め', 'ん'].map((c, i) => (
          <div className="noren-panel" key={i}>
            <span>{c}</span>
          </div>
        ))}
      </div>

      <Lantern />

      {/* 湯気 */}
      <div className="hero-steam s1" aria-hidden="true" />
      <div className="hero-steam s2" aria-hidden="true" />
      <div className="hero-steam s3" aria-hidden="true" />

      {/* カウンター */}
      <div className="hero-counter" aria-hidden="true" />

      {/* 前面コンテンツ（上段） */}
      <div className="hero-content">
        <p className="hero-brush">ラーメン屋の師匠</p>
        <h1 className="hero-name">インザパーク</h1>
        <p className="hero-sub">
          ラーメン屋を舞台に、師匠と弟子がお届けする<b>ショートコント専門店</b>。
        </p>

        <div className="hero-stats">
          {STATS.map((s) => (
            <StatCard key={s.platform} stat={s} />
          ))}
        </div>

        <div className="hero-btns">
          <a href="#contact" className="btn btn-red">
            ご注文（お仕事のご依頼）
          </a>
          <a href="#content" className="btn btn-ghost">
            お品書きを見る
          </a>
        </div>
      </div>

      {/* 店内：師匠と弟子（カウンターの手前・下段に立つ） */}
      <div className="hero-staff">
        {photoSrc && <img src={photoSrc} alt="インザパークのふたり" />}
      </div>
    </section>
  )
}
