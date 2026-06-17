const CARDS = [
  {
    cls: 'yt',
    delay: 'd1',
    platform: 'YouTube',
    big: '12.9',
    bigUnit: '万人',
    bigLabel: 'チャンネル登録者数',
    sub: '2億9,174万',
    subLabel: '累計総再生回数',
    link: 'チャンネルを見る →',
    url: 'https://www.youtube.com/@ra-meninthepark',
  },
  {
    cls: 'tt',
    delay: 'd2',
    platform: 'TikTok',
    big: '2.68',
    bigUnit: '万人',
    bigLabel: 'フォロワー数',
    sub: '170万',
    subLabel: '累計いいね数',
    link: 'プロフィールを見る →',
    url: 'https://www.tiktok.com/@hagethepark?_d=secCgYIASAHKAESMgowohUKn%2FeBowvBBpideEE4PhhNR54R9McqYfc%2BKH2ndNBVnCIU1IzEqetF5%2BoN5ktUGgA%3D&_r=1&language=ja&sec_user_id=MS4wLjABAAAAwOqdVfbt_hkuLPctwXwDZE4QB5c_8wndWCmhGx-HT65DJuvQr0TAY-NfHLxufQzg&share_app_id=1180&share_author_id=6967024342296249346&share_link_id=bf72a0db-bc94-4c1c-8979-f0e19bab9659&source=h5_t&timestamp=1623083351&u_code=dil1l1ie6cfblk&user_id=6967024342296249346&utm_campaign=client_share&utm_medium=android&utm_source=copy&lang=ja-JP',
  },
  {
    cls: 'xc',
    delay: 'd3',
    platform: 'X (Twitter)',
    big: '193',
    bigUnit: '人',
    bigLabel: 'フォロワー数',
    sub: '1,230',
    subLabel: '累計投稿数',
    link: 'フォローする →',
    url: 'https://x.com/rameninthepark?s=20',
  },
]

export function Sns() {
  return (
    <section id="sns">
      <div className="inner">
        <p className="eyebrow fi">評判</p>
        <h2 className="sec-title fi">SNSでの広がり</h2>
        <p className="sec-lead fi">
          各プラットフォームで継続的に成長中。案件担当者の方はぜひご確認ください。
        </p>
        <div className="sns-cards">
          {CARDS.map((c) => (
            <div key={c.platform} className={`sns-card ${c.cls} fi ${c.delay}`}>
              <div className="sns-stripe" />
              <div className="sns-pf">{c.platform}</div>
              <div className="sns-big">
                {c.big}
                <span className="sns-big-unit">{c.bigUnit}</span>
              </div>
              <div className="sns-big-lbl">{c.bigLabel}</div>
              <div className="sns-sub">{c.sub}</div>
              <div className="sns-sub-lbl">{c.subLabel}</div>
              <a href={c.url} className="sns-link" target="_blank" rel="noopener">
                {c.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
