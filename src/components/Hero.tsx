const RECORDS = [
  '浜松漫才グランプリ2023 優勝',
  '野方お笑い総選挙2024 優勝',
  'キングオブコント2026 準々決勝進出',
  'YouTube 登録者 12.9万人',
]

export function Hero() {
  return (
    <section id="hero" data-bg="#FFD21F">
      <div className="stage">
        <div className="block" aria-hidden="true" />
        <h1 className="word" aria-label="IN THE PARK">
          <span className="l1" aria-hidden="true">
            IN THE
          </span>
          <span className="l2" aria-hidden="true">
            PARK
          </span>
          <span className="l3" aria-hidden="true">
            インザパーク
          </span>
        </h1>
        <img
          className="photo"
          src="/hero-cut.webp"
          alt="インザパークのふたり。笑顔でこちらを向いて並んでいる"
          width={1037}
          height={910}
          fetchPriority="high"
          decoding="async"
        />
        <p className="hero-copy">
          お笑いコンビ
          <br />
          2020年結成
        </p>
        <div className="hero-cta">
          <a className="btn mag" href="#videos">
            動画を見る
          </a>
        </div>
        <div className="scrollcue" aria-hidden="true" />
      </div>
      <div className="track" aria-label="受賞歴と実績">
        <div className="track-in">
          {[...RECORDS, ...RECORDS].map((r, i) => (
            <span key={i} aria-hidden={i >= RECORDS.length || undefined}>
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
