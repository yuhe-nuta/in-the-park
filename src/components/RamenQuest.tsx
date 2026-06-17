import { Tweet } from './Tweet'

// ラーメン探求の代表ポスト（status id）。差し替えるときはこの3つを入れ替える。
const TWEET_IDS = [
  '1930083795866398837', // 西武柳沢 ラーメンチョップ #259
  '1892756123993985173', // 江古田 YOLO #193
  '1869638800705720465', // 江古田 YOLO #158
]

const POINTS = [
  {
    icon: '🍜',
    title: 'コントとリアルが地続き',
    text: 'ネタの中の「師匠」が、画面の外でも本当にラーメンを食べ歩いている。だからこそ、笑いに説得力とリアリティが宿ります。',
    delay: 'd1',
  },
  {
    icon: '📍',
    title: 'ジャンルを問わず食べ歩き',
    text: 'ご当地の一杯から町中華、行列の名店まで。師匠の舌で巡る食レポは、グルメ好きにも見応えたっぷり。',
    delay: 'd2',
  },
  {
    icon: '❤️',
    title: 'ファンと一緒に更新中',
    text: 'X（旧Twitter）で訪問記録を発信中。次に行くお店もフォロワーと一緒に探していく、参加型の名物企画です。',
    link: { label: '#師匠のラーメン探求 を見る →', url: 'https://x.com/rameninthepark' },
    delay: 'd3',
  },
]

export function RamenQuest() {
  return (
    <section id="ramen">
      <div className="inner">
        <p className="eyebrow fi">師匠の食べ歩き</p>
        <h2 className="sec-title fi">ラーメン巡礼</h2>
        <p className="sec-lead fi">
          コントの「師匠」は、画面の外でも本当にラーメンを食べ歩いています。
          フィクションとリアルが地続きになった、インザパークだけの名物企画です。
        </p>
        <div className="ramen-layout">
          <div className="ramen-hero fi d1">
            <div className="ramen-hero-num">
              259<span className="ramen-hero-unit">軒以上</span>
            </div>
            <div className="ramen-hero-lbl">これまでに訪れたラーメン店</div>
            <div className="ramen-hashtag">#師匠のラーメン探求</div>
          </div>
          <div className="ramen-points">
            {POINTS.map((p) => (
              <div key={p.title} className={`ramen-point fi ${p.delay}`}>
                <span className="ramen-point-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <div>
                  <div className="ramen-point-title">{p.title}</div>
                  <p className="ramen-point-text">{p.text}</p>
                  {p.link && (
                    <a
                      href={p.link.url}
                      className="ramen-point-link"
                      target="_blank"
                      rel="noopener"
                    >
                      {p.link.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ramen-feed fi">
          <div className="ramen-feed-title">ラーメン探求ポスト</div>
          <p className="ramen-feed-note">
            X（旧Twitter）<span className="ramen-feed-tag">#師匠のラーメン探求</span>{' '}
            から、師匠の食べ歩き記録をピックアップ。
          </p>
          <div className="ramen-tweets">
            {TWEET_IDS.map((id) => (
              <Tweet key={id} id={id} />
            ))}
          </div>
          <div className="ramen-feed-actions">
            <a
              className="btn btn-red"
              href="https://x.com/rameninthepark"
              target="_blank"
              rel="noopener"
            >
              @rameninthepark をフォロー
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
