import { useDragMarquee } from '../hooks/useDragMarquee'

type Video = { id: string; title: string; metric: string; url: string }

// yt-link.txt の10本（タイトル / 視聴回数 or いいね / URL）。
const VIDEOS: Video[] = [
  { id: 'QnDhV5z0yc0', title: '【激論】麺硬め・味濃いめ・油多めで頼む客について', metric: '▶ 1,879回', url: 'https://youtu.be/QnDhV5z0yc0' },
  { id: '_NLLJJHNSdw', title: 'ラーメン屋に調教されているお客さん（ショート）', metric: '♥ 312', url: 'https://youtube.com/shorts/_NLLJJHNSdw' },
  { id: '03k8KYwkwjQ', title: '【総集編】2025年ラーメン屋の師匠イッキ見！', metric: '▶ 2,641回', url: 'https://youtu.be/03k8KYwkwjQ' },
  { id: 'b6Ozcx4G4hk', title: '料理研究家リュウジの「ジェネリック一蘭」を師匠に食わせてみた', metric: '▶ 3,937回', url: 'https://youtu.be/b6Ozcx4G4hk' },
  { id: 'iH3KpF6OR9Q', title: '券売機が複雑過ぎてラーメン並頼むのに1時間かかるラーメン屋（ショート）', metric: '♥ 465', url: 'https://youtube.com/shorts/iH3KpF6OR9Q' },
  { id: 'wnYermr73Tg', title: 'ラーメンの麺が国産なのか気になるお客さん（ショート）', metric: '♥ 887', url: 'https://youtube.com/shorts/wnYermr73Tg' },
  { id: 'd0iovkqdsxc', title: 'ラーメン屋の師匠が定番カップ麺を徹底ジャッジ', metric: '▶ 1,376回', url: 'https://youtu.be/d0iovkqdsxc' },
  { id: 'IY-_Oxo3Loo', title: '【提言】初デートは絶対ラーメン屋へ行け', metric: '▶ 886回', url: 'https://youtu.be/IY-_Oxo3Loo' },
  { id: 'XAjq11HXDeE', title: '麺1本ずつ替え玉注文してくるお客さん（ショート）', metric: '♥ 1,326', url: 'https://youtube.com/shorts/XAjq11HXDeE' },
  { id: 'TLlzo0hkO3A', title: '麺増し10kgまで無料のラーメン屋（ショート）', metric: '♥ 1,756', url: 'https://youtube.com/shorts/TLlzo0hkO3A' },
]

/**
 * A video card shows the YouTube thumbnail and opens the real video in a new
 * tab. `duplicate` cards are the second copy that makes the marquee loop
 * seamless; they are hidden from assistive tech and the tab order.
 */
function VideoCard({ video, duplicate = false }: { video: Video; duplicate?: boolean }) {
  const thumb = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`

  return (
    <a
      className="video-card"
      href={video.url}
      target="_blank"
      rel="noopener"
      draggable={false}
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate || undefined}
      aria-label={`YouTubeで見る：${video.title.replace(/（ショート）/g, '')}`}
    >
      <div className="thumb" style={{ backgroundImage: `url(${thumb})` }}>
        <span className="play-btn" aria-hidden="true" />
      </div>
      <div className="video-info">
        <p className="video-title">{video.title}</p>
        <p className="video-views">{video.metric}</p>
      </div>
    </a>
  )
}

export function Videos() {
  const { containerRef, trackRef, onClickCapture } = useDragMarquee()

  return (
    <section id="videos" className="sec" data-bg="#F8F0E3">
      <div className="video-marquee rv" ref={containerRef}>
        <div className="video-track" ref={trackRef} onClickCapture={onClickCapture}>
          {[...VIDEOS, ...VIDEOS].map((v, i) => (
            <VideoCard key={i} video={v} duplicate={i >= VIDEOS.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
