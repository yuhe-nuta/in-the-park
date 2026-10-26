import type { CSSProperties } from 'react'
import duoSuit from '../assets/duo-suit.jpg'

const MEMBERS = [
  {
    role: 'ボケ',
    name: '寺田ランデヴー',
    facts: ['静岡県磐田市出身', '趣味：読書、ラーメン', '片道20km程度なら自転車で移動'],
  },
  {
    role: 'ツッコミ',
    name: '義明',
    facts: ['岡山県津山市出身', '趣味：ボードゲーム', '虫歯経験なし'],
  },
]

export function Profile() {
  return (
    <section id="profile" className="sec gutter" data-bg="#E9EEF9">
      <div className="inner">
        <p className="eyebrow rv">プロフィール</p>
        <h2 className="h2 rv" style={{ '--d': '.08s' } as CSSProperties}>
          <span className="mk">インザパーク</span>
        </h2>
        <figure className="duo rv" style={{ '--d': '.1s' } as CSSProperties}>
          <img src={duoSuit} alt="インザパークのふたり。スーツ姿で笑顔で並んでいる。左が寺田ランデヴー、右が義明" loading="lazy" />
          <figcaption className="duo-tag left">
            <b>寺田ランデヴー</b>
          </figcaption>
          <figcaption className="duo-tag right">
            <b>義明</b>
          </figcaption>
        </figure>
        <div className="members">
          {MEMBERS.map((m, i) => (
            <article
              key={m.name}
              className="member rv tilt"
              style={{ '--d': `${0.1 + i * 0.12}s` } as CSSProperties}
            >
              <span className="role">{m.role}</span>
              <h3>{m.name}</h3>
              <ul>
                {m.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
