const STATS = [
  {
    platform: 'YouTube',
    num: '12.9',
    unit: '万人',
    label: 'チャンネル登録者',
    highlight: true,
  },
  { platform: '累計再生', num: '2.9', unit: '億', label: '総再生回数' },
  { platform: 'TikTok', num: '170', unit: '万', label: '総いいね数' },
]

/**
 * Full-bleed member photo for the hero background — the production stand-in
 * for the prototype's drag-and-drop <image-slot>. Pass `src` (e.g. an
 * imported asset) to show the real photo; without it the dashed empty state
 * is shown, matching the unfilled slot in the design.
 */
function HeroPhoto({ src }: { src?: string }) {
  return (
    <div className="hero-img-slot" aria-label="メンバー写真">
      {src ? (
        <img className="hero-photo" src={src} alt="インザパークのメンバー" />
      ) : (
        <div className="hero-photo-empty">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span>📷 メンバー写真（背景中央に表示）</span>
        </div>
      )}
    </div>
  )
}

export function Hero({ photoSrc }: { photoSrc?: string }) {
  return (
    <section id="hero">
      {/* 背景：メンバー写真（全画面・中央） */}
      <HeroPhoto src={photoSrc} />

      {/* 背景：ラーメン丼アニメーション（右下・写真と重なってOK・透過） */}
      <svg
        className="hero-bowl-bg"
        viewBox="0 0 240 220"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="120" cy="150" rx="105" ry="38" fill="#e8392a" />
        <path d="M 15 150 Q 120 218 225 150" fill="#C72D1E" />
        <ellipse cx="120" cy="124" rx="105" ry="32" fill="#F5A623" />
        <path
          d="M 30 124 Q 65 104 100 124 Q 135 144 170 124 Q 200 104 210 124"
          stroke="#e8392a"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="stm"
          d="M 72 100 C 66 80 78 60 72 40"
          stroke="#8B7355"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="stm"
          d="M 120 92 C 114 72 126 52 120 32"
          stroke="#8B7355"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="stm"
          d="M 168 100 C 162 80 174 60 168 40"
          stroke="#8B7355"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* 前面コンテンツ */}
      <div className="hero-content">
        <div>
          <h1 className="hero-name">インザパーク</h1>
          <span className="hero-name-line" />
        </div>

        <p className="hero-sub">ラーメン屋を舞台にした笑いの専門店</p>

        <div className="hero-stats">
          {STATS.map((s) => (
            <div
              key={s.platform}
              className={`stat-card${s.highlight ? ' hl' : ''}`}
            >
              <div className="stat-platform">{s.platform}</div>
              <div className="stat-num">
                {s.num}
                <span className="stat-unit">{s.unit}</span>
              </div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-btns">
          <a href="#contact" className="btn btn-red">
            お仕事のご依頼はこちら
          </a>
          <a href="#content" className="btn btn-ghost">
            動画を見る
          </a>
        </div>
      </div>
    </section>
  )
}
