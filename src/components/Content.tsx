import { useState } from 'react'

const TAGS = [
  { label: '🔥 師匠の謎ルール', cls: 'hot' },
  { label: '替え玉戦争', cls: 'warm' },
  { label: '新メニュー開発', cls: '' },
  { label: '迷惑な常連', cls: 'warm' },
  { label: '新人バイト伝説', cls: '' },
  { label: '食べ方指導', cls: '' },
]

const VIDEOS = [
  {
    title: '「師匠、このラーメンは食べ方が違います」',
    views: '▶ 820万回再生',
    delay: 'd1',
  },
  {
    title: '「替え玉3回はダメ！というルールは存在しない」',
    views: '▶ 650万回再生',
    delay: 'd2',
  },
  { title: '「新メニュー開発会議」', views: '▶ 410万回再生', delay: 'd3' },
]

/**
 * Facade pattern: shows a lightweight poster until clicked, then swaps to the
 * loaded state. In production the loaded state would mount the real YouTube
 * iframe (using the video id) instead of this placeholder.
 */
function VideoCard({
  title,
  views,
  delay,
}: {
  title: string
  views: string
  delay: string
}) {
  const [loaded, setLoaded] = useState(false)

  const activate = () => setLoaded(true)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      activate()
    }
  }

  return (
    <div
      className={`video-card fi ${delay}`}
      role="button"
      tabIndex={0}
      aria-label={`動画を再生：${title.replace(/[「」]/g, '')}`}
      onClick={loaded ? undefined : activate}
      onKeyDown={loaded ? undefined : onKeyDown}
    >
      {loaded ? (
        <div className="video-loaded">
          <span className="video-loaded-icon">▶</span>
          <span className="video-loaded-txt">
            {title}
            <br />
            <br />
            <em className="video-loaded-note">
              実装時：YouTube Facade パターンで読み込み
            </em>
          </span>
        </div>
      ) : (
        <>
          <div className="play-btn" aria-hidden="true" />
          <div className="video-info">
            <div className="video-title">{title}</div>
            <div className="video-views">{views}</div>
          </div>
        </>
      )}
    </div>
  )
}

export function Content() {
  return (
    <section id="content">
      <div className="inner">
        <p className="eyebrow fi">Content</p>
        <h2 className="sec-title fi">人気コンテンツ</h2>
        <p className="sec-lead fi">
          ラーメン屋を舞台に繰り広げられる、師匠と弟子の笑いの世界。
        </p>
        <div className="pattern-tags fi">
          {TAGS.map((t) => (
            <span key={t.label} className={`tag${t.cls ? ` ${t.cls}` : ''}`}>
              {t.label}
            </span>
          ))}
        </div>
        <div className="videos-grid">
          {VIDEOS.map((v) => (
            <VideoCard key={v.title} {...v} />
          ))}
        </div>
      </div>
    </section>
  )
}
